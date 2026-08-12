import { html, forbidden, getStudentAccess, isGuideAssigned, normalizeGuideCode, readSession } from "./_shared/session.mjs";
import fs from "node:fs/promises";
import path from "node:path";

export default async (req) => {
  const url = new URL(req.url);
  const match = url.pathname.match(/\/(guia-[A-Z0-9.]+\.html)$/i);
  const queryCode = url.searchParams.get("codigo");
  if (!match && !queryCode) return forbidden("Guia no encontrada", "La ruta solicitada no corresponde a una guia de FlashMate.");

  const queryFile = queryCode && String(queryCode).toLowerCase().endsWith(".html")
    ? `guia-${queryCode}`
    : `guia-${queryCode}.html`;
  const fileName = match ? match[1] : queryFile;
  if (!/^guia-[A-Z0-9.]+\.html$/i.test(fileName)) {
    return forbidden("Guia no encontrada", "La ruta solicitada no corresponde a una guia de FlashMate.");
  }
  const code = normalizeGuideCode(fileName);
  const teacher = readSession(req, "fm_teacher", "teacher");

  if (!teacher) {
    const student = readSession(req, "fm_student", "student");
    if (!student) return forbidden();

    const access = await getStudentAccess(student.email);
    if (!access.acceso || !isGuideAssigned(access, code)) {
      return forbidden("Guia no asignada", "Esta guia no esta habilitada para tu cuenta.");
    }
  }

  try {
    const filePath = path.join(process.cwd(), "protected", "flashmate", "guias", fileName);
    const content = await fs.readFile(filePath, "utf8");
    return html(content);
  } catch {
    return html("<h1>Guia no encontrada</h1>", 404);
  }
};
