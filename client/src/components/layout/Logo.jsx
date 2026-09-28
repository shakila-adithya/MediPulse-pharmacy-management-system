import { Link } from "react-router-dom";
import { Activity } from "lucide-react";

export default function Logo({ to = "/", size = "md" }) {
  const sizes = {
    sm: { box: "w-7 h-7", icon: "w-4 h-4", text: "text-base" },
    md: { box: "w-9 h-9", icon: "w-5 h-5", text: "text-xl" },
  };
  const s = sizes[size];
  return (
    <Link to={to} className="flex items-center gap-2 shrink-0 group">
      <span className={`${s.box} rounded-lg bg-gradient-to-br from-primary-600 to-teal-500 flex items-center justify-center shadow-sm group-hover:shadow-card-hover transition-shadow`}>
        <Activity className={`${s.icon} text-white`} strokeWidth={2.5} />
      </span>
      <span className={`${s.text} font-bold tracking-tight text-slate-900`}>
        Medi<span className="text-primary-600">Pulse</span>
      </span>
    </Link>
  );
}
