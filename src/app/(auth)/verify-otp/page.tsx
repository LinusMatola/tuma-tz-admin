"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState("");
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("tuma_2fa_email");
    if (!stored) {
      router.push("/login");
      return;
    }
    setEmail(stored);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value.slice(-1);
    setOtp(updated);
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

  const handleVerify = () => {
    if (otp.join("").length < 6) return;
    // TODO: call real 2FA verify API when Linus provides it
    // e.g. await apiPost("/account/verify-otp", { email, otp: otp.join("") });
    setVerified(true);
    sessionStorage.removeItem("tuma_2fa_email");
    setTimeout(() => router.push("/dashboard"), 1500);
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
                Secure System Entry
              </span>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">
            OTP Verification
          </h2>
          <p className="text-slate-500 text-sm mb-8">
            Enter the 6-digit code sent to{" "}
            <span className="font-bold text-slate-700">
              {email || "your email"}
            </span>
            .
          </p>

          {/* OTP inputs */}
          <div className="flex gap-3 mb-6" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputs.current[i] = el;
                  return;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`w-full aspect-square text-center text-xl font-bold rounded-xl border-2 bg-slate-50 text-slate-900 focus:outline-none transition-all focus:border-blue-600 focus:bg-white ${digit ? "border-blue-600 bg-white" : "border-slate-200"}`}
              />
            ))}
          </div>

          {/* Success message */}
          {verified && (
            <div className="flex gap-3 bg-green-50 border border-green-100 rounded-lg px-4 py-3 mb-4">
              <svg
                className="flex-shrink-0 mt-0.5 text-green-600"
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
                Verified! Redirecting to your dashboard…
              </p>
            </div>
          )}

          {/* Verify button */}
          <button
            onClick={handleVerify}
            disabled={otp.join("").length < 6 || verified}
            className="w-full py-3.5 rounded-xl text-white text-sm font-bold tracking-[0.1em] uppercase flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-50 mb-5"
            style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
          >
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
          </button>

          <p className="text-center text-sm text-slate-500">
            Did not receive the code?{" "}
            <button
              onClick={() => {
                // TODO: call resend OTP API when Linus provides it
              }}
              className="text-blue-700 font-semibold hover:text-blue-900 transition"
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
