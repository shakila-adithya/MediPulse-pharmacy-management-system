import { CheckCircle2, AlertTriangle, XCircle, Clock, PackageCheck, Ban, Info } from "lucide-react";

// Central status -> style/icon map used across the whole app so colors stay consistent.
const STATUS_MAP = {
  // stock/availability statuses
  available: { label: "Available", cls: "bg-success-50 text-success-700 ring-success-100", icon: CheckCircle2 },
  "low-stock": { label: "Low Stock", cls: "bg-warning-50 text-warning-700 ring-warning-100", icon: AlertTriangle },
  "out-of-stock": { label: "Out of Stock", cls: "bg-danger-50 text-danger-700 ring-danger-100", icon: XCircle },

  // reservation statuses
  Pending: { label: "Pending", cls: "bg-warning-50 text-warning-700 ring-warning-100", icon: Clock },
  Confirmed: { label: "Confirmed", cls: "bg-info-50 text-info-700 ring-info-100", icon: CheckCircle2 },
  "Ready for Pickup": { label: "Ready for Pickup", cls: "bg-teal-50 text-teal-700 ring-teal-100", icon: PackageCheck },
  Completed: { label: "Completed", cls: "bg-success-50 text-success-700 ring-success-100", icon: CheckCircle2 },
  Cancelled: { label: "Cancelled", cls: "bg-slate-100 text-slate-600 ring-slate-200", icon: Ban },
  Expired: { label: "Expired", cls: "bg-danger-50 text-danger-700 ring-danger-100", icon: XCircle },

  // account / pharmacy statuses
  active: { label: "Active", cls: "bg-success-50 text-success-700 ring-success-100", icon: CheckCircle2 },
  inactive: { label: "Inactive", cls: "bg-slate-100 text-slate-600 ring-slate-200", icon: Ban },

  // generic
  info: { label: "Info", cls: "bg-info-50 text-info-700 ring-info-100", icon: Info },
  success: { label: "Success", cls: "bg-success-50 text-success-700 ring-success-100", icon: CheckCircle2 },
  warning: { label: "Warning", cls: "bg-warning-50 text-warning-700 ring-warning-100", icon: AlertTriangle },
  error: { label: "Error", cls: "bg-danger-50 text-danger-700 ring-danger-100", icon: XCircle },
};

export default function StatusBadge({ status, showIcon = true, className = "" }) {
  const config = STATUS_MAP[status] || { label: status, cls: "bg-slate-100 text-slate-600 ring-slate-200", icon: Info };
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset whitespace-nowrap ${config.cls} ${className}`}
    >
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      {config.label}
    </span>
  );
}
