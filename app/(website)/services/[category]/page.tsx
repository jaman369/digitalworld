import { notFound } from "next/navigation";
import Link from "next/link";
import * as Icons from "lucide-react";
import { servicesData } from "@/data/services";
import ServiceExtraSections from "@/components/sections/ServiceExtraSections";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ category: string }>;
}

/* generateStaticParams removed to enable fully dynamic rendering.
   This ensures admin CMS edits from the cloud sync are always
   reflected immediately on the live website. */

export async function generateMetadata({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = servicesData.find((c) => c.slug === categorySlug);
  if (!category) return {};

  return {
    title: `${category.title} Services - Digital World`,
    description: category.description,
  };
}

interface HeroOverride {
  eyebrow: string;
  headlineFirst: string;
  headlineHighlight: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  highlightColorClass: string;
  glowClass: string;
  dotColorClass?: string;
  btnClass?: string;
  secCtaText?: string;
  secCtaLink?: string;
  secCtaIconName?: string;
  eyebrowColorClass?: string;
}

const heroOverrides: Record<string, HeroOverride> = {
  seo: {
    eyebrow: "Search Engine Optimization",
    headlineFirst: "SEO that actually",
    headlineHighlight: "moves the needle.",
    description: "Data-driven SEO strategies that go beyond rankings — we focus on traffic, leads, and revenue that matter to your business.",
    ctaText: "Get Free SEO Audit",
    ctaLink: "/contact?service=seo-audit",
    highlightColorClass: "text-[#10B981]",
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_60%)]",
    dotColorClass: "bg-[#10B981]",
    eyebrowColorClass: "text-[#10B981]",
    btnClass: "bg-[#0076FF] hover:bg-[#0066DD]"
  },
  ppc: {
    eyebrow: "PPC & Paid Advertising",
    headlineFirst: "Every pound spent.",
    headlineHighlight: "Maximum return.",
    description: "Stop burning budget on ads that don't convert. We build <strong class='text-neutral-200 font-semibold'>data-driven paid campaigns</strong> across Google, Meta, TikTok & LinkedIn — engineered for profit, not just clicks.",
    ctaText: "Get Free PPC Audit →",
    ctaLink: "/contact?service=ppc-audit",
    highlightColorClass: "bg-gradient-to-r from-[#F97316] to-[#EF4444] bg-clip-text text-transparent",
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15)_0%,transparent_60%)]",
    dotColorClass: "bg-[#F97316]",
    eyebrowColorClass: "text-[#F97316]",
    btnClass: "bg-[#0076FF] hover:bg-[#0066DD]"
  },
  "web-design-dev": {
    eyebrow: "Development & Design",
    headlineFirst: "Websites built for speed,",
    headlineHighlight: "designed for conversion.",
    description: "Stunning, custom-coded web experiences optimized to pass PageSpeed audits and keep users engaged throughout their journey.",
    ctaText: "Request a Proposal",
    ctaLink: "/contact?service=web-proposal",
    highlightColorClass: "text-indigo-400",
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_60%)]",
    dotColorClass: "bg-indigo-400",
    eyebrowColorClass: "text-indigo-400",
    btnClass: "bg-[#0076FF] hover:bg-[#0066DD]"
  },
  "content-marketing": {
    eyebrow: "Content Strategy",
    headlineFirst: "Authoritative content that",
    headlineHighlight: "converts lists to leads.",
    description: "Turn search intent into brand loyalty with high-quality content plans and automated email nurturing sequences.",
    ctaText: "Get Content Plan",
    ctaLink: "/contact?service=content-plan",
    highlightColorClass: "text-amber-500",
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0%,transparent_60%)]",
    dotColorClass: "bg-amber-500",
    eyebrowColorClass: "text-amber-500",
    btnClass: "bg-[#0076FF] hover:bg-[#0066DD]"
  },
  "ai-automation": {
    eyebrow: "AI Automation",
    headlineFirst: "Autonomous agents that",
    headlineHighlight: "streamline workflows.",
    description: "Integrate custom intelligent tools and bots to handle support, lead parsing, and manual tasks 24/7.",
    ctaText: "Book AI Consultation",
    ctaLink: "/contact?service=ai-consultation",
    highlightColorClass: "text-cyan-400",
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_60%)]",
    dotColorClass: "bg-cyan-400",
    eyebrowColorClass: "text-cyan-400",
    btnClass: "bg-[#0076FF] hover:bg-[#0066DD]"
  },
  "china-sourcing": {
    eyebrow: "China Sourcing Services",
    headlineFirst: "Direct factory sourcing &",
    headlineHighlight: "global logistics management.",
    description: "Verification, negotiations, quality inspections, and ocean freight handled directly from China to your warehouse.",
    ctaText: "Inquire Sourcing",
    ctaLink: "/contact?service=sourcing-inquiry",
    highlightColorClass: "text-rose-500",
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.15)_0%,transparent_60%)]",
    dotColorClass: "bg-rose-500",
    eyebrowColorClass: "text-rose-500",
    btnClass: "bg-[#0076FF] hover:bg-[#0066DD]"
  }
};

