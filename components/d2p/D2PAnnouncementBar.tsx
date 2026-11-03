"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { d2pLink } from "@/lib/d2p";
import { isAppShellRoute } from "@/lib/app-shell-routes";

/**
 * Slim top bar. It sits in normal flow above the fixed navbar and publishes its
 * visible height as --d2p-bar-offset so the navbar can sit just below it and
 * slide to the top as the bar scrolls away. Remove after launch month.
 */
export default function D2PAnnouncementBar() {
  const pathname = usePathname();
  const hidden = pathname === "/login" || pathname === "/login/employee" || isAppShellRoute(pathname);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (hidden || !el) {
      root.style.setProperty("--d2p-bar-offset", "0px");
      return;
    }
    const update = () => {
      const visible = Math.max(0, el.offsetHeight - window.scrollY);
      root.style.setProperty("--d2p-bar-offset", `${visible}px`);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      window.removeEventListener("scroll", update);
      ro.disconnect();
      root.style.setProperty("--d2p-bar-offset", "0px");
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div ref={ref} className="d2p-bar" role="region" aria-label="Announcement">
      <span className="d2p-new">NEW</span>
      <span>Doc2Postdoc℠: peer matching for PhDs &amp; postdocs.</span>
      <a href={d2pLink("bar", true)}>Join the waitlist →</a>
    </div>
  );
}
