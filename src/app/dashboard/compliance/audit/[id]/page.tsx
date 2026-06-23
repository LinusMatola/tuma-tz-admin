"use client";
import { useParams, useRouter } from "next/navigation";

const auditDetails: Record<string, any> = {
  "audit-001": {
    category: "CONFIGURATION CHANGE",
    title: "Merchant Transaction Fee Adjustment",
    desc: "A manual modification was applied to the global fee structure for Tier-1 Merchants to improve competitive positioning in the Nairobi retail sector.",
    date: "DEC 14, 2023",
    time: "14:32:05 EAT",
    status: "SUCCESSFUL",
    authorizedBy: {
      name: "Sarah Omondi",
      role: "Head of Risk & Compliance",
      initials: "SO",
      authTime: "14:31:58 EAT",
      authCode: "DC-992-KLA",
      quote:
        '"This change aligns with the Q4 pricing strategy approved by the executive board."',
    },
    operator: { name: "David Chen", role: "Senior Ops Manager" },
    location: { city: "Nairobi, KE", ip: "197.232.1.254" },
    sessionId: "sess_4a2f89b",
    sessionAuth: "Auth: OAuth2/SSO",
    environment: "Production",
    cluster: "KE-u EST-01",
    before: {
      fee: "2.50%",
      label: "Standard tiered merchant pricing",
      minFee: "KES 50.00",
      maxFee: "KES 2,500.00",
      settlementType: "STANDARD (T+1)",
    },
    after: {
      fee: "2.20%",
      diff: "-0.30%",
      label: "Aggressive growth merchant pricing",
      minFee: "KES 50.00",
      maxFee: "KES 2,000.00",
      settlementType: "STANDARD (T+1)",
      changed: ["maxFee"],
    },
    reason:
      '"Market analysis indicates that regional competitors have lowered their fees to 2.3% for retail merchants. To maintain our volume and prevent churn of high-value accounts in the Nairobi CBD, we are lowering our Tier-1 rate to 2.2% and capping the maximum transaction fee at KES 2,000. This is expected to increase transaction velocity by 12% over the next quarter."',
    artifacts: [
      { name: "pricing_proposal_q4.pdf", size: "2.4 MB • PDF", icon: "📄" },
      { name: "competitive_analysis.xlsx", size: "1.1 MB • XLS", icon: "📊" },
    ],
  },
  "audit-002": {
    category: "SETTLEMENT ACTION",
    title: "Manual Settlement Release",
    desc: "A forced manual settlement release was executed for Merchant Hub-88, bypassing the standard T+1 settlement cycle.",
    date: "NOV 24, 2023",
    time: "14:18:55 EAT",
    status: "SUCCESSFUL",
    authorizedBy: {
      name: "James Kariuki",
      role: "Settlement Lead",
      initials: "JK",
      authTime: "14:18:00 EAT",
      authCode: "ST-441-NBI",
      quote: '"Urgent release approved per merchant escalation protocol."',
    },
    operator: { name: "John Doe", role: "Settlement Analyst" },
    location: { city: "Nairobi, KE", ip: "10.0.0.45" },
    sessionId: "sess_9b3c12d",
    sessionAuth: "Auth: OAuth2/SSO",
    environment: "Production",
    cluster: "KE-u EST-01",
    before: {
      fee: "$4,200.00",
      label: "Held pending standard T+1 cycle",
      minFee: "N/A",
      maxFee: "N/A",
      settlementType: "STANDARD (T+1)",
    },
    after: {
      fee: "$4,200.00",
      diff: "Released",
      label: "Immediate settlement executed",
      minFee: "N/A",
      maxFee: "N/A",
      settlementType: "INSTANT",
      changed: ["settlementType"],
    },
    reason:
      '"Merchant Hub-88 reported a critical cash flow issue affecting payroll disbursement. Per escalation protocol EP-12, an immediate settlement was authorized after verification of merchant identity and transaction legitimacy."',
    artifacts: [
      {
        name: "merchant_escalation_form.pdf",
        size: "1.1 MB • PDF",
        icon: "📄",
      },
    ],
  },
  "audit-003": {
    category: "RULE MODIFICATION",
    title: "Velocity Cap Rule Update",
    desc: "The velocity cap rule for Tier-1 merchants was modified to increase the transaction threshold from 50k to 75k.",
    date: "NOV 24, 2023",
    time: "14:05:12 EAT",
    status: "SUCCESSFUL",
    authorizedBy: {
      name: "System Engine",
      role: "Automated Rule Engine",
      initials: "SE",
      authTime: "14:05:00 EAT",
      authCode: "RUL-ETH-01",
      quote: '"Automated rule update within approved threshold parameters."',
    },
    operator: { name: "System Engine", role: "Automated Process" },
    location: { city: "Localhost", ip: "127.0.0.1" },
    sessionId: "sess_sys001",
    sessionAuth: "Auth: System",
    environment: "Production",
    cluster: "KE-u EST-01",
    before: {
      fee: "50,000",
      label: "Previous velocity cap",
      minFee: "N/A",
      maxFee: "N/A",
      settlementType: "TIER-1",
    },
    after: {
      fee: "75,000",
      diff: "+50%",
      label: "Updated velocity cap",
      minFee: "N/A",
      maxFee: "N/A",
      settlementType: "TIER-1",
      changed: ["fee"],
    },
    reason:
      '"Rule modification approved by Risk Committee in session RC-2023-11. Increased cap supports Tier-1 merchant growth targets for Q4."',
    artifacts: [
      { name: "risk_committee_approval.pdf", size: "0.8 MB • PDF", icon: "📄" },
    ],
  },
  "audit-004": {
    category: "SECURITY EVENT",
    title: "Failed Login Attempt — High Risk Region",
    desc: "5 consecutive failed login attempts were detected from IP 102.22.1.9, flagged as a high-risk region. Account USR-662 was temporarily locked.",
    date: "NOV 24, 2023",
    time: "13:44:22 EAT",
    status: "FLAGGED",
    authorizedBy: {
      name: "Security Engine",
      role: "Automated Security Protocol",
      initials: "SE",
      authTime: "13:44:22 EAT",
      authCode: "SEC-662-KE",
      quote: '"Automatic lockout triggered per Protocol 7A security policy."',
    },
    operator: { name: "UNKNOWN", role: "Unidentified Entity" },
    location: { city: "Unknown Region", ip: "102.22.1.9" },
    sessionId: "sess_BLOCKED",
    sessionAuth: "Auth: FAILED",
    environment: "Production",
    cluster: "KE-u EST-01",
    before: {
      fee: "ACTIVE",
      label: "Account in normal state",
      minFee: "N/A",
      maxFee: "N/A",
      settlementType: "N/A",
    },
    after: {
      fee: "LOCKED",
      diff: "Blocked",
      label: "Account temporarily locked",
      minFee: "N/A",
      maxFee: "N/A",
      settlementType: "N/A",
      changed: ["fee"],
    },
    reason:
      '"5 consecutive failed login attempts from high-risk IP range 102.22.x.x. Automatic lockout applied per Protocol 7A. Security team notified for manual review."',
    artifacts: [
      {
        name: "security_incident_report.pdf",
        size: "0.5 MB • PDF",
        icon: "📄",
      },
    ],
  },
};

