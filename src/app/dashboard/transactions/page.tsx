"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";
import { apiGet } from "@/lib/api";
import { getToken } from "@/lib/auth";
import DateRangeFilter, { DateRange } from "@/components/DateRangeFilter";

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

interface FilterBarProps {
  search: string;
  setSearch: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  currencyFilter: string;
  setCurrencyFilter: (v: string) => void;
  dateRange: DateRange;
  setDateRange: (v: DateRange) => void;
  uniqueCurrencies: string[];
  hasActiveFilters: boolean;
  onClearAll: () => void;
  onPageReset: () => void;
}

function FilterBar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  currencyFilter,
  setCurrencyFilter,
  dateRange,
  setDateRange,
  uniqueCurrencies,
  hasActiveFilters,
  onClearAll,
  onPageReset,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 space-y-3">
      {/* Row 1 — Search */}
      <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2.5">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
          className="shrink-0"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onPageReset();
          }}
          placeholder="Search by order number, transaction ID, or client ID..."
          className="bg-transparent text-sm text-slate-600 placeholder-slate-400 focus:outline-none w-full"
        />
        {search && (
          <button
            onClick={() => {
              setSearch("");
              onPageReset();
            }}
            className="text-slate-400 hover:text-slate-600 font-bold text-lg leading-none shrink-0"
          >
            ×
          </button>
        )}
      </div>

      {/* Row 2 — Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              onPageReset();
            }}
            className="appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          >
            <option value="">All Statuses</option>
            <option value="1">Pending</option>
            <option value="2">Paid</option>
            <option value="3">Failed</option>
          </select>
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">
            ▾
          </span>
        </div>

        {/* Currency */}
        <div className="relative">
          <select
            value={currencyFilter}
            onChange={(e) => {
              setCurrencyFilter(e.target.value);
              onPageReset();
            }}
            className="appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          >
            <option value="">All Currencies</option>
            {uniqueCurrencies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">
            ▾
          </span>
        </div>

        {/* Date range */}
        <DateRangeFilter
          value={dateRange}
          onChange={(range) => {
            setDateRange(range);
            onPageReset();
          }}
          placeholder="Date range"
        />

        {/* Clear all */}
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="px-3 py-2.5 rounded-xl border border-red-200 text-sm font-bold text-red-600 hover:bg-red-50 transition whitespace-nowrap"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}

export default function TransactionsPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: null,
    to: null,
  });

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

  const uniqueCurrencies = [
    ...new Set(transactions.map((t: any) => t.currency).filter(Boolean)),
  ];

  const filtered = transactions.filter((t: any) => {
    const matchSearch =
      t.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
      t.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
      String(t.clientId).includes(search) ||
      t.clientName?.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter ? String(t.status) === statusFilter : true;
    const matchCurrency = currencyFilter ? t.currency === currencyFilter : true;

    const createdAt = t.createdAt ? new Date(t.createdAt) : null;
    const matchDate =
      dateRange.from && dateRange.to && createdAt
        ? createdAt >= dateRange.from && createdAt <= dateRange.to
        : dateRange.from && createdAt
          ? createdAt >= dateRange.from
          : true;

    return matchSearch && matchStatus && matchCurrency && matchDate;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const hasActiveFilters = !!(
    search ||
    statusFilter ||
    currencyFilter ||
    dateRange.from
  );

  const clearAllFilters = () => {
    setSearch("");
    setStatusFilter("");
    setCurrencyFilter("");
    setDateRange({ from: null, to: null });
    setCurrentPage(1);
  };

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

      {/* Filter bar */}
      <FilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        currencyFilter={currencyFilter}
        setCurrencyFilter={setCurrencyFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        uniqueCurrencies={uniqueCurrencies}
        hasActiveFilters={hasActiveFilters}
        onClearAll={clearAllFilters}
        onPageReset={() => setCurrentPage(1)}
      />

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
          <div>
            <p className="text-sm font-bold text-red-600">
              Failed to load transactions
            </p>
            <p className="text-xs text-red-500 mt-0.5">{fetchError}</p>
          </div>
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
                  "Client",
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
                    {hasActiveFilters
                      ? "No transactions match your filters."
                      : "No transactions found."}
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
                  const barColors = [
                    "bg-blue-600",
                    "bg-purple-500",
                    "bg-amber-500",
                    "bg-red-500",
                    "bg-green-500",
                    "bg-indigo-500",
                  ];
                  return (
                    <tr
                      key={t.id}
                      className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() =>
                        router.push(`/dashboard/transactions/${t.id}`)
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
                          {t.clientName ?? `Client #${t.clientId}`}
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
                            router.push(`/dashboard/transactions/${t.id}`)
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
