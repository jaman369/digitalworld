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
    <>
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
    </>
  );
}
