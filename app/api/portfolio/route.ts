import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { portfolioData } from "@/data/portfolio";
import { PortfolioItem } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const dbProjects = await db.portfolioProject.findMany({
      orderBy: { createdAt: "desc" },
    }).catch(() => []);

    if (!dbProjects || dbProjects.length === 0) {
      return NextResponse.json(portfolioData);
    }

    const projectsMap: Record<string, PortfolioItem> = {};

    // 1. Seed static default items
    for (const item of portfolioData) {
      projectsMap[item.id] = item;
    }

    // 2. Merge DB projects
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
        tags: tags.length > 0 ? tags : [p.industry],
      };
    }

    return NextResponse.json(Object.values(projectsMap));
  } catch (error) {
    console.error("GET public portfolio API error:", error);
    return NextResponse.json(portfolioData);
  }
}
