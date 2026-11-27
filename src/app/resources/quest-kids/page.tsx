import { pageMetadata } from "@/lib/metadata";
import { SectionPage } from "@/components/library/SectionPage";

export const metadata = pageMetadata({
  title: "Quest Kids",
  description: "Quest Kids weekly craft guides from Nairobi Chapel Ngong Road, to go with what children are learning at Quest.",
  path: "/resources/quest-kids",
});

/** "This week" is worked out from today's date, so re-render daily */
export const revalidate = 86400;

export default function Page() {
  return <SectionPage section="quest-kids" />;
}
