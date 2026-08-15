import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const record = await db.homepageContent.findUnique({
      where: { id: "default" },
    });

    if (!record) {
      return NextResponse.json({});
    }

    let parsedStats = [];
    let parsedWhyUsCards = [];
    let parsedProcessSteps = [];

    try { if (record.stats) parsedStats = JSON.parse(record.stats); } catch {}
    try { if (record.whyUsCards) parsedWhyUsCards = JSON.parse(record.whyUsCards); } catch {}
    try { if (record.processSteps) parsedProcessSteps = JSON.parse(record.processSteps); } catch {}

    return NextResponse.json({
      ...record,
      stats: parsedStats,
      whyUsCards: parsedWhyUsCards,
      processSteps: parsedProcessSteps,
    });
  } catch (error) {
    console.error("GET admin homepage content error:", error);
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

    const dataToSave = {
      heroTagline: body.heroTagline || null,
      heroTitle: body.heroTitle || null,
      heroSubtitle: body.heroSubtitle || null,
      heroPrimaryCtaText: body.heroPrimaryCtaText || null,
      heroPrimaryCtaLink: body.heroPrimaryCtaLink || null,
      heroSecondaryCtaText: body.heroSecondaryCtaText || null,
      heroSecondaryCtaLink: body.heroSecondaryCtaLink || null,

      statsEyebrow: body.statsEyebrow || null,
      stats: typeof body.stats === "string" ? body.stats : JSON.stringify(body.stats || []),

      servicesEyebrow: body.servicesEyebrow || null,
      servicesTitle: body.servicesTitle || null,
      servicesSubtitle: body.servicesSubtitle || null,

      whyUsEyebrow: body.whyUsEyebrow || null,
      whyUsTitle: body.whyUsTitle || null,
      whyUsSubtitle: body.whyUsSubtitle || null,
      whyUsCards: typeof body.whyUsCards === "string" ? body.whyUsCards : JSON.stringify(body.whyUsCards || []),

      processEyebrow: body.processEyebrow || null,
      processTitle: body.processTitle || null,
      processSubtitle: body.processSubtitle || null,
      processSteps: typeof body.processSteps === "string" ? body.processSteps : JSON.stringify(body.processSteps || []),

      testimonialsEyebrow: body.testimonialsEyebrow || null,
      testimonialsTitle: body.testimonialsTitle || null,
      testimonialsSubtitle: body.testimonialsSubtitle || null,

      ctaEyebrow: body.ctaEyebrow || null,
      ctaTitle: body.ctaTitle || null,
      ctaSubtitle: body.ctaSubtitle || null,
      ctaButtonText: body.ctaButtonText || null,
      ctaButtonLink: body.ctaButtonLink || null,

      painPointsEyebrow: body.painPointsEyebrow || null,
      painPointsTitle: body.painPointsTitle || null,
      painPointsSubtitle: body.painPointsSubtitle || null,

      ecosystemEyebrow: body.ecosystemEyebrow || null,
      ecosystemTitle: body.ecosystemTitle || null,
      ecosystemSubtitle: body.ecosystemSubtitle || null,

      metricsEyebrow: body.metricsEyebrow || null,
      metricsTitle: body.metricsTitle || null,

      industriesEyebrow: body.industriesEyebrow || null,
      industriesTitle: body.industriesTitle || null,
      industriesSubtitle: body.industriesSubtitle || null,

      toolsEyebrow: body.toolsEyebrow || null,
      toolsTitle: body.toolsTitle || null,
      toolsSubtitle: body.toolsSubtitle || null,

      seoTitle: body.seoTitle || null,
      seoDescription: body.seoDescription || null,
      canonicalUrl: body.canonicalUrl || null,
      ogImage: body.ogImage || null,
    };

    const record = await db.homepageContent.upsert({
      where: { id: "default" },
      update: dataToSave,
      create: {
        id: "default",
        ...dataToSave,
      },
    });

    try {
      revalidatePath("/");
    } catch {}

    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("Save homepage CMS error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
