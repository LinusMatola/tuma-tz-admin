export const API_BASE = "/api-proxy";

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

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message ?? "Something went wrong");
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

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message ?? "Something went wrong");
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

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message ?? "Something went wrong");
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

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message ?? "Something went wrong");
  }

  return res.json();
};