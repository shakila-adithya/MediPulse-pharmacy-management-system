export default function Card({ children, className = "", hoverable = false, padding = "p-5", as: Component = "div", ...props }) {
  return (
    <Component
      className={`bg-white rounded-2xl border border-slate-200 shadow-card ${padding}
        ${hoverable ? "transition-all duration-200 hover:shadow-pop hover:border-primary-200 hover:-translate-y-0.5" : ""}
        ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
