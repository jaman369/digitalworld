"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { CloudHomepageData } from "@/types";

/* ── 6 Distinct Vibrant Per-Card Color Themes ── */
const cardThemes: Record<string, {
  badgeNumber: string;
  mainGrad: string;
  blobGrad: string;
  shadowColor: string;
  dot1Color: string;
  dot2Color: string;
  linkColor: string;
  linkHoverColor: string;
  popularBg: string;
  hoverBg: string;
}> = {
  seo: {
    badgeNumber: ".01",
    mainGrad: "from-[#2563EB] via-[#3B82F6] to-[#4F46E5]",
    blobGrad: "from-[#60A5FA] to-[#818CF8]",
    shadowColor: "rgba(37, 99, 235, 0.38)",
    dot1Color: "#2563EB",
    dot2Color: "#93C5FD",
    linkColor: "text-blue-600",
    linkHoverColor: "hover:text-blue-800",
    popularBg: "bg-blue-50 text-blue-600 border-blue-100",
    hoverBg: "hover:bg-blue-50/40 hover:border-blue-300/80 hover:shadow-blue-500/10",
  },
  ppc: {
    badgeNumber: ".02",
    mainGrad: "from-[#00C9A7] via-[#00B4D8] to-[#0077B6]",
    blobGrad: "from-[#38BDF8] to-[#2DD4BF]",
    shadowColor: "rgba(0, 180, 216, 0.38)",
    dot1Color: "#00B4D8",
    dot2Color: "#7DD3FC",
    linkColor: "text-cyan-600",
    linkHoverColor: "hover:text-cyan-800",
    popularBg: "bg-cyan-50 text-cyan-600 border-cyan-100",
    hoverBg: "hover:bg-cyan-50/40 hover:border-cyan-300/80 hover:shadow-cyan-500/10",
  },
  "web-design-dev": {
    badgeNumber: ".03",
    mainGrad: "from-[#FF5E62] via-[#FF7A59] to-[#FFB700]",
    blobGrad: "from-[#FF8C42] to-[#FFC72C]",
    shadowColor: "rgba(255, 94, 98, 0.4)",
    dot1Color: "#FF7A59",
    dot2Color: "#FDE047",
    linkColor: "text-orange-600",
    linkHoverColor: "hover:text-orange-800",
    popularBg: "bg-orange-50 text-orange-600 border-orange-100",
    hoverBg: "hover:bg-orange-50/40 hover:border-orange-300/80 hover:shadow-orange-500/10",
  },
  "content-marketing": {
    badgeNumber: ".04",
    mainGrad: "from-[#10B981] via-[#059669] to-[#047857]",
    blobGrad: "from-[#34D399] to-[#10B981]",
    shadowColor: "rgba(16, 185, 129, 0.38)",
    dot1Color: "#10B981",
    dot2Color: "#A7F3D0",
    linkColor: "text-emerald-600",
    linkHoverColor: "hover:text-emerald-800",
    popularBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    hoverBg: "hover:bg-emerald-50/40 hover:border-emerald-300/80 hover:shadow-emerald-500/10",
  },
  "ai-automation": {
    badgeNumber: ".05",
    mainGrad: "from-[#7C3AED] via-[#8B5CF6] to-[#A855F7]",
    blobGrad: "from-[#C084FC] to-[#8B5CF6]",
    shadowColor: "rgba(124, 58, 237, 0.38)",
    dot1Color: "#8B5CF6",
    dot2Color: "#E9D5FF",
    linkColor: "text-purple-600",
    linkHoverColor: "hover:text-purple-800",
    popularBg: "bg-purple-50 text-purple-600 border-purple-100",
    hoverBg: "hover:bg-purple-50/40 hover:border-purple-300/80 hover:shadow-purple-500/10",
  },
  "ai-video-production": {
    badgeNumber: ".06",
    mainGrad: "from-[#8B5CF6] via-[#A855F7] to-[#D946EF]",
    blobGrad: "from-[#A78BFA] to-[#E879F9]",
    shadowColor: "rgba(139, 92, 246, 0.38)",
    dot1Color: "#8B5CF6",
    dot2Color: "#F5D0FE",
    linkColor: "text-violet-600",
    linkHoverColor: "hover:text-violet-800",
    popularBg: "bg-violet-50 text-violet-600 border-violet-100",
    hoverBg: "hover:bg-violet-50/40 hover:border-violet-300/80 hover:shadow-violet-500/10",
  },
};

