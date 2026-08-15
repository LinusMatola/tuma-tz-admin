"use client";
import { useState } from "react";
import { Role } from "../page";

interface User {
  id: number;
  fullName: string;
  email: string;
  roleId: number | null;
}

interface Props {
  open: boolean;
  user: User | null;
  roles: Role[];
  onClose: () => void;
  onSuccess: (userId: number, roleId: number, roleName: string) => void;
}

export default function AssignRoleModal({
  open,
  user,
  roles,
  onClose,
  onSuccess,
}: Props) {
  const [roleId, setRoleId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!open || !user) return null;

  const selectedRole = roles.find((r) => String(r.id) === roleId);

  const handleClose = () => {
    setRoleId("");
    setError("");
    setSuccess("");
    onClose();
  };

  const handleSubmit = async () => {
    if (!roleId) {
      setError("Please select a role.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api-proxy/users/role/assign", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("tuma_access_token") ?? ""}`,
        },
        body: JSON.stringify({
          userId: user.id,
          roleId: Number(roleId),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Failed to assign role.");
        return;
      }
      setSuccess(
        `Role "${data.roleName}" assigned to ${user.fullName} successfully.`,
      );
      onSuccess(data.userId, data.roleId, data.roleName);
      setRoleId("");
    } catch {
      setError("Failed to connect. Please try again.");
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
              <h2 className="text-lg font-black text-slate-900">Assign Role</h2>
              <p className="text-[11px] text-slate-400">
                Assigning to:{" "}
                <span className="font-bold text-slate-600">
                  {user.fullName}
                </span>
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
          {/* User info */}
          <div className="bg-slate-50 rounded-xl border border-slate-100 px-4 py-3">
            <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-2">
              User
            </p>
            <p className="font-bold text-slate-800">{user.fullName}</p>
            <p className="text-xs text-slate-500">{user.email}</p>
            <p className="text-xs text-slate-400 mt-1">
              Current role:{" "}
              {user.roleId ? `ID #${user.roleId}` : "No role assigned"}
            </p>
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
            <div className="bg-slate-50 rounded-xl border border-slate-100 px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800 text-sm">
                    {selectedRole.roleName}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedRole.description}
                  </p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold shrink-0 ml-3 ${
                    (selectedRole.permissions?.length ?? 0) > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {selectedRole.permissions?.length ?? 0} permissions
                </span>
              </div>
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
            {success ? "Close" : "Cancel"}
          </button>
          {!success && (
            <button
              onClick={handleSubmit}
              disabled={loading || !roleId}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
              }}
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
          )}
        </div>
      </div>
    </div>
  );
}
