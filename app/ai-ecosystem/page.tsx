"use client";
import { useState, useRef, useEffect } from "react";
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
   GLOBAL CSS
═══════════════════════════════════════ */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Geist',sans-serif;background:#fff;color:#10204e;-webkit-font-smoothing:antialiased}
::selection{background:rgba(245,166,35,0.22)}
img{display:block;max-width:100%;border:none;outline:none}
a{text-decoration:none}
button{font-family:'Geist',sans-serif;cursor:pointer;border:none;background:none;padding:0}
@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes shimmer{0%{opacity:0.5}50%{opacity:1}100%{opacity:0.5}}
@keyframes drift{0%,100%{transform:translate(0,0) rotate(0deg)}33%{transform:translate(6px,-8px) rotate(2deg)}66%{transform:translate(-4px,4px) rotate(-1deg)}}
@keyframes drawLine{from{stroke-dashoffset:800}to{stroke-dashoffset:0}}
@keyframes blobPulse{0%,100%{border-radius:42% 58% 62% 38% / 48% 42% 58% 52%}33%{border-radius:58% 42% 38% 62% / 52% 58% 42% 48%}66%{border-radius:46% 54% 54% 46% / 56% 44% 56% 44%}}
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
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(44px,5vw,80px)", alignItems: "center",
        }}>
          {/* LEFT */}
          <div>
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
              }}>
                AI That Makes<br />
                Learning{" "}
                <span style={{ color: T.amber, position: "relative", display: "inline-block" }}>
                  More Human.
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

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}
              style={{
                fontFamily: "'Geist',sans-serif",
                fontSize: "clamp(0.9rem,1.1vw,1rem)", lineHeight: 1.9,
                color: T.navyText, maxWidth: 460, marginTop: "1.7rem", marginBottom: "2.4rem",
              }}>
              Behind every recommendation, every tutor match,<br />
              every learning journey, and every certification,<br />
              our AI ecosystem works quietly to create<br />
              better educational outcomes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.46 }}
              style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap", marginBottom: "2.6rem" }}>
              <BtnPrimary label="Explore AI Systems" href="#engines" />
              <BtnGhost label="See Platform Demo" href="#demo" onNavy icon={<Ico.Play c="rgba(255,255,255,0.8)" />} />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.64 }}
              style={{ display: "flex", gap: "1.8rem", flexWrap: "wrap" }}>
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

          {/* RIGHT — image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.14 }}
            style={{ position: "relative" }}>
            {/* Decorative ring behind image */}
            <div style={{
              position: "absolute", inset: -18, borderRadius: 38,
              border: "1.5px dashed rgba(245,166,35,0.28)",
              pointerEvents: "none",
            }} />
            <div style={{
              borderRadius: 28, overflow: "hidden",
              boxShadow: "0 32px 100px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)",
              position: "relative",
            }}>
              <img src="/images/aiecosystem.png" alt="AI Ecosystem"
                style={{ width: "100%", height: "auto", display: "block" }} />
              {/* Shimmer overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg,rgba(255,255,255,0.05) 0%,transparent 50%,rgba(11,56,176,0.1) 100%)",
              }} />
            </div>
           
          </motion.div>
        </div>
      </Inn>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 2 — AI POWERS EVERY MODEL (WHITE)
═══════════════════════════════════════ */
const ECOS = [
  {
    id: "TTT", label: "Teach the Teacher", col: T.navy, IcoC: Ico.GradCap,
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=540&q=85&fit=crop",
    lines: ["AI certification scoring", "AI teaching feedback", "AI career guidance"],
  },
  {
    id: "OCT", label: "OneCent Tutors", col: "#0891b2", IcoC: Ico.Users,
    img: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=540&q=85&fit=crop",
    lines: ["AI tutor matching", "AI smart scheduling", "AI quality scoring"],
  },
  {
    id: "IPST", label: "Immigrant Parent Support", col: "#16a34a", IcoC: Ico.Globe,
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=540&q=85&fit=crop",
    lines: ["AI language assistance", "AI adaptation guidance", "AI support planning"],
  },
  {
    id: "AI", label: "AI Competitions", col: "#7c3aed", IcoC: Ico.Cpu,
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=540&q=85&fit=crop",
    lines: ["AI project evaluation", "AI feedback engine", "AI scholarship matching"],
  },
];

function EcoCard({ e, i }: { e: typeof ECOS[0]; i: number }) {
  const [hov, setHov] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.article ref={ref}
      initial={{ opacity: 0, y: 48 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 24, overflow: "hidden", background: T.white,
        border: `1.5px solid ${hov ? e.col + "44" : T.hair}`,
        boxShadow: hov
          ? `0 32px 80px ${e.col}1a, 0 4px 18px rgba(0,0,0,0.07)`
          : "0 2px 18px rgba(11,56,176,0.06)",
        transform: hov ? "translateY(-6px)" : "none",
        transition: "all 0.32s cubic-bezier(0.22,1,0.36,1)",
      }}>
      {/* Image with colour overlay */}
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        <img src={e.img} alt={e.label} style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: hov ? "scale(1.07)" : "scale(1)",
          transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(160deg,${e.col}cc 0%,${e.col}66 50%,transparent 100%)`,
        }} />
        {/* ID badge */}
        <div style={{
          position: "absolute", top: 14, left: 14,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 11,
            background: "rgba(255,255,255,0.2)",
            border: "1px solid rgba(255,255,255,0.42)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <e.IcoC c="white" />
          </div>
          <span style={{
            fontFamily: "'Geist',sans-serif", fontSize: "0.58rem", fontWeight: 800,
            letterSpacing: "0.16em", color: "rgba(255,255,255,0.95)", textTransform: "uppercase",
          }}>{e.id}</span>
        </div>
      </div>
      {/* Body */}
      <div style={{ padding: "1.25rem 1.5rem 1.6rem" }}>
        <h3 style={{
          fontFamily: "'Geist',sans-serif", fontWeight: 800, fontSize: "1rem",
          color: T.ink, marginBottom: "1rem", lineHeight: 1.25,
        }}>{e.label}</h3>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {e.lines.map(l => (
            <li key={l} style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span style={{
                width: 22, height: 22, borderRadius: 7,
                background: `${e.col}10`, border: `1px solid ${e.col}26`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Ico.Chev c={e.col} size={10} />
              </span>
              <span style={{ fontFamily: "'Geist',sans-serif", fontSize: "0.78rem", color: T.body, lineHeight: 1.4 }}>{l}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Bottom colour bar */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg,transparent,${e.col},transparent)`,
        transform: hov ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "center",
        transition: "transform 0.38s cubic-bezier(0.22,1,0.36,1)",
      }} />
    </motion.article>
  );
}

function AIPowersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section style={{
      background: T.white,
      padding: "clamp(96px,11vw,144px) clamp(24px,5.5vw,90px)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Corner doodle arcs */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} fill="none">
        <path d="M -20 180 Q 150 80 350 180 Q 500 260 700 180" stroke={T.amber} strokeWidth="1.6" strokeOpacity="0.1" strokeLinecap="round" />
        <path d="M 85% 30% Q 88% 22% 92% 30%" stroke={T.navy} strokeWidth="2" strokeOpacity="0.08" strokeLinecap="round" />
      </svg>
      <FloatingCircle style={{ top: "8%", right: "6%" }} size={64} col={T.amber} />
      <FloatingStar style={{ bottom: "12%", left: "4%", animationDelay: "1.5s" }} />

      <Inn>
        <div ref={ref} style={{ textAlign: "center", marginBottom: "clamp(52px,6vw,80px)" }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <Pill text="AI Powers Everything" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            <SectionHeading>
              One Ecosystem.<br /><Gold>Many Intelligent Experiences.</Gold>
            </SectionHeading>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.22 }}>
            <Body center style={{ maxWidth: 540, margin: "1.2rem auto 0" }}>
              AI isn't a separate product. It's the invisible layer that makes every interaction smarter, faster, and more personal.
            </Body>
          </motion.div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
          {ECOS.map((e, i) => <EcoCard key={e.id} e={e} i={i} />)}
        </div>
      </Inn>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 3 — CORE AI ENGINES (NAVY)
═══════════════════════════════════════ */
type EngDef = { IcoC: ({ c }: { c?: string }) => JSX.Element; col: string; title: string; desc: string; Chart: () => JSX.Element }

const ENGINES: EngDef[] = [
  {
    IcoC: Ico.Brain, col: "#60a5fa", title: "Recommendation Engine",
    desc: "Recommends courses, skills, certifications, and personalised learning pathways.",
    Chart: () => (
      <svg viewBox="0 0 110 52" fill="none" style={{ width: "100%", height: 52 }}>
        <polyline points="4,46 18,30 36,16 54,24 74,8 98,18"
          stroke="#60a5fa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="4,46 18,30 36,16 54,24 74,8 98,18"
          stroke="#60a5fa" strokeWidth="14" strokeOpacity="0.08" strokeLinecap="round" strokeLinejoin="round" />
        {([4, 18, 36, 54, 74, 98] as number[]).map((x, i) => {
          const ys = [46, 30, 16, 24, 8, 18];
          return <circle key={i} cx={x} cy={ys[i]} r={i === 5 ? 5 : 3.5} fill={i === 5 ? T.amber : "#60a5fa"} fillOpacity={i === 5 ? 1 : 0.4 + i * 0.1} />;
        })}
      </svg>
    ),
  },
  {
    IcoC: Ico.Link, col: "#34d399", title: "Tutor Matching Engine",
    desc: "Matches learners with the right educator by subject, pace, and learning style.",
    Chart: () => (
      <svg viewBox="0 0 110 52" fill="none" style={{ width: "100%", height: 52 }}>
        <circle cx="26" cy="26" r="18" stroke="#34d399" strokeWidth="1.2" strokeDasharray="4 3" strokeOpacity="0.4" />
        <circle cx="84" cy="26" r="18" stroke={T.amber} strokeWidth="1.2" strokeDasharray="4 3" strokeOpacity="0.4" />
        <circle cx="26" cy="20" r="6" stroke="#34d399" strokeWidth="1.2" />
        <path d="M17 37 Q17 29 26 29 Q35 29 35 37" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="84" cy="20" r="6" stroke={T.amber} strokeWidth="1.2" />
        <path d="M75 37 Q75 29 84 29 Q93 29 93 37" stroke={T.amber} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="46" y1="26" x2="64" y2="26" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" />
        <circle cx="55" cy="26" r="4.5" fill="rgba(255,255,255,0.1)" />
        <circle cx="55" cy="26" r="2.2" fill="rgba(255,255,255,0.7)" />
      </svg>
    ),
  },
  {
    IcoC: Ico.BarChart, col: "#c084fc", title: "Learning Analytics",
    desc: "Identifies strengths and growth opportunities with real-time progress intelligence.",
    Chart: () => (
      <svg viewBox="0 0 110 52" fill="none" style={{ width: "100%", height: 52 }}>
        {([{ x: 7, h: 36 }, { x: 25, h: 22 }, { x: 43, h: 46 }, { x: 61, h: 28 }, { x: 79, h: 50 }, { x: 97, h: 16 }]).map(({ x, h }, i) => (
          <g key={i}>
            <rect x={x - 7} y={52 - h} width="14" height={h} rx="4" fill="#c084fc" fillOpacity={0.12 + i * 0.06} />
            <rect x={x - 7} y={52 - h} width="14" height="4" rx="2" fill="#c084fc" fillOpacity={0.7 + i * 0.04} />
          </g>
        ))}
        <line x1="0" y1="50" x2="110" y2="50" stroke="#c084fc" strokeWidth="1" strokeOpacity="0.3" />
      </svg>
    ),
  },
  {
    IcoC: Ico.Clipboard, col: T.amber, title: "Teacher Evaluation",
    desc: "Supports fair, evidence-based certification decisions for educators globally.",
    Chart: () => (
      <svg viewBox="0 0 110 52" fill="none" style={{ width: "100%", height: 52 }}>
        <rect x="10" y="4" width="90" height="46" rx="7" fill="rgba(245,166,35,0.06)" stroke={T.amber} strokeWidth="1.2" strokeDasharray="4 3" />
        {(["A+", "96%", "✓ Pass"] as string[]).map((t, i) => (
          <g key={i}>
            <rect x="20" y={14 + i * 12} width={40 + i * 14} height="8" rx="4" fill={T.amber} fillOpacity={0.2 + i * 0.1} />
            <text x="96" y={21 + i * 12} textAnchor="end" fontFamily="'Geist',sans-serif" fontSize="8" fontWeight="700" fill={T.amber}>{t}</text>
          </g>
        ))}
      </svg>
    ),
  },
  {
    IcoC: Ico.Wave, col: "#38bdf8", title: "Accent Analysis",
    desc: "Supports communication readiness and clarity for diverse global classrooms.",
    Chart: () => (
      <svg viewBox="0 0 110 52" fill="none" style={{ width: "100%", height: 52 }}>
        {([9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99] as number[]).map((x, i) => {
          const hs = [10, 26, 18, 36, 28, 44, 20, 32, 12, 40, 8];
          return <line key={i} x1={x} y1={26 - hs[i] / 2} x2={x} y2={26 + hs[i] / 2}
            stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" strokeOpacity={0.3 + Math.abs(Math.sin(i)) * 0.5} />;
        })}
        <path d="M 9 26 Q 55 8 102 26" stroke={T.amber} strokeWidth="1.3" fill="none" strokeDasharray="4 3" strokeOpacity="0.65" />
      </svg>
    ),
  },
  {
    IcoC: Ico.Trophy, col: "#4ade80", title: "AI Olympiad Evaluation",
    desc: "Rapidly and fairly evaluates competition submissions and student projects.",
    Chart: () => (
      <svg viewBox="0 0 110 52" fill="none" style={{ width: "100%", height: 52 }}>
        <rect x="16" y="4" width="78" height="46" rx="6" fill="rgba(74,222,128,0.06)" stroke="#4ade80" strokeWidth="1.2" />
        {([{ y: 16, w: 50, s: "94" }, { y: 28, w: 42, s: "88" }, { y: 40, w: 58, s: "91" }]).map(({ y, w, s }, i) => (
          <g key={i}>
            <circle cx="27" cy={y - 2} r="4" fill="#4ade80" fillOpacity={0.85 - i * 0.25} />
            <rect x="36" y={y - 7} width={w} height="9" rx="4.5" fill="#4ade80" fillOpacity={0.15 + i * 0.06} />
            <text x="90" y={y + 2} textAnchor="end" fontFamily="'Geist',sans-serif" fontSize="8" fontWeight="700" fill="#4ade80">{s}</text>
          </g>
        ))}
      </svg>
    ),
  },
  {
    IcoC: Ico.TrendUp, col: "#fb923c", title: "Predictive Success Engine",
    desc: "Forecasts learning outcomes and surfaces at-risk learners early.",
    Chart: () => (
      <svg viewBox="0 0 110 52" fill="none" style={{ width: "100%", height: 52 }}>
        <path d="M 6 48 C 22 42 36 34 54 22 S 84 5 104 3"
          stroke="#fb923c" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        <path d="M 6 48 C 22 42 36 34 54 22 S 84 5 104 3 L104 52 L6 52 Z" fill="#fb923c" fillOpacity="0.09" />
        <circle cx="104" cy="3" r="6" fill="#fb923c" fillOpacity="0.2" />
        <circle cx="104" cy="3" r="3.5" fill="#fb923c" />
      </svg>
    ),
  },
  {
    IcoC: Ico.Shield, col: "#60a5fa", title: "Integrity & Fraud Detection",
    desc: "Protects assessments and certifications with AI-powered anomaly detection.",
    Chart: () => (
      <svg viewBox="0 0 110 52" fill="none" style={{ width: "100%", height: 52 }}>
        <path d="M 55 4 L 96 16 L 96 32 C 96 44 76 51 55 54 C 34 51 14 44 14 32 L 14 16 Z"
          fill="rgba(96,165,250,0.08)" stroke="#60a5fa" strokeWidth="1.2" />
        <path d="M 38 27 L 49 38 L 72 18" stroke="#60a5fa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="88" cy="12" r="7" fill="#4ade80" />
        <path d="M85 12l2 2 4.5-4" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function EngCard({ e, i }: { e: EngDef; i: number }) {
  const [hov, setHov] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-24px" });
  return (
    <motion.article ref={ref}
      initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.58, delay: i * 0.07, ease }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.05)",
        borderRadius: 20,
        border: `1px solid ${hov ? e.col + "55" : "rgba(255,255,255,0.1)"}`,
        padding: "1.4rem 1.4rem 1.55rem",
        boxShadow: hov ? `0 24px 60px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12)` : "none",
        transform: hov ? "translateY(-4px)" : "none",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
        backdropFilter: "blur(4px)",
      }}>
      <div style={{
        width: 44, height: 44, borderRadius: 14,
        background: `${e.col}18`, border: `1px solid ${e.col}32`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "0.9rem",
        transform: hov ? "scale(1.1) rotate(-3deg)" : "scale(1)",
        transition: "transform 0.28s",
      }}>
        <e.IcoC c={e.col} />
      </div>
      <div style={{
        marginBottom: "0.85rem", borderRadius: 10,
        background: "rgba(255,255,255,0.04)",
        padding: "7px 3px", overflow: "hidden",
      }}>
        <e.Chart />
      </div>
      <h3 style={{
        fontFamily: "'Geist',sans-serif", fontWeight: 800, fontSize: "0.9rem",
        color: "#fff", marginBottom: "0.44rem", lineHeight: 1.25,
      }}>{e.title}</h3>
      <p style={{
        fontFamily: "'Geist',sans-serif", fontSize: "0.76rem",
        lineHeight: 1.66, color: T.navyText,
      }}>{e.desc}</p>
      <div style={{
        height: 2, marginTop: "1.1rem", borderRadius: 999,
        background: `linear-gradient(90deg,transparent,${e.col},transparent)`,
        transform: hov ? "scaleX(1)" : "scaleX(0)", transformOrigin: "center",
        transition: "transform 0.34s cubic-bezier(0.22,1,0.36,1)",
      }} />
    </motion.article>
  );
}

function AIEnginesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section id="engines" style={{
      background: `linear-gradient(160deg,${T.navyD} 0%,${T.navy} 100%)`,
      padding: "clamp(96px,11vw,144px) clamp(24px,5.5vw,90px)",
      position: "relative", overflow: "hidden",
    }}>
      <DotGrid col="rgba(255,255,255,0.045)" size={26} />
      {/* Glow orb */}
      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)",
        width: "70%", height: "40%", borderRadius: "50%",
        background: "radial-gradient(ellipse,rgba(96,165,250,0.07) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />
      <FloatingStar style={{ top: "8%", right: "8%", opacity: 0.6 }} />
      <FloatingStar style={{ bottom: "6%", left: "6%", opacity: 0.4, animationDelay: "3s" }} />
      <Squiggle x={40} y={60} w={100} col={T.amber} opacity={0.15} rotate={-8} />

      <Inn>
        <div ref={ref} style={{ textAlign: "center", marginBottom: "clamp(52px,6vw,78px)" }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <Pill text="Core AI Engines" onNavy />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            <SectionHeading onNavy>
              The Intelligence <Gold>Behind the Platform</Gold>
            </SectionHeading>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.22 }}>
            <Body onNavy center style={{ maxWidth: 540, margin: "1.2rem auto 0" }}>
              Eight purpose-built systems working in concert — so educators, learners, and families can focus on what matters.
            </Body>
          </motion.div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
          {ENGINES.map((e, i) => <EngCard key={e.title} e={e} i={i} />)}
        </div>
      </Inn>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 4 — PERSONALISED JOURNEY (WHITE)
