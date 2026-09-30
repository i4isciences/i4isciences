"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import WaitlistForm from "@/components/postdocworks/WaitlistForm";
import { Eye } from "@/components/postdocworks/eye/Eye";

/* ─────────────────────────────────────────────
   TOKENS — matches app/postdocworks/page.tsx
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
};

const FONT = "var(--font-geist-sans), 'Geist', -apple-system, BlinkMacSystemFont, sans-serif";

/* ─────────────────────────────────────────────
   SMALL PRIMITIVES
   ───────────────────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  y = 20,
}: {
  children: ReactNode;
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

function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "14px 28px",
        borderRadius: 10,
        background: C.navy,
        color: C.white,
        fontFamily: FONT,
        fontSize: 15,
        fontWeight: 600,
        textDecoration: "none",
      }}
    >
      {children}
    </Link>
  );
}

function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "13px 26px",
        borderRadius: 10,
        background: "transparent",
        color: C.navy,
        fontFamily: FONT,
        fontSize: 15,
        fontWeight: 600,
        textDecoration: "none",
        border: `1.5px solid ${C.borderStrong}`,
      }}
    >
      {children}
    </a>
  );
}

function PreviewKicker({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: C.gold, marginBottom: 12 }}>
      {children}
    </div>
  );
}

function PreviewHeading({ children }: { children: ReactNode }) {
  return (
    <h2 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 26, letterSpacing: "-0.02em", color: C.ink, lineHeight: 1.3, margin: "0 0 16px" }}>
      {children}
    </h2>
  );
}

function PreviewBody({ children }: { children: ReactNode }) {
  return <p style={{ fontFamily: FONT, fontSize: 15.5, lineHeight: 1.7, color: C.textMuted, margin: "0 0 14px" }}>{children}</p>;
}

function IllustrativeNote({ children }: { children: ReactNode }) {
  return <p style={{ fontFamily: FONT, fontSize: 13, fontStyle: "italic", color: C.textFaint, margin: 0 }}>{children}</p>;
}

function ChatCard({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        flex: "1 1 420px",
        minWidth: 300,
        background: C.bgAlt,
        border: `1px solid ${C.border}`,
        borderRadius: 18,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {children}
    </div>
  );
}

function UserBubble({ children, maxWidth = "88%" }: { children: ReactNode; maxWidth?: string }) {
  return (
    <div
      style={{
        alignSelf: "flex-end",
        maxWidth,
        background: C.navy,
        color: C.white,
        borderRadius: "14px 14px 3px 14px",
        padding: "14px 18px",
        fontFamily: FONT,
        fontSize: 14.5,
        lineHeight: 1.55,
      }}
    >
      {children}
    </div>
  );
}

function EyeweeBubble({ children }: { children: ReactNode }) {
  return (
    <div style={{ alignSelf: "flex-start", maxWidth: "92%", background: C.white, borderLeft: `3px solid ${C.gold}`, borderRadius: "3px 14px 14px 14px", padding: "14px 18px" }}>
      <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: C.gold, marginBottom: 6 }}>EYEWEE</div>
      <div style={{ fontFamily: FONT, fontSize: 14.5, lineHeight: 1.55, color: C.text }}>{children}</div>
    </div>
  );
}

function SuccessPill({ children }: { children: ReactNode }) {
  return (
    <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 8, background: "#EAF6EE", borderRadius: 999, padding: "8px 16px" }}>
      <span style={{ color: "#2F9E52", fontWeight: 700, fontSize: 14 }}>✦</span>
      <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: "#206B39" }}>{children}</span>
    </div>
  );
}

function DataRow({ tag, children }: { tag: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <div style={{ fontFamily: FONT, fontSize: 10.5, fontWeight: 700, color: C.navy, background: "#EBEEF4", borderRadius: 5, padding: "3px 7px", whiteSpace: "nowrap", marginTop: 1 }}>
        {tag}
      </div>
      <div style={{ fontFamily: FONT, fontSize: 13.5, lineHeight: 1.5, color: C.textMuted }}>{children}</div>
    </div>
  );
}

function QuestionCard({ quote, tone, label, answer }: { quote: string; tone: "brand" | "answer"; label: string; answer: string }) {
  const box = tone === "answer" ? { background: "#EAF6EE", border: "1px solid #BFE3CB" } : { background: C.white, border: `1px solid ${C.border}` };
  const labelColor = tone === "answer" ? "#206B39" : C.gold;
  const answerColor = tone === "answer" ? "#1E4A2C" : C.text;
  return (
    <div style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 16, padding: "22px 26px" }}>
      <p style={{ fontFamily: FONT, fontStyle: "italic", fontSize: 15.5, color: C.ink, margin: "0 0 14px", lineHeight: 1.45 }}>{quote}</p>
      <div style={{ ...box, borderRadius: 10, padding: "14px 16px" }}>
        <div style={{ fontFamily: FONT, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: labelColor, marginBottom: 6 }}>{label}</div>
        <div style={{ fontFamily: FONT, fontSize: 14, color: answerColor, lineHeight: 1.55 }}>{answer}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────── */
