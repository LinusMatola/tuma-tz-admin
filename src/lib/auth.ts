export const AUTH_KEY = "tuma_access_token";
export const REFRESH_KEY = "tuma_refresh_token";
export const CLIENT_ID_KEY = "tuma_client_id";

export const saveAuth = (data: {
  accessToken: string;
  refreshToken: string;
  clientId: number;
}) => {
  localStorage.setItem(AUTH_KEY, data.accessToken);
  localStorage.setItem(REFRESH_KEY, data.refreshToken);
  localStorage.setItem(CLIENT_ID_KEY, String(data.clientId));
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_KEY);
};

export const getRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_KEY);
};

export const getClientId = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CLIENT_ID_KEY);
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(CLIENT_ID_KEY);
};

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(AUTH_KEY);
};