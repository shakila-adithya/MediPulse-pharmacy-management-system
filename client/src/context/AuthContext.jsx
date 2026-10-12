import { useCallback, useState } from "react";
import AuthContext from "./authContextValue";
const AUTH_KEY = "medipulse_authenticated";

function hasStoredSession() {
  return window.localStorage.getItem(AUTH_KEY) === "true" || window.sessionStorage.getItem(AUTH_KEY) === "true";
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(hasStoredSession);

  const login = useCallback(({ remember = false } = {}) => {
    const storage = remember ? window.localStorage : window.sessionStorage;
    const otherStorage = remember ? window.sessionStorage : window.localStorage;

    storage.setItem(AUTH_KEY, "true");
    otherStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_KEY);
    window.sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}
