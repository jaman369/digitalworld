import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const defaultHomepageData = {
  // Hero Banner
  heroTagline: "Available for new projects · Based in Dhaka, Bangladesh",
  heroTitle: "Grow your business beyond borders.",
  heroSubtitle: "Digital World is a full-service digital marketing agency helping businesses in the USA, UK, Canada, UAE, Australia & beyond dominate search, ads, and the web — led by Kamrujjaman Mufti.",
  heroPrimaryCtaText: "Start a Project",
  heroPrimaryCtaLink: "/contact",
  heroSecondaryCtaText: "Explore Services",
  heroSecondaryCtaLink: "#services",

  // Stats Bar
  statsEyebrow: "Trusted by growing brands worldwide",
  stats: [
    { id: "projects", value: "56", label: "Projects Delivered" },
    { id: "clients", value: "44", label: "Happy Clients Worldwide" },
    { id: "experience", value: "6", label: "Years of Hands-On Experience" },
    { id: "countries", value: "11", label: "Countries Served" },
  ],

  // Services Section
  servicesEyebrow: "What we do",
  servicesTitle: "Digital Marketing Services Built to Scale Your Business",
  servicesSubtitle: "From search rankings to paid ads, websites to AI-driven automation, we cover the full growth funnel. Choose one service or let us run your entire digital marketing strategy.",

  // Why Choose Us Section
  whyUsEyebrow: "Why us",
  whyUsTitle: "Why Growing Businesses Choose Digital World as Their Digital Marketing Partner",
  whyUsSubtitle: "We are built for businesses that want results, not reports full of vanity metrics.",
  whyUsCards: [
    { title: "Data-driven strategies", description: "Every decision is backed by keyword data, competitor research and real performance numbers, never guesswork.", iconName: "BarChart3" },
    { title: "AI-powered execution", description: "We use AI automation and AI tools to work faster and test more ideas, and we pass the savings on to you.", iconName: "Cpu" },
    { title: "6+ years of hands-on experience", description: "Your project is led by a senior practitioner who has run SEO, PPC, web and content projects for clients in 11 countries.", iconName: "Award" },
    { title: "One team, every channel", description: "SEO, ads, web, content, automation and video work together under one strategy, so nothing falls through the cracks.", iconName: "Layers" },
    { title: "Transparent reporting", description: "Clear dashboards show what you pay for and what it returns: traffic, leads, conversions and ROI.", iconName: "FileText" },
    { title: "Fast, direct support", description: "You talk to the people doing the work. Expect a reply within 24 hours.", iconName: "MessageSquare" },
  ],

  // Process / How We Work Section
  processEyebrow: "How we work",
  processTitle: "Our Simple 4-Step Digital Marketing Process",
  processSubtitle: "A clear path from first call to scaled growth, with no surprises.",
  processSteps: [
    { stepNumber: 1, title: "Discovery and Audit", description: "We study your business, goals, competitors and current marketing. You get a free audit of your SEO, ads and website." },
    { stepNumber: 2, title: "Strategy and Roadmap", description: "We build a custom plan with priorities, channels, budget and timeline, so you know exactly what happens and when." },
    { stepNumber: 3, title: "Execution and Launch", description: "Our team builds, writes, launches and automates. You get regular updates and can give feedback at every stage." },
    { stepNumber: 4, title: "Optimize and Scale", description: "We track the numbers, improve what works, cut what does not and scale the winners for compounding growth." },
  ],

  // Testimonials Section
  testimonialsEyebrow: "Reviews",
  testimonialsTitle: "What Our Clients Say About Working With Us",
  testimonialsSubtitle: "Feedback from businesses we help grow.",

  // Final CTA Section
  ctaEyebrow: "Take The Next Step",
  ctaTitle: "Ready to Grow Your Business With a Digital Marketing Agency That Delivers?",
  ctaSubtitle: "Book a free 30-minute strategy call. We will audit your search presence, review your paid campaigns and show you the fastest growth opportunities, with no obligation.",
  ctaButtonText: "Book Your Free Strategy Call",
  ctaButtonLink: "/contact",

  // SEO Metadata
  seoTitle: "AI-Powered Digital Marketing Agency | Digital World",
  seoDescription: "Digital World is a full-service digital marketing agency offering SEO, PPC, web design, content writing, AI automation and AI video. Book a free strategy call.",
  canonicalUrl: "https://digitalworld-beige.vercel.app/",
  ogImage: "https://digitalworld-beige.vercel.app/Kamrujjaman%20Mufti%20Image/kamrujjaman-mufti.jpg",
};

