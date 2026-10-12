import { ChevronDown } from "lucide-react";

export default function Select({ label, options, className = "", id, placeholder, required, ...props }) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={className}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label} {required && <span className="text-danger-600">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-900
            focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-colors duration-150"
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}
