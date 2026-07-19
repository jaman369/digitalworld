import { getSession } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  // If no session exists (e.g. login page), render children directly without dashboard wrapper
  if (!session) {
    return <>{children}</>;
  }

  // Authenticated dashboard layout
  return (
    <div className="min-h-screen bg-[#FAFBFD] flex">
      {/* Sidebar */}
      <AdminSidebar session={session} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-neutral-100 bg-white px-6 flex items-center justify-between shrink-0">
          <div className="font-sans text-xs text-neutral-400 font-semibold tracking-wider uppercase">
            Control Center
          </div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-neutral-600 font-sans">
              Logged in as {session.email}
            </span>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
