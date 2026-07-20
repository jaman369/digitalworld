import { NextResponse } from "next/server";
import { getScriptSettings } from "@/lib/codeSnippets";

export async function GET() {
  try {
    const settings = await getScriptSettings();
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
