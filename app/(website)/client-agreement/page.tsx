import Link from "next/link";
import * as Icons from "lucide-react";

export const metadata = {
  title: "Client Service Agreement - Digital World Agency",
  description: "Framework agreement outlining agency deliverables, performance KPIs, confidentiality, and service terms.",
};

export default function ClientAgreementPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 pt-32 pb-24">
      <div className="container mx-auto max-w-4xl px-6">
        
        {/* Header */}
        <div className="mb-12 border-b border-neutral-200 pb-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-purple-50 border border-purple-200 px-4 py-1.5 text-xs font-bold text-purple-700 uppercase tracking-widest mb-4">
            Master Service Agreement (MSA)
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
            Client Service Agreement
          </h1>
          <p className="text-sm text-neutral-500 font-mono">
            Last Updated: January 2026 · Standard Terms & Service Framework
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-neutral max-w-none space-y-8 font-sans text-neutral-700 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">1. Executive Summary</h2>
            <p>
              This Master Client Service Agreement (&quot;MSA&quot;) governs the commercial relationship between Digital World Agency and its clients. Individual project scopes, key performance indicators (KPIs), retainer terms, and pricing are specified in attached Statements of Work (SOW).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">2. Service Standards & Quality Assurance</h2>
            <p>
              Digital World Agency agrees to perform all services in a professional, workpersonlike manner adhering to white-hat industry standards, Google Search Quality Rater Guidelines, and Meta advertising policies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">3. Confidentiality & Non-Disclosure</h2>
            <p>
              Both parties agree to hold all non-public information, proprietary strategies, customer data, trade secrets, and financial details in strict confidence during and after the contract period.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">4. Request Custom Agreement</h2>
            <p>
              For enterprise clients requiring custom SLAs, security compliance reviews, or custom NDA documentation, please request a formal contract pack from our account team.
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
            <span>Request Contract Pack</span>
            <Icons.ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
