import { pageMetadata } from "@/lib/metadata";
import { LibraryPage } from "@/components/library/SectionPage";

export const metadata = pageMetadata({
  title: "Resource Library",
  description:
    "Bible studies, prayer and fasting guides, family worship and Quest Kids crafts from Nairobi Chapel Ngong Road. Read online or download free.",
  path: "/resources",
});

/** "This week" is worked out from today's date, so re-render daily */
export const revalidate = 86400;

export default function ResourcesPage() {
  return <LibraryPage />;
}
