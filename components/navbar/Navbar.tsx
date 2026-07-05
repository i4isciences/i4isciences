"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [modelsOpen, setModelsOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  // Reset the scroll-tracked state when the route changes.
  // This runs during render (React's documented pattern for resetting
  // state in response to a changed prop/value) instead of inside an
  // effect, so it doesn't trigger a synchronous setState-in-effect
  // cascading render.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setScrolledPastHero(false);
  }

  useEffect(() => {
    // Only the homepage has a hero section the navbar should float over.
    // Everywhere else it's glass from the very top — no listener needed.
    if (!isHomepage) return;

    const getHeroHeight = () => {
      const hero = document.getElementById("hero");
      return hero ? hero.offsetHeight : window.innerHeight;
    };

    const handleScroll = () => {
      // switch a little before the hero fully ends so it feels natural
      const threshold = getHeroHeight() - 80;
      setScrolledPastHero(window.scrollY > threshold);
    };

    // Defer the initial check to the next frame instead of calling it
    // synchronously in the effect body — this is a real scroll-position
    // check reacting to the current DOM/viewport, just scheduled async.
    const raf = requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomepage]);

  // Glass mode = solid/blurred navbar with navy text.
  // True everywhere except the homepage hero.
  const isGlass = !isHomepage || scrolledPastHero;

  const textColor = isGlass ? "#0A2E8A" : "#ffffff";
  const textColorMuted = isGlass ? "rgba(10,46,138,0.75)" : "rgba(255,255,255,0.88)";
  const chevronColor = isGlass ? "rgba(10,46,138,0.6)" : "rgba(255,255,255,0.7)";
  const logoSrc = isGlass ? "/images/logo-white.svg" : "/images/favicon.png";

  const models = [
    {
      href: "/models/teach-the-teacher",
      label: "Teach The Teacher",
      sub: "Educator Empowerment Platform",
      logo: "/images/TTTlogodark.jpg",
    },
    {
      href: "/models/onecent-tutors",
      label: "OneCent Tutors",
      sub: "Global Tutoring Network",
      logo: "/images/octlogo-removebg-preview.png",
    },
    {
      href: "/models/ipst",
      label: "Immigrant Parent Support Training",
      sub: "Support for Immigrant Parents",
      logo: "/images/Ipstdarklogo.jpg",
    },
    {
      href: "/models/labtrick",
      label: "Lab Tricks",
      sub: "Science Experiments for Students",
      logo: "/images/LabTrickslogodark.jpg",
    },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: isGlass ? "rgba(255,255,255,0.85)" : "transparent",
        backdropFilter: isGlass ? "blur(14px)" : "none",
        WebkitBackdropFilter: isGlass ? "blur(14px)" : "none",
        borderBottom: isGlass ? "1px solid rgba(10,46,138,0.08)" : "none",
        boxShadow: isGlass ? "0 2px 20px rgba(10,46,138,0.06)" : "none",
        transition: "background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
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
            src={logoSrc}
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
              color: textColor,
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
              color: textColorMuted,
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLAnchorElement).style.color = textColor)
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLAnchorElement).style.color = textColorMuted)
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
                color: textColorMuted,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={e =>
                ((e.currentTarget as HTMLButtonElement).style.color = textColor)
              }
              onMouseLeave={e =>
                ((e.currentTarget as HTMLButtonElement).style.color = textColorMuted)
              }
            >
              Models
              <ChevronDown
                size={14}
                style={{
                  transition: "transform 0.25s",
                  transform: modelsOpen ? "rotate(180deg)" : "rotate(0deg)",
                  color: chevronColor,
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

            {/* Dropdown panel — always dark glass regardless of navbar mode,
                since it floats over page content either way */}
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
              {models.map((item) => (
                <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 14px",
                  borderRadius: 12,
                  textDecoration: "none",
                  transition: "all .2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {/* Logo */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={item.logo}
                    alt={item.label}
                    width={42}
                    height={42}
                    style={{
                      width: "42px",
                      height: "42px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              
                {/* Text */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Geist','Geist Variable',sans-serif",
                      fontWeight: 700,
                      fontSize: "0.86rem",
                      color: "#fff",
                    }}
                  >
                    {item.label}
                  </span>
              
                  <span
                    style={{
                      fontFamily: "'Geist','Geist Variable',sans-serif",
                      fontSize: "0.72rem",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {item.sub}
                  </span>
                </div>
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
              color: textColorMuted,
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLAnchorElement).style.color = textColor)
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLAnchorElement).style.color = textColorMuted)
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
              color: textColorMuted,
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLAnchorElement).style.color = textColor)
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLAnchorElement).style.color = textColorMuted)
            }
          >
            Contact Us
          </Link>
        </nav>

        {/* ── RIGHT SIDE ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {[
  {
    label: "🇮🇳 India",
    href: "https://i4isciences.in/",
    bg: "rgba(19, 136, 8, 0.15)",
    border: "rgba(19, 136, 8, 0.35)",
    hover: "rgba(19, 136, 8, 0.22)",
  },
  {
    label: "🇺🇸 USA",
    href: "https://i4isciences.us/",
    bg: "rgba(178, 34, 52, 0.15)",
    border: "rgba(178, 34, 52, 0.35)",
    hover: "rgba(178, 34, 52, 0.22)",
  },
  {
    label: "🇨🇦 Canada",
    href: "https://i4isciences.ca/",
    bg: "rgba(91, 75, 219, 0.15)",
    border: "rgba(91, 75, 219, 0.35)",
    hover: "rgba(91, 75, 219, 0.22)",
  },
].map((c) => (
            <Link
              key={c.label}
              href={c.href}
              target="_blank"
  rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "6px 14px",
                borderRadius: 999,
                background: c.bg,
                border: `1px solid ${c.border}`,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                fontFamily: "'Geist','Geist Variable',sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: isGlass ? "#0A2E8A" : "#fff",
                textDecoration: "none",
                transition: "all 0.25s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = c.hover;
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = c.bg;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {c.label}
            </Link>
          ))}

          {/* Login */}
          <button
            style={{
              padding: "7px 20px",
              borderRadius: 999,
              background: isGlass ? "rgba(10,46,138,0.06)" : "rgba(255,255,255,0.10)",
              border: isGlass
                ? "1px solid rgba(10,46,138,0.18)"
                : "1px solid rgba(255,255,255,0.22)",
              fontFamily: "'Geist','Geist Variable',sans-serif",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: textColor,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLButtonElement).style.background = isGlass
                ? "rgba(10,46,138,0.12)"
                : "rgba(255,255,255,0.18)")
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLButtonElement).style.background = isGlass
                ? "rgba(10,46,138,0.06)"
                : "rgba(255,255,255,0.10)")
            }
          >
            Login
          </button>

          {/* Book Demo — gold, stays the same in both modes */}
          <Link href="/contact">
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
      e.currentTarget.style.transform = "translateY(-1px)";
      e.currentTarget.style.boxShadow =
        "0 6px 28px rgba(245,166,35,0.50)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow =
        "0 4px 20px rgba(245,166,35,0.35)";
    }}
  >
    Book Demo
  </button>
</Link>
        </div>
      </div>
    </header>
  );
}