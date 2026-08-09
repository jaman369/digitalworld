"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";

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
      
      {/* Background Decorative Matrix & Shapes */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        
        {/* Bottom Left Dot Matrix Grid (Arc / Half-circle pattern) */}
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
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A2B48] tracking-tight leading-[1.2] mb-8">
              Freequently Ask Questions
            </h2>

            {/* Accordion List */}
            <div className="flex flex-col border-t border-neutral-100 mb-8">
              {defaultFaqItems.map((item) => {
                const isOpen = activeId === item.id;

                return (
                  <div key={item.id} className="border-b border-neutral-100/80">
                    <button
                      onClick={() => toggleAccordion(item.id)}
                      className="w-full py-4.5 flex items-center justify-between text-left transition-colors group"
                    >
                      <span
                        className={`font-sans text-sm sm:text-[15px] font-bold transition-colors duration-200 ${
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
                          <p className="font-sans text-xs sm:text-sm text-[#64748B] leading-relaxed pb-5 pr-4 font-normal">
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
                className="inline-flex items-center justify-center px-7 py-3 rounded border border-[#818CF8]/40 text-[#6366F1] font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#6366F1] hover:text-white hover:border-[#6366F1] transition-all duration-300 shadow-2xs"
              >
                DISCOVER MORE
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Exact Liquid Organic Blob CTA Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-[540px] aspect-[1.15/1] flex items-center justify-center">
              
              {/* Organic Liquid Shape Container */}
              <div className="relative w-full h-full rounded-[45%_55%_65%_35%/40%_50%_50%_60%] overflow-hidden shadow-2xl bg-[#FF6B35]">
                
                {/* Layer 1: Professional Businessman Image */}
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1000"
                  alt="Have a project in mind professional"
                  fill
                  className="object-cover object-right sm:object-center"
                  priority
                />

                {/* Layer 2: Yellow-Orange Gradient Wave Overlay on Top-Left */}
                <div 
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 10% 20%, rgba(255, 170, 0, 0.95) 0%, rgba(255, 120, 0, 0.85) 40%, transparent 70%)"
                  }}
                />

                {/* Layer 3: Red-Orange Translucent Overlay Wave on Bottom-Left */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 87, 34, 0.85) 0%, rgba(220, 38, 38, 0.75) 50%, transparent 85%)"
                  }}
                />

                {/* Layer 4: Content Overlay inside Liquid Blob */}
                <div className="absolute inset-0 p-8 sm:p-12 lg:p-14 flex flex-col justify-center text-white z-10 max-w-[340px] sm:max-w-[380px]">
                  
                  {/* Lightbulb Icon with Ray Lines */}
                  <div className="mb-5">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-sm">
                      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
                      <path d="M9 18h6" />
                      <path d="M10 22h4" />
                      <line x1="12" y1="2" x2="12" y2="3.5" />
                      <line x1="4.5" y1="4.5" x2="5.8" y2="5.8" />
                      <line x1="19.5" y1="4.5" x2="18.2" y2="5.8" />
                    </svg>
                  </div>

                  {/* Main Title */}
                  <h3 className="font-sans text-2xl sm:text-3xl lg:text-[2.1rem] font-bold text-white tracking-tight leading-[1.25] mb-4 drop-shadow-sm">
                    Have a project in mind? <br />
                    Let&apos;s get to work.
                  </h3>

                  {/* Sub-text */}
                  <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed mb-8 font-normal drop-shadow-xs">
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