export default function AuditDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const d = auditDetails[id] ?? auditDetails["audit-001"];

  const statusStyles: Record<string, string> = {
    SUCCESSFUL: "bg-green-100 text-green-700",
    FLAGGED: "bg-red-100 text-red-600",
    PENDING: "bg-amber-100 text-amber-700",
  };

  return (
    <div>
      {/* Back */}
      <div className="mb-5 flex items-center gap-3">
        <button
          onClick={() => router.push("/dashboard/compliance/audit")}
          className="inline-flex items-center gap-2 text-blue-700 font-bold text-sm hover:underline"
        >
          ← Event Detailed Audit
        </button>
      </div>

      {/* Header card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-5">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <p className="text-[10px] font-black tracking-[0.2em] text-blue-700 uppercase mb-1">
              {d.category}
            </p>
            <h1 className="text-2xl font-black text-slate-900 mb-2">
              {d.title}
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              {d.desc}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1.5">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="text-xs font-bold text-slate-600">
                  {d.date}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1.5">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-xs font-bold text-slate-600">
                  {d.time}
                </span>
              </div>
              <span
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-widest flex items-center gap-1 ${statusStyles[d.status]}`}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {d.status}
              </span>
            </div>
          </div>

          {/* Authorized by */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-[10px] font-black tracking-[0.2em] text-purple-600 uppercase mb-3">
              Authorized By
            </p>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-black text-sm flex-shrink-0">
                {d.authorizedBy.initials}
              </div>
              <div>
                <p className="font-black text-slate-900 text-sm">
                  {d.authorizedBy.name}
                </p>
                <p className="text-[11px] text-slate-400">
                  {d.authorizedBy.role}
                </p>
              </div>
            </div>
            <div className="space-y-1.5 mb-3">
              {[
                { label: "Auth Time:", value: d.authorizedBy.authTime },
                { label: "Auth Code:", value: d.authorizedBy.authCode },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400">
                    {label}
                  </span>
                  <span className="text-[11px] font-bold text-slate-700">
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 italic leading-relaxed">
              {d.authorizedBy.quote}
            </p>
          </div>
        </div>
      </div>

      {/* Operator context */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          {
            label: "Operator",
            icon: "👤",
            title: d.operator.name,
            sub: d.operator.role,
            color: "bg-blue-50",
          },
          {
            label: "Location",
            icon: "📍",
            title: d.location.city,
            sub: `IP: ${d.location.ip}`,
            color: "bg-slate-50",
          },
          {
            label: "Session ID",
            icon: "🔒",
            title: d.sessionId,
            sub: d.sessionAuth,
            color: "bg-slate-50",
          },
          {
            label: "Environment",
            icon: "⚙️",
            title: d.environment,
            sub: `Cluster: ${d.cluster}`,
            color: "bg-slate-50",
          },
        ].map(({ label, icon, title, sub, color }) => (
          <div
            key={label}
            className={`${color} rounded-xl border border-slate-100 p-4`}
          >
            <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-2">
              {label}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-lg">{icon}</span>
              <div>
                <p className="font-bold text-slate-800 text-sm">{title}</p>
                <p className="text-[11px] text-slate-400">{sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Configuration Delta */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-5">
        <div className="flex items-center justify-between mb-5">
          <p className="font-bold text-slate-900">Configuration Delta</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition">
              JSON DIFF
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-bold hover:bg-slate-700 transition">
              VISUAL MODE
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {/* Before */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-red-50">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              <p className="text-[10px] font-black tracking-widests text-red-600 uppercase">
                Before Change
              </p>
            </div>
            <div className="p-5">
              <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                Transaction Fee
              </p>
              <p className="text-4xl font-black text-slate-900 mb-1">
                {d.before.fee}
              </p>
              <p className="text-xs text-slate-400 italic mb-4">
                {d.before.label}
              </p>
              <div className="space-y-2 pt-3 border-t border-slate-100">
                {[
                  { label: "Min Fee", value: d.before.minFee },
                  { label: "Max Fee", value: d.before.maxFee },
                  { label: "Settlement Type", value: d.before.settlementType },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0"
                  >
                    <span className="text-sm text-slate-500">{label}</span>
                    <span className="text-sm font-bold text-slate-800">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* After */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-green-50">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16a34a"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <p className="text-[10px] font-black tracking-widests text-green-600 uppercase">
                After Change
              </p>
            </div>
            <div className="p-5 bg-green-50/30">
              <p className="text-[10px] font-bold tracking-widests text-slate-400 uppercase mb-1">
                Transaction Fee
              </p>
              <div className="flex items-baseline gap-2 mb-1">
                <p className="text-4xl font-black text-green-700">
                  {d.after.fee}
                </p>
                <span className="text-sm font-bold text-green-600">
                  {d.after.diff}
                </span>
              </div>
              <p className="text-xs text-green-600 italic mb-4">
                {d.after.label}
              </p>
              <div className="space-y-2 pt-3 border-t border-green-100">
                {[
                  {
                    label: "Min Fee",
                    value: d.after.minFee,
                    changed: d.after.changed?.includes("minFee"),
                  },
                  {
                    label: "Max Fee",
                    value: d.after.maxFee,
                    changed: d.after.changed?.includes("maxFee"),
                  },
                  {
                    label: "Settlement Type",
                    value: d.after.settlementType,
                    changed: d.after.changed?.includes("settlementType"),
                  },
                ].map(({ label, value, changed }) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between py-1.5 border-b border-green-50 last:border-0 ${changed ? "bg-blue-50 rounded-lg px-2" : ""}`}
                  >
                    <span className="text-sm text-slate-500">{label}</span>
                    <span
                      className={`text-sm font-bold ${changed ? "text-blue-700" : "text-slate-800"}`}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reason + Artifacts */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase mb-3">
            Reason for Change
          </p>
          <div className="border-l-4 border-blue-700 pl-4">
            <p className="text-sm text-slate-600 leading-relaxed">{d.reason}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase mb-3">
            Related Artifacts
          </p>
          <div className="space-y-3">
            {d.artifacts.map(({ name, size, icon }: any) => (
              <div
                key={name}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-blue-50 hover:border-blue-100 transition cursor-pointer"
              >
                <span className="text-xl">{icon}</span>
                <div>
                  <p className="text-sm font-bold text-slate-800">{name}</p>
                  <p className="text-[11px] text-slate-400">{size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
