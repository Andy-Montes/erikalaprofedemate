import type { Handler, HandlerEvent } from '@netlify/functions';

// ──────────────────────────────────────────────────────────────
// FlashMate · Verificar estudiante (login con Google)
// Recibe el ID token de Google, lo valida CONTRA Google (firma +
// audiencia), saca el correo verificado y consulta el Apps Script
// (accion=verificar) para comprobar que el alumno esté registrado y
// activo en la hoja "Estudiantes". Devuelve los datos del alumno.
// Así el correo NO se puede falsificar (lo confirma Google).
// ──────────────────────────────────────────────────────────────

// Client ID OAuth (público, va también en el frontend).
const GOOGLE_CLIENT_ID = '568804580001-snpipfnntq0u828f8fdjjfqov2l36rq1.apps.googleusercontent.com';
// Apps Script del Sheet de Erika (mismo deployment que usan los paneles).
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyBZH6XJngzYPtwC-7qtA9fIes9iH7WPDQ5aQjqbiDpnZUtK2jxpfoq97l3zaA5b1-1/exec';

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Método no permitido' }) };
  }

  let payload: any;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'JSON inválido.' }) };
  }

  const credential = String(payload.credential || '');
  if (!credential) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Falta el token de Google.' }) };
  }

  // ── Verificar el ID token CONTRA Google ──
  let info: any;
  try {
    const res = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(credential));
    if (!res.ok) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Token de Google inválido o expirado.' }) };
    }
    info = await res.json();
  } catch {
    return { statusCode: 502, body: JSON.stringify({ error: 'No se pudo verificar con Google.' }) };
  }

  if (info.aud !== GOOGLE_CLIENT_ID) {
    return { statusCode: 401, body: JSON.stringify({ error: 'El token no corresponde a esta aplicación.' }) };
  }
  if (String(info.email_verified) !== 'true') {
    return { statusCode: 401, body: JSON.stringify({ error: 'El correo de Google no está verificado.' }) };
  }

  const email = String(info.email || '').trim().toLowerCase();

  // ── Consultar el Sheet (vía Apps Script) si el alumno está registrado/activo ──
  try {
    const r = await fetch(SCRIPT_URL + '?accion=verificar&correo=' + encodeURIComponent(email));
    const data = await r.json();
    // data = { acceso:true, nombre, correo, plan, guiasHabilitadas, guiaHoy, ... }
    //        o { acceso:false, motivo }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, emailVerificado: email }),
    };
  } catch {
    return { statusCode: 502, body: JSON.stringify({ error: 'No se pudo validar el acceso.' }) };
  }
};

export { handler };
