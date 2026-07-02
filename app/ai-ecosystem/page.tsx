"use client";
import { useState, useRef, useEffect, JSX } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════ */
const T = {
  navy:   "#0b38b0",   // hero bg, alternating bg
  navyD:  "#08278a",   // darker navy for depth
  navyL:  "#1448cc",   // lighter navy accent
  white:  "#ffffff",
  cream:  "#f5f7ff",   // off-white for white sections
  amber:  "#f5a623",
  amberL: "#ffc94d",
  ink:    "#0a2e8a",
  body:   "#3d4f82",
  soft:   "#7a8ab8",
  hair:   "rgba(11,56,176,0.09)",
  // on-navy text
  navyText: "rgba(255,255,255,0.72)",
  navyTextD: "rgba(255,255,255,0.42)",
};

const ease = [0.22, 1, 0.36, 1] as const;


/* ═══════════════════════════════════════
   GLOBAL CSS — now scoped to .aie-root only
═══════════════════════════════════════ */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');

.aie-root, .aie-root *, .aie-root *::before, .aie-root *::after {
  box-sizing: border-box;
}
.aie-root {
  font-family: 'Geist', sans-serif;
  background: #fff;
  color: #10204e;
  -webkit-font-smoothing: antialiased;
}
.aie-root h1, .aie-root h2, .aie-root h3, .aie-root h4,
.aie-root p, .aie-root ul, .aie-root li, .aie-root figure {
  margin: 0;
  padding: 0;
}
.aie-root ::selection { background: rgba(245,166,35,0.22); }
.aie-root img { display: block; max-width: 100%; border: none; outline: none; }
.aie-root a { text-decoration: none; }
.aie-root button { font-family: 'Geist', sans-serif; cursor: pointer; border: none; background: none; padding: 0; }

@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes shimmer{0%{opacity:0.5}50%{opacity:1}100%{opacity:0.5}}
@keyframes drift{0%,100%{transform:translate(0,0) rotate(0deg)}33%{transform:translate(6px,-8px) rotate(2deg)}66%{transform:translate(-4px,4px) rotate(-1deg)}}
@keyframes drawLine{from{stroke-dashoffset:800}to{stroke-dashoffset:0}}
@keyframes blobPulse{0%,100%{border-radius:42% 58% 62% 38% / 48% 42% 58% 52%}33%{border-radius:58% 42% 38% 62% / 52% 58% 42% 48%}66%{border-radius:46% 54% 54% 46% / 56% 44% 56% 44%}}

.site-logo-sticky{
  position: fixed;
  top: 96px;
  right: 24px;
  z-index: 40;
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
  transition: transform .25s ease, opacity .25s ease;
}
.site-logo-sticky.is-hidden{
  opacity: 0;
  pointer-events: none;
}
.site-logo-image{ width: 90px; height: auto; display: block; }
.site-logo-sticky:hover{ transform: scale(1.05); }

@media(max-width:768px){
  .site-logo-sticky{ top: 84px; right: 12px; }
  .site-logo-image{ width: 70px; }
}
`;

/* ═══════════════════════════════════════
   LAYOUT WRAPPERS
═══════════════════════════════════════ */
function Inn({ children, max = 1280 }: { children: React.ReactNode; max?: number }) {
  return (
    <div style={{ maxWidth: max, margin: "0 auto", position: "relative", zIndex: 2 }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════
   SHARED UI PRIMITIVES
═══════════════════════════════════════ */
function Pill({ text, onNavy = false }: { text: string; onNavy?: boolean }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      fontFamily: "'Geist',sans-serif", fontSize: "0.6rem", fontWeight: 700,
      letterSpacing: "0.16em", textTransform: "uppercase",
      color: onNavy ? T.amber : T.navy,
      background: onNavy ? "rgba(245,166,35,0.15)" : "rgba(11,56,176,0.07)",
      border: `1px solid ${onNavy ? "rgba(245,166,35,0.35)" : "rgba(11,56,176,0.16)"}`,
      padding: "0.32rem 0.95rem", borderRadius: 999, marginBottom: "1rem",
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: "50%",
        background: onNavy ? T.amber : T.navy, display: "inline-block",
        animation: "shimmer 2s ease-in-out infinite",
      }} />
      {text}
    </span>
  );
}

function SectionHeading({
  children, onNavy = false, align = "center",
}: { children: React.ReactNode; onNavy?: boolean; align?: "center" | "left" }) {
  return (
    <h2 style={{
      fontFamily: "'Geist',sans-serif", fontWeight: 800,
      fontSize: "clamp(2rem,3.8vw,3.2rem)", lineHeight: 1.07,
      letterSpacing: "-0.038em", color: onNavy ? "#fff" : T.ink,
      textAlign: align,
    }}>{children}</h2>
  );
}

function Gold({ children }: { children: React.ReactNode }) {
  return <span style={{ color: T.amber }}>{children}</span>;
}

function Body({ children, onNavy = false, center = false, style = {} }: {
  children: React.ReactNode; onNavy?: boolean; center?: boolean; style?: React.CSSProperties
}) {
  return (
    <p style={{
      fontFamily: "'Geist',sans-serif", fontSize: "clamp(0.9rem,1.08vw,1rem)",
      lineHeight: 1.86, color: onNavy ? T.navyText : T.body,
      textAlign: center ? "center" : "left", ...style,
    }}>{children}</p>
  );
}

/* ═══════════════════════════════════════
   DOODLE ELEMENTS
═══════════════════════════════════════ */
function Squiggle({ x = 0, y = 0, w = 80, col = T.amber, opacity = 0.25, rotate = 0 }: {
  x?: number; y?: number; w?: number; col?: string; opacity?: number; rotate?: number
}) {
  return (
    <svg style={{ position: "absolute", left: x, top: y, pointerEvents: "none", transform: `rotate(${rotate}deg)`, zIndex: 0 }}
      width={w} height={w * 0.4} viewBox={`0 0 ${w} ${w * 0.4}`} fill="none">
      <path d={`M4 ${w * 0.28} Q${w * 0.25} 4 ${w * 0.5} ${w * 0.28} Q${w * 0.75} ${w * 0.52} ${w - 4} ${w * 0.28}`}
        stroke={col} strokeWidth="2.2" strokeLinecap="round" strokeOpacity={opacity} />
    </svg>
  );
}

function DotGrid({ col = "rgba(255,255,255,0.06)", size = 24 }: { col?: string; size?: number }) {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} fill="none">
      <defs>
        <pattern id={`dots-${col.slice(0, 6)}`} x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse">
          <circle cx={size / 2} cy={size / 2} r="1.3" fill={col} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#dots-${col.slice(0, 6)})`} />
    </svg>
  );
}

function FloatingStar({ style = {} }: { style?: React.CSSProperties }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      style={{ position: "absolute", pointerEvents: "none", animation: "drift 7s ease-in-out infinite", ...style }}>
      <path d="M11 2l2.2 6.6H20l-5.6 4 2.2 6.6L11 15.2 5.4 19.2l2.2-6.6L2 8.6h6.8z"
        stroke={T.amber} strokeWidth="1.5" strokeLinejoin="round" fill="rgba(245,166,35,0.08)" />
    </svg>
  );
}

function FloatingCircle({ style = {}, col = T.amber, size = 40 }: {
  style?: React.CSSProperties; col?: string; size?: number
}) {
  return (
    <div style={{
      position: "absolute", width: size, height: size, borderRadius: "50%",
      border: `1.5px dashed ${col}`, opacity: 0.22,
      animation: "floatY 6s ease-in-out infinite", pointerEvents: "none", ...style,
    }} />
  );
}

