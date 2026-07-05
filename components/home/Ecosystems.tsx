"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ChevronRight, Atom, FlaskConical } from "lucide-react";

// Shared easing curve for framer-motion transitions
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ═══════════════════════════════════
    TYPEWRITER — heading only
═══════════════════════════════════ */
function Typewriter({ segments, delay = 0.8 }: { segments: { text: string; color: string }[]; delay?: number }) {
  const full = segments.map(s => s.text).join("");
  const [count, setCount] = useState(0);
  const [go, setGo] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setGo(true), delay * 1000);
    return () => clearTimeout(t);
  }, [inView, delay]);

  useEffect(() => {
    if (!go) return;
    if (count >= full.length) return;
    const t = setTimeout(() => setCount(c => c + 1), 32);
    return () => clearTimeout(t);
  }, [go, count, full]);

  const rendered = segments.map((seg, si) => {
    const charsBefore = segments
      .slice(0, si)
      .reduce((total, current) => total + current.text.length, 0);
  
    const visibleChars = Math.max(0, count - charsBefore);
  
    return (
      <span key={si} style={{ color: seg.color }}>
        {seg.text.slice(0, visibleChars)}
      </span>
    );
  });

  return (
    <span ref={ref}>
      {rendered}
      {count < full.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.55 }}
          style={{ color: "#f5a623", fontWeight: 900 }}
        >|</motion.span>
      )}
    </span>
  );
}

/* ═══════════════════════════════════
    SCATTERED BG DOODLES
═══════════════════════════════════ */
function BgDoodles({ inView }: { inView: boolean }) {
  return (
    <svg
      viewBox="0 0 1300 900"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, overflow: "visible" }}
      fill="none"
    >
      <motion.path d="M 80 80 L 88 60 L 96 80 L 116 72 L 100 88 L 108 108 L 88 94 L 68 108 L 76 88 L 60 72 Z"
        stroke="#0a2e8a" strokeWidth="1.5" fill="none" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 0.18 } : {}} transition={{ duration: 1, delay: 0.5 }} />
      <motion.path d="M 1180 60 Q 1200 40, 1220 60 Q 1240 80, 1260 60"
        stroke="#f5a623" strokeWidth="3" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 0.35 } : {}} transition={{ duration: 0.7, delay: 0.8 }} />
      <motion.path d="M 40 820 Q 80 790, 120 820 Q 160 850, 200 820 Q 240 790, 280 820"
        stroke="#0891b2" strokeWidth="2.5" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 0.22 } : {}} transition={{ duration: 1, delay: 1.0 }} />
      <motion.path d="M 1230 800 C 1200 760, 1180 740, 1200 720 C 1220 700, 1270 710, 1280 740 C 1290 770, 1270 800, 1240 810 C 1215 818, 1200 808, 1230 800 Z"
        stroke="#7c3aed" strokeWidth="2" fill="none"
        initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 0.2 } : {}} transition={{ duration: 1, delay: 1.2 }} />
      <motion.path d="M 30 400 Q 55 420, 30 440 Q 5 460, 30 480 Q 55 500, 30 520"
        stroke="#f5a623" strokeWidth="2" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 0.28 } : {}} transition={{ duration: 1, delay: 1.4 }} />
      <motion.circle cx="1270" cy="450" r="22" stroke="#0a2e8a" strokeWidth="1.5" fill="none" strokeDasharray="5 4"
        initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 0.15 } : {}} transition={{ duration: 0.8, delay: 0.6 }} />
      {[[120, 300], [1160, 280], [600, 830], [660, 830]].map(([x, y], i) => (
        <motion.g key={i} initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 0.2, scale: 1 } : {}} transition={{ delay: 0.5 + i * 0.15 }}>
          <line x1={x - 6} y1={y - 6} x2={x + 6} y2={y + 6} stroke="#f5a623" strokeWidth="2" strokeLinecap="round" />
          <line x1={x + 6} y1={y - 6} x2={x - 6} y2={y + 6} stroke="#f5a623" strokeWidth="2" strokeLinecap="round" />
        </motion.g>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════
    HEADING DOODLE
═══════════════════════════════════ */
function HeadingDoodle({ inView }: { inView: boolean }) {
  return (
    <svg
      viewBox="0 0 1000 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) rotate(-2deg)",
        width: "min(980px, 105%)",
        height: "auto",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "visible",
      }}
    >
      <motion.path
        d="M120 60 Q500 0 880 40 M90 95 Q500 40 900 80 M70 130 Q500 80 920 120 M60 165 Q500 120 900 160 M80 200 Q500 160 860 210"
        stroke="#f5a623"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.22 } : {}}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════
    CARD DATA
