import { createSession, json, setSessionCookie, verifyGoogleCredential } from "./_shared/session.mjs";

const DOCENTES_DEFAULT = [
  "erikalaprofedemate@gmail.com",
  "agathablu@gmail.com",
];

function docentesAutorizados() {
  const env = globalThis.Netlify?.env?.get?.("DOCENTES_AUTORIZADOS") || process.env.DOCENTES_AUTORIZADOS || "";
  return (env ? env.split(",") : DOCENTES_DEFAULT).map((x) => x.trim().toLowerCase()).filter(Boolean);
}

export default async (req) => {
  if (req.method !== "POST") return json({ error: "Metodo no permitido" }, 405);
  let payload = {};
  try {
    payload = await req.json();
  } catch {
    return json({ error: "JSON invalido." }, 400);
  }

  try {
    const user = await verifyGoogleCredential(String(payload.credential || ""));
    if (!docentesAutorizados().includes(user.email)) {
      return json({ error: "Esta cuenta no tiene acceso al panel docente." }, 403);
    }
    const token = createSession("teacher", user);
    return json(
      { ok: true, email: user.email, nombre: user.nombre || "Docente" },
      200,
      { "Set-Cookie": setSessionCookie("fm_teacher", token) },
    );
  } catch {
    return json({ error: "No se pudo verificar el acceso docente." }, 401);
  }
};
