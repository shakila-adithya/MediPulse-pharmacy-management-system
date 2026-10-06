import { SearchX } from "lucide-react";

export default function EmptyState({
  icon: Icon = SearchX,
  title = "Nothing here yet.",
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="relative w-20 h-20 mb-5">
        <span className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-100 to-teal-100 rotate-6" />
        <span className="absolute inset-0 rounded-3xl bg-white ring-1 ring-slate-200 shadow-card flex items-center justify-center">
          <Icon className="w-8 h-8 text-primary-500" />
        </span>
      </div>
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      {description && <p className="text-sm text-slate-500 mt-1.5 max-w-sm">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
