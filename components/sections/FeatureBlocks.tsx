"use client";

import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";

export default function FeatureBlocks() {
  const features = [
    {
      id: "feat-seo",
      badge: "Search Engine Optimization",
      title: "Dominate search and capture buyer intent",
      description: "We don't focus on simple search volumes. We align your organic content strategy directly with bottom-of-the-funnel commercial keywords to capture leads ready to convert.",
      bullets: [
        "Local GBP visibility & citations audit",
        "Topical authority entity clusters building",
        "Headless CMS technical speed configurations"
      ],
      iconName: "Search",
      ctaLink: "/services/seo",
      image: "/All Service Images/seo-main.jpg",
      reverse: false
    },
    {
      id: "feat-ppc",
      badge: "Paid Campaigns",
      title: "Maximize returns on paid ad budgets",
      description: "Scale acquisitions predictably. We build, monitor, and optimize your paid budgets across search engines and social platforms to drive high-converting leads while reducing cost per click.",
      bullets: [
        "Conversion-focused keyword structures",
        "Dynamic feed catalog optimizations",
        "Lookalike & remarketing audience loops"
      ],
      iconName: "TrendingUp",
      ctaLink: "/services/ppc",
      image: "/All Service Images/ppc-main.jpg",
      reverse: true
    },
    {
      id: "feat-web",
      badge: "Development & Design",
      title: "Web interfaces optimized for speed & UX",
      description: "A fast, stunning store is your best sales engine. We develop clean responsive designs that pass Google PageSpeed audits and keep users engaged throughout their shopping journey.",
      bullets: [
        "WordPress & Shopify theme updates",
        "Interactive conversion-focused design layouts",
        "CMS and headless API configurations"
      ],
      iconName: "Laptop",
      ctaLink: "/services/web-design-dev",
      image: "/All Service Images/web-main.png",
      reverse: false
    },
    {
      id: "feat-content",
      badge: "Content Strategy",
      title: "Authoritative content that converts list leads",
      description: "We research and write content that ranks and builds true brand authority. Combined with automated email lifecycles, we nurture cold prospects into recurring buyers.",
      bullets: [
        "SEO content briefs & editorial planning",
        "Automated lifecycle email marketing setups",
        "Digital PR and backlink acquisition campaigns"
      ],
      iconName: "PenTool",
      ctaLink: "/services/content-marketing",
      image: "/All Service Images/content-main.jpg",
      reverse: true
    },
    {
      id: "feat-ai",
      badge: "AI Automation",
      title: "Intelligent agents and automated custom workflows",
      description: "Deploy customized AI chatbots and workflow automation that take over manual support, data extraction, and repetitive tasks—so your team can focus on growth.",
      bullets: [
        "Custom AI Chatbots & RAG integrations",
        "Lead generation & CRM sync automation",
        "Repetitive workflow automation & integrations"
      ],
      iconName: "Cpu",
      ctaLink: "/services/ai-automation",
      image: "/All Service Images/ai-main.jpg",
      reverse: false
    },
    {
      id: "feat-china",
      badge: "China Sourcing",
      title: "End-to-end supply chain sourcing and logistics",
      description: "Find verified suppliers, verify product quality, negotiate prices, and manage safe shipping from China to your warehouse with direct professional support.",
      bullets: [
        "Supplier verification & factory audit reports",
        "Quality inspection & bulk sample checks",
        "Customs clearance & global freight logistics"
      ],
      iconName: "Truck",
      ctaLink: "/services/china-sourcing",
      image: "/All Service Images/sourcing-main.jpg",
      reverse: true
    }
  ];

  return (
    <div className="relative z-10 bg-transparent">
      {features.map((feat) => {
        const Icon = (Icons[feat.iconName as keyof typeof Icons] || Icons.HelpCircle) as React.ComponentType<{ className?: string }>;

        return (
          <section 
            key={feat.id} 
            className="py-20 lg:py-28 border-b border-neutral-100 bg-transparent"
          >
            <div className="container mx-auto max-w-7xl px-6">
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center`}>
                
                {/* Visual Block */}
                <div 
                  className={`lg:col-span-6 relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-premium border border-neutral-200/50 ${
                    feat.reverse ? "lg:order-last" : ""
                  }`}
                >
                  <Image
                    src={feat.image}
                    alt={feat.title}
                    fill
                    className="object-cover"
                    sizes="(max-w-768px) 100vw, 50vw"
                  />
                </div>

                {/* Content Block */}
                <div className="lg:col-span-6 flex flex-col items-start">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
                    <Icon className="h-3.5 w-3.5" />
                    {feat.badge}
                  </span>
                  
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight leading-[1.15] mb-6">
                    {feat.title}
                  </h3>
                  
                  <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed mb-8">
                    {feat.description}
                  </p>

                  <ul className="flex flex-col gap-3.5 mb-8">
                    {feat.bullets.map((bullet, bidx) => (
                      <li key={bidx} className="flex items-start gap-2.5 text-sm text-neutral-600">
                        <Icons.CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={feat.ctaLink}
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 px-6 py-3 font-sans text-xs font-bold text-neutral-700 shadow-sm transition-all"
                  >
                    Learn More <Icons.ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
