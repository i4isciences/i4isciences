"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Compass,
  FileText,
  Loader2,
  MapPin,
  UploadCloud,
  X,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS — matches the navbar / footer chrome
   ═══════════════════════════════════════════════════════ */

const NAVY_DEEP = "#0F1922";
const NAVY = "#0A2E8A";
const GOLD = "#F5A623";
const EASE = [0.22, 1, 0.36, 1] as const;

/* ═══════════════════════════════════════════════════════
   CONTENT — sourced from the site's own program lines
   (Teach The Teacher, OneCent Tutors, IPST, LabTricks, AI Ecosystem)
   ═══════════════════════════════════════════════════════ */

const VALUES = [
  {
    index: "001",
    title: "Empowered ownership",
    text: "Every hire here gets real responsibility from day one — a program, a product surface, a region — not a slice of someone else's project.",
  },
  {
    index: "002",
    title: "Continuous learning",
    text: "You'll work alongside people building Teach The Teacher, OneCent Tutors, LabTricks, and our AI Ecosystem side by side — a fast education in shipping real products.",
  },
  {
    index: "003",
    title: "Endless growth",
    text: "We're a young company scaling across three countries. What you build in your first year is still running — and growing — in your fifth.",
  },
  {
    index: "004",
    title: "Mission, not metrics",
    text: "Every role ties back to a learner, a teacher, or a family getting a real shot at opportunity — human mentorship first, automation second.",
  },
];

const LOCATIONS = [
  { country: "India", note: "Core team & program operations" },
  { country: "United States", note: "Partnerships & education strategy" },
  { country: "Canada", note: "Program management" },
];

const INDUSTRY_OPTIONS = [
  "Education & Curriculum Design",
  "AI, Machine Learning & Data Science",
  "Software & Product Engineering",
  "Tutoring & Mentorship",
  "Teacher Training & Certification",
  "Immigrant & Parent Support Services",
  "Science Education (LabTricks)",
  "Product & UX Design",
  "Marketing & Communications",
  "Business Development & Partnerships",
  "Operations & Administration",
  "Customer Success & Support",
  "Internships & Fellowships",
  "Other",
];

