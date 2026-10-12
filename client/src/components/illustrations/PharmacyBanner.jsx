// Storefront banner used on pharmacy cards. `seed` picks one of several palettes
// so a list of pharmacies looks varied but stays deterministic.
const PALETTES = [
  { sky: "#dae8ff", far: "#bcd4ff", wall: "#ffffff", awnA: "#1d4ded", awnB: "#eef4ff", sign: "#17a395", sun: "#fef0c7" },
  { sky: "#c9f6ee", far: "#94ecdd", wall: "#ffffff", awnA: "#118279", awnB: "#effcfa", sign: "#1d4ded", sun: "#fff" },
  { sky: "#fef0c7", far: "#fedf89", wall: "#ffffff", awnA: "#dc6803", awnB: "#fffaeb", sign: "#17a395", sun: "#fff" },
  { sky: "#d1e9ff", far: "#84caff", wall: "#ffffff", awnA: "#175cd3", awnB: "#eff8ff", sign: "#12b76a", sun: "#fef0c7" },
];

export default function PharmacyBanner({ seed = 0, className = "" }) {
  const p = PALETTES[Math.abs(seed) % PALETTES.length];
  const flip = seed % 2 === 1;
  return (
    <svg
      viewBox="0 0 400 128"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <rect width="400" height="128" fill={p.sky} />
      <circle cx={flip ? 60 : 340} cy="34" r="20" fill={p.sun} />
      <g fill={p.far}>
        <rect x="0" y="62" width="54" height="66" rx="4" />
        <rect x="62" y="80" width="40" height="48" rx="4" />
        <rect x="300" y="70" width="48" height="58" rx="4" />
        <rect x="352" y="52" width="48" height="76" rx="4" />
      </g>
      <g transform={`translate(${flip ? 96 : 120} 22)`}>
        <rect x="0" y="34" width="160" height="94" rx="8" fill={p.wall} />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M${i * 32} 34 h32 v22 a16 16 0 0 1 -32 0 z`}
            fill={i % 2 === 0 ? p.awnA : p.awnB}
          />
        ))}
        <circle cx="80" cy="12" r="20" fill={p.sign} />
        <path d="M76 3 h8 v6 h6 v8 h-6 v6 h-8 v-6 h-6 v-8 h6z" fill="#fff" />
        <rect x="14" y="70" width="36" height="30" rx="6" fill={p.far} />
        <rect x="110" y="70" width="36" height="30" rx="6" fill={p.far} />
        <rect x="60" y="74" width="40" height="54" rx="6" fill={p.sky} />
      </g>
      <rect x="0" y="118" width="400" height="10" fill="#0f1c52" opacity="0.06" />
    </svg>
  );
}
