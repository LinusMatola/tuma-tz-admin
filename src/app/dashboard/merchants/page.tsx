"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Search, SlidersHorizontal } from "lucide-react";

const kpis = [
  {
    label: "Total Pending",
    value: "128",
    valueColor: "text-blue-700",
    border: "border-l-blue-700",
  },
  {
    label: "In Review",
    value: "42",
    valueColor: "text-amber-500",
    border: "border-l-amber-500",
  },
  {
    label: "High Risk",
    value: "09",
    valueColor: "text-purple-600",
    border: "border-l-purple-500",
  },
  {
    label: "Avg. TAT",
    value: "4.2h",
    valueColor: "text-green-600",
    border: "border-l-green-500",
  },
];

const merchants = [
  {
    id: "APP-9210-KV",
    name: "Zanzibar Spices & Exports Ltd.",
    country: "Zanzibar",
    city: "Nairobi",
    category: "Logistics & Supply",
    categoryColor: "bg-blue-100 text-blue-700",
    onboarding: "Standard Digital",
    submitted: "Oct 24, 2023\n14:22 GMT",
    risk: "LOW RISK",
    riskColor: "text-green-600",
    riskBg: "bg-green-50",
    riskIcon: "✓",
    status: "PENDING",
    statusColor: "bg-blue-100 text-blue-700",
    bar: "bg-blue-500",
    icon: "🛍",
  },
  {
    id: "APP-4402-TZ",
    name: "M-Store Electronics",
    country: "Tanzania",
    city: "Dodoma",
    category: "E-Commerce",
    categoryColor: "bg-purple-100 text-purple-700",
    onboarding: "In-Person Audit",
    submitted: "Oct 24, 2023\n10:05 GMT",
    risk: "MEDIUM RISK",
    riskColor: "text-amber-600",
    riskBg: "bg-amber-50",
    riskIcon: "⊙",
    status: "REVIEW",
    statusColor: "bg-amber-100 text-amber-700",
    bar: "bg-amber-500",
    icon: "💎",
  },
  {
    id: "APP-7721-UG",
    name: "Blue River Exchange",
    country: "Uganda",
    city: "Kampala",
    category: "Forex/Money",
    categoryColor: "bg-red-100 text-red-600",
    onboarding: "Corporate Tier 2",
    submitted: "Oct 23, 2023\n16:45 GMT",
    risk: "HIGH RISK",
    riskColor: "text-red-600",
    riskBg: "bg-red-50",
    riskIcon: "▲",
    status: "REVIEW",
    statusColor: "bg-amber-100 text-amber-700",
    bar: "bg-red-500",
    icon: "🏦",
  },
  {
    id: "APP-1029-KV",
    name: "Toby's Gym",
    country: "Kenya",
    city: "Mombasa",
    category: "Service & Products",
    categoryColor: "bg-green-100 text-green-700",
    onboarding: "Standard Digital",
    submitted: "Oct 23, 2023\n09:12 GMT",
    risk: "LOW RISK",
    riskColor: "text-green-600",
    riskBg: "bg-green-50",
    riskIcon: "✓",
    status: "PENDING",
    statusColor: "bg-blue-100 text-blue-700",
    bar: "bg-green-500",
    icon: "🍽",
  },
];

const insights = [
  {
    label: "Nairobi Corridor High Volume",
    desc: "Application spike detected in logistics category from Central Kenya. Suggested routing: Fast-track Standard Digital tiers.",
    color: "border-l-blue-500",
  },
  {
    label: "Rule Update: Cross-border TZ",
    desc: "New AML guidelines for Tanzanian entities with offshore directors. 12 applications moved to manual review.",
    color: "border-l-purple-500",
  },
];

export default function MerchantsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Merchant Applications
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Review and process new business onboarding requests.
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
            + New Entry
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map(({ label, value, valueColor, border }) => (
          <div
            key={label}
            className={`bg-white rounded-xl border border-slate-200 border-l-4 ${border} px-5 py-4`}
          >
            <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-2">
              {label}
            </p>
            <span className={`text-3xl font-black ${valueColor}`}>{value}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2.5">
          <Search size={14} className="text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or country..."
            className="bg-transparent text-sm text-slate-600 placeholder-slate-400 focus:outline-none w-full"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
          All Status <span className="text-slate-400">▾</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
          All Countries <span className="text-slate-400">▾</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
          <SlidersHorizontal size={14} /> More Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {[
                "Merchant Name",
                "Geography",
                "Category",
                "Onboarding",
                "Date Submitted",
                "Risk",
                "Status",
              ].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3.5 text-left text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {merchants
              .filter((m) =>
                m.name.toLowerCase().includes(search.toLowerCase()),
              )
              .map(
                ({
                  id,
                  name,
                  country,
                  city,
                  category,
                  categoryColor,
                  onboarding,
                  submitted,
                  risk,
                  riskColor,
                  riskBg,
                  riskIcon,
                  status,
                  statusColor,
                  bar,
                  icon,
                }) => (
                  <tr
                    key={id}
                    className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/dashboard/merchants/${id}`)}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-0.5 h-10 rounded-full ${bar} flex-shrink-0`}
                        />
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-lg flex-shrink-0">
                          {icon}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-[13px]">
                            {name}
                          </p>
                          <p className="text-[11px] text-slate-400">{id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-semibold text-slate-800">
                        {country}
                      </span>
                      <span className="text-slate-400"> ({city})</span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${categoryColor}`}
                      >
                        {category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600 text-sm">
                      {onboarding}
                    </td>
                    <td className="px-5 py-4 text-slate-600 text-[12px] whitespace-pre-line">
                      {submitted}
                    </td>
                    <td className="px-5 py-4">
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${riskBg} ${riskColor}`}
                      >
                        <span>{riskIcon}</span> {risk}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide ${statusColor}`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                ),
              )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Showing 1 to 4 of 128 results
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
                        background: "linear-gradient(135deg, #1a3de4, #1230b8)",
                      }
                    : {}
                }
              >
                {n}
              </button>
            ))}
            <span className="text-slate-400 px-1">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition text-sm font-bold">
              32
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition text-sm">
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-2 gap-5">
        {/* Queue insights */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">
              Queue Insights
            </p>
            <span className="text-slate-400 text-lg">↗</span>
          </div>
          <div className="space-y-3">
            {insights.map(({ label, desc, color }) => (
              <div key={label} className={`border-l-4 ${color} pl-3`}>
                <p className="font-bold text-slate-800 text-sm">{label}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Automate CTA */}
        <div className="bg-slate-900 rounded-xl p-6 flex items-center justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-32 opacity-10 flex items-center justify-center">
            <span className="text-white text-[80px]">✦</span>
          </div>
          <div className="relative z-10">
            <h3 className="text-white font-black text-xl mb-2">
              Automate Your
              <br />
              Workflow with Tuma AI
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Our proprietary ML model filters
              <br />
              80% of low-risk applications automatically.
            </p>
            <button
              className="px-5 py-2.5 rounded-lg text-white text-xs font-bold tracking-widest uppercase hover:opacity-90 transition"
              style={{
                background: "linear-gradient(135deg, #1a3de4, #1230b8)",
              }}
            >
              Configure Rules
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
