"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const investigations: Record<string, any> = {
  "APP-9210-KV": {
    merchant: "Zanzibar Spices & Exports Ltd.",
    flag: null,
    caseId: "TUMA-INV-9210-Z",
    opened: "Mar 5, 2024",
    riskScore: 22,
    merchantType: "Logistics & Supply",
    merchantTypeVerified: "Level 2 Verified",
    investigator: {
      initials: "MH",
      name: "Michael Hassan",
      role: "Compliance Analyst • East Africa",
    },
    events: [
      {
        type: "AUTOMATED FLAG",
        typeColor: "bg-red-100 text-red-600",
        dot: "bg-red-500",
        date: "Mar 5, 2024 • 09:10:00 UTC",
        title: "Routine Volume Check",
        desc: "Automated scan found no anomalies. All transactions within expected parameters for logistics sector.",
        tags: [{ label: "INSPECT TRANSACTIONS", icon: "🔍" }],
        meta: [
          { label: "SOURCE", value: "Shield-AI v4.1" },
          { label: "TRIGGER", value: "Rule #VOL-12" },
        ],
        images: [],
      },
      {
        type: "FINAL DECISION",
        typeColor: "bg-green-100 text-green-700",
        dot: "bg-green-500",
        date: "Mar 5, 2024 • 10:00:00 UTC",
        title: "No Action Required",
        desc: "All checks passed. Merchant operating within compliance boundaries. Case closed automatically.",
        tags: [],
        meta: [
          { label: "STATUS", value: "Settled / Closed" },
          { label: "DURATION", value: "0d 0h 50m" },
        ],
        images: [],
        actions: true,
        settled: true,
      },
    ],
  },
  "APP-4402-TZ": {
    merchant: "M-Store Electronics",
    flag: "FLAGGED: MEDIUM RISK",
    flagColor: "bg-amber-100 text-amber-700",
    caseId: "TUMA-INV-4402-T",
    opened: "Apr 18, 2024",
    riskScore: 54,
    merchantType: "E-Commerce",
    merchantTypeVerified: "Level 2 Verified",
    investigator: {
      initials: "SK",
      name: "Sarah K. Mnene",
      role: "Compliance Lead • East Africa",
    },
    events: [
      {
        type: "AUTOMATED FLAG",
        typeColor: "bg-red-100 text-red-600",
        dot: "bg-red-500",
        date: "Apr 18, 2024 • 11:20:10 UTC",
        title: "Elevated Chargeback Rate",
        desc: "Chargeback ratio reached 1.8%, exceeding the 0.9% threshold. 12 disputes filed within 7 days from electronics category.",
        tags: [
          { label: "INSPECT TRANSACTIONS", icon: "🔍" },
          { label: "JSON LOG", icon: "⬇" },
        ],
        meta: [
          { label: "SOURCE", value: "Shield-AI v4.1" },
          { label: "TRIGGER", value: "Rule #CHB-07" },
        ],
        images: [],
      },
      {
        type: "HUMAN REVIEW",
        typeColor: "bg-blue-100 text-blue-700",
        dot: "bg-blue-500",
        date: "Apr 18, 2024 • 14:00:00 UTC",
        title: "Manual Review Initiated",
        desc: "Analyst reviewed dispute patterns. Most chargebacks linked to a single product SKU (XB-4421). Merchant contacted for documentation.",
        tags: [],
        meta: [
          { label: "OPERATOR ID", value: "SK-9221-NAI" },
          {
            label: "ACTION",
            value: "Soft Review",
            valueColor: "text-amber-600",
          },
        ],
        images: [],
      },
    ],
  },
  "APP-7721-UG": {
    merchant: "Blue River Exchange",
    flag: "FLAGGED: HIGH RISK",
    flagColor: "bg-red-100 text-red-600",
    caseId: "TUMA-INV-7721-U",
    opened: "May 10, 2024",
    riskScore: 88,
    merchantType: "Forex/Money",
    merchantTypeVerified: "Level 3 Verified",
    investigator: {
      initials: "SK",
      name: "Sarah K. Mnene",
      role: "Compliance Lead • East Africa",
    },
    events: [
      {
        type: "AUTOMATED FLAG",
        typeColor: "bg-red-100 text-red-600",
        dot: "bg-red-500",
        date: "May 10, 2024 • 14:22:10 UTC",
        title: "Sanction List Partial Match",
        desc: "Director name matched 78% similarity score against OFAC SDN list. Multiple high-value cross-border transfers flagged within 48h window.",
        tags: [
          { label: "INSPECT TRANSACTIONS", icon: "🔍" },
          { label: "JSON LOG", icon: "⬇" },
        ],
        meta: [
          { label: "SOURCE", value: "Shield-AI v4.1" },
          { label: "TRIGGER", value: "Rule #SANC-01" },
        ],
        images: [],
      },
      {
        type: "HUMAN REVIEW",
        typeColor: "bg-blue-100 text-blue-700",
        dot: "bg-blue-500",
        date: "May 10, 2024 • 16:45:00 UTC",
        title: "Manual Account Suspension",
        desc: "Investigator reviewed the flag. Transactions originating from IP addresses previously associated with fraud networks. Account suspended pending identity verification.",
        tags: [
          {
            label: "suspension_notice.pdf",
            icon: "📄",
            sub: "Sent to merchant via Email/SMS",
          },
        ],
        meta: [
          { label: "OPERATOR ID", value: "SK-9221-NAI" },
          {
            label: "ACTION",
            value: "Hard Suspension",
            valueColor: "text-red-600",
          },
        ],
        images: [],
      },
    ],
  },
  "APP-1029-KV": {
    merchant: "Kibanda Grill LTD",
    flag: "FLAGGED: HIGH RISK",
    flagColor: "bg-red-100 text-red-600",
    caseId: "TUMA-INV-8829-X",
    opened: "Jan 12, 2024",
    riskScore: 92,
    merchantType: "Food & Bev",
    merchantTypeVerified: "Level 3 Verified",
    investigator: {
      initials: "SK",
      name: "Sarah K. Mnene",
      role: "Compliance Lead • East Africa",
    },
    events: [
      {
        type: "AUTOMATED FLAG",
        typeColor: "bg-red-100 text-red-600",
        dot: "bg-red-500",
        date: "Jan 14, 2024 • 14:22:10 UTC",
        title: "Velocity Threshold Breach",
        desc: "System detected 14 high-value transactions (>50,000 KES) within a 3-minute window from a single terminal ID (TID-4492). This deviates 450% from the merchant's 30-day average.",
        tags: [
          { label: "INSPECT TRANSACTIONS", icon: "🔍" },
          { label: "JSON LOG", icon: "⬇" },
        ],
        meta: [
          { label: "SOURCE", value: "Shield-AI v4.1" },
          { label: "TRIGGER", value: "Rule #VELO-99" },
        ],
        images: [],
      },
      {
        type: "HUMAN REVIEW",
        typeColor: "bg-blue-100 text-blue-700",
        dot: "bg-blue-500",
        date: "Jan 14, 2024 • 14:45:00 UTC",
        title: "Manual Account Suspension",
        desc: "Investigator reviewed the flag. Noted that the transactions are originating from an IP address previously associated with card-not-present fraud rings in the region. Account suspended pending identity verification.",
        tags: [
          {
            label: "suspension_notice.pdf",
            icon: "📄",
            sub: "Sent to merchant via Email/SMS",
          },
        ],
        meta: [
          { label: "OPERATOR ID", value: "SK-9221-NAI" },
          {
            label: "ACTION",
            value: "Hard Suspension",
            valueColor: "text-red-600",
          },
        ],
        images: [],
      },
      {
        type: "MERCHANT UPLOAD",
        typeColor: "bg-purple-100 text-purple-700",
        dot: "bg-purple-500",
        date: "Jan 15, 2024 • 09:12:44 UTC",
        title: "Evidence of Legitimate Sales",
        desc: "Merchant provided photographic evidence of high-volume catering order for a corporate event. Invoices and signed delivery notes uploaded for all 14 disputed transactions.",
        tags: [],
        meta: [
          { label: "SOURCE", value: "Merchant Portal (Mobile)" },
          { label: "FILES", value: "4 Attachments" },
        ],
        images: ["📦", "📄"],
      },
      {
        type: "FINAL DECISION",
        typeColor: "bg-amber-100 text-amber-700",
        dot: "bg-amber-500",
        date: "Jan 15, 2024 • 16:30:12 UTC",
        title: "Investigation Resolved: False Positive",
        desc: "Merchant documentation verified and cross-referenced with bank settlement data. IP address discrepancy resolved; merchant was using a VPN during site relocation. Account reinstated with updated velocity limits.",
        tags: [],
        meta: [
          {
            label: "STATUS",
            value: "Settled / Closed",
            valueColor: "text-amber-600",
          },
          { label: "DURATION", value: "1d 2h 8m" },
        ],
        images: [],
        actions: true,
        settled: true,
      },
    ],
  },
};

