"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";

const profileData: Record<string, any> = {
  "APP-9210-KV": {
    name: "Zanzibar Spices & Exports Ltd.",
    mid: "TUMA-9210-KV",
    category: "Logistics & Supply",
    country: "Tanzania",
    city: "Zanzibar",
    status: "ACTIVE",
    statusColor: "bg-green-100 text-green-700",
    since: "Jan 2024",
    tier: "Tier 2",
    accountHealth: 98,
    healthColor: "bg-green-500",
    totalVolume: "KES 4.2M",
    totalTxns: "1,842",
    successRate: "99.1%",
    avgTicket: "KES 2,280",
    instruments: ["International Credit Cards", "M-PESA / Tigo Pesa"],
    recentTxns: [
      {
        id: "TXN-9210-001",
        amount: "KES 42,000",
        status: "PAID",
        statusColor: "bg-green-100 text-green-700",
        date: "Oct 24, 14:22",
      },
      {
        id: "TXN-9210-002",
        amount: "KES 18,500",
        status: "PAID",
        statusColor: "bg-green-100 text-green-700",
        date: "Oct 24, 11:10",
      },
      {
        id: "TXN-9210-003",
        amount: "KES 7,200",
        status: "PENDING",
        statusColor: "bg-amber-100 text-amber-700",
        date: "Oct 23, 16:45",
      },
    ],
    settlements: [
      {
        ref: "#SETL-9210-01",
        amount: "KES 220,000",
        status: "SETTLED",
        date: "Oct 24",
      },
      {
        ref: "#SETL-9210-02",
        amount: "KES 185,000",
        status: "PENDING",
        date: "Oct 23",
      },
    ],
    volumeChart: [
      { day: "Mon", volume: 320 },
      { day: "Tue", volume: 480 },
      { day: "Wed", volume: 410 },
      { day: "Thu", volume: 620 },
      { day: "Fri", volume: 580 },
      { day: "Sat", volume: 290 },
      { day: "Sun", volume: 190 },
    ],
  },
  "APP-4402-TZ": {
    name: "M-Store Electronics",
    mid: "TUMA-44021-TZ",
    category: "E-Commerce",
    country: "Tanzania",
    city: "Dodoma",
    status: "ACTIVE",
    statusColor: "bg-green-100 text-green-700",
    since: "Mar 2024",
    tier: "Tier 1",
    accountHealth: 74,
    healthColor: "bg-amber-500",
    totalVolume: "KES 1.8M",
    totalTxns: "924",
    successRate: "96.2%",
    avgTicket: "KES 1,948",
    instruments: ["M-PESA / Tigo Pesa", "International Credit Cards"],
    recentTxns: [
      {
        id: "TXN-4402-001",
        amount: "TZS 185,200",
        status: "PENDING",
        statusColor: "bg-amber-100 text-amber-700",
        date: "Oct 24, 10:05",
      },
      {
        id: "TXN-4402-002",
        amount: "TZS 94,000",
        status: "PAID",
        statusColor: "bg-green-100 text-green-700",
        date: "Oct 23, 14:20",
      },
      {
        id: "TXN-4402-003",
        amount: "TZS 210,000",
        status: "FAILED",
        statusColor: "bg-red-100 text-red-600",
        date: "Oct 23, 09:15",
      },
    ],
    settlements: [
      {
        ref: "#SETL-4402-01",
        amount: "TZS 820,000",
        status: "PENDING",
        date: "Oct 24",
      },
      {
        ref: "#SETL-4402-02",
        amount: "TZS 650,000",
        status: "SETTLED",
        date: "Oct 22",
      },
    ],
    volumeChart: [
      { day: "Mon", volume: 210 },
      { day: "Tue", volume: 340 },
      { day: "Wed", volume: 280 },
      { day: "Thu", volume: 420 },
      { day: "Fri", volume: 390 },
      { day: "Sat", volume: 480 },
      { day: "Sun", volume: 520 },
    ],
  },
  "APP-7721-UG": {
    name: "Blue River Exchange",
    mid: "TUMA-7721-UG",
    category: "Forex/Money",
    country: "Uganda",
    city: "Kampala",
    status: "SUSPENDED",
    statusColor: "bg-red-100 text-red-600",
    since: "Feb 2023",
    tier: "Tier 3",
    accountHealth: 32,
    healthColor: "bg-red-500",
    totalVolume: "KES 12.4M",
    totalTxns: "4,210",
    successRate: "91.4%",
    avgTicket: "KES 2,946",
    instruments: ["International Credit Cards", "Local Bank Wire (EFT)"],
    recentTxns: [
      {
        id: "TXN-7721-001",
        amount: "KES 450,000",
        status: "HELD",
        statusColor: "bg-red-100 text-red-600",
        date: "Oct 24, 14:21",
      },
      {
        id: "TXN-7721-002",
        amount: "KES 380,000",
        status: "HELD",
        statusColor: "bg-red-100 text-red-600",
        date: "Oct 24, 14:20",
      },
      {
        id: "TXN-7721-003",
        amount: "KES 290,000",
        status: "FAILED",
        statusColor: "bg-red-100 text-red-600",
        date: "Oct 23, 22:10",
      },
    ],
    settlements: [
      {
        ref: "#SETL-7721-01",
        amount: "KES 1,200,000",
        status: "HELD",
        date: "Oct 24",
      },
      {
        ref: "#SETL-7721-02",
        amount: "KES 980,000",
        status: "FAILED",
        date: "Oct 23",
      },
    ],
    volumeChart: [
      { day: "Mon", volume: 820 },
      { day: "Tue", volume: 940 },
      { day: "Wed", volume: 1100 },
      { day: "Thu", volume: 1280 },
      { day: "Fri", volume: 1420 },
      { day: "Sat", volume: 320 },
      { day: "Sun", volume: 0 },
    ],
  },
  "APP-1029-KV": {
    name: "Toby's Gym",
    mid: "TUMA-8829-KY-01",
    category: "Service & Products",
    country: "Kenya",
    city: "Mombasa",
    status: "ACTIVE",
    statusColor: "bg-green-100 text-green-700",
    since: "Jun 2023",
    tier: "Tier 1",
    accountHealth: 61,
    healthColor: "bg-amber-500",
    totalVolume: "KES 820K",
    totalTxns: "412",
    successRate: "94.8%",
    avgTicket: "KES 1,990",
    instruments: ["M-PESA / Tigo Pesa", "Local Bank Wire (EFT)"],
    recentTxns: [
      {
        id: "TXN-1029-001",
        amount: "KES 9,400",
        status: "HELD",
        statusColor: "bg-red-100 text-red-600",
        date: "Oct 24, 14:21",
      },
      {
        id: "TXN-1029-002",
        amount: "KES 8,950",
        status: "HELD",
        statusColor: "bg-red-100 text-red-600",
        date: "Oct 24, 14:20",
      },
      {
        id: "TXN-1029-003",
        amount: "KES 9,200",
        status: "PAID",
        statusColor: "bg-green-100 text-green-700",
        date: "Oct 24, 14:18",
      },
    ],
    settlements: [
      {
        ref: "#SETL-1029-01",
        amount: "KES 84,500",
        status: "PENDING",
        date: "Oct 24",
      },
      {
        ref: "#SETL-1029-02",
        amount: "KES 72,000",
        status: "SETTLED",
        date: "Oct 22",
      },
    ],
    volumeChart: [
      { day: "Mon", volume: 120 },
      { day: "Tue", volume: 180 },
      { day: "Wed", volume: 140 },
      { day: "Thu", volume: 210 },
      { day: "Fri", volume: 190 },
      { day: "Sat", volume: 420 },
      { day: "Sun", volume: 380 },
    ],
  },
};

