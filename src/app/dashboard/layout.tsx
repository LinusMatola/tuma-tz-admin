"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Store,
  Landmark,
  Headphones,
  SlidersHorizontal,
  Settings,
  BookOpen,
  LogOut,
  Plus,
} from "lucide-react";

const navItems = [
  { label: "Transactions", icon: LayoutGrid, href: "/dashboard/transactions" },
  { label: "Merchants", icon: Store, href: "/dashboard/merchants" },
  { label: "Settlements", icon: Landmark, href: "/dashboard/settlements" },
  { label: "Support", icon: Headphones, href: "/dashboard/support" },
  { label: "Rules", icon: SlidersHorizontal, href: "/dashboard/rules" },
  { label: "System", icon: Settings, href: "/dashboard/system" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/dashboard" || pathname === "/dashboard/access-manager")
    return <>{children}</>;

  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside className="w-[220px] flex-shrink-0 flex flex-col bg-white border-r border-slate-200 fixed top-0 left-0 h-screen z-30">
        <div className="px-5 py-5 border-b border-slate-100">
          <p className="text-[15px] font-bold text-slate-900 leading-tight">
            Command Center
          </p>
          <p className="text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase mt-0.5">
            Operator V2.4
          </p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ label, icon: Icon, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-blue-50 text-blue-700 border-l-[3px] border-blue-700 pl-[9px]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={17} strokeWidth={1.8} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-slate-100 space-y-1">
          <Link
            href="/docs"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition"
          >
            <BookOpen size={17} strokeWidth={1.8} />
            Documentation
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-red-600 transition"
          >
            <LogOut size={17} strokeWidth={1.8} />
            Log Out
          </Link>
        </div>
      </aside>
      <div className="flex-1 ml-[220px] flex flex-col min-h-screen">
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20">
          <span className="text-[17px] font-black text-blue-700 tracking-tight">
            TumaCommand
          </span>
          <div className="flex-1 max-w-xs mx-8">
            <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-slate-400"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search systems..."
                className="bg-transparent text-sm text-slate-600 placeholder-slate-400 focus:outline-none w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M12 2v2M12 20v2M2 12h2M20 12h2" />
              </svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center"></div>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
