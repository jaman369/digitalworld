import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { servicesData } from "@/data/services";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const dbServices = await db.servicePage.findMany({
      orderBy: { sortOrder: "asc" },
    }).catch(() => []);

    if (!dbServices || dbServices.length === 0) {
      return NextResponse.json(servicesData);
    }

    const categoriesMerged = servicesData.map((cat) => {
      const mergedSubItems = cat.subItems.map((sub) => {
        const dbSvc = dbServices.find((s) => s.slug === sub.slug);
        if (!dbSvc) return sub;

        let benefitsList = sub.benefits;
        try {
          if (dbSvc.benefits) benefitsList = JSON.parse(dbSvc.benefits);
        } catch {}

        return {
          ...sub,
          name: dbSvc.name || sub.name,
          description: dbSvc.description || sub.description,
          tagline: dbSvc.tagline || sub.tagline,
          benefits: benefitsList,
          primaryCtaText: dbSvc.primaryCtaText || sub.primaryCtaText,
          primaryCtaLink: dbSvc.primaryCtaLink || sub.primaryCtaLink,
          secondaryCtaText: dbSvc.secondaryCtaText || sub.secondaryCtaText,
          secondaryCtaLink: dbSvc.secondaryCtaLink || sub.secondaryCtaLink,
          imagePath: dbSvc.imagePath || sub.imagePath,
          imageAlt: dbSvc.imageAlt || sub.imageAlt,
        };
      });

      return {
        ...cat,
        subItems: mergedSubItems,
      };
    });

    return NextResponse.json(categoriesMerged);
  } catch (error) {
    console.error("GET public services API error:", error);
    return NextResponse.json(servicesData);
  }
}
