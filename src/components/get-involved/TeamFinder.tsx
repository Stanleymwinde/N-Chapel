"use client";

import { useMemo, useState } from "react";
import { Box, Combobox, createListCollection, Flex, Portal, Stack, Text } from "@chakra-ui/react";
import { ArrowRight, CalendarDays, ChevronDown, ChevronUp, FileText, Hash, MessageCircle, PenLine, Search, Users } from "lucide-react";
import { isTodo, site } from "@content/site";
import { LinkButton } from "../Button";
import { RichText } from "../RichText";
import { ChButton, ChLi, ChUl } from "../primitives";

type Team = { name: string; area: string; blurb: string; summary: string; when: string; code: string };

type Props = {
  teams: readonly Team[];
  areas: readonly string[];
  guide: { title: string; description: string; pdfUrl: string; fileSize?: string };
  /** id of the sign-up form on the page */
  formId: string;
  /** note under the list, e.g. a TODO to confirm the teams */
  note?: string;
};

const groupLabel = { fontSize: "0.6875rem", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "stone.500", lineHeight: "normal" } as const;

/**
 * Figma "Team finder" (441:945), three states:
 * - Default: a "Pick a team…" field, area chips with counts, and a hint.
 * - Open: the field becomes a search box over a list grouped by area.
 * - Selected: the team's detail card (what it involves, when, sign-up code)
 *   with a WhatsApp button and a link to the form.
 * Choosing a team also preselects it in the sign-up form below.
 */
