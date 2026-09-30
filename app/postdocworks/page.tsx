"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FileCheck2,
  UserCheck,
  Activity,
  FileSearch,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import WaitlistForm from "@/components/postdocworks/WaitlistForm";
import { Eye } from "@/components/postdocworks/eye/Eye";

/* ─────────────────────────────────────────────
   TOKENS
   ───────────────────────────────────────────── */
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
  eyeweeBg: "#E6DDD3",
  eyeweeBorder: "#DCD2C3",
};

const FONT = "var(--font-geist-sans), 'Geist', -apple-system, BlinkMacSystemFont, sans-serif";

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */
const ROLES = ["PhD", "Postdoc", "Faculty / Industry"] as const;
type Role = (typeof ROLES)[number];

const ROLE_COPY: Record<Role, string> = {
  PhD: "See who's already made this move — and how they got there.",
  Postdoc: "Find your next position on signal that's actually been checked.",
  "Faculty / Industry": "Reach verified talent without wading through the noise.",
};

const TIERS = [
  {
    n: "01",
    icon: FileCheck2,
    title: "Publication-Verified",
    desc: "Issued automatically from your published record. Auto-revoked if a linked publication is later retracted.",
  },
  {
    n: "02",
    icon: UserCheck,
    title: "PI-Endorsed",
    desc: "Confirmed directly by your principal investigator or lab lead.",
  },
  {
    n: "03",
    icon: Activity,
    title: "Platform-Proven",
    desc: "Earned through sustained activity across the network — applications, endorsements, referrals — reassessed every six months.",
  },
];

const PROFILES = [
  {
    initials: "AN",
    name: "Dr. Amara N.",
    field: "Molecular Biology",
    place: "R1 research university",
    stage: "2 years post-PhD",
    tier: "Publication-Verified",
  },
  {
    initials: "WL",
    name: "Dr. Wei L.",
    field: "Materials Science",
    place: "National laboratory",
    stage: "1 year post-PhD",
    tier: "PI-Endorsed",
  },
  {
    initials: "SR",
    name: "Dr. Sofia R.",
    field: "Cognitive Neuroscience",
    place: "Teaching hospital",
    stage: "3 years post-PhD",
    tier: "Platform-Proven",
  },
];

const COMPARISON = [
  { label: "Identity & credentials", pdw: "Publication + PI-confirmed", trad: "Self-reported" },
  { label: "Peer & mentor matching", pdw: "Built in, via Doc2Postdoc", trad: "Not offered" },
  { label: "Accountability if something goes wrong", pdw: "Appeals & fairness policy", trad: "No formal recourse" },
  { label: "Badge integrity", pdw: "Auto-revoked on retraction", trad: "Not tracked" },
  { label: "Pricing model", pdw: "In design", trad: "Per-post listing fee" },
];

const EYEWEE_FEATURES = [
  { icon: FileSearch, title: "Reads the record", desc: "Parses a published record the moment it's linked, and revisits it if a retraction shows up later." },
  { icon: UserCheck, title: "Checks the endorsement", desc: "Confirms a PI or lab lead endorsement traces back to a real, verifiable source." },
  { icon: RefreshCw, title: "Reassesses over time", desc: "Watches platform activity — applications, endorsements, referrals — and rescoring runs every six months." },
];

