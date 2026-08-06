"use client";
import { useState } from "react";
import { Role } from "../page";

interface Props {
  open: boolean;
  role: Role | null;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

export default function DeleteRoleModal({
  open,
  role,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open || !role) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      await onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message ?? "Failed to delete role.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Delete Role</h2>
              <p className="text-[11px] text-slate-400">
                This action cannot be undone
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition text-xl font-bold leading-none"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <div className="bg-slate-50 rounded-xl border border-slate-100 px-4 py-3 mb-4">
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
              Role to delete
            </p>
            <p className="font-black text-slate-800">{role.roleName}</p>
            <p className="text-xs text-slate-400 mt-0.5">{role.description}</p>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-bold text-slate-800">{role.roleName}</span>?
            All permissions associated with this role will also be removed.
          </p>

          {error && (
            <div className="flex gap-2 bg-red-50 border border-red-100 rounded-lg px-4 py-3 mt-4">
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
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-white border border-slate-200 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #dc2626, #991b1b)" }}
          >
            {loading ? (
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
                Deleting...
              </>
            ) : (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                </svg>
                Delete Role
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
