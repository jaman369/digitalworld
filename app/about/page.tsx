import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

export const metadata: Metadata = {
  title: "About Us - Digital World",
  description: "Discover the story behind Digital World. Led by Kamrujjaman Mufti, we build data-driven organic and paid channels that scale international businesses.",
};

export default function AboutPage() {
  return (
    <article className="min-h-screen bg-white">
      {/* About Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,118,255,0.03)_0%,transparent_60%)]" />
        
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Biography Text */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
                About The Founder
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6">
                Hi, I&apos;m <br />
                <span className="text-primary italic font-medium">Kamrujjaman Mufti.</span>
              </h1>
              <p className="font-sans text-lg text-neutral-600 leading-relaxed mb-6">
                I am the founder and lead strategy architect of Digital World. For the past five years, I have worked at the intersection of search engine algorithms, conversion optimization, and paid media allocation. My focus is helping businesses scale customer acquisition globally with zero reliance on guess work.
              </p>
              <p className="font-sans text-base text-neutral-500 leading-relaxed mb-10">
                What began as a personal fascination with indexing architectures quickly grew into a full-service marketing agency. Today, we audit search presence, deploy rapid headless Web structures, optimize shopping workflows, and scale high-return Google & Meta campaigns. We act as a technical extension of your team, providing complete visibility into keyword trends and conversion statistics.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-8 py-4 font-sans text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] active:scale-[0.99]"
                >
                  Work With Me <Icons.ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="/Kamrujjaman_Mufti_Resume.pdf"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 px-8 py-4 font-sans text-sm font-semibold text-neutral-700 shadow-sm transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icons.Download className="h-4 w-4 text-neutral-500" /> Download Resume
                </a>
              </div>
            </div>

            {/* Right Image Frame */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-premium border border-neutral-100">
                <Image
                  src="/Kamrujjaman Mufti Image/kamrujjaman-mufti.jpg"
                  alt="Kamrujjaman Mufti"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Backing structural color frame */}
              <div className="absolute top-6 -left-6 -z-10 w-full max-w-[380px] aspect-[4/5] rounded-3xl bg-primary/5 hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Integrate the WhyChooseUs Section */}
      <WhyChooseUs />
    </article>
  );
}
