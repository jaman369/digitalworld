import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import { blogData } from "@/data/blog";
import { db } from "@/lib/db";
import Script from "next/script";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface StatItem {
  stat: string;
  source: string;
  url: string;
}

interface CitationItem {
  source: string;
  url: string;
  claim: string;
}

interface DefinitionItem {
  term: string;
  definition: string;
}

function safeParse<T>(jsonStr: string | null | undefined, fallback: T): T {
  if (!jsonStr) return fallback;
  try {
    return JSON.parse(jsonStr);
  } catch {
    return fallback;
  }
}

async function getPostBySlug(slug: string) {
  // 1. Check DB
  try {
    const post = await db.blogPost.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (post) {
      const wordsCount = post.content ? post.content.replace(/<[^>]*>/g, "").split(/\s+/).length : 200;
      const readingTimeVal = Math.max(1, Math.round(wordsCount / 200)) + " min read";
      const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
        : "Recent";

      return {
        id: post.id,
        title: post.title,
        category: post.category?.name || "SEO",
        publishedAt: formattedDate,
        readingTime: readingTimeVal,
        image: post.featuredImage || "https://picsum.photos/800/500?random=204",
        imageAlt: post.imageAltText || post.title,
        content: post.content,
        author: { name: "Kamrujjaman Mufti" },
        excerpt: post.excerpt,

        // Optimization data
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        canonicalUrl: post.canonicalUrl,
        robotsSettings: post.robotsSettings,

        aeoTargetQuestion: post.aeoTargetQuestion,
        aeoDirectAnswer: post.aeoDirectAnswer,
        aeoFaqItems: safeParse<FaqItem[]>(post.aeoFaqItems, []),
        aeoPaaQuestions: safeParse<string[]>(post.aeoPaaQuestions, []),

        geoStatistics: safeParse<StatItem[]>(post.geoStatistics, []),
        geoCitations: safeParse<CitationItem[]>(post.geoCitations, []),

        llmoEntityName: post.llmoEntityName,
        llmoTopicCluster: post.llmoTopicCluster,

        veoVideoUrl: post.veoVideoUrl,
        veoVideoTitle: post.veoVideoTitle,
        veoInfographicUrl: post.veoInfographicUrl,

        ceoConversationalSummary: post.ceoConversationalSummary,
        ceoPrimaryKeyTakeaway: post.ceoPrimaryKeyTakeaway,
        ceoActionableSteps: safeParse<string[]>(post.ceoActionableSteps, []),

        beoAuthorCredentials: post.beoAuthorCredentials,
        beoCompanyMention: post.beoCompanyMention,

        mseoKeyDefinitions: safeParse<DefinitionItem[]>(post.mseoKeyDefinitions, []),
      };
    }
  } catch {}

  // 2. Check Static blogData
  const staticPost = blogData.find((p) => p.slug === slug);
  if (staticPost) {
    return {
      id: staticPost.id,
      title: staticPost.title,
      category: staticPost.category,
      publishedAt: staticPost.publishedAt,
      readingTime: staticPost.readingTime,
      image: staticPost.image,
      imageAlt: staticPost.title,
      content: staticPost.content,
      author: staticPost.author,
      excerpt: staticPost.excerpt,

      seoTitle: null,
      seoDescription: null,
      canonicalUrl: null,
      robotsSettings: "index, follow",

      aeoTargetQuestion: null,
      aeoDirectAnswer: null,
      aeoFaqItems: [],
      aeoPaaQuestions: [],

      geoStatistics: [],
      geoCitations: [],

      llmoEntityName: null,
      llmoTopicCluster: null,

      veoVideoUrl: null,
      veoVideoTitle: null,
      veoInfographicUrl: null,

      ceoConversationalSummary: null,
      ceoPrimaryKeyTakeaway: null,
      ceoActionableSteps: [],

      beoAuthorCredentials: null,
      beoCompanyMention: null,

      mseoKeyDefinitions: [],
    };
  }

  return null;
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seoTitle || `${post.title} - Digital World`,
    description: post.seoDescription || post.excerpt,
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
    robots: post.robotsSettings || "index, follow",
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const renderPost = await getPostBySlug(slug);

  if (!renderPost) {
    notFound();
  }

  // Build JSON-LD Schemas
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: renderPost.seoTitle || renderPost.title,
    description: renderPost.seoDescription || renderPost.excerpt,
    image: [renderPost.image],
    datePublished: renderPost.publishedAt,
    author: [
      {
        "@type": "Person",
        name: renderPost.author.name,
        jobTitle: "Founder & Digital Marketing Expert",
        worksFor: {
          "@type": "Organization",
          name: "Digital World",
        },
        description: renderPost.beoAuthorCredentials || undefined,
      },
    ],
  };

  const faqSchema = renderPost.aeoFaqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: renderPost.aeoFaqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  const howToSchema = renderPost.ceoActionableSteps.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: renderPost.title,
    description: renderPost.ceoConversationalSummary || renderPost.excerpt,
    step: renderPost.ceoActionableSteps.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: `Step ${idx + 1}`,
      text: step,
    })),
  } : null;

  const isHtml = /<[a-z][\s\S]*>/i.test(renderPost.content);

  return (
    <article className="min-h-screen bg-transparent py-20 lg:py-32">
      {/* Inject JSON-LD Schemas for Search Engines & AI LLMs */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {howToSchema && (
        <Script
          id="howto-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}

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
            <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
              {renderPost.category}
            </span>
            <span className="text-xs text-neutral-400 font-sans">
              {renderPost.publishedAt} · {renderPost.readingTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-[1.15] mb-6">
            {renderPost.title}
          </h1>

          {/* Author info & E-E-A-T credentials */}
          <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
            <div className="relative h-11 w-11 overflow-hidden rounded-full border border-neutral-200 shrink-0">
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
              <div className="font-sans text-[11px] text-neutral-500">
                Digital Marketing Expert & Founder at Digital World
              </div>
              {renderPost.beoAuthorCredentials && (
                <div className="text-[10px] text-primary font-semibold mt-0.5">
                  {renderPost.beoAuthorCredentials}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AEO Direct Answer Box (Featured Snippet) */}
        {renderPost.aeoDirectAnswer && (
          <div className="mb-10 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/80 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
              <Icons.Zap className="h-4 w-4 text-amber-500" />
              Quick Answer: {renderPost.aeoTargetQuestion || renderPost.title}
            </div>
            <p className="font-sans text-sm sm:text-base text-neutral-800 leading-relaxed font-medium">
              {renderPost.aeoDirectAnswer}
            </p>
          </div>
        )}

        {/* Featured Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-neutral-200/80 mb-12 shadow-sm">
          <Image
            src={renderPost.image}
            alt={renderPost.imageAlt}
            fill
            className="object-cover"
          />
        </div>

        {/* CEO Key Takeaway Banner */}
        {renderPost.ceoPrimaryKeyTakeaway && (
          <div className="mb-10 rounded-xl bg-neutral-900 text-white p-5 sm:p-6 shadow-md flex items-start gap-3">
            <Icons.CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">Key Takeaway</span>
              <p className="text-sm font-medium leading-relaxed">{renderPost.ceoPrimaryKeyTakeaway}</p>
            </div>
          </div>
        )}

        {/* Post Content Body */}
        <div className="prose prose-neutral max-w-none font-sans leading-relaxed text-neutral-700">
          <p className="text-lg font-medium text-neutral-600 mb-8 italic border-l-4 border-primary pl-4 py-1">
            {renderPost.excerpt}
          </p>

          {isHtml ? (
            <div
              className="text-base leading-relaxed space-y-4
                [&_h2]:text-2xl [&_h2]:font-serif [&_h2]:font-bold [&_h2]:text-neutral-900 [&_h2]:mt-10 [&_h2]:mb-4
                [&_h3]:text-xl [&_h3]:font-serif [&_h3]:font-bold [&_h3]:text-neutral-800 [&_h3]:mt-8 [&_h3]:mb-3
                [&_p]:mb-4 [&_p]:leading-relaxed
                [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
                [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-neutral-600 [&_blockquote]:my-6
                [&_a]:text-primary [&_a]:underline font-sans"
              dangerouslySetInnerHTML={{ __html: renderPost.content }}
            />
          ) : (
            <div className="whitespace-pre-line text-base leading-relaxed">
              {renderPost.content}
            </div>
          )}
        </div>

        {/* VEO Embedded Video */}
        {renderPost.veoVideoUrl && (
          <div className="mt-12">
            <h3 className="font-serif text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <Icons.Video className="h-5 w-5 text-primary" />
              {renderPost.veoVideoTitle || "Video Overview"}
            </h3>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950 shadow-sm">
              <iframe
                src={renderPost.veoVideoUrl}
                title={renderPost.veoVideoTitle || renderPost.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* GEO Cited Statistics Box */}
        {renderPost.geoStatistics.length > 0 && (
          <div className="mt-12 rounded-2xl bg-neutral-50 border border-neutral-200 p-6">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
              <Icons.BarChart2 className="h-4 w-4 text-emerald-600" />
              Key Statistics & Data Points
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderPost.geoStatistics.map((stat, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-neutral-200/80 shadow-xs">
                  <div className="font-bold text-base text-neutral-900 mb-1">{stat.stat}</div>
                  <div className="text-xs text-neutral-500">
                    Source:{" "}
                    {stat.url ? (
                      <a href={stat.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {stat.source}
                      </a>
                    ) : (
                      stat.source
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CEO Actionable Steps */}
        {renderPost.ceoActionableSteps.length > 0 && (
          <div className="mt-12 rounded-2xl border border-blue-100 bg-blue-50/40 p-6 sm:p-8">
            <h3 className="font-serif text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
              <Icons.ListChecks className="h-5 w-5 text-primary" />
              Actionable Implementation Steps
            </h3>
            <ol className="space-y-4">
              {renderPost.ceoActionableSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-medium text-neutral-800 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* MSEO Key Definitions / Glossary */}
        {renderPost.mseoKeyDefinitions.length > 0 && (
          <div className="mt-12 rounded-2xl bg-white border border-neutral-200 p-6">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
              <Icons.BookOpen className="h-4 w-4 text-indigo-600" />
              Key Terms & Definitions
            </h3>
            <dl className="space-y-3">
              {renderPost.mseoKeyDefinitions.map((def, idx) => (
                <div key={idx} className="border-b border-neutral-100 pb-3 last:border-0 last:pb-0">
                  <dt className="text-sm font-bold text-neutral-900">{def.term}</dt>
                  <dd className="text-xs text-neutral-600 mt-1">{def.definition}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* AEO FAQ Section */}
        {renderPost.aeoFaqItems.length > 0 && (
          <div className="mt-16 border-t border-neutral-200 pt-12">
            <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
              <Icons.HelpCircle className="h-6 w-6 text-primary" />
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {renderPost.aeoFaqItems.map((faq, idx) => (
                <div key={idx} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs">
                  <h4 className="font-sans font-bold text-base text-neutral-900 mb-2">{faq.question}</h4>
                  <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
