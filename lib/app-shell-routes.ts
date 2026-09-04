/** Routes that render their own complete chrome (nav, no marketing footer/navbar). */
const APP_SHELL_PREFIXES = ["/dashboard", "/i4imind", "/i4icore"];

export function isAppShellRoute(pathname: string): boolean {
  return APP_SHELL_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}
