import { html, forbidden, getStudentAccess, isEssayAssigned, readSession } from "./_shared/session.mjs";
import fs from "node:fs/promises";
import path from "node:path";

export default async (req) => {
  const url = new URL(req.url);
  const match = url.pathname.match(/\/(ensayo-E[0-9]+\.html)$/i);
  const queryCode = url.searchParams.get("codigo");
  if (!match && !queryCode) return forbidden("Ensayo no encontrado", "La ruta solicitada no corresponde a un ensayo de FlashMate.");

  const fileName = match ? match[1] : `ensayo-${queryCode}.html`;
  if (!/^ensayo-E[0-9]+\.html$/i.test(fileName)) {
    return forbidden("Ensayo no encontrado", "La ruta solicitada no corresponde a un ensayo de FlashMate.");
  }
  const teacher = readSession(req, "fm_teacher", "teacher");

  if (!teacher) {
    const student = readSession(req, "fm_student", "student");
    if (!student) return forbidden();

    const access = await getStudentAccess(student.email);
    if (!access.acceso || !isEssayAssigned(access, fileName)) {
      return forbidden("Ensayo no asignado", "Este ensayo no esta habilitado para tu cuenta.");
    }
  }

  try {
    const filePath = path.join(process.cwd(), "protected", "flashmate", "ensayos", fileName);
    const content = await fs.readFile(filePath, "utf8");
    return html(content);
  } catch {
    return html("<h1>Ensayo no encontrado</h1>", 404);
  }
};
