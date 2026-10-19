import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const defaultAboutData = {
  name: "Kamrujjaman Mufti",
  title: "Founder of Digital World",
  bioParagraph1:
    "I'm Kamrujjaman Mufti, founder of Digital World, a digital marketing agency based in Dhaka, Bangladesh. With 5+ years of experience, I help businesses grow through SEO, AEO, GEO, paid advertising, web development, content marketing, and AI-powered solutions.",
  bioParagraph2:
    "My approach is simple: understand the business, identify the right opportunities, and build digital strategies around meaningful growth.",
  imagePath: "/images/23.png",
  timeline: [
    {
      years: "2026 – Present",
      role: "AI Automation",
      company: "Exploring AI-powered workflows, intelligent agents, and business process automation."
    },
    {
      years: "2024 – 2026",
      role: "Digital Marketing Expert",
      company: "Bringing digital marketing expertise together through KJ Digital World."
    },
    {
      years: "2022 – 2024",
      role: "SEO & Paid Ads",
      company: "Expanding into search engine optimization and paid advertising."
    },
    {
      years: "2021 – 2022",
      role: "Web Development",
      company: "Developing an understanding of websites, user experience, and website performance."
    },
    {
      years: "2020 – 2021",
      role: "The Beginning",
      company: "Building a foundation in digital marketing and learning the fundamentals of online growth."
    }
  ],
  metrics: [
    { numericValue: 150, suffix: "+", label: "Projects Completed" },
    { numericValue: 120, suffix: "+", label: "Happy Clients" },
    { numericValue: 5, suffix: "+", label: "Years of Experience" },
    { numericValue: 11, suffix: "+", label: "Countries Served" }
  ]
};

export const revalidate = 0;

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let record: Record<string, unknown> | null = null;

    // 1. Prioritize Supabase live database
    try {
      const { data: supaRecord } = await supabaseAdmin
        .from("AboutContent")
        .select("*")
        .eq("id", "default")
        .maybeSingle();
      if (supaRecord) record = supaRecord as Record<string, unknown>;
    } catch (supaErr) {
      console.warn("Supabase query error in admin about GET:", supaErr);
    }

    // 2. Fallback to Prisma
    if (!record) {
      try {
        record = (await db.aboutContent.findUnique({
          where: { id: "default" },
        })) as Record<string, unknown> | null;
      } catch (dbErr) {
        console.warn("DB query error in admin about GET:", dbErr);
      }
    }

    if (!record) {
      return NextResponse.json(defaultAboutData, {
        headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
      });
    }

    let parsedTimeline = defaultAboutData.timeline;
    let parsedMetrics = defaultAboutData.metrics;

    try {
      if (record.timeline) {
        parsedTimeline = typeof record.timeline === "string" ? JSON.parse(record.timeline) : (record.timeline as typeof defaultAboutData.timeline);
      }
    } catch {}

    try {
      if (record.metrics) {
        parsedMetrics = typeof record.metrics === "string" ? JSON.parse(record.metrics) : (record.metrics as typeof defaultAboutData.metrics);
      }
    } catch {}

    return NextResponse.json({
      name: (record.name as string) || defaultAboutData.name,
      title: (record.title as string) || defaultAboutData.title,
      bioParagraph1: (record.bioParagraph1 as string) || defaultAboutData.bioParagraph1,
      bioParagraph2: (record.bioParagraph2 as string) || defaultAboutData.bioParagraph2,
      imagePath: (record.imagePath as string) || defaultAboutData.imagePath,
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

    let savedRecord = null;

    try {
      savedRecord = await db.aboutContent.upsert({
        where: { id: "default" },
        update: dataToSave,
        create: {
          id: "default",
          ...dataToSave,
        },
      });
    } catch (prismaErr) {
      console.warn("Prisma upsert failed in POST /api/admin/about, falling back to supabaseAdmin:", prismaErr);
      const { data: supaSaved, error: supaErr } = await supabaseAdmin
        .from("AboutContent")
        .upsert({
          id: "default",
          ...dataToSave,
          updatedAt: new Date().toISOString(),
        })
        .select()
        .maybeSingle();

      if (supaErr) {
        console.error("Supabase upsert error in POST /api/admin/about:", supaErr);
        return NextResponse.json({ error: "Failed to save about content" }, { status: 500 });
      }
      savedRecord = supaSaved;
    }

    // Always also sync to Supabase directly so both stay identical
    try {
      await supabaseAdmin.from("AboutContent").upsert({
        id: "default",
        ...dataToSave,
        updatedAt: new Date().toISOString(),
      });
    } catch {}

    try {
      revalidatePath("/about");
    } catch {}

    return NextResponse.json({ success: true, data: savedRecord });
  } catch (error) {
    console.error("Save about CMS error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

