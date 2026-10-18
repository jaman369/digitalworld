import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { servicesData } from "@/data/services";

export const dynamic = "force-dynamic";

// Helper to construct all 50 canonical tracks
function getCanonicalServices() {
  const list: Array<{
    id: string;
    name: string;
    slug: string;
    categoryName: string;
    sortOrder: number;
    tagline: string;
    description: string;
    benefits: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string | null;
    secondaryCtaLink: string | null;
    imagePath: string | null;
    imageAlt: string | null;
  }> = [];

  let orderIdx = 1;
  for (const cat of servicesData) {
    const normalizedCatName =
      cat.title === "Web Dev"
        ? "Web Design & Development"
        : cat.title === "PPC & Paid Search" || cat.title === "PPC / Paid Ads"
        ? "PPC / Paid Ads"
        : cat.title === "Content Marketing & Authority Strategy" || cat.slug === "content-marketing"
        ? "Content Writing"
        : cat.title;

    for (const sub of cat.subItems) {
      list.push({
        id: `svc-${sub.slug}`,
        name: sub.name,
        slug: sub.slug,
        categoryName: normalizedCatName,
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
  return list;
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const canonicalList = getCanonicalServices();
    const canonicalSlugsSet = new Set(canonicalList.map((s) => s.slug));

interface DbRecordItem {
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

    let rawDbServices: DbRecordItem[] = [];
    try {
      rawDbServices = (await db.servicePage.findMany({
        orderBy: { sortOrder: "asc" },
      })) as DbRecordItem[];
    } catch (dbErr) {
      console.warn("Prisma GET services error, attempting supabaseAdmin fallback:", dbErr);
    }

    // Direct Supabase fallback
    if (!rawDbServices || rawDbServices.length === 0) {
      try {
        const { data: supaServices } = await supabaseAdmin
          .from("ServicePage")
          .select("*")
          .order("sortOrder", { ascending: true });
        if (supaServices && supaServices.length > 0) {
          rawDbServices = supaServices as DbRecordItem[];
        }
      } catch (supaErr) {
        console.error("Supabase direct GET error:", supaErr);
      }
    }

    // 1. Identify obsolete legacy records in DB that are NOT in canonical 50 tracks
    // (e.g. old email-marketing, cro-audit-testing, backlink-building, china-sourcing, etc.)
    const obsoleteSlugs = (rawDbServices || [])
      .map((r: DbRecordItem) => r.slug)
      .filter((slug?: string): slug is string => Boolean(slug && !canonicalSlugsSet.has(slug)));

    if (obsoleteSlugs.length > 0) {
      db.servicePage.deleteMany({ where: { slug: { in: obsoleteSlugs } } }).catch(() => {});
      supabaseAdmin.from("ServicePage").delete().in("slug", obsoleteSlugs).then(() => {});
    }

    // 2. Identify missing canonical services that are not yet in DB
    const existingSlugsSet = new Set((rawDbServices || []).map((r: DbRecordItem) => r.slug));
    const missingCanonical = canonicalList.filter((c) => !existingSlugsSet.has(c.slug));

    if (missingCanonical.length > 0) {
      for (const m of missingCanonical) {
        const payload = {
          slug: m.slug,
          name: m.name,
          categoryName: m.categoryName,
          sortOrder: m.sortOrder,
          tagline: m.tagline,
          description: m.description,
          benefits: m.benefits,
          primaryCtaText: m.primaryCtaText,
          primaryCtaLink: m.primaryCtaLink,
          secondaryCtaText: m.secondaryCtaText,
          secondaryCtaLink: m.secondaryCtaLink,
          imagePath: m.imagePath,
          imageAlt: m.imageAlt,
        };
        db.servicePage.create({ data: payload }).catch(() => {});
        supabaseAdmin
          .from("ServicePage")
          .upsert({ id: crypto.randomUUID(), ...payload }, { onConflict: "slug" })
          .then(() => {});
      }
    }

    // 3. Merge DB customized values into the canonical 50 tracks
    const mergedList = canonicalList.map((canonical) => {
      const dbMatch = (rawDbServices || []).find((r: DbRecordItem) => r.slug === canonical.slug);
      if (!dbMatch) {
        return canonical;
      }
      return {
        id: dbMatch.id || canonical.id,
        name: dbMatch.name || canonical.name,
        slug: canonical.slug,
        categoryName: canonical.categoryName, // always canonical category name
        sortOrder: canonical.sortOrder,
        tagline: dbMatch.tagline !== undefined && dbMatch.tagline !== null ? dbMatch.tagline : canonical.tagline,
        description: dbMatch.description || canonical.description,
        benefits: dbMatch.benefits || canonical.benefits,
        primaryCtaText: dbMatch.primaryCtaText || canonical.primaryCtaText,
        primaryCtaLink: dbMatch.primaryCtaLink || canonical.primaryCtaLink,
        secondaryCtaText: dbMatch.secondaryCtaText !== undefined ? dbMatch.secondaryCtaText : canonical.secondaryCtaText,
        secondaryCtaLink: dbMatch.secondaryCtaLink !== undefined ? dbMatch.secondaryCtaLink : canonical.secondaryCtaLink,
        imagePath: dbMatch.imagePath !== undefined ? dbMatch.imagePath : canonical.imagePath,
        imageAlt: dbMatch.imageAlt !== undefined ? dbMatch.imageAlt : canonical.imageAlt,
      };
    });

    return NextResponse.json(mergedList);
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
