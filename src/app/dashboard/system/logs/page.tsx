"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";
import { apiGet } from "@/lib/api";
import { getToken } from "@/lib/auth";

const actionColors: Record<string, string> = {
  VERIFIED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-600",
  CREATED: "bg-blue-100 text-blue-700",
  UPDATED: "bg-amber-100 text-amber-700",
  DELETED: "bg-red-100 text-red-600",
  APPROVED: "bg-green-100 text-green-700",
  SUSPENDED: "bg-orange-100 text-orange-700",
  PENDING: "bg-slate-100 text-slate-600",
};

const barColors = [
  "bg-blue-600",
  "bg-purple-500",
  "bg-amber-500",
  "bg-red-500",
  "bg-blue-400",
  "bg-green-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
];

const moduleColors: Record<string, string> = {
  Documents: "text-blue-700",
  Merchants: "text-purple-600",
  Settlements: "text-amber-600",
  Transactions: "text-green-600",
  Users: "text-red-600",
  System: "text-slate-600",
};

const PAGE_SIZE = 10;

export default function ActivityLogsPage() {
  const router = useRouter();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const fetchLogs = async (page: number) => {
    setLoading(true);
    try {
      const data = await apiGet(
        `/audit-logs?page=${page}&size=${PAGE_SIZE}`,
        getToken() ?? undefined,
      );
      setLogs(data.content ?? []);
      setTotalPages(data.totalPages ?? 1);
      setTotalElements(data.totalElements ?? 0);
      setCurrentPage(data.number ?? 0);
    } catch (err: any) {
      setError(err.message ?? "Failed to load audit logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(0);
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return {
      date: d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time:
        d.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " UTC",
    };
  };

  return (
    <div>
      {/* Back button */}
      <div className="mb-5">
        <button
          onClick={() => router.push("/dashboard/system")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
        >
          ← Back to System
        </button>
      </div>

      {/* Breadcrumb */}
      <p className="text-[11px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-4">
        Systems › Administrators ›{" "}
        <span className="text-blue-700">Activity Logs</span>
      </p>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            User Activity Logs
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Immutable record of all operator actions across the platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchLogs(currentPage)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Refresh
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
          >
            <Download size={15} /> Export Ledger
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Total Actions",
            value: loading ? "—" : totalElements.toLocaleString(),
            barColor: "bg-blue-600",
            barWidth: "80%",
          },
          {
            label: "This Page",
            value: loading ? "—" : logs.length.toString(),
            barColor: "bg-purple-500",
            barWidth: `${(logs.length / PAGE_SIZE) * 100}%`,
            valueColor: "text-purple-600",
          },
          {
            label: "Total Pages",
            value: loading ? "—" : totalPages.toString(),
            sub: `Page ${currentPage + 1} of ${totalPages}`,
            subColor: "text-blue-600",
          },
          {
            label: "Log Status",
            value: error ? "Error" : loading ? "Loading..." : "Live",
            sub: error ? "Check connection" : "Cryptographically signed",
            subColor: error ? "text-red-500" : "text-green-600",
            valueColor: error ? "text-red-600" : "text-green-600",
          },
        ].map(
          ({
            label,
            value,
            barColor,
            barWidth,
            sub,
            subColor,
            valueColor,
          }: any) => (
            <div
              key={label}
              className="bg-white rounded-xl border border-slate-200 px-5 py-4"
            >
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">
                {label}
              </p>
              <p
                className={`text-2xl font-black ${valueColor ?? "text-slate-900"} mb-1`}
              >
                {value}
              </p>
              {barColor && (
                <div className="h-1 bg-slate-100 rounded-full">
                  <div
                    className={`h-1 rounded-full ${barColor}`}
                    style={{ width: barWidth }}
                  />
                </div>
              )}
              {sub && (
                <p
                  className={`text-[11px] font-semibold mt-1 ${subColor ?? "text-slate-400"}`}
                >
                  {sub}
                </p>
              )}
            </div>
          ),
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex gap-3 bg-red-50 border border-red-100 rounded-xl px-5 py-4 mb-5">
          <svg
            className="flex-shrink-0 mt-0.5 text-red-500"
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
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {[
                "Timestamp",
                "Module",
                "Action",
                "Description",
                "Entity",
                "IP Address",
                "Details",
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
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-slate-50">
                  {Array.from({ length: 7 }).map((_, j) => (
                    <td key={j} className="px-5 py-4">
                      <div className="h-4 bg-slate-100 rounded animate-pulse w-full" />
                    </td>
                  ))}
                </tr>
              ))
            ) : logs.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-12 text-slate-400 text-sm"
                >
                  No audit logs found.
                </td>
              </tr>
            ) : (
              logs.map((log, i) => {
                const { date, time } = formatDate(log.createdAt);
                return (
                  <tr
                    key={log.id}
                    className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-0.5 h-8 rounded-full ${barColors[i % barColors.length]}`}
                        />
                        <div>
                          <p className="font-bold text-slate-800 text-[13px]">
                            {date}
                          </p>
                          <p className="text-[11px] text-slate-400">{time}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`font-mono text-[12px] font-bold ${moduleColors[log.moduleName] ?? "text-slate-600"}`}
                      >
                        {log.moduleName}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide ${actionColors[log.action] ?? "bg-slate-100 text-slate-600"}`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="px-5 py-4 max-w-xs">
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                        {log.description}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-[11px] font-bold text-slate-500">
                          {log.entityName}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          #{log.entityId}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono text-sm text-slate-500">
                      {log.ipAddress}
                    </td>
                    <td className="px-5 py-4">
                      <button className="text-slate-400 hover:text-blue-700 transition">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Displaying {logs.length} of {totalElements.toLocaleString()} entries
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => fetchLogs(currentPage - 1)}
              disabled={currentPage === 0 || loading}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition text-sm disabled:opacity-40"
            >
              ‹
            </button>
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
              const pageNum = Math.max(0, currentPage - 1) + i;
              if (pageNum >= totalPages) return null;
              return (
                <button
                  key={pageNum}
                  onClick={() => fetchLogs(pageNum)}
                  disabled={loading}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition ${
                    currentPage === pageNum
                      ? "text-white"
                      : "text-slate-600 hover:bg-slate-50 border border-slate-200"
                  }`}
                  style={
                    currentPage === pageNum
                      ? {
                          background:
                            "linear-gradient(135deg, #1a3de4, #1230b8)",
                        }
                      : {}
                  }
                >
                  {pageNum + 1}
                </button>
              );
            })}
            {totalPages > 3 && (
              <>
                <span className="text-slate-400 px-1">...</span>
                <button
                  onClick={() => fetchLogs(totalPages - 1)}
                  disabled={loading}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition ${
                    currentPage === totalPages - 1
                      ? "text-white"
                      : "text-slate-600 hover:bg-slate-50 border border-slate-200"
                  }`}
                  style={
                    currentPage === totalPages - 1
                      ? {
                          background:
                            "linear-gradient(135deg, #1a3de4, #1230b8)",
                        }
                      : {}
                  }
                >
                  {totalPages}
                </button>
              </>
            )}
            <button
              onClick={() => fetchLogs(currentPage + 1)}
              disabled={currentPage >= totalPages - 1 || loading}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition text-sm disabled:opacity-40"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Bottom panels */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 bg-slate-900 rounded-xl p-6">
          <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-3">
            Integrity Protocol Active
          </p>
          <p className="text-sm text-slate-300 leading-relaxed mb-5">
            Every activity listed in this ledger is cryptographically signed and
            cross-referenced with the architectural core. Modifications to these
            logs are technically impossible without multi-sig authority.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
                Hash Algorithm
              </p>
              <p className="font-bold text-blue-400 text-sm">
                SHA-384 Architectural
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
                Verification Status
              </p>
              <p className="font-bold text-green-400 text-sm">100% Validated</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <p className="text-sm font-black text-slate-900">Access Audit</p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              All operator actions are being actively monitored and logged under
              Protocol 7A.
            </p>
          </div>
          <div className="bg-amber-700 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <p className="text-[10px] font-black tracking-widest text-amber-200 uppercase">
                Metadata Map
              </p>
            </div>
            <p className="text-xs text-amber-100 leading-relaxed">
              Current audit depth: Extreme. Logs include environmental variables
              and user-agent string data for forensic reconstruction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
