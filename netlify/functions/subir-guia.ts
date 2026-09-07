import type { Handler, HandlerEvent } from '@netlify/functions';

// ──────────────────────────────────────────────────────────────
// FlashMate · Subir guía
// Recibe el HTML de una guía + sus metadatos, lo publica en el repo
// vía la API de GitHub y actualiza el catálogo guias.json.
// Netlify detecta el push y redespliega: la guía queda en vivo.
//
// Variables de entorno requeridas (Netlify → Site settings → Environment):
//   GITHUB_TOKEN        Personal Access Token con permiso "Contents: write"
//   FLASHMATE_ADMIN_KEY Clave que Erika escribe en el panel para publicar
//   GITHUB_REPO         (opcional) "owner/repo". Default: Andy-Montes/erikalaprofedemate
//   GITHUB_BRANCH       (opcional) Default: main
// ──────────────────────────────────────────────────────────────

const GH = 'https://api.github.com';
// OJO: son DOS carpetas distintas y no da lo mismo.
// El HTML de la guía va a protected/, que es de donde la lee la función
// ver-guia (public/ está detrás de un redirect con force y no se sirve).
// El catálogo sí vive en public/, porque el portal lo pide por fetch.
const GUIA_DIR = 'protected/flashmate/guias';
const CAT_PATH = 'public/flashmate/guias.json';
const COD_RE = /^U\d{2}\.[A-C]\.\d{1,2}[a-c]$/; // ej: U04.A.1a

type GuiaMeta = {
  cod: string;
  nombre: string;
  desc: string;
  nivel: string;
  unidad: string;
  subunidad: string;
  unidadTitulo: string;
  subunidadTitulo: string;
  disp: boolean;
};

function ghHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'flashmate-uploader',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

