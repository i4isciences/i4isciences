"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, CalendarDays, ChevronDown, HelpCircle, LogOut, Mail, Settings } from "lucide-react";

import { createClient } from "@/utils/supabase/client";
import Avatar from "@/components/auth/Avatar";
import { DASHBOARD_SERVICES } from "./services-data";

export default function DashboardNav({
  fullName,
  email,
  avatarUrl,
  gender,
}: {
  fullName: string;
  email: string;
  avatarUrl?: string | null;
  gender?: string | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [modelsOpen, setModelsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const handleSignOut = async () => {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const navLinks = [
    { href: "/dashboard/resources", label: "Resources" },
    { href: "/dashboard/calendar", label: "Calendar" },
  ];

  return (
    <header className="dnav">
      <div className="dnav-row">
        <Link href="/dashboard" className="dnav-brand">
          <Image src="/images/logo.svg" alt="i4iSciences" width={26} height={26} />
          <span>i4iSciences</span>
        </Link>

        <nav className="dnav-links" aria-label="Dashboard">
          <div className="dnav-models" onMouseEnter={() => setModelsOpen(true)} onMouseLeave={() => setModelsOpen(false)}>
            <button type="button" className="dnav-link">
              Models
              <ChevronDown size={13} className={`dnav-chevron ${modelsOpen ? "dnav-chevron-open" : ""}`} />
            </button>

            <div className="dnav-hover-bridge" />

            <div className={`dnav-models-panel ${modelsOpen ? "dnav-models-panel-open" : ""}`}>
              {DASHBOARD_SERVICES.map((s) => (
                <Link key={s.id} href={`/dashboard/${s.slug}`} className="dnav-models-item" onClick={() => setModelsOpen(false)}>
                  <span className="dnav-models-logo">
                    <Image src={s.logo} alt="" width={20} height={20} />
                  </span>
                  {s.name}
                </Link>
              ))}
            </div>
          </div>

          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`dnav-link ${pathname === link.href ? "dnav-link-active" : ""}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="dnav-profile" ref={menuRef}>
          <button type="button" className="dnav-avatar-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Account menu">
            <Avatar avatarUrl={avatarUrl} gender={gender} size={32} />
          </button>

          {menuOpen && (
            <div className="dnav-menu">
              <div className="dnav-menu-header">
                <Avatar avatarUrl={avatarUrl} gender={gender} size={42} />
                <div>
                  <div className="dnav-menu-name">{fullName}</div>
                  <div className="dnav-menu-email">{email}</div>
                </div>
              </div>

              <div className="dnav-menu-divider" />

              <Link href="/dashboard/settings" className="dnav-menu-item" onClick={() => setMenuOpen(false)}>
                <Settings size={16} /> Settings
              </Link>
              <Link href="/dashboard/help" className="dnav-menu-item" onClick={() => setMenuOpen(false)}>
                <HelpCircle size={16} /> Help
              </Link>
              <Link href="/contact" className="dnav-menu-item" onClick={() => setMenuOpen(false)}>
                <Mail size={16} /> Contact team
              </Link>

              <div className="dnav-menu-divider" />

              <button type="button" className="dnav-menu-item dnav-menu-danger" onClick={handleSignOut} disabled={signingOut}>
                <LogOut size={16} /> {signingOut ? "Signing out…" : "Sign out"}
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .dnav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 40;
          background: #ffffff;
          border-bottom: 1px solid #e8e8ed;
          font-family: var(--font-geist-sans), "Geist", sans-serif;
        }
        .dnav-row { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; height: 60px; padding: 0 24px; }

        .dnav-brand { display: flex; align-items: center; gap: 8px; text-decoration: none; justify-self: start; }
        .dnav-brand span { font-weight: 700; font-size: 0.96rem; color: #10204e; letter-spacing: -0.01em; }

        .dnav-links { display: flex; align-items: center; gap: 30px; justify-self: center; }
        .dnav-link {
          position: relative;
          display: inline-flex; align-items: center; gap: 4px; background: none; border: none; padding: 4px 0;
          font-family: var(--font-geist-sans), "Geist", sans-serif; font-size: 0.87rem; font-weight: 500;
          color: #6e6e73; text-decoration: none; cursor: pointer; white-space: nowrap;
          transition: color 0.15s;
        }
        .dnav-link:hover { color: #10204e; }
        .dnav-link-active { color: #10204e; }
        .dnav-link-active::after {
          content: ""; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: #10204e;
        }

        .dnav-models { position: relative; display: flex; align-items: center; }
        .dnav-chevron { transition: transform 0.2s; color: #a1a1a6; }
        .dnav-chevron-open { transform: rotate(180deg); }
        .dnav-hover-bridge { position: absolute; left: -16px; top: 100%; width: calc(100% + 32px); height: 14px; }

        .dnav-models-panel {
          position: absolute; left: 50%; top: calc(100% + 14px);
          transform: translateX(-50%) translateY(4px);
          width: 260px; background: #ffffff;
          border: 1px solid #e8e8ed; border-radius: 12px; padding: 6px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          opacity: 0; visibility: hidden; pointer-events: none;
          transition: opacity 0.16s ease, transform 0.16s ease, visibility 0.16s;
          z-index: 100;
        }
        .dnav-models-panel-open { opacity: 1; visibility: visible; pointer-events: auto; transform: translateX(-50%) translateY(0); }

        .dnav-models-item {
          display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 8px;
          text-decoration: none; font-size: 0.85rem; font-weight: 600; color: #10204e;
          transition: background 0.15s;
        }
        .dnav-models-item:hover { background: #f5f5f7; }
        .dnav-models-logo { width: 26px; height: 26px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden; }
        .dnav-models-logo :global(img) { object-fit: cover; width: 100%; height: 100%; }

        .dnav-profile { position: relative; justify-self: end; }
        .dnav-avatar-btn {
          padding: 0; border: none; cursor: pointer; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; line-height: 0;
        }

        .dnav-menu {
          position: absolute; top: calc(100% + 12px); right: 0; z-index: 30;
          width: 250px; background: #ffffff; border-radius: 12px;
          border: 1px solid #e8e8ed; box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          padding: 6px;
        }

        .dnav-menu-header { display: flex; align-items: center; gap: 12px; padding: 10px 8px 12px; }
        .dnav-menu-name { font-size: 0.88rem; font-weight: 700; color: #10204e; }
        .dnav-menu-email { font-size: 0.76rem; color: #86868b; word-break: break-all; }

        .dnav-menu-divider { height: 1px; background: #e8e8ed; margin: 4px 4px; }

        .dnav-menu-item {
          display: flex; align-items: center; gap: 10px; width: 100%;
          padding: 9px 8px; border-radius: 8px; border: none; background: none;
          font-size: 0.84rem; font-weight: 500; color: #10204e; text-decoration: none;
          cursor: pointer; text-align: left;
        }
        .dnav-menu-item:hover { background: #f5f5f7; }
        .dnav-menu-danger { color: #d93025; }
        .dnav-menu-danger:hover { background: #fdecea; }
        .dnav-menu-danger:disabled { opacity: 0.6; cursor: not-allowed; }

        @media (max-width: 680px) {
          .dnav-row { grid-template-columns: auto 1fr auto; gap: 8px; }
          .dnav-brand span { display: none; }
          .dnav-links { justify-self: stretch; justify-content: center; gap: 18px; overflow-x: auto; scrollbar-width: none; }
          .dnav-links::-webkit-scrollbar { display: none; }
        }
      `}</style>
    </header>
  );
}
