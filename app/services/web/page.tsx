import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design & Development — Digital World · Kamrujjaman Mufti",
  description: "Professional web design and development services including WordPress, Shopify, landing pages, speed optimization, and website maintenance.",
};

const services = [
  { id: "svc-uiux", emoji: "🎨", name: "Website Design (UI/UX)", desc: "Beautiful, user-centric designs that captivate visitors and guide them toward conversion. Research-driven wireframes, prototypes, and pixel-perfect final designs.", tags: ["UI Design", "UX Research", "Prototyping"] },
  { id: "svc-wordpress", emoji: "🔵", name: "WordPress Development", desc: "Custom WordPress themes and plugins built for performance, SEO, and ease of management. From blogs to complex business sites — WordPress done right.", tags: ["Custom Themes", "Plugins", "SEO-Ready"], popular: true },
  { id: "svc-shopify", emoji: "🟢", name: "Shopify Development", desc: "Conversion-optimized Shopify stores with custom themes, app integrations, and checkout optimization. Built to sell from day one.", tags: ["Custom Theme", "App Integration", "Checkout CRO"], popular: true },
  { id: "svc-landing", emoji: "🎯", name: "Landing Page Design", desc: "High-converting landing pages designed for specific campaigns. A/B testable, fast-loading, and optimized for maximum lead capture and sales.", tags: ["Conversion Focused", "A/B Testing", "Lead Capture"] },
  { id: "svc-speed", emoji: "⚡", name: "Website Speed Optimization", desc: "Make your website lightning-fast. Core Web Vitals optimization, image compression, code minification, and CDN setup for sub-2-second load times.", tags: ["Core Web Vitals", "Performance", "CDN Setup"] },
  { id: "svc-maintenance", emoji: "🔧", name: "Website Maintenance", desc: "Keep your website secure, updated, and running smoothly. Regular backups, security monitoring, plugin updates, and performance checks.", tags: ["Security", "Backups", "Updates"] },
  { id: "svc-migration", emoji: "🚚", name: "Website Migration", desc: "Seamless website migrations without losing SEO rankings. Platform migrations, domain transfers, and hosting changes handled with zero downtime.", tags: ["Platform Migration", "SEO Preservation", "Zero Downtime"] },
  { id: "svc-cms", emoji: "📝", name: "CMS Setup", desc: "Set up and configure the perfect CMS for your needs. WordPress, Shopify, Webflow, or custom solutions — configured for easy content management.", tags: ["WordPress", "Shopify", "Webflow"] },
];

export default function WebPage() {
  return (
    <>
      <section className="min-h-[60vh] bg-black flex items-center justify-center text-center relative overflow-hidden pt-[52px]">
        <div className="absolute inset-0">
          <div className="absolute w-[700px] h-[700px] rounded-full -top-[200px] left-[20%]" style={{ background: "radial-gradient(circle, rgba(52,199,89,0.4) 0%, transparent 70%)", filter: "blur(90px)" }} />
          <div className="absolute w-[500px] h-[500px] rounded-full bottom-0 -right-[100px]" style={{ background: "radial-gradient(circle, rgba(0,113,227,0.3) 0%, transparent 70%)", filter: "blur(90px)" }} />
          <div className="grain" />
        </div>
        <div className="relative z-[2] max-w-[800px] px-6 py-20">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-white/50 tracking-[0.1em] uppercase mb-6 px-3.5 py-1.5 border border-white/[0.12] rounded-full bg-white/[0.04]">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] shadow-[0_0_8px_var(--color-green)]" />
            Web Design & Dev
          </span>
          <h1 className="font-[var(--font-display)] text-white mb-6 tracking-[-0.02em] leading-[1.06]" style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
            Websites built to
            <br />
            <em className="italic bg-clip-text text-transparent" style={{ background: "linear-gradient(135deg, #34c759, #0071e3)", WebkitBackgroundClip: "text" }}>convert & grow.</em>
          </h1>
          <p className="text-lg font-light text-white/45 max-w-[600px] mx-auto leading-[1.65]">
            WordPress, Shopify, landing pages, and custom web applications — mobile-first, lightning-fast, and built to turn visitors into revenue.
          </p>
          <div className="flex gap-3.5 justify-center mt-10">
            <Link href="/contact">
              <button className="bg-[var(--color-green)] text-black text-[15px] font-semibold px-[30px] py-[15px] rounded-full hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(52,199,89,0.4)] transition-all duration-200">
                Get a Quote →
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
                <div className="w-[60px] h-[60px] rounded-2xl bg-[rgba(52,199,89,0.12)] flex items-center justify-center text-[28px] shrink-0">{svc.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-white">{svc.name}</h3>
                    {svc.popular && <span className="text-[10px] bg-[rgba(52,199,89,0.2)] text-[var(--color-green)] px-2.5 py-1 rounded-full font-medium uppercase tracking-[0.05em]">Popular</span>}
                  </div>
                  <p className="text-[15px] text-white/55 leading-[1.7] mb-5 max-w-[700px]">{svc.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {svc.tags.map((tag) => <span key={tag} className="text-[11px] text-white/55 bg-white/[0.05] px-3 py-1.5 rounded-full border border-white/[0.07]">{tag}</span>)}
                  </div>
                </div>
                <Link href="/contact" className="shrink-0">
                  <button className="text-sm text-[var(--color-green)] border border-[var(--color-green)]/30 px-5 py-2.5 rounded-full hover:bg-[var(--color-green)]/10 transition-all duration-200">Get Quote →</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#0d1f0d] to-[#0a180a] py-20 px-6 text-center relative overflow-hidden border-t border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(52,199,89,0.15),transparent_50%)] pointer-events-none" />
        <h2 className="font-[var(--font-display)] text-white mb-4 relative z-[1]" style={{ fontSize: "clamp(30px, 4vw, 48px)" }}>Let&apos;s build something amazing.</h2>
        <p className="text-base text-white/60 mb-8 max-w-[480px] mx-auto relative z-[1]">Get a free consultation on your web project today.</p>
        <Link href="/contact" className="relative z-[1]">
          <button className="bg-[var(--color-green)] text-black text-base font-semibold px-9 py-4 rounded-full hover:scale-[1.03] transition-all duration-200">Start Your Project →</button>
        </Link>
      </section>
    </>
  );
}
