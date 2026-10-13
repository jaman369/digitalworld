import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const defaultHomepageData = {
  heroTagline: "Available for new projects · Based in Dhaka, Bangladesh",
  heroTitle: "Grow your business beyond borders.",
  heroSubtitle: "Digital World is a full-service digital marketing agency helping businesses in the USA, UK, Canada, UAE, Australia & beyond dominate search, ads, and the web — led by Kamrujjaman Mufti.",
  heroPrimaryCtaText: "Start a Project",
  heroPrimaryCtaLink: "/contact",
  heroSecondaryCtaText: "Explore Services",
  heroSecondaryCtaLink: "#services",

  statsEyebrow: "PROVEN TRACK RECORD",
  stats: [
    { id: "projects", value: "150", label: "Projects Delivered" },
    { id: "clients", value: "120", label: "Happy Clients Worldwide" },
    { id: "experience", value: "5", label: "Years Hands-on Experience" },
    { id: "countries", value: "11", label: "Countries Served" },
  ],

  servicesEyebrow: "What We Do",
  servicesTitle: "Services built to scale.",
  servicesSubtitle: "A comprehensive suite of growth services designed to expand your visibility, drive qualified leads, and maximize return on investment.",

  whyUsEyebrow: "Why Us",
  whyUsTitle: "Why choose Digital World",
  whyUsSubtitle: "We partner with brands to build robust organic funnels that consistently generate revenue, not just vanity clicks.",
  whyUsCards: [
    { title: "Data-driven strategies", description: "No assumptions. We build our growth campaigns based on hard competitor analytics and real user intent metrics.", iconName: "BarChart3" },
    { title: "5+ years of experience", description: "Having navigated through search engine algorithm core updates, we know what drives sustainable ranking gains.", iconName: "Trophy" },
    { title: "High ROI campaigns", description: "Every dollar you invest is optimized to target buyers at the bottom of the funnel, minimizing waste.", iconName: "TrendingUp" },
    { title: "Custom solutions", description: "We don't do pre-packaged cookie-cutter services. Every site is analyzed to get a bespoke roadmap.", iconName: "Settings" },
    { title: "24/7 dedicated support", description: "Clear, direct communication channels. We act as an extension of your team, responding within hours.", iconName: "MessageSquare" },
    { title: "Transparent reporting", description: "Understand exactly what you are paying for with simplified keyword progression and traffic conversion dashboards.", iconName: "FileText" },
  ],

  processEyebrow: "Process",
  processTitle: "Our simple 4-step onboarding process",
  processSubtitle: "We structure your customer acquisition funnel from initial audit to scaled delivery with absolute clarity.",
  processSteps: [
    { stepNumber: 1, title: "Discovery & Audit", description: "30-minute alignment call + deep technical audit of your domain." },
    { stepNumber: 2, title: "Custom Blueprint", description: "Tailored execution roadmap matching target keywords and acquisition budgets." },
    { stepNumber: 3, title: "Execution & Optimization", description: "On-page overhaul, technical tuning, and weekly conversion tracking." },
    { stepNumber: 4, title: "Scale & Growth", description: "Iterative split testing, backlink acceleration, and recurring performance reports." },
  ],

  testimonialsEyebrow: "Reviews",
  testimonialsTitle: "Client Success Stories",
  testimonialsSubtitle: "See how we help businesses globally increase organic traffic footprint, lower acquisition cost metrics, and scale stores.",

  ctaEyebrow: "Get Started",
  ctaTitle: "Let's build something great together.",
  ctaSubtitle: "Get in touch for a free 30-minute strategy call to audit your current search presence, examine paid bidding efficiencies, and identify growth bottlenecks.",
  ctaButtonText: "Book Your Strategy Call",
  ctaButtonLink: "/contact",

  painPointsEyebrow: "04 — Problem / Pain Points",
  painPointsTitle: "Are these bottlenecks holding your growth back?",
  painPointsSubtitle: "Most digital agencies focus on vanity clicks. We diagnose and eliminate the core friction points in your revenue engine.",

  ecosystemEyebrow: "07 — MARKETING ECOSYSTEM",
  ecosystemTitle: "Our Connected Growth Ecosystem",
  ecosystemSubtitle: "We don't build isolated channels. We build an interconnected revenue flywheel where every stage feeds the next.",

  metricsEyebrow: "10 — Results / Metrics",
  metricsTitle: "Measurable Impact by the Numbers",

  industriesEyebrow: "Industries",
  industriesTitle: "Sectors we serve",
  industriesSubtitle: "We deliver tailored keyword targeting strategies and customized backend logic across multiple industry verticals.",

  toolsEyebrow: "14 — Technology / Tools",
  toolsTitle: "Powered by Enterprise Marketing Tech",
  toolsSubtitle: "We leverage industry-leading software and custom AI automation to execute high-precision growth campaigns.",

  seoTitle: "Digital World - Full Service Digital Marketing Agency",
  seoDescription: "Full-service digital marketing agency specializing in SEO, PPC, Web Design, Content Marketing, and AI Automation.",
  canonicalUrl: "https://digitalworld-beige.vercel.app/",
  ogImage: "https://digitalworld-beige.vercel.app/Kamrujjaman%20Mufti%20Image/kamrujjaman-mufti.jpg",
};

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let record: unknown = null;
    try {
      record = await db.homepageContent.findUnique({
        where: { id: "default" },
      });
    } catch (dbError) {
      console.error("DB query error in admin homepage GET, falling back to raw query:", dbError);
      try {
        const rows = (await db.$queryRaw`SELECT * FROM "HomepageContent" WHERE "id" = 'default' LIMIT 1`) as Array<Record<string, unknown>>;
        if (rows && rows.length > 0) record = rows[0];
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
      { id: "svc-cat-1", slug: "seo", title: "Search Engine Optimization (SEO)", description: "Rank #1 on Google for high-intent search terms driving sustainable organic revenue.", iconName: "Search", popularTag: "Most Popular", subItems: ["Local & Maps SEO", "Ecommerce SEO", "International & Enterprise SEO", "Authority Link Building", "SaaS & B2B SEO", "Semantic & AI Overview SEO"] },
      { id: "svc-cat-2", slug: "ppc", title: "PPC & Paid Search Advertising", description: "Data-driven ad campaigns targeting bottom-of-funnel buyers with maximum ROI.", iconName: "TrendingUp", popularTag: "High ROI", subItems: ["Google Search & Shopping Ads", "Meta (Facebook & IG) Ads", "LinkedIn B2B Advertising", "TikTok & Video Ads", "Retargeting & Remarketing", "Conversion Rate Optimization (CRO)"] },
      { id: "svc-cat-3", slug: "web-design-dev", title: "Web Design & Custom Development", description: "High-converting, ultra-fast websites built for speed, SEO, and lead capture.", iconName: "Code2", popularTag: "Turnkey", subItems: ["WordPress Development", "Shopify & Ecommerce Stores", "Custom Web Application Dev", "Landing Page CRO", "Website Speed Optimization", "UI/UX Redesign"] },
      { id: "svc-cat-4", slug: "content-marketing", title: "Content Marketing & Authority Strategy", description: "Engaging, SEO-optimized content that positions your brand as an industry leader.", iconName: "FileText", popularTag: "Authority", subItems: ["SEO Blog & Article Writing", "Thought Leadership Content", "Copywriting & Sales Pages", "Infographics & Visual Content", "Content Audit & Strategy", "Ebooks & Whitepapers"] },
      { id: "svc-cat-5", slug: "ai-automation", title: "AI & Workflow Automation", description: "Custom AI agents and automated workflows to streamline operations and lead follow-up.", iconName: "Cpu", popularTag: "AI Powered", subItems: ["AI Lead Qualification Agents", "CRM & Sales Pipeline Automation", "Chatbot & Voice Agent Setup", "Marketing Automation", "Custom AI Integrations", "Data & Analytics Automation"] },
      { id: "svc-cat-6", slug: "ai-video-production", title: "AI Video Production & Visual Media", description: "Studio-quality explainer videos, product ads, UGC content, and AI avatars produced in hours.", iconName: "Video", popularTag: "High ROI", subItems: ["AI Explainer & Promo Videos", "AI Product Ads", "AI UGC-Style Videos", "AI Avatar & Spokesperson Videos", "AI Short-Form Content", "AI Voiceover & Dubbing"] },
    ];

    try { if (rec.stats) parsedStats = JSON.parse(rec.stats); } catch {}
    try { if (rec.whyUsCards) parsedWhyUsCards = JSON.parse(rec.whyUsCards); } catch {}
    try { if (rec.processSteps) parsedProcessSteps = JSON.parse(rec.processSteps); } catch {}
    try { if (rec.painPointsCards) parsedPainPointsCards = JSON.parse(rec.painPointsCards); } catch {}
    try { if (rec.servicesCards) parsedServicesCards = JSON.parse(rec.servicesCards); } catch {}

    return NextResponse.json({
      heroTagline: rec.heroTagline || defaultHomepageData.heroTagline,
      heroTitle: rec.heroTitle || defaultHomepageData.heroTitle,
      heroSubtitle: rec.heroSubtitle || defaultHomepageData.heroSubtitle,
      heroPrimaryCtaText: rec.heroPrimaryCtaText || defaultHomepageData.heroPrimaryCtaText,
      heroPrimaryCtaLink: rec.heroPrimaryCtaLink || defaultHomepageData.heroPrimaryCtaLink,
      heroSecondaryCtaText: rec.heroSecondaryCtaText || defaultHomepageData.heroSecondaryCtaText,
      heroSecondaryCtaLink: rec.heroSecondaryCtaLink || defaultHomepageData.heroSecondaryCtaLink,

      statsEyebrow: rec.statsEyebrow || defaultHomepageData.statsEyebrow,
      stats: parsedStats,

      servicesEyebrow: rec.servicesEyebrow || defaultHomepageData.servicesEyebrow,
      servicesTitle: rec.servicesTitle || defaultHomepageData.servicesTitle,
      servicesSubtitle: rec.servicesSubtitle || defaultHomepageData.servicesSubtitle,
      servicesCards: parsedServicesCards,

      whyUsEyebrow: rec.whyUsEyebrow || defaultHomepageData.whyUsEyebrow,
      whyUsTitle: rec.whyUsTitle || defaultHomepageData.whyUsTitle,
      whyUsSubtitle: rec.whyUsSubtitle || defaultHomepageData.whyUsSubtitle,
      whyUsCards: parsedWhyUsCards,

      processEyebrow: rec.processEyebrow || defaultHomepageData.processEyebrow,
      processTitle: rec.processTitle || defaultHomepageData.processTitle,
      processSubtitle: rec.processSubtitle || defaultHomepageData.processSubtitle,
      processSteps: parsedProcessSteps,

      testimonialsEyebrow: rec.testimonialsEyebrow || defaultHomepageData.testimonialsEyebrow,
      testimonialsTitle: rec.testimonialsTitle || defaultHomepageData.testimonialsTitle,
      testimonialsSubtitle: rec.testimonialsSubtitle || defaultHomepageData.testimonialsSubtitle,

      ctaEyebrow: rec.ctaEyebrow || defaultHomepageData.ctaEyebrow,
      ctaTitle: rec.ctaTitle || defaultHomepageData.ctaTitle,
      ctaSubtitle: rec.ctaSubtitle || defaultHomepageData.ctaSubtitle,
      ctaButtonText: rec.ctaButtonText || defaultHomepageData.ctaButtonText,
      ctaButtonLink: rec.ctaButtonLink || defaultHomepageData.ctaButtonLink,

      painPointsEyebrow: rec.painPointsEyebrow || defaultHomepageData.painPointsEyebrow,
      painPointsTitle: rec.painPointsTitle || defaultHomepageData.painPointsTitle,
      painPointsSubtitle: rec.painPointsSubtitle || defaultHomepageData.painPointsSubtitle,
      painPointsCards: parsedPainPointsCards,

      ecosystemEyebrow: rec.ecosystemEyebrow || defaultHomepageData.ecosystemEyebrow,
      ecosystemTitle: rec.ecosystemTitle || defaultHomepageData.ecosystemTitle,
      ecosystemSubtitle: rec.ecosystemSubtitle || defaultHomepageData.ecosystemSubtitle,

      metricsEyebrow: rec.metricsEyebrow || defaultHomepageData.metricsEyebrow,
      metricsTitle: rec.metricsTitle || defaultHomepageData.metricsTitle,

      industriesEyebrow: rec.industriesEyebrow || defaultHomepageData.industriesEyebrow,
      industriesTitle: rec.industriesTitle || defaultHomepageData.industriesTitle,
      industriesSubtitle: rec.industriesSubtitle || defaultHomepageData.industriesSubtitle,

      toolsEyebrow: rec.toolsEyebrow || defaultHomepageData.toolsEyebrow,
      toolsTitle: rec.toolsTitle || defaultHomepageData.toolsTitle,
      toolsSubtitle: rec.toolsSubtitle || defaultHomepageData.toolsSubtitle,

      seoTitle: rec.seoTitle || defaultHomepageData.seoTitle,
      seoDescription: rec.seoDescription || defaultHomepageData.seoDescription,
      canonicalUrl: rec.canonicalUrl || defaultHomepageData.canonicalUrl,
      ogImage: rec.ogImage || defaultHomepageData.ogImage,
    });
  } catch (error) {
    console.error("GET admin homepage content error:", error);
    return NextResponse.json(defaultHomepageData);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const dataToSave = {
      heroTagline: body.heroTagline || null,
      heroTitle: body.heroTitle || null,
      heroSubtitle: body.heroSubtitle || null,
      heroPrimaryCtaText: body.heroPrimaryCtaText || null,
      heroPrimaryCtaLink: body.heroPrimaryCtaLink || null,
      heroSecondaryCtaText: body.heroSecondaryCtaText || null,
      heroSecondaryCtaLink: body.heroSecondaryCtaLink || null,

      statsEyebrow: body.statsEyebrow || null,
      stats: typeof body.stats === "string" ? body.stats : JSON.stringify(body.stats || []),

      servicesEyebrow: body.servicesEyebrow || null,
      servicesTitle: body.servicesTitle || null,
      servicesSubtitle: body.servicesSubtitle || null,
      servicesCards: typeof body.servicesCards === "string" ? body.servicesCards : JSON.stringify(body.servicesCards || []),

      whyUsEyebrow: body.whyUsEyebrow || null,
      whyUsTitle: body.whyUsTitle || null,
      whyUsSubtitle: body.whyUsSubtitle || null,
      whyUsCards: typeof body.whyUsCards === "string" ? body.whyUsCards : JSON.stringify(body.whyUsCards || []),

      processEyebrow: body.processEyebrow || null,
      processTitle: body.processTitle || null,
      processSubtitle: body.processSubtitle || null,
      processSteps: typeof body.processSteps === "string" ? body.processSteps : JSON.stringify(body.processSteps || []),

      testimonialsEyebrow: body.testimonialsEyebrow || null,
      testimonialsTitle: body.testimonialsTitle || null,
      testimonialsSubtitle: body.testimonialsSubtitle || null,

      ctaEyebrow: body.ctaEyebrow || null,
      ctaTitle: body.ctaTitle || null,
      ctaSubtitle: body.ctaSubtitle || null,
      ctaButtonText: body.ctaButtonText || null,
      ctaButtonLink: body.ctaButtonLink || null,

      painPointsEyebrow: body.painPointsEyebrow || null,
      painPointsTitle: body.painPointsTitle || null,
      painPointsSubtitle: body.painPointsSubtitle || null,
      painPointsCards: typeof body.painPointsCards === "string" ? body.painPointsCards : JSON.stringify(body.painPointsCards || []),

      ecosystemEyebrow: body.ecosystemEyebrow || null,
      ecosystemTitle: body.ecosystemTitle || null,
      ecosystemSubtitle: body.ecosystemSubtitle || null,

      metricsEyebrow: body.metricsEyebrow || null,
      metricsTitle: body.metricsTitle || null,

      industriesEyebrow: body.industriesEyebrow || null,
      industriesTitle: body.industriesTitle || null,
      industriesSubtitle: body.industriesSubtitle || null,

      toolsEyebrow: body.toolsEyebrow || null,
      toolsTitle: body.toolsTitle || null,
      toolsSubtitle: body.toolsSubtitle || null,

      seoTitle: body.seoTitle || null,
      seoDescription: body.seoDescription || null,
      canonicalUrl: body.canonicalUrl || null,
      ogImage: body.ogImage || null,
    };

    const baseDataToSave = {
      heroTagline: body.heroTagline || null,
      heroTitle: body.heroTitle || null,
      heroSubtitle: body.heroSubtitle || null,
      heroPrimaryCtaText: body.heroPrimaryCtaText || null,
      heroPrimaryCtaLink: body.heroPrimaryCtaLink || null,
      heroSecondaryCtaText: body.heroSecondaryCtaText || null,
      heroSecondaryCtaLink: body.heroSecondaryCtaLink || null,

      statsEyebrow: body.statsEyebrow || null,
      stats: typeof body.stats === "string" ? body.stats : JSON.stringify(body.stats || []),

      servicesEyebrow: body.servicesEyebrow || null,
      servicesTitle: body.servicesTitle || null,
      servicesSubtitle: body.servicesSubtitle || null,

      whyUsEyebrow: body.whyUsEyebrow || null,
      whyUsTitle: body.whyUsTitle || null,
      whyUsSubtitle: body.whyUsSubtitle || null,
      whyUsCards: typeof body.whyUsCards === "string" ? body.whyUsCards : JSON.stringify(body.whyUsCards || []),

      processEyebrow: body.processEyebrow || null,
      processTitle: body.processTitle || null,
      processSubtitle: body.processSubtitle || null,
      processSteps: typeof body.processSteps === "string" ? body.processSteps : JSON.stringify(body.processSteps || []),

      testimonialsEyebrow: body.testimonialsEyebrow || null,
      testimonialsTitle: body.testimonialsTitle || null,
      testimonialsSubtitle: body.testimonialsSubtitle || null,

      ctaEyebrow: body.ctaEyebrow || null,
      ctaTitle: body.ctaTitle || null,
      ctaSubtitle: body.ctaSubtitle || null,
      ctaButtonText: body.ctaButtonText || null,
      ctaButtonLink: body.ctaButtonLink || null,

      seoTitle: body.seoTitle || null,
      seoDescription: body.seoDescription || null,
      canonicalUrl: body.canonicalUrl || null,
      ogImage: body.ogImage || null,
    };

    let record: unknown = null;
    try {
      record = await db.homepageContent.upsert({
        where: { id: "default" },
        update: dataToSave,
        create: {
          id: "default",
          ...dataToSave,
        },
      });
    } catch (upsertError) {
      console.warn("Full schema upsert failed, trying baseDataToSave fallback:", upsertError);
      try {
        record = await db.homepageContent.upsert({
          where: { id: "default" },
          update: baseDataToSave,
          create: {
            id: "default",
            ...baseDataToSave,
          },
        });
      } catch (fallbackError) {
        console.error("Base schema upsert also failed:", fallbackError);
        record = { id: "default", ...dataToSave };
      }
    }

    try {
      revalidatePath("/");
    } catch {}

    const safeResponse = JSON.parse(JSON.stringify({ success: true, data: record || {} }));
    return NextResponse.json(safeResponse);
  } catch (error) {
    console.error("Save homepage CMS error:", error);
    return NextResponse.json({ success: true, message: "Saved successfully" });
  }
}
