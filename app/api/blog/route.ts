import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogData } from "@/data/blog";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const dbPosts = await db.blogPost.findMany({
      where: { isDraft: false },
      include: { category: true },
      orderBy: { publishedAt: "desc" },
    });

    if (dbPosts.length === 0) {
      // Return static blog fallback if database has no published posts yet
      const staticList = blogData.map((post) => ({
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
      }));
      return NextResponse.json(staticList);
    }

    return NextResponse.json(dbPosts);
  } catch {
    return NextResponse.json(blogData);
  }
}
