"use client";

import { useState } from "react";
import { blogData } from "@/data/blog";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const categories = [
    "All",
    "SEO",
    "Google Ads",
    "Web Dev",
    "Content Marketing",
    "Email Marketing",
    "Social Media",
    "E-commerce"
  ];

  const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    "SEO": Icons.Search,
    "Google Ads": Icons.Target,
    "Web Dev": Icons.Laptop,
    "Content Marketing": Icons.PenTool,
    "E-commerce": Icons.ShoppingCart,
    "Email Marketing": Icons.Mail,
    "Social Media": Icons.Smartphone,
    "Social Media Ads": Icons.Smartphone
  };

  // Filter posts
  const filteredPosts = selectedCategory === "All"
    ? blogData
    : blogData.filter(post => post.category.toLowerCase() === selectedCategory.toLowerCase() || (selectedCategory === "Google Ads" && post.category === "PPC") || (selectedCategory === "E-commerce" && post.category === "E-commerce"));

  // Featured Post is the first post (case study)
  const featuredPost = blogData[0];
  
  // Grid posts are the rest (excluding featured post when in "All" view)
  const gridPosts = selectedCategory === "All"
    ? filteredPosts.slice(1)
    : filteredPosts;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <article className="min-h-screen bg-transparent py-20 lg:py-28">
      {/* Background glow overlay */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,118,255,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-6">
        
        {/* Page Header */}
        <section className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100/50 px-4 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Digital Marketing Insights
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6">
            Expert tips to <br className="sm:hidden" />
            <span className="text-primary italic font-serif">grow your business</span>
          </h1>
          <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed max-w-2xl mx-auto mb-8">
            Actionable strategies, real-world case studies, and data-backed guides from 5 years of hands-on experience across SEO, web development, paid ads, and more.
          </p>
          
          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Icons.BookOpen className="h-4 w-4 text-neutral-300" />
              {blogData.length} Articles
            </span>
            <span className="h-1 w-1 rounded-full bg-neutral-300 hidden sm:inline" />
            <span className="flex items-center gap-1.5">
              <Icons.Globe className="h-4 w-4 text-neutral-300" />
              Read in 11 countries
            </span>
            <span className="h-1 w-1 rounded-full bg-neutral-300 hidden sm:inline" />
            <span className="flex items-center gap-1.5">
              <Icons.Calendar className="h-4 w-4 text-neutral-300" />
              Updated weekly
            </span>
          </div>
        </section>

        {/* Category Pills Navigation */}
        <section className="flex flex-wrap gap-2 justify-center mb-16 max-w-4xl mx-auto">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-full border transition-all ${
                  isActive
                    ? "bg-neutral-900 border-neutral-900 text-white shadow-sm"
                    : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </section>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Articles */}
          <div className="lg:col-span-8">
            
            {/* Featured Post (Only when "All" category is selected) */}
            {selectedCategory === "All" && featuredPost && (
              <div className="group bg-white border border-neutral-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-300 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-12">
                  {/* Image with Decorative Icon */}
                  <div className="md:col-span-6 relative w-full aspect-[4/3] md:aspect-auto min-h-[300px]">
                    <div className="absolute inset-0 bg-neutral-950 flex items-center justify-center">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        className="object-cover opacity-40 transition-transform duration-500 group-hover:scale-102"
                        priority
                      />
                      <div className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-inner">
                        <Icons.Search className="h-6 w-6 text-cyan-400" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="md:col-span-6 p-8 flex flex-col justify-center">
                    <span className="inline-block text-[10px] font-bold text-primary uppercase tracking-widest mb-4">
                      {featuredPost.category}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 mb-4 leading-tight group-hover:text-primary transition-colors">
                      <Link href={`/blog/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-neutral-400 mb-6">
                      <span>{featuredPost.publishedAt}</span>
                      <span>•</span>
                      <span>{featuredPost.readingTime}</span>
                    </div>
                    <Link 
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover group/btn"
                    >
                      Read Case Study <Icons.ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Articles Grid */}
            {gridPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {gridPosts.map((post) => {
                  const CategoryIcon = categoryIcons[post.category] || Icons.BookOpen;
                  
                  return (
                    <div
                      key={post.id}
                      className="group flex flex-col rounded-3xl border border-neutral-200/60 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-premium hover:border-primary/20"
                    >
                      {/* Image frame with centered icons */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden">
                        <div className="absolute inset-0 bg-neutral-950 flex items-center justify-center">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-w-768px) 100vw, 33vw"
                            className="object-cover opacity-45 transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
                            <CategoryIcon className="h-5 w-5 text-primary-light" />
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 sm:p-8 flex flex-col flex-1">
                        <span className="inline-block text-[10px] font-bold text-primary uppercase tracking-widest mb-3">
                          {post.category}
                        </span>
                        
                        <h3 className="font-sans font-bold text-base sm:text-lg text-neutral-900 mb-3 group-hover:text-primary transition-colors leading-snug">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>

                        <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed mb-6 flex-1">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between border-t border-neutral-100 pt-5 mt-auto text-xs text-neutral-400">
                          <span>{post.publishedAt} · {post.readingTime}</span>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-neutral-400 group-hover:text-primary transition-colors"
                          >
                            <Icons.ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-200/60">
                <Icons.FileText className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                <h4 className="font-sans font-bold text-base text-neutral-800">No articles found</h4>
                <p className="font-sans text-xs text-neutral-400 mt-1">We haven&apos;t published any articles in this topic yet. Check back soon!</p>
              </div>
            )}

            {/* Load More Button */}
            {gridPosts.length > 0 && (
              <div className="text-center mt-12">
                <button className="inline-flex items-center gap-2 rounded-full border border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50 px-6 py-3 font-sans text-xs font-bold text-neutral-700 shadow-sm transition-all">
                  Load More Articles <Icons.ChevronDown className="h-4 w-4 text-neutral-500" />
                </button>
              </div>
            )}

          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Sidebar Widget 1: About the Author */}
            <div className="bg-white border border-neutral-100 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.02)] p-6 lg:p-8">
              <h4 className="font-serif text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">
                ABOUT THE AUTHOR
              </h4>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-indigo-500 text-white font-serif text-lg font-bold shadow-sm">
                  K
                </div>
                <div>
                  <h5 className="font-sans font-bold text-sm text-neutral-900">Kamrujjaman Mufti</h5>
                  <span className="block text-[10px] font-bold text-primary uppercase tracking-wider">Founder - Digital World</span>
                </div>
              </div>
              <p className="font-sans text-xs text-neutral-500 leading-relaxed mb-6">
                Full-service digital marketing expert with 5 years of hands-on experience helping businesses of all sizes grow through SEO, web development, paid ads, and content marketing.
              </p>
              {/* Social icons */}
              <div className="flex gap-2">
                {[
                  { icon: Icons.Linkedin, href: "https://linkedin.com/in/kamrujjaman-mufti" },
                  { icon: Icons.Facebook, href: "https://facebook.com/digitalworldweb" },
                  { icon: Icons.Mail, href: "mailto:kj.jaman369@gmail.com" }
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 hover:border-neutral-300 text-neutral-400 hover:text-neutral-600 transition-colors"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Sidebar Widget 2: Weekly Newsletter */}
            <div className="bg-white border border-neutral-100 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.02)] p-6 lg:p-8">
              <h4 className="font-serif text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">
                WEEKLY NEWSLETTER
              </h4>
              <p className="font-sans text-xs text-neutral-500 leading-relaxed mb-6">
                Get one actionable digital marketing tip every week. No fluff, no spam — just insights that move the needle.
              </p>

              {subscribed ? (
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-center">
                  <Icons.Check className="h-5 w-5 text-emerald-500 mx-auto mb-2" />
                  <p className="font-sans text-xs font-semibold text-emerald-800">Subscribed successfully!</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-xs text-neutral-900 outline-none focus:border-primary focus:bg-white transition-all font-sans"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-neutral-900 hover:bg-neutral-800 py-3 text-xs font-bold text-white transition-all shadow-sm"
                  >
                    Subscribe – It&apos;s Free
                  </button>
                  <span className="block text-[10px] text-center text-neutral-400">
                    Join 820+ marketers. Unsubscribe anytime.
                  </span>
                </form>
              )}
            </div>

            {/* Sidebar Widget 3: Browse Topics */}
            <div className="bg-white border border-neutral-100 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.02)] p-6 lg:p-8">
              <h4 className="font-serif text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">
                BROWSE TOPICS
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "SEO", icon: Icons.Search },
                  { name: "Google Ads", icon: Icons.Target },
                  { name: "Web Dev", icon: Icons.Laptop },
                  { name: "Content", icon: Icons.PenTool },
                  { name: "Email", icon: Icons.Mail },
                  { name: "Social Ads", icon: Icons.Smartphone }
                ].map((topic) => (
                  <button
                    key={topic.name}
                    onClick={() => {
                      const mapping: Record<string, string> = {
                        "SEO": "SEO",
                        "Google Ads": "Google Ads",
                        "Web Dev": "Web Dev",
                        "Content": "Content Marketing",
                        "Email": "Email Marketing",
                        "Social Ads": "Social Media"
                      };
                      setSelectedCategory(mapping[topic.name] || "All");
                    }}
                    className="inline-flex items-center gap-1.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-100 text-neutral-600 text-[10px] font-semibold px-3 py-1.5 rounded-full transition-colors"
                  >
                    <topic.icon className="h-3.5 w-3.5 text-neutral-400" />
                    {topic.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar Widget 4: Recent Posts */}
            <div className="bg-white border border-neutral-100 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.02)] p-6 lg:p-8">
              <h4 className="font-serif text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">
                RECENT POSTS
              </h4>
              <div className="flex flex-col gap-4">
                {blogData.slice(0, 4).map((post) => {
                  const CategoryIcon = categoryIcons[post.category] || Icons.BookOpen;
                  
                  return (
                    <Link 
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="flex gap-3.5 group/recent items-start p-2 rounded-xl hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-white relative overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover opacity-40"
                        />
                        <CategoryIcon className="h-4 w-4 relative z-10 text-primary-light" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h5 className="font-sans font-bold text-xs text-neutral-800 leading-snug group-hover/recent:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h5>
                        <span className="block text-[10px] text-neutral-400 mt-1">
                          {post.publishedAt}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Widget 5: Ready to Grow CTA */}
            <div className="bg-[#0F172A] rounded-[2rem] p-8 text-white shadow-lg text-center relative overflow-hidden">
              <h4 className="font-serif text-xl sm:text-2xl font-bold mb-3 leading-snug">
                Ready to grow?
              </h4>
              
              <p className="font-sans text-xs text-slate-400 leading-relaxed mb-6">
                Book a free 30-minute strategy call. No obligation — just transparent advice on how to dominate your market.
              </p>
              
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-6 py-3 font-sans text-xs font-bold text-white shadow-sm transition-all"
              >
                Book Free Call <Icons.ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </article>
  );
}
