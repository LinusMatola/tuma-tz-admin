"use client";
import { useState } from "react";

const subNav = [
  { id: "logs", label: "Activity Logs", sub: "AUDIT LOGS" },
  { id: "reports", label: "Reports", sub: "ANALYTICS PORTAL" },
  { id: "settlements", label: "Global Settlements", sub: "FEES & PAYOUTS" },
  { id: "regional", label: "Regional Rules", sub: "KES/TZS LOGIC" },
  { id: "infrastructure", label: "Infrastructure", sub: "API & ALERTS" },
  { id: "security", label: "Security & Access", sub: "AUTH & SESSION" },
  { id: "branding", label: "Branding", sub: "WHITE-LABELING" },
];

export default function SystemPage() {
  const [active, setActive] = useState("settlements");
  const [dynamicFee, setDynamicFee] = useState(true);
  const [mfa, setMfa] = useState(true);
  const [timeout, setTimeout_] = useState(15);
  const [cornerRadius, setCornerRadius] = useState("sharp");

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[10px] font-black tracking-[0.2em] text-blue-700 uppercase mb-1">
            Control Center
          </p>
          <h1 className="text-2xl font-black text-slate-900">
            Global System Configuration
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 rounded-xl border border-blue-200 text-blue-700 text-sm font-bold hover:bg-blue-50 transition">
            Discard Changes
          </button>
          <button
            className="px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
          >
            Apply Configuration
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sub nav */}
        <div className="w-48 flex-shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {subNav.map(({ id, label, sub }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`w-full text-left px-4 py-3.5 border-b border-slate-100 last:border-0 transition-all ${
                  active === id
                    ? "bg-blue-50 border-l-4 border-l-blue-700 pl-3"
                    : "hover:bg-slate-50"
                }`}
              >
                <p
                  className={`text-sm font-bold ${active === id ? "text-blue-700" : "text-slate-700"}`}
                >
                  {label}
                </p>
                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-0.5">
                  {sub}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-5">
          {/* ACTIVITY LOGS */}
          {active === "logs" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 bg-blue-700 rounded-full" />
                <p className="font-bold text-slate-900">Activity Logs</p>
              </div>
              <p className="text-sm text-slate-500 mb-5">
                View the immutable audit trail of all operator actions across
                the platform.
              </p>
              <button
                onClick={() =>
                  (window.location.href = "/dashboard/system/logs")
                }
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
                style={{
                  background: "linear-gradient(135deg, #1a3de4, #1230b8)",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Open Activity Logs
              </button>
            </div>
          )}

          {/* REPORTS */}
          {active === "reports" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 bg-purple-500 rounded-full" />
                <p className="font-bold text-slate-900">Reports</p>
              </div>
              <p className="text-sm text-slate-500 mb-5">
                Access the analytics portal for real-time aggregate data and
                historical performance metrics.
              </p>
              <button
                onClick={() =>
                  (window.location.href = "/dashboard/system/reports")
                }
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
                style={{
                  background: "linear-gradient(135deg, #1a3de4, #1230b8)",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                Open Reports
              </button>
            </div>
          )}

          {/* ROLES */}
          {active === "roles" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 bg-amber-500 rounded-full" />
                <p className="font-bold text-slate-900">Roles & Permissions</p>
              </div>
              <p className="text-sm text-slate-500 mb-5">
                Manage identity and access control. Define granular permissions
                per platform module.
              </p>
              <button
                onClick={() =>
                  (window.location.href = "/dashboard/system/roles")
                }
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
                style={{
                  background: "linear-gradient(135deg, #1a3de4, #1230b8)",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Open Roles & Permissions
              </button>
            </div>
          )}
          {/* GLOBAL SETTLEMENTS */}
          {active === "settlements" && (
            <>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-5 bg-blue-700 rounded-full" />
                  <p className="font-bold text-slate-900">
                    Global Settlement Constants
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-5 mb-5">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">
                      Standard Transaction Fee (%)
                    </p>
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                      <input
                        type="number"
                        defaultValue="2.85"
                        className="flex-1 bg-transparent text-slate-800 font-bold text-sm focus:outline-none"
                      />
                      <span className="text-blue-700 font-bold text-sm">%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">
                      Minimum Payout Interval
                    </p>
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                      <span className="text-slate-800 font-bold text-sm">
                        Real-time (T+0)
                      </span>
                      <span className="text-slate-400">▾</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-slate-50 rounded-xl px-5 py-4 border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">
                      Enable Dynamic Fee Scaling
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Adjust fees based on merchant volume tiers automatically.
                    </p>
                  </div>
                  <button
                    onClick={() => setDynamicFee(!dynamicFee)}
                    className={`w-12 h-6 rounded-full transition-all relative ${dynamicFee ? "bg-blue-700" : "bg-slate-300"}`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${dynamicFee ? "left-6" : "left-0.5"}`}
                    />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-5 bg-blue-700 rounded-full" />
                  <p className="font-bold text-slate-900">
                    Regional Configurations
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      country: "Kenya (KES)",
                      zone: "EAST AFRICA HUB",
                      accent: "#1a3de4",
                      items: [
                        { label: "Standard VAT Rate", value: "16.0%" },
                        { label: "M-Pesa Gateway Fee", value: "KES 12.00" },
                        {
                          label: "Auto-FX to USD",
                          value: "ENABLED",
                          badge: true,
                          badgeColor: "bg-purple-100 text-purple-700",
                        },
                      ],
                    },
                    {
                      country: "Tanzania (TZS)",
                      zone: "EXPANSION ZONE",
                      accent: "#d97706",
                      items: [
                        { label: "Standard VAT Rate", value: "18.0%" },
                        { label: "Airtel Money Fee", value: "TZS 150.00" },
                        {
                          label: "Auto-FX to USD",
                          value: "DISABLED",
                          badge: true,
                          badgeColor: "bg-slate-100 text-slate-500",
                        },
                      ],
                    },
                  ].map(({ country, zone, accent, items }) => (
                    <div
                      key={country}
                      className="border border-slate-200 rounded-xl p-4"
                      style={{
                        borderLeftWidth: "3px",
                        borderLeftColor: accent,
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-black text-slate-900">{country}</p>
                          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                            {zone}
                          </p>
                        </div>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={accent}
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      </div>
                      <div className="space-y-2">
                        {items.map(
                          ({ label, value, badge, badgeColor }: any) => (
                            <div
                              key={label}
                              className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0"
                            >
                              <span className="text-xs text-slate-500">
                                {label}
                              </span>
                              {badge ? (
                                <span
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${badgeColor}`}
                                >
                                  {value}
                                </span>
                              ) : (
                                <span className="text-sm font-black text-slate-800">
                                  {value}
                                </span>
                              )}
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* INFRASTRUCTURE */}
          {active === "infrastructure" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 bg-red-500 rounded-full" />
                <p className="font-bold text-slate-900">
                  Infrastructure Thresholds
                </p>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3">
                    API Rate Limits
                  </p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">
                      Requests per minute
                    </span>
                    <span className="font-black text-slate-900">5,000 RPM</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: "80%" }}
                    />
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <p className="text-[10px] font-bold tracking-widests text-slate-500 uppercase mb-3">
                    Server Health Alerting
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white rounded-lg p-3 border border-red-100">
                      <p className="text-[10px] font-bold text-red-600 uppercase tracking-widests mb-1">
                        Critical
                      </p>
                      <p className="text-sm font-black text-slate-800">
                        95% CPU Load
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-amber-100">
                      <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widests mb-1">
                        Warning
                      </p>
                      <p className="text-sm font-black text-slate-800">
                        80% Disk Use
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REGIONAL RULES */}
          {active === "regional" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 bg-purple-500 rounded-full" />
                <p className="font-bold text-slate-900">
                  Regional Rules Configuration
                </p>
              </div>
              <div className="space-y-3">
                {[
                  {
                    region: "Kenya",
                    rule: "M-PESA transaction cap: KES 150,000 per transaction",
                    status: "ACTIVE",
                  },
                  {
                    region: "Tanzania",
                    rule: "Cross-border wire requires dual compliance sign-off",
                    status: "ACTIVE",
                  },
                  {
                    region: "Uganda",
                    rule: "Forex transactions above UGX 5M require manual approval",
                    status: "PENDING",
                  },
                  {
                    region: "Rwanda",
                    rule: "Mobile money gateway requires Telco pre-authorization",
                    status: "DRAFT",
                  },
                ].map(({ region, rule, status }) => (
                  <div
                    key={region}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {region}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{rule}</p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widests ${
                        status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : status === "PENDING"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECURITY */}
          {active === "security" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 bg-green-500 rounded-full" />
                <p className="font-bold text-slate-900">
                  Security & Access Control
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-slate-50 rounded-xl px-5 py-4 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <svg
                        width="18"
                        height="18"
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
                        MFA Enforcement
                      </p>
                      <p className="text-xs text-slate-400">
                        Require multi-factor authentication for all admin
                        accounts.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-amber-600 tracking-widests uppercase">
                      Mandatory
                    </span>
                    <button
                      onClick={() => setMfa(!mfa)}
                      className={`w-12 h-6 rounded-full transition-all relative ${mfa ? "bg-blue-700" : "bg-slate-300"}`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${mfa ? "left-6" : "left-0.5"}`}
                      />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-slate-50 rounded-xl px-5 py-4 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1a3de4"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">
                        Inactivity Session Timeout
                      </p>
                      <p className="text-xs text-slate-400">
                        Automatically sign out users after period of inactivity.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={timeout}
                      onChange={(e) => setTimeout_(Number(e.target.value))}
                      className="w-14 text-center bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <span className="text-sm text-slate-500">Minutes</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BRANDING */}
          {active === "branding" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 bg-purple-500 rounded-full" />
                <p className="font-bold text-slate-900">White-Label Branding</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div>
                    <p className="text-[10px] font-bold tracking-widests text-slate-500 uppercase mb-2">
                      Brand Primary Color
                    </p>
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                      <div
                        className="w-8 h-8 rounded-lg"
                        style={{ background: "#0055cd" }}
                      />
                      <input
                        type="text"
                        defaultValue="#0055cd"
                        className="flex-1 bg-transparent text-slate-700 font-bold text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widests text-slate-500 uppercase mb-2">
                      Interface Corner Radius
                    </p>
                    <div className="flex gap-2">
                      {[
                        { id: "sharp", label: "Sharp (2px)" },
                        { id: "standard", label: "Standard (4px)" },
                        { id: "rounded", label: "Rounded (8px)" },
                      ].map(({ id, label }) => (
                        <button
                          key={id}
                          onClick={() => setCornerRadius(id)}
                          className={`px-3 py-2 text-xs font-bold border transition ${
                            cornerRadius === id
                              ? "border-blue-700 text-blue-700 bg-blue-50"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          } rounded-lg`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widests text-slate-500 uppercase mb-2">
                    Brand Logo Asset
                  </p>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-blue-300 transition cursor-pointer bg-slate-50">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                      className="mb-2"
                    >
                      <polyline points="16 16 12 12 8 16" />
                      <line x1="12" y1="12" x2="12" y2="21" />
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                    </svg>
                    <p className="text-xs font-bold text-slate-500">
                      SVG, PNG (Max 5MB)
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Click to replace current logo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
