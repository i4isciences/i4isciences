"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Loader2, Lock, Pencil } from "lucide-react";

import { createClient } from "@/utils/supabase/client";
import { getCountryList } from "@/lib/countries";
import AvatarUpload from "@/components/auth/AvatarUpload";
import OtpInput from "@/components/auth/OtpInput";

const US_GRADES = [
  "Kindergarten",
  ...Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`),
  "College / University",
  "Graduated",
];

const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Profile = {
  fullName: string;
  username: string;
  bio: string;
  country: string;
  gender: string;
  classGrade: string;
};

type Props = {
  userId: string;
  email: string;
  fullName: string;
  username: string;
  bio: string;
  phone: string;
  country: string;
  gender: string;
  classGrade: string;
  avatarUrl: string | null;
  role: string;
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="vrow">
      <span className="vrow-label">{label}</span>
      <span className="vrow-value">{value || "—"}</span>
    </div>
  );
}

export default function SettingsView(props: Props) {
  const supabase = createClient();
  const countries = useMemo(() => getCountryList(), []);
  const countryName = countries.find((c) => c.code === props.country)?.name ?? props.country;

  const [profile, setProfile] = useState<Profile>({
    fullName: props.fullName,
    username: props.username,
    bio: props.bio,
    country: props.country,
    gender: props.gender,
    classGrade: props.classGrade,
  });
  const [avatarUrl, setAvatarUrl] = useState(props.avatarUrl);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Profile>(profile);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const beginEdit = () => {
    setDraft(profile);
    setErrors({});
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setErrors({});
  };

  const handleSave = async () => {
    const errs: Record<string, string> = {};
    if (!draft.fullName.trim()) errs.fullName = "Please enter your full name.";
    if (draft.username.trim() && !USERNAME_PATTERN.test(draft.username.trim())) {
      errs.username = "3–20 characters: letters, numbers, and underscores only.";
    }
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setSaving(true);
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: draft.fullName.trim(),
        username: draft.username.trim(),
        bio: draft.bio.trim(),
        country: draft.country,
        gender: draft.gender || null,
        ...(props.role === "student" ? { class_grade: draft.classGrade || null } : {}),
      },
    });
    setSaving(false);

    if (error) {
      setErrors({ form: "We couldn't save your changes. Please try again." });
      return;
    }
    setProfile(draft);
    setEditing(false);
  };

  // Email change (separate, verified flow — always available on its own)
  const [currentEmail, setCurrentEmail] = useState(props.email);
  const [changingEmail, setChangingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailStep, setEmailStep] = useState<"input" | "otp">("input");
  const [emailToken, setEmailToken] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailBusy, setEmailBusy] = useState(false);

  const [copied, setCopied] = useState(false);

  const startEmailChange = () => {
    setChangingEmail(true);
    setEmailStep("input");
    setNewEmail("");
    setOtpValue("");
    setEmailError("");
  };

  const cancelEmailChange = () => {
    setChangingEmail(false);
    setEmailStep("input");
    setNewEmail("");
    setOtpValue("");
    setEmailError("");
  };

  const sendEmailCode = async () => {
    if (!newEmail.trim() || !EMAIL_PATTERN.test(newEmail.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setEmailBusy(true);
    try {
      const res = await fetch("/api/auth/change-email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setEmailToken(data.token);
        setEmailStep("otp");
      } else {
        setEmailError(data.error || "We couldn't send the code. Please try again.");
      }
    } catch {
      setEmailError("We couldn't reach the server. Please try again.");
    }
    setEmailBusy(false);
  };

  const confirmEmailChange = async () => {
    if (otpValue.length !== 6) {
      setEmailError("Enter the full 6-digit code.");
      return;
    }
    setEmailError("");
    setEmailBusy(true);
    try {
      const res = await fetch("/api/auth/change-email/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail.trim(), token: emailToken, code: otpValue }),
      });
      const data = await res.json();
      if (data.success) {
        setCurrentEmail(newEmail.trim());
        setChangingEmail(false);
        setEmailStep("input");
        setOtpValue("");
      } else {
        setEmailError(data.error || "That code didn't match. Please try again.");
      }
    } catch {
      setEmailError("We couldn't reach the server. Please try again.");
    }
    setEmailBusy(false);
  };

  const copyUserId = () => {
    navigator.clipboard.writeText(props.userId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  const genderLabel = profile.gender === "male" ? "Male" : profile.gender === "female" ? "Female" : "Prefer not to say";

  return (
    <div className="settings">
      <div className="settings-header">
        <span className="settings-eyebrow">Account</span>
        <h1>Settings</h1>
        <p>Everything here is editable except your phone number.</p>
      </div>

      <AvatarUpload userId={props.userId} avatarUrl={avatarUrl} gender={profile.gender} onUploaded={setAvatarUrl} />

      <div className="settings-card">
        <div className="settings-card-header">
          <span className="settings-card-title">Profile</span>
          {!editing && (
            <button type="button" className="edit-btn" onClick={beginEdit}>
              <Pencil size={13} /> Edit
            </button>
          )}
        </div>

        {!editing ? (
          <>
            <Row label="Full name" value={profile.fullName} />
            <Row label="Username" value={profile.username} />
            <Row label="Bio" value={profile.bio} />
            <Row label="Country" value={countryName} />
            <Row label="Gender" value={genderLabel} />
            {props.role === "student" && <Row label="Class / Grade" value={profile.classGrade} />}
            <div className="vrow">
              <span className="vrow-label">Phone number</span>
              <span className="vrow-value field-locked-inline">
                <Lock size={13} /> {props.phone || "—"}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="field">
              <span className="field-label">Full name</span>
              <input className="field-input" value={draft.fullName} onChange={(e) => setDraft({ ...draft, fullName: e.target.value })} />
              {errors.fullName && <span className="field-error">{errors.fullName}</span>}
            </div>

            <div className="field">
              <span className="field-label">Username</span>
              <input className="field-input" placeholder="e.g. rhea_lindqvist" value={draft.username} onChange={(e) => setDraft({ ...draft, username: e.target.value })} />
              {errors.username && <span className="field-error">{errors.username}</span>}
            </div>

            <div className="field">
              <span className="field-label">Bio</span>
              <textarea className="field-input field-textarea" rows={3} maxLength={240} value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} />
              <span className="field-hint">{draft.bio.length}/240</span>
            </div>

            <div className="field-row">
              <div className="field">
                <span className="field-label">Country</span>
                <select className="field-input" value={draft.country} onChange={(e) => setDraft({ ...draft, country: e.target.value })}>
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <span className="field-label">Gender</span>
                <select className="field-input" value={draft.gender} onChange={(e) => setDraft({ ...draft, gender: e.target.value })}>
                  <option value="">Prefer not to say</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {props.role === "student" && (
              <div className="field">
                <span className="field-label">Class / Grade</span>
                <select className="field-input" value={draft.classGrade} onChange={(e) => setDraft({ ...draft, classGrade: e.target.value })}>
                  <option value="">Select your grade</option>
                  {US_GRADES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="field">
              <span className="field-label">Phone number</span>
              <div className="field-locked">
                <Lock size={14} />
                <span>{props.phone || "—"}</span>
              </div>
              <span className="field-hint">Contact our team to change your phone number.</span>
            </div>

            {errors.form && <p className="settings-error">{errors.form}</p>}

            <div className="edit-actions">
              <button type="button" className="save-btn" onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="spin" size={16} /> : "Save changes"}
              </button>
              <button type="button" className="cancel-link" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      <div className="settings-card">
        <div className="field">
          <span className="field-label">Email</span>
          {!changingEmail ? (
            <div className="email-row">
              <span className="email-current">{currentEmail}</span>
              <button type="button" className="change-link" onClick={startEmailChange}>
                Change
              </button>
            </div>
          ) : emailStep === "input" ? (
            <div className="email-change">
              <input
                className="field-input"
                type="email"
                placeholder="new@example.com"
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                  setEmailError("");
                }}
              />
              {emailError && <span className="field-error">{emailError}</span>}
              <div className="email-actions">
                <button type="button" className="save-btn save-btn-sm" onClick={sendEmailCode} disabled={emailBusy}>
                  {emailBusy ? <Loader2 className="spin" size={15} /> : "Send code"}
                </button>
                <button type="button" className="cancel-link" onClick={cancelEmailChange}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="email-change">
              <span className="field-hint">Enter the 6-digit code sent to {newEmail}</span>
              <OtpInput value={otpValue} onChange={(v) => { setOtpValue(v); setEmailError(""); }} disabled={emailBusy} />
              {emailError && <span className="field-error">{emailError}</span>}
              <div className="email-actions">
                <button type="button" className="save-btn save-btn-sm" onClick={confirmEmailChange} disabled={emailBusy}>
                  {emailBusy ? <Loader2 className="spin" size={15} /> : "Verify"}
                </button>
                <button type="button" className="cancel-link" onClick={cancelEmailChange}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="field">
          <span className="field-label">User ID</span>
          <button type="button" className="userid-row" onClick={copyUserId}>
            <span className="userid-text">{props.userId}</span>
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>

        <Row label="Role" value={props.role ? props.role.charAt(0).toUpperCase() + props.role.slice(1) : ""} />
      </div>

      <style jsx global>{`
        .settings { max-width: 600px; margin: 0 auto; padding: 48px 24px 80px; font-family: var(--font-geist-sans), "Geist", sans-serif; }
        .settings-header { margin-bottom: 28px; }
        .settings-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #86868b; }
        .settings-header h1 { margin: 8px 0 8px; font-size: 1.7rem; font-weight: 700; color: #10204e; letter-spacing: -0.01em; }
        .settings-header p { margin: 0; color: #6e6e73; font-size: 0.9rem; }

        .settings-card { background: #fff; border-radius: 14px; border: 1px solid #e8e8ed; padding: 20px 22px 22px; box-shadow: 0 1px 2px rgba(0,0,0,0.03); margin-bottom: 20px; }
        .settings-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .settings-card-title { font-size: 0.82rem; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase; color: #86868b; }
        .edit-btn { display: inline-flex; align-items: center; gap: 5px; padding: 6px 12px; border-radius: 999px; border: 1px solid #e8e8ed; background: #f5f5f7; font-family: var(--font-geist-sans), "Geist", sans-serif; font-size: 0.78rem; font-weight: 600; color: #10204e; cursor: pointer; }
        .edit-btn:hover { background: #ececef; }

        .vrow { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f0f0f2; gap: 16px; }
        .vrow:last-child { border-bottom: none; padding-bottom: 0; }
        .vrow-label { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.02em; text-transform: uppercase; color: #86868b; flex-shrink: 0; }
        .vrow-value { font-size: 0.92rem; font-weight: 600; color: #10204e; text-align: right; word-break: break-word; }
        .field-locked-inline { display: inline-flex; align-items: center; gap: 6px; color: #6e6e73; font-weight: 500; }

        .field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
        .field:last-child { margin-bottom: 0; }
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px; }
        .field-row .field { margin-bottom: 0; }
        .field-label { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.02em; text-transform: uppercase; color: #86868b; }
        .field-input {
          border: 1px solid #e8e8ed; border-radius: 10px; padding: 10px 12px;
          font-family: var(--font-geist-sans), "Geist", sans-serif; font-size: 0.92rem; color: #10204e;
          background: white; outline: none; transition: border-color 0.15s;
        }
        .field-input:focus { border-color: #0a2e8a; }
        .field-textarea { resize: vertical; font-family: inherit; }
        .field-hint { font-size: 0.76rem; color: #86868b; align-self: flex-end; }
        .field-error { font-size: 0.78rem; color: #d93025; font-weight: 500; }

        .field-locked { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 10px; background: #f5f5f7; color: #6e6e73; font-size: 0.92rem; }

        .edit-actions { display: flex; align-items: center; gap: 16px; margin-top: 4px; }
        .save-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          padding: 10px 20px; border-radius: 999px; border: none; background: #10204e; color: white;
          font-family: var(--font-geist-sans), "Geist", sans-serif; font-size: 0.86rem; font-weight: 700; cursor: pointer;
        }
        .save-btn:hover:not(:disabled) { background: #0a2e8a; }
        .save-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .save-btn-sm { padding: 8px 16px; font-size: 0.8rem; }
        .spin { animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .settings-error { font-size: 0.82rem; color: #d93025; margin: 0 0 10px; }

        .email-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 10px 12px; border-radius: 10px; background: #f5f5f7; }
        .email-current { font-size: 0.92rem; color: #10204e; font-weight: 600; word-break: break-all; }
        .change-link, .cancel-link { background: none; border: none; padding: 0; font-family: var(--font-geist-sans), "Geist", sans-serif; font-size: 0.82rem; font-weight: 700; color: #0a2e8a; cursor: pointer; flex-shrink: 0; }
        .cancel-link { color: #86868b; font-weight: 600; }
        .email-change { display: flex; flex-direction: column; gap: 8px; }
        .email-actions { display: flex; align-items: center; gap: 14px; }

        .userid-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 10px 12px; border-radius: 10px; background: #f5f5f7; border: none; cursor: pointer; width: 100%; text-align: left; color: #6e6e73; }
        .userid-text { font-family: ui-monospace, SFMono-Regular, monospace; font-size: 0.8rem; word-break: break-all; }
      `}</style>
    </div>
  );
}
