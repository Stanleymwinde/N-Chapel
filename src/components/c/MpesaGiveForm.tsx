"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Button, chakra, Grid, Heading, HStack, Input, Stack, Text } from "@chakra-ui/react";
import { CheckCircle2, CircleAlert, Smartphone } from "lucide-react";
import { GIVING_REASONS, MAX_AMOUNT, MIN_AMOUNT, type ReasonId } from "@content/give";

const PRESETS = [500, 1000, 5000];
const fmt = (n: number) => n.toLocaleString("en-KE");
const PHONE_RE = /^(?:\+?254|0)?[17]\d{8}$/;
const ease = "cubic-bezier(0.23, 1, 0.32, 1)";

type Phase =
  | { kind: "form" }
  | { kind: "sending" }
  | { kind: "waiting"; checkoutId: string }
  | { kind: "success" }
  | { kind: "ended"; title: string; message: string };

/** A choice that looks like a card but is a real radio input (keyboard and screen reader friendly). */
function Choice({ name, value, checked, onChange, children }: { name: string; value: string; checked: boolean; onChange: () => void; children: React.ReactNode }) {
  return (
    <chakra.label
      position="relative"
      display="flex"
      alignItems="center"
      minH="12"
      px="4"
      py="2.5"
      borderRadius="lg"
      borderWidth="1.5px"
      borderColor={checked ? "brand.solid" : "border"}
      bg={checked ? "brand.subtle" : "bg.canvas"}
      color="fg"
      fontWeight="600"
      cursor="pointer"
      transition={`border-color 150ms ease, background-color 150ms ease, transform 160ms ${ease}`}
      _active={{ transform: "scale(0.97)" }}
      css={{
        "@media (hover: hover) and (pointer: fine)": { "&:hover": { borderColor: checked ? undefined : "var(--chakra-colors-border-strong)" } },
        "&:has(input:focus-visible)": { outline: "3px solid var(--chakra-colors-brand-solid)", outlineOffset: "2px" },
      }}
    >
      <chakra.input type="radio" name={name} value={value} checked={checked} onChange={onChange} position="absolute" opacity="0" w="1px" h="1px" />
      {children}
    </chakra.label>
  );
}

