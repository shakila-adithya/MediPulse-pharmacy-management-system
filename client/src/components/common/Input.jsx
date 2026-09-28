export default function Input({
  label,
  error,
  hint,
  icon: Icon,
  className = "",
  id,
  required,
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label} {required && <span className="text-danger-600">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="w-4.5 h-4.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-[18px] h-[18px]" />
        )}
        <input
          id={inputId}
          className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400
            transition-colors duration-150
            ${Icon ? "pl-10" : ""}
            ${error ? "border-danger-400 focus:border-danger-500 focus:ring-danger-100" : "border-slate-300 focus:border-primary-500 focus:ring-primary-100"}
            focus:outline-none focus:ring-4 disabled:bg-slate-50 disabled:text-slate-500`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs text-danger-600">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      )}
    </div>
  );
}
