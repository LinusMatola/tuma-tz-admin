"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Send, ShieldAlert } from "lucide-react";
import { useState } from "react";

const merchants: Record<string, any> = {
  "APP-9210-KV": {
    id: "APP-9210-KV",
    name: "Zanzibar Spices & Exports Ltd.",
    status: "UNDER REVIEW",
    regNumber: "TZA-99201-B",
    businessType: "Private Limited Company",
    submissionDate: "Oct 12, 2023 | 14:32 EAT",
    expectedVolume: "$50,000 - $100,000 / mo",
    contact: {
      name: "Mwanaidi Hassan",
      role: "Director of Operations",
      email: "m.hassan@zanzibarspices.co.tz",
      emailVerified: "Verified on Oct 12",
      phone: "+255 772 901 000",
      phoneVerified: "OTP Validated",
    },
    instruments: [
      {
        label: "International Credit Cards",
        status: "ELIGIBLE",
        statusColor: "text-green-600",
        color: "border-l-blue-500",
      },
      {
        label: "M-PESA / Tigo Pesa",
        status: "ELIGIBLE",
        statusColor: "text-green-600",
        color: "border-l-purple-500",
      },
      {
        label: "Local Bank Wire (EFT)",
        status: "NOT REQUESTED",
        statusColor: "text-slate-400",
        color: "border-l-slate-200",
      },
    ],
    docs: ["REGISTRATION.PDF", "TAXID_TZA.PDF", "UTILITY_BILL.PDF"],
    notes: [
      {
        author: "KYC_BOT",
        role: "bot",
        time: "2h ago",
        message:
          "Automated check: Registration number matches Tanzania business registry database.",
        alert: false,
      },
      {
        author: "Alex Mercer (Analyst)",
        role: "analyst",
        time: "1h ago",
        message:
          "Document clarity is high. Director ID photo matches biometric scan perfectly. Proceeding to risk assessment.",
        alert: false,
      },
      {
        author: "System Alert",
        role: "alert",
        time: "45m ago",
        message:
          "Tax ID format requires manual validation for non-resident status check.",
        alert: true,
      },
    ],
  },
  "APP-4402-TZ": {
    id: "APP-4402-TZ",
    name: "M-Store Electronics",
    status: "UNDER REVIEW",
    regNumber: "TZA-44021-B",
    businessType: "Sole Proprietorship",
    submissionDate: "Oct 24, 2023 | 10:05 GMT",
    expectedVolume: "$10,000 - $50,000 / mo",
    contact: {
      name: "Juma Mkweli",
      role: "Managing Director",
      email: "juma@mstore.co.tz",
      emailVerified: "Verified on Oct 24",
      phone: "+255 613 200 100",
      phoneVerified: "OTP Validated",
    },
    instruments: [
      {
        label: "M-PESA / Tigo Pesa",
        status: "ELIGIBLE",
        statusColor: "text-green-600",
        color: "border-l-purple-500",
      },
      {
        label: "International Credit Cards",
        status: "PENDING REVIEW",
        statusColor: "text-amber-600",
        color: "border-l-amber-500",
      },
      {
        label: "Local Bank Wire (EFT)",
        status: "NOT REQUESTED",
        statusColor: "text-slate-400",
        color: "border-l-slate-200",
      },
    ],
    docs: ["REGISTRATION.PDF", "TAXID_TZA.PDF"],
    notes: [
      {
        author: "KYC_BOT",
        role: "bot",
        time: "3h ago",
        message: "Business registration verified against BRELA database.",
        alert: false,
      },
      {
        author: "System Alert",
        role: "alert",
        time: "2h ago",
        message: "Medium risk score detected. Manual review assigned.",
        alert: true,
      },
    ],
  },
  "APP-7721-UG": {
    id: "APP-7721-UG",
    name: "Blue River Exchange",
    status: "HIGH RISK REVIEW",
    regNumber: "UGA-7721-B",
    businessType: "Corporate Tier 2",
    submissionDate: "Oct 23, 2023 | 16:45 GMT",
    expectedVolume: "$100,000+ / mo",
    contact: {
      name: "Robert Okello",
      role: "Chief Compliance Officer",
      email: "r.okello@blueriver.ug",
      emailVerified: "Verified on Oct 23",
      phone: "+256 700 123 456",
      phoneVerified: "OTP Validated",
    },
    instruments: [
      {
        label: "International Credit Cards",
        status: "UNDER REVIEW",
        statusColor: "text-red-600",
        color: "border-l-red-500",
      },
      {
        label: "Local Bank Wire (EFT)",
        status: "ELIGIBLE",
        statusColor: "text-green-600",
        color: "border-l-green-500",
      },
      {
        label: "M-PESA / Tigo Pesa",
        status: "NOT REQUESTED",
        statusColor: "text-slate-400",
        color: "border-l-slate-200",
      },
    ],
    docs: ["REGISTRATION.PDF", "TAXID_UGA.PDF", "COMPLIANCE_CERT.PDF"],
    notes: [
      {
        author: "KYC_BOT",
        role: "bot",
        time: "5h ago",
        message:
          "Entity flagged: offshore director detected. Escalating for manual compliance review.",
        alert: false,
      },
      {
        author: "System Alert",
        role: "alert",
        time: "4h ago",
        message:
          "High risk score: 88/100. Sanction list partial match detected. Requires senior analyst review.",
        alert: true,
      },
    ],
  },
  "APP-1029-KV": {
    id: "APP-1029-KV",
    name: "Toby's Gym",
    status: "PENDING",
    regNumber: "KEN-1029-B",
    businessType: "Sole Proprietorship",
    submissionDate: "Oct 23, 2023 | 09:12 GMT",
    expectedVolume: "$1,000 - $10,000 / mo",
    contact: {
      name: "Tobias Mwangi",
      role: "Owner",
      email: "toby@tobysgym.co.ke",
      emailVerified: "Verified on Oct 23",
      phone: "+254 712 345 678",
      phoneVerified: "OTP Validated",
    },
    instruments: [
      {
        label: "M-PESA / Tigo Pesa",
        status: "ELIGIBLE",
        statusColor: "text-green-600",
        color: "border-l-purple-500",
      },
      {
        label: "Local Bank Wire (EFT)",
        status: "ELIGIBLE",
        statusColor: "text-green-600",
        color: "border-l-green-500",
      },
      {
        label: "International Credit Cards",
        status: "NOT REQUESTED",
        statusColor: "text-slate-400",
        color: "border-l-slate-200",
      },
    ],
    docs: ["REGISTRATION.PDF", "UTILITY_BILL.PDF"],
    notes: [
      {
        author: "KYC_BOT",
        role: "bot",
        time: "6h ago",
        message:
          "Low risk application. All documents verified. Recommended for fast-track approval.",
        alert: false,
      },
    ],
  },
};

