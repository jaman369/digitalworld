"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Icons from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FAFBFD] relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-100/50 via-blue-50/30 to-purple-50/20 blur-3xl -z-10" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-100/40 via-blue-50/30 to-blue-100/20 blur-3xl -z-10" />

      <div className="w-full max-w-md p-8 bg-white border border-neutral-100 rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.03)] mx-4 relative">
        {/* Brand header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 font-sans font-bold text-neutral-900 text-xl mb-2">
            <span className="h-4.5 w-4.5 rounded-full bg-gradient-to-r from-primary to-primary-hover shadow-sm" />
            Digital World
          </div>
          <span className="font-sans text-xs text-neutral-400 font-medium">
            ADMINISTRATOR ACCESS PANEL
          </span>
        </div>

        {/* Error Callout */}
        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 p-3.5 mb-6 text-xs text-red-600 font-medium">
            <Icons.AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@digitalworld.com"
                className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
              <Icons.Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
              <Icons.Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover disabled:bg-neutral-200 py-3.5 mt-2 font-sans text-sm font-semibold text-white shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:scale-100 cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Icons.Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
