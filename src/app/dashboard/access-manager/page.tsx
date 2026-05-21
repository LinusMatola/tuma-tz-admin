import { ShieldCheck } from "lucide-react";
import Link from "next/link";
export default function AccessManager() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
        <ShieldCheck size={30} className="text-blue-700" strokeWidth={1.6} />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Manager</h2>
      <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
        Operator account management and role assignment will be configured here.
      </p>
      <span className="mt-4 inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full">
        Coming Soon
      </span>
      <Link
        href="/dashboard"
        className="mt-6 inline-flex items-center gap-2 text-sm text-blue-700 hover:underline"
      >
        ← Back to Main Dashboard
      </Link>
    </div>
  );
}