/* ═══════════════════════════════════════
   SVG ICONS
═══════════════════════════════════════ */
const Ico = {
  Arrow: ({ c = "white", size = 16 }: { c?: string; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round">
      <path d="M3 8h10M9.5 4.5L13 8l-3.5 3.5" />
    </svg>
  ),
  Play: ({ c = T.navy }: { c?: string }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke={c} strokeWidth="1.5" />
      <path d="M6.5 5.5l4.5 2.5-4.5 2.5V5.5z" stroke={c} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
  Check: ({ c = T.amber }: { c?: string }) => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="7.5" r="6.5" stroke={c} strokeWidth="1.4" />
      <path d="M5 7.5l2 2.2 3.5-3.8" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Chev: ({ c = T.navy, size = 11 }: { c?: string; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 11 11" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round">
      <path d="M3.5 2.5l3 3-3 3" />
    </svg>
  ),
  Brain: ({ c = T.navy }: { c?: string }) => (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3C7.5 3 5 5 5 7.5S6.5 11.5 8 12" /><path d="M10 3c2.5 0 5 2 5 5v1" />
      <path d="M10 23V12M8 12C6 12 5 10 5 8" />
      <path d="M15 8a5 5 0 0 1 0 10" /><path d="M15 8c3 0 5 2.2 5 5s-2 5-5 5" /><path d="M10 19h5" />
    </svg>
  ),
  Link: ({ c = T.navy }: { c?: string }) => (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="13" r="3" /><circle cx="18" cy="8" r="3" /><circle cx="18" cy="18" r="3" />
      <path d="M11 13h4M10.5 10.5l4-1.5M10.5 15.5l4 1.5" />
    </svg>
  ),
  BarChart: ({ c = T.navy }: { c?: string }) => (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h18" /><rect x="5" y="12" width="4" height="8" rx="1" />
      <rect x="11" y="7" width="4" height="13" rx="1" /><rect x="17" y="3" width="4" height="17" rx="1" />
    </svg>
  ),
  Clipboard: ({ c = T.navy }: { c?: string }) => (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="5" width="14" height="17" rx="2" /><path d="M10 3h6v4h-6zM9 11h8M9 15h5" />
    </svg>
  ),
  Wave: ({ c = T.navy }: { c?: string }) => (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round">
      <path d="M2 13c1.5-4 3-6 4.5-6s3 4 4.5 4 3-8 4.5-8 3 6 4.5 6 2-2 3.5-2S25 9 26 9" />
    </svg>
  ),
  Trophy: ({ c = T.navy }: { c?: string }) => (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3h12v8a6 6 0 0 1-12 0V3z" />
      <path d="M7 6H5a2.5 2.5 0 0 0 0 5h2M19 6h2a2.5 2.5 0 0 1 0 5h-2" /><path d="M13 17v5M9 22h8" />
    </svg>
  ),
  TrendUp: ({ c = T.navy }: { c?: string }) => (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4,18 9,11 14,14 21,5" /><path d="M16 5h5v5" />
    </svg>
  ),
  Shield: ({ c = T.navy }: { c?: string }) => (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L4 6v6c0 5 4 9.5 9 11 5-1.5 9-6 9-11V6L13 2z" /><path d="M9 13l3 3 5-5" />
    </svg>
  ),
  Lock: ({ c = T.navy }: { c?: string }) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="12" width="18" height="13" rx="2.5" />
      <path d="M9 12V8a5 5 0 0 1 10 0v4" /><circle cx="14" cy="18" r="2" />
    </svg>
  ),
  Scale: ({ c = T.navy }: { c?: string }) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4v20M4 8l4 10M8 18H4a5 5 0 0 0 10 0H8zM24 8l-4 10M20 18h4a5 5 0 0 1-10 0h4z" />
    </svg>
  ),
  Eye: ({ c = T.navy }: { c?: string }) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 14s4-8 12-8 12 8 12 8-4 8-12 8-12-8-12-8z" /><circle cx="14" cy="14" r="3.5" />
    </svg>
  ),
  Server: ({ c = T.navy }: { c?: string }) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="22" height="6" rx="2" /><rect x="3" y="13" width="22" height="6" rx="2" />
      <circle cx="8" cy="8" r="1" /><circle cx="8" cy="16" r="1" /><path d="M3 23h22" />
    </svg>
  ),
  GradCap: ({ c = T.navy }: { c?: string }) => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8l9-4 9 4-9 4-9-4z" /><path d="M5 9.5V16a6 6 0 0 0 12 0V9.5" />
    </svg>
  ),
  Users: ({ c = T.navy }: { c?: string }) => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="7" r="3" /><path d="M2 19c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="16" cy="7" r="3" /><path d="M20 19c0-3.3-2.7-6-6-6" />
    </svg>
  ),
  Globe: ({ c = T.navy }: { c?: string }) => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round">
      <circle cx="11" cy="11" r="9" />
      <path d="M2 11h18M11 2c-2.5 3-4 5.8-4 9s1.5 6 4 9M11 2c2.5 3 4 5.8 4 9s-1.5 6-4 9" />
    </svg>
  ),
  Cpu: ({ c = T.navy }: { c?: string }) => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="10" height="10" rx="1.5" />
      <path d="M9 6V3M13 6V3M9 19v-3M13 19v-3M3 9h3M3 13h3M16 9h3M16 13h3" />
    </svg>
  ),
  Target: ({ c = T.navy }: { c?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round">
      <circle cx="10" cy="10" r="8" /><circle cx="10" cy="10" r="4.5" /><circle cx="10" cy="10" r="1.5" fill={c} stroke="none" />
    </svg>
  ),
  BookOpen: ({ c = T.navy }: { c?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2H10v16H4.5A2.5 2.5 0 0 1 2 15.5v-11z" />
      <path d="M18 15.5A2.5 2.5 0 0 1 15.5 18H10V2h5.5A2.5 2.5 0 0 1 18 4.5v11z" />
    </svg>
  ),
  Pencil: ({ c = T.navy }: { c?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.5 3.5l3 3-9 9H4.5v-3l9-9z" />
    </svg>
  ),
  Checkbadge: ({ c = T.navy }: { c?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="8" /><path d="M7 10.5l2 2.2 4-4.5" />
    </svg>
  ),
  Cert: ({ c = T.navy }: { c?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="16" height="11" rx="2" /><path d="M7 17h6M10 14v3M6 8h8M6 11h5" />
    </svg>
  ),
  Rocket: ({ c = T.navy }: { c?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2c0 0 5 3 5 9v2l-2 3H7l-2-3v-2C5 5 10 2 10 2z" /><circle cx="10" cy="9" r="2" />
      <path d="M7 16l-2 2M13 16l2 2" />
    </svg>
  ),
};

/* ═══════════════════════════════════════
   BUTTONS
═══════════════════════════════════════ */
function BtnPrimary({ label, href = "#", dark = false }: { label: string; href?: string; dark?: boolean }) {
  const [h, setH] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "0.85rem 2rem", borderRadius: 999,
        background: h ? T.amberL : T.amber,
        color: "#0a1a4a",
        fontFamily: "'Geist',sans-serif", fontSize: "0.88rem", fontWeight: 800,
        boxShadow: h ? "0 18px 48px rgba(245,166,35,0.52)" : "0 6px 24px rgba(245,166,35,0.38)",
        transform: h ? "translateY(-2px)" : "none",
        transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)",
        letterSpacing: "-0.01em",
      }}>
      {label}<Ico.Arrow c="#0a1a4a" size={15} />
    </a>
  );
}

function BtnGhost({ label, href = "#", onNavy = true, icon }: {
  label: string; href?: string; onNavy?: boolean; icon?: React.ReactNode
}) {
  const [h, setH] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "0.85rem 2rem", borderRadius: 999,
        background: h ? (onNavy ? "rgba(255,255,255,0.12)" : "rgba(11,56,176,0.07)") : "transparent",
        color: onNavy ? "white" : T.navy,
        border: `1.5px solid ${onNavy ? "rgba(255,255,255,0.28)" : "rgba(11,56,176,0.22)"}`,
        fontFamily: "'Geist',sans-serif", fontSize: "0.88rem", fontWeight: 700,
        transform: h ? "translateY(-2px)" : "none",
        transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)",
      }}>
      {icon}{label}
    </a>
  );
}

