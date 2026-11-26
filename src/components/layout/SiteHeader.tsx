"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Accordion, Box, chakra, CloseButton, Container, Drawer, HStack, Portal, Stack, Text } from "@chakra-ui/react";
import { ChevronDown, Clock, MapPin, Menu } from "lucide-react";
import type { NavItem, NavLink } from "@content/navigation";
import { site } from "@content/site";
import { LinkButton, Button } from "../Button";
import { Logo } from "./Logo";

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

/** Slim top strip: times, place, directions. */
function TopStrip({ overlay }: { overlay: boolean }) {
  return (
    <Box
      bg={overlay ? "transparent" : "night.900"}
      color="fg.inverted"
      textStyle="small"
      borderBottomWidth="1px"
      borderColor={overlay ? "whiteAlpha.300" : "transparent"}
      transition="background-color 200ms ease-out"
    >
      <Container maxW="container" px={{ base: "5", md: "8" }}>
        <HStack h="40px" gap={{ base: "3", md: "5" }} justifyContent={{ base: "space-between", md: "flex-start" }} flexWrap="nowrap" overflow="hidden" whiteSpace="nowrap">
          <HStack gap="2">
            <Clock size={15} aria-hidden="true" />
            <span>{site.serviceTimesShort}</span>
          </HStack>
          <HStack gap="2" display={{ base: "none", sm: "flex" }}>
            <MapPin size={15} aria-hidden="true" />
            <span>Ngong Road, Nairobi</span>
          </HStack>
          <chakra.a
            href={site.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            fontWeight="600"
            textDecoration="underline"
            textUnderlineOffset="0.2em"
            color="accent.highlight"
            display="inline-flex"
            alignItems="center"
            minH="32px"
          >
            Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
          </chakra.a>
        </HStack>
      </Container>
    </Box>
  );
}

/** One link inside a grouped dropdown column (title, optional muted line). */
function DropLink({ c, pathname, onNavigate }: { c: NavLink; pathname: string; onNavigate: () => void }) {
  const active = pathname === c.href;
  return (
    <chakra.a asChild display="block" px="2" py="2" borderRadius="md" textDecoration="none" color="fg" bg={active ? "brand.subtle" : undefined} _hover={{ bg: "brand.subtle" }} _focusVisible={{ bg: "brand.subtle" }}>
      <NextLink href={c.href} aria-current={active ? "page" : undefined} onClick={onNavigate}>
        <Text as="span" display="block" fontWeight="600" fontSize="0.9375rem" lineHeight="1.35" color={active ? "brand.fg" : "fg"}>
          {c.label}
        </Text>
        {c.description && (
          <Text as="span" display="block" textStyle="small" color="fg.muted">
            {c.description}
          </Text>
        )}
      </NextLink>
    </chakra.a>
  );
}

/** Desktop disclosure-pattern dropdown (button + aria-expanded + list). */
function DesktopItem({
  item,
  pathname,
  openId,
  setOpenId,
  overlay,
}: {
  item: NavItem;
  pathname: string;
  openId: string | null;
  setOpenId: (id: string | null) => void;
  overlay: boolean;
}) {
  const active = isActive(pathname, item.href);
  const open = openId === item.label;
  const ref = useRef<HTMLLIElement>(null);
  const linkStyles = {
    display: "inline-flex",
    alignItems: "center",
    gap: "1",
    minH: "44px",
    px: { xl: "2", "2xl": "2.5" },
    whiteSpace: "nowrap" as const,
    borderRadius: "md",
    fontWeight: "600",
    fontSize: { xl: "0.875rem", "2xl": "0.9375rem" },
    color: overlay ? "fg.inverted" : active ? "brand.fg" : "fg",
    textDecoration: "none",
    position: "relative" as const,
    cursor: "pointer",
    bg: "transparent",
    _hover: { color: overlay ? "accent.highlight" : "brand.fg" },
    _after: active
      ? { content: '""', position: "absolute", left: { xl: "2", "2xl": "2.5" }, right: { xl: "2", "2xl": "2.5" }, bottom: "4px", height: "3px", borderRadius: "full", bg: "accent.highlight" }
      : undefined,
  };

  if (!item.children && !item.groups) {
    return (
      <li>
        <chakra.a asChild {...linkStyles}>
          <NextLink href={item.href} aria-current={active ? "page" : undefined}>
            {item.label}
          </NextLink>
        </chakra.a>
      </li>
    );
  }

  return (
    <chakra.li
      ref={ref}
      position="relative"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpenId(null);
          ref.current?.querySelector<HTMLButtonElement>("button")?.focus();
        }
      }}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpenId(null);
      }}
      onMouseEnter={() => setOpenId(item.label)}
      onMouseLeave={() => setOpenId(null)}
    >
      <chakra.button type="button" aria-expanded={open} aria-controls={`nav-${item.label}`} onClick={() => setOpenId(open ? null : item.label)} {...linkStyles}>
        {item.label}
        <chakra.span display="inline-flex" transition="transform 150ms ease-out" transform={open ? "rotate(180deg)" : undefined}>
          <ChevronDown size={16} aria-hidden="true" />
        </chakra.span>
      </chakra.button>
      <chakra.div
        id={`nav-${item.label}`}
        position="absolute"
        top="100%"
        left={item.groups ? undefined : "-4"}
        right={item.groups ? "-40" : undefined}
        pt="2"
        zIndex="dropdown"
        visibility={open ? "visible" : "hidden"}
        opacity={open ? 1 : 0}
        // Origin-aware: grows from its trigger (top left); exit faster than enter
        transformOrigin={item.groups ? "top center" : "top left"}
        transform={open ? "translateY(0) scale(1)" : "translateY(-4px) scale(0.97)"}
        transition={open ? "opacity 200ms cubic-bezier(0.23, 1, 0.32, 1), transform 200ms cubic-bezier(0.23, 1, 0.32, 1), visibility 0s" : "opacity 150ms cubic-bezier(0.23, 1, 0.32, 1), transform 150ms cubic-bezier(0.23, 1, 0.32, 1), visibility 0s 150ms"}
      >
        {item.groups ? (
          <chakra.div
            display="grid"
            gridTemplateColumns={`repeat(${item.groups.length}, minmax(0, 1fr))`}
            gap="2"
            p="3"
            w="min(860px, calc(100vw - 4rem))"
            bg="bg.canvas"
            borderWidth="1px"
            borderColor="border"
            borderRadius="lg"
            boxShadow="raised"
          >
            {item.groups.map((g) => (
              <chakra.div key={g.label} p="2">
                <chakra.a asChild display="block" px="2" py="2" mb="1" textStyle="eyebrow" color="brand.fg" textDecoration="none" borderRadius="md" _hover={{ textDecoration: "underline" }}>
                  <NextLink href={g.href} onClick={() => setOpenId(null)}>
                    {g.label}
                  </NextLink>
                </chakra.a>
                <chakra.ul listStyle="none" m="0" p="0">
                  {g.links.map((c) => (
                    <li key={c.href + c.label}>
                      <DropLink c={c} pathname={pathname} onNavigate={() => setOpenId(null)} />
                    </li>
                  ))}
                </chakra.ul>
              </chakra.div>
            ))}
          </chakra.div>
        ) : (
        <chakra.ul listStyle="none" m="0" p="2" minW="300px" bg="bg.canvas" borderWidth="1px" borderColor="border" borderRadius="lg" boxShadow="raised">
          {item.children?.map((c) => {
            const childActive = pathname === c.href;
            return (
              <li key={c.href}>
                <chakra.a
                  asChild
                  display="block"
                  px="4"
                  py="3"
                  borderRadius="md"
                  textDecoration="none"
                  color="fg"
                  bg={childActive ? "brand.subtle" : undefined}
                  _hover={{ bg: "brand.subtle" }}
                  _focusVisible={{ bg: "brand.subtle" }}
                >
                  <NextLink href={c.href} aria-current={childActive ? "page" : undefined} onClick={() => setOpenId(null)}>
                    <Text as="span" display="block" fontWeight="600" color={childActive ? "brand.fg" : "fg"}>
                      {c.label}
                    </Text>
                    {c.description && (
                      <Text as="span" display="block" textStyle="small" color="fg.muted">
                        {c.description}
                      </Text>
                    )}
                  </NextLink>
                </chakra.a>
              </li>
            );
          })}
        </chakra.ul>
        )}
      </chakra.div>
    </chakra.li>
  );
}

