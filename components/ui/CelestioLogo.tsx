import React from "react";

interface CelestioLogoProps {
  className?: string;
  /** Width in px — height is auto-proportional */
  width?: number;
  /** Show the tagline below the wordmark */
  showTagline?: boolean;
  /** Colour of the logo (css colour value) */
  color?: string;
}

/**
 * SVG recreation of the official Celestio logo.
 * Features:
 *  - Decorative tribal-triangle "C"
 *  - Thin elegant "elesti" letterforms (Josefin Sans)
 *  - Final "o" replaced with a gear / cog icon (tech symbol)
 *  - Optional tagline: "Where Technology Dances With Culture"
 */
export default function CelestioLogo({
  className = "",
  width = 320,
  showTagline = true,
  color = "#FFFFFF",
}: CelestioLogoProps) {
  const h = showTagline ? 110 : 72;

  return (
    <svg
      width={width}
      height={(width / 340) * h}
      viewBox={`0 0 340 ${h}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* ─── Tribal / decorated "C" ─── */}
      {/* Base C arc */}
      <path
        d="M54 14
           C30 14 12 32 12 56
           C12 80 30 98 54 98
           L54 88
           C36 88 22 74 22 56
           C22 38 36 24 54 24
           Z"
        fill={color}
      />

      {/* Triangle teeth on outer edge of C (tribal motif) */}
      {(
        [
          // [cx, cy, rotation] for each triangle along the arc
          [14, 28, -50],
          [10, 42, -80],
          [10, 56, -90],
          [10, 70, -100],
          [14, 84, -130],
          [22, 94, -155],
        ] as [number, number, number][]
      ).map(([cx, cy, rot], i) => (
        <polygon
          key={i}
          points={`${cx},${cy - 5} ${cx - 5},${cy + 4} ${cx + 5},${cy + 4}`}
          fill={color}
          transform={`rotate(${rot}, ${cx}, ${cy})`}
          opacity="0.9"
        />
      ))}

      {/* Inner arc of C */}
      <path
        d="M54 30
           C40 30 28 42 28 56
           C28 70 40 82 54 82
           L54 72
           C46 72 38 65 38 56
           C38 47 46 40 54 40
           Z"
        fill={color}
      />

      {/* ─── "elesti" thin letterforms ─── */}
      <text
        x="68"
        y="72"
        fontFamily="'Josefin Sans', 'Raleway', sans-serif"
        fontSize="58"
        fontWeight="300"
        letterSpacing="2"
        fill={color}
      >
        elesti
      </text>

      {/* ─── Gear "o" (replaces the final letter) ─── */}
      {/* Gear constructed as outer ring + teeth + inner circle */}
      {/* Outer teeth ring */}
      <g transform="translate(304, 56)">
        {/* Outer circle */}
        <circle cx="0" cy="0" r="20" stroke={color} strokeWidth="2" fill="none" />
        {/* Gear teeth — 8 rectangular teeth */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8;
          const rad = (angle * Math.PI) / 180;
          const x1 = Math.cos(rad) * 18;
          const y1 = Math.sin(rad) * 18;
          return (
            <rect
              key={i}
              x="-3"
              y="-4"
              width="6"
              height="8"
              fill={color}
              transform={`translate(${x1}, ${y1}) rotate(${angle})`}
            />
          );
        })}
        {/* Inner circle of gear */}
        <circle cx="0" cy="0" r="8" stroke={color} strokeWidth="2" fill="none" />
        {/* Center dot */}
        <circle cx="0" cy="0" r="2.5" fill={color} />
      </g>

      {/* ─── Tagline ─── */}
      {showTagline && (
        <>
          {/* Left line */}
          <line x1="12" y1="98" x2="82" y2="98" stroke={color} strokeWidth="0.8" opacity="0.5" />
          {/* Right line */}
          <line x1="258" y1="98" x2="328" y2="98" stroke={color} strokeWidth="0.8" opacity="0.5" />
          {/* Text */}
          <text
            x="170"
            y="106"
            textAnchor="middle"
            fontFamily="'Josefin Sans', 'Raleway', sans-serif"
            fontSize="9"
            fontWeight="300"
            letterSpacing="3"
            fill={color}
            opacity="0.75"
          >
            WHERE TECHNOLOGY DANCES WITH CULTURE
          </text>
        </>
      )}
    </svg>
  );
}
