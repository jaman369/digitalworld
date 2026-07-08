const countries = [
  { name: "United States", sub: "SEO · PPC · Web", code: "us" },
  { name: "United Kingdom", sub: "SEO · Shopify · Ads", code: "gb" },
  { name: "Canada", sub: "SEO · Content · Web", code: "ca" },
  { name: "Australia", sub: "SEO · PPC · Shopify", code: "au" },
  { name: "UAE", sub: "SEO · Web · Ads", code: "ae" },
  { name: "Ireland", sub: "SEO · WordPress · Ads", code: "ie" },
  { name: "Germany", sub: "SEO · PPC", code: "de" },
  { name: "South Africa", sub: "SEO · Web", code: "za" },
  { name: "Netherlands", sub: "SEO · Content", code: "nl" },
  { name: "Bangladesh", sub: "Full-Service", code: "bd" },
];

const industries = [
  { emoji: "🛒", name: "E-commerce", sub: "Shopify, WooCommerce" },
  { emoji: "💻", name: "SaaS & Tech", sub: "B2B & B2C products" },
  { emoji: "🏠", name: "Real Estate", sub: "Local & national" },
  { emoji: "⚕️", name: "Healthcare", sub: "Clinics & practitioners" },
  { emoji: "📚", name: "Education", sub: "Online courses & schools" },
  { emoji: "✈️", name: "Travel & Tourism", sub: "Hotels & agencies" },
  { emoji: "🍽️", name: "Food & Restaurant", sub: "Local businesses" },
  { emoji: "⚖️", name: "Legal & Finance", sub: "Law firms & fintech" },
];

export default function ClientsSection() {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-[1120px] mx-auto">
        {/* Intro */}
        <div className="text-center max-w-[620px] mx-auto mb-14">
          <span className="reveal text-[11px] font-semibold text-[#39f] tracking-[0.1em] uppercase mb-3.5 block">
            Our Clients
          </span>
          <h2
            className="reveal font-[var(--font-display)] text-white leading-[1.06] mb-4 tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            Trusted by businesses
            <br />
            across{" "}
            <em
              className="italic bg-clip-text text-transparent"
              style={{ background: "linear-gradient(135deg, #0071e3, #34c759)", WebkitBackgroundClip: "text" }}
            >
              11 countries.
            </em>
          </h2>
          <p className="reveal text-[17px] font-light text-white/[0.42] leading-[1.7] mx-auto text-center">
            From solo e-commerce brands to growing agencies — our clients span 4 continents and the most competitive digital markets in the world.
          </p>
        </div>

        {/* Country Grid */}
        <div className="reveal grid grid-cols-5 gap-px bg-white/[0.06] rounded-[var(--radius-card)] overflow-hidden mb-12 max-md:grid-cols-3 max-sm:grid-cols-2">
          {countries.map((country) => (
            <div
              key={country.code}
              className="bg-[#0a0a0a] p-7 max-sm:p-5 flex flex-col items-center justify-start text-center hover:bg-white/[0.04] transition-colors duration-[250ms] cursor-default min-h-[140px]"
            >
              <div className="flex items-center justify-center mb-2.5">
                <img
                  src={`https://flagcdn.com/w40/${country.code}.png`}
                  alt={country.name}
                  className="w-12 h-9 max-sm:w-10 max-sm:h-[30px] object-contain"
                  style={{ filter: "saturate(1.08)" }}
                  loading="lazy"
                />
              </div>
              <div className="text-[13px] font-semibold text-white/75 mb-[2px]">{country.name}</div>
              <div className="text-[11px] text-white/55">{country.sub}</div>
            </div>
          ))}
        </div>

        {/* Industry Cards */}
        <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="bg-white/[0.04] border border-white/[0.07] rounded-2xl px-5 py-[22px] flex items-center gap-3.5 hover:bg-white/[0.07] hover:border-white/[0.12] hover:-translate-y-[3px] transition-all duration-[250ms]"
            >
              <span className="text-[22px] shrink-0">{ind.emoji}</span>
              <div>
                <div className="text-[13px] font-semibold text-white">{ind.name}</div>
                <div className="text-[11px] text-white/60 mt-[2px]">{ind.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
