import { Metadata } from "next";
import { blogData } from "@/data/blog";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Marketing Insights - Digital World",
  description: "Read technical audits and growth articles covering Local SEO, PPC ads optimization, and Next.js speed configurations.",
};

export default function BlogPage() {
  return (
    <article className="min-h-screen bg-white py-20 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,118,255,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-6">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
            Insights
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6">
            The Digital World blog
          </h1>
          <p className="font-sans text-base sm:text-lg text-neutral-500 leading-relaxed">
            Technical guides, case breakdowns, and checklists to help you scale organic search ranking visibility and optimize paid channels.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((post) => (
            <div
              key={post.id}
              className="group flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-premium hover:border-primary/20"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-100 border-b border-neutral-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {post.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 lg:p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3 text-xs text-neutral-400 font-medium">
                  <span>{post.publishedAt}</span>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>

                <h3 className="font-sans font-bold text-lg text-neutral-900 mb-3 group-hover:text-primary transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="font-sans text-sm text-neutral-500 leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>

                <div className="border-t border-neutral-100 pt-5 mt-auto">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-sans text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1.5 group/btn"
                  >
                    Read Guide <Icons.ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
