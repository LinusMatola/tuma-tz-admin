"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiGet } from "@/lib/api";
import { getToken } from "@/lib/auth";

const statusMap: Record<
  number,
  { label: string; color: string; bg: string; dot: string }
> = {
  1: {
    label: "PENDING",
    color: "text-amber-700",
    bg: "bg-amber-100",
    dot: "bg-amber-500",
  },
  2: {
    label: "PAID",
    color: "text-green-700",
    bg: "bg-green-100",
    dot: "bg-green-500",
  },
  3: {
    label: "FAILED",
    color: "text-red-600",
    bg: "bg-red-100",
    dot: "bg-red-500",
  },
};

const paymentMethodMap: Record<number, string> = {
  0: "—",
  1: "Mobile Money",
  2: "Card",
  3: "Bank Transfer",
};

const paymentTypeMap: Record<number, string> = {
  0: "—",
  1: "One Time",
  2: "Recurring",
};

export default function TransactionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const data = await apiGet(
          `/admin/client/transaction-details/${id}`,
          getToken() ?? undefined,
        );
        setTransaction(data);
      } catch (err: any) {
        setError(err.message ?? "Failed to load transaction.");
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [id]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return (
      d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) +
      " · " +
      d.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <svg
          className="animate-spin text-blue-700"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <span className="ml-3 text-sm text-slate-500 font-medium">
          Loading transaction...
        </span>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-2">
          <svg
            width="24"
            height="24"
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
        <p className="text-slate-800 font-bold">
          {error || "Transaction not found"}
        </p>
        <button
          onClick={() => router.push("/dashboard/transactions")}
          className="text-blue-700 text-sm font-semibold hover:underline"
        >
          ← Back to Transactions
        </button>
      </div>
    );
  }

  const status = statusMap[transaction.status] ?? {
    label: "UNKNOWN",
    color: "text-slate-500",
    bg: "bg-slate-100",
    dot: "bg-slate-400",
  };

  return (
    <div>
      {/* Back */}
      <div className="mb-5">
        <button
          onClick={() => router.push("/dashboard/transactions")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
        >
          ← Back to Transactions
        </button>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[10px] font-black tracking-[0.2em] text-blue-700 uppercase mb-1">
            Transaction Detail
          </p>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {transaction.orderNumber}
          </h1>
          <p className="text-slate-400 text-sm mt-0.5 font-mono break-all">
            {transaction.transactionId}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${status.dot}`} />
          <span
            className={`px-4 py-2 rounded-xl text-sm font-bold tracking-wide ${status.bg} ${status.color}`}
          >
            {status.label}
          </span>
        </div>
      </div>

      {/* Top 3 cards */}
      <div className="grid grid-cols-3 gap-5 mb-5">
        {/* Amount */}
        <div className="bg-white rounded-xl border border-slate-200 border-l-4 border-l-blue-700 px-6 py-5">
          <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-2">
            Transaction Amount
          </p>
          <p className="text-4xl font-black text-slate-900 mb-1">
            {transaction.currency}{" "}
            {Number(transaction.amount).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className={`w-2 h-2 rounded-full ${transaction.processed ? "bg-green-500" : "bg-amber-500"}`}
            />
            <span className="text-xs text-slate-500 font-medium">
              {transaction.processed ? "Processed" : "Not yet processed"}
            </span>
          </div>
        </div>

        {/* Payment info */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-3">
            Payment Info
          </p>
          <div className="space-y-3">
            {[
              { label: "Provider", value: transaction.provider ?? "—" },
              {
                label: "Method",
                value: paymentMethodMap[transaction.paymentMethod] ?? "—",
              },
              {
                label: "Type",
                value: paymentTypeMap[transaction.paymentType] ?? "—",
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {label}
                </span>
                <span className="text-sm font-bold text-slate-700">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Client */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-3">
            Client
          </p>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-black text-sm flex items-center justify-center shrink-0">
              {transaction.clientName
                ? transaction.clientName.charAt(0).toUpperCase()
                : "#"}
            </div>
            <div>
              <p className="font-bold text-slate-800">
                {transaction.clientName ?? `Client #${transaction.clientId}`}
              </p>
              <p className="text-[11px] text-slate-400">
                ID: {transaction.clientId}
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              router.push(`/dashboard/merchants/${transaction.clientId}`)
            }
            className="w-full py-2 rounded-lg border border-blue-200 text-blue-700 text-xs font-bold hover:bg-blue-50 transition"
          >
            View Merchant Profile →
          </button>
        </div>
      </div>

      {/* References */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-5 bg-blue-700 rounded-full" />
          <p className="font-bold text-slate-900">Transaction References</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Transaction ID", value: transaction.transactionId },
            { label: "Payment Reference", value: transaction.paymentReference },
            { label: "Order Number", value: transaction.orderNumber },
            { label: "Order ID", value: `#${transaction.orderId}` },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100"
            >
              <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                {label}
              </p>
              <p className="text-sm font-mono font-bold text-slate-800 break-all">
                {value ?? "—"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Full details grid */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-5 bg-purple-500 rounded-full" />
          <p className="font-bold text-slate-900">Full Details</p>
        </div>
        <div className="grid grid-cols-2 gap-x-12">
          {[
            {
              label: "Amount",
              value: `${transaction.currency} ${Number(transaction.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
            },
            { label: "Currency", value: transaction.currency },
            { label: "Status", value: status.label },
            { label: "Processed", value: transaction.processed ? "Yes" : "No" },
            { label: "Provider", value: transaction.provider ?? "—" },
            {
              label: "Payment Method",
              value: paymentMethodMap[transaction.paymentMethod] ?? "—",
            },
            {
              label: "Payment Type",
              value: paymentTypeMap[transaction.paymentType] ?? "—",
            },
            { label: "Remarks", value: transaction.remarks ?? "—" },
            { label: "Created At", value: formatDate(transaction.createdAt) },
            {
              label: "Paid At",
              value: transaction.paidAt ? formatDate(transaction.paidAt) : "—",
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0"
            >
              <span className="text-[10px] font-bold tracking-widests text-slate-400 uppercase">
                {label}
              </span>
              <span className="text-sm font-bold text-slate-700">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment link */}
      {transaction.paymentLink && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-amber-500 rounded-full" />
            <p className="font-bold text-slate-900">Payment Link</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <p className="text-sm font-mono text-slate-600 flex-1 truncate">
              {transaction.paymentLink}
            </p>
            <button
              onClick={() => window.open(transaction.paymentLink, "_blank")}
              className="shrink-0 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold hover:bg-blue-100 transition"
            >
              Open →
            </button>
            <button
              onClick={() => handleCopy(transaction.paymentLink)}
              className="shrink-0 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-200 transition"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-5 bg-green-500 rounded-full" />
          <p className="font-bold text-slate-900">Transaction Timeline</p>
        </div>
        <div className="relative pl-6">
          <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-100" />
          <div className="space-y-6">
            {[
              {
                label: "Transaction Created",
                time: formatDate(transaction.createdAt),
                color: "bg-blue-600",
                desc: `Order ${transaction.orderNumber} was initiated for ${transaction.currency} ${Number(transaction.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}.`,
                show: true,
              },
              {
                label: "Payment Received",
                time: transaction.paidAt
                  ? formatDate(transaction.paidAt)
                  : null,
                color: "bg-green-500",
                desc: `Payment of ${transaction.currency} ${Number(transaction.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })} received via ${transaction.provider ?? "provider"}.`,
                show: !!transaction.paidAt,
              },
              {
                label: "Transaction Processed",
                time: transaction.paidAt ? formatDate(transaction.paidAt) : "—",
                color: "bg-purple-500",
                desc: "Transaction has been fully processed and reconciled.",
                show: transaction.processed,
              },
            ]
              .filter((e) => e.show)
              .map(({ label, time, color, desc }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className={`w-4 h-4 rounded-full ${color} shrink-0 mt-0.5 ring-4 ring-white`}
                  />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{time}</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
