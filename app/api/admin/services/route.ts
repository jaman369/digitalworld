import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { servicesData } from "@/data/services";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let dbServices: unknown[] = [];
    try {
      dbServices = await db.servicePage.findMany({
        orderBy: { sortOrder: "asc" },
      });
    } catch (dbErr) {
      console.warn("Prisma GET services error, attempting supabaseAdmin fallback:", dbErr);
    }

    // Direct Supabase fallback
    if (!dbServices || dbServices.length === 0) {
      try {
        const { data: supaServices } = await supabaseAdmin
          .from("ServicePage")
          .select("*")
          .order("sortOrder", { ascending: true });
        if (supaServices && supaServices.length > 0) {
          dbServices = supaServices;
        }
      } catch (supaErr) {
        console.error("Supabase direct GET error:", supaErr);
      }
    }

    // Static fallback if database has no rows
    if (!dbServices || dbServices.length === 0) {
      let orderIdx = 1;
      const fallbackList = [];
      for (const cat of servicesData) {
        for (const sub of cat.subItems) {
          fallbackList.push({
            id: `svc-${sub.slug}`,
            name: sub.name,
            slug: sub.slug,
            categoryName: cat.title,
            sortOrder: orderIdx++,
            tagline: sub.tagline || "",
            description: sub.description || "",
            benefits: JSON.stringify(sub.benefits || []),
            primaryCtaText: sub.primaryCtaText || "Get Started",
            primaryCtaLink: sub.primaryCtaLink || `/contact?service=${sub.slug}`,
            secondaryCtaText: sub.secondaryCtaText || null,
            secondaryCtaLink: sub.secondaryCtaLink || null,
            imagePath: null,
            imageAlt: null,
          });
        }
      }
      return NextResponse.json(fallbackList);
    }

    return NextResponse.json(dbServices);
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
      secondaryCtaText: secondaryCtaText || null,
      secondaryCtaLink: secondaryCtaLink || null,
      imagePath: imagePath || null,
      imageAlt: imageAlt || null,
      faqItems: typeof faqItems === "string" ? faqItems : JSON.stringify(faqItems || []),
    };

    let dbRecord: unknown = null;
    try {
      dbRecord = await db.servicePage.upsert({
        where: { slug },
        update: updateData,
        create: {
          slug,
          ...updateData,
        },
      });
    } catch (prismaErr) {
      console.warn("Prisma upsert failed, falling back to supabaseAdmin:", prismaErr);
    }

    // Direct Supabase fallback
    if (!dbRecord) {
      try {
        const { data: existing } = await supabaseAdmin
          .from("ServicePage")
          .select("id")
          .eq("slug", slug)
          .maybeSingle();

        const payload = {
          id: existing?.id || crypto.randomUUID(),
          slug,
          ...updateData,
          updatedAt: new Date().toISOString(),
        };

        const { data: savedRecord, error: supaErr } = await supabaseAdmin
          .from("ServicePage")
          .upsert(payload, { onConflict: "slug" })
          .select()
          .single();

        if (supaErr) throw supaErr;
        dbRecord = savedRecord;
      } catch (supaErr) {
        console.error("Supabase direct upsert error:", supaErr);
      }
    }

    try {
      revalidatePath("/services/[category]");
      revalidatePath("/admin/services");
      revalidatePath("/", "layout");
    } catch (revalErr) {
      console.error("Revalidate cache error:", revalErr);
    }

    return NextResponse.json(dbRecord || { slug, ...updateData });
  } catch (error) {
    console.error("Save service error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
