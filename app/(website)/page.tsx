import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import ServicesGrid from "@/components/sections/ServicesGrid";
import AboutUsSection from "@/components/sections/AboutUsSection";
import CountriesServed from "@/components/sections/CountriesServed";
import Industries from "@/components/sections/Industries";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import BlogSection from "@/components/sections/BlogSection";
import FAQSection from "@/components/sections/FAQSection";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <AboutUsSection />
      <CountriesServed />
      <Industries />
      <HowItWorks />
      <WhyChooseUs />
      <BlogSection />
      <FAQSection />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
