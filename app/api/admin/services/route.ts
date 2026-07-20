import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { servicesData } from "@/data/services";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let services = await db.servicePage.findMany({
      orderBy: { sortOrder: "asc" }
    });

    // Auto-seed database if empty
    if (services.length === 0) {
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
      services = await db.servicePage.findMany({
        orderBy: { sortOrder: "asc" }
      });
    }

    return NextResponse.json(services);
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

    const updated = await db.servicePage.upsert({
      where: { slug },
      update: updateData,
      create: {
        slug,
        ...updateData,
      },
    });

    try {
      revalidatePath("/services/[category]");
      revalidatePath("/", "layout");
    } catch (revalErr) {
      console.error("Revalidate cache error:", revalErr);
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Save service error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
