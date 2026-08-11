"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";

interface ServiceExtraSectionsProps {
  categorySlug?: string;
}

interface PricingTier {
  title: string;
  monthlyPrice: string;
  yearlyPrice: string;
  period: string;
  desc: string;
  features: string[];
  ctaText?: string;
}

interface CategoryPricingConfig {
  basic: PricingTier;
  accelerate: PricingTier;
  enterprise: PricingTier;
}

const servicePricingMap: Record<string, CategoryPricingConfig> = {
  // 1. SEO SERVICES
  seo: {
    basic: {
      title: "Basic SEO",
      monthlyPrice: "$299",
      yearlyPrice: "$254",
      period: "/m",
      desc: "For small & local businesses establishing a strong organic search footprint.",
      features: [
        "Keyword research & cluster mapping (10 terms)",
        "Technical & on-page SEO (up to 5 pages)",
        "Google Business Profile & local NAP audit",
        "Monthly ranking & traffic analytics report",
        "Email & chat support",
      ],
    },
    accelerate: {
      title: "Accelerate SEO",
      monthlyPrice: "$1,299",
      yearlyPrice: "$1,104",
      period: "/m",
      desc: "For growing brands looking to scale organic revenue and dominate search results.",
      features: [
        "Everything in Basic",
        "Advanced topical authority & content strategy",
        "Backlink outreach & digital PR campaign",
        "E-commerce & SaaS schema implementation",
        "Bi-weekly performance review calls",
      ],
    },
    enterprise: {
      title: "Enterprise SEO",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      period: "",
      desc: "For international enterprises requiring multi-region indexation & custom AI SEO.",
      features: [
        "Everything in Accelerate",
        "International hreflang & multi-market strategy",
        "Generative Search / Perplexity & ChatGPT optimization",
        "Dedicated SEO account director",
        "Priority 24/7 technical monitoring",
      ],
    },
  },

  // 2. PPC & PAID ADS
  ppc: {
    basic: {
      title: "Basic PPC",
      monthlyPrice: "$399",
      yearlyPrice: "$339",
      period: "/m",
      desc: "For small businesses starting targeted paid acquisition on Search or Social.",
      features: [
        "Single platform setup (Google Ads or Meta)",
        "High-intent keyword / audience targeting",
        "Ad copy creation & 2 creative variations",
        "Conversion tracking & pixel verification",
        "Monthly ad spend optimization report",
      ],
    },
    accelerate: {
      title: "Accelerate PPC",
      monthlyPrice: "$1,499",
      yearlyPrice: "$1,274",
      period: "/m",
      desc: "For scaling brands looking to maximize ROAS across multi-channel ad funnels.",
      features: [
        "Everything in Basic",
        "Multi-channel ad management (Google, Meta, TikTok)",
        "Dynamic remarketing & retargeting funnels",
        "Performance Max & shopping feed optimization",
        "Weekly bid management & bi-weekly syncs",
      ],
    },
    enterprise: {
      title: "Enterprise PPC",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      period: "",
      desc: "For high-volume spenders needing bespoke attribution models & dedicated growth managers.",
      features: [
        "Everything in Accelerate",
        "Omni-channel ad budget scaling & C-suite reporting",
        "Custom video ad production & UGC creative loops",
        "Dedicated senior PPC strategist",
        "24/7 real-time bid & fraud protection",
      ],
    },
  },

  // 3. WEB DESIGN & DEV
  "web-design-dev": {
    basic: {
      title: "Starter Web Build",
      monthlyPrice: "$599",
      yearlyPrice: "$509",
      period: " one-time",
      desc: "For startups needing a fast, conversion-focused single page or landing site.",
      features: [
        "Custom UI/UX design (Mobile & Desktop)",
        "Modern framework development (Next.js / React / WP)",
        "Contact form integration & lead capture",
        "Basic SEO meta tags & speed optimization",
        "30-day post-launch support",
      ],
    },
    accelerate: {
      title: "Pro Web Build",
      monthlyPrice: "$2,499",
      yearlyPrice: "$2,124",
      period: " one-time",
      desc: "For growing businesses wanting a high-performance multi-page or E-commerce website.",
      features: [
        "Everything in Starter",
        "Custom multi-page UI/UX (up to 10 pages)",
        "Full E-commerce setup (Shopify / WooCommerce)",
        "100/100 Core Web Vitals & speed tuning",
        "CMS integration for effortless content editing",
      ],
    },
    enterprise: {
      title: "Custom Enterprise",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      period: "",
      desc: "For complex platforms requiring custom web app architecture, APIs, & Headless CMS.",
      features: [
        "Everything in Pro Build",
        "Enterprise Headless CMS or web application",
        "Custom API integrations & third-party database sync",
        "Security hardening, SOC compliance & SLA setup",
        "Dedicated lead developer & priority 24/7 care",
      ],
    },
  },

  // 4. CONTENT MARKETING
  "content-marketing": {
    basic: {
      title: "Starter Content",
      monthlyPrice: "$349",
      yearlyPrice: "$296",
      period: "/m",
      desc: "For brands building initial search authority with consistent, quality articles.",
      features: [
        "2 High-quality long-form articles / month",
        "Search intent keyword research & outline",
        "On-page SEO & meta tags creation",
        "Featured graphic & formatting included",
        "Monthly content performance tracking",
      ],
    },
    accelerate: {
      title: "Growth Content",
      monthlyPrice: "$1,199",
      yearlyPrice: "$1,019",
      period: "/m",
      desc: "For businesses scaling lead generation with comprehensive content & email funnels.",
      features: [
        "Everything in Starter",
        "6 SEO-optimized articles + 2 email newsletters / mo",
        "Lead magnet PDF design (e.g. guide or whitepaper)",
        "Content cluster & internal linking architecture",
        "CRO audit & form submission testing",
      ],
    },
    enterprise: {
      title: "Enterprise Authority",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      period: "",
      desc: "For industry leaders requiring high-volume publication, Digital PR, & HARO outreach.",
      features: [
        "Everything in Growth Content",
        "12+ In-depth articles, whitepapers & press releases",
        "Dedicated HARO journalist pitches & media placements",
        "Editorial team & dedicated content strategist",
        "Executive ghostwriting & custom infographics",
      ],
    },
  },

  // 5. AI AUTOMATION
  "ai-automation": {
    basic: {
      title: "AI Chatbot Bot",
      monthlyPrice: "$499",
      yearlyPrice: "$424",
      period: "/m",
      desc: "For businesses automating repetitive customer support or lead capturing.",
      features: [
        "Custom RAG AI Chatbot trained on your site docs",
        "24/7 Automated lead parsing & Slack/Email alerts",
        "Single workflow integration (Zapier / Make.com)",
        "Basic CRM auto-update sync",
        "Monthly prompt tuning & model updates",
      ],
    },
    accelerate: {
      title: "Autonomous Agents",
      monthlyPrice: "$1,899",
      yearlyPrice: "$1,614",
      period: "/m",
      desc: "For companies deploying multi-step autonomous AI agents & CRM pipelines.",
      features: [
        "Everything in AI Chatbot",
        "Multi-agent workflows (Support, Sales, Lead Scraping)",
        "Complex HubSpot / Salesforce / CRM automations",
        "Custom fine-tuned LLM prompts & API pipelines",
        "Bi-weekly optimization & agent performance audits",
      ],
    },
    enterprise: {
      title: "Custom AI Systems",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      period: "",
      desc: "For enterprises building private on-premise AI models & custom database nodes.",
      features: [
        "Everything in Autonomous Agents",
        "Private database vector nodes & custom fine-tuned LLMs",
        "Autonomous background agent orchestration",
        "Enterprise security, encryption & compliance",
        "Dedicated AI systems engineer & priority SLA",
      ],
    },
  },

  // 6. CHINA SOURCING
  "china-sourcing": {
    basic: {
      title: "Factory Vetting",
      monthlyPrice: "$399",
      yearlyPrice: "$339",
      period: "/project",
      desc: "For sellers seeking reliable factory matching & sample verification.",
      features: [
        "Direct factory matching (up to 3 vetted suppliers)",
        "Sample inspection & quality feedback report",
        "Contract negotiation & price benchmarking",
        "FOB / EXW pricing comparison",
        "Dedicated bilingual sourcing assistant",
      ],
    },
    accelerate: {
      title: "Full Sourcing & QC",
      monthlyPrice: "$1,599",
      yearlyPrice: "$1,359",
      period: "/project",
      desc: "For brands managing complete bulk production runs & pre-shipment inspections.",
      features: [
        "Everything in Factory Vetting",
        "Full production management & weekly factory audits",
        "Pre-shipment AQL quality control inspection",
        "Ocean / Air container freight rate negotiation",
        "Escrow payment protection & contract management",
      ],
    },
    enterprise: {
      title: "End-to-End Supply Chain",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      period: "",
      desc: "For global importers requiring end-to-end supply chain & customs clearance management.",
      features: [
        "Everything in Full Sourcing",
        "Complete door-to-door logistics & warehousing",
        "Customs clearance, HS code & tariff calculation",
        "On-site factory agent assignment in Ningbo/Yiwu/Shenzhen",
        "Executive supply chain consultant & 24/7 updates",
      ],
    },
  },
};