// Lee un archivo del repo. Devuelve { sha, text } o null si no existe.
async function getFile(repo: string, path: string, token: string, branch: string) {
  const res = await fetch(`${GH}/repos/${repo}/contents/${path}?ref=${branch}`, {
    headers: ghHeaders(token),
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub GET ${path}: ${res.status} ${await res.text()}`);
  const data: any = await res.json();
  const text = Buffer.from(data.content, 'base64').toString('utf-8');
  return { sha: data.sha as string, text };
}

// Crea o actualiza un archivo del repo.
async function putFile(
  repo: string,
  path: string,
  contentUtf8: string,
  message: string,
  token: string,
  branch: string,
  sha?: string,
) {
  const body: Record<string, unknown> = {
    message,
    content: Buffer.from(contentUtf8, 'utf-8').toString('base64'),
    branch,
  };
  if (sha) body.sha = sha;
  const res = await fetch(`${GH}/repos/${repo}/contents/${path}`, {
    method: 'PUT',
    headers: ghHeaders(token),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GitHub PUT ${path}: ${res.status} ${await res.text()}`);
  return res.json();
}

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Método no permitido' }) };
  }

  const token = process.env.GITHUB_TOKEN;
  const adminKey = process.env.FLASHMATE_ADMIN_KEY;
  const repo = process.env.GITHUB_REPO || 'Andy-Montes/erikalaprofedemate';
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token || !adminKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Subidor no configurado (faltan variables de entorno).' }) };
  }

  let payload: any;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'JSON inválido.' }) };
  }

  // ── Autenticación ──
  if (payload.clave !== adminKey) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Clave incorrecta.' }) };
  }

  // ── Validación de datos ──
  const cod = String(payload.cod || '').trim();
  const html = String(payload.html || '');

  if (!COD_RE.test(cod)) {
    return { statusCode: 400, body: JSON.stringify({ error: `Código inválido: "${cod}". Formato esperado: U04.A.1a` }) };
  }
  if (html.length < 200) {
    return { statusCode: 400, body: JSON.stringify({ error: 'El archivo HTML de la guía está vacío o es demasiado corto.' }) };
  }
  if (html.length > 800_000) {
    return { statusCode: 400, body: JSON.stringify({ error: 'El archivo es demasiado grande (máx 800 KB).' }) };
  }

  // ── El JS de la guía tiene que PARSEAR ──
  // Una guía con el script roto se ve normal en el catálogo y muere al abrirla,
  // sin avisarle a nadie: así quedaron 15 guías muertas (un `E.push(armar(...);`
  // sin el paréntesis de cierre). Mejor rechazarla aquí que publicarla rota.
  const bloques = html.match(/<script(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/gi) || [];
  for (const bloque of bloques) {
    const js = bloque.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, '');
    if (!js.trim()) continue;
    try {
      new Function(js); // solo compila: no ejecuta nada de la guía
    } catch (err: any) {
      return {
        statusCode: 422,
        body: JSON.stringify({
          error: 'La guía tiene un error de JavaScript, así que NO se publicó. '
            + 'Si se subía, aparecía en la lista pero no abriría. Detalle: '
            + String(err?.message || err).slice(0, 160),
        }),
      };
    }
  }

  const meta: GuiaMeta = {
    cod,
    nombre: String(payload.nombre || cod).trim(),
    desc: String(payload.desc || '').trim(),
    nivel: String(payload.nivel || cod.slice(-1)).trim(),
    unidad: String(payload.unidad || cod.slice(0, 3)).trim(),
    subunidad: String(payload.subunidad || cod.split('.')[1] || '').trim(),
    unidadTitulo: String(payload.unidadTitulo || '').trim(),
    subunidadTitulo: String(payload.subunidadTitulo || '').trim(),
    disp: payload.disp !== false,
  };

  try {
    const guiaPath = `${GUIA_DIR}/guia-${cod}.html`;
    const catPath = CAT_PATH;

    // 1) Publicar el HTML de la guía (crea o reemplaza)
    const existente = await getFile(repo, guiaPath, token, branch);
    const esNueva = !existente;
    await putFile(
      repo,
      guiaPath,
      html,
      `${esNueva ? 'Agregar' : 'Actualizar'} guía ${cod} (vía panel FlashMate)`,
      token,
      branch,
      existente?.sha,
    );

    // 2) Actualizar el catálogo guias.json (upsert por código)
    const catFile = await getFile(repo, catPath, token, branch);
    let catalogo: { actualizado?: string; guias: GuiaMeta[] } = { guias: [] };
    if (catFile) {
      // Quitar un posible BOM: JSON.parse lo rechaza y reiniciaría el catálogo entero.
      const catText = catFile.text.replace(/^﻿/, '');
      try {
        catalogo = JSON.parse(catText);
      } catch (parseErr: any) {
        // FAIL-CLOSED: si el catálogo existente no se puede leer, NO lo reiniciamos
        // (eso borraría las guías ya publicadas). Se aborta y se conserva lo que hay.
        return {
          statusCode: 409,
          body: JSON.stringify({
            error: 'El catálogo guias.json no se pudo leer y no se reescribió para no perder las guías existentes. Avisa a soporte.',
            detalle: String(parseErr?.message || parseErr).slice(0, 200),
          }),
        };
      }
    }
    if (!Array.isArray(catalogo.guias)) catalogo.guias = [];

    const idx = catalogo.guias.findIndex((g) => g.cod === cod);
    if (idx >= 0) catalogo.guias[idx] = { ...catalogo.guias[idx], ...meta };
    else catalogo.guias.push(meta);

    // Orden estable por código para que el catálogo no se desordene
    catalogo.guias.sort((a, b) => a.cod.localeCompare(b.cod, 'es', { numeric: true }));
    catalogo.actualizado = new Date().toISOString().slice(0, 10);

    await putFile(
      repo,
      catPath,
      JSON.stringify(catalogo, null, 2) + '\n',
      `Catálogo: ${esNueva ? 'agregar' : 'actualizar'} ${cod}`,
      token,
      branch,
      catFile?.sha,
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: true,
        nueva: esNueva,
        cod,
        url: `/flashmate/guia-${cod}.html`,
        total: catalogo.guias.length,
        mensaje: `Guía ${cod} ${esNueva ? 'publicada' : 'actualizada'}. Estará en vivo en 1-2 minutos.`,
      }),
    };
  } catch (error: any) {
    console.error('subir-guia error:', error);
    return { statusCode: 502, body: JSON.stringify({ error: error.message || 'Error publicando la guía.' }) };
  }
};

export { handler };
