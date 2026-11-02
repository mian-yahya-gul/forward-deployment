import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

import { AgencySection } from "@/components/sections/AgencySection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { Hero } from "@/components/sections/Hero";
import { HomeFaqSection } from "@/components/sections/HomeFaqSection";
import { MarketsStrip } from "@/components/sections/MarketsStrip";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { MethodologySection } from "@/components/sections/MethodologySection";
import { OffersSection } from "@/components/sections/OffersSection";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { PriorityIndustriesSection } from "@/components/sections/PriorityIndustriesSection";

export const metadata: Metadata = buildMetadata({
  title: "AI Workflow Automation & Custom Software — DeosAI Labs",
  description:
    "We automate business workflows, build custom software and integrate AI into the systems you already use. White-label engineering for agencies. Serving the UAE, Saudi Arabia, UK, USA and Pakistan.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <OffersSection />
      <PortfolioPreview />
      <PriorityIndustriesSection />
      <AgencySection />
      <MethodologySection />
      <InsightsSection />
      <MarketsStrip />
      <HomeFaqSection />
      <FinalCTASection />
    </>
  );
}
