// FlashMate · alta de estudiantes
// Pegar este bloque en el Apps Script del Sheet y redeplegar la Web App.
//
// Dentro de doGet(e), agregar antes del "return { estado: ... }":
//
// if (e.parameter && e.parameter.accion === 'crear_estudiante') {
//   var datosCrear = JSON.parse(e.parameter.datos || '{}');
//   return crearEstudiante(datosCrear);
// }

function crearEstudiante(p) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheetByName('Estudiantes');

  if (!hoja) {
    return respuestaJSON({ ok: false, error: 'hoja_estudiantes_no_encontrada' });
  }

  var correo = String(p.correo || '').trim().toLowerCase();
  var nombre = String(p.nombre || '').trim();
  var curso = normalizarCursoFlashMate(p.curso);
  var plan = normalizarPlanFlashMate(p.plan, curso);
  var fechaInicio = String(p.fecha_inicio || p.fechaInicio || '').trim();
  var fechaVencimiento = String(p.fecha_vencimiento || p.fechaVencimiento || '').trim();

  if (!nombre || !correo) {
    return respuestaJSON({ ok: false, error: 'faltan_nombre_o_correo' });
  }

  var datos = hoja.getDataRange().getValues();
  for (var i = 1; i < datos.length; i++) {
    var correoDB = String(datos[i][0] || '').trim().toLowerCase();
    if (correoDB === correo) {
      return respuestaJSON({ ok: false, error: 'correo_duplicado' });
    }
  }

  if (!fechaInicio) {
    fechaInicio = Utilities.formatDate(new Date(), 'America/Santiago', 'yyyy-MM-dd');
  }
  if (!fechaVencimiento) {
    var fin = new Date();
    fin.setMonth(fin.getMonth() + 12);
    fechaVencimiento = Utilities.formatDate(fin, 'America/Santiago', 'yyyy-MM-dd');
  }

  // Estructura Estudiantes actual:
  // A correo · B nombre · C plan · D fecha_inicio ·
  // E fecha_vencimiento · F activo · G guias_extra · H curso
  hoja.appendRow([
    correo,
    nombre,
    plan,
    fechaInicio,
    fechaVencimiento,
    true,
    '',
    curso
  ]);

  return respuestaJSON({
    ok: true,
    estudiante: {
      correo: correo,
      nombre: nombre,
      curso: curso,
      plan: plan
    }
  });
}

function normalizarCursoFlashMate(valor) {
  var raw = String(valor || '').trim().toLowerCase();
  if (raw.indexOf('4') === 0) return '4° medio';
  return '3° medio';
}

function normalizarPlanFlashMate(valor, curso) {
  var raw = String(valor || '').trim().toLowerCase();
  if (raw.indexOf('4') === 0 || raw.indexOf('egresado') !== -1) return '4to - Egresado';
  if (raw.indexOf('3') === 0 || raw.indexOf('3ero') !== -1) return '3ero';
  return curso === '4° medio' ? '4to - Egresado' : '3ero';
}
