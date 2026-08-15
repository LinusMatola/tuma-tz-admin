"use client";
import { useState } from "react";

interface Role {
  id: number;
  roleName: string;
  description: string;
  permissions?: string[];
}

interface RegisteredUser {
  userId: number;
  email: string;
  message: string;
}

interface Props {
  open: boolean;
  roles: Role[];
  onClose: () => void;
}

export default function RegisterUserModal({ open, roles, onClose }: Props) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    roleId: "",
    twoFactorEnabled: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<RegisteredUser | null>(null);

  if (!open) return null;

  const set = (key: string, value: any) => {
    setForm((f) => ({ ...f, [key]: value }));
    setError("");
  };

  const handleClose = () => {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      roleId: "",
      twoFactorEnabled: false,
    });
    setError("");
    setSuccess(null);
    onClose();
  };

  const handleSubmit = async () => {
    console.log("Token:", localStorage.getItem("tuma_access_token"));
    console.log("Form:", form);

    if (!form.fullName.trim()) {
      setError("Full name is required.");
      return;
    }
    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!form.phone.trim()) {
      setError("Phone number is required.");
      return;
    }
    if (!form.roleId) {
      setError("Please select a role.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api-proxy/auth/register-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("tuma_access_token") ?? ""}`,
        },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          roleId: Number(form.roleId),
          twoFactorEnabled: form.twoFactorEnabled,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Failed to register user.");
      setSuccess(data);
    } catch (err: any) {
      setError(err.message ?? "Failed to register user.");
    } finally {
      setLoading(false);
    }
  };

  const selectedRole = roles.find((r) => String(r.id) === form.roleId);

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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Register New User
              </h2>
              <p className="text-[11px] text-slate-400">
                A temporary password will be sent via email
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

        {/* Success state */}
        {success ? (
          <>
            <div className="px-6 py-6 space-y-4">
              <div className="flex flex-col items-center text-center py-4">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="font-black text-slate-900 text-lg mb-1">
                  User Registered!
                </p>
                <p className="text-sm text-slate-500">{success.message}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div>
                  <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                    User ID
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    #{success.userId}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                    Email
                  </p>
                  <p className="text-sm font-bold text-slate-800 break-all">
                    {success.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-lg px-4 py-3">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <p className="text-xs text-green-700">
                  Temporary password sent to{" "}
                  <span className="font-bold">{success.email}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50">
              <button
                onClick={() => setSuccess(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-white transition"
              >
                Register Another
              </button>
              <button
                onClick={handleClose}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
                style={{
                  background: "linear-gradient(135deg, #1a3de4, #1230b8)",
                }}
              >
                Done
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Form */}
            <div className="px-6 py-5 space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold tracking-[0.12em] text-slate-600 uppercase mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold tracking-[0.12em] text-slate-600 uppercase mb-2">
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="john@tuma.command"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[11px] font-bold tracking-[0.12em] text-slate-600 uppercase mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+254 700 000 000"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-[11px] font-bold tracking-[0.12em] text-slate-600 uppercase mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={form.roleId}
                    onChange={(e) => set("roleId", e.target.value)}
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
                {selectedRole && (
                  <div className="mt-2 flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
                    <p className="text-xs text-slate-500">
                      {selectedRole.description}
                    </p>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        (selectedRole.permissions?.length ?? 0) > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {selectedRole.permissions?.length ?? 0} permissions
                    </span>
                  </div>
                )}
              </div>

              {/* 2FA Toggle */}
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1a3de4"
                      strokeWidth="2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">
                      Enable 2FA
                    </p>
                    <p className="text-xs text-slate-400">
                      Verify via email on each login.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    set("twoFactorEnabled", !form.twoFactorEnabled)
                  }
                  className={`w-11 h-6 rounded-full transition-all relative shrink-0 ${
                    form.twoFactorEnabled ? "bg-blue-700" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow ${
                      form.twoFactorEnabled ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>

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
                disabled={
                  loading ||
                  !form.fullName ||
                  !form.email ||
                  !form.phone ||
                  !form.roleId
                }
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition disabled:opacity-50"
                style={{
                  background: "linear-gradient(135deg, #1a3de4, #1230b8)",
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
                    Registering...
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
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <line x1="19" y1="8" x2="19" y2="14" />
                      <line x1="22" y1="11" x2="16" y2="11" />
                    </svg>
                    Register User
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
