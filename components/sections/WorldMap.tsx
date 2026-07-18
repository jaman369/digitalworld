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

        {/* Map SVG Landmass Paths */}
        <svg 
          viewBox="0 0 1000 500" 
          className="absolute inset-0 w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.06)]"
        >
          {/* North America */}
          <path
            d="M 120,60 L 150,50 170,55 190,80 180,120 120,150 90,130 80,90 Z"
            fill="#2C5E6B"
            opacity="0.9"
          />
          <path
            d="M 190,120 L 220,140 230,190 200,240 150,230 140,180 170,140 Z"
            fill="#2C5E6B"
            opacity="0.95"
          />
          {/* Central America bridge */}
          <path
            d="M 200,240 L 220,260 230,290 220,295 210,280 Z"
            fill="#2C5E6B"
            opacity="0.85"
          />
          
          {/* Greenland */}
          <path
            d="M 260,30 L 290,40 310,80 280,110 250,90 245,50 Z"
            fill="#598495"
            opacity="0.8"
          />

          {/* South America */}
          <path
            d="M 230,290 L 260,310 290,340 310,380 290,450 270,480 260,470 250,420 220,340 225,300 Z"
            fill="#C4924A"
            opacity="0.9"
          />

          {/* Europe */}
          <path
            d="M 450,110 L 480,120 510,130 520,160 480,180 440,165 435,130 Z"
            fill="#457283"
            opacity="0.95"
          />
          {/* UK & Ireland Isles */}
          <path
            d="M 440,120 A 8 8 0 1 1 440,136 A 8 8 0 1 1 440,120 Z"
            fill="#457283"
            opacity="0.9"
          />

          {/* Africa */}
          <path
            d="M 460,220 L 510,210 550,235 560,270 540,320 525,380 500,370 480,310 450,260 Z"
            fill="#DCA852"
            opacity="0.92"
          />
          {/* Madagascar */}
          <path
            d="M 555,340 L 565,345 560,370 550,365 Z"
            fill="#DCA852"
            opacity="0.85"
          />

          {/* Asia / Eurasia East */}
          <path
            d="M 510,130 L 600,100 700,120 800,150 820,180 780,240 760,270 730,290 680,270 630,250 560,240 540,210 520,160 Z"
            fill="#1E424D"
            opacity="0.95"
          />
          {/* India segment */}
          <path
            d="M 620,245 L 650,250 645,280 630,295 620,280 Z"
            fill="#1E424D"
            opacity="0.9"
          />
          {/* Japan */}
          <path
            d="M 830,170 Q 845,190 840,210"
            stroke="#1E424D"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Indonesia / SE Asia */}
          <path
            d="M 720,300 L 750,315 780,310 790,330 760,340 730,320 Z"
            fill="#1E424D"
            opacity="0.88"
          />

          {/* Australia */}
          <path
            d="M 800,350 L 850,345 880,370 870,410 820,420 790,390 Z"
            fill="#E6C58B"
            opacity="0.95"
          />
          {/* New Zealand */}
          <path
            d="M 890,420 L 900,435 M 900,440 L 910,460"
            stroke="#E6C58B"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

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
        {hoveredCountry && (() => {
          const isTopHalf = parseFloat(hoveredCountry.y) < 35;
          return (
            <div 
              className="absolute z-30 pointer-events-none bg-white border border-neutral-100/80 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-4 flex items-center gap-3.5 transition-all duration-300 -translate-x-1/2"
              style={{ 
                left: hoveredCountry.x, 
                top: isTopHalf ? `calc(${hoveredCountry.y} + 20px)` : `calc(${hoveredCountry.y} - 72px)` 
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
              {isTopHalf ? (
                <div className="absolute top-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-neutral-100/80 rotate-45" />
              ) : (
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-neutral-100/80 rotate-45" />
              )}
            </div>
          );
        })()}
      </div>

      {/* Decorative Wooden Board Wall Mounts */}
      <div className="absolute left-6 top-6 h-3 w-3 rounded-full bg-neutral-200 border border-white shadow-inner pointer-events-none" />
      <div className="absolute right-6 top-6 h-3 w-3 rounded-full bg-neutral-200 border border-white shadow-inner pointer-events-none" />
      <div className="absolute left-6 bottom-6 h-3 w-3 rounded-full bg-neutral-200 border border-white shadow-inner pointer-events-none" />
      <div className="absolute right-6 bottom-6 h-3 w-3 rounded-full bg-neutral-200 border border-white shadow-inner pointer-events-none" />
    </div>
  );
}
