import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { defaultAboutData } from "@/data/aboutDefaultData";
import { CloudAboutData } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let aboutRecord: Record<string, unknown> | null = null;
    let extraSectionsRecord: Record<string, unknown> | null = null;

    // 1. Fetch AboutContent from Supabase
    try {
      const { data: supaRecord } = await supabaseAdmin
        .from("AboutContent")
        .select("*")
        .eq("id", "default")
        .maybeSingle();
      if (supaRecord) aboutRecord = supaRecord as Record<string, unknown>;
    } catch (supaErr) {
      console.warn("Supabase query error in admin about GET:", supaErr);
    }

    // 2. Fetch SystemSetting for full sections
    try {
      const { data: settingRow } = await supabaseAdmin
        .from("SystemSetting")
        .select("value")
        .eq("key", "about_sections")
        .maybeSingle();
      if (settingRow?.value) {
        try {
          extraSectionsRecord = JSON.parse(settingRow.value);
        } catch {}
      }
    } catch (settingErr) {
      console.warn("Supabase SystemSetting query error in admin about GET:", settingErr);
    }

    // 3. Fallback to Prisma
    if (!aboutRecord) {
      try {
        aboutRecord = (await db.aboutContent.findUnique({
          where: { id: "default" },
        })) as Record<string, unknown> | null;
      } catch (dbErr) {
        console.warn("DB query error in admin about GET:", dbErr);
      }
    }

    if (!extraSectionsRecord) {
      try {
        const row = await db.systemSetting.findUnique({
          where: { key: "about_sections" },
        });
        if (row?.value) {
          extraSectionsRecord = JSON.parse(row.value);
        }
      } catch {}
    }

    let parsedTimeline = defaultAboutData.timeline;
    let parsedMetrics = defaultAboutData.metrics;

    if (aboutRecord?.timeline) {
      try {
        parsedTimeline =
          typeof aboutRecord.timeline === "string"
            ? JSON.parse(aboutRecord.timeline)
            : (aboutRecord.timeline as typeof defaultAboutData.timeline);
      } catch {}
    }

    if (aboutRecord?.metrics) {
      try {
        parsedMetrics =
          typeof aboutRecord.metrics === "string"
            ? JSON.parse(aboutRecord.metrics)
            : (aboutRecord.metrics as typeof defaultAboutData.metrics);
      } catch {}
    }

    const name = (aboutRecord?.name as string) || (extraSectionsRecord?.hero as Record<string, unknown>)?.name as string || defaultAboutData.name;
    const title = (aboutRecord?.title as string) || (extraSectionsRecord?.hero as Record<string, unknown>)?.title as string || defaultAboutData.title;
    const bioParagraph1 = (aboutRecord?.bioParagraph1 as string) || (extraSectionsRecord?.hero as Record<string, unknown>)?.bioParagraph1 as string || defaultAboutData.bioParagraph1;
    const bioParagraph2 = (aboutRecord?.bioParagraph2 as string) || (extraSectionsRecord?.hero as Record<string, unknown>)?.bioParagraph2 as string || defaultAboutData.bioParagraph2;
    const imagePath = (aboutRecord?.imagePath as string) || (extraSectionsRecord?.hero as Record<string, unknown>)?.imagePath as string || defaultAboutData.imagePath;

    const mergedData: CloudAboutData = {
      name,
      title,
      bioParagraph1,
      bioParagraph2,
      imagePath,
      timeline: parsedTimeline,
      metrics: parsedMetrics,

      hero: {
        ...defaultAboutData.hero,
        ...(extraSectionsRecord?.hero as object),
        name,
        title,
        bioParagraph1,
        bioParagraph2,
        imagePath,
      },
      metricsList: (extraSectionsRecord?.metricsList as typeof defaultAboutData.metricsList) || parsedMetrics || defaultAboutData.metricsList,
      journey: {
        ...defaultAboutData.journey,
        ...(extraSectionsRecord?.journey as object),
        timeline: parsedTimeline || defaultAboutData.journey?.timeline,
      },
      whyUs: {
        ...defaultAboutData.whyUs,
        ...(extraSectionsRecord?.whyUs as object),
      },
      expertise: {
        ...defaultAboutData.expertise,
        ...(extraSectionsRecord?.expertise as object),
      },
      process: {
        ...defaultAboutData.process,
        ...(extraSectionsRecord?.process as object),
      },
      values: {
        ...defaultAboutData.values,
        ...(extraSectionsRecord?.values as object),
      },
      tools: {
        ...defaultAboutData.tools,
        ...(extraSectionsRecord?.tools as object),
      },
      cta: {
        ...defaultAboutData.cta,
        ...(extraSectionsRecord?.cta as object),
      },
    };

    return NextResponse.json(mergedData, {
      headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
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

    const body: CloudAboutData = await request.json();

    const name = body.name || body.hero?.name || null;
    const title = body.title || body.hero?.title || null;
    const bioParagraph1 = body.bioParagraph1 || body.hero?.bioParagraph1 || null;
    const bioParagraph2 = body.bioParagraph2 || body.hero?.bioParagraph2 || null;
    const imagePath = body.imagePath || body.hero?.imagePath || null;
    const timelineData = body.timeline || body.journey?.timeline || [];
    const metricsData = body.metrics || body.metricsList || [];

    const dataToSave = {
      name,
      title,
      bioParagraph1,
      bioParagraph2,
      imagePath,
      timeline: typeof timelineData === "string" ? timelineData : JSON.stringify(timelineData),
      metrics: typeof metricsData === "string" ? metricsData : JSON.stringify(metricsData),
    };

    // 1. Save core columns to AboutContent in Supabase
    try {
      await supabaseAdmin.from("AboutContent").upsert({
        id: "default",
        ...dataToSave,
        updatedAt: new Date().toISOString(),
      });
    } catch (supaErr) {
      console.warn("Supabase AboutContent upsert warning:", supaErr);
    }

    // 2. Save full payload to SystemSetting key "about_sections" in Supabase
    const fullPayloadJson = JSON.stringify({
      hero: {
        ...body.hero,
        name,
        title,
        bioParagraph1,
        bioParagraph2,
        imagePath,
      },
      metricsList: metricsData,
      journey: {
        ...body.journey,
        timeline: timelineData,
      },
      whyUs: body.whyUs,
      expertise: body.expertise,
      process: body.process,
      values: body.values,
      tools: body.tools,
      cta: body.cta,
    });

    try {
      await supabaseAdmin.from("SystemSetting").upsert({
        key: "about_sections",
        value: fullPayloadJson,
      });
    } catch (supaSettingErr) {
      console.warn("Supabase SystemSetting upsert warning:", supaSettingErr);
    }

    // 3. Opportunistically sync with Prisma if configured
    try {
      await db.aboutContent.upsert({
        where: { id: "default" },
        update: dataToSave,
        create: {
          id: "default",
          ...dataToSave,
        },
      });

      await db.systemSetting.upsert({
        where: { key: "about_sections" },
        update: { value: fullPayloadJson },
        create: { key: "about_sections", value: fullPayloadJson },
      });
    } catch {}

    try {
      revalidatePath("/about");
      revalidatePath("/admin/about");
    } catch {}

    return NextResponse.json({ success: true, message: "About page saved successfully!" });
  } catch (error) {
    console.error("Save about CMS error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
