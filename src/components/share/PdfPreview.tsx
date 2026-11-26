import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { Download, Eye, FileText } from "lucide-react";
import { hasPdf } from "@/lib/pdf";
import { LinkButton } from "../Button";
import { Img } from "../Img";

/**
 * The PDF actions: view it in a new tab, or download it. No embedded viewer.
 * Until a real file exists (pdfUrl "TODO"), shows a calm "coming soon" panel.
 */
export function PdfPreview({ pdfUrl, title, fileSize, image }: {
  pdfUrl: string;
  title: string;
  fileSize?: string;
  /** media slot shown behind the "coming soon" note */
  image?: string;
}) {
  if (!hasPdf(pdfUrl) && image) {
    return (
      <Box position="relative" minH={{ base: "280px", md: "360px" }} borderRadius="xl" overflow="hidden" bg="night.900" color="white">
        <Img slot={image} decorative sizes="(min-width: 1024px) 1100px, 100vw" />
        <Box position="absolute" inset="0" bg="rgba(15,10,26,0.62)" />
        <Stack position="relative" alignItems="center" justifyContent="center" textAlign="center" gap="3" minH={{ base: "280px", md: "360px" }} p="8">
          <Box color="accent.highlight" aria-hidden="true">
            <FileText size={36} strokeWidth={1.5} />
          </Box>
          <Text fontFamily="heading" fontWeight="700" fontSize="1.5rem">
            PDF coming soon
          </Text>
          <Text color="rgba(255,255,255,0.85)" maxW="40ch">
            The file for “{title}” hasn’t been uploaded yet. Check back soon, or ask us on WhatsApp.
          </Text>
        </Stack>
      </Box>
    );
  }
  if (!hasPdf(pdfUrl)) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        gap="3"
        minH="220px"
        p="8"
        borderRadius="lg"
        borderWidth="1px"
        borderStyle="dashed"
        borderColor="border.strong"
        bg="bg.warm"
      >
        <Box color="brand.fg" aria-hidden="true">
          <FileText size={32} strokeWidth={1.5} />
        </Box>
        <Text fontWeight="600">PDF coming soon</Text>
        <Text color="fg.muted" fontSize="0.9375rem" maxW="34ch">
          The file for “{title}” hasn’t been uploaded yet.
        </Text>
      </Stack>
    );
  }
  return <PdfDownload pdfUrl={pdfUrl} title={title} fileSize={fileSize} variant="primary" />;
}

/** "View PDF" (new tab) and "Download" buttons; a quiet note when the file isn't uploaded yet. */
export function PdfDownload({ pdfUrl, title, fileSize, variant = "secondary" }: { pdfUrl: string; title: string; fileSize?: string; variant?: "primary" | "secondary" }) {
  if (!hasPdf(pdfUrl)) {
    return (
      <Text fontSize="0.875rem" color="fg.muted" fontStyle="italic">
        PDF coming soon
      </Text>
    );
  }
  return (
    <HStack gap="3" flexWrap="wrap">
      <LinkButton href={pdfUrl} external variant={variant} icon={<Eye aria-hidden="true" />} aria-label={`View ${title} (PDF, opens in a new tab)`}>
        View PDF
      </LinkButton>
      <LinkButton
        href={pdfUrl}
        download
        variant="secondary"
        icon={<Download aria-hidden="true" />}
        aria-label={`Download ${title} (PDF${fileSize ? `, ${fileSize}` : ""})`}
      >
        Download{fileSize ? ` · ${fileSize}` : ""}
      </LinkButton>
    </HStack>
  );
}
