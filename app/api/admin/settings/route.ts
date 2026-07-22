import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCloudData, saveCloudData } from "@/lib/cloudSync";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cloudData = await getCloudData();
    if (cloudData.settings) {
      const s = cloudData.settings;
      return NextResponse.json([
        { key: "email", value: s.email || "" },
        { key: "phone", value: s.phone || "" },
        { key: "facebookUrl", value: s.facebookUrl || "" },
        { key: "linkedinUrl", value: s.linkedinUrl || "" },
        { key: "socialLinks", value: JSON.stringify(s.socialLinks || []) },
      ]);
    }

    const settings = await db.systemSetting.findMany().catch(() => []);
    return NextResponse.json(settings);
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
    const { email, phone, facebookUrl, linkedinUrl, socialLinks } = body;

    const parsedSocialLinks = Array.isArray(socialLinks)
      ? socialLinks
      : typeof socialLinks === "string"
      ? JSON.parse(socialLinks || "[]")
      : [];

    const settingsPayload = {
      email,
      phone,
      facebookUrl,
      linkedinUrl,
      socialLinks: parsedSocialLinks,
    };

    // 1. Save to Cloud Sync FIRST
    let cloudOk = false;
    try {
      cloudOk = await saveCloudData({ settings: settingsPayload });
    } catch (err) {
      console.error("Save settings to cloud error:", err);
    }

    // 2. Best-effort save to SQLite
    try {
      const data = [
        { key: "email", value: email },
        { key: "phone", value: phone },
        { key: "facebookUrl", value: facebookUrl },
        { key: "linkedinUrl", value: linkedinUrl },
        { key: "socialLinks", value: JSON.stringify(parsedSocialLinks) },
      ];

      for (const item of data) {
        await db.systemSetting.upsert({
          where: { key: item.key },
          update: { value: item.value },
          create: { key: item.key, value: item.value },
        });
      }
    } catch (dbErr) {
      console.error("Save settings to db error (non-fatal):", dbErr);
    }

    return NextResponse.json({ success: true, cloudSaved: cloudOk });
  } catch (error) {
    console.error("Save settings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
