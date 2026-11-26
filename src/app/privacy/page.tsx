import { policies } from "@content/policies";
import { PolicyPage } from "@/components/a/PolicyPage";
import { pageMetadata } from "@/lib/metadata";

const policy = policies.privacy;

export const metadata = pageMetadata({ title: policy.title, description: policy.description, path: "/privacy" });

export default function PrivacyPage() {
  return <PolicyPage policy={policy} />;
}
