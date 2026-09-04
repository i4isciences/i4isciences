import { getCountries, getCountryCallingCode, type CountryCode } from "libphonenumber-js";

export type Country = {
  code: CountryCode;
  name: string;
  callingCode: string;
  flag: string;
};

function flagEmoji(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

let cachedList: Country[] | null = null;

export function getCountryList(): Country[] {
  if (cachedList) return cachedList;

  const regionNames = typeof Intl !== "undefined" && "DisplayNames" in Intl
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;

  cachedList = getCountries()
    .map((code) => ({
      code,
      name: regionNames?.of(code) ?? code,
      callingCode: getCountryCallingCode(code),
      flag: flagEmoji(code),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return cachedList;
}

/** Locale-based default only — no IP lookup, no external service, no key required. */
export function detectDefaultCountry(): CountryCode {
  if (typeof navigator === "undefined") return "US";
  try {
    const locale = new Intl.Locale(navigator.language);
    const region = locale.maximize().region;
    if (region && getCountries().includes(region as CountryCode)) {
      return region as CountryCode;
    }
  } catch {
    // fall through to default
  }
  return "US";
}