const ROLE_OPTIONS = [
  "Software Engineer",
  "AI / ML Engineer",
  "Full-Stack Developer",
  "Product Manager",
  "UI / UX Designer",
  "Content & Curriculum Developer",
  "Tutor / Subject-Matter Expert",
  "Teacher Trainer",
  "Program Coordinator",
  "Business Development / Partnerships",
  "Marketing Specialist",
  "Data Analyst",
  "Customer Support Specialist",
  "Operations Associate",
  "Intern / Fellow",
  "Other",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_RESUME_BYTES = 5 * 1024 * 1024;

/* ═══════════════════════════════════════════════════════
   REVEAL WRAPPER
   ═══════════════════════════════════════════════════════ */

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   DROPDOWN WITH "OTHER" → EXPANDING PILL
   ═══════════════════════════════════════════════════════ */

function OptionSelect({
  label,
  placeholder,
  options,
  value,
  otherValue,
  onChange,
  onOtherChange,
  error,
}: {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  otherValue: string;
  onChange: (v: string) => void;
  onOtherChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div className="career-field">
      <span className="career-field-label">{label}</span>
      <div className={`career-select-wrap ${error ? "career-field-error" : ""}`}>
        <select
          className="career-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="career-select-chevron" />
      </div>

      <AnimatePresence>
        {value === "Other" && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 10 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <input
              type="text"
              className="career-other-pill"
              placeholder="Tell us specifically…"
              value={otherValue}
              onChange={(e) => onOtherChange(e.target.value)}
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <span className="career-field-error-text" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   RESUME UPLOAD
   ═══════════════════════════════════════════════════════ */

function ResumeUpload({
  file,
  onSelect,
  onClear,
  error,
}: {
  file: File | null;
  onSelect: (f: File) => void;
  onClear: () => void;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (files: FileList | null) => {
    const f = files?.[0];
    if (f) onSelect(f);
  };

  return (
    <div className="career-field">
      <span className="career-field-label">Resume / CV (PDF, optional)</span>

      {!file ? (
        <div
          className={`career-dropzone ${dragOver ? "career-dropzone-active" : ""} ${error ? "career-field-error" : ""}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
        >
          <UploadCloud size={22} />
          <div>
            <p className="career-dropzone-title">Click to browse, or drag a PDF here</p>
            <p className="career-dropzone-sub">Max 5MB · .pdf only</p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      ) : (
        <div className="career-file-chip">
          <FileText size={18} />
          <div className="career-file-chip-info">
            <span className="career-file-chip-name">{file.name}</span>
            <span className="career-file-chip-size">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
          </div>
          <button type="button" className="career-file-chip-remove" onClick={onClear} aria-label="Remove file">
            <X size={15} />
          </button>
        </div>
      )}

      {error && (
        <span className="career-field-error-text" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */

export default function CareersPage() {
  const formSectionRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [industry, setIndustry] = useState("");
  const [industryOther, setIndustryOther] = useState("");
  const [role, setRole] = useState("");
  const [roleOther, setRoleOther] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validate = () => {
    const errs: Record<string, string | undefined> = {};
    if (!name.trim()) errs.name = "Please enter your name.";
    if (!email.trim()) errs.email = "Please enter your email address.";
    else if (!EMAIL_PATTERN.test(email.trim())) errs.email = "Please enter a valid email address.";
    if (!industry) errs.industry = "Please select your career interest.";
    else if (industry === "Other" && !industryOther.trim()) errs.industry = "Please tell us your area of interest.";
    if (!role) errs.role = "Please select a role.";
    else if (role === "Other" && !roleOther.trim()) errs.role = "Please tell us the role you have in mind.";
    if (resume && resume.size > MAX_RESUME_BYTES) errs.resume = "Resume must be under 5MB.";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const fd = new FormData();
      fd.append("name", name.trim());
      fd.append("email", email.trim());
      fd.append("industry", industry === "Other" ? `Other — ${industryOther.trim()}` : industry);
      fd.append("role", role === "Other" ? `Other — ${roleOther.trim()}` : role);
      fd.append("message", message.trim());
      if (resume) fd.append("resume", resume);

      const res = await fetch("/api/careers", { method: "POST", body: fd });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
        setIndustry("");
        setIndustryOther("");
        setRole("");
        setRoleOther("");
        setResume(null);
      } else {
        setErrors({ form: "We couldn't send this. Please try again in a moment." });
      }
    } catch {
      setErrors({ form: "We couldn't reach the server. Check your connection and try again." });
    }
    setSubmitting(false);
  };

  return (
    <main className="careers-root">
      {/* ═══════════════════════════════════════════
          1 — HERO
      ═══════════════════════════════════════════ */}
      <section className="hero-section">
        <div className="hero-bg-wrap" aria-hidden="true">
          <img src="/images/careers.png" alt="" className="hero-bg-image" />
        </div>
        <div className="hero-scrim" aria-hidden="true" />

        <div className="hero-inner">
          <FadeUp className="hero-copy">
            <span className="hero-kicker">Careers at i4iSciences</span>
            <h1 className="hero-headline">
              Pioneering human-centered
              <br />
              <span className="hero-headline-gold">education technology.</span>
            </h1>
            <p className="hero-subtext">
              Shape the future of global learning at a company building real products for
              children, immigrant families, and educators across India, the US, and Canada.
            </p>
            <div className="hero-actions">
              <button type="button" className="btn-gold" onClick={scrollToForm}>
                Tell us about yourself <ArrowRight size={16} />
              </button>
              <a href="#roles" className="btn-outline">
                See open roles
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2 — WHY i4iSciences (numbered pillars)
      ═══════════════════════════════════════════ */}
      <section className="values-section">
        <FadeUp className="section-heading">
          <span className="section-kicker">Why join us</span>
          <h2 className="section-title">Work that outlasts a résumé line</h2>
        </FadeUp>

        <div className="values-grid">
          {VALUES.map((v, i) => (
            <FadeUp key={v.title} delay={i * 0.08} className="value-card">
              <span className="value-index">{v.index}</span>
              <h3 className="value-title">{v.title}</h3>
              <p className="value-text">{v.text}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3 — WHERE WE WORK
      ═══════════════════════════════════════════ */}
      <section className="locations-section">
        <FadeUp className="locations-inner">
          <span className="section-kicker locations-kicker">Where we work</span>
          <div className="locations-row">
            {LOCATIONS.map((loc) => (
              <div key={loc.country} className="location-item">
                <MapPin size={16} />
                <div>
                  <span className="location-country">{loc.country}</span>
                  <span className="location-note">{loc.note}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ═══════════════════════════════════════════
          4 — OPEN ROLES
      ═══════════════════════════════════════════ */}
      <section className="roles-section" id="roles">
        <FadeUp className="roles-card">
          <div className="roles-icon">
            <Compass size={26} />
          </div>
          <h2 className="roles-title">There are no open roles right now</h2>
          <p className="roles-text">
            We&apos;re a lean, deliberately small team — which means new openings are
            infrequent, but real when they happen. If nothing above fits today, that
            doesn&apos;t mean there&apos;s no fit at all. Tell us who you are and what
            you&apos;re good at, and we&apos;ll reach out the moment something matches.
          </p>
          <button type="button" className="btn-navy" onClick={scrollToForm}>
            Tell us about yourself <ArrowUpRight size={16} />
          </button>
        </FadeUp>
      </section>

      {/* ═══════════════════════════════════════════
          5 — GENERAL INTEREST FORM
      ═══════════════════════════════════════════ */}
      <section className="form-section" id="form" ref={formSectionRef}>
        <div className="form-shell">
          <FadeUp className="form-heading">
            <span className="section-kicker">Introduce yourself</span>
            <h2 className="section-title">We&apos;d genuinely like to know you</h2>
            <p className="form-subtext">
              One short form. No open req required — this reaches our team directly, and
              we keep every submission on file for when a matching role opens.
            </p>
          </FadeUp>

          <FadeUp delay={0.1} className="form-card">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="form-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="form-success-icon">
                    <Check size={26} />
                  </div>
                  <h3>Thank you — you&apos;re on our radar.</h3>
                  <p>
                    We&apos;ve received your details and resume. Our team reviews every
                    submission personally and will reach out if there&apos;s a fit.
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="career-input-grid">
                    <div className="career-field">
                      <span className="career-field-label">Full name</span>
                      <div className={`career-input-box ${errors.name ? "career-field-error" : ""}`}>
                        <input
                          type="text"
                          placeholder="Your full name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            setErrors((p) => ({ ...p, name: undefined }));
                          }}
                        />
                      </div>
                      {errors.name && <span className="career-field-error-text">{errors.name}</span>}
                    </div>

                    <div className="career-field">
                      <span className="career-field-label">Email address</span>
                      <div className={`career-input-box ${errors.email ? "career-field-error" : ""}`}>
                        <input
                          type="email"
                          placeholder="you@gmail.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors((p) => ({ ...p, email: undefined }));
                          }}
                        />
                      </div>
                      {errors.email && <span className="career-field-error-text">{errors.email}</span>}
                    </div>

                    <OptionSelect
                      label="Career interest (industry)"
                      placeholder="Select an area"
                      options={INDUSTRY_OPTIONS}
                      value={industry}
                      otherValue={industryOther}
                      onChange={(v) => {
                        setIndustry(v);
                        setErrors((p) => ({ ...p, industry: undefined }));
                      }}
                      onOtherChange={setIndustryOther}
                      error={errors.industry}
                    />

                    <OptionSelect
                      label="Role you're interested in"
                      placeholder="Select a role"
                      options={ROLE_OPTIONS}
                      value={role}
                      otherValue={roleOther}
                      onChange={(v) => {
                        setRole(v);
                        setErrors((p) => ({ ...p, role: undefined }));
                      }}
                      onOtherChange={setRoleOther}
                      error={errors.role}
                    />

                    <div className="career-field career-field-full">
                      <span className="career-field-label">Message (optional)</span>
                      <div className="career-input-box">
                        <textarea
                          rows={4}
                          placeholder="Tell us about your background, what you're looking for, or why i4iSciences."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="career-field career-field-full">
                      <ResumeUpload
                        file={resume}
                        onSelect={(f) => {
                          setResume(f);
                          setErrors((p) => ({ ...p, resume: undefined }));
                        }}
                        onClear={() => setResume(null)}
                        error={errors.resume}
                      />
                    </div>
                  </div>

                  {errors.form && <p className="career-form-error">{errors.form}</p>}

                  <button type="button" className="btn-navy career-submit" onClick={handleSubmit} disabled={submitting}>
                    {submitting ? (
                      <Loader2 className="career-spin" size={18} />
                    ) : (
                      <>
                        Send my details <CheckCircle2 size={17} />
                      </>
                    )}
                  </button>
                  <p className="career-microcopy">We typically respond within 5 business days.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STYLES
      ═══════════════════════════════════════════ */}
      <style jsx global>{`
        .careers-root, .careers-root *, .careers-root *::before, .careers-root *::after {
          box-sizing: border-box;
        }
        .careers-root {
          font-family: var(--font-geist-sans), "Geist", system-ui, sans-serif;
          background: #fafbfc;
          overflow-x: hidden;
        }

        /* ═══ HERO ═══ */
        .hero-section {
          position: relative;
          background: ${NAVY_DEEP};
          padding: 168px 24px 96px;
          overflow: hidden;
        }
        .hero-bg-wrap { position: absolute; inset: 0; z-index: 0; }
        .hero-bg-image {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center;
        }
        .hero-scrim {
          position: absolute; inset: 0; z-index: 0;
          background: linear-gradient(90deg, ${NAVY_DEEP} 0%, rgba(15,25,34,0.86) 32%, rgba(15,25,34,0.35) 58%, rgba(15,25,34,0.15) 100%);
        }
        .hero-inner {
          position: relative; z-index: 1;
          max-width: 1280px; margin: 0 auto;
        }
        .hero-copy { display: flex; flex-direction: column; gap: 22px; max-width: 620px; }
        .hero-kicker {
          width: fit-content; font-size: 12px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: ${GOLD};
          padding: 7px 14px; border: 1px solid rgba(245,166,35,0.35); border-radius: 999px;
          background: rgba(245,166,35,0.08);
        }
        .hero-headline {
          font-size: clamp(32px, 4.2vw, 50px); font-weight: 800; line-height: 1.14;
          letter-spacing: -0.03em; color: #ffffff;
        }
        .hero-headline-gold { color: ${GOLD}; }
        .hero-subtext { font-size: 17px; line-height: 1.7; color: rgba(226,232,240,0.75); max-width: 480px; }
        .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 6px; }

        .btn-gold {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 26px; background: ${GOLD}; color: #0B2A83;
          font-size: 15px; font-weight: 700; border: none; border-radius: 999px; cursor: pointer;
          box-shadow: 0 6px 22px rgba(245,166,35,0.32);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(245,166,35,0.4); }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 26px; background: transparent; color: #ffffff;
          font-size: 15px; font-weight: 600; border-radius: 999px; text-decoration: none;
          border: 1.5px solid rgba(255,255,255,0.28);
          transition: background 0.2s, transform 0.2s;
        }
        .btn-outline:hover { background: rgba(255,255,255,0.08); transform: translateY(-2px); }

        .btn-navy {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px 30px; background: ${NAVY}; color: #ffffff;
          font-size: 15px; font-weight: 700; border: none; border-radius: 999px; cursor: pointer;
          box-shadow: 0 6px 22px rgba(10,46,138,0.28);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-navy:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(10,46,138,0.36); }
        .btn-navy:disabled { opacity: 0.7; cursor: not-allowed; }

        /* ═══ SECTION HEADING (shared) ═══ */
        .section-heading { max-width: 640px; margin: 0 auto 48px; text-align: center; display: flex; flex-direction: column; gap: 10px; }
        .section-kicker { font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: ${GOLD}; }
        .section-title { font-size: clamp(26px, 3vw, 36px); font-weight: 800; letter-spacing: -0.02em; color: #10204e; }

        /* ═══ VALUES (numbered pillars) ═══ */
        .values-section { padding: 96px 24px; max-width: 1200px; margin: 0 auto; }
        .values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(10,46,138,0.10); border: 1px solid rgba(10,46,138,0.10); border-radius: 18px; overflow: hidden; }
        .value-card {
          background: #ffffff; padding: 32px 26px; display: flex; flex-direction: column; gap: 10px;
        }
        .value-index { font-size: 13px; font-weight: 800; letter-spacing: 0.1em; color: ${GOLD}; }
        .value-title { font-size: 17px; font-weight: 700; color: #10204e; }
        .value-text { font-size: 13.5px; line-height: 1.65; color: rgba(16,32,78,0.62); }

        /* ═══ LOCATIONS ═══ */
        .locations-section { padding: 0 24px 96px; }
        .locations-inner { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }
        .locations-kicker { text-align: left; }
        .locations-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .location-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 20px 22px; border: 1px solid rgba(10,46,138,0.10); border-radius: 16px;
          background: #ffffff; color: ${NAVY};
        }
        .location-country { display: block; font-size: 15px; font-weight: 700; color: #10204e; }
        .location-note { display: block; font-size: 12.5px; color: rgba(16,32,78,0.55); margin-top: 2px; }

        /* ═══ OPEN ROLES ═══ */
        .roles-section { padding: 20px 24px 100px; display: flex; justify-content: center; }
        .roles-card {
          max-width: 720px; width: 100%; text-align: center;
          background: linear-gradient(165deg, #eef3ff 0%, #f7f9fd 100%);
          border: 1px solid rgba(10,46,138,0.10);
          border-radius: 26px; padding: 56px 48px;
          display: flex; flex-direction: column; align-items: center; gap: 16px;
        }
        .roles-icon {
          width: 58px; height: 58px; border-radius: 50%; background: rgba(10,46,138,0.08);
          color: ${NAVY}; display: flex; align-items: center; justify-content: center; margin-bottom: 4px;
        }
        .roles-title { font-size: 24px; font-weight: 800; color: #10204e; letter-spacing: -0.01em; }
        .roles-text { font-size: 15px; line-height: 1.75; color: rgba(16,32,78,0.65); max-width: 540px; }

        /* ═══ FORM ═══ */
        .form-section { background: #f4f6fb; padding: 100px 24px 120px; }
        .form-shell { max-width: 780px; margin: 0 auto; }
        .form-heading { text-align: center; margin-bottom: 40px; display: flex; flex-direction: column; gap: 10px; align-items: center; }
        .form-subtext { font-size: 15px; color: rgba(16,32,78,0.6); max-width: 460px; }

        .form-card {
          background: #ffffff; border-radius: 24px; padding: 44px 40px;
          box-shadow: 0 2px 4px rgba(13,27,62,0.04), 0 20px 50px rgba(13,27,62,0.08);
        }

        .career-input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px 20px; }
        .career-field { display: flex; flex-direction: column; gap: 7px; min-width: 0; }
        .career-field-full { grid-column: 1 / -1; }
        .career-field-label { font-size: 11.5px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: rgba(16,32,78,0.5); }

        .career-input-box { border: 1.5px solid rgba(10,46,138,0.14); border-radius: 12px; padding: 12px 15px; transition: border-color 0.16s; }
        .career-input-box:focus-within { border-color: ${NAVY}; }
        .career-input-box input, .career-input-box textarea {
          width: 100%; border: none; outline: none; background: transparent;
          font-family: inherit; font-size: 15px; color: #10204e; resize: none;
        }
        .career-input-box input::placeholder, .career-input-box textarea::placeholder { color: rgba(16,32,78,0.35); }

        .career-select-wrap { position: relative; border: 1.5px solid rgba(10,46,138,0.14); border-radius: 12px; transition: border-color 0.16s; }
        .career-select-wrap:focus-within { border-color: ${NAVY}; }
        .career-select {
          width: 100%; appearance: none; background: transparent; border: none; outline: none;
          padding: 12px 40px 12px 15px; font-family: inherit; font-size: 15px; color: #10204e; cursor: pointer;
        }
        .career-select:invalid { color: rgba(16,32,78,0.4); }
        .career-select-chevron { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: rgba(16,32,78,0.4); pointer-events: none; }

        .career-other-pill {
          width: 100%; border: 1.5px dashed ${GOLD}; background: rgba(245,166,35,0.06);
          border-radius: 999px; padding: 10px 18px; outline: none;
          font-family: inherit; font-size: 14px; color: #10204e;
        }
        .career-other-pill::placeholder { color: rgba(16,32,78,0.4); }

        .career-field-error .career-input-box,
        .career-field-error.career-select-wrap,
        .career-select-wrap.career-field-error { border-color: #d93025 !important; background: #fdedec; }
        .career-field-error-text { display: flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 500; color: #d93025; }
        .career-field-error-text::before {
          content: "!"; display: inline-flex; align-items: center; justify-content: center;
          width: 14px; height: 14px; border-radius: 50%; background: #d93025; color: white;
          font-size: 10px; font-weight: 800; flex-shrink: 0;
        }
        .career-form-error { margin-top: 14px; font-size: 13.5px; color: #d93025; font-weight: 500; }

        .career-dropzone {
          display: flex; align-items: center; gap: 14px; cursor: pointer;
          border: 1.5px dashed rgba(10,46,138,0.22); border-radius: 14px; padding: 20px;
          color: ${NAVY}; transition: all 0.16s;
        }
        .career-dropzone:hover, .career-dropzone-active { border-color: ${NAVY}; background: rgba(10,46,138,0.03); }
        .career-dropzone-title { font-size: 14px; font-weight: 600; color: #10204e; }
        .career-dropzone-sub { font-size: 12.5px; color: rgba(16,32,78,0.5); }

        .career-file-chip {
          display: flex; align-items: center; gap: 12px;
          border: 1.5px solid rgba(10,46,138,0.14); border-radius: 14px; padding: 14px 16px;
          background: rgba(10,46,138,0.03); color: ${NAVY};
        }
        .career-file-chip-info { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
        .career-file-chip-name { font-size: 13.5px; font-weight: 600; color: #10204e; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .career-file-chip-size { font-size: 11.5px; color: rgba(16,32,78,0.5); }
        .career-file-chip-remove {
          width: 28px; height: 28px; border-radius: 50%; border: none; background: rgba(217,48,37,0.08);
          color: #d93025; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0;
        }
        .career-file-chip-remove:hover { background: rgba(217,48,37,0.16); }

        .career-submit { width: 100%; margin-top: 28px; }
        .career-spin { animation: career-spin 0.8s linear infinite; }
        @keyframes career-spin { to { transform: rotate(360deg); } }
        .career-microcopy { text-align: center; font-size: 13px; color: rgba(16,32,78,0.5); margin-top: 12px; }

        .form-success { text-align: center; padding: 30px 10px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .form-success-icon {
          width: 56px; height: 56px; border-radius: 50%; background: rgba(16,163,74,0.12); color: #16a34a;
          display: flex; align-items: center; justify-content: center;
        }
        .form-success h3 { font-size: 22px; font-weight: 800; color: #10204e; }
        .form-success p { font-size: 14.5px; color: rgba(16,32,78,0.6); line-height: 1.7; max-width: 400px; }

        /* ═══ RESPONSIVE ═══ */
        @media (max-width: 1024px) {
          .values-grid { grid-template-columns: repeat(2, 1fr); }
          .locations-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .hero-section { padding: 140px 20px 72px; }
          .values-grid { grid-template-columns: 1fr; }
          .career-input-grid { grid-template-columns: 1fr; }
          .form-card { padding: 32px 22px; }
          .roles-card { padding: 40px 26px; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </main>
  );
}
