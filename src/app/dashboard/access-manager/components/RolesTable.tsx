import { Role } from "../page";

interface Props {
  roles: Role[];
  selectedRole: Role | null;
  onSelect: (role: Role) => void;
  onRefresh: () => void;
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function RolesTable({
  roles,
  selectedRole,
  onSelect,
  onRefresh,
}: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <p className="text-sm font-bold text-slate-700">{roles.length} roles</p>
        <button
          onClick={onRefresh}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          Refresh
        </button>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            {["Role", "Description", "Permissions", "Created", "Updated"].map(
              (h) => (
                <th
                  key={h}
                  className="px-5 py-3.5 text-left text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase"
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr
              key={role.id}
              onClick={() => onSelect(role)}
              className={`border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${
                selectedRole?.id === role.id
                  ? "bg-blue-50 border-l-[3px] border-l-blue-700"
                  : ""
              }`}
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-0.5 h-8 rounded-full shrink-0 ${role.permissions?.length > 0 ? "bg-blue-600" : "bg-slate-200"}`}
                  />
                  <div>
                    <p className="font-bold text-slate-800 text-[13px]">
                      {role.roleName}
                    </p>
                    <p className="text-[10px] text-slate-400">ID: #{role.id}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4">
                <p className="text-slate-500 text-sm">
                  {role.description ?? "—"}
                </p>
              </td>
              <td className="px-5 py-4">
                <span
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                    role.permissions?.length > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {role.permissions?.length ?? 0}
                </span>
              </td>
              <td className="px-5 py-4 text-slate-400 text-[12px] whitespace-nowrap">
                {formatDate(role.createdAt)}
              </td>
              <td className="px-5 py-4 text-slate-400 text-[12px] whitespace-nowrap">
                {formatDate(role.updatedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
