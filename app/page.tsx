import type { Metadata } from "next";

import { AgencySection } from "@/components/sections/AgencySection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { Hero } from "@/components/sections/Hero";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { MethodologySection } from "@/components/sections/MethodologySection";
import { OffersSection } from "@/components/sections/OffersSection";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { PriorityIndustriesSection } from "@/components/sections/PriorityIndustriesSection";

// Title and description come from the root layout; only the canonical is page-specific.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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
      <FinalCTASection />
    </>
  );
}