/** Full-screen mobile menu with accordions; focus trapped and restored by Drawer. */
function MobileMenu({ nav, pathname, overlay }: { nav: NavItem[]; pathname: string; overlay: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.setAttribute("data-menu-open", "");
    else document.body.removeAttribute("data-menu-open");
    return () => document.body.removeAttribute("data-menu-open");
  }, [open]);

  // Close when the route changes
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const defaultOpen = nav.filter((i) => (i.children || i.groups) && isActive(pathname, i.href)).map((i) => i.label);

  return (
    <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} size="full" placement="end">
      <Drawer.Trigger asChild>
        <Button variant={overlay ? "inverseOutline" : "secondary"} size="md" display={{ base: "inline-flex", xl: "none" }} aria-label="Open menu">
          <Menu aria-hidden="true" />
          <chakra.span display={{ base: "none", sm: "inline" }}>Menu</chakra.span>
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg="bg.canvas" display="flex" flexDirection="column">
            <Drawer.Header display="flex" alignItems="center" justifyContent="space-between" px="5" py="3" borderBottomWidth="1px" borderColor="border">
              <Drawer.Title asChild>
                <span>
                  <Logo />
                </span>
              </Drawer.Title>
              <Drawer.CloseTrigger asChild position="static">
                <CloseButton size="lg" aria-label="Close menu" />
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body px="5" py="2" flex="1" overflowY="auto">
              <nav aria-label="Main">
                <Accordion.Root multiple collapsible defaultValue={defaultOpen} variant="plain">
                  {nav.map((item) =>
                    item.children || item.groups ? (
                      <Accordion.Item key={item.label} value={item.label} borderBottomWidth="1px" borderColor="border">
                        <Accordion.ItemTrigger minH="60px" fontSize="1.25rem" fontFamily="heading" fontWeight="650" justifyContent="space-between" cursor="pointer" color="fg">
                          {item.label}
                          <Accordion.ItemIndicator>
                            <ChevronDown aria-hidden="true" />
                          </Accordion.ItemIndicator>
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent>
                          <Accordion.ItemBody pt="0" pb="3">
                            <chakra.ul listStyle="none" m="0" p="0">
                              <li>
                                <chakra.a asChild display="flex" alignItems="center" minH="48px" pl="3" fontWeight="600" color="brand.fg" textDecoration="none">
                                  <NextLink href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                                    {item.label} overview
                                  </NextLink>
                                </chakra.a>
                              </li>
                              {item.children?.map((c) => (
                                <li key={c.href}>
                                  <chakra.a
                                    asChild
                                    display="flex"
                                    alignItems="center"
                                    minH="48px"
                                    pl="3"
                                    color="fg"
                                    textDecoration="none"
                                    borderRadius="md"
                                    bg={pathname === c.href ? "brand.subtle" : undefined}
                                  >
                                    <NextLink href={c.href} aria-current={pathname === c.href ? "page" : undefined}>
                                      {c.label}
                                    </NextLink>
                                  </chakra.a>
                                </li>
                              ))}
                              {item.groups?.map((g) => (
                                <li key={g.label}>
                                  <chakra.a asChild display="flex" alignItems="center" minH="44px" pl="3" mt="2" textStyle="eyebrow" color="fg.muted" textDecoration="none">
                                    <NextLink href={g.href}>{g.label}</NextLink>
                                  </chakra.a>
                                  <chakra.ul listStyle="none" m="0" p="0">
                                    {g.links.map((c) => (
                                      <li key={c.href + c.label}>
                                        <chakra.a
                                          asChild
                                          display="flex"
                                          flexDirection="column"
                                          justifyContent="center"
                                          minH="48px"
                                          py="1.5"
                                          pl="3"
                                          color="fg"
                                          textDecoration="none"
                                          borderRadius="md"
                                          bg={pathname === c.href ? "brand.subtle" : undefined}
                                        >
                                          <NextLink href={c.href} aria-current={pathname === c.href ? "page" : undefined}>
                                            <span>{c.label}</span>
                                            {c.description && (
                                              <Text as="span" textStyle="small" color="fg.muted">
                                                {c.description}
                                              </Text>
                                            )}
                                          </NextLink>
                                        </chakra.a>
                                      </li>
                                    ))}
                                  </chakra.ul>
                                </li>
                              ))}
                            </chakra.ul>
                          </Accordion.ItemBody>
                        </Accordion.ItemContent>
                      </Accordion.Item>
                    ) : (
                      <chakra.div key={item.label} borderBottomWidth="1px" borderColor="border">
                        <chakra.a
                          asChild
                          display="flex"
                          alignItems="center"
                          minH="60px"
                          fontSize="1.25rem"
                          fontFamily="heading"
                          fontWeight="650"
                          color={isActive(pathname, item.href) ? "brand.fg" : "fg"}
                          textDecoration="none"
                        >
                          <NextLink href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                            {item.label}
                          </NextLink>
                        </chakra.a>
                      </chakra.div>
                    ),
                  )}
                </Accordion.Root>
              </nav>
            </Drawer.Body>
            <Drawer.Footer flexDirection="column" alignItems="stretch" gap="3" px="5" py="4" borderTopWidth="1px" borderColor="border" bg="bg.warm">
              <HStack gap="2" color="fg.muted" textStyle="small" justifyContent="center">
                <Clock size={16} aria-hidden="true" />
                <span>{site.serviceTimesShort} · Ngong Road</span>
              </HStack>
              <HStack gap="3">
                <LinkButton href="/new-here" variant="secondary" size="lg" flex="1">
                  New here?
                </LinkButton>
                <LinkButton href="/give" variant="primary" size="lg" flex="1">
                  Give
                </LinkButton>
              </HStack>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}

