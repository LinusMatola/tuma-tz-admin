"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Download, SlidersHorizontal } from "lucide-react";

const kpis = [
  {
    label: "Total Active Merchants",
    value: "14,802",
    sub: "+12.4%",
    subColor: "text-green-600",
    border: "border-l-blue-700",
    chart: true,
  },
  {
    label: "New Applications",
    value: "184",
    sub: "Awaiting Review",
    subColor: "text-purple-600",
    border: "border-l-purple-500",
    bars: true,
  },
  {
    label: "Today's Volume (KES)",
    value: "4.2M",
    sub: "Vs. Yesterday: 3.8M",
    subColor: "text-slate-400",
    border: "border-l-amber-500",
    trend: true,
  },
  {
    label: "Failed Transactions",
    value: "0.82%",
    sub: "Critical",
    subColor: "text-red-500",
    border: "border-l-red-500",
    alert: "GATEWAY LATENCY DETECTED",
  },
];

const settlements = [
  {
    ref: "#SETL-48201",
    initials: "KC",
    merchant: "Kili-Cloud Retailers",
    region: "Nairobi, KE",
    cycle: "T+1 (Daily)",
    amount: "1,240,000.00",
    status: "PROCESSING",
    statusColor: "bg-amber-100 text-amber-700",
  },
  {
    ref: "#SETL-48202",
    initials: "SM",
    merchant: "Safari Motors Ltd",
    region: "Mombasa, KE",
    cycle: "T+2 (Weekly)",
    amount: "84,500.50",
    status: "READY",
    statusColor: "bg-green-100 text-green-700",
  },
];

const tickets = [
  {
    title: "Payout failure at Nakumatt",
    ticket: "#8291",
    priority: "High Priority",
    time: "12m ago",
  },
  {
    title: "API Key regeneration request",
    ticket: "#8285",
    priority: "Medium",
    time: "4h ago",
  },
];

export default function MonitoringOverview() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-blue-700 tracking-tight">
            Monitoring Overview
          </h1>
          <p className="text-[11px] font-bold tracking-[0.15em] text-slate-400 uppercase mt-1">
            Real-Time Ledger State & Performance
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
        >
          + New Entry
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {kpis.map(({ label, value, sub, subColor, border, alert }) => (
          <div
            key={label}
            className={`bg-white rounded-xl border border-slate-200 border-l-4 ${border} px-5 py-4`}
          >
            <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-2">
              {label}
            </p>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-black text-slate-900">
                {value}
              </span>
              <span className={`text-xs font-semibold ${subColor}`}>{sub}</span>
            </div>
            {alert && (
              <p className="text-[10px] font-bold tracking-widest text-red-500 uppercase mt-1">
                {alert}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Alert banner */}
      <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-xl px-5 py-4 mb-5">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">
              Risk and Compliance Alert
            </p>
            <p className="text-xs text-slate-500">
              Unusual surge in high-value transfers detected from cluster C-42
              (Kisumu Region). Audit required.
            </p>
          </div>
        </div>
        <button className="px-4 py-2 rounded-lg border border-red-300 text-red-600 text-xs font-bold tracking-widest uppercase hover:bg-red-100 transition flex-shrink-0">
          Review Cluster
        </button>
      </div>

      {/* Chart + Right panel */}
      <div className="grid grid-cols-3 gap-5 mb-5">
        {/* Chart */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-bold text-slate-900">Transaction Trends</p>
              <p className="text-xs text-slate-400">
                Volume distribution per hour
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-700 inline-block" />
                Settled
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-200 inline-block" />
                Pending
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={[
                { hour: "08:00", settled: 420, pending: 80 },
                { hour: "09:00", settled: 380, pending: 120 },
                { hour: "10:00", settled: 510, pending: 90 },
                { hour: "11:00", settled: 620, pending: 150 },
                { hour: "12:00", settled: 480, pending: 200 },
                { hour: "13:00", settled: 730, pending: 110 },
                { hour: "14:00", settled: 560, pending: 180 },
                { hour: "15:00", settled: 690, pending: 130 },
                { hour: "16:00", settled: 820, pending: 95 },
                { hour: "17:00", settled: 940, pending: 160 },
                { hour: "18:00", settled: 710, pending: 140 },
                { hour: "19:00", settled: 580, pending: 100 },
              ]}
              barSize={18}
              barGap={4}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f1f5f9"
                vertical={false}
              />
              <XAxis
                dataKey="hour"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                cursor={{ fill: "#f8fafc" }}
              />
              <Bar dataKey="settled" fill="#1a3de4" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="#bfdbfe" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Support tickets */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-3">
              Open Support Tickets
            </p>
            <div className="space-y-3">
              {tickets.map((t) => (
                <div key={t.ticket} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1a3de4"
                      strokeWidth="2"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-800">
                      {t.title}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {t.ticket} • {t.priority}
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-400 flex-shrink-0">
                    {t.time}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-3 w-full py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition tracking-widest uppercase">
              View All Tickets
            </button>
          </div>

          {/* System health */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-[10px] font-bold tracking-[0.15em] text-amber-600 uppercase mb-3">
              System Health
            </p>
            {[
              { label: "Gateway API", value: "99.9%" },
              { label: "Database Cluster", value: "100%" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
              >
                <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                  {label}
                </span>
                <span className="text-sm font-black text-slate-900">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Settlements */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <p className="font-bold text-slate-900">Pending Settlements</p>
          <div className="flex items-center gap-2">
            <button className="text-slate-400 hover:text-slate-600 transition">
              <SlidersHorizontal size={15} />
            </button>
            <button className="text-slate-400 hover:text-slate-600 transition">
              <Download size={15} />
            </button>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {[
                "Reference",
                "Merchant Name",
                "Region",
                "Cycle",
                "Amount",
                "Status",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {settlements.map(
              ({
                ref,
                initials,
                merchant,
                region,
                cycle,
                amount,
                status,
                statusColor,
              }) => (
                <tr
                  key={ref}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-5 py-4 text-blue-700 font-bold text-sm">
                    {ref}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 text-[11px] font-black flex items-center justify-center">
                        {initials}
                      </div>
                      <span className="font-medium text-slate-800">
                        {merchant}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-500 text-sm">{region}</td>
                  <td className="px-5 py-4 text-slate-500 text-sm">{cycle}</td>
                  <td className="px-5 py-4 font-bold text-slate-800">
                    {amount}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide ${statusColor}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="text-[11px] font-bold text-blue-700 hover:underline tracking-widest uppercase">
                      Details
                    </button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
        <div className="px-6 py-4 text-center border-t border-slate-100">
          <button className="text-sm font-bold text-blue-700 hover:underline tracking-wide">
            View All Transactions →
          </button>
        </div>
      </div>
    </div>
  );
}
