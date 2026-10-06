// Small product illustrations keyed by the `image` field on each medicine.
export default function MedicineArt({ type = "pill", className = "" }) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
      <ellipse cx="48" cy="86" rx="26" ry="4" fill="#0f1c52" opacity="0.12" />
      {type === "capsule" && (
        <g transform="rotate(-38 48 48)">
          <path d="M48 30 H30 A18 18 0 0 0 30 66 H48 Z" fill="#17a395" />
          <path d="M48 30 H66 A18 18 0 0 1 66 66 H48 Z" fill="#fff" stroke="#c9f6ee" strokeWidth="2" />
          <path d="M22 44 a10 10 0 0 1 8 -8" stroke="#fff" strokeOpacity="0.55" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </g>
      )}
      {type === "tablet" && (
        <g>
          <circle cx="40" cy="46" r="24" fill="#fff" stroke="#fedf89" strokeWidth="2" />
          <path d="M22 46 H58" stroke="#fdb022" strokeWidth="3" strokeLinecap="round" />
          <circle cx="66" cy="58" r="15" fill="#f79009" />
          <path d="M55 58 H77" stroke="#fff" strokeOpacity="0.7" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {type === "cream" && (
        <g transform="rotate(-24 48 48)">
          <path d="M30 24 H66 L62 70 H34 Z" fill="#12b76a" />
          <path d="M30 24 H66 L65 34 H31 Z" fill="#039855" />
          <rect x="38" y="70" width="20" height="10" rx="3" fill="#fff" stroke="#d1fadf" strokeWidth="2" />
          <rect x="37" y="44" width="22" height="4" rx="2" fill="#fff" opacity="0.85" />
          <rect x="41" y="52" width="14" height="4" rx="2" fill="#fff" opacity="0.6" />
        </g>
      )}
      {type === "inhaler" && (
        <g>
          <rect x="32" y="16" width="26" height="46" rx="8" fill="#2e90fa" />
          <rect x="37" y="24" width="16" height="4" rx="2" fill="#fff" opacity="0.8" />
          <rect x="37" y="32" width="16" height="4" rx="2" fill="#fff" opacity="0.5" />
          <path d="M32 54 H58 V66 H74 A6 6 0 0 1 74 78 H44 A12 12 0 0 1 32 66 Z" fill="#175cd3" />
        </g>
      )}
      {type === "syrup" && (
        <g>
          <rect x="40" y="14" width="16" height="10" rx="3" fill="#fff" stroke="#fecdca" strokeWidth="2" />
          <path d="M40 24 H56 V32 C66 36 68 42 68 50 V72 A6 6 0 0 1 62 78 H34 A6 6 0 0 1 28 72 V50 C28 42 30 36 40 32 Z" fill="#f04438" />
          <rect x="34" y="50" width="28" height="18" rx="4" fill="#fff" opacity="0.9" />
        </g>
      )}
      {(type === "pill" || !["capsule", "tablet", "cream", "inhaler", "syrup"].includes(type)) && (
        <g>
          <rect x="34" y="14" width="28" height="12" rx="4" fill="#fff" stroke="#bcd4ff" strokeWidth="2" />
          <path d="M30 26 H66 A4 4 0 0 1 70 30 V72 A6 6 0 0 1 64 78 H32 A6 6 0 0 1 26 72 V30 A4 4 0 0 1 30 26 Z" fill="#f79009" />
          <rect x="32" y="40" width="32" height="24" rx="5" fill="#fff" />
          <path d="M45 46 h6 v5 h5 v6 h-5 v5 h-6 v-5 h-5 v-6 h5z" fill="#1d4ded" />
          <path d="M32 32 V70" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
