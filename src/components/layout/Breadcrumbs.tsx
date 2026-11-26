import NextLink from "next/link";

import { ChevronRight } from "lucide-react";
import { site } from "@content/site";
import { ChA, ChLi, ChNav, ChOl, ChSpan } from "@/components/primitives";

export type Crumb = { label: string; href?: string };

/** Breadcrumb trail (+ BreadcrumbList JSON-LD). Last item is the current page. */
export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  const all: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  const color = tone === "dark" ? "fg.inverted" : "fg.muted";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };
  return (
    <ChNav aria-label="Breadcrumb" textStyle="small" color={color}>
      <ChOl display="flex" flexWrap="wrap" alignItems="center" gap="1" listStyle="none" m="0" p="0">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <ChLi key={`${c.label}-${i}`} display="inline-flex" alignItems="center" gap="1">
              {last || !c.href ? (
                <ChSpan aria-current={last ? "page" : undefined} fontWeight="600">
                  {c.label}
                </ChSpan>
              ) : (
                <>
                  <ChA asChild textDecoration="underline" textUnderlineOffset="0.2em" _hover={{ textDecorationThickness: "2px" }}>
                    <NextLink href={c.href}>{c.label}</NextLink>
                  </ChA>
                  <ChevronRight size={14} aria-hidden="true" />
                </>
              )}
            </ChLi>
          );
        })}
      </ChOl>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </ChNav>
  );
}
