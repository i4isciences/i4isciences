"use client";

import { useEffect, useRef } from "react";

type ClockEl = HTMLElement & { _tz?: string };

/**
 * i4iSciences World Clocks widget (compact banner, click to expand).
 * Markup, behaviour and styles come from i4i-world-clocks.html (styles in
 * app/i4i-world-clocks.css). Order: San Francisco, Chicago, New York, New Delhi.
 * To start expanded, add "open" to the className of the .i4i-clocks div.
 */
export default function WorldClocks() {
  const boxRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const hint = hintRef.current;
    if (!box || !hint) return;
    const clocks = Array.from(box.querySelectorAll<ClockEl>(".i4i-clock"));

    function build(el: ClockEl) {
      const tz = el.getAttribute("data-tz") as string;
      const label = el.getAttribute("data-label") || tz;
      const nums = [["XII", 50, 17], ["III", 83, 50], ["VI", 50, 83], ["IX", 17, 50]]
        .map((n) => `<text class="i4i-num" x="${n[1]}" y="${n[2]}">${n[0]}</text>`)
        .join("");
      el.innerHTML =
        '<div class="i4i-clock-card"><h3></h3>' +
        '<svg viewBox="0 0 100 100" role="img" aria-label="Analog clock">' +
        '<circle cx="50" cy="50" r="47" fill="#fffdf7" stroke="#8b0000" stroke-width="3.5"/>' +
        '<circle cx="50" cy="50" r="40" fill="none" stroke="#b8956a" stroke-width=".6"/>' + nums +
        '<line class="h" x1="50" y1="50" x2="50" y2="31" stroke="#3b1f1f" stroke-width="3.2" stroke-linecap="round"/>' +
        '<line class="m" x1="50" y1="50" x2="50" y2="22" stroke="#3b1f1f" stroke-width="2.2" stroke-linecap="round"/>' +
        '<line class="s" x1="50" y1="56" x2="50" y2="18" stroke="#b8956a" stroke-width="1" stroke-linecap="round"/>' +
        '<circle cx="50" cy="50" r="2.6" fill="#8b0000"/>' +
        '</svg><div class="i4i-clock-digital"></div><div class="i4i-clock-date"></div></div>';
      (el.querySelector("h3") as HTMLElement).textContent = label;
      el._tz = tz;
    }

    function parts(tz: string, now: Date) {
      const o: Record<string, number> = {};
      new Intl.DateTimeFormat("en-US", {
        timeZone: tz, hour12: false, hourCycle: "h23",
        hour: "numeric", minute: "numeric", second: "numeric",
      }).formatToParts(now).forEach((p) => { o[p.type] = parseInt(p.value, 10); });
      return o;
    }

    function tick() {
      const now = new Date();
      clocks.forEach((el) => {
        const tz = el._tz as string;
        const t = parts(tz, now);
        const s = t.second, m = t.minute + s / 60, h = (t.hour % 12) + m / 60;
        el.querySelector(".h")?.setAttribute("transform", `rotate(${h * 30} 50 50)`);
        el.querySelector(".m")?.setAttribute("transform", `rotate(${m * 6} 50 50)`);
        el.querySelector(".s")?.setAttribute("transform", `rotate(${s * 6} 50 50)`);
        const dp: Record<string, string> = {};
        new Intl.DateTimeFormat("en-US", { timeZone: tz, hour12: true, hour: "numeric", minute: "2-digit", second: "2-digit" })
          .formatToParts(now).forEach((p) => { dp[p.type] = p.value; });
        (el.querySelector(".i4i-clock-digital") as HTMLElement).innerHTML =
          `${dp.hour}:${dp.minute}:${dp.second}<span>${String(dp.dayPeriod).replace(/\./g, "").toUpperCase()}</span>`;
        (el.querySelector(".i4i-clock-date") as HTMLElement).textContent =
          new Intl.DateTimeFormat("en-US", { timeZone: tz, month: "short", day: "numeric", year: "numeric" }).format(now);
      });
    }

    function sync() {
      const open = box!.classList.contains("open");
      box!.setAttribute("aria-expanded", open ? "true" : "false");
      hint!.innerHTML = open ? "Click to shrink &#9652;" : "Click to enlarge &#9662;";
    }
    function toggle() { box!.classList.toggle("open"); sync(); }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    }

    box.addEventListener("click", toggle);
    box.addEventListener("keydown", onKey);
    clocks.forEach(build);
    sync();
    tick();
    const id = setInterval(tick, 1000);
    return () => {
      clearInterval(id);
      box.removeEventListener("click", toggle);
      box.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="i4i-wrap">
      <div
        ref={boxRef}
        className="i4i-clocks"
        id="i4iClocks"
        role="button"
        tabIndex={0}
        aria-expanded="false"
        aria-label="World clocks. Activate to enlarge or shrink."
      >
        <div className="i4i-clock" data-tz="America/Los_Angeles" data-label="San Francisco Time" />
        <div className="i4i-clock" data-tz="America/Chicago" data-label="Chicago Time" />
        <div className="i4i-clock" data-tz="America/New_York" data-label="New York Time" />
        <div className="i4i-clock" data-tz="Asia/Kolkata" data-label="New Delhi Time" />
      </div>
      <div ref={hintRef} className="i4i-hint" id="i4iHint" suppressHydrationWarning>
        Click to enlarge &#9662;
      </div>
    </div>
  );
}
