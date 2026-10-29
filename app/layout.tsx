import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { JsonLd } from "@/components/seo/JsonLd";
import { CookieConsent } from "@/components/shared/CookieConsent";
import { footerContact, footerSocial } from "@/lib/data/footer";
import { services } from "@/lib/data/services";
import { siteRegions, siteUrl } from "@/lib/data/site";
import { ORGANIZATION_ID, areaServedSchema } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "DeosAI Labs partners with organizations to design, deploy, and continuously improve production-grade AI systems that integrate into existing business operations.";

// Optional Search Console / Bing Webmaster verification tags. Set GOOGLE_SITE_VERIFICATION and
// BING_SITE_VERIFICATION in the hosting environment; nothing is rendered when they are unset.
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.BING_SITE_VERIFICATION;

const GA_MEASUREMENT_ID = "G-DM1BC6WC8T";

// UK, EEA and Switzerland: analytics storage stays off until the visitor accepts (see CookieConsent).
const CONSENT_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU",
  "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH",
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "DeosAI Labs",
  robots: {
    index: true,
    follow: true,
    // Allow full-length snippets and large previews (used by search and AI answer features).
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  ...(googleVerification || bingVerification
    ? {
        verification: {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
        },
      }
    : {}),
  title: {
    default: "DeosAI Labs — AI Forward Deployment Partner",
    template: "%s",
  },
  description,
  openGraph: {
    type: "website",
    siteName: "DeosAI Labs",
    title: "DeosAI Labs — AI Forward Deployment Partner",
    description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeosAI Labs — AI Forward Deployment Partner",
    description,
  },
};

// Sitewide entities. Every fact here already appears on the site (footer, services, about).
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "DeosAI Labs",
    alternateName: "DeosAi Labs",
    url: siteUrl,
    logo: `${siteUrl}/logo/wordmark-light.png`,
    email: footerContact.email,
    description,
    slogan: "Production-grade AI, deployed inside how your business already runs.",
    knowsAbout: services.map((service) => service.title),
    sameAs: footerSocial.map((link) => link.href),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteRegions.base.locality,
      addressCountry: siteRegions.base.countryCode,
    },
    areaServed: areaServedSchema(),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: footerContact.email,
      availableLanguage: ["English"],
      areaServed: areaServedSchema(),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "DeosAI Labs",
    url: siteUrl,
    inLanguage: "en-US",
    publisher: { "@id": ORGANIZATION_ID },
  },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-US"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var consent = null;
try { consent = localStorage.getItem('deosai-analytics-consent'); } catch (e) {}
gtag('consent', 'default', {
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  analytics_storage: consent === 'granted' ? 'granted' : 'denied',
  region: ${JSON.stringify(CONSENT_REGIONS)}
});
gtag('consent', 'default', {
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  analytics_storage: consent === 'denied' ? 'denied' : 'granted'
});
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <JsonLd data={structuredData} />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
