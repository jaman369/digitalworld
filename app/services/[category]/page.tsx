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

const heroOverrides: Record<string, {
  eyebrow: string;
  headlineFirst: string;
  headlineHighlight: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  highlightColorClass: string;
  glowClass: string;
}> = {
  seo: {
    eyebrow: "Search Engine Optimization",
    headlineFirst: "SEO that actually",
    headlineHighlight: "moves the needle.",
    description: "Data-driven SEO strategies that go beyond rankings — we focus on traffic, leads, and revenue that matter to your business.",
    ctaText: "Get Free SEO Audit",
    ctaLink: "/contact?service=seo-audit",
    highlightColorClass: "text-[#10B981]",
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_60%)]"
  },
  ppc: {
    eyebrow: "Paid Campaigns",
    headlineFirst: "Maximize returns on",
    headlineHighlight: "every single click.",
    description: "Scale your acquisition channels predictably with high-converting paid search and social campaigns tailored for growth.",
    ctaText: "Get Free PPC Audit",
    ctaLink: "/contact?service=ppc-audit",
    highlightColorClass: "text-blue-500",
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_60%)]"
  },
  "web-design-dev": {
    eyebrow: "Development & Design",
    headlineFirst: "Websites built for speed,",
    headlineHighlight: "designed for conversion.",
    description: "Stunning, custom-coded web experiences optimized to pass PageSpeed audits and keep users engaged throughout their journey.",
    ctaText: "Request a Proposal",
    ctaLink: "/contact?service=web-proposal",
    highlightColorClass: "text-indigo-400",
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_60%)]"
  },
  "content-marketing": {
    eyebrow: "Content Strategy",
    headlineFirst: "Authoritative content that",
    headlineHighlight: "converts lists to leads.",
    description: "Turn search intent into brand loyalty with high-quality content plans and automated email nurturing sequences.",
    ctaText: "Get Content Plan",
    ctaLink: "/contact?service=content-plan",
    highlightColorClass: "text-amber-500",
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0%,transparent_60%)]"
  },
  "ai-automation": {
    eyebrow: "AI Automation",
    headlineFirst: "Autonomous agents that",
    headlineHighlight: "streamline workflows.",
    description: "Integrate custom intelligent tools and bots to handle support, lead parsing, and manual tasks 24/7.",
    ctaText: "Book AI Consultation",
    ctaLink: "/contact?service=ai-consultation",
    highlightColorClass: "text-cyan-400",
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_60%)]"
  },
  "china-sourcing": {
    eyebrow: "China Sourcing Services",
    headlineFirst: "Direct factory sourcing &",
    headlineHighlight: "global logistics management.",
    description: "Verification, negotiations, quality inspections, and ocean freight handled directly from China to your warehouse.",
    ctaText: "Inquire Sourcing",
    ctaLink: "/contact?service=sourcing-inquiry",
    highlightColorClass: "text-rose-500",
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.08)_0%,transparent_60%)]"
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
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(0,118,255,0.08)_0%,transparent_60%)]"
  };

  return (
    <article className="min-h-screen bg-white">
      {/* Category Hero Banner */}
      <section className="relative overflow-hidden bg-[#09090B] py-24 lg:py-32 text-white border-b border-neutral-900">
        {/* Background glow overlay */}
        <div className={`absolute inset-0 -z-10 ${override.glowClass}`} />
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">

            
            {/* Eyebrow */}
            <span className={`text-[10px] sm:text-xs font-bold ${override.highlightColorClass} uppercase tracking-[0.25em] mb-4`}>
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
            <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl mb-10">
              {override.description}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
              <Link
                href={override.ctaLink}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-6 py-3 font-sans text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                {override.ctaText} <Icons.ArrowRight className="h-3.5 w-3.5" />
              </Link>
              
              <a
                href="#services-list"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-neutral-800 hover:border-neutral-700 bg-neutral-900/50 hover:bg-neutral-900 px-6 py-3 font-sans text-xs font-bold text-white shadow-sm transition-all"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-items Anchor List */}
      <section id="services-list" className="py-20 lg:py-24 scroll-mt-20">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="flex flex-col gap-16 lg:gap-20">
            {category.subItems.map((sub, idx) => {
              return (
                <div 
                  key={sub.slug}
                  id={sub.slug}
                  className="scroll-mt-28 group relative rounded-2xl border border-neutral-200 bg-white p-8 lg:p-12 shadow-sm transition-all duration-300 hover:shadow-md hover:border-neutral-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                    {/* Content Block */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">
                          Service 0{idx + 1}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-neutral-300" />
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                          {category.title}
                        </span>
                      </div>
                      
                      <h2 className="font-sans font-bold text-xl sm:text-2xl text-neutral-900 mb-4">
                        {sub.name}
                      </h2>
                      
                      <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed mb-6">
                        {sub.description}
                      </p>

                      {/* Benefits bullets list */}
                      {sub.benefits && sub.benefits.length > 0 && (
                        <div className="mb-8">
                          <h4 className="font-sans text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">
                            Key Deliverables & Benefits
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {sub.benefits.map((benefit, bidx) => (
                              <li key={bidx} className="flex items-start gap-2.5 text-sm text-neutral-600">
                                <Icons.CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Action Block */}
                    <div className="shrink-0 flex flex-col justify-between h-full md:border-l md:border-neutral-100 md:pl-8">
                      <div className="mb-6 md:mb-0">
                        <span className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
                          Timeline
                        </span>
                        <span className="text-sm font-semibold text-neutral-800">
                          Usually 2-4 weeks
                        </span>
                      </div>
                      
                      <div className="mt-4">
                        <Link
                          href={`/contact?service=${sub.slug}`}
                          className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-6 py-3.5 font-sans text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
                        >
                          Get Started <Icons.ArrowRight className="h-4 w-4" />
                        </Link>
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
