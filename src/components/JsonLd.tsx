import { site } from "@content/site";
import { plainText } from "./RichText";

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** Church JSON-LD for the homepage and contact page. TODO values are omitted, not invented. */
export function churchJsonLd() {
  const sameAs = site.socials.map((s) => s.url).filter((u) => !u.startsWith("[TODO"));
  const street = plainText(site.address.street);
  return {
    "@context": "https://schema.org",
    "@type": "Church",
    name: site.name,
    url: site.url,
    telephone: site.phone.tel,
    email: site.email,
    hasMap: site.mapUrl,
    address: {
      "@type": "PostalAddress",
      ...(street ? { streetAddress: street } : {}),
      addressLocality: "Nairobi",
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    ...(site.address.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: site.address.geo.latitude, longitude: site.address.geo.longitude } }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.googleRating.rating,
      reviewCount: site.googleRating.count,
    },
    openingHoursSpecification: site.services.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "https://schema.org/Sunday",
      opens: s.iso,
    })),
    event: site.services.map((s) => ({
      "@type": "Event",
      name: `Sunday service ${s.time}`,
      eventSchedule: {
        "@type": "Schedule",
        repeatFrequency: "P1W",
        byDay: "https://schema.org/Sunday",
        startTime: s.iso,
        scheduleTimezone: "Africa/Nairobi",
      },
      location: { "@type": "Place", name: site.name, address: "Ngong Road, Nairobi, Kenya" },
    })),
  };
}
