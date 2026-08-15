export const API_BASE = "/api-proxy";

const handleUnauthorized = () => {
  localStorage.removeItem("tuma_access_token");
  localStorage.removeItem("tuma_refresh_token");
  localStorage.removeItem("tuma_client_id");
  window.location.href = "/login";
};

// ── Refresh Token ────────────────────────────────────────
export const refreshToken = async (): Promise<boolean> => {
  const storedRefresh = localStorage.getItem("tuma_refresh_token");
  if (!storedRefresh) return false;
  try {
    const res = await fetch(`${API_BASE}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
      },
      body: JSON.stringify({ refreshToken: storedRefresh }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    if (data.status === "SUCCESS") {
      localStorage.setItem("tuma_access_token", data.accessToken);
      localStorage.setItem("tuma_refresh_token", data.refreshToken);
      localStorage.setItem("tuma_client_id", String(data.userId));
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

// ── Logout ───────────────────────────────────────────────
export const logout = async (): Promise<void> => {
  const clientId = localStorage.getItem("tuma_client_id");
  try {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        Authorization: `Bearer ${localStorage.getItem("tuma_access_token") ?? ""}`,
      },
      body: JSON.stringify({ userId: Number(clientId) }),
    });
  } catch {
    // fail silently — always clear local state regardless
  } finally {
    localStorage.removeItem("tuma_access_token");
    localStorage.removeItem("tuma_refresh_token");
    localStorage.removeItem("tuma_client_id");
    window.location.href = "/login";
  }
};

// ── Core fetch helpers ───────────────────────────────────
const handleError = async (res: Response) => {
  if (res.status === 401 || res.status === 403) {
    // Try refresh first
    const refreshed = await refreshToken();
    if (!refreshed) {
      handleUnauthorized();
      throw new Error("Session expired. Please log in again.");
    }
  }
  const error = await res.json().catch(() => ({ message: "Request failed" }));
  const message = error.message ?? "Something went wrong";
  if (message.toLowerCase().includes("jwt expired") || message.toLowerCase().includes("expired")) {
    const refreshed = await refreshToken();
    if (!refreshed) {
      handleUnauthorized();
      throw new Error("Session expired. Please log in again.");
    }
  }
  throw new Error(message);
};

export const apiGet = async (endpoint: string, token?: string) => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "GET",
    headers: {
      "accept": "*/*",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) await handleError(res);
  return res.json();
};

export const apiPost = async (endpoint: string, body: object, token?: string) => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "*/*",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) await handleError(res);
  return res.json();
};

export const apiPut = async (endpoint: string, body: object, token?: string) => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "accept": "*/*",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) await handleError(res);
  return res.json();
};

export const apiDelete = async (endpoint: string, token?: string) => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "DELETE",
    headers: {
      "accept": "*/*",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) await handleError(res);
  const text = await res.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return null; }
};