// Single place to change the Doc2Postdoc destinations.
// Waitlist links go to the standalone Doc2Postdoc site.
// Non-waitlist links (menu, footer, "Learn more") still go to the in-site page
// until NEXT_PUBLIC_D2P_URL (e.g. "https://doc2postdoc.com") is set.
export const D2P_WAITLIST_URL =
  process.env.NEXT_PUBLIC_D2P_WAITLIST_URL ?? "https://doc2postdoc.com/waitlist";
export const D2P_URL = process.env.NEXT_PUBLIC_D2P_URL ?? "";
const HOME = D2P_URL ? `${D2P_URL}/` : "/postdocworks/doc2postdoc";

export type D2PMedium = "menu" | "card" | "banner" | "banner_learn" | "bar" | "footer";

// "Learn more" goes to the standalone site's home page.
const LEARN_MORE = process.env.NEXT_PUBLIC_D2P_URL ?? "https://doc2postdoc.com";

export function d2pLink(medium: D2PMedium, waitlist = false) {
  const base = waitlist ? D2P_WAITLIST_URL : medium === "banner_learn" ? LEARN_MORE : HOME;
  return `${base}?utm_source=i4isciences&utm_medium=${medium}`;
}
