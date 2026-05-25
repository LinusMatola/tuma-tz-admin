"use client";
import { Download, Icon } from "lucide-react";
import { BsPhone, BsCreditCard, BsBank } from "react-icons/bs";

const kpis = [
  {
    label: "Success Rate (24H)",
    value: "99.82%",
    sub: "+0.12%",
    subColor: "text-green-600",
    valueColor: "text-blue-700",
    border: "border-l-blue-700",
  },
  {
    label: "Processing Latency",
    value: "245ms",
    sub: "-12ms",
    subColor: "text-green-600",
    valueColor: "text-purple-600",
    border: "border-l-purple-500",
  },
  {
    label: "Active Volume",
    value: "14.2k",
    sub: "tx/min",
    subColor: "text-slate-400",
    valueColor: "text-amber-600",
    border: "border-l-amber-500",
  },
  {
    label: "High Risk Flags",
    value: "04",
    sub: "Requires Audit",
    subColor: "text-red-500",
    valueColor: "text-red-600",
    border: "border-l-red-500",
  },
];

const transactions = [
  {
    id: "TXN-8829-XPK",
    merchant: "Safcom Global Ltd.",
    time: "Just now",
    amount: "KES 42,000.00",
    type: "B2B Settlement",
    method: "M-PESA",
    icon: BsPhone,
    status: "PAID",
    statusColor: "bg-green-100 text-green-700",
    risk: 12,
    riskColor: "text-slate-700",
    bar: "bg-green-500",
  },
  {
    id: "TXN-8828-LQA",
    merchant: "Zanzibar Spices Ent.",
    time: "2 mins ago",
    amount: "TZS 185,200.00",
    type: "Retail Sale",
    method: "CARD",
    icon: BsCreditCard,
    status: "PENDING",
    statusColor: "bg-amber-100 text-amber-700",
    risk: 45,
    riskColor: "text-slate-700",
    bar: "bg-amber-500",
  },
  {
    id: "TXN-8827-ZMT",
    merchant: "Crypto Bridge KE",
    time: "5 mins ago",
    amount: "KES 9,400.00",
    type: "P2P Transfer",
    method: "M-PESA",
    icon: BsPhone,
    status: "FAILED",
    statusColor: "bg-red-100 text-red-600",
    risk: 92,
    riskColor: "text-red-600 font-bold",
    bar: "bg-red-500",
  },
  {
    id: "TXN-8826-WXV",
    merchant: "Nairobi Logistics",
    time: "12 mins ago",
    amount: "KES 112,500.00",
    type: "Fuel Advance",
    method: "BANK",
    icon: BsBank,
    status: "PAID",
    statusColor: "bg-green-100 text-green-700",
    risk: 8,
    riskColor: "text-slate-700",
    bar: "bg-green-500",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Global Transactions Monitoring
          </h1>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
            <span className="text-[11px] font-bold tracking-[0.15em] text-green-600 uppercase">
              Real-Time Feed Active
            </span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
          <Download size={15} strokeWidth={2} />
          Export CSV
        </button>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {kpis.map(({ label, value, sub, subColor, valueColor, border }) => (
          <div
            key={label}
            className={`bg-white rounded-xl border border-slate-200 border-l-4 ${border} px-5 py-4`}
          >
            <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-2">
              {label}
            </p>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-2xl font-black tracking-tight ${valueColor}`}
              >
                {value}
              </span>
              <span className={`text-xs font-semibold ${subColor}`}>{sub}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {[
                "Transaction ID",
                "Merchant",
                "Amount",
                "Method",
                "Status",
                "Risk Score",
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
            {transactions.map(
              ({
                id,
                merchant,
                time,
                amount,
                type,
                icon: Icon,
                method,
                status,
                statusColor,
                risk,
                riskColor,
                bar,
              }) => (
                <tr
                  key={id}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/dashboard/transactions/${id}`)
                  }
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-0.5 h-8 rounded-full ${bar}`} />
                      <div>
                        <p className="font-bold text-slate-800 text-[13px]">
                          {id}
                        </p>
                        <p className="text-[11px] text-slate-400">{time}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-700">
                    {merchant}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-800">{amount}</p>
                    <p className="text-[11px] text-slate-400">{type}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Icon size={14} />
                      <span className="font-medium text-[12px]">{method}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide ${statusColor}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td
                    className={`px-5 py-4 font-bold text-[15px] ${riskColor}`}
                  >
                    {risk}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Showing 1–25 of 1,482 entries
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
              Previous
            </button>
            <button
              className="px-4 py-2 rounded-lg text-sm font-bold text-white transition hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #1a3de4, #1230b8)",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
