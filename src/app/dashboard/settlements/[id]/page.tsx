"use client";
import { useParams, useRouter } from "next/navigation";

const batchDetails: Record<string, any> = {
  "SB-2023-9021": {
    id: "SB-2023-9021",
    status: "SETTLED",
    amount: "450,000.00",
    currency: "KES",
    processedOn: "Oct 24, 2023 • 14:32",
    merchantCount: "12 active nodes",
    gateway: "Tuma Ledger-Mainnet",
    ledgerHash: "0x72a...f92b",
    archIntegrity: 100,
    transactions: [
      {
        initials: "SA",
        name: "Safari Air Cargo",
        txId: "TXN-488201-92",
        amount: "120,500.00",
      },
      {
        initials: "EL",
        name: "Equity Logistics Ltd",
        txId: "TXN-773291-11",
        amount: "85,000.00",
      },
      {
        initials: "MP",
        name: "M-Pesa Business Node",
        txId: "TXN-110292-84",
        amount: "45,000.00",
      },
      {
        initials: "KT",
        name: "Kilimanjaro Traders",
        txId: "TXN-009212-32",
        amount: "199,500.00",
      },
    ],
    lifecycle: [
      { label: "Batch Generated", time: "OCT 24, 09:00 AM", done: true },
      { label: "Verification Complete", time: "OCT 24, 11:45 AM", done: true },
      {
        label: "Settled Successfully",
        time: "OCT 24, 14:32 PM",
        done: true,
        final: true,
      },
    ],
  },
  "SB-2023-9020": {
    id: "SB-2023-9020",
    status: "PENDING",
    amount: "8,102,500.00",
    currency: "KES",
    processedOn: "Oct 24, 2023 • 08:45",
    merchantCount: "8 active nodes",
    gateway: "Tuma Ledger-Mainnet",
    ledgerHash: "0x81b...c44d",
    archIntegrity: 87,
    transactions: [
      {
        initials: "KC",
        name: "Kili-Cloud Retailers",
        txId: "TXN-482901-11",
        amount: "1,240,000.00",
      },
      {
        initials: "SM",
        name: "Safari Motors Ltd",
        txId: "TXN-773291-22",
        amount: "84,500.50",
      },
    ],
    lifecycle: [
      { label: "Batch Generated", time: "OCT 24, 08:00 AM", done: true },
      { label: "Verification Complete", time: "OCT 24, 08:30 AM", done: true },
      { label: "Settlement Pending", time: "In Progress", done: false },
    ],
  },
  "SB-2023-9019": {
    id: "SB-2023-9019",
    status: "SETTLED",
    amount: "22,890,100.45",
    currency: "KES",
    processedOn: "Oct 23, 2023 • 11:30 PM",
    merchantCount: "24 active nodes",
    gateway: "Tuma Ledger-Mainnet",
    ledgerHash: "0x55c...e81f",
    archIntegrity: 100,
    transactions: [
      {
        initials: "AB",
        name: "Absa Direct Corp",
        txId: "TXN-992011-44",
        amount: "5,200,000.00",
      },
      {
        initials: "NL",
        name: "Nairobi Logistics",
        txId: "TXN-112500-32",
        amount: "4,890,100.45",
      },
    ],
    lifecycle: [
      { label: "Batch Generated", time: "OCT 23, 08:00 PM", done: true },
      { label: "Verification Complete", time: "OCT 23, 10:00 PM", done: true },
      {
        label: "Settled Successfully",
        time: "OCT 23, 11:30 PM",
        done: true,
        final: true,
      },
    ],
  },
  "SB-2023-9018": {
    id: "SB-2023-9018",
    status: "HELD",
    amount: "145,000.00",
    currency: "KES",
    processedOn: "Oct 23, 2023 • 06:15 PM",
    merchantCount: "2 active nodes",
    gateway: "Tuma Ledger-Mainnet",
    ledgerHash: "0x33d...b12a",
    archIntegrity: 65,
    transactions: [
      {
        initials: "SB",
        name: "Stanbic Direct",
        txId: "TXN-145000-01",
        amount: "145,000.00",
      },
    ],
    lifecycle: [
      { label: "Batch Generated", time: "OCT 23, 05:00 PM", done: true },
      {
        label: "Verification Pending",
        time: "Awaiting Compliance",
        done: false,
      },
      { label: "Settlement On Hold", time: "Held", done: false },
    ],
  },
  "SB-2023-9017": {
    id: "SB-2023-9017",
    status: "FAILED",
    amount: "4,120,330.00",
    currency: "KES",
    processedOn: "Oct 23, 2023 • 04:00 PM",
    merchantCount: "6 active nodes",
    gateway: "Tuma Ledger-Mainnet",
    ledgerHash: "0x99e...f00c",
    archIntegrity: 0,
    transactions: [
      {
        initials: "SC",
        name: "Standard Chartered Corp",
        txId: "TXN-412033-01",
        amount: "4,120,330.00",
      },
    ],
    lifecycle: [
      { label: "Batch Generated", time: "OCT 23, 03:00 PM", done: true },
      { label: "Verification Failed", time: "OCT 23, 03:45 PM", done: false },
      { label: "Settlement Failed", time: "Failed", done: false },
    ],
  },
};

