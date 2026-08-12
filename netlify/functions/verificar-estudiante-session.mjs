import { createSession, getStudentAccess, json, setSessionCookie, verifyGoogleCredential } from "./_shared/session.mjs";

export default async (req) => {
  if (req.method !== "POST") return json({ error: "Metodo no permitido" }, 405);
  let payload = {};
  try {
    payload = await req.json();
  } catch {
    return json({ error: "JSON invalido." }, 400);
  }

  const credential = String(payload.credential || "");
  if (!credential) return json({ error: "Falta el token de Google." }, 400);

  try {
    const googleUser = await verifyGoogleCredential(credential);
    const data = await getStudentAccess(googleUser.email);
    if (!data.acceso) return json(data, 200);

    const token = createSession("student", { email: googleUser.email, nombre: data.nombre || googleUser.nombre });
    return json(
      { ...data, correo: data.correo || googleUser.email, emailVerificado: googleUser.email },
      200,
      { "Set-Cookie": setSessionCookie("fm_student", token) },
    );
  } catch {
    return json({ error: "No se pudo validar el acceso con Google." }, 401);
  }
};
