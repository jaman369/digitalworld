import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { blogData } from "@/data/blog";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let dbPosts = await db.blogPost.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    if (dbPosts.length === 0) {
      // Auto-seed blog categories and posts
      try {
        for (const post of blogData) {
          const categorySlug = post.category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const cat = await db.blogCategory.upsert({
            where: { slug: categorySlug },
            update: { name: post.category },
            create: { name: post.category, slug: categorySlug },
          });

          const authorId = session.userId || "admin-default-id";
          const authorEmail = session.email || "kj.jaman369@gmail.com";

          await db.user.upsert({
            where: { id: authorId },
            update: { email: authorEmail },
            create: {
              id: authorId,
              email: authorEmail,
              name: "Kamrujjaman Mufti",
              passwordHash: "$2a$10$e8w.R3.V7.1234567890123456789012345678901234567890",
              role: session.role || "ADMIN",
            },
          });

          await db.blogPost.upsert({
            where: { slug: post.slug },
            update: {},
            create: {
              title: post.title,
              slug: post.slug,
              excerpt: post.excerpt,
              content: post.content,
              featuredImage: post.image,
              imageAltText: post.title,
              categoryId: cat.id,
              authorId: authorId,
              isDraft: false,
              publishedAt: new Date(post.publishedAt),
            },
          });
        }

        dbPosts = await db.blogPost.findMany({
          include: { category: true },
          orderBy: { createdAt: "desc" },
        });
      } catch (seedErr) {
        console.error("Auto-seed blog error:", seedErr);
      }
    }

    const formatted = dbPosts.map((post) => ({
      ...post,
      categoryName: post.category?.name || "SEO",
    }));

    return NextResponse.json(formatted);
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
      excerpt,
      content,
      featuredImage,
      imageAltText,
      categoryName,
      isDraft,
      // SEO
      seoTitle,
      seoDescription,
      canonicalUrl,
      robotsSettings,
      // AEO
      aeoTargetQuestion,
      aeoDirectAnswer,
      aeoFaqItems,
      aeoPaaQuestions,
      // GEO
      geoStatistics,
      geoCitations,
      geoExpertQuotes,
      // LLMO
      llmoEntityName,
      llmoTopicCluster,
      llmoRelatedEntities,
      llmoContentDepth,
      // VEO
      veoImages,
      veoVideoUrl,
      veoVideoTitle,
      veoInfographicUrl,
      // CEO
      ceoConversationalSummary,
      ceoPrimaryKeyTakeaway,
      ceoActionableSteps,
      // BEO
      beoAuthorCredentials,
      beoCompanyMention,
      beoBrandKeywords,
      beoTrustSignals,
      // MSEO
      mseoContentFormat,
      mseoTableData,
      mseoKeyDefinitions,
    } = body;

    if (!title || !slug || !content || !categoryName) {
      return NextResponse.json({ error: "Title, Slug, Content and Category are required" }, { status: 400 });
    }

    const categorySlug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const category = await db.blogCategory.upsert({
      where: { slug: categorySlug },
      update: { name: categoryName },
      create: { name: categoryName, slug: categorySlug },
    });

    // Ensure author user exists in DB before creating/updating post
    const authorId = session.userId || "admin-default-id";
    const authorEmail = session.email || "kj.jaman369@gmail.com";

    await db.user.upsert({
      where: { id: authorId },
      update: { email: authorEmail },
      create: {
        id: authorId,
        email: authorEmail,
        name: "Kamrujjaman Mufti",
        passwordHash: "$2a$10$e8w.R3.V7.1234567890123456789012345678901234567890",
        role: session.role || "ADMIN",
      },
    });

    const postData = {
      title,
      excerpt: excerpt || "",
      content,
      featuredImage: featuredImage || "https://picsum.photos/800/500?random=204",
      imageAltText: imageAltText || title,
      categoryId: category.id,
      authorId: authorId,
      isDraft: isDraft !== undefined ? isDraft : true,
      publishedAt: isDraft ? null : new Date(),
      // SEO
      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
      canonicalUrl: canonicalUrl || null,
      robotsSettings: robotsSettings || "index, follow",
      // AEO
      aeoTargetQuestion: aeoTargetQuestion || null,
      aeoDirectAnswer: aeoDirectAnswer || null,
      aeoFaqItems: aeoFaqItems || null,
      aeoPaaQuestions: aeoPaaQuestions || null,
      // GEO
      geoStatistics: geoStatistics || null,
      geoCitations: geoCitations || null,
      geoExpertQuotes: geoExpertQuotes || null,
      // LLMO
      llmoEntityName: llmoEntityName || null,
      llmoTopicCluster: llmoTopicCluster || null,
      llmoRelatedEntities: llmoRelatedEntities || null,
      llmoContentDepth: llmoContentDepth || null,
      // VEO
      veoImages: veoImages || null,
      veoVideoUrl: veoVideoUrl || null,
      veoVideoTitle: veoVideoTitle || null,
      veoInfographicUrl: veoInfographicUrl || null,
      // CEO
      ceoConversationalSummary: ceoConversationalSummary || null,
      ceoPrimaryKeyTakeaway: ceoPrimaryKeyTakeaway || null,
      ceoActionableSteps: ceoActionableSteps || null,
      // BEO
      beoAuthorCredentials: beoAuthorCredentials || null,
      beoCompanyMention: beoCompanyMention || null,
      beoBrandKeywords: beoBrandKeywords || null,
      beoTrustSignals: beoTrustSignals || null,
      // MSEO
      mseoContentFormat: mseoContentFormat || null,
      mseoTableData: mseoTableData || null,
      mseoKeyDefinitions: mseoKeyDefinitions || null,
    };

    let dbPost;
    if (id) {
      dbPost = await db.blogPost.update({
        where: { id },
        data: postData,
        include: { category: true },
      });
    } else {
      dbPost = await db.blogPost.create({
        data: {
          ...postData,
          slug,
        },
        include: { category: true },
      });
    }

    return NextResponse.json(dbPost);
  } catch (error) {
    console.error("Save blog error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    // Check for common Prisma/DB errors
    if (message.includes("Unique constraint")) {
      return NextResponse.json({ error: `A blog post with this slug already exists. Please use a different slug.` }, { status: 409 });
    }
    if (message.includes("Can't reach database") || message.includes("connect")) {
      return NextResponse.json({ error: "Database connection failed. Please check DATABASE_URL environment variable on Vercel." }, { status: 503 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
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

    await db.blogPost.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete blog error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
