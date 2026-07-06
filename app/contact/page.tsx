"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Geist, Kalam } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-geist",
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kalam",
});

/* ═══════════════════════════════════════════════════════
   DESIGN CONCEPT — "The Boarding Pass"
   The page reads as a scrapbook journey: a torn photograph
   at the top gives way to a boarding-pass shaped contact
   module (a perforated stub + a form you "fill in to board"),
   and closes on a handwritten postcard. Photo → paper → post.

   Drop the uploaded photo at: /public/images/hero-classroom.png
═══════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────
// ICONS
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

const MailIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3.5 6.5L12 13L20.5 6.5" />
  </svg>
);

const PhoneIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5.5 4h3.2l1.6 4.4-2.1 1.6a11.5 11.5 0 005.8 5.8l1.6-2.1L20 15.3v3.2a1.5 1.5 0 01-1.6 1.5A15.5 15.5 0 014 5.6 1.5 1.5 0 015.5 4z" />
  </svg>
);

const WhatsAppIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3.5a8.5 8.5 0 00-7.3 12.8L3.5 20.5l4.4-1.2A8.5 8.5 0 1012 3.5z" />
    <path d="M8.7 9.3c0-.5.4-1 .9-1h.6c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.7.7a5.8 5.8 0 002.8 2.8l.7-.7c.2-.2.4-.2.6-.1l1.6.7c.2.1.3.3.3.5v.6c0 .5-.4.9-1 .9-3.6 0-6.9-3.3-6.9-6.9z" />
  </svg>
);

const PlaneIcon = ({ size = 30 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 21L35 6L24 34L18 23L5 21Z" />
    <path d="M18 23L35 6" />
  </svg>
);

// ─────────────────────────────────────────────
// TORN PHOTO EDGE (the seam between photo and paper)
// ─────────────────────────────────────────────

const TornEdge = () => (
  <svg
    className="torn-edge"
    viewBox="0 0 1440 64"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M0,40 L48,18 L96,44 L150,12 L206,38 L260,20 L318,46 L372,14 L430,36 L486,22 L540,48 L598,16 L654,40 L710,24 L766,46 L820,18 L878,42 L934,20 L992,44 L1048,14 L1104,38 L1160,22 L1216,46 L1272,18 L1330,40 L1386,24 L1440,38 L1440,64 L0,64 Z"
      fill="#FFFDF6"
    />
  </svg>
);

// ─────────────────────────────────────────────
// DOODLES (gold, hand-drawn marginalia)
// ─────────────────────────────────────────────

const DoodleStar = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} width="24" height="24" viewBox="0 0 26 26" fill="none" aria-hidden="true">
    <path d="M13 2L15.6 10.4H24.4L17.3 15.6L20 24L13 18.8L6 24L8.7 15.6L1.6 10.4H10.4L13 2Z" stroke="#E8B84B" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const DoodleUnderline = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} width="180" height="18" viewBox="0 0 180 18" fill="none" aria-hidden="true">
    <path d="M3 11C40 2 90 2 130 9C150 12 165 9 177 5" stroke="#E8B84B" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const DoodleSquiggleArrow = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} width="60" height="46" viewBox="0 0 60 46" fill="none" aria-hidden="true">
    <path d="M4 6C22 6 14 30 32 30C44 30 40 16 52 16" stroke="#E8B84B" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M44 10L52 16L45 24" stroke="#E8B84B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DoodleCircleScribble = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} width="90" height="46" viewBox="0 0 90 46" fill="none" aria-hidden="true">
    <path d="M10 26C6 12 26 4 46 5c22 1 38 10 34 20-4 11-28 16-48 14C16 43 13 36 10 26Z" stroke="#E8B84B" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);

// ─────────────────────────────────────────────
// FORM DATA
// ─────────────────────────────────────────────

const whoOptions = ["Student", "Teacher", "Parent", "School", "University", "Institute", "Enterprise", "Government", "NGO"];

const interestOptions = [
  { name: "TTT", logo: "/images/tttlogo-removebg-preview.png" },
  { name: "OCT", logo: "/images/octlogo-removebg-preview.png" },
  { name: "IPST", logo: "/images/ipstlogo-removebg-preview.png" },
  { name: "LabTricks", logo: "/images/labtrickslogo-removebg-preview.png" },
  { name: "AI Ecosystem", logo: "/images/ailogo-removebg-preview.png" },
  { name: "Partnership", logo: null },
  { name: "Demo", logo: null },
];

// ─────────────────────────────────────────────
// FADE UP WRAPPER
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
      initial={{ opacity: 0, y: 34 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export default function ContactPage() {
  const [selectedWho, setSelectedWho] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: "", email: "", organization: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleChip = (value: string, current: string[], setter: (v: string[]) => void) => {
    setter(current.includes(value) ? current.filter((v) => v !== value) : [...current, value]);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, who: selectedWho, interests: selectedInterests }),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", organization: "", message: "" });
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
    <main className={`${geist.variable} ${kalam.variable} contact-root`}>
      {/* ═══════════════════════════════════════════
          1 — THE PHOTOGRAPH (torn at the bottom edge)
      ═══════════════════════════════════════════ */}
      <section className="photo-section">
        <div className="photo-bg" role="img" aria-label="A teacher and student in conversation" />
        <div className="photo-scrim" />

        <div className="photo-content">
          <span className="washi-tape">Connect with us</span>

          <h1 className="photo-headline">
            Every great transformation
            <br />
            starts with a{" "}
            <span className="headline-gold">
              conversation
              <DoodleUnderline style={{ position: "absolute", left: "-4px", bottom: "-12px", width: "102%" }} />
            </span>
          </h1>

          <p className="photo-subtext">
            Whether you&apos;re a school, university, government, parent community, or
            enterprise partner — we&apos;d love to hear your story.
          </p>

          <div className="photo-actions">
            <a href="#board" className="btn-solid">
              Book a demo <ArrowRightIcon size={16} />
            </a>
            <a href="#board" className="btn-ghost">
              Become a partner
            </a>
          </div>
        </div>

        <TornEdge />
      </section>

      {/* ═══════════════════════════════════════════
          2 — THE BOARDING PASS (contact + form)
      ═══════════════════════════════════════════ */}
      <section className="board-section" id="board">
        <div className="board-doodles" aria-hidden="true">
          <DoodleStar style={{ position: "absolute", top: "6%", left: "4%" }} />
          <DoodleStar style={{ position: "absolute", bottom: "8%", right: "5%", transform: "scale(0.8)" }} />
          <DoodleSquiggleArrow style={{ position: "absolute", top: "38%", left: "1%", transform: "rotate(-8deg) scale(0.8)" }} />
        </div>

        <FadeUp className="board-heading">
          <span className="board-kicker">Step aboard</span>
          <h2 className="board-title">Let&apos;s get you boarded</h2>
          <p className="board-caption">One short form. A real reply within 48 hours.</p>
        </FadeUp>

        <FadeUp delay={0.1} className="ticket-wrap">
          <div className="ticket">
            {/* ── STUB ── */}
            <div className="stub">
              <div className="stub-glow" aria-hidden="true" />
              <span className="stub-eyebrow">Passenger info</span>
              <h3 className="stub-title">Prefer to skip the form?</h3>
              <p className="stub-desc">Reach us directly — wherever you&apos;re writing from.</p>

              <div className="stub-rows">
                <div className="stub-row-group">
                  <span className="stub-row-label"><MailIcon /> Email</span>
                  <a href="mailto:manager@i4isciences.in" className="stub-row"><span>manager@i4isciences.in</span><em>General</em></a>
                  <a href="mailto:ceo@i4isciences.ai" className="stub-row"><span>ceo@i4isciences.ai</span><em>AI Team</em></a>
                  <a href="mailto:ranjit@i4isciences.com" className="stub-row"><span>ranjit@i4isciences.com</span><em>Partnerships</em></a>
                </div>
                <div className="stub-row-group">
                  <span className="stub-row-label"><PhoneIcon /> Phone</span>
                  <a href="tel:+919414452952" className="stub-row"><span>+91 94144 52952</span><em>India</em></a>
                  <a href="tel:+13145363631" className="stub-row"><span>+1 314-536-3631</span><em>USA</em></a>
                </div>
                <div className="stub-row-group">
                  <span className="stub-row-label"><WhatsAppIcon /> WhatsApp</span>
                  <a href="https://wa.me/919414452952" target="_blank" rel="noopener noreferrer" className="stub-row"><span>+91 94144 52952</span><em>Chat now</em></a>
                </div>
              </div>

              <div className="stub-stamp">
                <span>48 HR</span>
                <small>reply, always</small>
              </div>
            </div>

            {/* ── PERFORATION ── */}
            <div className="perforation">
              <span className="notch notch-top" />
              <span className="notch notch-bottom" />
            </div>

            {/* ── MAIN ── */}
            <div className="main">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="boarded-state"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <DoodleCircleScribble style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%) scale(1.3)", opacity: 0.5 }} />
                    <div className="boarded-icon"><CheckIcon size={26} /></div>
                    <h3 className="boarded-title">You&apos;re booked in.</h3>
                    <p className="boarded-sub">
                      Thank you for reaching out — our team will follow up within 48 hours
                      with a thoughtful reply.
                    </p>
                    <p className="boarded-signoff">— the i4iSciences team</p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <span className="main-kicker">Fill in to board</span>
                    <h3 className="main-title">Tell us about yourself</h3>

                    <div className="field-block">
                      <span className="field-label">01 · I am a</span>
                      <div className="tag-row">
                        {whoOptions.map((opt, i) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => toggleChip(opt, selectedWho, setSelectedWho)}
                            className={`tag ${selectedWho.includes(opt) ? "tag-active" : ""}`}
                            style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
                          >
                            {selectedWho.includes(opt) && <CheckIcon size={11} />}
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="field-block">
                      <span className="field-label">02 · Interested in</span>
                      <div className="tag-row">
                        {interestOptions.map((item, i) => (
                          <button
                            key={item.name}
                            type="button"
                            onClick={() => toggleChip(item.name, selectedInterests, setSelectedInterests)}
                            className={`tag tag-gold ${selectedInterests.includes(item.name) ? "tag-active" : ""}`}
                            style={{ transform: `rotate(${i % 2 === 0 ? 1 : -1}deg)` }}
                          >
                            {selectedInterests.includes(item.name) && <CheckIcon size={11} />}
                            {item.logo && <img src={item.logo} alt={item.name} className="tag-logo" />}
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="field-block">
                      <span className="field-label">03 · Your details</span>
                      <div className="input-grid">
                        <label className="input-box">
                          <span>Name</span>
                          <input type="text" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </label>
                        <label className="input-box">
                          <span>Email</span>
                          <input type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </label>
                        <label className="input-box input-box-full">
                          <span>Organization</span>
                          <input type="text" placeholder="Where you work / study" value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} />
                        </label>
                        <label className="input-box input-box-full">
                          <span>Message</span>
                          <textarea rows={4} placeholder="What are you hoping to achieve?" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                        </label>
                      </div>
                    </div>

                    <div className="board-footer">
                      <button type="button" onClick={handleSubmit} disabled={submitting} className="btn-board">
                        <span className="btn-board-notch" />
                        {submitting ? <span className="spinner" /> : (<>Start the conversation <ArrowRightIcon size={17} /></>)}
                      </button>
                      <p className="board-microcopy">We&apos;ll get back to you within 48 hours.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ═══════════════════════════════════════════
          3 — THE POSTCARD (closing)
      ═══════════════════════════════════════════ */}
      <section className="postcard-section">
        <FadeUp className="postcard">
          <div className="postcard-note">
            <p className="postcard-eyebrow">The future is built together</p>
            <h2 className="postcard-headline">
              Education without barriers.
              <br />
              Opportunity without limits.
            </h2>
            <p className="postcard-message">
              Together we can create a future where every learner, every teacher, and
              every family has access to opportunity.
            </p>
          </div>

          <div className="postcard-stamp-area">
            <div className="postmark">
              <PlaneIcon size={26} />
            </div>
            <a href="#board" className="btn-postmark">
              Let&apos;s talk <ArrowRightIcon size={15} />
            </a>
            <p className="postcard-signature">— i4iSciences Team</p>
          </div>
        </FadeUp>
      </section>

      {/* ═══════════════════════════════════════════
          STYLES
      ═══════════════════════════════════════════ */}
      <style jsx global>{`
        .contact-root, .contact-root *, .contact-root *::before, .contact-root *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }

        :root {
          --blue: #1a3575;
          --blue-deep: #0d1b3e;
          --blue-mid: #2b4a9f;
          --blue-light: #e8f0fe;
          --gold: #e8b84b;
          --gold-light: #fff8e6;
          --paper: #fffdf6;
          --paper-line: #e7e0cf;
          --text-secondary: #5a6a8a;
          --text-muted: #8fa0bc;
          --border: #e2eaf4;
          --font: var(--font-geist), "Geist", system-ui, sans-serif;
          --hand: var(--font-kalam), "Kalam", cursive;
        }

        html { scroll-behavior: smooth; }
        body { font-family: var(--font); background: var(--paper); color: var(--blue-deep); -webkit-font-smoothing: antialiased; }
        .contact-root { font-family: var(--font); overflow-x: hidden; }

        /* ═══ 1. PHOTOGRAPH ═══ */
        .photo-section {
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .photo-bg {
          position: absolute;
          inset: 0;
          background-image: url("/images/contact.png");
          background-repeat: no-repeat;
          background-size: contain;
          background-position: right center;
          background-color: #fffdf6;
        }
        .photo-scrim {
          position: absolute; inset: 0;
          background:
            linear-gradient(90deg, rgba(255,253,246,0.55) 0%, rgba(255,253,246,0.4) 30%, rgba(255,253,246,0.12) 46%, rgba(255,253,246,0) 58%),
            linear-gradient(0deg, rgba(255,253,246,0.35) 0%, rgba(255,253,246,0) 20%);
        }
        .torn-edge {
          position: absolute; left: 0; right: 0; bottom: -1px; width: 100%; height: 64px;
          display: block;
        }
        .photo-content{
          position: relative;
          z-index: 2;
      
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
      
          padding: 0 80px 64px;
      
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
      
          gap: 22px;
      }
        .washi-tape {
          width: fit-content;
          background: rgba(232,184,75,0.85);
          color: var(--blue-deep);
          font-family: var(--hand);
          font-size: 16px;
          font-weight: 700;
          padding: 20px 20px 8px;
          transform: rotate(-3deg);
          box-shadow: 0 4px 10px rgba(13,27,62,0.15);
        }
        .photo-headline {
          font-family: var(--font);
          font-size: clamp(32px, 4.4vw, 50px);
          font-weight: 800;
          line-height: 1.14;
          letter-spacing: -0.03em;
          color: var(--blue);
        }
        .headline-gold { color: var(--gold); position: relative; display: inline-block; }
        .photo-subtext { font-family: var(--font); font-size: 17px; line-height: 1.7; color: var(--text-secondary); max-width: 440px; }
        .photo-actions { display: flex; gap: 14px; flex-wrap: wrap; }

        .btn-solid {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; background: var(--blue); color: white;
          font-family: var(--font); font-size: 15px; font-weight: 600;
          border-radius: 10px; text-decoration: none;
          box-shadow: 0 4px 16px rgba(26,53,117,0.28);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-solid:hover { transform: translateY(-2px) rotate(-0.5deg); box-shadow: 0 10px 24px rgba(26,53,117,0.32); }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; background: transparent; color: var(--blue);
          font-family: var(--font); font-size: 15px; font-weight: 600;
          border: 2px dashed var(--blue); border-radius: 10px; text-decoration: none;
          transition: transform 0.2s, background 0.2s;
        }
        .btn-ghost:hover { background: rgba(26,53,117,0.06); transform: translateY(-2px) rotate(0.5deg); }

        /* ═══ 2. BOARDING PASS ═══ */
        .board-section {
          position: relative;
          background: var(--paper);
          background-image: radial-gradient(rgba(26,53,117,0.09) 1px, transparent 1px);
          background-size: 24px 24px;
          padding: 92px 24px 120px;
          overflow: hidden;
        }
        .board-doodles { position: absolute; inset: 0; pointer-events: none; }
        .board-heading { max-width: 640px; margin: 0 auto 56px; text-align: center; display: flex; flex-direction: column; gap: 10px; }
        .board-kicker { font-family: var(--hand); font-size: 18px; color: var(--gold); font-weight: 700; }
        .board-title { font-family: var(--font); font-size: clamp(28px, 3.2vw, 40px); font-weight: 800; letter-spacing: -0.02em; color: var(--blue-deep); }
        .board-caption { font-family: var(--font); font-size: 16px; color: var(--text-secondary); }

        .ticket-wrap { position: relative; z-index: 1; max-width: 1080px; margin: 0 auto; }
        .ticket {
          display: grid;
          grid-template-columns: 0.36fr auto 0.64fr;
          background: white;
          border-radius: 26px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(13,27,62,0.04), 0 16px 40px rgba(13,27,62,0.10), 0 40px 90px rgba(13,27,62,0.08);
          transform: rotate(-0.3deg);
        }

        .stub {
          position: relative;
          background: linear-gradient(165deg, var(--blue) 0%, var(--blue-deep) 100%);
          color: white;
          padding: 44px 34px 40px;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .stub-glow {
          position: absolute; top: -60px; right: -60px; width: 180px; height: 180px;
          background: radial-gradient(circle, rgba(232,184,75,0.3) 0%, transparent 70%);
        }
        .stub-eyebrow { font-family: var(--hand); font-size: 16px; font-weight: 700; color: var(--gold); position: relative; z-index: 1; }
        .stub-title { font-family: var(--font); font-size: 21px; font-weight: 800; line-height: 1.3; position: relative; z-index: 1; }
        .stub-desc { font-family: var(--font); font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,0.72); position: relative; z-index: 1; }

        .stub-rows { display: flex; flex-direction: column; gap: 20px; position: relative; z-index: 1; }
        .stub-row-group { display: flex; flex-direction: column; gap: 2px; }
        .stub-row-label { display: flex; align-items: center; gap: 7px; font-family: var(--font); font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 6px; }
        .stub-row {
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
          padding: 8px 10px; margin: 0 -10px; border-radius: 8px; text-decoration: none;
          transition: background 0.16s;
        }
        .stub-row:hover { background: rgba(255,255,255,0.08); }
        .stub-row span { font-family: var(--font); font-size: 13.5px; font-weight: 600; color: white; }
        .stub-row em { font-family: var(--hand); font-style: normal; font-size: 13px; color: var(--gold); }

        .stub-stamp {
          position: relative; z-index: 1; margin-top: auto;
          width: 92px; height: 92px; border: 2.5px dashed var(--gold); border-radius: 50%;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          transform: rotate(-8deg); align-self: center;
        }
        .stub-stamp span { font-family: var(--font); font-size: 15px; font-weight: 800; color: var(--gold); }
        .stub-stamp small { font-family: var(--hand); font-size: 11px; color: rgba(255,255,255,0.75); }

        .perforation {
          position: relative;
          background-image: repeating-linear-gradient(0deg, var(--border) 0 10px, transparent 10px 20px);
          background-size: 2px 20px;
          background-position: center;
          background-repeat: repeat-y;
          width: 2px;
        }
        .notch { position: absolute; left: 50%; width: 26px; height: 26px; background: var(--paper); border-radius: 50%; transform: translateX(-50%); }
        .notch-top { top: -13px; }
        .notch-bottom { bottom: -13px; }

        .main { padding: 48px 48px 44px; position: relative; }
        .main-kicker { font-family: var(--hand); font-size: 16px; font-weight: 700; color: var(--gold); }
        .main-title { font-family: var(--font); font-size: 30px; font-weight: 800; letter-spacing: -0.02em; color: var(--blue-deep); margin: 4px 0 34px; }

        .field-block { margin-bottom: 34px; }
        .field-label { display: block; font-family: var(--font); font-size: 12.5px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 14px; }

        .tag-row { display: flex; flex-wrap: wrap; gap: 10px; }
        .tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 16px; border-radius: 8px;
          border: 2px dashed var(--border); background: white;
          font-family: var(--font); font-size: 13.5px; font-weight: 500; color: var(--text-secondary);
          cursor: pointer; transition: all 0.16s ease;
        }
        .tag:hover { border-color: var(--blue); border-style: solid; color: var(--blue); background: var(--blue-light); }
        .tag-active { border-color: var(--blue) !important; border-style: solid !important; background: var(--blue) !important; color: white !important; }
        .tag-gold.tag-active { border-color: var(--gold) !important; background: var(--gold) !important; }
        .tag-gold:hover:not(.tag-active) { border-color: var(--gold); color: #8b6d1f; background: var(--gold-light); }
        .tag-logo { width: 20px; height: 20px; object-fit: contain; }
        .tag-active .tag-logo { filter: brightness(0) invert(1); }

        .input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .input-box-full { grid-column: 1 / -1; }
        .input-box {
          display: flex; flex-direction: column; gap: 6px;
          border: 1.5px solid var(--border); border-radius: 12px; padding: 12px 16px;
          transition: border-color 0.16s;
        }
        .input-box:focus-within { border-color: var(--gold); }
        .input-box span { font-family: var(--font); font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); }
        .input-box input, .input-box textarea {
          border: none; outline: none; font-family: var(--font); font-size: 15.5px; color: var(--blue-deep); resize: none; background: transparent;
        }
        .input-box input::placeholder, .input-box textarea::placeholder { color: var(--text-muted); }

        .board-footer { display: flex; align-items: center; gap: 22px; flex-wrap: wrap; padding-top: 8px; }
        .btn-board {
          position: relative;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 34px 16px 40px; background: var(--blue); color: white;
          font-family: var(--font); font-size: 15.5px; font-weight: 600;
          border: none; border-radius: 100px; cursor: pointer;
          box-shadow: 0 4px 18px rgba(26,53,117,0.28);
          transition: transform 0.2s, box-shadow 0.2s;
          min-width: 220px; justify-content: center;
        }
        .btn-board:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(26,53,117,0.34); }
        .btn-board:disabled { opacity: 0.75; cursor: not-allowed; }
        .btn-board-notch { position: absolute; left: 14px; top: 50%; width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.35); transform: translateY(-50%); }
        .spinner { width: 18px; height: 18px; border: 2.5px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .board-microcopy { font-family: var(--font); font-size: 13px; color: var(--text-muted); }

        .boarded-state { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px; padding: 50px 20px; }
        .boarded-icon { width: 56px; height: 56px; border-radius: 50%; background: var(--blue-light); color: var(--blue); display: flex; align-items: center; justify-content: center; }
        .boarded-title { font-family: var(--font); font-size: 26px; font-weight: 800; color: var(--blue-deep); }
        .boarded-sub { font-family: var(--font); font-size: 15px; color: var(--text-secondary); line-height: 1.7; max-width: 380px; }
        .boarded-signoff { font-family: var(--hand); font-size: 17px; color: var(--gold); font-weight: 700; }

        /* ═══ 3. POSTCARD ═══ */
        .postcard-section { background: var(--paper); padding: 40px 24px 120px; display: flex; justify-content: center; }
        .postcard {
          max-width: 980px; width: 100%;
          display: grid; grid-template-columns: 1.5fr 1fr;
          background: white; border-radius: 22px;
          box-shadow: 0 2px 4px rgba(13,27,62,0.04), 0 16px 40px rgba(13,27,62,0.08);
          transform: rotate(0.4deg);
          overflow: hidden;
        }
        .postcard-note {
          padding: 52px 48px;
          background-image: repeating-linear-gradient(0deg, transparent 0 37px, var(--paper-line) 37px 38px);
          display: flex; flex-direction: column; gap: 18px; justify-content: center;
          border-right: 2px dashed var(--border);
        }
        .postcard-eyebrow { font-family: var(--hand); font-size: 17px; font-weight: 700; color: var(--gold); }
        .postcard-headline { font-family: var(--font); font-size: clamp(24px, 2.6vw, 32px); font-weight: 800; letter-spacing: -0.02em; line-height: 1.25; color: var(--blue-deep); }
        .postcard-message { font-family: var(--font); font-size: 15.5px; line-height: 1.75; color: var(--text-secondary); max-width: 400px; }

        .postcard-stamp-area {
          padding: 44px 36px; background: var(--blue-light);
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; text-align: center;
        }
        .postmark {
          width: 84px; height: 84px; border-radius: 50%; border: 2.5px dashed var(--blue);
          display: flex; align-items: center; justify-content: center; color: var(--blue);
          transform: rotate(-6deg);
        }
        .btn-postmark {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 26px; background: var(--blue); color: white;
          font-family: var(--font); font-size: 14.5px; font-weight: 600;
          border-radius: 100px; text-decoration: none;
          box-shadow: 0 4px 16px rgba(26,53,117,0.24);
          transition: transform 0.2s;
        }
        .btn-postmark:hover { transform: translateY(-2px); }
        .postcard-signature { font-family: var(--hand); font-size: 16px; color: var(--text-secondary); }

        /* ═══ RESPONSIVE ═══ */
        @media (max-width: 980px) {
          .ticket { grid-template-columns: 1fr; }
          .perforation { width: 100%; height: 2px; background-image: repeating-linear-gradient(90deg, var(--border) 0 10px, transparent 10px 20px); background-size: 20px 2px; }
          .notch { top: 50%; left: -13px; transform: translateY(-50%); }
          .notch-bottom { left: auto; right: -13px; bottom: auto; top: 50%; }
          .postcard { grid-template-columns: 1fr; }
          .postcard-note { border-right: none; border-bottom: 2px dashed var(--border); }
        }
        @media (max-width: 640px) {
          .photo-content { padding: 0 24px 48px; }
          .main, .stub { padding: 36px 26px; }
          .input-grid { grid-template-columns: 1fr; }
          .board-footer { flex-direction: column; align-items: flex-start; }
          .btn-board { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </main>
  );
}