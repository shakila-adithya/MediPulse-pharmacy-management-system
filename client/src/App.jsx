import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth, roleHome } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Logo from './components/layout/Logo';
import Button from './components/common/Button';
import LoadingSpinner from './components/common/LoadingSpinner';
function Protected({ role, children }) {
  const { user, isInitializing, sessionError } = useAuth();
  if (isInitializing) return <LoadingSpinner fullPage label="Checking session..." />;
  if (sessionError) return <main className="p-8 text-center"><p role="alert">{sessionError}</p><Button className="mt-4" onClick={() => window.location.reload()}>Retry</Button></main>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to={roleHome[user.role]} replace />;
  return children;
}
function Welcome() {
  const { user, logout } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const names = { customer: 'Customer', pharmacy: 'Pharmacy staff', admin: 'Administrator' };
  async function signOut() {
    setBusy(true); setError('');
    try { await logout(); } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <div className="min-h-screen"><header className="bg-white border-b border-slate-200"><div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between gap-4"><Logo /><Button variant="outline" onClick={signOut} isLoading={busy} aria-label={busy ? 'Logging out' : 'Logout'}>Logout</Button></div></header>
    <main className="max-w-5xl mx-auto px-4 py-12">{error && <p role="alert" className="text-danger-600 mb-4">{error}</p>}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-card">
        <p className="text-sm font-semibold text-primary-600 mb-3">{names[user.role]} dashboard</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Welcome, {user.name}</h1>
        <p className="text-slate-500 mt-3">You have successfully signed in to MediPulse.</p>
        <dl className="mt-8 grid gap-5 sm:grid-cols-2"><div><dt className="text-sm text-slate-500">Email</dt><dd className="mt-1 break-all">{user.email}</dd></div><div><dt className="text-sm text-slate-500">Account role</dt><dd className="mt-1">{names[user.role]}</dd></div></dl>
      </section>
    </main></div>;
}
export default function App() {
  return <BrowserRouter><AuthProvider><Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/login" element={<LoginPage />} />
    {Object.entries(roleHome).map(([role, path]) => <Route key={role} path={path} element={<Protected role={role}><Welcome /></Protected>} />)}
    <Route path="*" element={<main className="p-12 text-center"><h1 className="text-xl font-bold">Page not found</h1><Link className="text-primary-600" to="/">Return to MediPulse</Link></main>} />
  </Routes></AuthProvider></BrowserRouter>;
}
