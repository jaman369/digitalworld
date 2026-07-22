import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCloudData } from "@/lib/cloudSync";
import { blogData } from "@/data/blog";

export async function GET() {
  try {
    const cloudData = await getCloudData();
    const cloudBlog = cloudData.blog || {};

    let dbPosts: Array<Record<string, unknown>> = [];
    try {
      dbPosts = await db.blogPost.findMany({
        where: { isDraft: false },
        include: { category: true },
        orderBy: { publishedAt: "desc" },
      });
    } catch {
      // DB optional
    }

    const postsMap: Record<string, Record<string, unknown>> = {};

    // Seed from static blogData
    for (const post of blogData) {
      postsMap[post.slug] = {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        featuredImage: post.image,
        imageAltText: post.title,
        category: { name: post.category },
        publishedAt: post.publishedAt,
        isDraft: false,
      };
    }

    // Overlay DB posts
    for (const post of dbPosts) {
      const slug = post.slug as string;
      postsMap[slug] = {
        ...post,
        category: post.category || { name: "SEO" },
      };
    }

    // Overlay Cloud posts
    for (const [key, post] of Object.entries(cloudBlog)) {
      if (post.isDraft) continue; // Skip drafts on public route
      const slug = post.slug || key;
      postsMap[slug] = {
        id: post.id || key,
        slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        featuredImage: post.featuredImage,
        imageAltText: post.imageAltText || post.title,
        category: { name: post.categoryName },
        publishedAt: post.publishedAt || new Date().toISOString(),
        isDraft: false,
      };
    }

    return NextResponse.json(Object.values(postsMap));
  } catch {
    return NextResponse.json(blogData);
  }
}
