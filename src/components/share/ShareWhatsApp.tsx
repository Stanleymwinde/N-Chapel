import { MessageCircle } from "lucide-react";
import { site } from "@content/site";
import { LinkButton } from "../Button";

/**
 * "Share on WhatsApp" for detail pages (resources, posts, publications).
 * Opens WhatsApp with the title and the page's full URL; the page's Open
 * Graph tags give the link its preview card.
 */
export function ShareWhatsApp({ title, path, variant = "secondary" }: { title: string; path: string; variant?: "secondary" | "primary" }) {
  const url = `${site.url}${path}`;
  const href = `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`;
  return (
    <LinkButton href={href} variant={variant} icon={<MessageCircle aria-hidden="true" />} aria-label={`Share “${title}” on WhatsApp (opens WhatsApp)`}>
      Share on WhatsApp
    </LinkButton>
  );
}
