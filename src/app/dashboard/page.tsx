"use client";
import Link from "next/link";
import {
  BarChart3,
  ShieldCheck,
  Settings,
  Users,
  Bell,
  LogOut,
} from "lucide-react";

const modules = [
  {
    href: "/dashboard/transactions",
    icon: BarChart3,
    label: "ADMIN DASHBOARD",
    description:
      "Monitor real-time transactions, processing latency, active volumes, and risk flags across the payment network.",
    badge: "Live",
    badgeColor: "bg-green-100 text-green-700",
    accent: "#1a3de4",
  },
  {
    href: "/dashboard/access-manager",
    icon: ShieldCheck,
    label: "ACCESS MANAGER",
    description:
      "Manage operator accounts, assign roles, control permissions and oversee system access across the Control Hub.",
    badge: "Admin Only",
    badgeColor: "bg-amber-100 text-amber-700",
    accent: "#0d1f7a",
  },
];

const sideIcons = [
  { icon: Settings, label: "Settings", href: "#" },
  { icon: Users, label: "Users", href: "#" },
  { icon: Bell, label: "Notifications", href: "#", badge: 3 },
];

export default function DashboardHome() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Tuma Navigator
        </h1>
        <p className="text-slate-500 text-sm mt-2 max-w-md">
          Tuma is designed with flexibility in mind. Browse the options below
          and select the module that fits you best.
        </p>
      </div>
      <div className="flex gap-4 w-full max-w-5xl">
        <div className="flex flex-col items-center justify-between bg-white border border-slate-200 rounded-2xl py-5 px-3 w-16 flex-shrink-0">
          <div className="flex flex-col items-center gap-6">
            <div className="w-10 h-10 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center"></div>
            <div className="flex flex-col items-center gap-5 mt-4">
              {sideIcons.map(({ icon: Icon, label, href, badge }) => (
                <Link
                  key={label}
                  href={href}
                  className="relative text-slate-400 hover:text-blue-700 transition-colors"
                  title={label}
                >
                  <Icon size={20} strokeWidth={1.7} />
                  {badge && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/login"
            className="text-slate-400 hover:text-red-500 transition-colors"
            title="Log Out"
          >
            <LogOut size={20} strokeWidth={1.7} />
          </Link>
        </div>
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map(
              ({
                href,
                icon: Icon,
                label,
                description,
                badge,
                badgeColor,
                accent,
              }) => (
                <Link key={href} href={href} className="group block">
                  <div className="rounded-xl border border-slate-100 p-7 h-full flex flex-col transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-blue-100 bg-slate-50 hover:bg-white">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105"
                      style={{ background: `${accent}12` }}
                    >
                      <Icon
                        size={22}
                        style={{ color: accent }}
                        strokeWidth={1.8}
                      />
                    </div>
                    <span
                      className={`inline-block text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full mb-3 ${badgeColor}`}
                    >
                      {badge}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">
                      {label}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {description}
                    </p>
                    <div className="mt-auto pt-5">
                      <span
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all group-hover:opacity-90"
                        style={{ background: accent }}
                      >
                        Open module
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="transition-transform group-hover:translate-x-1"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