/* ═══════════════════════════════════════
   SECTION 1 — HERO (NAVY)
═══════════════════════════════════════ */
function Hero() {
  return (
    <section style={{
      background: `linear-gradient(140deg, ${T.navyD} 0%, ${T.navy} 55%, #1655d8 100%)`,
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "clamp(96px,11vw,140px) clamp(24px,5.5vw,90px) clamp(80px,9vw,120px)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Dot grid */}
      <DotGrid col="rgba(255,255,255,0.055)" size={28} />

      {/* Blob glow */}
      <div style={{
        position: "absolute", top: "-10%", right: "-8%", width: "52vw", height: "52vw",
        borderRadius: "42% 58% 62% 38% / 48% 42% 58% 52%",
        background: "radial-gradient(circle,rgba(245,166,35,0.11) 0%,transparent 70%)",
        animation: "blobPulse 12s ease-in-out infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-15%", left: "-5%", width: "35vw", height: "35vw",
        borderRadius: "50%",
        background: "radial-gradient(circle,rgba(255,255,255,0.04) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Doodles */}
      <FloatingStar style={{ top: "14%", right: "22%", opacity: 0.7 }} />
      <FloatingStar style={{ bottom: "22%", left: "8%", opacity: 0.45, animationDelay: "2s", width: 14, height: 14 }} />
      <FloatingCircle style={{ top: "18%", left: "5%", animationDelay: "1s" }} size={56} col="rgba(255,255,255,0.3)" />
      <FloatingCircle style={{ bottom: "15%", right: "10%", animationDelay: "3s" }} size={38} col={T.amber} />
      <Squiggle x={60} y={60} w={90} col="rgba(255,255,255,0.18)" opacity={1} rotate={-12} />
      <Squiggle
        x={typeof window !== "undefined" ? window.innerWidth - 180 : 1100}
        y={80} w={100} col={T.amber} opacity={0.22} rotate={8} />

      {/* Animated arc */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} fill="none">
        <path d="M 0 85% Q 30% 65% 60% 85% Q 80% 95% 100% 75%"
          stroke="rgba(245,166,35,0.12)" strokeWidth="80" fill="none" />
      </svg>

      <Inn>
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center", width: "100%",
        }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
            <Pill text="AI Ecosystem · i4i Sciences" onNavy />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.78, ease }}>
            <span style={{
              fontFamily: "'Geist',sans-serif", fontWeight: 900,
              fontSize: "clamp(2.6rem,4.8vw,4.4rem)", lineHeight: 1.06,
              letterSpacing: "-0.042em", color: "#fff", display: "block",
              textAlign: "center",
            }}>
              Time to show your talent <br/> and outshine.
              Build an AI Model. <br />Win a Scholarship.
              <br />
              <span style={{ color: T.amber, position: "relative", display: "inline-block" }}>
                Start Something Big.
                <svg viewBox="0 0 270 14" style={{ position: "absolute", bottom: -6, left: 0, width: "100%" }} fill="none">
                  <motion.path d="M2 11 Q55 4 120 11 Q185 18 230 11 Q252 6 268 11"
                    stroke={T.amber} strokeWidth="3" strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 1.1, duration: 1.1 }} />
                </svg>
              </span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}
            style={{
              fontFamily: "'Geist',sans-serif",
              fontSize: "clamp(0.8rem,0.85vw,0.86rem)", lineHeight: 1.55,
              color: T.navyText, marginTop: "3rem", marginBottom: "2.4rem",
              maxWidth: 980, marginLeft: "auto", marginRight: "auto",
              textAlign: "left",
              columns: "2 300px", columnGap: "clamp(1.5rem,3vw,3rem)",
              columnRuleWidth: "1px", columnRuleStyle: "solid",
              columnRuleColor: "rgba(255,255,255,0.12)",
            }}>
            <p style={{ margin: "0 0 0.85rem" }}>
              Your child is already curious about AI. They ask big questions, love figuring out how things work, and light up around a screen. The i4i AI Olympiad turns that curiosity into something real. Kids in elementary and middle school build their very own AI project, earn an official certificate, and the brightest young creators win scholarships.
            </p>
            <p style={{ margin: "0 0 0.85rem" }}>
              It is hands-on, it is fun, and no, your child does not need to be a coding genius to join. Curiosity is enough to start.
            </p>
            <p style={{ margin: "0 0 0.85rem" }}>
              Summer is the perfect time to dive in. While school is out, your child can learn AI, build something they are genuinely proud of, and join a community of young creators across South Asia.
            </p>
            <p style={{ margin: "0 0 0.85rem" }}>
              And it gets even better. Top students earn a short internship with our team, real experience that shines on any future school or college application.
            </p>
            <p style={{ margin: "0 0 0.85rem" }}>
              No experience needed. Just a curious kid and a little courage to try.
            </p>
            <p style={{ margin: "0 0 0.85rem", fontWeight: 600, color: "#fff" }}>
              Ready to see what your child can build this summer?
            </p>
            <p style={{ margin: 0 }}>
              Email or call us today to register, and our team will help your young creator get started
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.46 }}
            style={{
              display: "flex", gap: "0.9rem", flexWrap: "wrap",
              marginBottom: "2.6rem", justifyContent: "center",
            }}>
            <BtnPrimary label="Email Us To Register" href="/contact" />
            <BtnGhost label="Contact Us" href="/contact" onNavy  />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.64 }}
            style={{ display: "flex", gap: "1.8rem", flexWrap: "wrap", justifyContent: "center" }}>
            {["10M+ Learners", "120+ Countries", "99.9% Uptime"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Ico.Check c={T.amber} />
                <span style={{
                  fontFamily: "'Geist',sans-serif", fontSize: "0.74rem",
                  fontWeight: 600, color: T.navyText,
                }}>{t}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </Inn>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 2 — AI POWERS EVERY MODEL (WHITE)
═══════════════════════════════════════ */

function AIOlympiadIntro() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about-olympiad" ref={ref} style={{
      padding: "clamp(64px,8vw,110px) clamp(24px,5.5vw,90px)",
      background: T.white,
    }}>
      <Inn>
        {/* Heading + intro paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <h2 style={{
            fontFamily: "'Geist',sans-serif", fontWeight: 800,
            fontSize: "clamp(1.8rem,3.2vw,2.6rem)", lineHeight: 1.15,
            letterSpacing: "-0.02em", color: T.ink, marginBottom: "1.4rem",
          }}>
            The AI Olympiad: Where Young Creators Shine
          </h2>
          <p style={{
            fontFamily: "'Geist',sans-serif", fontSize: "1rem", lineHeight: 1.85,
            color: T.body, maxWidth: 820, marginBottom: "2.6rem",
          }}>
            Every kid has a spark. Some love drawing, some love building, and some cannot stop asking how computers think. The i4i AI Olympiad is for that last group, the curious ones who want to create with technology instead of just using it. It is a fun, friendly competition where elementary and middle school students learn AI, build a project of their own, and get celebrated for it. Best of all, the top young creators walk away with scholarships and a real head start on their future.
          </p>
        </motion.div>

        {/* "What Is the AI Olympiad?" card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          style={{
            borderRadius: 24, overflow: "hidden",
            background: T.white, border: `1.5px solid ${T.hair}`,
            boxShadow: "0 2px 18px rgba(11,56,176,0.06)",
            padding: "clamp(1.75rem,3.2vw,2.75rem)",
          }}
        >
          <h3 style={{
            fontFamily: "'Geist',sans-serif", fontWeight: 800,
            fontSize: "1.35rem", color: T.ink, marginBottom: "1rem",
          }}>
            What Is the AI Olympiad?
          </h3>
          <p style={{
            fontFamily: "'Geist',sans-serif", fontSize: "0.95rem",
            lineHeight: 1.85, color: T.body, maxWidth: 900,
          }}>
            The AI Olympiad is a competition built just for kids. Students learn the basics of AI and coding, then put their new skills to work by building something unique. It could be a smart little program, a simple model, or a clever idea brought to life with code. There are no boring lectures and no impossible expectations. Just kids learning, creating, and having a great time while they do it. Along the way, kids learn how AI actually works, how to think like a problem solver, and how to turn an idea into something they can show off. When they finish, every participant earns an official certificate, and the standout projects earn so much more. It is learning that feels like play, which is exactly how the best learning happens.
          </p>
        </motion.div>
      </Inn>
    </section>
  );
}


/* ═══════════════════════════════════════
   SECTION 3 — COMPETITION FORMAT (NAVY)
═══════════════════════════════════════ */

type TierDef = { IcoC: ({ c }: { c?: string }) => JSX.Element; col: string; badge: string; title: string; desc: string };

const TIERS: TierDef[] = [
  {
    IcoC: Ico.Brain, col: "#60a5fa", badge: "Tier 01",
    title: "Elementary Tier (Grades 4 and 5)",
    desc: "A gentle, exciting first step into the world of AI, built for young minds taking their first leap.",
  },
  {
    IcoC: Ico.Trophy, col: T.amber, badge: "Tier 02",
    title: "Middle School Tier (Grades 6 to 8)",
    desc: "A bigger challenge for older kids who are ready to build smarter projects and push their ideas further.",
  },
];

type StepDef = { IcoC: ({ c }: { c?: string }) => JSX.Element; col: string; num: string; title: string; desc: string };

const STEPS: StepDef[] = [
  {
    IcoC: Ico.Clipboard, col: "#60a5fa", num: "01",
    title: "Step 1: Register.",
    desc: "Sign your child up and choose their tier. It takes only a few minutes.",
  },
  {
    IcoC: Ico.Brain, col: "#34d399", num: "02",
    title: "Step 2: Learn.",
    desc: "Your child explores AI and coding through friendly, beginner-ready lessons.",
  },
  {
    IcoC: Ico.BarChart, col: "#c084fc", num: "03",
    title: "Step 3: Build.",
    desc: "They create their own unique AI project, with friendly guidance every step of the way. No child is ever left stuck or staring at a blank screen.",
  },
  {
    IcoC: Ico.Trophy, col: T.amber, num: "04",
    title: "Step 4: Submit and shine.",
    desc: "Projects are reviewed, every participant earns a certificate, and the top creators move into the winners circle.",
  },
];

function TierCard({ t, i }: { t: TierDef; i: number }) {
  const [hov, setHov] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-24px" });
  return (
    <motion.article ref={ref}
      initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.58, delay: i * 0.1, ease }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.05)",
        borderRadius: 22,
        border: `1px solid ${hov ? t.col + "55" : "rgba(255,255,255,0.1)"}`,
        padding: "1.75rem 1.75rem 2rem",
        boxShadow: hov ? `0 24px 60px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12)` : "none",
        transform: hov ? "translateY(-4px)" : "none",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
        backdropFilter: "blur(4px)",
        flex: "1 1 320px",
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.1rem" }}>
        <div style={{
          width: 48, height: 48, borderRadius: 15,
          background: `${t.col}18`, border: `1px solid ${t.col}32`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          transform: hov ? "scale(1.1) rotate(-3deg)" : "scale(1)",
          transition: "transform 0.28s",
        }}>
          <t.IcoC c={t.col} />
        </div>
        <span style={{
          fontFamily: "'Geist',sans-serif", fontSize: "0.62rem", fontWeight: 800,
          letterSpacing: "0.16em", color: t.col, textTransform: "uppercase",
        }}>{t.badge}</span>
      </div>
      <h4 style={{
        fontFamily: "'Geist',sans-serif", fontWeight: 800, fontSize: "1.08rem",
        color: "#fff", marginBottom: "0.65rem", lineHeight: 1.3,
      }}>{t.title}</h4>
      <p style={{
        fontFamily: "'Geist',sans-serif", fontSize: "1rem",
        lineHeight: 1.75, color: T.navyText,
      }}>{t.desc}</p>
      <div style={{
        height: 2, marginTop: "1.3rem", borderRadius: 999,
        background: `linear-gradient(90deg,transparent,${t.col},transparent)`,
        transform: hov ? "scaleX(1)" : "scaleX(0)", transformOrigin: "center",
        transition: "transform 0.34s cubic-bezier(0.22,1,0.36,1)",
      }} />
    </motion.article>
  );
}

