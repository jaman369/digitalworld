import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const defaultAboutData = {
  name: "Kamrujjaman Mufti",
  title: "Digital Marketing Expert & Web Developer",
  bioParagraph1: "Full-service digital marketing expert with 5 years of hands-on experience helping businesses of all sizes grow through SEO, web development, paid ads, and content marketing.",
  bioParagraph2: "Every project I take on is treated as a partnership, where your success is my success.",
  imagePath: "/Kamrujjaman Mufti Image/kamrujjaman-mufti.jpg",
  timeline: [
    { years: "2024 - Present", role: "Digital Marketing Expert", company: "KJ Digital World" },
    { years: "2022 - 2024", role: "SEO & Paid Ads Specialist", company: "Freelance / Agency Partner" },
    { years: "2021 - 2022", role: "Web Developer", company: "Building fast, optimized websites" },
    { years: "2020 - 2021", role: "The Beginning", company: "Mastering the fundamentals of digital marketing" }
  ],
  metrics: [
    { numericValue: 150, suffix: "+", label: "Projects Delivered" },
    { numericValue: 120, suffix: "+", label: "Happy Clients" },
    { numericValue: 5, suffix: "", label: "Years Experience" },
    { numericValue: 11, suffix: "", label: "Countries Served" }
  ]
};

export async function GET() {
  try {
    const record = await db.aboutContent.findUnique({
      where: { id: "default" },
    });

    if (!record) {
      return NextResponse.json(defaultAboutData);
    }

    let parsedTimeline = defaultAboutData.timeline;
    let parsedMetrics = defaultAboutData.metrics;

    try { if (record.timeline) parsedTimeline = JSON.parse(record.timeline); } catch {}
    try { if (record.metrics) parsedMetrics = JSON.parse(record.metrics); } catch {}

    return NextResponse.json({
      name: record.name || defaultAboutData.name,
      title: record.title || defaultAboutData.title,
      bioParagraph1: record.bioParagraph1 || defaultAboutData.bioParagraph1,
      bioParagraph2: record.bioParagraph2 || defaultAboutData.bioParagraph2,
      imagePath: record.imagePath || defaultAboutData.imagePath,
      timeline: parsedTimeline,
      metrics: parsedMetrics,
    });
  } catch {
    return NextResponse.json(defaultAboutData);
  }
}
