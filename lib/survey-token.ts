import crypto from "crypto";

/**
 * Compact signed token for personalised survey links.
 *
 * Format:  <base64url(payload JSON)>.<base64url(HMAC-SHA256)>
 *
 * The signature is computed over the encoded payload using SURVEY_TOKEN_SECRET.
 * Anyone can read the payload, but only the holder of the secret can produce a
 * valid signature — so a student cannot forge or alter their identity.
 */

export interface TokenPayload {
  name?: string;
  matric?: string;
  email?: string;
  programme?: string;
  level?: string;
}

const secret = process.env.SURVEY_TOKEN_SECRET;

function sign(data: string, key: string): string {
  return crypto.createHmac("sha256", key).update(data).digest("base64url");
}

export function signToken(payload: TokenPayload): string {
  if (!secret) {
    throw new Error("SURVEY_TOKEN_SECRET is not set.");
  }
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${data}.${sign(data, secret)}`;
}

export function verifyToken(token: string): TokenPayload | null {
  if (!secret || !token) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [data, providedSig] = parts;
  const expectedSig = sign(data, secret);

  const a = Buffer.from(providedSig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as TokenPayload;
  } catch {
    return null;
  }
}