function StepCard({ s, i, isLast }: { s: StepDef; i: number; isLast: boolean }) {
  const [hov, setHov] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-24px" });
  return (
    <motion.article ref={ref}
      initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.58, delay: i * 0.08, ease }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: "relative", flex: "1 1 230px" }}>
      {/* Connector line to next step (desktop only) */}
      {!isLast && (
        <div style={{
          position: "absolute", top: 24, left: "calc(50% + 34px)", right: "calc(-50% + 34px)",
          height: 1, background: `linear-gradient(90deg,${s.col}55,rgba(255,255,255,0.08))`,
          display: window.innerWidth > 900 ? "block" : "none",
        }} />
      )}
      <div style={{
        background: hov ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.05)",
        borderRadius: 20,
        border: `1px solid ${hov ? s.col + "55" : "rgba(255,255,255,0.1)"}`,
        padding: "1.4rem 1.3rem 1.55rem", height: "100%",
        boxShadow: hov ? `0 24px 60px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12)` : "none",
        transform: hov ? "translateY(-4px)" : "none",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
        backdropFilter: "blur(4px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.9rem" }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: `${s.col}18`, border: `1px solid ${s.col}32`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            transform: hov ? "scale(1.1) rotate(-3deg)" : "scale(1)",
            transition: "transform 0.28s",
          }}>
            <s.IcoC c={s.col} />
          </div>
          <span style={{
            fontFamily: "'Geist',sans-serif", fontSize: "1.4rem", fontWeight: 900,
            color: `${s.col}40`, letterSpacing: "-0.02em",
          }}>{s.num}</span>
        </div>
        <h4 style={{
          fontFamily: "'Geist',sans-serif", fontWeight: 800, fontSize: "0.92rem",
          color: "#fff", marginBottom: "0.5rem", lineHeight: 1.3,
        }}>{s.title}</h4>
        <p style={{
          fontFamily: "'Geist',sans-serif", fontSize: "0.9rem",
          lineHeight: 1.7, color: T.navyText,
        }}>{s.desc}</p>
      </div>
    </motion.article>
  );
}

function CompetitionFormatSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const tiersRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const tiersInView = useInView(tiersRef, { once: true, margin: "-40px" });
  const stepsInView = useInView(stepsRef, { once: true, margin: "-40px" });

  return (
    <section id="format" style={{
      background: `linear-gradient(160deg,${T.navyD} 0%,${T.navy} 100%)`,
      padding: "clamp(96px,11vw,144px) clamp(24px,5.5vw,90px)",
      position: "relative", overflow: "hidden",
    }}>
      <DotGrid col="rgba(255,255,255,0.045)" size={26} />
      {/* Glow orb */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: "70%", height: "40%", borderRadius: "50%",
        background: "radial-gradient(ellipse,rgba(96,165,250,0.07) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />
      <FloatingStar style={{ top: "8%", right: "8%", opacity: 0.6 }} />
      <FloatingStar style={{ bottom: "6%", left: "6%", opacity: 0.4, animationDelay: "3s" }} />
      <Squiggle x={40} y={60} w={100} col={T.amber} opacity={0.15} rotate={-8} />

      <Inn>
        {/* Page-level title for the whole section */}
        <div ref={ref} style={{ textAlign: "center", marginBottom: "clamp(56px,6.5vw,84px)" }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <Pill text="Competition Roadmap" onNavy />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            <SectionHeading onNavy>
              Your Child&apos;s Path to the <Gold>Winner&apos;s Circle</Gold>
            </SectionHeading>
          </motion.div>
        </div>

        {/* ── Subsection: Two Tiers ── */}
        <div ref={tiersRef} style={{ marginBottom: "clamp(64px,7vw,96px)" }}>
          <motion.h3
            initial={{ opacity: 0, y: 16 }} animate={tiersInView ? { opacity: 1, y: 0 } : {}}
            style={{
              fontFamily: "'Geist',sans-serif", fontWeight: 800,
              fontSize: "clamp(1.4rem,2.2vw,1.9rem)", color: "#fff",
              textAlign: "center", marginBottom: "0.9rem", letterSpacing: "-0.015em",
            }}>
            Two Tiers, One Big Opportunity
          </motion.h3>
          <motion.div initial={{ opacity: 0 }} animate={tiersInView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
            <Body onNavy center style={{ fontSize: "1rem", maxWidth: 620, margin: "0 auto clamp(36px,4vw,52px)" }}>
              We keep things fair and fun by splitting the competition into two tiers, so kids compete with others their own age.
            </Body>
          </motion.div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: "clamp(28px,3vw,40px)" }}>
            {TIERS.map((t, i) => <TierCard key={t.title} t={t} i={i} />)}
          </div>

          <motion.p
            initial={{ opacity: 0 }} animate={tiersInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
            style={{
              fontFamily: "'Geist',sans-serif", fontSize: "1rem", fontStyle: "italic",
              lineHeight: 1.75, color: T.navyText, textAlign: "center",
              maxWidth: 640, margin: "0 auto",
            }}>
            Each tier is designed to feel just right, never too easy and never overwhelming, so every child finishes proud of what they made.
          </motion.p>
        </div>

        {/* ── Subsection: How It Works ── */}
        <div ref={stepsRef}>
          <motion.h3
            initial={{ opacity: 0, y: 16 }} animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            style={{
              fontFamily: "'Geist',sans-serif", fontWeight: 800,
              fontSize: "clamp(1.4rem,2.2vw,1.9rem)", color: "#fff",
              textAlign: "center", marginBottom: "clamp(36px,4vw,52px)", letterSpacing: "-0.015em",
            }}>
            How It Works
          </motion.h3>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
            {STEPS.map((s, i) => (
              <StepCard key={s.title} s={s} i={i} isLast={i === STEPS.length - 1} />
            ))}
          </div>
        </div>
      </Inn>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 4 — PERSONALISED JOURNEY (WHITE)
═══════════════════════════════════════ */
const FLOW = [
  { label: "Enroll", desc: "AI assesses your background and goals", col: T.navy, IcoC: Ico.Target },
  { label: "Learn", desc: "A curated curriculum built around your pace", col: "#0891b2", IcoC: Ico.BookOpen },
  { label: "Practice", desc: "Adaptive exercises with real-time feedback", col: "#7c3aed", IcoC: Ico.Pencil },
  { label: "Assessment", desc: "AI-graded, bias-free, immediately actionable", col: "#d97706", IcoC: Ico.Checkbadge },
  { label: "Certification", desc: "A globally verified credential in your hands", col: "#16a34a", IcoC: Ico.Cert },
  { label: "Opportunity", desc: "Doors open — career, scholarship, next level", col: "#c05621", IcoC: Ico.Rocket },
];

function LearningJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="journey" style={{
      background: T.white,
      padding: "clamp(96px,11vw,144px) clamp(24px,5.5vw,90px)",
      position: "relative", overflow: "hidden",
    }}>
      <FloatingCircle style={{ top: "6%", left: "3%", animationDelay: "0.5s" }} size={72} col={T.navy} />
      <FloatingCircle style={{ bottom: "8%", right: "4%" }} size={48} col={T.amber} />
      <Squiggle x={200} y={40} w={80} col={T.amber} opacity={0.18} rotate={15} />

      <Inn>
        {/* ---------- Header ---------- */}
        <div style={{ textAlign: "center", marginBottom: "clamp(48px,5.5vw,68px)" }}>
          <Pill text="Personalised Journey" />
          <SectionHeading>
            Every Learner Receives <Gold>A Different Path</Gold>
          </SectionHeading>
          <Body center style={{ fontSize: "1rem", maxWidth: 540, margin: "1.2rem auto 0" }}>
            No two learners are alike. The platform builds a unique journey for every person — from first login to career-ready.
          </Body>
        </div>

        {/* ---------- Two-column split ---------- */}
        <div style={{
          display: "flex", gap: "clamp(28px,4vw,56px)",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}>

          {/* ===== LEFT: Journey flow ===== */}
          <div ref={ref} style={{
            flex: "1 1 340px", minWidth: 300, maxWidth: 420,
            position: "relative",
          }}>
            <div style={{
              fontFamily: "'Geist',sans-serif", fontWeight: 800,
              fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase",
              color: T.navy, marginBottom: 18, paddingLeft: 2,
            }}>The Journey</div>

            <div style={{
              position: "absolute", top: 46, bottom: 6, left: 19,
              width: 2,
              background: `linear-gradient(to bottom,${T.navy}20,${T.amber}60,${T.navy}14)`,
              borderRadius: 999, zIndex: 0,
            }} />

            {FLOW.map(({ label, desc, col, IcoC }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.11, ease }}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 14,
                  position: "relative", zIndex: 1,
                  marginBottom: i < FLOW.length - 1 ? 16 : 0,
                }}>
                <motion.div
                  animate={inView ? { scale: [0, 1.24, 1] } : {}}
                  transition={{ delay: i * 0.11 + 0.08, duration: 0.4 }}
                  style={{
                    width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                    background: `linear-gradient(135deg,${col},${col}bb)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 5px 16px ${col}40, 0 0 0 4px ${col}14`,
                  }}>
                  <IcoC c="white" />
                </motion.div>

                <div style={{
                  flex: 1, background: T.white, borderRadius: 14,
                  border: `1.5px solid ${col}1e`,
                  boxShadow: `0 3px 20px ${col}0e, 0 1px 5px rgba(0,0,0,0.04)`,
                  padding: "0.7rem 0.95rem",
                }}>
                  <div style={{
                    fontFamily: "'Geist',sans-serif", fontWeight: 800,
                    fontSize: "0.88rem", color: col, marginBottom: 2, lineHeight: 1.2,
                  }}>{label}</div>
                  <div style={{
                    fontFamily: "'Geist',sans-serif", fontSize: "0.88rem",
                    color: T.soft, lineHeight: 1.4,
                  }}>{desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ===== RIGHT: Rewards ===== */}
          <RewardsColumn />
        </div>
      </Inn>
    </section>
  );
}

function RewardsColumn() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} style={{ flex: "1 1 380px", minWidth: 300, position: "relative" }}>
      <div style={{
        fontFamily: "'Geist',sans-serif", fontWeight: 800,
        fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase",
        color: T.amber, marginBottom: 18, paddingLeft: 2,
      }}>What It Leads To</div>

      <div style={{
        position: "absolute", top: 46, bottom: 6, left: 23,
        width: 2,
        background: `linear-gradient(to bottom,${T.amber}55,${T.navy}30,${T.amber}55)`,
        borderRadius: 999, zIndex: 0,
      }} />

      {REWARDS.map((r, i) => (
        <motion.div key={r.title}
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: i * 0.14, ease }}
          style={{
            display: "flex", gap: 14, alignItems: "flex-start",
            position: "relative", zIndex: 1,
            marginBottom: i < REWARDS.length - 1 ? 14 : 0,
          }}>
          <motion.div
            animate={inView ? { scale: [0, 1.2, 1] } : {}}
            transition={{ delay: i * 0.14 + 0.09, duration: 0.4 }}
            style={{
              width: 46, height: 46, borderRadius: "50%", flexShrink: 0,
              background: `linear-gradient(135deg,${r.col},${r.col}bb)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 6px 18px ${r.col}45, 0 0 0 4px ${r.col}12`,
              position: "relative",
            }}>
            <r.Icon c="white" />
            <div style={{
              position: "absolute", top: -5, right: -5,
              width: 17, height: 17, borderRadius: "50%",
              background: T.white, border: `1.5px solid ${r.col}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Geist',sans-serif", fontWeight: 800,
              fontSize: "0.6rem", color: r.col,
            }}>{i + 1}</div>
          </motion.div>

          <div style={{
            flex: 1, background: T.white, borderRadius: 14,
            border: `1.5px solid ${r.col}20`,
            boxShadow: `0 3px 20px ${r.col}0e, 0 1px 5px rgba(0,0,0,0.04)`,
            padding: "0.85rem 1rem", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 8, right: 10, opacity: 0.9 }}>
              <r.Seal col={r.col} size={22} />
            </div>
            <div style={{
              fontFamily: "'Geist',sans-serif", fontWeight: 500,
              fontSize: "0.6rem", letterSpacing: "0.05em", textTransform: "uppercase",
              color: r.col, marginBottom: 3,
            }}>{r.eyebrow}</div>
            <div style={{
              fontFamily: "'Geist',sans-serif", fontWeight: 800,
              fontSize: "0.94rem", color: T.navy, marginBottom: 5, lineHeight: 1.22,
              maxWidth: "82%",
            }}>{r.title}</div>
            <div style={{
              fontFamily: "'Geist',sans-serif", fontSize: "0.82rem",
              color: T.soft, lineHeight: 1.52,
            }}>{r.text}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- Reward icons ---------- */
function IconCertificate({ c }: { c: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="9" r="6" stroke={c} strokeWidth="1.8" />
      <path d="M8.5 14L7 21l5-2.5L17 21l-1.5-7" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 9l2 2 4-4" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconScholarship({ c }: { c: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" stroke={c} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M21 8v6" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IconIntern({ c }: { c: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="8" width="17" height="12" rx="2" stroke={c} strokeWidth="1.8" />
      <path d="M8.5 8V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3.5 13h17" stroke={c} strokeWidth="1.8" />
    </svg>
  );
}

/* ---------- Signature seals ---------- */
function SealRibbon({ col, size = 28 }: { col: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none" style={{ transform: "rotate(8deg)" }}>
      <circle cx="17" cy="13" r="9" stroke={col} strokeWidth="1.4" strokeDasharray="2.5 2.5" />
      <path d="M12 20l-3 9 5-2.5L17 29l3-2.5 5 2.5-3-9" stroke={col} strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
function SealBurst({ col, size = 28 }: { col: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none">
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i}
          x1={17} y1={17}
          x2={17 + 14 * Math.cos((i * Math.PI) / 4)}
          y2={17 + 14 * Math.sin((i * Math.PI) / 4)}
          stroke={col} strokeWidth="1.4" strokeLinecap="round" opacity={0.7} />
      ))}
      <circle cx="17" cy="17" r="5.5" stroke={col} strokeWidth="1.4" fill="none" />
    </svg>
  );
}
function SealArrow({ col, size = 28 }: { col: string; size?: number }) {
  return (
    <svg width={size * 1.15} height={size * 0.7} viewBox="0 0 40 24" fill="none">
      <text x="0" y="16" fontFamily="'Geist',sans-serif" fontSize="9" fontWeight={800} fill={col}>WIN</text>
      <path d="M20 12h9" stroke={col} strokeWidth="1.6" markerEnd="url(#arrow)" />
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={col} />
        </marker>
      </defs>
      <text x="31" y="16" fontFamily="'Geist',sans-serif" fontSize="9" fontWeight={800} fill={col}>INT</text>
    </svg>
  );
}

/* ---------- Reward content — full copy, unedited ---------- */
const REWARDS = [
  {
    eyebrow: "Recognition",
    title: "Earn an Official Certificate",
    text: "Every child who takes part and builds a project earns an official i4i AI Olympiad certificate. It is more than a piece of paper. It is proof that your child learned something real, finished what they started, and built something with their own hands and ideas. For a young student, that kind of recognition is a huge confidence boost. It tells them their ideas matter and that they are capable of more than they thought. It also looks wonderful on future school and program applications, giving your child an early edge that grows with them.",
    col: T.navy,
    Icon: IconCertificate,
    Seal: SealRibbon,
  },
  {
    eyebrow: "Reward",
    title: "Win a Scholarship",
    text: "The very best projects earn something special. Our top young creators are awarded scholarships, given only to the students whose work truly stands out. These scholarships reward effort, creativity, and skill, and they show your child that hard work and big ideas really do pay off. It is our way of investing in the brilliant young minds who are shaping what comes next. A scholarship is not just a prize. It is a vote of confidence in your child and the future they are building, one project at a time.",
    col: T.amber,
    Icon: IconScholarship,
    Seal: SealBurst,
  },
  {
    eyebrow: "Opportunity",
    title: "From Winner to Intern",
    text: "Here is where it gets exciting. Scholarship winners also earn the chance to join our team as a short-term intern. This is a brief, supervised, and age-appropriate experience, not a permanent job, designed to give standout students a real taste of how technology works in the real world. They learn, they explore, they meet people who build technology for a living, and they walk away with a story and an experience most kids their age never get.",
    col: T.navy,
    Icon: IconIntern,
    Seal: SealArrow,
  },
];
/* ═══════════════════════════════════════
   SECTION 5 — WHY FAMILIES LOVE IT + FAQ + REGISTER (NAVY)
═══════════════════════════════════════ */
const FAQS = [
  {
    q: "What age can my child enter?",
    a: "The AI Olympiad welcomes elementary students in grades 4 and 5 and middle school students in grades 6 to 8.",
  },
  {
    q: "Does my child need coding experience?",
    a: "Not at all. We teach everything from the ground up, and beginners are not only welcome, they thrive here.",
  },
  {
    q: "What will my child actually build?",
    a: "Each student creates their own simple AI project or model, guided by friendly lessons that match their age and skill level.",
  },
  {
    q: "How does the scholarship work?",
    a: "Scholarships go only to the top projects, chosen for creativity, effort, and skill. Winners also unlock the short internship experience.",
  },
  {
    q: "Still have questions?",
    a: "Just email or call us and we will happily walk you through it.",
  },
];

function IconChevron({ c, open }: { c: string; open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.28s ease" }}>
      <path d="M6 9l6 6 6-6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconMail({ c }: { c: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke={c} strokeWidth="1.8" />
      <path d="M4 7l8 6 8-6" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconPhone({ c }: { c: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2 2C10.5 19 5 13.5 5 7a2 2 0 0 1 1-4z"
        stroke={c} strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function AccordionItem({ item, open, onToggle }: { item: typeof FAQS[0]; open: boolean; onToggle: () => void }) {
  return (
    <div style={{
      background: open ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
      border: `1px solid ${open ? "rgba(245,166,35,0.35)" : "rgba(255,255,255,0.1)"}`,
      borderRadius: 14, overflow: "hidden", transition: "background 0.25s, border-color 0.25s",
    }}>
      <button onClick={onToggle} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 16, padding: "1.05rem 1.3rem", background: "transparent", border: "none",
        cursor: "pointer", textAlign: "left",
      }}>
        <span style={{
          fontFamily: "'Geist',sans-serif", fontWeight: 700, fontSize: "0.94rem",
          color: open ? T.amber : "#fff",
        }}>{item.q}</span>
        <span style={{
          flexShrink: 0, width: 26, height: 26, borderRadius: "50%",
          background: open ? T.amber : "rgba(255,255,255,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <IconChevron c={open ? "#0a1a4a" : T.navyText} open={open} />
        </span>
      </button>
      <motion.div
        animate={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        initial={false}
        transition={{ duration: 0.32, ease }}
        style={{ display: "grid" }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{
            padding: "0 1.3rem 1.15rem", fontFamily: "'Geist',sans-serif",
            fontSize: "0.85rem", lineHeight: 1.62, color: T.navyText,
          }}>{item.a}</div>
        </div>
      </motion.div>
    </div>
  );
}

function WhyFamiliesFAQRegisterSection() {
  const [openFAQ, setOpenFAQ] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="why-families" style={{
      background: `linear-gradient(160deg,${T.navy} 0%,${T.navyD} 100%)`,
      padding: "clamp(96px,11vw,144px) clamp(24px,5.5vw,90px)",
      position: "relative", overflow: "hidden",
    }}>
      <DotGrid col="rgba(255,255,255,0.04)" size={22} />
      <FloatingStar style={{ top: "12%", left: "10%", opacity: 0.5 }} />
      <FloatingStar style={{ bottom: "14%", right: "8%", opacity: 0.4, animationDelay: "2.5s" }} />
      <FloatingCircle style={{ bottom: "10%", left: "5%" }} size={60} col="rgba(255,255,255,0.18)" />

      <Inn>
        <div ref={ref}>

          {/* ===== ACT 1 — Why families love it ===== */}
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(64px,7vw,96px)" }}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
              <Pill text="Why Families Love the AI Olympiad" onNavy />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
              <SectionHeading onNavy>
                A Creator, <Gold>Not Just a Watcher</Gold>
              </SectionHeading>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.22 }}>
              <Body onNavy center style={{ maxWidth: 620, margin: "1.3rem auto 0", fontSize: "1rem", lineHeight: 1.75 }}>
                In a world racing toward AI, this is a chance for your child to be a creator, not just a watcher. They build real skills, gain real confidence, and join a friendly community of young creators across South Asia. Summer break is the perfect time to start, while school is out, schedules are light, and curiosity is wide open. It is the kind of summer project that pays off for years.
              </Body>
            </motion.div>
          </div>

          {/* ===== ACT 2 — FAQ accordion ===== */}
          <div style={{
            display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 48,
            alignItems: "start", marginBottom: "clamp(64px,7vw,96px)",
          }}>
            <motion.div
              initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 }}
              style={{ position: "sticky", top: 100 }}>
              <div style={{
                fontFamily: "'Geist',sans-serif", fontSize: "0.62rem", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase", color: T.amber, marginBottom: 10,
              }}>FAQ</div>
              <div style={{ fontFamily: "'Geist',sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#fff", lineHeight: 1.25 }}>
                Questions Parents<br />Often Ask
              </div>
              <Body onNavy style={{ marginTop: 14, fontSize: "0.86rem", maxWidth: 320 }}>
                Everything we're asked before a family signs up — answered straight, no fine print.
              </Body>
            </motion.div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {FAQS.map((item, i) => (
                <motion.div key={item.q}
                  initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.07 }}>
                  <AccordionItem item={item} open={openFAQ === i} onToggle={() => setOpenFAQ(openFAQ === i ? -1 : i)} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* ===== ACT 3 — Register CTA ===== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            style={{
              background: `linear-gradient(120deg,${T.amber} 0%,#f5b94a 100%)`,
              borderRadius: 28, padding: "clamp(40px,5vw,60px) clamp(32px,5vw,64px)",
              display: "flex", flexWrap: "wrap", gap: 32,
              alignItems: "center", justifyContent: "space-between",
              boxShadow: "0 24px 70px rgba(245,166,35,0.28)",
              position: "relative", overflow: "hidden",
            }}>
            <Squiggle x={40} y={20} w={70} col="#0a1a4a" opacity={0.1} rotate={-10} />

            <div style={{ flex: "1 1 340px", position: "relative", zIndex: 1 }}>
              <div style={{
                fontFamily: "'Geist',sans-serif", fontWeight: 800, fontSize: "1.7rem",
                color: "#0a1a4a", marginBottom: 10, lineHeight: 1.15,
              }}>Register Today</div>
              <div style={{
                fontFamily: "'Geist',sans-serif", fontSize: "0.92rem", color: "#0a1a4a",
                lineHeight: 1.65, maxWidth: 480, opacity: 0.88, marginBottom: 8,
              }}>
                Give your child a summer they will remember and skills they will keep for life. Spots fill up fast, so do not wait.
              </div>
              <div style={{
                fontFamily: "'Geist',sans-serif", fontSize: "0.92rem", color: "#0a1a4a",
                lineHeight: 1.65, maxWidth: 480, opacity: 0.88,
              }}>
                Email or call us today to register your young creator, and our team will guide you through every step.
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "relative", zIndex: 1, flexShrink: 0 }}>
              <a href="mailto:hello@i4isciences.com" style={{
                display: "flex", alignItems: "center", gap: 9, textDecoration: "none",
                background: "#0a1a4a", color: "#fff",
                padding: "0.85rem 1.6rem", borderRadius: 999,
                fontFamily: "'Geist',sans-serif", fontWeight: 700, fontSize: "0.88rem",
                boxShadow: "0 8px 24px rgba(10,26,74,0.3)", whiteSpace: "nowrap",
              }}>
                <IconMail c="#fff" /> Email Us to Register
              </a>
              <a href="/contact" style={{
                display: "flex", alignItems: "center", gap: 9, textDecoration: "none",
                background: "transparent", color: "#0a1a4a",
                padding: "0.85rem 1.6rem", borderRadius: 999,
                border: "1.5px solid #0a1a4a",
                fontFamily: "'Geist',sans-serif", fontWeight: 700, fontSize: "0.88rem",
                whiteSpace: "nowrap",
              }}>
                <IconPhone c="#0a1a4a" /> Call Us to Learn More
              </a>
            </div>
          </motion.div>

        </div>
      </Inn>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 6 — GLOBAL (WHITE)
