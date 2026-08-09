"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight, Lightbulb } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const defaultFaqItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "Ut enim ad minim veniam exercitation ullamco?",
    answer:
      "Ne summo dictas pertinacia nam. Illum cetero vocent ei vim, case regione significerumque vim te. Ex mea quem munere lobortis. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
  },
  {
    id: "faq-2",
    question: "Excepteur sint proident culpa qui officia?",
    answer:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
  },
  {
    id: "faq-3",
    question: "Sed ut perspiciatis unde omnis iste natus errorsit?",
    answer:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  },
  {
    id: "faq-4",
    question: "Consectetur adipisicing incididunt?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
];

export default function FAQSection() {
  const [activeId, setActiveId] = useState<string>("faq-1");

  const toggleAccordion = (id: string) => {
    setActiveId((prev) => (prev === id ? "" : id));
  };

  return (
    <section className="py-20 lg:py-32 bg-white relative z-10 overflow-hidden">
      
      {/* Background Decorative Pattern (Bottom Left Dot Matrix & Floating Crosses) */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Dot Matrix Pattern at bottom left */}
        <div className="absolute bottom-4 left-4 w-48 h-48 opacity-25">
          <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <pattern id="dotPattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="#64748B" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>
        </div>

        {/* Floating cross/plus icons */}
        <div className="absolute top-1/3 left-8 text-teal-400 opacity-60 font-mono text-xl select-none">+</div>
        <div className="absolute bottom-1/4 left-1/4 text-indigo-900 opacity-80 font-bold text-2xl select-none">✕</div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: FAQ Accordion */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-[0.25em] mb-3">
              FAQ
            </span>

            {/* Title */}
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A2B48] tracking-tight leading-[1.2] mb-10">
              Freequently Ask Questions
            </h2>

            {/* Accordion List */}
            <div className="flex flex-col border-t border-neutral-100 mb-8">
              {defaultFaqItems.map((item) => {
                const isOpen = activeId === item.id;

                return (
                  <div key={item.id} className="border-b border-neutral-100">
                    <button
                      onClick={() => toggleAccordion(item.id)}
                      className="w-full py-5 flex items-center justify-between text-left transition-colors group"
                    >
                      <span
                        className={`font-sans text-sm sm:text-base font-bold transition-colors duration-200 ${
                          isOpen ? "text-[#FF6B4A]" : "text-[#2A2B48] group-hover:text-[#FF6B4A]"
                        }`}
                      >
                        {item.question}
                      </span>
                      <span className="ml-4 shrink-0 text-neutral-400 group-hover:text-[#FF6B4A] transition-colors">
                        {isOpen ? (
                          <Minus className="w-4 h-4 text-[#FF6B4A]" />
                        ) : (
                          <Plus className="w-4 h-4" />
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
                          <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed pb-5 pr-6">
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
                className="inline-flex items-center justify-center px-7 py-3 rounded-md border border-indigo-500/40 text-indigo-600 font-sans text-xs font-bold uppercase tracking-wider hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 shadow-2xs"
              >
                DISCOVER MORE
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Organic Gradient Liquid Blob Overlay with Businessman Photo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-lg aspect-[4/4] flex items-center justify-center">
              
              {/* Organic Liquid Blob Outer Shape Container */}
              <div className="relative w-full h-full rounded-[40%_60%_70%_30%/40%_50%_60%_50%] overflow-hidden shadow-2xl bg-gradient-to-br from-[#FF9800] via-[#FF5722] to-[#D81B60]">
                
                {/* Businessman Image Background */}
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1000"
                  alt="Business professional thinking"
                  fill
                  className="object-cover object-center mix-blend-overlay opacity-80"
                />

                {/* Translucent Glowing Color Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5722]/80 via-[#FF9800]/50 to-transparent" />

                {/* Content Overlay inside the Liquid Shape */}
                <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-center text-white z-10 max-w-md">
                  
                  {/* Lightbulb Icon */}
                  <div className="mb-4">
                    <Lightbulb className="w-8 h-8 text-amber-200 stroke-[1.5]" />
                  </div>

                  {/* Heading */}
                  <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 leading-tight">
                    Have a project in mind? Let&apos;s get to work.
                  </h3>

                  {/* Sub-text */}
                  <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed mb-8">
                    Find out how it works and ask any questions you may have.
                  </p>

                  {/* GET IN TOUCH Action Link */}
                  <div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-white hover:text-amber-200 transition-colors group"
                    >
                      <span>GET IN TOUCH</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
