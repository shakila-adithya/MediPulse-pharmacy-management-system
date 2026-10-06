/**
 * Central API client.
 *
 * TODAY: every service function in src/services/ resolves against local mock
 * data (see src/data/) wrapped in a fake network delay, so the UI behaves
 * like a real async application.
 *
 * LATER: once the Node.js/Express backend is ready, each service file can
 * swap its mock implementation for a real call through this client, e.g.:
 *
 *   import apiClient from "./apiClient";
 *   export const getMedicines = (params) => apiClient.get("/medicines", params);
 *
 * No component code needs to change — components only ever import from
 * src/services/*, never from src/data/*, so the mock/real switch is isolated
 * to this layer.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

// Simulates realistic network latency for mock responses.
export const mockDelay = (data, ms = 450) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

async function request(method, path, { params, body } = {}) {
  const url = new URL(BASE_URL + path, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });
  }

  const token = localStorage.getItem("medipulse_token");

  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  if (method !== "GET" && body) {
    requestOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url.toString(), requestOptions);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || "Request failed");
  }

  return response.json();
}

const apiClient = {
  get: (path, params) => request("GET", path, { params }),
  post: (path, body) => request("POST", path, { body }),
  put: (path, body) => request("PUT", path, { body }),
  patch: (path, body) => request("PATCH", path, { body }),
  delete: (path) => request("DELETE", path),
};

export default apiClient;
