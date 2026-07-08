const whyCards = [
  {
    emoji: "🏆",
    title: "5 Years of Real Experience",
    desc: "Half a decade of hands-on work across every digital discipline — SEO, paid ads, web development, content marketing, email, CRO, and backlink building.",
  },
  {
    emoji: "🌏",
    title: "Global Reach, Competitive Rates",
    desc: "Serving clients across 11 countries — USA, UK, Canada, Australia, UAE, Ireland, Germany & more — with international-standard work at highly competitive pricing.",
  },
  {
    emoji: "📊",
    title: "Data-Driven Only",
    desc: "Every strategy is built on real analytics, competitor data, and performance tracking. No guesswork — just measurable ROI and transparent monthly reporting.",
  },
  {
    emoji: "⚡",
    title: "Fast Turnaround",
    desc: "Agile working style with clear project timelines. Deliverables on time, every time — and direct communication with the expert, not a junior account manager.",
  },
  {
    emoji: "🤝",
    title: "Full-Service Solution",
    desc: "From web design to SEO to paid ads to email — everything under one roof. No agency handoffs, no coordination overhead, no surprise invoices.",
  },
  {
    emoji: "💬",
    title: "Always Available",
    desc: "Time-zone-friendly communication for all 11 markets we serve. Reach us via Email, WhatsApp, or LinkedIn — responses within hours, every time.",
  },
];

export default function WhySection() {
  return (
    <section className="bg-[#f5f5f7] py-24 px-6">
      <div className="max-w-[1120px] mx-auto">
        <div className="text-center max-w-[620px] mx-auto">
          <span className="reveal text-[11px] font-semibold text-[#39f] tracking-[0.1em] uppercase mb-3.5 block">
            Why Digital World
          </span>
          <h2
            className="reveal font-[var(--font-display)] text-[#1d1d1f] leading-[1.06] mb-4 tracking-[-0.02em]"
            style={{ fontSize: "clamp(34px, 4.5vw, 58px)" }}
          >
            Why businesses choose us.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-14">
          {whyCards.map((card, i) => (
            <div
              key={i}
              className={`reveal ${
                i > 0 ? `reveal-delay-${Math.min(i, 3)}` : ""
              } bg-white rounded-[var(--radius-card)] p-9 hover:-translate-y-[5px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-[250ms]`}
            >
              <span className="text-[34px] mb-[18px] block">{card.emoji}</span>
              <div className="text-[17px] font-semibold text-[#1d1d1f] mb-2.5">{card.title}</div>
              <div className="text-sm text-[var(--color-gray)] leading-[1.65]">{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
