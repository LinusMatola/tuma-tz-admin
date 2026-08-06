"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifyTempPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("tuma_first_login_email");
    if (!stored) {
      router.push("/first-login");
      return;
    }
    setEmail(stored);
  }, []);

  const handleSubmit = async () => {
    if (!tempPassword.trim()) {
      setError("Please enter the temporary password from your email.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // TODO: replace with real API when Linus provides endpoint
      // const data = await apiPost("/account/login", { email, password: tempPassword });
      // saveAuth(data);
      await new Promise((r) => setTimeout(r, 1000)); // simulate API call
      sessionStorage.setItem("tuma_reset_email", email);
      router.push("/reset-password");
    } catch (err: any) {
      setError(err.message ?? "Invalid temporary password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 xl:p-10">
          {/* Logo */}
          <div className="mb-7">
            <span
              className="text-2xl font-black tracking-tight text-slate-900"
              style={{ letterSpacing: "-0.03em" }}
            >
              Tuma
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                Account Setup
              </span>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">
            Enter Temporary Password
          </h2>
          <p className="text-slate-500 text-sm mb-2">
            We sent a temporary password to
          </p>
          <p className="font-bold text-slate-800 text-sm mb-8">{email}</p>

          <div className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold tracking-[0.12em] text-slate-600 uppercase mb-2">
                Temporary Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={tempPassword}
                  onChange={(e) => setTempPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="Enter temporary password"
                  className="w-full px-4 py-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex gap-3 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
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
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}

            <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
              <svg
                className="shrink-0 text-amber-600"
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
              <p className="text-xs text-amber-700 leading-relaxed">
                This password can only be used once. You'll set a new permanent
                password on the next step.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !tempPassword.trim()}
              className="w-full py-3.5 rounded-xl text-white text-sm font-bold tracking-[0.1em] uppercase flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #1a3de4, #1230b8)",
              }}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Verifying...
                </>
              ) : (
                <>
                  Continue
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>

            <p className="text-center text-sm text-slate-500">
              Didn't receive the email?{" "}
              <button
                onClick={() => router.push("/first-login")}
                className="text-blue-700 font-semibold hover:underline"
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
