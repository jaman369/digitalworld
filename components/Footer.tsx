import Link from "next/link";

const flags = [
  { code: "us", alt: "US" },
  { code: "gb", alt: "UK" },
  { code: "ca", alt: "CA" },
  { code: "au", alt: "AU" },
  { code: "ie", alt: "IE" },
  { code: "ae", alt: "AE" },
  { code: "za", alt: "ZA" },
  { code: "de", alt: "DE" },
  { code: "nl", alt: "NL" },
  { code: "nz", alt: "NZ" },
  { code: "bd", alt: "BD" },
];

const seoLinks = [
  { label: "Local SEO", href: "/services/seo#svc-local" },
  { label: "Ecommerce SEO", href: "/services/seo#svc-ecom" },
  { label: "International SEO", href: "/services/seo#svc-intl" },
  { label: "Youtube / Video SEO", href: "/services/seo#svc-yt" },
  { label: "SaaS SEO", href: "/services/seo#svc-saas" },
  { label: "Semantic SEO", href: "/services/seo#svc-semantic" },
  { label: "AI SEO", href: "/services/seo#svc-ai" },
];

const serviceLinks = [
  { label: "WordPress Development", href: "/services/web#svc-wordpress" },
  { label: "Shopify Development", href: "/services/web#svc-shopify" },
  { label: "Google Ads / PPC", href: "/services/ppc#svc-search" },
  { label: "Facebook & Instagram Ads", href: "/services/ppc#svc-facebook" },
  { label: "Content Marketing", href: "/services/content#svc-content" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "f", title: "Facebook", href: "https://www.facebook.com/digitalworld1988" },
  { label: "ig", title: "Instagram", href: "https://www.instagram.com/" },
  { label: "𝕏", title: "X (Twitter)", href: "https://x.com/" },
  { label: "P", title: "Pinterest", href: "https://www.pinterest.com/" },
  { label: "▶", title: "YouTube", href: "https://www.youtube.com/" },
  { label: "in", title: "Indeed", href: "https://www.indeed.com/" },
  { label: "Li", title: "LinkedIn", href: "https://www.linkedin.com/in/kamrujjaman-mufti/" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06] pt-16 pb-8">
      <div className="max-w-[1120px] mx-auto px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div>
            <div className="font-[var(--font-display)] text-xl text-white mb-3">
              Digital World
            </div>
            <p className="text-[13px] text-white/50 leading-relaxed mb-5">
              Full-Service Digital Marketing Agency - 5 Years Experience · Serving 11 countries worldwide.
            </p>

            {/* Flags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {flags.map((f) => (
                <img
                  key={f.code}
                  src={`https://flagcdn.com/w20/${f.code}.png`}
                  srcSet={`https://flagcdn.com/w40/${f.code}.png 2x`}
                  alt={f.alt}
                  className="w-5 h-auto rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                />
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-2 mb-4">
              {socialLinks.map((s) => (
                <a
                  key={s.title}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.title}
                  aria-label={s.title}
                  className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/60 text-[11px] font-medium hover:bg-white/[0.12] hover:text-white transition-all duration-200"
                >
                  {s.label}
                </a>
              ))}
            </div>

            <Link
              href="/contact"
              className="inline-block mt-2 bg-[var(--color-blue)] text-white text-xs font-medium px-[18px] py-2.5 rounded-full hover:bg-[var(--color-blue-hover)] transition-colors duration-200"
            >
              📅 Book Free Consultation
            </Link>
          </div>

          {/* SEO Links */}
          <div className="pt-2.5">
            {seoLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-xs text-white/50 py-[5px] hover:text-white transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Service Links */}
          <div className="pt-2.5">
            {serviceLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-xs text-white/50 py-[5px] hover:text-white transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Company Links */}
          <div className="pt-2.5">
            {companyLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-xs text-white/50 py-[5px] hover:text-white transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="mailto:kj.jaman369@gmail.com"
              className="block text-xs text-white/50 py-[5px] hover:text-white transition-colors duration-150"
            >
              kj.jaman369@gmail.com
            </a>
            <a
              href="tel:+8801798667820"
              className="block text-xs text-white/50 py-[5px] hover:text-white transition-colors duration-150"
            >
              +880 1798-667820
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] pt-6 text-center">
          <p className="text-[11px] text-white/30">
            Copyright © 2025 Digital World - Kamrujjaman Mufti. All rights reserved.
          </p>
          <p className="text-[11px] text-white/30 mt-1">
            Based in Dhaka, Bangladesh · Available worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
