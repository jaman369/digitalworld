import Link from "next/link";
import * as Icons from "lucide-react";

export const metadata = {
  title: "Disclaimer - Digital World Agency",
  description: "Performance disclaimer regarding digital marketing outcomes, search rankings, and third-party advertising platforms.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 pt-32 pb-24">
      <div className="container mx-auto max-w-4xl px-6">
        
        {/* Header */}
        <div className="mb-12 border-b border-neutral-200 pb-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-300 px-4 py-1.5 text-xs font-bold text-slate-700 uppercase tracking-widest mb-4">
            Legal Disclaimer
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
            Website & Service Disclaimer
          </h1>
          <p className="text-sm text-neutral-500 font-mono">
            Last Updated: January 2026 · Transparent Performance & Earnings Disclosures
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-neutral max-w-none space-y-8 font-sans text-neutral-700 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">1. No Earnings or Ranking Guarantees</h2>
            <p>
              Case studies, performance statistics (e.g. 10M+ impressions, 4.2X organic ROI), and revenue growth examples cited on this website reflect actual historical performance achieved for specific clients under specific market conditions. Search engine algorithms (Google, Bing), ad auction costs (Meta, Google Ads), and economic factors vary by industry. Past performance does not guarantee identical future results for every business.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">2. Third-Party Platforms</h2>
            <p>
              Digital World Agency is an independent digital marketing agency. Trademarks such as Google, Meta, Facebook, Instagram, Shopify, WordPress, TikTok, and LinkedIn are the property of their respective trademark owners.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">3. Professional Advice</h2>
            <p>
              Information published on our blog or website is provided for general strategic marketing education purposes only and should not be construed as legal, financial, or tax advice.
            </p>
          </section>
        </div>

        {/* Back CTA */}
        <div className="mt-12 pt-8 border-t border-neutral-200 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-[#0076FF] transition-colors"
          >
            <Icons.ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#0076FF] hover:bg-blue-600 px-6 py-3 text-xs font-bold text-white uppercase tracking-wider shadow-sm transition-all"
          >
            <span>Ask a Question</span>
            <Icons.ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
