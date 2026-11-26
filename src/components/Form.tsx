"use client";

import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  chakra,
  Checkbox,
  Field,
  Heading,
  Input,
  NativeSelect,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { CheckCircle2 } from "lucide-react";
import type { FormDefinition, FormField } from "@content/types";
import { toaster } from "./ui/toaster";

type Values = Record<string, string | boolean>;

type Props = {
  form: FormDefinition;
  /** preset values, e.g. { group: "Binti" } */
  defaults?: Record<string, string>;
  /** map field name → URL query param to prefill from (e.g. { group: "group" }) */
  prefillFromQuery?: Record<string, string>;
  /** hide the form heading (when the section already has one) */
  hideTitle?: boolean;
  /** no card frame: the form sits directly on its section (used on Contact) */
  plain?: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d\s-]{7,20}$/;

function initialValues(form: FormDefinition, defaults?: Record<string, string>): Values {
  const v: Values = {};
  for (const f of form.fields) {
    v[f.name] = f.type === "checkbox" ? false : (defaults?.[f.name] ?? f.defaultValue ?? "");
  }
  return v;
}

function validate(field: FormField, value: string | boolean): string | null {
  if (field.type === "checkbox") return field.required && !value ? `Please tick “${field.label}”.` : null;
  const v = String(value).trim();
  if (field.required && !v) return `Please enter ${field.label.toLowerCase()}.`;
  if (!v) return null;
  if (field.type === "email" && !EMAIL_RE.test(v)) return "Please enter an email address like name@example.com.";
  if (field.type === "tel" && !PHONE_RE.test(v)) return "Please enter a phone number like 0701 777 888.";
  if (field.type === "number" && (Number.isNaN(Number(v)) || Number(v) < 0)) return "Please enter a number (0 or more).";
  return null;
}

/**
 * Accessible form renderer: visible labels, helper and error text linked to
 * inputs, errors shown on blur and on submit, focus moved to the first error,
 * success panel announced to screen readers. Posts to /api/forms.
 */