/* ── Canonical Services Data (Exact Copy Provided) ── */
const canonicalServices = [
  {
    slug: "seo",
    title: "SEO Services That Bring Qualified Organic Traffic",
    description: "Rank higher on Google and get found by AI search tools like ChatGPT and Perplexity. Our SEO agency team builds long-term visibility with technical fixes, content and authority.",
    bullets: [
      { name: "Technical SEO services and SEO audits", slug: "technical-seo" },
      { name: "Local SEO and ecommerce SEO", slug: "local-seo" },
      { name: "On-page SEO and link building", slug: "on-page-seo" },
      { name: "AI SEO: Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO)", slug: "ai-seo" },
    ],
    linkText: "Explore SEO Services",
    linkHref: "/services/seo",
  },
  {
    slug: "ppc",
    title: "PPC Management and Paid Advertising That Lowers Your Cost Per Lead",
    description: "Get leads and sales from the first week. We plan, launch and optimize campaigns with clear tracking, so every dollar of ad spend is accountable.",
    bullets: [
      { name: "Google Ads management", slug: "google-ads" },
      { name: "Meta (Facebook and Instagram) ads", slug: "facebook-ads" },
      { name: "LinkedIn and YouTube ads", slug: "linkedin-ads" },
      { name: "Retargeting and ecommerce PPC", slug: "retargeting-ecommerce-ppc" },
    ],
    linkText: "Explore PPC Services",
    linkHref: "/services/ppc",
  },
  {
    slug: "web-design-dev",
    title: "Web Design and Development for Websites That Convert",
    description: "A fast, modern, SEO-friendly website is your best salesperson. We design and build custom websites focused on speed, clarity and conversions.",
    bullets: [
      { name: "Custom website development (WordPress, Shopify, Next.js)", slug: "custom-website-development" },
      { name: "Responsive and UI/UX design", slug: "website-design-ui-ux" },
      { name: "Landing page design", slug: "landing-page-design" },
      { name: "Website redesign", slug: "website-redesign" },
    ],
    linkText: "Explore Web Design Services",
    linkHref: "/services/web-design-dev",
  },
  {
    slug: "content-marketing",
    title: "SEO Content Writing and Content Marketing Services",
    description: "Content that ranks, reads well and sells. Our writers turn keyword research into articles and web copy that attract the right audience.",
    bullets: [
      { name: "Blog and long-form content writing", slug: "blog-writing" },
      { name: "Website and product copywriting", slug: "website-copy" },
      { name: "B2B content strategy", slug: "b2b-content-strategy" },
      { name: "Email copywriting", slug: "email-copywriting" },
    ],
    linkText: "Explore Content Services",
    linkHref: "/services/content-marketing",
  },
  {
    slug: "ai-automation",
    title: "AI Automation Services That Save Time and Capture More Leads",
    description: "Stop doing repetitive work by hand. We build AI agents, chatbots and automated workflows that run around the clock.",
    bullets: [
      { name: "Workflow automation with n8n, Make and Zapier", slug: "workflow-automation" },
      { name: "AI chatbots and AI agents", slug: "ai-chatbots" },
      { name: "CRM and email marketing automation", slug: "crm-email-automation" },
      { name: "Lead generation automation", slug: "lead-generation-automation" },
    ],
    linkText: "Explore AI Automation",
    linkHref: "/services/ai-automation",
  },
  {
    slug: "ai-video-production",
    title: "AI Video Production for Ads, Promos and Social Media",
    description: "Professional video without the studio cost or long timelines. We produce scroll-stopping videos powered by AI.",
    bullets: [
      { name: "AI video ads and AI UGC video ads", slug: "ai-video-ads" },
      { name: "AI explainer and promo videos", slug: "ai-explainer-promo-videos" },
      { name: "AI product videos", slug: "ai-product-videos" },
      { name: "Short-form social media video", slug: "short-form-social-video" },
    ],
    linkText: "Explore AI Video Production",
    linkHref: "/services/ai-video-production",
  },
];

