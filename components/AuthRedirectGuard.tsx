"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Safety net for Supabase auth links (password reset, email confirmation)
 * landing on the wrong page — which happens if a redirect URL isn't on the
 * Supabase project's allow-list, causing it to silently fall back to the
 * bare Site URL. If that ever happens, this catches the stray auth code
 * wherever it lands and forwards it to /login, which knows how to handle it.
 */
export default function AuthRedirectGuard() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/login") return;

    const params = new URLSearchParams(window.location.search);
    const looksLikeAuthRedirect = params.has("code") || window.location.hash.includes("type=recovery");

    if (looksLikeAuthRedirect) {
      router.replace(`/login${window.location.search}${window.location.hash}`);
    }
  }, [pathname, router]);

  return null;
}
