"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Download,
  Search,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const kpis = [
  {
    label: "Total Settled (24H)",
    value: "KES 48.2M",
    sub: "↗ 12.4% vs Yesterday",
    subColor: "text-green-600",
    border: "border-l-blue-700",
  },
  {
    label: "Pending Verification",
    value: "KES 2.1M",
    sub: "14 Batches Awaiting Node Auth",
    subColor: "text-amber-600",
    border: "border-l-amber-500",
  },
  {
    label: "Merchant TXN Volume",
    value: "11,402",
    sub: "99.8% Success Rate",
    subColor: "text-blue-600",
    border: "border-l-purple-500",
  },
  {
    label: "Failed Batches",
    value: "0",
    sub: "All Ledger Nodes Healthy",
    subColor: "text-green-600",
    border: "border-l-red-500",
  },
];

const batches = [
  {
    id: "SB-2023-9021",
    date: "Oct 24, 2023 • 09:12 AM",
    txnCount: 1402,
    bank: "Equity Bank Kenya",
    volume: "12,450,200.00",
    status: "SETTLED",
  },
  {
    id: "SB-2023-9020",
    date: "Oct 24, 2023 • 08:45 AM",
    txnCount: 840,
    bank: "KCB Bank",
    volume: "8,102,500.00",
    status: "PENDING",
  },
  {
    id: "SB-2023-9019",
    date: "Oct 23, 2023 • 11:30 PM",
    txnCount: 2110,
    bank: "Absa Kenya PLC",
    volume: "22,890,100.45",
    status: "SETTLED",
  },
  {
    id: "SB-2023-9018",
    date: "Oct 23, 2023 • 06:15 PM",
    txnCount: 12,
    bank: "Stanbic Bank",
    volume: "145,000.00",
    status: "HELD",
  },
  {
    id: "SB-2023-9017",
    date: "Oct 23, 2023 • 04:00 PM",
    txnCount: 560,
    bank: "Standard Chartered",
    volume: "4,120,330.00",
    status: "FAILED",
  },
];

const statusStyles: Record<string, string> = {
  SETTLED: "bg-green-100 text-green-700",
  PENDING: "bg-amber-100 text-amber-700",
  HELD: "bg-slate-100 text-slate-600",
  FAILED: "bg-red-100 text-red-600",
};

const statusBar: Record<string, string> = {
  SETTLED: "bg-green-500",
  PENDING: "bg-amber-500",
  HELD: "bg-slate-400",
  FAILED: "bg-red-500",
};

type ModalType = "SETTLED" | "PENDING" | "HELD" | "FAILED" | null;

