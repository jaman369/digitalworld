import Link from "next/link";
import * as Icons from "lucide-react";

export const metadata = {
  title: "Privacy Policy - Digital World Agency",
  description: "Privacy Policy explaining how Digital World Agency collects, uses, and safeguards client and website visitor data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 pt-32 pb-24">
      <div className="container mx-auto max-w-4xl px-6">
        
        {/* Header */}
        <div className="mb-12 border-b border-neutral-200 pb-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-4">
            Data Security & Compliance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-neutral-500 font-mono">
            Last Updated: January 2026 · Committed to GDPR & International Data Protection Standards
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-neutral max-w-none space-y-8 font-sans text-neutral-700 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">1. Information We Collect</h2>
            <p>
              Digital World Agency collects personal information that you voluntarily provide when filling out inquiry forms, requesting SEO audits, subscribing to newsletters, or engaging our agency services. This may include your name, email address, phone number, company name, website URL, and campaign goals.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">2. How We Use Your Data</h2>
            <p>
              We use collected information solely to deliver customized marketing proposals, execute client strategy, process billing, communicate campaign analytics reports, and improve your website browsing experience. We never sell, rent, or trade your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">3. Analytics & Tracking Cookies</h2>
            <p>
              We utilize standard web analytics tools (e.g., Google Analytics, Meta Pixel) to analyze aggregate site traffic, user interaction patterns, and conversion efficiency. These tools place small data files (cookies) on your browser. You can disable cookies at any time via your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">4. Client Data Protection & NDA</h2>
            <p>
              All proprietary business data, customer lists, ad budget statistics, and internal credentials shared by our clients are treated with strict confidentiality. All team members operate under binding Non-Disclosure Agreements (NDAs).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">5. Data Retention & Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of your personal data stored in our systems at any time. To exercise these rights, please email us directly.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">6. Privacy Inquiries</h2>
            <p>
              If you have any questions regarding this Privacy Policy, please contact our Data Protection Officer at{" "}
              <a href="mailto:kj.jaman369@gmail.com" className="text-[#0076FF] font-bold underline">
                kj.jaman369@gmail.com
              </a>.
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
            <span>Contact Privacy Team</span>
            <Icons.ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
