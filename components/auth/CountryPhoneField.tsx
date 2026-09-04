"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { isValidPhoneNumber, type CountryCode } from "libphonenumber-js";

import { getCountryList } from "@/lib/countries";

export function isPhoneValid(phone: string, country: CountryCode): boolean {
  if (!phone.trim()) return false;
  try {
    return isValidPhoneNumber(phone, country);
  } catch {
    return false;
  }
}

export default function CountryPhoneField({
  label = "Phone number",
  country,
  phone,
  onCountryChange,
  onPhoneChange,
  error,
  disabled,
}: {
  label?: string;
  country: CountryCode;
  phone: string;
  onCountryChange: (c: CountryCode) => void;
  onPhoneChange: (p: string) => void;
  error?: string;
  disabled?: boolean;
}) {
  const countries = useMemo(() => getCountryList(), []);
  const selected = countries.find((c) => c.code === country) ?? countries[0];

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const filtered = countries.filter(
    (c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.callingCode.includes(query)
  );

  return (
    <div className="cpf-field">
      <span className="cpf-label">{label}</span>
      <div className={`cpf-row ${error ? "cpf-row-error" : ""}`} ref={wrapRef}>
        <button
          type="button"
          className="cpf-country-btn"
          disabled={disabled}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{selected.flag}</span>
          <span className="cpf-calling-code">+{selected.callingCode}</span>
          <ChevronDown size={14} />
        </button>

        <input
          type="tel"
          className="cpf-input"
          placeholder="Phone number"
          value={phone}
          disabled={disabled}
          onChange={(e) => onPhoneChange(e.target.value.replace(/[^\d\s()-]/g, ""))}
        />

        {open && (
          <div className="cpf-dropdown">
            <div className="cpf-search">
              <Search size={14} />
              <input
                type="text"
                placeholder="Search country"
                value={query}
                autoFocus
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="cpf-list">
              {filtered.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  className="cpf-option"
                  onClick={() => {
                    onCountryChange(c.code);
                    setOpen(false);
                    setQuery("");
                  }}
                >
                  <span>{c.flag}</span>
                  <span className="cpf-option-name">{c.name}</span>
                  <span className="cpf-option-code">+{c.callingCode}</span>
                </button>
              ))}
              {filtered.length === 0 && <p className="cpf-empty">No countries match.</p>}
            </div>
          </div>
        )}
      </div>
      {error && (
        <span className="cpf-error" role="alert">
          {error}
        </span>
      )}

      <style jsx>{`
        .cpf-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
        .cpf-label { font-size: 11.5px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: rgba(16,32,78,0.5); }
        .cpf-row { position: relative; display: flex; align-items: stretch; border: 1.5px solid rgba(10,46,138,0.14); border-radius: 12px; overflow: visible; transition: border-color 0.16s; }
        .cpf-row:focus-within { border-color: #0a2e8a; }
        .cpf-row-error { border-color: #d93025 !important; background: #fdedec; }

        .cpf-country-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 11px 10px 11px 14px; border: none; border-right: 1px solid rgba(10,46,138,0.12);
          background: transparent; cursor: pointer; font-size: 14px; color: #10204e;
          white-space: nowrap; flex-shrink: 0;
        }
        .cpf-country-btn:disabled { cursor: not-allowed; opacity: 0.6; }
        .cpf-calling-code { font-weight: 600; }

        .cpf-input { flex: 1; min-width: 0; border: none; outline: none; background: transparent; padding: 11px 14px; font-family: var(--font-geist-sans), "Geist", sans-serif; font-size: 15px; color: #10204e; }
        .cpf-input::placeholder { color: rgba(16,32,78,0.35); }

        .cpf-dropdown {
          position: absolute; top: calc(100% + 6px); left: 0; z-index: 20;
          width: 280px; max-height: 320px; background: white; border-radius: 12px;
          box-shadow: 0 16px 44px rgba(10,20,50,0.22); border: 1px solid rgba(10,46,138,0.1);
          display: flex; flex-direction: column; overflow: hidden;
        }
        .cpf-search { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-bottom: 1px solid rgba(10,46,138,0.1); color: rgba(16,32,78,0.4); }
        .cpf-search input { flex: 1; border: none; outline: none; font-size: 13.5px; color: #10204e; }
        .cpf-list { overflow-y: auto; padding: 6px; }
        .cpf-option {
          display: flex; align-items: center; gap: 10px; width: 100%;
          padding: 9px 10px; border: none; background: none; border-radius: 8px;
          cursor: pointer; text-align: left; font-size: 13.5px; color: #10204e;
        }
        .cpf-option:hover { background: rgba(10,46,138,0.06); }
        .cpf-option-name { flex: 1; }
        .cpf-option-code { color: rgba(16,32,78,0.45); font-size: 12.5px; }
        .cpf-empty { padding: 14px; text-align: center; font-size: 13px; color: rgba(16,32,78,0.45); }

        .cpf-error { display: flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 500; color: #d93025; }
        .cpf-error::before { content: "!"; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; border-radius: 50%; background: #d93025; color: white; font-size: 10px; font-weight: 800; flex-shrink: 0; }
      `}</style>
    </div>
  );
}