const tabs = ["Overview", "Transactions", "Settlements"];

export default function MerchantProfile() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");
  const d = profileData[id] ?? profileData["APP-1029-KV"];

  return (
    <div>
      {/* Back */}
      <div className="mb-5">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
        >
          ← Back to Merchants
        </button>
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 px-6 py-5 mb-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-2xl font-black text-blue-700">
              {d.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-black text-slate-900">{d.name}</h1>
                <span
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide ${d.statusColor}`}
                >
                  {d.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span>MID: {d.mid}</span>
                <span>
                  📍 {d.city}, {d.country}
                </span>
                <span>🗂 {d.category}</span>
                <span>Since {d.since}</span>
                <span className="font-bold text-blue-700">{d.tier}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push(`/dashboard/merchants/${id}/security`)}
              className="px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-bold hover:bg-red-50 transition"
            >
              🛡 Security
            </button>
            <button
              onClick={() =>
                router.push(`/dashboard/merchants/${id}/risk-profile`)
              }
              className="px-4 py-2 rounded-lg text-white text-sm font-bold hover:opacity-90 transition"
              style={{
                background: "linear-gradient(135deg, #dc2626, #991b1b)",
              }}
            >
              View Risk Profile
            </button>
          </div>
        </div>

        {/* Account health bar */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              Account Health
            </p>
            <p className="text-[11px] font-bold text-slate-700">
              {d.accountHealth}%
            </p>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full">
            <div
              className={`h-1.5 rounded-full ${d.healthColor}`}
              style={{ width: `${d.accountHealth}%` }}
            />
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: "Total Volume", value: d.totalVolume },
          { label: "Total Transactions", value: d.totalTxns },
          { label: "Success Rate", value: d.successRate },
          { label: "Avg. Ticket Size", value: d.avgTicket },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-white rounded-xl border border-slate-200 px-5 py-4"
          >
            <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-2">
              {label}
            </p>
            <p className="text-2xl font-black text-slate-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-5 bg-white rounded-t-xl">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3.5 text-sm font-bold border-b-2 transition-colors ${
              activeTab === tab
                ? "border-blue-700 text-blue-700"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "Overview" && (
        <div className="grid grid-cols-2 gap-5">
          {/* Volume chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="font-bold text-slate-900 mb-1">Weekly Volume</p>
            <p className="text-xs text-slate-400 mb-4">
              Transaction volume this week
            </p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={d.volumeChart} barSize={20}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  cursor={{ fill: "#f8fafc" }}
                />
                <Bar dataKey="volume" fill="#1a3de4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Payment instruments */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="font-bold text-slate-900 mb-4">Payment Instruments</p>
            <div className="space-y-3">
              {d.instruments.map((inst: string) => (
                <div
                  key={inst}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100"
                >
                  <span className="text-sm font-medium text-slate-700">
                    {inst}
                  </span>
                  <span className="text-[11px] font-bold text-green-600 tracking-widest">
                    ACTIVE
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Transactions" && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Transaction ID", "Amount", "Status", "Date"].map((h) => (
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
              {d.recentTxns.map((txn: any) => (
                <tr
                  key={txn.id}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-5 py-4 font-bold text-blue-700 text-sm">
                    {txn.id}
                  </td>
                  <td className="px-5 py-4 font-bold text-slate-800">
                    {txn.amount}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide ${txn.statusColor}`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500 text-sm">
                    {txn.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "Settlements" && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Reference", "Amount", "Status", "Date"].map((h) => (
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
              {d.settlements.map((s: any) => (
                <tr
                  key={s.ref}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-5 py-4 font-bold text-blue-700 text-sm">
                    {s.ref}
                  </td>
                  <td className="px-5 py-4 font-bold text-slate-800">
                    {s.amount}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide ${
                        s.status === "SETTLED"
                          ? "bg-green-100 text-green-700"
                          : s.status === "PENDING"
                            ? "bg-amber-100 text-amber-700"
                            : s.status === "HELD"
                              ? "bg-slate-100 text-slate-600"
                              : "bg-red-100 text-red-600"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500 text-sm">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
