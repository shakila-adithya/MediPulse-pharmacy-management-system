export default function SkeletonCard({ className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-5 animate-pulse ${className}`}>
      <div className="flex justify-between mb-4">
        <div className="h-4 bg-slate-200 rounded w-2/5" />
        <div className="h-5 bg-slate-200 rounded-full w-20" />
      </div>
      <div className="h-3 bg-slate-100 rounded w-3/5 mb-2" />
      <div className="h-3 bg-slate-100 rounded w-2/5 mb-5" />
      <div className="flex justify-between items-end">
        <div className="h-5 bg-slate-200 rounded w-16" />
        <div className="flex gap-2">
          <div className="h-9 bg-slate-100 rounded-lg w-24" />
          <div className="h-9 bg-slate-200 rounded-lg w-20" />
        </div>
      </div>
    </div>
  );
}