═══════════════════════════════════ */
const CARDS = [
  {
    id: "TTT",
    badge: "TTT",
    logo: "/images/tttlogo.png",
    accentColor: "#0a2e8a",
    accentLight: "rgba(10,46,138,0.12)",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80&fit=crop",
    imageAlt: "Experienced teacher leading a classroom",
    eyebrow: "Teach the Teacher",
    headerLabel: "For Teachers",
    headline: "Turn Your\nPassion Into\nA Paycheck",
    subline: "Your expertise is worth more than one classroom.",
    bullets: [
      "Get certified by global education experts",
      "Train once. Earn across 120+ countries",
      "What you earn in a month — earn in hours",
    ],
    cta: "Start Earning",
    href: "/models/teach-the-teacher",
    stat: { value: "240+", label: "Educators Certified" },
    tooltipText: "Earn from your expertise, on your own schedule, from home. Set your hours, keep your freedom, and grow your income with every hour you teach.\n\nGet certified. Build your courses. Teach students across 120 countries.",
    bubbleAlign: "right" as const, // Handled dynamically in desktop grid, fallback for responsive
  },
  {
    id: "OCT",
    badge: "OCT",
    logo: "/images/octlogo.jpg",
    accentColor: "#0891b2",
    accentLight: "rgba(8,145,178,0.12)",
    imageUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&q=80&fit=crop",
    imageAlt: "Student learning online seamlessly",
    eyebrow: "OneCent Tutors",
    headerLabel: "For Students",
    headline: "Never Miss\nA Concept\nAgain",
    subline: "24/7 live teaching for every subject, any grade.",
    bullets: [
      "Immediate help, when you learn online yourself and get confused",
      "All subjects, any grade, real human tutors",
      "First session completely FREE",
      "Affordable, inexpensive subscription based tutoring model",
    ],
    cta: "Book Free Class",
    href: "/models/onecent-tutors",
    stat: { value: "50K+", label: "Sessions Booked" },
    tooltipText: "Affordable, on-demand help from real human tutors, not chatbots. Every subject, every grade.\n\nBook a tutor. Meet live. Improve with a plan built around your child. First session free.",
    bubbleAlign: "right" as const, 
  },
  {
    id: "IPST",
    badge: "IPST",
    logo: "/images/ipstlogo.jpg",
    accentColor: "#16a34a",
    accentLight: "rgba(22,163,74,0.12)",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&fit=crop",
    imageAlt: "Immigrant family planning their journey together",
    eyebrow: "Immigrant Parent Support",
    headerLabel: "For Parents",
    headline: "A New Country.\nNot A New\nStruggle.",
    subline: "Your family moves together — educationally and emotionally.",
    bullets: [
      "Plan your immigration before you land",
      "Don't leave your child's future to chance",
      "15+ languages, full family support",
      "US school systems decoded — for parents",
    ],
    cta: "Plan Your Move",
    href: "/models/ipst",
    stat: { value: "120+", label: "Countries Reached" },
    tooltipText: "Real support for newly arrived students and their parents, offered in your language.\n\nTell us your situation. Get matched with multilingual help. Walk into school with a clear plan.",
    bubbleAlign: "left" as const, 
  },
  {
    id: "AI",
    badge: "AI ✦",
    logo: "/images/ailogo.png",
    accentColor: "#7c3aed",
    accentLight: "rgba(124,58,237,0.12)",
    imageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&fit=crop",
    imageAlt: "Students competing in AI challenge",
    eyebrow: "AI Competition & Scholarships",
    headerLabel: "For Rewards",
    headline: "Your Child\nCodes. Now\nLet Them Compete.",
    subline: "From Grade 4 curiosity to global-stage achievement.",
    bullets: [
      "Open to Grade 4–8 coders worldwide",
      "Compete with AI-trained students globally",
      "Expert AI teachers sharpen every project",
      "Win certificates, trophies & scholarships",
    ],
    cta: "Enter Competition",
    href: "/ai-ecosystem",
    stat: { value: "2M+", label: "AI Lessons Created" },
    tooltipText: "Compete globally and earn scholarships through our specialized AI training ecosystems.",
    bubbleAlign: "right" as const,
  },
  {
    id: "LABTRICKS",
    badge: "LT",
    logo: "/images/labtrickslogo.jpg",
    accentColor: "#F5A623",
    accentLight: "rgba(245,166,35,0.14)",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80&fit=crop",
    imageAlt: "Student performing a real chemistry experiment in a lab",
    eyebrow: "LabTricks",
    headerLabel: "For Explorers",
    headline: "Take Science\nOut Of The\nTextbook",
    subline: "Real laboratories, real equipment, real experiments — not simulations.",
    bullets: [
      "500+ verified partner labs in 50+ cities",
      "100+ real experiments for Class 6–12",
      "Certified mentors, safety-checked equipment",
      "Earn a verified practical certificate",
    ],
    cta: "Find Nearby Labs",
    href: "/models/labtrick",
    stat: { value: "500+", label: "Partner Labs" },
    tooltipText: "Explore real-world laboratories and conduct real experiments near you.",
    bubbleAlign: "left" as const,
  },
];

