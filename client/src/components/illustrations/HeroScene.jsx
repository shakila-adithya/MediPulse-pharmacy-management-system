// Hero illustration: a phone showing nearby pharmacies over a stylised city map.
// Pure SVG so it stays sharp at any size and needs no image hosting.
function Pin({ x, y, fill, scale = 1, pulse = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {pulse && (
        <>
          <circle className="hs-pulse" cx="0" cy="30" r="14" fill={fill} opacity="0.25" />
          <circle className="hs-pulse hs-pulse-late" cx="0" cy="30" r="14" fill={fill} opacity="0.25" />
        </>
      )}
      <ellipse cx="0" cy="30" rx="12" ry="4" fill="#0f1c52" opacity="0.18" />
      <path
        d="M0 -34 C-14 -34 -22 -24 -22 -13 C-22 3 0 28 0 28 C0 28 22 3 22 -13 C22 -24 14 -34 0 -34Z"
        fill={fill}
      />
      <circle cx="0" cy="-13" r="11" fill="#fff" />
      <path d="M-2.5 -21 h5 v5.5 h5.5 v5 h-5.5 v5.5 h-5 v-5.5 h-5.5 v-5 h5.5z" fill={fill} />
    </g>
  );
}

function Capsule({ x, y, rotate = 0, a = "#2f68f5", b = "#ffffff", scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M0 -13 H-17 A13 13 0 0 0 -17 13 H0 Z" fill={a} />
      <path d="M0 -13 H17 A13 13 0 0 1 17 13 H0 Z" fill={b} stroke="#dae8ff" strokeWidth="1.5" />
      <path d="M-22 -6 a8 8 0 0 1 6 -4" stroke="#fff" strokeOpacity="0.6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </g>
  );
}

function ResultRow({ y, tint, iconFill, name, meta, chip, chipBg, chipFg }) {
  return (
    <g transform={`translate(18 ${y})`}>
      <rect width="164" height="62" rx="16" fill="#fff" stroke="#e2e8f0" />
      <rect x="10" y="11" width="40" height="40" rx="12" fill={tint} />
      <rect x="21" y="18" width="18" height="6" rx="3" fill="#fff" stroke={iconFill} strokeWidth="1.5" />
      <rect x="19" y="24" width="22" height="20" rx="5" fill={iconFill} />
      <rect x="24" y="30" width="12" height="8" rx="2" fill="#fff" opacity="0.85" />
      <text x="58" y="26" fontSize="11" fontWeight="700" fill="#0f172a">{name}</text>
      <text x="58" y="40" fontSize="9" fill="#64748b">{meta}</text>
      <rect x="58" y="45" width={chip.length * 5 + 12} height="12" rx="6" fill={chipBg} />
      <text x="64" y="54" fontSize="8" fontWeight="700" fill={chipFg}>{chip}</text>
    </g>
  );
}

