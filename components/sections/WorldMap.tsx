"use client";

import { useState } from "react";
import Image from "next/image";

interface CountryMarker {
  id: string;
  name: string;
  specialty: string;
  flagPath: string;
  x: string; // percentage from left
  y: string; // percentage from top
  pulseColor: string;
}

export default function WorldMap() {
  const [hoveredCountry, setHoveredCountry] = useState<CountryMarker | null>(null);

  const countries: CountryMarker[] = [
    { id: "bd", name: "Bangladesh", specialty: " KJ Headquarters / Main Base", flagPath: "/Flag emoji/Bangladesh.svg", x: "68%", y: "45%", pulseColor: "bg-emerald-500 ring-emerald-400" },
    { id: "us", name: "United States", specialty: "SEO & Google Ads Clients", flagPath: "/Flag emoji/United States.svg", x: "20%", y: "34%", pulseColor: "bg-blue-500 ring-blue-400" },
    { id: "ca", name: "Canada", specialty: "Local SEO & E-Commerce", flagPath: "/Flag emoji/Canada.svg", x: "18%", y: "24%", pulseColor: "bg-blue-500 ring-blue-400" },
    { id: "uk", name: "United Kingdom", specialty: "Web Dev & Organic Growth", flagPath: "/Flag emoji/United Kingdom.svg", x: "46%", y: "24%", pulseColor: "bg-blue-500 ring-blue-400" },
    { id: "ie", name: "Ireland", specialty: "PPC & Technical SEO", flagPath: "/Flag emoji/Ireland.svg", x: "43%", y: "25%", pulseColor: "bg-blue-500 ring-blue-400" },
    { id: "de", name: "Germany", specialty: "Headless CMS Solutions", flagPath: "/Flag emoji/Germany.svg", x: "49%", y: "24%", pulseColor: "bg-blue-500 ring-blue-400" },
    { id: "nl", name: "Netherlands", specialty: "Shopify Dev & Marketing", flagPath: "/Flag emoji/Netherlands.svg", x: "48%", y: "23%", pulseColor: "bg-blue-500 ring-blue-400" },
    { id: "ae", name: "United Arab Emirates", specialty: "AI Lead Automation Clients", flagPath: "/Flag emoji/UAE.svg", x: "58%", y: "42%", pulseColor: "bg-blue-500 ring-blue-400" },
    { id: "za", name: "South Africa", specialty: "Sourcing & Logistics Partnerships", flagPath: "/Flag emoji/South Africa.svg", x: "53%", y: "73%", pulseColor: "bg-blue-500 ring-blue-400" },
    { id: "au", name: "Australia", specialty: "Paid Bidding Campaigns", flagPath: "/Flag emoji/Australia.svg", x: "84%", y: "76%", pulseColor: "bg-blue-500 ring-blue-400" },
    { id: "nz", name: "New Zealand", specialty: "Local Business Growth", flagPath: "/Flag emoji/New Zealand.svg", x: "89%", y: "83%", pulseColor: "bg-blue-500 ring-blue-400" },
  ];

  return (
    <div className="w-full bg-white border border-neutral-100 rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.03)] p-6 sm:p-10 relative overflow-hidden flex flex-col items-center">
      {/* Title */}
      <div className="text-center mb-8 relative z-10">
        <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2 inline-block">
          GLOBAL REACH
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900">
          Serving Clients Globally
        </h3>
        <p className="font-sans text-xs text-neutral-400 max-w-md mx-auto mt-2">
          Hover over the glowing pins to see our operational hubs and client regions.
        </p>
      </div>

      {/* Styled 3D-Look World Map Canvas */}
      <div className="relative w-full aspect-[2/1] border border-neutral-100/50 rounded-2xl bg-slate-50/70 overflow-hidden shadow-inner select-none">
        
        {/* Lat/Long Grid Overlay Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.25] flex flex-col justify-between py-6">
          <div className="h-px bg-slate-300 w-full" />
          <div className="h-px bg-slate-300 w-full" />
          <div className="h-px bg-slate-300 w-full" />
          <div className="h-px bg-slate-300 w-full" />
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.25] flex justify-between px-10">
          <div className="w-px bg-slate-300 h-full" />
          <div className="w-px bg-slate-300 h-full" />
          <div className="w-px bg-slate-300 h-full" />
          <div className="w-px bg-slate-300 h-full" />
        </div>

        {/* Compass Graphic (Atlantic Ocean space) */}
        <div className="absolute left-[34%] top-[45%] pointer-events-none w-16 h-16 opacity-30 select-none animate-[spin_60s_linear_infinite]">
          <svg viewBox="0 0 100 100" fill="none" className="text-slate-400 stroke-current stroke-1">
            <circle cx="50" cy="50" r="45" />
            <circle cx="50" cy="50" r="42" strokeDasharray="3 3" />
            <path d="M 50,5 L 50,95 M 5,50 L 95,50" />
            <path d="M 50,20 L 53,47 50,50 Z" fill="currentColor" />
            <path d="M 50,80 L 47,53 50,50 Z" fill="currentColor" opacity="0.6" />
            <path d="M 20,50 L 47,47 50,50 Z" fill="currentColor" />
            <path d="M 80,50 L 53,53 50,50 Z" fill="currentColor" opacity="0.6" />
          </svg>
        </div>

        {/* World Map Image Background */}
        <Image
          src="/world-map.png"
          alt="World Map"
          fill
          className="object-cover pointer-events-none select-none"
          priority
        />

        {/* Glowing Interactive Pulse Pins */}
        {countries.map((country) => (
          <div
            key={country.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
            style={{ left: country.x, top: country.y }}
            onMouseEnter={() => setHoveredCountry(country)}
            onMouseLeave={() => setHoveredCountry(null)}
          >
            {/* Double radar pulse wave */}
            <span className="absolute inline-flex h-6 w-6 rounded-full opacity-60 animate-ping -left-1.5 -top-1.5 pointer-events-none">
              <span className={`h-full w-full rounded-full ${country.id === "bd" ? "bg-emerald-400" : "bg-blue-400"}`} />
            </span>
            <span className="absolute inline-flex h-10 w-10 rounded-full opacity-35 animate-[ping_2s_infinite] -left-3.5 -top-3.5 pointer-events-none">
              <span className={`h-full w-full rounded-full ${country.id === "bd" ? "bg-emerald-400" : "bg-blue-400"}`} />
            </span>

            {/* Visual pin button */}
            <div className={`relative flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white shadow-md ${country.pulseColor} transform transition-transform duration-300 group-hover:scale-125`}>
              <div className="h-1 w-1 rounded-full bg-white" />
            </div>
          </div>
        ))}

        {/* Dynamic Float Tooltip Card */}
        {hoveredCountry && (
          <div 
            className="absolute z-30 pointer-events-none bg-white border border-neutral-100/80 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-4 flex items-center gap-3.5 transition-all duration-300 -translate-x-1/2"
            style={{ 
              left: hoveredCountry.x, 
              top: `calc(${hoveredCountry.y} - 72px)` 
            }}
          >
            {/* Flag container */}
            <div className="relative w-9 h-6 rounded border border-neutral-100 shadow-sm overflow-hidden shrink-0">
              <Image
                src={hoveredCountry.flagPath}
                alt={hoveredCountry.name}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Meta details */}
            <div className="min-w-[140px]">
              <span className="block text-[10px] font-bold text-primary uppercase tracking-widest leading-none mb-1">
                {hoveredCountry.id === "bd" ? "KJ HEADQUARTERS" : "SERVED COUNTRY"}
              </span>
              <h5 className="font-sans font-bold text-xs text-neutral-800 leading-tight">
                {hoveredCountry.name}
              </h5>
              <p className="font-sans text-[9px] text-neutral-400 leading-normal mt-0.5">
                {hoveredCountry.specialty}
              </p>
            </div>

            {/* Anchor pointing arrow */}
            <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-neutral-100/80 rotate-45" />
          </div>
        )}
      </div>

      {/* Decorative Wooden Board Wall Mounts */}
      <div className="absolute left-6 top-6 h-3 w-3 rounded-full bg-neutral-200 border border-white shadow-inner pointer-events-none" />
      <div className="absolute right-6 top-6 h-3 w-3 rounded-full bg-neutral-200 border border-white shadow-inner pointer-events-none" />
      <div className="absolute left-6 bottom-6 h-3 w-3 rounded-full bg-neutral-200 border border-white shadow-inner pointer-events-none" />
      <div className="absolute right-6 bottom-6 h-3 w-3 rounded-full bg-neutral-200 border border-white shadow-inner pointer-events-none" />
    </div>
  );
}
