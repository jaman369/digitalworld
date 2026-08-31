import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { put } from "@vercel/blob";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const ext = originalName.substring(originalName.lastIndexOf(".")) || ".png";
    const baseName = originalName.substring(0, originalName.lastIndexOf(".")) || "image";
    const filename = `uploads/${baseName}-${Date.now()}${ext}`;

    // 1. Try Vercel Blob if token is set
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(filename, file, { access: "public" });
        return NextResponse.json({
          success: true,
          url: blob.url,
          filename: blob.pathname,
        });
      } catch (blobErr) {
        console.warn("Vercel Blob upload failed, falling back to local/base64:", blobErr);
      }
    }

    // 2. Try Local Filesystem (Local Dev)
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      const localFileName = `${baseName}-${Date.now()}${ext}`;
      const filePath = path.join(uploadDir, localFileName);
      await writeFile(filePath, buffer);
      return NextResponse.json({
        success: true,
        url: `/uploads/${localFileName}`,
        filename: localFileName,
      });
    } catch (fsErr) {
      console.warn("Local filesystem write failed (serverless environment), converting to Data URL:", fsErr);
    }

    // 3. Robust Serverless Fallback: Return Base64 Data URL
    const mimeType = file.type || "image/png";
    const base64Data = buffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64Data}`;

    return NextResponse.json({
      success: true,
      url: dataUrl,
      filename: file.name,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to process image upload" }, { status: 500 });
  }
}
