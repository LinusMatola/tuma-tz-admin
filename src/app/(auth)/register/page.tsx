"use client";
import { useState } from "react";
import Link from "next/link";

const ROLES = [
  { value: "operator", label: "Operator" },
  { value: "compliance", label: "Compliance Officer" },
  { value: "finance", label: "Finance Manager" },
  { value: "support", label: "Support Agent" },
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    workEmail: "",
    phone: "",
    role: "",

    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const set = (k: string, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const EyeIcon = ({ open }: { open: boolean }) =>
    open ? (
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

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 xl:p-10">
          {/* Logo */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-2xl font-black tracking-tight text-slate-900"
                style={{ letterSpacing: "-0.03em" }}
              >
                Tuma
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                Operator Registration
              </span>
            </div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all
                  ${step >= s ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-400"}`}
                >
                  {step > s ? (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    s
                  )}
                </div>
                {s < 2 && (
                  <div
                    className={`h-px w-8 transition-all ${step > s ? "bg-blue-700" : "bg-slate-200"}`}
                  />
                )}
              </div>
            ))}
            <span className="text-xs text-slate-400 ml-1">
              Step {step} of 2
            </span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-1 tracking-tight">
            {step === 1 ? "Create Account" : "Secure your account"}
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            {step === 1
              ? "Register to access the Admin Portal."
              : "Secure your operator account."}
          </p>

          {step === 1 && (
            <div className="space-y-4">
              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold tracking-[0.12em] text-slate-600 uppercase mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold tracking-[0.12em] text-slate-600 uppercase mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => set("lastName", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Work Email */}
              <div>
                <label className="block text-[11px] font-bold tracking-[0.12em] text-slate-600 uppercase mb-1.5">
                  Work Email
                </label>
                <input
                  type="email"
                  value={form.workEmail}
                  onChange={(e) => set("workEmail", e.target.value)}
                  placeholder="operator@tuma.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[11px] font-bold tracking-[0.12em] text-slate-600 uppercase mb-1.5">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-600 font-medium flex-shrink-0">
                    🇰🇪 +254
                  </div>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="700 000 000"
                    className="flex-1 px-4 py-2.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-[11px] font-bold tracking-[0.12em] text-slate-600 uppercase mb-1.5">
                  Operator Role
                </label>
                <select
                  value={form.role}
                  onChange={(e) => set("role", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition appearance-none"
                >
                  <option value="" disabled>
                    Select your role…
                  </option>
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3.5 rounded-xl text-white text-sm font-bold tracking-[0.1em] uppercase flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.99] mt-2"
                style={{
                  background: "linear-gradient(135deg, #1a3de4, #1230b8)",
                }}
              >
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
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {/* MFA notice */}
              <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
                <svg
                  className="flex-shrink-0 mt-0.5 text-blue-600"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <p className="text-xs text-blue-700 leading-relaxed">
                  MFA setup will be required after your account is approved by
                  an administrator.
                </p>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) => set("agreeTerms", e.target.checked)}
                  className="mt-0.5 accent-blue-700"
                />
                <span className="text-xs text-slate-500 leading-relaxed">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-blue-700 font-semibold hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-blue-700 font-semibold hover:underline"
                  >
                    Privacy Policy
                  </a>
                  . I understand this is a secure financial system.
                </span>
              </label>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-3.5 rounded-xl text-slate-600 text-sm font-bold border border-slate-200 hover:bg-slate-50 transition"
                >
                  Back
                </button>
                <button
                  className="flex-1 py-3.5 rounded-xl text-white text-sm font-bold tracking-[0.1em] uppercase flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.99]"
                  style={{
                    background: "linear-gradient(135deg, #1a3de4, #1230b8)",
                  }}
                >
                  Request Access
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
          )}

          <p className="text-center text-sm text-slate-500 pt-4">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-700 font-semibold hover:text-blue-900 transition"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
