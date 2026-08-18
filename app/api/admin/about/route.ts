import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const defaultAboutData = {
  name: "Kamrujjaman Mufti",
  title: "Digital Marketing Expert & Web Developer",
  bioParagraph1: "Full-service digital marketing expert with 5 years of hands-on experience helping businesses of all sizes grow through SEO, web development, paid ads, and content marketing.",
  bioParagraph2: "Every project I take on is treated as a partnership, where your success is my success.",
  imagePath: "/images/23.png",
  timeline: [
    { years: "2019 - Present", role: "Digital Marketing Expert & Founder", company: "Digital World Agency" },
    { years: "2021 - Present", role: "Senior SEO & PPC Strategist", company: "Global Client Portfolio" },
    { years: "2020 - 2022", role: "Full-Stack Web Developer", company: "Enterprise Clients" },
  ],
  metrics: [
    { numericValue: 150, suffix: "+", label: "Projects Completed" },
    { numericValue: 120, suffix: "+", label: "Happy Clients" },
    { numericValue: 5, suffix: "+", label: "Years Experience" },
    { numericValue: 11, suffix: "+", label: "Countries Served" },
  ],
};

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let record: unknown = null;
    try {
      record = await db.aboutContent.findUnique({
        where: { id: "default" },
      });
    } catch (dbErr) {
      console.error("DB query error in admin about GET:", dbErr);
    }

    if (!record) {
      return NextResponse.json(defaultAboutData);
    }

    const rec = record as Record<string, string | null | undefined>;

    let parsedTimeline = defaultAboutData.timeline;
    let parsedMetrics = defaultAboutData.metrics;

    try { if (rec.timeline) parsedTimeline = JSON.parse(rec.timeline); } catch {}
    try { if (rec.metrics) parsedMetrics = JSON.parse(rec.metrics); } catch {}

    return NextResponse.json({
      name: rec.name || defaultAboutData.name,
      title: rec.title || defaultAboutData.title,
      bioParagraph1: rec.bioParagraph1 || defaultAboutData.bioParagraph1,
      bioParagraph2: rec.bioParagraph2 || defaultAboutData.bioParagraph2,
      imagePath: rec.imagePath || defaultAboutData.imagePath,
      timeline: parsedTimeline,
      metrics: parsedMetrics,
    });
  } catch (error) {
    console.error("GET admin about content error:", error);
    return NextResponse.json(defaultAboutData);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const dataToSave = {
      name: body.name || null,
      title: body.title || null,
      bioParagraph1: body.bioParagraph1 || null,
      bioParagraph2: body.bioParagraph2 || null,
      imagePath: body.imagePath || null,
      timeline: typeof body.timeline === "string" ? body.timeline : JSON.stringify(body.timeline || []),
      metrics: typeof body.metrics === "string" ? body.metrics : JSON.stringify(body.metrics || []),
    };

    const record = await db.aboutContent.upsert({
      where: { id: "default" },
      update: dataToSave,
      create: {
        id: "default",
        ...dataToSave,
      },
    });

    try {
      revalidatePath("/about");
    } catch {}

    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("Save about CMS error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
