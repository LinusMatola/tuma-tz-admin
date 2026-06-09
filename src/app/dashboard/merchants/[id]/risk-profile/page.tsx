"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { AlertTriangle, ShieldAlert } from "lucide-react";

const riskData: Record<string, any> = {
  "APP-9210-KV": {
    name: "Zanzibar Spices & Exports Ltd.",
    mid: "TUMA-9210-KV",
    location: "Zanzibar, KE",
    riskLevel: "LOW RISK",
    riskColor: "bg-green-100 text-green-700",
    riskScore: 22,
    threshold: 22,
    thresholdLabel: "WITHIN THRESHOLD",
    thresholdColor: "text-green-600",
    volatility: "+4%",
    avgScore: 22,
    riskEvent: "1/Mo",
    sectorPeer: 24,
    scoreHistory: [18, 20, 19, 22, 21, 22, 22, 20, 21, 22, 22, 22],
    anomaly: null,
    complianceDocs: [
      {
        label: "Business Registration",
        sub: "Verified Jan 2024",
        status: "ok",
      },
      { label: "Director's Identification", sub: "Valid", status: "ok" },
      { label: "KRA Tax Compliance", sub: "Valid", status: "ok" },
      { label: "Proof of Address", sub: "Verified", status: "ok" },
    ],
    chargebackRatio: "0.4%",
    chargebackBar: 44,
    chargebackAlert: false,
    refundFrequency: "2.1%",
    refundAlert: false,
    recentTicket: null,
    riskEvents: [
      {
        date: "2024-05-10\n09:00:01 UTC",
        type: "NOTE_ADDED",
        typeColor: "bg-slate-100 text-slate-600",
        impact: "0 Impact",
        impactColor: "text-slate-500",
        impactBar: "bg-slate-300",
        desc: "Routine compliance check passed.",
        triggeredBy: "Compliance_Worker",
      },
    ],
  },
  "APP-4402-TZ": {
    name: "M-Store Electronics",
    mid: "TUMA-44021-TZ",
    location: "Tanzania, Dodoma",
    riskLevel: "MEDIUM RISK",
    riskColor: "bg-amber-100 text-amber-700",
    riskScore: 54,
    threshold: 54,
    thresholdLabel: "ELEVATED",
    thresholdColor: "text-amber-600",
    volatility: "+9%",
    avgScore: 54,
    riskEvent: "2/Mo",
    sectorPeer: 24,
    scoreHistory: [30, 35, 40, 42, 45, 50, 52, 54, 53, 54, 54, 54],
    anomaly:
      "Elevated chargeback rate detected in E-Commerce category. Manual review recommended.",
    complianceDocs: [
      {
        label: "Business Registration",
        sub: "Verified Jan 2024",
        status: "ok",
      },
      {
        label: "Director's Identification",
        sub: "Expires in 30 days",
        status: "warn",
      },
      { label: "KRA Tax Compliance", sub: "Valid", status: "ok" },
      { label: "Proof of Address", sub: "Not Requested", status: "missing" },
    ],
    chargebackRatio: "1.8%",
    chargebackBar: 78,
    chargebackAlert: true,
    refundFrequency: "6.2%",
    refundAlert: false,
    recentTicket: {
      id: "#8801",
      desc: "Customer dispute on returned electronics item.",
      status: "PENDING RESOLUTION",
      time: "5h ago",
    },
    riskEvents: [
      {
        date: "2024-05-17\n09:15:44 UTC",
        type: "DOC_EXPIRY",
        typeColor: "bg-amber-100 text-amber-700",
        impact: "+5 Risk",
        impactColor: "text-amber-600",
        impactBar: "bg-amber-500",
        desc: "Director ID expiring soon. Renewal notice sent.",
        triggeredBy: "Compliance_Worker",
      },
    ],
  },
  "APP-7721-UG": {
    name: "Blue River Exchange",
    mid: "TUMA-7721-UG",
    location: "Uganda, Kampala",
    riskLevel: "HIGH RISK",
    riskColor: "bg-red-100 text-red-600",
    riskScore: 88,
    threshold: 88,
    thresholdLabel: "CRITICAL THRESHOLD",
    thresholdColor: "text-red-600",
    volatility: "+18%",
    avgScore: 88,
    riskEvent: "5/Mo",
    sectorPeer: 24,
    scoreHistory: [40, 50, 55, 60, 65, 70, 75, 80, 82, 85, 87, 88],
    anomaly:
      "Sanction list partial match detected. Multiple high-value transfers flagged. Immediate review required.",
    complianceDocs: [
      {
        label: "Business Registration",
        sub: "Verified Jan 2024",
        status: "ok",
      },
      {
        label: "Director's Identification",
        sub: "Expires in 12 days",
        status: "warn",
      },
      {
        label: "KRA Tax Compliance",
        sub: "Certificate Expired",
        status: "expired",
      },
      { label: "Proof of Address", sub: "Not Requested", status: "missing" },
    ],
    chargebackRatio: "3.1%",
    chargebackBar: 100,
    chargebackAlert: true,
    refundFrequency: "9.8%",
    refundAlert: true,
    recentTicket: {
      id: "#8815",
      desc: "Sanction list match flagged for manual review.",
      status: "UNDER INVESTIGATION",
      time: "1h ago",
    },
    riskEvents: [
      {
        date: "2024-05-18\n14:22:01 UTC",
        type: "RULE_VIOLATION",
        typeColor: "bg-red-100 text-red-600",
        impact: "+15 Risk",
        impactColor: "text-red-600",
        impactBar: "bg-red-500",
        desc: "Multiple card attempts from single IP (Sudan range).",
        triggeredBy: "System_Engine_V4",
      },
      {
        date: "2024-05-17\n09:15:44 UTC",
        type: "DOC_EXPIRY",
        typeColor: "bg-amber-100 text-amber-700",
        impact: "+5 Risk",
        impactColor: "text-amber-600",
        impactBar: "bg-amber-500",
        desc: "KRA Tax certificate expired. Payout restriction warned.",
        triggeredBy: "Compliance_Worker",
      },
      {
        date: "2024-05-15\n18:44:12 UTC",
        type: "NOTE_ADDED",
        typeColor: "bg-slate-100 text-slate-600",
        impact: "0 Impact",
        impactColor: "text-slate-500",
        impactBar: "bg-slate-300",
        desc: "Merchant responded to KYB inquiry with temporary cert.",
        triggeredBy: "Operator_SarahK",
      },
    ],
  },
  "APP-1029-KV": {
    name: "Toby's Gym",
    mid: "TUMA-8829-KY-01",
    location: "Nairobi, KE",
    riskLevel: "HIGH RISK",
    riskColor: "bg-red-100 text-red-600",
    riskScore: 78,
    threshold: 78,
    thresholdLabel: "CRITICAL THRESHOLD",
    thresholdColor: "text-red-600",
    volatility: "+14%",
    avgScore: 52,
    riskEvent: "3/Mo",
    sectorPeer: 24,
    scoreHistory: [20, 25, 30, 35, 45, 50, 55, 60, 65, 70, 75, 78],
    anomaly:
      "Saturday 22:00-02:00 window shows 400% volume increase compared to sectoral baseline for Gym/Fitness categories. Potential structured deposits detected.",
    complianceDocs: [
      {
        label: "Business Registration",
        sub: "Verified Jan 2024",
        status: "ok",
      },
      {
        label: "Director's Identification",
        sub: "Expires in 12 days",
        status: "warn",
      },
      {
        label: "KRA Tax Compliance",
        sub: "Certificate Expired",
        status: "expired",
      },
      { label: "Proof of Address", sub: "Not Requested", status: "missing" },
    ],
    chargebackRatio: "2.4%",
    chargebackBar: 90,
    chargebackAlert: true,
    refundFrequency: "8.1%",
    refundAlert: false,
    recentTicket: {
      id: "#8812",
      desc: "Merchant refused to cancel subscription after 3-day cooling period...",
      status: "PENDING RESOLUTION",
      time: "2h ago",
    },
    riskEvents: [
      {
        date: "2024-05-18\n14:22:01 UTC",
        type: "RULE_VIOLATION",
        typeColor: "bg-red-100 text-red-600",
        impact: "+15 Risk",
        impactColor: "text-red-600",
        impactBar: "bg-red-500",
        desc: "Multiple card attempts from single IP (Sudan range).",
        triggeredBy: "System_Engine_V4",
      },
      {
        date: "2024-05-17\n09:15:44 UTC",
        type: "DOC_EXPIRY",
        typeColor: "bg-amber-100 text-amber-700",
        impact: "+5 Risk",
        impactColor: "text-amber-600",
        impactBar: "bg-amber-500",
        desc: "KRA Tax certificate expired. Payout restriction warned.",
        triggeredBy: "Compliance_Worker",
      },
      {
        date: "2024-05-15\n18:44:12 UTC",
        type: "NOTE_ADDED",
        typeColor: "bg-slate-100 text-slate-600",
        impact: "0 Impact",
        impactColor: "text-slate-500",
        impactBar: "bg-slate-300",
        desc: "Merchant responded to KYB inquiry with temporary cert.",
        triggeredBy: "Operator_SarahK",
      },
    ],
  },
};

