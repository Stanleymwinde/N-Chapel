import { pageMetadata } from "@/lib/metadata";
import { SectionPage } from "@/components/library/SectionPage";

export const metadata = pageMetadata({
  title: "Family worship",
  description: "Family worship devotionals from Nairobi Chapel Ngong Road to help families pray and worship together at home.",
  path: "/resources/family-worship",
});

/** "This week" is worked out from today's date, so re-render daily */
export const revalidate = 86400;

export default function Page() {
  return <SectionPage section="family-worship" />;
}
