"use client";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";

const tickets = [
  {
    id: "#TK-9921",
    merchantInitials: "KE",
    merchant: "Safari Mart Ltd",
    mid: "MID: 4420911",
    subject: "Missing Settlement: 2023-11-20",
    category: "FINANCIAL / SETTLEMENT",
    categoryColor: "text-amber-600",
    priority: "CRITICAL",
    priorityColor: "bg-red-100 text-red-600",
    lastActivity: "12 mins ago",
    by: "by System Admin",
  },
  {
    id: "#TK-8850",
    merchantInitials: "TZ",
    merchant: "Kilimanjaro Brews",
    mid: "MID: 5510222",
    subject: "API Integration Error (v2.1)",
    category: "TECHNICAL",
    categoryColor: "text-blue-600",
    priority: "NORMAL",
    priorityColor: "bg-slate-100 text-slate-600",
    lastActivity: "2 hours ago",
    by: "by Support L1",
  },
  {
    id: "#TK-9801",
    merchantInitials: "UG",
    merchant: "Nile Logistics",
    mid: "MID: 1122334",
    subject: "KYC Document Re-verification",
    category: "COMPLIANCE",
    categoryColor: "text-purple-600",
    priority: "HIGH",
    priorityColor: "bg-amber-100 text-amber-700",
    lastActivity: "5 hours ago",
    by: "by Compliance Team",
  },
  {
    id: "#TK-9744",
    merchantInitials: "KE",
    merchant: "M-Pesa Dealer #421",
    mid: "MID: 9988776",
    subject: "Refund Dispute: TR-8812",
    category: "FINANCIAL / DISPUTE",
    categoryColor: "text-red-500",
    priority: "CRITICAL",
    priorityColor: "bg-red-100 text-red-600",
    lastActivity: "1 day ago",
    by: "Awaiting Response",
  },
];

const kpis = [
  {
    label: "High Priority",
    value: "14",
    sub: "↑ Critical items",
    subColor: "text-red-500",
    border: "border-l-red-500",
  },
  {
    label: "Avg Resolution",
    value: "1.4h",
    sub: "Standard performance",
    subColor: "text-slate-400",
    border: "border-l-amber-500",
  },
  {
    label: "My Active Tickets",
    value: "08",
    sub: "Assigned to you",
    subColor: "text-blue-600",
    border: "border-l-blue-700",
  },
  {
    label: "Open Disputes",
    value: "42",
    sub: "Pending merchant input",
    subColor: "text-slate-400",
    border: "border-l-purple-500",
  },
];

const avatarColors: Record<string, string> = {
  KE: "bg-blue-100 text-blue-700",
  TZ: "bg-slate-100 text-slate-600",
  UG: "bg-green-100 text-green-700",
};

