"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, Eye, EyeOff, Loader2, ShieldCheck, Users2 } from "lucide-react";

import { createClient } from "@/utils/supabase/client";

type System = "i4imind" | "i4icore";

const SYSTEMS: Array<{ id: System; label: string; sub: string; icon: React.ReactNode; portal: string }> = [
  { id: "i4imind", label: "I4IMind", sub: "For leadership", icon: <ShieldCheck size={24} />, portal: "/i4imind" },
  { id: "i4icore", label: "I4ICore", sub: "For employees", icon: <Users2 size={24} />, portal: "/i4icore" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmployeeLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [system, setSystem] = useState<System | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const chosenSystem = SYSTEMS.find((s) => s.id === system);

  const handleSubmit = async () => {
    const errs: { email?: string; password?: string } = {};
    if (!email.trim()) errs.email = "Please enter your work email.";
    else if (!EMAIL_PATTERN.test(email.trim())) errs.email = "Please enter a valid email address.";
    if (!password) errs.password = "Please enter your password.";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setNotice("");
    setSubmitting(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });

    if (error) {
      setSubmitting(false);
      setNotice("Incorrect email or password. Please try again.");
      return;
    }

    const meta = data.user.user_metadata as Record<string, unknown>;
    const employeeSystem = typeof meta.employee_system === "string" ? meta.employee_system : null;

    if (employeeSystem !== system) {
      await supabase.auth.signOut();
      setSubmitting(false);
      setNotice(
        employeeSystem
          ? `This account isn't authorized for ${chosenSystem?.label}. Please choose ${SYSTEMS.find((s) => s.id === employeeSystem)?.label ?? "the correct system"} instead.`
          : "This account isn't registered for employee access. Please use the main sign-in instead."
      );
      return;
    }

    router.push(chosenSystem?.portal ?? "/login/employee");
    router.refresh();
  };

  return (
    <main className="emp-root">
      <div className="emp-bg" aria-hidden="true">
        <Image src="/images/login.png" alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        <div className="emp-overlay" />
      </div>

      <div className="emp-card">
        <div className="emp-brand">
          <Image src="/images/logo.svg" alt="i4iSciences" width={40} height={40} />
          <span className="emp-brand-name">i4iSciences</span>
          <span className="emp-brand-tagline">Employee Access</span>
        </div>

        <Link href="/login" className="emp-back-link">
          <ChevronLeft size={15} /> Back to main sign in
        </Link>

        <AnimatePresence mode="wait">
          {!system ? (
            <motion.div key="picker" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <p className="emp-prompt">Which system are you signing into?</p>
              <div className="emp-system-grid">
                {SYSTEMS.map((s) => (
                  <button key={s.id} type="button" className="emp-system-card" onClick={() => setSystem(s.id)}>
                    <span className="emp-system-icon">{s.icon}</span>
                    <span className="emp-system-text">
                      <span className="emp-system-label">{s.label}</span>
                      <span className="emp-system-sub">{s.sub}</span>
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <button type="button" className="emp-back-btn" onClick={() => { setSystem(null); setNotice(""); setErrors({}); }}>
                <ChevronLeft size={15} /> Change system
              </button>

              <p className="emp-prompt">
                Signing into <strong>{chosenSystem?.label}</strong>
              </p>

              <div className="field">
                <span className="field-label">Work email</span>
                <div className={`field-control ${errors.email ? "field-control-error" : ""}`}>
                  <input
                    type="email"
                    placeholder="you@i4isciences.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((p) => ({ ...p, email: undefined }));
                    }}
                  />
                </div>
                {errors.email && (
                  <span className="field-error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="field">
                <span className="field-label">Password</span>
                <div className={`field-control ${errors.password ? "field-control-error" : ""}`}>
                  <div className="password-row">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((p) => ({ ...p, password: undefined }));
                      }}
                    />
                    <button type="button" className="eye-btn" onClick={() => setShowPassword((v) => !v)} aria-label="Toggle password visibility">
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <span className="field-error" role="alert">
                    {errors.password}
                  </span>
                )}
              </div>

              {notice && <p className="emp-notice">{notice}</p>}

              <button type="button" className="primary-btn" onClick={handleSubmit} disabled={submitting}>
                {submitting ? <Loader2 className="spin" size={18} /> : "Sign in"}
              </button>

              <p className="emp-microcopy">Employee accounts are provisioned by an i4iSciences administrator.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .emp-root {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 140px 20px 80px;
          font-family: var(--font-geist-sans), "Geist", sans-serif;
        }
        .emp-bg { position: fixed; inset: 0; z-index: 0; }
        .emp-overlay { position: absolute; inset: 0; background: rgba(10,20,50,0.55); }

        .emp-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          border-radius: 24px;
          box-shadow: 0 24px 70px rgba(0,0,0,0.3);
          padding: 36px 34px 30px;
        }
        .emp-brand { display: flex; flex-direction: column; align-items: center; gap: 6px; margin-bottom: 18px; }
        .emp-brand-name { font-size: 1.2rem; font-weight: 800; color: #0a2e8a; }
        .emp-brand-tagline { font-size: 0.76rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: rgba(16,32,78,0.45); }

        .emp-back-link {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 12.5px; font-weight: 600; color: rgba(16,32,78,0.5);
          text-decoration: none; margin-bottom: 22px;
        }
        .emp-back-link:hover { color: #0a2e8a; }
        .emp-back-btn {
          display: inline-flex; align-items: center; gap: 4px; background: none; border: none; padding: 0;
          margin-bottom: 16px; font-size: 13px; font-weight: 600; color: rgba(16,32,78,0.55); cursor: pointer;
        }
        .emp-back-btn:hover { color: #0a2e8a; }

        .emp-prompt { font-size: 0.92rem; font-weight: 600; color: #10204e; margin: 0 0 16px; }
        .emp-prompt strong { color: #0a2e8a; }

        .emp-system-grid { display: flex; flex-direction: column; gap: 12px; }
        .emp-system-card {
          display: flex; align-items: center; gap: 14px; padding: 16px 18px;
          border: 1.5px solid rgba(10,46,138,0.14); border-radius: 16px; background: white;
          cursor: pointer; text-align: left; transition: all 0.16s;
        }
        .emp-system-card:hover { border-color: #0a2e8a; background: rgba(10,46,138,0.03); transform: translateY(-1px); }
        .emp-system-icon {
          display: flex; align-items: center; justify-content: center; width: 46px; height: 46px;
          border-radius: 12px; background: rgba(10,46,138,0.08); color: #0a2e8a; flex-shrink: 0;
        }
        .emp-system-text { display: flex; flex-direction: column; gap: 2px; }
        .emp-system-label { font-size: 0.98rem; font-weight: 700; color: #10204e; }
        .emp-system-sub { font-size: 12.5px; color: rgba(16,32,78,0.5); }

        .field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
        .field-label { font-size: 11.5px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: rgba(16,32,78,0.5); }
        .field-control { border: 1.5px solid rgba(10,46,138,0.14); border-radius: 12px; padding: 11px 14px; transition: border-color 0.16s; }
        .field-control:focus-within { border-color: #0a2e8a; }
        .field-control-error { border-color: #d93025 !important; background: #fdedec; }
        .field-control input { width: 100%; border: none; outline: none; background: transparent; font-family: var(--font-geist-sans), "Geist", sans-serif; font-size: 15px; color: #10204e; }
        .field-control input::placeholder { color: rgba(16,32,78,0.35); }
        .field-error { display: flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 500; color: #d93025; }
        .field-error::before { content: "!"; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; border-radius: 50%; background: #d93025; color: white; font-size: 10px; font-weight: 800; flex-shrink: 0; }

        .password-row { display: flex; align-items: center; gap: 8px; }
        .password-row input { flex: 1; }
        .eye-btn { background: none; border: none; padding: 0; cursor: pointer; color: rgba(16,32,78,0.45); display: flex; }
        .eye-btn:hover { color: #0a2e8a; }

        .emp-notice { font-size: 13px; color: #d93025; margin: -4px 0 14px; line-height: 1.5; }

        .primary-btn {
          width: 100%; padding: 13px 0; border: none; border-radius: 12px;
          background: #0a2e8a; color: white; font-family: var(--font-geist-sans), "Geist", sans-serif;
          font-size: 0.95rem; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 20px rgba(10,46,138,0.28);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .primary-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 10px 26px rgba(10,46,138,0.34); }
        .primary-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .spin { animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .emp-microcopy { margin-top: 14px; text-align: center; font-size: 12px; color: rgba(16,32,78,0.45); }
      `}</style>
    </main>
  );
}
