import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Services — Digital World · Kamrujjaman Mufti",
  description: "Expert SEO services including Local SEO, Ecommerce SEO, International SEO, SaaS SEO, Semantic SEO, and AI SEO. Proven results across 11 countries.",
};

const services = [
  { id: "svc-local", emoji: "📍", name: "Local SEO", desc: "Dominate local search results. Google Business Profile optimization, local citations, and geo-targeted keyword strategies that put your business in front of nearby customers.", tags: ["Google Business", "Local Citations", "Geo-Targeting"] },
  { id: "svc-ecom", emoji: "🛒", name: "Ecommerce SEO", desc: "Drive qualified traffic to your online store. Product page optimization, category structure, technical SEO, and content strategies built specifically for e-commerce platforms.", tags: ["Product SEO", "Shopify", "WooCommerce"], popular: true },
  { id: "svc-intl", emoji: "🌍", name: "International SEO", desc: "Expand your reach across borders. Hreflang implementation, multilingual content strategy, and international keyword research for businesses targeting multiple countries.", tags: ["Hreflang", "Multilingual", "Multi-Market"] },
  { id: "svc-yt", emoji: "📹", name: "Youtube / Video SEO", desc: "Rank your videos on both YouTube and Google. Video keyword research, metadata optimization, thumbnail strategy, and channel growth tactics.", tags: ["YouTube", "Video Rankings", "Channel Growth"] },
  { id: "svc-saas", emoji: "💻", name: "SaaS SEO", desc: "Scale organic acquisition for your software product. Competitor-driven keyword research, programmatic SEO, and content-led growth strategies built for recurring revenue models.", tags: ["B2B SEO", "Content-Led Growth", "Technical"] },
  { id: "svc-semantic", emoji: "🧠", name: "Semantic SEO", desc: "Build topical authority with entity-based optimization. Structured data, topic clusters, and NLP-driven content strategies that align with how search engines understand content.", tags: ["Topic Clusters", "Entity SEO", "Schema"] },
  { id: "svc-ai", emoji: "🤖", name: "AI SEO", desc: "Stay ahead with AI-powered SEO strategies. Optimize for AI overviews, leverage AI tools for content creation, and adapt your strategy for the evolving search landscape.", tags: ["AI Overviews", "SGE", "LLM Optimization"] },
];

export default function SEOPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[60vh] bg-black flex items-center justify-center text-center relative overflow-hidden pt-[52px]">
        <div className="absolute inset-0">
          <div className="absolute w-[700px] h-[700px] rounded-full -top-[200px] -left-[100px]" style={{ background: "radial-gradient(circle, rgba(20,104,134,0.5) 0%, transparent 70%)", filter: "blur(90px)" }} />
          <div className="absolute w-[500px] h-[500px] rounded-full bottom-0 right-0" style={{ background: "radial-gradient(circle, rgba(0,113,227,0.3) 0%, transparent 70%)", filter: "blur(90px)" }} />
          <div className="grain" />
        </div>
        <div className="relative z-[2] max-w-[800px] px-6 py-20">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-white/50 tracking-[0.1em] uppercase mb-6 px-3.5 py-1.5 border border-white/[0.12] rounded-full bg-white/[0.04]">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] shadow-[0_0_8px_var(--color-green)]" />
            SEO Services
          </span>
          <h1 className="font-[var(--font-display)] text-white mb-6 tracking-[-0.02em] leading-[1.06]" style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
            SEO that delivers
            <br />
            <em className="italic bg-clip-text text-transparent" style={{ background: "linear-gradient(135deg, #146886, #34c759)", WebkitBackgroundClip: "text" }}>real results.</em>
          </h1>
          <p className="text-lg font-light text-white/45 max-w-[600px] mx-auto leading-[1.65]">
            Proven SEO strategies for e-commerce, SaaS, local businesses, and international brands. Real rankings, real traffic, real revenue growth.
          </p>
          <div className="flex gap-3.5 justify-center mt-10">
            <Link href="/contact">
              <button className="bg-[var(--color-blue)] text-white text-[15px] font-medium px-[30px] py-[15px] rounded-full hover:bg-[var(--color-blue-hover)] hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,113,227,0.4)] transition-all duration-200">
                Get SEO Audit →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="bg-[#0a0a0a] py-24 px-6">
        <div className="max-w-[1120px] mx-auto space-y-5">
          {services.map((svc) => (
            <div key={svc.id} id={svc.id} className="bg-white/[0.04] border border-white/[0.08] rounded-[20px] p-8 lg:p-10 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 scroll-mt-20">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="w-[60px] h-[60px] rounded-2xl bg-[rgba(20,104,134,0.15)] flex items-center justify-center text-[28px] shrink-0">
                  {svc.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-white">{svc.name}</h3>
                    {svc.popular && (
                      <span className="text-[10px] bg-[rgba(20,104,134,0.25)] text-[#4fc3f7] px-2.5 py-1 rounded-full font-medium uppercase tracking-[0.05em]">Popular</span>
                    )}
                  </div>
                  <p className="text-[15px] text-white/55 leading-[1.7] mb-5 max-w-[700px]">{svc.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {svc.tags.map((tag) => (
                      <span key={tag} className="text-[11px] text-white/55 bg-white/[0.05] px-3 py-1.5 rounded-full border border-white/[0.07]">{tag}</span>
                    ))}
                  </div>
                </div>
                <Link href="/contact" className="shrink-0">
                  <button className="text-sm text-[#39f] border border-[#39f]/30 px-5 py-2.5 rounded-full hover:bg-[#39f]/10 transition-all duration-200">
                    Get Quote →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#146886] to-[#0a4969] py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />
        <h2 className="font-[var(--font-display)] text-white mb-4 relative z-[1]" style={{ fontSize: "clamp(30px, 4vw, 48px)" }}>Ready to rank higher?</h2>
        <p className="text-base text-white/70 mb-8 max-w-[480px] mx-auto relative z-[1]">Get a free SEO audit and discover how we can grow your organic traffic.</p>
        <Link href="/contact" className="relative z-[1]">
          <button className="bg-white text-[#146886] text-base font-semibold px-9 py-4 rounded-full hover:bg-white/90 hover:scale-[1.03] transition-all duration-200">
            Free SEO Audit →
          </button>
        </Link>
      </section>
    </>
  );
}