const statusStyles: Record<string, string> = {
  SETTLED: "bg-green-100 text-green-700",
  PENDING: "bg-amber-100 text-amber-700",
  HELD: "bg-slate-100 text-slate-600",
  FAILED: "bg-red-100 text-red-600",
};

const avatarColors = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-amber-100 text-amber-700",
  "bg-green-100 text-green-700",
];

export default function BatchDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const b = batchDetails[id];

  if (!b)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="text-slate-400 font-medium">Batch not found</p>
        <button
          onClick={() => router.push("/dashboard/settlements")}
          className="text-blue-700 text-sm font-semibold hover:underline"
        >
          ← Back to Settlements
        </button>
      </div>
    );

  return (
    <div>
      {/* Back */}
      <div className="mb-5">
        <button
          onClick={() => router.push("/dashboard/settlements")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
        >
          ← Back to Settlements
        </button>
      </div>

      {/* Breadcrumb */}
      <p className="text-[11px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-4">
        Settlements › <span className="text-blue-700">Batch Details</span>
      </p>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-black text-slate-900">#{b.id}</h1>
            <span
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold tracking-widets ${statusStyles[b.status]}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
              {b.status}
            </span>
          </div>
          <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase">
            Total Settled Amount
          </p>
          <p className="text-4xl font-black text-blue-700">
            {b.currency} {b.amount}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              router.push(`/dashboard/settlements/${b.id}/reconciliation`)
            }
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            View Reconciliation
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3" />
            </svg>
            Contact Support
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Receipt
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        {/* Batch metadata */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="font-bold text-slate-900 mb-4">Batch Metadata</p>
          <div className="space-y-3">
            {[
              { label: "Processed On", value: b.processedOn },
              { label: "Merchant Count", value: b.merchantCount },
              { label: "Gateway", value: b.gateway },
              { label: "Ledger Hash", value: b.ledgerHash },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
              >
                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  {label}
                </p>
                <p className="text-sm font-bold text-slate-800">{value}</p>
              </div>
            ))}
          </div>

          {/* Settlement health */}
          <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50 rounded-xl p-4">
            <p className="font-bold text-slate-800 mb-1">Settlement Health</p>
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">
              Architecture Integrity: {b.archIntegrity}%
            </p>
            <div className="h-2 bg-slate-200 rounded-full">
              <div
                className={`h-2 rounded-full ${b.archIntegrity === 100 ? "bg-green-500" : b.archIntegrity >= 60 ? "bg-amber-500" : "bg-red-500"}`}
                style={{ width: `${b.archIntegrity}%` }}
              />
            </div>
          </div>
        </div>

        {/* Transaction breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <p className="font-bold text-slate-900">Transaction Breakdown</p>
            <button className="text-[11px] font-bold text-blue-700 hover:underline tracking-widests uppercase">
              Filter
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Merchant Name", "Transaction ID", "Amount"].map((h) => (
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
              {b.transactions.map((tx: any, i: number) => (
                <tr
                  key={tx.txId}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-black flex-shrink-0 ${avatarColors[i % avatarColors.length]}`}
                      >
                        {tx.initials}
                      </div>
                      <span className="font-medium text-slate-800 text-sm">
                        {tx.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-mono text-[11px] text-slate-500">
                    {tx.txId}
                  </td>
                  <td className="px-5 py-3 font-bold text-slate-800 text-right">
                    KES {tx.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-slate-100">
            <button className="w-full text-[11px] font-bold text-slate-400 tracking-widests uppercase hover:text-blue-700 transition">
              Load {Math.max(0, 12 - b.transactions.length)} More Entries
            </button>
          </div>
        </div>
      </div>

      {/* Audit lifecycle */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-5">
          Audit Lifecycle
        </p>
        <div className="flex items-center gap-0">
          {b.lifecycle.map((step: any, i: number) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    step.final
                      ? "bg-green-500 border-green-500"
                      : step.done
                        ? "bg-blue-600 border-blue-600"
                        : "bg-white border-slate-300"
                  }`}
                >
                  {(step.done || step.final) && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <p
                  className={`text-xs font-bold mt-2 text-center ${step.final ? "text-green-600" : step.done ? "text-slate-800" : "text-slate-400"}`}
                >
                  {step.label}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">{step.time}</p>
              </div>
              {i < b.lifecycle.length - 1 && (
                <div
                  className={`flex-1 h-px mx-3 mb-7 ${step.done ? "bg-blue-300" : "bg-slate-200"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
