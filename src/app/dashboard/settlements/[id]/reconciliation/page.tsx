"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function TransactionReconciliation() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [reason, setReason] = useState("");

  return (
    <div>
      {/* Back */}
      <div className="mb-5">
        <button
          onClick={() => router.push(`/dashboard/settlements/${id}`)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
        >
          ← Back to Batch
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-slate-400 mb-0.5">
            Tuma Ledger —{" "}
            <span className="text-blue-700 font-bold">
              MP6MPI Reconciliation
            </span>
          </p>
          <h1 className="text-2xl font-black text-slate-900">
            Batch #{id} Reconciliation
          </h1>
        </div>
      </div>

      {/* Side by side records */}
      <div className="grid grid-cols-2 gap-5 mb-5 relative">
        {/* Gateway record */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a3de4"
                strokeWidth="2"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <p className="text-sm font-bold text-slate-700">Gateway Record</p>
            </div>
            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-lg">
              SOURCE: TUMA-GW-01
            </span>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                Transaction ID
              </p>
              <p className="font-black text-slate-900">TXN-88294-KRR-92</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                  Gross Amount
                </p>
                <p className="font-black text-slate-900">KES 42,500.00</p>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                  Platform Fee
                </p>
                <p className="font-black text-red-600">KES 50.00</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                Timestamp
              </p>
              <p className="font-medium text-slate-700 text-sm">
                2023-10-24 14:22:09 EAT
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                Merchant
              </p>
              <p className="font-medium text-slate-700 text-sm">
                Kilimanjaro Logistics Ltd.
              </p>
            </div>
          </div>
        </div>

        {/* Link icon in middle */}
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a3de4"
              strokeWidth="2"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition shadow-sm">
            MAP FIELDS
          </button>
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <p className="text-[10px] font-bold text-red-600 tracking-widests uppercase">
            Mismatch Detected
          </p>
        </div>

        {/* Bank record */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="2"
              >
                <line x1="3" y1="9" x2="21" y2="9" />
                <path d="M3 9l2-5h14l2 5M3 9v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9" />
              </svg>
              <p className="text-sm font-bold text-slate-700">
                Nostro Bank Record
              </p>
            </div>
            <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-[10px] font-bold rounded-lg">
              PARTNER: NCBA BANK
            </span>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                Bank Reference
              </p>
              <p className="font-black text-slate-900">FT231024-NCBA-0922</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                  Settled Amount
                </p>
                <p className="font-black text-slate-900">KES 42,500.00</p>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                  Processing Fee
                </p>
                <p className="font-black text-slate-900">KES 0.00</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                Effective Date
              </p>
              <p className="font-medium text-slate-700 text-sm">
                2023-10-24 16:45:00 EAT
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                Payee Narrative
              </p>
              <p className="font-medium text-slate-700 text-sm">
                STLMNT_KILIMANJARO_LTD_24OCT
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reconciliation decision */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1a3de4"
            strokeWidth="2"
          >
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          <p className="font-bold text-slate-900">Reconciliation Decision</p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-sm font-bold text-red-700">
                  KES 50.00 Discrepancy Found
                </p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                The Gateway applied a platform fee that was not mirrored or
                settled by the partner bank. This suggests a fee-exemption
                override failure at the gateway level.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widests text-slate-500 uppercase mb-2">
                Reason for Edit (Mandatory Log)
              </p>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter specific reason for discrepancy resolution (e.g., 'Retroactive fee waiver applied to Merchant ID #992')..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition resize-none"
              />
            </div>
          </div>

          <div>
            <div className="bg-slate-50 rounded-xl p-4 mb-4">
              <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-3">
                Proposed Adjustment
              </p>
              <div className="space-y-2">
                {[
                  { label: "Gateway Balance", value: "KES 42,450.00" },
                  { label: "Bank Balance", value: "KES 42,500.00" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-slate-600">{label}</span>
                    <span className="text-sm font-bold text-slate-800">
                      {value}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="text-sm font-bold text-blue-700">
                    Net Adjustment
                  </span>
                  <span className="text-sm font-black text-blue-700">
                    + KES 50.00
                  </span>
                </div>
              </div>
            </div>
            <button
              className="w-full py-3.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition flex items-center justify-center gap-2"
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
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              Reconcile Discrepancy
            </button>
          </div>
        </div>
      </div>

      {/* Orphan field mapping */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="font-bold text-slate-900">Orphan Field Mapping</p>
            <p className="text-xs text-slate-400">
              Unlinked data points detected in the transmission stream.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition tracking-widests uppercase">
              Re-Scan Stream
            </button>
            <button
              className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-white hover:opacity-90 transition tracking-widests uppercase"
              style={{
                background: "linear-gradient(135deg, #1a3de4, #1230b8)",
              }}
            >
              Auto-Match All
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[
            {
              key: "device_fingerprint",
              value: "0×92f8...291a",
              action: "LINK TO NOSTRO",
              linked: false,
            },
            {
              key: "ip_origin_node",
              value: "192.168.1.104 (Nairobi-Edge)",
              action: "LINK TO NOSTRO",
              linked: false,
            },
            {
              key: "iso_currency_code",
              value: "KES (Fixed)",
              action: "MATCHED TO: CCY_TYPE",
              linked: true,
            },
          ].map(({ key, value, action, linked }) => (
            <div
              key={key}
              className="bg-slate-50 border border-slate-100 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase">
                  Metadata Key
                </p>
                {linked && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1a3de4"
                    strokeWidth="2.5"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  </svg>
                )}
              </div>
              <p className="font-mono text-sm font-bold text-slate-800 mb-0.5">
                {key}
              </p>
              <p className="text-[11px] text-slate-400 mb-3">{value}</p>
              <button
                className={`text-[11px] font-bold tracking-widests uppercase hover:underline ${linked ? "text-blue-600" : "text-blue-700"}`}
              >
                {action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
