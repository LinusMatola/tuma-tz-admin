"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";

const volumeData = [
  { day: "MON", volume: 420 },
  { day: "TUE", volume: 680 },
  { day: "WED", volume: 540 },
  { day: "THU", volume: 820 },
  { day: "FRI", volume: 960 },
  { day: "SAT", volume: 580 },
  { day: "SUN", volume: 390 },
];

const discrepancies = [
  {
    id: "#TRX-9902-X",
    type: "Merchant Payout",
    typeColor: "bg-red-100 text-red-600",
    source: "KCB Nostro 02",
    sourceNote: "Missing Gateway Confirmation",
    amount: "1,240,000.00",
    alert: "!",
  },
  {
    id: "#TRX-8812-A",
    type: "Inter-Bank Settlement",
    typeColor: "bg-amber-100 text-amber-700",
    source: "Equity Clearing",
    sourceNote: "Duplicate Terminal Entry",
    amount: "45,300.20",
    alert: "▲",
  },
  {
    id: "#TRX-7741-L",
    type: "Consumer Deposit",
    typeColor: "bg-blue-100 text-blue-700",
    source: "M-Pesa Ledger",
    sourceNote: "Timestamp Mismatch > 5min",
    amount: "12,500.00",
    alert: "▲",
  },
];

export default function ReconciliationOverview() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Settlement Reconciliation
        </h1>
        <div className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="text-xs text-slate-400">Admin User</span>
          <span className="text-xs font-bold text-slate-600">
            Global Access
          </span>
        </div>
      </div>

      {/* Live status + liquidity */}
      <div className="grid grid-cols-3 gap-5 mb-5">
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-[10px] font-bold tracking-[0.15em] text-blue-600 uppercase mb-1">
            Live Reconciliation Status
          </p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-5xl font-black text-slate-900 mb-2">98.42%</p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  ↗{" "}
                  <span className="text-green-600 font-bold">
                    +2.1% from Yesterday
                  </span>
                </span>
                <span>1,245,093 Transactions Cleared Today</span>
              </div>
            </div>
            <div className="w-20 h-20 relative">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#1a3de4"
                  strokeWidth="10"
                  strokeDasharray={`${98.42 * 2.64} 264`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a3de4"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-700 rounded-xl p-6 text-white">
          <p className="text-[10px] font-bold tracking-widests text-blue-200 uppercase mb-2">
            Global Liquidity
          </p>
          <p className="text-3xl font-black mb-4">KES 4.28B</p>
          <button className="w-full py-2.5 rounded-xl border border-white/30 text-white text-xs font-bold tracking-widests uppercase hover:bg-white/10 transition">
            Initiate Global Batch Settlement
          </button>
        </div>
      </div>

      {/* Sync status + discrepancies */}
      <div className="grid grid-cols-2 gap-5 mb-5">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="font-bold text-slate-900">Match Sync</p>
            <button className="text-slate-400 hover:text-slate-600">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            {[
              {
                label: "Terminal Logs",
                value: "99.9%",
                status: "Synced",
                color: "bg-green-500",
              },
              {
                label: "Payment Gateway",
                value: "98.8%",
                status: "Synced",
                color: "bg-green-500",
              },
              {
                label: "Nostro Accounts",
                value: "96.2%",
                status: "Delayed",
                color: "bg-amber-500",
              },
            ].map(({ label, value, status, color }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] font-bold tracking-widests text-slate-500 uppercase">
                    {label}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-black text-slate-800">{value}</p>
                    <span className="text-[10px] font-bold text-slate-400">
                      {status}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full">
                  <div
                    className={`h-1.5 rounded-full ${color}`}
                    style={{ width: value }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <p className="font-bold text-slate-900">Discrepancy Queue</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-[11px] font-bold hover:bg-blue-100 transition">
                Review All (12)
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition">
                Export Logs
              </button>
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {[
                  "Transaction ID",
                  "Type",
                  "Source / Nostro",
                  "Amount (KES)",
                  "",
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
              {discrepancies.map(
                ({
                  id,
                  type,
                  typeColor,
                  source,
                  sourceNote,
                  amount,
                  alert,
                }) => (
                  <tr
                    key={id}
                    className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-bold text-slate-800 text-sm">
                      {id}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${typeColor}`}
                      >
                        {type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs font-bold text-slate-700">
                        {source}
                      </p>
                      <p className="text-[10px] text-slate-400">{sourceNote}</p>
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-800">
                      {amount}
                    </td>
                    <td className="px-4 py-3 text-red-500 font-black">
                      {alert}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-1">
            <p className="font-bold text-slate-900">Volume Distribution</p>
            <p className="text-green-600 font-black text-sm">+12.4%</p>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Daily transaction volume per provider
          </p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={volumeData} barSize={22}>
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

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-1">
            <p className="font-bold text-slate-900">Payment Matching</p>
            <p className="text-purple-600 font-black text-sm">99.8%</p>
          </div>
          <p className="text-xs text-slate-400 mb-5">
            Settlement vs Requested amounts
          </p>
          <div className="space-y-4">
            {[
              {
                label: "Settled Funds",
                value: "KES 2.1B",
                width: "92%",
                color: "bg-blue-600",
                valueColor: "text-blue-700",
              },
              {
                label: "Pending Approval",
                value: "KES 142M",
                width: "30%",
                color: "bg-purple-500",
                valueColor: "text-purple-600",
              },
              {
                label: "Flagged for Review",
                value: "KES 12.4M",
                width: "8%",
                color: "bg-red-500",
                valueColor: "text-red-600",
              },
            ].map(({ label, value, width, color, valueColor }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-slate-700">{label}</p>
                  <p className={`text-sm font-black ${valueColor}`}>{value}</p>
                </div>
                <div className="h-2 bg-slate-100 rounded-full">
                  <div
                    className={`h-2 rounded-full ${color}`}
                    style={{ width }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            className="mt-5 w-full py-2.5 rounded-xl text-white text-xs font-bold tracking-widests uppercase hover:opacity-90 transition flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
          >
            ⚡ Execute Manual Match
          </button>
        </div>
      </div>
    </div>
  );
}
