"use client";

import { useRef } from "react";

/** Shared 6-box code input: auto-advance, backspace-back, paste-splits. */
export default function OtpInput({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = value.padEnd(6, " ").split("").slice(0, 6);

  const setDigit = (i: number, d: string) => {
    const next = value.split("");
    next[i] = d;
    onChange(next.join("").slice(0, 6));
  };

  const handleChange = (i: number, raw: string) => {
    const d = raw.replace(/\D/g, "").slice(-1);
    setDigit(i, d ?? "");
    if (d && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i]?.trim() && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length > 1) {
      e.preventDefault();
      onChange(pasted);
      refs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  return (
    <div className="oti-row">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="oti-box"
          value={d.trim()}
          disabled={disabled}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
        />
      ))}

      <style jsx>{`
        .oti-row { display: flex; gap: 8px; margin: 10px 0 16px; }
        .oti-box { width: 44px; height: 52px; text-align: center; font-size: 1.3rem; font-weight: 700; color: #10204e; border: 1.5px solid rgba(10,46,138,0.18); border-radius: 12px; outline: none; font-family: var(--font-geist-sans), "Geist", sans-serif; }
        .oti-box:focus { border-color: #0a2e8a; }
      `}</style>
    </div>
  );
}
