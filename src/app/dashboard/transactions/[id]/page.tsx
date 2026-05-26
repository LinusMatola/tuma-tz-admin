"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BsPhone, BsCreditCard, BsBank } from "react-icons/bs";
import {
  Download,
  RefreshCw,
  Printer,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

const transactions: Record<string, any> = {
  "TXN-8829-XPK": {
    id: "TXN-8829-XPK",
    merchant: "Safcom Global Ltd.",
    merchantId: "MID-9920-SFG",
    status: "PAID",
    amount: "42,000.00",
    currency: "KES",
    method: "M-PESA Paybill",
    methodIcon: BsPhone,
    reference: "RJK92LMX02",
    currencyRate: "1.00 KES = 1.00 KES",
    initiated: "Oct 24, 2023 • 14:32:10 EAT",
    channelType: "B2B Settlement",
    processingNode: "KE-NBO-04",
    riskScore: "0.02",
    riskLevel: "LOW RISK",
    apiVersion: "v2.4.1-stable",
    hash: "0X8A2...4F92",
    timeline: [
      {
        status: "AUTHORIZED",
        label: "Validation of M-PESA balance and user PIN",
        time: "Oct 24, 14:32:10",
      },
      {
        status: "PROCESSED",
        label: "Tuma Clearing House (TCH) verification",
        time: "Oct 24, 14:32:14",
      },
      {
        status: "SETTLED",
        label: "Funds moved to Safcom Merchant Wallet ✓",
        time: "Oct 24, 14:32:45",
      },
    ],
    logs: [
      {
        event: "SYSTEM.JOURNAL_POST",
        time: "14:32:45",
        message: "Double-entry ledger balancing completed.",
      },
      {
        event: "GATEWAY.ACK_RECEIVED",
        time: "14:32:15",
        message: "M-PESA callback validated successfully.",
      },
      {
        event: "USER.AUTH_INIT",
        time: "14:32:10",
        message: "Authorization request broadcast to USSD node.",
      },
      {
        event: "EVENT.SESSION_START",
        time: "14:32:05",
        message: "Client session initiated (Source: Mobile Web).",
      },
    ],
  },
  "TXN-8828-LQA": {
    id: "TXN-8828-LQA",
    merchant: "Zanzibar Spices Ent.",
    merchantId: "APP-4402-TZ",
    status: "PENDING",
    amount: "185,200.00",
    currency: "TZS",
    type: "Net Settlement",
    method: "CARD (Visa **** 4412)",
    methodIcon: BsCreditCard,
    gatewayResponse: "Awaiting Gateway Auth",
    clearanceWindow: "~ 45 Minutes",
    capturedAt: "14:22 EAT",
    capturePoint: "Stone Town Hub 04",
    riskScore: 45,
    safetyIndex: 45,
    checks: [
      { label: "Velocity Check", passed: true },
      { label: "Merchant Trust", passed: true },
      { label: "IP Geofence", passed: true },
    ],
    progression: [
      {
        time: "02:22:15 PM",
        label: "Transaction Initiated",
        desc: "Origin: POS Terminal #ZAN-01. Customer verified via chip/PIN.",
        done: true,
      },
      {
        time: "02:22:18 PM",
        label: "Risk Scoring Engine",
        desc: "Passed: Score 45 (Low Impact). Geographic location match confirmed.",
        done: true,
      },
      {
        time: "02:22:19 PM",
        label: "Gateway Authorization",
        desc: null,
        progress: 65,
        done: false,
      },
      {
        time: "PENDING",
        label: "Settlement Finalization",
        desc: "Awaiting confirmation of funds movement.",
        done: false,
        pending: true,
      },
    ],
  },
  "TXN-8827-ZMT": {
    id: "TXN-8827-ZMT",
    merchant: "Crypto Bridge KE",
    merchantId: "APP-9210-KV",
    status: "FAILED",
    amount: "9,400.00",
    currency: "KES",
    failedAt: "August 24, 2023 14:22:10",
    reason: "Gateway Authorization Failure",
    errorCode: "R01",
    errorTitle: "Insufficient Funds in Customer Account (M-PESA)",
    errorDesc:
      "The transaction was declined by the Safaricom M-PESA gateway due to unavailable funds in the customer's mobile wallet. Pre-authorization checks were bypassed, but final clearing failed.",
    method: "M-PESA Direct",
    terminal: "CP-KE-0042",
    networkLatency: "420ms",
    riskScore: 92,
    ipAddress: "197.232.14.88",
    location: "Nairobi, KE",
    tags: ["UNUSUAL VELOCITY", "HIGH FREQUENCY RETRIES"],
    investigationLogs: [
      {
        time: "14:22:10.450",
        source: "System",
        label: "Gateway Handshake Initiated",
        desc: "API request dispatched to Daraja G2 Portal. Session ID: 9×882_TUMA",
        highlight: false,
      },
      {
        time: "14:22:12.890",
        source: "M-PESA API",
        label: "Error Received: [R01] INSUFFICIENT_FUNDS",
        desc: "Safaricom endpoint returned refusal code. No funds available for pull request.",
        highlight: true,
      },
      {
        time: "14:22:13.100",
        source: "Security Engine",
        label: "Merchant Risk Profile Updated",
        desc: "Retry limit exceeded for merchant: Crypto Bridge KE. Score increment +5.",
        highlight: false,
      },
    ],
  },
};

// ── Status badge ──────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PAID: "bg-green-100 text-green-700 border border-green-200",
    PENDING: "bg-amber-100 text-amber-700 border border-amber-200",
    FAILED: "bg-red-100 text-red-600 border border-red-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold tracking-widest uppercase ${styles[status]}`}
    >
      {status}
    </span>
  );
}

