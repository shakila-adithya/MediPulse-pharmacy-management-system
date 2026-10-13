import { Search, X } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  onSubmit,
  size = "md",
  className = "",
}) {
  const sizes = {
    md: "py-2.5 text-sm",
    lg: "py-4 text-base",
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
      className={`relative ${className}`}
      role="search"
    >
      <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={`w-full rounded-xl border border-slate-300 bg-white pl-12 pr-11 ${sizes[size]}
          text-slate-900 placeholder:text-slate-400 shadow-sm
          focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-150`}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-4.5 h-4.5" />
        </button>
      )}
    </form>
  );
}
