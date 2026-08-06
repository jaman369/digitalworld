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

    const record = await db.aboutContent.findUnique({
      where: { id: "default" },
    });

    if (!record) {
      return NextResponse.json({});
    }

    let parsedTimeline = [];
    let parsedMetrics = [];

    try { if (record.timeline) parsedTimeline = JSON.parse(record.timeline); } catch {}
    try { if (record.metrics) parsedMetrics = JSON.parse(record.metrics); } catch {}

    return NextResponse.json({
      ...record,
      timeline: parsedTimeline,
      metrics: parsedMetrics,
    });
  } catch (error) {
    console.error("GET admin about content error:", error);
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