export function Form({ form, defaults, prefillFromQuery, hideTitle, plain }: Props) {
  const [values, setValues] = useState<Values>(() => initialValues(form, defaults));
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Prefill from the URL (e.g. /get-involved/groups?group=binti#join)
  useEffect(() => {
    if (!prefillFromQuery) return;
    const params = new URLSearchParams(window.location.search);
    const updates: Values = {};
    for (const [field, param] of Object.entries(prefillFromQuery)) {
      const raw = params.get(param);
      if (!raw) continue;
      const def = form.fields.find((f) => f.name === field);
      const match = def?.options?.find((o) => o.toLowerCase().replace(/[^a-z0-9]+/g, "-") === raw.toLowerCase() || o === raw);
      updates[field] = match ?? raw;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- URL is only readable after hydration
    if (Object.keys(updates).length) setValues((v) => ({ ...v, ...updates }));
  }, [prefillFromQuery, form.fields]);

  // Respond to "Join this group" links on the same page (hash/query change)
  useEffect(() => {
    if (!prefillFromQuery) return;
    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<Record<string, string>>).detail;
      setValues((v) => ({ ...v, ...detail }));
    };
    window.addEventListener("nc:prefill", onPrefill);
    return () => window.removeEventListener("nc:prefill", onPrefill);
  }, [prefillFromQuery]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const set = (name: string, value: string | boolean) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: null }));
  };

  const onBlur = (field: FormField) => setErrors((e) => ({ ...e, [field.name]: validate(field, values[field.name]) }));

  async function onSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    const nextErrors: Record<string, string | null> = {};
    for (const f of form.fields) nextErrors[f.name] = validate(f, values[f.name]);
    setErrors(nextErrors);
    const firstInvalid = form.fields.find((f) => nextErrors[f.name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId: form.id, values }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
      toaster.create({ type: "success", title: "Sent", description: form.successMessage });
    } catch {
      setStatus("error");
      toaster.create({
        type: "error",
        title: "We couldn't send that",
        description: "Please try again, or WhatsApp us on 0701 777 888.",
      });
    }
  }

  // plain mode: which fields take a whole row (long ones, and a short field left without a partner)
  const isLong = (f: FormField) => f.type === "textarea" || f.type === "checkbox" || f.label.length > 30;
  const fullRow: boolean[] = [];
  for (let i = 0; i < form.fields.length; ) {
    if (isLong(form.fields[i])) {
      fullRow[i++] = true;
      continue;
    }
    const next = form.fields[i + 1];
    if (next && !isLong(next)) {
      fullRow[i] = false;
      fullRow[i + 1] = false;
      i += 2;
    } else {
      fullRow[i++] = true;
    }
  }

  if (status === "success") {
    return (
      <Box
        ref={successRef}
        tabIndex={-1}
        role="status"
        p={{ base: "6", md: "8" }}
        borderRadius="lg"
        bg="brand.subtle"
        borderWidth="1px"
        borderColor="purple.200"
      >
        <Stack gap="3" alignItems="flex-start">
          <Box color="brand.fg" aria-hidden="true">
            <CheckCircle2 size={32} />
          </Box>
          <Text textStyle="h4">{form.successMessage}</Text>
          <Button
            variant="link"
            onClick={() => {
              setValues(initialValues(form, defaults));
              setStatus("idle");
            }}
          >
            Send another
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <chakra.form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-labelledby={hideTitle ? undefined : `${form.id}-title`}
      aria-label={hideTitle ? form.title : undefined}
      p={plain ? "0" : { base: "5", md: "8" }}
      borderRadius="lg"
      bg={plain ? "transparent" : "bg.canvas"}
      borderWidth={plain ? "0" : "1px"}
      borderColor="border"
      maxW={plain ? "none" : "720px"}
    >
      <Stack gap="5">
        {!hideTitle && (
          <Stack gap="2">
            <Heading as="h3" id={`${form.id}-title`} textStyle="h3">
              {form.title}
            </Heading>
            {form.intro && <Text color="fg.muted">{form.intro}</Text>}
          </Stack>
        )}
        <Text textStyle="small" color="fg.muted">
          Fields marked with <span aria-hidden="true">*</span>
          <span className="sr-only">an asterisk</span> are required.
        </Text>

        {status === "error" && (
          <Alert.Root status="error" borderRadius="md">
            <Alert.Indicator />
            <Alert.Title>We couldn&apos;t send your form. Please try again, or WhatsApp us on 0701 777 888.</Alert.Title>
          </Alert.Root>
        )}

        {/* plain mode: short fields pair up two-across from tablet width */}
        <Box display={plain ? "grid" : "contents"} gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} columnGap="5" rowGap="5">
        {form.fields.map((f, i) => {
          const id = `${form.id}-${f.name}`;
          const error = errors[f.name];
          const span = plain && fullRow[i] ? "1 / -1" : undefined;
          if (f.type === "checkbox") {
            return (
              <Field.Root key={f.name} invalid={!!error} required={f.required} gridColumn={span}>
                <Checkbox.Root
                  name={f.name}
                  checked={Boolean(values[f.name])}
                  onCheckedChange={(d) => set(f.name, d.checked === true)}
                  alignItems="flex-start"
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control mt="1" />
                  <Checkbox.Label fontWeight="500">{f.label}</Checkbox.Label>
                </Checkbox.Root>
                {f.helper && <Field.HelperText>{f.helper}</Field.HelperText>}
                {error && <Field.ErrorText>{error}</Field.ErrorText>}
              </Field.Root>
            );
          }
          return (
            <Field.Root key={f.name} id={id} invalid={!!error} required={f.required} gridColumn={span}>
              <Field.Label fontWeight="600" fontSize="1rem">
                {f.label}
                {f.required ? <Field.RequiredIndicator /> : <Text as="span" color="fg.muted" fontWeight="400"> (optional)</Text>}
              </Field.Label>
              {f.type === "textarea" ? (
                <Textarea
                  name={f.name}
                  value={String(values[f.name])}
                  onChange={(e) => set(f.name, e.target.value)}
                  onBlur={() => onBlur(f)}
                  placeholder={f.placeholder}
                  rows={5}
                  size="lg"
                  bg="bg.canvas"
                  borderColor="border.strong"
                />
              ) : f.type === "select" ? (
                <NativeSelect.Root size="lg">
                  <NativeSelect.Field
                    name={f.name}
                    value={String(values[f.name])}
                    onChange={(e) => set(f.name, e.target.value)}
                    onBlur={() => onBlur(f)}
                    bg="bg.canvas"
                    borderColor="border.strong"
                  >
                    <option value="">Choose…</option>
                    {f.options?.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              ) : (
                <Input
                  name={f.name}
                  type={f.type}
                  inputMode={f.type === "number" ? "numeric" : f.type === "tel" ? "tel" : undefined}
                  min={f.type === "number" ? 0 : undefined}
                  value={String(values[f.name])}
                  onChange={(e) => set(f.name, e.target.value)}
                  onBlur={() => onBlur(f)}
                  autoComplete={f.autoComplete}
                  placeholder={f.placeholder}
                  size="lg"
                  bg="bg.canvas"
                  borderColor="border.strong"
                />
              )}
              {f.helper && <Field.HelperText color="fg.muted">{f.helper}</Field.HelperText>}
              {error && <Field.ErrorText>{error}</Field.ErrorText>}
            </Field.Root>
          );
        })}
        </Box>

        {form.privacyNote && (
          <Text textStyle="small" color="fg.muted">
            {form.privacyNote}
          </Text>
        )}

        <Box>
          <Button type="submit" variant="primary" size="lg" loading={status === "sending"} loadingText="Sending…">
            {form.submitLabel}
          </Button>
        </Box>
      </Stack>
    </chakra.form>
  );
}