interface ProcessStep {
  num: number;
  title: string;
  desc: string;
}

interface ProcessOverride {
  eyebrow: string;
  title: string;
  desc: string;
  numberColorClass: string;
  steps: ProcessStep[];
}

const categoryProcesses: Record<string, ProcessOverride> = {
  seo: {
    eyebrow: "HOW IT WORKS",
    title: "Our proven 4-step SEO process.",
    desc: "No black-box tactics. You'll know exactly what we're doing and why — every step of the way.",
    numberColorClass: "text-primary group-hover:border-primary",
    steps: [
      {
        num: 1,
        title: "Deep Audit",
        desc: "We audit your site, competitors, and market to find every opportunity and every bottleneck."
      },
      {
        num: 2,
        title: "Strategy & Roadmap",
        desc: "We build a prioritised, 90-day action plan with clear timelines and expected outcomes."
      },
      {
        num: 3,
        title: "Execute & Optimise",
        desc: "We implement everything — on-page, technical, content, links — with full transparency."
      },
      {
        num: 4,
        title: "Report & Scale",
        desc: "Monthly reporting with plain-English insights and a clear plan for the next phase of growth."
      }
    ]
  },
  ppc: {
    eyebrow: "HOW IT WORKS",
    title: "Our proven 4-step Paid Ads process.",
    desc: "No budget leakages. We map out full-funnel paid strategies with absolute scaling transparency.",
    numberColorClass: "text-[#F97316] group-hover:border-[#F97316]",
    steps: [
      {
        num: 1,
        title: "Account Audit",
        desc: "We analyze historical performance, search query reports, pixel event integrity, and budget efficiency."
      },
      {
        num: 2,
        title: "Funnel Mapping",
        desc: "We build tailored cold-to-warm customer acquisition pathways, assets plans, and bidding strategies."
      },
      {
        num: 3,
        title: "Targeted Launch",
        desc: "We deploy fresh campaigns with strict budget caps, dynamic exclusions, and robust tracking systems."
      },
      {
        num: 4,
        title: "Scale & Optimize",
        desc: "We systematically allocate budget to winning creatives, hook variables, and high-ROAS lookalikes."
      }
    ]
  },
  "web-design-dev": {
    eyebrow: "DEVELOPMENT FLOW",
    title: "Our 4-step web engineering process.",
    desc: "From wireframes to a lightning-fast custom launch, we build for conversions and speed.",
    numberColorClass: "text-indigo-400 group-hover:border-indigo-400",
    steps: [
      {
        num: 1,
        title: "UI/UX & Wireframing",
        desc: "We map user journeys and create Figma designs focused on speed and conversions."
      },
      {
        num: 2,
        title: "Custom Development",
        desc: "Clean, component-driven, semantic code utilizing modern frameworks like Next.js or React."
      },
      {
        num: 3,
        title: "Speed Optimization",
        desc: "Optimization checkups for 100/100 scores: image compression, code splitting, caching."
      },
      {
        num: 4,
        title: "Launch & QA",
        desc: "Rigorous browser compatibility checks, form testings, and seamless custom domains deployments."
      }
    ]
  },
  "content-marketing": {
    eyebrow: "CONTENT LIFECYCLE",
    title: "Our 4-step content marketing process.",
    desc: "Authoritative content that doesn't just rank, but actively nurtures and converts lists to leads.",
    numberColorClass: "text-amber-500 group-hover:border-amber-500",
    steps: [
      {
        num: 1,
        title: "Competitor Research",
        desc: "Finding high-value keyword clusters and customer search intents in your market."
      },
      {
        num: 2,
        title: "Optimization & Copy",
        desc: "Writing comprehensive guides, landing pages, and newsletters optimized to convert."
      },
      {
        num: 3,
        title: "Digital PR & Links",
        desc: "Building link partnerships and media outreach to drive deep search authority."
      },
      {
        num: 4,
        title: "Funnel CRO Checks",
        desc: "A/B testing ad overlays, form configurations, and cart flow systems to lift revenue."
      }
    ]
  },
  "ai-automation": {
    eyebrow: "AI PIPELINE FLOW",
    title: "Our 4-step automation process.",
    desc: "Deploying custom intelligence frameworks that save time, minimize errors, and scale actions.",
    numberColorClass: "text-cyan-400 group-hover:border-cyan-400",
    steps: [
      {
        num: 1,
        title: "Workflow Audit",
        desc: "Mapping your manual operations to spot low-hanging fruit and high-ROI automation areas."
      },
      {
        num: 2,
        title: "Pipeline Architecting",
        desc: "Connecting APIs, creating custom triggers, and integrating CRM databases securely."
      },
      {
        num: 3,
        title: "Prompting & RAG",
        desc: "Training models on custom site docs for highly intelligent conversational chat responses."
      },
      {
        num: 4,
        title: "Analytics & Scale",
        desc: "Monitoring automated ticket handoffs, task iterations, and scaling CRM integrations."
      }
    ]
  },
  "china-sourcing": {
    eyebrow: "SUPPLY CHAIN PIPELINE",
    title: "Our 4-step supply sourcing process.",
    desc: "Direct factory verification, strict inspections, and seamless logistics from China to your warehouse.",
    numberColorClass: "text-rose-500 group-hover:border-rose-500",
    steps: [
      {
        num: 1,
        title: "Supplier Audits",
        desc: "Direct vetting of manufacturing licenses, capacity setups, and raw materials pools."
      },
      {
        num: 2,
        title: "Bulk Negotiation",
        desc: "Securing low-cost pricing, contract terms agreements, and payments escrow plans."
      },
      {
        num: 3,
        title: "Pre-Shipment Inspection",
        desc: "Strict during-production product checks to filter out package specifications defects."
      },
      {
        num: 4,
        title: "Logistics & Delivery",
        desc: "Ocean/air container space allocation, customs clearance paperwork, and warehouse delivery."
      }
    ]
  }
};

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = servicesData.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  // Get override or generate fallback
  const override = heroOverrides[category.slug] || {
    eyebrow: category.title,
    headlineFirst: category.title,
    headlineHighlight: "Services",
    description: category.description,
    ctaText: "Get Started",
    ctaLink: `/contact?service=${category.slug}`,
    highlightColorClass: "text-primary",
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(0,118,255,0.15)_0%,transparent_60%)]",
    dotColorClass: "bg-primary",
    eyebrowColorClass: "text-primary",
    btnClass: "bg-[#0076FF] hover:bg-[#0066DD]"
  };

  const SecCtaIcon = override.secCtaIconName ? (Icons[override.secCtaIconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>) : null;

  return (
    <article className="min-h-screen bg-transparent">
      {/* Category Hero Banner */}
      <section className="relative overflow-hidden bg-[#09090B] pt-24 sm:pt-32 pb-20 sm:pb-36 text-white border-b border-neutral-900">
        {/* Background glow overlay */}
        <div className={`absolute inset-0 -z-10 ${override.glowClass}`} />

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            
            {/* Eyebrow tag */}
            <span className={`text-[10px] sm:text-xs font-bold ${override.eyebrowColorClass || "text-primary"} uppercase tracking-[0.25em] mb-6`}>
              {override.eyebrow}
            </span>
            
            {/* Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-[5rem] font-bold tracking-tight leading-[1.1] mb-6 text-white max-w-4xl">
              {override.headlineFirst} <br className="hidden sm:inline" />
              <span className={`${override.highlightColorClass} italic font-serif`}>
                {override.headlineHighlight}
              </span>
            </h1>
            
            {/* Description */}
            <p 
              className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl mb-10"
              dangerouslySetInnerHTML={{ __html: override.description }}
            />
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
              <Link
                href={override.ctaLink}
                className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-8 py-3.5 font-sans text-xs font-bold text-white shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] ${
                  override.btnClass || "bg-[#0076FF] hover:bg-[#0066DD]"
                }`}
              >
                {override.ctaText} {!override.ctaText.includes("→") && <Icons.ArrowRight className="h-3.5 w-3.5" />}
              </Link>
              
              {override.secCtaText ? (
                <a
                  href={override.secCtaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-neutral-800 hover:border-neutral-700 bg-neutral-900/50 hover:bg-neutral-900 px-8 py-3.5 font-sans text-xs font-bold text-white shadow-sm transition-all"
                >
                  {SecCtaIcon && <SecCtaIcon className="h-4 w-4 text-emerald-400" />}
                  {override.secCtaText}
                </a>
              ) : (
                <a
                  href="#services-list"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-neutral-800 hover:border-neutral-700 bg-neutral-900/50 hover:bg-neutral-900 px-8 py-3.5 font-sans text-xs font-bold text-white shadow-sm transition-all"
                >
                  Explore Services
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Scrolling Service Ticker Bar at Bottom of Hero */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-neutral-800/50 bg-[#09090B]/90 backdrop-blur-sm">
          <div className="flex animate-marquee whitespace-nowrap py-3.5">
            {/* Duplicate the items twice for seamless infinite scroll */}
            {[...category.subItems, ...category.subItems].map((sub, idx) => {
              // Colorful emoji icons for each sub-service
              const subEmojis: Record<string, string> = {
                "local-seo": "📍",
                "ecommerce-seo": "🛒",
                "international-seo": "🌍",
                "youtube-video-seo": "🎬",
                "saas-seo": "💎",
                "semantic-seo": "🧠",
                "ai-seo": "✨",
                "google-search-ads": "🔍",
                "google-shopping-ads": "🛍️",
                "performance-max": "⚡",
                "youtube-ads": "▶️",
                "remarketing-ads": "🔄",
                "facebook-ads": "📘",
                "instagram-ads": "📸",
                "tiktok-linkedin-ads": "🎯",
                "website-design-ui-ux": "🎨",
                "wordpress-development": "🔧",
                "shopify-development": "🏪",
                "landing-page-design": "📄",
                "website-speed-optimization": "⚡",
                "website-maintenance": "🛡️",
                "website-migration": "🚀",
                "cms-setup": "⚙️",
                "blog-writing": "✍️",
                "email-marketing": "📧",
                "content-marketing": "📝",
                "cro-audit-testing": "📊",
                "backlink-building": "🔗",
                "digital-pr": "📰",
                "haro-services": "🎤",
                "social-media-content": "📱",
                "press-releases": "📢",
                "ai-chatbot-development": "🤖",
                "ai-agent-development": "🧬",
                "lead-generation-automation": "📥",
                "crm-automation": "🔄",
                "workflow-automation": "⚙️",
                "ai-customer-support": "💬",
                "ai-content-automation": "📄",
                "ai-seo-automation": "🔍",
                "custom-ai-solutions": "🧪",
                "ai-analytics-reporting": "📈",
                "product-sourcing": "🏭",
                "supplier-verification": "✅",
                "quality-inspection": "🔬",
                "production-management": "📋",
                "order-management": "📦",
                "freight-forwarding": "🚢",
                "customs-clearance": "📜",
                "warehousing": "🏗️",
                "door-to-door-delivery": "🚛",
              };

              return (
                <span
                  key={`${sub.slug}-${idx}`}
                  className="inline-flex items-center gap-2.5 mx-8 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-neutral-300"
                >
                  <span className="text-base sm:text-lg">{subEmojis[sub.slug] || "●"}</span>
                  {sub.name}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Services Grid Section (Matching Design Reference) */}
      <section className="py-24 lg:py-32 bg-[#F8FAF9] border-b border-neutral-100/80 relative">
        <div className="container mx-auto max-w-7xl px-6">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[11px] sm:text-xs font-bold text-emerald-600 uppercase tracking-[0.25em] mb-4 block">
              Features Services
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
              A wide range of {category.title} services
            </h2>
          </div>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 lg:gap-x-10 pt-6">
            {category.subItems.map((sub) => {
              const subEmojis: Record<string, string> = {
                // SEO
                "local-seo": "📍",
                "ecommerce-seo": "🛒",
                "international-seo": "🌍",
                "youtube-video-seo": "🎬",
                "saas-seo": "💎",
                "semantic-seo": "🧠",
                "ai-seo": "✨",

                // PPC
                "google-search-ads": "🔍",
                "google-shopping-ads": "🛍️",
                "performance-max": "⚡",
                "youtube-ads": "▶️",
                "remarketing-ads": "🔄",
                "facebook-ads": "📘",
                "instagram-ads": "📸",
                "tiktok-linkedin-ads": "🎯",

                // Web Design & Dev
                "website-design-ui-ux": "🎨",
                "wordpress-development": "🔧",
                "shopify-development": "🏪",
                "landing-page-design": "📄",
                "website-speed-optimization": "⚡",
                "website-maintenance": "🛡️",
                "website-migration": "🚀",
                "cms-setup": "⚙️",

                // Content Marketing
                "blog-writing": "✍️",
                "email-marketing": "📧",
                "content-marketing": "📝",
                "cro-audit-testing": "📊",
                "backlink-building": "🔗",
                "digital-pr": "📰",
                "haro-services": "🎤",
                "social-media-content": "📱",
                "press-releases": "📢",

                // AI Automation
                "ai-chatbot-development": "🤖",
                "ai-agent-development": "🧬",
                "lead-generation-automation": "📥",
                "crm-automation": "🔄",
                "workflow-automation": "⚙️",
                "ai-customer-support": "💬",
                "ai-content-automation": "📄",
                "ai-seo-automation": "🔍",
                "custom-ai-solutions": "🧪",
                "ai-analytics-reporting": "📈",

                // China Sourcing
                "product-sourcing": "🏭",
                "supplier-verification": "✅",
                "quality-inspection": "🔬",
                "production-management": "📋",
                "order-management": "📦",
                "freight-forwarding": "🚢",
                "customs-clearance": "📜",
                "warehousing": "🏗️",
                "door-to-door-delivery": "🚛",
              };

              const emoji = subEmojis[sub.slug] || "✦";

              return (
                <div
                  key={sub.slug}
                  id={sub.slug}
                  className="bg-white rounded-3xl p-8 pt-12 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-neutral-100/90 flex flex-col items-center text-center relative group hover:shadow-[0_15px_40px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-1 scroll-mt-28"
                >
                  {/* Top Floating Badge Protruding from Top Center */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-6 py-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-neutral-100 flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 group-hover:border-primary/20 transition-all duration-300">
                    <span>{emoji}</span>
                  </div>

                  {/* Card Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 mb-3 mt-2 group-hover:text-primary transition-colors">
                    {sub.name}
                  </h3>

                  {/* Card Description */}
                  <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-xs mx-auto mb-8">
                    {sub.description}
                  </p>

                  {/* Bottom Arrow Action Button */}
                  <Link
                    href={`/contact?service=${sub.slug}`}
                    aria-label={`Inquire about ${sub.name}`}
                    className="mt-auto flex items-center justify-center h-11 w-11 rounded-full bg-neutral-50 border border-neutral-100 text-neutral-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-sm"
                  >
                    <Icons.ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}

            {/* Extra Plus / More Services Card */}
            <div className="bg-white/80 rounded-3xl p-8 pt-12 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-dashed border-neutral-300 flex flex-col items-center text-center relative group hover:border-primary/50 hover:bg-white transition-all duration-300 hover:-translate-y-1">
              {/* Top Floating Badge Protruding from Top Center */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-6 py-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-neutral-200 flex items-center justify-center text-2xl sm:text-3xl text-primary group-hover:scale-110 transition-all duration-300">
                <Icons.Plus className="h-7 w-7 text-primary" />
              </div>

              {/* Card Title */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 mb-3 mt-2 group-hover:text-primary transition-colors">
                More Services
              </h3>

              {/* Card Description */}
              <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xs mx-auto mb-8">
                Need a custom strategy? We continuously expand our capabilities and build bespoke solutions tailored to your growth goals.
              </p>

              {/* Bottom Plus Action Button */}
              <Link
                href={`/contact?service=custom-${category.slug}`}
                aria-label="Request custom service"
                className="mt-auto flex items-center justify-center h-11 w-11 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-500 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-sm"
              >
                <Icons.Plus className="h-5 w-5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Dynamic Step Process Section */}
      {categoryProcesses[category.slug] && (
        <section className="py-20 lg:py-28 bg-transparent border-t border-neutral-100 text-center relative z-10">
          <div className="container mx-auto max-w-7xl px-6">
            
            {/* Header */}
            <div className="max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3.5 py-1 text-[10px] sm:text-xs font-bold text-primary uppercase tracking-widest mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {categoryProcesses[category.slug].eyebrow}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-neutral-900 leading-tight mb-6">
                {categoryProcesses[category.slug].title}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                {categoryProcesses[category.slug].desc}
              </p>
            </div>

            {/* Steps Container */}
            <div className="relative max-w-5xl mx-auto">
              {/* Horizontal line on desktop */}
              <div className="absolute top-6 left-[8%] right-[8%] h-0.5 bg-neutral-100 -z-10 hidden lg:block" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
                {categoryProcesses[category.slug].steps.map((step) => (
                  <div key={step.num} className="flex flex-col items-center group">
                    {/* Circle badge */}
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-white border border-neutral-200 font-bold text-sm shadow-sm mb-6 z-10 transition-colors ${categoryProcesses[category.slug].numberColorClass}`}>
                      {step.num}
                    </div>
                    {/* Step details */}
                    <h4 className="font-sans font-bold text-sm sm:text-base text-neutral-800 mb-3">
                      {step.title}
                    </h4>
                    <p className="font-sans text-xs text-neutral-500 leading-relaxed max-w-[220px] mx-auto">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      )}

      {/* Why Us, Pricing & Client Stories Sections (Matching Design Reference) */}
      <ServiceExtraSections categorySlug={category.slug} />
    </article>
  );
}