export function MpesaGiveForm({ paybill }: { paybill: string }) {
  const [reason, setReason] = useState<ReasonId | "">("");
  const [preset, setPreset] = useState<number | "other">(1000);
  const [other, setOther] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>({ kind: "form" });
  const formRef = useRef<HTMLFormElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const amount = preset === "other" ? Number(other.replace(/[,\s]/g, "")) : preset;
  const reasonLabel = GIVING_REASONS.find((r) => r.id === reason)?.label ?? "";
  const reasonRef = GIVING_REASONS.find((r) => r.id === reason)?.ref ?? "";

  // A link such as /give?reason=ppi-bible#mpesa preselects the reason
  useEffect(() => {
    const r = new URLSearchParams(window.location.search).get("reason");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the URL must happen after hydration
    if (r && GIVING_REASONS.some((x) => x.id === r)) setReason(r as ReasonId);
  }, []);

  // While waiting, ask the server how the prompt ended: first after 6s, then every 4s, for up to 2 minutes
  useEffect(() => {
    if (phase.kind !== "waiting") return;
    let stop = false;
    const started = Date.now();
    let timer: ReturnType<typeof setTimeout>;
    const check = async () => {
      if (stop) return;
      if (Date.now() - started > 120_000) {
        setPhase({ kind: "ended", title: "We didn't hear back from M-Pesa", message: "If you entered your PIN, you'll get an M-Pesa SMS confirming your gift. If not, please try again." });
        return;
      }
      try {
        const res = await fetch(`/api/give/mpesa/status?id=${encodeURIComponent(phase.checkoutId)}`, { cache: "no-store" });
        const data = (await res.json()) as { state?: string; message?: string };
        if (stop) return;
        if (data.state === "success") return setPhase({ kind: "success" });
        if (data.state === "cancelled") return setPhase({ kind: "ended", title: "The prompt was cancelled", message: "No money was taken. You can send the prompt again." });
        if (data.state === "timeout") return setPhase({ kind: "ended", title: "The prompt timed out", message: "Your phone didn't respond in time, so no money was taken. Please try again." });
        if (data.state === "failed") return setPhase({ kind: "ended", title: "The payment didn't go through", message: data.message || "No money was taken. Please try again." });
      } catch {
        // network hiccup: keep waiting
      }
      timer = setTimeout(check, 4000);
    };
    timer = setTimeout(check, 6000);
    return () => {
      stop = true;
      clearTimeout(timer);
    };
  }, [phase]);

  // Move focus to the status panel when the form gives way to it
  useEffect(() => {
    if (phase.kind !== "form" && phase.kind !== "sending") panelRef.current?.focus();
  }, [phase.kind]);

  function validate() {
    const e: Record<string, string> = {};
    if (!reason) e.reason = "Please choose what you're giving towards.";
    if (!Number.isInteger(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) e.amount = `Please enter a whole amount between KSh ${MIN_AMOUNT} and KSh ${fmt(MAX_AMOUNT)}.`;
    if (!PHONE_RE.test(phone.replace(/[\s-]/g, ""))) e.phone = "Please enter a Safaricom number like 0712 345 678.";
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
    return !first;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setNotice(null);
    if (!validate()) return;
    setPhase({ kind: "sending" });
    try {
      const res = await fetch("/api/give/mpesa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason, amount, phone }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; checkoutId?: string; error?: string; errors?: Record<string, string> };
      if (res.ok && data.checkoutId) return setPhase({ kind: "waiting", checkoutId: data.checkoutId });
      setPhase({ kind: "form" });
      if (data.errors) return setErrors(data.errors);
      setNotice(
        data.error === "not-configured"
          ? `Giving from this page is still being set up. For now, please use Paybill ${paybill} below, with “${reasonRef}” as the account.`
          : (data.error ?? "Something went wrong. Please try again, or use the Paybill below."),
      );
    } catch {
      setPhase({ kind: "form" });
      setNotice("We couldn't reach the server. Check your connection and try again, or use the Paybill below.");
    }
  }

  const reset = () => setPhase({ kind: "form" });

  /* ---- After sending: one calm panel that answers "what now?" ---- */
  if (phase.kind === "waiting" || phase.kind === "success" || phase.kind === "ended") {
    const ok = phase.kind === "success";
    const waiting = phase.kind === "waiting";
    return (
      <Stack ref={panelRef} tabIndex={-1} role="status" aria-live="polite" gap="5" alignItems="center" textAlign="center" p={{ base: "6", md: "8" }} bg="bg.warm" borderRadius="lg" outline="none">
        <Box
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          w="16"
          h="16"
          borderRadius="full"
          bg={ok ? "green.100" : waiting ? "accent.subtle" : "accent.subtle"}
          color={ok ? "green.700" : "ink.900"}
          aria-hidden="true"
          css={
            waiting
              ? {
                  "@media (prefers-reduced-motion: no-preference)": { animation: "pulseRing 1.6s ease-in-out infinite" },
                }
              : undefined
          }
        >
          {ok ? <CheckCircle2 size={32} /> : waiting ? <Smartphone size={30} /> : <CircleAlert size={30} />}
        </Box>
        <Stack gap="2" maxW="26rem">
          <Heading as="h4" fontFamily="heading" fontWeight="600" fontSize="1.5rem">
            {waiting ? "Check your phone" : ok ? "Thank you for your gift" : phase.title}
          </Heading>
          <Text lineHeight="1.65">
            {waiting && (
              <>
                Enter your M-Pesa PIN to give <strong>KSh {fmt(amount)}</strong> to Nairobi Chapel for <strong>{reasonLabel}</strong>. This page will update when you&apos;re done.
              </>
            )}
            {ok && (
              <>
                Your gift of <strong>KSh {fmt(amount)}</strong> for <strong>{reasonLabel}</strong> was received. M-Pesa will send you a confirmation SMS.
              </>
            )}
            {phase.kind === "ended" && phase.message}
          </Text>
        </Stack>
        {!waiting && (
          <Button type="button" variant={ok ? "secondary" : "primary"} onClick={reset}>
            {ok ? "Give again" : "Try again"}
          </Button>
        )}
        {waiting && (
          <Button type="button" variant="link" onClick={reset}>
            Start over
          </Button>
        )}
      </Stack>
    );
  }

  /* ---- The form ---- */
  const errorText = (k: string) =>
    errors[k] ? (
      <Text id={`${k}-error`} mt="2" fontSize="0.9375rem" fontWeight="600" color="red.700">
        {errors[k]}
      </Text>
    ) : null;

  return (
    <chakra.form ref={formRef} onSubmit={onSubmit} noValidate display="grid" gap="6">
      <chakra.fieldset border="0" m="0" p="0" minW="0">
        <chakra.legend fontWeight="700" mb="3">
          I&apos;m giving towards
        </chakra.legend>
        <Grid templateColumns={{ base: "1fr 1fr", sm: "repeat(3, minmax(0, 1fr))" }} gap="2.5" data-field="reason" tabIndex={-1} outline="none" aria-describedby={errors.reason ? "reason-error" : undefined}>
          {GIVING_REASONS.map((r) => (
            <Choice key={r.id} name="reason" value={r.id} checked={reason === r.id} onChange={() => (setReason(r.id), setErrors((e) => ({ ...e, reason: "" })))}>
              {r.label}
            </Choice>
          ))}
        </Grid>
        {errorText("reason")}
      </chakra.fieldset>

      <chakra.fieldset border="0" m="0" p="0" minW="0">
        <chakra.legend fontWeight="700" mb="3">
          Amount (KSh)
        </chakra.legend>
        <Grid templateColumns="repeat(4, minmax(0, 1fr))" gap="2.5">
          {PRESETS.map((p) => (
            <Choice key={p} name="preset" value={String(p)} checked={preset === p} onChange={() => (setPreset(p), setErrors((e) => ({ ...e, amount: "" })))}>
              <Box as="span" w="full" textAlign="center">
                {fmt(p)}
              </Box>
            </Choice>
          ))}
          <Choice name="preset" value="other" checked={preset === "other"} onChange={() => setPreset("other")}>
            <Box as="span" w="full" textAlign="center">
              Other
            </Box>
          </Choice>
        </Grid>
        {preset === "other" && (
          <Box mt="3">
            <chakra.label htmlFor="give-other" className="sr-only">
              Other amount in KSh
            </chakra.label>
            <HStack gap="0" borderWidth="1.5px" borderColor={errors.amount ? "red.600" : "border.strong"} borderRadius="lg" overflow="hidden" _focusWithin={{ borderColor: "brand.solid" }}>
              <Text as="span" px="4" fontWeight="700" color="fg.muted" aria-hidden="true">
                KSh
              </Text>
              <Input
                id="give-other"
                data-field="amount"
                inputMode="numeric"
                autoComplete="off"
                placeholder="2,500"
                value={other}
                onChange={(e) => (setOther(e.target.value), setErrors((x) => ({ ...x, amount: "" })))}
                border="0"
                h="12"
                fontSize="1.125rem"
                fontWeight="600"
                _focusVisible={{ outline: "none" }}
                aria-invalid={Boolean(errors.amount)}
                aria-describedby={errors.amount ? "amount-error" : undefined}
              />
            </HStack>
          </Box>
        )}
        {errorText("amount")}
      </chakra.fieldset>

      <Box>
        <chakra.label htmlFor="give-phone" display="block" fontWeight="700" mb="1">
          M-Pesa phone number
        </chakra.label>
        <Text id="phone-hint" fontSize="0.9375rem" color="fg.muted" mb="3">
          We&apos;ll send the M-Pesa prompt to this phone.
        </Text>
        <Input
          id="give-phone"
          data-field="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="0712 345 678"
          value={phone}
          onChange={(e) => (setPhone(e.target.value), setErrors((x) => ({ ...x, phone: "" })))}
          h="12"
          fontSize="1.125rem"
          fontWeight="600"
          borderWidth="1.5px"
          borderColor={errors.phone ? "red.600" : "border.strong"}
          borderRadius="lg"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-hint phone-error" : "phone-hint"}
        />
        {errorText("phone")}
      </Box>

      {notice && (
        <Box role="alert" p="4" borderRadius="lg" bg="accent.subtle" fontWeight="600" lineHeight="1.55">
          {notice}
        </Box>
      )}

      <Button type="submit" size="lg" w="full" loading={phase.kind === "sending"} loadingText="Sending prompt…">
        Send M-Pesa prompt{Number.isInteger(amount) && amount >= MIN_AMOUNT ? ` · KSh ${fmt(amount)}` : ""}
      </Button>
    </chakra.form>
  );
}