export default function ServiceExtraSections({ categorySlug = "seo" }: ServiceExtraSectionsProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  // Fallback to SEO pricing if slug not matched
  const currentPricing = servicePricingMap[categorySlug] || servicePricingMap["seo"];

  const whyUsCardsMap: Record<string, { icon: string; title: string; desc: string }[]> = {
    seo: [
      { icon: "📊", title: "Results, Not Reports", desc: "We obsess over one metric: your revenue. Every action we take is tied to measurable business outcomes — not vanity metrics." },
      { icon: "🚀", title: "No Long-Term Lock-ins", desc: "Month-to-month engagements available. We earn your trust with results — not 12-month contracts." },
      { icon: "🌍", title: "Global Experience", desc: "11 countries, dozens of industries. We understand search behavior, competition, and algorithm nuances across markets." },
      { icon: "🤝", title: "Direct Access", desc: "You work directly with Kamrujjaman — no junior account managers, no handoffs. Expert eyes on your campaign always." },
      { icon: "🔍", title: "Transparent Process", desc: "Full access to our work, tools, and data. You own everything we create — content, links, strategies. Nothing withheld." },
      { icon: "⚡", title: "Fast Communication", desc: "Reach us via Email, WhatsApp, or LinkedIn. Responses within hours, weekly updates guaranteed across all time zones." },
    ],
    ppc: [
      { icon: "💰", title: "ROAS-First Bidding", desc: "We eliminate ad budget waste and focus bids strictly on high-intent convertors that yield positive return on ad spend." },
      { icon: "🎯", title: "Omni-Channel Coverage", desc: "From Google Search to Meta, TikTok & LinkedIn, we reach your audience everywhere they spend time online." },
      { icon: "⚡", title: "Real-time Fraud Shield", desc: "Bot click filtering & ip exclusions configured out-of-the-box to ensure your ad dollars reach real buyers." },
      { icon: "📈", title: "Continuous A/B Creative Testing", desc: "Weekly creative iterations on hooks, thumbnails, and headlines to prevent ad fatigue and keep CPCs low." },
      { icon: "🤝", title: "Direct Lead Strategist", desc: "Direct channel to senior media buyers with over 5+ years of paid media scaling expertise." },
      { icon: "📊", title: "Live ROAS Dashboard", desc: "Transparent real-time metrics showing cost-per-acquisition (CPA), conversion rates, and profit margins." },
    ],
    "web-design-dev": [
      { icon: "⚡", title: "100/100 Speed Score", desc: "Engineered for speed with Next.js, optimized images, clean code, and zero heavy bloatware plugins." },
      { icon: "🎨", title: "Bespoke UI/UX Design", desc: "No generic templates. Every pixel is custom designed in Figma to reflect your brand's unique identity." },
      { icon: "🎯", title: "Conversion Engineered", desc: "Layouts built around user psychology, frictionless CTA placements, and high-converting landing funnels." },
      { icon: "📱", title: "100% Mobile Responsive", desc: "Flawless rendering and touch-optimized UX across smartphones, tablets, and ultra-wide desktops." },
      { icon: "⚙️", title: "Easy Content CMS", desc: "Empower your marketing team to edit text, publish blogs, and update images without touching code." },
      { icon: "🛡️", title: "Enterprise Security", desc: "SSL encryption, anti-malware hardening, and automated daily cloud backups included as standard." },
    ],
    "content-marketing": [
      { icon: "✍️", title: "Search-Intent Copy", desc: "Articles written to satisfy buyer queries, build topical authority, and convert casual readers into leads." },
      { icon: "🧠", title: "Topic Cluster Strategy", desc: "We map out comprehensive pillar pages and supporting cluster articles to establish search engine dominance." },
      { icon: "🔗", title: "Editorial Backlinks", desc: "Outreach strategy connecting your content with top DA publications and industry journalists." },
      { icon: "📧", title: "Lifecycle Email Flows", desc: "Automated welcome and nurture sequences that turn new subscribers into repeat, high-value clients." },
      { icon: "📊", title: "Revenue Attribution", desc: "We track how content influences signups and sales — giving you complete clarity on ROI." },
      { icon: "⚡", title: "Fast Turnaround", desc: "Consistent publishing schedules with zero missed deadlines so your authority keeps growing." },
    ],
    "ai-automation": [
      { icon: "🤖", title: "Custom Trained LLMs", desc: "Bots trained exclusively on your business documentation, knowledge bases, and customer FAQs." },
      { icon: "⚡", title: "24/7 Instant Execution", desc: "Zero delay support replies, automated lead qualification, and background database syncing around the clock." },
      { icon: "🔄", title: "Seamless App Integrations", desc: "Connect Make.com, Zapier, HubSpot, Salesforce, Slack, and custom webhooks without manual friction." },
      { icon: "🛡️", title: "Private Data Vector Nodes", desc: "Your data stays 100% private and encrypted. No public AI model training on your proprietary data." },
      { icon: "🧠", title: "Multi-Agent Logic", desc: "Complex multi-step agents that perform research, draft replies, and route qualified leads automatically." },
      { icon: "📈", title: "80%+ Cost Reduction", desc: "Replace hours of repetitive manual data entry with scalable, error-free AI workflow automation." },
    ],
    "china-sourcing": [
      { icon: "🏭", title: "Direct Factory Vetting", desc: "On-site visits and direct license verification in Ningbo, Yiwu, Shenzhen & Guangzhou manufacturing hubs." },
      { icon: "💰", title: "Factory-Direct Rates", desc: "We negotiate directly with factory managers in native Mandarin to secure the lowest bulk unit pricing." },
      { icon: "🔬", title: "Strict Pre-Shipment QC", desc: "AQL 2.5 quality control inspections to catch defects before products ever leave China." },
      { icon: "🚢", title: "Freight Rate Savings", desc: "Discounted ocean container and air express freight space negotiated directly with major shipping lines." },
      { icon: "📜", title: "Customs & Tariff Prep", desc: "Accurate HS code classification and duty paperwork to ensure frictionless import clearance." },
      { icon: "🛡️", title: "Escrow Payment Safety", desc: "Structured milestone payments to protect your capital until quality specs are 100% verified." },
    ],
  };

  const whyUsCards = whyUsCardsMap[categorySlug] || whyUsCardsMap["seo"];

  const testimonialsMap: Record<string, { stars: number; quote: string; author: string; location: string }[]> = {
    seo: [
      { stars: 5, quote: "Digital World doubled our organic traffic in just 4 months. The SEO strategy was precisely tailored to our e-commerce niche — best investment we've made.", author: "Sarah M.", location: "🇺🇸 New York, USA · E-Commerce Store" },
      { stars: 5, quote: "We went from page 4 to #1 in Google Maps within 90 days. The local SEO work was methodical and the communication was excellent throughout.", author: "Michael R.", location: "🇦🇺 Melbourne, Australia · HVAC Business" },
      { stars: 5, quote: "The SaaS content strategy brought us 38 inbound demo requests per month organically. We scaled without increasing ad spend. Incredible ROI.", author: "Clara O.", location: "🇮🇪 Dublin, Ireland · SaaS Startup" },
    ],
    ppc: [
      { stars: 5, quote: "Our Google Ads ROAS jumped from 2.1x to 5.4x in less than 60 days. The negative keyword filters and ad copy variations transformed our margins.", author: "David K.", location: "🇬🇧 London, UK · B2B SaaS" },
      { stars: 5, quote: "They scaled our Meta ad budget 4x while keeping cost-per-acquisition low. The creative testing loops were game changers for our store.", author: "Jessica L.", location: "🇺🇸 Austin, USA · Fashion Brand" },
      { stars: 5, quote: "Finally an agency that doesn't hide behind vanity clicks! Every dollar spent on paid search is accounted for with real sales.", author: "Marcus V.", location: "🇨🇦 Toronto, Canada · Home Services" },
    ],
    "web-design-dev": [
      { stars: 5, quote: "Our new Next.js site loads instantly and our conversion rate jumped by 42% in the first month post-launch. Absolutely phenomenal work!", author: "Elena R.", location: "🇩🇪 Berlin, Germany · Tech Platform" },
      { stars: 5, quote: "They took our Figma designs and built a custom Shopify store that handles peak traffic effortlessly. PageSpeed score is 99/100!", author: "Liam T.", location: "🇦🇺 Sydney, Australia · Retail Brand" },
      { stars: 5, quote: "The website migration was completely seamless — zero downtime and zero loss in search rankings. Highly recommended!", author: "Amira S.", location: "🇦🇪 Dubai, UAE · Real Estate Agency" },
    ],
    "content-marketing": [
      { stars: 5, quote: "Their blog content ranks #1 for our top commercial terms. We now generate 50+ inbound sales leads per month purely through search content.", author: "Oliver B.", location: "🇬🇧 Manchester, UK · Logistics Provider" },
      { stars: 5, quote: "The HARO outreach campaign got us featured in Forbes and TechCrunch. Our Domain Authority skyrocketed from 24 to 58!", author: "Sophia CH.", location: "🇺🇸 San Francisco, USA · Fintech Startup" },
      { stars: 5, quote: "Their email marketing flows generate an extra 22% monthly revenue on complete autopilot. The copy is incredibly persuasive.", author: "Henrik N.", location: "🇸🇪 Stockholm, Sweden · E-Commerce" },
    ],
    "ai-automation": [
      { stars: 5, quote: "The custom RAG AI chatbot resolves 78% of incoming customer support tickets automatically. Our support team saved 30+ hours every week!", author: "Jason P.", location: "🇺🇸 Chicago, USA · Software House" },
      { stars: 5, quote: "Their automated Make.com lead workflow routes qualified prospects to our sales reps on Slack in under 5 seconds. Game changer!", author: "Chloe W.", location: "🇸🇬 Singapore · B2B Agency" },
      { stars: 5, quote: "We automated our entire lead scraping and CRM data enrichment pipeline. What used to take 3 full-time reps is now instant.", author: "Mateo G.", location: "🇪🇸 Madrid, Spain · Marketing Enterprise" },
    ],
    "china-sourcing": [
      { stars: 5, quote: "Digital World saved us $14,000 on our bulk production run by negotiating directly with manufacturers in Ningbo. The QC inspection was thorough!", author: "Robert T.", location: "🇺🇸 Los Angeles, USA · Amazon FBA Brand" },
      { stars: 5, quote: "Their team conducted on-site factory audits and caught defective packaging before shipping. Outstanding peace of mind for our brand.", author: "Claire D.", location: "🇫🇷 Paris, France · Home Goods Retailer" },
      { stars: 5, quote: "Customs clearance and container freight were handled effortlessly. Products arrived at our UK warehouse 5 days ahead of schedule!", author: "James H.", location: "🇬🇧 Birmingham, UK · E-Commerce Importer" },
    ],
  };

  const testimonials = testimonialsMap[categorySlug] || testimonialsMap["seo"];

  return (
    <div className="bg-[#090A0C] text-white">
      {/* 1. WHY DIGITAL WORLD SECTION */}
      <section className="py-24 lg:py-32 border-t border-neutral-900 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          
          {/* Eyebrow & Title */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-950/60 border border-blue-800/40 px-4 py-1.5 text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-[0.2em] mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              WHY DIGITAL WORLD
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Why 120+ clients choose us.
            </h2>
          </div>

          {/* 6 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {whyUsCards.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#12141A]/80 border border-neutral-800/70 rounded-2xl p-8 hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col group"
              >
                {/* Icon Container */}
                <div className="h-12 w-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-2xl mb-6 group-hover:scale-105 transition-transform">
                  <span>{item.icon}</span>
                </div>

                {/* Card Title */}
                <h3 className="font-sans text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. SIMPLE, TRANSPARENT PRICING SECTION */}
      <section className="py-24 lg:py-32 border-t border-neutral-900 relative overflow-hidden bg-[#08090C]">
        {/* Background Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,118,255,0.06)_0%,transparent_70%)] pointer-events-none" />

        {/* Background Watermark Text */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 font-serif text-[120px] sm:text-[200px] font-bold text-white/[0.015] pointer-events-none select-none tracking-widest uppercase z-0">
          Pricing
        </div>

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-950/60 border border-blue-800/40 px-4 py-1.5 text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-[0.2em] mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              PRICING
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
              Simple, transparent pricing for every stage.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
              Choose a plan that fits your goals. No hidden fees, no long-term contracts — cancel anytime.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch mb-12">
            
            {/* Card 1: Basic */}
            <div className="bg-[#101218]/90 border border-neutral-800/80 rounded-3xl p-8 flex flex-col justify-between hover:border-neutral-700 transition-all shadow-md">
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-4">
                  {currentPricing.basic.title}
                </span>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-white">
                    {billingCycle === "yearly" && currentPricing.basic.monthlyPrice !== "Custom"
                      ? currentPricing.basic.yearlyPrice
                      : currentPricing.basic.monthlyPrice}
                  </span>
                  {currentPricing.basic.period && (
                    <span className="text-sm font-semibold text-neutral-400">
                      {currentPricing.basic.period}
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed mb-8">
                  {currentPricing.basic.desc}
                </p>

                <div className="h-px bg-neutral-800/80 w-full mb-8" />

                <ul className="flex flex-col gap-4 text-xs sm:text-sm text-neutral-300 mb-8">
                  {currentPricing.basic.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3">
                      <Icons.Check className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/contact?plan=basic&service=${categorySlug}`}
                className="w-full inline-flex items-center justify-center rounded-full bg-white hover:bg-neutral-100 px-6 py-3.5 text-xs font-bold text-neutral-900 transition-all shadow-sm"
              >
                Choose Plan
              </Link>
            </div>

            {/* Card 2: Accelerate (MOST POPULAR) */}
            <div className="bg-[#121624] border-2 border-[#0076FF] rounded-3xl p-8 flex flex-col justify-between relative shadow-[0_0_50px_rgba(0,118,255,0.18)] lg:-translate-y-2">
              
              {/* Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0076FF] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                MOST POPULAR
              </div>

              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-4">
                  {currentPricing.accelerate.title}
                </span>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-white">
                    {billingCycle === "yearly" && currentPricing.accelerate.monthlyPrice !== "Custom"
                      ? currentPricing.accelerate.yearlyPrice
                      : currentPricing.accelerate.monthlyPrice}
                  </span>
                  {currentPricing.accelerate.period && (
                    <span className="text-sm font-semibold text-neutral-400">
                      {currentPricing.accelerate.period}
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed mb-8">
                  {currentPricing.accelerate.desc}
                </p>

                <div className="h-px bg-blue-900/40 w-full mb-8" />

                <ul className="flex flex-col gap-4 text-xs sm:text-sm text-neutral-200 mb-8">
                  {currentPricing.accelerate.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3">
                      <Icons.Check className="h-4 w-4 text-blue-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/contact?plan=accelerate&service=${categorySlug}`}
                className="w-full inline-flex items-center justify-center rounded-full bg-[#0076FF] hover:bg-[#0066DD] px-6 py-3.5 text-xs font-bold text-white transition-all shadow-md"
              >
                Choose Plan
              </Link>
            </div>

            {/* Card 3: Enterprise */}
            <div className="bg-[#101218]/90 border border-neutral-800/80 rounded-3xl p-8 flex flex-col justify-between hover:border-neutral-700 transition-all shadow-md">
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-4">
                  {currentPricing.enterprise.title}
                </span>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-white">
                    {currentPricing.enterprise.monthlyPrice}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed mb-8">
                  {currentPricing.enterprise.desc}
                </p>

                <div className="h-px bg-neutral-800/80 w-full mb-8" />

                <ul className="flex flex-col gap-4 text-xs sm:text-sm text-neutral-300 mb-8">
                  {currentPricing.enterprise.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3">
                      <Icons.Check className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/contact?plan=enterprise&service=${categorySlug}`}
                className="w-full inline-flex items-center justify-center rounded-full bg-white hover:bg-neutral-100 px-6 py-3.5 text-xs font-bold text-neutral-900 transition-all shadow-sm"
              >
                Choose Plan
              </Link>
            </div>

          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-3 text-xs font-semibold text-neutral-400">
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${billingCycle === "yearly" ? "bg-primary" : "bg-neutral-800"}`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${billingCycle === "yearly" ? "translate-x-4" : "translate-x-0"}`} />
              </div>
              <span className={billingCycle === "yearly" ? "text-white" : "text-neutral-400"}>Yearly (Save 15%)</span>
            </button>
          </div>

        </div>
      </section>

      {/* 3. CLIENT STORIES / TESTIMONIALS SECTION */}
      <section className="py-24 lg:py-32 border-t border-neutral-900 relative overflow-hidden bg-[#090A0C]">
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-950/60 border border-blue-800/40 px-4 py-1.5 text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-[0.2em] mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              CLIENT STORIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Trusted by businesses worldwide.
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#12141A]/90 border border-neutral-800/80 rounded-2xl p-8 flex flex-col justify-between hover:border-neutral-700 transition-all duration-300 shadow-md"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400 text-sm mb-6">
                    {Array.from({ length: t.stars }).map((_, sidx) => (
                      <Icons.Star key={sidx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed italic mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="border-t border-neutral-800/80 pt-4">
                  <h4 className="font-sans font-bold text-sm text-white mb-1">
                    {t.author}
                  </h4>
                  <p className="font-sans text-[11px] text-neutral-400">
                    {t.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
