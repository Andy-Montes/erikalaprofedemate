import type { Handler, HandlerEvent } from '@netlify/functions';

// ──────────────────────────────────────────────────────────────
// FlashMate · Verificar docente (login con Google)
// Recibe el ID token de Google Identity Services, lo valida CONTRA
// Google (verifica firma + audiencia) y comprueba que el correo
// pertenezca a un docente autorizado. Reemplaza la clave compartida.
//
// Variables de entorno (Netlify → Site settings → Environment):
//   GOOGLE_CLIENT_ID      El Client ID OAuth (termina en .apps.googleusercontent.com)
//   DOCENTES_AUTORIZADOS  (opcional) correos separados por coma. Si no se setea,
//                         se usa la lista por defecto de abajo.
// ──────────────────────────────────────────────────────────────

// El Client ID OAuth es público (va también en el frontend), por eso va fijo
// aquí y NO como variable de entorno (marcarlo secreto rompe el build de Netlify).
const GOOGLE_CLIENT_ID = '568804580001-snpipfnntq0u828f8fdjjfqov2l36rq1.apps.googleusercontent.com';

const DOCENTES_DEFAULT = ['erikalaprofedemate@gmail.com'];

function docentesAutorizados(): string[] {
  const env = process.env.DOCENTES_AUTORIZADOS;
  const lista = env ? env.split(',') : DOCENTES_DEFAULT;
  return lista.map((c) => c.trim().toLowerCase()).filter(Boolean);
}

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Método no permitido' }) };
  }

  const clientId = GOOGLE_CLIENT_ID;

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

  // ── Verificar el ID token CONTRA Google (valida firma, emisor y expiración) ──
  let info: any;
  try {
    const res = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(credential));
    if (!res.ok) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Token de Google inválido o expirado.' }) };
    }
    info = await res.json();
  } catch (e: any) {
    return { statusCode: 502, body: JSON.stringify({ error: 'No se pudo verificar con Google.' }) };
  }

  // ── Validaciones de seguridad ──
  if (info.aud !== clientId) {
    return { statusCode: 401, body: JSON.stringify({ error: 'El token no corresponde a esta aplicación.' }) };
  }
  if (String(info.email_verified) !== 'true') {
    return { statusCode: 401, body: JSON.stringify({ error: 'El correo de Google no está verificado.' }) };
  }

  const email = String(info.email || '').trim().toLowerCase();
  if (!docentesAutorizados().includes(email)) {
    return { statusCode: 403, body: JSON.stringify({ error: 'Esta cuenta no tiene acceso al panel docente.' }) };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ok: true,
      email,
      nombre: info.name || info.given_name || 'Docente',
    }),
  };
};

export { handler };
