"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import WaitlistForm from "@/components/postdocworks/WaitlistForm";

const EASE = [0.22, 1, 0.36, 1] as const;

const C = {
  ink: "#0B1220",
  text: "#1B2540",
  textMuted: "#5B6478",
  textFaint: "#8991A3",
  navy: "#0A2E8A",
  gold: "#F5A623",
  white: "#FFFFFF",
  bgAlt: "#F7F8FA",
  bgAlt2: "#F4F6FA",
  border: "#E5E7EE",
  borderStrong: "#D6DAE3",
};

const FONT = "var(--font-geist-sans), 'Geist', -apple-system, BlinkMacSystemFont, sans-serif";

const ROLES = ["PhD", "Postdoc"] as const;
type Role = (typeof ROLES)[number];

const STEPS = [
  {
    n: "1",
    title: "Career-stage matching",
    desc: "Matched across the 12-pillar taxonomy — field, stage, and geography — not just keyword search.",
  },
  {
    n: "2",
    title: "Research credibility profile",
    desc: "Your profile carries the same verification standard as the rest of PostdocWorks Navigator.",
  },
  {
    n: "3",
    title: "Direct connection",
    desc: "Confidentiality and IP protections built in from the first message onward.",
  },
];

function FadeIn({
  children,
  delay = 0,
  y = 20,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function Doc2PostdocPage() {
  const [role, setRole] = useState<Role>("PhD");

  return (
    <main style={{ fontFamily: FONT, background: C.white, overflowX: "hidden" }}>
      {/* ══════════════════════════════════════
          HERO
          ══════════════════════════════════════ */}
      <section style={{ background: C.white, paddingTop: "clamp(140px, 16vw, 180px)", paddingBottom: 88 }}>
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <FadeIn>
            <Link
              href="/postdocworks"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                color: C.textMuted,
                textDecoration: "none",
                marginBottom: 28,
              }}
            >
              <ArrowLeft size={14} strokeWidth={2.5} /> PostdocWorks
            </Link>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                borderRadius: 999,
                border: `1px solid ${C.border}`,
                fontSize: 13,
                fontWeight: 600,
                color: C.textMuted,
                marginBottom: 28,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold }} />
              A PostdocWorks venture
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1
              style={{
                fontSize: "clamp(34px, 4.6vw, 52px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: C.ink,
                margin: "0 0 22px",
              }}
            >
              Where the next step has already been taken.
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p
              style={{
                fontSize: "clamp(15.5px, 1.5vw, 18px)",
                lineHeight: 1.65,
                color: C.textMuted,
                maxWidth: 600,
                margin: "0 auto 40px",
              }}
            >
              Doc2Postdoc pairs every PhD facing the postdoc transition with peers and postdocs
              who&rsquo;ve already made the same move — by field, career stage, and institution type.
              Launching inside PostdocWorks Navigator.
            </p>
          </FadeIn>

          <FadeIn delay={0.22}>
            <div
              style={{
                display: "inline-flex",
                padding: 4,
                borderRadius: 10,
                background: C.bgAlt,
                border: `1px solid ${C.border}`,
                marginBottom: 28,
              }}
            >
              {ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  style={{
                    padding: "9px 22px",
                    borderRadius: 8,
                    border: "none",
                    background: role === r ? C.white : "transparent",
                    boxShadow: role === r ? "0 1px 2px rgba(11,18,32,0.08)" : "none",
                    color: role === r ? C.ink : C.textMuted,
                    fontFamily: FONT,
                    fontSize: 13.5,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.28}>
            <WaitlistForm
              source="doc2postdoc"
              role={role}
              buttonLabel="Notify me at launch"
            />
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW MATCHING WORKS
          ══════════════════════════════════════ */}
      <section id="how-it-works" style={{ background: C.bgAlt, padding: "96px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
              <div
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: C.navy,
                  marginBottom: 14,
                }}
              >
                How matching works
              </div>
              <h2
                style={{
                  fontSize: "clamp(24px, 2.8vw, 32px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: C.ink,
                  margin: 0,
                  lineHeight: 1.25,
                }}
              >
                Three steps between &ldquo;I don&rsquo;t know anyone who&rsquo;s done this&rdquo; and a
                direct conversation with someone who has.
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {STEPS.map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.1}>
                <div
                  style={{
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    borderRadius: 16,
                    padding: "30px 26px",
                    height: "100%",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: C.navy,
                      color: C.white,
                      fontSize: 14,
                      fontWeight: 700,
                      marginBottom: 18,
                    }}
                  >
                    {s.n}
                  </span>
                  <h3 style={{ fontSize: 16.5, fontWeight: 700, color: C.ink, margin: "0 0 10px" }}>{s.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: C.textMuted, margin: 0 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FINAL CTA
          ══════════════════════════════════════ */}
      <section style={{ background: C.white, padding: "112px 24px" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <h2
              style={{
                fontSize: "clamp(26px, 3vw, 34px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: C.ink,
                margin: "0 0 14px",
              }}
            >
              Be first through when it opens.
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, color: C.textMuted, margin: "0 0 32px" }}>
              Doc2Postdoc launches as the first visible capability inside PostdocWorks Navigator.
            </p>
            <WaitlistForm source="doc2postdoc" role={role} buttonLabel="Notify me at launch" />
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BRAND FOOTNOTE
          ══════════════════════════════════════ */}
      <section style={{ background: C.bgAlt, padding: "28px 24px", borderTop: `1px solid ${C.border}` }}>
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 13, color: C.textMuted }}>© PostdocWorks — a venture of i4iSciences</span>
          <Link
            href="/postdocworks"
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: C.navy,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            Visit PostdocWorks <ArrowRight size={13} strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}
