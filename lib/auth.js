import crypto from "node:crypto";

const COOKIE_NAME = "tedx_admin";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function sign(value) {
  const secret = process.env.ADMIN_SESSION_SECRET || "dev-only-insecure-secret";
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export function createSessionCookie() {
  const expires = Date.now() + SESSION_TTL_MS;
  const sig = sign(String(expires));
  const isProd = process.env.NODE_ENV === "production";
  return `${COOKIE_NAME}=${expires}.${sig}; HttpOnly; Path=/; Max-Age=${SESSION_TTL_MS / 1000}; SameSite=Lax${isProd ? "; Secure" : ""}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`;
}

function parseCookies(header) {
  const cookies = {};
  (header || "").split(";").forEach((part) => {
    const trimmed = part.trim();
    if (!trimmed) return;
    const idx = trimmed.indexOf("=");
    if (idx === -1) return;
    cookies[trimmed.slice(0, idx)] = decodeURIComponent(trimmed.slice(idx + 1));
  });
  return cookies;
}

export function isAuthenticated(req) {
  const cookies = parseCookies(req.headers.cookie);
  const raw = cookies[COOKIE_NAME];
  if (!raw) return false;

  const dotIndex = raw.indexOf(".");
  if (dotIndex === -1) return false;

  const expires = raw.slice(0, dotIndex);
  const sig = raw.slice(dotIndex + 1);
  if (sign(expires) !== sig) return false;

  return Number(expires) > Date.now();
}
