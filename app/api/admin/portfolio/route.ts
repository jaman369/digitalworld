import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCloudData, saveCloudData, CloudPortfolioProject } from "@/lib/cloudSync";
import { portfolioData } from "@/data/portfolio";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Get Cloud Portfolio
    const cloudData = await getCloudData();
    const cloudPortfolio = cloudData.portfolio || {};

    // 2. Get DB Projects
    let dbProjects: Array<Record<string, unknown>> = [];
    try {
      dbProjects = await db.portfolioProject.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch {
      // DB offline
    }

    const projectsMap: Record<string, Record<string, unknown>> = {};

    // Seed from static portfolioData
    for (const item of portfolioData) {
      projectsMap[item.id] = {
        id: item.id,
        title: item.client + " Case Study",
        slug: item.id,
        clientName: item.client,
        industry: item.industry,
        servicesUsed: JSON.stringify(item.tags || []),
        resultsLabel: item.resultStat,
        gallery: JSON.stringify([item.image]),
        caseStudy: item.description,
        createdAt: new Date().toISOString(),
      };
    }

    // Overlay DB Projects
    for (const item of dbProjects) {
      const id = (item.id as string) || (item.slug as string);
      projectsMap[id] = item;
    }

    // Overlay Cloud Projects
    for (const [key, item] of Object.entries(cloudPortfolio)) {
      projectsMap[key] = {
        id: item.id || key,
        title: item.title,
        slug: item.slug,
        clientName: item.clientName,
        industry: item.industry,
        servicesUsed: item.servicesUsed,
        resultsLabel: item.resultsLabel,
        gallery: item.gallery,
        caseStudy: item.caseStudy,
        seoTitle: item.seoTitle,
        seoDesc: item.seoDesc,
        createdAt: item.createdAt || new Date().toISOString(),
      };
    }

    return NextResponse.json(Object.values(projectsMap));
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

    const projectId = id || `portfolio-${Date.now()}`;
    const projectRecord: CloudPortfolioProject = {
      id: projectId,
      title,
      slug,
      clientName,
      industry,
      servicesUsed: typeof servicesUsed === "string" ? servicesUsed : JSON.stringify(servicesUsed || []),
      resultsLabel: resultsLabel || "",
      gallery: typeof gallery === "string" ? gallery : JSON.stringify(gallery || []),
      caseStudy: caseStudy || "",
      createdAt: new Date().toISOString(),
    };

    // 1. Save to Cloud Sync FIRST
    let cloudOk = false;
    try {
      const cloudData = await getCloudData();
      const existingPortfolio = cloudData.portfolio || {};
      existingPortfolio[projectId] = projectRecord;
      cloudOk = await saveCloudData({ portfolio: existingPortfolio });
    } catch (cloudErr) {
      console.error("Save portfolio to cloud error:", cloudErr);
    }

    // 2. Best-effort save to SQLite
    let dbProject = null;
    try {
      const projectData = {
        title,
        clientName,
        industry,
        servicesUsed: projectRecord.servicesUsed,
        resultsLabel: projectRecord.resultsLabel,
        gallery: projectRecord.gallery,
        caseStudy: projectRecord.caseStudy,
      };

      if (id) {
        dbProject = await db.portfolioProject.update({
          where: { id },
          data: projectData,
        });
      } else {
        dbProject = await db.portfolioProject.create({
          data: {
            ...projectData,
            slug,
          },
        });
      }
    } catch (dbErr) {
      console.error("Save portfolio to db error (non-fatal):", dbErr);
    }

    const result = dbProject || projectRecord;
    return NextResponse.json({ ...result, cloudSaved: cloudOk });
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

    // 1. Delete from Cloud
    try {
      const cloudData = await getCloudData();
      const existingPortfolio = cloudData.portfolio || {};
      if (existingPortfolio[id]) {
        delete existingPortfolio[id];
        await saveCloudData({ portfolio: existingPortfolio });
      }
    } catch (cloudErr) {
      console.error("Delete portfolio from cloud error:", cloudErr);
    }

    // 2. Delete from DB
    try {
      await db.portfolioProject.delete({ where: { id } });
    } catch (dbErr) {
      console.error("Delete portfolio from db error (non-fatal):", dbErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete portfolio error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
