import crypto from "crypto";

const SECRET = process.env.OTP_SIGNING_SECRET!;
const TTL_MS = 10 * 60 * 1000;

function hmac(data: string) {
  return crypto.createHmac("sha256", SECRET).update(data).digest("hex");
}

function hashCode(code: string) {
  return crypto.createHash("sha256").update(code).digest("hex");
}

export function generateCode(): string {
  return crypto.randomInt(100000, 1000000).toString();
}

/**
 * Bundles a hash of the code (never the code itself) with an expiry and an
 * HMAC signature into an opaque token the client holds between "send" and
 * "verify" — no server-side storage needed for a short-lived, low-stakes
 * consent code like this.
 */
export function createOtpToken(email: string, code: string): string {
  const expiresAt = Date.now() + TTL_MS;
  const codeHash = hashCode(code);
  const payload = `${email}:${codeHash}:${expiresAt}`;
  const sig = hmac(payload);
  return Buffer.from(JSON.stringify({ email, codeHash, expiresAt, sig })).toString("base64url");
}

export function verifyOtpToken(
  token: string,
  email: string,
  enteredCode: string
): { valid: boolean; reason?: "expired" | "mismatch" | "invalid" } {
  try {
    const parsed = JSON.parse(Buffer.from(token, "base64url").toString());
    const { email: tokenEmail, codeHash, expiresAt, sig } = parsed as {
      email: string;
      codeHash: string;
      expiresAt: number;
      sig: string;
    };

    if (tokenEmail !== email) return { valid: false, reason: "invalid" };

    const expected = hmac(`${tokenEmail}:${codeHash}:${expiresAt}`);
    if (expected !== sig) return { valid: false, reason: "invalid" };

    if (Date.now() > expiresAt) return { valid: false, reason: "expired" };
    if (hashCode(enteredCode) !== codeHash) return { valid: false, reason: "mismatch" };

    return { valid: true };
  } catch {
    return { valid: false, reason: "invalid" };
  }
}