export async function GET() {
  try {
    let record: Record<string, unknown> | null = null;
    try {
      record = (await db.homepageContent.findUnique({
        where: { id: "default" },
      })) as Record<string, unknown> | null;
    } catch {
      try {
        const rows = (await db.$queryRaw`SELECT * FROM "HomepageContent" WHERE "id" = 'default' LIMIT 1`) as Array<Record<string, unknown>>;
        if (rows && rows.length > 0) record = rows[0];
      } catch {}
    }

    if (!record) {
      try {
        const { data: supaRow } = await supabaseAdmin
          .from("HomepageContent")
          .select("*")
          .eq("id", "default")
          .maybeSingle();
        if (supaRow) record = supaRow;
      } catch {}
    }

    if (!record) {
      return NextResponse.json(defaultHomepageData);
    }

    const rec = record as Record<string, string | null | undefined>;

    let parsedStats = defaultHomepageData.stats;
    let parsedWhyUsCards = defaultHomepageData.whyUsCards;
    let parsedProcessSteps = defaultHomepageData.processSteps;
    let parsedPainPointsCards = [
      { id: "01", title: "Stagnant Organic Traffic", description: "Stuck on page 2 or 3 for key terms while competitors capture high-intent buyers daily.", iconName: "TrendingDown", tag: "SEO Bottleneck" },
      { id: "02", title: "Escalating Ad Costs (CAC)", description: "Paid ad campaigns burning budget with diminishing ROI and rising cost per acquisition.", iconName: "DollarSign", tag: "Ad Inefficiency" },
      { id: "03", title: "Low Website Conversions", description: "Getting website visits but failing to convert visitors into qualified leads or paying customers.", iconName: "UserX", tag: "UX Bottleneck" },
      { id: "04", title: "Manual Lead Handling", description: "Slower follow-up times letting warm leads go cold before your sales team reaches out.", iconName: "AlertCircle", tag: "Workflow Friction" },
      { id: "05", title: "Fragmented Tech Stack", description: "Using 10 different tools that don't sync, creating data silos and wasted subscription costs.", iconName: "Cpu", tag: "Tool Chaos" },
      { id: "06", title: "Unclear ROI Reporting", description: "Vague agency reports showing vanity metrics instead of actual pipeline revenue generated.", iconName: "BarChart2", tag: "Lack of Clarity" },
    ];
    let parsedServicesCards = [
      { id: "svc-cat-1", slug: "seo", title: "Search Engine Optimization (SEO)", description: "Rank #1 on Google for high-intent search terms driving sustainable organic revenue.", iconName: "Search", popularTag: "Most Popular", subItems: ["Local SEO", "Ecommerce SEO", "International SEO", "SaaS SEO", "Semantic SEO", "Ai SEO", "Link Building", "Technical SEO"] },
      { id: "svc-cat-2", slug: "ppc", title: "PPC & Paid Search Advertising", description: "Data-driven ad campaigns targeting bottom-of-funnel buyers with maximum ROI.", iconName: "TrendingUp", popularTag: "High ROI", subItems: ["Google Ads", "Facebook Ads", "Instagram Ads", "Youtube Ads", "TikTok Ads", "Linkedin Ads", "Pinterest Ads", "X Ads"] },
      { id: "svc-cat-3", slug: "web-design-dev", title: "Web Design & Custom Development", description: "High-converting, ultra-fast websites built for speed, SEO, and lead capture.", iconName: "Code2", popularTag: "Turnkey", subItems: ["Website Design (UI/UX)", "WordPress Development", "Shopify Development", "Landing Page Design", "Website Speed Optimization", "Website Maintenance", "Website Migration", "CMS Setup"] },
      { id: "svc-cat-4", slug: "content-marketing", title: "Content Writing", description: "Authoritative content and persuasive copy that rank on Google and convert visitors into buyers.", iconName: "FileText", popularTag: "Authority", subItems: ["Blog Writing", "Website Copy", "Product Descriptions", "Social Media Copy", "Email Copy", "Ad Copy", "Sales Copy", "Video Scripts"] },
      { id: "svc-cat-5", slug: "ai-automation", title: "AI Automation", description: "Custom AI agents, voice bots, and automated workflows to streamline operations and lead follow-up.", iconName: "Cpu", popularTag: "AI Powered", subItems: ["AI Lead Automation", "CRM Automation", "YouTube Automation", "AI Voice Agents", "AI Customer Support", "Workflow Automation", "MCP Integrations", "RAG Knowledge Base"] },
      { id: "svc-cat-6", slug: "ai-video-production", title: "AI Video Production & Visual Media", description: "Studio-quality explainer videos, product ads, UGC content, and AI avatars produced in hours.", iconName: "Video", popularTag: "High ROI", subItems: ["AI Explainer & Promo Videos", "AI Product Ads", "AI UGC-Style Videos", "AI Avatar & Spokesperson Videos", "AI Short-Form Content", "AI Voiceover & Multilingual Dubbing", "AI Real Estate & Property Videos", "AI Video Repurposing"] },
    ];

    try { if (rec.stats && typeof rec.stats === "string") parsedStats = JSON.parse(rec.stats); } catch {}
    try { if (rec.whyUsCards && typeof rec.whyUsCards === "string") parsedWhyUsCards = JSON.parse(rec.whyUsCards); } catch {}
    try { if (rec.processSteps && typeof rec.processSteps === "string") parsedProcessSteps = JSON.parse(rec.processSteps); } catch {}
    try { if (rec.painPointsCards && typeof rec.painPointsCards === "string") parsedPainPointsCards = JSON.parse(rec.painPointsCards); } catch {}
    try {
      if (rec.servicesCards && typeof rec.servicesCards === "string") {
        let loaded = JSON.parse(rec.servicesCards);
        if (Array.isArray(loaded)) {
          let hasLegacy = false;
          loaded = loaded.map((card: { slug?: string; title?: string; subItems?: unknown[]; [key: string]: unknown }) => {
            if (card.slug === "china-sourcing" || (card.title && card.title.toLowerCase().includes("china"))) {
              hasLegacy = true;
              return {
                id: "svc-cat-6",
                slug: "ai-video-production",
                title: "AI Video Production & Visual Media",
                description: "Studio-quality explainer videos, product ads, UGC content, and AI avatars produced in hours.",
                iconName: "Video",
                popularTag: "High ROI",
                subItems: ["AI Explainer & Promo Videos", "AI Product Ads", "AI UGC-Style Videos", "AI Avatar & Spokesperson Videos", "AI Short-Form Content", "AI Voiceover & Multilingual Dubbing", "AI Real Estate & Property Videos", "AI Video Repurposing"],
              };
            }
            if (card.slug === "content-marketing" && (card.title !== "Content Writing" || card.subItems?.length !== 8)) {
              hasLegacy = true;
              return {
                ...card,
                title: "Content Writing",
                subItems: ["Blog Writing", "Website Copy", "Product Descriptions", "Social Media Copy", "Email Copy", "Ad Copy", "Sales Copy", "Video Scripts"],
              };
            }
            if (card.slug === "ai-automation" && (card.subItems?.length !== 8 || !card.subItems?.includes("YouTube Automation"))) {
              hasLegacy = true;
              return {
                ...card,
                title: "AI Automation",
                subItems: ["AI Lead Automation", "CRM Automation", "YouTube Automation", "AI Voice Agents", "AI Customer Support", "Workflow Automation", "MCP Integrations", "RAG Knowledge Base"],
              };
            }
            return card;
          });
          parsedServicesCards = loaded;

          if (hasLegacy) {
            const updatedJson = JSON.stringify(loaded);
            db.homepageContent.update({
              where: { id: "default" },
              data: { servicesCards: updatedJson },
            }).catch(() => {});
            supabaseAdmin
              .from("HomepageContent")
              .update({ servicesCards: updatedJson })
              .eq("id", "default")
              .then(() => {});
          }
        }
      }
    } catch {}

    return NextResponse.json({
      heroTagline: record.heroTagline || defaultHomepageData.heroTagline,
      heroTitle: record.heroTitle || defaultHomepageData.heroTitle,
      heroSubtitle: record.heroSubtitle || defaultHomepageData.heroSubtitle,
      heroPrimaryCtaText: record.heroPrimaryCtaText || defaultHomepageData.heroPrimaryCtaText,
      heroPrimaryCtaLink: record.heroPrimaryCtaLink || defaultHomepageData.heroPrimaryCtaLink,
      heroSecondaryCtaText: record.heroSecondaryCtaText || defaultHomepageData.heroSecondaryCtaText,
      heroSecondaryCtaLink: record.heroSecondaryCtaLink || defaultHomepageData.heroSecondaryCtaLink,

      statsEyebrow: record.statsEyebrow || defaultHomepageData.statsEyebrow,
      stats: parsedStats,

      servicesEyebrow: record.servicesEyebrow || defaultHomepageData.servicesEyebrow,
      servicesTitle: record.servicesTitle || defaultHomepageData.servicesTitle,
      servicesSubtitle: record.servicesSubtitle || defaultHomepageData.servicesSubtitle,
      servicesCards: parsedServicesCards,

      whyUsEyebrow: record.whyUsEyebrow || defaultHomepageData.whyUsEyebrow,
      whyUsTitle: record.whyUsTitle || defaultHomepageData.whyUsTitle,
      whyUsSubtitle: record.whyUsSubtitle || defaultHomepageData.whyUsSubtitle,
      whyUsCards: parsedWhyUsCards,

      processEyebrow: record.processEyebrow || defaultHomepageData.processEyebrow,
      processTitle: record.processTitle || defaultHomepageData.processTitle,
      processSubtitle: record.processSubtitle || defaultHomepageData.processSubtitle,
      processSteps: parsedProcessSteps,

      testimonialsEyebrow: record.testimonialsEyebrow || defaultHomepageData.testimonialsEyebrow,
      testimonialsTitle: record.testimonialsTitle || defaultHomepageData.testimonialsTitle,
      testimonialsSubtitle: record.testimonialsSubtitle || defaultHomepageData.testimonialsSubtitle,

      ctaEyebrow: record.ctaEyebrow || defaultHomepageData.ctaEyebrow,
      ctaTitle: record.ctaTitle || defaultHomepageData.ctaTitle,
      ctaSubtitle: record.ctaSubtitle || defaultHomepageData.ctaSubtitle,
      ctaButtonText: record.ctaButtonText || defaultHomepageData.ctaButtonText,
      ctaButtonLink: record.ctaButtonLink || defaultHomepageData.ctaButtonLink,

      // Pain Points Section
      painPointsEyebrow: rec.painPointsEyebrow || "04 — Problem / Pain Points",
      painPointsTitle: rec.painPointsTitle || "Are these bottlenecks holding your growth back?",
      painPointsSubtitle: rec.painPointsSubtitle || "Most digital agencies focus on vanity clicks. We diagnose and eliminate the core friction points in your revenue engine.",
      painPointsCards: parsedPainPointsCards,

      // Ecosystem Section
      ecosystemEyebrow: rec.ecosystemEyebrow || "07 — MARKETING ECOSYSTEM",
      ecosystemTitle: rec.ecosystemTitle || "Our Connected Growth Ecosystem",
      ecosystemSubtitle: rec.ecosystemSubtitle || "We don't build isolated channels. We build an interconnected revenue flywheel where every stage feeds the next.",

      // Metrics Section
      metricsEyebrow: rec.metricsEyebrow || "10 — Results / Metrics",
      metricsTitle: rec.metricsTitle || "Measurable Impact by the Numbers",

      // Industries Section
      industriesEyebrow: rec.industriesEyebrow || "Industries",
      industriesTitle: rec.industriesTitle || "Sectors we serve",
      industriesSubtitle: rec.industriesSubtitle || "We deliver tailored keyword targeting strategies and customized backend logic across multiple industry verticals.",

      // Tools Section
      toolsEyebrow: rec.toolsEyebrow || "14 — Technology / Tools",
      toolsTitle: rec.toolsTitle || "Powered by Enterprise Marketing Tech",
      toolsSubtitle: rec.toolsSubtitle || "We leverage industry-leading software and custom AI automation to execute high-precision growth campaigns.",

      seoTitle: record.seoTitle || defaultHomepageData.seoTitle,
      seoDescription: record.seoDescription || defaultHomepageData.seoDescription,
      canonicalUrl: record.canonicalUrl || defaultHomepageData.canonicalUrl,
      ogImage: record.ogImage || defaultHomepageData.ogImage,
    });
  } catch {
    return NextResponse.json(defaultHomepageData);
  }
}
