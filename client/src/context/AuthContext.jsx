import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';
const AuthContext = createContext(null);
export const roleHome = { customer: '/customer/dashboard', pharmacy: '/pharmacy/dashboard', admin: '/admin/dashboard' };
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitializing, setInitializing] = useState(true);
  const [sessionError, setSessionError] = useState('');
  useEffect(() => {
    let active = true;
    const check = async () => {
      try {
        const data = await authService.me();
        if (active) { setUser(data.user); setSessionError(''); }
      } catch (error) {
        if (active) {
          if (error.status === 401) { setUser(null); setSessionError(''); }
          else setSessionError(error.message);
        }
      } finally { if (active) setInitializing(false); }
    };
    check();
    // Revalidate on focus and periodically so expired/revoked sessions leave protected pages.
    window.addEventListener('focus', check);
    const timer = setInterval(check, 60000);
    return () => { active = false; clearInterval(timer); window.removeEventListener('focus', check); };
  }, []);
  async function login(credentials) {
    const data = await authService.login(credentials);
    setUser(data.user); setSessionError('');
    return data.user;
  }
  async function logout() {
    await authService.logout();
    setUser(null); setSessionError('');
  }
  return <AuthContext.Provider value={{ user, isInitializing, sessionError, login, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
