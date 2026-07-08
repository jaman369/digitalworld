"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="min-h-[50vh] bg-black flex items-center justify-center text-center relative overflow-hidden pt-[52px]">
        <div className="absolute inset-0">
          <div className="absolute w-[500px] h-[500px] rounded-full -top-[100px] -right-[100px]" style={{ background: "radial-gradient(circle, rgba(0,113,227,0.35) 0%, transparent 70%)", filter: "blur(90px)" }} />
          <div className="absolute w-[400px] h-[400px] rounded-full bottom-0 left-[10%]" style={{ background: "radial-gradient(circle, rgba(52,199,89,0.2) 0%, transparent 70%)", filter: "blur(90px)" }} />
          <div className="grain" />
        </div>
        <div className="relative z-[2] max-w-[700px] px-6 py-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-white/50 tracking-[0.1em] uppercase mb-6 px-3.5 py-1.5 border border-white/[0.12] rounded-full bg-white/[0.04]">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] shadow-[0_0_8px_var(--color-green)]" />
            Contact Us
          </span>
          <h1 className="font-[var(--font-display)] text-white mb-4 tracking-[-0.02em] leading-[1.06]" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            Let&apos;s start something great.
          </h1>
          <p className="text-lg font-light text-white/45 max-w-[520px] mx-auto leading-[1.65]">
            Book a free 30-minute strategy call or send us a message. We respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="bg-[#f5f5f7] py-24 px-6">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="font-[var(--font-display)] text-[#1d1d1f] text-2xl mb-6">Send a Message</h2>
            {submitted ? (
              <div className="bg-white rounded-[20px] p-10 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">Message Sent!</h3>
                <p className="text-[var(--color-gray)]">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-[20px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-gray)] mb-1.5 uppercase tracking-[0.05em]">Name</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl border border-[#e0e0e5] text-sm text-[#1d1d1f] focus:outline-none focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20 transition-all" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-gray)] mb-1.5 uppercase tracking-[0.05em]">Email</label>
                    <input type="email" required className="w-full px-4 py-3 rounded-xl border border-[#e0e0e5] text-sm text-[#1d1d1f] focus:outline-none focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20 transition-all" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-medium text-[var(--color-gray)] mb-1.5 uppercase tracking-[0.05em]">Service Interested In</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-[#e0e0e5] text-sm text-[#1d1d1f] focus:outline-none focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20 transition-all bg-white">
                    <option>SEO Services</option>
                    <option>Web Design & Development</option>
                    <option>PPC / Paid Advertising</option>
                    <option>Content Marketing</option>
                    <option>Full-Service Package</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-medium text-[var(--color-gray)] mb-1.5 uppercase tracking-[0.05em]">Budget Range</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-[#e0e0e5] text-sm text-[#1d1d1f] focus:outline-none focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20 transition-all bg-white">
                    <option>Under $500/mo</option>
                    <option>$500 - $1,000/mo</option>
                    <option>$1,000 - $3,000/mo</option>
                    <option>$3,000+/mo</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-xs font-medium text-[var(--color-gray)] mb-1.5 uppercase tracking-[0.05em]">Message</label>
                  <textarea required rows={5} className="w-full px-4 py-3 rounded-xl border border-[#e0e0e5] text-sm text-[#1d1d1f] focus:outline-none focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20 transition-all resize-none" placeholder="Tell us about your project..." />
                </div>
                <button type="submit" className="w-full bg-[var(--color-blue)] text-white text-[15px] font-medium py-3.5 rounded-full hover:bg-[var(--color-blue-hover)] hover:shadow-[0_8px_30px_rgba(0,113,227,0.4)] transition-all duration-200">
                  Send Message →
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h2 className="font-[var(--font-display)] text-[#1d1d1f] text-2xl mb-6">Get in Touch</h2>
            <div className="space-y-6">
              {[
                { emoji: "📧", label: "Email", value: "kj.jaman369@gmail.com", href: "mailto:kj.jaman369@gmail.com" },
                { emoji: "📱", label: "WhatsApp", value: "+880 1798-667820", href: "https://wa.me/8801798667820" },
                { emoji: "📞", label: "Phone", value: "+880 1798-667820", href: "tel:+8801798667820" },
                { emoji: "📍", label: "Location", value: "Dhaka, Bangladesh", href: "#" },
              ].map((item) => (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-200">
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <div className="text-xs font-medium text-[var(--color-gray)] uppercase tracking-[0.05em] mb-1">{item.label}</div>
                    <div className="text-sm font-medium text-[#1d1d1f]">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-[var(--color-blue)] to-[#0058b8] rounded-2xl text-white">
              <div className="text-lg font-semibold mb-2">📅 Free Consultation</div>
              <p className="text-sm text-white/80 leading-relaxed mb-4">Book a free 30-minute strategy call. No obligation, no sales pitch.</p>
              <a href="https://wa.me/8801798667820?text=Hi%20KJ%20Digital%20World%2C%20I%20want%20to%20book%20a%20free%20consultation" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-[var(--color-blue)] text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors">
                Book Now →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
