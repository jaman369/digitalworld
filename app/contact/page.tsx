"use client";

import { useState } from "react";
import * as Icons from "lucide-react";
import { faqData } from "@/data/faq";

export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    service: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    "Search Engine Optimization (SEO)",
    "PPC / Paid Ads",
    "Web Design & Development",
    "Content & Marketing",
    "AI Automation",
    "China Sourcing Services"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors(null);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setFormErrors("Full Name is required.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setFormErrors("Please enter a valid email address.");
      return;
    }
    if (!formData.service) {
      setFormErrors("Please select a growth service area.");
      return;
    }
    if (!formData.message.trim()) {
      setFormErrors("Please write a short message detailing your goals.");
      return;
    }

    // Success State
    setIsSubmitted(true);
    setFormData({ name: "", email: "", website: "", service: "", message: "" });
  };

  return (
    <article className="min-h-screen bg-white py-20 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,118,255,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-6">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6">
            Let&apos;s build something great
          </h1>
          <p className="font-sans text-base sm:text-lg text-neutral-500 leading-relaxed">
            Submit your goals below and we will reach out within 24 hours to schedule your strategy consultation.
          </p>
        </div>

        {/* Form + FAQ Split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: FAQ Accordion */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-2">
              Frequently Asked Questions
            </h2>
            
            <div className="flex flex-col gap-4">
              {faqData.map((faq) => {
                const isOpen = activeFaq === faq.id;
                
                return (
                  <div
                    key={faq.id}
                    className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm transition-colors duration-200"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                      className="flex w-full items-center justify-between p-6 font-sans font-bold text-sm text-neutral-900 text-left outline-none"
                    >
                      {faq.question}
                      <Icons.ChevronDown className={`h-4 w-4 text-neutral-400 transition-transform duration-200 shrink-0 ml-3 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    {isOpen && (
                      <div className="px-6 pb-6 font-sans text-sm text-neutral-500 leading-relaxed border-t border-neutral-100 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 lg:p-12 shadow-premium">
              {isSubmitted ? (
                // Success Confirmation
                <div className="text-center py-12 flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 mb-6 shadow-sm">
                    <Icons.Check className="h-8 w-8" />
                  </div>
                  <h3 className="font-sans font-bold text-xl text-neutral-900 mb-3">
                    Strategy Request Submitted!
                  </h3>
                  <p className="font-sans text-sm text-neutral-500 leading-relaxed max-w-sm">
                    Thank you. We have logged your request. Kamrujjaman Mufti will contact you directly within 24 hours to schedule our call.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1"
                  >
                    Submit another request <Icons.RefreshCw className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                // Interactive Form
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {formErrors && (
                    <div className="flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-100 p-4 text-xs font-semibold text-rose-600">
                      <Icons.AlertTriangle className="h-4 w-4 shrink-0" />
                      <span>{formErrors}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="font-sans text-xs font-bold text-neutral-700 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="font-sans text-xs font-bold text-neutral-700 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Website */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="website" className="font-sans text-xs font-bold text-neutral-700 uppercase tracking-wider">
                        Business Website
                      </label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="example.com"
                        className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>

                    {/* Service */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="service" className="font-sans text-xs font-bold text-neutral-700 uppercase tracking-wider">
                        Growth Service *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-primary focus:bg-white transition-all"
                      >
                        <option value="">Select Service</option>
                        {services.map((svc) => (
                          <option key={svc} value={svc}>
                            {svc}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-sans text-xs font-bold text-neutral-700 uppercase tracking-wider">
                      Tell us about your goals *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="Detail your search, paid campaign, or custom development requirements..."
                      className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-primary focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-8 py-4 font-sans text-sm font-bold text-white shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] mt-2"
                  >
                    Submit Strategy Request <Icons.ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </article>
  );
}
