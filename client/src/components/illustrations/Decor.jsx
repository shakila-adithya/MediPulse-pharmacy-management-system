// Small decorative pieces shared across banners and panels.
export function PlusPattern({ className = "", id = "plus-pattern", color = "currentColor" }) {
  return (
    <svg className={className} aria-hidden="true" width="100%" height="100%">
      <defs>
        <pattern id={id} width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M18 12 v12 M12 18 h12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export function Capsule({ className = "", a = "#5691ff", b = "#ffffff", style }) {
  return (
    <svg viewBox="0 0 120 52" className={className} style={style} aria-hidden="true">
      <path d="M60 2 H26 A24 24 0 0 0 26 50 H60 Z" fill={a} />
      <path d="M60 2 H94 A24 24 0 0 1 94 50 H60 Z" fill={b} />
      <path d="M12 20 a14 14 0 0 1 10 -12" stroke="#fff" strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}
