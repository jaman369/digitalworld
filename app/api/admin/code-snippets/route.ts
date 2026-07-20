import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { getScriptSettings, saveScriptSettings } from "@/lib/codeSnippets";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await getScriptSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("GET code snippets error:", error);
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
    const { gaMeasurementId, gtmContainerId, metaPixelId, googleSiteVerification, snippets } = body;

    const updatedSettings = {
      gaMeasurementId: gaMeasurementId || "",
      gtmContainerId: gtmContainerId || "",
      metaPixelId: metaPixelId || "",
      googleSiteVerification: googleSiteVerification || "",
      snippets: Array.isArray(snippets) ? snippets : [],
    };

    await saveScriptSettings(updatedSettings);

    try {
      revalidatePath("/", "layout");
    } catch (revalErr) {
      console.error("Revalidate layout error:", revalErr);
    }

    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (error) {
    console.error("Save code snippets error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