═══════════════════════════════════════ */
const PINS = [
  { label: "USA", cx: 82, cy: 80, col: T.navy },
  { label: "Canada", cx: 86, cy: 68, col: "#0891b2" },
  { label: "India", cx: 258, cy: 88, col: T.amber },
  { label: "UK", cx: 202, cy: 62, col: "#7c3aed" },
  { label: "S. Africa", cx: 220, cy: 116, col: "#16a34a" },
  { label: "Australia", cx: 296, cy: 118, col: "#c05621" },
  { label: "Mid. East", cx: 238, cy: 80, col: "#e11d48" },
];
const HUB = { cx: 82, cy: 80 };

function GlobalSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="global" style={{
      background: T.white,
      padding: "clamp(96px,11vw,144px) clamp(24px,5.5vw,90px)",
      position: "relative", overflow: "hidden",
    }}>
      <FloatingCircle style={{ top: "8%", right: "5%" }} size={60} col={T.amber} />
      <FloatingStar style={{ bottom: "10%", left: "3%", animationDelay: "1.8s" }} />
      <Squiggle x={50} y={80} w={80} col={T.navy} opacity={0.09} rotate={5} />

      <Inn>
        <div style={{ textAlign: "center", marginBottom: "clamp(52px,6vw,78px)" }}>
          <Pill text="Global Intelligence" />
          <SectionHeading>
            One Platform. <Gold>Every Continent.</Gold>
          </SectionHeading>
          <Body center style={{ maxWidth: 540, margin: "1.2rem auto 0" }}>
            One ecosystem serving learners, teachers, and families across multiple regions — with AI that understands local context.
          </Body>
        </div>

        <div
  ref={ref}
  style={{
    borderRadius: 28,
    overflow: "hidden",
    background: T.cream,
    border: `1.5px solid ${T.hair}`,
    boxShadow: "0 8px 48px rgba(11,56,176,0.07)",
    position: "relative",
  }}
