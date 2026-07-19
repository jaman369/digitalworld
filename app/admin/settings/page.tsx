"use client";

import { useEffect, useState } from "react";
import * as Icons from "lucide-react";

interface SocialLink {
  platform: string;
  url: string;
}

export default function AdminSettingsPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          const map = new Map<string, string>(data.map((s: { key: string; value: string }) => [s.key, s.value]));
          setEmail(map.get("email") || "kj.jaman369@gmail.com");
          setPhone(map.get("phone") || "+880 1798-667820");
          setFacebookUrl(map.get("facebookUrl") || "https://www.facebook.com/digitalworld1988");
          setLinkedinUrl(map.get("linkedinUrl") || "https://www.linkedin.com/in/kamrujjaman-mufti/");

          const rawSocialLinks = map.get("socialLinks");
          let parsedSocials: SocialLink[] = [];
          if (rawSocialLinks) {
            try {
              parsedSocials = JSON.parse(rawSocialLinks);
            } catch {}
          }
          if (parsedSocials.length === 0) {
            parsedSocials = [
              { platform: "Facebook", url: map.get("facebookUrl") || "https://www.facebook.com/digitalworld1988" },
              { platform: "LinkedIn", url: map.get("linkedinUrl") || "https://www.linkedin.com/in/kamrujjaman-mufti/" }
            ];
          }
          setSocialLinks(parsedSocials);
        }
      } catch (err) {
        console.error("Fetch settings error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleAddSocial = () => {
    setSocialLinks([...socialLinks, { platform: "Instagram", url: "" }]);
  };

  const handleRemoveSocial = (index: number) => {
    setSocialLinks(socialLinks.filter((_, idx) => idx !== index));
  };

  const handleSocialChange = (index: number, key: "platform" | "url", value: string) => {
    setSocialLinks(
      socialLinks.map((link, idx) =>
        idx === index ? { ...link, [key]: value } : link
      )
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");
    setError("");

    const fb = socialLinks.find(s => s.platform.toLowerCase().includes("facebook"))?.url || facebookUrl;
    const li = socialLinks.find(s => s.platform.toLowerCase().includes("linkedin"))?.url || linkedinUrl;

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, facebookUrl: fb, linkedinUrl: li, socialLinks }),
      });
      if (res.ok) {
        setFacebookUrl(fb);
        setLinkedinUrl(li);
        setMessage("Settings updated successfully!");
      } else {
        throw new Error("Failed to save settings");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Icons.Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight leading-none mb-2">
          Global Settings
        </h1>
        <p className="font-sans text-sm text-neutral-500">
          Configure general configuration inputs, social links, and credentials.
        </p>
      </div>

      {message && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 p-3.5 text-xs text-emerald-600 font-semibold">
          <Icons.CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 p-3.5 text-xs text-red-600 font-semibold">
          <Icons.AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.01)] flex flex-col gap-5">
          <h3 className="font-sans font-bold text-base text-neutral-800 border-b border-neutral-100 pb-3 flex items-center gap-2">
            <Icons.Globe className="h-5 w-5 text-neutral-400" />
            General Contact details
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Primary Phone</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Contact Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border border-neutral-200 bg-white py-2.5 px-3.5 text-sm outline-none text-neutral-700 focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.01)] flex flex-col gap-5">
          <h3 className="font-sans font-bold text-base text-neutral-800 border-b border-neutral-100 pb-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Icons.Share2 className="h-5 w-5 text-neutral-400" />
              Social Profile Links
            </span>
            <button
              type="button"
              onClick={handleAddSocial}
              className="inline-flex items-center gap-1 rounded-lg border border-primary/20 hover:border-primary bg-primary/5 hover:bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary transition-all cursor-pointer"
            >
              <Icons.Plus className="h-3.5 w-3.5" />
              Add Link
            </button>
          </h3>
          <div className="flex flex-col gap-4">
            {socialLinks.map((link, idx) => (
              <div key={idx} className="flex gap-3 items-end border-b border-neutral-50 pb-3 last:border-b-0 last:pb-0">
                <div className="flex flex-col gap-1.5 w-1/3">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Platform</label>
                  <select
                    value={link.platform}
                    onChange={(e) => handleSocialChange(idx, "platform", e.target.value)}
                    className="rounded-xl border border-neutral-200 bg-white py-2 px-3 text-xs outline-none text-neutral-700 focus:border-primary focus:ring-1 focus:ring-primary/10 cursor-pointer"
                  >
                    <option value="Facebook">Facebook</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Twitter">Twitter / X</option>
                    <option value="YouTube">YouTube</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Pinterest">Pinterest</option>
                    <option value="GitHub">GitHub</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Profile Link URL</label>
                  <input
                    type="url"
                    required
                    value={link.url}
                    onChange={(e) => handleSocialChange(idx, "url", e.target.value)}
                    placeholder="https://..."
                    className="rounded-xl border border-neutral-200 bg-white py-2 px-3.5 text-xs outline-none text-neutral-700 focus:border-primary focus:ring-1 focus:ring-primary/10 font-mono"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSocial(idx)}
                  disabled={socialLinks.length <= 1}
                  className="h-8.5 w-8.5 rounded-xl border border-red-100 hover:border-red-200 bg-red-50/50 hover:bg-red-50 text-red-500 flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Icons.Trash className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover disabled:bg-neutral-200 px-6 py-3 font-sans text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Icons.Loader2 className="h-3.5 w-3.5 animate-spin" />
                Saving Changes...
              </>
            ) : (
              "Save Settings"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
