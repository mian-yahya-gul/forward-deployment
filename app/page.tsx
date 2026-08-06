import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { Hero } from "@/components/sections/Hero";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { MethodologySection } from "@/components/sections/MethodologySection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TransformationStoriesSection } from "@/components/sections/TransformationStoriesSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <MethodologySection />
      <ServicesSection />
      <IndustriesSection />
      <ProcessSection />
      <TransformationStoriesSection />
      <InsightsSection />
      <FinalCTASection />
    </>
  );
}