═══════════════════════════════════════ */
const STEPS = [
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
        <div style={{ textAlign: "center", marginBottom: "clamp(52px,6vw,78px)" }}>
          <Pill text="Personalised Journey" />
          <SectionHeading>
            Every Learner Receives <Gold>A Different Path</Gold>
          </SectionHeading>
          <Body center style={{ maxWidth: 540, margin: "1.2rem auto 0" }}>
            No two learners are alike. The platform builds a unique journey for every person — from first login to career-ready.
          </Body>
        </div>

        <div ref={ref} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Spine */}
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: "50%",
            transform: "translateX(-50%)", width: 2,
            background: `linear-gradient(to bottom,${T.navy}20,${T.amber}60,${T.navy}14)`,
            borderRadius: 999, zIndex: 0,
          }} />

          {STEPS.map(({ label, desc, col, IcoC }, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div key={label}
                initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.62, delay: i * 0.13, ease }}
                style={{
                  display: "flex", flexDirection: isLeft ? "row" : "row-reverse",
                  alignItems: "center", width: "100%",
                  marginBottom: i < STEPS.length - 1 ? 12 : 0,
                  position: "relative", zIndex: 1,
                }}>
                {/* Card */}
                <div style={{
                  flex: 1, display: "flex",
                  justifyContent: isLeft ? "flex-end" : "flex-start",
                  paddingRight: isLeft ? 44 : 0, paddingLeft: isLeft ? 0 : 44,
                }}>
                  <div style={{
                    background: T.white, borderRadius: 18,
                    border: `1.5px solid ${col}1e`,
                    boxShadow: `0 4px 28px ${col}0e, 0 1px 6px rgba(0,0,0,0.04)`,
                    padding: "1.1rem 1.4rem",
                    minWidth: 226, maxWidth: 288,
                    display: "flex", alignItems: "center", gap: 14,
                  }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 12,
                      background: `${col}10`, border: `1.5px solid ${col}22`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <IcoC c={col} />
                    </div>
                    <div>
                      <div style={{
                        fontFamily: "'Geist',sans-serif", fontWeight: 800,
                        fontSize: "0.97rem", color: col, marginBottom: 3, lineHeight: 1.2,
                      }}>{label}</div>
                      <div style={{
                        fontFamily: "'Geist',sans-serif", fontSize: "0.72rem",
                        color: T.soft, lineHeight: 1.44,
                      }}>{desc}</div>
                    </div>
                  </div>
                </div>
                {/* Node */}
                <motion.div
                  animate={inView ? { scale: [0, 1.24, 1] } : {}}
                  transition={{ delay: i * 0.13 + 0.09, duration: 0.42 }}
                  style={{
                    width: 42, height: 42, borderRadius: "50%",
                    background: `linear-gradient(135deg,${col},${col}bb)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, zIndex: 2,
                    boxShadow: `0 6px 20px ${col}40, 0 0 0 4px ${col}14`,
                  }}>
                  <IcoC c="white" />
                </motion.div>
                <div style={{ flex: 1 }} />
              </motion.div>
            );
          })}
        </div>
      </Inn>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 5 — LIVE AI IN ACTION (NAVY)
═══════════════════════════════════════ */
const SCENARIOS = [
  {
    role: "Student", need: "Finding the right math tutor",
    steps: ["Analyses 18 months of learning history", "Scans 2,400+ active tutor profiles", "Ranks by style compatibility & availability"],
    result: "Matched in 30 seconds", resultCol: "#4ade80",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=560&q=85&fit=crop",
  },
  {
    role: "Teacher", need: "Seeking global certification",
    steps: ["Reviews teaching portfolio & feedback", "Analyses 47 pedagogical skill indicators", "Generates a personalised certification pathway"],
    result: "Certification pathway generated", resultCol: "#60a5fa",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=560&q=85&fit=crop",
  },
  {
    role: "Immigrant Parent", need: "Understanding the US school system",
    steps: ["Detects primary language and home country", "Scans district and school-level databases", "Builds a step-by-step local resource plan"],
    result: "Personalised support plan ready", resultCol: T.amber,
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=560&q=85&fit=crop",
  },
];

function LiveAISection() {
  const [active, setActive] = useState(0);
  const s = SCENARIOS[active];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section id="demo" style={{
      background: `linear-gradient(160deg,${T.navy} 0%,${T.navyD} 100%)`,
      padding: "clamp(96px,11vw,144px) clamp(24px,5.5vw,90px)",
      position: "relative", overflow: "hidden",
    }}>
      <DotGrid col="rgba(255,255,255,0.04)" size={22} />
      <FloatingStar style={{ top: "12%", left: "10%", opacity: 0.5 }} />
      <FloatingStar style={{ bottom: "14%", right: "8%", opacity: 0.4, animationDelay: "2.5s" }} />
      <FloatingCircle style={{ bottom: "10%", left: "5%" }} size={60} col="rgba(255,255,255,0.18)" />

      <Inn>
        <div ref={ref} style={{ textAlign: "center", marginBottom: "clamp(48px,5.5vw,72px)" }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <Pill text="Live AI in Action" onNavy />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            <SectionHeading onNavy>
              See What the AI <Gold>Actually Does</Gold>
            </SectionHeading>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.22 }}>
            <Body onNavy center style={{ maxWidth: 520, margin: "1.2rem auto 0" }}>
              Real scenarios, real outcomes. Not theory — this is how the platform operates every single day.
            </Body>
          </motion.div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 44, flexWrap: "wrap" }}>
          {SCENARIOS.map((sc, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              padding: "0.62rem 1.5rem", borderRadius: 999,
              background: i === active ? T.amber : "rgba(255,255,255,0.08)",
              color: i === active ? "#0a1a4a" : T.navyText,
              border: `1.5px solid ${i === active ? T.amber : "rgba(255,255,255,0.14)"}`,
              fontFamily: "'Geist',sans-serif", fontSize: "0.82rem", fontWeight: 700,
              transition: "all 0.22s",
              boxShadow: i === active ? "0 6px 22px rgba(245,166,35,0.38)" : "none",
            }}>{sc.role}</button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.36 }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Need */}
              <div style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 16, padding: "1.3rem 1.5rem",
              }}>
                <div style={{
                  fontFamily: "'Geist',sans-serif", fontSize: "0.58rem", fontWeight: 700,
                  letterSpacing: "0.14em", textTransform: "uppercase", color: T.navyTextD, marginBottom: 5,
                }}>{s.role}</div>
                <div style={{ fontFamily: "'Geist',sans-serif", fontWeight: 800, fontSize: "1.05rem", color: "#fff" }}>{s.need}</div>
              </div>
              {/* AI steps */}
              <div style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16, padding: "1.3rem 1.5rem",
              }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 7,
                  marginBottom: 14,
                  fontFamily: "'Geist',sans-serif", fontSize: "0.58rem",
                  fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.amber,
                }}>
                  <Ico.Brain c={T.amber} /> AI Processing
                </div>
                {s.steps.map((step, i) => (
                  <motion.div key={step}
                    initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.05 }}
                    style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 2 ? 10 : 0 }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: "50%",
                      background: T.amber, color: "#0a1a4a",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.62rem", fontWeight: 800, flexShrink: 0,
                    }}>{i + 1}</div>
                    <span style={{ fontFamily: "'Geist',sans-serif", fontSize: "0.81rem", color: T.navyText }}>{step}</span>
                  </motion.div>
                ))}
              </div>
              {/* Result */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.44 }}
                style={{
                  background: s.resultCol, borderRadius: 14,
                  padding: "1rem 1.4rem",
                  display: "flex", alignItems: "center", gap: 10,
                  boxShadow: `0 8px 28px ${s.resultCol}44`,
                }}>
                <Ico.Check c={s.resultCol === T.amber ? "#0a1a4a" : "white"} />
                <span style={{
                  fontFamily: "'Geist',sans-serif", fontWeight: 800, fontSize: "0.96rem",
                  color: s.resultCol === T.amber ? "#0a1a4a" : "white",
                }}>{s.result}</span>
              </motion.div>
            </div>
            {/* Photo */}
            <div style={{
              borderRadius: 24, overflow: "hidden",
              boxShadow: "0 24px 80px rgba(0,0,0,0.38)",
              position: "relative",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              <img src={s.img} alt={s.role}
                style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top,rgba(11,56,176,0.6) 0%,transparent 60%)",
              }} />
              <div style={{
                position: "absolute", bottom: 18, left: 18,
                fontFamily: "'Geist',sans-serif", fontWeight: 700, fontSize: "0.82rem",
                color: "rgba(255,255,255,0.8)",
              }}>{s.role}</div>
            </div>
          </motion.div>
        </AnimatePresence>
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
      <main>
        {/* 1. NAVY   */ }<Hero />
        {/* 2. WHITE  */ }<AIPowersSection />
        {/* 3. NAVY   */ }<AIEnginesSection />
        {/* 4. WHITE  */ }<LearningJourney />
        {/* 5. NAVY   */ }<LiveAISection />
        {/* 6. WHITE  */ }<GlobalSection />
        {/* 7. NAVY   */ }<ResponsibleAI />
        {/* 8. WHITE  */ }<ImpactSection />
        {/* 9. NAVY   */ }<FutureSection />
        {/* 10. WHITE */ }<FinalCTA />
      </main>
    </>
  );
}