export default function HeroScene({ className = "" }) {
  return (
    <svg
      viewBox="0 0 560 520"
      className={className}
      role="img"
      aria-label="A phone showing nearby pharmacies and medicine availability on a city map"
    >
      <defs>
        <linearGradient id="hs-map" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6efff" />
          <stop offset="1" stopColor="#d9f5f0" />
        </linearGradient>
        <clipPath id="hs-clip">
          <rect x="24" y="40" width="512" height="368" rx="36" />
        </clipPath>
        <filter id="hs-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#0f1c52" floodOpacity="0.22" />
        </filter>
        <filter id="hs-soft" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0f1c52" floodOpacity="0.16" />
        </filter>
      </defs>

      {/* map card */}
      <rect x="24" y="40" width="512" height="368" rx="36" fill="url(#hs-map)" />
      <g clipPath="url(#hs-clip)">
        <path d="M-10 392 C130 330 250 410 570 330" stroke="#b9d7ff" strokeWidth="30" fill="none" />
        <ellipse cx="96" cy="120" rx="70" ry="38" fill="#a8ead9" opacity="0.7" />
        <ellipse cx="470" cy="360" rx="62" ry="30" fill="#a8ead9" opacity="0.7" />
        <g fill="#f6f9ff" opacity="0.9">
          <rect x="60" y="190" width="70" height="44" rx="10" />
          <rect x="220" y="70" width="90" height="50" rx="10" />
          <rect x="360" y="190" width="60" height="60" rx="10" />
          <rect x="140" y="270" width="60" height="40" rx="10" />
          <rect x="440" y="80" width="70" height="40" rx="10" />
        </g>
        <g stroke="#fff" fill="none" strokeLinecap="round">
          <path d="M-10 160 C120 140 210 220 350 176 S520 130 570 158" strokeWidth="18" />
          <path d="M182 30 C206 130 150 270 214 420" strokeWidth="14" />
          <path d="M392 30 L350 420" strokeWidth="10" />
          <path d="M0 300 L560 262" strokeWidth="7" />
          <path d="M0 96 L560 84" strokeWidth="6" />
        </g>
      </g>

      <Pin x={110} y={158} fill="#17a395" scale={0.9} />
      <Pin x={262} y={290} fill="#1d4ded" scale={1.15} pulse />
      <Pin x={440} y={128} fill="#f79009" scale={0.9} />

      {/* storefront */}
      <g transform="translate(34 296)" filter="url(#hs-soft)">
        <rect x="0" y="44" width="176" height="112" rx="12" fill="#fff" stroke="#e2e8f0" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M${i * 35.2} 44 h35.2 v24 a17.6 17.6 0 0 1 -35.2 0 z`}
            fill={i % 2 === 0 ? "#1d4ded" : "#eef4ff"}
          />
        ))}
        <circle cx="88" cy="14" r="24" fill="#17a395" />
        <path d="M84 3 h8 v8 h8 v8 h-8 v8 h-8 v-8 h-8 v-8 h8z" fill="#fff" />
        <rect x="14" y="88" width="42" height="34" rx="8" fill="#bcd4ff" />
        <rect x="120" y="88" width="42" height="34" rx="8" fill="#bcd4ff" />
        <rect x="65" y="94" width="46" height="62" rx="8" fill="#dae8ff" />
        <circle cx="103" cy="126" r="2.5" fill="#1a3ddb" />
      </g>

      {/* phone */}
      <g transform="translate(316 112)" filter="url(#hs-shadow)">
        <rect width="200" height="388" rx="38" fill="#0f1c52" />
        <rect x="8" y="8" width="184" height="372" rx="31" fill="#f8fafc" />
        <rect x="70" y="16" width="60" height="14" rx="7" fill="#0f1c52" />
        <text x="22" y="56" fontSize="13" fontWeight="800" fill="#0f172a">Near you</text>
        <rect x="22" y="66" width="156" height="30" rx="11" fill="#fff" stroke="#e2e8f0" />
        <circle cx="38" cy="81" r="5" fill="none" stroke="#94a3b8" strokeWidth="1.8" />
        <path d="M42 85 l4 4" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
        <text x="52" y="85" fontSize="10" fill="#475569">Paracetamol</text>
        <ResultRow y={108} tint="#dae8ff" iconFill="#2f68f5" name="HealthPlus" meta="2.4 km away" chip="In stock" chipBg="#d1fadf" chipFg="#027a48" />
        <ResultRow y={178} tint="#c9f6ee" iconFill="#17a395" name="CarePoint" meta="3.1 km away" chip="Low stock" chipBg="#fef0c7" chipFg="#b54708" />
        <ResultRow y={248} tint="#fef0c7" iconFill="#f79009" name="PrimeCare" meta="1.2 km away" chip="In stock" chipBg="#d1fadf" chipFg="#027a48" />
        <rect x="22" y="326" width="156" height="34" rx="12" fill="#1d4ded" />
        <text x="100" y="347" fontSize="11" fontWeight="700" fill="#fff" textAnchor="middle">Reserve now</text>
      </g>

      <Capsule x={488} y={60} rotate={32} scale={1.1} />
      <Capsule x={44} y={64} rotate={-28} a="#17a395" scale={0.85} />
      <g transform="translate(540 300)" filter="url(#hs-soft)">
        <circle r="17" fill="#fff" stroke="#e2e8f0" />
        <path d="M-9 0 H9" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
