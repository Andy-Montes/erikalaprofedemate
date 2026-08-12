import crypto from "node:crypto";

export const GOOGLE_CLIENT_ID = "568804580001-snpipfnntq0u828f8fdjjfqov2l36rq1.apps.googleusercontent.com";
export const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyBZH6XJngzYPtwC-7qtA9fIes9iH7WPDQ5aQjqbiDpnZUtK2jxpfoq97l3zaA5b1-1/exec";

const FALLBACK_SECRET = "flashmate-2026-9f2acb1f-0cc1-45ce-92a9-9b6e9fe54a0d-39cb6a8e";
const DAY = 24 * 60 * 60;

function env(name) {
  return globalThis.Netlify?.env?.get?.(name) || process.env[name] || "";
}

function secret() {
  return env("FLASHMATE_SESSION_SECRET") || env("SESSION_SECRET") || FALLBACK_SECRET;
}

function b64url(input) {
  return Buffer.from(input).toString("base64url");
}

function unb64url(input) {
  return Buffer.from(input, "base64url").toString("utf8");
}

function sign(payload) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

export function html(body, status = 200, headers = {}) {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
      ...headers,
    },
  });
}

export function forbidden(title = "Acceso no autorizado", detail = "Inicia sesion desde el portal de FlashMate.") {
  return html(`<!doctype html>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
<body style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:520px;margin:12vh auto;padding:24px;color:#1f2937">
  <h1 style="color:#38388E">${escapeHtml(title)}</h1>
  <p>${escapeHtml(detail)}</p>
  <p><a href="/portal-estudiante.html" style="color:#0187F3">Volver al portal</a></p>
</body>`, 403);
}

export function setSessionCookie(name, value, maxAgeDays = 30) {
  const maxAge = maxAgeDays * DAY;
  return `${name}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
}

export function createSession(kind, data, maxAgeDays = 30) {
  const now = Math.floor(Date.now() / 1000);
  const payload = b64url(JSON.stringify({
    kind,
    email: String(data.email || data.correo || "").trim().toLowerCase(),
    nombre: data.nombre || data.name || "",
    iat: now,
    exp: now + maxAgeDays * DAY,
  }));
  return `${payload}.${sign(payload)}`;
}

export function readSession(req, cookieName, expectedKind) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${cookieName}=([^;]+)`));
  if (!match) return null;
  const token = decodeURIComponent(match[1]);
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, signature] = parts;
  const expected = sign(payload);
  const given = Buffer.from(signature);
  const wanted = Buffer.from(expected);
  if (given.length !== wanted.length || !crypto.timingSafeEqual(given, wanted)) return null;
  try {
    const session = JSON.parse(unb64url(payload));
    if (session.kind !== expectedKind) return null;
    if (!session.email || Number(session.exp || 0) < Math.floor(Date.now() / 1000)) return null;
    return session;
  } catch {
    return null;
  }
}

export async function verifyGoogleCredential(credential) {
  const res = await fetch("https://oauth2.googleapis.com/tokeninfo?id_token=" + encodeURIComponent(credential));
  if (!res.ok) throw new Error("google_token_invalid");
  const info = await res.json();
  if (info.aud !== GOOGLE_CLIENT_ID) throw new Error("google_audience_invalid");
  if (String(info.email_verified) !== "true") throw new Error("google_email_unverified");
  return {
    email: String(info.email || "").trim().toLowerCase(),
    nombre: info.name || info.given_name || "",
  };
}

export async function getStudentAccess(email) {
  const r = await fetch(SCRIPT_URL + "?accion=verificar&correo=" + encodeURIComponent(email));
  return await r.json();
}

export function normalizeGuideCode(value) {
  if (value && typeof value === "object") {
    return normalizeGuideCode(value.guia || value.cod || value.codigo || value.archivo || value.file || "");
  }
  return String(value || "").replace(/^guia-/i, "").replace(/\.html$/i, "").trim();
}

export function isGuideAssigned(data, code) {
  const cod = normalizeGuideCode(code);
  const pools = [
    data.guiaHoy,
    ...(Array.isArray(data.semana) ? data.semana.map((x) => x?.guia || x?.cod || x?.codigo) : []),
    ...(Array.isArray(data.guiasDesbloqueadas) ? data.guiasDesbloqueadas : []),
    ...(Array.isArray(data.guiasHabilitadas) ? data.guiasHabilitadas : []),
  ];
  return pools.some((item) => normalizeGuideCode(item) === cod);
}

export function isEssayAssigned(data, fileName) {
  const target = String(fileName || "").trim().toLowerCase();
  const ensayo = data.ensayoHoy || data.ensayo || null;
  const candidates = [
    ensayo,
    ensayo?.archivo,
    ensayo?.file,
    ensayo?.ensayo,
    ensayo?.cod,
    ensayo?.codigo,
  ].filter(Boolean).map((x) => {
    const s = String(x).trim();
    return s.toLowerCase().endsWith(".html") ? s.toLowerCase() : `ensayo-${s}.html`.toLowerCase();
  });
  return candidates.includes(target);
}

export function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));
}
