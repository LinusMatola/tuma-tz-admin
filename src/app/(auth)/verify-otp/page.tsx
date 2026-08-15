"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveAuth } from "@/lib/auth";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("tuma_2fa_email");
    const storedUserId = sessionStorage.getItem("tuma_2fa_userId");
    if (!storedEmail || !storedUserId) {
      router.push("/login");
      return;
    }
    setEmail(storedEmail);
    setUserId(storedUserId);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value.slice(-1);
    setOtp(updated);
    setError("");
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleVerify();
      return;
    }
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const updated = [...otp];
    pasted.split("").forEach((char, i) => {
      updated[i] = char;
    });
    setOtp(updated);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api-proxy/auth/verify-2fa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();

      // Handle expired code or other errors
      if (!res.ok || data.statusCode === 400) {
        setError(data.message ?? "Invalid code. Please try again.");
        return;
      }

      if (data.status === "SUCCESS") {
        saveAuth({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          clientId: data.userId,
        });
        sessionStorage.removeItem("tuma_2fa_email");
        sessionStorage.removeItem("tuma_2fa_userId");
        router.push("/dashboard");
      } else {
        setError(data.message ?? "Verification failed. Please try again.");
      }
    } catch {
      setError("Failed to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!userId) return;
    setResending(true);
    setResent(false);
    setError("");
    try {
      const res = await fetch(`/api-proxy/auth/${userId}/resend-verification`, {
        method: "POST",
        headers: { accept: "*/*" },
      });
      if (res.ok) {
        setResent(true);
        setOtp(["", "", "", "", "", ""]);
        inputs.current[0]?.focus();
      } else {
        setError("Failed to resend code. Please try again.");
      }
    } catch {
      setError("Failed to connect. Please try again.");
    } finally {
      setResending(false);
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
                Two-Factor Authentication
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
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">
            Verify Your Identity
          </h2>
          <p className="text-slate-500 text-sm mb-2">
            Enter the 6-digit code sent to
          </p>
          <p className="font-bold text-slate-800 text-sm mb-8">{email}</p>

          <div className="space-y-6">
            {/* OTP inputs */}
            <div className="flex gap-3" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputs.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={`w-full aspect-square text-center text-xl font-bold rounded-xl border-2 bg-slate-50 text-slate-900 focus:outline-none transition-all focus:border-blue-600 focus:bg-white ${
                    digit ? "border-blue-600 bg-white" : "border-slate-200"
                  } ${error ? "border-red-300" : ""}`}
                />
              ))}
            </div>

            {/* Resent notice */}
            {resent && (
              <div className="flex gap-3 bg-green-50 border border-green-100 rounded-lg px-4 py-3">
                <svg
                  className="shrink-0 mt-0.5 text-green-600"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p className="text-xs text-green-700">
                  A new code has been sent to{" "}
                  <span className="font-bold">{email}</span>.
                </p>
              </div>
            )}

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
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}

            {/* Verify button */}
            <button
              onClick={handleVerify}
              disabled={otp.join("").length < 6 || loading}
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
                  Verify & Continue
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

            {/* Resend */}
            <p className="text-center text-sm text-slate-500">
              Didn't receive the code?{" "}
              <button
                onClick={handleResend}
                disabled={resending}
                className="text-blue-700 font-semibold hover:underline disabled:opacity-50 transition"
              >
                {resending ? "Sending..." : "Resend"}
              </button>
            </p>

            <p className="text-center text-sm text-slate-500">
              <button
                onClick={() => router.push("/login")}
                className="text-slate-500 hover:text-blue-700 transition"
              >
                ← Back to Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
