import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import Logo from '../components/layout/Logo';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth, roleHome } from '../context/AuthContext';
export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { user, login, isInitializing, sessionError } = useAuth();
  const navigate = useNavigate();
  if (isInitializing) return <LoadingSpinner fullPage label="Checking session..." />;
  if (user) return <Navigate to={roleHome[user.role]} replace />;
  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    const next = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email address.';
    if (!form.password) next.password = 'Password is required.';
    setErrors(next); setError('');
    if (Object.keys(next).length) return;
    setBusy(true);
    try {
      const signedIn = await login({ ...form, email: form.email.trim() });
      navigate(roleHome[signedIn.role], { replace: true });
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
    <div className="w-full max-w-md">
      <div className="flex justify-center mb-8"><Logo /></div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-7 sm:p-8">
        <h1 className="text-xl font-bold text-slate-900 text-center">Welcome back</h1>
        <p className="text-sm text-slate-500 text-center mt-1.5 mb-6">Sign in to your MediPulse account</p>
        {(error || sessionError) && <div role="alert" className="mb-5 text-sm text-danger-700 bg-danger-50 border border-danger-100 rounded-lg p-3">{error || sessionError}</div>}
        <form onSubmit={submit} noValidate className="space-y-4">
          <Input label="Email Address" type="email" icon={Mail} autoComplete="username" maxLength={254} placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} error={errors.email} required disabled={busy} />
          <Input label="Password" type={show ? 'text' : 'password'} icon={Lock} autoComplete="current-password" maxLength={128} placeholder="Enter your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} error={errors.password} required disabled={busy} />
          <div className="flex flex-wrap justify-between gap-3 text-sm text-slate-600">
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.remember} onChange={e => setForm({ ...form, remember: e.target.checked })} disabled={busy} />Remember me</label>
            <button type="button" onClick={() => setShow(!show)} aria-pressed={show} className="text-primary-600 font-medium">{show ? 'Hide password' : 'Show password'}</button>
          </div>
          <Button type="submit" fullWidth size="lg" icon={LogIn} isLoading={busy} aria-label={busy ? 'Signing in' : 'Login'}>Login</Button>
          <span role="status" className="sr-only">{busy ? 'Signing in, please wait.' : ''}</span>
        </form>
        <p className="text-center text-xs text-slate-500 mt-6">Need an account? Contact your system administrator.</p>
      </div>
    </div>
  </main>;
}