const docStatusIcon = (status: string) => {
  if (status === "ok")
    return (
      <div className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-green-500">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    );
  if (status === "warn")
    return (
      <div className="w-7 h-7 rounded-full border border-amber-200 bg-amber-50 flex items-center justify-center text-amber-500">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
    );
  if (status === "expired")
    return (
      <div className="w-7 h-7 rounded-full border border-red-200 bg-red-50 flex items-center justify-center text-red-500">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
    );
  return (
    <div className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-300">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </div>
  );
};

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const heatmap = [
  [1, 1, 2, 1, 3, 5, 1],
  [1, 2, 1, 2, 3, 4, 1],
  [1, 1, 1, 1, 2, 5, 2],
];
const heatColor = (v: number) => {
  if (v >= 5) return "bg-red-500";
  if (v >= 4) return "bg-red-300";
  if (v >= 3) return "bg-blue-500";
  if (v >= 2) return "bg-blue-300";
  return "bg-blue-100";
};

export default function RiskProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const d = riskData[id] ?? riskData["APP-1029-KV"];

  const chartData = d.scoreHistory.map((v: number, i: number) => ({ i, v }));
  const isHigh = d.riskScore >= 70;

  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [suspendAgreed, setSuspendAgreed] = useState(false);
  const [suspendPin, setSuspendPin] = useState("");
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [flagReason, setFlagReason] = useState("Suspicious Transaction Volume");
  const [flagNotes, setFlagNotes] = useState("");
  const [flagPriority, setFlagPriority] = useState<"STANDARD" | "URGENT">(
    "STANDARD",
  );

  return (
    <div>
      {/* Back button */}
      <div className="mb-5">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
        >
          ← Back to Merchant
        </button>
      </div>

      {/* Merchant header */}
      <div className="flex items-center justify-between mb-6 bg-white rounded-xl border border-slate-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
            <ShieldAlert
              size={26}
              className="text-blue-700"
              strokeWidth={1.6}
            />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-0.5">
              <h1 className="text-2xl font-black text-slate-900">{d.name}</h1>
              <span
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide ${d.riskColor}`}
              >
                {d.riskLevel}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>MID: {d.mid}</span>
              <span>📍 {d.location}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
            <AlertTriangle size={14} /> Flag Merchant
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
            Restrict Payouts
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
            Request Enhanced Review
          </button>
          {isHigh && (
            <button
              onClick={() => setShowSuspendModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition"
            >
              Suspend Account
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-5">
        {/* Risk score history chart */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">
                Stability Analysis
              </p>
              <h2 className="text-xl font-bold text-slate-900">
                Risk Score History
              </h2>
            </div>
            <div className="text-right">
              <p className={`text-3xl font-black ${d.thresholdColor}`}>
                {d.riskScore}
              </p>
              <p
                className={`text-[10px] font-bold tracking-widest uppercase ${d.thresholdColor}`}
              >
                {d.thresholdLabel}
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} barSize={22}>
              <XAxis hide />
              <YAxis hide domain={[0, 100]} />
              <Bar dataKey="v" radius={[4, 4, 0, 0]}>
                {chartData.map((entry: any, i: number) => (
                  <Cell key={i} fill={entry.v >= 70 ? "#fca5a5" : "#bfdbfe"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {/* Mini stats */}
          <div className="grid grid-cols-4 gap-3 pt-4 border-t border-slate-100 mt-2">
            {[
              { label: "Volatility", value: d.volatility },
              { label: "Avg. Score", value: d.avgScore },
              { label: "Risk Event", value: d.riskEvent },
              { label: "Sector Peer", value: d.sectorPeer },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
                  {label}
                </p>
                <p className="text-lg font-black text-slate-800">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance docs */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-1">
            Regulatory Health
          </p>
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Compliance Documents
          </h2>
          <div className="space-y-3">
            {d.complianceDocs.map((doc: any) => (
              <div
                key={doc.label}
                className={`flex items-center justify-between p-3 rounded-lg border ${doc.status === "expired" ? "border-red-100 bg-red-50" : "border-slate-100 bg-white"}`}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {doc.label}
                  </p>
                  <p
                    className={`text-[11px] ${doc.status === "expired" ? "text-red-500" : doc.status === "warn" ? "text-amber-500" : "text-slate-400"}`}
                  >
                    {doc.sub}
                  </p>
                </div>
                {docStatusIcon(doc.status)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        {/* Transaction heatmap */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-1">
            Velocity & Pattern
          </p>
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Transaction Behavior
          </h2>
          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {days.map((d) => (
              <p
                key={d}
                className="text-[10px] font-bold text-slate-400 text-center"
              >
                {d}
              </p>
            ))}
          </div>
          {heatmap.map((row, ri) => (
            <div key={ri} className="grid grid-cols-7 gap-1.5 mb-1.5">
              {row.map((val, ci) => (
                <div key={ci} className={`h-10 rounded-lg ${heatColor(val)}`} />
              ))}
            </div>
          ))}
          {d.anomaly && (
            <p className="mt-4 text-xs text-red-600 leading-relaxed">
              <span className="font-bold">Anomalous Activity:</span> {d.anomaly}
            </p>
          )}
        </div>

        {/* Support & dispute trends */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-1">
            Reputation Analytics
          </p>
          <h2 className="text-lg font-bold text-slate-900 mb-5">
            Support & Dispute Trends
          </h2>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold text-slate-700">
                Chargeback Ratio
              </p>
              <p
                className={`text-sm font-black ${d.chargebackAlert ? "text-red-600" : "text-slate-800"}`}
              >
                {d.chargebackRatio}
              </p>
            </div>
            <div className="h-2 bg-slate-100 rounded-full mb-1">
              <div
                className={`h-2 rounded-full ${d.chargebackAlert ? "bg-red-500" : "bg-blue-500"}`}
                style={{ width: `${d.chargebackBar}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">
              Threshold: 0.9% Max
            </p>
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold text-slate-700">
                Refund Frequency
              </p>
              <p
                className={`text-sm font-black ${d.refundAlert ? "text-red-600" : "text-slate-800"}`}
              >
                {d.refundFrequency}
              </p>
            </div>
            <div className="h-2 bg-slate-100 rounded-full mb-1">
              <div
                className={`h-2 rounded-full ${d.refundAlert ? "bg-red-500" : "bg-blue-400"}`}
                style={{ width: "60%" }}
              />
            </div>
            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">
              Threshold: 10% Alert
            </p>
          </div>

          {d.recentTicket && (
            <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
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
                  <p className="text-sm font-bold text-slate-800">
                    Recent Ticket {d.recentTicket.id}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    "{d.recentTicket.desc}"
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] font-bold text-amber-600 tracking-widest uppercase">
                      {d.recentTicket.status}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {d.recentTicket.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Risk event ledger */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900">Risk Event Ledger</h2>
          <button
            onClick={() =>
              router.push(`/dashboard/merchants/${id}/investigation`)
            }
            className="text-sm font-bold text-blue-700 hover:underline"
          >
            View Audit Log ↗
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {[
                "Event Timestamp",
                "Type",
                "Impact",
                "Description",
                "Triggered By",
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
            {d.riskEvents.map((ev: any, i: number) => (
              <tr
                key={i}
                className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
              >
                <td className="px-5 py-4 text-[11px] text-slate-500 whitespace-pre-line font-mono">
                  {ev.date}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide ${ev.typeColor}`}
                  >
                    {ev.type}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-1 h-6 rounded-full ${ev.impactBar}`} />
                    <span className={`text-sm font-black ${ev.impactColor}`}>
                      {ev.impact}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-slate-600 max-w-xs">
                  {ev.desc}
                </td>
                <td className="px-5 py-4 text-[11px] text-slate-400 font-mono">
                  {ev.triggeredBy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showSuspendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                <ShieldAlert size={20} className="text-red-500" />
              </div>
              <h2 className="text-xl font-black text-slate-900">
                Suspend Merchant Account
              </h2>
            </div>

            {/* Critical warning */}
            <div className="mx-6 mt-5 bg-red-600 rounded-xl p-4 flex gap-3">
              <AlertTriangle
                size={18}
                className="text-white flex-shrink-0 mt-0.5"
                strokeWidth={2.5}
              />
              <div>
                <p className="text-white font-bold text-sm tracking-wide uppercase mb-1">
                  Critical System Action
                </p>
                <p className="text-red-100 text-sm leading-relaxed">
                  This will immediately revoke all API keys and stop transaction
                  processing for{" "}
                  <span className="font-bold text-white">{d.name}</span>. All
                  active terminal sessions will be terminated.
                </p>
              </div>
            </div>

            {/* Acknowledgement */}
            <div className="mx-6 mt-4">
              <label className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition">
                <input
                  type="checkbox"
                  checked={suspendAgreed}
                  onChange={(e) => setSuspendAgreed(e.target.checked)}
                  className="mt-0.5 accent-red-600 w-4 h-4 flex-shrink-0"
                />
                <span className="text-sm text-slate-700 leading-relaxed font-medium">
                  I understand this is a high-impact action and that suspension
                  of this account will disrupt their business operations
                  immediately.
                </span>
              </label>
            </div>

            {/* PIN input */}
            <div className="mx-6 mt-4 mb-6">
              <label className="block text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-2">
                Admin PIN / Password Verification
              </label>
              <div className="flex items-center gap-3 bg-slate-100 border border-slate-200 rounded-xl px-4 py-3">
                <input
                  type="password"
                  value={suspendPin}
                  onChange={(e) => setSuspendPin(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none tracking-widest"
                />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">
                Entry will be logged in the immutable audit trail.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setShowSuspendModal(false);
                  setSuspendAgreed(false);
                  setSuspendPin("");
                }}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                disabled={!suspendAgreed || suspendPin.length < 4}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white tracking-widest uppercase transition disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
                style={{
                  background:
                    suspendAgreed && suspendPin.length >= 4
                      ? "#7a6000"
                      : "#94a3b8",
                }}
              >
                Execute Suspension
              </button>
            </div>
          </div>
        </div>
      )}
      {showFlagModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-red-600 text-lg">🚩</span>
                <h2 className="text-xl font-black text-slate-900">
                  Flag Merchant for Investigation
                </h2>
              </div>
              <button
                onClick={() => setShowFlagModal(false)}
                className="text-slate-400 hover:text-slate-600 transition text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Investigation reason */}
              <div>
                <p className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase mb-3">
                  Investigation Reason
                </p>
                <div className="space-y-2">
                  {[
                    "Suspicious Transaction Volume",
                    "Merchant Identity Mismatch",
                    "Regulatory Compliance Concern",
                  ].map((reason) => (
                    <label
                      key={reason}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all border ${
                        flagReason === reason
                          ? "bg-blue-50 border-blue-200"
                          : "bg-slate-50 border-transparent hover:bg-slate-100"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          flagReason === reason
                            ? "border-blue-700"
                            : "border-slate-300"
                        }`}
                      >
                        {flagReason === reason && (
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-700" />
                        )}
                      </div>
                      <input
                        type="radio"
                        className="hidden"
                        checked={flagReason === reason}
                        onChange={() => setFlagReason(reason)}
                      />
                      <span className="text-sm font-semibold text-slate-800">
                        {reason}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional notes */}
              <div>
                <p className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase mb-2">
                  Additional Internal Notes
                </p>
                <textarea
                  value={flagNotes}
                  onChange={(e) => setFlagNotes(e.target.value)}
                  placeholder="Detail the anomalies observed in recent ledger activity..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition resize-none"
                />
              </div>

              {/* Escalation priority */}
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-[10px] font-black tracking-[0.2em] text-slate-700 uppercase mb-0.5">
                  Escalation Priority
                </p>
                <p className="text-xs text-slate-400 mb-3">
                  Urgent flags trigger immediate settlement hold.
                </p>
                <div className="flex gap-2">
                  {(["STANDARD", "URGENT"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setFlagPriority(p)}
                      className={`px-5 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition border ${
                        flagPriority === p
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 px-6 py-5 border-t border-slate-100">
              <button
                onClick={() => setShowFlagModal(false)}
                className="px-6 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition tracking-widest uppercase"
              >
                Cancel
              </button>
              <button className="flex-1 py-3 rounded-xl bg-red-700 text-white text-sm font-bold tracking-widest uppercase hover:bg-red-800 transition">
                Flag Merchant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
