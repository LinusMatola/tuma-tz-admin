"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Download, Search } from "lucide-react";
import { apiGet } from "@/lib/api";
import { getToken } from "@/lib/auth";

const PAGE_SIZE = 5;

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

const barColors = [
  "bg-blue-600",
  "bg-purple-500",
  "bg-amber-500",
  "bg-red-500",
  "bg-green-500",
  "bg-indigo-500",
];

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  totalItems: number;
  pageSize: number;
}) {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);
  return (
    <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
      <p className="text-xs text-slate-400">
        Showing {start} to {end} of {totalItems} results
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition text-sm disabled:opacity-40"
        >
          ‹
        </button>
        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map(
          (n) => (
            <button
              key={n}
              onClick={() => onPageChange(n)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition ${
                currentPage === n
                  ? "text-white"
                  : "text-slate-600 hover:bg-slate-50 border border-slate-200"
              }`}
              style={
                currentPage === n
                  ? { background: "linear-gradient(135deg, #1a3de4, #1230b8)" }
                  : {}
              }
            >
              {n}
            </button>
          ),
        )}
        {totalPages > 3 && (
          <>
            <span className="text-slate-400 px-1">...</span>
            <button
              onClick={() => onPageChange(totalPages)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition ${
                currentPage === totalPages
                  ? "text-white"
                  : "text-slate-600 hover:bg-slate-50 border border-slate-200"
              }`}
              style={
                currentPage === totalPages
                  ? { background: "linear-gradient(135deg, #1a3de4, #1230b8)" }
                  : {}
              }
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition text-sm disabled:opacity-40"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default function TransactionsPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await apiGet(
          "/admin/client/transactions",
          getToken() ?? undefined,
        );
        const list = Array.isArray(data)
          ? data
          : (data.content ?? data.data ?? []);
        setTransactions(list);
      } catch (err: any) {
        setFetchError(err.message ?? "Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    return (
      new Date(dateStr).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) +
      "\n" +
      new Date(dateStr).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  const filtered = transactions.filter(
    (t) =>
      t.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
      t.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
      t.currency?.toLowerCase().includes(search.toLowerCase()) ||
      String(t.clientId).includes(search),
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const kpis = [
    {
      label: "Total Transactions",
      value: loading ? "—" : transactions.length.toString(),
      valueColor: "text-blue-700",
      border: "border-l-blue-700",
    },
    {
      label: "Paid",
      value: loading
        ? "—"
        : transactions.filter((t) => t.status === 2).length.toString(),
      valueColor: "text-green-600",
      border: "border-l-green-500",
    },
    {
      label: "Pending",
      value: loading
        ? "—"
        : transactions.filter((t) => t.status === 1).length.toString(),
      valueColor: "text-amber-600",
      border: "border-l-amber-500",
    },
    {
      label: "Failed",
      value: loading
        ? "—"
        : transactions.filter((t) => t.status === 3).length.toString(),
      valueColor: "text-red-600",
      border: "border-l-red-500",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Transactions
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Monitor and manage all platform payment transactions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
            <Download size={15} /> Export CSV
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
          >
            + New Entry
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map(({ label, value, valueColor, border }) => (
          <div
            key={label}
            className={`bg-white rounded-xl border border-slate-200 border-l-4 ${border} px-5 py-4`}
          >
            <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-2">
              {label}
            </p>
            {loading ? (
              <div className="h-8 w-16 bg-slate-100 rounded-lg animate-pulse" />
            ) : (
              <span className={`text-3xl font-black ${valueColor}`}>
                {value}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2.5">
          <Search size={14} className="text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by order number, transaction ID, or client..."
            className="bg-transparent text-sm text-slate-600 placeholder-slate-400 focus:outline-none w-full"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
          All Status <span className="text-slate-400">▾</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
          All Currencies <span className="text-slate-400">▾</span>
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20 bg-white rounded-xl border border-slate-200">
          <svg
            className="animate-spin text-blue-700"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          <span className="ml-3 text-sm text-slate-500 font-medium">
            Loading transactions...
          </span>
        </div>
      )}

      {/* Error */}
      {fetchError && !loading && (
        <div className="flex gap-3 bg-red-50 border border-red-100 rounded-xl px-5 py-4 mb-4">
          <svg
            className="shrink-0 mt-0.5 text-red-500"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-sm text-red-600">{fetchError}</p>
        </div>
      )}

      {/* Table */}
      {!loading && !fetchError && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {[
                  "Transaction",
                  "Order",
                  "Business Name",
                  "Amount",
                  "Provider",
                  "Status",
                  "Created",
                  "Paid At",
                  "Action",
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
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center py-12 text-slate-400 text-sm"
                  >
                    No transactions found.
                  </td>
                </tr>
              ) : (
                paginated.map((t, i) => {
                  const status = statusMap[t.status] ?? {
                    label: "UNKNOWN",
                    color: "text-slate-500",
                    bg: "bg-slate-100",
                    dot: "bg-slate-400",
                  };
                  return (
                    <tr
                      key={t.id}
                      className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/dashboard/transactions/${t.transactionId}`,
                        )
                      }
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-0.5 h-8 rounded-full ${barColors[i % barColors.length]} shrink-0`}
                          />
                          <div>
                            <p className="font-bold text-slate-800 text-[12px] font-mono">
                              {t.transactionId?.slice(0, 8)}...
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono">
                              {t.paymentReference?.slice(0, 8)}...
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-800 text-[12px]">
                          {t.orderNumber}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Order #{t.orderId}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-700 text-[12px]">
                          {t.clientName ?? `Business #${t.clientId}`}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-black text-slate-900 text-sm">
                          {t.currency}{" "}
                          {Number(t.amount).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600">
                          {t.provider ?? "—"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${status.dot}`}
                          />
                          <span
                            className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide ${status.bg} ${status.color}`}
                          >
                            {status.label}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-600 text-[12px] whitespace-pre-line">
                        {formatDate(t.createdAt)}
                      </td>
                      <td className="px-5 py-4 text-slate-600 text-[12px] whitespace-pre-line">
                        {t.paidAt ? (
                          formatDate(t.paidAt)
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                      <td
                        className="px-5 py-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() =>
                            router.push(
                              `/dashboard/transactions/${t.transactionId}`,
                            )
                          }
                          className="text-[11px] font-bold text-blue-700 hover:underline tracking-widest uppercase"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
          />
        </div>
      )}
    </div>
  );
}
