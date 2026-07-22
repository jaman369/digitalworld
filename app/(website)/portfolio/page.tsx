import { Metadata } from "next";
import { portfolioData } from "@/data/portfolio";
import { PortfolioItem } from "@/types";
import PortfolioFilter from "@/components/portfolio/PortfolioFilter";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";
import { db } from "@/lib/db";
import { getCloudData } from "@/lib/cloudSync";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Case Studies & Portfolio - Digital World",
  description: "Browse our SEO, PPC, Web Design, and Content case studies showing growth and organic search visibility.",
};

export default async function PortfolioPage() {
  const cloudData = await getCloudData();
  const cloudPortfolio = cloudData.portfolio || {};

  const dbProjects = await db.portfolioProject.findMany().catch(() => []);

  const projectsMap: Record<string, PortfolioItem> = {};

  // 1. Seed static portfolioData
  for (const item of portfolioData) {
    projectsMap[item.id] = item;
  }

  // 2. Overlay DB projects
  for (const p of dbProjects) {
    let tags: string[] = [];
    try { tags = JSON.parse(p.servicesUsed); } catch {}
    let gallery: string[] = [];
    try { gallery = JSON.parse(p.gallery); } catch {}

    const serviceType = p.slug.includes("seo")
      ? "SEO"
      : p.slug.includes("ppc") || p.slug.includes("google") || p.slug.includes("ads")
        ? "PPC"
        : p.slug.includes("web") || p.slug.includes("design") || p.slug.includes("dev") || p.slug.includes("wordpress") || p.slug.includes("shopify")
          ? "Web"
          : "Content";

    projectsMap[p.id || p.slug] = {
      id: p.id,
      client: p.clientName,
      industry: p.industry,
      serviceType,
      description: p.caseStudy,
      resultStat: p.resultsLabel,
      image: gallery[0] || "https://picsum.photos/600/400?random=11",
      tags,
    };
  }

  // 3. Overlay Cloud projects
  for (const [key, p] of Object.entries(cloudPortfolio)) {
    let tags: string[] = [];
    if (p.servicesUsed) {
      try { tags = typeof p.servicesUsed === "string" ? JSON.parse(p.servicesUsed) : p.servicesUsed; } catch {}
    }
    let gallery: string[] = [];
    if (p.gallery) {
      try { gallery = typeof p.gallery === "string" ? JSON.parse(p.gallery) : p.gallery; } catch {}
    }

    const serviceType = p.slug.includes("seo")
      ? "SEO"
      : p.slug.includes("ppc") || p.slug.includes("google") || p.slug.includes("ads")
        ? "PPC"
        : p.slug.includes("web") || p.slug.includes("design") || p.slug.includes("dev") || p.slug.includes("wordpress") || p.slug.includes("shopify")
          ? "Web"
          : "Content";

    projectsMap[key] = {
      id: p.id || key,
      client: p.clientName,
      industry: p.industry,
      serviceType,
      description: p.caseStudy,
      resultStat: p.resultsLabel,
      image: gallery[0] || "https://picsum.photos/600/400?random=11",
      tags: Array.isArray(tags) ? tags : [p.industry],
    };
  }

  const items = Object.values(projectsMap);

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
        <PortfolioFilter items={items} />
      </div>

      {/* CTA Section */}
      <PortfolioCTA />
    </article>
  );
}
