"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-geist",
});

// ─────────────────────────────────────────────
// CUSTOM SVG ICONS
// ─────────────────────────────────────────────

const ArrowRightIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CheckIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ChevronDownIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const MailIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3.5 6.5L12 13L20.5 6.5" />
  </svg>
);

const PhoneIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5.5 4h3.2l1.6 4.4-2.1 1.6a11.5 11.5 0 005.8 5.8l1.6-2.1L20 15.3v3.2a1.5 1.5 0 01-1.6 1.5A15.5 15.5 0 014 5.6 1.5 1.5 0 015.5 4z" />
  </svg>
);

const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3.5a8.5 8.5 0 00-7.3 12.8L3.5 20.5l4.4-1.2A8.5 8.5 0 1012 3.5z" />
    <path d="M8.7 9.3c0-.5.4-1 .9-1h.6c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.7.7a5.8 5.8 0 002.8 2.8l.7-.7c.2-.2.4-.2.6-.1l1.6.7c.2.1.3.3.3.5v.6c0 .5-.4.9-1 .9-3.6 0-6.9-3.3-6.9-6.9z" />
  </svg>
);

// ─────────────────────────────────────────────
// FLOATING DOODLE BACKGROUND ELEMENTS
// ─────────────────────────────────────────────

const FloatingPencil = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#1A3575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 40L12 28L36 8L40 12L16 36L8 40Z" />
    <path d="M12 28L20 20" />
    <path d="M36 8L40 12" />
    <path d="M8 40L11 37" />
  </svg>
);

const FloatingBook = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="8" width="14" height="28" rx="1" />
    <rect x="24" y="8" width="14" height="28" rx="1" />
    <path d="M20 8V36" strokeWidth="1" strokeDasharray="2 2" />
    <path d="M9 14H17M9 18H17M9 22H14" />
    <path d="M27 14H35M27 18H35M27 22H32" />
  </svg>
);

const FloatingPaperPlane = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} width="50" height="50" viewBox="0 0 50 50" fill="none" stroke="#1A3575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 25L42 8L30 42L22 28L6 25Z" />
    <path d="M22 28L42 8" />
    <path d="M22 28L24 38" strokeDasharray="2 2" />
  </svg>
);

const FloatingStar = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4L19 13H28L21 18L24 27L16 22L8 27L11 18L4 13H13L16 4Z" />
  </svg>
);

const FloatingGlobe = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#1A3575" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="20" cy="20" r="14" />
    <ellipse cx="20" cy="20" rx="6" ry="14" />
    <path d="M6 20H34" />
    <path d="M8 13H32M8 27H32" strokeDasharray="2 3" />
  </svg>
);

const FloatingMagnifier = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="15" cy="15" r="9" />
    <path d="M22 22L30 30" strokeWidth="2" />
    <path d="M11 15H19M15 11V19" strokeWidth="1.2" />
  </svg>
);

// ─────────────────────────────────────────────
// HERO ILLUSTRATION — Educational Doodle Scene
// ─────────────────────────────────────────────

