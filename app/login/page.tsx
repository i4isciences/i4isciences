"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  Users,
  X,
} from "lucide-react";

import type { CountryCode } from "libphonenumber-js";

import { createClient } from "@/utils/supabase/client";
import LegalDocument from "@/components/legal/LegalDocument";
import { termsOfServiceContent, privacyPolicyContent, type LegalContent } from "@/lib/legal-content";
import { detectDefaultCountry } from "@/lib/countries";
import CountryPhoneField, { isPhoneValid } from "@/components/auth/CountryPhoneField";
import OtpInput from "@/components/auth/OtpInput";

// ─────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────

const MODELS = [
  { name: "Teach The Teacher", logo: "/images/tttlogo-removebg-preview.png" },
  { name: "OneCent Tutors", logo: "/images/octlogo-removebg-preview.png" },
  { name: "Immigrant Parent Support Training", logo: "/images/ipstlogo-removebg-preview.png" },
  { name: "Lab Tricks", logo: "/images/labtrickslogo-removebg-preview.png" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Mode = "login" | "signup" | "reset";
type Role = "student" | "parent" | "teacher";
type SignupStep = "role" | "details" | "extra" | "success";

type FieldErrors = Record<string, string | undefined>;

// ─────────────────────────────────────────────
// MODEL CAROUSEL — quiet, auto-cycling strip above the card
// ─────────────────────────────────────────────

function ModelCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % MODELS.length), 2800);
    return () => clearInterval(id);
  }, []);

  const current = MODELS[index];

  return (
    <div className="carousel">
      <span className="carousel-label">i4iSciences ecosystem</span>
      <div className="carousel-track">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            className="carousel-item"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 14 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <span className="carousel-logo">
              <Image src={current.logo} alt="" width={22} height={22} />
            </span>
            <span className="carousel-name">{current.name}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FIELD — small wrapper matching the Contact form's validation language
// ─────────────────────────────────────────────

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="field">
      <span className="field-label">{label}</span>
      <div className={`field-control ${error ? "field-control-error" : ""}`}>{children}</div>
      {error && (
        <span className="field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// LEGAL MODAL — full Terms / Privacy content, reused from the real pages
// ─────────────────────────────────────────────

function LegalModal({ content, onClose }: { content: LegalContent; onClose: () => void }) {
  return (
    <motion.div
      className="legal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="legal-modal"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="legal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <div className="legal-scroll">
          <LegalDocument {...content} />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// TERMS CHECKBOX — required before any account is created
// ─────────────────────────────────────────────

function TermsCheckbox({
  checked,
  onToggle,
  onOpenTerms,
  onOpenPrivacy,
  error,
}: {
  checked: boolean;
  onToggle: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  error?: string;
}) {
  return (
    <div className="terms-gate">
      <label className="terms-row">
        <input type="checkbox" checked={checked} onChange={onToggle} />
        <span>
          I agree to the{" "}
          <button type="button" className="terms-link" onClick={onOpenTerms}>
            Terms of Service
          </button>{" "}
          and{" "}
          <button type="button" className="terms-link" onClick={onOpenPrivacy}>
            Privacy Policy
          </button>
          .
        </span>
      </label>
      {error && (
        <span className="field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState<Mode>("login");

  // Login state
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState<FieldErrors>({});
  const [loginSubmitting, setLoginSubmitting] = useState(false);
  const [loginNotice, setLoginNotice] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [showForgotForm, setShowForgotForm] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotSubmitting, setForgotSubmitting] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  // Password recovery state (arriving here via the "reset password" email link)
  const [checkingRecovery, setCheckingRecovery] = useState(true);
  const [recoveryInvalid, setRecoveryInvalid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSubmitting, setResetSubmitting] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  useEffect(() => {
    // A password-recovery link lands the browser back here with a code/token
    // in the URL that the Supabase client exchanges for a session automatically.
    // We only treat this as a "reset" flow if the URL actually carries recovery
    // params — otherwise a normal signed-out visit to /login would never show
    // the login/signup tabs while this check resolves.
    const url = new URL(window.location.href);
    const looksLikeRecovery =
      url.searchParams.get("type") === "recovery" ||
      url.hash.includes("type=recovery") ||
      url.searchParams.has("code");

    if (!looksLikeRecovery) {
      // Not a recovery link — nothing to await from Supabase, so there's no
      // external event to hang this on. Deferred a tick so the state update
      // happens in a microtask rather than synchronously inside the effect.
      queueMicrotask(() => setCheckingRecovery(false));
      return;
    }

    let settled = false;
    const finish = (ready: boolean) => {
      if (settled) return;
      settled = true;
      setRecoveryInvalid(!ready);
      setCheckingRecovery(false);
      setMode("reset");
    };

    // PASSWORD_RECOVERY is the authoritative signal — Supabase only fires it
    // when the session was just established from a genuine recovery link, so
    // we never mistake an already-signed-in browser session for a recovery.
    const { data: subscription } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") finish(true);
    });

    // Fallback for the (unlikely) case where Supabase's client already
    // exchanged the code before this listener attached. Safe here — and only
    // here — because we've already confirmed the URL itself carries recovery
    // params, so a session appearing now is the one this link just created.
    const timeout = setTimeout(() => {
      supabase.auth.getSession().then(({ data }) => finish(!!data.session));
    }, 5000);

    return () => {
      subscription.subscription.unsubscribe();
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResetPassword = async () => {
    if (!newPassword) {
      setResetError("Please create a password.");
      return;
    }
    if (newPassword.length < 8) {
      setResetError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setResetError("Passwords don't match.");
      return;
    }

    setResetError("");
    setResetSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setResetSubmitting(false);

    if (error) {
      setResetError(
        error.code === "same_password"
          ? "That's your current password — choose a different one."
          : error.message || "We couldn't update your password. Please try again."
      );
      return;
    }

    setResetDone(true);
    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 1800);
  };

  // Signup state
  const [step, setStep] = useState<SignupStep>("role");
  const [role, setRole] = useState<Role | null>(null);
  const [details, setDetails] = useState({ fullName: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [gender, setGender] = useState<"male" | "female" | "unspecified" | "">("");
  const [detailErrors, setDetailErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState<CountryCode>(() => detectDefaultCountry());
  const [parentCountry, setParentCountry] = useState<CountryCode>(() => detectDefaultCountry());

  const [age, setAge] = useState("");
  const [parent, setParent] = useState({ name: "", phone: "", email: "" });
  const [teacherExtra, setTeacherExtra] = useState({ organization: "", subject: "" });
  const [parentExtra, setParentExtra] = useState({ organization: "" });
  const [extraErrors, setExtraErrors] = useState<FieldErrors>({});

  const [otpSent, setOtpSent] = useState(false);
  const [otpToken, setOtpToken] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const [creatingAccount, setCreatingAccount] = useState(false);
  const [successVariant, setSuccessVariant] = useState<"redirecting" | "confirm-email" | "minor-welcome">("redirecting");

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const id = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [resendCooldown]);

  const resetSignup = () => {
    setStep("role");
    setRole(null);
    setDetails({ fullName: "", email: "", phone: "", password: "", confirmPassword: "" });
    setDetailErrors({});
    setGender("");
    setAge("");
    setParent({ name: "", phone: "", email: "" });
    setTeacherExtra({ organization: "", subject: "" });
    setParentExtra({ organization: "" });
    setExtraErrors({});
    setOtpSent(false);
    setOtpToken("");
    setOtpValue("");
    setOtpError("");
    setOtpVerified(false);
    setTermsAccepted(false);
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setLoginErrors({});
    setLoginNotice("");
    setShowForgotForm(false);
    setForgotSent(false);
    setForgotEmail("");
    setForgotError("");
    resetSignup();
  };

  // ── LOGIN ──
  const handleLogin = async () => {
    const errs: FieldErrors = {};
    if (!loginData.email.trim()) errs.email = "Please enter your email address.";
    else if (!EMAIL_PATTERN.test(loginData.email.trim())) errs.email = "Please enter a valid email address.";
    if (!loginData.password) errs.password = "Please enter your password.";

    if (Object.keys(errs).length > 0) {
      setLoginErrors(errs);
      return;
    }

    setLoginErrors({});
    setLoginNotice("");
    setLoginSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginData.email.trim(),
      password: loginData.password,
    });
    setLoginSubmitting(false);

    if (error) {
      if (error.code === "email_not_confirmed") {
        setLoginNotice("Please confirm your email before signing in — check your inbox for the confirmation link we sent.");
      } else {
        setLoginNotice("Incorrect email or password. Please try again.");
      }
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  // ── FORGOT PASSWORD ──
  const handleForgotPassword = async () => {
    if (!forgotEmail.trim()) {
      setForgotError("Please enter your email address.");
      return;
    }
    if (!EMAIL_PATTERN.test(forgotEmail.trim())) {
      setForgotError("Please enter a valid email address.");
      return;
    }

    setForgotError("");
    setForgotSubmitting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail.trim(), {
        redirectTo: `${window.location.origin}/login`,
      });
      setForgotSubmitting(false);

      // A network-level failure never reached Supabase at all — that's a real
      // problem to surface, not a privacy concern. Anything Supabase itself
      // returned (including "no such user") stays silent, so the response
      // never reveals which emails have accounts.
      if (error && !error.status) {
        setForgotError("We couldn't reach the server. Check your connection and try again.");
        return;
      }
      if (error) console.error("resetPasswordForEmail:", error.message);
      setForgotSent(true);
    } catch (err) {
      setForgotSubmitting(false);
      setForgotError("We couldn't reach the server. Check your connection and try again.");
      console.error("resetPasswordForEmail:", err);
    }
  };

  const backToLogin = () => {
    setShowForgotForm(false);
    setForgotSent(false);
    setForgotEmail("");
    setForgotError("");
  };

  // ── SIGNUP: role ──
  const chooseRole = (r: Role) => {
    setRole(r);
    setTimeout(() => setStep("details"), 150);
  };

  // ── SIGNUP: details ──
  const validateDetails = () => {
    const errs: FieldErrors = {};
    if (!details.fullName.trim()) errs.fullName = "Please enter your full name.";
    if (!details.email.trim()) errs.email = "Please enter your email address.";
    else if (!EMAIL_PATTERN.test(details.email.trim())) errs.email = "Please enter a valid email address.";
    if (!details.phone.trim()) errs.phone = "Please enter a phone number.";
    else if (!isPhoneValid(details.phone.trim(), country)) errs.phone = "Please enter a valid phone number for the selected country.";
    if (!details.password) errs.password = "Please create a password.";
    else if (details.password.length < 8) errs.password = "Password must be at least 8 characters.";
    if (details.confirmPassword !== details.password) errs.confirmPassword = "Passwords don't match.";
    return errs;
  };

  const handleDetailsContinue = () => {
    const errs = validateDetails();
    if (Object.keys(errs).length > 0) {
      setDetailErrors(errs);
      return;
    }
    setDetailErrors({});
    setStep("extra");
  };

  // ── SIGNUP: account creation ──
  const createAccount = async (extraMetadata: Record<string, unknown>) => {
    if (!termsAccepted) {
      setExtraErrors((p) => ({ ...p, terms: "Please accept the Terms of Service and Privacy Policy to continue." }));
      return;
    }

    setCreatingAccount(true);
    const { data, error } = await supabase.auth.signUp({
      email: details.email.trim(),
      password: details.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          full_name: details.fullName.trim(),
          phone: details.phone.trim(),
          country,
          gender: gender || null,
          role,
          ...extraMetadata,
        },
      },
    });
    setCreatingAccount(false);

    if (error) {
      setExtraErrors({ form: error.message || "We couldn't create your account. Please try again." });
      return;
    }

    if (!data.session) {
      setSuccessVariant("confirm-email");
    } else if (role === "student" && Number(age) < 18) {
      setSuccessVariant("minor-welcome");
    } else {
      setSuccessVariant("redirecting");
    }
    setStep("success");

    if (data.session) {
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1800);
    }
  };

  // ── SIGNUP: student extra step ──
  const isMinor = age !== "" && Number(age) < 18;
  const isAdultStudent = age !== "" && Number(age) >= 18;

  const handleStudentContinue = () => {
    const errs: FieldErrors = {};
    if (!age.trim()) errs.age = "Please enter your age.";
    else if (Number.isNaN(Number(age)) || Number(age) < 5 || Number(age) > 100) errs.age = "Please enter a valid age.";
    if (Object.keys(errs).length > 0) {
      setExtraErrors(errs);
      return;
    }
    setExtraErrors({});
    if (Number(age) >= 18) {
      createAccount({ age: Number(age) });
    }
  };

  const normalizePhone = (v: string) => v.replace(/\D/g, "");

  const validateParentFields = () => {
    const errs: FieldErrors = {};
    if (!parent.name.trim()) errs.parentName = "Please enter your parent's full name.";

    if (!parent.phone.trim()) errs.parentPhone = "Please enter your parent's phone number.";
    else if (!isPhoneValid(parent.phone.trim(), parentCountry)) errs.parentPhone = "Please enter a valid phone number for the selected country.";
    else if (normalizePhone(parent.phone) === normalizePhone(details.phone) && normalizePhone(details.phone).length > 0)
      errs.parentPhone = "Parent's phone number can't be the same as yours.";

    if (!parent.email.trim()) errs.parentEmail = "Please enter your parent's email address.";
    else if (!EMAIL_PATTERN.test(parent.email.trim())) errs.parentEmail = "Please enter a valid email address.";
    else if (parent.email.trim().toLowerCase() === details.email.trim().toLowerCase() && details.email.trim().length > 0)
      errs.parentEmail = "Parent's email can't be the same as yours.";

    return errs;
  };

  const sendParentOtp = async () => {
    const errs = validateParentFields();
    if (Object.keys(errs).length > 0) {
      setExtraErrors(errs);
      return;
    }
    setExtraErrors({});
    setSendingOtp(true);
    try {
      const res = await fetch("/api/auth/parent-otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: parent.email.trim(), studentName: details.fullName.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpToken(data.token);
        setOtpSent(true);
        setResendCooldown(30);
      } else {
        setExtraErrors({ otpSend: data.error || "We couldn't send the code. Please try again." });
      }
    } catch {
      setExtraErrors({ otpSend: "We couldn't send the code. Please try again." });
    }
    setSendingOtp(false);
  };

  const verifyParentOtp = async () => {
    if (otpValue.length !== 6) {
      setOtpError("Enter the full 6-digit code.");
      return;
    }
    setOtpError("");
    setVerifyingOtp(true);
    try {
      const res = await fetch("/api/auth/parent-otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: parent.email.trim(), token: otpToken, code: otpValue }),
      });
      const data = await res.json();
      if (data.success && data.verified) {
        setOtpVerified(true);
      } else {
        setOtpError(data.error || "That code didn't match. Please try again.");
      }
    } catch {
      setOtpError("Something went wrong. Please try again.");
    }
    setVerifyingOtp(false);
  };

  const handleMinorContinue = () => {
    createAccount({
      age: Number(age),
      parent_name: parent.name.trim(),
      parent_phone: parent.phone.trim(),
      parent_country: parentCountry,
      parent_email: parent.email.trim(),
      parent_verified: true,
    });
  };

  // ── SIGNUP: teacher / parent extra steps ──
  const handleTeacherContinue = () => {
    const errs: FieldErrors = {};
    if (!teacherExtra.organization.trim()) errs.organization = "Please enter your school or organization.";
    if (!teacherExtra.subject.trim()) errs.subject = "Please enter your subject or area of expertise.";
    if (Object.keys(errs).length > 0) {
      setExtraErrors(errs);
      return;
    }
    setExtraErrors({});
    createAccount({ organization: teacherExtra.organization.trim(), subject: teacherExtra.subject.trim() });
  };

  const handleParentContinue = () => {
    createAccount({ organization: parentExtra.organization.trim() || null });
  };

  const toggleTerms = () => {
    setTermsAccepted((v) => !v);
    setExtraErrors((p) => ({ ...p, terms: undefined }));
  };

  const roleCards: Array<{ role: Role; label: string; sub: string; icon: React.ReactNode }> = [
    { role: "student", label: "Student", sub: "Learn, tutor sessions, AI Olympiad", icon: <GraduationCap size={26} /> },
    { role: "parent", label: "Parent", sub: "Support your child's journey", icon: <Users size={26} /> },
    { role: "teacher", label: "Teacher", sub: "Teach, train, certify", icon: <BookOpen size={26} /> },
  ];

  return (
    <main className="login-root">
      <div className="bg-layer" aria-hidden="true">
        <Image src="/images/login.png" alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        <div className="bg-overlay" />
      </div>

      <ModelCarousel />

      <div className="card">
        <div className="brand">
          <Image src="/images/logo.svg" alt="i4iSciences" width={44} height={44} />
          <span className="brand-name">i4iSciences</span>
          <span className="brand-tagline">AI Education Platform</span>
        </div>

        {mode !== "reset" && (
          <div className="tabs">
            <button type="button" className={`tab ${mode === "login" ? "tab-active" : ""}`} onClick={() => switchMode("login")}>
              Log in
            </button>
            <button type="button" className={`tab ${mode === "signup" ? "tab-active" : ""}`} onClick={() => switchMode("signup")}>
              Sign up
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {mode === "reset" ? (
            <motion.div key="reset" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              {checkingRecovery ? (
                <div className="reset-loading">
                  <Loader2 className="spin" size={22} />
                </div>
              ) : recoveryInvalid ? (
                <div className="success-block">
                  <h3>This link has expired</h3>
                  <p>Password reset links only work for a short time. Request a new one from the sign-in page.</p>
                  <button
                    type="button"
                    className="link-btn"
                    style={{ marginTop: 14 }}
                    onClick={() => {
                      setMode("login");
                      setRecoveryInvalid(false);
                    }}
                  >
                    Back to sign in
                  </button>
                </div>
              ) : resetDone ? (
                <div className="success-block">
                  <div className="success-icon">
                    <Check size={26} />
                  </div>
                  <h3>Password updated</h3>
                  <p>Taking you to your dashboard…</p>
                </div>
              ) : (
                <>
                  <p className="notice" style={{ marginBottom: 18 }}>
                    Choose a new password for your account.
                  </p>

                  <Field label="New password" error={resetError}>
                    <div className="password-row">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="At least 8 characters"
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          setResetError("");
                        }}
                      />
                      <button type="button" className="eye-btn" onClick={() => setShowNewPassword((v) => !v)} aria-label="Toggle password visibility">
                        {showNewPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </Field>

                  <Field label="Confirm new password">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={confirmNewPassword}
                      onChange={(e) => {
                        setConfirmNewPassword(e.target.value);
                        setResetError("");
                      }}
                    />
                  </Field>

                  <button type="button" className="primary-btn" onClick={handleResetPassword} disabled={resetSubmitting}>
                    {resetSubmitting ? <Loader2 className="spin" size={18} /> : "Update password"}
                  </button>
                </>
              )}
            </motion.div>
          ) : mode === "login" && showForgotForm ? (
            <motion.div key="forgot" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <button type="button" className="back-btn" onClick={backToLogin}>
                <ChevronLeft size={16} /> Back to sign in
              </button>

              {forgotSent ? (
                <div className="success-block">
                  <div className="success-icon">
                    <Check size={26} />
                  </div>
                  <h3>Check your email</h3>
                  <p>If an account exists for {forgotEmail}, we&apos;ve sent a link to reset your password.</p>
                </div>
              ) : (
                <>
                  <p className="notice">Enter your email and we&apos;ll send you a link to reset your password.</p>
                  <Field label="Email" error={forgotError}>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={forgotEmail}
                      onChange={(e) => {
                        setForgotEmail(e.target.value);
                        setForgotError("");
                      }}
                    />
                  </Field>
                  <button type="button" className="primary-btn" onClick={handleForgotPassword} disabled={forgotSubmitting}>
                    {forgotSubmitting ? <Loader2 className="spin" size={18} /> : "Send reset link"}
                  </button>
                </>
              )}
            </motion.div>
          ) : mode === "login" ? (
            <motion.div key="login" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <Field label="Email" error={loginErrors.email}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={loginData.email}
                  onChange={(e) => {
                    setLoginData({ ...loginData, email: e.target.value });
                    setLoginErrors((p) => ({ ...p, email: undefined }));
                  }}
                />
              </Field>

              <Field label="Password" error={loginErrors.password}>
                <div className="password-row">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Your password"
                    value={loginData.password}
                    onChange={(e) => {
                      setLoginData({ ...loginData, password: e.target.value });
                      setLoginErrors((p) => ({ ...p, password: undefined }));
                    }}
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowLoginPassword((v) => !v)} aria-label="Toggle password visibility">
                    {showLoginPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </Field>

              <div className="forgot-row">
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => {
                    setForgotEmail(loginData.email);
                    setShowForgotForm(true);
                  }}
                >
                  Forgot password?
                </button>
              </div>

              {loginNotice && <p className="notice notice-error">{loginNotice}</p>}

              <button type="button" className="primary-btn" onClick={handleLogin} disabled={loginSubmitting}>
                {loginSubmitting ? <Loader2 className="spin" size={18} /> : "Sign in"}
              </button>
            </motion.div>
          ) : (
            <motion.div key={`signup-${step}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              {step !== "role" && step !== "success" && (
                <button
                  type="button"
                  className="back-btn"
                  onClick={() => {
                    if (step === "extra") setStep("details");
                    else if (step === "details") setStep("role");
                  }}
                >
                  <ChevronLeft size={16} /> Back
                </button>
              )}

              {step === "role" && (
                <div className="role-grid">
                  {roleCards.map((r) => (
                    <button key={r.role} type="button" className={`role-card ${role === r.role ? "role-card-active" : ""}`} onClick={() => chooseRole(r.role)}>
                      <span className="role-icon">{r.icon}</span>
                      <span className="role-text">
                        <span className="role-label">{r.label}</span>
                        <span className="role-sub">{r.sub}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {step === "details" && (
                <>
                  <Field label="Full name" error={detailErrors.fullName}>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={details.fullName}
                      onChange={(e) => {
                        setDetails({ ...details, fullName: e.target.value });
                        setDetailErrors((p) => ({ ...p, fullName: undefined }));
                      }}
                    />
                  </Field>
                  <Field label="Email" error={detailErrors.email}>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={details.email}
                      onChange={(e) => {
                        setDetails({ ...details, email: e.target.value });
                        setDetailErrors((p) => ({ ...p, email: undefined }));
                      }}
                    />
                  </Field>
                  <CountryPhoneField
                    country={country}
                    phone={details.phone}
                    error={detailErrors.phone}
                    onCountryChange={(c) => {
                      setCountry(c);
                      setParentCountry(c);
                    }}
                    onPhoneChange={(v) => {
                      setDetails({ ...details, phone: v });
                      setDetailErrors((p) => ({ ...p, phone: undefined }));
                    }}
                  />
                  <div className="field">
                    <span className="field-label">Gender (optional)</span>
                    <div className="gender-row">
                      {(["male", "female", "unspecified"] as const).map((g) => (
                        <button
                          key={g}
                          type="button"
                          className={`gender-pill ${gender === g ? "gender-pill-active" : ""}`}
                          onClick={() => setGender(gender === g ? "" : g)}
                        >
                          {g === "male" ? "Male" : g === "female" ? "Female" : "Prefer not to say"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Field label="Password" error={detailErrors.password}>
                    <div className="password-row">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="At least 8 characters"
                        value={details.password}
                        onChange={(e) => {
                          setDetails({ ...details, password: e.target.value });
                          setDetailErrors((p) => ({ ...p, password: undefined }));
                        }}
                      />
                      <button type="button" className="eye-btn" onClick={() => setShowPassword((v) => !v)} aria-label="Toggle password visibility">
                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </Field>
                  <Field label="Confirm password" error={detailErrors.confirmPassword}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={details.confirmPassword}
                      onChange={(e) => {
                        setDetails({ ...details, confirmPassword: e.target.value });
                        setDetailErrors((p) => ({ ...p, confirmPassword: undefined }));
                      }}
                    />
                  </Field>

                  <button type="button" className="primary-btn" onClick={handleDetailsContinue}>
                    Continue
                  </button>
                </>
              )}

              {step === "extra" && role === "student" && (
                <>
                  <Field label="Age" error={extraErrors.age}>
                    <input
                      type="number"
                      placeholder="Your age"
                      value={age}
                      onChange={(e) => {
                        setAge(e.target.value);
                        setExtraErrors((p) => ({ ...p, age: undefined }));
                      }}
                    />
                  </Field>

                  {isAdultStudent && !otpVerified && (
                    <>
                      <TermsCheckbox
                        checked={termsAccepted}
                        onToggle={toggleTerms}
                        onOpenTerms={() => setShowTermsModal(true)}
                        onOpenPrivacy={() => setShowPrivacyModal(true)}
                        error={extraErrors.terms}
                      />
                      <button type="button" className="primary-btn" onClick={handleStudentContinue} disabled={creatingAccount}>
                        {creatingAccount ? <Loader2 className="spin" size={18} /> : "Create account"}
                      </button>
                    </>
                  )}

                  <AnimatePresence>
                    {isMinor && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden" }}>
                        <p className="minor-note">
                          Since you&apos;re under 18, we&apos;ll need a parent or guardian to verify your sign-up.
                        </p>

                        <Field label="Parent's full name" error={extraErrors.parentName}>
                          <input
                            type="text"
                            placeholder="Parent's name"
                            value={parent.name}
                            disabled={otpSent}
                            onChange={(e) => {
                              setParent({ ...parent, name: e.target.value });
                              setExtraErrors((p) => ({ ...p, parentName: undefined }));
                            }}
                          />
                        </Field>
                        <CountryPhoneField
                          label="Parent's phone number"
                          country={parentCountry}
                          phone={parent.phone}
                          error={extraErrors.parentPhone}
                          disabled={otpSent}
                          onCountryChange={setParentCountry}
                          onPhoneChange={(v) => {
                            setParent({ ...parent, phone: v });
                            setExtraErrors((p) => ({ ...p, parentPhone: undefined }));
                          }}
                        />
                        <Field label="Parent's email" error={extraErrors.parentEmail}>
                          <input
                            type="email"
                            placeholder="parent@example.com"
                            value={parent.email}
                            disabled={otpSent}
                            onChange={(e) => {
                              setParent({ ...parent, email: e.target.value });
                              setExtraErrors((p) => ({ ...p, parentEmail: undefined }));
                            }}
                          />
                        </Field>

                        {extraErrors.otpSend && <p className="notice notice-error">{extraErrors.otpSend}</p>}

                        {!otpSent ? (
                          <button type="button" className="primary-btn" onClick={sendParentOtp} disabled={sendingOtp}>
                            {sendingOtp ? <Loader2 className="spin" size={18} /> : "Send verification code"}
                          </button>
                        ) : otpVerified ? (
                          <>
                            <div className="emotional-note">
                              <CheckCircle2 size={22} />
                              <span>{`Verified! Welcome to i4iSciences, ${details.fullName.split(" ")[0] || "there"} — let's get you started.`}</span>
                            </div>
                            <TermsCheckbox
                              checked={termsAccepted}
                              onToggle={toggleTerms}
                              onOpenTerms={() => setShowTermsModal(true)}
                              onOpenPrivacy={() => setShowPrivacyModal(true)}
                              error={extraErrors.terms}
                            />
                            <button type="button" className="primary-btn" onClick={handleMinorContinue} disabled={creatingAccount}>
                              {creatingAccount ? <Loader2 className="spin" size={18} /> : "Create account"}
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="field-label">Enter the 6-digit code sent to {parent.email}</span>
                            <OtpInput value={otpValue} onChange={(v) => { setOtpValue(v); setOtpError(""); }} disabled={verifyingOtp} />
                            {otpError && (
                              <span className="field-error" role="alert">
                                {otpError}
                              </span>
                            )}
                            <button type="button" className="primary-btn" onClick={verifyParentOtp} disabled={verifyingOtp}>
                              {verifyingOtp ? <Loader2 className="spin" size={18} /> : "Verify"}
                            </button>
                            <button
                              type="button"
                              className="link-btn resend-btn"
                              disabled={resendCooldown > 0}
                              onClick={sendParentOtp}
                            >
                              {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend code"}
                            </button>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}

              {step === "extra" && role === "teacher" && (
                <>
                  <Field label="School / Organization" error={extraErrors.organization}>
                    <input
                      type="text"
                      placeholder="Where you teach"
                      value={teacherExtra.organization}
                      onChange={(e) => {
                        setTeacherExtra({ ...teacherExtra, organization: e.target.value });
                        setExtraErrors((p) => ({ ...p, organization: undefined }));
                      }}
                    />
                  </Field>
                  <Field label="Subject / Area of expertise" error={extraErrors.subject}>
                    <input
                      type="text"
                      placeholder="e.g. Mathematics, Biology"
                      value={teacherExtra.subject}
                      onChange={(e) => {
                        setTeacherExtra({ ...teacherExtra, subject: e.target.value });
                        setExtraErrors((p) => ({ ...p, subject: undefined }));
                      }}
                    />
                  </Field>
                  {extraErrors.form && <p className="notice notice-error">{extraErrors.form}</p>}
                  <TermsCheckbox
                    checked={termsAccepted}
                    onToggle={toggleTerms}
                    onOpenTerms={() => setShowTermsModal(true)}
                    onOpenPrivacy={() => setShowPrivacyModal(true)}
                    error={extraErrors.terms}
                  />
                  <button type="button" className="primary-btn" onClick={handleTeacherContinue} disabled={creatingAccount}>
                    {creatingAccount ? <Loader2 className="spin" size={18} /> : "Create account"}
                  </button>
                </>
              )}

              {step === "extra" && role === "parent" && (
                <>
                  <Field label="Child's school / organization (optional)">
                    <input
                      type="text"
                      placeholder="Optional"
                      value={parentExtra.organization}
                      onChange={(e) => setParentExtra({ organization: e.target.value })}
                    />
                  </Field>
                  {extraErrors.form && <p className="notice notice-error">{extraErrors.form}</p>}
                  <TermsCheckbox
                    checked={termsAccepted}
                    onToggle={toggleTerms}
                    onOpenTerms={() => setShowTermsModal(true)}
                    onOpenPrivacy={() => setShowPrivacyModal(true)}
                    error={extraErrors.terms}
                  />
                  <button type="button" className="primary-btn" onClick={handleParentContinue} disabled={creatingAccount}>
                    {creatingAccount ? <Loader2 className="spin" size={18} /> : "Create account"}
                  </button>
                </>
              )}

              {step === "success" && (
                <div className="success-block">
                  <div className="success-icon">
                    <Check size={26} />
                  </div>
                  {successVariant === "confirm-email" && (
                    <>
                      <h3>Almost there</h3>
                      <p>We&apos;ve sent a confirmation link to {details.email}. Verify it to activate your account.</p>
                    </>
                  )}
                  {successVariant === "minor-welcome" && (
                    <>
                      <h3>You&apos;re officially part of the family.</h3>
                      <p>
                        {parent.name.split(" ")[0]} is proud of you, {details.fullName.split(" ")[0]}. Taking you to your dashboard…
                      </p>
                    </>
                  )}
                  {successVariant === "redirecting" && (
                    <>
                      <h3>Welcome aboard, {details.fullName.split(" ")[0]}.</h3>
                      <p>Taking you to your dashboard…</p>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="employee-note">
        Are you an i4iSciences employee?{" "}
        <Link href="/login/employee" className="employee-note-link">
          Sign in here
        </Link>
      </p>

      <AnimatePresence>
        {showTermsModal && <LegalModal content={termsOfServiceContent} onClose={() => setShowTermsModal(false)} />}
        {showPrivacyModal && <LegalModal content={privacyPolicyContent} onClose={() => setShowPrivacyModal(false)} />}
      </AnimatePresence>

      <style jsx global>{`
        .login-root {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 28px;
          padding: 140px 20px 80px;
          font-family: var(--font-geist-sans), "Geist", sans-serif;
        }
        .bg-layer { position: fixed; inset: 0; z-index: 0; }
        .bg-overlay { position: absolute; inset: 0; background: rgba(255,255,255,0.55); }

        .carousel { position: relative; display: flex; flex-direction: column; align-items: center; gap: 6px; z-index: 1; }
        .carousel-label { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(16,32,78,0.4); }
        .carousel-track { height: 26px; display: flex; align-items: center; }
        .carousel-item { display: flex; align-items: center; gap: 8px; }
        .carousel-logo { width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; }
        .carousel-logo :global(img) { object-fit: contain; width: 100%; height: 100%; }
        .carousel-name { font-size: 13.5px; font-weight: 600; color: #10204e; }

        .card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 440px;
          background: #ffffff;
          border-radius: 24px;
          box-shadow: 0 24px 70px rgba(10,46,138,0.14), 0 2px 8px rgba(10,46,138,0.06);
          padding: 40px 36px 32px;
        }
        .brand { display: flex; flex-direction: column; align-items: center; gap: 6px; margin-bottom: 24px; }
        .brand-name { font-size: 1.32rem; font-weight: 800; color: #0a2e8a; letter-spacing: -0.01em; }
        .brand-tagline { font-size: 0.78rem; font-weight: 500; color: rgba(16,32,78,0.45); }

        .tabs { display: flex; background: rgba(10,46,138,0.06); border-radius: 999px; padding: 4px; margin-bottom: 26px; }
        .tab { flex: 1; padding: 9px 0; border: none; background: transparent; border-radius: 999px; font-family: var(--font-geist-sans), "Geist", sans-serif; font-size: 0.88rem; font-weight: 600; color: rgba(16,32,78,0.55); cursor: pointer; transition: all 0.2s; }
        .tab-active { background: #0a2e8a; color: white; box-shadow: 0 4px 14px rgba(10,46,138,0.25); }

        .field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
        .field-label { font-size: 11.5px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: rgba(16,32,78,0.5); }
        .field-control { border: 1.5px solid rgba(10,46,138,0.14); border-radius: 12px; padding: 11px 14px; transition: border-color 0.16s; }
        .field-control:focus-within { border-color: #0a2e8a; }
        .field-control-error { border-color: #d93025 !important; background: #fdedec; }
        .field-control input, .field-control select { width: 100%; border: none; outline: none; background: transparent; font-family: var(--font-geist-sans), "Geist", sans-serif; font-size: 15px; color: #10204e; }
        .field-control input::placeholder { color: rgba(16,32,78,0.35); }
        .field-error { display: flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 500; color: #d93025; }
        .field-error::before { content: "!"; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; border-radius: 50%; background: #d93025; color: white; font-size: 10px; font-weight: 800; flex-shrink: 0; }

        .gender-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .gender-pill { padding: 8px 14px; border-radius: 999px; border: 1.5px solid rgba(10,46,138,0.14); background: white; font-family: var(--font-geist-sans), "Geist", sans-serif; font-size: 0.82rem; font-weight: 600; color: rgba(16,32,78,0.6); cursor: pointer; transition: all 0.16s; }
        .gender-pill:hover { border-color: #0a2e8a; color: #0a2e8a; }
        .gender-pill-active { border-color: #0a2e8a; background: #0a2e8a; color: white; }

        .password-row { display: flex; align-items: center; gap: 8px; }
        .password-row input { flex: 1; }
        .eye-btn { background: none; border: none; padding: 0; cursor: pointer; color: rgba(16,32,78,0.45); display: flex; }
        .eye-btn:hover { color: #0a2e8a; }

        .forgot-row { display: flex; justify-content: flex-end; margin-bottom: 8px; margin-top: -6px; }
        .link-btn { background: none; border: none; padding: 0; font-family: var(--font-geist-sans), "Geist", sans-serif; font-size: 12.5px; font-weight: 600; color: #0a2e8a; cursor: pointer; }
        .link-btn:disabled { color: rgba(16,32,78,0.3); cursor: not-allowed; }
        .resend-btn { display: block; margin: 10px auto 0; }

        .notice { font-size: 13px; color: rgba(16,32,78,0.6); margin-bottom: 12px; line-height: 1.5; }
        .notice-error { color: #d93025; }

        .primary-btn {
          width: 100%; padding: 13px 0; border: none; border-radius: 12px;
          background: #0a2e8a; color: white; font-family: var(--font-geist-sans), "Geist", sans-serif;
          font-size: 0.95rem; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 20px rgba(10,46,138,0.28);
          transition: transform 0.2s, box-shadow 0.2s;
          margin-top: 4px;
        }
        .primary-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 10px 26px rgba(10,46,138,0.34); }
        .primary-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .spin { animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .back-btn { display: inline-flex; align-items: center; gap: 4px; background: none; border: none; padding: 0; margin-bottom: 18px; font-family: var(--font-geist-sans), "Geist", sans-serif; font-size: 13px; font-weight: 600; color: rgba(16,32,78,0.55); cursor: pointer; }
        .back-btn:hover { color: #0a2e8a; }

        .role-grid { display: flex; flex-direction: column; gap: 12px; }
        .role-card { display: flex; align-items: center; gap: 14px; padding: 16px 18px; border: 1.5px solid rgba(10,46,138,0.14); border-radius: 16px; background: white; cursor: pointer; text-align: left; transition: all 0.16s; }
        .role-card:hover { border-color: #0a2e8a; background: rgba(10,46,138,0.03); transform: translateY(-1px); }
        .role-card-active { border-color: #0a2e8a; background: rgba(10,46,138,0.06); }
        .role-icon { display: flex; align-items: center; justify-content: center; width: 46px; height: 46px; border-radius: 12px; background: rgba(10,46,138,0.08); color: #0a2e8a; flex-shrink: 0; }
        .role-text { display: flex; flex-direction: column; gap: 2px; }
        .role-label { font-size: 0.98rem; font-weight: 700; color: #10204e; }
        .role-sub { font-size: 12.5px; color: rgba(16,32,78,0.5); }

        .minor-note { font-size: 13px; color: rgba(16,32,78,0.6); line-height: 1.5; margin: 4px 0 16px; padding: 10px 14px; background: rgba(245,166,35,0.1); border-radius: 10px; }

        .otp-row { display: flex; gap: 8px; margin: 10px 0 16px; }
        .otp-box { width: 44px; height: 52px; text-align: center; font-size: 1.3rem; font-weight: 700; color: #10204e; border: 1.5px solid rgba(10,46,138,0.18); border-radius: 12px; outline: none; }
        .otp-box:focus { border-color: #0a2e8a; }

        .emotional-note { display: flex; align-items: center; gap: 10px; padding: 14px 16px; background: rgba(16,163,74,0.08); border-radius: 12px; color: #0f6b3a; font-size: 14px; font-weight: 500; line-height: 1.5; }
        .emotional-note svg { flex-shrink: 0; color: #16a34a; }

        .reset-loading { display: flex; justify-content: center; padding: 40px 0; color: #0a2e8a; }
        .success-block { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 10px; padding: 24px 0 8px; }
        .success-icon { width: 52px; height: 52px; border-radius: 50%; background: rgba(16,163,74,0.12); color: #16a34a; display: flex; align-items: center; justify-content: center; }
        .success-block h3 { font-size: 1.25rem; font-weight: 800; color: #10204e; margin: 0; }
        .success-block p { font-size: 14px; color: rgba(16,32,78,0.6); margin: 0; max-width: 320px; line-height: 1.6; }

        .terms-gate { margin: 4px 0 14px; display: flex; flex-direction: column; gap: 6px; }
        .terms-row { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; }
        .terms-row input[type="checkbox"] { margin-top: 3px; width: 16px; height: 16px; accent-color: #0a2e8a; cursor: pointer; flex-shrink: 0; }
        .terms-row span { font-size: 13px; line-height: 1.55; color: rgba(16,32,78,0.65); }
        .terms-link { background: none; border: none; padding: 0; font: inherit; color: #0a2e8a; font-weight: 700; text-decoration: none; cursor: pointer; }
        .terms-link:hover { text-decoration: underline; }

        .legal-overlay {
          position: fixed; inset: 0; z-index: 50;
          background: rgba(10,20,50,0.45);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .legal-modal {
          position: relative;
          width: 100%; max-width: 640px; max-height: 82vh;
          background: #ffffff; border-radius: 20px; overflow: hidden;
          box-shadow: 0 30px 80px rgba(10,20,50,0.35);
        }
        .legal-close {
          position: absolute; top: 14px; right: 14px; z-index: 1;
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(10,46,138,0.08); border: none; color: #0a2e8a;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
        }
        .legal-close:hover { background: rgba(10,46,138,0.14); }
        .legal-scroll { max-height: 82vh; overflow-y: auto; }
        .legal-scroll :global(article) { padding: 56px 28px 40px !important; }

        .employee-note { position: relative; z-index: 1; font-size: 12.5px; color: rgba(16,32,78,0.5); text-align: center; }
        .employee-note-link { color: #0a2e8a; font-weight: 700; text-decoration: none; }
        .employee-note-link:hover { text-decoration: underline; }

        @media (max-width: 480px) {
          .card { padding: 32px 22px 26px; }
          .legal-scroll :global(article) { padding: 52px 18px 32px !important; }
        }
      `}</style>
    </main>
  );
}
