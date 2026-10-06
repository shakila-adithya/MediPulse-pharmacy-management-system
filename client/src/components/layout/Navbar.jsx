import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/medicines", label: "Find Medicine" },
  { to: "/pharmacies", label: "Pharmacies" },
  { to: "/about", label: "About" },
];


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="container-page">
        <div className="flex items-center justify-between h-16">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "text-primary-700 bg-primary-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2 ml-4">
            <Link
              to="/login"
              className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-semibold shadow-sm hover:bg-primary-700 transition-colors"
            >
              Get started
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white animate-slide-up">
          <nav className="container-page py-3 flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                    isActive ? "text-primary-700 bg-primary-50" : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="border-t border-slate-100 mt-2 pt-2 flex flex-col gap-1">
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="px-3.5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className="px-3.5 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700"
              >
                Get started
              </NavLink>
            </div>

          </nav>
        </div>
      )}
    </header>
  );
}
