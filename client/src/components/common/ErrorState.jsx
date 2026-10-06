import { AlertOctagon } from "lucide-react";
import Button from "./Button";

export default function ErrorState({
  title = "Something went wrong.",
  description = "We couldn't load this content. Please try again.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-16 h-16 rounded-2xl bg-danger-50 flex items-center justify-center mb-4">
        <AlertOctagon className="w-7 h-7 text-danger-500" />
      </div>
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500 mt-1.5 max-w-sm">{description}</p>
      {onRetry && (
        <div className="mt-5">
          <Button variant="outline" onClick={onRetry}>
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
