import { useCallback, useEffect, useMemo, useState } from "react";
import AuthContext from "./authContextValue";
import apiClient from "../services/apiClient";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    apiClient.get("/auth/me")
      .then(({ user: currentUser }) => { if (active) setUser(currentUser); })
      .catch(() => { if (active) setUser(null); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, []);

  const login = useCallback(async ({ email, password, remember = false }) => {
    const response = await apiClient.post("/auth/login", { email, password, remember });
    setUser(response.user);
    return response.user;
  }, []);

  const logout = useCallback(async () => {
    await apiClient.post("/auth/logout");
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, isAuthenticated: Boolean(user), isLoading, login, logout }), [user, isLoading, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
