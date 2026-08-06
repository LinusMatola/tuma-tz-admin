"use client";
import { useState } from "react";
import { Role } from "../page";

interface Props {
  open: boolean;
  roles: Role[];
  onClose: () => void;
  onSuccess: (userId: number, roleId: number) => Promise<void>;
}

export default function AssignRoleModal({
  open,
  roles,
  onClose,
  onSuccess,
}: Props) {
  const [userId, setUserId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!open) return null;

  const selectedRole = roles.find((r) => String(r.id) === roleId);

  const handleSubmit = async () => {
    if (!userId.trim() || !roleId) {
      setError("Both User ID and Role are required.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await onSuccess(Number(userId), Number(roleId));
      setSuccess(
        `Role "${selectedRole?.roleName}" successfully assigned to User #${userId}.`,
      );
      setUserId("");
      setRoleId("");
    } catch (err: any) {
      setError(err.message ?? "Failed to assign role.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setUserId("");
    setRoleId("");
    setError("");
    setSuccess("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Assign Role to User
              </h2>
              <p className="text-[11px] text-slate-400">
                Grant a user access via role assignment
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition text-xl font-bold leading-none"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Security notice */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 mb-1">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a3de4"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-[11px] font-bold text-blue-700 uppercase tracking-widest">
                Security Notice
              </p>
            </div>
            <p className="text-xs text-blue-600 leading-relaxed">
              Assigning a role grants the user all permissions associated with
              that role. Ensure you select the correct role before proceeding.
            </p>
          </div>

          {/* User ID */}
          <div>
            <label className="block text-[11px] font-bold tracking-[0.12em] text-slate-600 uppercase mb-2">
              User ID <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                setError("");
                setSuccess("");
              }}
              placeholder="Enter numeric user ID e.g. 33"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          {/* Role select */}
          <div>
            <label className="block text-[11px] font-bold tracking-[0.12em] text-slate-600 uppercase mb-2">
              Select Role <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={roleId}
                onChange={(e) => {
                  setRoleId(e.target.value);
                  setError("");
                  setSuccess("");
                }}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition appearance-none"
              >
                <option value="">Select a role...</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.roleName} — {r.description}
                  </option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                ▾
              </span>
            </div>
          </div>

          {/* Role preview */}
          {selectedRole && (
            <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">
                Selected Role Preview
              </p>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-black text-slate-800">
                    {selectedRole.roleName}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedRole.description}
                  </p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold shrink-0 ml-3 ${
                    selectedRole.permissions?.length > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {selectedRole.permissions?.length ?? 0} permissions
                </span>
              </div>
              {selectedRole.permissions?.length === 0 && (
                <p className="text-xs text-amber-600 flex items-center gap-1.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  This role has no permissions assigned yet.
                </p>
              )}
            </div>
          )}

          {/* Error */}
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

          {/* Success */}
          {success && (
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
              <p className="text-xs text-green-700">{success}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50">
          <button
            onClick={handleClose}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-white border border-slate-200 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !userId || !roleId}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
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
                Assigning...
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
                Assign Role
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
