import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Jost, Plus_Jakarta_Sans } from "next/font/google";
import { Box } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { buildMainNav } from "@content/navigation";
import { getPosts, getPublications } from "@/lib/cms";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SkipLink } from "@/components/layout/SkipLink";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
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

/** Pages refresh their Craft content in the background at most every 5 minutes. */
export const revalidate = 300;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const mainNav = buildMainNav(await getPosts(), await getPublications());
  return (
    <html lang="en-KE" className={`${jost.variable} ${jakarta.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Provider>
          <SkipLink />
          <SiteHeader nav={mainNav} />
          <Box as="main" id="main">
            {/* Route changes animate the page body (see motion.css); the header and footer stay still */}
            <ViewTransition default="page">{children}</ViewTransition>
          </Box>
          <SiteFooter />
          <ScrollReveal />
          <WhatsAppButton />
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
