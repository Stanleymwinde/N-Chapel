import { policies } from "@content/policies";
import { PolicyPage } from "@/components/a/PolicyPage";
import { pageMetadata } from "@/lib/metadata";

const policy = policies.safeguarding;

export const metadata = pageMetadata({ title: policy.title, description: policy.description, path: "/safeguarding" });

export default function SafeguardingPage() {
  return <PolicyPage policy={policy} />;
}
