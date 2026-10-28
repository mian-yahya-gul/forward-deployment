import type { Metadata } from "next";

import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { Hero } from "@/components/sections/Hero";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { MethodologySection } from "@/components/sections/MethodologySection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TransformationStoriesSection } from "@/components/sections/TransformationStoriesSection";

// Title and description come from the root layout; only the canonical is page-specific.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <MethodologySection />
      <ServicesSection />
      <IndustriesSection />
      <TransformationStoriesSection />
      <InsightsSection />
      <TestimonialsSection />
      <FinalCTASection />
    </>
  );
}
