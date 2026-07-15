"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Download, Search, SlidersHorizontal } from "lucide-react";
import { apiGet } from "@/lib/api";
import { getToken } from "@/lib/auth";

const insights = [
  {
    label: "Nairobi Corridor High Volume",
    desc: "Application spike detected in logistics category from Central Kenya. Suggested routing: Fast-track Standard Digital tiers.",
    color: "border-l-blue-500",
  },
  {
    label: "Rule Update: Cross-border TZ",
    desc: "New AML guidelines for Tanzanian entities with offshore directors. 12 applications moved to manual review.",
    color: "border-l-purple-500",
  },
];

const PAGE_SIZE = 5;

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
}) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
      <p className="text-xs text-slate-400">
        Showing {totalItems === 0 ? 0 : start} to {end} of {totalItems} results
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

export default function MerchantsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState<
    "all" | "applications" | "active"
  >("all");
  const [merchants, setMerchants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [allPage, setAllPage] = useState(1);
  const [appPage, setAppPage] = useState(1);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const data = await apiGet("/admin/clients", getToken() ?? undefined);
        const list = Array.isArray(data)
          ? data
          : (data.content ?? data.data ?? []);
        const mapped = list.map((m: any) => ({
          id: String(m.clientId),
          clientRefNo: m.clientRefNo,
          name: m.businessName ?? m.email,
          email: m.email,
          phoneNumber: m.phoneNumber,
          country: m.countryCode ?? "—",
          city: "",
          category: m.businessType ?? "—",
          categoryColor:
            m.businessType === "NGO"
              ? "bg-purple-100 text-purple-700"
              : m.businessType === "COMPANY"
                ? "bg-blue-100 text-blue-700"
                : "bg-slate-100 text-slate-600",
          onboarding: `Step ${m.step ?? 1}`,
          submitted: m.createdAt
            ? new Date(m.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }) +
              "\n" +
              new Date(m.createdAt).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              }) +
              " GMT"
            : "—",
          risk:
            m.verificationStatus === "VERIFIED"
              ? "LOW RISK"
              : m.verificationStatus === "REJECTED"
                ? "HIGH RISK"
                : "PENDING",
          riskColor:
            m.verificationStatus === "VERIFIED"
              ? "text-green-600"
              : m.verificationStatus === "REJECTED"
                ? "text-red-600"
                : "text-amber-600",
          riskBg:
            m.verificationStatus === "VERIFIED"
              ? "bg-green-50"
              : m.verificationStatus === "REJECTED"
                ? "bg-red-50"
                : "bg-amber-50",
          riskIcon:
            m.verificationStatus === "VERIFIED"
              ? "✓"
              : m.verificationStatus === "REJECTED"
                ? "▲"
                : "⊙",
          status: m.verificationStatus ?? "PENDING",
          statusColor:
            m.verificationStatus === "VERIFIED"
              ? "bg-green-100 text-green-700"
              : m.verificationStatus === "REJECTED"
                ? "bg-red-100 text-red-600"
                : "bg-amber-100 text-amber-700",
          bar:
            m.verificationStatus === "VERIFIED"
              ? "bg-green-500"
              : m.verificationStatus === "REJECTED"
                ? "bg-red-500"
                : "bg-amber-500",
          icon:
            m.businessType === "NGO"
              ? "🏢"
              : m.businessType === "COMPANY"
                ? "🏦"
                : "🏪",

          volume: "—",
          type: m.verificationStatus === "VERIFIED" ? "Active" : "Application",
          typeColor:
            m.verificationStatus === "VERIFIED"
              ? "bg-blue-50 text-blue-700"
              : "bg-slate-100 text-slate-600",
        }));
        setMerchants(mapped);
      } catch (err: any) {
        setFetchError(err.message ?? "Failed to load merchants.");
      } finally {
        setLoading(false);
      }
    };
    fetchMerchants();
  }, []);

  const kpis = [
    {
      label: "Total Pending",
      value: loading
        ? "—"
        : merchants
            .filter((m) => m.status === "PENDING")
            .length.toString()
            .padStart(3, "0"),
      valueColor: "text-blue-700",
      border: "border-l-blue-700",
    },
    {
      label: "In Review",
      value: loading
        ? "—"
        : merchants
            .filter((m) => m.status === "UNDER_REVIEW")
            .length.toString()
            .padStart(2, "0"),
      valueColor: "text-amber-500",
      border: "border-l-amber-500",
    },
    {
      label: "High Risk",
      value: loading
        ? "—"
        : merchants
            .filter((m) => m.status === "REJECTED")
            .length.toString()
            .padStart(2, "0"),
      valueColor: "text-purple-600",
      border: "border-l-purple-500",
    },
    {
      label: "Avg. TAT",
      value: "4.2h",
      valueColor: "text-green-600",
      border: "border-l-green-500",
    },
  ];

  // Filtered lists
  const filteredAll = merchants.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()) ||
      m.country?.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredApplications = merchants
    .filter((m) => m.type === "Application")
    .filter(
      (m) =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email?.toLowerCase().includes(search.toLowerCase()) ||
        m.country?.toLowerCase().includes(search.toLowerCase()),
    );

  const filteredActive = merchants
    .filter((m) => m.type === "Active")
    .filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));

  // Paginated slices
  const allTotalPages = Math.max(1, Math.ceil(filteredAll.length / PAGE_SIZE));
  const paginatedAll = filteredAll.slice(
    (allPage - 1) * PAGE_SIZE,
    allPage * PAGE_SIZE,
  );

  const appTotalPages = Math.max(
    1,
    Math.ceil(filteredApplications.length / PAGE_SIZE),
  );
  const paginatedApplications = filteredApplications.slice(
    (appPage - 1) * PAGE_SIZE,
    appPage * PAGE_SIZE,
  );

  const activeTotalPages = Math.max(
    1,
    Math.ceil(filteredActive.length / PAGE_SIZE),
  );
  const paginatedActive = filteredActive.slice(
    (activePage - 1) * PAGE_SIZE,
    activePage * PAGE_SIZE,
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Merchants
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage all merchants, applications and active accounts.
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

      {/* Section tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-5 w-fit">
        {(["all", "applications", "active"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSection(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
              activeSection === tab
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab === "all"
              ? "All Merchants"
              : tab === "applications"
                ? "Applications"
                : "Active Merchants"}
          </button>
        ))}
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
            Loading merchants...
          </span>
        </div>
      )}

      {/* Error */}
      {fetchError && !loading && (
        <div className="flex gap-3 bg-red-50 border border-red-100 rounded-xl px-5 py-4 mb-4">
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
          <p className="text-sm text-red-600">{fetchError}</p>
        </div>
      )}

      {!loading && !fetchError && (
        <>
          {/* ALL MERCHANTS tab */}
          {activeSection === "all" && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {[
                      "Merchant",
                      "Client Ref No",
                      "Category",
                      "Country",
                      "Type",
                      "Status",

                      "Volume",
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
                  {paginatedAll.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-12 text-slate-400 text-sm"
                      >
                        No merchants found.
                      </td>
                    </tr>
                  ) : (
                    paginatedAll.map(
                      ({
                        id,
                        clientRefNo,
                        name,
                        category,
                        country,
                        type,
                        typeColor,
                        status,
                        statusColor,

                        volume,
                      }) => (
                        <tr
                          key={id}
                          className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                          onClick={() =>
                            router.push(
                              type === "Active"
                                ? `/dashboard/merchants/${id}/profile`
                                : `/dashboard/merchants/${id}`,
                            )
                          }
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 font-black text-sm flex items-center justify-center">
                                {name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-bold text-slate-800 text-[13px]">
                                  {name}
                                </p>
                                <p className="text-[11px] text-slate-400">
                                  CLIENT ID: {id}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-slate-600 text-sm">
                            {clientRefNo}
                          </td>
                          <td className="px-5 py-4 text-slate-600 text-sm">
                            {category}
                          </td>
                          <td className="px-5 py-4 text-slate-600 text-sm">
                            {country}
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${typeColor}`}
                            >
                              {type}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide ${statusColor}`}
                            >
                              {status}
                            </span>
                          </td>
                          {/* <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-slate-100 rounded-full">
                                <div
                                  className={`h-1.5 rounded-full ${healthColor}`}
                                  style={{ width: `${health}%` }}
                                />
                              </div>
                              <span className="text-xs font-bold text-slate-600">
                                {health}%
                              </span>
                            </div>
                          </td> */}
                          <td className="px-5 py-4 font-bold text-slate-800">
                            {volume}
                          </td>
                        </tr>
                      ),
                    )
                  )}
                </tbody>
              </table>
              <Pagination
                currentPage={allPage}
                totalPages={allTotalPages}
                onPageChange={(p) => setAllPage(p)}
                totalItems={filteredAll.length}
                pageSize={PAGE_SIZE}
              />
            </div>
          )}

          {/* APPLICATIONS tab */}
          {activeSection === "applications" && (
            <>
              {/* Filters */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2.5">
                  <Search size={14} className="text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setAppPage(1);
                    }}
                    placeholder="Search by name, email, or country..."
                    className="bg-transparent text-sm text-slate-600 placeholder-slate-400 focus:outline-none w-full"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
                  All Status <span className="text-slate-400">▾</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
                  All Countries <span className="text-slate-400">▾</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
                  <SlidersHorizontal size={14} /> More Filters
                </button>
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-5">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      {[
                        "Merchant Name",
                        "Geography",
                        "Category",
                        "Onboarding",
                        "Date Submitted",
                        "Risk",
                        "Status",
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
                    {paginatedApplications.length === 0 ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="text-center py-12 text-slate-400 text-sm"
                        >
                          No applications found.
                        </td>
                      </tr>
                    ) : (
                      paginatedApplications.map(
                        ({
                          id,
                          clientRefNo,
                          name,
                          country,
                          city,
                          category,
                          categoryColor,
                          onboarding,
                          submitted,
                          risk,
                          riskColor,
                          riskBg,
                          riskIcon,
                          status,
                          statusColor,
                          bar,
                          icon,
                        }) => (
                          <tr
                            key={id}
                            className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                            onClick={() =>
                              router.push(`/dashboard/merchants/${id}`)
                            }
                          >
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-0.5 h-10 rounded-full ${bar} flex-shrink-0`}
                                />
                                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-lg flex-shrink-0">
                                  {icon}
                                </div>
                                <div>
                                  <p className="font-bold text-slate-800 text-[13px]">
                                    {name}
                                  </p>
                                  <p className="text-[11px] text-slate-400">
                                    CLIENT ID: {id}
                                  </p>
                                  <p className="text-[11px] text-slate-400">
                                    REF NO: {clientRefNo}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <span className="font-semibold text-slate-800">
                                {country}
                              </span>
                              {city && (
                                <span className="text-slate-400">
                                  {" "}
                                  ({city})
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-4">
                              <span
                                className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${categoryColor}`}
                              >
                                {category}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-slate-600 text-sm">
                              {onboarding}
                            </td>
                            <td className="px-5 py-4 text-slate-600 text-[12px] whitespace-pre-line">
                              {submitted}
                            </td>
                            <td className="px-5 py-4">
                              <div
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${riskBg} ${riskColor}`}
                              >
                                <span>{riskIcon}</span> {risk}
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <span
                                className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide ${statusColor}`}
                              >
                                {status}
                              </span>
                            </td>
                            <td
                              className="px-5 py-4"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={() =>
                                  router.push(`/dashboard/merchants/${id}`)
                                }
                                className="text-[11px] font-bold text-blue-700 hover:underline tracking-widest uppercase"
                              >
                                Review
                              </button>
                            </td>
                          </tr>
                        ),
                      )
                    )}
                  </tbody>
                </table>
                <Pagination
                  currentPage={appPage}
                  totalPages={appTotalPages}
                  onPageChange={(p) => setAppPage(p)}
                  totalItems={filteredApplications.length}
                  pageSize={PAGE_SIZE}
                />
              </div>

              {/* Bottom row */}
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">
                      Queue Insights
                    </p>
                    <span className="text-slate-400 text-lg">↗</span>
                  </div>
                  <div className="space-y-3">
                    {insights.map(({ label, desc, color }) => (
                      <div key={label} className={`border-l-4 ${color} pl-3`}>
                        <p className="font-bold text-slate-800 text-sm">
                          {label}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-900 rounded-xl p-6 flex items-center justify-between relative overflow-hidden">
                  <div className="absolute right-0 top-0 bottom-0 w-32 opacity-10 flex items-center justify-center">
                    <span className="text-white text-[80px]">✦</span>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-white font-black text-xl mb-2">
                      Automate Your
                      <br />
                      Workflow with Tuma AI
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-4">
                      Our proprietary ML model filters
                      <br />
                      80% of low-risk applications automatically.
                    </p>
                    <button
                      className="px-5 py-2.5 rounded-lg text-white text-xs font-bold tracking-widest uppercase hover:opacity-90 transition"
                      style={{
                        background: "linear-gradient(135deg, #1a3de4, #1230b8)",
                      }}
                    >
                      Configure Rules
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ACTIVE MERCHANTS tab */}
          {activeSection === "active" && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {[
                      "Merchant",
                      "Category",
                      "Country",
                      "Status",

                      "Volume",
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
                  {paginatedActive.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-12 text-slate-400 text-sm"
                      >
                        No active merchants found.
                      </td>
                    </tr>
                  ) : (
                    paginatedActive.map(
                      ({
                        id,
                        clientRefNo,
                        name,
                        category,
                        country,
                        status,
                        statusColor,
                        health,
                        healthColor,
                        volume,
                      }) => (
                        <tr
                          key={id}
                          className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                          onClick={() =>
                            router.push(`/dashboard/merchants/${id}/profile`)
                          }
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 font-black text-sm flex items-center justify-center">
                                {name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-bold text-slate-800 text-[13px]">
                                  {name}
                                </p>
                                <p className="text-[11px] text-slate-400">
                                  CLIENT ID: {id}
                                </p>
                                <p className="text-[11px] text-slate-400">
                                  REF NO: {clientRefNo}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-slate-600 text-sm">
                            {category}
                          </td>
                          <td className="px-5 py-4 text-slate-600 text-sm">
                            {country}
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide ${statusColor}`}
                            >
                              {status}
                            </span>
                          </td>
                          {/* <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-slate-100 rounded-full">
                                <div
                                  className={`h-1.5 rounded-full ${healthColor}`}
                                  style={{ width: `${health}%` }}
                                />
                              </div>
                              <span className="text-xs font-bold text-slate-600">
                                {health}%
                              </span>
                            </div>
                          </td> */}
                          <td className="px-5 py-4 font-bold text-slate-800">
                            {volume}
                          </td>
                          <td className="px-5 py-4">
                            <button className="text-[11px] font-bold text-blue-700 hover:underline tracking-widest uppercase">
                              View Profile
                            </button>
                          </td>
                        </tr>
                      ),
                    )
                  )}
                </tbody>
              </table>
              <Pagination
                currentPage={activePage}
                totalPages={activeTotalPages}
                onPageChange={(p) => setActivePage(p)}
                totalItems={filteredActive.length}
                pageSize={PAGE_SIZE}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
