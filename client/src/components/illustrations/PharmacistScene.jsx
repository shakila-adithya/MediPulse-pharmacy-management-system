// Counter scene: a pharmacist handing over a reserved order.
const BOTTLES = [
  [56, 26, "#f79009"], [92, 34, "#2f68f5"], [128, 22, "#17a395"], [164, 30, "#f04438"],
  [332, 24, "#17a395"], [368, 34, "#f79009"], [404, 26, "#2f68f5"], [440, 32, "#12b76a"],
];

export default function PharmacistScene({ className = "" }) {
  return (
    <svg
      viewBox="0 0 520 440"
      className={className}
      role="img"
      aria-label="A pharmacist at the counter handing over a reserved order"
    >
      <defs>
        <filter id="ps-soft" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#0f1c52" floodOpacity="0.16" />
        </filter>
        <clipPath id="ps-clip"><rect width="520" height="440" rx="36" /></clipPath>
      </defs>
      <g clipPath="url(#ps-clip)">
        <rect width="520" height="440" fill="#e3f6f2" />
        <circle cx="440" cy="60" r="90" fill="#c9f6ee" />
        <circle cx="60" cy="380" r="110" fill="#d3e4ff" opacity="0.7" />

        {/* shelves */}
        {[118, 208].map((y) => (
          <g key={y}>
            <rect x="30" y={y} width="460" height="8" rx="4" fill="#94ecdd" />
            {BOTTLES.map(([x, h, c], i) => (
              <g key={i} transform={`translate(${x} ${y - h - (y === 208 ? 0 : 0)})`}>
                <rect x="0" y="6" width="22" height={h - 6} rx="5" fill={c} opacity={y === 208 ? 0.7 : 1} />
                <rect x="4" y="0" width="14" height="8" rx="3" fill="#fff" />
                <rect x="4" y={h / 2 - 2} width="14" height="8" rx="2" fill="#fff" opacity="0.85" />
              </g>
            ))}
          </g>
        ))}

        {/* pharmacist */}
        <g>
          <path d="M176 350 C176 282 214 246 260 246 C306 246 344 282 344 350 Z" fill="#fff" stroke="#dbe4f0" strokeWidth="2" />
          <path d="M226 250 L260 302 L294 250" fill="#d9f5f0" stroke="#dbe4f0" strokeWidth="2" strokeLinejoin="round" />
          <rect x="248" y="222" width="24" height="30" rx="10" fill="#e9b48c" />
          <circle cx="260" cy="200" r="40" fill="#f0c29b" />
          <path d="M219 196 C216 160 244 150 262 152 C284 152 304 164 301 198 C292 178 274 172 258 174 C240 176 226 184 219 196 Z" fill="#3a2a20" />
          <circle cx="246" cy="204" r="3.2" fill="#3a2a20" />
          <circle cx="274" cy="204" r="3.2" fill="#3a2a20" />
          <path d="M248 220 Q260 230 272 220" stroke="#8a4b2f" strokeWidth="3" strokeLinecap="round" fill="none" />
          <rect x="292" y="292" width="34" height="20" rx="5" fill="#17a395" />
          <path d="M306 297 h6 v4 h4 v6 h-4 v4 h-6 v-4 h-4 v-6 h4z" fill="#fff" transform="translate(-3 -2) scale(0.9)" />
          <path d="M226 320 C214 340 216 352 236 352" stroke="#dbe4f0" strokeWidth="2" fill="none" />
        </g>

        {/* counter */}
        <rect x="0" y="338" width="520" height="102" fill="#1c34b1" />
        <rect x="0" y="330" width="520" height="14" fill="#5691ff" />
        <rect x="0" y="342" width="520" height="4" fill="#0f1c52" opacity="0.18" />

        {/* order bag */}
        <g transform="translate(350 276)">
          <path d="M0 22 H78 L72 60 H6 Z" fill="#f4c98a" />
          <path d="M18 22 C18 4 60 4 60 22" stroke="#d9a35a" strokeWidth="4" fill="none" />
          <rect x="22" y="34" width="34" height="14" rx="4" fill="#fff" opacity="0.9" />
          <path d="M33 41 l4 4 l8 -8" stroke="#12b76a" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* status card */}
        <g transform="translate(300 40)" filter="url(#ps-soft)">
          <rect width="186" height="64" rx="18" fill="#fff" />
          <circle cx="34" cy="32" r="16" fill="#d1fadf" />
          <path d="M26 32 l6 6 l11 -12" stroke="#039855" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="60" y="29" fontSize="13" fontWeight="800" fill="#0f172a">Order reserved</text>
          <text x="60" y="47" fontSize="11" fill="#64748b">Ready for pickup at 4:30 pm</text>
        </g>
      </g>
    </svg>
  );
}