export default function SupportQueuePage() {
  const router = useRouter();

  return (
    <div>
      {/* Back */}
      <div className="mb-5">
        <button
          onClick={() => router.push("/dashboard/compliance")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
        >
          ← Back to Compliance
        </button>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Merchant Support Queue
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            High-density inquiry management and dispute ledger.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
            <Download size={15} /> Export CSV
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
          >
            + Internal Ticket
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map(({ label, value, sub, subColor, border }) => (
          <div
            key={label}
            className={`bg-white rounded-xl border border-slate-200 border-l-4 ${border} px-5 py-4`}
          >
            <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-2">
              {label}
            </p>
            <p className="text-3xl font-black text-slate-900 mb-1">{value}</p>
            <p className={`text-[11px] font-semibold ${subColor}`}>{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Table */}
        <div className="col-span-2">
          {/* Filters */}
          <div className="flex items-center gap-2 mb-3">
            {[
              { label: "STATUS", value: "All States" },
              { label: "PRIORITY", value: "Any Priority" },
              { label: "CATEGORY", value: "All Categories" },
            ].map(({ label, value }) => (
              <button
                key={label}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition"
              >
                <span className="text-slate-400">{label}</span> {value}
              </button>
            ))}
            <button className="ml-auto p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="8" y1="12" x2="16" y2="12" />
                <line x1="11" y1="18" x2="13" y2="18" />
              </svg>
            </button>
            <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
            </button>
          </div>

          {/* Bulk actions */}
          <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl mb-3 text-xs font-bold text-slate-500">
            <input type="checkbox" className="accent-blue-700" />
            <span>12 ITEMS SELECTED</span>
            <span className="text-slate-300">|</span>
            <button className="flex items-center gap-1 hover:text-blue-700 transition">
              👤 Assign
            </button>
            <button className="flex items-center gap-1 hover:text-blue-700 transition">
              ⏱ Update Status
            </button>
            <button className="flex items-center gap-1 hover:text-red-600 transition">
              🗑 Archive
            </button>
          </div>

          {/* Tickets */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-4 py-3 w-8" />
                  {[
                    "Ticket ID",
                    "Merchant",
                    "Subject & Category",
                    "Priority",
                    "Last Activity",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tickets.map(
                  ({
                    id,
                    merchantInitials,
                    merchant,
                    mid,
                    subject,
                    category,
                    categoryColor,
                    priority,
                    priorityColor,
                    lastActivity,
                    by,
                  }) => (
                    <tr
                      key={id}
                      className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <input type="checkbox" className="accent-blue-700" />
                      </td>
                      <td className="px-4 py-4">
                        <button className="font-bold text-blue-700 hover:underline text-sm">
                          {id}
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-black flex-shrink-0 ${avatarColors[merchantInitials] ?? "bg-slate-100 text-slate-600"}`}
                          >
                            {merchantInitials}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-[13px]">
                              {merchant}
                            </p>
                            <p className="text-[11px] text-slate-400">{mid}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-slate-800 text-sm mb-0.5">
                          {subject}
                        </p>
                        <span
                          className={`text-[10px] font-black tracking-widests uppercase ${categoryColor}`}
                        >
                          {category}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill={
                              priority === "CRITICAL"
                                ? "#dc2626"
                                : priority === "HIGH"
                                  ? "#d97706"
                                  : "#64748b"
                            }
                            stroke="none"
                          >
                            <polygon points="12 2 22 22 2 22" />
                          </svg>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${priorityColor}`}
                          >
                            {priority}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-slate-600">{lastActivity}</p>
                        <p className="text-[11px] text-slate-400">{by}</p>
                      </td>
                      <td className="px-4 py-4">
                        <button className="text-slate-400 hover:text-slate-700 transition">
                          ⋮
                        </button>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
              <p className="text-xs text-slate-400">
                Showing 1-4 of 148 results
              </p>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition text-sm">
                  ‹
                </button>
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition ${n === 1 ? "text-white" : "text-slate-600 hover:bg-slate-50 border border-slate-200"}`}
                    style={
                      n === 1
                        ? {
                            background:
                              "linear-gradient(135deg, #1a3de4, #1230b8)",
                          }
                        : {}
                    }
                  >
                    {n}
                  </button>
                ))}
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition text-sm">
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Tabs */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            <button className="flex-1 py-2 rounded-lg bg-white text-blue-700 text-xs font-bold shadow-sm">
              Assigned to Me
            </button>
            <button className="flex-1 py-2 rounded-lg text-slate-500 text-xs font-bold hover:text-slate-700 transition">
              Unassigned (24)
            </button>
          </div>

          {/* Urgent notifications */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase mb-3">
              Urgent Notifications
            </p>
            <div className="space-y-3">
              <div className="border-l-4 border-red-500 pl-3">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-sm font-bold text-slate-800">
                    SLA Breach Imminent
                  </p>
                  <span className="text-[10px] font-black text-red-600 bg-red-50 px-2 py-0.5 rounded">
                    4m left
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  #TK-9921: Missing Settlement...
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-3">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-sm font-bold text-slate-800">
                    New Evidence Uploaded
                  </p>
                  <span className="text-[10px] text-slate-400">12m ago</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Nile Logistics has uploaded...
                </p>
              </div>
            </div>
          </div>

          {/* Current shift load */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase mb-3">
              Current Shift Load
            </p>
            <div className="space-y-3">
              {[
                {
                  initials: "DO",
                  name: "D. Okoro",
                  load: 80,
                  color: "bg-blue-600",
                },
                {
                  initials: "SM",
                  name: "S. Mutua",
                  load: 45,
                  color: "bg-blue-400",
                },
              ].map(({ initials, name, load, color }) => (
                <div key={name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-600 flex-shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-slate-700">
                        {name}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {load}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full">
                      <div
                        className={`h-1.5 rounded-full ${color}`}
                        style={{ width: `${load}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Internal guidelines */}
          <div className="bg-blue-700 rounded-xl p-5">
            <p className="text-[10px] font-black tracking-[0.2em] text-blue-200 uppercase mb-2">
              Internal Guidelines
            </p>
            <p className="text-white font-black text-lg mb-3 leading-tight">
              Handling Fraudulent Settlement Claims
            </p>
            <button className="px-4 py-2 rounded-lg border border-white/30 text-white text-xs font-bold hover:bg-white/10 transition tracking-widests uppercase">
              Read SOP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
