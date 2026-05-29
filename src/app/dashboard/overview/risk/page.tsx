"use client";
import { useRouter } from "next/navigation";

const kpis = [
  {
    label: "Volume Threshold",
    value: "+214%",
    sub: "vs 24h",
    desc: "Abnormal spike detected in Mombasa-Region Peer-to-Peer channels.",
    action: "VIEW HEATMAP →",
    actionColor: "text-red-600",
    border: "border-l-red-500",
    valueColor: "text-red-600",
  },
  {
    label: "Failure Rate",
    value: "4.12%",
    sub: "Elevated",
    desc: "External Switch Latency in TZ: Gateway 04 reported 4,892 timeouts.",
    action: "CHECK SWITCH LOGS →",
    actionColor: "text-amber-600",
    border: "border-l-amber-500",
    valueColor: "text-amber-600",
  },
  {
    label: "KYC Compliance",
    value: "82",
    sub: "Expiring",
    desc: "Merchant operating licenses in high-risk categories expire within 72h.",
    action: "AUTOMATE OUTREACH →",
    actionColor: "text-purple-600",
    border: "border-l-purple-500",
    valueColor: "text-purple-700",
  },
];

const merchants = [
  {
    name: "Zanzibar Spices & Exports Ltd.",
    mid: "TUMA-9210-KV",
    risk: 92,
    riskColor: "text-red-600",
    barColor: "bg-red-500",
    trend: "↗",
    trendColor: "text-red-500",
    violation: "RAPID STRUCTURING",
    violationColor: "bg-red-100 text-red-600",
    icon: "⚠",
    iconBg: "bg-red-50 text-red-500",
  },
  {
    name: "M-Store Retail Ltd.",
    mid: "TUMA-44021-TZ",
    risk: 74,
    riskColor: "text-amber-600",
    barColor: "bg-amber-500",
    trend: "→",
    trendColor: "text-slate-400",
    violation: "HIGH CHARGEBACK",
    violationColor: "bg-amber-100 text-amber-700",
    icon: "▤",
    iconBg: "bg-amber-50 text-amber-500",
  },
  {
    name: "Global Payout Services",
    mid: "TUMA-11092-UG",
    risk: 88,
    riskColor: "text-red-600",
    barColor: "bg-red-500",
    trend: "↗",
    trendColor: "text-red-500",
    violation: "SANCTION LIST MATCH",
    violationColor: "bg-red-100 text-red-600",
    icon: "▣",
    iconBg: "bg-red-50 text-red-500",
  },
];

const feeds = [
  {
    label: "VELOCITY BREACH",
    labelColor: "text-amber-500",
    time: "12:44:02",
    message:
      "Multiple withdrawal attempts (>10) from single IP 192.168.1.104 in 5m.",
    tags: ["AUTO-BLOCK IP", "MSMISS"],
  },
  {
    label: "ABNORMAL LOCATION",
    labelColor: "text-red-400",
    time: "12:41:55",
    message: "Merchant ID-442 logged in from Lagos, NG. Expected: Nairobi, KE.",
    tags: ["REQUIRE MFA", "MSMISS"],
  },
  {
    label: "SETTLEMENT LIMIT",
    labelColor: "text-amber-500",
    time: "12:38:10",
    message:
      "Daily payout limit reached for Tier 2 merchants. Manual approval required for 12 pending.",
    tags: ["GO TO QUEUE"],
  },
];

export default function RiskCommand() {
  const router = useRouter();
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Risk & Command Overview
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
          <span className="text-sm text-slate-500">
            Real-time throughput: 1,242 TPS • Active Monitoring Engaged
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {kpis.map(
          ({
            label,
            value,
            sub,
            desc,
            action,
            actionColor,
            border,
            valueColor,
          }) => (
            <div
              key={label}
              className={`bg-white rounded-xl border border-slate-200 border-l-4 ${border} p-5`}
            >
              <p
                className={`text-[10px] font-bold tracking-[0.15em] uppercase mb-2 ${actionColor}`}
              >
                {label}
              </p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className={`text-3xl font-black ${valueColor}`}>
                  {value}
                </span>
                <span className="text-sm text-slate-400 font-medium">
                  {sub}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                {desc}
              </p>
              <button
                className={`text-[11px] font-bold tracking-widest ${actionColor} hover:underline`}
              >
                {action}
              </button>
            </div>
          ),
        )}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Flagged Merchant Activity */}
        <div className="col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <p className="font-bold text-slate-900">
                Flagged Merchant Activity
              </p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition tracking-widest uppercase">
                  Export Ledger
                </button>
                <button
                  className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-white tracking-widest uppercase hover:opacity-90 transition"
                  style={{
                    background: "linear-gradient(135deg, #1a3de4, #1230b8)",
                  }}
                >
                  Bulk Freeze
                </button>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {[
                    "Merchant Name / ID",
                    "Risk Score",
                    "Trend (7M)",
                    "Violation Type",
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
                {merchants.map(
                  ({
                    name,
                    mid,
                    risk,
                    riskColor,
                    barColor,
                    trend,
                    trendColor,
                    violation,
                    violationColor,
                    icon,
                    iconBg,
                  }) => (
                    <tr
                      key={mid}
                      className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${iconBg}`}
                          >
                            {icon}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">
                              {name}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              MID: {mid}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full">
                            <div
                              className={`h-1.5 rounded-full ${barColor}`}
                              style={{ width: `${risk}%` }}
                            />
                          </div>
                          <span className={`font-black text-sm ${riskColor}`}>
                            {risk}
                          </span>
                        </div>
                      </td>
                      <td
                        className={`px-5 py-4 text-lg font-bold ${trendColor}`}
                      >
                        {trend}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide ${violationColor}`}
                        >
                          {violation}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() =>
                            router.push(
                              `/dashboard/merchants/${
                                mid === "TUMA-44021-TZ"
                                  ? "APP-1029-KV"
                                  : mid === "TUMA-44021-TZ"
                                    ? "APP-4402-TZ"
                                    : "APP-7721-UG"
                              }/security`,
                            )
                          }
                          className="text-[11px] font-bold text-blue-700 hover:underline tracking-widest uppercase"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Live Security Feeds */}
          <div className="bg-slate-900 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-white text-sm">
                Live Security Feeds
              </p>
              <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded tracking-widest">
                LIVE
              </span>
            </div>
            <div className="space-y-4">
              {feeds.map((feed, i) => (
                <div
                  key={i}
                  className="border-b border-slate-700 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-bold tracking-widest ${feed.labelColor}`}
                    >
                      {feed.label}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {feed.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    {feed.message}
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    {feed.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-slate-700 text-slate-400 text-[10px] font-bold rounded tracking-widest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Neural Risk Engine */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="h-24 bg-slate-800 rounded-lg mb-4 relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 50%, #1a3de4 0%, #0a0f2e 100%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/20 text-6xl font-black">AI</div>
              </div>
            </div>
            <p className="font-bold text-slate-900 mb-0.5">
              Neural Risk Engine
            </p>
            <p className="text-xs text-slate-400 mb-4">
              V3.1 model running with 99.8% precision.
            </p>
            <button className="w-full py-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition tracking-widest uppercase">
              Configure Thresholds
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200">
        <div className="flex items-center gap-6 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          <span>🔒 PCI-DSS L1 Compliant</span>
          <span>🔐 AES-256 Encrypted Stream</span>
        </div>
        <p className="text-[10px] text-slate-300 tracking-widest uppercase">
          © 2024 Tuma Fintech Systems • Node: 04-KYA-COMMAND
        </p>
      </div>
    </div>
  );
}
