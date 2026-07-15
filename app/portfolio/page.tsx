import { Metadata } from "next";
import { portfolioData } from "@/data/portfolio";
import PortfolioFilter from "@/components/portfolio/PortfolioFilter";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";

export const metadata: Metadata = {
  title: "Case Studies & Portfolio - Digital World",
  description: "Browse our SEO, PPC, Web Design, and Content case studies showing growth and organic search visibility.",
};

export default function PortfolioPage() {
  return (
    <article className="min-h-screen bg-transparent py-20 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,118,255,0.03)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl px-6">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100/50 px-4 py-1 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Real projects - Real results
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-neutral-900 tracking-tight leading-[1.15] mb-6">
            Work that <span className="text-primary italic font-serif font-medium">speaks</span> <br />
            for itself.
          </h1>
          <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed max-w-2xl mx-auto">
            Explore a selection of projects across SEO, web design, paid advertising, and more — delivered for clients across 11 countries worldwide.
          </p>
        </div>

        {/* Portfolio Filter Component */}
        <PortfolioFilter items={portfolioData} />
      </div>

      {/* CTA Section */}
      <PortfolioCTA />
    </article>
  );
}
