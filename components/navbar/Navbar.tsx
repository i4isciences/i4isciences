"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [modelsOpen, setModelsOpen] = useState(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        /* Completely transparent — blends into the dark hero bg */
        background: "transparent",
        borderBottom: "none",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(20px, 4vw, 56px)",
        }}
      >
        {/* ── LOGO ── */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <Image
            src="/images/favicon.png"
            alt="i4i Sciences"
            width={44}
            height={44}
            priority
            style={{ width: 44, height: 44, objectFit: "contain" }}
          />
          <span
            style={{
              fontFamily: "'Geist','Geist Variable',sans-serif",
              fontWeight: 700,
              fontSize: "1.15rem",
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            i4i Sciences
          </span>
        </Link>

        {/* ── CENTER NAV ── */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(24px, 3vw, 44px)",
          }}
        >
          {/* About */}
          <Link
            href="/about"
            style={{
              fontFamily: "'Geist','Geist Variable',sans-serif",
              fontSize: "0.88rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.88)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLAnchorElement).style.color =
                "rgba(255,255,255,0.88)")
            }
          >
            About
          </Link>

          {/* Models dropdown */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setModelsOpen(true)}
            onMouseLeave={() => setModelsOpen(false)}
          >
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontFamily: "'Geist','Geist Variable',sans-serif",
                fontSize: "0.88rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.88)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={e =>
                ((e.currentTarget as HTMLButtonElement).style.color = "#ffffff")
              }
              onMouseLeave={e =>
                ((e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(255,255,255,0.88)")
              }
            >
              Models
              <ChevronDown
                size={14}
                style={{
                  transition: "transform 0.25s",
                  transform: modelsOpen ? "rotate(180deg)" : "rotate(0deg)",
                  color: "rgba(255,255,255,0.7)",
                }}
              />
            </button>

            {/* Invisible hover bridge */}
            <div
              style={{
                position: "absolute",
                left: -16,
                top: "100%",
                width: "calc(100% + 32px)",
                height: 16,
              }}
            />

            {/* Dropdown panel */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "calc(100% + 16px)",
                transform: `translateX(-50%) translateY(${modelsOpen ? 0 : 8}px)`,
                width: 260,
                background: "rgba(8,18,46,0.96)",
                backdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: 16,
                padding: "8px 6px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
                opacity: modelsOpen ? 1 : 0,
                visibility: modelsOpen ? "visible" : "hidden",
                transition:
                  "opacity 0.25s ease, transform 0.25s ease, visibility 0.25s",
                zIndex: 100,
              }}
            >
              {[
                { href: "/models/ipst",              label: "IPST",             sub: "Immigrant Parent Student Training" },
                { href: "/models/labtrick",           label: "Labtrick",         sub: "Hands-on experimentation" },
                { href: "/models/onecent-tutors",     label: "OneCent Tutors",   sub: "Global tutoring network" },
                { href: "/models/teach-the-teacher",  label: "Teach The Teacher",sub: "Educator empowerment platform" },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    padding: "12px 14px",
                    borderRadius: 10,
                    textDecoration: "none",
                    transition: "background 0.18s",
                  }}
                  onMouseEnter={e =>
                    ((e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(255,255,255,0.07)")
                  }
                  onMouseLeave={e =>
                    ((e.currentTarget as HTMLAnchorElement).style.background =
                      "transparent")
                  }
                >
                  <span
                    style={{
                      fontFamily: "'Geist','Geist Variable',sans-serif",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      color: "#ffffff",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Geist','Geist Variable',sans-serif",
                      fontSize: "0.72rem",
                      color: "rgba(255,255,255,0.50)",
                    }}
                  >
                    {item.sub}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* AI Ecosystem */}
          <Link
            href="/ai-ecosystem"
            style={{
              fontFamily: "'Geist','Geist Variable',sans-serif",
              fontSize: "0.88rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.88)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLAnchorElement).style.color =
                "rgba(255,255,255,0.88)")
            }
          >
            AI Ecosystem
          </Link>

          {/* Contact Us */}
          <Link
            href="/contact"
            style={{
              fontFamily: "'Geist','Geist Variable',sans-serif",
              fontSize: "0.88rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.88)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLAnchorElement).style.color =
                "rgba(255,255,255,0.88)")
            }
          >
            Contact Us
          </Link>
        </nav>

        {/* ── RIGHT SIDE ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Country pills */}
          {[
            { label: "🇮🇳  India",  href: "https://india.yourdomain.com" },
            { label: "🇺🇸  USA",    href: "https://usa.yourdomain.com" },
            { label: "🇨🇦  Canada", href: "https://canada.yourdomain.com" },
          ].map(c => (
            <Link
              key={c.label}
              href={c.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "6px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.18)",
                fontFamily: "'Geist','Geist Variable',sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#ffffff",
                textDecoration: "none",
                transition: "background 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e =>
                ((e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.18)")
              }
              onMouseLeave={e =>
                ((e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.10)")
              }
            >
              {c.label}
            </Link>
          ))}

          {/* Login */}
          <button
            style={{
              padding: "7px 20px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.22)",
              fontFamily: "'Geist','Geist Variable',sans-serif",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "#ffffff",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,0.18)")
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,0.10)")
            }
          >
            Login
          </button>

          {/* Book Demo — gold */}
          <button
            style={{
              padding: "8px 22px",
              borderRadius: 999,
              background: "#F5A623",
              border: "none",
              fontFamily: "'Geist','Geist Variable',sans-serif",
              fontSize: "0.82rem",
              fontWeight: 700,
              color: "#0B2A83",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(245,166,35,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-1px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 6px 28px rgba(245,166,35,0.50)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 4px 20px rgba(245,166,35,0.35)";
            }}
          >
            Book Demo
          </button>
        </div>
      </div>
    </header>
  );
}