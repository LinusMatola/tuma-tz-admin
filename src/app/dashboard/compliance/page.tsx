"use client";
import { useRouter } from "next/navigation";

const operators = [
  {
    initials: "KN",
    name: "Kassandra Njeri",
    email: "knjeri@tuma.command",
    role: "Super Admin",
    roleColor: "bg-slate-100 text-slate-700",
    status: "ACTIVE",
    lastActive: "2 mins ago",
    img: null,
  },
  {
    initials: "OM",
    name: "Omari Mwangi",
    email: "omwangi@tuma.command",
    role: "Compliance Officer",
    roleColor: "bg-slate-100 text-slate-600",
    status: "ACTIVE",
    lastActive: "1 hour ago",
    img: null,
  },
  {
    initials: "LA",
    name: "Laila Abdi",
    email: "labdi@tuma.command",
    role: "Audit Manager",
    roleColor: "bg-purple-100 text-purple-700",
    status: "INACTIVE",
    lastActive: "3 days ago",
    img: null,
  },
  {
    initials: "ZT",
    name: "Zion Tesfaye",
    email: "ztesfaye@tuma.command",
    role: "Risk Analyst",
    roleColor: "bg-amber-100 text-amber-700",
    status: "ACTIVE",
    lastActive: "12 mins ago",
    img: null,
  },
];

const kpis = [
  {
    label: "Total Operators",
    value: "124",
    border: "border-l-blue-700",
    valueColor: "text-slate-900",
  },
  {
    label: "Active Now",
    value: "42",
    border: "border-l-green-500",
    valueColor: "text-green-600",
  },
  {
    label: "Admin Roles",
    value: "08",
    border: "border-l-purple-500",
    valueColor: "text-slate-900",
  },
  {
    label: "Pending Invites",
    value: "15",
    border: "border-l-amber-500",
    valueColor: "text-slate-900",
  },
];

export default function CompliancePage() {
  const router = useRouter();

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[10px] font-black tracking-[0.2em] text-blue-700 uppercase mb-1">
            System Governance
          </p>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Team Management
          </h1>
        </div>
        <button
          onClick={() => router.push("/dashboard/system/users/invite")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
        >
          <svg
            width="16"
            height="16"
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
          Invite New User
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map(({ label, value, border, valueColor }) => (
          <div
            key={label}
            className={`bg-white rounded-xl border border-slate-200 border-l-4 ${border} px-5 py-4`}
          >
            <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-2">
              {label}
            </p>
            <p className={`text-3xl font-black ${valueColor}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Table */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {[
                  "Name & Profile",
                  "Security Role",
                  "Status",
                  "Last Active",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {operators.map(
                ({
                  initials,
                  name,
                  email,
                  role,
                  roleColor,
                  status,
                  lastActive,
                }) => (
                  <tr
                    key={email}
                    className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xs font-black text-slate-600 flex-shrink-0">
                          {initials}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-[13px]">
                            {name}
                          </p>
                          <p className="text-[11px] text-slate-400">{email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide ${roleColor}`}
                      >
                        {role}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${status === "ACTIVE" ? "bg-green-500" : "bg-slate-300"}`}
                        />
                        <span
                          className={`text-[11px] font-bold tracking-widest ${status === "ACTIVE" ? "text-green-600" : "text-slate-400"}`}
                        >
                          {status}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-sm">
                      {lastActive}
                    </td>
                    <td className="px-5 py-4">
                      <button className="text-[11px] font-bold text-blue-700 hover:underline tracking-widest uppercase">
                        Manage
                      </button>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              Displaying 1 - 25 of 124 Platform Operators
            </p>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition text-xs">
                ‹ Previous
              </button>
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition ${n === 1 ? "text-white" : "text-slate-600 hover:bg-slate-50 border border-slate-200"}`}
                  style={
                    n === 1
                      ? {
                          background:
                            "linear-gradient(135deg, #1a3de4, #1230b8)",
                        }
                      : {}
                  }
                >
                  0{n}
                </button>
              ))}
              <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition text-xs">
                Next ›
              </button>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Quick nav */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-3">
              Compliance Modules
            </p>
            <div className="space-y-2">
              {[
                {
                  label: "System Audit Trail",
                  href: "/dashboard/compliance/audit",
                  icon: "📋",
                },
                {
                  label: "Support Queue",
                  href: "/dashboard/compliance/support",
                  icon: "🎫",
                },
              ].map(({ label, href, icon }) => (
                <button
                  key={label}
                  onClick={() => router.push(href)}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 rounded-xl text-sm font-bold text-slate-700 transition-all text-left"
                >
                  <span>{icon}</span> {label}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="ml-auto"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Security pulse */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-3">
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
              <p className="text-[10px] font-black tracking-[0.2em] text-slate-700 uppercase">
                Security Pulse
              </p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              All operator actions are currently being logged under Protocol 7A.
              No unauthorized escalations detected in the last 24h.
            </p>
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  Integrity Check
                </p>
                <p className="text-[10px] font-bold text-blue-700">98.2%</p>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full">
                <div
                  className="h-1.5 bg-blue-700 rounded-full"
                  style={{ width: "98.2%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
