const testimonials = [
  {
    stars: 5,
    text: "Digital World doubled our organic traffic in just 4 months. The SEO strategy was precisely tailored to our e-commerce niche — best investment we've made.",
    author: "Sarah M.",
    flag: "🇺🇸",
    location: "New York, USA · E-Commerce Store",
  },
  {
    stars: 5,
    text: "Our Shopify store was completely rebuilt. The design is stunning, loads in under 2 seconds, and conversions went up 180% within 60 days. Incredible work.",
    author: "James T.",
    flag: "🇬🇧",
    location: "London, UK · Retail Brand",
  },
  {
    stars: 5,
    text: "From branding to social media advertising — everything was handled professionally and on time. We feel like a true global brand now. Highly recommended.",
    author: "Rafi K.",
    flag: "🇧🇩",
    location: "Dhaka, Bangladesh · Travel Agency",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#0a0a0a] py-24 px-6">
      <div className="max-w-[1120px] mx-auto">
        <div className="text-center max-w-[620px] mx-auto">
          <span className="reveal text-[11px] font-semibold text-[#39f] tracking-[0.1em] uppercase mb-3.5 block">
            Client Stories
          </span>
          <h2
            className="reveal font-[var(--font-display)] text-white leading-[1.06] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            Trusted by businesses
            <br />
            around the world.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-14">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`reveal ${
                i > 0 ? `reveal-delay-${i}` : ""
              } bg-white/[0.04] border border-white/[0.08] rounded-[var(--radius-card)] p-8 hover:bg-white/[0.07] hover:-translate-y-1 transition-all duration-[250ms]`}
            >
              {/* Stars */}
              <div className="text-[var(--color-amber)] text-[13px] mb-3.5 tracking-[2px]">
                {"★".repeat(t.stars)}
              </div>

              {/* Quote */}
              <p className="text-[15px] text-white/65 leading-[1.7] mb-5 italic">
                <span className="font-[var(--font-display)] text-[48px] text-[#39f] leading-[0.4] align-[-0.4em] mr-1 not-italic">
                  &ldquo;
                </span>
                {t.text}
              </p>

              {/* Author */}
              <div className="text-sm font-semibold text-white">{t.author}</div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[18px]">{t.flag}</span>
                <span className="text-xs text-white/60">{t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
