import { notFound } from "next/navigation";
import Link from "next/link";
import * as Icons from "lucide-react";
import { servicesData } from "@/data/services";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((category) => ({
    category: category.slug,
  }));
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
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_60%)]",
    dotColorClass: "bg-[#10B981]"
  },
  ppc: {
    eyebrow: "PPC & Paid Advertising",
    headlineFirst: "Every pound spent.",
    headlineHighlight: "Maximum return.",
    description: "Stop burning budget on ads that don't convert. We build <strong class='text-neutral-200 font-semibold'>data-driven paid campaigns</strong> across Google, Meta, TikTok & LinkedIn — engineered for profit, not just clicks.",
    ctaText: "Get Free PPC Audit →",
    ctaLink: "/contact?service=ppc-audit",
    highlightColorClass: "bg-gradient-to-r from-[#F97316] to-[#EF4444] bg-clip-text text-transparent",
    glowClass: "bg-[radial-gradient(circle_at_left_rgba(245,158,11,0.08)_0%,transparent_60%),radial-gradient(circle_at_right_rgba(59,130,246,0.08)_0%,transparent_60%)]",
    dotColorClass: "bg-[#F97316]",
    btnClass: "bg-gradient-to-r from-[#F59E0B] to-[#F97316] hover:from-[#D97706] hover:to-[#EA580C] text-neutral-950 font-bold",
    secCtaText: "Chat on WhatsApp",
    secCtaLink: "https://wa.me/8801798667820",
    secCtaIconName: "MessageCircle"
  },
  "web-design-dev": {
    eyebrow: "Development & Design",
    headlineFirst: "Websites built for speed,",
    headlineHighlight: "designed for conversion.",
    description: "Stunning, custom-coded web experiences optimized to pass PageSpeed audits and keep users engaged throughout their journey.",
    ctaText: "Request a Proposal",
    ctaLink: "/contact?service=web-proposal",
    highlightColorClass: "text-indigo-400",
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_60%)]",
    dotColorClass: "bg-indigo-400"
  },
  "content-marketing": {
    eyebrow: "Content Strategy",
    headlineFirst: "Authoritative content that",
    headlineHighlight: "converts lists to leads.",
    description: "Turn search intent into brand loyalty with high-quality content plans and automated email nurturing sequences.",
    ctaText: "Get Content Plan",
    ctaLink: "/contact?service=content-plan",
    highlightColorClass: "text-amber-500",
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0%,transparent_60%)]",
    dotColorClass: "bg-amber-500"
  },
  "ai-automation": {
    eyebrow: "AI Automation",
    headlineFirst: "Autonomous agents that",
    headlineHighlight: "streamline workflows.",
    description: "Integrate custom intelligent tools and bots to handle support, lead parsing, and manual tasks 24/7.",
    ctaText: "Book AI Consultation",
    ctaLink: "/contact?service=ai-consultation",
    highlightColorClass: "text-cyan-400",
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_60%)]",
    dotColorClass: "bg-cyan-400"
  },
  "china-sourcing": {
    eyebrow: "China Sourcing Services",
    headlineFirst: "Direct factory sourcing &",
    headlineHighlight: "global logistics management.",
    description: "Verification, negotiations, quality inspections, and ocean freight handled directly from China to your warehouse.",
    ctaText: "Inquire Sourcing",
    ctaLink: "/contact?service=sourcing-inquiry",
    highlightColorClass: "text-rose-500",
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.08)_0%,transparent_60%)]",
    dotColorClass: "bg-rose-500"
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
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(0,118,255,0.08)_0%,transparent_60%)]",
    dotColorClass: "bg-primary"
  };

  const SecCtaIcon = override.secCtaIconName ? (Icons[override.secCtaIconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>) : null;

  return (
    <article className="min-h-screen bg-white">
      {/* Category Hero Banner */}
      <section className="relative overflow-hidden bg-[#09090B] py-24 lg:py-32 text-white border-b border-neutral-900">
        {/* Background glow overlay */}
        <div className={`absolute inset-0 -z-10 ${override.glowClass}`} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            
            {/* Eyebrow badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900/50 border border-neutral-800/80 px-3.5 py-1 text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">
              <span className={`h-1.5 w-1.5 rounded-full ${override.dotColorClass || "bg-primary"}`} />
              {override.eyebrow}
            </span>
            
            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.5rem] font-bold tracking-tight leading-[1.15] mb-6 max-w-2xl">
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
                className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-8 py-3.5 font-sans text-xs font-bold transition-all hover:scale-[1.01] active:scale-[0.99] ${
                  override.btnClass || "bg-primary hover:bg-primary-hover text-white shadow-sm"
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
      </section>

      {/* Sub-items Anchor List */}
      <section id="services-list" className="py-20 lg:py-24 scroll-mt-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-16 lg:gap-20">
            {category.subItems.map((sub, idx) => {
              return (
                <div 
                  key={sub.slug}
                  id={sub.slug}
                  className="scroll-mt-28 group relative rounded-3xl border border-neutral-200/60 bg-white p-8 lg:p-12 shadow-sm transition-all duration-300 hover:shadow-premium hover:border-primary/20"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* Left Column: Content (7/12) */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">
                          Service 0{idx + 1}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-neutral-300" />
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                          {category.title}
                        </span>
                      </div>
                      
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
                        {sub.name}
                      </h3>
                      
                      {sub.tagline && (
                        <p className="font-sans text-xs sm:text-sm font-semibold text-primary mb-4">
                          {sub.tagline}
                        </p>
                      )}
                      
                      <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed mb-6">
                        {sub.description}
                      </p>

                      {/* Benefits bullets list */}
                      {sub.benefits && sub.benefits.length > 0 && (
                        <div className="mb-8">
                          <h4 className="font-sans text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-3">
                            Key Deliverables & Benefits
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {sub.benefits.map((benefit, bidx) => (
                              <li key={bidx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-600">
                                <Icons.CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Actions Row */}
                      <div className="flex flex-wrap items-center gap-4 border-t border-neutral-100 pt-6 mt-4">
                        <Link
                          href={sub.primaryCtaLink || `/contact?service=${sub.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary hover:bg-primary-hover px-5 py-2.5 font-sans text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.01]"
                        >
                          {sub.primaryCtaText || "Get Started"} <Icons.ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        
                        {sub.secondaryCtaText && (
                          <Link
                            href={sub.secondaryCtaLink || "/portfolio"}
                            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50 px-5 py-2.5 font-sans text-xs font-bold text-neutral-600 transition-all"
                          >
                            {sub.secondaryCtaText.toLowerCase().includes("case") && <Icons.FolderOpen className="h-3.5 w-3.5 text-neutral-400" />}
                            {sub.secondaryCtaText}
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Free for Image Placeholder (5/12) */}
                    <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-2xl bg-neutral-950 overflow-hidden border border-neutral-800 shadow-inner group-hover:border-neutral-700/60 transition-all duration-300">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f12_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-35" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06)_0%,transparent_60%)]" />
                      
                      {/* Center Display elements */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white mb-4 shadow-sm backdrop-blur-md">
                          <Icons.MonitorPlay className="h-5 w-5 text-primary-light" />
                        </div>
                        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">
                          CASE STUDY VISUAL
                        </span>
                        <h5 className="font-sans font-bold text-xs text-neutral-300 max-w-[200px]">
                          {sub.name} Performance
                        </h5>
                        <p className="font-sans text-[10px] text-neutral-500 mt-2">
                          Click case study links to view.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </article>
  );
}
