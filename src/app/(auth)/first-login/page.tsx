"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FirstLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // TODO: replace with real API when Linus provides endpoint
      // await apiPost("/account/request-temp-password", { email });
      await new Promise((r) => setTimeout(r, 1000)); // simulate API call
      sessionStorage.setItem("tuma_first_login_email", email);
      setSent(true);
    } catch (err: any) {
      setError(err.message ?? "Failed to send temporary password.");
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

          {!sent ? (
            <>
              <h2 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">
                First Time Here?
              </h2>
              <p className="text-slate-500 text-sm mb-8">
                Enter your work email and we'll send you a temporary password to
                get started.
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-[11px] font-bold tracking-[0.12em] text-slate-600 uppercase mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder="you@tuma.com"
                    className="w-full px-4 py-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  />
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

                <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
                  <svg
                    className="shrink-0 text-blue-600"
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
                  <p className="text-xs text-blue-700 leading-relaxed">
                    A temporary password will be sent to your email. You'll be
                    asked to set a new password on first login.
                  </p>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || !email.trim()}
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
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Temporary Password
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
                  Already have an account?{" "}
                  <button
                    onClick={() => router.push("/login")}
                    className="text-blue-700 font-semibold hover:underline"
                  >
                    Log in
                  </button>
                </p>
              </div>
            </>
          ) : (
            /* Success state */
            <>
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                  Check Your Email
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  A temporary password has been sent to{" "}
                  <span className="font-bold text-slate-700">{email}</span>. Use
                  it to log in, then you'll be prompted to set a new password.
                </p>
              </div>

              <button
                onClick={() => router.push("/verify-temp-password")}
                className="w-full py-3.5 rounded-xl text-white text-sm font-bold tracking-[0.1em] uppercase flex items-center justify-center gap-2 transition-all hover:opacity-90 mb-4"
                style={{
                  background: "linear-gradient(135deg, #1a3de4, #1230b8)",
                }}
              >
                Enter Temporary Password
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

              <button
                onClick={() => setSent(false)}
                className="w-full py-3 text-sm text-slate-500 hover:text-slate-700 transition"
              >
                Use a different email
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
