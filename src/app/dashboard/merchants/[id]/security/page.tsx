"use client";
import { useParams, useRouter } from "next/navigation";
import { Download, ShieldAlert } from "lucide-react";

const securityData: Record<string, any> = {
  "APP-9210-KV": {
    name: "Zanzibar Spices & Exports Ltd.",
    mid: "TUMA-9210-KV",
    riskScore: 22,
    riskLevel: "LOW RISK",
    riskColor: "text-green-600",
    flag: null,
    incident: null,
    auditTrail: [],
    flaggedEntries: [],
  },
  "APP-4402-TZ": {
    name: "M-Store Electronics",
    mid: "TUMA-44021-TZ",
    riskScore: 54,
    riskLevel: "MEDIUM RISK",
    riskColor: "text-amber-600",
    flag: "SECURITY FLAG: MEDIUM RISK",
    flagColor: "text-amber-600",
    incident: {
      title: "Incident Analysis: Elevated Chargebacks",
      desc: "System detected an elevated chargeback rate of 1.8% over the past 7 days, exceeding the 0.9% threshold. Multiple disputes linked to a single product SKU. Source patterns suggest potential merchant-initiated fraud.",
      velocity: "+42%",
      velocityAlert: true,
      failureRate: "1.8%",
      peerCluster: "Dodoma",
    },
    auditTrail: [
      {
        label: "Chargeback Threshold Breached",
        time: "TODAY · 10:15 EAT",
        desc: "12 disputes filed in 7-day window.",
        icon: "🔴",
      },
      {
        label: "Merchant Contacted",
        time: "TODAY · 11:30 EAT",
        desc: "Email sent requesting SKU documentation.",
        icon: "⚪",
      },
    ],
    flaggedEntries: [
      {
        time: "10:15:22\n24 OCT 2023",
        txId: "TX-44021-X881-TZ",
        channel: "CARD",
        amount: "12,400.00",
        status: "HELD",
        statusColor: "bg-red-100 text-red-600",
        highlight: true,
      },
      {
        time: "10:14:10\n24 OCT 2023",
        txId: "TX-44021-X880-TZ",
        channel: "CARD",
        amount: "11,800.00",
        status: "HELD",
        statusColor: "bg-red-100 text-red-600",
        highlight: true,
      },
      {
        time: "10:12:05\n24 OCT 2023",
        txId: "TX-44021-X879-TZ",
        channel: "CARD",
        amount: "10,950.00",
        status: "SETTLED",
        statusColor: "bg-green-100 text-green-700",
        highlight: false,
      },
    ],
  },
  "APP-7721-UG": {
    name: "Blue River Exchange",
    mid: "TUMA-7721-UG",
    riskScore: 88,
    riskLevel: "HIGH RISK",
    riskColor: "text-red-600",
    flag: "SECURITY FLAG: HIGH RISK",
    flagColor: "text-red-600",
    incident: {
      title: "Incident Analysis: Sanction List Match",
      desc: "Director name matched 78% similarity score against OFAC SDN list. Multiple high-value cross-border transfers flagged within 48h window. Source funds traced to sanctioned entities in Sudan and Iran corridors.",
      velocity: "+189%",
      velocityAlert: true,
      failureRate: "3.1%",
      peerCluster: "Kampala",
    },
    auditTrail: [
      {
        label: "Sanction Match Detected",
        time: "TODAY · 14:22 EAT",
        desc: "OFAC SDN partial match on director ID.",
        icon: "🔴",
      },
      {
        label: "Cross-Border Spike",
        time: "TODAY · 11:05 EAT",
        desc: "High-value transfers to Sudan corridor.",
        icon: "⚪",
      },
      {
        label: "Multiple IP Logins",
        time: "YESTERDAY · 23:45 EAT",
        desc: "8 distinct IP addresses in 2h window.",
        icon: "⚫",
      },
    ],
    flaggedEntries: [
      {
        time: "14:21:05\n24 OCT 2023",
        txId: "TX-7721-X992-UG",
        channel: "BANK",
        amount: "450,000.00",
        status: "HELD",
        statusColor: "bg-red-100 text-red-600",
        highlight: true,
      },
      {
        time: "14:20:12\n24 OCT 2023",
        txId: "TX-7721-X991-UG",
        channel: "BANK",
        amount: "380,000.00",
        status: "HELD",
        statusColor: "bg-red-100 text-red-600",
        highlight: true,
      },
      {
        time: "14:18:55\n24 OCT 2023",
        txId: "TX-7721-X985-UG",
        channel: "SWIFT",
        amount: "290,000.00",
        status: "SETTLED",
        statusColor: "bg-green-100 text-green-700",
        highlight: false,
      },
    ],
  },
  "APP-1029-KV": {
    name: "Duka Wholesale Ltd.",
    mid: "TUMA-99120-KE",
    riskScore: 92,
    riskLevel: "HIGH RISK",
    riskColor: "text-red-600",
    flag: "SECURITY FLAG: HIGH RISK",
    flagColor: "text-red-600",
    incident: {
      title: "Incident Analysis: Rapid Structuring",
      desc: "System intelligence flagged a sequence of 42 high-frequency, low-value transactions within a 120-minute window. Patterns align with manual structuring to avoid Tier-2 monitoring thresholds. Source funds originate from multiple disparate P2P agents in the Coast province.",
      velocity: "+214%",
      velocityAlert: true,
      failureRate: "4.12%",
      peerCluster: "Mombasa",
    },
    auditTrail: [
      {
        label: "Rapid Structuring Detected",
        time: "TODAY · 14:22 EAT",
        desc: "42 batch transactions under 10k KES.",
        icon: "🔴",
      },
      {
        label: "Mombasa-Region P2P Spike",
        time: "TODAY · 11:05 EAT",
        desc: "P2P volume 3x above regional baseline.",
        icon: "⚪",
      },
      {
        label: "Multiple IP Address Logins",
        time: "YESTERDAY · 23:45 EAT",
        desc: "Logins from 6 distinct IPs overnight.",
        icon: "⚫",
      },
    ],
    flaggedEntries: [
      {
        time: "14:21:05\n24 OCT 2023",
        txId: "TX-44021-X992-KE",
        channel: "TumaTap",
        amount: "9,400.00",
        status: "HELD",
        statusColor: "bg-red-100 text-red-600",
        highlight: true,
      },
      {
        time: "14:20:12\n24 OCT 2023",
        txId: "TX-44021-X991-KE",
        channel: "M-Pesa",
        amount: "8,950.00",
        status: "HELD",
        statusColor: "bg-red-100 text-red-600",
        highlight: true,
      },
      {
        time: "14:18:55\n24 OCT 2023",
        txId: "TX-44021-X985-KE",
        channel: "TumaTap",
        amount: "9,200.00",
        status: "SETTLED",
        statusColor: "bg-green-100 text-green-700",
        highlight: false,
      },
    ],
  },
};