// ── PAID view ─────────────────────────────────────────────────
function PaidView({ tx }: { tx: any }) {
  const Icon = tx.methodIcon;
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Left col — spans 2 */}
      <div className="col-span-2 space-y-5">
        {/* Amount card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-2">
            Transaction Amount
          </p>
          <div className="flex items-end gap-3 mb-6">
            <span className="text-slate-400 text-2xl font-semibold">
              {tx.currency}
            </span>
            <span className="text-5xl font-black text-slate-900 tracking-tight">
              {tx.amount}
            </span>
            <div className="ml-auto opacity-10">
              <BsBank size={80} className="text-slate-400" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div>
              <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-1">
                Method
              </p>
              <div className="flex items-center gap-1.5 text-slate-700 font-medium text-sm">
                <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Icon size={10} className="text-white" />
                </span>
                {tx.method}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-1">
                Reference
              </p>
              <p className="text-blue-700 font-bold text-sm">{tx.reference}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-1">
                Currency Rate
              </p>
              <p className="text-slate-700 font-medium text-sm">
                {tx.currencyRate}
              </p>
            </div>
          </div>
        </div>

        {/* Execution timeline */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-5">
            Execution Timeline
          </p>
          <div className="space-y-5">
            {tx.timeline.map((step: any, i: number) => (
              <div key={i} className="flex gap-4">
                <div className="w-1 rounded-full bg-blue-600 flex-shrink-0" />
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">
                    {step.status}
                  </span>
                  <p className="font-semibold text-slate-800 text-sm mt-0.5">
                    {step.label}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {step.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System metadata */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-4">
            System Metadata
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Channel Type", value: tx.channelType },
              { label: "Processing Node", value: tx.processingNode },
              { label: "Risk Score", value: tx.riskScore, badge: tx.riskLevel },
              { label: "API Version", value: tx.apiVersion },
            ].map(({ label, value, badge }) => (
              <div key={label}>
                <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-1">
                  {label}
                </p>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-slate-800">{value}</p>
                  {badge && (
                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      {badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-[10px] text-slate-300 tracking-widest uppercase">
          Certified Immutable Ledger Entry • Hash: {tx.hash}
        </p>
      </div>

      {/* Right col */}
      <div className="space-y-5">
        {/* Merchant details */}
        <div className="bg-blue-700 rounded-xl p-6 text-white">
          <p className="text-[10px] font-bold tracking-[0.15em] text-blue-200 uppercase mb-4">
            Merchant Details
          </p>
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-3">
            <BsBank size={22} className="text-white" />
          </div>
          <p className="text-xl font-black mb-1">{tx.merchant}</p>
          <p className="text-blue-200 text-xs mb-5">
            Merchant ID: {tx.merchantId}
          </p>
          <button className="w-full py-2.5 rounded-lg border border-white/30 text-white text-xs font-bold tracking-widest uppercase hover:bg-white/10 transition">
            View Full History
          </button>
        </div>

        {/* Ledger activity logs */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">
              Ledger Activity Logs
            </p>
            <button className="text-slate-400 hover:text-slate-600 transition">
              <RefreshCw size={13} />
            </button>
          </div>
          <div className="space-y-4">
            {tx.logs.map((log: any, i: number) => (
              <div key={i} className="flex gap-3">
                <div className="w-0.5 bg-green-400 rounded-full flex-shrink-0" />
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                      {log.event}
                    </span>
                    <span className="text-[10px] text-slate-300">
                      {log.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{log.message}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-5 w-full text-center text-[11px] font-bold text-blue-700 tracking-widest uppercase hover:underline">
            Download Audit Trail (JSON)
          </button>
        </div>
        <Link
          href={`/dashboard/merchants/${tx.merchantId}/risk-profile`}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white text-sm font-bold tracking-wide hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #dc2626, #991b1b)" }}
        >
          <ShieldAlert size={16} /> View Merchant Risk Profile
        </Link>
      </div>
    </div>
  );
}

// ── PENDING view ──────────────────────────────────────────────
function PendingView({ tx }: { tx: any }) {
  const Icon = tx.methodIcon;
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-5">
        {/* Amount card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-2">
            Transaction Amount
          </p>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-5xl font-black text-slate-900 tracking-tight">
              {tx.currency} {tx.amount}
            </span>
            <span className="text-blue-600 font-bold text-sm">{tx.type}</span>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div>
              <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-1">
                Payment Method
              </p>
              <div className="flex items-center gap-1.5 text-slate-700 font-medium text-sm">
                <Icon size={13} />
                {tx.method}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-1">
                Gateway Response
              </p>
              <div className="flex items-center gap-1.5 text-amber-600 font-medium text-sm">
                <RefreshCw size={12} className="animate-spin" />
                {tx.gatewayResponse}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-1">
                Clearance Window
              </p>
              <p className="text-slate-700 font-medium text-sm">
                ⏱ {tx.clearanceWindow}
              </p>
            </div>
          </div>
        </div>

        {/* Ledger progression */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-slate-700 font-bold">〜</span>
            <p className="font-bold text-slate-800">Ledger Progression</p>
          </div>
          <div className="relative pl-6 space-y-6">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-slate-200" />
            {tx.progression.map((step: any, i: number) => (
              <div key={i} className="relative">
                <div
                  className={`absolute -left-6 w-4 h-4 rounded-full border-2 flex items-center justify-center
                  ${step.done ? "bg-blue-600 border-blue-600" : step.pending ? "bg-white border-slate-300" : "bg-white border-blue-600"}`}
                >
                  {step.done && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <p
                  className={`text-[11px] font-bold mb-0.5 ${step.pending ? "text-slate-400" : "text-blue-600"}`}
                >
                  {step.time}
                </p>
                <p
                  className={`font-semibold text-sm ${step.pending ? "text-slate-400" : "text-slate-800"}`}
                >
                  {step.label}
                </p>
                {step.desc && (
                  <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                )}
                {step.progress !== undefined && (
                  <div className="mt-2">
                    <div className="h-1.5 bg-slate-100 rounded-full w-48">
                      <div
                        className="h-1.5 bg-blue-600 rounded-full transition-all"
                        style={{ width: `${step.progress}%` }}
                      />
                    </div>
                    <p className="text-[10px] font-bold text-blue-600 mt-1 tracking-widest">
                      {step.progress}% SYNC
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right col */}
      <div className="space-y-5">
        {/* Risk assessment */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-5">
            Risk Assessment
          </p>
          {/* Circle */}
          <div className="flex justify-center mb-5">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#1a3de4"
                  strokeWidth="8"
                  strokeDasharray={`${tx.safetyIndex * 2.64} 264`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-900">
                  {tx.safetyIndex}
                </span>
                <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">
                  Safety Index
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {tx.checks.map((check: any) => (
              <div
                key={check.label}
                className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg"
              >
                <span className="text-sm text-slate-700">{check.label}</span>
                <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Capture point */}
        <div className="bg-slate-800 rounded-xl overflow-hidden relative h-40">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, #0d4f8c 0%, #0a0f2e 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-900/90">
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              Capture Point
            </p>
            <p className="text-white font-bold">{tx.capturePoint}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center gap-2 py-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition text-slate-600">
            <Printer size={18} strokeWidth={1.8} />
            <span className="text-xs font-semibold">Print Receipt</span>
          </button>
          <button className="flex flex-col items-center gap-2 py-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition text-slate-600">
            <AlertTriangle size={18} strokeWidth={1.8} />
            <span className="text-xs font-semibold">Flag Fraud</span>
          </button>
        </div>
        <Link
          href={`/dashboard/merchants/${tx.merchantId}/risk-profile`}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white text-sm font-bold tracking-wide hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #dc2626, #991b1b)" }}
        >
          <ShieldAlert size={16} /> View Merchant Risk Profile
        </Link>
      </div>
    </div>
  );
}

// ── FAILED view ───────────────────────────────────────────────
function FailedView({ tx }: { tx: any }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-5">
        {/* Error diagnosis */}
        <div className="bg-white rounded-xl border-l-4 border-red-500 border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-500" />
              <p className="text-[11px] font-bold tracking-[0.15em] text-slate-700 uppercase">
                System Error Diagnosis
              </p>
            </div>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[11px] font-bold rounded">
              CODE: {tx.errorCode}
            </span>
          </div>
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">
            Error Description
          </p>
          <p className="text-lg font-bold text-slate-900 mb-2">
            {tx.errorTitle}
          </p>
          <p className="text-sm text-slate-500 leading-relaxed mb-5">
            {tx.errorDesc}
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            {[
              { label: "Method", value: tx.method },
              { label: "Terminal", value: tx.terminal },
              { label: "Network Latency", value: tx.networkLatency },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-1">
                  {label}
                </p>
                <p className="font-bold text-slate-800 text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Investigation logs */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <p className="text-[10px] font-bold tracking-[0.15em] text-slate-700 uppercase">
              Investigation Logs
            </p>
            <button className="text-[11px] font-bold text-blue-700 tracking-widest uppercase hover:underline">
              Download Full Trace
            </button>
          </div>
          <div className="space-y-4">
            {tx.investigationLogs.map((log: any, i: number) => (
              <div
                key={i}
                className={`flex gap-4 p-4 rounded-lg ${log.highlight ? "bg-red-50 border border-red-100" : "bg-slate-50"}`}
              >
                <div
                  className={`w-0.5 rounded-full flex-shrink-0 ${log.highlight ? "bg-red-500" : "bg-slate-300"}`}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[11px] font-bold ${log.highlight ? "text-red-600" : "text-slate-500"}`}
                    >
                      {log.time}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                      {log.source}
                    </span>
                  </div>
                  <p className="font-semibold text-slate-800 text-sm">
                    {log.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{log.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right col */}
      <div className="space-y-5">
        {/* Security context */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-[10px] font-bold tracking-[0.15em] text-slate-700 uppercase mb-4">
            Security Context
          </p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">
              Merchant Risk Score
            </span>
            <span className="text-2xl font-black text-red-600">
              {tx.riskScore}
              <span className="text-sm text-slate-400 font-normal">/100</span>
            </span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full mb-3">
            <div
              className="h-2 bg-red-500 rounded-full"
              style={{ width: `${tx.riskScore}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {tx.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 bg-slate-100 text-slate-500 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            href={`/dashboard/merchants/${tx.merchantId}/risk-profile`}
            className="w-full py-2.5 rounded-lg bg-slate-900 text-white text-xs font-bold tracking-widest uppercase hover:bg-slate-700 transition flex items-center justify-center gap-2"
          >
            <ShieldAlert size={13} /> View Merchant Risk Profile
          </Link>
        </div>

        {/* Device context */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-[10px] font-bold tracking-[0.15em] text-slate-700 uppercase mb-3">
            Device Context
          </p>
          <div className="h-32 bg-slate-800 rounded-lg mb-3 relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 60% 50%, #1a3de4 0%, #0a0f2e 100%)",
              }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
                IP Address
              </p>
              <p className="text-sm font-bold text-slate-800">{tx.ipAddress}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
                Location
              </p>
              <p className="text-sm font-bold text-slate-800">{tx.location}</p>
            </div>
          </div>
        </div>

        {/* Internal ledger note */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ShieldAlert size={22} className="text-red-500" />
          </div>
          <p className="text-[10px] font-bold tracking-widest text-slate-700 uppercase mb-2">
            Internal Ledger Note
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            Flagged for manual review by Compliance Team due to risk score
            exceeding threshold.
          </p>
          <button
            className="w-full py-2.5 rounded-lg text-white text-xs font-bold tracking-widest uppercase hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
          >
            Assign to Investigator
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────
export default function TransactionDetail() {
  const { id } = useParams<{ id: string }>();
  const tx = transactions[id];

  if (!tx)
    return (
      <div className="flex items-center justify-center min-h-[60vh] flex-col gap-3">
        <p className="text-slate-400 font-medium">Transaction not found</p>
        <Link
          href="/dashboard/transactions"
          className="text-blue-700 text-sm font-semibold hover:underline"
        >
          ← Back to Transactions
        </Link>
      </div>
    );

  return (
    <div>
      {/* Back button */}
      <div className="mb-5">
        <Link
          href="/dashboard/transactions"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
        >
          ← Back to Transactions
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          {tx.status === "FAILED" && (
            <div className="flex items-center gap-3 mb-1">
              <StatusBadge status={tx.status} />
              <span className="text-sm text-slate-400">{tx.id}</span>
            </div>
          )}
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {tx.status === "PAID" ? tx.id : tx.merchant}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {tx.status === "PAID" && (
              <>
                <StatusBadge status={tx.status} />{" "}
                <span className="ml-2">Initiated {tx.initiated}</span>
              </>
            )}
            {tx.status === "PENDING" && `Transaction Identity: `}
            {tx.status === "PENDING" && (
              <span className="text-blue-700 font-bold">{tx.id}</span>
            )}
            {tx.status === "FAILED" && tx.reason + " • " + tx.failedAt}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {tx.status === "PAID" && (
            <>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
                <Printer size={14} /> Receipt
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-sm font-semibold text-red-600 hover:bg-red-50 transition">
                <Download size={14} /> Refund
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white hover:opacity-90 transition"
                style={{
                  background: "linear-gradient(135deg, #1a3de4, #1230b8)",
                }}
              >
                <ShieldAlert size={14} /> Support
              </button>
            </>
          )}
          {tx.status === "PENDING" && (
            <div className="text-right">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-200 bg-amber-50 text-amber-700 font-bold text-sm">
                <RefreshCw size={14} className="animate-spin" /> PENDING
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Captured {tx.capturedAt}
              </p>
            </div>
          )}
          {tx.status === "FAILED" && (
            <div className="text-right">
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
                Settlement Amount
              </p>
              <p className="text-3xl font-black text-red-600">
                {tx.currency} {tx.amount}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Animated content swap */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {tx.status === "PAID" && <PaidView tx={tx} />}
        {tx.status === "PENDING" && <PendingView tx={tx} />}
        {tx.status === "FAILED" && <FailedView tx={tx} />}
      </div>
    </div>
  );
}