export function TeamFinder({ teams, areas, guide, formId, note }: Props) {
  const [area, setArea] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const team = teams.find((t) => t.name === name);
  // the guide's pdfUrl is the bare string "TODO" until the PDF is uploaded
  const guideReady = guide.pdfUrl !== "TODO" && !isTodo(guide.pdfUrl);

  const collection = useMemo(() => {
    const q = query.trim().toLowerCase();
    const items = teams.filter((t) => (!area || t.area === area) && (!q || `${t.name} ${t.blurb} ${t.area}`.toLowerCase().includes(q)));
    return createListCollection({
      items: [...items].sort((a, b) => areas.indexOf(a.area) - areas.indexOf(b.area)),
      itemToString: (t) => t.name,
      itemToValue: (t) => t.name,
      groupBy: (t) => t.area,
    });
  }, [teams, areas, area, query]);

  const choose = (next: string) => {
    setName(next);
    setQuery("");
    if (next) window.dispatchEvent(new CustomEvent("nc:prefill", { detail: { team: next } }));
  };

  return (
    <Stack gap="5" p={{ base: "5", md: "8" }} bg="bg.canvas" borderWidth="1px" borderColor="bg.muted" borderRadius="24px" boxShadow="0 20px 24px rgba(61, 31, 107, 0.08)">
      <Flex gap="14px" alignItems="center">
        <Box display="inline-flex" p="10px" borderRadius="12px" bg="bg.tint" color="brand.fg" aria-hidden="true">
          <Users size={20} />
        </Box>
        <Stack gap="2px">
          <Text fontSize="0.71875rem" fontWeight="600" letterSpacing="0.08em" textTransform="uppercase" color="brand.fg" lineHeight="normal">
            Team finder
          </Text>
          <Text as="h3" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.25rem", md: "1.375rem" }} lineHeight="normal">
            Which team fits you?
          </Text>
        </Stack>
      </Flex>

      <Combobox.Root
        collection={collection}
        value={name ? [name] : []}
        inputValue={open ? query : name}
        onInputValueChange={(e) => open && setQuery(e.inputValue)}
        onValueChange={(e) => choose(e.value[0] ?? "")}
        onOpenChange={(e) => {
          setOpen(e.open);
          if (!e.open) setQuery("");
        }}
        openOnClick
        selectionBehavior="replace"
        positioning={{ sameWidth: true, gutter: 8 }}
      >
        <Combobox.Label fontSize="0.875rem" fontWeight="500" lineHeight="normal" mb="2">
          Choose a team
        </Combobox.Label>
        <Combobox.Control
          display="flex"
          alignItems="center"
          gap="10px"
          px="16px"
          h="52px"
          borderRadius="14px"
          borderWidth={open ? "2px" : "1px"}
          borderColor={open ? "brand.solid" : "border"}
          bg={open ? "bg.canvas" : "#FBFAFC"}
          boxShadow={open ? "0 0 0 4px rgba(91, 42, 158, 0.16)" : undefined}
          transition="border-color 150ms ease-out, box-shadow 150ms ease-out"
        >
          <Box display="inline-flex" color="fg.muted" flexShrink={0} aria-hidden="true">
            {open ? <Search size={18} /> : <Users size={18} />}
          </Box>
          <Combobox.Input
            flex="1"
            minW="0"
            h="full"
            p="0"
            border="0"
            bg="transparent"
            outline="none"
            fontSize="1rem"
            fontWeight={open ? "400" : "500"}
            color="fg"
            placeholder={open ? "Search teams" : "Pick a team…"}
            css={{ "&::placeholder": { color: open ? "stone.500" : "fg" } }}
          />
          {team && !open && (
            <Text as="span" flexShrink={0} px="10px" py="1" borderRadius="full" bg="bg.tint" color="brand.fg" fontSize="0.71875rem" fontWeight="600" lineHeight="normal">
              {team.area}
            </Text>
          )}
          <Combobox.Trigger aria-label="Show teams" display="inline-flex" color="fg" bg="transparent" border="0" p="0" cursor="pointer">
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Combobox.Trigger>
        </Combobox.Control>
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content bg="bg.canvas" borderWidth="1px" borderColor="border" borderRadius="16px" boxShadow="0 14px 32px rgba(28, 23, 38, 0.12)" py="2" maxH="min(580px, 70vh)" overflowY="auto">
              <Combobox.Empty px="18px" py="3" fontSize="0.875rem" color="fg.muted">
                No team matches that. Try another word.
              </Combobox.Empty>
              {collection.group().map(([group, items]) => (
                <Combobox.ItemGroup key={group}>
                  <Combobox.ItemGroupLabel px="18px" pt="3" pb="6px" {...groupLabel}>
                    {group}
                  </Combobox.ItemGroupLabel>
                  {items.map((t) => (
                    <Combobox.Item
                      key={t.name}
                      item={t}
                      display="flex"
                      alignItems="center"
                      gap="3"
                      px="18px"
                      py="10px"
                      borderRadius="0"
                      cursor="pointer"
                      _highlighted={{ bg: "bg.tint" }}
                      css={{ "&[data-highlighted] .team-name": { color: "var(--chakra-colors-brand-fg)" }, "&[data-highlighted] .team-arrow": { opacity: 1 } }}
                    >
                      <Stack gap="1px" flex="1" minW="0">
                        <Combobox.ItemText className="team-name" fontWeight="600" fontSize="0.9375rem" lineHeight="normal" color="fg">
                          {t.name}
                        </Combobox.ItemText>
                        <Text fontSize="0.8125rem" color="fg.muted" lineHeight="normal">
                          {t.blurb}
                        </Text>
                      </Stack>
                      <Box className="team-arrow" display="inline-flex" color="brand.fg" opacity={0} aria-hidden="true">
                        <ArrowRight size={16} />
                      </Box>
                    </Combobox.Item>
                  ))}
                </Combobox.ItemGroup>
              ))}
              {note && (
                <Box px="18px" pt="10px" pb="6px" fontSize="0.75rem" color="stone.500">
                  <RichText text={note} />
                </Box>
              )}
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>

      <Box aria-live="polite" display="contents">
        {team ? (
          <Stack key={team.name} data-anim="rise" gap="4" p="22px" bg="bg.warm" borderRadius="18px">
            <Stack gap="6px">
              <Text fontFamily="heading" fontWeight="700" fontSize="1.5rem" lineHeight="normal">
                {team.name}
              </Text>
              <Text fontSize="0.9375rem" lineHeight="1.55" color="ink.700">
                <RichText text={team.summary} />
              </Text>
            </Stack>
            <Box display="grid" gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap="3">
              {[
                { icon: <CalendarDays size={16} />, label: "When", value: team.when },
                { icon: <Hash size={16} />, label: "Sign-up code", value: team.code },
              ].map((f) => (
                <Flex key={f.label} gap="3" alignItems="center" p="14px" bg="bg.canvas" borderRadius="14px" minW="0">
                  <Box display="inline-flex" p="2" borderRadius="10px" bg="bg.tint" color="brand.fg" flexShrink={0} aria-hidden="true">
                    {f.icon}
                  </Box>
                  <Stack gap="2px" minW="0">
                    <Text fontSize="0.65625rem" fontWeight="600" letterSpacing="0.08em" textTransform="uppercase" color="stone.500" lineHeight="normal">
                      {f.label}
                    </Text>
                    <Text fontSize="0.875rem" fontWeight="500" lineHeight="normal">
                      <RichText text={f.value} />
                    </Text>
                  </Stack>
                </Flex>
              ))}
            </Box>
            <Flex gap="4" alignItems="center" flexWrap="wrap">
              <LinkButton href={site.whatsapp.url} icon={<MessageCircle aria-hidden="true" />} fontWeight="600">
                WhatsApp us to join
              </LinkButton>
              <LinkButton href={`#${formId}`} variant="link" fontSize="0.9375rem" fontWeight="600">
                Or use the form
              </LinkButton>
            </Flex>
          </Stack>
        ) : (
          <>
            <ChUl role="group" aria-label="Filter teams by area" listStyle="none" m="0" p="0" display="flex" flexWrap="wrap" gap="2">
              {areas.map((a) => {
                const count = teams.filter((t) => t.area === a).length;
                const active = area === a;
                return (
                  <ChLi key={a}>
                    <ChButton
                      type="button"
                      aria-pressed={active}
                      onClick={() => setArea(active ? null : a)}
                      display="inline-flex"
                      alignItems="center"
                      gap="6px"
                      px="14px"
                      py="7px"
                      minH="34px"
                      borderRadius="full"
                      borderWidth="1px"
                      borderColor={active ? "brand.solid" : "border"}
                      bg={active ? "brand.solid" : "transparent"}
                      color={active ? "brand.contrast" : "fg"}
                      fontSize="0.8125rem"
                      fontWeight="500"
                      cursor="pointer"
                      transition="background-color 150ms ease-out, border-color 150ms ease-out"
                      _hover={{ borderColor: "brand.solid" }}
                      _focusVisible={{ outline: "3px solid", outlineColor: "brand.solid", outlineOffset: "2px" }}
                    >
                      {a}
                      <Text as="span" fontSize="0.75rem" fontWeight="600" color={active ? "purple.100" : "stone.500"}>
                        {count}
                        <span className="sr-only"> teams</span>
                      </Text>
                    </ChButton>
                  </ChLi>
                );
              })}
            </ChUl>
            <Flex gap="3" alignItems="center" bg="bg.warm" borderRadius="16px" px="18px" py="4">
              <Box color="brand.fg" display="inline-flex" flexShrink={0} aria-hidden="true">
                <PenLine size={18} />
              </Box>
              <Text fontSize="0.90625rem" lineHeight="1.5" color="ink.700">
                {area ? `Showing ${area.toLowerCase()} teams. ` : ""}Pick a team to see what it involves and the code you&apos;ll need to sign up.
              </Text>
            </Flex>
          </>
        )}
      </Box>

      <Flex gap="3" alignItems="center" pt="18px" borderTopWidth="1px" borderColor="bg.muted">
        <Box display="inline-flex" p="2" borderRadius="10px" bg="accent.subtle" color="fg" flexShrink={0} aria-hidden="true">
          <FileText size={18} />
        </Box>
        <Stack gap="1px" minW="0">
          {guideReady ? (
            <a href={guide.pdfUrl} download>
              <Text as="span" fontWeight="600" fontSize="0.875rem" lineHeight="normal" textDecoration="underline" textUnderlineOffset="0.2em">
                {guide.title}
              </Text>
            </a>
          ) : (
            <Text fontWeight="600" fontSize="0.875rem" lineHeight="normal">
              {guide.title}
            </Text>
          )}
          <Text fontSize="0.8125rem" color="fg.muted" lineHeight="normal">
            {guide.description} · {guideReady ? `PDF${guide.fileSize ? `, ${guide.fileSize}` : ""}` : "PDF coming soon"}
          </Text>
        </Stack>
      </Flex>
    </Stack>
  );
}
