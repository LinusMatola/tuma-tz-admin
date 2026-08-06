"use client";
import { useState, useEffect } from "react";
import { Role } from "../page";

interface Permission {
  id: number;
  permissionName: string;
  description: string;
}

interface Props {
  open: boolean;
  role: Role | null;
  onClose: () => void;
  onSuccess: (permissionId: number) => Promise<void>;
}

const getCategory = (permissionName: string) => {
  const prefix = permissionName.split("_")[0];
  const map: Record<string, string> = {
    ANALYTICS: "Analytics",
    AUDIT: "Audit",
    CLIENT: "Client",
    COMPLIANCE: "Compliance",
    CUSTOMER: "Customer",
    INVENTORY: "Inventory",
    LEDGER: "Ledger",
    MERCHANT: "Merchant",
    ORDER: "Order",
    PAYMENT: "Payment",
    PERMISSION: "Permission",
    PRODUCT: "Product",
    REPORT: "Report",
    ROLE: "Role",
    SUBSCRIPTION: "Subscription",
    SYSTEM: "System",
    TRANSACTION: "Transaction",
    USER: "User",
  };
  return map[prefix] ?? "Other";
};

const categoryColors: Record<string, string> = {
  Analytics: "bg-blue-100 text-blue-700",
  Audit: "bg-purple-100 text-purple-700",
  Client: "bg-green-100 text-green-700",
  Compliance: "bg-amber-100 text-amber-700",
  Customer: "bg-pink-100 text-pink-700",
  Inventory: "bg-orange-100 text-orange-700",
  Ledger: "bg-indigo-100 text-indigo-700",
  Merchant: "bg-teal-100 text-teal-700",
  Order: "bg-cyan-100 text-cyan-700",
  Payment: "bg-emerald-100 text-emerald-700",
  Permission: "bg-red-100 text-red-700",
  Product: "bg-violet-100 text-violet-700",
  Report: "bg-slate-100 text-slate-700",
  Role: "bg-blue-100 text-blue-700",
  Subscription: "bg-fuchsia-100 text-fuchsia-700",
  System: "bg-red-100 text-red-600",
  Transaction: "bg-green-100 text-green-700",
  User: "bg-amber-100 text-amber-700",
  Other: "bg-slate-100 text-slate-600",
};

export default function AddPermissionModal({
  open,
  role,
  onClose,
  onSuccess,
}: Props) {
  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!open) return;
    const fetchPermissions = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api-proxy/permissions", {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("tuma_access_token") ?? ""}`,
          },
        });
        const data = await res.json();
        setAllPermissions(Array.isArray(data) ? data : []);
      } catch {
        setError("Failed to load permissions.");
      } finally {
        setLoading(false);
      }
    };
    fetchPermissions();
    setSearch("");
    setAddedIds(new Set());
    setError("");
  }, [open]);

  if (!open || !role) return null;

  // Filter out permissions already on the role
  const currentPerms = new Set(role.permissions ?? []);
  const available = allPermissions.filter(
    (p) => !currentPerms.has(p.permissionName) && !addedIds.has(p.id),
  );

  const filtered = available.filter(
    (p) =>
      p.permissionName.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase()),
  );

  // Group by category
  const grouped = filtered.reduce((acc: Record<string, Permission[]>, p) => {
    const cat = getCategory(p.permissionName);
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  const handleAdd = async (perm: Permission) => {
    setAdding(perm.id);
    setError("");
    try {
      await onSuccess(perm.id);
      // Mark as added so it disappears from the list immediately
      setAddedIds((prev) => new Set(prev).add(perm.id));
    } catch (err: any) {
      setError(err.message ?? "Failed to add permission.");
    } finally {
      setAdding(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a3de4"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Add Permission
              </h2>
              <p className="text-[11px] text-slate-400">
                Adding to:{" "}
                <span className="font-bold text-blue-700">{role.roleName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition text-xl font-bold leading-none"
          >
            ×
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search permissions..."
              className="bg-transparent text-sm text-slate-600 placeholder-slate-400 focus:outline-none w-full"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg leading-none"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <svg
                className="animate-spin text-blue-700"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              <span className="ml-2 text-sm text-slate-400">
                Loading permissions...
              </span>
            </div>
          ) : error ? (
            <div className="flex gap-2 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          ) : Object.keys(grouped).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-sm">
                {search
                  ? "No permissions match your search."
                  : "All permissions are already assigned to this role."}
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {Object.entries(grouped)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([category, perms]) => (
                  <div key={category}>
                    <p className="text-[10px] font-black tracking-[0.15em] text-slate-400 uppercase mb-2">
                      {category}{" "}
                      <span className="text-slate-300 font-normal">
                        ({perms.length})
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {perms.map((perm) => (
                        <button
                          key={perm.id}
                          onClick={() => handleAdd(perm)}
                          disabled={adding === perm.id}
                          title={perm.description}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border border-transparent hover:border-current transition disabled:opacity-50 ${categoryColors[category] ?? "bg-slate-100 text-slate-600"}`}
                        >
                          {adding === perm.id ? (
                            <svg
                              className="animate-spin"
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                          ) : (
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          )}
                          {perm.permissionName}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
          <p className="text-[11px] text-slate-400">
            {filtered.length} permissions available · Click to add
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-white border border-slate-200 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