const filterOptions = ["ALL EVENTS", "AUTOMATED", "MANUAL"];

export default function InvestigationLedger() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("ALL EVENTS");
  const inv = investigations[id] ?? investigations["APP-1029-KV"];

  const filtered = inv.events.filter((ev: any) => {
    if (activeFilter === "ALL EVENTS") return true;
    if (activeFilter === "AUTOMATED") return ev.type === "AUTOMATED FLAG";
    if (activeFilter === "MANUAL")
      return (
        ev.type === "HUMAN REVIEW" ||
        ev.type === "MERCHANT UPLOAD" ||
        ev.type === "FINAL DECISION"
      );
    return true;
  });

  return (
    <div>
      {/* Back */}
      <div className="mb-5">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
        >
          ← Back to Risk Profile
        </button>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-sm text-slate-400">
        <span
          className="hover:text-blue-700 cursor-pointer"
          onClick={() => router.push("/dashboard/merchants")}
        >
          Merchants
        </span>
        <span>›</span>
        <span className="text-slate-700 font-semibold">{inv.merchant}</span>
        {inv.flag && (
          <span
            className={`ml-2 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase ${inv.flagColor}`}
          >
            ⚠ {inv.flag}
          </span>
        )}
      </div>

      {/* Title + filters */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-blue-700 tracking-tight uppercase">
            Investigation Ledger
          </h1>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md font-mono">
              {inv.caseId}
            </span>
            <span className="text-xs text-slate-400">
              • Opened {inv.opened}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {filterOptions.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-lg text-[11px] font-bold tracking-widest uppercase transition border ${
                activeFilter === f
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition tracking-widest uppercase">
            ☰ Filter Priority
          </button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-2">
            Risk Score
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-red-600">
              {inv.riskScore}
            </span>
            <span className="text-slate-400 font-medium">/100</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full mt-2">
            <div
              className="h-1.5 bg-red-500 rounded-full"
              style={{ width: `${inv.riskScore}%` }}
            />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-2">
            Merchant Type
          </p>
          <p className="text-xl font-black text-slate-900">
            {inv.merchantType}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {inv.merchantTypeVerified}
          </p>
        </div>
        <div className="bg-blue-700 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-24 opacity-10 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border-8 border-white" />
          </div>
          <p className="text-[10px] font-bold tracking-[0.15em] text-blue-200 uppercase mb-3">
            Active Investigator
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-sm">
              {inv.investigator.initials}
            </div>
            <div>
              <p className="text-white font-black">{inv.investigator.name}</p>
              <p className="text-blue-200 text-xs">{inv.investigator.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-2 top-3 bottom-3 w-px bg-slate-200" />
        <div className="space-y-6">
          {filtered.map((ev: any, i: number) => (
            <div key={i} className="flex gap-6">
              {/* Dot */}
              <div
                className={`w-5 h-5 rounded-full ${ev.dot} flex-shrink-0 mt-1 border-2 border-white shadow-sm z-10`}
              />

              {/* Card */}
              <div className="flex-1 grid grid-cols-4 gap-4">
                <div className="col-span-3 bg-white rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase ${ev.typeColor}`}
                    >
                      {ev.type}
                    </span>
                    <span className="text-xs text-slate-400">{ev.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {ev.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    {ev.desc}
                  </p>

                  {/* Tags */}
                  {ev.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {ev.tags.map((tag: any, ti: number) => (
                        <div key={ti} className="flex flex-col">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 hover:bg-slate-100 transition">
                            <span>{tag.icon}</span> {tag.label}
                          </button>
                          {tag.sub && (
                            <span className="text-[10px] text-slate-400 mt-0.5 ml-1">
                              {tag.sub}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Images */}
                  {ev.images.length > 0 && (
                    <div className="flex gap-3 mt-2">
                      {ev.images.map((img: string, ii: number) => (
                        <div
                          key={ii}
                          className="w-28 h-20 bg-slate-100 rounded-lg flex items-center justify-center text-3xl border border-slate-200"
                        >
                          {img}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Final decision actions */}
                  {ev.actions && (
                    <div className="flex gap-3 mt-4 pt-4 border-t border-slate-100">
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold tracking-widest uppercase hover:bg-slate-700 transition">
                        ✓ Close Case
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition tracking-widest uppercase">
                        🖨 Generate Report
                      </button>
                    </div>
                  )}
                </div>

                {/* Meta panel */}
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 space-y-3 self-start">
                  {ev.meta.map((m: any, mi: number) => (
                    <div key={mi}>
                      <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-0.5">
                        {m.label}
                      </p>
                      <p
                        className={`text-sm font-bold ${m.valueColor ?? "text-slate-800"}`}
                      >
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
