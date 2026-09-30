import { useState } from "react";

// <img> that swaps to `fallback` (e.g. an SVG illustration) if the photo can't load,
// so the layout never shows a broken-image icon when offline or blocked.
export default function Photo({ src, alt = "", fallback = null, className = "", ...props }) {
  const [failed, setFailed] = useState(false);
  if (failed) return fallback;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
      {...props}
    />
  );
}
