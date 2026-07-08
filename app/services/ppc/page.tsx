import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PPC / Paid Ads — Digital World · Kamrujjaman Mufti",
  description: "Expert PPC and paid advertising services including Google Ads, Facebook Ads, Instagram Ads, TikTok Ads, and remarketing campaigns.",
};

const services = [
  { id: "svc-search", emoji: "🔎", name: "Google Search Ads", desc: "Appear at the top of Google for your highest-intent keywords. Strategic bidding, ad copy optimization, and landing page alignment for maximum conversion rates.", tags: ["Search Ads", "Keyword Bidding", "Ad Copy"] },
  { id: "svc-shopping", emoji: "🛍️", name: "Google Shopping Ads", desc: "Showcase your products with rich visual ads directly in search results. Feed optimization, competitive pricing strategies, and smart bidding for e-commerce brands.", tags: ["Product Feed", "Merchant Center", "Smart Bidding"], popular: true },
  { id: "svc-pmax", emoji: "🚀", name: "Performance Max", desc: "Leverage Google's AI-powered campaign type across all channels. Search, Display, YouTube, Gmail, and Maps — all in one optimized campaign.", tags: ["AI Bidding", "Multi-Channel", "Automation"] },
  { id: "svc-youtube", emoji: "📺", name: "YouTube Ads", desc: "Reach your audience with compelling video ads. Pre-roll, mid-roll, and bumper ads with precise targeting and retargeting capabilities.", tags: ["Video Ads", "Pre-Roll", "Audience Targeting"] },
  { id: "svc-remarketing", emoji: "🔄", name: "Remarketing", desc: "Re-engage visitors who didn't convert on their first visit. Dynamic remarketing, abandoned cart recovery, and cross-platform retargeting campaigns.", tags: ["Retargeting", "Dynamic Ads", "Cart Recovery"] },
  { id: "svc-facebook", emoji: "📘", name: "Facebook Ads", desc: "Reach over 3 billion users with targeted Facebook advertising. Lead generation, conversion campaigns, and lookalike audience strategies.", tags: ["Lead Gen", "Conversions", "Lookalike Audiences"], popular: true },
  { id: "svc-instagram", emoji: "📸", name: "Instagram Ads", desc: "Visual storytelling meets performance marketing. Stories, Reels, and feed ads designed to capture attention and drive measurable results.", tags: ["Stories Ads", "Reels Ads", "Visual Creative"] },
  { id: "svc-tiktok", emoji: "🎵", name: "TikTok / LinkedIn Ads", desc: "Reach younger audiences on TikTok or B2B decision-makers on LinkedIn with platform-native ad creative and strategic targeting.", tags: ["TikTok Ads", "LinkedIn B2B", "Native Creative"] },
];

export default function PPCPage() {
  return (
    <>
      <section className="min-h-[60vh] bg-black flex items-center justify-center text-center relative overflow-hidden pt-[52px]">
        <div className="absolute inset-0">
          <div className="absolute w-[700px] h-[700px] rounded-full -top-[200px] -right-[100px]" style={{ background: "radial-gradient(circle, rgba(255,100,30,0.4) 0%, transparent 70%)", filter: "blur(90px)" }} />
          <div className="absolute w-[500px] h-[500px] rounded-full bottom-0 left-0" style={{ background: "radial-gradient(circle, rgba(255,159,10,0.25) 0%, transparent 70%)", filter: "blur(90px)" }} />
          <div className="grain" />
        </div>
        <div className="relative z-[2] max-w-[800px] px-6 py-20">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-white/50 tracking-[0.1em] uppercase mb-6 px-3.5 py-1.5 border border-white/[0.12] rounded-full bg-white/[0.04]">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-amber)] shadow-[0_0_8px_var(--color-amber)]" />
            PPC / Paid Ads
          </span>
          <h1 className="font-[var(--font-display)] text-white mb-6 tracking-[-0.02em] leading-[1.06]" style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
            Paid campaigns that
            <br />
            <em className="italic bg-clip-text text-transparent" style={{ background: "linear-gradient(135deg, #ff9f0a, #ea4335)", WebkitBackgroundClip: "text" }}>return real revenue.</em>
          </h1>
          <p className="text-lg font-light text-white/45 max-w-[600px] mx-auto leading-[1.65]">
            Google Ads, Facebook Ads, Instagram, TikTok, LinkedIn — strategic paid campaigns designed for maximum ROI across every major platform.
          </p>
          <div className="flex gap-3.5 justify-center mt-10">
            <Link href="/contact">
              <button className="bg-[var(--color-amber)] text-black text-[15px] font-semibold px-[30px] py-[15px] rounded-full hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(255,159,10,0.4)] transition-all duration-200">
                Get Free PPC Audit →
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-24 px-6">
        <div className="max-w-[1120px] mx-auto space-y-5">
          {services.map((svc) => (
            <div key={svc.id} id={svc.id} className="bg-white/[0.04] border border-white/[0.08] rounded-[20px] p-8 lg:p-10 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 scroll-mt-20">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="w-[60px] h-[60px] rounded-2xl bg-[rgba(255,159,10,0.12)] flex items-center justify-center text-[28px] shrink-0">{svc.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-white">{svc.name}</h3>
                    {svc.popular && <span className="text-[10px] bg-[rgba(255,159,10,0.2)] text-[var(--color-amber)] px-2.5 py-1 rounded-full font-medium uppercase tracking-[0.05em]">Popular</span>}
                  </div>
                  <p className="text-[15px] text-white/55 leading-[1.7] mb-5 max-w-[700px]">{svc.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {svc.tags.map((tag) => <span key={tag} className="text-[11px] text-white/55 bg-white/[0.05] px-3 py-1.5 rounded-full border border-white/[0.07]">{tag}</span>)}
                  </div>
                </div>
                <Link href="/contact" className="shrink-0">
                  <button className="text-sm text-[var(--color-amber)] border border-[var(--color-amber)]/30 px-5 py-2.5 rounded-full hover:bg-[var(--color-amber)]/10 transition-all duration-200">Get Quote →</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#1a0800] to-[#120600] py-20 px-6 text-center relative overflow-hidden border-t border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,159,10,0.15),transparent_50%)] pointer-events-none" />
        <h2 className="font-[var(--font-display)] text-white mb-4 relative z-[1]" style={{ fontSize: "clamp(30px, 4vw, 48px)" }}>Ready to scale your ads?</h2>
        <p className="text-base text-white/60 mb-8 max-w-[480px] mx-auto relative z-[1]">Get a free PPC audit and discover hidden growth opportunities.</p>
        <Link href="/contact" className="relative z-[1]">
          <button className="bg-[var(--color-amber)] text-black text-base font-semibold px-9 py-4 rounded-full hover:scale-[1.03] transition-all duration-200">Free PPC Audit →</button>
        </Link>
      </section>
    </>
  );
}
