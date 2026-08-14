// ══════════════════════════════════════════════════════════
// FLASHMATE · Google Apps Script
// Version Erika completa - alta de alumnos integrada
// Estructura hoja Estudiantes: A correo - B nombre - C plan - D fecha_inicio - E fecha_vencimiento - F activo - G guias_extra - H curso
// Cambios marcados con  // ← v5 / v5.1
// ══════════════════════════════════════════════════════════

function doGet(e) {
  try {

    if (e.parameter && e.parameter.accion === 'verificar') {
      return verificarEstudiante(e.parameter.correo);
    }
    if (e.parameter && e.parameter.accion === 'resultados') {
      return obtenerResultados(e.parameter.correo);
    }
    if (e.parameter && e.parameter.accion === 'todos_resultados') {
      return todosLosResultados();
    }

    if (e.parameter && e.parameter.nombre) {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

      sheet.appendRow([
        e.parameter.fecha        || '',
        e.parameter.nombre       || '',
        e.parameter.correo       || '',
        e.parameter.tipo         || 'individual',
        e.parameter.grupo        || 'NA',
        e.parameter.guia         || '',
        e.parameter.eje          || '',
        e.parameter.unidad       || '',
        e.parameter.subunidad    || '',
        e.parameter.nivel        || '',
        parseInt(e.parameter.correctas)   || 0,
        parseInt(e.parameter.incorrectas) || 0,
        parseInt(e.parameter.nls)         || 0,
        parseFloat(e.parameter.logro)     || 0,
        parseInt(e.parameter.e1) || 0,
        parseInt(e.parameter.e2) || 0,
        parseInt(e.parameter.e3) || 0,
        parseInt(e.parameter.e4) || 0,
        parseInt(e.parameter.e5) || 0,
        parseInt(e.parameter.e6) || 0,
        parseInt(e.parameter.e7) || 0,
        parseInt(e.parameter.e8) || 0,
        e.parameter.habilidades   || '',
        e.parameter.logro_resolver     !== undefined ? parseFloat(e.parameter.logro_resolver)    : '',
        e.parameter.logro_modelar      !== undefined ? parseFloat(e.parameter.logro_modelar)     : '',
        e.parameter.logro_representar  !== undefined ? parseFloat(e.parameter.logro_representar) : '',
        e.parameter.logro_argumentar   !== undefined ? parseFloat(e.parameter.logro_argumentar)  : ''
      ]);

      var fechaHoy = Utilities.formatDate(new Date(), 'America/Santiago', 'yyyy-MM-dd');
      marcarCompletada(e.parameter.correo, fechaHoy);

      var logro = parseFloat(e.parameter.logro) || 0;
      if (logro >= 0.6) {
        desbloquearSiguienteGuia(e.parameter.correo, e.parameter.guia);
      }

      MailApp.sendEmail(
        e.parameter.correo,
        'Flash Mate · Resultados ' + e.parameter.guia,
        'Hola ' + e.parameter.nombre + ',\n\n' +
        'Aquí están tus resultados de la guía ' + e.parameter.guia + ':\n\n' +
        '✓ Correctas: ' + e.parameter.correctas + ' de 8\n' +
        '✗ Incorrectas: ' + e.parameter.incorrectas + '\n' +
        '? No lo sé: ' + e.parameter.nls + '\n' +
        '📊 Logro: ' + Math.round(parseFloat(e.parameter.logro) * 100) + '%\n\n' +
        (e.parameter.habilidades
          ? 'Habilidades que necesitan refuerzo:\n' +
            e.parameter.habilidades.replace(/\|/g, '\n') + '\n\n'
          : '') +
        (parseInt(e.parameter.incorrectas) > 3
          ? '💡 Te recomendamos repetir esta guía antes de avanzar.\n\n'
          : '🎉 ¡Muy bien! Puedes avanzar a la siguiente guía.\n\n') +
        'Sigue entrenando tu mente con Flash Mate.\n' +
        'Erika la Profe de Mate\n' +
        'www.erikalaprofedemate.com'
      );

      return ContentService
        .createTextOutput(JSON.stringify({ resultado: 'ok' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (e.parameter && e.parameter.accion === 'guia_hoy') {
      return getGuiaHoy(e.parameter.correo);
    }
    if (e.parameter && e.parameter.accion === 'guardar_plan') {
      var asignaciones = JSON.parse(e.parameter.datos);
      return guardarPlanificacion(asignaciones);
    }
    if (e.parameter && e.parameter.accion === 'marcar_completada') {
      return marcarCompletada(e.parameter.correo, e.parameter.fecha);
    }
    if (e.parameter && e.parameter.accion === 'semana') {
      return getSemana(e.parameter.correo);
    }
    if (e.parameter && e.parameter.accion === 'plan_semana_docente') {
      return getPlanSemanaDocente();
    }
    if (e.parameter && e.parameter.accion === 'estudiantes') {
      return getEstudiantes();
    }
    if (e.parameter && e.parameter.accion === 'registrar_ensayo') {
      return registrarEnsayo(e.parameter);
    }
    if (e.parameter && e.parameter.accion === 'crear_estudiante') {
      var datosCrear = JSON.parse(e.parameter.datos || '{}');
      return crearEstudiante(datosCrear);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ estado: 'FlashMate activo v5.0' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ══════════════════════════════════════════════════════════
// VERIFICAR ESTUDIANTE
// ══════════════════════════════════════════════════════════
function verificarEstudiante(correo) {
  if (!correo) {
    return respuestaJSON({ acceso: false, motivo: 'correo_vacio' });
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheetByName('Estudiantes');

  if (!hoja) {
    return respuestaJSON({ acceso: false, motivo: 'hoja_no_encontrada' });
  }

  var datos = hoja.getDataRange().getValues();
  var correoNorm = correo.trim().toLowerCase();

  for (var i = 1; i < datos.length; i++) {
    var fila = datos[i];
    var correoDB  = String(fila[0]).trim().toLowerCase();
    var nombre    = String(fila[1]);
    var plan      = String(fila[2] || '').trim();
    var curso     = String(fila[7] || '').trim() || inferirCursoFlashMate(plan);
    var fechaFin  = new Date(fila[4]);
    var activo    = String(fila[5]).toUpperCase();

    if (correoDB === correoNorm) {
      if (activo !== 'TRUE') {
        return respuestaJSON({ acceso: false, motivo: 'cuenta_inactiva' });
      }

      var hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      if (fechaFin < hoy) {
        return respuestaJSON({ acceso: false, motivo: 'acceso_vencido' });
      }

      var guiasHabilitadas = obtenerGuiasPorPlan(plan);
      var guiasExtra = obtenerGuiasDesbloqueadas(correoNorm);
      guiasExtra.forEach(function(g) {
        if (guiasHabilitadas.indexOf(g) === -1) {
          guiasHabilitadas.push(g);
        }
      });

      var guiaHoy  = getGuiaHoyDatos(correoNorm);
      var semana   = getSemanaData(correoNorm);
      var ensayoHoy = getEnsayoAsignado(correoNorm);
      var guiasDesbloqueadas = obtenerGuiasDesbloqueadas_Planificacion(correoNorm);
      var totalEjercicios = contarEjerciciosAcumulados(correoNorm);

      return respuestaJSON({
        acceso:             true,
        nombre:             nombre,
        correo:             correoNorm,
        plan:               plan,
        curso:              curso,            // ← v5
        vencimiento:        Utilities.formatDate(fechaFin, 'America/Santiago', 'dd/MM/yyyy'),
        guiasHabilitadas:   guiasHabilitadas,
        guiasDesbloqueadas: guiasDesbloqueadas,
        guiaHoy:            guiaHoy,
        semana:             semana,
        ensayoHoy:          ensayoHoy,
        totalEjercicios:    totalEjercicios
      });
    }
  }

  return respuestaJSON({ acceso: false, motivo: 'correo_no_registrado' });
}

// ══════════════════════════════════════════════════════════
// OBTENER RESULTADOS DE UN ESTUDIANTE
// ══════════════════════════════════════════════════════════
function obtenerResultados(correo) {
  if (!correo) {
    return respuestaJSON({ resultados: {} });
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheets()[0];
  var datos = hoja.getDataRange().getValues();
  var correoNorm = correo.trim().toLowerCase();
  var resultados = {};

  for (var i = 1; i < datos.length; i++) {
    var fila = datos[i];
    var correoFila = String(fila[2]).trim().toLowerCase();
    if (correoFila !== correoNorm) continue;

    var guia  = String(fila[5]);
    var logro = parseFloat(fila[13]) || 0;
    var cod   = guia.replace('guia-', '');

    if (!resultados[cod]) {
      resultados[cod] = { logro: logro, intentos: 1 };
    } else {
      resultados[cod].intentos++;
      if (logro > resultados[cod].logro) {
        resultados[cod].logro = logro;
      }
    }
  }

  return respuestaJSON({ resultados: resultados });
}

// ══════════════════════════════════════════════════════════
// TODOS LOS RESULTADOS (panel de seguimiento docente)
// ══════════════════════════════════════════════════════════
function todosLosResultados() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheets()[0];
  var datos = hoja.getDataRange().getValues();
  var registros = [];

  for (var i = 1; i < datos.length; i++) {
    var fila = datos[i];
    if (!fila[1]) continue;

    registros.push({
      fecha:       String(fila[0]),
      nombre:      String(fila[1]),
      correo:      String(fila[2]),
      tipo:        String(fila[3]),
      grupo:       String(fila[4]),
      guia:        String(fila[5]),
      eje:         String(fila[6]),
      unidad:      String(fila[7]),
      subunidad:   String(fila[8]),
      nivel:       String(fila[9]),
      correctas:   parseInt(fila[10])  || 0,
      incorrectas: parseInt(fila[11])  || 0,
      nls:         parseInt(fila[12])  || 0,
      logro:       parseFloat(fila[13])|| 0,
      e1: parseInt(fila[14]) || 0,
      e2: parseInt(fila[15]) || 0,
      e3: parseInt(fila[16]) || 0,
      e4: parseInt(fila[17]) || 0,
      e5: parseInt(fila[18]) || 0,
      e6: parseInt(fila[19]) || 0,
      e7: parseInt(fila[20]) || 0,
      e8: parseInt(fila[21]) || 0,
      habilidades: String(fila[22] || '')
    });
  }

  return respuestaJSON({ registros: registros });
}

// ══════════════════════════════════════════════════════════
// GUÍA DE HOY — datos internos
// ══════════════════════════════════════════════════════════
function getGuiaHoyDatos(correo) {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Planificacion');
  if (!hoja) return null;

  var datos = hoja.getDataRange().getValues();
  var hoy = Utilities.formatDate(new Date(), 'America/Santiago', 'yyyy-MM-dd');

  for (var i = 1; i < datos.length; i++) {
    var correoFila = String(datos[i][0]).trim().toLowerCase();
    var fechaFila  = Utilities.formatDate(new Date(datos[i][1]), 'America/Santiago', 'yyyy-MM-dd');
    var tipo       = datos[i][4] ? String(datos[i][4]).trim().toLowerCase() : '';
    if (correoFila === correo && fechaFila === hoy && tipo !== 'ensayo') {
      return { guia: String(datos[i][2]), estado: String(datos[i][3]), fecha: fechaFila };
    }
  }
  return null;
}

function getGuiaHoy(correo) {
  if (!correo) return respuestaJSON({ guiaHoy: null });
  var resultado = getGuiaHoyDatos(correo.trim().toLowerCase());
  return respuestaJSON({ guiaHoy: resultado });
}

// ══════════════════════════════════════════════════════════
// ENSAYO ASIGNADO AL ESTUDIANTE
// ══════════════════════════════════════════════════════════
function getEnsayoAsignado(correo) {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Planificacion');
  if (!hoja) return null;

  var datos = hoja.getDataRange().getValues();
  var correoNorm = correo.trim().toLowerCase();
  var hoy = Utilities.formatDate(new Date(), 'America/Santiago', 'yyyy-MM-dd');
  var proximoEnsayo = null;

  for (var i = 1; i < datos.length; i++) {
    var correoFila = String(datos[i][0]).trim().toLowerCase();
    var tipo       = datos[i][4] ? String(datos[i][4]).trim().toLowerCase() : '';
    if (correoFila !== correoNorm || tipo !== 'ensayo') continue;

    var fechaFila = Utilities.formatDate(new Date(datos[i][1]), 'America/Santiago', 'yyyy-MM-dd');
    var estado    = String(datos[i][3]).trim().toLowerCase();

    if (fechaFila >= hoy && estado !== 'completada') {
      if (!proximoEnsayo || fechaFila < proximoEnsayo.fecha) {
        proximoEnsayo = {
          ensayo:        String(datos[i][2]),
          ensayo_nombre: datos[i][5] ? String(datos[i][5]) : String(datos[i][2]),
          fecha:         fechaFila,
          estado:        estado
        };
      }
    }
    if (fechaFila === hoy && estado === 'completada') {
      return {
        ensayo:        String(datos[i][2]),
        ensayo_nombre: datos[i][5] ? String(datos[i][5]) : String(datos[i][2]),
        fecha:         fechaFila,
        estado:        'completada'
      };
    }
  }
  return proximoEnsayo;
}

// ══════════════════════════════════════════════════════════
// SEMANA COMPLETA — historial últimos 7 días
// ══════════════════════════════════════════════════════════
function getSemanaData(correo) {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Planificacion');
  if (!hoja) return [];

  var datos = hoja.getDataRange().getValues();
  var hoy   = new Date();
  var hace7 = new Date(hoy.getTime() - 7 * 24 * 60 * 60 * 1000);
  var semana = [];

  for (var i = 1; i < datos.length; i++) {
    var correoFila = String(datos[i][0]).trim().toLowerCase();
    if (correoFila !== correo) continue;

    var tipo = datos[i][4] ? String(datos[i][4]).trim().toLowerCase() : '';
    if (tipo === 'ensayo') continue;

    var fecha = new Date(datos[i][1]);
    if (fecha >= hace7 && fecha <= hoy) {
      semana.push({
        fecha:  Utilities.formatDate(fecha, 'America/Santiago', 'yyyy-MM-dd'),
        guia:   String(datos[i][2]),
        estado: String(datos[i][3])
      });
    }
  }
  return semana;
}

function getSemana(correo) {
  if (!correo) return respuestaJSON({ semana: [] });
  return respuestaJSON({ semana: getSemanaData(correo.trim().toLowerCase()) });
}

// ══════════════════════════════════════════════════════════
// GUARDAR PLANIFICACIÓN SEMANAL (desde panel docente)
// ══════════════════════════════════════════════════════════
function guardarPlanificacion(asignaciones) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheetByName('Planificacion');

  if (!hoja) {
    hoja = ss.insertSheet('Planificacion');
    hoja.appendRow(['correo', 'fecha', 'guia', 'estado', 'tipo', 'ensayo_nombre']);
  }

  var datos = hoja.getDataRange().getValues();

  asignaciones.forEach(function(a) {
    var correo = a.correo.trim().toLowerCase();
    var tipo   = a.tipo || 'guia';
    var encontrada = false;

    for (var i = 1; i < datos.length; i++) {
      var correoFila = String(datos[i][0]).trim().toLowerCase();
      var tipoFila   = datos[i][4] ? String(datos[i][4]).trim().toLowerCase() : 'guia';
      var fechaFila  = Utilities.formatDate(new Date(datos[i][1]), 'America/Santiago', 'yyyy-MM-dd');
      if (correoFila === correo && fechaFila === a.fecha && tipoFila === tipo) {
        hoja.getRange(i + 1, 3).setValue(a.guia);
        if (a.ensayo_nombre) hoja.getRange(i + 1, 6).setValue(a.ensayo_nombre);
        encontrada = true;
        break;
      }
    }

    if (!encontrada) {
      hoja.appendRow([correo, a.fecha, a.guia, 'asignada', tipo, a.ensayo_nombre || '']);
    }
  });

  return respuestaJSON({ ok: true });
}

// ══════════════════════════════════════════════════════════
// MARCAR GUÍA COMO COMPLETADA
// ══════════════════════════════════════════════════════════
function marcarCompletada(correo, fecha) {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Planificacion');
  if (!hoja) return respuestaJSON({ ok: false });

  var correoNorm = correo.trim().toLowerCase();
  var datos = hoja.getDataRange().getValues();

  for (var i = 1; i < datos.length; i++) {
    var correoFila = String(datos[i][0]).trim().toLowerCase();
    var fechaFila  = Utilities.formatDate(new Date(datos[i][1]), 'America/Santiago', 'yyyy-MM-dd');
    if (correoFila === correoNorm && fechaFila === fecha) {
      hoja.getRange(i + 1, 4).setValue('completada');
      return respuestaJSON({ ok: true });
    }
  }
  return respuestaJSON({ ok: false });
}

// ══════════════════════════════════════════════════════════
// PLAN SEMANA DOCENTE — todos los estudiantes
// ══════════════════════════════════════════════════════════
function getPlanSemanaDocente() {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Planificacion');
  if (!hoja) return respuestaJSON({ plan: [] });

  var datos = hoja.getDataRange().getValues();
  var hoy   = new Date();
  var diaSemana = hoy.getDay() === 0 ? 6 : hoy.getDay() - 1;
  var lunes = new Date(hoy.getTime() - diaSemana * 24 * 60 * 60 * 1000);
  lunes.setHours(0, 0, 0, 0);
  var limite = new Date(lunes.getTime() + 30 * 24 * 60 * 60 * 1000);

  var plan = [];

  for (var i = 1; i < datos.length; i++) {
    var fecha = new Date(datos[i][1]);
    var tipo  = datos[i][4] ? String(datos[i][4]).trim().toLowerCase() : 'guia';
    var esEnsayo = tipo === 'ensayo';

    if (fecha >= lunes && fecha <= limite) {
      plan.push({
        correo:        String(datos[i][0]).trim().toLowerCase(),
        fecha:         Utilities.formatDate(fecha, 'America/Santiago', 'yyyy-MM-dd'),
        guia:          String(datos[i][2]),
        estado:        String(datos[i][3]),
        tipo:          tipo,
        ensayo_nombre: datos[i][5] ? String(datos[i][5]) : ''
      });
    }
  }

  return respuestaJSON({ plan: plan });
}

// ══════════════════════════════════════════════════════════
// GUÍAS DESBLOQUEADAS POR PLANIFICACIÓN
// ══════════════════════════════════════════════════════════
function obtenerGuiasDesbloqueadas_Planificacion(correo) {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Planificacion');
  if (!hoja) return [];

  var datos = hoja.getDataRange().getValues();
  var correoNorm = correo.trim().toLowerCase();
  var desbloqueadas = [];

  for (var i = 1; i < datos.length; i++) {
    var correoFila = String(datos[i][0]).trim().toLowerCase();
    var guia       = String(datos[i][2]).trim();
    var tipo       = datos[i][4] ? String(datos[i][4]).trim().toLowerCase() : 'guia';
    if (correoFila === correoNorm && guia && tipo !== 'ensayo') {
      if (desbloqueadas.indexOf(guia) === -1) {
        desbloqueadas.push(guia);
      }
    }
  }
  return desbloqueadas;
}

// ══════════════════════════════════════════════════════════
// CONTADOR DE EJERCICIOS ACUMULADOS
// ══════════════════════════════════════════════════════════
function contarEjerciciosAcumulados(correo) {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Planificacion');
  if (!hoja) return 0;

  var datos = hoja.getDataRange().getValues();
  var correoNorm = correo.trim().toLowerCase();
  var completadas = 0;

  for (var i = 1; i < datos.length; i++) {
    var correoFila = String(datos[i][0]).trim().toLowerCase();
    var estado     = String(datos[i][3]).trim().toLowerCase();
    var tipo       = datos[i][4] ? String(datos[i][4]).trim().toLowerCase() : 'guia';
    if (correoFila === correoNorm && estado === 'completada' && tipo !== 'ensayo') {
      completadas++;
    }
  }
  return completadas * 8;
}

// ══════════════════════════════════════════════════════════
// LISTA DE ESTUDIANTES ACTIVOS
// ══════════════════════════════════════════════════════════
function getEstudiantes() {
  var ss   = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheetByName('Estudiantes');
  if (!hoja) return respuestaJSON({ estudiantes: [] });

  var datos = hoja.getDataRange().getValues();
  var hoy   = new Date();
  hoy.setHours(0, 0, 0, 0);
  var lista = [];

  for (var i = 1; i < datos.length; i++) {
    var fila      = datos[i];
    var correo    = String(fila[0]).trim().toLowerCase();
    var nombre    = String(fila[1]).trim();
    var plan      = String(fila[2] || '').trim();
    var curso     = String(fila[7] || '').trim() || inferirCursoFlashMate(plan);
    var fechaFin  = new Date(fila[4]);
    var activo    = String(fila[5]).toUpperCase();

    if (!correo || correo === '') continue;
    if (activo !== 'TRUE') continue;
    if (fechaFin < hoy) continue;

    var partes    = nombre.split(' ').filter(function(p){ return p.length > 0; });
    var iniciales = partes.length >= 2
      ? (partes[0][0] + partes[1][0]).toUpperCase()
      : nombre.substring(0, 2).toUpperCase();

    lista.push({ correo: correo, nombre: nombre, plan: plan, iniciales: iniciales, curso: curso }); // ← v5: curso
  }

  return respuestaJSON({ estudiantes: lista });
}

// ══════════════════════════════════════════════════════════
// REGISTRAR RESULTADO DE ENSAYO
// ══════════════════════════════════════════════════════════
function registrarEnsayo(p) {
  var ss   = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheetByName('Ensayos');

  if (!hoja) {
    hoja = ss.insertSheet('Ensayos');
    var cabecera = [
      'fecha','nombre','correo','ensayo','ensayo_nombre',
      'correctas','incorrectas','nls','tiempo_min'
    ];
    for (var k = 1; k <= 65; k++) cabecera.push('p' + k);
    hoja.appendRow(cabecera);
  }

  var fila = [
    p.fecha         || '',
    p.nombre        || '',
    p.correo        || '',
    p.ensayo        || '',
    p.ensayo_nombre || '',
    parseInt(p.correctas)   || 0,
    parseInt(p.incorrectas) || 0,
    parseInt(p.nls)         || 0,
    parseInt(p.tiempo_min)  || 0
  ];

  for (var j = 1; j <= 65; j++) {
    var val = p['p' + j];
    if (val === '?') fila.push('?');
    else fila.push(parseInt(val) || 0);
  }

  hoja.appendRow(fila);

  var fechaHoy = Utilities.formatDate(new Date(), 'America/Santiago', 'yyyy-MM-dd');
  marcarEnsayoCompletado(p.correo, fechaHoy, p.ensayo);

  MailApp.sendEmail(
    p.correo,
    'FlashMate · Resultados Ensayo ' + p.ensayo,
    'Hola ' + p.nombre + ',\n\n' +
    'Aquí están tus resultados del ' + (p.ensayo_nombre || p.ensayo) + ':\n\n' +
    '✓ Correctas: ' + p.correctas + ' de 65\n' +
    '✗ Incorrectas: ' + p.incorrectas + '\n' +
    '? No lo sé: ' + p.nls + '\n' +
    '⏱ Tiempo utilizado: ' + p.tiempo_min + ' minutos\n\n' +
    'Tu profesora revisará los resultados y te orientará en los contenidos a reforzar.\n\n' +
    'Sigue entrenando tu mente con FlashMate.\n' +
    'Erika la Profe de Mate\n' +
    'www.erikalaprofedemate.com'
  );

  return respuestaJSON({ ok: true });
}

function marcarEnsayoCompletado(correo, fecha, ensayoCod) {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Planificacion');
  if (!hoja) return;

  var correoNorm = correo.trim().toLowerCase();
  var datos = hoja.getDataRange().getValues();

  for (var i = 1; i < datos.length; i++) {
    var correoFila = String(datos[i][0]).trim().toLowerCase();
    var fechaFila  = Utilities.formatDate(new Date(datos[i][1]), 'America/Santiago', 'yyyy-MM-dd');
    var tipo       = datos[i][4] ? String(datos[i][4]).trim().toLowerCase() : '';
    if (correoFila === correoNorm && fechaFila === fecha && tipo === 'ensayo') {
      hoja.getRange(i + 1, 4).setValue('completada');
      return;
    }
  }
}

// ══════════════════════════════════════════════════════════
// DESBLOQUEO AUTOMÁTICO POR LOGRO
// ══════════════════════════════════════════════════════════
function desbloquearSiguienteGuia(correo, guiaCompleta) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheetByName('Estudiantes');
  if (!hoja) return;

  var correoNorm = correo.trim().toLowerCase();

  var PROGRESION = {
    'guia-U01.A.1a': 'guia-U01.A.2b',
    'guia-U01.A.2b': 'guia-U01.A.3c',
    'guia-U01.A.3c': 'guia-U01.B.4a',
    'guia-U01.B.4a': 'guia-U01.B.5b',
    'guia-U01.B.5b': 'guia-U01.B.6c',
    'guia-U01.B.6c': 'guia-U01.B.7c',
    'guia-U01.B.7c': 'guia-U01.C.8a',
    'guia-U01.C.8a': 'guia-U01.C.9b',
    'guia-U01.C.9b': 'guia-U01.C.10c',
    'guia-U01.C.10c':'guia-U01.C.11c',
    'guia-U01.C.11c':'guia-U01.C.12c',
    'guia-U01.C.12c':'guia-U02.A.1a',
    'guia-U02.A.1a': 'guia-U02.A.2b',
    'guia-U02.A.2b': 'guia-U02.A.3b',
    'guia-U02.A.3b': 'guia-U02.A.4c',
    'guia-U02.A.4c': 'guia-U02.A.5c',
    'guia-U02.A.5c': 'guia-U02.A.6c',
    'guia-U02.A.6c': 'guia-U03.A.1a',
    'guia-U03.A.1a': 'guia-U03.A.2b',
    'guia-U03.A.2b': 'guia-U03.A.3c',
    'guia-U03.A.3c': 'guia-U03.B.4a',
    'guia-U03.B.4a': 'guia-U03.B.5b',
    'guia-U03.B.5b': 'guia-U03.B.6c',
    'guia-U03.B.6c': 'guia-U03.B.7c'
  };

  var siguiente = PROGRESION[guiaCompleta];
  if (!siguiente) return;

  var datos = hoja.getDataRange().getValues();
  for (var i = 1; i < datos.length; i++) {
    var correoDB = String(datos[i][0]).trim().toLowerCase();
    if (correoDB !== correoNorm) continue;

    var extras = datos[i][6] ? String(datos[i][6]) : '';   // ← v5.1: col G = guias_extra
    var listaExtras = extras ? extras.split(',').map(function(x){ return x.trim(); }) : [];

    if (listaExtras.indexOf(siguiente) === -1) {
      listaExtras.push(siguiente);
      hoja.getRange(i + 1, 7).setValue(listaExtras.join(','));   // ← v5.1: col G = columna 7
    }
    break;
  }
}

// ══════════════════════════════════════════════════════════
// GUÍAS DESBLOQUEADAS POR LOGRO (col G de Estudiantes)
// ══════════════════════════════════════════════════════════
function obtenerGuiasDesbloqueadas(correo) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheetByName('Estudiantes');
  if (!hoja) return [];

  var datos = hoja.getDataRange().getValues();
  var correoNorm = correo.trim().toLowerCase();

  for (var i = 1; i < datos.length; i++) {
    var correoDB = String(datos[i][0]).trim().toLowerCase();
    if (correoDB === correoNorm) {
      var extras = datos[i][6] ? String(datos[i][6]) : '';   // ← v5.1: col G = guias_extra
      if (!extras) return [];
      return extras.split(',')
        .map(function(x){ return x.trim().replace('guia-',''); })
        .filter(function(x){ return x.length > 0; });
    }
  }
  return [];
}

// ══════════════════════════════════════════════════════════
// GUÍAS POR PLAN
// ══════════════════════════════════════════════════════════
// ==========================================================
// CREAR ESTUDIANTE DESDE PANEL DOCENTE
// Estructura hoja Estudiantes:
// A correo - B nombre - C plan - D fecha_inicio - E fecha_vencimiento - F activo - G guias_extra - H curso
// ==========================================================
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
  if (raw.indexOf('4') === 0) return '4\u00b0 medio';
  return '3\u00b0 medio';
}

function normalizarPlanFlashMate(valor, curso) {
  var raw = String(valor || '').trim().toLowerCase();
  if (raw.indexOf('4') === 0 || raw.indexOf('egresado') !== -1) return '4to - Egresado';
  if (raw.indexOf('3') === 0 || raw.indexOf('3ero') !== -1) return '3ero';
  return curso === '4\u00b0 medio' ? '4to - Egresado' : '3ero';
}

function inferirCursoFlashMate(plan) {
  var raw = String(plan || '').trim().toLowerCase();
  if (raw.indexOf('4') === 0 || raw.indexOf('egresado') !== -1) return '4\u00b0 medio';
  return '3\u00b0 medio';
}
function obtenerGuiasPorPlan(plan) {
  var PLANES = {
    'Básico': [
      'U01.A.1a','U01.B.4a','U01.C.8a',
      'U02.A.1a','U03.A.1a','U03.B.4a'
    ],
    'Eje 1 Completo': [
      'U01.A.1a','U01.A.2b','U01.A.3c',
      'U01.B.4a','U01.B.5b','U01.B.6c','U01.B.7c',
      'U01.C.8a','U01.C.9b','U01.C.10c','U01.C.11c','U01.C.12c',
      'U02.A.1a','U02.A.2b','U02.A.3b','U02.A.4c','U02.A.5c','U02.A.6c',
      'U03.A.1a','U03.A.2b','U03.A.3c',
      'U03.B.4a','U03.B.5b','U03.B.6c','U03.B.7c'
    ],
    'Completo': [
      'U01.A.1a','U01.A.2b','U01.A.3c',
      'U01.B.4a','U01.B.5b','U01.B.6c','U01.B.7c',
      'U01.C.8a','U01.C.9b','U01.C.10c','U01.C.11c','U01.C.12c',
      'U02.A.1a','U02.A.2b','U02.A.3b','U02.A.4c','U02.A.5c','U02.A.6c',
      'U03.A.1a','U03.A.2b','U03.A.3c',
      'U03.B.4a','U03.B.5b','U03.B.6c','U03.B.7c'
    ]
  };
  if (plan === '3ero' || plan === '4to - Egresado') return PLANES['Eje 1 Completo'];
  return PLANES[plan] || PLANES['Eje 1 Completo'];
}

// ══════════════════════════════════════════════════════════
// HELPER: respuesta JSON
// ══════════════════════════════════════════════════════════
function respuestaJSON(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ══════════════════════════════════════════════════════════
// TRIGGER: enviar correo al registrar
// ══════════════════════════════════════════════════════════
function enviarCorreoPorTrigger(e) {
  var fila   = e.values;
  var nombre = fila[1];
  var correo = fila[2];
  var guia   = fila[5];
  var correctas   = fila[10];
  var incorrectas = fila[11];
  var nls    = fila[12];
  var logro  = Math.round(fila[13] * 100);

  var asunto = 'Flash Mate · Resultados ' + guia;
  var cuerpo = 'Hola ' + nombre + ',\n\n'
    + 'Aquí están tus resultados de la guía ' + guia + ':\n\n'
    + '✓ Correctas: ' + correctas + ' de 8\n'
    + '✗ Incorrectas: ' + incorrectas + '\n'
    + '? No lo sé: ' + nls + '\n'
    + '📊 Logro: ' + logro + '%\n\n'
    + (parseInt(incorrectas) > 3
        ? '💡 Te recomendamos repetir esta guía antes de avanzar.\n\n'
        : '🎉 ¡Muy bien! Puedes avanzar a la siguiente guía.\n\n')
    + 'Sigue entrenando tu mente con Flash Mate.\n'
    + 'Erika la Profe de Mate\n'
    + 'www.erikalaprofedemate.com';

  MailApp.sendEmail(correo, asunto, cuerpo);
}
