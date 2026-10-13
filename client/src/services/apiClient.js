/**
 * Central API client.
 *
 * Shared client for the backend API. Medicine and pharmacy discovery remain
 * local mock services until their API phase; authentication uses this client.
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

  const requestOptions = {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method !== "GET" && body) {
    requestOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url.toString(), requestOptions);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    const requestError = new Error(error.message || "Request failed");
    requestError.status = response.status;
    requestError.fields = error.fields || {};
    throw requestError;
  }

  if (response.status === 204) return null;
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
