"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const defaultFaqItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "How long does it take to see organic rankings results?",
    answer: "SEO is a compounding growth engine. Most campaigns see ranking progression and organic leads increases within 90 days, with exponential trajectory building around months 4 to 6.",
    category: "SEO & Traffic"
  },
  {
    id: "faq-2",
    question: "What is your typical onboarding process?",
    answer: "We start with a 30-minute discovery call, followed by a detailed site audit and custom campaign blueprint. Once approved, we launch execution targets with weekly updates.",
    category: "Onboarding"
  },
  {
    id: "faq-3",
    question: "Do you offer custom package deals?",
    answer: "Yes. Every client receives a custom project proposal tailored directly to their industry, tech stack, and monthly growth target budgets.",
    category: "Pricing & Plans"
  },
  {
    id: "faq-4",
    question: "Where are you based and how do we communicate?",
    answer: "We are based in Dhaka, Bangladesh. We communicate via private Slack boards, weekly email summaries, and direct Zoom strategy alignments.",
    category: "Communication"
  }
];

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFaqItems);
  const [activeId, setActiveId] = useState<string>("faq-1");

  useEffect(() => {
    async function loadFaqs() {
      try {
        const res = await fetch("/api/faq");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setFaqs(data);
            setActiveId(data[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to load FAQs:", err);
      }
    }
    loadFaqs();
  }, []);

  const toggleAccordion = (id: string) => {
    setActiveId((prev) => (prev === id ? "" : id));
  };

  return (
    <section className="py-14 lg:py-20 bg-white relative z-10 overflow-hidden">
      {/* Background Decorative Matrix & Shapes */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Bottom Left Dot Matrix Grid */}
        <div className="absolute -bottom-6 -left-6 w-64 h-64 opacity-20">
          <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g fill="#475569">
              {Array.from({ length: 10 }).map((_, r) =>
                Array.from({ length: 10 }).map((_, c) => (
                  <circle key={`${r}-${c}`} cx={c * 20 + 10} cy={r * 20 + 10} r="2.5" />
                ))
              )}
            </g>
          </svg>
        </div>

        {/* Floating Teal Plus '+' icon */}
        <div className="absolute top-1/2 left-[12%] text-[#38BDF8] opacity-70 font-mono text-xl font-bold select-none">
          +
        </div>

        {/* Floating Navy 'X' icon */}
        <div className="absolute bottom-[22%] left-[8%] text-[#1E1B4B] opacity-80 font-bold text-xl select-none">
          ✕
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center max-w-xl"
          >
            {/* Eyebrow */}
            <span className="inline-block text-[11px] font-bold text-[#64748B] uppercase tracking-[0.25em] mb-2.5">
              FAQ
            </span>

            {/* Main Section Title */}
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A2B48] tracking-tight leading-[1.2] mb-6">
              Frequently Asked Questions
            </h2>

            {/* Accordion List */}
            <div className="flex flex-col border-t border-neutral-100 mb-8">
              {faqs.map((item) => {
                const isOpen = activeId === item.id;

                return (
                  <div key={item.id} className="border-b border-neutral-100/80">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.id)}
                      className="w-full py-4 sm:py-5 flex items-center justify-between text-left transition-colors group cursor-pointer"
                    >
                      <span
                        className={`font-sans text-sm sm:text-base font-bold transition-colors duration-200 ${
                          isOpen ? "text-[#FF6B4A]" : "text-[#2A2B48] group-hover:text-[#FF6B4A]"
                        }`}
                      >
                        {item.question}
                      </span>
                      <span className="ml-4 shrink-0 transition-colors">
                        {isOpen ? (
                          <Minus className="w-4 h-4 text-[#FF6B4A]" />
                        ) : (
                          <Plus className="w-4 h-4 text-[#818CF8]" />
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="font-sans text-xs sm:text-sm text-[#64748B] leading-relaxed pb-7 pr-4 font-normal">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* DISCOVER MORE Button */}
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3 rounded border border-[#818CF8]/40 text-[#6366F1] font-sans text-xs font-semibold hover:bg-[#6366F1] hover:text-white hover:border-[#6366F1] transition-all duration-300 shadow-2xs"
              >
                Discover more
              </Link>
            </div>
          </motion.div>

          {/* Right Column: FAQ Blob Image CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center items-center"
          >
            <Link href="/contact" className="relative block w-full max-w-[500px] transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src="/images/faq-blob.png"
                alt="Have a project in mind? Let's get to work."
                width={500}
                height={500}
                sizes="(max-width: 640px) 90vw, 500px"
                className="w-full h-auto object-contain drop-shadow-xl select-none"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
