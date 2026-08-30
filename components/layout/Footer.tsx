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

  // 5 Popular Social Media Icons Guaranteed
  const popularSocials = [
    { name: "Facebook", icon: Icons.Facebook, defaultUrl: "https://facebook.com" },
    { name: "Instagram", icon: Icons.Instagram, defaultUrl: "https://instagram.com" },
    { name: "LinkedIn", icon: Icons.Linkedin, defaultUrl: "https://linkedin.com" },
    { name: "Twitter", icon: Icons.Twitter, defaultUrl: "https://twitter.com" },
    { name: "YouTube", icon: Icons.Youtube, defaultUrl: "https://youtube.com" },
  ];

  const socialLinksToRender = popularSocials.map((item) => {
    const cmsMatch = settings?.socialLinks?.find((link) => {
      const p = link.platform.trim().toLowerCase();
      if (item.name.toLowerCase().includes("facebook") && p.includes("facebook")) return true;
      if (item.name.toLowerCase().includes("instagram") && p.includes("instagram")) return true;
      if (item.name.toLowerCase().includes("linkedin") && p.includes("linkedin")) return true;
      if (item.name.toLowerCase().includes("twitter") && (p.includes("twitter") || p === "x")) return true;
      if (item.name.toLowerCase().includes("youtube") && p.includes("youtube")) return true;
      return false;
    });

    return {
      platform: item.name,
      url: cmsMatch?.url || item.defaultUrl,
      IconComponent: item.icon,
    };
  });

  const extraCmsLinks = (settings?.socialLinks || [])
    .filter((l) => {
      const p = l.platform.trim().toLowerCase();
      return !["facebook", "instagram", "linkedin", "twitter", "x", "youtube"].some((k) => p.includes(k));
    })
    .map((l) => {
      const p = l.platform.trim().toLowerCase();
      let IconComponent: typeof Icons.Share2 = Icons.Share2;
      if (p.includes("github")) IconComponent = Icons.Github;
      else if (p.includes("tiktok")) IconComponent = Icons.Music;
      else if (p.includes("pinterest")) IconComponent = Icons.Pin;
      return {
        platform: l.platform,
        url: l.url,
        IconComponent,
      };
    });

  const finalSocials = [...socialLinksToRender, ...extraCmsLinks];

  return (
    <footer className="bg-bg-dark text-neutral-300 font-sans border-t border-neutral-800">
      <div className="container mx-auto max-w-7xl px-6 py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-6 lg:pr-8">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative h-12 w-10 sm:h-14 sm:w-12 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Kj Digital World Logo"
                  fill
                  className="object-contain object-left brightness-0 invert"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-white text-xl sm:text-2xl leading-none group-hover:text-primary transition-colors tracking-tight">
                  Digital World
                </span>
                <span className="font-sans text-[11px] font-bold text-neutral-400 tracking-widest uppercase mt-0.5">
                  Agency
                </span>
              </div>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Full-Service Digital Marketing Agency – 5 Years Experience & Serving 11 countries worldwide.
            </p>
            
            {/* Flags Grid (Serving 11 Countries Worldwide - Single Row Fit) */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                Serving 11 Countries Worldwide
              </span>
              <div className="flex flex-nowrap items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5">
                {flags.map((flag, idx) => (
                  <div
                    key={idx}
                    title={flag.alt}
                    className="relative h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] border border-neutral-700/80 shadow-xs hover:scale-125 hover:border-primary transition-all duration-200 cursor-pointer"
                  >
                    <Image 
                      src={flag.src} 
                      alt={flag.alt} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 5 Popular Social Media Icons */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                Connect With Us
              </span>
              <div className="flex gap-2.5 flex-wrap">
                {finalSocials.map((social, idx) => {
                  const IconComp = social.IconComponent;
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-800/90 text-neutral-300 border border-neutral-700/60 hover:bg-primary hover:border-primary hover:text-white hover:scale-110 transition-all duration-200 shadow-xs"
                      aria-label={social.platform}
                      title={social.platform}
                    >
                      <IconComp className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
            
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] self-start"
            >
              <Icons.Calendar className="h-3.5 w-3.5" /> Book Consultation
            </Link>
          </div>

          {/* Column 1: Our Services List */}
          <div className="flex flex-col gap-4 lg:pl-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Our Services</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/services/seo" className="text-neutral-400 hover:text-white transition-colors">SEO Services</Link></li>
              <li><Link href="/services/ppc" className="text-neutral-400 hover:text-white transition-colors">PPC & Paid Ads</Link></li>
              <li><Link href="/services/web-design-dev" className="text-neutral-400 hover:text-white transition-colors">Web Design & Dev</Link></li>
              <li><Link href="/services/content-marketing" className="text-neutral-400 hover:text-white transition-colors">Content Marketing</Link></li>
              <li><Link href="/services/ai-automation" className="text-neutral-400 hover:text-white transition-colors">AI Automation</Link></li>
              <li><Link href="/services/china-sourcing" className="text-neutral-400 hover:text-white transition-colors">China Sourcing</Link></li>
            </ul>
          </div>

          {/* Column 2: Terms & Conditions for Digital Marketing Agency */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Terms & Conditions</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/terms" className="text-neutral-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="text-neutral-400 hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="/refund-policy" className="text-neutral-400 hover:text-white transition-colors">Refund & Cancellation Policy</Link></li>
              <li><Link href="/client-agreement" className="text-neutral-400 hover:text-white transition-colors">Client Service Agreement</Link></li>
              <li><Link href="/disclaimer" className="text-neutral-400 hover:text-white transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Column 3: Company (Unchanged) */}
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
