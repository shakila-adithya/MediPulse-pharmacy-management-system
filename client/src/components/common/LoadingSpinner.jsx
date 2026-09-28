import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ label = "Loading...", size = "md", fullPage = false }) {
  const sizes = { sm: "w-5 h-5", md: "w-8 h-8", lg: "w-12 h-12" };
  const content = (
    <div className="flex flex-col items-center justify-center gap-3 text-slate-400" role="status" aria-live="polite">
      <Loader2 className={`${sizes[size]} animate-spin text-primary-500`} />
      {label && <p className="text-sm font-medium">{label}</p>}
    </div>
  );
  if (fullPage) {
    return <div className="min-h-[50vh] flex items-center justify-center">{content}</div>;
  }
  return <div className="py-12">{content}</div>;
}
