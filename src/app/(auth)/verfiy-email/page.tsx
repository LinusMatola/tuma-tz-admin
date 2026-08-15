"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link. Please request a new one.");
      return;
    }
    const verify = async () => {
      try {
        const res = await fetch(`/api-proxy/auth/verify/${token}`, {
          method: "GET",
          headers: { accept: "*/*" },
        });
        const data = await res.text();
        if (res.ok) {
          setStatus("success");
          setMessage(data || "Your email has been verified successfully.");
        } else {
          setStatus("error");
          setMessage(data || "Verification failed. The link may have expired.");
        }
      } catch {
        setStatus("error");
        setMessage("Failed to connect. Please try again.");
      }
    };
    verify();
  }, []);

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
                Email Verification
              </span>
            </div>
          </div>

          {/* Loading */}
          {status === "loading" && (
            <div className="flex flex-col items-center text-center py-8">
              <svg
                className="animate-spin text-blue-700 mb-4"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Verifying your email...
              </h2>
              <p className="text-slate-500 text-sm">
                Please wait while we confirm your email address.
              </p>
            </div>
          )}

          {/* Success */}
          {status === "success" && (
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
                Email Verified!
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                {message}
              </p>
              <button
                onClick={() => router.push("/login")}
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
          )}

          {/* Error */}
          {status === "error" && (
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-5">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                Verification Failed
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                {message}
              </p>
              <div className="w-full space-y-3">
                <button
                  onClick={() => router.push("/login")}
                  className="w-full py-3.5 rounded-xl text-white text-sm font-bold tracking-[0.1em] uppercase flex items-center justify-center gap-2 transition-all hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #1a3de4, #1230b8)",
                  }}
                >
                  Back to Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
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
      <VerifyEmailContent />
    </Suspense>
  );
}
