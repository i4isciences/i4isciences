"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Users, GraduationCap, Globe, Clock, Star,
  ArrowRight, Play,
} from "lucide-react";

/* Easing used for framer-motion transitions */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─────────────────────────────────────────
   Scrolling ticker data
───────────────────────────────────────── */
const TICKER_ITEMS = [
  { icon: Users,          value: "10M+",       label: "Learners Impacted" },
  { icon: GraduationCap,  value: "500K+",      label: "Certified Educators" },
  { icon: Globe,          value: "120+",       label: "Countries Connected" },
  { icon: Clock,          value: "24/7",       label: "Learning Support" },
  { icon: Star,           value: "AI-Powered", label: "Personalized Learning" },
];

/* Duplicate so the strip loops seamlessly */
const TICKER_DOUBLED = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

/* ─────────────────────────────────────────
   Label card (bottom-left / bottom-right)
───────────────────────────────────────── */
function PersonLabel({
  side,
  title,
  subtitle,
}: {
  side: "left" | "right";
  title: string;
  subtitle: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "calc(clamp(64px,10vw,120px) + 72px)", /* sits above ticker */
        ...(side === "left" ? { left: "clamp(16px,4vw,60px)" } : { right: "clamp(16px,4vw,60px)" }),
        display: "flex",
        flexDirection: "column",
        gap: 4,
        zIndex: 10,
      }}
    >
      <span
        style={{
          fontFamily: "'Geist','Geist Variable',sans-serif",
          fontSize: "0.68rem",
          fontWeight: 800,
          letterSpacing: "0.16em",
          color: "#F5A623",
          textTransform: "uppercase",
        }}
      >
        {title}
      </span>
      <span
        style={{
          fontFamily: "'Geist','Geist Variable',sans-serif",
          fontSize: "0.78rem",
          fontWeight: 500,
          color: "rgba(255,255,255,0.70)",
          lineHeight: 1.45,
          maxWidth: 160,
          textAlign: side === "right" ? "right" : "left",
        }}
      >
        {subtitle}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────
   Infinite ticker strip
