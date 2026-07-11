import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";

export default function Footer() {
  const flags = [
    { src: "/Flag emoji/United States.svg", alt: "USA" },
    { src: "/Flag emoji/United Kingdom.svg", alt: "UK" },
    { src: "/Flag emoji/Canada.svg", alt: "Canada" },
    { src: "/Flag emoji/Ireland.svg", alt: "Ireland" },
    { src: "/Flag emoji/South Africa.svg", alt: "South Africa" },
    { src: "/Flag emoji/Germany.svg", alt: "Germany" },
    { src: "/Flag emoji/Netherlands.svg", alt: "Netherlands" },
    { src: "/Flag emoji/Australia.svg", alt: "Australia" },
    { src: "/Flag emoji/New Zealand.svg", alt: "New Zealand" },
    { src: "/Flag emoji/UAE.svg", alt: "UAE" },
    { src: "/Flag emoji/Bangladesh.svg", alt: "Bangladesh" },
  ];

  return (
    <footer className="bg-bg-dark text-neutral-300 font-sans border-t border-neutral-800">
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2.5 font-sans font-bold text-white text-lg">
              <span className="h-4 w-4 rounded-full bg-gradient-to-r from-primary to-primary-hover shadow-sm" />
              Digital World
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Full-Service Digital Marketing Agency – 5 Years Experience & Serving 11 countries worldwide.
            </p>
            
            {/* Flags Grid */}
            <div className="flex flex-wrap gap-2">
              {flags.map((flag, idx) => (
                <div key={idx} className="relative h-4.5 w-6 overflow-hidden rounded border border-neutral-700">
                  <Image 
                    src={flag.src} 
                    alt={flag.alt} 
                    fill 
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Socials Row */}
            <div className="flex gap-2">
              <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-primary hover:text-white transition-colors" aria-label="Facebook">
                <Icons.Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-primary hover:text-white transition-colors" aria-label="Instagram">
                <Icons.Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-primary hover:text-white transition-colors" aria-label="Twitter/X">
                <Icons.Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-primary hover:text-white transition-colors" aria-label="Youtube">
                <Icons.Youtube className="h-4 w-4" />
              </Link>
              <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-primary hover:text-white transition-colors" aria-label="LinkedIn">
                <Icons.Linkedin className="h-4 w-4" />
              </Link>
            </div>
            
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] self-start"
            >
              <Icons.Calendar className="h-3.5 w-3.5" /> Book Consultation
            </Link>
          </div>

          {/* Column 1: SEO Solutions */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">SEO Solutions</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/services/seo#svc-local" className="text-neutral-400 hover:text-white transition-colors">Local SEO</Link></li>
              <li><Link href="/services/seo#svc-ecommerce" className="text-neutral-400 hover:text-white transition-colors">Ecommerce SEO</Link></li>
              <li><Link href="/services/seo#svc-international" className="text-neutral-400 hover:text-white transition-colors">International SEO</Link></li>
              <li><Link href="/services/seo#svc-youtube" className="text-neutral-400 hover:text-white transition-colors">Youtube / Video SEO</Link></li>
              <li><Link href="/services/seo#svc-saas" className="text-neutral-400 hover:text-white transition-colors">SaaS SEO</Link></li>
              <li><Link href="/services/seo#svc-semantic" className="text-neutral-400 hover:text-white transition-colors">Semantic SEO</Link></li>
            </ul>
          </div>

          {/* Column 2: Dev & Ads */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Development & Ads</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/services/web-design-dev#svc-wordpress" className="text-neutral-400 hover:text-white transition-colors">WordPress Development</Link></li>
              <li><Link href="/services/web-design-dev#svc-shopify" className="text-neutral-400 hover:text-white transition-colors">Shopify Development</Link></li>
              <li><Link href="/services/ppc#svc-google-ads" className="text-neutral-400 hover:text-white transition-colors">Google Ads / PPC</Link></li>
              <li><Link href="/services/ppc#svc-facebook-ads" className="text-neutral-400 hover:text-white transition-colors">Facebook & Instagram Ads</Link></li>
              <li><Link href="/services/content-marketing#svc-content" className="text-neutral-400 hover:text-white transition-colors">Content Marketing</Link></li>
              <li><Link href="/services/ai-automation" className="text-neutral-400 hover:text-white transition-colors">AI & Automation</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/about" className="text-neutral-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="text-neutral-400 hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/blog" className="text-neutral-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-neutral-400 hover:text-white transition-colors">Contact</Link></li>
              <li className="text-neutral-400 break-all"><a href="mailto:kj.jaman369@gmail.com" className="hover:text-white">kj.jaman369@gmail.com</a></li>
              <li className="text-neutral-400">+880 1798-667820</li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>Copyright © 2025 Digital World - Kamrujjaman Mufti. All rights reserved.</p>
          <p>Based in Dhaka, Bangladesh & Available worldwide</p>
        </div>
      </div>
    </footer>
  );
}
