export type UserRole = "operator" | "compliance" | "finance" | "support" | "superadmin";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  organization: string;
  createdAt: string;
  mfaEnabled: boolean;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
}
