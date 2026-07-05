"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

export default function GoToTopButton() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsVisible(false);
  }

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    const sentinel = document.getElementById("page-end-sentinel");
    const targets = [sentinel, footer].filter(Boolean) as HTMLElement[];

    const nearPageEnd = () => {
      const footerHeight = footer?.offsetHeight ?? 0;
      const revealDistance = Math.max(footerHeight + 260, window.innerHeight * 0.7);
      return window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - revealDistance;
    };

    const handleScroll = () => {
      setIsVisible(nearPageEnd());
    };

    const observer =
      "IntersectionObserver" in window && targets.length
        ? new IntersectionObserver(
            (entries) => {
              setIsVisible(entries.some((entry) => entry.isIntersecting) || nearPageEnd());
            },
            {
              root: null,
              rootMargin: "0px 0px 35% 0px",
              threshold: 0,
            }
          )
        : null;

    targets.forEach((target) => observer?.observe(target));
    const raf = requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  const scrollToTop = () => {
    const pageTop = document.getElementById("page-top");

    if (pageTop) {
      pageTop.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Go to top"
      onClick={scrollToTop}
      className={[
        "fixed bottom-6 right-6 z-[60] inline-flex items-center gap-2 rounded-full",
        "border border-white/20 bg-[#0A2E8A] px-4 py-3 text-sm font-bold text-white",
        "shadow-[0_18px_45px_rgba(10,46,138,0.28)] ring-1 ring-[#F5A623]/25",
        "transition-all duration-300 hover:-translate-y-1 hover:bg-[#08276f] hover:shadow-[0_22px_55px_rgba(10,46,138,0.36)]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F5A623]/35",
        "sm:bottom-8 sm:right-8",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      ].join(" ")}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F5A623] text-[#0A2E8A]">
        <ArrowUp size={16} strokeWidth={2.6} />
      </span>
      <span className="whitespace-nowrap">Go to top</span>
    </button>
  );
}
