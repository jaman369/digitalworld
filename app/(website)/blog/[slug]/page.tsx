import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import { blogData } from "@/data/blog";
import { db } from "@/lib/db";
import { getCloudData } from "@/lib/cloudSync";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

async function getPostBySlug(slug: string) {
  // 1. Check Cloud Sync
  try {
    const cloudData = await getCloudData();
    const cloudBlog = cloudData.blog || {};
    for (const [key, p] of Object.entries(cloudBlog)) {
      if ((p.slug === slug || key === slug) && !p.isDraft) {
        return {
          title: p.title,
          category: p.categoryName || "SEO",
          publishedAt: p.publishedAt
            ? new Date(p.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
            : "Recent",
          readingTime: Math.max(1, Math.round((p.content || "").split(/\s+/).length / 200)) + " min read",
          image: p.featuredImage || "https://picsum.photos/800/500?random=204",
          content: p.content,
          author: { name: "Kamrujjaman Mufti" },
          excerpt: p.excerpt,
        };
      }
    }
  } catch {}

  // 2. Check DB
  try {
    const post = await db.blogPost.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (post) {
      const wordsCount = post.content ? post.content.split(/\s+/).length : 200;
      const readingTimeVal = Math.max(1, Math.round(wordsCount / 200)) + " min read";
      const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
        : "Recent";

      return {
        title: post.title,
        category: post.category?.name || "SEO",
        publishedAt: formattedDate,
        readingTime: readingTimeVal,
        image: post.featuredImage || "https://picsum.photos/800/500?random=204",
        content: post.content,
        author: { name: "Kamrujjaman Mufti" },
        excerpt: post.excerpt,
      };
    }
  } catch {}

  // 3. Check Static blogData
  const staticPost = blogData.find((p) => p.slug === slug);
  if (staticPost) {
    return {
      title: staticPost.title,
      category: staticPost.category,
      publishedAt: staticPost.publishedAt,
      readingTime: staticPost.readingTime,
      image: staticPost.image,
      content: staticPost.content,
      author: staticPost.author,
      excerpt: staticPost.excerpt,
    };
  }

  return null;
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} - Digital World`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const renderPost = await getPostBySlug(slug);

  if (!renderPost) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-transparent">
      {/* Article Header Banner */}
      <section className="relative overflow-hidden bg-neutral-900 py-20 lg:py-24 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,rgba(0,118,255,0.12)_0%,transparent_60%)]" />

        <div className="container mx-auto max-w-4xl px-6 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-white uppercase tracking-wider mb-8 transition-colors"
          >
            <Icons.ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
          </Link>

          <span className="inline-block bg-primary/20 text-primary border border-primary/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6">
            {renderPost.category}
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6">
            {renderPost.title}
          </h1>

          <div className="flex items-center gap-3.5 text-neutral-400 text-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 font-bold text-xs border border-neutral-700">
              {renderPost.author.name[0]}
            </div>
            <div>
              <p className="font-bold text-neutral-200">{renderPost.author.name}</p>
              <p className="text-xs text-neutral-500 mt-0.5">
                {renderPost.publishedAt} · {renderPost.readingTime}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body Content */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto max-w-3xl px-6">
          {/* Post Image Showcase */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-md border border-neutral-200/50 mb-12">
            <Image
              src={renderPost.image}
              alt={renderPost.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* HTML Render */}
          <div 
            className="prose prose-neutral max-w-none font-sans text-neutral-600 leading-relaxed space-y-6 
                       prose-headings:font-sans prose-headings:font-bold prose-headings:text-neutral-900
                       prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
                       prose-p:text-sm prose-p:sm:text-base"
            dangerouslySetInnerHTML={{ __html: renderPost.content }}
          />

          {/* Article Footer Share/Action */}
          <div className="border-t border-neutral-100 pt-10 mt-16 text-center">
            <h4 className="font-sans font-bold text-sm text-neutral-950 mb-4">
              Interested in launching a campaign?
            </h4>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-6 py-3 font-sans text-xs font-bold text-white shadow-sm transition-all"
            >
              Start a Project <Icons.ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
