import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const services = await db.servicePage.findMany({
      orderBy: { name: "asc" }
    });
    return NextResponse.json(services);
  } catch {
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
      tagline,
      description,
      benefits,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink,
      faqItems,
    } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and Slug are required" }, { status: 400 });
    }

    const updated = await db.servicePage.upsert({
      where: { slug },
      update: {
        name,
        tagline: tagline || "",
        description: description || "",
        benefits: typeof benefits === "string" ? benefits : JSON.stringify(benefits || []),
        primaryCtaText: primaryCtaText || "Get Started",
        primaryCtaLink: primaryCtaLink || "/contact",
        secondaryCtaText: secondaryCtaText || "",
        secondaryCtaLink: secondaryCtaLink || "",
        faqItems: typeof faqItems === "string" ? faqItems : JSON.stringify(faqItems || []),
      },
      create: {
        name,
        slug,
        tagline: tagline || "",
        description: description || "",
        benefits: typeof benefits === "string" ? benefits : JSON.stringify(benefits || []),
        primaryCtaText: primaryCtaText || "Get Started",
        primaryCtaLink: primaryCtaLink || "/contact",
        secondaryCtaText: secondaryCtaText || "",
        secondaryCtaLink: secondaryCtaLink || "",
        faqItems: typeof faqItems === "string" ? faqItems : JSON.stringify(faqItems || []),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Save service error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
