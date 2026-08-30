import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import { getSettings } from "@/lib/settings";

export default async function Footer() {
  const settings = await getSettings();

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
      <div className="container mx-auto max-w-7xl px-6 py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-9 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Kj Digital World Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-white text-lg sm:text-xl leading-tight group-hover:text-primary transition-colors">
                  Digital World
                </span>
                <span className="font-sans text-[10px] font-bold text-neutral-400 tracking-wider uppercase -mt-0.5">
                  Agency
                </span>
              </div>
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
            <div className="flex gap-2 flex-wrap">
              {settings.socialLinks?.map((link, idx) => {
                const platformKey = link.platform.trim().toLowerCase();
                let IconComponent = Icons.Share2;

                if (platformKey.includes("facebook")) IconComponent = Icons.Facebook;
                else if (platformKey.includes("instagram")) IconComponent = Icons.Instagram;
                else if (platformKey.includes("twitter") || platformKey === "x") IconComponent = Icons.Twitter;
                else if (platformKey.includes("youtube")) IconComponent = Icons.Youtube;
                else if (platformKey.includes("linkedin")) IconComponent = Icons.Linkedin;
                else if (platformKey.includes("github")) IconComponent = Icons.Github;
                else if (platformKey.includes("tiktok")) IconComponent = Icons.Music;
                else if (platformKey.includes("pinterest")) IconComponent = Icons.Pin;

                return (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-primary hover:text-white transition-colors animate-fade-in"
                    aria-label={link.platform}
                  >
                    <IconComponent className="h-4 w-4" />
                  </a>
                );
              })}
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
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">SEO Solutions</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/services/seo#svc-local" className="text-neutral-400 hover:text-white transition-colors">Local SEO</Link></li>
              <li><Link href="/services/seo#svc-ecommerce" className="text-neutral-400 hover:text-white transition-colors">Ecommerce SEO</Link></li>
              <li><Link href="/services/seo#svc-international" className="text-neutral-400 hover:text-white transition-colors">International SEO</Link></li>
              <li><Link href="/services/seo#link-building" className="text-neutral-400 hover:text-white transition-colors">Link Building</Link></li>
              <li><Link href="/services/seo#svc-saas" className="text-neutral-400 hover:text-white transition-colors">SaaS SEO</Link></li>
              <li><Link href="/services/seo#svc-semantic" className="text-neutral-400 hover:text-white transition-colors">Semantic SEO</Link></li>
            </ul>
          </div>

          {/* Column 2: Dev & Ads */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Development & Ads</h3>
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
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/about" className="text-neutral-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="text-neutral-400 hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/blog" className="text-neutral-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-neutral-400 hover:text-white transition-colors">Contact</Link></li>
              <li className="text-neutral-400 break-all"><a href={`mailto:${settings.email}`} className="hover:text-white">{settings.email}</a></li>
              <li className="text-neutral-400"><a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-white">{settings.phone}</a></li>
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
