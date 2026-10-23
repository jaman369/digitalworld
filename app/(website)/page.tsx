import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import PainPoints from "@/components/sections/PainPoints";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HowItWorks from "@/components/sections/HowItWorks";
import ResultsSection from "@/components/sections/ResultsSection";
import Industries from "@/components/sections/Industries";
import ToolsPlatforms from "@/components/sections/ToolsPlatforms";
import FounderSection from "@/components/sections/FounderSection";
import Testimonials from "@/components/sections/Testimonials";
import BlogSection from "@/components/sections/BlogSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "AI-Powered Digital Marketing Agency | Digital World",
  description:
    "Digital World is a full-service digital marketing agency offering SEO, PPC, web design, content writing, AI automation and AI video. Book a free strategy call.",
};

export default function Home() {
  return (
    <>
      {/* 01 — HERO SECTION (Preserved as requested) */}
      <Hero />

      {/* 02 — TRUST BAR */}
      <StatsBar />

      {/* 03 — PROBLEMS / PAIN POINTS */}
      <PainPoints />

      {/* 04 — SERVICES */}
      <ServicesGrid />

      {/* 05 — WHY US */}
      <WhyChooseUs />

      {/* 06 — PROCESS */}
      <HowItWorks />

      {/* 07 — RESULTS & CASE STUDIES */}
      <ResultsSection />

      {/* 08 — INDUSTRIES */}
      <Industries />

      {/* 09 — TOOLS AND PLATFORMS */}
      <ToolsPlatforms />

      {/* 10 — ABOUT THE FOUNDER */}
      <FounderSection />

      {/* 11 — TESTIMONIALS */}
      <Testimonials />

      {/* 12 — BLOG */}
      <BlogSection />

      {/* 13 — FAQ */}
      <FAQSection />

      {/* 14 — FINAL CTA BANNER */}
      <FinalCTA />
    </>
  );
}
