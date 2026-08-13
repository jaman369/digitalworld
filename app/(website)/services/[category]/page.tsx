import { notFound } from "next/navigation";
import Link from "next/link";
import * as Icons from "lucide-react";
import { servicesData } from "@/data/services";
import ServiceCategoryNav from "@/components/sections/ServiceCategoryNav";
import ServiceExtraSections from "@/components/sections/ServiceExtraSections";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ category: string }>;
}

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
    highlightColorClass: "text-[#0076FF]",
    glowClass: "bg-[radial-gradient(ellipse_at_top_left,rgba(0,118,255,0.22),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.18),transparent_55%)]",
    dotColorClass: "bg-[#0076FF]",
    eyebrowColorClass: "text-[#0076FF] bg-blue-50/90 border-blue-200",
    btnClass: "bg-[#0076FF] hover:bg-[#0066DD] shadow-blue-500/20"
  },
  ppc: {
    eyebrow: "PPC & Paid Advertising",
    headlineFirst: "Every pound spent.",
    headlineHighlight: "Maximum return.",
    description: "Stop burning budget on ads that don't convert. We build data-driven paid campaigns across Google, Meta, TikTok & LinkedIn — engineered for profit, not just clicks.",
    ctaText: "Get Free PPC Audit →",
    ctaLink: "/contact?service=ppc-audit",
    highlightColorClass: "bg-gradient-to-r from-[#F97316] to-[#EF4444] bg-clip-text text-transparent",
    glowClass: "bg-[radial-gradient(ellipse_at_top_left,rgba(249,115,22,0.24),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(239,68,68,0.18),transparent_55%)]",
    dotColorClass: "bg-[#F97316]",
    eyebrowColorClass: "text-orange-600 bg-orange-50/90 border-orange-200",
    btnClass: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-orange-500/20"
  },
  "web-design-dev": {
    eyebrow: "Development & Design",
    headlineFirst: "Websites built for speed,",
    headlineHighlight: "designed for conversion.",
    description: "Stunning, custom-coded web experiences optimized to pass PageSpeed audits and keep users engaged throughout their journey.",
    ctaText: "Request a Proposal",
    ctaLink: "/contact?service=web-proposal",
    highlightColorClass: "text-[#6366F1]",
    glowClass: "bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.24),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.18),transparent_55%)]",
    dotColorClass: "bg-[#6366F1]",
    eyebrowColorClass: "text-indigo-600 bg-indigo-50/90 border-indigo-200",
    btnClass: "bg-[#6366F1] hover:bg-indigo-600 shadow-indigo-500/20"
  },
  "content-marketing": {
    eyebrow: "Content Strategy",
    headlineFirst: "Authoritative content that",
    headlineHighlight: "converts lists to leads.",
    description: "Turn search intent into brand loyalty with high-quality content plans and automated email nurturing sequences.",
    ctaText: "Get Content Plan",
    ctaLink: "/contact?service=content-plan",
    highlightColorClass: "text-[#D97706]",
    glowClass: "bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.24),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(217,119,6,0.18),transparent_55%)]",
    dotColorClass: "bg-[#D97706]",
    eyebrowColorClass: "text-amber-700 bg-amber-50/90 border-amber-200",
    btnClass: "bg-[#D97706] hover:bg-amber-700 shadow-amber-500/20"
  },
  "ai-automation": {
    eyebrow: "AI & Workflow Automation",
    headlineFirst: "Scale operations with",
    headlineHighlight: "intelligent AI systems.",
    description: "Deploy custom AI chatbots, automated lead routing, and workflow pipelines that eliminate manual friction.",
    ctaText: "Build AI Workflow",
    ctaLink: "/contact?service=ai-workflow",
    highlightColorClass: "text-[#9333EA]",
    glowClass: "bg-[radial-gradient(ellipse_at_top_left,rgba(168,85,247,0.26),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.18),transparent_55%)]",
    dotColorClass: "bg-[#9333EA]",
    eyebrowColorClass: "text-purple-700 bg-purple-50/90 border-purple-200",
    btnClass: "bg-[#9333EA] hover:bg-purple-700 shadow-purple-500/20"
  },
  "china-sourcing": {
    eyebrow: "Global Supply Chain",
    headlineFirst: "Direct factory sourcing",
    headlineHighlight: "with complete QC peace of mind.",
    description: "On-site factory vetting, Mandarin price negotiations, and pre-shipment inspections across major manufacturing hubs.",
    ctaText: "Request Sourcing Audit",
    ctaLink: "/contact?service=sourcing-audit",
    highlightColorClass: "text-[#E11D48]",
    glowClass: "bg-[radial-gradient(ellipse_at_top_left,rgba(225,29,72,0.24),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.18),transparent_55%)]",
    dotColorClass: "bg-[#E11D48]",
    eyebrowColorClass: "text-rose-700 bg-rose-50/90 border-rose-200",
    btnClass: "bg-[#E11D48] hover:bg-rose-700 shadow-rose-500/20"
  }
};

