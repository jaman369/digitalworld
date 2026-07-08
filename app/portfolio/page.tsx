import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Digital World · Kamrujjaman Mufti",
  description: "Explore our portfolio of successful digital marketing projects across SEO, web design, PPC, and content marketing.",
};

const projects = [
  {
    title: "E-Commerce SEO Overhaul",
    category: "SEO",
    country: "🇺🇸 USA",
    result: "+340% organic traffic",
    desc: "Complete SEO restructuring for a fashion e-commerce brand, including technical audit, content strategy, and link building campaign.",
    gradient: "from-[#146886] to-[#0a4969]",
    tags: ["Ecommerce SEO", "Technical SEO", "Content Strategy"],
  },
  {
    title: "Shopify Store Redesign",
    category: "Web Design",
    country: "🇬🇧 UK",
    result: "+180% conversions",
    desc: "Full Shopify store redesign with custom theme, optimized checkout flow, and mobile-first responsive design.",
    gradient: "from-[#0d1f0d] to-[#0a180a]",
    tags: ["Shopify", "UI/UX Design", "CRO"],
  },
  {
    title: "Google Ads Campaign",
    category: "PPC",
    country: "🇨🇦 Canada",
    result: "5.2x ROAS",
    desc: "Multi-channel Google Ads campaign across Search, Shopping, and Performance Max for a home goods retailer.",
    gradient: "from-[#1a0800] to-[#120600]",
    tags: ["Google Ads", "Shopping Ads", "Performance Max"],
  },
  {
    title: "SaaS Content Strategy",
    category: "Content",
    country: "🇦🇺 Australia",
    result: "450+ keywords ranked",
    desc: "12-month content marketing strategy with topical authority clusters, resulting in significant organic growth.",
    gradient: "from-[#1c0d2b] to-[#11071c]",
    tags: ["Content Marketing", "Blog Strategy", "SEO"],
  },
  {
    title: "Local SEO Domination",
    category: "SEO",
    country: "🇮🇪 Ireland",
    result: "#1 for 23 keywords",
    desc: "Local SEO campaign for a dental practice chain, achieving top positions across multiple locations.",
    gradient: "from-[#0a2540] to-[#061a2e]",
    tags: ["Local SEO", "Google Business", "Citations"],
  },
  {
    title: "WordPress Development",
    category: "Web Design",
    country: "🇦🇪 UAE",
    result: "Sub-2s load time",
    desc: "Custom WordPress theme with advanced SEO integration, multilingual support, and blazing-fast performance.",
    gradient: "from-[#1a1a0a] to-[#12120a]",
    tags: ["WordPress", "Custom Theme", "Speed Optimization"],
  },
];

export default function PortfolioPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[50vh] bg-black flex items-center justify-center text-center relative overflow-hidden pt-[52px]">
        <div className="absolute inset-0">
          <div className="absolute w-[600px] h-[600px] rounded-full -top-[150px] left-[20%]" style={{ background: "radial-gradient(circle, rgba(187,134,252,0.3) 0%, transparent 70%)", filter: "blur(90px)" }} />
          <div className="absolute w-[400px] h-[400px] rounded-full bottom-0 right-[10%]" style={{ background: "radial-gradient(circle, rgba(0,113,227,0.25) 0%, transparent 70%)", filter: "blur(90px)" }} />
          <div className="grain" />
        </div>
        <div className="relative z-[2] max-w-[700px] px-6 py-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-white/50 tracking-[0.1em] uppercase mb-6 px-3.5 py-1.5 border border-white/[0.12] rounded-full bg-white/[0.04]">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-purple)] shadow-[0_0_8px_var(--color-purple)]" />
            Our Work
          </span>
          <h1 className="font-[var(--font-display)] text-white mb-4 tracking-[-0.02em] leading-[1.06]" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            Results that speak
            <br />
            for themselves.
          </h1>
          <p className="text-lg font-light text-white/45 max-w-[520px] mx-auto leading-[1.65]">
            150+ projects delivered across 11 countries. Here are some of our favourite success stories.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-[#0a0a0a] py-24 px-6">
        <div className="max-w-[1120px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <div key={i} className="rounded-[20px] overflow-hidden bg-white/[0.04] border border-white/[0.08] hover:-translate-y-1.5 hover:border-white/[0.14] transition-all duration-300 group">
                {/* Header */}
                <div className={`bg-gradient-to-br ${project.gradient} p-7 relative`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-semibold text-white/60 uppercase tracking-[0.1em] bg-white/[0.12] px-2.5 py-1 rounded-full">{project.category}</span>
                      <span className="text-xs text-white/60">{project.country}</span>
                    </div>
                    <div className="text-2xl font-[var(--font-display)] text-white mb-2">{project.title}</div>
                    <div className="text-[var(--color-green)] text-sm font-semibold">{project.result}</div>
                  </div>
                </div>
                {/* Body */}
                <div className="p-6">
                  <p className="text-sm text-white/50 leading-relaxed mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[11px] text-white/55 bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.07]">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1d1d1f] py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,113,227,0.12) 0%, transparent 70%)" }} />
        <h2 className="font-[var(--font-display)] text-white mb-4 relative z-[1]" style={{ fontSize: "clamp(30px, 4vw, 48px)" }}>Want results like these?</h2>
        <p className="text-base text-white/45 mb-8 max-w-[480px] mx-auto relative z-[1]">Let&apos;s discuss your project and create a strategy for success.</p>
        <Link href="/contact" className="relative z-[1]">
          <button className="bg-[var(--color-blue)] text-white text-base font-medium px-9 py-4 rounded-full hover:bg-[var(--color-blue-hover)] hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,113,227,0.4)] transition-all duration-200">
            Start Your Project →
          </button>
        </Link>
      </section>
    </>
  );
}
