"use client";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";

const modules = [
  {
    title: "Transactions",
    sub: "Platform-wide payment flow",
    accent: "#1a3de4",
    live: true,
    stats: [
      {
        label: "Total Volume (MTD)",
        value: "KES 142.8M",
        sub: "+12.4% vs last month",
        subColor: "text-green-600",
      },
      {
        label: "Success Rate",
        value: "99.92%",
        sub: "Above benchmark",
        subColor: "text-slate-400",
      },
    ],
    action: "Configure Report →",
    actionColor: "text-blue-700",
    border: "border-l-blue-700",
  },
  {
    title: "Merchants",
    sub: "Active merchant ecosystem",
    accent: "#d97706",
    stats: [
      {
        label: "Active Partners",
        value: "2,418",
        sub: "+142 this week",
        subColor: "text-green-600",
      },
    ],
    action: "Configure Report",
    actionColor: "text-amber-700",
    border: "border-l-amber-500",
  },
  {
    title: "Settlements",
    sub: "Batch payout performance",
    accent: "#7c3aed",
    stats: [
      {
        label: "Avg. Settlement Time",
        value: "4.2 Hrs",
        sub: "Optimal Performance",
        subColor: "text-green-600",
      },
    ],
    action: "Configure Report",
    actionColor: "text-purple-700",
    border: "border-l-purple-500",
  },
  {
    title: "Support",
    sub: "Ticket resolution metrics",
    accent: "#64748b",
    stats: [
      {
        label: "SLA Achievement",
        value: "96.4%",
        sub: "Below target (98%)",
        subColor: "text-red-500",
      },
    ],
    action: "Configure Report",
    actionColor: "text-slate-600",
    border: "border-l-slate-400",
  },
];

export default function ReportsPage() {
  const router = useRouter();

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[10px] font-black tracking-[0.2em] text-blue-700 uppercase mb-1">
            Analytics Portal
          </p>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Reports Home
          </h1>
          <p className="text-slate-500 text-sm mt-1 max-w-md">
            Real-time aggregate data and historical performance metrics across
            the Tuma ecosystem.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
            <Download size={15} /> Export All
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
          >
            📊 Create Custom
          </button>
        </div>
      </div>

      {/* Top row — Transactions + Risk */}
      <div className="grid grid-cols-3 gap-5 mb-5">
        {/* Transactions — large */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 border-l-4 border-l-blue-700 p-6 relative overflow-hidden">
          <div className="absolute right-6 top-6 opacity-10">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a3de4"
              strokeWidth="1"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
          </div>
          {/* Live badge */}
          <div className="flex items-center gap-2 mb-3">
            <p className="text-lg font-black text-blue-700">Transactions</p>
            <span className="px-2 py-0.5 bg-blue-700 text-white text-[10px] font-bold rounded tracking-widests">
              LIVE
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-5">
            Platform-wide payment flow
          </p>
          <div className="grid grid-cols-2 gap-5 mb-6">
            <div>
              <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                Total Volume (MTD)
              </p>
              <p className="text-3xl font-black text-slate-900">KES 142.8M</p>
              <p className="text-xs text-green-600 font-semibold mt-1">
                ↗ +12.4% vs last month
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                Success Rate
              </p>
              <p className="text-3xl font-black text-slate-900">99.92%</p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Above benchmark
              </p>
            </div>
          </div>
          <button className="text-sm font-bold text-blue-700 hover:underline">
            Configure Report →
          </button>
        </div>

        {/* Risk & Fraud */}
        <div className="bg-white rounded-xl border border-slate-200 border-l-4 border-l-red-500 p-6">
          <div className="flex items-center gap-2 mb-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#dc2626"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p className="font-black text-slate-900">Risk & Fraud</p>
          </div>
          <p className="text-xs text-slate-400 mb-4">Anomaly detection</p>
          <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
            Risk Score
          </p>
          <p className="text-2xl font-black text-red-600 mb-4">Elevated</p>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase">
                Pending Alerts
              </p>
              <p className="text-[10px] font-bold text-red-600">14 High</p>
            </div>
            <div className="h-2 bg-slate-100 rounded-full">
              <div
                className="h-2 bg-red-500 rounded-full"
                style={{ width: "85%" }}
              />
            </div>
          </div>
          <button className="w-full py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition">
            Review Flags
          </button>
        </div>
      </div>

      {/* Bottom modules row */}
      <div className="grid grid-cols-3 gap-5 mb-5">
        {modules
          .slice(1)
          .map(({ title, sub, accent, stats, action, actionColor, border }) => (
            <div
              key={title}
              className={`bg-white rounded-xl border border-slate-200 border-l-4 ${border} p-6`}
            >
              <p
                className="font-black text-slate-900 mb-0.5"
                style={{ color: accent }}
              >
                {title}
              </p>
              <p className="text-xs text-slate-400 mb-4">{sub}</p>
              {stats.map(({ label, value, sub: statSub, subColor }) => (
                <div key={label} className="mb-3">
                  <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                    {label}
                  </p>
                  <p className="text-2xl font-black text-slate-900">{value}</p>
                  <p className={`text-xs font-semibold mt-0.5 ${subColor}`}>
                    {statSub}
                  </p>
                </div>
              ))}
              <button
                className={`flex items-center gap-1 text-sm font-bold mt-3 hover:underline ${actionColor}`}
              >
                {action}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.07 4.93l-1.41 1.41" />
                </svg>
              </button>
            </div>
          ))}
      </div>

      {/* Dispute resolution banner */}
      <div className="bg-slate-900 rounded-xl p-6 flex items-center justify-between mb-5">
        <div>
          <p className="font-black text-white text-lg mb-0.5">
            Dispute Resolution
          </p>
          <p className="text-slate-400 text-sm">
            Managing chargebacks and arbitration
          </p>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-center">
            <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
              Open Cases
            </p>
            <p className="text-2xl font-black text-white">82</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
              Win Rate
            </p>
            <p className="text-2xl font-black text-white">74%</p>
          </div>
          <button
            className="px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
          >
            Launch Dispute Hub
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-200">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Database Sync: Active
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Last updated: 2 mins ago
          </span>
        </div>
        <div className="flex items-center gap-5">
          {["Data Policy", "API Access", "Help Center"].map((l) => (
            <button
              key={l}
              className="hover:text-blue-700 transition font-medium"
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