export default function EyeweePage() {
  return (
    <main style={{ fontFamily: FONT, background: C.white, overflowX: "hidden" }}>
      {/* ══════════════════════════════════════
          HERO
          ══════════════════════════════════════ */}
      <section style={{ background: `linear-gradient(180deg, ${C.white} 0%, ${C.bgAlt} 100%)`, paddingTop: "clamp(140px, 16vw, 180px)", paddingBottom: 72 }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <FadeIn>
            <Link
              href="/postdocworks"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: C.textMuted, textDecoration: "none", marginBottom: 28 }}
            >
              <ArrowLeft size={14} strokeWidth={2.5} /> PostdocWorks
            </Link>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              <Eye state="idle" size={150} />
            </div>
            <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: C.gold, marginBottom: 24 }}>
              eyewee<sup style={{ fontSize: 9, letterSpacing: 0, color: C.textFaint }}>SM</sup>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1
              style={{
                fontSize: "clamp(30px, 4.2vw, 46px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                color: C.ink,
                margin: "0 0 22px",
              }}
            >
              You say it — eyewee carries it, guides it, and cracks the toughest problems.
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p style={{ fontSize: "clamp(15.5px, 1.5vw, 18px)", lineHeight: 1.65, color: C.textMuted, maxWidth: 600, margin: "0 auto 36px" }}>
              For the postdoc carrying someone else&rsquo;s unsolved dream project — alone, in a new country, with no
              time left over. Eyewee is the AI agent working behind every match on PostdocWorks and Doc2Postdoc.
            </p>
          </FadeIn>

          <FadeIn delay={0.22}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <PrimaryButton href="#waitlist">
                Join the waitlist <ArrowRight size={16} strokeWidth={2.5} />
              </PrimaryButton>
              <SecondaryButton href="#preview">See how it works ↓</SecondaryButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════
          THE 200-PAPER WALL
          ══════════════════════════════════════ */}
      <section style={{ background: C.bgAlt2, padding: "72px 24px", textAlign: "center" }}>
        <FadeIn>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(22px, 2.6vw, 28px)", fontWeight: 700, letterSpacing: "-0.02em", color: C.ink, margin: "0 0 10px" }}>
              The 200-paper wall
            </h2>
            <div style={{ width: 56, height: 3, background: C.gold, margin: "0 auto 20px" }} />
            <p style={{ fontSize: 16, color: C.textFaint, margin: "0 0 16px" }}>Working alone isn&rsquo;t rigor. It&rsquo;s just noise.</p>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: C.text, margin: 0 }}>
              Eyewee brings together the guidance, the connections, and the sparks of insight a postdoc needs to
              crack the project, find the way through, and stop carrying it alone.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════
          PREVIEW 1 — NOVELTY GAP
          ══════════════════════════════════════ */}
      <section id="preview" style={{ padding: "88px 24px", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 1080, width: "100%", display: "flex", gap: 56, alignItems: "center", flexWrap: "wrap" }}>
          <FadeIn>
            <div style={{ flex: "1 1 360px", minWidth: 300 }}>
              <PreviewKicker>Preview · Leverage</PreviewKicker>
              <PreviewHeading>Your PI handed you the hard problem. Eyewee helps you crack it.</PreviewHeading>
              <PreviewBody>
                200 papers deep, one clear next step. Eyewee checks the places a literature search misses — sequence
                databases, not just journals — so you know within minutes whether your angle is actually new.
              </PreviewBody>
              <IllustrativeNote>Illustrative example — eyewee&rsquo;s live conversation isn&rsquo;t open yet.</IllustrativeNote>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <ChatCard>
              <UserBubble>
                I think I found a mutation in the HBV X gene that might explain why some patients don&rsquo;t respond
                to therapy, but I can&rsquo;t tell if anyone&rsquo;s already reported this exact variant. I&rsquo;ve
                read like 40 papers and I&rsquo;m losing track.
              </UserBubble>
              <EyeweeBubble>
                Let&rsquo;s check three places, not just papers — a variant can sit deposited in a sequence database
                with zero papers ever written about it. Checking PubMed, GenBank, and EMBL now.
              </EyeweeBubble>
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 18px" }}>
                <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 13.5, color: C.ink, marginBottom: 12 }}>
                  HBV X gene variant — search results
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  <DataRow tag="PUBMED">
                    <span style={{ color: C.gold, fontWeight: 700 }}>0 papers</span> link this exact variant to treatment response
                  </DataRow>
                  <DataRow tag="GENBANK">
                    <span style={{ color: C.gold, fontWeight: 700 }}>3 sequences</span> deposited with this variant — none linked to a functional study
                  </DataRow>
                  <DataRow tag="EMBL">
                    Same 3 records — EMBL mirrors GenBank daily via the INSDC sync, so this confirms rather than adds
                  </DataRow>
                </div>
              </div>
              <EyeweeBubble>
                So the mutation itself isn&rsquo;t new — it&rsquo;s been sequenced before. But nobody has connected it
                to treatment response. That gap is yours.
              </EyeweeBubble>
              <SuccessPill>Novelty confirmed — this angle is unclaimed</SuccessPill>
            </ChatCard>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MID BANNER
          ══════════════════════════════════════ */}
      <section style={{ background: C.navy, padding: "72px 24px", textAlign: "center" }}>
        <FadeIn>
          <h2 style={{ fontSize: "clamp(22px, 2.6vw, 28px)", fontWeight: 700, color: C.white, margin: "0 0 6px" }}>Turns stuck into spark.</h2>
          <p style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: C.white, maxWidth: 620, lineHeight: 1.4, margin: "18px auto 28px" }}>
            Eyewee doesn&rsquo;t just watch.
            <br />
            It sees.
          </p>
          <PrimaryButton href="#waitlist">Meet eyewee — join the waitlist</PrimaryButton>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════
          TWO WAYS IN
          ══════════════════════════════════════ */}
      <section style={{ padding: "96px 24px", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 1080, width: "100%" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: C.gold, marginBottom: 12 }}>
                One company. Two decisive moves.
              </div>
              <h2 style={{ fontSize: "clamp(24px, 2.8vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", color: C.ink, margin: 0 }}>
                Research careers deserve better than a handoff.
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            <FadeIn delay={0.05}>
              <div style={{ flex: "1 1 380px", minWidth: 280, background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 18, padding: 32, height: "100%" }}>
                <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", color: C.textFaint, marginBottom: 14 }}>01 / DOC2POSTDOC</div>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: C.ink, lineHeight: 1.35, margin: "0 0 14px" }}>
                  The shortest distance between where you are and what&rsquo;s next.
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: C.textMuted, margin: 0 }}>
                  Find the person who has already made your transition. Doc2Postdoc matches PhD researchers with
                  credible postdocs for specific, human guidance when the stakes are highest.
                </p>
                <Link href="/postdocworks/doc2postdoc" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 20, fontSize: 13, fontWeight: 700, color: C.navy, textDecoration: "none" }}>
                  Explore Doc2Postdoc <ArrowRight size={13} strokeWidth={2.5} />
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div style={{ flex: "1 1 380px", minWidth: 280, background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 18, padding: 32, height: "100%" }}>
                <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", color: C.textFaint, marginBottom: 14 }}>02 / POSTDOCWORKS</div>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: C.ink, lineHeight: 1.35, margin: "0 0 14px" }}>
                  Your record, finally read as a whole.
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: C.textMuted, margin: 0 }}>
                  PostdocWorks gives institutions and researchers a more intelligent way to meet: verified
                  credentials, meaningful context, and a career signal that goes beyond a title.
                </p>
                <Link href="/postdocworks" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 20, fontSize: 13, fontWeight: 700, color: C.navy, textDecoration: "none" }}>
                  About PostdocWorks <ArrowRight size={13} strokeWidth={2.5} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PREVIEW 2 — RING THE BELL
          ══════════════════════════════════════ */}
      <section style={{ padding: "24px 24px 96px", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 1080, width: "100%", display: "flex", gap: 56, alignItems: "center", flexWrap: "wrap" }}>
          <FadeIn>
            <div style={{ flex: "1 1 360px", minWidth: 300 }}>
              <PreviewKicker>Preview · Doc2Postdoc</PreviewKicker>
              <PreviewHeading>Your circle, reachable in one ring.</PreviewHeading>
              <PreviewBody>
                Ring the Bell reaches the people who already said yes to helping you first — your accepted
                connections, all at once, with a two-hour window. Only if nobody answers does it widen further.
                Eyewee delivers the ring itself, never an anonymous alert.
              </PreviewBody>
              <IllustrativeNote>Illustrative example — Doc2Postdoc matching isn&rsquo;t open yet.</IllustrativeNote>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <ChatCard>
              <UserBubble>
                I need someone who&rsquo;s actually run a BSL-3 facility — my PI wants me starting tomorrow and
                I&rsquo;ve never worked in one.
              </UserBubble>
              <EyeweeBubble>
                You have 4 connections in your network — ringing them now, all at once. First to accept gets you
                sorted. If nobody responds in two hours, we widen the search.
              </EyeweeBubble>
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 18px" }}>
                <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 13.5, color: C.ink, marginBottom: 12 }}>
                  Ringing the Bell — 4 connections
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontFamily: FONT, fontSize: 13.5, color: C.textMuted }}>Priya R. — GI Fellow, PGY-4</div>
                    <div style={{ fontFamily: FONT, fontSize: 10.5, fontWeight: 700, color: "#206B39", background: "#EAF6EE", borderRadius: 999, padding: "3px 10px" }}>ACCEPTED</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontFamily: FONT, fontSize: 13.5, color: C.textFaint }}>3 other connections</div>
                    <div style={{ fontFamily: FONT, fontSize: 10.5, fontWeight: 700, color: C.textFaint, background: "#EBEEF4", borderRadius: 999, padding: "3px 10px" }}>WINDOW CLOSED</div>
                  </div>
                </div>
              </div>
              <SuccessPill>Connected — Priya accepted in 12 minutes</SuccessPill>
            </ChatCard>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════
          REAL QUESTIONS
          ══════════════════════════════════════ */}
      <section style={{ background: C.bgAlt2, padding: "24px 24px 96px", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 780, width: "100%" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <PreviewKicker>Preview · Navigate</PreviewKicker>
              <h2 style={{ fontSize: "clamp(22px, 2.6vw, 28px)", fontWeight: 700, letterSpacing: "-0.02em", color: C.ink, lineHeight: 1.3, margin: "0 0 12px" }}>
                Real questions, from a real community.
              </h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.7, color: C.textMuted, maxWidth: 540, margin: "0 auto" }}>
                Not hypotheticals — this is what shows up in a postdoc group chat every week, and how eyewee actually
                answers.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <FadeIn delay={0.05}>
              <QuestionCard
                quote="&ldquo;Is anyone currently staying at Maple Pine? I need info on the management before I sign.&rdquo;"
                tone="brand"
                label="Eyewee connects you"
                answer="Found a postdoc already living there, opted in to intros — matched through Doc2Postdoc, not a guess."
              />
            </FadeIn>
            <FadeIn delay={0.1}>
              <QuestionCard
                quote="&ldquo;Is anyone here on a J1/J2 visa? I&rsquo;d love to know their real experience.&rdquo;"
                tone="brand"
                label="Eyewee connects you"
                answer="This is better answered by someone who&rsquo;s lived it than a policy page — matched with postdocs on J1 status willing to share."
              />
            </FadeIn>
            <FadeIn delay={0.15}>
              <QuestionCard
                quote="&ldquo;How do I change my address with USCIS while my green card is processing?&rdquo;"
                tone="answer"
                label="Eyewee answers directly"
                answer="The E-COA tool in your USCIS online account updates every pending case at once. Form AR-11 by mail is the fallback — both within 10 days of moving."
              />
            </FadeIn>
          </div>
          <p style={{ fontSize: 13, fontStyle: "italic", color: C.textFaint, textAlign: "center", marginTop: 22 }}>
            Illustrative examples — eyewee&rsquo;s live conversation isn&rsquo;t open yet.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          JOIN THE WAITLIST
          ══════════════════════════════════════ */}
      <section id="waitlist" style={{ padding: "96px 24px", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 560, width: "100%", background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 20, padding: "48px 40px", textAlign: "center" }}>
          <FadeIn>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              <Eye state="idle" size={80} interactive={false} />
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.6vw, 28px)", fontWeight: 700, letterSpacing: "-0.02em", color: C.ink, margin: "0 0 14px" }}>
              Be first in your field.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: C.textMuted, maxWidth: 440, margin: "0 auto 28px" }}>
              We&rsquo;re opening Doc2Postdoc metro by metro, field by field — Chicago and St. Louis first. Join now
              and you&rsquo;re matched the moment your field opens, ahead of general signups.
            </p>
            <WaitlistForm source="eyewee" buttonLabel="Join the waitlist" />
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BRAND FOOTNOTE
          ══════════════════════════════════════ */}
      <section style={{ background: C.bgAlt, padding: "28px 24px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 13, color: C.textMuted }}>© eyewee — a PostdocWorks venture of i4iSciences</span>
          <Link href="/postdocworks" style={{ fontSize: 13, fontWeight: 700, color: C.navy, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
            Visit PostdocWorks <ArrowRight size={13} strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}
