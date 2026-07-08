import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Digital World · Kamrujjaman Mufti",
  description: "Learn about Digital World, a full-service digital marketing agency led by Kamrujjaman Mufti, serving clients across 11 countries worldwide.",
};

const timeline = [
  { year: "2020", title: "Founded Digital World", desc: "Started as a freelance SEO specialist, working with small businesses in Bangladesh." },
  { year: "2021", title: "Expanded Services", desc: "Added web design, PPC advertising, and content marketing to the service portfolio." },
  { year: "2022", title: "International Clients", desc: "Began serving clients in the USA, UK, and Canada with specialized SEO strategies." },
  { year: "2023", title: "11 Countries", desc: "Expanded reach to 11 countries across 4 continents, with 100+ projects delivered." },
  { year: "2024", title: "Full-Service Agency", desc: "Grew into a full-service digital marketing agency with 150+ projects and 120+ happy clients." },
];

const values = [
  { emoji: "🎯", title: "Results-Driven", desc: "Every strategy is designed to deliver measurable ROI. No vanity metrics — only real business growth." },
  { emoji: "🤝", title: "Client-First", desc: "Your success is our success. Direct communication, transparent reporting, and honest advice — always." },
  { emoji: "📊", title: "Data-Backed", desc: "We make decisions based on analytics, competitor research, and performance data — never guesswork." },
  { emoji: "🌏", title: "Global Mindset", desc: "Understanding local markets across 11 countries while maintaining international quality standards." },
  { emoji: "⚡", title: "Agile & Fast", desc: "Quick turnaround times with clear project timelines. We move fast without sacrificing quality." },
  { emoji: "🔄", title: "Continuous Growth", desc: "Always learning, always improving. We stay ahead of industry trends so our clients stay ahead of competitors." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[60vh] bg-black flex items-center justify-center text-center relative overflow-hidden pt-[52px]">
        <div className="absolute inset-0">
          <div className="absolute w-[600px] h-[600px] rounded-full -top-[150px] -left-[150px]" style={{ background: "radial-gradient(circle, rgba(0,113,227,0.4) 0%, transparent 70%)", filter: "blur(90px)" }} />
          <div className="absolute w-[500px] h-[500px] rounded-full -bottom-[100px] -right-[100px]" style={{ background: "radial-gradient(circle, rgba(52,199,89,0.25) 0%, transparent 70%)", filter: "blur(90px)" }} />
          <div className="grain" />
        </div>
        <div className="relative z-[2] max-w-[800px] px-6 py-20">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-white/50 tracking-[0.1em] uppercase mb-6 px-3.5 py-1.5 border border-white/[0.12] rounded-full bg-white/[0.04]">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] shadow-[0_0_8px_var(--color-green)]" />
            About Us
          </span>
          <h1 className="font-[var(--font-display)] text-white mb-6 tracking-[-0.02em] leading-[1.06]" style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
            Built on expertise.
            <br />
            Driven by results.
          </h1>
          <p className="text-lg font-light text-white/45 max-w-[600px] mx-auto leading-[1.65]">
            <strong className="text-white/75 font-normal">Digital World</strong> is a full-service digital marketing agency founded by <strong className="text-white/75 font-normal">Kamrujjaman Mufti</strong> — helping businesses across 11 countries grow through SEO, paid ads, web design, and content marketing.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-[#f5f5f7] py-24 px-6">
        <div className="max-w-[900px] mx-auto">
          <span className="text-[11px] font-semibold text-[#39f] tracking-[0.1em] uppercase mb-3.5 block text-center">Our Journey</span>
          <h2 className="font-[var(--font-display)] text-[#1d1d1f] text-center mb-16 tracking-[-0.02em]" style={{ fontSize: "clamp(30px, 4vw, 48px)" }}>
            From freelancer to full-service agency.
          </h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-blue)] via-[var(--color-green)] to-transparent max-md:left-3" />
            {timeline.map((item, i) => (
              <div key={i} className="relative pl-16 pb-12 last:pb-0 max-md:pl-10">
                <div className="absolute left-[14px] top-1 w-6 h-6 rounded-full bg-white border-2 border-[var(--color-blue)] flex items-center justify-center max-md:left-[-3px]">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-blue)]" />
                </div>
                <div className="text-sm font-semibold text-[var(--color-blue)] mb-1">{item.year}</div>
                <div className="text-lg font-semibold text-[#1d1d1f] mb-2">{item.title}</div>
                <div className="text-sm text-[var(--color-gray)] leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-black py-24 px-6">
        <div className="max-w-[1120px] mx-auto">
          <div className="text-center mb-14">
            <span className="text-[11px] font-semibold text-[#39f] tracking-[0.1em] uppercase mb-3.5 block">Our Values</span>
            <h2 className="font-[var(--font-display)] text-white tracking-[-0.02em]" style={{ fontSize: "clamp(30px, 4vw, 48px)" }}>
              What we stand for.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {values.map((v, i) => (
              <div key={i} className="bg-white/[0.04] border border-white/[0.08] rounded-[20px] p-8 hover:bg-white/[0.07] hover:-translate-y-1 transition-all duration-[250ms]">
                <span className="text-[34px] mb-4 block">{v.emoji}</span>
                <div className="text-[17px] font-semibold text-white mb-2">{v.title}</div>
                <div className="text-sm text-white/50 leading-[1.65]">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1d1d1f] py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,113,227,0.12) 0%, transparent 70%)" }} />
        <h2 className="font-[var(--font-display)] text-white mb-4 relative z-[1]" style={{ fontSize: "clamp(30px, 4vw, 48px)" }}>Ready to work together?</h2>
        <p className="text-base text-white/45 mb-8 max-w-[480px] mx-auto relative z-[1]">Let&apos;s discuss how we can help your business grow globally.</p>
        <Link href="/contact" className="relative z-[1]">
          <button className="bg-[var(--color-blue)] text-white text-base font-medium px-9 py-4 rounded-full hover:bg-[var(--color-blue-hover)] hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,113,227,0.4)] transition-all duration-200">
            Get in Touch →
          </button>
        </Link>
      </section>
    </>
  );
}
