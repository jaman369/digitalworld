import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getCloudData, saveCloudData, CloudHomepageData } from "@/lib/cloudSync";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cloudData = await getCloudData();
    const hp = cloudData.homepage || {};
    return NextResponse.json(hp);
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

    const body = (await request.json()) as CloudHomepageData;

    const cloudOk = await saveCloudData({ homepage: body });

    return NextResponse.json({ success: true, cloudSaved: cloudOk, data: body });
  } catch (error) {
    console.error("Save homepage CMS error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
