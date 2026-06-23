"use client";
import { Download } from "lucide-react";

const logs = [
  {
    date: "Oct 24, 2023",
    time: "14:22:18 UTC",
    action: "Approved Merchant #8829",
    entityId: "MERC_AUDIT_X9",
    entityColor: "text-blue-700",
    ip: "192.168.1.104",
    flagged: true,
  },
  {
    date: "Oct 24, 2023",
    time: "13:05:44 UTC",
    action: "Modified Rule Engine Threshold",
    entityId: "RULE_PROD_04",
    entityColor: "text-purple-600",
    ip: "192.168.1.104",
    flagged: false,
  },
  {
    date: "Oct 23, 2023",
    time: "18:45:12 UTC",
    action: "Initiated Bulk Settlement",
    entityId: "BATCH_SETTLE_V0",
    entityColor: "text-amber-600",
    ip: "10.0.42.188",
    flagged: false,
  },
  {
    date: "Oct 23, 2023",
    time: "11:15:02 UTC",
    action: "Manual Override: Fraud Flag",
    entityId: "TX_REF_5521",
    entityColor: "text-red-600",
    ip: "192.168.1.104",
    flagged: false,
  },
  {
    date: "Oct 23, 2023",
    time: "09:30:11 UTC",
    action: "System Configuration Updated",
    entityId: "SYS_CFG_ROOT",
    entityColor: "text-blue-600",
    ip: "192.168.1.104",
    flagged: false,
  },
  {
    date: "Oct 22, 2023",
    time: "22:01:59 UTC",
    action: "Validated Payout Gateway",
    entityId: "GATE_VAL_TZ_01",
    entityColor: "text-green-600",
    ip: "211.45.12.9",
    flagged: false,
  },
];

const barColors = [
  "bg-blue-600",
  "bg-purple-500",
  "bg-amber-500",
  "bg-red-500",
  "bg-blue-400",
  "bg-green-500",
];

export default function ActivityLogsPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <p className="text-[11px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-4">
        Systems › Administrators ›{" "}
        <span className="text-blue-700">Activity Logs</span>
      </p>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            User Activity Logs
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Immutable record of actions for{" "}
            <span className="font-bold text-slate-700">
              Admin_8842 (David Chen)
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
            ☰ Filter
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
          >
            <Download size={15} /> Export Ledger
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Total Actions",
            value: "1,284",
            barColor: "bg-blue-600",
            barWidth: "80%",
          },
          {
            label: "Security Events",
            value: "12",
            barColor: "bg-purple-500",
            barWidth: "20%",
            valueColor: "text-purple-600",
          },
          {
            label: "Last Active",
            value: "2m Ago",
            sub: "Session Valid",
            subColor: "text-green-600",
          },
          {
            label: "Authority Level",
            value: "Tier 3",
            sub: "Full Settlement Access",
            valueColor: "text-amber-600",
          },
        ].map(
          ({
            label,
            value,
            barColor,
            barWidth,
            sub,
            subColor,
            valueColor,
          }: any) => (
            <div
              key={label}
              className="bg-white rounded-xl border border-slate-200 px-5 py-4"
            >
              <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-2">
                {label}
              </p>
              <p
                className={`text-2xl font-black ${valueColor ?? "text-slate-900"} mb-1`}
              >
                {value}
              </p>
              {barColor && (
                <div className="h-1 bg-slate-100 rounded-full">
                  <div
                    className={`h-1 rounded-full ${barColor}`}
                    style={{ width: barWidth }}
                  />
                </div>
              )}
              {sub && (
                <p
                  className={`text-[11px] font-semibold mt-1 ${subColor ?? "text-slate-400"}`}
                >
                  {sub}
                </p>
              )}
            </div>
          ),
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {[
                "Timestamp",
                "Action",
                "Entity ID",
                "IP Address",
                "Details",
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
            {logs.map(
              (
                { date, time, action, entityId, entityColor, ip, flagged },
                i,
              ) => (
                <tr
                  key={i}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-0.5 h-8 rounded-full ${barColors[i]}`}
                      />
                      <div>
                        <p className="font-bold text-slate-800 text-[13px]">
                          {date}
                        </p>
                        <p className="text-[11px] text-slate-400">{time}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-800">
                    {action}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`font-mono text-[12px] font-bold ${entityColor}`}
                    >
                      {entityId}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600 text-sm font-mono">
                        {ip}
                      </span>
                      {flagged && (
                        <span className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 24 24"
                            fill="#1a3de4"
                          >
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <button className="text-slate-400 hover:text-blue-700 transition">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Displaying 100 of 1,284 entries
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
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition text-sm">
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Bottom panels */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 bg-slate-900 rounded-xl p-6">
          <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-3">
            Integrity Protocol Active
          </p>
          <p className="text-sm text-slate-300 leading-relaxed mb-5">
            Every activity listed in this ledger is cryptographically signed and
            cross-referenced with the architectural core. Modifications to these
            logs are technically impossible without multi-sig authority.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                Hash Algorithm
              </p>
              <p className="font-bold text-blue-400 text-sm">
                SHA-384 Architectural
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                Verification Status
              </p>
              <p className="font-bold text-green-400 text-sm">100% Validated</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <p className="text-sm font-black text-slate-900">Access Audit</p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              System detected 3 unauthorized attempts from IP 45.22.1.8 in the
              last 24 hours. Automatic lockdown protocols remain standby.
            </p>
          </div>
          <div className="bg-amber-700 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <p className="text-[10px] font-black tracking-widests text-amber-200 uppercase">
                Metadata Map
              </p>
            </div>
            <p className="text-xs text-amber-100 leading-relaxed">
              Current audit depth: Extreme. Logs include environmental variables
              and user-agent string data for forensic reconstruction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
