import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCloudData, saveCloudData, CloudBlogPost } from "@/lib/cloudSync";
import { blogData } from "@/data/blog";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Get cloud posts
    const cloudData = await getCloudData();
    const cloudBlog = cloudData.blog || {};

    // 2. Get DB posts
    let dbPosts: Array<Record<string, unknown>> = [];
    try {
      dbPosts = await db.blogPost.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
      });
    } catch {
      // DB offline / broken table
    }

    // Merge: Cloud > DB > Static data
    const allPostsMap: Record<string, Record<string, unknown>> = {};

    // Seed with static data
    for (const post of blogData) {
      allPostsMap[post.id] = {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        featuredImage: post.image,
        imageAltText: post.title,
        category: { name: post.category },
        categoryName: post.category,
        isDraft: false,
        publishedAt: post.publishedAt,
        createdAt: new Date().toISOString(),
      };
    }

    // Overlay DB posts
    for (const post of dbPosts) {
      const id = (post.id as string) || (post.slug as string);
      allPostsMap[id] = {
        ...post,
        categoryName: (post.category as { name?: string })?.name || "SEO",
      };
    }

    // Overlay Cloud posts (highest priority)
    for (const [key, post] of Object.entries(cloudBlog)) {
      allPostsMap[key] = {
        id: post.id || key,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        featuredImage: post.featuredImage,
        imageAltText: post.imageAltText || post.title,
        category: { name: post.categoryName },
        categoryName: post.categoryName,
        isDraft: post.isDraft,
        publishedAt: post.publishedAt,
        createdAt: post.createdAt || new Date().toISOString(),
        updatedAt: post.updatedAt,
      };
    }

    return NextResponse.json(Object.values(allPostsMap));
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
    } = body;

    if (!title || !slug || !content || !categoryName) {
      return NextResponse.json({ error: "Title, Slug, Content and Category are required" }, { status: 400 });
    }

    const postId = id || `post-${Date.now()}`;
    const blogPostRecord: CloudBlogPost = {
      id: postId,
      title,
      slug,
      excerpt: excerpt || "",
      content,
      featuredImage: featuredImage || "https://picsum.photos/800/500?random=204",
      imageAltText: imageAltText || title,
      categoryName,
      isDraft: isDraft !== undefined ? isDraft : false,
      publishedAt: isDraft ? null : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 1. Save to Cloud Sync FIRST
    let cloudOk = false;
    try {
      const cloudData = await getCloudData();
      const existingBlog = cloudData.blog || {};
      existingBlog[postId] = blogPostRecord;
      cloudOk = await saveCloudData({ blog: existingBlog });
    } catch (cloudErr) {
      console.error("Save blog to cloud error:", cloudErr);
    }

    // 2. Best-effort save to SQLite
    let dbPost = null;
    try {
      const categorySlug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const category = await db.blogCategory.upsert({
        where: { slug: categorySlug },
        update: { name: categoryName },
        create: { name: categoryName, slug: categorySlug },
      });

      const postData = {
        title,
        excerpt: excerpt || "",
        content,
        featuredImage: featuredImage || "https://picsum.photos/800/500?random=204",
        imageAltText: imageAltText || title,
        categoryId: category.id,
        authorId: session.userId,
        isDraft: isDraft !== undefined ? isDraft : true,
        publishedAt: isDraft ? null : new Date(),
      };

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
    } catch (dbErr) {
      console.error("Save blog to db error (non-fatal):", dbErr);
    }

    const result = dbPost || { ...blogPostRecord, category: { name: categoryName } };
    return NextResponse.json({ ...result, cloudSaved: cloudOk });
  } catch (error) {
    console.error("Save blog error:", error);
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
      const existingBlog = cloudData.blog || {};
      if (existingBlog[id]) {
        delete existingBlog[id];
        await saveCloudData({ blog: existingBlog });
      }
    } catch (cloudErr) {
      console.error("Delete blog from cloud error:", cloudErr);
    }

    // 2. Delete from DB
    try {
      await db.blogPost.delete({ where: { id } });
    } catch (dbErr) {
      console.error("Delete blog from db error (non-fatal):", dbErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete blog error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
