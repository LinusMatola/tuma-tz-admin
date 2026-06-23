"use client";
import { useRouter } from "next/navigation";
import { Download, RefreshCw } from "lucide-react";

const logs = [
  {
    id: "audit-001",
    timestamp: "2023-11-24 14:22:01",
    tz: "UTC +3",
    operatorInitials: "SK",
    operatorId: "SK-9221",
    operatorColor: "bg-red-100 text-red-700",
    action: "Suspended Merchant: Toby's Gym due to suspected velocity breach.",
    actionColor: "text-slate-800",
    entityId: "M-90221-TJ",
    entityColor: "bg-red-50 text-red-600",
    ip: "192.168.4.122",
    risk: "CRITICAL",
    riskColor: "bg-red-100 text-red-600",
    bar: "bg-red-500",
  },
  {
    id: "audit-002",
    timestamp: "2023-11-24 14:18:55",
    tz: "UTC +3",
    operatorInitials: "JD",
    operatorId: "JD-1102",
    operatorColor: "bg-blue-100 text-blue-700",
    action:
      "Manual Settlement: Forced release of $4,200.00 to Merchant Hub-88.",
    actionColor: "text-slate-800",
    entityId: "SET-9921-X",
    entityColor: "bg-blue-50 text-blue-600",
    ip: "10.0.0.45",
    risk: "NORMAL",
    riskColor: "bg-green-100 text-green-700",
    bar: "bg-blue-500",
  },
  {
    id: "audit-003",
    timestamp: "2023-11-24 14:05:12",
    tz: "UTC +3",
    operatorInitials: "SY",
    operatorId: "SYS-ENG",
    operatorColor: "bg-amber-100 text-amber-700",
    action: "Rule Modified: Velocity cap increased from 50k to 75k for Tier-1.",
    actionColor: "text-slate-800",
    entityId: "RUL-ETH-01",
    entityColor: "bg-amber-50 text-amber-600",
    ip: "Localhost",
    risk: "WARNING",
    riskColor: "bg-amber-100 text-amber-700",
    bar: "bg-amber-500",
  },
  {
    id: "audit-004",
    timestamp: "2023-11-24 13:44:22",
    tz: "UTC +3",
    operatorInitials: "UK",
    operatorId: "UNKNOWN",
    operatorColor: "bg-red-100 text-red-700",
    action:
      "Failed Login Attempt: 5 consecutive failures from high-risk region.",
    actionColor: "text-red-600",
    entityId: "USR-662",
    entityColor: "bg-red-50 text-red-600",
    ip: "102.22.1.9",
    risk: "CRITICAL",
    riskColor: "bg-red-100 text-red-600",
    bar: "bg-red-500",
  },
];

export default function AuditTrailPage() {
  const router = useRouter();

  return (
    <div>
      {/* Topbar style header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard/compliance")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
          >
            ← Back
          </button>
          <div>
            <p className="text-blue-700 font-black text-lg">
              System Audit Trail
            </p>
            <p className="text-xs text-slate-400">
              Immutable cryptographic log of all platform events
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Admin Alpha
          <span className="text-slate-400 font-normal">SUPERUSER</span>
        </div>
      </div>

      {/* Filters + live status */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        <div className="col-span-3 grid grid-cols-3 gap-3">
          {[
            { label: "Event Category", value: "All Categories" },
            { label: "Risk Level", value: "All Levels" },
            { label: "Date Range", value: "Last 24 Hours" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
                {label}
              </p>
              <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-2.5">
                <span className="text-sm text-slate-700 font-medium">
                  {value}
                </span>
                <span className="text-slate-400">▾</span>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-blue-700 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-widests text-blue-200 uppercase mb-1">
              Live Feed Status
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white font-bold text-sm">
                Monitoring Enabled
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <button className="flex-1 py-1.5 rounded-lg bg-white text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition flex items-center justify-center gap-1">
              <Download size={11} /> Export CSV
            </button>
            <button className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white hover:bg-blue-500 transition">
              <RefreshCw size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {[
                "Timestamp",
                "Operator",
                "Action Description",
                "Entity ID",
                "Origin IP",
                "Risk",
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
            {logs.map((log) => (
              <tr
                key={log.id}
                className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() =>
                  router.push(`/dashboard/compliance/audit/${log.id}`)
                }
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-0.5 h-10 rounded-full ${log.bar} flex-shrink-0`}
                    />
                    <div>
                      <p className="font-bold text-slate-800 text-[13px]">
                        {log.timestamp}
                      </p>
                      <p className="text-[11px] text-slate-400">{log.tz}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0 ${log.operatorColor}`}
                    >
                      {log.operatorInitials}
                    </div>
                    <span className="font-bold text-slate-700 text-[12px]">
                      {log.operatorId}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 max-w-xs">
                  <p
                    className={`text-sm font-semibold leading-relaxed ${log.actionColor}`}
                  >
                    {log.action}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold font-mono ${log.entityColor}`}
                  >
                    {log.entityId}
                  </span>
                </td>
                <td className="px-5 py-4 font-mono text-sm text-slate-500">
                  {log.ip}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widests ${log.riskColor}`}
                  >
                    {log.risk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Showing 1-25 of 12,842 total log entries
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
              514
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition text-sm">
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Bottom panels */}
      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white rounded-xl border border-slate-200 border-l-4 border-l-red-500 p-5">
          <p className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase mb-2">
            Integrity Check
          </p>
          <p className="text-lg font-black text-red-600 mb-1">
            99.98% Hash Verified
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            All audit entries for the last 24 hours have been cryptographically
            signed.
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 border-l-4 border-l-blue-700 p-5">
          <p className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase mb-2">
            Operator Activity
          </p>
          <p className="text-lg font-black text-slate-900 mb-1">
            14 Active Admins
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Current session volume is within normal historical baseline
            parameters.
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 border-l-4 border-l-purple-500 p-5">
          <p className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase mb-2">
            Quick Diagnostic
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex-shrink-0 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900" />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">
                Anomaly Detection
              </p>
              <p className="text-xs text-slate-400">
                0 suspicious patterns found.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