export default function SettlementsPage() {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedBatch, setSelectedBatch] = useState<any>(null);

  const openModal = (batch: any) => {
    setSelectedBatch(batch);
    setActiveModal(batch.status as ModalType);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedBatch(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Settlements
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Monitor and manage settlement batches across all banks.
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard/settlements/reconciliation")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
        >
          Reconciliation Overview
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map(({ label, value, sub, subColor, border }) => (
          <div
            key={label}
            className={`bg-white rounded-xl border border-slate-200 border-l-4 ${border} px-5 py-4`}
          >
            <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-2">
              {label}
            </p>
            <p className="text-2xl font-black text-slate-900 mb-1">{value}</p>
            <p className={`text-[11px] font-semibold ${subColor}`}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2.5">
          <Search size={14} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search Batch ID..."
            className="bg-transparent text-sm text-slate-600 placeholder-slate-400 focus:outline-none w-full"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
          Destination Bank: All <span className="text-slate-400">▾</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
          Status: All States <span className="text-slate-400">▾</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
          📅 Last 30 Days
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {[
                "Batch ID",
                "Settlement Date",
                "TXN Count",
                "Destination Bank",
                "Total Volume (KES)",
                "Status",
                "Actions",
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
            {batches.map((batch) => (
              <tr
                key={batch.id}
                className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
              >
                <td className="px-5 py-4">
                  <button
                    onClick={() =>
                      router.push(`/dashboard/settlements/${batch.id}`)
                    }
                    className="font-bold text-blue-700 hover:underline text-sm"
                  >
                    #{batch.id}
                  </button>
                </td>
                <td className="px-5 py-4 text-slate-600 text-sm">
                  {batch.date}
                </td>
                <td className="px-5 py-4 text-slate-700 font-medium">
                  {batch.txnCount.toLocaleString()}
                </td>
                <td className="px-5 py-4 text-slate-700 font-medium">
                  {batch.bank}
                </td>
                <td className="px-5 py-4 font-bold text-slate-800">
                  {batch.volume}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-1 h-5 rounded-full ${statusBar[batch.status]}`}
                    />
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide ${statusStyles[batch.status]}`}
                    >
                      {batch.status}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => openModal(batch)}
                    className="text-slate-400 hover:text-blue-700 transition"
                    title="View details"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Showing 1 to 10 of 482 batches
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

      {/* Compliance notice */}
      <div className="flex items-start gap-4 bg-blue-50 border border-blue-100 rounded-xl px-5 py-4">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1a3de4"
          strokeWidth="2"
          className="flex-shrink-0 mt-0.5"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <div>
          <p className="text-sm font-bold text-slate-800 mb-0.5">
            Compliance & Architectural Notice
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            All settlement batches are reconciled against the primary ledger
            nodes in Nairobi and Mombasa. Any variance exceeding KES 10.00
            triggers an automatic administrative hold. High-density data
            provided by Architectural Ledger v1.0.
          </p>
        </div>
      </div>

      {/* ── MODALS ── */}

      {/* SETTLED modal */}
      {activeModal === "SETTLED" && selectedBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div
              className="h-1 w-full"
              style={{ background: "linear-gradient(90deg, #1a3de4, #a855f7)" }}
            />
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4">
                <CheckCircle
                  size={32}
                  className="text-green-600"
                  strokeWidth={1.8}
                />
              </div>
              <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-1">
                Settlement Completed
              </p>
              <p className="text-4xl font-black text-slate-900 mb-2">
                KES {selectedBatch.volume}
              </p>
              <p className="text-sm text-slate-500 mb-6">
                Funds have been successfully settled to your primary bank
                account.
              </p>

              <div className="border-l-4 border-blue-700 bg-slate-50 rounded-xl p-4 text-left space-y-3 mb-5">
                {[
                  { label: "Transaction ID", value: "TXN-99284-ALPH" },
                  { label: "Execution Date", value: selectedBatch.date },
                  { label: "Processing Fee", value: "KES 1,250.00" },
                  {
                    label: "Destination",
                    value: `🏦 ${selectedBatch.bank} (****0291)`,
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                      {label}
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-slate-50 rounded-xl p-3 text-left">
                  <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
                    Status
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                    <p className="font-bold text-slate-800 text-sm">SETTLED</p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 text-left">
                  <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                    Batch Type
                  </p>
                  <p className="font-bold text-slate-800 text-sm">
                    Instant Editorial
                  </p>
                </div>
              </div>

              <button
                onClick={closeModal}
                className="w-full py-3 rounded-xl text-white font-bold text-sm mb-3 hover:opacity-90 transition"
                style={{
                  background: "linear-gradient(135deg, #1a3de4, #1230b8)",
                }}
              >
                Done
              </button>
              <button
                onClick={() => {
                  closeModal();
                  router.push(`/dashboard/settlements/${selectedBatch.id}`);
                }}
                className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition flex items-center justify-center gap-2"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
                View Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PENDING modal */}
      {activeModal === "PENDING" && selectedBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Settlement in Progress
                </h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <RefreshCw size={11} className="text-blue-600 animate-spin" />
                  <p className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">
                    Processing Transaction Liquidity
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-end justify-between mb-5">
                <div>
                  <span className="text-5xl font-black text-slate-900">65</span>
                  <span className="text-2xl font-bold text-slate-400">%</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-0.5">
                    Estimated Completion
                  </p>
                  <p className="text-xl font-black text-slate-900">
                    ~ 14:02 PM{" "}
                    <span className="text-sm font-normal text-slate-400">
                      EAT
                    </span>
                  </p>
                </div>
              </div>

              <div className="h-2 bg-slate-100 rounded-full mb-6">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: "65%",
                    background: "linear-gradient(90deg, #1a3de4, #a855f7)",
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-slate-50 rounded-xl p-4 border-l-4 border-blue-700">
                  <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                    Internal Reference ID
                  </p>
                  <p className="font-black text-slate-800 text-sm">
                    SETL-992-TXN-04
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
                    Settlement Volume
                  </p>
                  <p className="font-black text-slate-900 text-sm">
                    KES {selectedBatch.volume}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {selectedBatch.txnCount} Batch Sub-transactions
                  </p>
                </div>
              </div>

              <div className="h-20 bg-slate-800 rounded-xl mb-5 relative overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, #0a0f2e, #1a3de4 80%)",
                  }}
                />
                <div className="absolute bottom-3 left-3 flex items-center gap-3">
                  <div className="w-8 h-1 bg-blue-400 rounded-full opacity-60" />
                  <div className="w-12 h-0.5 bg-blue-300 rounded-full opacity-40" />
                </div>
              </div>

              <div className="flex items-center justify-between mb-5 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Server Optimal
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  End-to-End Secure
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    closeModal();
                    router.push(`/dashboard/settlements/${selectedBatch.id}`);
                  }}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  View Details
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-700 transition"
                >
                  Acknowledge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HELD modal */}
      {activeModal === "HELD" && selectedBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="h-1 w-full bg-amber-500" />
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle
                    size={26}
                    className="text-red-500"
                    strokeWidth={1.8}
                  />
                </div>
                <p className="text-[10px] font-black tracking-[0.2em] text-red-500 uppercase mb-1">
                  Settlement on Hold
                </p>
                <p className="text-4xl font-black text-slate-900 mb-1">
                  KES {selectedBatch.volume}
                </p>
                <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Reference: SET-99230-AUD
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 mb-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    Reason for Hold
                  </p>
                  <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 tracking-widest">
                    PRIORITY: HIGH
                  </span>
                </div>
                <p className="font-bold text-slate-900 mb-2">
                  Threshold Audit Triggered
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  This settlement exceeds your account's daily standard
                  verification threshold. As part of our anti-fraud protocols, a
                  manual compliance verification is required to release the
                  funds to the linked bank account.
                </p>
              </div>

              <div className="mb-6">
                <p className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase mb-3">
                  Required Actions
                </p>
                <div className="space-y-3">
                  {[
                    "Provide a digital copy of the primary invoice or contract related to this transaction.",
                    "Confirm the recipient bank details via secondary identity verification.",
                  ].map((action, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl p-3"
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-[11px] font-black text-slate-600 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <button
                  className="py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition"
                  style={{
                    background: "linear-gradient(135deg, #1a3de4, #1230b8)",
                  }}
                >
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
                  Submit Documents
                </button>
                <button className="py-3 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition">
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
                  Contact Support
                </button>
              </div>
              <button
                onClick={closeModal}
                className="w-full py-2 text-[11px] font-bold text-slate-400 tracking-widest uppercase hover:text-slate-600 transition"
              >
                Dismiss for Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAILED modal */}
      {activeModal === "FAILED" && selectedBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="h-1 w-full bg-red-600" />
            <div className="p-6">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#dc2626"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-widest text-red-600 uppercase mb-0.5">
                      Critical Failure
                    </p>
                    <h2 className="text-xl font-black text-slate-900">
                      Bank Transfer Rejected
                    </h2>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-slate-400 hover:text-slate-600 text-xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="border-l-4 border-red-500 bg-slate-50 rounded-xl p-4 mb-5">
                <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase mb-2">
                  Technical Audit Details
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  The automated clearing house (ACH) network has flagged this
                  settlement batch due to{" "}
                  <span className="text-red-600 font-bold italic">
                    Invalid Clearing Codes
                  </span>{" "}
                  detected in the destination routing manifest.
                </p>
                <div className="space-y-2">
                  {[
                    { key: "REASON_CODE:", value: "ERR_CODE_9041_ROUTING" },
                    { key: "AFFECTED_BATCH:", value: `SETTL_2023_09_12_X` },
                  ].map(({ key, value }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-slate-100"
                    >
                      <span className="text-[10px] font-bold text-slate-400 font-mono">
                        {key}
                      </span>
                      <span className="text-[11px] font-black text-slate-800 font-mono">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Please review the recipient's bank configuration. Settlement
                cannot proceed until the routing metadata matches the
                architectural requirements of the Tuma Ledger Protocol.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  className="py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition"
                  style={{
                    background: "linear-gradient(135deg, #1a3de4, #1230b8)",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit Bank Info
                </button>
                <button className="py-3 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition">
                  <RefreshCw size={14} />
                  Retry Batch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
