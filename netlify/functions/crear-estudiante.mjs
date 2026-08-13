import { SCRIPT_URL, json, readSession } from "./_shared/session.mjs";

function clean(value) {
  return String(value || "").trim();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isoDate(value) {
  const raw = clean(value);
  if (!raw) return "";
  return /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : "";
}

function normalizeCourse(value) {
  const raw = clean(value).toLowerCase();
  if (raw.startsWith("3")) return "3° medio";
  if (raw.startsWith("4")) return "4° medio";
  return "";
}

function normalizePlan(value, curso) {
  const raw = clean(value).toLowerCase();
  if (raw.startsWith("3") || raw.includes("3ero")) return "3ero";
  if (raw.startsWith("4") || raw.includes("egresado")) return "4to - Egresado";
  return curso === "4° medio" ? "4to - Egresado" : "3ero";
}

export default async (req) => {
  if (req.method !== "POST") return json({ ok: false, error: "Metodo no permitido." }, 405);

  const teacher = readSession(req, "fm_teacher", "teacher");
  if (!teacher) return json({ ok: false, error: "Sesion docente no autorizada." }, 401);

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "Datos invalidos." }, 400);
  }

  const estudiante = {
    nombre: clean(body.nombre),
    correo: clean(body.correo).toLowerCase(),
    curso: normalizeCourse(body.curso) || "3° medio",
    plan: "",
    fecha_inicio: isoDate(body.fechaInicio) || new Date().toISOString().slice(0, 10),
    fecha_vencimiento: isoDate(body.fechaVencimiento),
  };

  if (!estudiante.nombre) return json({ ok: false, error: "Falta el nombre." }, 400);
  if (!isEmail(estudiante.correo)) return json({ ok: false, error: "Correo invalido." }, 400);
  estudiante.plan = normalizePlan(body.plan, estudiante.curso);
  if (!estudiante.fecha_vencimiento) {
    const fin = new Date();
    fin.setMonth(fin.getMonth() + 12);
    estudiante.fecha_vencimiento = fin.toISOString().slice(0, 10);
  }

  const url = new URL(SCRIPT_URL);
  url.searchParams.set("accion", "crear_estudiante");
  url.searchParams.set("datos", JSON.stringify(estudiante));

  try {
    const res = await fetch(url);
    const text = await res.text();
    let data = {};
    try { data = JSON.parse(text); } catch { /* Apps Script returned non-json */ }

    if (res.ok && data.ok) {
      return json({ ok: true, estudiante: data.estudiante || estudiante });
    }

    if (data.estado && !data.ok && !data.error) {
      return json({
        ok: false,
        error: "Falta publicar la accion crear_estudiante en Apps Script.",
        detalle: data.estado,
      }, 502);
    }

    return json({
      ok: false,
      error: data.error || data.motivo || "Apps Script no pudo crear el alumno.",
      detalle: text.slice(0, 300),
    }, 502);
  } catch (error) {
    return json({ ok: false, error: "No se pudo conectar con Apps Script.", detalle: String(error) }, 502);
  }
};
