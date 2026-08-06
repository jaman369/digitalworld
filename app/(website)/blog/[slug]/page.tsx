import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import { blogData } from "@/data/blog";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

async function getPostBySlug(slug: string) {
  // 1. Check DB
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

  // 2. Check Static blogData
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
    <article className="min-h-screen bg-transparent py-20 lg:py-32">
      <div className="container mx-auto max-w-4xl px-6">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-primary mb-8 transition-colors uppercase tracking-wider"
        >
          <Icons.ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        {/* Post Meta Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
              {renderPost.category}
            </span>
            <span className="text-xs text-neutral-400 font-sans">
              {renderPost.publishedAt} · {renderPost.readingTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-[1.15] mb-6">
            {renderPost.title}
          </h1>

          {/* Author info */}
          <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-neutral-200">
              <Image
                src="/Kamrujjaman Mufti Image/kamrujjaman-mufti.jpg"
                alt="Kamrujjaman Mufti"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-sans text-xs font-bold text-neutral-900">
                {renderPost.author.name}
              </div>
              <div className="font-sans text-[11px] text-neutral-400">
                Digital Marketing Expert & Web Developer
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-neutral-200/80 mb-12 shadow-sm">
          <Image
            src={renderPost.image}
            alt={renderPost.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Post Content Body */}
        <div className="prose prose-neutral max-w-none font-sans leading-relaxed text-neutral-700">
          <p className="text-lg font-medium text-neutral-600 mb-6 italic">
            {renderPost.excerpt}
          </p>
          <div className="whitespace-pre-line text-base leading-relaxed">
            {renderPost.content}
          </div>
        </div>
      </div>
    </article>
  );
}
