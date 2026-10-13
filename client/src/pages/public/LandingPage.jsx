import Hero from "./sections/Hero";
import { FeatureSection, CategorySection, HowItWorksSection, StatsSection, CtaSection } from "./sections/LandingSections";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <FeatureSection />
      <CategorySection />
      <HowItWorksSection />
      <StatsSection />
      <CtaSection />
    </>
  );
}
