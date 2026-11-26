import { pageMetadata } from "@/lib/metadata";
import { SectionPage } from "@/components/library/SectionPage";

export const metadata = pageMetadata({
  title: "Bible studies",
  description: "Bible studies from Nairobi Chapel Ngong Road: weekly study guides for personal devotion and eGroups. Read online or download free.",
  path: "/resources/bible-studies",
});

export default function Page() {
  return <SectionPage section="bible-study" />;
}
