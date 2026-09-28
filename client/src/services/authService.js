export async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`/api/auth${path}`, {
      credentials: 'include', ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
  } catch {
    throw new Error('Cannot reach the server. Check that the backend is running.');
  }
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(data?.message || 'The server is unavailable. Please try again.');
    error.status = response.status;
    throw error;
  }
  if (!data) throw new Error('Invalid server response. Check the backend connection.');
  return data;
}
export const authService = {
  login: (credentials) => request('/login', { method: 'POST', body: JSON.stringify(credentials) }),
  me: () => request('/me'),
  logout: () => request('/logout', { method: 'POST', body: '{}' }),
};
