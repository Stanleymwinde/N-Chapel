import { pageMetadata } from "@/lib/metadata";
import { SectionPage } from "@/components/library/SectionPage";

export const metadata = pageMetadata({
  title: "Bible studies",
  description: "Bible studies from Nairobi Chapel Ngong Road: weekly study guides for personal devotion and eGroups. Read online or download free.",
  path: "/resources/bible-studies",
});

/** "This week" is worked out from today's date, so re-render daily */
export const revalidate = 86400;

export default function Page() {
  return <SectionPage section="bible-study" />;
}
