"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";

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
    headline: "Turn Your\nPassion Into\nA Paycheck",
    subline: "Your expertise is worth more than one classroom.",
    bullets: [
      "Get certified by global education experts",
      "Train once. Earn across 120+ countries",
      "What you earn in a month — earn in hours",
      "AI-powered courses you build and own",
    ],
    cta: "Start Earning",
    stat: { value: "240+", label: "Educators Certified" },
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
    headline: "Never Miss\nA Concept\nAgain",
    subline: "24/7 live teaching for every subject, every doubt.",
    bullets: [
      "On-the-spot help when your class moves on",
      "All subjects, any grade, real human tutors",
      "First 2 sessions completely FREE",
      "Subscription that costs less than a textbook",
    ],
    cta: "Book Free Class",
    stat: { value: "50K+", label: "Sessions Booked" },
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
    headline: "A New Country.\nNot A New\nStruggle.",
    subline: "Your family moves together — educationally and emotionally.",
    bullets: [
      "Plan your immigration before you land",
      "Don't leave your child's future to chance",
      "15+ languages, full family support",
      "US school systems decoded — for parents",
    ],
    cta: "Plan Your Move",
    stat: { value: "120+", label: "Countries Reached" },
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
    headline: "Your Child\nCodes. Now\nLet Them Compete.",
    subline: "From Grade 4 curiosity to global-stage achievement.",
    bullets: [
      "Open to Grade 4–8 coders worldwide",
      "Compete with AI-trained students globally",
      "Expert AI teachers sharpen every project",
      "Win certificates, trophies & scholarships",
    ],
    cta: "Enter Competition",
    stat: { value: "2M+", label: "AI Lessons Created" },
  },
];

/* ═══════════════════════════════════
   INDIVIDUAL CARD
═══════════════════════════════════ */
function EcoCard({ card, index }: { card: typeof CARDS[0] & { logo: string }; index: number }) {
  const [hovered, setHovered] = useState(false);

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
        borderRadius: "24px",
        overflow: "hidden",
        background: "#ffffff",
        border: `2px solid ${hovered ? card.accentColor : "rgba(10,46,138,0.08)"}`,
        boxShadow: hovered
          ? `0 28px 70px ${card.accentColor}22, 0 8px 24px rgba(0,0,0,0.09)`
          : "0 2px 20px rgba(10,46,138,0.06)",
        transition: "all 0.38s cubic-bezier(0.22, 1, 0.36, 1)",
        cursor: "pointer",
      }}
    >
      {/* ── IMAGE AREA ── */}
      <div style={{
        position: "relative",
        height: "260px",
        overflow: "hidden",
        flexShrink: 0,
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

        {/* Gradient overlay — always present, intensifies on hover */}
        <motion.div
          animate={{ opacity: hovered ? 0.78 : 0.58 }}
          transition={{ duration: 0.35 }}
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(175deg, ${card.accentColor}cc 0%, ${card.accentColor}88 50%, transparent 100%)`,
          }}
        />

        {/* Logo badge top-left — replaces text tag */}
        <div style={{
          position: "absolute",
          top: 14,
          left: 14,
          width: "52px",
          height: "52px",
          borderRadius: "14px",
          background: "rgba(255,255,255,0.92)",
          border: "1.5px solid rgba(255,255,255,0.7)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.14)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6px",
          overflow: "hidden",
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

        {/* Eyebrow on the photo */}
        <div style={{
          position: "absolute",
          bottom: 16,
          left: 18,
          fontFamily: "'Geist', sans-serif",
          fontSize: "0.68rem",
          fontWeight: 700,
          color: "rgba(255,255,255,0.85)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}>
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

        {/* Headline */}
        <h3 style={{
          fontFamily: "'Geist Variable', 'Geist', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.35rem, 1.6vw, 1.72rem)",
          lineHeight: 1.12,
          letterSpacing: "-0.03em",
          color: "#10204e",
          margin: "0 0 0.6rem 0",
          whiteSpace: "pre-line",
        }}>
          {card.headline}
        </h3>

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
          href="#"
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
   MAIN EXPORT
═══════════════════════════════════ */
export default function Ecosystems() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-60px" });
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-40px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#f0f5ff",
        padding: "clamp(88px, 11vw, 140px) clamp(24px, 5vw, 80px)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Geist', 'Geist Variable', sans-serif",
      }}
    >
      {/* Geist font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
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

          {/* Heading with doodle behind */}
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
                  { text: "Four Ecosystems. ", color: "#0a2e8a" },
                  { text: "One", color: "#f5a623" },
                  { text: " Unified Platform.", color: "#0a2e8a" },
                ]}
                delay={0.7}
              />
            </h2>
          </motion.div>

          {/* Subheading */}
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
            From certifying teachers to matching AI tutors — WingsUP powers the full
            global education lifecycle through four deeply integrated systems.
          </motion.p>
        </div>

        {/* ══ 4-COLUMN CARD GRID ══ */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "clamp(16px, 2vw, 28px)",
        }}>
          {CARDS.map((card, i) => (
            <EcoCard key={card.id} card={card} index={i} />
          ))}
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
          {/* Doodle arc above CTA */}
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