const HeroIllustration = () => (
  <svg
    viewBox="0 0 520 480"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", maxWidth: 520, height: "auto" }}
    aria-hidden="true"
  >
    {/* ── Background circles (subtle) ── */}
    <circle cx="260" cy="240" r="180" stroke="#E8F0FE" strokeWidth="1" strokeDasharray="4 4" />
    <circle cx="260" cy="240" r="130" stroke="#E8F0FE" strokeWidth="1" strokeDasharray="3 5" />

    {/* ── School building ── */}
    <rect x="180" y="290" width="100" height="80" rx="2" stroke="#1A3575" strokeWidth="2" fill="#F3F7FD" />
    <path d="M175 290L230 255L285 290" stroke="#1A3575" strokeWidth="2" strokeLinejoin="round" fill="#E8B84B" fillOpacity="0.15" />
    <rect x="210" y="330" width="20" height="40" rx="1" stroke="#1A3575" strokeWidth="1.5" fill="white" />
    <rect x="190" y="305" width="16" height="16" rx="1" stroke="#1A3575" strokeWidth="1.5" fill="white" />
    <rect x="254" y="305" width="16" height="16" rx="1" stroke="#1A3575" strokeWidth="1.5" fill="white" />
    {/* Flag */}
    <line x1="230" y1="255" x2="230" y2="235" stroke="#1A3575" strokeWidth="1.5" />
    <path d="M230 235L245 240L230 245" fill="#E8B84B" />

    {/* ── Teacher (left) ── */}
    {/* Body */}
    <rect x="80" y="295" width="28" height="55" rx="4" stroke="#1A3575" strokeWidth="2" fill="#E8F0FE" />
    {/* Head */}
    <circle cx="94" cy="280" r="15" stroke="#1A3575" strokeWidth="2" fill="#FFE4C8" />
    {/* Hair */}
    <path d="M79 278C79 270 86 265 94 265C102 265 109 270 109 278" stroke="#1A3575" strokeWidth="1.5" fill="#333" fillOpacity="0.8" />
    {/* Book in hand */}
    <rect x="108" y="305" width="20" height="26" rx="1" stroke="#1A3575" strokeWidth="1.5" fill="#E8B84B" fillOpacity="0.4" />
    <line x1="118" y1="305" x2="118" y2="331" stroke="#1A3575" strokeWidth="1" />
    {/* Arm holding book */}
    <path d="M108 318L108 310L94 310" stroke="#1A3575" strokeWidth="2" strokeLinecap="round" />
    {/* Legs */}
    <path d="M85 350L82 375" stroke="#1A3575" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M103 350L106 375" stroke="#1A3575" strokeWidth="2.5" strokeLinecap="round" />
    {/* Shoes */}
    <path d="M78 375L88 375" stroke="#1A3575" strokeWidth="2" strokeLinecap="round" />
    <path d="M102 375L112 375" stroke="#1A3575" strokeWidth="2" strokeLinecap="round" />
    {/* Speech bubble */}
    <rect x="48" y="245" width="64" height="28" rx="8" stroke="#1A3575" strokeWidth="1.5" fill="white" />
    <path d="M72 273L68 282L80 273" fill="white" stroke="#1A3575" strokeWidth="1.2" strokeLinejoin="round" />
    <line x1="58" y1="254" x2="102" y2="254" stroke="#1A3575" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="58" y1="262" x2="88" y2="262" stroke="#1A3575" strokeWidth="1.2" strokeLinecap="round" />

    {/* ── Student (right) ── */}
    {/* Body */}
    <rect x="382" y="300" width="26" height="50" rx="4" stroke="#1A3575" strokeWidth="2" fill="#E8F0FE" />
    {/* Head */}
    <circle cx="395" cy="285" r="14" stroke="#1A3575" strokeWidth="2" fill="#FFD6B0" />
    {/* Hair spiky */}
    <path d="M381 280L386 268L391 278L396 265L401 278L406 268L409 280" stroke="#1A3575" strokeWidth="1.5" strokeLinejoin="round" fill="#555" fillOpacity="0.8" />
    {/* Backpack */}
    <rect x="408" y="305" width="18" height="30" rx="3" stroke="#1A3575" strokeWidth="1.5" fill="#E8B84B" fillOpacity="0.3" />
    <line x1="412" y1="305" x2="412" y2="335" stroke="#1A3575" strokeWidth="1" />
    <rect x="413" y="315" width="9" height="8" rx="1" stroke="#1A3575" strokeWidth="1" />
    {/* Arm with backpack */}
    <path d="M408 315L408 308L395 308" stroke="#1A3575" strokeWidth="2" strokeLinecap="round" />
    {/* Legs */}
    <path d="M387 350L384 375" stroke="#1A3575" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M403 350L406 375" stroke="#1A3575" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M380 375L390 375" stroke="#1A3575" strokeWidth="2" strokeLinecap="round" />
    <path d="M402 375L412 375" stroke="#1A3575" strokeWidth="2" strokeLinecap="round" />
    {/* Thought bubble with lightbulb */}
    <circle cx="430" cy="258" r="20" stroke="#E8B84B" strokeWidth="1.5" fill="white" />
    <circle cx="419" cy="270" r="5" stroke="#E8B84B" strokeWidth="1.2" fill="white" />
    <circle cx="410" cy="276" r="3" stroke="#E8B84B" strokeWidth="1.2" fill="white" />
    {/* Lightbulb inside thought */}
    <circle cx="430" cy="254" r="7" stroke="#E8B84B" strokeWidth="1.5" fill="#FFFBE6" />
    <path d="M427 261L433 261" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M429 263L431 263" stroke="#E8B84B" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="430" y1="247" x2="430" y2="245" stroke="#E8B84B" strokeWidth="1.2" />
    <line x1="436" y1="249" x2="438" y2="247" stroke="#E8B84B" strokeWidth="1.2" />
    <line x1="424" y1="249" x2="422" y2="247" stroke="#E8B84B" strokeWidth="1.2" />

    {/* ── Parent (top center) ── */}
    <circle cx="260" cy="155" r="16" stroke="#1A3575" strokeWidth="2" fill="#FFE4C8" />
    <path d="M244 153C244 145 251 140 260 140C269 140 276 145 276 153" stroke="#1A3575" strokeWidth="1.5" fill="#8B6350" fillOpacity="0.7" />
    <rect x="246" y="171" width="28" height="48" rx="4" stroke="#1A3575" strokeWidth="2" fill="#F3F7FD" />
    {/* Parent arms spread wide */}
    <path d="M246 182L228 195" stroke="#1A3575" strokeWidth="2" strokeLinecap="round" />
    <path d="M274 182L292 195" stroke="#1A3575" strokeWidth="2" strokeLinecap="round" />
    {/* Parent smile */}
    <path d="M254 161C254 161 257 165 260 165C263 165 266 161 266 161" stroke="#1A3575" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Legs */}
    <path d="M252 219L249 240" stroke="#1A3575" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M268 219L271 240" stroke="#1A3575" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M245 240L255 240" stroke="#1A3575" strokeWidth="2" strokeLinecap="round" />
    <path d="M267 240L277 240" stroke="#1A3575" strokeWidth="2" strokeLinecap="round" />

    {/* ── Connection lines between figures ── */}
    <path d="M108 330 Q160 280 180 320" stroke="#E8B84B" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" />
    <path d="M280 320 Q340 290 382 320" stroke="#E8B84B" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" />
    <path d="M230 270 Q190 230 110 300" stroke="#1A3575" strokeWidth="1" strokeDasharray="3 4" strokeLinecap="round" opacity="0.4" />
    <path d="M285 270 Q330 230 380 295" stroke="#1A3575" strokeWidth="1" strokeDasharray="3 4" strokeLinecap="round" opacity="0.4" />

    {/* ── Floating paper planes ── */}
    <g transform="translate(340, 150) rotate(-20)">
      <path d="M0 12L24 0L16 24L10 15L0 12Z" stroke="#1A3575" strokeWidth="1.5" strokeLinejoin="round" fill="white" />
      <path d="M10 15L24 0" stroke="#1A3575" strokeWidth="1" />
    </g>
    <g transform="translate(140, 200) rotate(15)">
      <path d="M0 10L20 0L14 20L8 13L0 10Z" stroke="#E8B84B" strokeWidth="1.5" strokeLinejoin="round" fill="white" />
      <path d="M8 13L20 0" stroke="#E8B84B" strokeWidth="1" />
    </g>

    {/* ── Stacked books bottom left ── */}
    <rect x="50" y="380" width="58" height="10" rx="2" stroke="#1A3575" strokeWidth="1.5" fill="#E8B84B" fillOpacity="0.3" />
    <rect x="54" y="370" width="48" height="10" rx="2" stroke="#1A3575" strokeWidth="1.5" fill="#E8F0FE" />
    <rect x="50" y="360" width="54" height="10" rx="2" stroke="#1A3575" strokeWidth="1.5" fill="#F3F7FD" />
    <line x1="64" y1="360" x2="64" y2="370" stroke="#1A3575" strokeWidth="1" opacity="0.4" />
    <line x1="78" y1="360" x2="78" y2="370" stroke="#1A3575" strokeWidth="1" opacity="0.4" />

    {/* ── Stacked books bottom right ── */}
    <rect x="400" y="380" width="58" height="10" rx="2" stroke="#1A3575" strokeWidth="1.5" fill="#F3F7FD" />
    <rect x="396" y="370" width="54" height="10" rx="2" stroke="#1A3575" strokeWidth="1.5" fill="#E8B84B" fillOpacity="0.3" />
    <rect x="402" y="360" width="48" height="10" rx="2" stroke="#1A3575" strokeWidth="1.5" fill="#E8F0FE" />

    {/* ── Stars scattered ── */}
    <path d="M330 190 L332 196 L338 196 L333 200 L335 206 L330 202 L325 206 L327 200 L322 196 L328 196Z" stroke="#E8B84B" strokeWidth="1" fill="#E8B84B" fillOpacity="0.2" />
    <path d="M172 150 L174 155 L179 155 L175 158 L177 163 L172 160 L167 163 L169 158 L165 155 L170 155Z" stroke="#E8B84B" strokeWidth="1" fill="#E8B84B" fillOpacity="0.2" />

    {/* ── DNA / growth spiral (subtle, top right) ── */}
    <path d="M430 80 Q440 95 430 110 Q420 125 430 140" stroke="#E8B84B" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    <path d="M445 80 Q435 95 445 110 Q455 125 445 140" stroke="#1A3575" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    <line x1="430" y1="90" x2="445" y2="87" stroke="#1A3575" strokeWidth="1" opacity="0.3" />
    <line x1="430" y1="100" x2="445" y2="103" stroke="#1A3575" strokeWidth="1" opacity="0.3" />
    <line x1="430" y1="110" x2="445" y2="110" stroke="#1A3575" strokeWidth="1" opacity="0.3" />
    <line x1="430" y1="120" x2="445" y2="117" stroke="#1A3575" strokeWidth="1" opacity="0.3" />
    <line x1="430" y1="130" x2="445" y2="133" stroke="#1A3575" strokeWidth="1" opacity="0.3" />
  </svg>
);

