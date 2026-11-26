import { pageMetadata } from "@/lib/metadata";
import { SectionPage } from "@/components/library/SectionPage";

export const metadata = pageMetadata({
  title: "Family worship",
  description: "Family worship devotionals from Nairobi Chapel Ngong Road to help families pray and worship together at home.",
  path: "/resources/family-worship",
});

export default function Page() {
  return <SectionPage section="family-worship" />;
}
