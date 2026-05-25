"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => router.push("/verify-otp"), 2000);
  };

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
                Secure System Entry
              </span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">
            Log In
          </h2>
          <p className="text-slate-500 text-sm mb-8">
            Enter your work email to continue.
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
                placeholder="example@tuma.com"
                className="w-full px-4 py-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              />
            </div>
            {submitted && (
              <div className="flex gap-3 bg-green-50 border border-green-100 rounded-lg px-4 py-3">
                <p className="text-xs text-green-700 leading-relaxed">
                  An OTP has been sent to{" "}
                  <span className="font-semibold">{email}</span>. Redirecting…
                </p>
              </div>
            )}
            <button
              onClick={handleSubmit}
              disabled={submitted}
              className="w-full py-3.5 rounded-xl text-white text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #1a3de4, #1230b8)",
              }}
            >
              Continue
            </button>
            <p className="md:mb-8 mb-5 text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-600 underline">
                Request for Access
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