export default function MerchantDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const m = merchants[id];

  const [activeDoc, setActiveDoc] = useState(0);

  if (!m)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="text-slate-400 font-medium">Merchant not found</p>
        <Link
          href="/dashboard/merchants"
          className="text-blue-700 text-sm font-semibold hover:underline"
        >
          ← Back to Merchants
        </Link>
      </div>
    );

  const statusStyles: Record<string, string> = {
    "UNDER REVIEW": "bg-amber-100 text-amber-700",
    "HIGH RISK REVIEW": "bg-red-100 text-red-600",
    PENDING: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="flex flex-col min-h-screen -m-6">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white sticky top-0 z-10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-700 font-bold text-sm hover:underline"
        >
          ← Application ID: {m.id}
        </button>
        <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 w-64">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-slate-400"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Quick search transactions..."
            className="bg-transparent text-sm text-slate-500 placeholder-slate-400 focus:outline-none w-full"
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <div className="w-80 flex-shrink-0 border-r border-slate-200 overflow-y-auto bg-white p-6 space-y-5">
          {/* Legal entity */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">
                Legal Entity
              </p>
              <span
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide ${statusStyles[m.status] || "bg-slate-100 text-slate-500"}`}
              >
                {m.status}
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-3">{m.name}</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Registration Number", value: m.regNumber },
                { label: "Business Type", value: m.businessType },
                { label: "Submission Date", value: m.submissionDate },
                { label: "Expected Volume", value: m.expectedVolume },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-0.5">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-slate-800">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Primary contact */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-3">
              Primary Contact Details
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {m.contact.name}
                  </p>
                  <p className="text-[11px] text-slate-400">{m.contact.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {m.contact.email}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {m.contact.emailVerified}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {m.contact.phone}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {m.contact.phoneVerified}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment instruments */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-3">
              Payment Instruments
            </p>
            <div className="space-y-2">
              {m.instruments.map((inst: any) => (
                <div
                  key={inst.label}
                  className={`flex items-center justify-between py-2.5 px-3 bg-white rounded-lg border-l-4 ${inst.color} border border-slate-100`}
                >
                  <span className="text-sm font-medium text-slate-700">
                    {inst.label}
                  </span>
                  <span
                    className={`text-[11px] font-bold tracking-widest ${inst.statusColor}`}
                  >
                    {inst.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle panel — document viewer */}
        <div className="flex-1 bg-slate-100 flex flex-col overflow-hidden">
          {/* Doc tabs */}
          <div className="flex border-b border-slate-200 bg-white px-4">
            {m.docs.map((doc: string, i: number) => (
              <button
                key={doc}
                onClick={() => setActiveDoc(i)}
                className={`px-4 py-3 text-[11px] font-bold tracking-widest uppercase border-b-2 transition-colors ${
                  activeDoc === i
                    ? "border-blue-700 text-blue-700"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {doc}
              </button>
            ))}
          </div>

          {/* Doc preview */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm w-72 min-h-96 p-8 flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <h3 className="text-lg font-black text-slate-800 text-center mb-1">
                CERTIFICATE OF
                <br />
                INCORPORATION
              </h3>
              <p className="text-xs text-slate-400 text-center mb-6">
                United Republic of Tanzania
              </p>
              <div className="w-full border-t border-slate-100 pt-4 space-y-2">
                {[
                  { label: "Entity Name", value: m.name },
                  { label: "Registry Number", value: m.regNumber },
                  { label: "Incorporation Date", value: "22nd August 2018" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span className="text-xs text-slate-400 font-medium">
                      {label}:
                    </span>
                    <span className="text-xs font-bold text-slate-700 text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 w-16 h-16 rounded-full border-4 border-slate-200 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel — reviewer notes */}
        <div className="w-72 flex-shrink-0 border-l border-slate-200 bg-white flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">
              Reviewer Notes
            </p>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-md">
              {m.notes.length} TOTAL
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {m.notes.map((note: any, i: number) => (
              <div
                key={i}
                className={`rounded-xl p-4 ${note.alert ? "bg-red-50 border border-red-100" : "bg-slate-50 border border-slate-100"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[11px] font-bold ${note.alert ? "text-red-600" : note.role === "bot" ? "text-blue-700" : "text-slate-700"}`}
                  >
                    {note.author}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {note.time}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {note.message}
                </p>
              </div>
            ))}
          </div>
          {/* Note input */}
          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
              <input
                type="text"
                placeholder="Add internal note..."
                className="flex-1 bg-transparent text-sm text-slate-600 placeholder-slate-400 focus:outline-none"
              />
              <button className="text-blue-700 hover:text-blue-900 transition">
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-white">
        <div className="flex items-center gap-4">
          <Link
            href={`/dashboard/merchants/${m.id}/risk-profile`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg, #dc2626, #991b1b)" }}
          >
            <ShieldAlert size={15} /> View Risk Profile
          </Link>
          <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition tracking-widest uppercase">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            </svg>
            Audit Trail
          </button>
          <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition tracking-widest uppercase">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Escalate to Manager
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition">
            Reject Application
          </button>
          <button
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition"
            style={{ background: "#7c3aed" }}
          >
            Request More Info
          </button>
          <button
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
          >
            ✓ Approve Merchant
          </button>
        </div>
      </div>
    </div>
  );
}