/* ═══════════════════════════════════
    MESSAGE-BUBBLE TOOLTIP (Modified for horizontal placement)
═══════════════════════════════════ */
function MessageBubble({
  text,
  color,
  side,
  visible,
}: {
  text: string;
  color: string;
  side: "left" | "right";
  visible: boolean;
}) {
  // Desktop positioning logic based on side orientation
  const horizontalPosition =
    side === "left"
      ? { right: "calc(100% + 24px)", left: "auto" }
      : { left: "calc(100% + 24px)", right: "auto" };

  const tailPosition =
    side === "left"
      ? { right: "-7px", left: "auto", borderLeft: `1.5px solid ${color}35`, borderTop: `1.5px solid ${color}35` }
      : { left: "-7px", right: "auto", borderRight: `1.5px solid ${color}35`, borderBottom: `1.5px solid ${color}35` };

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? 15 : -15 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : (side === "left" ? 15 : -15) }}
      transition={{ duration: 0.25, ease: EASE }}
      className={`tooltip-bubble side-${side}`}
      style={{
        position: "absolute",
        top: "10%",
        ...horizontalPosition,
        width: "min(300px, 88vw)",
        zIndex: 60,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          background: "#ffffff",
          borderRadius: "16px",
          border: `1.5px solid ${color}35`,
          boxShadow: "0 24px 56px rgba(16,32,78,0.2), 0 4px 14px rgba(16,32,78,0.08)",
          padding: "1.15rem 1.3rem",
        }}
      >
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "5px",
          borderRadius: "16px 16px 0 0",
          background: color,
        }} />
        <p style={{
          fontFamily: "'Geist', sans-serif",
          fontSize: "0.85rem",
          lineHeight: 1.7,
          color: "#10204e",
          fontWeight: 500,
          whiteSpace: "pre-line",
          margin: 0,
        }}>
          {text}
        </p>
        {/* Tail turned towards the card container */}
        <div style={{
          position: "absolute",
          top: "35px",
          width: "14px",
          height: "14px",
          background: "#ffffff",
          transform: "rotate(45deg)",
          ...tailPosition,
        }} />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════
    INDIVIDUAL CARD
