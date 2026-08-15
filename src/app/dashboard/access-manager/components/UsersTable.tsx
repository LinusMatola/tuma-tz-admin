"use client";
import { useState } from "react";

interface Role {
  id: number;
  roleName: string;
  description: string;
}

interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  status: string;
  roleId: number | null;
  twoFactorEnabled: boolean;
  emailVerified: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

interface Props {
  users: User[];
  roles: Role[];
  loading: boolean;
  onAssignRole: (user: User) => void;
  onRefresh: () => void;
}

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "Never";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function UsersTable({
  users,
  roles,
  loading,
  onAssignRole,
  onRefresh,
}: Props) {
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.phone?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 flex-1 max-w-sm">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              className="shrink-0"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email or phone..."
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
          <p className="text-sm font-bold text-slate-500 shrink-0">
            {filtered.length} user{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
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

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <svg
            className="animate-spin text-blue-700"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          <span className="ml-3 text-sm text-slate-500">Loading users...</span>
        </div>
      )}

      {/* Table */}
      {!loading && (
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {[
                "User",
                "Contact",
                "Status",
                "Role",
                "2FA",
                "Email Verified",
                "Last Login",
                "Action",
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
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-12 text-slate-400 text-sm"
                >
                  {search ? "No users match your search." : "No users found."}
                </td>
              </tr>
            ) : (
              filtered.map((user) => {
                const assignedRole = roles.find(
                  (r: Role) => r.id === user.roleId,
                );
                return (
                  <tr
                    key={user.id}
                    className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0">
                          {user.fullName?.charAt(0)?.toUpperCase() ?? "?"}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-[13px]">
                            {user.fullName}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            ID: #{user.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-slate-600 text-[12px]">{user.email}</p>
                      <p className="text-slate-400 text-[11px]">{user.phone}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                          user.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {assignedRole ? (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-100 text-blue-700">
                          {assignedRole.roleName}
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-100 text-slate-400">
                          No Role
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                          user.twoFactorEnabled
                            ? "bg-purple-100 text-purple-700"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {user.twoFactorEnabled ? "Enabled" : "Disabled"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                          user.emailVerified
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {user.emailVerified ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-400 text-[12px]">
                      {formatDate(user.lastLoginAt)}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => onAssignRole(user)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-blue-700 border border-blue-200 hover:bg-blue-50 transition"
                      >
                        <svg
                          width="11"
                          height="11"
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
                        Assign Role
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