// ─────────────────────────────────────────────
// CLOSING PATHWAY ILLUSTRATION
// ─────────────────────────────────────────────

const PathwayIllustration = () => (
  <svg
    viewBox="0 0 700 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", maxWidth: 700, height: "auto" }}
    aria-hidden="true"
  >
    {/* Winding path */}
    <path
      d="M60 250 Q120 230 160 210 Q200 190 240 200 Q280 210 320 190 Q360 170 400 175 Q440 180 480 155 Q520 130 560 120 Q600 110 640 90"
      stroke="#1A3575"
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="8 5"
      opacity="0.25"
    />
    {/* Path glow / highlight center */}
    <path
      d="M60 250 Q120 230 160 210 Q200 190 240 200 Q280 210 320 190 Q360 170 400 175 Q440 180 480 155 Q520 130 560 120 Q600 110 640 90"
      stroke="#E8B84B"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.4"
    />

    {/* Glowing horizon */}
    <ellipse cx="640" cy="88" rx="40" ry="40" fill="#E8B84B" fillOpacity="0.08" />
    <ellipse cx="640" cy="88" rx="25" ry="25" fill="#E8B84B" fillOpacity="0.12" />
    <ellipse cx="640" cy="88" rx="14" ry="14" fill="#E8B84B" fillOpacity="0.25" />
    <circle cx="640" cy="88" r="7" fill="#E8B84B" fillOpacity="0.6" />
    {/* Sun rays */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 640 + Math.cos(rad) * 16;
      const y1 = 88 + Math.sin(rad) * 16;
      const x2 = 640 + Math.cos(rad) * 24;
      const y2 = 88 + Math.sin(rad) * 24;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />;
    })}

    {/* Books at start */}
    <rect x="40" y="240" width="40" height="8" rx="1" stroke="#1A3575" strokeWidth="1.5" fill="#E8B84B" fillOpacity="0.2" />
    <rect x="42" y="232" width="34" height="8" rx="1" stroke="#1A3575" strokeWidth="1.5" fill="#E8F0FE" />
    <rect x="38" y="224" width="38" height="8" rx="1" stroke="#1A3575" strokeWidth="1.5" fill="#F3F7FD" />

    {/* Figure 1 — Teacher at start of path */}
    <circle cx="160" cy="198" r="9" stroke="#1A3575" strokeWidth="1.5" fill="#FFE4C8" />
    <path d="M152 199C152 195 156 192 160 192C164 192 168 195 168 199" stroke="#1A3575" strokeWidth="1" fill="#555" fillOpacity="0.7" />
    <rect x="154" y="207" width="12" height="20" rx="2" stroke="#1A3575" strokeWidth="1.5" fill="#E8F0FE" />
    <path d="M156 227L154 238" stroke="#1A3575" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M166 227L168 238" stroke="#1A3575" strokeWidth="1.5" strokeLinecap="round" />

    {/* Figure 2 — Student mid path */}
    <circle cx="320" cy="180" r="9" stroke="#1A3575" strokeWidth="1.5" fill="#FFD6B0" />
    <path d="M311 180C311 177 315 174 320 174C325 174 329 177 329 180" stroke="#1A3575" strokeWidth="1" fill="#333" fillOpacity="0.8" />
    <rect x="314" y="189" width="12" height="20" rx="2" stroke="#1A3575" strokeWidth="1.5" fill="#E8F0FE" />
    <rect x="326" y="192" width="10" height="14" rx="2" stroke="#1A3575" strokeWidth="1" fill="#E8B84B" fillOpacity="0.3" />
    <path d="M316 209L314 220" stroke="#1A3575" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M326 209L328 220" stroke="#1A3575" strokeWidth="1.5" strokeLinecap="round" />

    {/* Figure 3 — Parent further along */}
    <circle cx="480" cy="146" r="9" stroke="#1A3575" strokeWidth="1.5" fill="#FFE4C8" />
    <path d="M471 147C471 143 475 140 480 140C485 140 489 143 489 147" stroke="#1A3575" strokeWidth="1" fill="#8B6350" fillOpacity="0.7" />
    <rect x="474" y="155" width="12" height="18" rx="2" stroke="#1A3575" strokeWidth="1.5" fill="#F3F7FD" />
    <path d="M474 162L466 168" stroke="#1A3575" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M486 162L494 168" stroke="#1A3575" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M476 173L474 184" stroke="#1A3575" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M484 173L486 184" stroke="#1A3575" strokeWidth="1.5" strokeLinecap="round" />

    {/* Figure 4 — Institution near horizon */}
    <rect x="582" y="108" width="40" height="30" rx="1" stroke="#1A3575" strokeWidth="1.5" fill="#F3F7FD" />
    <path d="M578 108L602 95L626 108" stroke="#1A3575" strokeWidth="1.5" strokeLinejoin="round" fill="#E8B84B" fillOpacity="0.15" />
    <rect x="592" y="122" width="8" height="16" rx="1" stroke="#1A3575" strokeWidth="1" fill="white" />
    <rect x="585" y="113" width="8" height="8" rx="1" stroke="#1A3575" strokeWidth="1" fill="white" />
    <rect x="611" y="113" width="8" height="8" rx="1" stroke="#1A3575" strokeWidth="1" fill="white" />

    {/* Scattered stars along path */}
    {[
      [200, 215], [360, 185], [430, 165], [540, 130],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="2.5" fill="#E8B84B" fillOpacity="0.45" />
    ))}

    {/* Paper plane flying toward horizon */}
    <g transform="translate(560, 100) rotate(-25)">
      <path d="M0 8L18 0L12 18L7 11L0 8Z" stroke="#1A3575" strokeWidth="1.2" strokeLinejoin="round" fill="white" fillOpacity="0.8" />
      <path d="M7 11L18 0" stroke="#1A3575" strokeWidth="0.8" />
    </g>
  </svg>
);

