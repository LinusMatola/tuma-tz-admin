"use client";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (form: { roleName: string; description: string }) => Promise<void>;
}

export default function CreateRoleModal({ open, onClose, onSuccess }: Props) {
  const [form, setForm] = useState({ roleName: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async () => {
    if (!form.roleName.trim()) {
      setError("Role name is required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await onSuccess(form);
      setForm({ roleName: "", description: "" });
      onClose();
    } catch (err: any) {
      setError(err.message ?? "Failed to create role.");
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
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a3de4"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Create New Role
              </h2>
              <p className="text-[11px] text-slate-400">
                Add a new role to the platform
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
            style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
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
                Creating...
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
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Create Role
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
