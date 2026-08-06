"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";
import { getToken } from "@/lib/auth";
import RolesTable from "./components/RolesTable";
import RoleDetailPanel from "./components/RoleDetailPanel";
import CreateRoleModal from "./components/CreateRoleModal";
import EditRoleModal from "./components/EditRoleModal";
import DeleteRoleModal from "./components/DeleteRoleModal";
import AddPermissionModal from "@/app/dashboard/access-manager/components/AddPermissionsModal";
import AssignRoleModal from "./components/AssignRoleModal";

export interface Role {
  id: number;
  roleName: string;
  description: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export default function AccessManagerPage() {
  const router = useRouter();
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddPermModal, setShowAddPermModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // ── Fetch all roles ──────────────────────────────
  const fetchRoles = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiGet("/roles", getToken() ?? undefined);
      setRoles(Array.isArray(data) ? data : (data.content ?? []));
    } catch (err: any) {
      setError(err.message ?? "Failed to load roles.");
    } finally {
      setLoading(false);
    }
  };

  // ── Fetch single role ────────────────────────────
  const fetchRoleById = async (id: number): Promise<Role | null> => {
    try {
      const data = await apiGet(`/roles/${id}`, getToken() ?? undefined);
      return data;
    } catch {
      return null;
    }
  };

  // ── Refresh selected role ────────────────────────
  const refreshSelectedRole = async () => {
    if (!selectedRole) return;
    const fresh = await fetchRoleById(selectedRole.id);
    if (fresh) {
      setSelectedRole(fresh);
      setRoles((prev) => prev.map((r) => (r.id === fresh.id ? fresh : r)));
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // ── Select a role ────────────────────────────────
  const handleSelectRole = async (role: Role) => {
    if (selectedRole?.id === role.id) {
      setSelectedRole(null);
      return;
    }
    const fresh = await fetchRoleById(role.id);
    setSelectedRole(fresh ?? role);
    setTimeout(() => {
      rightPanelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  // ── Create role ──────────────────────────────────
  const handleCreateRole = async (form: {
    roleName: string;
    description: string;
  }) => {
    await apiPost(
      "/roles",
      { roleName: form.roleName, description: form.description },
      getToken() ?? undefined,
    );
    fetchRoles();
  };

  // ── Edit role ────────────────────────────────────
  const handleEditRole = async (form: {
    roleName: string;
    description: string;
  }) => {
    if (!selectedRole) return;
    const updated = await apiPut(
      `/roles/${selectedRole.id}`,
      { roleName: form.roleName, description: form.description },
      getToken() ?? undefined,
    );
    setSelectedRole(updated);
    setRoles((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  // ── Delete role ──────────────────────────────────
  const handleDeleteRole = async () => {
    if (!selectedRole) return;
    await apiDelete(`/roles/${selectedRole.id}`, getToken() ?? undefined);
    setSelectedRole(null);
    fetchRoles();
  };

  // ── Add permission ───────────────────────────────
  const handleAddPermission = async (permissionId: number) => {
    if (!selectedRole) return;
    await apiPost(
      `/roles/${selectedRole.id}/permissions/${permissionId}`,
      {},
      getToken() ?? undefined,
    );
    // Refresh the selected role to get updated permissions
    await refreshSelectedRole();
  };

  // ── Remove permission ────────────────────────────
  const handleRemovePermission = async (permissionName: string) => {
    if (!selectedRole) return;
    try {
      const permsData = await apiGet("/permissions", getToken() ?? undefined);
      const perms = Array.isArray(permsData) ? permsData : [];
      const found = perms.find((p: any) => p.permissionName === permissionName);
      if (!found) return;
      await apiDelete(
        `/roles/${selectedRole.id}/permissions/${found.id}`,
        getToken() ?? undefined,
      );
      // Manually update local state instead of relying on GET response
      const updatedPermissions = (selectedRole.permissions ?? []).filter(
        (p) => p !== permissionName,
      );
      const updated = { ...selectedRole, permissions: updatedPermissions };
      setSelectedRole(updated);
      setRoles((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    } catch (err: any) {
      console.error("Failed to remove permission:", err.message);
    }
  };

  const handleAssignRole = async (userId: number, roleId: number) => {
    await apiPut(
      "/users/role/assign",
      { userId, roleId },
      getToken() ?? undefined,
    );
  };

  return (
    <div className="px-6 py-6 max-w-screen-xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => router.push("/dashboard")}
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-700 transition mb-6"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Main Dashboard
      </button>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[10px] font-black tracking-[0.2em] text-blue-700 uppercase mb-1">
            Administrative Control
          </p>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Access Manager
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage roles, permissions and user access across the platform.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAssignModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Assign Role
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg, #1a3de4, #1230b8)" }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create New Role
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          {
            label: "Total Roles",
            value: loading ? "—" : roles.length.toString(),
            border: "border-l-blue-700",
            valueColor: "text-blue-700",
            icon: (
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
            ),
          },
          {
            label: "With Permissions",
            value: loading
              ? "—"
              : roles
                  .filter((r) => r.permissions?.length > 0)
                  .length.toString(),
            border: "border-l-green-500",
            valueColor: "text-green-600",
            icon: (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16a34a"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ),
          },
          {
            label: "Empty Roles",
            value: loading
              ? "—"
              : roles.filter((r) => !r.permissions?.length).length.toString(),
            border: "border-l-amber-500",
            valueColor: "text-amber-600",
            icon: (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#d97706"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            ),
          },
        ].map(({ label, value, border, valueColor, icon }) => (
          <div
            key={label}
            className={`bg-white rounded-xl border border-slate-200 border-l-4 ${border} px-6 py-5`}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase">
                {label}
              </p>
              <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                {icon}
              </div>
            </div>
            {loading ? (
              <div className="h-9 w-16 bg-slate-100 rounded-lg animate-pulse" />
            ) : (
              <span className={`text-4xl font-black ${valueColor}`}>
                {value}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20 bg-white rounded-xl border border-slate-200">
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
          <span className="ml-3 text-sm text-slate-500 font-medium">
            Loading roles...
          </span>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="flex gap-3 bg-red-50 border border-red-100 rounded-xl px-5 py-4 mb-4">
          <svg
            className="shrink-0 mt-0.5 text-red-500"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>
            <p className="text-sm font-bold text-red-600">
              Failed to load roles
            </p>
            <p className="text-xs text-red-500 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Main content */}
      {!loading && !error && (
        <div className={`flex gap-5 ${selectedRole ? "items-start" : ""}`}>
          <div
            className={`${selectedRole ? "w-[55%] shrink-0" : "flex-1"} transition-all duration-300`}
          >
            <RolesTable
              roles={roles}
              selectedRole={selectedRole}
              onSelect={handleSelectRole}
              onRefresh={fetchRoles}
            />
          </div>

          {selectedRole && (
            <div ref={rightPanelRef} className="flex-1">
              <RoleDetailPanel
                key={`${selectedRole.id}-${selectedRole.permissions?.join(",")}`}
                role={selectedRole}
                onEdit={() => setShowEditModal(true)}
                onDelete={() => setShowDeleteModal(true)}
                onAddPermission={() => setShowAddPermModal(true)}
                onRemovePermission={handleRemovePermission}
                onClose={() => setSelectedRole(null)}
              />
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <CreateRoleModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateRole}
      />
      <EditRoleModal
        open={showEditModal}
        role={selectedRole}
        onClose={() => setShowEditModal(false)}
        onSuccess={handleEditRole}
      />
      <DeleteRoleModal
        open={showDeleteModal}
        role={selectedRole}
        onClose={() => setShowDeleteModal(false)}
        onSuccess={handleDeleteRole}
      />
      <AddPermissionModal
        open={showAddPermModal}
        role={selectedRole}
        onClose={() => setShowAddPermModal(false)}
        onSuccess={handleAddPermission}
      />
      <AssignRoleModal
        open={showAssignModal}
        roles={roles}
        onClose={() => setShowAssignModal(false)}
        onSuccess={handleAssignRole}
      />
    </div>
  );
}