>
  <motion.img
    src="/images/aiworldmap.png"
    alt="Global AI Education Network"
    initial={{ opacity: 0, scale: 1.04 }}
    animate={inView ? { opacity: 1, scale: 1 } : {}}
    transition={{ duration: 1 }}
    style={{
      width: "100%",
      height: "auto",
      display: "block",
    }}
  />

  <div
    style={{
      position: "absolute",
      bottom: 18,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        background: "rgba(255,255,255,0.96)",
        borderRadius: 999,
        padding: "0.62rem 1.8rem",
        boxShadow: "0 4px 20px rgba(11,56,176,0.1)",
        fontFamily: "'Geist',sans-serif",
        fontSize: "0.78rem",
        fontWeight: 700,
        color: T.ink,
        border: `1px solid ${T.hair}`,
        whiteSpace: "nowrap",
      }}
    >
      Active in 120+ countries · 10M+ potential learners · 15+ languages
    </div>
  </div>
</div>

          <div style={{ position: "absolute", bottom: 18, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
            <div style={{
              background: "rgba(255,255,255,0.96)", borderRadius: 999,
              padding: "0.62rem 1.8rem",
              boxShadow: "0 4px 20px rgba(11,56,176,0.1)",
              fontFamily: "'Geist',sans-serif", fontSize: "0.78rem",
              fontWeight: 700, color: T.ink,
              border: `1px solid ${T.hair}`, whiteSpace: "nowrap",
            }}>
              Active in 120+ countries · 10M+ potential learners · 15+ languages
            </div>
          </div>
      </Inn>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 7 — RESPONSIBLE AI (NAVY)
═══════════════════════════════════════ */
const TRUST = [
  { IcoC: Ico.Lock, col: "#60a5fa", title: "Privacy First", desc: "Student data is never sold, shared, or used for advertising. FERPA, COPPA, and GDPR compliant by design — not as an afterthought." },
  { IcoC: Ico.Scale, col: "#fb923c", title: "Fairness Built In", desc: "Matching and evaluation algorithms are independently audited for bias across race, language, and socioeconomic background." },
  { IcoC: Ico.Eye, col: "#4ade80", title: "Transparent Decisions", desc: "Every AI recommendation includes an explanation. No black boxes. Educators remain in control of every final decision." },
  { IcoC: Ico.Server, col: "#c084fc", title: "Enterprise Security", desc: "End-to-end encryption, SOC 2 Type II compliance, and continuous penetration testing keep the platform safe at all times." },
];

function ResponsibleAI() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section id="trust" style={{
      background: `linear-gradient(145deg,${T.navyD} 0%,${T.navy} 60%,#1a52d4 100%)`,
      padding: "clamp(96px,11vw,144px) clamp(24px,5.5vw,90px)",
      position: "relative", overflow: "hidden",
    }}>
      <DotGrid col="rgba(255,255,255,0.04)" size={24} />
      <FloatingStar style={{ top: "10%", right: "12%", opacity: 0.55 }} />
      <FloatingStar style={{ bottom: "8%", left: "8%", opacity: 0.38, animationDelay: "1.5s" }} />
      <FloatingCircle style={{ top: "20%", left: "3%" }} size={80} col="rgba(255,255,255,0.15)" />
      {/* Squiggle accent */}
      <svg style={{ position: "absolute", top: 50, right: "6%", pointerEvents: "none" }} width="90" height="38" fill="none">
        <path d="M4 28 Q22 8 44 28 Q66 48 86 28" stroke={T.amber} strokeWidth="2.2" strokeOpacity="0.22" strokeLinecap="round" />
      </svg>

      <Inn>
        <div ref={ref} style={{ textAlign: "center", marginBottom: "clamp(52px,6vw,78px)" }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <Pill text="Responsible AI" onNavy />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            <SectionHeading onNavy>
              Built With <Gold>Trust in Mind</Gold>
            </SectionHeading>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.22 }}>
            <Body onNavy center style={{ maxWidth: 520, margin: "1.2rem auto 0" }}>
              AI in education carries enormous responsibility. Every decision, every data point, every output is held to a higher standard.
            </Body>
          </motion.div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22 }}>
          {TRUST.map(({ IcoC, col, title, desc }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.58, delay: i * 0.1, ease }}
              style={{
                background: "rgba(255,255,255,0.055)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 22, padding: "2rem 1.6rem",
                textAlign: "center",
                backdropFilter: "blur(4px)",
              }}>
              <div style={{
                width: 58, height: 58, borderRadius: 18,
                background: `${col}1e`, border: `1px solid ${col}32`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.1rem",
              }}>
                <IcoC c={col} />
              </div>
              <h3 style={{
                fontFamily: "'Geist',sans-serif", fontWeight: 800, fontSize: "1rem",
                color: "#fff", marginBottom: "0.55rem",
              }}>{title}</h3>
              <p style={{ fontFamily: "'Geist',sans-serif", fontSize: "0.77rem", lineHeight: 1.74, color: T.navyText }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </Inn>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 8 — IMPACT NUMBERS (WHITE)
═══════════════════════════════════════ */
function useCount(target: number, dur = 1900, active = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const e2 = 1 - Math.pow(1 - p, 3);
      setV(Math.floor(e2 * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, dur]);
  return v;
}

const STATS = [
  { n: 10, suf: "M+", label: "Potential Learners", col: T.navy },
  { n: 500, suf: "K+", label: "Concurrent Users", col: "#0891b2" },
  { n: 120, suf: "+", label: "Countries Reached", col: "#7c3aed" },
  { n: 247, suf: "+", label: "Certified Educators", col: "#16a34a" },
  { n: 99, suf: ".9%", label: "Platform Reliability", col: "#c05621" },
];

function MetricCard({ s, i, active }: { s: typeof STATS[0]; i: number; active: boolean }) {
  const count = useCount(s.n, 1900, active);
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.58, delay: i * 0.1 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        textAlign: "center", padding: "2rem 1.4rem",
        background: hov ? `${s.col}08` : T.white,
        borderRadius: 22, border: `1.5px solid ${hov ? s.col + "30" : T.hair}`,
        boxShadow: hov ? `0 16px 48px ${s.col}14` : "0 2px 14px rgba(11,56,176,0.05)",
        transform: hov ? "translateY(-5px)" : "none",
        transition: "all 0.28s cubic-bezier(0.22,1,0.36,1)",
      }}>
      <div style={{
        width: 46, height: 46, borderRadius: 14,
        background: `${s.col}10`, border: `1px solid ${s.col}22`,
        margin: "0 auto 1rem", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ width: 16, height: 16, borderRadius: "50%", background: s.col, opacity: 0.7 }} />
      </div>
      <div style={{
        fontFamily: "'Geist',sans-serif", fontWeight: 900,
        fontSize: "clamp(2.2rem,2.8vw,3rem)", lineHeight: 1,
        color: s.col, letterSpacing: "-0.04em", marginBottom: "0.45rem",
      }}>
        {count}{s.suf}
      </div>
      <div style={{
        fontFamily: "'Geist',sans-serif", fontSize: "0.74rem",
        fontWeight: 600, color: T.soft, letterSpacing: "0.03em",
      }}>{s.label}</div>
    </motion.div>
  );
}

function ImpactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>, { once: true, margin: "-60px" });
  return (
    <section ref={ref} style={{
      background: T.white,
      padding: "clamp(96px,11vw,128px) clamp(24px,5.5vw,90px)",
      position: "relative", overflow: "hidden",
    }}>
      <FloatingCircle style={{ top: "10%", left: "2%" }} size={70} col={T.navy} />
      <FloatingCircle style={{ bottom: "6%", right: "3%", animationDelay: "2s" }} size={52} col={T.amber} />
      <Squiggle x={120} y={50} w={70} col={T.amber} opacity={0.14} rotate={-5} />

      <Inn>
        <div style={{ textAlign: "center", marginBottom: "clamp(48px,6vw,70px)" }}>
          <Pill text="Impact at Scale" />
          <SectionHeading>
            Numbers That Tell<br /><Gold>The Real Story</Gold>
          </SectionHeading>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 20 }}>
          {STATS.map((s, i) => <MetricCard key={s.label} s={s} i={i} active={inView} />)}
        </div>
      </Inn>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 9 — FUTURE (NAVY)
═══════════════════════════════════════ */
function FutureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="future" style={{
      background: `linear-gradient(150deg,${T.navy} 0%,${T.navyD} 50%,#1040c0 100%)`,
      padding: "clamp(96px,11vw,144px) clamp(24px,5.5vw,90px)",
      position: "relative", overflow: "hidden",
    }}>
      <DotGrid col="rgba(255,255,255,0.04)" size={25} />
      <FloatingStar style={{ top: "12%", right: "8%", opacity: 0.55 }} />
      <FloatingStar style={{ bottom: "16%", left: "6%", opacity: 0.38, animationDelay: "2.8s" }} />
      <FloatingCircle style={{ top: "25%", right: "3%" }} size={80} col="rgba(255,255,255,0.14)" />
      <Squiggle x={40} y={50} w={100} col={T.amber} opacity={0.16} rotate={-6} />

      <Inn>
        <div ref={ref} style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(44px,5.5vw,80px)", alignItems: "center",
        }}>
          {/* LEFT — image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.72, ease }}>
            <div style={{
              borderRadius: 26, overflow: "hidden", position: "relative",
              boxShadow: "0 24px 80px rgba(0,0,0,0.36)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <img src="/images/ais9.png" alt="Education Without Barriers"
                style={{ width: "100%", height: "auto", display: "block" }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg,rgba(11,56,176,0.18) 0%,transparent 60%)",
              }} />
            </div>
          </motion.div>

          {/* RIGHT — content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.72, ease, delay: 0.1 }}>
            <Pill text="The Future We're Building" onNavy />
            <SectionHeading onNavy align="left">
              Education Without Barriers.<br />
              <Gold>Learning Without Limits.</Gold>
            </SectionHeading>
            {/* Doodle underline */}
            <svg viewBox="0 0 240 12" style={{ width: 240, display: "block", marginTop: 8, marginBottom: 0 }} fill="none">
              <motion.path d="M2 9 Q48 3 110 9 Q172 15 220 9 Q234 5 238 9"
                stroke={T.amber} strokeWidth="2.5" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                transition={{ delay: 0.6, duration: 1 }} />
            </svg>

            <p style={{
              fontFamily: "'Geist',sans-serif", fontSize: "0.98rem",
              lineHeight: 1.88, color: T.navyText,
              margin: "1.3rem 0 1.9rem",
            }}>
              Creating a future where every learner, teacher, and family has access
              to opportunity — regardless of language, location, income, or background.
            </p>

            {[
              { IcoC: Ico.GradCap, t: "A teacher in rural India certified and reaching students worldwide" },
              { IcoC: Ico.Users, t: "A student in Lagos matched with the perfect tutor in seconds" },
              { IcoC: Ico.Globe, t: "An immigrant family navigating US schools with real confidence" },
              { IcoC: Ico.Trophy, t: "A Grade 5 student winning an international AI competition" },
            ].map(({ IcoC, t }) => (
              <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10,
                  background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.16)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: 1,
                }}>
                  <IcoC c="rgba(255,255,255,0.8)" />
                </div>
                <span style={{
                  fontFamily: "'Geist',sans-serif", fontSize: "0.87rem",
                  color: T.navyText, lineHeight: 1.58,
                }}>{t}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </Inn>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 10 — FINAL CTA (WHITE → big amber moment)
═══════════════════════════════════════ */
function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>, { once: true, margin: "-60px" });
  return (
    <section ref={ref} style={{
      background: T.white,
      padding: "clamp(110px,13vw,176px) clamp(24px,5.5vw,90px)",
      position: "relative", overflow: "hidden", textAlign: "center",
    }}>
      {/* Big amber blob backdrop */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "60vw", height: "60vw", maxWidth: 800, maxHeight: 800,
        borderRadius: "50%",
        background: "radial-gradient(ellipse,rgba(245,166,35,0.07) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />
      <FloatingCircle style={{ top: "10%", left: "6%" }} size={72} col={T.amber} />
      <FloatingCircle style={{ bottom: "8%", right: "5%", animationDelay: "1.8s" }} size={56} col={T.navy} />
      <FloatingStar style={{ top: "18%", right: "12%", opacity: 0.5 }} />
      <FloatingStar style={{ bottom: "20%", left: "12%", opacity: 0.38, animationDelay: "3.5s" }} />
      <Squiggle x={80} y={60} w={90} col={T.amber} opacity={0.16} rotate={-10} />
      <Squiggle
        x={typeof window !== "undefined" ? window.innerWidth - 200 : 1100}
        y={80} w={80} col={T.navy} opacity={0.1} rotate={12} />

      <Inn max={720}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <Pill text="Get Started Today" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "'Geist',sans-serif", fontWeight: 900,
            fontSize: "clamp(2.2rem,4.4vw,4rem)", lineHeight: 1.08,
            letterSpacing: "-0.042em", color: T.ink, marginBottom: "1.1rem",
          }}>
          Experience the Intelligence<br />
          <span style={{ color: T.amber }}>Behind Modern Education.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: "'Geist',sans-serif", fontSize: "1rem", lineHeight: 1.86,
            color: T.body, maxWidth: 520, margin: "0 auto 2.6rem",
          }}>
          Join the platform where AI works quietly behind every learning experience —
          making teachers better, students more confident, and families more supported.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          style={{ display: "flex", gap: "0.9rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          <BtnPrimary label="Explore the Ecosystem" href="#" />
          <BtnGhost label="Book Enterprise Demo" href="#" onNavy={false} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.48 }}
          style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
          {["No credit card required", "Free 30-day trial", "Cancel anytime"].map(t => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Ico.Check c={T.navy} />
              <span style={{
                fontFamily: "'Geist',sans-serif", fontSize: "0.75rem",
                fontWeight: 500, color: T.soft,
              }}>{t}</span>
            </div>
          ))}
        </motion.div>
      </Inn>
    </section>
  );
}

/* ═══════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════ */
export default function AIEcosystemPage() {
  return (
    <>
      <style>{G}</style>
      <div className="site-logo-sticky">
  <img
    src="/images/ailogo-removebg-preview.png"   
    alt="AI Ecosystem"
    className="site-logo-image"
  />
</div>
      <main>
        {/* 1. NAVY   */ }<Hero />
        {/* 2. WHITE  */ }<AIOlympiadIntro />
        {/* 3. NAVY   */ }<CompetitionFormatSection />
        {/* 4. WHITE  */ }<LearningJourney />
        {/* 5. NAVY   */ }<WhyFamiliesFAQRegisterSection />
        {/* 6. WHITE  */ }<GlobalSection />
        {/* 7. NAVY   */ }<ResponsibleAI />
        {/* 8. WHITE  */ }<ImpactSection />
        {/* 9. NAVY   */ }<FutureSection />
        {/* 10. WHITE */ }<FinalCTA />
      </main>
    </>
  );
}