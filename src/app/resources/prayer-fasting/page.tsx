import { pageMetadata } from "@/lib/metadata";
import { SectionPage } from "@/components/library/SectionPage";

export const metadata = pageMetadata({
  title: "Prayer & fasting",
  description: "Prayer and fasting guides from Nairobi Chapel Ngong Road for adults, youth, children and families.",
  path: "/resources/prayer-fasting",
});

export default function Page() {
  return <SectionPage section="prayer-fasting" />;
}
