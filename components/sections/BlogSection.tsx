"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Share2 } from "lucide-react";
import { blogData } from "@/data/blog";
import { BlogPost } from "@/types";
import ReadMoreLink from "@/components/common/ReadMoreLink";

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/blog");
        if (res.ok) {
          const data = await res.json();
          setPosts(data.slice(0, 3));
        } else {
          setPosts(blogData.slice(0, 3));
        }
      } catch {
        setPosts(blogData.slice(0, 3));
      }
    }
    fetchPosts();
  }, []);

  const featuredPosts = posts.length > 0 ? posts : blogData.slice(0, 3);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-14 lg:py-20 bg-gradient-to-b from-[#f8f9fc] via-white to-[#f8f9fc] relative z-10 overflow-hidden">
      {/* Subtle Dot Matrix Background Texture */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e5ec_0.8px,transparent_0.8px)] [background-size:20px_20px] opacity-40" />
      </div>

      {/* Floating Geometric Playful Accents (Matching Reference Image) */}
      <div className="absolute top-10 right-1/3 text-cyan-400 pointer-events-none opacity-80 select-none hidden sm:block">
        <svg className="w-8 h-8 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polygon points="12 2 22 20 2 20" />
        </svg>
      </div>
      <div className="absolute top-14 right-1/4 w-2.5 h-2.5 rounded-full bg-rose-400 pointer-events-none select-none hidden sm:block" />
      <div className="absolute top-12 right-12 text-emerald-400 font-bold text-xl pointer-events-none select-none hidden sm:block">+</div>
      <div className="absolute top-1/3 left-16 text-emerald-400 font-bold text-xl pointer-events-none select-none hidden sm:block">+</div>
      <div className="absolute top-1/2 left-8 text-indigo-900 font-black text-2xl rotate-12 pointer-events-none select-none hidden sm:block">×</div>
      <div className="absolute top-1/2 right-8 text-amber-400 pointer-events-none select-none hidden sm:block">
        <svg className="w-9 h-9 -rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polygon points="12 2 22 20 2 20" />
        </svg>
      </div>
      <div className="absolute bottom-12 right-1/4 w-5 h-5 rounded-full border-2 border-pink-400 pointer-events-none select-none hidden sm:block" />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-[0.25em] mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
            BLOG
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-neutral-900 tracking-tight mb-3 leading-[1.2]">
            Latest News
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed max-w-xl mx-auto">
            Discover actionable insights, strategy playbooks, and search optimization trends to scale your business.
          </p>
        </div>

        {/* 3 Full-Image Overlay Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8"
        >
          {featuredPosts.map((post) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const p = post as Record<string, any>;
            const imgSrc = p.featuredImage || p.image || "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop";
            const categoryName = typeof p.category === "object" ? p.category?.name : (p.category || "SEO");
            const dateStr = typeof p.publishedAt === "string" 
              ? p.publishedAt 
              : p.publishedAt 
              ? new Date(p.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) 
              : "Recently Published";

            return (
              <motion.div
                key={p.id || p.slug}
                variants={cardVariants}
                className="group relative rounded-2xl overflow-hidden min-h-[360px] sm:min-h-[380px] flex flex-col justify-between p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)]"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={imgSrc}
                    alt={p.title || "Blog Post"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-neutral-950/20" />
                  <div className="absolute inset-0 bg-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Top Meta: Date & Category */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-white/85 font-sans text-xs sm:text-[13px] font-medium tracking-wide drop-shadow-sm">
                    {dateStr}
                  </span>
                  <span className="rounded-full bg-white/20 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-white border border-white/20">
                    {categoryName}
                  </span>
                </div>

                {/* Bottom Block: Headline + Read More + Share */}
                <div className="relative z-10 mt-auto pt-16">
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-white tracking-tight leading-snug mb-5 drop-shadow-md group-hover:text-indigo-100 transition-colors duration-300 line-clamp-2">
                    <Link href={`/blog/${p.slug}`}>
                      {p.title}
                    </Link>
                  </h3>

                  <div className="flex items-center justify-between border-t border-white/20 pt-4">
                    <ReadMoreLink
                      href={`/blog/${p.slug}`}
                      className="text-white hover:text-indigo-200"
                    />

                    <button
                      type="button"
                      aria-label="Share article"
                      onClick={(e) => {
                        e.preventDefault();
                        if (navigator.share) {
                          navigator.share({
                            title: p.title,
                            url: `/blog/${p.slug}`,
                          }).catch(() => {});
                        }
                      }}
                      className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/20 transition-all"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
