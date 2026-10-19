import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { defaultAboutData } from "@/data/aboutDefaultData";
import { CloudAboutData } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    let aboutRecord: Record<string, unknown> | null = null;
    let extraSectionsRecord: Record<string, unknown> | null = null;

    // 1. Fetch AboutContent from Supabase
    try {
      const { data: supaRecord } = await supabaseAdmin
        .from("AboutContent")
        .select("*")
        .eq("id", "default")
        .maybeSingle();
      if (supaRecord) {
        aboutRecord = supaRecord as Record<string, unknown>;
      }
    } catch (supaErr) {
      console.warn("Supabase query in /api/about failed, trying Prisma:", supaErr);
    }

    // 2. Fetch extra sections from SystemSetting (key: about_sections) in Supabase
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
      console.warn("Supabase SystemSetting query failed:", settingErr);
    }

    // 3. Fallback to Prisma if needed
    if (!aboutRecord) {
      try {
        aboutRecord = (await db.aboutContent.findUnique({
          where: { id: "default" },
        })) as Record<string, unknown> | null;
      } catch {}
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

    // Parse legacy fields if available
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

    // Assemble response
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
  } catch (err) {
    console.error("GET /api/about error:", err);
    return NextResponse.json(defaultAboutData, {
      headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
    });
  }
}
