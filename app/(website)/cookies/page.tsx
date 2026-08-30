import Link from "next/link";
import * as Icons from "lucide-react";

export const metadata = {
  title: "Cookie Policy - Digital World Agency",
  description: "Information regarding the use of cookies and tracking technologies on Digital World Agency website.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 pt-32 pb-24">
      <div className="container mx-auto max-w-4xl px-6">
        
        {/* Header */}
        <div className="mb-12 border-b border-neutral-200 pb-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-1.5 text-xs font-bold text-amber-700 uppercase tracking-widest mb-4">
            Cookie & Tracking Policy
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-sm text-neutral-500 font-mono">
            Last Updated: January 2026 · Transparent User Tracking & Preference Controls
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-neutral max-w-none space-y-8 font-sans text-neutral-700 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit websites. They help websites recognize your browser, remember preferences, and analyze how visitors navigate pages to deliver an optimized browsing experience.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">2. How We Use Cookies</h2>
            <p>
              Digital World Agency uses cookies to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Ensure essential website functionality and fast page loading speeds.</li>
              <li>Analyze aggregate website usage and visitor navigation paths (via Google Analytics).</li>
              <li>Measure conversion performance of digital advertising campaigns (via Meta & Google Ads pixels).</li>
              <li>Save your UI layout preferences and form input states.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">3. Types of Cookies We Deploy</h2>
            <p>
              We categorize our cookies into Essential (required for core site operation), Analytical (performance measurement), and Marketing cookies (campaign tracking).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">4. Managing Your Cookie Preferences</h2>
            <p>
              You can control or disable cookies at any time through your web browser settings. Disabling essential cookies may affect certain interactive elements of our website.
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