/* ─────────────────────────────────────────────
   SMALL PRIMITIVES
   ───────────────────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
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
      {children}
    </div>
  );
}

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

function PrimaryButton({
  href,
  onClick,
  children,
  dark = false,
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  dark?: boolean;
}) {
  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "14px 28px",
    borderRadius: 10,
    background: dark ? C.white : C.navy,
    color: dark ? C.navy : C.white,
    fontFamily: FONT,
    fontSize: 15,
    fontWeight: 600,
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
  };
  if (href) {
    return (
      <Link href={href} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} style={style}>
      {children}
    </button>
  );
}

function SecondaryButton({
  href,
  onClick,
  children,
  dark = false,
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  dark?: boolean;
}) {
  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "13px 26px",
    borderRadius: 10,
    background: "transparent",
    color: dark ? C.white : C.navy,
    fontFamily: FONT,
    fontSize: 15,
    fontWeight: 600,
    textDecoration: "none",
    border: `1.5px solid ${dark ? "rgba(255,255,255,0.35)" : C.borderStrong}`,
    cursor: "pointer",
  };
  if (href) {
    return (
      <a href={href} style={style}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} style={style}>
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────── */
export default function PostdocWorksPage() {
  const [role, setRole] = useState<Role>("PhD");
  const [persona, setPersona] = useState<"institution" | "pi">("institution");

  const [positions, setPositions] = useState(6);
  const [hours, setHours] = useState(14);
  const [hourlyCost, setHourlyCost] = useState(65);
  const [reduction, setReduction] = useState(40);

  const { currentCost, reducedCost, savings } = useMemo(() => {
    const currentCost = positions * hours * hourlyCost;
    const reducedCost = currentCost * (1 - reduction / 100);
    return { currentCost, reducedCost, savings: currentCost - reducedCost };
  }, [positions, hours, hourlyCost, reduction]);

  function handlePersona(p: "institution" | "pi") {
    setPersona(p);
    if (p === "pi") {
      setPositions(1);
      setHours(10);
    } else {
      setPositions(6);
      setHours(14);
    }
  }

  const money = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <main style={{ fontFamily: FONT, background: C.white, overflowX: "hidden" }}>
      <style>{`
        @media (max-width: 860px) {
          .pdw-two-col { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 720px) {
          .pdw-calc-grid { grid-template-columns: 1fr !important; }
          .pdw-calc-inputs { border-right: none !important; border-bottom: 1px solid ${C.border}; }
        }
      `}</style>

      {/* ══════════════════════════════════════
          HERO
          ══════════════════════════════════════ */}
      <section style={{ background: C.white, paddingTop: "clamp(140px, 16vw, 180px)", paddingBottom: 88 }}>
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <FadeIn>
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
              PostdocWorks — building ahead of launch
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1
              style={{
                fontSize: "clamp(38px, 5.2vw, 60px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                color: C.ink,
                margin: "0 0 24px",
              }}
            >
              A verified network for the next step after your PhD.
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p
              style={{
                fontSize: "clamp(16px, 1.6vw, 19px)",
                lineHeight: 1.65,
                color: C.textMuted,
                maxWidth: 640,
                margin: "0 auto 40px",
              }}
            >
              PostdocWorks connects postdocs and PhDs with verified opportunities, peer mentors, and each
              other — backed by publication and PI verification, not just a resume.
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
                marginBottom: 20,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  style={{
                    padding: "9px 18px",
                    borderRadius: 8,
                    border: "none",
                    background: role === r ? C.white : "transparent",
                    boxShadow: role === r ? "0 1px 2px rgba(11,18,32,0.08)" : "none",
                    color: role === r ? C.ink : C.textMuted,
                    fontFamily: FONT,
                    fontSize: 13.5,
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 14, color: C.textFaint, margin: "0 0 36px", minHeight: 20 }}>
              {ROLE_COPY[role]}
            </p>
          </FadeIn>

          <FadeIn delay={0.28}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <PrimaryButton href="#waitlist">
                Join the waitlist <ArrowRight size={16} strokeWidth={2.5} />
              </PrimaryButton>
              <SecondaryButton href="#verification">See how verification works</SecondaryButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════
          VERIFICATION TIERS
          ══════════════════════════════════════ */}
      <section id="verification" style={{ background: C.bgAlt, padding: "96px 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ maxWidth: 620, marginBottom: 56 }}>
              <Eyebrow>How it works</Eyebrow>
              <h2
                style={{
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  color: C.ink,
                  margin: "0 0 16px",
                  lineHeight: 1.15,
                }}
              >
                Verification, in three tiers
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: C.textMuted, margin: 0 }}>
                Every profile on the network carries a badge earned through one of three paths — so a
                match means something before the first conversation.
              </p>
            </div>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {TIERS.map((t, i) => (
              <FadeIn key={t.title} delay={i * 0.08}>
                <div
                  style={{
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    borderRadius: 16,
                    padding: "32px 28px",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 20,
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.textFaint, letterSpacing: "0.06em" }}>
                      {t.n}
                    </span>
                    <span
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background: C.bgAlt2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <t.icon size={18} color={C.navy} strokeWidth={1.8} />
                    </span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: C.ink, margin: "0 0 10px" }}>{t.title}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.6, color: C.textMuted, margin: 0 }}>{t.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          EYEWEE — AI VERIFICATION AGENT
          ══════════════════════════════════════ */}
      <section style={{ background: C.eyeweeBg, padding: "112px 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <Eye state="idle" size={140} />
            </div>
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
              Powered by Eyewee
            </div>
            <h2
              style={{
                fontSize: "clamp(26px, 3vw, 36px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: C.ink,
                margin: "0 0 16px",
                lineHeight: 1.2,
              }}
            >
              The agent working behind every match.
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.65,
                color: C.textMuted,
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              Eyewee is the AI agent behind PostdocWorks — it reads a publication record, checks it against
              a PI endorsement, and keeps watching how a profile behaves on the network over time.
              It&rsquo;s what turns three verification tiers into one badge you can actually trust.
            </p>
            <Link
              href="/postdocworks/eyewee"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 20,
                fontSize: 14,
                fontWeight: 700,
                color: C.navy,
                textDecoration: "none",
              }}
            >
              Explore eyewee <ArrowUpRight size={14} strokeWidth={2.5} />
            </Link>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 20,
              textAlign: "left",
              maxWidth: 900,
              margin: "48px auto 0",
            }}
          >
            {EYEWEE_FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={0.1 + i * 0.08}>
                <div
                  style={{
                    background: C.white,
                    border: `1px solid ${C.eyeweeBorder}`,
                    borderRadius: 14,
                    padding: "24px 22px",
                    height: "100%",
                  }}
                >
                  <f.icon size={18} color={C.navy} strokeWidth={1.8} style={{ marginBottom: 14 }} />
                  <h3 style={{ fontSize: 15.5, fontWeight: 700, color: C.ink, margin: "0 0 8px" }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.6, color: C.textMuted, margin: 0 }}>
                    {f.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DOC2POSTDOC GLIMPSE
          ══════════════════════════════════════ */}
      <section style={{ background: C.white, padding: "112px 24px", borderBottom: `1px solid ${C.border}` }}>
        <div
          className="pdw-two-col"
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <FadeIn>
            <div>
              <Eyebrow>Doc2Postdoc — a PostdocWorks venture</Eyebrow>
              <h2
                style={{
                  fontSize: "clamp(26px, 3vw, 36px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: C.ink,
                  margin: "0 0 18px",
                  lineHeight: 1.2,
                }}
              >
                Where the next step has already been taken.
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: C.textMuted, margin: "0 0 32px", maxWidth: 480 }}>
                Every PhD facing the postdoc transition is matched with peers and postdocs who&rsquo;ve
                already made the same move — by field, career stage, and institution type.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <PrimaryButton href="/postdocworks/doc2postdoc">
                  Visit Doc2Postdoc <ArrowUpRight size={16} strokeWidth={2.5} />
                </PrimaryButton>
                <SecondaryButton href="/postdocworks/doc2postdoc#how-it-works">Meet the network</SecondaryButton>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div
              style={{
                background: C.bgAlt,
                border: `1px solid ${C.border}`,
                borderRadius: 18,
                padding: "36px 32px",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 22 }}>
                How matching works
              </div>
              {[
                { n: "1", t: "Career-stage matching", d: "Matched by field, stage, and geography — not just keyword search." },
                { n: "2", t: "Research credibility profile", d: "Carries the same verification standard as the rest of PostdocWorks." },
                { n: "3", t: "Direct connection", d: "Confidentiality and IP protections built in from the first message on." },
              ].map((s, i, arr) => (
                <div key={s.n} style={{ display: "flex", gap: 16, paddingBottom: i < arr.length - 1 ? 22 : 0, marginBottom: i < arr.length - 1 ? 22 : 0, borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: C.white,
                      border: `1.5px solid ${C.borderStrong}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: C.navy,
                      flexShrink: 0,
                    }}
                  >
                    {s.n}
                  </span>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: C.ink, marginBottom: 3 }}>{s.t}</div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.55, color: C.textMuted }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MEET THE NETWORK — SAMPLE PROFILES
          ══════════════════════════════════════ */}
      <section style={{ background: C.bgAlt, padding: "96px 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ maxWidth: 620, marginBottom: 48 }}>
              <Eyebrow>Meet the network</Eyebrow>
              <h2
                style={{
                  fontSize: "clamp(24px, 2.8vw, 32px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: C.ink,
                  margin: "0 0 12px",
                  lineHeight: 1.2,
                }}
              >
                A sample of the verified postdocs and PhDs building their profiles ahead of launch.
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {PROFILES.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.08}>
                <div
                  style={{
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    borderRadius: 16,
                    padding: "28px 26px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                    <span
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: C.navy,
                        color: C.white,
                        fontSize: 15,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {p.initials}
                    </span>
                    <div>
                      <div style={{ fontSize: 15.5, fontWeight: 700, color: C.ink }}>{p.name}</div>
                      <div style={{ fontSize: 13, color: C.textMuted }}>{p.field}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: 13, color: C.textFaint, marginBottom: 18, lineHeight: 1.5 }}>
                    {p.place} · {p.stage}
                  </div>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "5px 12px",
                      borderRadius: 999,
                      background: C.bgAlt2,
                      border: `1px solid ${C.border}`,
                      fontSize: 12,
                      fontWeight: 700,
                      color: C.navy,
                      width: "fit-content",
                      marginBottom: 22,
                    }}
                  >
                    <ShieldCheck size={13} strokeWidth={2.2} />
                    {p.tier}
                  </div>

                  <a
                    href="#waitlist"
                    style={{
                      marginTop: "auto",
                      fontSize: 13.5,
                      fontWeight: 600,
                      color: C.navy,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    Find similar researchers <ArrowRight size={13} strokeWidth={2.5} />
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          COMPARISON TABLE
          ══════════════════════════════════════ */}
      <section style={{ background: C.white, padding: "96px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <h2
              style={{
                fontSize: "clamp(24px, 2.8vw, 32px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: C.ink,
                margin: "0 0 36px",
                textAlign: "center",
              }}
            >
              PostdocWorks vs. a traditional job board
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ overflowX: "auto", border: `1px solid ${C.border}`, borderRadius: 16 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "18px 22px", fontSize: 13, fontWeight: 700, color: C.textFaint, borderBottom: `1px solid ${C.border}` }} />
                    <th
                      style={{
                        textAlign: "left",
                        padding: "18px 22px",
                        fontSize: 14,
                        fontWeight: 700,
                        color: C.navy,
                        background: C.bgAlt2,
                        borderBottom: `1px solid ${C.border}`,
                      }}
                    >
                      PostdocWorks
                    </th>
                    <th style={{ textAlign: "left", padding: "18px 22px", fontSize: 14, fontWeight: 700, color: C.textMuted, borderBottom: `1px solid ${C.border}` }}>
                      Traditional board
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.label}>
                      <td
                        style={{
                          padding: "16px 22px",
                          fontSize: 13.5,
                          fontWeight: 600,
                          color: C.text,
                          borderBottom: i < COMPARISON.length - 1 ? `1px solid ${C.border}` : "none",
                          verticalAlign: "top",
                        }}
                      >
                        {row.label}
                      </td>
                      <td
                        style={{
                          padding: "16px 22px",
                          fontSize: 13.5,
                          color: C.ink,
                          fontWeight: 600,
                          background: C.bgAlt2,
                          borderBottom: i < COMPARISON.length - 1 ? `1px solid ${C.border}` : "none",
                          verticalAlign: "top",
                        }}
                      >
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                          <Check size={14} color={C.navy} strokeWidth={2.6} />
                          {row.pdw}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "16px 22px",
                          fontSize: 13.5,
                          color: C.textMuted,
                          borderBottom: i < COMPARISON.length - 1 ? `1px solid ${C.border}` : "none",
                          verticalAlign: "top",
                        }}
                      >
                        {row.trad}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CALCULATOR
          ══════════════════════════════════════ */}
      <section style={{ background: C.bgAlt, padding: "96px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ maxWidth: 620, marginBottom: 40 }}>
              <Eyebrow>Illustrative recruiting-time calculator</Eyebrow>
              <h2
                style={{
                  fontSize: "clamp(24px, 2.8vw, 32px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: C.ink,
                  margin: "0 0 12px",
                  lineHeight: 1.2,
                }}
              >
                A rough sense of what a pre-verified pool could save
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: C.textMuted, margin: 0 }}>
                On screening time — from the department&rsquo;s view, or a single PI&rsquo;s.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden" }}>
              {/* persona toggle */}
              <div style={{ display: "flex", borderBottom: `1px solid ${C.border}` }}>
                {[
                  { id: "institution" as const, label: "Institution / HR" },
                  { id: "pi" as const, label: "Principal investigator" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handlePersona(opt.id)}
                    style={{
                      flex: 1,
                      padding: "16px 12px",
                      border: "none",
                      borderBottom: persona === opt.id ? `2px solid ${C.navy}` : "2px solid transparent",
                      background: "transparent",
                      color: persona === opt.id ? C.navy : C.textMuted,
                      fontFamily: FONT,
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="pdw-calc-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 0 }}>
                {/* inputs */}
                <div className="pdw-calc-inputs" style={{ padding: "32px 32px", display: "flex", flexDirection: "column", gap: 24, borderRight: `1px solid ${C.border}` }}>
                  <CalcSlider
                    label="Open postdoc positions per year"
                    value={positions}
                    min={1}
                    max={40}
                    onChange={setPositions}
                  />
                  <CalcSlider
                    label="Screening hours spent per hire today"
                    value={hours}
                    min={1}
                    max={40}
                    onChange={setHours}
                  />
                  <CalcSlider
                    label="Loaded hourly cost of screening time ($)"
                    value={hourlyCost}
                    min={10}
                    max={200}
                    onChange={setHourlyCost}
                  />
                  <CalcSlider
                    label="Assumed screening-time reduction from verified profiles"
                    value={reduction}
                    min={0}
                    max={80}
                    suffix="%"
                    onChange={setReduction}
                  />
                </div>

                {/* results */}
                <div style={{ padding: "32px 32px", display: "flex", flexDirection: "column", gap: 20, justifyContent: "center", background: C.bgAlt2 }}>
                  <CalcResult label="Current annual screening cost" value={money(currentCost)} />
                  <CalcResult label="Estimated cost with a verified pool" value={money(reducedCost)} />
                  <CalcResult label="Estimated annual savings" value={money(savings)} highlight />
                </div>
              </div>
            </div>
          </FadeIn>

          <p style={{ fontSize: 12.5, color: C.textFaint, marginTop: 18, lineHeight: 1.6, maxWidth: 700 }}>
            Figures are driven entirely by the assumptions above, for illustration only — not based on
            measured Navigator outcomes yet.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FINAL CTA / WAITLIST
          ══════════════════════════════════════ */}
      <section id="waitlist" style={{ background: C.white, padding: "112px 24px", borderTop: `1px solid ${C.border}` }}>
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
              Be part of the network before it opens.
            </h2>
            <p style={{ fontSize: 15.5, color: C.textMuted, margin: "0 0 32px" }}>
              One email at launch. No spam, no resale of your address.
            </p>
            <WaitlistForm source="postdocworks" role={role} />
          </FadeIn>
        </div>
      </section>
    </main>
  );
}

/* ─────────────────────────────────────────────
   CALCULATOR PRIMITIVES
   ───────────────────────────────────────────── */
function CalcSlider({
  label,
  value,
  min,
  max,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 13.5, color: C.text, fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 13.5, color: C.navy, fontWeight: 700 }}>
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: C.navy }}
      />
    </div>
  );
}

function CalcResult({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: 12.5, color: C.textMuted, marginBottom: 4, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: highlight ? 30 : 22, fontWeight: 700, color: highlight ? C.navy : C.ink, letterSpacing: "-0.02em" }}>
        {value}
      </div>
    </div>
  );
}
