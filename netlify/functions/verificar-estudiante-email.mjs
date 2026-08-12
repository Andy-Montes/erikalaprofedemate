import { createSession, getStudentAccess, json, setSessionCookie } from "./_shared/session.mjs";

export default async (req) => {
  if (req.method !== "POST") return json({ error: "Metodo no permitido" }, 405);
  let payload = {};
  try {
    payload = await req.json();
  } catch {
    return json({ error: "JSON invalido." }, 400);
  }

  const email = String(payload.correo || payload.email || "").trim().toLowerCase();
  if (!email || !email.includes("@")) return json({ motivo: "correo_vacio", acceso: false }, 400);

  try {
    const data = await getStudentAccess(email);
    if (!data.acceso) return json(data, 200);
    const token = createSession("student", { email, nombre: data.nombre });
    return json(data, 200, { "Set-Cookie": setSessionCookie("fm_student", token) });
  } catch {
    return json({ error: "No se pudo validar el acceso." }, 502);
  }
};
