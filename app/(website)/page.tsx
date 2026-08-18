import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import PainPoints from "@/components/sections/PainPoints";
import AboutUsSection from "@/components/sections/AboutUsSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import HowItWorks from "@/components/sections/HowItWorks";
import ResultsMetrics from "@/components/sections/ResultsMetrics";
import Industries from "@/components/sections/Industries";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import BlogSection from "@/components/sections/BlogSection";
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

      {/* 08 — PROCESS */}
      <HowItWorks />

      {/* 10 — RESULTS / METRICS */}
      <ResultsMetrics />

      {/* 11 — INDUSTRIES */}
      <Industries />

      {/* 12 — SOLUTIONS */}
      <WhyChooseUs />

      {/* 13 — TESTIMONIALS */}
      <Testimonials />

      {/* 14 — LATEST BLOGS */}
      <BlogSection />

      {/* 15 — FAQ */}
      <FAQSection />

      {/* 16 — FINAL CTA */}
      <FinalCTA />
    </>
  );
}
