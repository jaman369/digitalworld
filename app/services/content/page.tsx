import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content & More — Digital World · Kamrujjaman Mufti",
  description: "Content marketing, email marketing, blog management, CRO audits, backlink building, and digital PR services for businesses worldwide.",
};

const services = [
  { id: "svc-blog", emoji: "📝", name: "Blog Writing & Management", desc: "SEO-optimized blog content that builds topical authority and drives organic traffic. Research-driven topics, professional writing, and strategic publishing schedules.", tags: ["SEO Content", "Topical Authority", "Editorial Calendar"] },
  { id: "svc-email", emoji: "✉️", name: "Email Marketing", desc: "High-converting email sequences that nurture leads and drive revenue. Welcome series, abandoned cart recovery, newsletters, and promotional campaigns.", tags: ["Automation", "Sequences", "Newsletter"], popular: true },
  { id: "svc-content", emoji: "📢", name: "Content Marketing", desc: "Strategic content that attracts, engages, and converts your target audience. Content strategy, creation, distribution, and performance tracking.", tags: ["Strategy", "Distribution", "Analytics"], popular: true },
  { id: "svc-cro", emoji: "📊", name: "CRO Audit & Testing", desc: "Data-driven conversion rate optimization. Heatmap analysis, A/B testing, user behavior tracking, and actionable recommendations to increase your conversion rates.", tags: ["A/B Testing", "Heatmaps", "User Analytics"] },
  { id: "svc-backlink", emoji: "🔗", name: "Backlink Building", desc: "White-hat link building that boosts your domain authority. Guest posting, blogger outreach, broken link building, and HARO-based strategies.", tags: ["Guest Posts", "Outreach", "Authority Building"] },
  { id: "svc-pr", emoji: "📰", name: "Digital PR & HARO", desc: "Get featured in top publications and build brand authority. HARO responses, journalist outreach, and digital PR campaigns for high-authority backlinks.", tags: ["HARO", "Media Coverage", "Brand Authority"] },
  { id: "svc-social", emoji: "📱", name: "Social Media Content", desc: "Engaging social media content that builds your brand presence. Platform-specific content creation, scheduling, and community management.", tags: ["Content Creation", "Scheduling", "Community"] },
  { id: "svc-press", emoji: "🗞️", name: "Press Releases & PR", desc: "Professional press releases distributed to major media outlets. Product launches, company announcements, and newsworthy content that gets coverage.", tags: ["Distribution", "Media Outreach", "Brand News"] },
];

export default function ContentPage() {
  return (
    <>
      <section className="min-h-[60vh] bg-black flex items-center justify-center text-center relative overflow-hidden pt-[52px]">
        <div className="absolute inset-0">
          <div className="absolute w-[700px] h-[700px] rounded-full -top-[200px] -left-[100px]" style={{ background: "radial-gradient(circle, rgba(187,134,252,0.4) 0%, transparent 70%)", filter: "blur(90px)" }} />
          <div className="absolute w-[500px] h-[500px] rounded-full bottom-0 right-[10%]" style={{ background: "radial-gradient(circle, rgba(94,92,230,0.25) 0%, transparent 70%)", filter: "blur(90px)" }} />
          <div className="grain" />
        </div>
        <div className="relative z-[2] max-w-[800px] px-6 py-20">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-white/50 tracking-[0.1em] uppercase mb-6 px-3.5 py-1.5 border border-white/[0.12] rounded-full bg-white/[0.04]">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-purple)] shadow-[0_0_8px_var(--color-purple)]" />
            Content & More
          </span>
          <h1 className="font-[var(--font-display)] text-white mb-6 tracking-[-0.02em] leading-[1.06]" style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
            Content that converts.
            <br />
            <em className="italic bg-clip-text text-transparent" style={{ background: "linear-gradient(135deg, #bb86fc, #5e5ce6)", WebkitBackgroundClip: "text" }}>Copy that sells.</em>
          </h1>
          <p className="text-lg font-light text-white/45 max-w-[600px] mx-auto leading-[1.65]">
            From email marketing to blog management, backlink building to digital PR — content strategies that drive measurable results.
          </p>
          <div className="flex gap-3.5 justify-center mt-10">
            <Link href="/contact">
              <button className="bg-[var(--color-purple)] text-white text-[15px] font-semibold px-[30px] py-[15px] rounded-full hover:bg-[var(--color-purple-hover)] hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(187,134,252,0.4)] transition-all duration-200">
                Explore Content Services →
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
                <div className="w-[60px] h-[60px] rounded-2xl bg-[rgba(187,134,252,0.12)] flex items-center justify-center text-[28px] shrink-0">{svc.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-white">{svc.name}</h3>
                    {svc.popular && <span className="text-[10px] bg-[rgba(187,134,252,0.2)] text-[var(--color-purple)] px-2.5 py-1 rounded-full font-medium uppercase tracking-[0.05em]">Popular</span>}
                  </div>
                  <p className="text-[15px] text-white/55 leading-[1.7] mb-5 max-w-[700px]">{svc.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {svc.tags.map((tag) => <span key={tag} className="text-[11px] text-white/55 bg-white/[0.05] px-3 py-1.5 rounded-full border border-white/[0.07]">{tag}</span>)}
                  </div>
                </div>
                <Link href="/contact" className="shrink-0">
                  <button className="text-sm text-[var(--color-purple)] border border-[var(--color-purple)]/30 px-5 py-2.5 rounded-full hover:bg-[var(--color-purple)]/10 transition-all duration-200">Get Quote →</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#1c0d2b] to-[#11071c] py-20 px-6 text-center relative overflow-hidden border-t border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(187,134,252,0.15),transparent_50%)] pointer-events-none" />
        <h2 className="font-[var(--font-display)] text-white mb-4 relative z-[1]" style={{ fontSize: "clamp(30px, 4vw, 48px)" }}>Ready to amplify your content?</h2>
        <p className="text-base text-white/60 mb-8 max-w-[480px] mx-auto relative z-[1]">Get a free content strategy consultation today.</p>
        <Link href="/contact" className="relative z-[1]">
          <button className="bg-[var(--color-purple)] text-white text-base font-semibold px-9 py-4 rounded-full hover:bg-[var(--color-purple-hover)] hover:scale-[1.03] transition-all duration-200">Free Consultation →</button>
        </Link>
      </section>
    </>
  );
}
