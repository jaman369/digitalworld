import HeroSection from "@/components/home/HeroSection";
import MarqueeSection from "@/components/home/MarqueeSection";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import FeatureSections from "@/components/home/FeatureSections";
import ClientsSection from "@/components/home/ClientsSection";
import WhySection from "@/components/home/WhySection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <StatsSection />
      <ServicesSection />
      <FeatureSections />
      <ClientsSection />
      <WhySection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
