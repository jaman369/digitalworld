import { NextResponse } from "next/server";
import { getCloudData, CloudHomepageData } from "@/lib/cloudSync";

const defaultHomepageData: CloudHomepageData = {
  // Hero Banner
  heroTagline: "Available for new projects · Based in Dhaka, Bangladesh",
  heroTitle: "Grow your business beyond borders.",
  heroSubtitle: "Digital World is a full-service digital marketing agency helping businesses in the USA, UK, Canada, UAE, Australia & beyond dominate search, ads, and the web — led by Kamrujjaman Mufti.",
  heroPrimaryCtaText: "Start a Project",
  heroPrimaryCtaLink: "/contact",
  heroSecondaryCtaText: "Explore Services",
  heroSecondaryCtaLink: "#services",

  // Stats Bar
  statsEyebrow: "PROVEN TRACK RECORD",
  stats: [
    { id: "projects", value: "150", label: "Projects Delivered" },
    { id: "clients", value: "120", label: "Happy Clients Worldwide" },
    { id: "experience", value: "5", label: "Years Hands-on Experience" },
    { id: "countries", value: "11", label: "Countries Served" },
  ],

  // Services Section
  servicesEyebrow: "What We Do",
  servicesTitle: "Services built to scale.",
  servicesSubtitle: "A comprehensive suite of growth services designed to expand your visibility, drive qualified leads, and maximize return on investment.",

  // Why Choose Us Section
  whyUsEyebrow: "Why Us",
  whyUsTitle: "Why choose Digital World",
  whyUsSubtitle: "We partner with brands to build robust organic funnels that consistently generate revenue, not just vanity clicks.",
  whyUsCards: [
    {
      title: "Data-driven strategies",
      description: "No assumptions. We build our growth campaigns based on hard competitor analytics and real user intent metrics.",
      iconName: "BarChart3",
    },
    {
      title: "5+ years of experience",
      description: "Having navigated through search engine algorithm core updates, we know what drives sustainable ranking gains.",
      iconName: "Trophy",
    },
    {
      title: "High ROI campaigns",
      description: "Every dollar you invest is optimized to target buyers at the bottom of the funnel, minimizing waste.",
      iconName: "TrendingUp",
    },
    {
      title: "Custom solutions",
      description: "We don't do pre-packaged cookie-cutter services. Every site is analyzed to get a bespoke roadmap.",
      iconName: "Settings",
    },
    {
      title: "24/7 dedicated support",
      description: "Clear, direct communication channels. We act as an extension of your team, responding within hours.",
      iconName: "MessageSquare",
    },
    {
      title: "Transparent reporting",
      description: "Understand exactly what you are paying for with simplified keyword progression and traffic conversion dashboards.",
      iconName: "FileText",
    },
  ],

  // Process / How We Work Section
  processEyebrow: "Process",
  processTitle: "Our simple 4-step onboarding process",
  processSubtitle: "We structure your customer acquisition funnel from initial audit to scaled delivery with absolute clarity.",
  processSteps: [
    { stepNumber: 1, title: "Discovery & Audit", description: "30-minute alignment call + deep technical audit of your domain." },
    { stepNumber: 2, title: "Custom Blueprint", description: "Tailored execution roadmap matching target keywords and acquisition budgets." },
    { stepNumber: 3, title: "Execution & Optimization", description: "On-page overhaul, technical tuning, and weekly conversion tracking." },
    { stepNumber: 4, title: "Scale & Growth", description: "Iterative split testing, backlink acceleration, and recurring performance reports." },
  ],

  // Testimonials Section
  testimonialsEyebrow: "Reviews",
  testimonialsTitle: "Client Success Stories",
  testimonialsSubtitle: "See how we help businesses globally increase organic traffic footprint, lower acquisition cost metrics, and scale stores.",

  // Final CTA Section
  ctaEyebrow: "Get Started",
  ctaTitle: "Let's build something great together.",
  ctaSubtitle: "Get in touch for a free 30-minute strategy call to audit your current search presence, examine paid bidding efficiencies, and identify growth bottlenecks.",
  ctaButtonText: "Book Your Strategy Call",
  ctaButtonLink: "/contact",

  // SEO Metadata
  seoTitle: "Digital World - Full Service Digital Marketing Agency",
  seoDescription: "Full-service digital marketing agency specializing in SEO, PPC, Web Design, Content Marketing, and AI Automation.",
  canonicalUrl: "https://digitalworld-beige.vercel.app/",
  ogImage: "https://digitalworld-beige.vercel.app/Kamrujjaman%20Mufti%20Image/kamrujjaman-mufti.jpg",
};

export async function GET() {
  try {
    const cloudData = await getCloudData();
    const hp = cloudData.homepage || {};
    return NextResponse.json({
      ...defaultHomepageData,
      ...hp,
    });
  } catch {
    return NextResponse.json(defaultHomepageData);
  }
}
