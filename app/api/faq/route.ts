import { NextResponse } from "next/server";
import { getFaqs } from "@/lib/faq";

export async function GET() {
  try {
    const faqs = await getFaqs();
    return NextResponse.json(faqs);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
