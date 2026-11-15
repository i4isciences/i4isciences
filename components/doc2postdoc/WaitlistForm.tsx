"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const C = {
  ink: "#0B1220",
  text: "#1B2540",
  textMuted: "#5B6478",
  navy: "#0A2E8A",
  border: "#D6DAE3",
};

export default function WaitlistForm({
  source,
  role,
  helperText = "One email at launch. No spam, no resale of your address.",
  placeholder = "you@university.edu",
  buttonLabel = "Join the waitlist",
  align = "center",
}: {
  source: string;
  role?: string;
  helperText?: string;
  placeholder?: string;
  buttonLabel?: string;
  align?: "center" | "left";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || status === "success") return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, source }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.error?.message || "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: align === "center" ? "center" : "flex-start",
          gap: 10,
          padding: "16px 4px",
        }}
      >
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: C.navy,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Check size={14} color="#fff" strokeWidth={3} />
        </span>
        <span style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>
          You&rsquo;re on the list. We&rsquo;ll be in touch at launch.
        </span>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", maxWidth: 440, margin: align === "center" ? "0 auto" : undefined }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          aria-label="Email address"
          style={{
            flex: "1 1 220px",
            padding: "13px 16px",
            fontSize: 15,
            fontFamily: "var(--font-geist-sans), sans-serif",
            color: C.ink,
            background: "#fff",
            border: `1.5px solid ${C.border}`,
            borderRadius: 10,
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "13px 24px",
            fontSize: 15,
            fontWeight: 600,
            fontFamily: "var(--font-geist-sans), sans-serif",
            color: "#fff",
            background: C.navy,
            border: "none",
            borderRadius: 10,
            cursor: status === "loading" ? "default" : "pointer",
            opacity: status === "loading" ? 0.75 : 1,
            whiteSpace: "nowrap",
          }}
        >
          {status === "loading" ? "Submitting…" : buttonLabel}
          {status !== "loading" && <ArrowRight size={16} strokeWidth={2.5} />}
        </button>
      </form>
      <p
        style={{
          marginTop: 10,
          fontSize: 12.5,
          color: status === "error" ? "#B3261E" : C.textMuted,
          textAlign: align,
        }}
      >
        {status === "error" ? errorMsg : helperText}
      </p>
    </div>
  );
}
