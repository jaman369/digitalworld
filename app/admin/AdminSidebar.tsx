"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import * as Icons from "lucide-react";
import LinkComponent from "next/link";

interface SidebarProps {
  session: {
    userId: string;
    email: string;
    role: string;
  };
}

export default function AdminSidebar({ session }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: Icons.LayoutDashboard },
    { name: "Homepage CMS", href: "/admin/homepage", icon: Icons.Home },
    { name: "About Page CMS", href: "/admin/about", icon: Icons.User },
    { name: "Services", href: "/admin/services", icon: Icons.Layers },
    { name: "Blog Posts", href: "/admin/blog", icon: Icons.FileText },
    { name: "Portfolio", href: "/admin/portfolio", icon: Icons.FolderDot },
    { name: "Leads / Inquiries", href: "/admin/leads", icon: Icons.Inbox },
    { name: "FAQ Management", href: "/admin/faq", icon: Icons.HelpCircle },
    { name: "Custom Code (WPCode)", href: "/admin/code-snippets", icon: Icons.Code2 },
    { name: "Settings", href: "/admin/settings", icon: Icons.Settings },
  ];

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <aside className="w-64 border-r border-neutral-100 bg-white flex flex-col shrink-0">
      {/* Brand Logo */}
      <div className="h-16 border-b border-neutral-100 px-6 flex items-center gap-3 font-sans font-bold text-neutral-900 text-base">
        <div className="relative h-8 w-7 shrink-0">
          <Image
            src="/images/logo.png"
            alt="Kj Digital World Logo"
            fill
            className="object-contain object-left"
          />
        </div>
        <span className="font-serif font-bold text-neutral-900 text-base">Digital World</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <LinkComponent
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-sans text-xs font-semibold transition-all ${
                isActive
                  ? "bg-primary-light text-primary shadow-sm"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </LinkComponent>
          );
        })}
      </nav>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-neutral-100 flex flex-col gap-3">
        <div className="flex items-center gap-3 px-2">
          <div className="h-8 w-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-sm">
            {session.email[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-neutral-700 truncate font-sans leading-tight">
              {session.email}
            </p>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">
              {session.role}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-neutral-200 hover:border-red-200 bg-white hover:bg-red-50 py-2.5 font-sans text-xs font-bold text-neutral-600 hover:text-red-600 transition-all cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoggingOut ? (
            <Icons.Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Icons.LogOut className="h-3.5 w-3.5" />
          )}
          Logout
        </button>
      </div>
    </aside>
  );
}
