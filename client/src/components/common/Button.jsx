import { Loader2 } from "lucide-react";

const variants = {
  primary: "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500 shadow-sm",
  secondary: "bg-teal-600 text-white hover:bg-teal-700 focus-visible:ring-teal-500 shadow-sm",
  outline: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus-visible:ring-primary-500",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100 focus-visible:ring-primary-500",
  danger: "bg-danger-600 text-white hover:bg-danger-700 focus-visible:ring-danger-500 shadow-sm",
  link: "bg-transparent text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline p-0",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2.5 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  isLoading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variant !== "link" ? "focus-visible:ring-2 focus-visible:ring-offset-2" : ""}
        ${variants[variant]} ${variant !== "link" ? sizes[size] : ""} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {Icon && iconPosition === "left" && <Icon className="w-4 h-4 shrink-0" />}
          {children}
          {Icon && iconPosition === "right" && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
}
