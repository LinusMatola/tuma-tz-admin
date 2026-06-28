export const API_BASE = "/api-proxy";

const handleUnauthorized = () => {
  localStorage.removeItem("tuma_access_token");
  localStorage.removeItem("tuma_refresh_token");
  localStorage.removeItem("tuma_client_id");
  window.location.href = "/login";
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

  if (res.status === 401 || res.status === 403) {
    handleUnauthorized();
    throw new Error("Session expired. Please log in again.");
  }

if (!res.ok) {
  const error = await res.json().catch(() => ({ message: "Request failed" }));
  // catch JWT expired errors coming back as 500
  const message = error.message ?? "Something went wrong";
  if (message.toLowerCase().includes("jwt expired") || message.toLowerCase().includes("expired")) {
    handleUnauthorized();
    throw new Error("Session expired. Please log in again.");
  }
  throw new Error(message);
}

  return res.json();
};

export const apiGet = async (endpoint: string, token?: string) => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "GET",
    headers: {
      "accept": "*/*",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (res.status === 401 || res.status === 403) {
    handleUnauthorized();
    throw new Error("Session expired. Please log in again.");
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    const message = error.message ?? "Something went wrong";
    if (message.toLowerCase().includes("jwt expired") || message.toLowerCase().includes("expired")) {
      handleUnauthorized();
      throw new Error("Session expired. Please log in again.");
    }
    throw new Error(message);
  }

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

  if (res.status === 401 || res.status === 403) {
    handleUnauthorized();
    throw new Error("Session expired. Please log in again.");
  }

if (!res.ok) {
  const error = await res.json().catch(() => ({ message: "Request failed" }));
  const message = error.message ?? "Something went wrong";
  if (message.toLowerCase().includes("jwt expired") || message.toLowerCase().includes("expired")) {
    handleUnauthorized();
    throw new Error("Session expired. Please log in again.");
  }
  throw new Error(message);
}

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

  if (res.status === 401 || res.status === 403) {
    handleUnauthorized();
    throw new Error("Session expired. Please log in again.");
  }

 if (!res.ok) {
  const error = await res.json().catch(() => ({ message: "Request failed" }));
  const message = error.message ?? "Something went wrong";
  if (message.toLowerCase().includes("jwt expired") || message.toLowerCase().includes("expired")) {
    handleUnauthorized();
    throw new Error("Session expired. Please log in again.");
  }
  throw new Error(message);
}

  return res.json();
};