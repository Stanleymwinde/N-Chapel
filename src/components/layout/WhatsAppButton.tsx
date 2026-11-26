
import { MessageCircle } from "lucide-react";
import { site } from "@content/site";
import { ChA, ChSpan } from "@/components/primitives";

/**
 * The one floating WhatsApp button. No fake unread badge. Hidden while the
 * mobile menu is open (body[data-menu-open], see theme globalCss).
 */
export function WhatsAppButton() {
  return (
    <ChA
      data-whatsapp-fab=""
      href={site.whatsapp.url}
      aria-label="Chat on WhatsApp (opens WhatsApp in a new tab)"
      target="_blank"
      rel="noopener noreferrer"
      position="fixed"
      right={{ base: "4", md: "6" }}
      bottom={{ base: "4", md: "6" }}
      zIndex="banner"
      display="inline-flex"
      alignItems="center"
      gap="2"
      minH="52px"
      px={{ base: "0", sm: "5" }}
      minW="52px"
      justifyContent="center"
      borderRadius="full"
      bg="whatsapp.600"
      color="white"
      fontWeight="600"
      textDecoration="none"
      boxShadow="raised"
      transition="background-color 150ms ease-out"
      _hover={{ bg: "whatsapp.700" }}
      css={{ "@media print": { display: "none" } }}
    >
      <MessageCircle size={22} aria-hidden="true" />
      <ChSpan display={{ base: "none", sm: "inline" }}>Chat on WhatsApp</ChSpan>
    </ChA>
  );
}
