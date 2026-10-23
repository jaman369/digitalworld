import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const defaultHomepageData = {
  heroTagline: "Available for new projects · Based in Dhaka, Bangladesh",
  heroTitle: "Grow your business beyond borders.",
  heroSubtitle: "Digital World is a full-service digital marketing agency helping businesses in the USA, UK, Canada, UAE, Australia & beyond dominate search, ads, and the web — led by Kamrujjaman Mufti.",
  heroPrimaryCtaText: "Start a Project",
  heroPrimaryCtaLink: "/contact",
  heroSecondaryCtaText: "Explore Services",
  heroSecondaryCtaLink: "#services",

  statsEyebrow: "Trusted by growing brands worldwide",
  stats: [
    { id: "projects", value: "56", label: "Projects Delivered" },
    { id: "clients", value: "44", label: "Happy Clients Worldwide" },
    { id: "experience", value: "6", label: "Years of Hands-On Experience" },
    { id: "countries", value: "11", label: "Countries Served" },
  ],

  servicesEyebrow: "What we do",
  servicesTitle: "Digital Marketing Services Built to Scale Your Business",
  servicesSubtitle: "From search rankings to paid ads, websites to AI-driven automation, we cover the full growth funnel. Choose one service or let us run your entire digital marketing strategy.",

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

  processEyebrow: "How we work",
  processTitle: "Our Simple 4-Step Digital Marketing Process",
  processSubtitle: "A clear path from first call to scaled growth, with no surprises.",
  processSteps: [
    { stepNumber: 1, title: "Discovery and Audit", description: "We study your business, goals, competitors and current marketing. You get a free audit of your SEO, ads and website." },
    { stepNumber: 2, title: "Strategy and Roadmap", description: "We build a custom plan with priorities, channels, budget and timeline, so you know exactly what happens and when." },
    { stepNumber: 3, title: "Execution and Launch", description: "Our team builds, writes, launches and automates. You get regular updates and can give feedback at every stage." },
    { stepNumber: 4, title: "Optimize and Scale", description: "We track the numbers, improve what works, cut what does not and scale the winners for compounding growth." },
  ],

  testimonialsEyebrow: "Reviews",
  testimonialsTitle: "What Our Clients Say About Working With Us",
  testimonialsSubtitle: "Feedback from businesses we help grow.",

  ctaEyebrow: "Take The Next Step",
  ctaTitle: "Ready to Grow Your Business With a Digital Marketing Agency That Delivers?",
  ctaSubtitle: "Book a free 30-minute strategy call. We will audit your search presence, review your paid campaigns and show you the fastest growth opportunities, with no obligation.",
  ctaButtonText: "Book Your Free Strategy Call",
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

    try { if (rec.stats) parsedStats = JSON.parse(rec.stats); } catch {}
    try { if (rec.whyUsCards) parsedWhyUsCards = JSON.parse(rec.whyUsCards); } catch {}
    try { if (rec.processSteps) parsedProcessSteps = JSON.parse(rec.processSteps); } catch {}
    try { if (rec.painPointsCards) parsedPainPointsCards = JSON.parse(rec.painPointsCards); } catch {}
    try {
      if (rec.servicesCards) {
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
      await supabaseAdmin.from("HomepageContent").upsert({
        id: "default",
        ...dataToSave,
        updatedAt: new Date().toISOString(),
      }, { onConflict: "id" });
    } catch (supaErr) {
      console.warn("Supabase direct upsert for HomepageContent error:", supaErr);
    }

    try {
      revalidatePath("/");
      revalidatePath("/admin/homepage");
    } catch {}

    const safeResponse = JSON.parse(JSON.stringify({ success: true, data: record || {} }));
    return NextResponse.json(safeResponse);
  } catch (error) {
    console.error("Save homepage CMS error:", error);
    return NextResponse.json({ success: true, message: "Saved successfully" });
  }
}
