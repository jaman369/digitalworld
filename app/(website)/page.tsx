import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import PainPoints from "@/components/sections/PainPoints";
import AboutUsSection from "@/components/sections/AboutUsSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import MarketingEcosystem from "@/components/sections/MarketingEcosystem";
import HowItWorks from "@/components/sections/HowItWorks";
import FeaturedPortfolio from "@/components/sections/FeaturedPortfolio";
import ResultsMetrics from "@/components/sections/ResultsMetrics";
import Industries from "@/components/sections/Industries";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import TechTools from "@/components/sections/TechTools";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      {/* 02 — HERO SECTION */}
      <Hero />

      {/* 03 — TRUST / CLIENT LOGOS */}
      <StatsBar />

      {/* 04 — PROBLEM / PAIN POINTS */}
      <PainPoints />

      {/* 05 — VALUE PROPOSITION */}
      <AboutUsSection />

      {/* 06 — SERVICES OVERVIEW */}
      <ServicesGrid />

      {/* 07 — MARKETING ECOSYSTEM */}
      <MarketingEcosystem />

      {/* 08 — PROCESS */}
      <HowItWorks />

      {/* 09 — FEATURED PORTFOLIO / CASE STUDIES */}
      <FeaturedPortfolio />

      {/* 10 — RESULTS / METRICS */}
      <ResultsMetrics />

      {/* 11 — INDUSTRIES */}
      <Industries />

      {/* 12 — SOLUTIONS */}
      <WhyChooseUs />

      {/* 13 — TESTIMONIALS */}
      <Testimonials />

      {/* 14 — TECHNOLOGY / TOOLS */}
      <TechTools />

      {/* 15 — FAQ */}
      <FAQSection />

      {/* 16 — FINAL CTA */}
      <FinalCTA />
    </>
  );
}