/** Inner pages whose hero is light (no dark band behind the floating bar). */
const LIGHT_HERO_PATHS = ["/about", "/about/beliefs", "/about/compass", "/about/team", "/info-desk/marriage-banns", "/about/financials", "/events", "/blog", "/publications", "/resources", "/ministries", "/watch", "/podcasts", "/give", "/new-here", "/get-involved"];
/** Sections whose detail pages also open on a light hero. */
const LIGHT_HERO_PREFIXES = ["/resources/", "/blog/", "/publications/", "/ministries/", "/new-here/", "/get-involved/"];
/** Inner pages that open on warm paper (the band matches, no seam). */
const WARM_HERO_PATHS = ["/contact"];

export function SiteHeader({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname() ?? "/";
  const [openId, setOpenId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A floating white bar, inset from the edges. At the top of the homepage it
  // sits over the full-bleed hero; on inner pages it sits on a dark band that
  // runs into the page hero. Once scrolled, only the bar floats.
  const isHome = pathname === "/";
  const atTop = !scrolled;
  // Pages that open on a light hero keep the band light too
  const warmTop = WARM_HERO_PATHS.includes(pathname);
  const lightTop = warmTop || LIGHT_HERO_PATHS.includes(pathname) || LIGHT_HERO_PREFIXES.some((x) => pathname.startsWith(x));
  const bandBg = atTop ? (isHome ? "transparent" : warmTop ? "bg.warm" : lightTop ? "bg.canvas" : "night.900") : "transparent";

  return (
    <Box as="header" position="sticky" top="0" zIndex="sticky">
      {/* No strip on the homepage: the hero already shows times and place */}
      {!isHome && <TopStrip overlay={false} />}
      <Box bg={bandBg} transition="background-color 200ms ease-out" py="3">
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <HStack
            minH={{ base: "64px", lg: "68px" }}
            justifyContent="space-between"
            gap="4"
            bg="bg.canvas"
            borderRadius="md"
            px={{ base: "3", md: "5" }}
            boxShadow={atTop ? "none" : "raised"}
            // Frosted glass once the page scrolls (motion.css), solid at the top
            data-glass={atTop ? "off" : "on"}
            borderWidth="1px"
            borderColor={atTop && !lightTop ? "transparent" : "border"}
            transition="box-shadow 200ms ease-out, background-color 200ms ease-out"
          >
            <Logo />
            <chakra.nav aria-label="Main" display={{ base: "none", xl: "block" }}>
              <chakra.ul display="flex" alignItems="center" gap={{ lg: "0", xl: "0.5" }} listStyle="none" m="0" p="0">
                {nav.map((item) => (
                  <DesktopItem key={item.label} item={item} pathname={pathname} openId={openId} setOpenId={setOpenId} overlay={false} />
                ))}
              </chakra.ul>
            </chakra.nav>
            <HStack gap="2">
              <Stack direction="row" gap="2" display={{ base: "none", xl: "flex" }}>
                <Box display={{ base: "none", "2xl": "block" }}>
                  <LinkButton href="/new-here" variant="secondary">
                    New here?
                  </LinkButton>
                </Box>
                <LinkButton href="/give" variant="primary">
                  Give
                </LinkButton>
              </Stack>
              <MobileMenu nav={nav} pathname={pathname} overlay={false} />
            </HStack>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
}
