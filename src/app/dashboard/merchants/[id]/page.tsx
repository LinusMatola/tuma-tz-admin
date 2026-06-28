"use client";
import { useParams, useRouter } from "next/navigation";
import { Send, ShieldAlert } from "lucide-react";
import { useState, useEffect } from "react";
import { apiGet, apiPut } from "@/lib/api";
import { getToken } from "@/lib/auth";

const BASE_IMAGE_URL = "https://dev.tuma-tz.app";

const STATUS_OPTIONS = [
  {
    value: "UNDER_REVIEW",
    label: "Under Review",
    color: "bg-amber-100 text-amber-700",
    requiresComment: true,
  },
  {
    value: "VERIFIED",
    label: "Verified",
    color: "bg-green-100 text-green-700",
    requiresComment: false,
  },
  {
    value: "REJECTED",
    label: "Rejected",
    color: "bg-red-100 text-red-600",
    requiresComment: true,
  },
];

export default function MerchantDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [activeDoc, setActiveDoc] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [remarks, setRemarks] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [profileData, docsData] = await Promise.all([
        apiGet(`/admin/client/profile/${id}`, getToken() ?? undefined),
        apiGet(`/admin/client/documents/${id}`, getToken() ?? undefined),
      ]);
      setProfile(profileData);
      setDocuments(Array.isArray(docsData) ? docsData : []);
    } catch (err: any) {
      setError(err.message ?? "Failed to load merchant details.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (status: string) => {
    setSelectedStatus(status);
    setRemarks("");
    setSubmitError("");
    setSubmitSuccess("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStatus("");
    setRemarks("");
    setSubmitError("");
    setSubmitSuccess("");
  };

  const handleSubmit = async () => {
    const activeDocument = documents[activeDoc];
    if (!activeDocument) return;

    const option = STATUS_OPTIONS.find((s) => s.value === selectedStatus);
    if (option?.requiresComment && !remarks.trim()) {
      setSubmitError(
        `A comment is required when setting status to ${option.label}.`,
      );
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      await apiPut(
        `/admin/client/documents/verify/${activeDocument.id}`,
        {
          documentId: activeDocument.id,
          status: selectedStatus,
          remarks: remarks.trim() || null,
        },
        getToken() ?? undefined,
      );

      setSubmitSuccess(
        `Document status updated to ${option?.label} successfully.`,
      );
      // Refresh documents after 1.5s then close modal
      setTimeout(async () => {
        const docsData = await apiGet(
          `/admin/client/documents/${id}`,
          getToken() ?? undefined,
        );
        setDocuments(Array.isArray(docsData) ? docsData : []);
        closeModal();
      }, 1500);
    } catch (err: any) {
      setSubmitError(err.message ?? "Failed to update document status.");
    } finally {
      setSubmitting(false);
    }
  };

  const statusStyles: Record<string, string> = {
    PENDING: "bg-blue-100 text-blue-700",
    VERIFIED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-600",
    UNDER_REVIEW: "bg-amber-100 text-amber-700",
  };

  const docStatusStyles: Record<string, string> = {
    PENDING: "bg-blue-100 text-blue-700",
    VERIFIED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-600",
    UNDER_REVIEW: "bg-amber-100 text-amber-700",
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
          Loading merchant...
        </span>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="text-red-500 font-medium">
          {error || "Merchant not found"}
        </p>
        <button
          onClick={() => router.push("/dashboard/merchants")}
          className="text-blue-700 text-sm font-semibold hover:underline"
        >
          ← Back to Merchants
        </button>
      </div>
    );
  }

  const activeDocument = documents[activeDoc];

  return (
    <div className="flex flex-col min-h-screen -m-6">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white sticky top-0 z-10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-700 font-bold text-sm hover:underline"
        >
          ← Application ID: {profile.clientRefNo ?? id}
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
        <div className="w-80 shrink-0 border-r border-slate-200 overflow-y-auto bg-white p-6 space-y-5">
          {/* Legal entity */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">
                Legal Entity
              </p>
              <span
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide ${statusStyles[profile.verificationStatus] ?? "bg-slate-100 text-slate-500"}`}
              >
                {profile.verificationStatus}
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-3">
              {profile.businessName ?? profile.email}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Client Ref No", value: profile.clientRefNo ?? "—" },
                { label: "Business Type", value: profile.businessType ?? "—" },
                {
                  label: "Submission Date",
                  value: profile.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—",
                },
                { label: "Country", value: profile.countryCode ?? "—" },
                {
                  label: "Onboarding Step",
                  value: `Step ${profile.step ?? 1}`,
                },
                {
                  label: "Verification",
                  value: profile.verificationStatus ?? "—",
                },
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
                    {profile.businessName ?? "—"}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {profile.businessType ?? "Account Holder"}
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
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {profile.email}
                  </p>
                  <p className="text-[11px] text-slate-400">Registered Email</p>
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
                    {profile.phoneNumber ?? "—"}
                  </p>
                  <p className="text-[11px] text-slate-400">Phone Number</p>
                </div>
              </div>
            </div>
          </div>

          {/* Document status summary */}
          {documents.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-3">
                Documents
              </p>
              <div className="space-y-2">
                {documents.map((doc: any, i: number) => (
                  <div
                    key={doc.id}
                    onClick={() => setActiveDoc(i)}
                    className={`flex items-center justify-between py-2.5 px-3 bg-white rounded-lg border cursor-pointer transition-all ${activeDoc === i ? "border-blue-300 bg-blue-50" : "border-slate-100 hover:border-slate-200"}`}
                  >
                    <span className="text-xs font-medium text-slate-700 truncate max-w-35">
                      {doc.documentType?.replace(/_/g, " ")}
                    </span>
                    <span
                      className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-md ${docStatusStyles[doc.verificationStatus] ?? "bg-slate-100 text-slate-500"}`}
                    >
                      {doc.verificationStatus}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Middle panel — document viewer */}
        <div className="flex-1 bg-slate-100 flex flex-col overflow-hidden">
          {documents.length > 0 ? (
            <>
              {/* Doc tabs */}
              <div className="flex border-b border-slate-200 bg-white px-4 overflow-x-auto">
                {documents.map((doc: any, i: number) => (
                  <button
                    key={doc.id}
                    onClick={() => setActiveDoc(i)}
                    className={`px-4 py-3 text-[11px] font-bold tracking-widest uppercase border-b-2 transition-colors whitespace-nowrap ${
                      activeDoc === i
                        ? "border-blue-700 text-blue-700"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {doc.documentType?.replace(/_/g, " ")}
                  </button>
                ))}
              </div>

              {/* Doc preview */}
              <div className="flex-1 flex items-center justify-center p-8">
                {activeDocument && (
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-lg w-full">
                    {/* Image */}
                    <div className="w-full bg-slate-50 flex items-center justify-center min-h-64 relative">
                      {activeDocument.fileUrl ? (
                        <img
                          src={`${BASE_IMAGE_URL}${activeDocument.fileUrl}`}
                          alt={activeDocument.documentType}
                          className="max-w-full max-h-96 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-3 py-12">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#94a3b8"
                            strokeWidth="1.5"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                          <p className="text-sm text-slate-400">
                            No preview available
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Doc details */}
                    <div className="p-5 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-bold text-slate-800 text-sm">
                          {activeDocument.documentType?.replace(/_/g, " ")}
                        </p>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${docStatusStyles[activeDocument.verificationStatus] ?? "bg-slate-100 text-slate-500"}`}
                        >
                          {activeDocument.verificationStatus}
                        </span>
                      </div>
                      <div className="space-y-1.5 mb-4">
                        {[
                          {
                            label: "File Name",
                            value: activeDocument.fileName,
                          },
                          {
                            label: "Uploaded",
                            value: activeDocument.createdAt
                              ? new Date(
                                  activeDocument.createdAt,
                                ).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })
                              : "—",
                          },
                          {
                            label: "Document ID",
                            value: `#${activeDocument.id}`,
                          },
                        ].map(({ label, value }) => (
                          <div
                            key={label}
                            className="flex items-center justify-between"
                          >
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              {label}
                            </span>
                            <span className="text-xs font-semibold text-slate-700">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="space-y-2">
                        {activeDocument.fileUrl && (
                          <button
                            onClick={() =>
                              window.open(
                                `${BASE_IMAGE_URL}${activeDocument.fileUrl}`,
                                "_blank",
                              )
                            }
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-blue-200 text-blue-700 text-xs font-bold hover:bg-blue-50 transition"
                          >
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                            Open Full Document
                          </button>
                        )}

                        {/* Status action buttons — only show if not already VERIFIED */}
                        {activeDocument.verificationStatus !== "VERIFIED" && (
                          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                            <button
                              onClick={() => openModal("UNDER_REVIEW")}
                              className="py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold hover:bg-amber-100 transition"
                            >
                              Under Review
                            </button>
                            <button
                              onClick={() => openModal("VERIFIED")}
                              className="py-2 rounded-lg bg-green-50 border border-green-200 text-green-700 text-[11px] font-bold hover:bg-green-100 transition"
                            >
                              Verify
                            </button>
                            <button
                              onClick={() => openModal("REJECTED")}
                              className="py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-[11px] font-bold hover:bg-red-100 transition"
                            >
                              Reject
                            </button>
                          </div>
                        )}

                        {activeDocument.verificationStatus === "VERIFIED" && (
                          <div className="pt-2 border-t border-slate-100">
                            <div className="flex items-center justify-center gap-2 py-2 bg-green-50 rounded-lg">
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#16a34a"
                                strokeWidth="2.5"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span className="text-xs font-bold text-green-700">
                                Document Verified
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
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
              <p className="text-slate-500 font-bold mb-1">
                No Documents Uploaded
              </p>
              <p className="text-slate-400 text-sm">
                This merchant hasn't submitted any documents yet.
              </p>
            </div>
          )}
        </div>

        {/* Right panel — reviewer notes */}
        <div className="w-72 shrink-0 border-l border-slate-200 bg-white flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">
              Reviewer Notes
            </p>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-md">
              0 TOTAL
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1.5"
                className="mb-3"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <p className="text-slate-400 text-xs">No reviewer notes yet.</p>
            </div>
          </div>
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
          <button
            onClick={() =>
              router.push(`/dashboard/merchants/${id}/risk-profile`)
            }
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg, #dc2626, #991b1b)" }}
          >
            <ShieldAlert size={15} /> View Risk Profile
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

      {/* Document Status Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    selectedStatus === "VERIFIED"
                      ? "bg-green-100"
                      : selectedStatus === "REJECTED"
                        ? "bg-red-100"
                        : "bg-amber-100"
                  }`}
                >
                  {selectedStatus === "VERIFIED" ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : selectedStatus === "REJECTED" ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#dc2626"
                      strokeWidth="2.5"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  )}
                </div>
                <h2 className="text-lg font-black text-slate-900">
                  {selectedStatus === "VERIFIED"
                    ? "Verify Document"
                    : selectedStatus === "REJECTED"
                      ? "Reject Document"
                      : "Mark Under Review"}
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Document info */}
              <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
                  Document
                </p>
                <p className="text-sm font-bold text-slate-800">
                  {activeDocument?.documentType?.replace(/_/g, " ")}
                </p>
                <p className="text-[11px] text-slate-400">
                  ID: #{activeDocument?.id}
                </p>
              </div>

              {/* Status being set */}
              <div className="flex items-center gap-3">
                <p className="text-sm text-slate-600">Setting status to:</p>
                <span
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                    selectedStatus === "VERIFIED"
                      ? "bg-green-100 text-green-700"
                      : selectedStatus === "REJECTED"
                        ? "bg-red-100 text-red-600"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {selectedStatus?.replace(/_/g, " ")}
                </span>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-[11px] font-bold tracking-[0.12em] text-slate-600 uppercase mb-2">
                  {selectedStatus === "VERIFIED"
                    ? "Remarks (Optional)"
                    : "Comment (Required)"}
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder={
                    selectedStatus === "VERIFIED"
                      ? "Add any optional remarks..."
                      : selectedStatus === "REJECTED"
                        ? "Explain why this document is being rejected..."
                        : "Explain what needs to be reviewed..."
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition resize-none"
                />
                {(selectedStatus === "REJECTED" ||
                  selectedStatus === "UNDER_REVIEW") && (
                  <p className="text-[11px] text-amber-600 mt-1 font-medium">
                    ⚠ A comment is required for this status.
                  </p>
                )}
              </div>

              {/* Error */}
              {submitError && (
                <div className="flex gap-2 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                  <svg
                    className="shrink-0 mt-0.5 text-red-500"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p className="text-xs text-red-600">{submitError}</p>
                </div>
              )}

              {/* Success */}
              {submitSuccess && (
                <div className="flex gap-2 bg-green-50 border border-green-100 rounded-lg px-4 py-3">
                  <svg
                    className="shrink-0 mt-0.5 text-green-600"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <p className="text-xs text-green-700">{submitSuccess}</p>
                </div>
              )}
            </div>

            {/* Modal actions */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
              <button
                onClick={closeModal}
                disabled={submitting}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting || !!submitSuccess}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 transition hover:opacity-90 disabled:opacity-50 ${
                  selectedStatus === "VERIFIED"
                    ? ""
                    : selectedStatus === "REJECTED"
                      ? ""
                      : ""
                }`}
                style={{
                  background:
                    selectedStatus === "VERIFIED"
                      ? "linear-gradient(135deg, #16a34a, #15803d)"
                      : selectedStatus === "REJECTED"
                        ? "linear-gradient(135deg, #dc2626, #991b1b)"
                        : "linear-gradient(135deg, #d97706, #b45309)",
                }}
              >
                {submitting ? (
                  <>
                    <svg
                      className="animate-spin"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    {selectedStatus === "VERIFIED"
                      ? "✓ Verify Document"
                      : selectedStatus === "REJECTED"
                        ? "✕ Reject Document"
                        : "Mark Under Review"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
