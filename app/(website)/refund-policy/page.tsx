import Link from "next/link";
import * as Icons from "lucide-react";

export const metadata = {
  title: "Refund & Cancellation Policy - Digital World Agency",
  description: "Official Refund and Service Cancellation Policy for Digital World Agency digital marketing, SEO, and development projects.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 pt-32 pb-24">
      <div className="container mx-auto max-w-4xl px-6">
        
        {/* Header */}
        <div className="mb-12 border-b border-neutral-200 pb-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 border border-rose-200 px-4 py-1.5 text-xs font-bold text-rose-700 uppercase tracking-widest mb-4">
            Service Terms & Guarantees
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
            Refund & Cancellation Policy
          </h1>
          <p className="text-sm text-neutral-500 font-mono">
            Last Updated: January 2026 · Transparent Client Billing & Project Guarantees
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-neutral max-w-none space-y-8 font-sans text-neutral-700 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">1. Monthly Retainer Cancellations</h2>
            <p>
              Clients engaged in monthly retainer agreements (SEO campaigns, PPC management, content marketing) may cancel their service subscription by providing written notice at least 15 business days prior to the next monthly billing cycle. Services will remain active through the paid billing period.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">2. Web Development & One-Time Projects</h2>
            <p>
              Web design, custom development, and one-time technical audits follow a milestone payment schedule. Initial deposit payments are refundable up to 7 days after contract signing, provided project work has not yet commenced. Once technical scoping or design drafting has begun, deposit payments are non-refundable.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">3. Media Spend & Paid Ads Budgets</h2>
            <p>
              Advertising media spend paid directly to third-party ad networks (Google Ads, Meta Ads, TikTok Ads) is controlled by the client&apos;s credit card and is non-refundable by Digital World Agency. Management fees paid to Digital World Agency are non-refundable once campaign setup and optimization have been performed.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">4. Client Satisfaction Guarantee</h2>
            <p>
              We pride ourselves on maintaining a 98.4% client retention rate. If you are dissatisfied with campaign deliverables at any point, your dedicated account lead will conduct an emergency campaign review to realign performance parameters or offer service credit.
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
            <span>Billing Inquiry</span>
            <Icons.ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
