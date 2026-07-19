import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await db.blogPost.findMany({
      include: {
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
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

    let post;
    if (id) {
      post = await db.blogPost.update({
        where: { id },
        data: postData,
      });
    } else {
      post = await db.blogPost.create({
        data: {
          ...postData,
          slug,
        },
      });
    }

    return NextResponse.json(post);
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

    await db.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete blog error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