/* ── Liquid Fluid Blob Number Badge Component ── */
function LiquidBlobBadge({ categorySlug }: { categorySlug: string }) {
  const theme = cardThemes[categorySlug] || cardThemes["seo"];

  return (
    <div className="relative w-22 h-22 sm:w-24 sm:h-24 flex items-center justify-center select-none group-hover:scale-105 transition-transform duration-300">
      {/* Far Back Translucent Soft White/Light Blob */}
      <div 
        className="absolute inset-0 bg-white/95 shadow-md blur-[1px]"
        style={{
          borderRadius: "45% 55% 65% 35% / 40% 60% 40% 60%",
          transform: "scale(1.18) rotate(-8deg)",
        }}
      />

      {/* Layer 2: Secondary Offset Fluid Blob */}
      <div 
        className={`absolute inset-0 bg-gradient-to-tr ${theme.blobGrad} opacity-90`}
        style={{
          borderRadius: "65% 35% 45% 55% / 55% 45% 55% 45%",
          transform: "scale(1.08) translate(5px, -3px) rotate(12deg)",
          filter: `drop-shadow(0 8px 16px ${theme.shadowColor})`,
        }}
      />

      {/* Layer 3: Main Front Liquid Gradient Circle */}
      <div 
        className={`relative z-10 w-[78px] h-[78px] sm:w-[84px] sm:h-[84px] flex items-center justify-center bg-gradient-to-br ${theme.mainGrad}`}
        style={{
          borderRadius: "50% 50% 45% 55% / 55% 45% 55% 45%",
          boxShadow: `0 10px 24px -4px ${theme.shadowColor}`,
        }}
      >
        <span className="text-white font-sans text-xl sm:text-2xl font-black tracking-tighter drop-shadow-sm">
          {theme.badgeNumber}
        </span>
      </div>

      {/* Floating Liquid Bubble Drop 1 */}
      <div 
        className="absolute -top-1.5 right-1 w-4 h-4 rounded-full opacity-90 transition-transform duration-300 group-hover:-translate-y-1"
        style={{
          backgroundColor: theme.dot1Color,
          borderRadius: "50% 50% 40% 60% / 60% 40% 60% 40%",
          boxShadow: `0 2px 6px ${theme.shadowColor}`,
        }}
      />

      {/* Floating Liquid Bubble Drop 2 */}
      <div 
        className="absolute -top-3 right-5 w-2.5 h-2.5 rounded-full opacity-80 transition-transform duration-300 group-hover:-translate-y-1.5"
        style={{
          backgroundColor: theme.dot2Color,
        }}
      />
    </div>
  );
}

export default function ServicesGrid() {
  const [data, setData] = useState<CloudHomepageData>({
    servicesEyebrow: "What we do",
    servicesTitle: "Digital Marketing Services Built to Scale Your Business",
    servicesSubtitle:
      "From search rankings to paid ads, websites to AI-driven automation, we cover the full growth funnel. Choose one service or let us run your entire digital marketing strategy.",
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/homepage");
        if (res.ok) {
          const hp = await res.json();
          setData((prev) => ({
            ...prev,
            ...hp,
            servicesEyebrow: hp.servicesEyebrow || "What we do",
            servicesTitle: hp.servicesTitle || "Digital Marketing Services Built to Scale Your Business",
            servicesSubtitle: hp.servicesSubtitle || "From search rankings to paid ads, websites to AI-driven automation, we cover the full growth funnel. Choose one service or let us run your entire digital marketing strategy.",
          }));
        }
      } catch {}
    }
    load();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="services"
      className="pt-16 lg:pt-20 pb-16 bg-gradient-to-b from-[#f8f9fc] via-white to-[#f8f9fc] relative z-10 overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e5ec_0.8px,transparent_0.8px)] [background-size:20px_20px] opacity-30" />
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-6">
            {data.servicesEyebrow || "What we do"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight mb-6">
            {data.servicesTitle || "Digital Marketing Services Built to Scale Your Business"}
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-600 leading-relaxed">
            {data.servicesSubtitle ||
              "From search rankings to paid ads, websites to AI-driven automation, we cover the full growth funnel. Choose one service or let us run your entire digital marketing strategy."}
          </p>
        </div>

        {/* Services Grid with generous vertical gap in the middle */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-7 gap-y-14 lg:gap-y-16 pt-4"
        >
          {canonicalServices.map((service) => {
            const theme = cardThemes[service.slug] || cardThemes["seo"];

            return (
              <motion.div
                key={service.slug}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                variants={cardVariants as any}
                className={`group relative flex flex-col bg-white rounded-2xl border border-neutral-200/70 px-7 sm:px-8 pt-14 sm:pt-16 pb-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] ${theme.hoverBg}`}
              >
                {/* ── Round Liquid Blob Badge FLOATING ON TOP OF THE CARD BOX ── */}
                <div className="absolute -top-11 left-7 sm:left-8 z-20">
                  <LiquidBlobBadge categorySlug={service.slug} />
                </div>

                {/* ── Title (Semantic H3) ── */}
                <h3 className="font-sans text-lg sm:text-[1.2rem] font-bold text-neutral-900 tracking-tight leading-snug mb-3">
                  {service.title}
                </h3>

                {/* ── Description ── */}
                <p className="font-sans text-xs sm:text-[13px] text-neutral-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* ── 4 Bullet Points ── */}
                <ul className="flex flex-col gap-2.5 mb-7 flex-1">
                  {service.bullets.map((b) => (
                    <li key={b.name} className="flex items-start gap-2">
                      <Icons.CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="font-sans text-[13px] text-neutral-700 leading-snug">
                        {b.name}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* ── Custom Link Button ── */}
                <div className="mt-auto pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <Link
                    href={service.linkHref}
                    className={`inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-bold ${theme.linkColor} ${theme.linkHoverColor} transition-colors group-hover:translate-x-0.5 duration-200`}
                  >
                    <span>{service.linkText}</span>
                    <Icons.ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