// ─────────────────────────────────────────────
// FORM STEP DATA
// ─────────────────────────────────────────────

const whoOptions = [
  "Student",
  "Teacher",
  "Parent",
  "School",
  "University",
  "Institute",
  "Enterprise",
  "Government",
  "NGO",
];

const interestOptions = [
  {
    name: "TTT",
    logo: "/images/tttlogo-removebg-preview.png",
  },
  {
    name: "OCT",
    logo: "/images/octlogo-removebg-preview.png",
  },
  {
    name: "IPST",
    logo: "/images/ipstlogo-removebg-preview.png",
  },
  {
    name: "LabTricks",
    logo: "/images/labtrickslogo-removebg-preview.png",
  },
  {
    name: "AI Ecosystem",
    logo: "/images/ailogo-removebg-preview.png",
  },
  {
    name: "Partnership",
    logo: null,
  },
  {
    name: "Demo",
    logo: null,
  },
];

// ─────────────────────────────────────────────
// FADE UP ANIMATION WRAPPER
// ─────────────────────────────────────────────

const FadeUp = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// MAIN CONTACT PAGE
// ─────────────────────────────────────────────

export default function ContactPage() {
  const [selectedWho, setSelectedWho] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleChip = (
    value: string,
    current: string[],
    setter: (v: string[]) => void
  ) => {
    setter(
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
    );
  };

  const handleSubmit = async () => {
    setSubmitting(true);
  
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
  
        headers: {
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify({
          ...formData,
          who: selectedWho,
          interests: selectedInterests,
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setSubmitted(true);
  
        setFormData({
          name: "",
          email: "",
          organization: "",
          message: "",
        });
  
        setSelectedWho([]);
        setSelectedInterests([]);
      } else {
        alert("Unable to send your message.");
      }
    } catch (err) {
      alert("Something went wrong.");
    }
  
    setSubmitting(false);
  };

  return (
    <main className={`${geist.variable} contact-root`}>
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════ */}
      <section className="hero-section">
        {/* Background floating doodles */}
        <div className="hero-doodles" aria-hidden="true">
          <FloatingPencil style={{ position: "absolute", top: "12%", left: "5%", opacity: 0.05 }} />
          <FloatingBook style={{ position: "absolute", top: "20%", left: "18%", opacity: 0.05 }} />
          <FloatingPaperPlane style={{ position: "absolute", top: "8%", right: "22%", opacity: 0.05 }} />
          <FloatingStar style={{ position: "absolute", top: "35%", right: "8%", opacity: 0.06 }} />
          <FloatingGlobe style={{ position: "absolute", bottom: "22%", left: "10%", opacity: 0.05 }} />
          <FloatingMagnifier style={{ position: "absolute", bottom: "15%", right: "14%", opacity: 0.05 }} />
          <FloatingBook style={{ position: "absolute", bottom: "30%", left: "28%", opacity: 0.04 }} />
          <FloatingStar style={{ position: "absolute", top: "55%", right: "28%", opacity: 0.04 }} />
          <FloatingPencil style={{ position: "absolute", top: "72%", left: "38%", opacity: 0.03 }} />
        </div>

        <div className="hero-inner">
          {/* LEFT */}
          <div className="hero-left">
            <FadeUp delay={0.05}>
              <span className="hero-eyebrow">Connect with us</span>
            </FadeUp>

            <FadeUp delay={0.15}>
              <h1 className="hero-headline">
                Every Great 
                Transformation Starts
                With A{" "}
                <span className="hero-gold">Conversation.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.28}>
              <p className="hero-subtext">
                Whether you&apos;re a school, university, government, parent community,
                or enterprise partner, we would love to hear your story.
              </p>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="hero-buttons">
                <a href="#contact-form" className="btn-primary">
                  Book A Demo
                  <ArrowRightIcon size={17} />
                </a>
                <a href="#contact-form" className="btn-outline">
                  Become A Partner
                </a>
              </div>
            </FadeUp>
          </div>

          {/* RIGHT */}
          <FadeUp delay={0.2} className="hero-right">
            <HeroIllustration />
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — FORM
      ═══════════════════════════════════════════ */}
      <section className="form-section" id="contact-form">
        <div className="form-grid">
          {/* LEFT — CONTACT CARD */}
          <FadeUp className="contact-card-wrap">
            <div className="contact-card">
              <div className="contact-card-decor" aria-hidden="true">
                <FloatingGlobe style={{ position: "absolute", top: "-14px", right: "-14px", opacity: 0.08 }} />
                <FloatingStar style={{ position: "absolute", bottom: "120px", left: "-8px", opacity: 0.08 }} />
              </div>

              <div className="contact-card-top">
                <span className="contact-eyebrow">Reach Us Directly</span>
                <h3 className="contact-title">We&apos;re Just A Message Away</h3>
                <p className="contact-desc">
                  Prefer to skip the form? Our team is reachable directly by
                  email, phone, or WhatsApp, wherever you&apos;re writing to us from.
                </p>
              </div>

              <div className="contact-list">
                <div className="contact-group">
                  <span className="contact-group-label">
                    <MailIcon size={14} /> Email
                  </span>
                  <a href="mailto:manager@i4isciences.in" className="contact-row">
                    <span className="contact-row-value">manager@i4isciences.in</span>
                    <span className="contact-row-tag">General</span>
                  </a>
                  <a href="mailto:ceo@i4isciences.ai" className="contact-row">
                    <span className="contact-row-value">ceo@i4isciences.ai</span>
                    <span className="contact-row-tag">AI Team</span>
                  </a>
                  <a href="mailto:ranjit@i4isciences.com" className="contact-row">
                    <span className="contact-row-value">ranjit@i4isciences.com</span>
                    <span className="contact-row-tag">Partnerships</span>
                  </a>
                  
                </div>

                <div className="contact-group">
                  <span className="contact-group-label">
                    <PhoneIcon size={14} /> Phone
                  </span>
                  <a href="tel:+919414452952" className="contact-row">
                    <span className="contact-row-value">+91 94144 52952</span>
                    <span className="contact-row-tag">India</span>
                  </a>
                  <a href="tel:+13145363631" className="contact-row">
                    <span className="contact-row-value">+1 314-536-3631</span>
                    <span className="contact-row-tag">USA</span>
                  </a>
                </div>

                <div className="contact-group">
                  <span className="contact-group-label">
                    <WhatsAppIcon size={14} /> WhatsApp
                  </span>
                  <a
                    href="https://wa.me/919414452952"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-row"
                  >
                    <span className="contact-row-value">+91 94144 52952</span>
                    <span className="contact-row-tag">Chat Now</span>
                  </a>
                </div>
              </div>

              <div className="contact-card-footer">
                <div className="contact-footer-divider" />
                <p className="contact-footer-note">
                  Our team typically responds within 48 hours.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* RIGHT — FORM */}
          <FadeUp delay={0.1} className="form-card-wrap">
          <motion.div
            className="form-card"
            whileHover={{ translateY: -8 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="success-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="success-icon">
                    <CheckIcon size={28} />
                  </div>
                  <h3 className="success-title">Message Received</h3>
                  <p className="success-sub">
                    Thank you for reaching out. Our team will get back to you within
                    48 hours with a thoughtful response.
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="form-title">Tell Us About Yourself</h2>
                  <p className="form-subtitle">
                    Help us understand who you are so we can make our first conversation
                    count.
                  </p>

                  {/* STEP 1 */}
                  <div className="form-step">
                    <span className="step-label">
                      <span className="step-num">01</span>
                      I am a
                    </span>
                    <div className="chip-group">
                      {whoOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => toggleChip(opt, selectedWho, setSelectedWho)}
                          className={`chip ${selectedWho.includes(opt) ? "chip-active" : ""}`}
                        >
                          {selectedWho.includes(opt) && (
                            <span className="chip-check">
                              <CheckIcon size={12} />
                            </span>
                          )}
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* STEP 2 */}
                  <div className="form-step">
                    <span className="step-label">
                      <span className="step-num">02</span>
                      Interested in
                    </span>
                    <div className="chip-group">
                    {interestOptions.map((item) => (
  <button
    key={item.name}
    type="button"
    onClick={() =>
      toggleChip(item.name, selectedInterests, setSelectedInterests)
    }
    className={`chip chip-interest ${
      selectedInterests.includes(item.name) ? "chip-active" : ""
    }`}
  >
    {selectedInterests.includes(item.name) && (
      <span className="chip-check">
        <CheckIcon size={12} />
      </span>
    )}

    {item.logo && (
      <img
        src={item.logo}
        alt={item.name}
        className="chip-logo"
      />
    )}

    {item.name}
  </button>
))}
                    </div>
                  </div>

                  {/* STEP 3 */}
                  <div className="form-step">
                    <span className="step-label">
                      <span className="step-num">03</span>
                      A little more about you
                    </span>
                    <div className="input-grid">
                      <div className="input-wrapper">
                        <input
                          type="text"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="text-input"
                        />
                        <span className="input-line" />
                      </div>
                      <div className="input-wrapper">
                        <input
                          type="email"
                          placeholder="Email address"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="text-input"
                        />
                        <span className="input-line" />
                      </div>
                      <div className="input-wrapper input-full">
                        <input
                          type="text"
                          placeholder="Organization"
                          value={formData.organization}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              organization: e.target.value,
                            })
                          }
                          className="text-input"
                        />
                        <span className="input-line" />
                      </div>
                      <div className="input-wrapper input-full">
                        <textarea
                          placeholder="What are you hoping to achieve?"
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="text-input textarea"
                        />
                        <span className="input-line" />
                      </div>
                    </div>
                  </div>

                  <div className="form-footer">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="btn-submit"
                    >
                      {submitting ? (
                        <span className="spinner" />
                      ) : (
                        <>
                          Start The Conversation
                          <ArrowRightIcon size={18} />
                        </>
                      )}
                    </button>
                    <p className="form-microcopy">
                      We&apos;ll get back to you within 48 hours.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — EMOTIONAL CLOSE
      ═══════════════════════════════════════════ */}
      <section className="close-section">
        <div className="close-inner">
          <FadeUp delay={0.05}>
            <p className="close-eyebrow">The Future Is Built Together</p>
          </FadeUp>

          <FadeUp delay={0.18}>
            <h2 className="close-headline">
              Education Without Barriers.
              <br />
              Opportunity Without Limits.
            </h2>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="close-sub">
              Together we can create a future where every learner,
              every teacher, and every family has access to opportunity.
            </p>
          </FadeUp>

          <FadeUp delay={0.42}>
            <a href="#contact-form" className="btn-talk">
              Let&apos;s Talk
              <ArrowRightIcon size={16} />
            </a>
          </FadeUp>

          <FadeUp delay={0.5} className="close-illustration">
            <PathwayIllustration />
          </FadeUp>

          <FadeUp delay={0.6}>
            <p className="close-signature">i4iSciences Team</p>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STYLES
      ═══════════════════════════════════════════ */}
      <style jsx global>{`
        .contact-root,
            .contact-root *,
               .contact-root *::before,
               .contact-root *::after {
                 box-sizing: border-box;
                 margin: 0;
                 padding: 0;
               }

        :root {
          --blue: #1A3575;
          --blue-mid: #2B4A9F;
          --blue-light: #E8F0FE;
          --gold: #E8B84B;
          --gold-light: #FFF8E6;
          --bg: #FFFFFF;
          --bg-soft: #F7F9FC;
          --bg-gradient: #F3F7FD;
          --text-primary: #0D1B3E;
          --text-secondary: #5A6A8A;
          --text-muted: #8FA0BC;
          --border: #E2EAF4;
          --font: var(--font-geist), 'Geist', system-ui, sans-serif;
          --radius-lg: 20px;
          --radius-xl: 32px;
          --radius-2xl: 48px;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: var(--font);
          background: var(--bg);
          color: var(--text-primary);
          -webkit-font-smoothing: antialiased;
        }

        .contact-root {
          font-family: var(--font);
          overflow-x: hidden;
        }

        /* ── HERO ── */
        .hero-section {
            position: relative;
            min-height: 100vh;
            background: var(--blue);
            display: flex;
            align-items: center;
            overflow: hidden;
            padding: 80px 0 60px;
          }

        .hero-doodles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .hero-inner {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .hero-eyebrow {
         color: rgba(255,255,255,0.7);
          font-family: var(--font);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .hero-headline {
          font-family: var(--font);
          font-size: clamp(36px, 4.5vw, 58px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: white;
        }

        .hero-gold {
          color: var(--gold);
          position: relative;
          display: inline-block;
        }

        .hero-gold::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--gold);
          border-radius: 2px;
          opacity: 0.35;
        }

        .hero-subtext {
          font-family: var(--font);
          font-size: 18px;
          font-weight: 400;
          line-height: 1.75;
          color: rgba(255,255,255,0.8);
          max-width: 420px;
        }

        .hero-buttons {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          padding-top: 4px;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: var(--blue);
          border: 2px solid rgba(255,255,255,0.35);
          color: white;
          font-family: var(--font);
          font-size: 15px;
          font-weight: 600;
          border-radius: 100px;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(26, 53, 117, 0.25);
        }

        .btn-primary:hover {
            background: rgba(255,255,255,0.08);
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(26, 53, 117, 0.32);
        }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: transparent;
          font-family: var(--font);
          font-size: 15px;
          font-weight: 600;
          color: white;
  border: 2px solid rgba(255,255,255,0.35);
          border-radius: 100px;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
        }

        .btn-outline:hover {
            background: rgba(255,255,255,0.08);
          transform: translateY(-2px);
        }

        .hero-right {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── FORM SECTION ── */
        .form-section {
          background: var(--bg-soft);
          padding: 100px 24px;
        }

        .form-grid {
          max-width: 1220px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.82fr 1.18fr;
          gap: 32px;
          align-items: stretch;
        }

        .contact-card-wrap,
        .form-card-wrap {
          display: flex;
        }

        .form-card {
          flex: 1;
          width: 100%;
          background: white;
          border-radius: var(--radius-2xl);
          padding: 56px;
          box-shadow:
            0 2px 4px rgba(13, 27, 62, 0.03),
            0 8px 24px rgba(13, 27, 62, 0.06),
            0 24px 64px rgba(13, 27, 62, 0.06);
          cursor: default;
          will-change: transform;
        }

        /* ── CONTACT CARD ── */
        .contact-card {
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: var(--blue);
          border-radius: var(--radius-2xl);
          padding: 52px 44px;
          color: white;
          position: relative;
          overflow: hidden;
          box-shadow:
            0 2px 4px rgba(13, 27, 62, 0.08),
            0 8px 24px rgba(13, 27, 62, 0.14),
            0 24px 64px rgba(13, 27, 62, 0.18);
        }

        .contact-card-decor {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .contact-card-top {
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          z-index: 1;
        }

        .contact-eyebrow {
          font-family: var(--font);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
        }

        .contact-title {
          font-family: var(--font);
          font-size: 27px;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.28;
          color: white;
        }

        .contact-desc {
          font-family: var(--font);
          font-size: 15px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.72);
          max-width: 340px;
        }

        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: relative;
          z-index: 1;
          margin-top: 32px;
        }

        .contact-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .contact-group-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 6px;
        }

        .contact-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 11px 14px;
          margin: 0 -14px;
          border-radius: 12px;
          text-decoration: none;
          transition: background 0.18s ease, transform 0.18s ease;
        }

        .contact-row:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(2px);
        }

        .contact-row-value {
          font-family: var(--font);
          font-size: 15px;
          font-weight: 600;
          color: white;
        }

        .contact-row-tag {
          font-family: var(--font);
          font-size: 12px;
          font-weight: 500;
          color: var(--gold);
          white-space: nowrap;
        }

        .contact-card-footer {
          position: relative;
          z-index: 1;
          margin-top: 36px;
        }

        .contact-footer-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.14);
          margin-bottom: 16px;
        }

        .contact-footer-note {
          font-family: var(--font);
          font-size: 13px;
          color: rgba(255, 255, 255, 0.55);
        }

        .form-title {
          font-family: var(--font);
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -0.025em;
          color: var(--text-primary);
          margin-bottom: 10px;
        }

        .form-subtitle {
          font-family: var(--font);
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 48px;
        }

        .form-step {
          margin-bottom: 44px;
        }

        .step-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .step-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          background: var(--blue-light);
          color: var(--blue);
          font-size: 11px;
          font-weight: 700;
          border-radius: 50%;
        }

        .chip-group {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 20px;
          border-radius: 100px;
          border: 1.5px solid var(--border);
          background: white;
          font-family: var(--font);
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .chip-logo {
          width: 26px;
          height: 26px;
          object-fit: contain;
          flex-shrink: 0;
          margin-right: 2px;
          transition: transform .2s ease;
        }
        
        .chip:hover .chip-logo {
          transform: scale(1.08);
        }
        
        .chip-active .chip-logo {
          filter: brightness(0) invert(1);
        }

        .chip:hover {
          border-color: var(--blue);
          color: var(--blue);
          background: var(--blue-light);
        }

        .chip-active {
          border-color: var(--blue) !important;
          background: var(--blue) !important;
          color: white !important;
        }

        .chip-check {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .chip-interest.chip-active {
          border-color: var(--gold) !important;
          background: var(--gold) !important;
          color: white !important;
        }

        .chip-interest:hover:not(.chip-active) {
          border-color: var(--gold);
          color: #8B6D1F;
          background: var(--gold-light);
        }

        .input-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 28px;
        }

        .input-wrapper {
          position: relative;
          padding-bottom: 28px;
        }

        .input-full {
          grid-column: 1 / -1;
        }

        .text-input {
          width: 100%;
          font-family: var(--font);
          font-size: 16px;
          font-weight: 400;
          color: var(--text-primary);
          background: transparent;
          border: none;
          border-bottom: 1.5px solid var(--border);
          padding: 12px 0;
          outline: none;
          transition: border-color 0.2s;
          resize: none;
        }

        .text-input::placeholder {
          color: var(--text-muted);
        }

        .text-input:focus {
          border-bottom-color: var(--blue);
        }

        .textarea {
          padding-top: 16px;
          line-height: 1.6;
        }

        .input-line {
          display: none;
        }

        .form-footer {
          display: flex;
          align-items: center;
          gap: 24px;
          padding-top: 16px;
          flex-wrap: wrap;
        }

        .btn-submit {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          background: var(--blue);
          color: white;
          font-family: var(--font);
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 100px;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(26, 53, 117, 0.25);
          min-width: 220px;
          justify-content: center;
        }

        .btn-submit:hover:not(:disabled) {
          background: var(--blue-mid);
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(26, 53, 117, 0.32);
        }

        .btn-submit:disabled {
          opacity: 0.75;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .form-microcopy {
          font-family: var(--font);
          font-size: 13px;
          color: var(--text-muted);
        }

        /* Success state */
        .success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 60px 20px;
          gap: 20px;
        }

        .success-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--blue-light);
          color: var(--blue);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .success-title {
          font-family: var(--font);
          font-size: 28px;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .success-sub {
          font-family: var(--font);
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 400px;
        }

        /* ── CLOSE SECTION ── */
        .close-section {
          min-height: 70vh;
          background: linear-gradient(180deg, #ffffff 0%, var(--bg-gradient) 50%, #ffffff 100%);
          display: flex;
          align-items: center;
          padding: 100px 24px 60px;
        }

        .close-inner {
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 24px;
        }

        .close-eyebrow {
          font-family: var(--font);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .close-headline {
          font-family: var(--font);
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: var(--text-primary);
        }

        .close-sub {
          font-family: var(--font);
          font-size: 18px;
          font-weight: 400;
          line-height: 1.75;
          color: var(--text-secondary);
          max-width: 520px;
        }

        .btn-talk {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: var(--blue);
          color: white;
          font-family: var(--font);
          font-size: 15px;
          font-weight: 600;
          border-radius: 100px;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(26, 53, 117, 0.25);
        }

        .btn-talk:hover {
          background: var(--blue-mid);
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(26, 53, 117, 0.32);
        }

        .close-illustration {
          width: 100%;
          padding-top: 12px;
        }

        .close-signature {
          font-family: var(--font);
          font-size: 13px;
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 0 28px;
          }

          .hero-right {
            order: -1;
          }

          .hero-headline {
            font-size: 36px;
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .form-card,
          .contact-card {
            padding: 40px 28px;
          }

          .input-grid {
            grid-template-columns: 1fr;
          }

          .form-footer {
            flex-direction: column;
            align-items: flex-start;
          }

          .btn-submit {
            width: 100%;
          }
        }

        @media (max-width: 600px) {
          .hero-section {
            padding: 64px 0 48px;
          }

          .hero-inner {
            padding: 0 20px;
          }

          .form-section {
            padding: 64px 16px;
          }

          .close-section {
            padding: 64px 20px 48px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}