import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { servicesData } from "@/data/services";
import { getCloudData, saveCloudData } from "@/lib/cloudSync";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Primary source: cloud storage (always persistent across Vercel serverless)
    const cloudData = await getCloudData();
    const cloudServices = cloudData.services || {};

    // Secondary source: SQLite (ephemeral on Vercel)
    let dbServices: Array<Record<string, unknown>> = [];
    try {
      dbServices = await db.servicePage.findMany({
        orderBy: { sortOrder: "asc" }
      });
    } catch {
      // SQLite might not have the table or might be stale — that's ok
    }

    // Auto-seed database if empty (first time setup)
    if (dbServices.length === 0) {
      try {
        let orderIndex = 1;
        for (const cat of servicesData) {
          for (const sub of cat.subItems) {
            await db.servicePage.upsert({
              where: { slug: sub.slug },
              update: {},
              create: {
                name: sub.name,
                slug: sub.slug,
                categoryName: cat.title,
                sortOrder: orderIndex,
                tagline: sub.tagline || "",
                description: sub.description || "",
                benefits: JSON.stringify(sub.benefits || []),
                primaryCtaText: sub.primaryCtaText || "Get Started",
                primaryCtaLink: sub.primaryCtaLink || `/contact?service=${sub.slug}`,
                secondaryCtaText: sub.secondaryCtaText || null,
                secondaryCtaLink: sub.secondaryCtaLink || null,
              },
            });
            orderIndex++;
          }
        }
        dbServices = await db.servicePage.findMany({
          orderBy: { sortOrder: "asc" }
        });
      } catch {
        // Seeding failed — fall back to static data
      }
    }

    // If we have DB services, merge with cloud overrides
    if (dbServices.length > 0) {
      const merged = dbServices.map((s: Record<string, unknown>) => {
        const slug = s.slug as string;
        const override = cloudServices[slug];
        if (override) {
          return { ...s, ...override };
        }
        return s;
      });
      return NextResponse.json(merged);
    }

    // Fallback: build service list from static data + cloud overrides
    const fallbackServices: Array<Record<string, unknown>> = [];
    let orderIndex = 1;
    for (const cat of servicesData) {
      for (const sub of cat.subItems) {
        const cloudOverride = cloudServices[sub.slug];
        fallbackServices.push({
          id: cloudOverride?.id || sub.slug,
          name: cloudOverride?.name || sub.name,
          slug: sub.slug,
          categoryName: cloudOverride?.categoryName || cat.title,
          sortOrder: cloudOverride?.sortOrder || orderIndex,
          tagline: cloudOverride?.tagline || sub.tagline || "",
          description: cloudOverride?.description || sub.description || "",
          benefits: cloudOverride?.benefits || JSON.stringify(sub.benefits || []),
          primaryCtaText: cloudOverride?.primaryCtaText || sub.primaryCtaText || "Get Started",
          primaryCtaLink: cloudOverride?.primaryCtaLink || sub.primaryCtaLink || `/contact?service=${sub.slug}`,
          secondaryCtaText: cloudOverride?.secondaryCtaText || sub.secondaryCtaText || null,
          secondaryCtaLink: cloudOverride?.secondaryCtaLink || sub.secondaryCtaLink || null,
          imagePath: cloudOverride?.imagePath || null,
          imageAlt: cloudOverride?.imageAlt || null,
        });
        orderIndex++;
      }
    }
    return NextResponse.json(fallbackServices);
  } catch (error) {
    console.error("GET services error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      slug,
      categoryName,
      sortOrder,
      tagline,
      description,
      benefits,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink,
      imagePath,
      imageAlt,
      faqItems,
    } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and Slug are required" }, { status: 400 });
    }

    const updateData = {
      name,
      categoryName: categoryName || "SEO",
      sortOrder: sortOrder !== undefined ? Number(sortOrder) : 0,
      tagline: tagline || "",
      description: description || "",
      benefits: typeof benefits === "string" ? benefits : JSON.stringify(benefits || []),
      primaryCtaText: primaryCtaText || "Get Started",
      primaryCtaLink: primaryCtaLink || "/contact",
      secondaryCtaText: secondaryCtaText || "",
      secondaryCtaLink: secondaryCtaLink || "",
      imagePath: imagePath || null,
      imageAlt: imageAlt || null,
      faqItems: typeof faqItems === "string" ? faqItems : JSON.stringify(faqItems || []),
    };

    // CRITICAL: Save to cloud FIRST (this is the persistent source of truth)
    // SQLite on Vercel is ephemeral and unreliable — cloud must succeed.
    let cloudSaveOk = false;
    try {
      const cloudData = await getCloudData();
      const existingServices = cloudData.services || {};
      existingServices[slug] = { ...updateData, slug };
      cloudSaveOk = await saveCloudData({ services: existingServices });
    } catch (cloudErr) {
      console.error("Save cloud data error:", cloudErr);
    }

    // Also try SQLite (best-effort, may fail on Vercel)
    let dbRecord = null;
    try {
      dbRecord = await db.servicePage.upsert({
        where: { slug },
        update: updateData,
        create: {
          slug,
          ...updateData,
        },
      });
    } catch (dbErr) {
      console.error("SQLite upsert error (non-fatal):", dbErr);
    }

    if (!cloudSaveOk && !dbRecord) {
      return NextResponse.json({ error: "Failed to save service data" }, { status: 500 });
    }

    try {
      revalidatePath("/services/[category]");
      revalidatePath("/", "layout");
    } catch (revalErr) {
      console.error("Revalidate cache error:", revalErr);
    }

    // Return the saved data (prefer DB record if available, else reconstruct)
    const responseData = dbRecord || { ...updateData, slug, id: slug };
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Save service error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