───────────────────────────────────────── */
function TickerStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef  = useRef<number>(0);
  const posRef   = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const SPEED = 0.55; /* px per frame — adjust for feel */

    const step = () => {
      posRef.current -= SPEED;
      /* Reset once we've scrolled exactly half the duplicated list */
      const halfW = track.scrollWidth / 4;
      if (Math.abs(posRef.current) >= halfW) {
        posRef.current = 0;
      }
      track.style.transform = `translateX(${posRef.current}px)`;
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    /* Outer clip container */
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "clamp(64px,10vw,88px)",
        overflow: "hidden",
        background: "rgba(8,16,44,0.82)",
        backdropFilter: "blur(0px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        zIndex: 20,
      }}
    >
      {/* Moving track */}
      <div
        ref={trackRef}
        style={{
          display: "inline-flex",
          alignItems: "center",
          height: "100%",
          willChange: "transform",
          whiteSpace: "nowrap",
        }}
      >
        {TICKER_DOUBLED.map((item, i) => {
          const Icon = item.icon;
          const isLast = i === TICKER_DOUBLED.length - 1;
          return (
            <div
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0 clamp(24px,3.5vw,48px)",
                flexShrink: 0,
              }}
            >
              {/* Icon bubble */}
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "rgba(245,166,35,0.14)",
                  flexShrink: 0,
                }}
              >
                <Icon
                  size={18}
                  strokeWidth={1.7}
                  style={{ color: "#F5A623" }}
                />
              </span>

              {/* Text */}
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                <span
                  style={{
                    fontFamily: "'Geist','Geist Variable',sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(0.9rem,1.3vw,1.05rem)",
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.value}
                </span>
                <span
                  style={{
                    fontFamily: "'Geist','Geist Variable',sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.50)",
                  }}
                >
                  {item.label}
                </span>
              </div>

              {/* Divider */}
              {!isLast && (
                <div
                  style={{
                    marginLeft: "clamp(24px,3.5vw,48px)",
                    width: 1,
                    height: 28,
                    background: "rgba(255,255,255,0.12)",
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   HERO SECTION — EXACT MATCH TO REFERENCE
───────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "auto",
        aspectRatio: "16/9", // or whatever your image ratio is
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ── FULL BACKGROUND IMAGE (complete image, no top/bottom cropping, natural gap from image itself) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src="/images/hero.png"
          alt=""
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            display: "block",
            userSelect: "none",
          }}
        />

        {/* Subtle vignette so text pops while keeping image vibrant */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(5,10,30,0.18) 0%, rgba(5,10,30,0.10) 60%, rgba(5,10,30,0.55) 100%)",
          }}
        />
      </div>


      {/* ── CENTRE CONTENT ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          /* Slightly wider to perfectly accommodate 2-line headline without overflow */
          maxWidth: "clamp(620px, 66vw, 980px)",
          padding: "0 clamp(16px,4vw,48px)",
          /* Push up slightly to account for ticker height at bottom */
          marginBottom: "clamp(64px,10vw,88px)",
          transform: "translateY(-4vh)",
        }}
      >
        {/* Headline — EXACTLY 2 LINES, sized to match reference perfectly */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE }}
          style={{
            fontFamily: "'Geist','Geist Variable',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.25rem, 5.15vw, 3.6rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            marginBottom: "0.6rem",
          }}
        >
          Where{" "}
          <span style={{ color: "#F5A623" }}>Human Intelligence</span>
          <br />
          Meets{" "}
          <span style={{ color: "#F5A623" }}>Artificial Intelligence</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.14, ease: EASE }}
          style={{
            fontFamily: "'Geist','Geist Variable',sans-serif",
            fontSize: "clamp(0.88rem,1.35vw,1.05rem)",
            fontWeight: 400,
            lineHeight: 1.72,
            color: "rgba(255,255,255,0.78)",
            maxWidth: 520,
            margin: "0 auto 2rem",
          }}
        >
          i4i Sciences connects educators and learners through an AI-powered
          ecosystem that inspires growth, accelerates learning, and builds a
          smarter future for all.
        </motion.p>

        {/* CTA buttons — exact styling from reference */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.26, ease: EASE }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {/* Primary — gold */}
          <a
            href="#ecosystem"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.85rem 2rem",
              borderRadius: 999,
              background: "#F5A623",
              color: "#0B2A83",
              fontFamily: "'Geist','Geist Variable',sans-serif",
              fontSize: "0.92rem",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              textDecoration: "none",
              boxShadow: "0 6px 28px rgba(245,166,35,0.40)",
              transition: "transform 0.22s ease, box-shadow 0.22s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 10px 36px rgba(245,166,35,0.55)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 6px 28px rgba(245,166,35,0.40)";
            }}
          >
            Explore Ecosystem
            <ArrowRight size={15} strokeWidth={2.5} />
          </a>

          {/* Secondary — outline with play icon */}
          <a
            href="#demo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              padding: "0.85rem 2rem",
              borderRadius: 999,
              background: "rgba(255,255,255,0.06)",
              border: "1.5px solid rgba(255,255,255,0.28)",
              color: "#ffffff",
              fontFamily: "'Geist','Geist Variable',sans-serif",
              fontSize: "0.92rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              textDecoration: "none",
              backdropFilter: "blur(6px)",
              transition: "background 0.22s ease, transform 0.22s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "rgba(255,255,255,0.14)";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(0)";
            }}
          >
            {/* Play circle icon matching the image */}
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 22,
                height: 22,
                borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.55)",
              }}
            >
              <Play size={9} fill="white" stroke="none" />
            </span>
            Watch A Video
          </a>
        </motion.div>
      </div>

      {/* ── TICKER STRIP ── */}
      <TickerStrip />
    </section>
  );
}
