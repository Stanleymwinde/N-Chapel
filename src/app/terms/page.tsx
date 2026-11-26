import { policies } from "@content/policies";
import { PolicyPage } from "@/components/a/PolicyPage";
import { pageMetadata } from "@/lib/metadata";

const policy = policies.terms;

export const metadata = pageMetadata({ title: policy.title, description: policy.description, path: "/terms" });

export default function TermsPage() {
  return <PolicyPage policy={policy} />;
}
