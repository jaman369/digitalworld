"use client";

import { useEffect, useState } from "react";
import * as Icons from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const CATEGORIES = [
  "All",
  "General",
  "SEO & Traffic",
  "Onboarding",
  "Pricing & Plans",
  "Communication"
];

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  const fetchFaqs = async () => {
    try {
      const res = await fetch("/api/admin/faq");
      if (res.ok) {
        const data = await res.json();
        setFaqs(data);
      }
    } catch (err) {
      console.error("Fetch FAQs failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleAddFaq = () => {
    const newId = `faq-${Date.now()}`;
    const newFaq: FAQItem = {
      id: newId,
      question: "New Frequently Asked Question",
      answer: "Provide a detailed and helpful response here...",
      category: "General",
    };
    setFaqs([newFaq, ...faqs]);
  };

  const handleRemoveFaq = (id: string) => {
    setFaqs(faqs.filter((item) => item.id !== id));
  };

  const handleFieldChange = (id: string, field: keyof FAQItem, value: string) => {
    setFaqs(
      faqs.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= faqs.length) return;

    const newFaqs = [...faqs];
    const [movedItem] = newFaqs.splice(index, 1);
    newFaqs.splice(targetIndex, 0, movedItem);
    setFaqs(newFaqs);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedbackMessage("");
    setFeedbackError("");

    try {
      const response = await fetch("/api/admin/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ faqs }),
      });

      if (response.ok) {
        setFeedbackMessage("Frequently Asked Questions saved & updated live!");
        setTimeout(() => setFeedbackMessage(""), 3500);
      } else {
        const errorData = await response.json();
        setFeedbackError(errorData.error || "Failed to save FAQs");
      }
    } catch (err) {
      console.error(err);
      setFeedbackError("An error occurred while saving FAQs.");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredFaqs = faqs.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      (item.category && item.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim());

    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Icons.Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none mb-2">
            FAQ Management
          </h1>
          <p className="font-sans text-sm text-neutral-500">
            Create, edit, reorder, and delete Frequently Asked Questions displayed across the website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddFaq}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 hover:bg-neutral-800 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
          >
            <Icons.Plus className="h-4 w-4" />
            Add New FAQ
          </button>
        </div>
      </div>

      {/* Main Container */}
      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {/* Feedback Banners */}
        {feedbackMessage && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-xs text-emerald-600 font-semibold animate-fade-in">
            <Icons.CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        {feedbackError && (
          <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 p-4 text-xs text-red-600 font-semibold">
            <Icons.AlertCircle className="h-4.5 w-4.5 shrink-0" />
            <span>{feedbackError}</span>
          </div>
        )}

        {/* Search & Category Filter Toolbar */}
        <div className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-[0_6px_20px_rgba(0,0,0,0.01)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
              <Icons.Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-neutral-700"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer border-0 ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-neutral-50 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Cards List */}
        <div className="flex flex-col gap-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faqItem) => {
              const originalIndex = faqs.findIndex((f) => f.id === faqItem.id);
              return (
                <div
                  key={faqItem.id}
                  className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.01)] flex flex-col gap-4 transition-all hover:border-neutral-200"
                >
                  <div className="flex items-center justify-between gap-3 border-b border-neutral-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex items-center justify-center h-6 w-6 rounded-lg bg-neutral-100 text-neutral-600 font-mono text-xs font-bold">
                        #{originalIndex + 1}
                      </span>
                      <select
                        value={faqItem.category || "General"}
                        onChange={(e) => handleFieldChange(faqItem.id, "category", e.target.value)}
                        className="rounded-lg border border-neutral-200 bg-neutral-50/50 py-1 px-2.5 text-xs font-semibold text-neutral-600 outline-none focus:border-primary cursor-pointer"
                      >
                        {CATEGORIES.filter((c) => c !== "All").map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleMove(originalIndex, "up")}
                        disabled={originalIndex === 0}
                        title="Move Up"
                        className="h-7 w-7 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-500 flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Icons.ChevronUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMove(originalIndex, "down")}
                        disabled={originalIndex === faqs.length - 1}
                        title="Move Down"
                        className="h-7 w-7 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-500 flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Icons.ChevronDown className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveFaq(faqItem.id)}
                        title="Delete FAQ"
                        className="h-7 w-7 rounded-lg border border-red-100 bg-red-50/50 hover:bg-red-50 text-red-500 flex items-center justify-center transition-all cursor-pointer ml-1"
                      >
                        <Icons.Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        Question
                      </label>
                      <input
                        type="text"
                        required
                        value={faqItem.question}
                        onChange={(e) => handleFieldChange(faqItem.id, "question", e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm font-semibold text-neutral-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        placeholder="Enter question title..."
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        Answer
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={faqItem.answer}
                        onChange={(e) => handleFieldChange(faqItem.id, "answer", e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-xs text-neutral-600 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none leading-relaxed font-sans"
                        placeholder="Provide clear answer explanation..."
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white border border-neutral-100 rounded-2xl p-12 text-center text-neutral-400 font-medium text-sm">
              No FAQ items found matching search parameters.
            </div>
          )}
        </div>

        {/* Bottom Save Sticky Bar */}
        <div className="sticky bottom-6 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover disabled:bg-neutral-200 px-8 py-3.5 font-sans text-xs font-bold text-white shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer border-0"
          >
            {isSaving ? (
              <>
                <Icons.Loader2 className="h-4 w-4 animate-spin" />
                Saving FAQ Changes...
              </>
            ) : (
              <>
                <Icons.Save className="h-4 w-4" />
                Save & Apply FAQ Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
