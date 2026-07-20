import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import ServicesGrid from "@/components/sections/ServicesGrid";
import FeatureBlocks from "@/components/sections/FeatureBlocks";
import CountriesServed from "@/components/sections/CountriesServed";
import Industries from "@/components/sections/Industries";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* 
        Homepage Background Image Integration
        - Uses cover / contain scaling for responsive display
        - Positioned behind content (-z-10) with pointer-events-none to prevent interaction interference
        - Preserves exact section sequence and layout flow
      */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/bg-bubbles.png')] bg-no-repeat bg-top bg-cover opacity-60 mix-blend-multiply"
        aria-hidden="true"
      />

      {/* Main Homepage Sections (Preserved Sequence) */}
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <FeatureBlocks />
      <CountriesServed />
      <Industries />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FinalCTA />
    </div>
  );
}
