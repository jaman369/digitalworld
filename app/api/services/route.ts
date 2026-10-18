import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { servicesData } from "@/data/services";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface DbServiceItem {
  id?: string;
  name?: string;
  slug?: string;
  categoryName?: string;
  sortOrder?: number;
  tagline?: string | null;
  description?: string;
  benefits?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string | null;
  secondaryCtaLink?: string | null;
  imagePath?: string | null;
  imageAlt?: string | null;
}

export async function GET() {
  try {
    let dbServices: DbServiceItem[] = [];

    // 1. Try Prisma
    try {
      dbServices = (await db.servicePage.findMany({
        orderBy: { sortOrder: "asc" },
      })) as DbServiceItem[];
    } catch (dbErr) {
      console.warn("Prisma GET services error in /api/services, falling back to supabaseAdmin:", dbErr);
    }

    // 2. Fallback to Supabase REST client directly
    if (!dbServices || dbServices.length === 0) {
      try {
        const { data: supaServices } = await supabaseAdmin
          .from("ServicePage")
          .select("*")
          .order("sortOrder", { ascending: true });
        if (supaServices && supaServices.length > 0) {
          dbServices = supaServices as DbServiceItem[];
        }
      } catch (supaErr) {
        console.error("Supabase direct GET error in /api/services:", supaErr);
      }
    }

    if (!dbServices || dbServices.length === 0) {
      return NextResponse.json(servicesData, {
        headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
      });
    }

    const categoriesMerged = servicesData.map((cat) => {
      const mergedSubItems = cat.subItems.map((sub) => {
        const dbSvc = dbServices.find((s) => s.slug === sub.slug);
        if (!dbSvc) return sub;

        let benefitsList = sub.benefits;
        try {
          if (dbSvc.benefits) {
            benefitsList = typeof dbSvc.benefits === "string" ? JSON.parse(dbSvc.benefits) : dbSvc.benefits;
          }
        } catch {}

        return {
          ...sub,
          name: dbSvc.name || sub.name,
          description: dbSvc.description || sub.description,
          tagline: dbSvc.tagline !== undefined && dbSvc.tagline !== null ? dbSvc.tagline : sub.tagline,
          benefits: benefitsList,
          primaryCtaText: dbSvc.primaryCtaText || sub.primaryCtaText,
          primaryCtaLink: dbSvc.primaryCtaLink || sub.primaryCtaLink,
          secondaryCtaText: dbSvc.secondaryCtaText !== undefined ? dbSvc.secondaryCtaText : sub.secondaryCtaText,
          secondaryCtaLink: dbSvc.secondaryCtaLink !== undefined ? dbSvc.secondaryCtaLink : sub.secondaryCtaLink,
          imagePath: dbSvc.imagePath !== undefined ? dbSvc.imagePath : sub.imagePath,
          imageAlt: dbSvc.imageAlt !== undefined ? dbSvc.imageAlt : sub.imageAlt,
        };
      });

      return {
        ...cat,
        subItems: mergedSubItems,
      };
    });

    return NextResponse.json(categoriesMerged, {
      headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
    });
  } catch (error) {
    console.error("GET public services API error:", error);
    return NextResponse.json(servicesData, {
      headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
    });
  }
}

