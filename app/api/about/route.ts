import { NextResponse } from "next/server";
import { getCloudData, CloudAboutData } from "@/lib/cloudSync";

const defaultAboutData: CloudAboutData = {
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
    const cloudData = await getCloudData();
    const ab = cloudData.about || {};
    return NextResponse.json({
      ...defaultAboutData,
      ...ab,
    });
  } catch {
    return NextResponse.json(defaultAboutData);
  }
}
