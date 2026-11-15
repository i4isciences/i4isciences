"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import D2PAnnouncementBar from "@/components/d2p/D2PAnnouncementBar";
import WorldClocks from "@/components/top-strip/WorldClocks";
import { isAppShellRoute } from "@/lib/app-shell-routes";

/**
 * Top-of-page strip (announcement bar + world clocks). Sits in normal flow above
 * the fixed navbar and publishes its visible height as --d2p-bar-offset so the
 * navbar sits just below it and slides to the top as the strip scrolls away.
 */
export default function TopStrip() {
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
      root.style.setProperty("--d2p-bar-offset", `${Math.max(0, el.offsetHeight - window.scrollY)}px`);
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
    <div ref={ref}>
      <D2PAnnouncementBar />
      <div style={{ background: "#fff" }}>
        <WorldClocks />
      </div>
    </div>
  );
}
