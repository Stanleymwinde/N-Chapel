import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Jost, Plus_Jakarta_Sans } from "next/font/google";
import { Box } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { mainNav } from "@content/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SkipLink } from "@/components/layout/SkipLink";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { PageTransition } from "@/components/layout/PageTransition";
import { site } from "@content/site";
import "./motion.css";

/** Geometric heading face (in the spirit of the LIFE Church benchmark). */
const jost = Jost({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Sundays 9:00 & 11:30 AM`,
    template: `%s | ${site.name}`,
  },
  description: `${site.missionLine} Join us on Sundays at 9:00 and 11:30 AM on Ngong Road, Nairobi, or watch live online.`,
  applicationName: site.name,
  openGraph: { siteName: site.name, locale: "en_KE", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#5B2A9E",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-KE" className={`${jost.variable} ${jakarta.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Provider>
          <SkipLink />
          <SiteHeader nav={mainNav} />
          <Box as="main" id="main">
            {/* Route changes animate the page body (see motion.css); the header and footer stay still.
                Link clicks run the Dawn Light overlay instead ("dawn" transition type), so the body doesn’t also fade. */}
            <ViewTransition default={{ dawn: "none", default: "page" }}>{children}</ViewTransition>
          </Box>
          <SiteFooter />
          <ScrollReveal />
          <WhatsAppButton />
          <Toaster />
        </Provider>
        <PageTransition />
      </body>
    </html>
  );
}
