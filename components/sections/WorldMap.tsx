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
    { id: "bd", name: "Bangladesh", specialty: "KJ Headquarters / Main Base", flagPath: "/Flag emoji/Bangladesh.svg", x: "74%", y: "53%", pulseColor: "bg-emerald-500 ring-emerald-400" },
    { id: "us", name: "United States", specialty: "SEO & Google Ads Clients", flagPath: "/Flag emoji/United States.svg", x: "19%", y: "45%", pulseColor: "bg-blue-500 ring-blue-400" },
    { id: "ca", name: "Canada", specialty: "Local SEO & E-Commerce", flagPath: "/Flag emoji/Canada.svg", x: "16%", y: "29%", pulseColor: "bg-blue-500 ring-blue-400" },
    { id: "uk", name: "United Kingdom", specialty: "Web Dev & Organic Growth", flagPath: "/Flag emoji/United Kingdom.svg", x: "52%", y: "22%", pulseColor: "bg-blue-500 ring-blue-400" },
    { id: "ie", name: "Ireland", specialty: "PPC & Technical SEO", flagPath: "/Flag emoji/Ireland.svg", x: "50%", y: "23%", pulseColor: "bg-blue-500 ring-blue-400" },
    { id: "de", name: "Germany", specialty: "Headless CMS Solutions", flagPath: "/Flag emoji/Germany.svg", x: "55%", y: "27%", pulseColor: "bg-blue-500 ring-blue-400" },
    { id: "nl", name: "Netherlands", specialty: "Shopify Dev & Marketing", flagPath: "/Flag emoji/Netherlands.svg", x: "54%", y: "26%", pulseColor: "bg-blue-500 ring-blue-400" },
    { id: "ae", name: "United Arab Emirates", specialty: "AI Lead Automation Clients", flagPath: "/Flag emoji/UAE.svg", x: "62%", y: "46%", pulseColor: "bg-blue-500 ring-blue-400" },
    { id: "za", name: "South Africa", specialty: "Sourcing & Logistics Partnerships", flagPath: "/Flag emoji/South Africa.svg", x: "58%", y: "79%", pulseColor: "bg-blue-500 ring-blue-400" },
    { id: "au", name: "Australia", specialty: "Paid Bidding Campaigns", flagPath: "/Flag emoji/Australia.svg", x: "89%", y: "80%", pulseColor: "bg-blue-500 ring-blue-400" },
    { id: "nz", name: "New Zealand", specialty: "Local Business Growth", flagPath: "/Flag emoji/New Zealand.svg", x: "95%", y: "89%", pulseColor: "bg-blue-500 ring-blue-400" },
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
      <div className="relative w-full aspect-[960/638] border border-neutral-100/50 rounded-2xl overflow-hidden shadow-md select-none bg-neutral-100">
        
        {/* Main background image - The actual wooden world map! */}
        <Image 
          src="/All Service Images/wooden-world-map.jpg"
          fill
          className="object-cover rounded-2xl"
          alt="Wooden World Map"
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
