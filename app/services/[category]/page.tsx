import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
      <section id="services-list" className="py-20 lg:py-24 bg-neutral-50/20 border-t border-neutral-100 scroll-mt-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-12 lg:gap-16">
            {category.subItems.map((sub) => {
              return (
                <div 
                  key={sub.slug}
                  id={sub.slug}
                  className="scroll-mt-28 py-16 lg:py-20 border-b border-neutral-200/50 last:border-b-0 first:pt-0 last:pb-0 group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    
                    {/* Left Column: Content (7/12) */}
                    <div className="lg:col-span-7 flex flex-col justify-center text-left">
                      <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-[0.25em] mb-4 block">
                        {sub.name}
                      </span>
                      
                      <h3 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight mb-6 max-w-xl">
                        {sub.tagline || sub.name}
                      </h3>
                      
                      <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed mb-8 max-w-xl">
                        {sub.description}
                      </p>

                      {/* Benefits checklist (single vertical column) */}
                      {sub.benefits && sub.benefits.length > 0 && (
                        <ul className="flex flex-col gap-3.5 mb-8 text-left max-w-xl">
                          {sub.benefits.map((benefit, bidx) => (
                            <li key={bidx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-500">
                              <Icons.Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Actions Row */}
                      <div className="flex flex-wrap items-center gap-4">
                        <Link
                          href={sub.primaryCtaLink || `/contact?service=${sub.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary hover:bg-primary-hover px-6 py-3 font-sans text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.01]"
                        >
                          {sub.primaryCtaText || "Get Started"} <Icons.ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        
                        {sub.secondaryCtaText && (
                          <Link
                            href={sub.secondaryCtaLink || "/portfolio"}
                            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 px-6 py-3 font-sans text-xs font-bold text-neutral-600 transition-all shadow-sm"
                          >
                            {sub.secondaryCtaText}
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Free for Image Placeholder (5/12) */}
                    <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-[2rem] bg-[#E0F2F1]/50 flex items-center justify-center p-6 sm:p-8">
                      {sub.image ? (
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-sm border border-neutral-100">
                          <Image
                            src={sub.image}
                            alt={sub.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        /* Custom CSS Mockup Graphic Card matching the sub-item category */
                        <div className="relative w-full h-full rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-neutral-100/50 overflow-hidden flex flex-col justify-between p-5">
                          
                          {/* Top Info Header */}
                          <div className="flex items-center justify-between border-b border-neutral-100 pb-3 w-full">
                            <div className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                                KJ Digital Audit
                              </span>
                            </div>
                            <span className="text-[9px] font-bold text-neutral-300">
                              Live Sandbox
                            </span>
                          </div>

                          {/* Center Graphic */}
                          <div className="flex-1 flex flex-col items-center justify-center p-4">
                            {sub.slug === "local-seo" && (
                              <div className="relative flex flex-col items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500 shadow-sm border border-red-100 animate-bounce">
                                  <Icons.MapPin className="h-6 w-6" />
                                </div>
                                <span className="text-[10px] font-bold text-neutral-700 mt-2 block">
                                  Map Pin Authority
                                </span>
                                <p className="text-[9px] text-neutral-400 mt-1">100% NAP Consistency</p>
                              </div>
                            )}

                            {sub.slug === "ecommerce-seo" && (
                              <div className="relative flex flex-col items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 shadow-sm border border-emerald-100">
                                  <Icons.TrendingUp className="h-6 w-6" />
                                </div>
                                <span className="text-[10px] font-bold text-neutral-700 mt-2 block">
                                  Sales Lift: +150%
                                </span>
                                <p className="text-[9px] text-neutral-400 mt-1">Shopify Schema Active</p>
                              </div>
                            )}

                            {sub.slug === "international-seo" && (
                              <div className="relative flex flex-col items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-500 shadow-sm border border-blue-100">
                                  <Icons.Globe className="h-6 w-6" />
                                </div>
                                <span className="text-[10px] font-bold text-neutral-700 mt-2 block">
                                  Multi-Market Traffic
                                </span>
                                <p className="text-[9px] text-neutral-400 mt-1">USA, UK, CA, UAE Indexes</p>
                              </div>
                            )}

                            {sub.slug === "youtube-video-seo" && (
                              <div className="relative flex flex-col items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500 shadow-sm border border-rose-100">
                                  <Icons.Youtube className="h-6 w-6" />
                                </div>
                                <span className="text-[10px] font-bold text-neutral-700 mt-2 block">
                                  Video CTR Boost
                                </span>
                                <p className="text-[9px] text-neutral-400 mt-1">Schema rich snippet markup</p>
                              </div>
                            )}

                            {sub.slug === "saas-seo" && (
                              <div className="relative flex flex-col items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-500 shadow-sm border border-indigo-100">
                                  <Icons.Layers className="h-6 w-6" />
                                </div>
                                <span className="text-[10px] font-bold text-neutral-700 mt-2 block">
                                  SaaS Funnel Signups
                                </span>
                                <p className="text-[9px] text-neutral-400 mt-1">TOFU & BOFU integration</p>
                              </div>
                            )}

                            {sub.slug === "semantic-seo" && (
                              <div className="relative flex flex-col items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-500 shadow-sm border border-amber-100">
                                  <Icons.GitFork className="h-6 w-6" />
                                </div>
                                <span className="text-[10px] font-bold text-neutral-700 mt-2 block">
                                  Topical Content Cluster
                                </span>
                                <p className="text-[9px] text-neutral-400 mt-1">Authority mapping structured</p>
                              </div>
                            )}

                            {sub.slug === "ai-seo" && (
                              <div className="relative flex flex-col items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-50 text-cyan-500 shadow-sm border border-cyan-100">
                                  <Icons.Cpu className="h-6 w-6" />
                                </div>
                                <span className="text-[10px] font-bold text-neutral-700 mt-2 block">
                                  AI Search Engine Visibility
                                </span>
                                <p className="text-[9px] text-neutral-400 mt-1">ChatGPT & Perplexity Optimization</p>
                              </div>
                            )}

                            {sub.slug === "google-search-ads" && (
                              <div className="relative flex flex-col items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-500 shadow-sm border border-blue-100">
                                  <Icons.Search className="h-6 w-6" />
                                </div>
                                <span className="text-[10px] font-bold text-neutral-700 mt-2 block">
                                  Search Impression Share
                                </span>
                                <p className="text-[9px] text-neutral-400 mt-1">Smart Bidding Active</p>
                              </div>
                            )}

                            {sub.slug === "google-shopping-ads" && (
                              <div className="relative flex flex-col items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-500 shadow-sm border border-amber-100">
                                  <Icons.ShoppingBag className="h-6 w-6" />
                                </div>
                                <span className="text-[10px] font-bold text-neutral-700 mt-2 block">
                                  Shopping Feed Health: 99%
                                </span>
                                <p className="text-[9px] text-neutral-400 mt-1">Merchant Center Optimised</p>
                              </div>
                            )}

                            {sub.slug === "performance-max" && (
                              <div className="relative flex flex-col items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-50 text-cyan-500 shadow-sm border border-cyan-100">
                                  <Icons.Cpu className="h-6 w-6" />
                                </div>
                                <span className="text-[10px] font-bold text-neutral-700 mt-2 block">
                                  PMax Bidding Signal
                                </span>
                                <p className="text-[9px] text-neutral-400 mt-1">AI asset loops refined</p>
                              </div>
                            )}

                            {sub.slug === "youtube-ads" && (
                              <div className="relative flex flex-col items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500 shadow-sm border border-rose-100">
                                  <Icons.Play className="h-6 w-6" />
                                </div>
                                <span className="text-[10px] font-bold text-neutral-700 mt-2 block">
                                  Video Views: +240%
                                </span>
                                <p className="text-[9px] text-neutral-400 mt-1">Avg. Watch Time: 82%</p>
                              </div>
                            )}

                            {sub.slug === "remarketing-ads" && (
                              <div className="relative flex flex-col items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-500 shadow-sm border border-purple-100">
                                  <Icons.RefreshCw className="h-6 w-6" />
                                </div>
                                <span className="text-[10px] font-bold text-neutral-700 mt-2 block">
                                  Checkout Recovery Funnel
                                </span>
                                <p className="text-[9px] text-neutral-400 mt-1">Lost conversions closed</p>
                              </div>
                            )}

                            {sub.slug === "facebook-ads" && (
                              <div className="relative flex flex-col items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 shadow-sm border border-blue-100">
                                  <Icons.Facebook className="h-6 w-6" />
                                </div>
                                <span className="text-[10px] font-bold text-neutral-700 mt-2 block">
                                  Advantage+ Scaling
                                </span>
                                <p className="text-[9px] text-neutral-400 mt-1">Dynamic catalog active</p>
                              </div>
                            )}

                            {sub.slug === "instagram-ads" && (
                              <div className="relative flex flex-col items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 text-pink-500 shadow-sm border border-pink-100">
                                  <Icons.Instagram className="h-6 w-6" />
                                </div>
                                <span className="text-[10px] font-bold text-neutral-700 mt-2 block">
                                  Stories & Reels CTR
                                </span>
                                <p className="text-[9px] text-neutral-400 mt-1">UGC creative optimized</p>
                              </div>
                            )}

                            {sub.slug === "tiktok-linkedin-ads" && (
                              <div className="relative flex flex-col items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-500 shadow-sm border border-indigo-100">
                                  <Icons.Target className="h-6 w-6" />
                                </div>
                                <span className="text-[10px] font-bold text-neutral-700 mt-2 block">
                                  B2B & Viral Funnels
                                </span>
                                <p className="text-[9px] text-neutral-400 mt-1">C-Suite lead forms active</p>
                              </div>
                            )}
                          </div>

                          {/* Bottom Info Footer */}
                          <div className="border-t border-neutral-100 pt-3 w-full flex items-center justify-between">
                            <span className="text-[8px] font-bold text-neutral-400">
                              Digital World Agency
                            </span>
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-primary">
                              Metrics Verified <Icons.ShieldCheck className="h-3.5 w-3.5 text-primary" />
                            </span>
                          </div>

                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic Step Process Section */}
      {categoryProcesses[category.slug] && (
        <section className="py-20 lg:py-28 bg-white border-t border-neutral-100 text-center relative z-10">
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
    </article>
  );
}
