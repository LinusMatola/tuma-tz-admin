export const APP_NAME = "Tuma Command Center";
export const APP_VERSION = "2.4";
export const APP_ENV = process.env.NODE_ENV;

export const ROUTES = {
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  transactions: "/transactions",
  merchants: "/merchants",
  settlements: "/settlements",
  compliance: "/compliance",
  users: "/users",
  reports: "/reports",
} as const;
