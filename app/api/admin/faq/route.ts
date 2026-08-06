import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { getFaqs } from "@/lib/faq";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const faqs = await getFaqs();
    return NextResponse.json(faqs);
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
    const { faqs } = body;

    if (!Array.isArray(faqs)) {
      return NextResponse.json({ error: "Invalid FAQ list data" }, { status: 400 });
    }

    await db.systemSetting.upsert({
      where: { key: "globalFaqs" },
      update: { value: JSON.stringify(faqs) },
      create: { key: "globalFaqs", value: JSON.stringify(faqs) },
    });

    return NextResponse.json({ success: true, data: faqs });
  } catch (error) {
    console.error("Save FAQ error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
