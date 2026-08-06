"use client";
import { useState, useEffect } from "react";
import { Role } from "../page";

interface Props {
  open: boolean;
  role: Role | null;
  onClose: () => void;
  onSuccess: (form: { roleName: string; description: string }) => Promise<void>;
}

export default function EditRoleModal({
  open,
  role,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState({ roleName: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (role) {
      setForm({ roleName: role.roleName, description: role.description ?? "" });
      setError("");
    }
  }, [role]);

  if (!open || !role) return null;

  const handleSubmit = async () => {
    if (!form.roleName.trim()) {
      setError("Role name is required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await onSuccess(form);
      onClose();
    } catch (err: any) {
      setError(err.message ?? "Failed to update role.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#d97706"
                strokeWidth="2"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Edit Role</h2>
              <p className="text-[11px] text-slate-400">
                Editing:{" "}
                <span className="font-bold text-slate-600">
                  {role.roleName}
                </span>
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
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-[11px] font-bold tracking-[0.12em] text-slate-600 uppercase mb-2">
              Role Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.roleName}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  roleName: e.target.value.toUpperCase().replace(/\s+/g, "_"),
                }))
              }
              placeholder="e.g. COMPLIANCE_OFFICER"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition font-mono"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Auto-formatted as UPPER_SNAKE_CASE.
            </p>
          </div>
          <div>
            <label className="block text-[11px] font-bold tracking-[0.12em] text-slate-600 uppercase mb-2">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Describe what this role is for..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition resize-none"
            />
          </div>
          {error && (
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
            onClick={handleSubmit}
            disabled={loading || !form.roleName.trim()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #d97706, #b45309)" }}
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
                Saving...
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
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