═══════════════════════════════════ */
function EcoCard({ card, index, forceSide }: { card: typeof CARDS[0] & { logo: string; bubbleAlign?: "left" | "center" | "right" }; index: number; forceSide?: "left" | "right" }) {
  const [hovered, setHovered] = useState(false);
  const side = forceSide ?? (card.bubbleAlign === "left" ? "left" : "right");

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.11, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
        borderRadius: "24px",
        background: "#ffffff",
        border: `2px solid ${hovered ? card.accentColor : "rgba(10,46,138,0.08)"}`,
        boxShadow: hovered
          ? `0 28px 70px ${card.accentColor}22, 0 8px 24px rgba(0,0,0,0.09)`
          : "0 2px 20px rgba(10,46,138,0.06)",
        transition: "all 0.38s cubic-bezier(0.22, 1, 0.36, 1)",
        cursor: "pointer",
      }}
    >
      {/* ── HOVER MESSAGE BUBBLE (positioned to side horizontally) ── */}
      {card.tooltipText && (
        <MessageBubble
          text={card.tooltipText}
          color={card.accentColor}
          side={side}
          visible={hovered}
        />
      )}

      {/* ── IMAGE AREA ── */}
      <div style={{
        position: "relative",
        height: "260px",
        overflow: "hidden",
        flexShrink: 0,
        borderRadius: "22px 22px 0 0",
      }}>
        {/* Photo */}
        <motion.img
          src={card.imageUrl}
          alt={card.imageAlt}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* Gradient overlay */}
        <motion.div
          animate={{ opacity: hovered ? 0.78 : 0.58 }}
          transition={{ duration: 0.35 }}
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(175deg, ${card.accentColor}cc 0%, ${card.accentColor}88 50%, transparent 100%)`,
          }}
        />

        {/* Stat pill top-right */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + index * 0.12 }}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            background: "rgba(255,255,255,0.18)",
            border: "1.5px solid rgba(255,255,255,0.38)",
            backdropFilter: "blur(10px)",
            borderRadius: "14px",
            padding: "6px 12px",
          }}
        >
          <span style={{
            fontFamily: "'Geist Variable', 'Geist', sans-serif",
            fontSize: "1.15rem",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.1,
          }}>
            {card.stat.value}
          </span>
          <span style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: "0.58rem",
            color: "rgba(255,255,255,0.82)",
            letterSpacing: "0.04em",
            marginTop: 1,
          }}>
            {card.stat.label}
          </span>
        </motion.div>

{/* Service Name */}
<div
  style={{
    position: "absolute",
    bottom: 16,
    left: 12,

    display: "inline-flex",
    alignItems: "center",

    padding: "8px 14px",
    borderRadius: "999px",

    background: "rgba(255,255,255,0.18)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",

    border: "1px solid rgba(255,255,255,0.35)",
    boxShadow:
      "0 8px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.35)",

    fontFamily: "'Geist', sans-serif",
    fontSize: "0.64rem",
    fontWeight: 800,
    color: "#7A1224",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  }}
>
  {card.eyebrow}
</div>
      </div>

      {/* ── BODY ── */}
      <div style={{
        padding: "1.5rem 1.65rem 1.75rem",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}>

        {/* Headline row */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "0.75rem",
          marginBottom: "0.6rem",
        }}>
          <h3 style={{
            fontFamily: "'Geist Variable', 'Geist', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.35rem, 1.6vw, 1.72rem)",
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
            color: "#10204e",
            margin: 0,
            whiteSpace: "pre-line",
            flex: 1,
          }}>
            {card.headline}
          </h3>

          <div style={{
            width: "60px",
            height: "60px",
            borderRadius: "18px",
            background: "#ffffff",
            border: `1.5px solid ${card.accentColor}30`,
            boxShadow: `0 6px 20px ${card.accentColor}22`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4px",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <img
              src={card.logo}
              alt={`${card.id} logo`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Wavy accent divider */}
        <svg viewBox="0 0 160 10" style={{ width: 160, display: "block", marginBottom: "0.8rem" }}>
          <motion.path
            d="M 0 5 Q 14 2, 28 5 Q 42 8, 56 5 Q 70 2, 84 5 Q 98 8, 112 5 Q 126 2, 140 5 Q 150 3.5, 160 5"
            stroke={card.accentColor} strokeWidth="2.5" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.25 + index * 0.1 }}
          />
        </svg>

        {/* Subline */}
        <p style={{
          fontFamily: "'Geist', sans-serif",
          fontSize: "0.82rem",
          lineHeight: 1.65,
          color: "#5a6a96",
          margin: "0 0 1.1rem 0",
          fontWeight: 400,
        }}>
          {card.subline}
        </p>

        {/* Bullet list */}
        <ul style={{
          margin: "0 0 1.4rem 0",
          padding: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          flex: 1,
        }}>
          {card.bullets.map((b, i) => (
            <li key={i} style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.6rem",
              fontFamily: "'Geist', sans-serif",
              fontSize: "0.8rem",
              lineHeight: 1.45,
              color: "#2d3a5e",
              fontWeight: 450,
            }}>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: card.accentLight,
                border: `1.5px solid ${card.accentColor}35`,
                flexShrink: 0,
                marginTop: "1px",
              }}>
                <ChevronRight size={10} style={{ color: card.accentColor }} strokeWidth={3} />
              </span>
              {b}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.a
          href={card.href}
          animate={{
            background: hovered ? card.accentColor : "transparent",
            color: hovered ? "#ffffff" : card.accentColor,
          }}
          transition={{ duration: 0.22 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.4rem",
            padding: "0.72rem 0",
            borderRadius: "12px",
            border: `2px solid ${card.accentColor}`,
            fontFamily: "'Geist Variable', 'Geist', sans-serif",
            fontSize: "0.82rem",
            fontWeight: 700,
            letterSpacing: "0.01em",
            textDecoration: "none",
            transition: "all 0.22s cubic-bezier(0.22, 1, 0.36, 1)",
            width: "100%",
          }}
        >
          {card.cta}
          <ArrowUpRight size={14} strokeWidth={2.5} />
        </motion.a>
      </div>

      {/* Bottom accent line on hover */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          height: "4px",
          background: `linear-gradient(90deg, transparent 0%, ${card.accentColor} 30%, ${card.accentColor} 70%, transparent 100%)`,
          transformOrigin: "center",
          flexShrink: 0,
        }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════
    CTA BUTTON
═══════════════════════════════════ */
function CTABtn({ href, primary, color, children }: { href: string; primary?: boolean; color: string; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        padding: "0.88rem 2.1rem",
        borderRadius: "999px",
        background: primary
          ? hov ? "#0c3aaa" : color
          : hov ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.82)",
        border: primary ? "none" : `2px solid ${color}22`,
        color: primary ? "#fff" : color,
        fontFamily: "'Geist Variable', 'Geist', sans-serif",
        fontSize: "0.93rem",
        fontWeight: 700,
        letterSpacing: "-0.015em",
        textDecoration: "none",
        boxShadow: primary
          ? hov ? `0 12px 40px ${color}48` : `0 5px 26px ${color}32`
          : "0 2px 14px rgba(10,46,138,0.07)",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.22s cubic-bezier(0.22, 1, 0.36, 1)",
        backdropFilter: "blur(10px)",
      }}
    >
      {children}
    </a>
  );
}

/* ═══════════════════════════════════
    SIDE-GAP DOODLE
═══════════════════════════════════ */
function SideDoodle({ icon, color, delay }: { icon: "atom" | "flask"; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 0.22, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        minHeight: "160px",
      }}
    >
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {icon === "atom" ? (
          <Atom size={44} color={color} strokeWidth={1.4} />
        ) : (
          <FlaskConical size={44} color={color} strokeWidth={1.4} />
        )}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════
    MAIN EXPORT
═══════════════════════════════════ */
export default function Ecosystems() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-60px" });
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-40px" });

  const row1 = CARDS.slice(0, 3);
  const row2 = CARDS.slice(3, 5);

  return (
    <section
      id="ecosystem"
      ref={sectionRef}
      style={{
        background: "#f0f5ff",
        padding: "clamp(88px, 11vw, 140px) clamp(24px, 5vw, 80px)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Geist', 'Geist Variable', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }

        .eco-grid{
          display:grid;
          grid-template-columns:repeat(6, 1fr);
          gap:clamp(16px, 2vw, 28px);
        }
        .eco-cell-1{ grid-column: 1 / 3; grid-row: 1; }
        .eco-cell-2{ grid-column: 3 / 5; grid-row: 1; }
        .eco-cell-3{ grid-column: 5 / 7; grid-row: 1; }
        .eco-doodle-left{ grid-column: 1 / 2; grid-row: 2; }
        .eco-cell-4{ grid-column: 2 / 4; grid-row: 2; }
        .eco-cell-5{ grid-column: 4 / 6; grid-row: 2; }
        .eco-doodle-right{ grid-column: 6 / 7; grid-row: 2; }

        /* Media adjustments to fall back cleanly when stacked vertically */
        @media (max-width: 1200px) {
          .tooltip-bubble {
            right: 0 !important;
            left: 0 !important;
            margin: 0 auto;
            top: auto !important;
            bottom: calc(100% + 16px) !important;
            width: 94% !important;
          }
          .tooltip-bubble [style*="top: 35px"] {
             top: auto !important;
             bottom: -7px !important;
             left: 50% !important;
             right: auto !important;
             transform: translateX(-50%) rotate(45deg) !important;
             border-left: none !important;
             border-top: none !important;
             border-right: 1.5px solid rgba(0,0,0,0.1) !important;
             border-bottom: 1.5px solid rgba(0,0,0,0.1) !important;
          }
        }

        @media (max-width: 900px){
          .eco-grid{ grid-template-columns: repeat(2, 1fr); }
          .eco-cell-1,.eco-cell-2,.eco-cell-3,.eco-cell-4,.eco-cell-5{
            grid-column: span 2 !important; grid-row: auto !important;
          }
          .eco-doodle-left,.eco-doodle-right{ display:none; }
        }
        @media (max-width: 600px){
          .eco-grid{ grid-template-columns: 1fr; }
          .eco-cell-1,.eco-cell-2,.eco-cell-3,.eco-cell-4,.eco-cell-5{
            grid-column: span 1 !important;
          }
        }
      `}</style>

      {/* Ambient bg orbs */}
      <div style={{ position: "absolute", top: -180, left: -100, width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(10,46,138,0.06), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -140, right: -100, width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,166,35,0.07), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "38%", left: "35%", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.04), transparent 70%)", pointerEvents: "none" }} />

      {/* Scattered bg doodles */}
      <BgDoodles inView={sectionInView} />

      <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ══ HEADER ══ */}
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: "clamp(52px, 7vw, 80px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{ position: "relative", display: "inline-block", marginBottom: "0.5rem" }}
          >
            <HeadingDoodle inView={inView} />
            <h2 style={{
              position: "relative",
              zIndex: 1,
              fontFamily: "'Geist Variable', 'Geist', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 4.2vw, 3.8rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#10204e",
              margin: "0",
              padding: "clamp(18px, 3vw, 28px) clamp(28px, 5vw, 60px)",
            }}>
              <Typewriter
                segments={[
                  { text: "Five Ecosystems ", color: "#0a2e8a" },
                  { text: "One", color: "#f5a623" },
                  { text: " One Platform For All", color: "#0a2e8a" },
                ]}
                delay={0.7}
              />
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.28 }}
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "clamp(0.92rem, 1.2vw, 1.08rem)",
              lineHeight: 1.75,
              color: "#3d4f82",
              maxWidth: "600px",
              margin: "1.4rem auto 0",
              fontWeight: 400,
            }}
          >
            From certifying teachers to matching AI tutors — i4iSciences powers the full
            global education lifecycle through five deeply integrated systems.
          </motion.p>
        </div>

        {/* ══ CARD GRID ══ */}
        <div className="eco-grid">
          {row1.map((card, i) => (
            <div key={card.id} className={`eco-cell-${i + 1}`} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.11, ease: EASE }}
                style={{
                  textAlign: "center",
                  fontFamily: "'Geist Variable', 'Geist', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  letterSpacing: "-0.01em",
                  color: card.accentColor,
                  marginBottom: "0.85rem",
                }}
              >
                {card.headerLabel}
              </motion.div>
              {/* Force right-alignment for cards 1 & 2, left-alignment for card 3 */}
              <EcoCard card={card} index={i} forceSide={i === 2 ? "left" : "right"} />
            </div>
          ))}

          <div className="eco-doodle-left">
            <SideDoodle icon="atom" color="#0a2e8a" delay={0.2} />
          </div>

          {row2.map((card, i) => (
            <div key={card.id} className={`eco-cell-${i + 4}`} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i + 3) * 0.11, ease: EASE }}
                style={{
                  textAlign: "center",
                  fontFamily: "'Geist Variable', 'Geist', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  letterSpacing: "-0.01em",
                  color: card.accentColor,
                  marginBottom: "0.85rem",
                }}
              >
                {card.headerLabel}
              </motion.div>
              {/* Row 2 handles positions cleanly based on space */}
              <EcoCard card={card} index={i + 3} />
            </div>
          ))}

          <div className="eco-doodle-right">
            <SideDoodle icon="flask" color="#F5A623" delay={0.4} />
          </div>
        </div>

        {/* ══ CTA STRIP ══ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.3 }}
          style={{
            marginTop: "clamp(56px, 7vw, 80px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.1rem",
            flexWrap: "wrap",
            position: "relative",
          }}
        >
          <svg style={{ position: "absolute", top: -36, left: "50%", transform: "translateX(-50%)", width: 220, overflow: "visible", pointerEvents: "none" }} viewBox="0 0 220 36">
            <motion.path d="M 10 30 Q 110 4, 210 30"
              stroke="#f5a623" strokeWidth="2.5" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.5 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }} />
            <motion.path d="M 196 22 L 210 30 L 198 36"
              stroke="#f5a623" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.5 }} viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 1.3 }} />
          </svg>

          <CTABtn href="#platform" primary color="#0a2e8a">
            Explore All Ecosystems <ArrowUpRight size={16} strokeWidth={2.5} />
          </CTABtn>
          <CTABtn href="#demo" color="#0a2e8a">
            Book Enterprise Demo
          </CTABtn>
        </motion.div>
      </div>
    </section>
  );
}