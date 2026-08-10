"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import * as Icons from "lucide-react";
import { countriesData } from "@/data/countries";

export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedBudget, setSelectedBudget] = useState("Under $300");
  const [settings, setSettings] = useState({
    email: "kj.jaman369@gmail.com",
    phone: "+880 1798-667820",
    facebookUrl: "https://www.facebook.com/digitalworld1988",
    linkedinUrl: "https://www.linkedin.com/in/kamrujjaman-mufti/",
  });

  const [faqs, setFaqs] = useState<{ id: string; question: string; answer: string; category?: string }[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [settRes, faqRes] = await Promise.all([
          fetch("/api/settings"),
          fetch("/api/faq")
        ]);
        if (settRes.ok) {
          const data = await settRes.json();
          setSettings(data);
        }
        if (faqRes.ok) {
          const faqData = await faqRes.json();
          if (Array.isArray(faqData) && faqData.length > 0) {
            setFaqs(faqData);
          }
        }
      } catch (err) {
        console.error("Load settings/faq failed:", err);
      }
    }
    loadData();
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    service: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    "Search Engine Optimization (SEO)",
    "PPC / Paid Ads",
    "Web Design & Development",
    "Content & Marketing",
    "AI Automation",
    "China Sourcing Services"
  ];

  const budgetOptions = [
    "Under $300",
    "$300 - $800",
    "$800 - $1,200",
    "$1,200+",
    "Let's discuss"
  ];

  const contactFaq = [
    {
      id: "cfaq-1",
      question: "Do you work with clients outside Bangladesh?",
      answer: "Yes, absolutely. We work with clients globally (USA, UK, Canada, Australia, Europe, etc.). We operate remote-first, utilizing Slack, email, and Zoom to ensure seamless communication regardless of your timezone."
    },
    {
      id: "cfaq-2",
      question: "How long does it take to see SEO results?",
      answer: "Typically, you will start seeing initial ranking movements and traffic improvements within 3 to 6 months. SEO is a compounding long-term strategy that delivers sustainable organic growth over time."
    },
    {
      id: "cfaq-3",
      question: "What is your pricing structure?",
      answer: "Our pricing is project-based and tailored to your specific goals and requirements. We offer monthly packages for retainer services (like SEO and PPC) and flat-rate pricing for development projects."
    },
    {
      id: "cfaq-4",
      question: "Do you offer a free consultation?",
      answer: "Yes, we offer a free 30-minute strategy consultation call to discuss your project, evaluate your current digital footprint, and align on how we can help you grow."
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors(null);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setFormErrors("Your Name is required.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setFormErrors("Please enter a valid email address.");
      return;
    }
    if (!formData.service) {
      setFormErrors("Please select a service needed.");
      return;
    }
    if (!formData.message.trim()) {
      setFormErrors("Please tell us about your project.");
      return;
    }

    setIsSubmitting(true);
    setFormErrors(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "2d1618ee-8005-4f28-be70-4ac818899c24",
          name: formData.name,
          email: formData.email,
          company: formData.company || "N/A",
          country: formData.country || "N/A",
          service: formData.service,
          budget: selectedBudget,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Capture dynamically in database
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            country: formData.country,
            service: formData.service,
            budget: selectedBudget,
            message: formData.message,
            formType: "CONTACT",
          }),
        }).catch((e) => console.error("Database save failed:", e));

        setIsSubmitted(true);
        setFormData({ name: "", email: "", company: "", country: "", service: "", message: "" });
        setSelectedBudget("Under $300");
      } else {
        setFormErrors(result.message || "Failed to send message. Please try again.");
      }
    } catch {
      setFormErrors("A network error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="min-h-screen bg-transparent">
      {/* Background glow overlay */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,118,255,0.03)_0%,transparent_60%)] pointer-events-none" />

      {/* Hero Section */}
      <section className="pt-24 pb-14 sm:pt-32 sm:pb-20 text-center max-w-4xl mx-auto px-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100/50 px-4 py-1 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Available for new projects
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-6">
          Let&apos;s build <br className="sm:hidden" />
          <span className="text-primary italic font-serif">something great.</span>
        </h1>
        <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed max-w-2xl mx-auto">
          Tell us about your project. Kamrujjaman will get back to you personally within 24 hours with honest advice and a clear next step — no sales pitch, no automated replies.
        </p>
      </section>

      {/* Main Grid Content */}
      <section className="pb-24 lg:pb-32 container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form Card & Image 17 Showcase */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
            <div className="bg-white border border-neutral-100 rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.03)] p-8 lg:p-12">
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-2">
                Tell me about your project
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-400 mb-8 leading-relaxed">
                Fill in a few details and I&apos;ll come back to you with a personalised plan — usually within a few hours.
              </p>

              {isSubmitted ? (
                // Success Confirmation
                <div className="text-center py-16 flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 mb-6 shadow-sm">
                    <Icons.Check className="h-8 w-8" />
                  </div>
                  <h3 className="font-sans font-bold text-xl text-neutral-900 mb-3">
                    Message Sent Successfully!
                  </h3>
                  <p className="font-sans text-sm text-neutral-500 leading-relaxed max-w-sm">
                    Thank you. Your message has been received. Kamrujjaman Mufti will review it and reply to your email within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1"
                  >
                    Submit another inquiry <Icons.RefreshCw className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                // Contact Form
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {formErrors && (
                    <div className="flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-100 p-4 text-xs font-semibold text-rose-600">
                      <Icons.AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{formErrors}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="font-sans text-xs font-bold text-neutral-700 uppercase tracking-wider">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Smith"
                        className="rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-primary focus:bg-white transition-all font-sans"
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
                        placeholder="john@company.com"
                        className="rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-primary focus:bg-white transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Company */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="company" className="font-sans text-xs font-bold text-neutral-700 uppercase tracking-wider">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Acme Corp (optional)"
                        className="rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-primary focus:bg-white transition-all font-sans"
                      />
                    </div>

                    {/* Country */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="country" className="font-sans text-xs font-bold text-neutral-700 uppercase tracking-wider">
                        Your Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-primary focus:bg-white transition-all font-sans cursor-pointer"
                      >
                        <option value="">Select country...</option>
                        {countriesData.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Service */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="service" className="font-sans text-xs font-bold text-neutral-700 uppercase tracking-wider">
                      Service Needed *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-primary focus:bg-white transition-all font-sans cursor-pointer"
                    >
                      <option value="">Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget selector pills */}
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs font-bold text-neutral-700 uppercase tracking-wider">
                      Monthly Budget
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {budgetOptions.map((opt) => {
                        const isSelected = selectedBudget === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setSelectedBudget(opt)}
                            className={`px-4 py-2 text-xs font-bold rounded-full border transition-all ${
                              isSelected 
                                ? "bg-blue-50 text-primary border-primary shadow-sm" 
                                : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project details */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-sans text-xs font-bold text-neutral-700 uppercase tracking-wider">
                      Tell Me About Your Project *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="Describe your business, what you're trying to achieve, and any relevant details about your target audience or current challenges..."
                      className="rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-primary focus:bg-white transition-all font-sans resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover disabled:opacity-70 disabled:cursor-not-allowed px-8 py-4 font-sans text-xs font-bold text-white shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          Sending... <Icons.Loader2 className="h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          Send Message <Icons.ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    <span className="font-sans text-xs text-neutral-400">
                      I respond to every message personally within 24 hours.
                    </span>
                  </div>
                </form>
              )}
            </div>

            {/* Image 12 Team Showcase Feature Card (Large Top Image + Text Underneath) */}
            <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border border-neutral-100 rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.03)] p-6 sm:p-8 lg:p-10 flex flex-col gap-6 relative overflow-hidden group">
              
              {/* Large Prominent Image 12 Frame */}
              <div className="relative w-full h-[320px] sm:h-[400px] md:h-[440px] rounded-2xl overflow-hidden shadow-sm border border-neutral-100/80 bg-white p-3">
                <Image
                  src="/images/12.jpg"
                  alt="Digital World Expert Team"
                  fill
                  className="object-contain p-2 rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* Text Content Underneath */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
                    Our Expert Team
                  </span>
                </div>
                
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 leading-snug">
                  Driven by passion & real results.
                </h3>
                
                <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed">
                  A dedicated team of SEO specialists, PPC strategists, and web developers working together to scale your business globally.
                </p>
                
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs font-bold text-neutral-700">
                  <span className="flex items-center gap-1.5"><Icons.CheckCircle2 className="h-4 w-4 text-emerald-500" /> Dedicated Growth Team</span>
                  <span className="flex items-center gap-1.5"><Icons.CheckCircle2 className="h-4 w-4 text-emerald-500" /> 100% Client Focused</span>
                  <span className="flex items-center gap-1.5"><Icons.CheckCircle2 className="h-4 w-4 text-emerald-500" /> Transparent Reporting</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Widgets */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            
            {/* Widget 1: Map/Bangladesh Card */}
            <div className="bg-[#0F172A] rounded-[2rem] p-8 text-white shadow-lg relative overflow-hidden">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open to new projects
              </div>
              
              <h4 className="font-serif text-xl sm:text-2xl font-bold leading-tight mb-4">
                Based in Bangladesh. <br />Working worldwide.
              </h4>
              
              <p className="font-sans text-xs text-slate-400 leading-relaxed mb-6">
                Remote-first, communication-first. We work across time zones so you&apos;re never left waiting — responses within hours, not days.
              </p>
              
              {/* Flag badges grid */}
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "USA", flagPath: "/Flag emoji/United States.svg" },
                  { name: "UK", flagPath: "/Flag emoji/United Kingdom.svg" },
                  { name: "Canada", flagPath: "/Flag emoji/Canada.svg" },
                  { name: "Australia", flagPath: "/Flag emoji/Australia.svg" },
                  { name: "Ireland", flagPath: "/Flag emoji/Ireland.svg" },
                  { name: "UAE", flagPath: "/Flag emoji/UAE.svg" },
                  { name: "South Africa", flagPath: "/Flag emoji/South Africa.svg" },
                  { name: "Germany", flagPath: "/Flag emoji/Germany.svg" },
                  { name: "Netherlands", flagPath: "/Flag emoji/Netherlands.svg" },
                  { name: "New Zealand", flagPath: "/Flag emoji/New Zealand.svg" },
                  { name: "Bangladesh", flagPath: "/Flag emoji/Bangladesh.svg" }
                ].map((country) => (
                  <span 
                    key={country.name} 
                    className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700/50 text-slate-300 text-[10px] font-semibold px-2.5 py-1 rounded-full transition-colors"
                  >
                    <Image
                      src={country.flagPath}
                      alt={country.name}
                      width={14}
                      height={10}
                      className="rounded-sm object-cover"
                    />
                    {country.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Widget 2: Direct Contact Card */}
            <div className="bg-white border border-neutral-100 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.02)] p-6 lg:p-8">
              <h4 className="font-serif text-lg font-bold text-neutral-900 mb-6">
                Direct Contact
              </h4>
              <div className="flex flex-col gap-4">
                {[
                  { icon: Icons.Mail, label: "EMAIL", val: settings.email, href: `mailto:${settings.email}`, color: "bg-blue-50 text-blue-600" },
                  { icon: Icons.Phone, label: "WHATSAPP / PHONE", val: settings.phone, href: `tel:${settings.phone.replace(/\s+/g, '')}`, color: "bg-emerald-50 text-emerald-600" },
                  { icon: Icons.Linkedin, label: "LINKEDIN", val: "linkedin.com/in/kamrujjaman-mufti", href: settings.linkedinUrl, color: "bg-blue-50 text-blue-600" },
                  { icon: Icons.Facebook, label: "FACEBOOK", val: "facebook.com/digitalworld1988", href: settings.facebookUrl, color: "bg-blue-50 text-blue-600" },
                  { icon: Icons.MapPin, label: "LOCATION", val: "Dhaka, Bangladesh (Remote)", href: "#", color: "bg-orange-50 text-orange-600" }
                ].map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.href}
                    target={item.href !== "#" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-xl border border-neutral-100 hover:bg-neutral-50 transition-colors"
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[9px] font-bold text-neutral-400 tracking-wider uppercase">{item.label}</span>
                      <span className="block text-xs font-semibold text-neutral-800 truncate">{item.val}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Widget 3: Response Time Alert Box */}
            <div className="bg-blue-50/70 border border-blue-100/50 rounded-2xl p-6 flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500 border border-amber-100">
                <Icons.Zap className="h-5 w-5 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <span className="block text-[9px] font-bold text-blue-400 tracking-wider uppercase mb-1">RESPONSE TIME</span>
                <h5 className="font-sans font-bold text-sm text-neutral-900 mb-1">Within 24 hours</h5>
                <p className="font-sans text-xs text-neutral-500 leading-relaxed">
                  Usually much faster. Kamrujjaman reads every message personally and never uses automated replies.
                </p>
              </div>
            </div>

            {/* Widget 4: What Happens Next */}
            <div className="bg-white border border-neutral-100 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.02)] p-6 lg:p-8">
              <h4 className="font-serif text-lg font-bold text-neutral-900 mb-6">
                What happens next
              </h4>
              <div className="flex flex-col gap-6">
                {[
                  { step: 1, title: "You send the form", desc: "Takes 2 minutes. The more detail, the better I can help." },
                  { step: 2, title: "I review & respond", desc: "I'll reply within 24 hours with initial thoughts and any questions." },
                  { step: 3, title: "Free strategy call", desc: "30 minutes to align on goals, strategy, and what success looks like." },
                  { step: 4, title: "We get to work", desc: "Clear proposal, timeline, and kickoff — then we build something great." }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 font-sans text-xs font-bold text-neutral-600">
                      {item.step}
                    </div>
                    <div>
                      <h5 className="font-sans font-bold text-sm text-neutral-900 mb-1">{item.title}</h5>
                      <p className="font-sans text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 border-t border-neutral-100 bg-transparent">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 text-center mb-12">
            Frequently asked questions
          </h2>
          
          <div className="flex flex-col border-t border-neutral-100">
            {(faqs.length > 0 ? faqs : contactFaq).map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={item.id || idx} className="border-b border-neutral-100">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between py-6 font-sans font-bold text-sm sm:text-base text-neutral-800 text-left outline-none transition-colors hover:text-primary"
                  >
                    <span>{item.question}</span>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 bg-white shrink-0 ml-4">
                      {isOpen ? (
                        <Icons.Minus className="h-3.5 w-3.5 text-neutral-400" />
                      ) : (
                        <Icons.Plus className="h-3.5 w-3.5 text-neutral-400" />
                      )}
                    </div>
                  </button>
                  
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0 overflow-hidden"
                    }`}
                  >
                    <div className="overflow-hidden font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </article>
  );
}
