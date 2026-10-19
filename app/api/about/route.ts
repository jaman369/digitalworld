import { NextResponse } from "next/server";
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

export async function GET() {
  try {
    let record: Record<string, unknown> | null = null;

    try {
      record = (await db.aboutContent.findUnique({
        where: { id: "default" },
      })) as Record<string, unknown> | null;
    } catch (prismaErr) {
      console.warn("Prisma error in GET /api/about, attempting supabaseAdmin fallback:", prismaErr);
      const { data: supaRecord } = await supabaseAdmin
        .from("AboutContent")
        .select("*")
        .eq("id", "default")
        .maybeSingle();
      if (supaRecord) {
        record = supaRecord as Record<string, unknown>;
      }
    }

    if (!record) {
      // Also check supabase directly if Prisma returned null
      const { data: supaRecord } = await supabaseAdmin
        .from("AboutContent")
        .select("*")
        .eq("id", "default")
        .maybeSingle();
      if (supaRecord) {
        record = supaRecord as Record<string, unknown>;
      }
    }

    if (!record) {
      return NextResponse.json(defaultAboutData);
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
  } catch (err) {
    console.error("GET /api/about error:", err);
    return NextResponse.json(defaultAboutData);
  }
}

