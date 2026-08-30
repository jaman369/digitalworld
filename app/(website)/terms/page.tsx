import Link from "next/link";
import * as Icons from "lucide-react";

export const metadata = {
  title: "Terms of Service - Digital World Agency",
  description: "Terms and conditions governing the digital marketing, SEO, web development, and strategy services provided by Digital World Agency.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 pt-32 pb-24">
      <div className="container mx-auto max-w-4xl px-6">
        
        {/* Header */}
        <div className="mb-12 border-b border-neutral-200 pb-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs font-bold text-[#0076FF] uppercase tracking-widest mb-4">
            Legal & Policy Document
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-neutral-500 font-mono">
            Last Updated: January 2026 · Effective Immediately for All Digital World Agency Clients
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-neutral max-w-none space-y-8 font-sans text-neutral-700 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing our website or engaging Digital World Agency (&quot;Company&quot;, &quot;We&quot;, &quot;Us&quot;, &quot;Our&quot;) for SEO, PPC, Web Development, Content Marketing, AI Automation, or Factory Sourcing services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not access our services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">2. Scope of Digital Services</h2>
            <p>
              Digital World Agency provides customized digital marketing strategy, technical optimization, search engine optimization (SEO), paid search and social campaign management, web design and development, content creation, workflow automation, and sourcing consultations. Specific scope deliverables, performance milestones, and timelines are defined in individual Client Service Agreements and Statements of Work (SOW).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">3. Client Responsibilities & Data Access</h2>
            <p>
              To ensure timely execution of campaigns, clients agree to provide required administrative access (e.g., Google Analytics, Search Console, Ad Accounts, CMS credentials), brand assets, product information, and timely approval on campaign creatives. Digital World Agency is not responsible for delayed execution resulting from withheld access or missing client inputs.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">4. Intellectual Property & Deliverables</h2>
            <p>
              Upon full payment of all invoices, clients retain 100% ownership of custom domain assets, custom graphic designs, copy written specifically for the client, and developed website source code. Digital World Agency retains rights to proprietary analytical frameworks, custom software tools, and non-confidential campaign methodology.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">5. Payment Terms & Billing</h2>
            <p>
              Retainer-based services (SEO, PPC management, social management) are billed monthly in advance unless agreed otherwise. Web development and one-time project fees follow a milestone payment schedule. Invoices unpaid past 14 business days may result in temporary suspension of campaign services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">6. Limitation of Liability</h2>
            <p>
              While Digital World Agency employs industry-leading data-backed strategies to maximize search rankings, conversion rates, and return on ad spend (ROAS), third-party platform algorithm updates (e.g., Google, Meta) and market dynamics are outside our direct control. In no event shall Digital World Agency be liable for indirect, punitive, or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">7. Contact & Support</h2>
            <p>
              For legal inquiries or questions regarding your service contract, please contact our support team at{" "}
              <a href="mailto:kj.jaman369@gmail.com" className="text-[#0076FF] font-bold underline">
                kj.jaman369@gmail.com
              </a>{" "}
              or call us at +880 1798-667820.
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
            <span>Have Questions? Contact Us</span>
            <Icons.ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
