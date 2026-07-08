import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Digital World · Kamrujjaman Mufti",
  description: "Expert insights on SEO, PPC, web design, and digital marketing strategies from Digital World.",
};

const posts = [
  {
    title: "10 SEO Strategies That Actually Work in 2025",
    excerpt: "Discover the proven SEO techniques that are driving real results for businesses in competitive markets across the USA, UK, and beyond.",
    category: "SEO",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    gradient: "from-[#146886] to-[#0a4969]",
  },
  {
    title: "Why Your Shopify Store Isn't Converting (And How to Fix It)",
    excerpt: "Common conversion killers on Shopify stores and the data-driven fixes that can boost your sales by 100%+ within 60 days.",
    category: "Web Design",
    date: "Nov 28, 2024",
    readTime: "6 min read",
    gradient: "from-[#0d1f0d] to-[#0a180a]",
  },
  {
    title: "Google Ads vs Facebook Ads: Which Is Right for Your Business?",
    excerpt: "A comprehensive comparison of the two biggest ad platforms, with real case studies and budget recommendations for different business types.",
    category: "PPC",
    date: "Nov 10, 2024",
    readTime: "10 min read",
    gradient: "from-[#1a0800] to-[#120600]",
  },
  {
    title: "The Complete Guide to Local SEO for Small Businesses",
    excerpt: "Everything you need to know about dominating local search results — from Google Business Profile optimization to local link building.",
    category: "SEO",
    date: "Oct 22, 2024",
    readTime: "12 min read",
    gradient: "from-[#0a2540] to-[#061a2e]",
  },
  {
    title: "How to Build a Content Marketing Strategy That Drives Revenue",
    excerpt: "Step-by-step framework for creating content that attracts, engages, and converts your target audience into paying customers.",
    category: "Content",
    date: "Oct 5, 2024",
    readTime: "9 min read",
    gradient: "from-[#1c0d2b] to-[#11071c]",
  },
  {
    title: "Website Speed Optimization: The Ultimate Checklist",
    excerpt: "A technical deep-dive into making your website lightning-fast, with actionable tips that can cut your load time in half.",
    category: "Web Design",
    date: "Sep 18, 2024",
    readTime: "7 min read",
    gradient: "from-[#1a1a0a] to-[#12120a]",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[50vh] bg-black flex items-center justify-center text-center relative overflow-hidden pt-[52px]">
        <div className="absolute inset-0">
          <div className="absolute w-[500px] h-[500px] rounded-full -top-[100px] left-[30%]" style={{ background: "radial-gradient(circle, rgba(0,113,227,0.35) 0%, transparent 70%)", filter: "blur(90px)" }} />
          <div className="grain" />
        </div>
        <div className="relative z-[2] max-w-[700px] px-6 py-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-white/50 tracking-[0.1em] uppercase mb-6 px-3.5 py-1.5 border border-white/[0.12] rounded-full bg-white/[0.04]">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue)] shadow-[0_0_8px_var(--color-blue)]" />
            Blog
          </span>
          <h1 className="font-[var(--font-display)] text-white mb-4 tracking-[-0.02em] leading-[1.06]" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            Insights & strategies
            <br />
            that drive growth.
          </h1>
          <p className="text-lg font-light text-white/45 max-w-[520px] mx-auto leading-[1.65]">
            Expert articles on SEO, PPC, web design, and digital marketing from the Digital World team.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-[#f5f5f7] py-24 px-6">
        <div className="max-w-[1120px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, i) => (
              <article key={i} className="rounded-[20px] overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] transition-all duration-300 group cursor-pointer">
                <div className={`bg-gradient-to-br ${post.gradient} h-[180px] relative flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.12),transparent_60%)] pointer-events-none" />
                  <span className="text-5xl opacity-50 relative z-[1]">
                    {post.category === "SEO" ? "🔍" : post.category === "Web Design" ? "🌐" : post.category === "PPC" ? "🎯" : "✍️"}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-semibold text-[var(--color-blue)] uppercase tracking-[0.08em] bg-[rgba(0,113,227,0.08)] px-2.5 py-1 rounded-full">{post.category}</span>
                    <span className="text-[11px] text-[var(--color-gray)]">{post.readTime}</span>
                  </div>
                  <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-2 leading-snug group-hover:text-[var(--color-blue)] transition-colors duration-200">{post.title}</h3>
                  <p className="text-sm text-[var(--color-gray)] leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="text-xs text-[var(--color-light-gray)]">{post.date}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-black py-20 px-6 text-center">
        <div className="max-w-[600px] mx-auto">
          <h2 className="font-[var(--font-display)] text-white mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}>Stay ahead of the curve.</h2>
          <p className="text-base text-white/45 mb-8">Get weekly digital marketing tips and strategies delivered to your inbox.</p>
          <div className="flex gap-3 max-sm:flex-col">
            <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-3.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-white text-sm focus:outline-none focus:border-[var(--color-blue)] transition-colors placeholder:text-white/30" />
            <button className="bg-[var(--color-blue)] text-white text-sm font-medium px-7 py-3.5 rounded-full hover:bg-[var(--color-blue-hover)] transition-colors duration-200 shrink-0">
              Subscribe →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
