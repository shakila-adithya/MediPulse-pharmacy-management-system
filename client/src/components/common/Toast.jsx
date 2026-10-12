import { CheckCircle2, XCircle, Info, AlertTriangle, X } from "lucide-react";
import useNotifications from "../../hooks/useNotifications";

const styles = {
  success: { icon: CheckCircle2, cls: "bg-white border-success-200 text-success-700 [&_svg]:text-success-500" },
  error: { icon: XCircle, cls: "bg-white border-danger-200 text-danger-700 [&_svg]:text-danger-500" },
  warning: { icon: AlertTriangle, cls: "bg-white border-warning-200 text-warning-700 [&_svg]:text-warning-500" },
  info: { icon: Info, cls: "bg-white border-info-200 text-info-700 [&_svg]:text-info-500" },
};

export default function ToastContainer() {
  const { toasts, dismissToast } = useNotifications();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2.5 w-full max-w-sm px-4 sm:px-0">
      {toasts.map((toast) => {
        const config = styles[toast.type] || styles.info;
        const Icon = config.icon;
        return (
          <div
            key={toast.id}
            role="alert"
            className={`flex items-start gap-3 rounded-xl border shadow-pop px-4 py-3.5 animate-slide-in-right ${config.cls}`}
          >
            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-slate-700 flex-1">{toast.message}</p>
            <button
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
              className="text-slate-400 hover:text-slate-600 shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
