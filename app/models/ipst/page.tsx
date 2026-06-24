"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────────
function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeIn({
  children,
  delay = 0,
  x = 0,
  y = 32,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `translate(${x}px,${y}px)`,
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
// ─── GOLD CURVY TEXT ─────────────────────────────────────────────────────────────
const G = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontFamily: "'Caveat', 'Pacifico', cursive", color: "#F5A623", fontWeight: 700 }}>
    {children}
  </span>
);

// ─── CUSTOM ICONS ────────────────────────────────────────────────────────────────
const IcoLang = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="15" stroke="#0A2E8A" strokeWidth="1.8" fill="none" />
    <ellipse cx="18" cy="18" rx="6" ry="15" stroke="#0A2E8A" strokeWidth="1.4" fill="none" />
    <line x1="3" y1="18" x2="33" y2="18" stroke="#0A2E8A" strokeWidth="1.3" />
    <line x1="5" y1="11" x2="31" y2="11" stroke="#0A2E8A" strokeWidth="1" />
    <line x1="5" y1="25" x2="31" y2="25" stroke="#0A2E8A" strokeWidth="1" />
  </svg>
);
const IcoSchool = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="4" y="17" width="28" height="16" rx="2" fill="none" stroke="#0A2E8A" strokeWidth="1.8" />
    <polygon points="2,17 18,5 34,17" fill="none" stroke="#0A2E8A" strokeWidth="1.8" />
    <rect x="14" y="24" width="8" height="9" rx="1" fill="#0A2E8A" />
    <rect x="7" y="20" width="6" height="5" rx="1" fill="none" stroke="#0A2E8A" strokeWidth="1" />
    <rect x="23" y="20" width="6" height="5" rx="1" fill="none" stroke="#0A2E8A" strokeWidth="1" />
  </svg>
);
const IcoCulture = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="14" stroke="#0A2E8A" strokeWidth="1.8" fill="none" />
    <circle cx="12" cy="15" r="4" stroke="#0A2E8A" strokeWidth="1.4" fill="none" />
    <circle cx="24" cy="15" r="4" stroke="#0A2E8A" strokeWidth="1.4" fill="none" />
    <path d="M8 27 Q18 20 28 27" stroke="#0A2E8A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
  </svg>
);
const IcoAcademic = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="6" y="7" width="24" height="26" rx="3" fill="none" stroke="#0A2E8A" strokeWidth="1.8" />
    <line x1="11" y1="14" x2="25" y2="14" stroke="#0A2E8A" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="11" y1="19" x2="25" y2="19" stroke="#0A2E8A" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="11" y1="24" x2="19" y2="24" stroke="#0A2E8A" strokeWidth="1.4" strokeLinecap="round" />
    <polygon points="18,3 22,8 14,8" fill="#F5A623" />
  </svg>
);
const IcoComm = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="2" y="5" width="22" height="15" rx="4" fill="none" stroke="#0A2E8A" strokeWidth="1.8" />
    <path d="M6 20 L2 28 L14 20" fill="none" stroke="#0A2E8A" strokeWidth="1.4" />
    <rect x="14" y="16" width="20" height="14" rx="3" fill="none" stroke="#0A2E8A" strokeWidth="1.8" />
    <path d="M30 30 L34 36 L24 30" fill="none" stroke="#0A2E8A" strokeWidth="1.4" />
    <circle cx="21" cy="23" r="1.5" fill="#0A2E8A" />
    <circle cx="25" cy="23" r="1.5" fill="#0A2E8A" />
    <circle cx="29" cy="23" r="1.5" fill="#0A2E8A" />
  </svg>
);
const IcoSupport = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="14" stroke="#0A2E8A" strokeWidth="1.8" fill="none" />
    <path d="M12 18 C12 14 16 11 18 14 C20 11 24 14 24 18 C24 22 18 26 18 26 C18 26 12 22 12 18Z"
      stroke="#0A2E8A" strokeWidth="1.6" fill="none" />
  </svg>
);
const IcoCheck = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="10" fill="#BFD9B8" />
    <polyline points="6,11 10,15 17,8" stroke="#0A2E8A" strokeWidth="2" fill="none"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IcoStar = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <polygon points="8,1 10,6 15,6 11,10 13,15 8,12 3,15 5,10 1,6 6,6" fill="#F5A623" />
  </svg>
);
const IcoPin = () => (
  <svg width="24" height="30" viewBox="0 0 24 30" fill="none">
    <circle cx="12" cy="11" r="9" fill="#F5A623" stroke="#0A2E8A" strokeWidth="1.8" />
    <circle cx="12" cy="11" r="4" fill="#0A2E8A" />
    <line x1="12" y1="20" x2="12" y2="30" stroke="#0A2E8A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IcoArrow = ({ dir = "down", color = "#0A2E8A" }: { dir?: string; color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    {dir === "down" && <polyline points="6,8 12,16 18,8" stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
    {dir === "right" && <polyline points="8,6 16,12 8,18" stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
  </svg>
);

// ─── TORN PAPER DIVIDER ──────────────────────────────────────────────────────────
const TornDivider = ({ topColor, bottomColor, flip = false }: { topColor: string; bottomColor: string; flip?: boolean }) => (
  <div style={{ position: "relative", height: 64, overflow: "hidden", zIndex: 2 }}>
    <div style={{ position: "absolute", inset: 0, background: topColor }} />
    <svg
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      style={{
        position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%",
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    >
      <path
        d="M0,64 L0,32 C60,28 80,45 140,38 C200,31 220,18 280,24 C340,30 360,46 420,40 C480,34 500,20 560,26 C620,32 640,48 700,42 C760,36 780,22 840,28 C900,34 920,50 980,44 C1040,38 1060,24 1120,30 C1180,36 1200,52 1260,46 C1320,40 1340,26 1400,32 L1440,36 L1440,64 Z"
        fill={bottomColor}
      />
    </svg>
  </div>
);

// ─── ZIGZAG DIVIDER ──────────────────────────────────────────────────────────────
const ZigZagDivider = ({ topColor, bottomColor }: { topColor: string; bottomColor: string }) => (
  <div style={{ position: "relative", height: 40, overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, background: topColor }} />
    <svg viewBox="0 0 1440 40" preserveAspectRatio="none"
      style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%" }}>
      <path d="M0,40 L0,20 L60,0 L120,20 L180,0 L240,20 L300,0 L360,20 L420,0 L480,20 L540,0 L600,20 L660,0 L720,20 L780,0 L840,20 L900,0 L960,20 L1020,0 L1080,20 L1140,0 L1200,20 L1260,0 L1320,20 L1380,0 L1440,20 L1440,40 Z"
        fill={bottomColor} />
    </svg>
  </div>
);

// ─── WAVE DIVIDER ────────────────────────────────────────────────────────────────
const WaveDivider = ({ topColor, bottomColor }: { topColor: string; bottomColor: string }) => (
  <div style={{ position: "relative", height: 80, overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, background: topColor }} />
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none"
      style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%" }}>
      <path d="M0,80 L0,40 C180,10 360,70 540,40 C720,10 900,70 1080,40 C1260,10 1380,60 1440,50 L1440,80 Z"
        fill={bottomColor} />
    </svg>
  </div>
);

// ─── FAQ ITEM ────────────────────────────────────────────────────────────────────
function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  const colors = ["#DCEAF8","#BFD9B8","#FDE6D2","#DCEAF8","#BFD9B8","#FDE6D2"];
  return (
    <div style={{
      borderRadius: 20, overflow: "hidden",
      border: `2px solid ${open ? "#0A2E8A" : "rgba(10,46,138,0.12)"}`,
      background: open ? colors[i % colors.length] : "#fff",
      transition: "all 0.3s",
      marginBottom: 12,
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "18px 24px",
        background: "none", border: "none", cursor: "pointer", gap: 16, textAlign: "left",
      }}>
        <span style={{ fontWeight: 700, color: "#0A2E8A", fontSize: 15, lineHeight: 1.4 }}>{q}</span>
        <span style={{
          width: 28, height: 28, borderRadius: "50%",
          background: "#0A2E8A", display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, transform: open ? "rotate(180deg)" : "none",
          transition: "transform 0.3s",
        }}>
          <IcoArrow dir="down" color="#fff" />
        </span>
      </button>
      {open && (
        <div style={{ padding: "0 24px 20px", color: "#3B4A6B", fontSize: 14, lineHeight: 1.75 }}>
          {a}
        </div>
      )}
    </div>
  );
}

// ─── DATA ────────────────────────────────────────────────────────────────────────
const challenges = [
  { icon: <IcoLang />, title: "Language Barriers", desc: "Navigating forms, reports, and conversations in an unfamiliar language is exhausting before a single school door opens.", number: "01" },
  { icon: <IcoSchool />, title: "School Enrollment", desc: "Every country runs its own rules, deadlines, and documents. Knowing where to even start feels impossible.", number: "02" },
  { icon: <IcoCulture />, title: "Cultural Differences", desc: "Classrooms and social norms that feel foreign require time, guidance, and patience to understand.", number: "03" },
  { icon: <IcoAcademic />, title: "Academic Pressure", desc: "Different grading systems and teaching styles create intense pressure on students from their very first day.", number: "04" },
  { icon: <IcoComm />, title: "Parent Communication", desc: "Staying engaged with teachers when language and cultural distance feel enormous is an invisible daily challenge.", number: "05" },
  { icon: <IcoSupport />, title: "Finding Support", desc: "Knowing which organizations help, who to ask, and where community exists is the missing piece families need.", number: "06" },
];

const parentSteps = [
  { title: "Understanding School Systems", desc: "Learn how local education is structured — grade levels, institutions, and how decisions get made." },
  { title: "Communication Skills", desc: "Build real confidence speaking with teachers, administrators, school boards, and other parents." },
  { title: "Parent Engagement", desc: "Discover how to participate actively in your child's school life and the events that shape it." },
  { title: "Supporting Learning at Home", desc: "Create the right environment and daily routines to reinforce what your child learns." },
  { title: "Future Planning", desc: "Explore academic pathways, scholarships, and long-term opportunities for your child's future." },
];

const studentSteps = [
  { title: "School Readiness", desc: "Prepare for day one — supplies, schedules, expectations, and how to ask for help." },
  { title: "Language Support", desc: "Build vocabulary, reading, and speaking confidence tailored to school and daily life." },
  { title: "Study Skills", desc: "Learn how to take notes, organize time, and approach tests with real strategy." },
  { title: "Confidence Building", desc: "Develop the self-belief to participate, raise your hand, and make your voice heard." },
  { title: "Academic Success", desc: "Reach your potential with personalized tools, mentorship, and a community behind you." },
];

const langs = [
  { code: "EN", name: "English", phrase: "Welcome Home!", bg: "#0A2E8A", text: "#fff" },
  { code: "ES", name: "Español", phrase: "¡Bienvenidos!", bg: "#F5A623", text: "#fff" },
  { code: "FR", name: "Français", phrase: "Bienvenue!", bg: "#2A6B3A", text: "#fff" },
  { code: "AR", name: "العربية", phrase: "أهلاً وسهلاً!", bg: "#BFD9B8", text: "#0A2E8A" },
  { code: "HI", name: "हिंदी", phrase: "स्वागत है!", bg: "#FDE6D2", text: "#C4712A" },
  { code: "ZH", name: "中文", phrase: "欢迎回家!", bg: "#DCEAF8", text: "#0A2E8A" },
];

const stories = [
  { name: "Maria S.", role: "Parent — Colombian Family", story: "When we arrived I understood nothing about how the school system worked. IPST gave me a mentor who spoke Spanish and walked me through every single step. Today my daughter is on the honor roll.", bg: "#DCEAF8", rot: "-1.5deg" },
  { name: "Tariq A.", role: "Student — Syrian Family", story: "In my first week I was afraid to speak in class. IPST gave me language tools and a study partner. I went from completely silent to presenting in front of the class in just three months.", bg: "#BFD9B8", rot: "1.2deg" },
  { name: "The Nguyen Family", role: "Vietnamese Family — Canada", story: "As a family we were lost. IPST helped all of us — our children found a study group and we joined parent workshops. It became our community. We are no longer alone.", bg: "#FDE6D2", rot: "-0.8deg" },
];

const faqs = [
  { q: "Is IPST free to use?", a: "IPST offers both free and premium resources. Core guides, community access, and many language tools are free. Premium programs — mentorship and personalized learning paths — are available through family plans." },
  { q: "My family does not speak English. Can we still use IPST?", a: "Absolutely. IPST supports six languages: English, Spanish, French, Arabic, Hindi, and Mandarin. All core resources are available in every language, and multilingual mentors are throughout our network." },
  { q: "How does the mentorship program work?", a: "You are matched with a mentor based on your home country, language, and your child's age group. Mentors are trained immigrants who navigated the same system. Sessions happen online at times that suit your schedule." },
  { q: "My child is already enrolled. Is it too late?", a: "Never too late. IPST supports families at every stage — whether your child just arrived or has been enrolled for two years but is struggling. We meet you exactly where you are." },
  { q: "How do I access the Family Dashboard?", a: "The Family Dashboard is launching very soon. Every registered family gets direct access the moment it opens. Sign up now to be first through the door." },
  { q: "Are parent programs suitable for working parents?", a: "Yes. All parent modules are self-paced and mobile-first, so you can learn during commutes, lunch breaks, or any free moment you find." },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function IPSTPage() {
  const [activeLang, setActiveLang] = useState(langs[0]);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  return (
    <main style={{ fontFamily: "'Geist','Geist Sans',sans-serif", overflowX: "hidden", background: "#FDFAF5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Geist:wght@300;400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .btn-blue{background:#0A2E8A;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-family:inherit;transition:all 0.2s;display:inline-block}
        .btn-blue:hover{background:#081f63;transform:translateY(-2px);box-shadow:0 8px 24px rgba(10,46,138,0.28)}
        .btn-gold{background:#F5A623;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-family:inherit;transition:all 0.2s;display:inline-block}
        .btn-gold:hover{background:#d9901a;transform:translateY(-2px);box-shadow:0 8px 24px rgba(245,166,35,0.35)}
        .btn-outline{background:transparent;color:#0A2E8A;border:2px solid #0A2E8A;border-radius:8px;font-weight:700;cursor:pointer;font-family:inherit;transition:all 0.2s;display:inline-block}
        .btn-outline:hover{background:#0A2E8A;color:#fff;transform:translateY(-2px)}
        .challenge-tile:hover{transform:translateY(-5px) rotate(0.3deg);box-shadow:0 18px 48px rgba(10,46,138,0.12)!important}
        .challenge-tile{transition:transform 0.25s ease,box-shadow 0.25s ease}
        .lang-btn{transition:all 0.2s ease;cursor:pointer}
        .lang-btn:hover{transform:scale(1.04)}
        .story-card-slide{transition:all 0.4s cubic-bezier(0.16,1,0.3,1)}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes slowspin{to{transform:rotate(360deg)}}
        @keyframes slowspinrev{to{transform:rotate(-360deg)}}
        @keyframes pulsering{0%,100%{transform:scale(1);opacity:0.6}50%{transform:scale(1.06);opacity:0.9}}
        @keyframes writeline{from{stroke-dashoffset:600}to{stroke-dashoffset:0}}
        @keyframes bounceDot{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}
        .float-anim{animation:float 6s ease-in-out infinite}
        .spin-anim{animation:slowspin 70s linear infinite}
        .spinrev-anim{animation:slowspinrev 45s linear infinite}
        .pulse-anim{animation:pulsering 3s ease-in-out infinite}
        .bounce-dot{animation:bounceDot 2s ease-in-out infinite}
        @media(prefers-reduced-motion:reduce){.float-anim,.spin-anim,.spinrev-anim,.pulse-anim,.bounce-dot{animation:none}}
        @media(max-width:768px){
          .hero-grid{grid-template-columns:1fr!important}
          .two-col{grid-template-columns:1fr!important}
          .three-col{grid-template-columns:1fr!important}
          .stat-grid{grid-template-columns:1fr 1fr!important}
        }
      `}</style>

{/* ══════════════════════════════════════════════════════
  §1 — HERO  (Header & Footer Compatible)
══════════════════════════════════════════════════════ */}
<section style={{ 
position: "relative", 
background: "#0A2E8A", 
overflow: "hidden", 
minHeight: "100vh", 
display: "flex", 
alignItems: "center",
paddingTop: "100px",           // ← Safe space for fixed header
zIndex: 1,
fontFamily: "Geist, system-ui, sans-serif"
}}>

{/* Background Elements */}
<svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }} aria-hidden="true">
  <defs>
    <pattern id="heroDoodles" x="0" y="0" width="110" height="110" patternUnits="userSpaceOnUse">
      <circle cx="22" cy="25" r="2" fill="#F5A623" />
      <circle cx="85" cy="78" r="1.5" fill="#BFD9B8" />
      <path d="M15 85 Q35 65 55 82" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M70 18 Q88 38 102 22" fill="none" stroke="#F5A623" strokeWidth="1" strokeLinecap="round"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#heroDoodles)" />
</svg>

<div style={{ 
  position: "absolute", 
  top: "-30%", 
  right: "-20%", 
  width: "65vmax", 
  height: "65vmax", 
  borderRadius: "40% 60% 35% 65%", 
  background: "radial-gradient(circle at 60% 40%, rgba(245,166,35,0.18) 0%, transparent 65%)", 
  pointerEvents: "none"
}} />

<div style={{ 
  position: "absolute", 
  bottom: "-25%", 
  left: "-15%", 
  width: "55vmax", 
  height: "55vmax", 
  borderRadius: "55% 45% 60% 40%", 
  background: "radial-gradient(circle at 30% 70%, rgba(191,217,184,0.15) 0%, transparent 70%)", 
  pointerEvents: "none"
}} />

<div style={{ 
  maxWidth: 1280, 
  margin: "0 auto", 
  padding: "clamp(1.5rem, 5vw, 3rem) clamp(1.5rem, 4vw, 3rem)", 
  width: "100%", 
  position: "relative", 
  zIndex: 2 
}}>

  <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "clamp(3.5rem, 6vw, 7rem)", alignItems: "center" }}>

    {/* LEFT COLUMN */}
    <div>
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(245,166,35,0.12)",
        border: "2.5px solid #F5A623",
        borderRadius: "50px",
        padding: "6px 26px",
        marginBottom: "1.8rem",
        transform: "rotate(-2deg)"
      }}>
        <span style={{ 
          fontSize: "12.5px", 
          fontWeight: 700, 
          letterSpacing: "0.22em", 
          color: "#F5A623", 
          textTransform: "uppercase" 
        }}>
          EDUCATION • BELONGING • GROWTH
        </span>
      </div>

      <h1 style={{ 
        fontSize: "clamp(2.75rem, 5.2vw, 4.8rem)", 
        fontWeight: 900, 
        color: "#fff", 
        lineHeight: 1.08, 
        letterSpacing: "-0.03em", 
        marginBottom: "1.4rem"
      }}>
        Helping Families Feel{" "}
        <span style={{ 
          fontFamily: "'Comic Sans MS', cursive, Geist", 
          fontStyle: "italic", 
          fontWeight: 400, 
          color: "#F5A623", 
          letterSpacing: "-0.015em",
          position: "relative",
          display: "inline-block"
        }}>
          At Home
          <svg style={{ position: "absolute", bottom: "-6px", left: "-4px", width: "100%", height: "18px" }} viewBox="0 0 240 20" fill="none" aria-hidden="true">
            <path d="M12 14 Q48 4 95 13 Q148 5 195 15" stroke="#F5A623" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
          </svg>
        </span>
      </h1>

      <p style={{ 
        color: "rgba(255,255,255,0.78)", 
        fontSize: "clamp(1.05rem, 1.65vw, 1.18rem)", 
        lineHeight: 1.68, 
        maxWidth: "460px", 
        marginBottom: "2.2rem" 
      }}>
        IPST supports immigrant parents and students through guidance, training, mentorship, resources, and community support designed for successful educational integration.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        <button style={{ 
          padding: "16px 40px", 
          fontSize: "1.05rem", 
          fontWeight: 700,
          background: "#F5A623", 
          color: "#0A2E8A", 
          border: "none", 
          borderRadius: "9999px",
          boxShadow: "0 10px 25px rgba(245,166,35,0.35)",
          cursor: "pointer"
        }}>
          Explore Programs
        </button>
        <button style={{ 
          padding: "16px 40px", 
          fontSize: "1.05rem", 
          fontWeight: 700,
          background: "transparent", 
          color: "#fff", 
          border: "2.5px solid rgba(255,255,255,0.65)", 
          borderRadius: "9999px",
          cursor: "pointer"
        }}>
          Open Family Dashboard
        </button>
      </div>
    </div>

    {/* RIGHT COLUMN - Illustration */}
    <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
      <div style={{ 
        position: "relative", 
        width: "100%", 
        maxWidth: "520px",
        zIndex: 3
      }}>
        <div style={{ 
          position: "absolute", 
          inset: "-28px", 
          border: "3px dashed rgba(245,166,35,0.35)", 
          borderRadius: "42px",
          transform: "rotate(-3deg)",
          zIndex: 1
        }} />
        
        <div style={{ 
          position: "relative", 
          borderRadius: "32px", 
          overflow: "hidden", 
          boxShadow: "0 30px 80px rgba(0,0,0,0.38)",
          background: "#fff"
        }}>
          <Image 
            src="/images/ipst.png" 
            alt="Illustration of immigrant family arriving at school" 
            width={520} 
            height={520} 
            priority 
            style={{ 
              width: "100%", 
              height: "auto", 
              display: "block",
              filter: "contrast(1.08) saturate(1.05)"
            }} 
          />
        </div>
      </div>
    </div>
  </div>
</div>
</section>

      {/* torn edge transition */}
      <TornDivider topColor="#0A2E8A" bottomColor="#FDFAF5" />

      {/* ══════════════════════════════════════════════════════
          §2 — CHALLENGES  (numbered magazine tiles, giant numerals)
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#FDFAF5", padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
        {/* giant bg watermark */}
        <div style={{ position: "absolute", top: 0, right: -20, fontSize: "clamp(8rem,20vw,18rem)", fontWeight: 900, color: "rgba(10,46,138,0.04)", lineHeight: 1, userSelect: "none", pointerEvents: "none", fontFamily: "inherit" }}>
          BARRIERS
        </div>

        {/* decorative doodles */}
        <svg style={{ position: "absolute", top: 40, left: 20, opacity: 0.15 }} width="90" height="90" viewBox="0 0 90 90" fill="none" aria-hidden="true">
          <path d="M10 80 Q45 20 80 10" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="10" cy="80" r="5" fill="#F5A623" />
        </svg>
        <svg style={{ position: "absolute", bottom: 40, right: 60, opacity: 0.12 }} width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <polygon points="40,5 50,32 78,32 56,50 64,77 40,59 16,77 24,50 2,32 30,32" stroke="#0A2E8A" strokeWidth="2" fill="none" />
        </svg>

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
              <div style={{ display: "inline-block", background: "#0A2E8A", color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 4, marginBottom: 18 }}>
                The Real Challenge
              </div>
              <h2 style={{ fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 900, color: "#0A2E8A", lineHeight: 1.1, maxWidth: 640 }}>
                Starting Over Is <G>Never Easy</G>
              </h2>
            </div>
          </FadeIn>

          {/* Asymmetric tile grid — big tiles, different sizes */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }} className="three-col">
            {challenges.map((c, i) => {
              const bgs = ["#DCEAF8","#F8F4EC","#BFD9B8","#FDE6D2","#F8F4EC","#DCEAF8"];
              const tall = i === 0 || i === 4;
              return (
                <FadeIn key={c.number} delay={i * 60}>
                  <div className="challenge-tile" style={{
                    background: bgs[i], borderRadius: 20,
                    padding: "clamp(20px,3vw,32px)",
                    border: "1.5px solid rgba(10,46,138,0.08)",
                    minHeight: tall ? 280 : 220,
                    display: "flex", flexDirection: "column",
                    justifyContent: "space-between", position: "relative", overflow: "hidden",
                  }}>
                    {/* Giant number watermark */}
                    <div style={{ position: "absolute", bottom: -10, right: -5, fontSize: "clamp(4rem,8vw,7rem)", fontWeight: 900, color: "rgba(10,46,138,0.06)", lineHeight: 1, userSelect: "none", fontFamily: "inherit" }}>
                      {c.number}
                    </div>
                    <div>
                      <div style={{ marginBottom: 16 }}>{c.icon}</div>
                      <h3 style={{ fontWeight: 800, fontSize: "clamp(15px,1.8vw,18px)", color: "#0A2E8A", marginBottom: 10 }}>{c.title}</h3>
                      <p style={{ color: "#3B4A6B", fontSize: 13, lineHeight: 1.7 }}>{c.desc}</p>
                    </div>
                    <div style={{ width: 32, height: 3, background: "#F5A623", borderRadius: 2, marginTop: 18 }} />
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <ZigZagDivider topColor="#FDFAF5" bottomColor="#0A2E8A" />

      {/* ══════════════════════════════════════════════════════
          §3 — WHAT IS IPST  (dark section, split magazine layout)
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#0A2E8A", padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }} aria-hidden="true">
          <defs><pattern id="darkdots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1.2" fill="#fff" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#darkdots)" />
        </svg>
        <svg style={{ position: "absolute", top: 30, right: 40, opacity: 0.2 }} width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
          <circle cx="60" cy="60" r="55" stroke="#F5A623" strokeWidth="1.5" strokeDasharray="6 8" fill="none" />
          <circle cx="60" cy="60" r="38" stroke="#F5A623" strokeWidth="1" strokeDasharray="3 5" fill="none" />
        </svg>

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,5vw,5rem)", alignItems: "center" }}>
            <FadeIn x={-30} y={0}>
              <div style={{ display: "inline-block", border: "2px solid rgba(245,166,35,0.5)", borderRadius: 4, padding: "5px 14px", marginBottom: 22, transform: "rotate(-1deg)" }}>
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: "#F5A623", textTransform: "uppercase" }}>What Is IPST</span>
              </div>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 900, color: "#fff", lineHeight: 1.12, marginBottom: 22 }}>
                Not a Platform.<br />A <G>Confidence-Building</G> Ecosystem.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
                IPST brings together parents, students, schools, mentors, and community in one interconnected support system. Every tool exists to reduce fear and build the confidence immigrant families need to thrive.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {["Guided learning paths for parents and students","Multilingual resources across 6 languages","Live mentor matching based on culture and language","Community events, workshops, and peer groups"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <IcoCheck />
                    <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.6 }}>{f}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn x={30} y={0} delay={120}>
              <div style={{ position: "relative" }}>
                
                  <Image src="/images/m3s4.png" alt="IPST ecosystem" width={800} height={500} style={{ width: "100%", height: "auto", display: "block" }} />
                
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <TornDivider topColor="#0A2E8A" bottomColor="#FDF0E4" flip />

{/* ══════════════════════════════════════════════════════
          §4 — FAMILY JOURNEY  (Creative Compact Horizontal Timeline)
      ══════════════════════════════════════════════════════ */}
      <section style={{ 
        background: "#FDF0E4", 
        padding: "clamp(4rem, 7vw, 6rem) 0", 
        position: "relative", 
        overflow: "hidden",
        fontFamily: "Geist, system-ui, sans-serif"
      }}>

        {/* Subtle background doodles */}
        <svg style={{ position: "absolute", top: "20%", left: "5%", opacity: 0.06 }} width="180" height="140" viewBox="0 0 180 140" fill="none" aria-hidden="true">
          <path d="M20 110 Q60 40 130 95" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </svg>
        <svg style={{ position: "absolute", bottom: "15%", right: "6%", opacity: 0.06 }} width="160" height="130" viewBox="0 0 160 130" fill="none" aria-hidden="true">
          <path d="M25 25 Q70 80 135 35" stroke="#BFD9B8" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </svg>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 3.5rem)" }}>
          
          {/* Header - Generous but compact spacing */}
          <div style={{ marginBottom: "clamp(3rem, 5vw, 4.5rem)", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <div style={{
                display: "inline-block",
                background: "#F5A623",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                padding: "7px 20px",
                borderRadius: "50px",
                marginBottom: "1rem",
                boxShadow: "0 6px 16px rgba(245,166,35,0.25)"
              }}>
                YOUR FAMILY'S JOURNEY
              </div>
              <h2 style={{ 
                fontSize: "clamp(2.4rem, 4.8vw, 3.9rem)", 
                fontWeight: 900, 
                color: "#0A2E8A", 
                lineHeight: 1.1 
              }}>
                Every Step Feels Like <span style={{ color: "#F5A623" }}>Home</span>
              </h2>
            </div>
            
            <p style={{ 
              color: "#3B4A6B", 
              fontSize: "clamp(1rem, 1.7vw, 1.15rem)", 
              maxWidth: "380px", 
              lineHeight: 1.75 
            }}>
              From arrival to full belonging — IPST guides your family with care through every chapter of educational integration.
            </p>
          </div>

          {/* Creative Horizontal Scroll Timeline - Compact & Playful */}
          <div style={{ 
            overflowX: "auto", 
            paddingBottom: "1.5rem", 
            scrollbarWidth: "none" 
          }}>
            <div style={{ 
              display: "flex", 
              gap: "clamp(2.2rem, 4vw, 3.5rem)", 
              alignItems: "flex-start", 
              minWidth: "max-content", 
              position: "relative",
              padding: "20px 0"
            }}>
              
              {/* Winding decorative path line */}
              <svg style={{ 
                position: "absolute", 
                top: "68px", 
                left: "60px", 
                right: "60px", 
                height: "6px", 
                zIndex: 0,
                opacity: 0.75
              }} viewBox="0 0 1200 30" fill="none" aria-hidden="true">
                <path 
                  d="M0 15 Q180 2 340 22 Q520 8 680 19 Q850 5 1020 23 Q1150 12 1200 15" 
                  stroke="url(#journeyGradient)" 
                  strokeWidth="5" 
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#DCEAF8"/>
                    <stop offset="35%" stopColor="#BFD9B8"/>
                    <stop offset="65%" stopColor="#FDE6D2"/>
                    <stop offset="100%" stopColor="#F5A623"/>
                  </linearGradient>
                </defs>
              </svg>

              {[
                { 
                  num: "01", 
                  title: "Arrival", 
                  desc: "Landing with hope and questions. We greet you with open arms.", 
                  accent: "#0A2E8A", 
                  light: "#DCEAF8" 
                },
                { 
                  num: "02", 
                  title: "Understanding", 
                  desc: "Decoding the new system — rules, expectations, and opportunities.", 
                  accent: "#2A6B3A", 
                  light: "#BFD9B8" 
                },
                { 
                  num: "03", 
                  title: "Enrollment", 
                  desc: "Smooth guidance through forms, schools, and placement.", 
                  accent: "#C4712A", 
                  light: "#FDE6D2" 
                },
                { 
                  num: "04", 
                  title: "Adaptation", 
                  desc: "Language, friendships, and routines begin to feel natural.", 
                  accent: "#0A2E8A", 
                  light: "#DCEAF8" 
                },
                { 
                  num: "05", 
                  title: "Community", 
                  desc: "Building connections, mentors, and a strong support circle.", 
                  accent: "#2A6B3A", 
                  light: "#BFD9B8" 
                },
                { 
                  num: "06", 
                  title: "Confidence", 
                  desc: "Thriving together — your new home now feels truly yours.", 
                  accent: "#7A4800", 
                  light: "#F5A623" 
                }
              ].map((step, i) => (
                <div 
                  key={step.num} 
                  style={{ 
                    width: "260px", 
                    flexShrink: 0, 
                    position: "relative", 
                    zIndex: 2,
                    paddingTop: i % 2 === 0 ? "0" : "42px"
                  }}
                >
                  {/* Creative Number Bubble with doodle */}
                  <div style={{ 
                    position: "relative", 
                    width: "88px", 
                    height: "88px", 
                    margin: "0 auto 1.4rem", 
                    zIndex: 3 
                  }}>
                    <div style={{ 
                      position: "absolute",
                      inset: 0,
                      background: step.light,
                      borderRadius: "50%",
                      border: `5px solid ${step.accent}`,
                      boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "26px",
                      fontWeight: 900,
                      color: step.accent
                    }}>
                      {step.num}
                    </div>
                    
                    {/* Tiny hand-drawn accent */}
                    <svg style={{ position: "absolute", top: "-12px", right: "-10px", width: "38px", height: "38px", opacity: 0.7 }} viewBox="0 0 38 38" fill="none" aria-hidden="true">
                      <circle cx="19" cy="19" r="12" stroke="#F5A623" strokeWidth="2.5" fill="none"/>
                    </svg>
                  </div>

                  {/* Content Card - Professional yet playful */}
                  <div style={{ 
                    background: "#fff", 
                    borderRadius: "22px", 
                    padding: "28px 24px 32px",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(10,46,138,0.08)",
                    height: "100%",
                    position: "relative"
                  }}>
                    <h3 style={{ 
                      fontSize: "1.35rem", 
                      fontWeight: 800, 
                      color: step.accent, 
                      marginBottom: "14px",
                      textAlign: "center"
                    }}>
                      {step.title}
                    </h3>
                    
                    <p style={{ 
                      color: "#3B4A6B", 
                      fontSize: "0.96rem", 
                      lineHeight: 1.65,
                      textAlign: "center"
                    }}>
                      {step.desc}
                    </p>
                  </div>

                  {/* Connecting arrow doodle */}
                  {i < 5 && (
                    <svg style={{ 
                      position: "absolute", 
                      top: "68px", 
                      right: "-28px", 
                      width: "42px", 
                      zIndex: 4 
                    }} viewBox="0 0 50 30" fill="none" aria-hidden="true">
                      <path d="M5 15 Q18 8 32 15 Q40 20 45 15" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                      <polygon points="42,10 48,15 42,20" fill="#F5A623"/>
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WaveDivider topColor="#FDF0E4" bottomColor="#EEF6ED" />

      {/* ══════════════════════════════════════════════════════
          §5 — PARENT PATH  (left rail + big numbered cards)
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#EEF6ED", padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "30%", background: "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(42,107,58,0.03) 30px, rgba(42,107,58,0.03) 60px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "clamp(2rem,5vw,5rem)", alignItems: "start" }}>
            {/* Sticky label column */}
            <FadeIn x={-30} y={0}>
              <div style={{ position: "sticky", top: 100 }}>
                <div style={{ display: "inline-block", background: "#2A6B3A", color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 4, marginBottom: 20, transform: "rotate(-1deg)" }}>
                  For Parents
                </div>
                <h2 style={{ fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 900, color: "#2A6B3A", lineHeight: 1.12, marginBottom: 20 }}>
                  Your <G>Learning Path</G> as a Parent
                </h2>
                <p style={{ color: "#3B5A3B", fontSize: 14, lineHeight: 1.75, marginBottom: 32 }}>
                  A structured, empathetic journey so you can support your child with real confidence.
                </p>
                <button className="btn-blue" style={{ fontSize: 14, padding: "13px 28px", background: "#2A6B3A" }}>
                  Start Parent Path
                </button>
              </div>
            </FadeIn>

            {/* Staggered cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {parentSteps.map((p, i) => (
                <FadeIn key={p.title} delay={i * 80} x={30} y={0}>
                  <div style={{
                    background: "#fff", borderRadius: 20,
                    border: "1.5px solid rgba(42,107,58,0.12)",
                    padding: "24px 28px", display: "flex", gap: 22, alignItems: "flex-start",
                    boxShadow: "0 2px 12px rgba(42,107,58,0.06)",
                    transform: i % 2 === 1 ? "translateX(20px)" : "translateX(0)",
                  }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: ["#DCEAF8","#BFD9B8","#FDE6D2","#DCEAF8","#BFD9B8"][i], display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 20, color: "#2A6B3A", flexShrink: 0, border: "2px solid rgba(42,107,58,0.15)" }}>
                      {i + 1}
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 800, fontSize: 16, color: "#2A6B3A", marginBottom: 7 }}>{p.title}</h3>
                      <p style={{ color: "#3B5A3B", fontSize: 13, lineHeight: 1.7 }}>{p.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ZigZagDivider topColor="#EEF6ED" bottomColor="#F8F4EC" />

      {/* ══════════════════════════════════════════════════════
          §6 — STUDENT PATH  (reverse layout, gold accent)
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#F8F4EC", padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, top: 0, width: "30%", background: "repeating-linear-gradient(-45deg, transparent, transparent 30px, rgba(245,166,35,0.04) 30px, rgba(245,166,35,0.04) 60px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "clamp(2rem,5vw,5rem)", alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, order: 1 }}>
              {studentSteps.map((p, i) => (
                <FadeIn key={p.title} delay={i * 80} x={-30} y={0}>
                  <div style={{
                    background: "#fff", borderRadius: 20,
                    border: "1.5px solid rgba(245,166,35,0.18)",
                    padding: "24px 28px", display: "flex", gap: 22, alignItems: "flex-start",
                    boxShadow: "0 2px 12px rgba(245,166,35,0.06)",
                    transform: i % 2 === 1 ? "translateX(-20px)" : "translateX(0)",
                  }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: ["#BFD9B8","#DCEAF8","#BFD9B8","#FDE6D2","#BFD9B8"][i], display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 20, color: "#0A2E8A", flexShrink: 0, border: "2px solid rgba(10,46,138,0.12)" }}>
                      {i + 1}
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 800, fontSize: 16, color: "#0A2E8A", marginBottom: 7 }}>{p.title}</h3>
                      <p style={{ color: "#3B4A6B", fontSize: 13, lineHeight: 1.7 }}>{p.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn x={30} y={0} delay={80}>
              <div style={{ position: "sticky", top: 100, order: 2 }}>
                <div style={{ display: "inline-block", background: "#F5A623", color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 4, marginBottom: 20, transform: "rotate(1deg)" }}>
                  For Students
                </div>
                <h2 style={{ fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 900, color: "#0A2E8A", lineHeight: 1.12, marginBottom: 20 }}>
                  Your <G>Success Path</G> as a Student
                </h2>
                <p style={{ color: "#3B4A6B", fontSize: 14, lineHeight: 1.75, marginBottom: 32 }}>
                  A journey built for students navigating new schools, new languages, and new friendships.
                </p>
                <button className="btn-gold" style={{ fontSize: 14, padding: "13px 28px" }}>
                  Start Student Path
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <WaveDivider topColor="#F8F4EC" bottomColor="#0A2E8A" />

      {/* ══════════════════════════════════════════════════════
          §7 — MULTILINGUAL  (dark, interactive language switcher)
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#0A2E8A", padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.05 }} aria-hidden="true">
          <defs><pattern id="langdots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1.2" fill="#fff" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#langdots)" />
        </svg>
        <svg style={{ position: "absolute", top: 20, left: 20, opacity: 0.18 }} width="100" height="100" viewBox="0 0 100 100" fill="none" aria-hidden="true">
          <path d="M10 90 Q40 20 90 10" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="5 6" />
          <circle cx="90" cy="10" r="6" fill="#F5A623" />
        </svg>

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <FadeIn className="text-center" style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-block", border: "2px solid rgba(245,166,35,0.5)", borderRadius: 4, padding: "5px 14px", marginBottom: 20 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: "#F5A623", textTransform: "uppercase" }}>Multilingual Support</span>
            </div>
            <h2 style={{ fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
              Your Language Is <G>Welcome Here</G>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>
              Every core resource exists in six languages. Tap any language to see it live.
            </p>
          </FadeIn>

          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
            {/* Language picker grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {langs.map((l) => (
                <button key={l.code} className="lang-btn" onClick={() => setActiveLang(l)} style={{
                  border: activeLang.code === l.code ? "2.5px solid #F5A623" : "2px solid rgba(255,255,255,0.12)",
                  borderRadius: 16, padding: "18px 16px",
                  background: activeLang.code === l.code ? "rgba(245,166,35,0.12)" : "rgba(255,255,255,0.05)",
                  display: "flex", alignItems: "center", gap: 12, textAlign: "left",
                  boxShadow: activeLang.code === l.code ? "0 0 0 3px rgba(245,166,35,0.2)" : "none",
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: l.bg, color: l.text, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, flexShrink: 0, border: "2px solid rgba(255,255,255,0.2)" }}>
                    {l.code}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff", fontSize: 13 }}>{l.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{l.phrase}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Live preview */}
            <FadeIn delay={80}>
              <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 24, border: "1.5px solid rgba(255,255,255,0.1)", overflow: "hidden" }}>
                {/* window bar */}
                <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF6B6B" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F5A623" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#6BCB77" }} />
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginLeft: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em" }}>IPST Family Portal</span>
                </div>
                <div style={{ padding: "40px 32px", textAlign: "center" }}>
                  <div style={{ width: 88, height: 88, borderRadius: "50%", background: activeLang.bg, margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 8px rgba(255,255,255,0.06)", transition: "background 0.4s" }}>
                    <span style={{ fontWeight: 900, fontSize: 22, color: activeLang.text }}>{activeLang.code}</span>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", color: "#F5A623", textTransform: "uppercase", marginBottom: 14 }}>Live Translation</div>
                  <h3 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 900, color: "#fff", marginBottom: 10, transition: "all 0.3s" }}>
                    {activeLang.phrase}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>Your portal is ready in <strong style={{ color: "rgba(255,255,255,0.8)" }}>{activeLang.name}</strong></p>
                  <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 24 }}>
                    {["Mentors","Guides","System"].map((n, i) => (
                      <div key={n} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "8px 14px", textAlign: "center" }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{n}</div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: i === 2 ? "#6BCB77" : "#F5A623", marginTop: 3 }}>
                          {i === 0 ? "Online" : i === 1 ? "Ready" : "100%"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <TornDivider topColor="#0A2E8A" bottomColor="#FDF0E4" />

      {/* ══════════════════════════════════════════════════════
          §8 — MENTORSHIP  (warm section, flow diagram style)
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#FDF0E4", padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
        <svg style={{ position: "absolute", bottom: 20, left: 20, opacity: 0.14 }} width="100" height="100" viewBox="0 0 100 100" fill="none" aria-hidden="true">
          <path d="M10 10 Q50 50 90 90" stroke="#C4712A" strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="4 6" />
          <circle cx="90" cy="90" r="7" fill="#C4712A" />
        </svg>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ marginBottom: 52 }}>
              <div style={{ display: "inline-block", background: "#C4712A", color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 4, marginBottom: 18, transform: "rotate(0.5deg)" }}>
                Mentorship Network
              </div>
              <h2 style={{ fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 900, color: "#0A2E8A", lineHeight: 1.1 }}>
                Someone Who Has <G>Been There</G>
              </h2>
            </div>
          </FadeIn>

          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
            <FadeIn x={-30} y={0}>
              <p style={{ color: "#3B4A6B", fontSize: 16, lineHeight: 1.8, marginBottom: 36 }}>
                Every mentor in our network was once an immigrant family themselves. They know the fear. They know the confusion. And they know exactly how to guide your family through it.
              </p>

              {/* 4-step flow */}
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { n: "1", t: "Immigrant Family Joins", s: "Sign up and share your background", bg: "#DCEAF8" },
                  { n: "2", t: "Smart Mentor Match", s: "Matched by language and culture", bg: "#F5A623" },
                  { n: "3", t: "Regular Sessions", s: "Online, at your schedule", bg: "#BFD9B8" },
                  { n: "4", t: "Family Thrives", s: "Lasting confidence and belonging", bg: "#FDE6D2" },
                ].map((step, i) => (
                  <div key={step.n} style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 60, flexShrink: 0 }}>
                      <div style={{ width: 48, height: 48, borderRadius: "50%", background: step.bg, border: "3px solid #fff", boxShadow: "0 4px 14px rgba(10,46,138,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, color: "#0A2E8A", zIndex: 1 }}>
                        {step.n}
                      </div>
                      {i < 3 && <div style={{ width: 2, flex: 1, background: "rgba(10,46,138,0.12)", margin: "4px 0" }} />}
                    </div>
                    <div style={{ padding: "0 0 24px 16px" }}>
                      <h4 style={{ fontWeight: 800, color: "#0A2E8A", fontSize: 15, marginBottom: 4 }}>{step.t}</h4>
                      <p style={{ color: "#3B4A6B", fontSize: 13 }}>{step.s}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn x={30} y={0} delay={100}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                {[
                  { title: "Cultural Guidance", desc: "Mentors who share your background help you understand the unspoken rules of a new culture.", bg: "#FDE6D2" },
                  { title: "Educational Navigation", desc: "Learn the school system, grades, and academic opportunities from someone who figured it out.", bg: "#DCEAF8" },
                  { title: "Emotional Support", desc: "Sometimes you need someone to hear you. Our mentors are trained listeners and genuine guides.", bg: "#BFD9B8" },
                ].map((m) => (
                  <div key={m.title} style={{ background: m.bg, borderRadius: 18, padding: "20px 22px", border: "1.5px solid rgba(10,46,138,0.07)", display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(10,46,138,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <polyline points="3,10 8,15 17,5" stroke="#0A2E8A" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 800, color: "#0A2E8A", fontSize: 14, marginBottom: 5 }}>{m.title}</h4>
                      <p style={{ color: "#3B4A6B", fontSize: 13, lineHeight: 1.65 }}>{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <ZigZagDivider topColor="#FDF0E4" bottomColor="#EEF6ED" />

      {/* ══════════════════════════════════════════════════════
          §9 — COMMUNITY  (pin-board map style)
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#EEF6ED", padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(42,107,58,0.05) 39px, rgba(42,107,58,0.05) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(42,107,58,0.05) 39px, rgba(42,107,58,0.05) 40px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,5vw,5rem)", alignItems: "center" }}>
            <FadeIn x={-30} y={0}>
              <div style={{ display: "inline-block", background: "#2A6B3A", color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 4, marginBottom: 20, transform: "rotate(-1deg)" }}>
                Community
              </div>
              <h2 style={{ fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 900, color: "#2A6B3A", lineHeight: 1.1, marginBottom: 20 }}>
                You Are <G>Not Alone</G>
              </h2>
              <p style={{ color: "#3B5A3B", fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>
                A global community of immigrant families who support each other — sharing stories, wisdom, and encouragement through every step.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { title: "Parent Groups", desc: "Connect and share with parents on the same path.", bg: "#BFD9B8", pin: "#2A6B3A" },
                  { title: "Student Circles", desc: "Study groups and peer mentorship for all ages.", bg: "#DCEAF8", pin: "#0A2E8A" },
                  { title: "Live Events", desc: "Workshops and gatherings for real family needs.", bg: "#FDE6D2", pin: "#C4712A" },
                  { title: "Local Chapters", desc: "Find community groups in your own city.", bg: "#BFD9B8", pin: "#2A6B3A" },
                ].map((c) => (
                  <div key={c.title} style={{ background: c.bg, borderRadius: 16, padding: "18px 16px", border: "1.5px solid rgba(42,107,58,0.1)", position: "relative" }}>
                    <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)" }}>
                      <IcoPin />
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <h4 style={{ fontWeight: 800, fontSize: 14, color: "#0A2E8A", marginBottom: 5 }}>{c.title}</h4>
                      <p style={{ fontSize: 12, color: "#3B5A3B", lineHeight: 1.6 }}>{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn x={30} y={0} delay={100}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", inset: -12, border: "2px dashed rgba(42,107,58,0.2)", borderRadius: 28 }} />
                <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 60px rgba(42,107,58,0.15)" }}>
                  <Image src="/images/m3s9.png" alt="IPST community" width={700} height={520} style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
                <div style={{ position: "absolute", bottom: 20, left: 20, background: "rgba(255,255,255,0.92)", borderRadius: 12, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, backdropFilter: "blur(8px)" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2A6B3A", animation: "pulsering 2s ease-in-out infinite" }} />
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#2A6B3A", textTransform: "uppercase", letterSpacing: "0.12em" }}>Active Network</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <WaveDivider topColor="#EEF6ED" bottomColor="#F8F4EC" />

      {/* ══════════════════════════════════════════════════════
          §10 — RESOURCE LIBRARY  (Magical Full Bookshelf)
      ══════════════════════════════════════════════════════ */}
      <section style={{ 
        background: "#F8F4EC", 
        padding: "clamp(4.5rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)", 
        position: "relative", 
        overflow: "hidden",
        fontFamily: "Geist, system-ui, sans-serif"
      }}>

        {/* Background doodles */}
        <svg style={{ position: "absolute", top: "15%", left: "5%", opacity: 0.06 }} width="170" height="145" viewBox="0 0 170 145" fill="none" aria-hidden="true">
          <rect x="25" y="35" width="48" height="68" rx="6" stroke="#0A2E8A" strokeWidth="4" fill="transparent"/>
          <path d="M38 52 L62 52 M38 68 L62 68" stroke="#F5A623" strokeWidth="2.5"/>
        </svg>
        
        <svg style={{ position: "absolute", bottom: "22%", right: "7%", opacity: 0.06 }} width="155" height="160" viewBox="0 0 155 160" fill="none" aria-hidden="true">
          <circle cx="78" cy="78" r="48" stroke="#BFD9B8" strokeWidth="5" fill="transparent"/>
          <path d="M58 68 L98 68 M58 88 L98 88" stroke="#F5A623" strokeWidth="3"/>
        </svg>

        <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
          
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "clamp(3.2rem, 6vw, 5rem)" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              background: "#0A2E8A",
              color: "#fff",
              fontSize: "12.5px",
              fontWeight: 800,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              padding: "9px 28px",
              borderRadius: "50px",
              marginBottom: "1.5rem",
              boxShadow: "0 8px 22px rgba(10,46,138,0.28)"
            }}>
              📚 RESOURCE LIBRARY
            </div>
            
            <h2 style={{ 
              fontSize: "clamp(2.6rem, 5.1vw, 4.1rem)", 
              fontWeight: 900, 
              color: "#0A2E8A", 
              lineHeight: 1.08,
              marginBottom: "1rem"
            }}>
              Everything You Need,<br />
              Right on Your <span style={{ color: "#F5A623", position: "relative" }}>Shelf</span>
            </h2>
            
            <p style={{ 
              color: "#3B4A6B", 
              fontSize: "clamp(1.05rem, 1.75vw, 1.2rem)", 
              maxWidth: "540px", 
              margin: "0 auto",
              lineHeight: 1.72
            }}>
              Curated guides, tools, checklists, videos, and templates — thoughtfully organized for immigrant families.
            </p>
          </div>

          {/* Full & Rich Bookshelf */}
          <div style={{ 
            position: "relative", 
            background: "#C9A87A", 
            borderRadius: "36px", 
            padding: "36px 32px 26px", 
            boxShadow: "0 30px 80px rgba(0,0,0,0.18)",
            overflow: "hidden"
          }}>
            
            {/* Shelf layers */}
            <div style={{ position: "absolute", top: "34px", left: "0", right: "0", height: "7px", background: "#B5915E", zIndex: 2 }} />
            <div style={{ position: "absolute", bottom: "32px", left: "0", right: "0", height: "9px", background: "#B5915E", zIndex: 2 }} />

            <div style={{ 
              display: "flex", 
              gap: "clamp(12px, 2vw, 20px)", 
              overflowX: "auto", 
              padding: "18px 8px 38px",
              alignItems: "flex-end",
              scrollbarWidth: "none"
            }}>
              {[
                { 
                  title: "School Systems", 
                  count: "24 Guides", 
                  bg: "#DCEAF8", 
                  height: "172px", 
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <rect x="8" y="9" width="20" height="22" rx="2" stroke="#0A2E8A" strokeWidth="2.5"/>
                      <path d="M13 15 H23 M13 20 H23" stroke="#0A2E8A" strokeWidth="2"/>
                    </svg>
                  )
                },
                { 
                  title: "Admissions", 
                  count: "18 Guides", 
                  bg: "#BFD9B8", 
                  height: "148px", 
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <path d="M10 12 L26 12 L26 26 L10 26 Z" stroke="#0A2E8A" strokeWidth="2.5" fill="none"/>
                      <circle cx="18" cy="19" r="4" stroke="#0A2E8A" strokeWidth="2"/>
                    </svg>
                  )
                },
                { 
                  title: "Scholarships", 
                  count: "32 Resources", 
                  bg: "#FDE6D2", 
                  height: "185px", 
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <circle cx="18" cy="18" r="13" stroke="#0A2E8A" strokeWidth="2.5"/>
                      <path d="M18 11 L18 25 M11 18 L25 18" stroke="#0A2E8A" strokeWidth="2.5"/>
                    </svg>
                  )
                },
                { 
                  title: "Parent Guides", 
                  count: "15 Tools", 
                  bg: "#DCEAF8", 
                  height: "139px", 
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <circle cx="13" cy="14" r="5" stroke="#0A2E8A" strokeWidth="2.5"/>
                      <circle cx="23" cy="14" r="5" stroke="#0A2E8A" strokeWidth="2.5"/>
                      <path d="M9 27 Q18 32 27 27" stroke="#0A2E8A" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  )
                },
                { 
                  title: "Language Tools", 
                  count: "40+ Items", 
                  bg: "#BFD9B8", 
                  height: "168px", 
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <rect x="9" y="10" width="18" height="16" rx="2" stroke="#0A2E8A" strokeWidth="2.5"/>
                      <path d="M13 18 H23 M13 23 H23" stroke="#0A2E8A" strokeWidth="2"/>
                    </svg>
                  )
                },
                { 
                  title: "Community", 
                  count: "22 Services", 
                  bg: "#FDE6D2", 
                  height: "152px", 
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <circle cx="12" cy="15" r="4.5" stroke="#0A2E8A" strokeWidth="2.5"/>
                      <circle cx="24" cy="15" r="4.5" stroke="#0A2E8A" strokeWidth="2.5"/>
                      <circle cx="18" cy="25" r="4.5" stroke="#0A2E8A" strokeWidth="2.5"/>
                    </svg>
                  )
                },
                { 
                  title: "Career Path", 
                  count: "12 Guides", 
                  bg: "#DCEAF8", 
                  height: "161px", 
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <path d="M10 26 L18 12 L26 26" stroke="#0A2E8A" strokeWidth="3" strokeLinejoin="round"/>
                      <circle cx="18" cy="9" r="3" fill="#0A2E8A"/>
                    </svg>
                  )
                },
                { 
                  title: "Legal Help", 
                  count: "9 Guides", 
                  bg: "#BFD9B8", 
                  height: "145px", 
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <path d="M12 11 L24 11 L24 27 L12 27 Z" stroke="#0A2E8A" strokeWidth="2.5"/>
                      <path d="M15 15 H21 M15 19 H21" stroke="#0A2E8A" strokeWidth="2"/>
                    </svg>
                  )
                }
              ].map((book, idx) => (
                <div 
                  key={book.title} 
                  style={{ 
                    width: "122px", 
                    flexShrink: 0, 
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = idx % 2 === 0 ? "translateY(-26px) rotate(-3deg)" : "translateY(-26px) rotate(3deg)";
                  }}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
                >
                  <div style={{ 
                    position: "relative", 
                    height: book.height, 
                    width: "100%", 
                    background: book.bg, 
                    borderRadius: "12px 12px 6px 6px",
                    borderLeft: "9px solid #0A2E8A",
                    boxShadow: "5px 18px 32px rgba(0,0,0,0.25)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "16px 10px 14px",
                    overflow: "hidden"
                  }}>
                    {/* Spine line */}
                    <div style={{ position: "absolute", top: "22%", left: "14px", width: "4px", height: "48%", background: "rgba(10,46,138,0.18)", borderRadius: "3px" }} />
                    
                    {/* Icon */}
                    <div style={{ 
                      marginBottom: "12px", 
                      display: "flex", 
                      justifyContent: "center",
                      filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.15))"
                    }}>
                      {book.icon}
                    </div>
                    
                    <div style={{ 
                      fontWeight: 800, 
                      fontSize: "13.5px", 
                      color: "#0A2E8A", 
                      lineHeight: 1.25,
                      textAlign: "center"
                    }}>
                      {book.title}
                    </div>
                    <div style={{ 
                      fontSize: "10.5px", 
                      color: "#3B4A6B", 
                      textAlign: "center", 
                      marginTop: "5px",
                      fontWeight: 600
                    }}>
                      {book.count}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom shelf edge */}
            <div style={{ position: "relative", height: "26px", background: "#B5915E", borderRadius: "0 0 32px 32px", zIndex: 2 }} />
          </div>

          {/* Creative accent doodle */}
          <svg style={{ position: "absolute", top: "42%", right: "8%", opacity: 0.4, transform: "rotate(18deg)" }} width="82" height="88" viewBox="0 0 82 88" fill="none" aria-hidden="true">
            <path d="M18 62 Q38 38 65 58" stroke="#F5A623" strokeWidth="4" strokeLinecap="round" fill="none"/>
            <circle cx="68" cy="34" r="11" fill="#BFD9B8" stroke="#0A2E8A" strokeWidth="3"/>
          </svg>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "clamp(3rem, 5.5vw, 4.5rem)" }}>
            <button style={{ 
              fontSize: "1.08rem", 
              fontWeight: 700,
              padding: "18px 48px", 
              background: "#0A2E8A", 
              color: "#fff", 
              border: "none", 
              borderRadius: "9999px",
              boxShadow: "0 14px 36px rgba(10,46,138,0.32)",
              cursor: "pointer"
            }}>
              Explore Full Library →
            </button>
          </div>
        </div>
      </section>
      <ZigZagDivider topColor="#F8F4EC" bottomColor="#0A2E8A" />

      {/* ══════════════════════════════════════════════════════
          §11 — GLOBAL IMPACT  (dark navy, globe image)
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#0A2E8A", padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }} aria-hidden="true">
          <defs><pattern id="globedots" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse"><circle cx="18" cy="18" r="1" fill="#fff" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#globedots)" />
        </svg>
        <div className="pulse-anim" style={{ position: "absolute", top: "50%", right: "5%", width: "40vmax", height: "40vmax", borderRadius: "50%", border: "1px dashed rgba(245,166,35,0.15)", transform: "translateY(-50%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <FadeIn x={-30} y={0}>
              <div style={{ display: "inline-block", border: "2px solid rgba(245,166,35,0.5)", borderRadius: 4, padding: "5px 14px", marginBottom: 22 }}>
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: "#F5A623", textTransform: "uppercase" }}>Global Impact</span>
              </div>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.12, marginBottom: 20 }}>
                Every Transition Has a Story. We Guide <G>Every Single One.</G>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.8, marginBottom: 40 }}>
                From different horizons, languages, and cultures — immigrant families cross oceans to build new paths. IPST stands as the bridge between your legacy and your child's brilliant future.
              </p>
              <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { n: "48K+", l: "Families Supported", bg: "#DCEAF8", c: "#0A2E8A" },
                  { n: "120+", l: "Countries Represented", bg: "#BFD9B8", c: "#2A6B3A" },
                  { n: "92%", l: "Feel More Confident", bg: "#FDE6D2", c: "#C4712A" },
                  { n: "6", l: "Languages Supported", bg: "#F5A623", c: "#7A4800" },
                ].map(s => (
                  <div key={s.l} style={{ background: s.bg, borderRadius: 16, padding: "18px 16px" }}>
                    <div style={{ fontSize: "clamp(1.8rem,2.8vw,2.4rem)", fontWeight: 900, color: s.c }}>{s.n}</div>
                    <div style={{ fontSize: 12, color: s.c, fontWeight: 600, opacity: 0.7, marginTop: 4, lineHeight: 1.4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn x={30} y={0} delay={100}>
              <div style={{ position: "relative" }}>
                <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.35)" }}>
                  <Image src="/images/m3globe.png" alt="IPST global reach" width={700} height={450} style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
                
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <TornDivider topColor="#0A2E8A" bottomColor="#F8F4EC" />

      {/* ══════════════════════════════════════════════════════
          §12 — DASHBOARD PREVIEW  (device mockup)
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#F8F4EC", padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "40%", background: "repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(10,46,138,0.02) 40px, rgba(10,46,138,0.02) 80px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 48, alignItems: "center" }}>
            <FadeIn x={-30} y={0}>
              <div style={{ display: "inline-block", background: "#F5A623", color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 4, marginBottom: 20 }}>
                Family Dashboard
              </div>
              <h2 style={{ fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 900, color: "#0A2E8A", lineHeight: 1.12, marginBottom: 20 }}>
                Everything Your Family Needs, <G>In One Place</G>
              </h2>
              <p style={{ color: "#3B4A6B", fontSize: 14, lineHeight: 1.8, marginBottom: 32 }}>
                The Family Dashboard is coming soon — a personal hub for progress, programs, mentors, and community. Built entirely for immigrant families.
              </p>
              <div style={{ background: "#DCEAF8", borderRadius: 14, padding: "12px 18px", marginBottom: 24, display: "inline-block", border: "1px solid rgba(10,46,138,0.12)" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#0A2E8A" }}>Dashboard launching soon — sign up to be first</span>
              </div>
              <div>
                <button className="btn-blue" style={{ fontSize: 15, padding: "15px 32px" }}>Open Family Dashboard</button>
              </div>
            </FadeIn>

            <FadeIn x={30} y={0} delay={100}>
              {/* Browser frame */}
              <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 24px 70px rgba(10,46,138,0.12)", overflow: "hidden", border: "1.5px solid rgba(10,46,138,0.08)" }}>
                <div style={{ background: "#F8F4EC", padding: "14px 20px", borderBottom: "1px solid rgba(10,46,138,0.07)", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#FF6B6B" }} />
                  <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#F5A623" }} />
                  <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#6BCB77" }} />
                  <div style={{ flex: 1, background: "#fff", borderRadius: 6, height: 24, display: "flex", alignItems: "center", paddingLeft: 10, marginLeft: 8, border: "1px solid rgba(10,46,138,0.1)" }}>
                    <span style={{ fontSize: 10, color: "rgba(10,46,138,0.4)", fontWeight: 500 }}>ipst.family/dashboard</span>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "170px 1fr", minHeight: 360 }}>
                  {/* Sidebar */}
                  <div style={{ background: "#0A2E8A", padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 12px", marginBottom: 8 }}>
                      <div style={{ fontWeight: 700, color: "#fff", fontSize: 12 }}>The Nguyen Family</div>
                      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, marginTop: 2 }}>2 learners</div>
                    </div>
                    {["Programs","Mentor","Community","Resources","Messages"].map((item, i) => (
                      <div key={item} style={{ borderRadius: 10, padding: "9px 12px", background: i === 0 ? "rgba(245,166,35,0.2)" : "transparent", border: i === 0 ? "1px solid rgba(245,166,35,0.3)" : "1px solid transparent", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: i === 0 ? "#F5A623" : "rgba(255,255,255,0.2)" }} />
                        <span style={{ fontSize: 11, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? "#F5A623" : "rgba(255,255,255,0.55)" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  {/* Main content */}
                  <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {[["Progress","68%","#DCEAF8"],["Resources","12","#BFD9B8"],["Events","3","#FDE6D2"],["Messages","5","#DCEAF8"]].map(([l,v,bg]) => (
                        <div key={l} style={{ background: bg, borderRadius: 12, padding: "12px" }}>
                          <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(10,46,138,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{l}</div>
                          <div style={{ fontSize: 20, fontWeight: 900, color: "#0A2E8A", marginTop: 3 }}>{v}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "#F8F4EC", borderRadius: 12, padding: 14, border: "1px solid rgba(10,46,138,0.07)" }}>
                      <div style={{ fontWeight: 700, color: "#0A2E8A", fontSize: 11, marginBottom: 10 }}>Learning Progress</div>
                      {[["School Systems",80],["Communication",55],["Community",40],["Future Planning",20]].map(([l,p]) => (
                        <div key={l} style={{ marginBottom: 8 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#3B4A6B", marginBottom: 4 }}>
                            <span>{l}</span><span>{p}%</span>
                          </div>
                          <div style={{ width: "100%", height: 5, borderRadius: 3, background: "#E8E0D4" }}>
                            <div style={{ width: `${p}%`, height: 5, borderRadius: 3, background: "#0A2E8A" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "#BFD9B8", borderRadius: 12, padding: 12, display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: "#2A6B3A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="6" cy="5" r="3" fill="#BFD9B8" /><circle cx="13" cy="7" r="2.5" fill="#BFD9B8" /><path d="M2 16 C2 11 11 11 11 16" stroke="#BFD9B8" strokeWidth="1.5" fill="none" /><path d="M10 16 C10 12 17 12 17 16" stroke="#BFD9B8" strokeWidth="1.5" fill="none" /></svg>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: "#2A6B3A", fontSize: 11 }}>Mentor Session — Tomorrow, 4PM</div>
                        <div style={{ color: "#3B5A3B", fontSize: 10, marginTop: 2 }}>with Amira — Cultural &amp; School Guidance</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <WaveDivider topColor="#F8F4EC" bottomColor="#FDFAF5" />

      {/* ══════════════════════════════════════════════════════
          §13 — STORIES  (tilted card carousel)
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#FDFAF5", padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
        <svg style={{ position: "absolute", top: 20, right: 30, opacity: 0.12 }} width="110" height="110" viewBox="0 0 110 110" fill="none" aria-hidden="true">
          <path d="M10 100 Q55 25 100 10" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="100" cy="10" r="8" fill="#F5A623" />
          <circle cx="55" cy="52" r="5" fill="#F5A623" />
        </svg>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div style={{ display: "inline-block", background: "#F5A623", color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 4, marginBottom: 18, transform: "rotate(-0.5deg)" }}>
                Stories
              </div>
              <h2 style={{ fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 900, color: "#0A2E8A", lineHeight: 1.1, marginBottom: 14 }}>
                Families Who Found Their <G>Footing</G>
              </h2>
              <p style={{ color: "#3B4A6B", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>
                Real stories from families who started exactly where you are right now.
              </p>
            </div>
          </FadeIn>

          {/* Tiled stacked cards layout */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28, position: "relative" }} className="three-col">
            {stories.map((s, i) => (
              <FadeIn key={s.name} delay={i * 80}>
                <div style={{
                  background: s.bg, borderRadius: 22,
                  padding: "28px 24px", border: "1.5px solid rgba(10,46,138,0.07)",
                  boxShadow: "0 8px 32px rgba(10,46,138,0.07)",
                  transform: `rotate(${s.rot})`,
                  display: "flex", flexDirection: "column",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "default", height: "100%",
                  position: "relative", overflow: "hidden",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "rotate(0) translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(10,46,138,0.14)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = `rotate(${s.rot})`; e.currentTarget.style.boxShadow = "0 8px 32px rgba(10,46,138,0.07)"; }}>

                  {/* Quote mark doodle */}
                  <div style={{ position: "absolute", top: 16, right: 20, fontSize: 80, color: "rgba(10,46,138,0.06)", fontFamily: "Georgia,serif", lineHeight: 1, userSelect: "none" }}>"</div>

                  <div style={{ display: "inline-block", background: "rgba(255,255,255,0.65)", borderRadius: 100, padding: "4px 12px", fontSize: 10, fontWeight: 800, color: "rgba(10,46,138,0.55)", textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 16, alignSelf: "flex-start" }}>
                    {s.tag || "Story"}
                  </div>

                  <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                    {[0,1,2,3,4].map(k => <IcoStar key={k} />)}
                  </div>

                  <p style={{ color: "#3B4A6B", fontSize: 14, lineHeight: 1.75, flex: 1, marginBottom: 20, fontStyle: "italic" }}>
                    "{s.story}"
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid rgba(10,46,138,0.1)" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#0A2E8A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 15, flexShrink: 0 }}>
                      {s.name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#0A2E8A", fontSize: 13 }}>{s.name}</div>
                      <div style={{ color: "#3B4A6B", fontSize: 11, marginTop: 2 }}>{s.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <TornDivider topColor="#FDFAF5" bottomColor="#F0EBE1" flip />

      {/* ══════════════════════════════════════════════════════
          §14 — FAQ  (open-book style)
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#F0EBE1", padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(10,46,138,0.03) 59px, rgba(10,46,138,0.03) 60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 60, top: 0, bottom: 0, width: 2, background: "rgba(245,166,35,0.2)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div style={{ display: "inline-block", background: "#0A2E8A", color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 4, marginBottom: 18 }}>
                Questions Families Ask
              </div>
              <h2 style={{ fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 900, color: "#0A2E8A", lineHeight: 1.1, marginBottom: 14 }}>
                We Have the <G>Answers</G>
              </h2>
              <p style={{ color: "#3B4A6B", fontSize: 16, maxWidth: 440, margin: "0 auto" }}>
                Straight answers to the questions every immigrant family actually thinks about.
              </p>
            </div>
          </FadeIn>

          <div>
            {faqs.map((f, i) => (
              <FadeIn key={f.q} delay={i * 50}>
                <FaqItem q={f.q} a={f.a} i={i} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider topColor="#F0EBE1" bottomColor="#0A2E8A" />

      {/* ══════════════════════════════════════════════════════
          §15 — FINAL CTA  (dark bold, illustrated)
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#0A2E8A", padding: "clamp(5rem,10vw,9rem) clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }} aria-hidden="true">
          <defs><pattern id="ctadots" x="0" y="0" width="44" height="44" patternUnits="userSpaceOnUse"><circle cx="22" cy="22" r="1.3" fill="#fff" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#ctadots)" />
        </svg>

        {/* Decorative corner scribbles */}
        <svg style={{ position: "absolute", top: 20, left: 20, opacity: 0.22 }} width="120" height="100" viewBox="0 0 120 100" fill="none" aria-hidden="true">
          <path d="M10 90 Q55 20 110 10" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M5 60 Q30 40 55 55" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="4 5" />
          <circle cx="112" cy="10" r="6" fill="#F5A623" />
          <circle cx="62" cy="38" r="4" fill="#F5A623" />
        </svg>
        <svg style={{ position: "absolute", bottom: 20, right: 20, opacity: 0.2 }} width="100" height="100" viewBox="0 0 100 100" fill="none" aria-hidden="true">
          <path d="M10 10 Q50 50 90 90" stroke="#BFD9B8" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="5 6" />
          <polygon points="88,84 96,96 80,92" fill="#BFD9B8" />
        </svg>

        {/* Illustrated family SVG */}
        <FadeIn>
          <svg width="360" height="160" viewBox="0 0 360 160" fill="none" style={{ margin: "0 auto 48px", display: "block" }} aria-label="Family walking toward school">
            {/* Ground */}
            <path d="M10 135 Q180 115 350 135" stroke="rgba(191,217,184,0.4)" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* School */}
            <rect x="270" y="70" width="70" height="70" rx="3" fill="rgba(220,234,248,0.2)" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
            <polygon points="260,70 305,40 350,70" fill="rgba(191,217,184,0.2)" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
            <rect x="295" y="95" width="14" height="18" rx="1" fill="rgba(255,255,255,0.4)" />
            <rect x="276" y="84" width="11" height="10" rx="1" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <rect x="323" y="84" width="11" height="10" rx="1" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            {/* Flag */}
            <line x1="305" y1="40" x2="305" y2="24" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
            <polygon points="305,24 318,29 305,34" fill="#F5A623" />
            {/* Parent */}
            <circle cx="90" cy="72" r="14" fill="rgba(253,230,210,0.9)" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
            <rect x="79" y="86" width="22" height="32" rx="5" fill="rgba(10,46,138,0.7)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <line x1="79" y1="96" x2="62" y2="114" stroke="rgba(10,46,138,0.6)" strokeWidth="3" strokeLinecap="round" />
            <line x1="101" y1="96" x2="116" y2="114" stroke="rgba(10,46,138,0.6)" strokeWidth="3" strokeLinecap="round" />
            {/* Child */}
            <circle cx="132" cy="80" r="11" fill="rgba(253,230,210,0.9)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" />
            <rect x="122" y="91" width="20" height="26" rx="4" fill="#F5A623" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <line x1="122" y1="100" x2="110" y2="116" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="142" y1="100" x2="152" y2="116" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" />
            {/* Backpack */}
            <rect x="140" y="93" width="12" height="16" rx="4" fill="rgba(220,234,248,0.8)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            {/* Dotted path */}
            {[170,184,198,212,226,240,254].map(x => (
              <circle key={x} cx={x} cy="128" r="4" fill="#F5A623" opacity="0.7" />
            ))}
          </svg>
        </FadeIn>

        <div style={{ maxWidth: 780, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <FadeIn delay={80}>
            <h2 style={{ fontSize: "clamp(2.4rem,5.5vw,4.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: 22 }}>
              A New Country Should Mean<br />
              <G>New Opportunities.</G><br />
              <span style={{ fontSize: "0.82em", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>Not New Obstacles.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={160}>
            <p style={{ fontSize: "clamp(1rem,1.8vw,1.2rem)", color: "rgba(255,255,255,0.62)", lineHeight: 1.75, maxWidth: 540, margin: "0 auto 44px" }}>
              Let us help your family navigate, adapt, and truly thrive in your new home.
            </p>
          </FadeIn>

          <FadeIn delay={220}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginBottom: 48 }}>
              <button className="btn-gold" style={{ fontSize: 16, padding: "17px 42px" }}>Explore Programs</button>
              <button className="btn-outline" style={{ fontSize: 16, padding: "17px 42px", borderColor: "rgba(255,255,255,0.35)", color: "#fff" }}>Open Family Dashboard</button>
            </div>
          </FadeIn>

          <FadeIn delay={280}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "clamp(12px,3vw,32px)" }}>
              {["Free to start","6 languages","48,000+ families","No experience needed"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <IcoCheck />
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", fontWeight: 600 }}>{t}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}