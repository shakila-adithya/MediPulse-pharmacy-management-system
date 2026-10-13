import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut, Menu, UserRound, X } from "lucide-react";
import Logo from "./Logo";
import useAuth from "../../hooks/useAuth";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/medicines", label: "Find Medicine" },
  { to: "/pharmacies", label: "Pharmacies" },
  { to: "/about", label: "About" },
];

const navLinkClass = ({ isActive }) => `px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive ? "text-primary-700 bg-white shadow-sm ring-1 ring-slate-200/70" : "text-slate-600 hover:text-slate-900 hover:bg-white/70"}`;

function WelcomeUser({ user }) {
  const name = user?.fullName || "there";

  return <span className="hidden max-w-40 truncate text-sm font-medium text-slate-500 lg:inline" title={`Hi, ${name}`}>
    Hi, {name}
  </span>;
}

function ProfileAvatar() {
  return <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-primary-50 to-teal-50 text-primary-700 border border-primary-100 shadow-sm" aria-label="User profile">
    <UserRound className="w-5 h-5" aria-hidden="true" />
  </span>;
}

function NavbarLogoutButton({ onLogout }) {
  const [logoutError, setLogoutError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setLogoutError("");
    setIsLoggingOut(true);
    try {
      await onLogout();
    } catch {
      setLogoutError("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="flex items-center gap-1.5 rounded-lg bg-red-600 px-2 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:gap-2 sm:px-3.5"
        aria-label="Logout"
        aria-busy={isLoggingOut}
        title="Logout"
      >
        <LogOut className="h-4 w-4" aria-hidden="true" />
        <span className="hidden min-[360px]:inline">Logout</span>
      </button>
      {logoutError && <span className="absolute right-0 top-full z-50 mt-1 whitespace-nowrap text-xs text-danger-700" role="alert">{logoutError}</span>}
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate("/login", { replace: true });
  };

  const renderAuthActions = (mobile = false) => {
    if (isLoading) return null;
    if (isAuthenticated) return <>
      <WelcomeUser user={user} />
      <ProfileAvatar />
      <NavbarLogoutButton onLogout={handleLogout} />
    </>;
    return mobile ? <>
      <NavLink to="/login" onClick={() => setIsOpen(false)} className="px-3.5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Login</NavLink>
      <NavLink to="/register" onClick={() => setIsOpen(false)} className="px-3.5 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700">Get started</NavLink>
    </> : <>
      <Link to="/login" className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">Login</Link>
      <Link to="/register" className="px-4 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-semibold shadow-sm hover:bg-primary-700 transition-colors">Get started</Link>
    </>;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="container-page">
        <div className="flex h-[4.5rem] items-center justify-between">
          <Logo />
          <nav className="hidden items-center gap-0.5 rounded-xl border border-slate-200/80 bg-slate-50/80 p-1 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => <NavLink key={link.to} to={link.to} end={link.to === "/"} className={navLinkClass}>{link.label}</NavLink>)}
          </nav>
          <div className="ml-4 hidden items-center gap-2 border-l border-slate-200 pl-4 lg:flex">{renderAuthActions()}</div>
          <div className="flex lg:hidden items-center gap-2">
            {isAuthenticated && !isLoading && <>
              <WelcomeUser user={user} />
              <ProfileAvatar />
              <NavbarLogoutButton onLogout={handleLogout} />
            </>}
            <button className="p-2 rounded-lg text-slate-600 hover:bg-slate-100" onClick={() => setIsOpen((value) => !value)} aria-label="Toggle menu" aria-expanded={isOpen}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && <div className="lg:hidden border-t border-slate-200 bg-white shadow-lg animate-slide-up">
        <nav className="container-page py-3 flex flex-col gap-1" aria-label="Mobile navigation">
          {navLinks.map((link) => <NavLink key={link.to} to={link.to} end={link.to === "/"} onClick={() => setIsOpen(false)} className={navLinkClass}>{link.label}</NavLink>)}
          {!isAuthenticated && !isLoading && <div className="border-t border-slate-100 mt-2 pt-2 flex flex-col gap-1">{renderAuthActions(true)}</div>}
        </nav>
      </div>}
    </header>
  );
}
