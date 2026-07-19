import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await db.portfolioProject.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
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
    const {
      id,
      title,
      slug,
      clientName,
      industry,
      servicesUsed,
      resultsLabel,
      gallery,
      caseStudy,
    } = body;

    if (!title || !slug || !clientName || !industry) {
      return NextResponse.json({ error: "Title, Slug, Client and Industry are required" }, { status: 400 });
    }

    const projectData = {
      title,
      clientName,
      industry,
      servicesUsed: typeof servicesUsed === "string" ? servicesUsed : JSON.stringify(servicesUsed || []),
      resultsLabel: resultsLabel || "",
      gallery: typeof gallery === "string" ? gallery : JSON.stringify(gallery || []),
      caseStudy: caseStudy || "",
    };

    let project;
    if (id) {
      project = await db.portfolioProject.update({
        where: { id },
        data: projectData,
      });
    } else {
      project = await db.portfolioProject.create({
        data: {
          ...projectData,
          slug,
        },
      });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Save portfolio error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await db.portfolioProject.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete portfolio error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