interface SubItem {
  name: string;
  slug: string;
  description: string;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;

  // 1. Fetch static fallback
  const staticCategory = servicesData.find((c) => c.slug === categorySlug);

  // 2. Fetch CMS override from DB
  let cmsCategory = null;
  try {
    const found = await db.servicePage.findFirst({
      where: { slug: categorySlug },
    });
    if (found) {
      cmsCategory = {
        title: found.name,
        description: found.description,
        iconName: "Search",
        subItems: typeof found.benefits === "string" ? JSON.parse(found.benefits) : [],
      };
    }
  } catch (err) {
    console.error("DB fetch error in category page:", err);
  }

  if (!staticCategory && !cmsCategory) {
    notFound();
  }

  const title = cmsCategory?.title || staticCategory?.title || "";
  const description = cmsCategory?.description || staticCategory?.description || "";
  const subItems: SubItem[] = (cmsCategory?.subItems && cmsCategory.subItems.length > 0)
    ? (cmsCategory.subItems as SubItem[])
    : (staticCategory?.subItems || []);

  const override = heroOverrides[categorySlug] || {
    eyebrow: title,
    headlineFirst: title,
    headlineHighlight: "done right.",
    description: description,
    ctaText: "Get Started",
    ctaLink: "/contact",
    highlightColorClass: "text-[#0076FF]",
    glowClass: "bg-[radial-gradient(ellipse_at_top_left,rgba(0,118,255,0.22),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.18),transparent_55%)]",
    dotColorClass: "bg-[#0076FF]",
    eyebrowColorClass: "text-[#0076FF] bg-blue-50/90 border-blue-200",
    btnClass: "bg-[#0076FF] hover:bg-[#0066DD]"
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">

      {/* ── 02 — SERVICES HERO (Custom Banner Background + Unique Per-Service Ambient Color Glow) ── */}
      <section
        className="relative pt-36 pb-24 lg:pt-44 lg:pb-32 overflow-hidden bg-cover bg-center bg-no-repeat border-b border-neutral-200/80"
        style={{ backgroundImage: "url('/images/Banner design.jpg')" }}
      >
        {/* Unique Dynamic Ambient Color Glow matching Service Title */}
        <div className={`absolute inset-0 ${override.glowClass} pointer-events-none z-0`} />

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            
            {/* Eyebrow Badge */}
            <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6 ${override.eyebrowColorClass || "text-blue-600 bg-blue-50/90 border-blue-200"}`}>
              <span className={`h-2 w-2 rounded-full ${override.dotColorClass || "bg-blue-600"}`} />
              {override.eyebrow}
            </span>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.15] mb-6">
              {override.headlineFirst} <span className={override.highlightColorClass}>{override.headlineHighlight}</span>
            </h1>

            {/* Subheadline Description */}
            <div
              className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto mb-10"
              dangerouslySetInnerHTML={{ __html: override.description }}
            />

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={override.ctaLink}
                className={`inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all shadow-md hover:scale-105 ${override.btnClass || "bg-[#0076FF] hover:bg-[#0066DD]"}`}
              >
                <span>{override.ctaText}</span>
                <Icons.ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-neutral-200/90 hover:border-neutral-300 hover:bg-white px-7 py-4 text-xs font-bold uppercase tracking-widest text-neutral-700 hover:text-neutral-900 transition-all shadow-xs backdrop-blur-sm"
              >
                <span>Explore Case Studies</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── 03 — SERVICE CATEGORY NAVIGATION ── */}
      <ServiceCategoryNav currentCategorySlug={categorySlug} />

      {/* ── 04 — SERVICE OVERVIEW ── */}
      <section className="py-20 lg:py-28 bg-white border-b border-neutral-200/80">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs font-bold text-[#0076FF] uppercase tracking-widest mb-4">
              04 — Service Overview
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              Comprehensive {title} Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {subItems.map((sub, idx) => (
              <div
                key={sub.slug || idx}
                id={sub.slug}
                className="bg-[#F8FAFC] border border-neutral-200/80 rounded-2xl p-8 hover:border-[#0076FF]/60 hover:bg-white transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#0076FF] block mb-3">
                    0{idx + 1} — CAPABILITY
                  </span>
                  <h3 className="font-sans text-xl font-bold text-neutral-900 mb-3">
                    {sub.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                    {sub.description}
                  </p>
                </div>

                <Link
                  href={`/contact?service=${categorySlug}&sub=${sub.slug}`}
                  className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-[#0076FF] hover:text-blue-700 transition-colors uppercase tracking-wider"
                >
                  <span>Request Solution</span>
                  <Icons.ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 THROUGH 13 — WIREFRAME BLUEPRINT SECTIONS ── */}
      <ServiceExtraSections categorySlug={categorySlug} />

    </div>
  );
}