export default function SecurityPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const d = securityData[id] ?? securityData["APP-1029-KV"];

  return (
    <div>
      {/* Back */}
      <div className="mb-5">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
        >
          ← Back to Merchant
        </button>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6 bg-white rounded-xl border border-slate-200 px-6 py-5">
        <div>
          {d.flag && (
            <div className="flex items-center gap-2 mb-1">
              <ShieldAlert size={14} className="text-red-500" />
              <p
                className={`text-[11px] font-black tracking-widest uppercase ${d.flagColor}`}
              >
                {d.flag}
              </p>
            </div>
          )}
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {d.name}
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
              MID: {d.mid}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Verified Merchant Profile
            </span>
          </div>
        </div>
        <div className="text-right border-l border-slate-100 pl-6">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
            Risk Score
          </p>
          <div className="flex items-baseline gap-1">
            <span className={`text-4xl font-black ${d.riskColor}`}>
              {d.riskScore}
            </span>
            <span className="text-slate-400 font-medium">/100</span>
          </div>
        </div>
      </div>

      {d.incident ? (
        <>
          <div className="grid grid-cols-3 gap-5 mb-5">
            {/* Incident analysis */}
            <div className="col-span-2 bg-blue-50 border border-blue-100 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a3de4"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                </svg>
                <p className="font-bold text-slate-800">{d.incident.title}</p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                {d.incident.desc}
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-blue-200">
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
                    24H Velocity
                  </p>
                  <p
                    className={`text-xl font-black ${d.incident.velocityAlert ? "text-red-600" : "text-slate-800"}`}
                  >
                    {d.incident.velocity}
                  </p>
                  {d.incident.velocityAlert && (
                    <div className="h-1 bg-red-500 rounded-full mt-1 w-16" />
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
                    Failure Rate
                  </p>
                  <p className="text-xl font-black text-slate-800">
                    {d.incident.failureRate}
                  </p>
                  <div className="h-1 bg-slate-300 rounded-full mt-1 w-16" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
                    Peer Cluster
                  </p>
                  <p className="text-xl font-black text-blue-700">
                    {d.incident.peerCluster}
                  </p>
                  <div className="h-1 bg-blue-500 rounded-full mt-1 w-16" />
                </div>
              </div>
            </div>

            {/* Audit trail */}
            <div className="bg-slate-900 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <p className="text-sm font-bold text-white">Audit Trail</p>
              </div>
              <div className="space-y-4">
                {d.auditTrail.map((item: any, i: number) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-sm flex-shrink-0 mt-0.5">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">
                        {item.label}
                      </p>
                      <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-0.5">
                        {item.time}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Flagged ledger entries */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-5">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <p className="font-bold text-slate-900">Flagged Ledger Entries</p>
              <button className="flex items-center gap-2 text-[11px] font-bold text-blue-700 hover:underline tracking-widest uppercase">
                <Download size={13} /> Export Raw Data
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {[
                    "Timestamp",
                    "Transaction ID",
                    "Channel",
                    "Amount (KES)",
                    "Status",
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
                {d.flaggedEntries.map((entry: any, i: number) => (
                  <tr
                    key={i}
                    className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {entry.highlight && (
                          <div className="w-0.5 h-8 bg-red-500 rounded-full flex-shrink-0" />
                        )}
                        <p className="text-[11px] text-slate-500 font-mono whitespace-pre-line">
                          {entry.time}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono text-sm text-slate-700">
                      {entry.txId}
                    </td>
                    <td className="px-5 py-4 text-slate-600 text-sm">
                      {entry.channel}
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-800">
                      {entry.amount}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide ${entry.statusColor}`}
                      >
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Command authorization */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase mb-1">
                Command Authorization
              </p>
              <p className="text-sm text-slate-500">
                Select an enforcement action to execute across the ledger.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition">
                🚫 Bulk Freeze Funds
              </button>
              <button
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
                style={{
                  background: "linear-gradient(135deg, #1a3de4, #1230b8)",
                }}
              >
                🔍 Initiate Audit
              </button>
              <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 transition">
                🪪 Request KYC
              </button>
              <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition">
                ✓ Clear Flag
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
          <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-4">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16a34a"
              strokeWidth="1.8"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <p className="text-xl font-bold text-slate-800 mb-1">
            No Security Flags
          </p>
          <p className="text-slate-400 text-sm">
            This merchant has no active security incidents.
          </p>
        </div>
      )}
    </div>
  );
}
