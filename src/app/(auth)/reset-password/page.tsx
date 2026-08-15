"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const t = searchParams.get("token");
    if (!t) {
      setError(
        "Invalid or missing reset token. Please request a new password reset.",
      );
      return;
    }
    setToken(t);
  }, []);

  const getStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getStrength(password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = [
    "",
    "bg-red-500",
    "bg-amber-500",
    "bg-blue-500",
    "bg-green-500",
  ][strength];
  const strengthTextColor = [
    "",
    "text-red-600",
    "text-amber-600",
    "text-blue-600",
    "text-green-600",
  ][strength];

  const handleSubmit = async () => {
    if (!password) {
      setError("Please enter a new password.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (strength < 2) {
      setError("Please choose a stronger password.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api-proxy/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({ token, password, confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Failed to reset password.");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Failed to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = ({ show }: { show: boolean }) =>
    show ? (
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
    );

  if (success) {
    return (
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 xl:p-10">
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
                  Password Reset
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-5">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                Password Reset Successful
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Your password has been reset successfully. You can now log in
                with your new password.
              </p>
              <button
                onClick={() => router.push("/login?reset=success")}
                className="w-full py-3.5 rounded-xl text-white text-sm font-bold tracking-[0.1em] uppercase flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #1a3de4, #1230b8)",
                }}
              >
                Continue to Login
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
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                Password Reset
              </span>
            </div>
          </div>

          {/* Icon */}
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a3de4"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">
            Reset Your Password
          </h2>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Choose a strong new password for your account.
          </p>

          {/* No token error */}
          {!token && error && (
            <div className="space-y-4">
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
              <button
                onClick={() => router.push("/forgot-password")}
                className="w-full py-3.5 rounded-xl text-white text-sm font-bold tracking-[0.1em] uppercase flex items-center justify-center gap-2 hover:opacity-90 transition"
                style={{
                  background: "linear-gradient(135deg, #1a3de4, #1230b8)",
                }}
              >
                Request New Reset Link
              </button>
            </div>
          )}

          {/* Form */}
          {token && (
            <div className="space-y-5">
              {/* New password */}
              <div>
                <label className="block text-[11px] font-bold tracking-[0.12em] text-slate-600 uppercase mb-2">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Min. 8 characters"
                    className="w-full px-4 py-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  >
                    <EyeIcon show={showPassword} />
                  </button>
                </div>
                {password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : "bg-slate-200"}`}
                        />
                      ))}
                    </div>
                    <p className={`text-[11px] font-bold ${strengthTextColor}`}>
                      {strengthLabel}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label className="block text-[11px] font-bold tracking-[0.12em] text-slate-600 uppercase mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder="Re-enter your new password"
                    className={`w-full px-4 py-3 rounded-lg bg-slate-100 border text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition pr-12 ${
                      confirmPassword && password !== confirmPassword
                        ? "border-red-300"
                        : confirmPassword && password === confirmPassword
                          ? "border-green-300"
                          : "border-slate-200"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  >
                    <EyeIcon show={showConfirm} />
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-[11px] text-red-600 mt-1 font-medium">
                    Passwords do not match.
                  </p>
                )}
                {confirmPassword && password === confirmPassword && (
                  <p className="text-[11px] text-green-600 mt-1 font-medium flex items-center gap-1">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Passwords match
                  </p>
                )}
              </div>

              {/* Password requirements */}
              <div className="bg-slate-50 rounded-xl border border-slate-100 px-4 py-3 space-y-1.5">
                <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-2">
                  Password Requirements
                </p>
                {[
                  { label: "At least 8 characters", met: password.length >= 8 },
                  {
                    label: "One uppercase letter",
                    met: /[A-Z]/.test(password),
                  },
                  { label: "One number", met: /[0-9]/.test(password) },
                  {
                    label: "One special character",
                    met: /[^A-Za-z0-9]/.test(password),
                  },
                ].map(({ label, met }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${met ? "bg-green-100" : "bg-slate-100"}`}
                    >
                      {met ? (
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#16a34a"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      )}
                    </div>
                    <p
                      className={`text-xs ${met ? "text-green-700 font-medium" : "text-slate-400"}`}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Error */}
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
                  <p className="text-xs text-red-600 leading-relaxed">
                    {error}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={
                  loading ||
                  !password ||
                  !confirmPassword ||
                  password !== confirmPassword ||
                  strength < 2
                }
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
                    Resetting Password...
                  </>
                ) : (
                  <>
                    Reset Password
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
                <button
                  onClick={() => router.push("/login")}
                  className="text-slate-500 hover:text-blue-700 transition"
                >
                  ← Back to Login
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center">
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
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
