"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    id: "faq-1",
    question: "What does a digital marketing agency do?",
    answer: "A digital marketing agency plans and runs the online activities that bring you customers. That includes SEO, paid ads (PPC), web design, content marketing, email and automation. At Digital World, we manage these under one strategy so each channel supports the others.",
  },
  {
    id: "faq-2",
    question: "How long does SEO take to show results?",
    answer: "SEO is a long-term channel. Many websites see early ranking and traffic gains within 3 to 4 months, with stronger growth after 6 months. The timeline depends on your competition, website health and content.",
  },
  {
    id: "faq-3",
    question: "How much do SEO and PPC services cost?",
    answer: "Cost depends on your goals, market and the scope of work. After a free audit, we send a clear proposal with no hidden fees. Ad spend is paid directly to the ad platform, separate from our management fee.",
  },
  {
    id: "faq-4",
    question: "What are Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO)?",
    answer: "GEO and AEO optimize your content so AI tools like ChatGPT, Perplexity and Google AI Overviews mention and cite your brand in their answers. We include both in our AI SEO services.",
  },
  {
    id: "faq-5",
    question: "Do you offer custom or package deals?",
    answer: "Yes. You can choose a single service such as SEO or PPC, or a combined package. Every plan is customized to your business goals and budget.",
  },
  {
    id: "faq-6",
    question: "What is your typical onboarding process?",
    answer: "We start with a free discovery call and audit, then build a strategy and roadmap, launch the work and optimize every month. Most clients are fully onboarded within 7 to 10 days.",
  },
  {
    id: "faq-7",
    question: "Which industries and countries do you work with?",
    answer: "We work with e-commerce, SaaS, real estate, healthcare, legal, finance, travel and B2B businesses in the USA, UK, Canada, UAE, Australia and 6 other countries.",
  },
  {
    id: "faq-8",
    question: "What AI automation services do you offer?",
    answer: "We build AI chatbots, AI agents, CRM automation, email automation and lead generation workflows using tools like n8n, Make and Zapier, so your team spends less time on repetitive work.",
  },
  {
    id: "faq-9",
    question: "Where are you based and how do we communicate?",
    answer: "We are based in Dhaka, Bangladesh and work with clients worldwide. We communicate by email, WhatsApp, Zoom or Google Meet, and reply within 24 hours.",
  },
];

export default function FAQSection() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    "faq-1": true,
    "faq-2": true,
  });

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Structured Data Schema for FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqList.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <section className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden border-b border-neutral-100">
      {/* FAQ Schema Markup for Google & AI Search Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: FAQ Accordion & Semantic Answers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-6 self-start">
              Frequently Asked Questions
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-neutral-900 tracking-tight leading-[1.2] mb-8">
              Frequently Asked Questions About Our Digital Marketing Services
            </h2>

            {/* Accordion List - Always accessible in DOM HTML for crawlers */}
            <div className="flex flex-col border-t border-neutral-200/80 mb-8 divide-y divide-neutral-200/80">
              {faqList.map((item) => {
                const isOpen = !!openIds[item.id];

                return (
                  <div key={item.id} className="py-4 sm:py-5">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between text-left transition-colors group cursor-pointer"
                    >
                      <span
                        className={`font-sans text-base sm:text-lg font-bold transition-colors duration-200 pr-4 ${
                          isOpen ? "text-primary" : "text-neutral-900 group-hover:text-primary"
                        }`}
                      >
                        {item.question}
                      </span>
                      <span className="shrink-0 p-1 rounded-full bg-neutral-100 text-neutral-600 group-hover:bg-blue-50 group-hover:text-primary transition-colors">
                        {isOpen ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </span>
                    </button>

                    {/* Semantic Answer visible and crawlable */}
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          key="open-content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed pt-3 pr-4 font-normal">
                            {item.answer}
                          </p>
                        </motion.div>
                      ) : (
                        /* Noscript / Microdata representation for headless engines and static evaluation */
                        <div className="hidden" aria-hidden="true">
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Discover More CTA */}
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-neutral-300 text-neutral-800 font-sans text-xs font-bold uppercase tracking-wider hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 shadow-2xs"
              >
                Ask a Different Question →
              </Link>
            </div>
          </motion.div>

          {/* Right Column: FAQ Graphic Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex flex-col justify-center items-center lg:sticky lg:top-28"
          >
            <div className="w-full bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-200 mb-3">
                  Have More Questions?
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4 leading-snug">
                  Get Clear Answers From a Senior Strategist
                </h3>
                <p className="font-sans text-sm text-blue-100 leading-relaxed mb-8">
                  Book a free 30-minute discovery call or text us on WhatsApp. We reply within 24 hours.
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-neutral-900 px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-wider shadow-md hover:bg-neutral-100 transition-all"
                  >
                    Book a Free Strategy Call
                  </Link>
                  <a
                    href="https://wa.me/8801798667820"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white hover:bg-white/10 px-6 py-3 font-sans text-xs font-semibold transition-all"
                  >
                    WhatsApp: +8801798667820
                  </a>
                </div>
              </div>

              {/* Decorative Background Blob Overlay */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
