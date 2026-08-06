import { Role } from "../page";

interface Props {
  role: Role;
  onEdit: () => void;
  onDelete: () => void;
  onAddPermission: () => void;
  onRemovePermission: (permissionName: string) => void;
  onClose: () => void;
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

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

export default function RoleDetailPanel({
  role,
  onEdit,
  onDelete,
  onAddPermission,
  onRemovePermission,
  onClose,
}: Props) {
  // Group permissions by category
  const grouped = (role.permissions ?? []).reduce(
    (acc: Record<string, string[]>, p) => {
      const cat = getCategory(p);
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(p);
      return acc;
    },
    {},
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
              ID: #{role.id}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                role.permissions?.length > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {role.permissions?.length ?? 0} permissions
            </span>
          </div>
          <p className="font-black text-slate-900 text-lg leading-tight">
            {role.roleName}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">{role.description}</p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 transition text-lg font-bold shrink-0"
        >
          ×
        </button>
      </div>

      {/* Permissions */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-black tracking-[0.15em] text-slate-400 uppercase">
            Assigned Permissions
          </p>
          <button
            onClick={onAddPermission}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-white hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Permission
          </button>
        </div>

        {role.permissions?.length > 0 ? (
          <div className="space-y-4">
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
                      <div
                        key={perm}
                        className="group flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-lg border border-transparent hover:border-red-200 hover:bg-red-50 transition"
                        style={{ background: "inherit" }}
                      >
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded ${categoryColors[category] ?? "bg-slate-100 text-slate-600"}`}
                        >
                          {perm}
                        </span>
                        <button
                          onClick={() => onRemovePermission(perm)}
                          title={`Remove ${perm}`}
                          className="w-4 h-4 rounded flex items-center justify-center text-slate-300 group-hover:text-red-500 transition font-bold text-sm opacity-0 group-hover:opacity-100"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.5"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <p className="text-slate-500 font-bold text-sm mb-1">
              No Permissions
            </p>
            <p className="text-slate-400 text-xs">
              Click + Add Permission to assign permissions to this role.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
        <p className="text-[11px] text-slate-400">
          Created {formatDate(role.createdAt)} · Updated{" "}
          {formatDate(role.updatedAt)}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={onDelete}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-red-600 border border-red-200 hover:bg-red-50 transition"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
            </svg>
            Delete
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-blue-700 border border-blue-200 hover:bg-blue-50 transition"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit Role
          </button>
        </div>
      </div>
    </div>
  );
}
