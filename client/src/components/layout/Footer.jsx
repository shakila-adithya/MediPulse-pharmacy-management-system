import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";
import { PlusPattern } from "../illustrations/Decor";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-900 text-slate-300">
      <div className="h-1 bg-gradient-to-r from-primary-500 via-teal-400 to-primary-500" />
      <PlusPattern id="footer-plus" className="absolute inset-0 text-white opacity-[0.03]" />
      <div className="container-page relative py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Logo tone="light" />
          <p className="text-sm text-slate-400 mt-4 leading-relaxed">
            Find Your Medicine. Find Your Pharmacy. MediPulse connects customers with nearby pharmacies for
            real-time medicine availability and reservations.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/medicines" className="hover:text-white transition-colors">Find Medicine</Link></li>
            <li><Link to="/pharmacies" className="hover:text-white transition-colors">Pharmacies</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">For You</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">Support</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 shrink-0" /> support@medipulse.demo
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 shrink-0" /> +94 11 234 5678
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" /> Colombo, Sri Lanka
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} MediPulse-Smart Medicine Availability and Pharmacy Management System
          </p>
          <div className="flex gap-5">
            <Link to="/about" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-slate-300 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
