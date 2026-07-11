import { Metadata } from "next";
import { portfolioData } from "@/data/portfolio";
import PortfolioFilter from "@/components/portfolio/PortfolioFilter";

export const metadata: Metadata = {
  title: "Case Studies & Portfolio - Digital World",
  description: "Browse our SEO, PPC, Web Design, and Content case studies showing growth and organic search visibility.",
};

export default function PortfolioPage() {
  return (
    <article className="min-h-screen bg-white py-20 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,118,255,0.03)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl px-6">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
            Case Studies
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6">
            Our recent client campaigns
          </h1>
          <p className="font-sans text-base sm:text-lg text-neutral-500 leading-relaxed">
            Real search and conversion results delivered across e-commerce channels, B2B pipeline builders, and SaaS companies.
          </p>
          <div className="mt-4 text-xs font-semibold text-amber-600 bg-amber-50 inline-block px-3 py-1 rounded-md border border-amber-100">
            Note: The items below represent realistic placeholders to showcase layout. Replace with your actual case study assets before launch.
          </div>
        </div>

        {/* Portfolio Filter Component */}
        <PortfolioFilter items={portfolioData} />
      </div>
    </article>
  );
}
