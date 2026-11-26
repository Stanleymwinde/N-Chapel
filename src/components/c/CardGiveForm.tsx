"use client";

import { useRef, useState } from "react";
import { Box, Button, chakra, Field, Input, NativeSelect, Stack, Text } from "@chakra-ui/react";
import { CheckCircle2 } from "lucide-react";
import { RichText } from "../RichText";
import { toaster } from "../ui/toaster";
import { FilterBarChip, FilterBarChips, FilterBarRoot } from "../recipe-parts";

type Props = {
  givingTypes: string[];
  givingTypesNote: string;
  currencies: readonly string[];
  presets: number[];
  providerNote: string;
  successMessage: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fmt = (n: number) => n.toLocaleString("en-KE");

/**
 * Card / online giving form. Preset amounts in KES (500 / 1,000 / 5,000 /
 * Other). Posts to /api/forms; payment provider is TODO.
 */
export function CardGiveForm({ givingTypes, givingTypesNote, currencies, presets, providerNote, successMessage }: Props) {
  const [values, setValues] = useState({ name: "", email: "", phone: "", givingType: "", currency: "KES" });
  const [preset, setPreset] = useState<number | "other">(presets[1] ?? presets[0]);
  const [other, setOther] = useState("");
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const usePresets = values.currency === "KES";
  const amount = usePresets && preset !== "other" ? preset : Number(other.replace(/,/g, ""));
  const validAmount = Number.isFinite(amount) && amount > 0;
  const set = (k: keyof typeof values, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: null }));
  };

  function validate() {
    const e: Record<string, string | null> = {
      name: values.name.trim() ? null : "Please enter your full name.",
      email: !values.email.trim() ? "Please enter your email address." : EMAIL_RE.test(values.email) ? null : "Please enter an email address like name@example.com.",
      givingType: values.givingType ? null : "Please choose what you're giving towards.",
      amount: validAmount ? null : "Please enter an amount greater than 0.",
    };
    setErrors(e);
    const first = Object.entries(e).find(([, v]) => v)?.[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    return !first;
  }

  async function onSubmit(ev: { preventDefault(): void }) {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId: "give-card", values: { ...values, amount } }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      toaster.create({ type: "success", title: "Details received" });
    } catch {
      setStatus("idle");
      toaster.create({ type: "error", title: "We couldn't send that", description: "Please try again, or give by M-Pesa or bank transfer." });
    }
  }

  if (status === "success") {
    return (
      <Box role="status" p={{ base: "6", md: "8" }} borderRadius="lg" bg="brand.subtle" borderWidth="1px" borderColor="purple.200">
        <Stack gap="3" alignItems="flex-start">
          <Box color="brand.fg" aria-hidden="true">
            <CheckCircle2 size={32} />
          </Box>
          <Text textStyle="h4">
            <RichText text={successMessage} />
          </Text>
          <Button variant="link" onClick={() => setStatus("idle")}>
            Give again
          </Button>
        </Stack>
      </Box>
    );
  }

  const inputProps = { size: "lg" as const, bg: "bg.canvas", borderColor: "border.strong" };
  const label = validAmount ? `Give ${values.currency} ${fmt(amount)}` : `Give ${values.currency}`;

  return (
    <chakra.form ref={formRef} noValidate onSubmit={onSubmit} aria-label="Give by card" display="grid" gap="5" maxW="640px">
      <Text textStyle="small" color="fg.muted">
        <RichText text={providerNote} />
      </Text>

      <Field.Root invalid={!!errors.name} required>
        <Field.Label fontWeight="600">
          Full name <Field.RequiredIndicator />
        </Field.Label>
        <Input name="name" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} {...inputProps} />
        {errors.name && <Field.ErrorText>{errors.name}</Field.ErrorText>}
      </Field.Root>

      <Field.Root invalid={!!errors.email} required>
        <Field.Label fontWeight="600">
          Email <Field.RequiredIndicator />
        </Field.Label>
        <Input name="email" type="email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} {...inputProps} />
        {errors.email && <Field.ErrorText>{errors.email}</Field.ErrorText>}
      </Field.Root>

      <Field.Root>
        <Field.Label fontWeight="600">
          Phone{" "}
          <Text as="span" color="fg.muted" fontWeight="400">
            (optional)
          </Text>
        </Field.Label>
        <Input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} {...inputProps} />
      </Field.Root>

      <Field.Root invalid={!!errors.givingType} required>
        <Field.Label fontWeight="600">
          What are you giving towards? <Field.RequiredIndicator />
        </Field.Label>
        <NativeSelect.Root size="lg">
          <NativeSelect.Field name="givingType" value={values.givingType} onChange={(e) => set("givingType", e.target.value)} bg="bg.canvas" borderColor="border.strong">
            <option value="">Choose…</option>
            {givingTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <Field.HelperText color="fg.muted">
          <RichText text={givingTypesNote} />
        </Field.HelperText>
        {errors.givingType && <Field.ErrorText>{errors.givingType}</Field.ErrorText>}
      </Field.Root>

      <Field.Root>
        <Field.Label fontWeight="600">Currency</Field.Label>
        <NativeSelect.Root size="lg" maxW="200px">
          <NativeSelect.Field name="currency" value={values.currency} onChange={(e) => set("currency", e.target.value)} bg="bg.canvas" borderColor="border.strong">
            {currencies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field.Root>

      <FilterBarRoot display="block" p="0" bg="transparent" borderWidth="0" borderRadius="0">
        <Text id="amount-label" fontWeight="600" mb="2">
          Amount
        </Text>
        {usePresets && (
          <FilterBarChips aria-labelledby="amount-label" mb="3">
            {presets.map((p) => (
              <li key={p}>
                <FilterBarChip type="button" aria-pressed={preset === p} onClick={() => setPreset(p)}>
                  KES {fmt(p)}
                </FilterBarChip>
              </li>
            ))}
            <li>
              <FilterBarChip type="button" aria-pressed={preset === "other"} onClick={() => setPreset("other")}>
                Other amount
              </FilterBarChip>
            </li>
          </FilterBarChips>
        )}
        {(!usePresets || preset === "other") && (
          <Field.Root invalid={!!errors.amount} required maxW="280px">
            <Field.Label>Amount in {values.currency}</Field.Label>
            <Input
              name="amount"
              inputMode="decimal"
              value={other}
              onChange={(e) => {
                setOther(e.target.value);
                setErrors((x) => ({ ...x, amount: null }));
              }}
              {...inputProps}
            />
            {errors.amount && <Field.ErrorText>{errors.amount}</Field.ErrorText>}
          </Field.Root>
        )}
      </FilterBarRoot>

      <Box>
        <Button type="submit" variant="primary" size="lg" loading={status === "sending"} loadingText="Sending…">
          {label}
        </Button>
      </Box>
    </chakra.form>
  );
}
