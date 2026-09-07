(() => {
  const CFG = window.FLASHMATE || {};
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx5znp70maKSRFANfKg92ihoHfsXel-kdw9WTeNXUL_WiMhi7ZPmSHI3AcTKTciu1u8/exec';
  const NLS = 4;
  const LETRAS = ['A', 'B', 'C', 'D', 'E'];
  let nombreEstudiante = '';
  let ejercicios = [];
  let actual = 0;
  let respuestas = [];
  let seleccion = null;

  function escapeHtml(text) {
    return String(text ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function hcss(hab) {
    if (hab === 'Resolver problemas') return 'hab-rp';
    if (hab === 'Modelar') return 'hab-m';
    if (hab === 'Representar') return 'hab-r';
    return 'hab-a';
  }

  function validarCorreo(correo) {
    if (correo.indexOf('@') === -1) return false;
    const partes = correo.split('@');
    if (partes.length !== 2) return false;
    if (partes[0].length === 0) return false;
    if (partes[1].indexOf('.') === -1) return false;
    const dominio = partes[1].split('.');
    return dominio[0].length > 0 && dominio[dominio.length - 1].length >= 2;
  }

  function renderMath(root) {
    if (!root || typeof renderMathInElement !== 'function') return;
    renderMathInElement(root, {
      delimiters: [
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
      ],
      throwOnError: false
    });
  }

  function armar(hab, txt, opciones, fbOk) {
    const ok = opciones.findIndex(o => o.err == null);
    const ops = opciones.map(o => o.t);
    const fbMal = opciones
      .map((o, i) => (i === ok ? '' : o.err))
      .filter(Boolean)
      .join(' ');
    return { hab, txt, ops, ok, fb_ok: fbOk, fb_mal: fbMal };
  }

  function crearBase() {
    document.body.innerHTML = `
      <style>
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Poppins',system-ui,sans-serif;background:#f5f5f7;min-height:100vh;padding:16px 12px 80px}
        .fm-wrap{position:relative;max-width:540px;margin:0 auto}
        .fm-card{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08)}
        .fm-hdr{background:#38388E;padding:14px 16px}
        .fm-hdr-top{display:flex;align-items:center;justify-content:space-between;gap:12px}
        .fm-hdr-left{flex:1}
        .fm-badge{background:#ED3B62;color:#fff;font-size:11px;font-weight:600;padding:3px 11px;border-radius:20px;display:inline-block;margin-bottom:6px}
        .fm-eje{font-size:10px;color:rgba(255,255,255,.6);letter-spacing:.5px;margin-bottom:2px}
        .fm-titulo{font-size:15px;font-weight:600;color:#fff;margin-bottom:2px}
        .fm-sub{font-size:11px;color:rgba(255,255,255,.65)}
        .fm-hdr-logo{height:52px;width:auto;flex-shrink:0;border-radius:6px}
        .prog-bg{background:rgba(255,255,255,.2);border-radius:4px;height:4px;margin-top:8px}
        .prog-bar{background:#0187F3;height:4px;border-radius:4px;transition:width .4s}
        .fm-ident{padding:16px 16px 14px;border-bottom:.5px solid #eee}
        .fm-ident-titulo{font-size:10px;font-weight:600;color:#38388E;margin-bottom:8px;letter-spacing:.4px}
        .fm-input{width:100%;padding:9px 12px;border:.5px solid #ddd;border-radius:8px;font-family:'Poppins',sans-serif;font-size:13px;color:#222;margin-bottom:6px;outline:none}
        .fm-input:focus{border-color:#38388E}
        .fm-btn-start{width:100%;background:#ED3B62;color:#fff;border:none;border-radius:8px;padding:11px;font-family:'Poppins',sans-serif;font-size:14px;font-weight:600;cursor:pointer;margin-top:2px}
        .fm-btn-start:hover{opacity:.9}
        .fm-body{padding:16px;display:none}
        .fm-qnum{font-size:10px;color:#888;font-weight:600;letter-spacing:.5px;margin-bottom:5px}
        .hab-tag{font-size:10px;font-weight:600;padding:2px 8px;border-radius:20px;display:inline-block;margin-bottom:8px}
        .hab-rp{background:#E6F1FB;color:#0C447C}
        .hab-m{background:#EAF3DE;color:#27500A}
        .hab-r{background:#EEEDFE;color:#3C3489}
        .hab-a{background:#FAEEDA;color:#633806}
        .fm-qtxt{font-size:15px;color:#1a1a1a;line-height:1.6;margin-bottom:14px}
        .fm-fig{margin:0 0 14px;text-align:center}
        .fm-fig svg{max-width:100%;height:auto}
        .otxt svg{max-width:100%;height:auto;vertical-align:middle}
        .opt{display:flex;align-items:center;gap:10px;padding:9px 12px;border:.5px solid #e0e0e0;border-radius:8px;margin-bottom:7px;cursor:pointer;background:#fff;transition:all .15s}
        .opt:hover{border-color:#0187F3;background:#EBF4FE}
        .opt.sel{border-color:#38388E;background:#EEEDFE}
        .opt.ok{border-color:#1D9E75;background:#E1F5EE;pointer-events:none}
        .opt.mal{border-color:#E24B4A;background:#FCEBEB;pointer-events:none}
        .opt.show{border-color:#1D9E75;background:#E1F5EE;pointer-events:none}
        .opt.dis{pointer-events:none;opacity:.65}
        .opt.nls{border-style:dashed}
        .opt.nls:hover,.opt.nls.sel{border-color:#888;background:#f5f5f7}
        .letra{width:26px;height:26px;border-radius:50%;border:.5px solid #ddd;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:#888;flex-shrink:0}
        .opt.ok .letra{background:#1D9E75;color:#fff;border-color:#1D9E75}
        .opt.mal .letra{background:#E24B4A;color:#fff;border-color:#E24B4A}
        .opt.show .letra{background:#1D9E75;color:#fff;border-color:#1D9E75}
        .otxt{font-size:14px;color:#1a1a1a;line-height:1.4}
        .opt.nls .otxt{color:#aaa;font-style:italic}
        .fb{border-radius:8px;padding:12px 14px;margin-top:10px;font-size:13px;line-height:1.7;display:none}
        .fb.ok{background:#E1F5EE;color:#085041;border:.5px solid #5DCAA5}
        .fb.mal{background:#FCEBEB;color:#791F1F;border:.5px solid #F09595}
        .fb.nls{background:#f5f5f7;color:#5F5E5A;border:.5px solid #ddd}
        .btns{margin-top:16px;display:flex;gap:10px;flex-wrap:wrap}
        .btn-p{background:#38388E;color:#fff;border:none;border-radius:8px;padding:10px 22px;font-family:'Poppins',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:opacity .15s}
        .btn-p:disabled{opacity:.35;cursor:not-allowed}
        .btn-p:hover:not(:disabled){opacity:.85}
        .btn-s{background:transparent;color:#38388E;border:.5px solid #38388E;border-radius:8px;padding:10px 22px;font-family:'Poppins',sans-serif;font-size:14px;font-weight:500;cursor:pointer;display:none}
        .btn-s:hover{background:#EEEDFE}
        .final{text-align:center;padding:8px 0;display:none}
        .pje-big{font-size:38px;font-weight:600;color:#38388E}
        .pje-sub{font-size:14px;color:#888;margin:4px 0 14px}
        .alerta{border-radius:10px;padding:14px 16px;margin-bottom:16px;font-size:13px;line-height:1.6;text-align:left}
        .alerta.rep{background:#FAEEDA;border:.5px solid #EF9F27;color:#412402}
        .alerta.bien{background:#E1F5EE;border:.5px solid #5DCAA5;color:#04342C}
        .dots{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-bottom:16px}
        .dot{width:12px;height:12px;border-radius:50%;background:#ddd}
        .dot.ok{background:#1D9E75}
        .dot.mal{background:#E24B4A}
        .dot.nls{background:#888780}
        .resumen{background:#f5f5f7;border-radius:8px;padding:14px 16px;text-align:left;margin-bottom:16px}
        .res-titulo{font-size:13px;font-weight:600;color:#1a1a1a;margin-bottom:8px}
        .res-fila{font-size:12px;line-height:2.1}
        .fm-footer{background:#38388E;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px}
        .fm-footer-copy{font-size:11px;color:rgba(255,255,255,.7)}
        .fm-footer-link{font-size:11px;color:rgba(255,255,255,.75);text-decoration:none}
        .fm-footer-link:hover{color:#fff}
      </style>
      <div class="fm-wrap">
        <div class="fm-card">
          <div class="fm-hdr">
            <div class="fm-hdr-top">
              <div class="fm-hdr-left">
                <span class="fm-badge">Flash Mate · ${escapeHtml(CFG.guia || 'Guía')}</span>
                <div class="fm-eje">EJE: ${escapeHtml(CFG.ejeNombre || CFG.eje || '')} · UNIDAD ${escapeHtml(CFG.unidadNum || '')}</div>
                <div class="fm-titulo">${escapeHtml(CFG.titulo || CFG.guia || 'Guía')}</div>
                <div class="fm-sub">${escapeHtml(CFG.sub || '')}</div>
              </div>
              <img class="fm-hdr-logo" src="/flashmate/logo-erika.png" alt="Erika la Profe de Mate" onerror="this.style.display='none'">
            </div>
            <div class="prog-bg"><div class="prog-bar" id="barra" style="width:0%"></div></div>
          </div>
          <div class="fm-ident" id="zona-ident">
            <div class="fm-ident-titulo">ANTES DE COMENZAR</div>
            <input class="fm-input" type="text" id="inp-nombre" placeholder="Tu nombre completo">
            <input class="fm-input" type="email" id="inp-correo" placeholder="Tu correo electrónico">
            <div id="error-ident" style="font-size:12px;color:#E24B4A;margin-bottom:6px;display:none">Por favor completa tu nombre y correo.</div>
            <button class="fm-btn-start" id="btn-start">Comenzar guía →</button>
          </div>
          <div class="fm-body" id="zona-q">
            <div class="fm-qnum" id="qnum">Pregunta 1 de 8</div>
            <div id="htag"></div>
            <div class="fm-qtxt" id="qtxt"></div>
            <div class="fm-fig" id="qfig"></div>
            <div id="opts"></div>
            <div class="fb" id="fb"></div>
            <div class="btns">
              <button class="btn-p" id="btnc" disabled>Confirmar</button>
              <button class="btn-s" id="btns">Siguiente →</button>
            </div>
          </div>
          <div class="fm-body final" id="zona-final">
            <div class="pje-big" id="pje"></div>
            <div class="pje-sub" id="pmsg"></div>
            <div class="alerta" id="alerta"></div>
            <div class="dots" id="dots"></div>
            <div class="resumen">
              <div class="res-titulo">Detalle por pregunta</div>
              <div id="reslista" class="res-fila"></div>
            </div>
            <div class="btns" style="justify-content:center">
              <button class="btn-p" id="btn-rep">Repetir con valores nuevos</button>
            </div>
          </div>
          <div class="fm-footer">
            <span class="fm-footer-copy">© 2026 Erika la Profe de Mate</span>
            <a href="https://www.erikalaprofedemate.com" class="fm-footer-link" target="_blank">www.erikalaprofedemate.com</a>
          </div>
        </div>
      </div>
    `;
  }

  function elegir(i) {
    if (document.getElementById('btnc').style.display === 'none') return;
    document.querySelectorAll('.opt').forEach(d => d.classList.remove('sel'));
    document.getElementById('op' + i).classList.add('sel');
    seleccion = i;
    document.getElementById('btnc').disabled = false;
  }

  function render() {
    const e = ejercicios[actual];
    document.getElementById('qnum').textContent = `Pregunta ${actual + 1} de ${ejercicios.length}`;
    document.getElementById('barra').style.width = ((actual + 1) / ejercicios.length * 100) + '%';
    document.getElementById('htag').innerHTML = `<span class="hab-tag ${hcss(e.hab)}">${escapeHtml(e.hab)}</span>`;
    const qtxt = document.getElementById('qtxt');
    qtxt.innerHTML = escapeHtml(e.txt).replace(/\n/g, '<br>');
    renderMath(qtxt);
    // figura del enunciado: la guia la deja en e.fig como SVG ya armado
    const qfig = document.getElementById('qfig');
    qfig.innerHTML = e.fig || '';

    seleccion = null;
    const od = document.getElementById('opts');
    od.innerHTML = '';
    e.ops.forEach((o, i) => {
      const d = document.createElement('div');
      d.className = 'opt';
      d.id = 'op' + i;
      // con rawOpts la alternativa ES un dibujo (SVG que armo la guia), no texto
      const cuerpo = e.rawOpts ? o : escapeHtml(o);
      d.innerHTML = `<div class="letra">${LETRAS[i]}</div><span class="otxt">${cuerpo}</span>`;
      d.onclick = () => elegir(i);
      od.appendChild(d);
      renderMath(d);
    });

    const nls = document.createElement('div');
    nls.className = 'opt nls';
    nls.id = 'op4';
    nls.innerHTML = `<div class="letra" style="border-style:dashed">E</div><span class="otxt">No lo sé</span>`;
    nls.onclick = () => elegir(4);
    od.appendChild(nls);

    const fb = document.getElementById('fb');
    fb.style.display = 'none';
    fb.innerHTML = '';
    document.getElementById('btnc').style.display = 'inline-block';
    document.getElementById('btnc').disabled = true;
    document.getElementById('btns').style.display = 'none';
  }

  function confirmar() {
    if (seleccion === null) return;
    const e = ejercicios[actual];
    respuestas[actual] = seleccion;
    const esNls = seleccion === NLS;
    const esOk = !esNls && seleccion === e.ok;

    document.querySelectorAll('.opt').forEach((d, i) => {
      d.onclick = null;
      if (i === NLS) {
        d.className = 'opt nls dis';
        return;
      }
      if (i === e.ok) d.className = 'opt ' + (esOk ? 'ok' : 'show');
      else if (i === seleccion && !esOk && !esNls) d.className = 'opt mal';
      else d.className = 'opt dis';
    });

    const fb = document.getElementById('fb');
    const mensaje = esNls
      ? (e.rawOpts
        ? `La respuesta correcta es ${LETRAS[e.ok]}. ${e.fb_mal}`
        : `La respuesta correcta es ${LETRAS[e.ok]}: ${e.ops[e.ok]}. ${e.fb_mal}`)
      : (esOk ? e.fb_ok : e.fb_mal);
    fb.className = 'fb ' + (esNls ? 'nls' : (esOk ? 'ok' : 'mal'));
    fb.innerHTML = escapeHtml(mensaje).replace(/\n/g, '<br>');
    fb.style.display = 'block';
    renderMath(fb);

    document.getElementById('btnc').style.display = 'none';
    const bs = document.getElementById('btns');
    bs.style.display = 'inline-block';
    bs.textContent = actual < ejercicios.length - 1 ? 'Siguiente →' : 'Ver resultados →';
  }

  function siguiente() {
    if (actual < ejercicios.length - 1) {
      actual++;
      render();
    } else {
      mostrarFinal();
    }
  }

  function registrar(correctas, incorrectas, nls, pct) {
    if (window._modoDocente) return;
    const correo = document.getElementById('inp-correo').value.trim();
    const fecha = new Date().toLocaleDateString('es-CL', { timeZone: 'America/Santiago' });
    const habs = CFG.HAB_E || ejercicios.map(e => e.hab);
    const ejVals = respuestas.map((r, i) => r === NLS ? 2 : (r === ejercicios[i].ok ? 1 : 0));
    const falladas = [];

    respuestas.forEach((r, i) => {
      if (r !== ejercicios[i].ok && !falladas.includes(habs[i])) falladas.push(habs[i]);
    });

    const habCorr = { 'Resolver problemas': 0, 'Modelar': 0, 'Representar': 0, 'Argumentar': 0 };
    const habTot = { 'Resolver problemas': 0, 'Modelar': 0, 'Representar': 0, 'Argumentar': 0 };

    habs.forEach((h, i) => {
      habTot[h] = (habTot[h] || 0) + 1;
      if (ejVals[i] === 1) habCorr[h] = (habCorr[h] || 0) + 1;
    });

    const logroResolver = habTot['Resolver problemas'] ? Math.round(habCorr['Resolver problemas'] / habTot['Resolver problemas'] * 100) / 100 : '';
    const logroModelar = habTot['Modelar'] ? Math.round(habCorr['Modelar'] / habTot['Modelar'] * 100) / 100 : '';
    const logroRepresentar = habTot['Representar'] ? Math.round(habCorr['Representar'] / habTot['Representar'] * 100) / 100 : '';
    const logroArgumentar = habTot['Argumentar'] ? Math.round(habCorr['Argumentar'] / habTot['Argumentar'] * 100) / 100 : '';

    const params = [
      'fecha=' + encodeURIComponent(fecha),
      'nombre=' + encodeURIComponent(nombreEstudiante),
      'correo=' + encodeURIComponent(correo),
      'tipo=individual',
      'grupo=NA',
      'guia=' + encodeURIComponent(CFG.guia || ''),
      'eje=' + encodeURIComponent(CFG.eje || ''),
      'unidad=' + encodeURIComponent(CFG.unidad || ''),
      'subunidad=' + encodeURIComponent(CFG.subunidad || ''),
      'nivel=' + encodeURIComponent(CFG.nivel || ''),
      'correctas=' + correctas,
      'incorrectas=' + incorrectas,
      'nls=' + nls,
      'logro=' + (pct / 100),
      'habilidades=' + encodeURIComponent(falladas.join('|')),
      'logro_resolver=' + logroResolver,
      'logro_modelar=' + logroModelar,
      'logro_representar=' + logroRepresentar,
      'logro_argumentar=' + logroArgumentar
    ];

    ejVals.forEach((v, i) => params.push(`e${i + 1}=${v}`));

    const img = new Image();
    img.src = SCRIPT_URL + '?' + params.join('&');
  }

  function mostrarFinal() {
    document.getElementById('zona-q').style.display = 'none';
    document.getElementById('zona-final').style.display = 'block';
    document.getElementById('barra').style.width = '100%';

    const correctas = respuestas.filter((r, i) => r === ejercicios[i].ok).length;
    const nls = respuestas.filter(r => r === NLS).length;
    const incorrectas = ejercicios.length - correctas - nls;
    const pct = Math.round(correctas / ejercicios.length * 100);

    document.getElementById('pje').textContent = `${correctas} / ${ejercicios.length} correctas`;
    document.getElementById('pmsg').textContent = `${pct}% de logro${nls > 0 ? ` · ${nls} sin responder` : ''}`;

    const alerta = document.getElementById('alerta');
    const alto = pct >= 75;
    alerta.className = 'alerta ' + (alto ? 'bien' : 'rep');
    alerta.innerHTML = alto
      ? `<strong>¡Muy bien, ${escapeHtml(nombreEstudiante)}!</strong><br>Ya puedes seguir avanzando con confianza.`
      : `<strong>Buen intento, ${escapeHtml(nombreEstudiante)}.</strong><br>Repite la guía y vuelve a intentarlo para afirmarla mejor.`;

    const dots = document.getElementById('dots');
    dots.innerHTML = '';
    respuestas.forEach((r, i) => {
      const d = document.createElement('div');
      d.className = 'dot ' + (r === ejercicios[i].ok ? 'ok' : (r === NLS ? 'nls' : 'mal'));
      dots.appendChild(d);
    });

    document.getElementById('reslista').innerHTML = respuestas.map((r, i) => {
      const ok = r === ejercicios[i].ok;
      const esNls = r === NLS;
      const color = ok ? '#085041' : (esNls ? '#5F5E5A' : '#791F1F');
      const icono = ok ? '✓' : (esNls ? '?' : '✗');
      const txt = ok ? 'Correcta' : (esNls ? `No lo sé — correcta: ${LETRAS[ejercicios[i].ok]}` : `Incorrecta — correcta: ${LETRAS[ejercicios[i].ok]}`);
      return `<div style="color:${color}">${icono} P${i + 1} (${escapeHtml(ejercicios[i].hab)}): ${escapeHtml(txt)}</div>`;
    }).join('');

    registrar(correctas, incorrectas, nls, pct);
  }

  function iniciar() {
    const nom = document.getElementById('inp-nombre').value.trim();
    const cor = document.getElementById('inp-correo').value.trim();
    const err = document.getElementById('error-ident');
    if (!nom || !cor) {
      err.textContent = 'Por favor completa tu nombre y correo.';
      err.style.display = 'block';
      return;
    }
    if (!validarCorreo(cor)) {
      err.textContent = 'Por favor ingresa un correo válido.';
      err.style.display = 'block';
      return;
    }
    err.style.display = 'none';
    nombreEstudiante = nom;
    document.getElementById('zona-ident').style.display = 'none';
    document.getElementById('zona-q').style.display = 'block';
    ejercicios = typeof CFG.generar === 'function' ? CFG.generar() : [];
    respuestas = new Array(ejercicios.length).fill(null);
    actual = 0;
    seleccion = null;
    render();
  }

  function reiniciar() {
    ejercicios = typeof CFG.generar === 'function' ? CFG.generar() : [];
    respuestas = new Array(ejercicios.length).fill(null);
    actual = 0;
    seleccion = null;
    document.getElementById('zona-final').style.display = 'none';
    document.getElementById('zona-q').style.display = 'block';
    render();
  }

  function autoIdentificar() {
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get('nombre');
    const correo = params.get('correo');
    const modo = params.get('modo');

    if (modo === 'docente') {
      window._modoDocente = true;
      document.getElementById('inp-nombre').value = 'Vista docente';
      document.getElementById('inp-correo').value = 'docente@flashmate.local';
      iniciar();
      return;
    }

    if (nombre && correo) {
      document.getElementById('inp-nombre').value = nombre;
      document.getElementById('inp-correo').value = correo;
      iniciar();
    }
  }

  // ────────────────────────────────────────────────────────────────
  // FIGURAS
  // Las guías de FlashMate llaman a estas funciones para ilustrar el
  // enunciado (e.fig = TRI({...})) o para que la alternativa MISMA sea
  // un dibujo (e.rawOpts = true). Cada una devuelve una cadena SVG.
  //
  // Criterio, tomado de la RN que ya venía escrita dentro de U06.B.5b:
  // viewBox + width fijo, role="img" con <title>/<desc> para lectores de
  // pantalla, y B/N-safe — el color nunca es el único que distingue: lo
  // buscado va además en cursiva, lo transformado va punteado, y lo
  // abierto/cerrado va por relleno.
  // ────────────────────────────────────────────────────────────────
  const F_EST = '#1a1a1a';   // estructura (ejes, aristas)
  const F_DATO = '#0187F3';  // lo que el enunciado entrega
  const F_INC = '#ED3B62';   // lo que hay que encontrar
  const F_AUX = '#9aa0a6';   // apoyo (grilla, líneas guía)
  const F_CARA = '#eef4fb';  // relleno suave de cuerpos

  function fCol(role) {
    return role === 'incog' ? F_INC : role === 'dato' ? F_DATO : role === 'aux' ? F_AUX : F_EST;
  }

  function fEsc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // etiqueta de texto; la incógnita va en cursiva para que se distinga sin color
  function fTxt(x, y, lab, extra) {
    if (!lab) return '';
    const t = typeof lab === 'string' ? { t: lab, role: 'fig' } : lab;
    if (t.t == null || t.t === '') return '';
    const it = t.role === 'incog' ? ' font-style="italic" font-weight="600"' : '';
    return '<text x="' + x + '" y="' + y + '" font-family="sans-serif" font-size="13" fill="'
      + fCol(t.role) + '"' + it + ' text-anchor="' + ((extra && extra.anchor) || 'middle')
      + '"' + ((extra && extra.extra) || '') + '>' + fEsc(t.t) + '</text>';
  }

  function fAbre(w, h, titulo, desc, ancho) {
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + (ancho || Math.min(w, 320))
      + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + fEsc(titulo) + '">'
      + '<title>' + fEsc(titulo) + '</title><desc>' + fEsc(desc || '') + '</desc>';
  }

  // ── Triángulo rectángulo ────────────────────────────────────────
  // Ángulo recto abajo a la izquierda. baseL: cateto horizontal,
  // vertL: cateto vertical, hipL: hipotenusa, angB: ángulo de la base.
  function TRI(cfg) {
    const W = 300, H = 190, M = 40;
    const k = Math.min((W - 2 * M) / cfg.base, (H - 2 * M) / cfg.height);
    const b = cfg.base * k, h = cfg.height * k;
    const x0 = (W - b) / 2, y0 = (H + h) / 2;      // vértice del ángulo recto
    const xB = x0 + b, yC = y0 - h;
    let s = fAbre(W, H, 'Triángulo rectángulo', cfg.desc);
    s += '<polygon points="' + x0 + ',' + y0 + ' ' + xB + ',' + y0 + ' ' + x0 + ',' + yC
      + '" fill="' + F_CARA + '" stroke="' + F_EST + '" stroke-width="1.8" stroke-linejoin="round"/>';
    // marca de ángulo recto
    s += '<path d="M' + (x0 + 13) + ',' + y0 + ' L' + (x0 + 13) + ',' + (y0 - 13) + ' L' + x0 + ',' + (y0 - 13)
      + '" fill="none" stroke="' + F_EST + '" stroke-width="1.3"/>';
    if (cfg.angB) {
      // el arco y su rótulo van EN LA BISECTRIZ del vértice B, a distancia
      // proporcional: con un desplazamiento fijo, en triángulos angostos el
      // rótulo se encabalgaba con la marca del ángulo recto.
      const ang = Math.atan2(h, b);
      const r = Math.max(16, Math.min(28, b * 0.42, Math.hypot(b, h) * 0.28));
      s += '<path d="M' + (xB - r) + ',' + y0 + ' A' + r + ',' + r + ' 0 0 1 '
        + (xB - r * Math.cos(ang)).toFixed(1) + ',' + (y0 - r * Math.sin(ang)).toFixed(1)
        + '" fill="none" stroke="' + fCol(cfg.angB.role) + '" stroke-width="1.5"/>';
      const bis = ang / 2;                       // bisectriz hacia el interior
      s += fTxt(xB - (r + 17) * Math.cos(bis), y0 - (r + 17) * Math.sin(bis) + 5,
        cfg.angB, { anchor: 'middle' });
    }
    s += fTxt(x0 + b / 2, y0 + 20, cfg.baseL);
    s += fTxt(x0 - 12, y0 - h / 2 + 5, cfg.vertL, { anchor: 'end' });
    s += fTxt(x0 + b / 2 + 16, y0 - h / 2 - 6, cfg.hipL);
    return s + '</svg>';
  }

  // ── Rectángulo / cuadrado ───────────────────────────────────────
  function RECT(cfg) {
    const W = 300, H = 190, M = 42;
    const k = Math.min((W - 2 * M) / cfg.base, (H - 2 * M) / cfg.height);
    const b = cfg.base * k, h = cfg.height * k;
    const x0 = (W - b) / 2, y0 = (H - h) / 2;
    let s = fAbre(W, H, 'Rectángulo', cfg.desc);
    s += '<rect x="' + x0 + '" y="' + y0 + '" width="' + b + '" height="' + h
      + '" fill="' + F_CARA + '" stroke="' + F_EST + '" stroke-width="1.8"/>';
    s += fTxt(x0 + b / 2, y0 + h + 20, cfg.baseL);
    s += fTxt(x0 + b + 12, y0 + h / 2 + 5, cfg.heightL, { anchor: 'start' });
    s += fTxt(x0 + b / 2, y0 + h / 2 + 5, cfg.inner);
    return s + '</svg>';
  }

  // ── Circunferencia con radio o diámetro ─────────────────────────
  function CIRC(cfg) {
    const W = 260, H = 190, cx = W / 2, cy = H / 2, r = 62;
    let s = fAbre(W, H, 'Circunferencia', cfg.desc);
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + F_CARA
      + '" stroke="' + F_EST + '" stroke-width="1.8"/>';
    const rol = (cfg.segL && cfg.segL.role) || 'dato';
    if (cfg.mode === 'diametro') {
      s += '<line x1="' + (cx - r) + '" y1="' + cy + '" x2="' + (cx + r) + '" y2="' + cy
        + '" stroke="' + fCol(rol) + '" stroke-width="2.2"/>';
      s += fTxt(cx, cy - 9, cfg.segL);
    } else {
      s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + r) + '" y2="' + cy
        + '" stroke="' + fCol(rol) + '" stroke-width="2.2"/>';
      s += fTxt(cx + r / 2, cy - 9, cfg.segL);
    }
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="3" fill="' + F_EST + '"/>';
    if (cfg.oLabel) s += fTxt(cx - 11, cy + 16, { t: 'O', role: 'fig' });
    return s + '</svg>';
  }

  // ── Paralelepípedo (perspectiva oblicua) ────────────────────────
  // a = frente, b = profundidad, c = alto. diag: diagonal del cuerpo.
  function BOX(cfg) {
    // MD deja aire a la derecha y arriba para los rótulos: con el cuerpo
    // centrado a secas, el de la profundidad se salía del lienzo y llegaba
    // cortado ("20" se leía "0").
    const W = 300, H = 210, MD = 34, MT = 14;
    const k = Math.min((W - MD - 40) / Math.max(cfg.a + cfg.b * 0.62, 1),
      (H - MT - 44) / Math.max(cfg.c + cfg.b * 0.62, 1));
    const a = cfg.a * k, c = cfg.c * k, d = cfg.b * k * 0.62;   // 0.62: escorzo
    const x0 = (W - MD - a - d) / 2, y0 = (H - MT - c - d) / 2 + d + MT;
    const X = x0 + a, Y = y0 + c;
    let s = fAbre(W, H, 'Paralelepípedo', cfg.desc);
    // cara superior y lateral (más claras), luego el frente
    s += '<polygon points="' + x0 + ',' + y0 + ' ' + (x0 + d) + ',' + (y0 - d) + ' '
      + (X + d) + ',' + (y0 - d) + ' ' + X + ',' + y0 + '" fill="#e3ecf7" stroke="' + F_EST + '" stroke-width="1.5"/>';
    s += '<polygon points="' + X + ',' + y0 + ' ' + (X + d) + ',' + (y0 - d) + ' '
      + (X + d) + ',' + (Y - d) + ' ' + X + ',' + Y + '" fill="#d9e6f5" stroke="' + F_EST + '" stroke-width="1.5"/>';
    s += '<rect x="' + x0 + '" y="' + y0 + '" width="' + a + '" height="' + c
      + '" fill="' + F_CARA + '" stroke="' + F_EST + '" stroke-width="1.8"/>';
    if (cfg.diag) {
      s += '<line x1="' + x0 + '" y1="' + Y + '" x2="' + (X + d) + '" y2="' + (y0 - d)
        + '" stroke="' + fCol((cfg.diagL && cfg.diagL.role) || 'incog') + '" stroke-width="2" stroke-dasharray="5 3"/>';
      s += fTxt((x0 + X + d) / 2 + 6, (Y + y0 - d) / 2 - 9, cfg.diagL);
    }
    s += fTxt(x0 + a / 2, Y + 19, cfg.aL);                          // frente
    s += fTxt(X + d + 9, y0 + c / 2 + 5, cfg.cL, { anchor: 'start' }); // alto
    // La profundidad va al FINAL de su arista, fuera del cuerpo. Sobre la
    // arista misma no hay lugar: es la silueta, y el rótulo se monta en la
    // línea o se sale del lienzo (por eso MD reserva aire a la derecha).
    s += fTxt(X + d + 7, y0 - d + 5, cfg.bL, { anchor: 'start' });
    return s + '</svg>';
  }

  // ── Cilindro ────────────────────────────────────────────────────
  function CYL(cfg) {
    const W = 260, H = 210, cx = W / 2, rx = 52, ry = 17;
    const top = 42, bot = H - 40, h = bot - top;
    let s = fAbre(W, H, 'Cilindro', cfg.desc);
    s += '<path d="M' + (cx - rx) + ',' + top + ' L' + (cx - rx) + ',' + bot
      + ' A' + rx + ',' + ry + ' 0 0 0 ' + (cx + rx) + ',' + bot
      + ' L' + (cx + rx) + ',' + top + ' Z" fill="' + F_CARA + '" stroke="' + F_EST + '" stroke-width="1.7"/>';
    s += '<ellipse cx="' + cx + '" cy="' + top + '" rx="' + rx + '" ry="' + ry
      + '" fill="#e3ecf7" stroke="' + F_EST + '" stroke-width="1.7"/>';
    const rol = (cfg.rL && cfg.rL.role) || 'dato';
    if (cfg.mode === 'diametro') {
      s += '<line x1="' + (cx - rx) + '" y1="' + top + '" x2="' + (cx + rx) + '" y2="' + top
        + '" stroke="' + fCol(rol) + '" stroke-width="2"/>';
      s += fTxt(cx, top - 8, cfg.rL);
    } else {
      s += '<line x1="' + cx + '" y1="' + top + '" x2="' + (cx + rx) + '" y2="' + top
        + '" stroke="' + fCol(rol) + '" stroke-width="2"/>';
      s += fTxt(cx + rx / 2, top - 8, cfg.rL);
    }
    s += '<circle cx="' + cx + '" cy="' + top + '" r="2.6" fill="' + F_EST + '"/>';
    // cota de la altura, con topes: una línea suelta al lado no se lee como medida
    const hx = cx + rx + 16, colh = fCol((cfg.hL && cfg.hL.role) || 'dato');
    s += '<line x1="' + hx + '" y1="' + top + '" x2="' + hx + '" y2="' + bot
      + '" stroke="' + colh + '" stroke-width="1.6"/>';
    s += '<line x1="' + (hx - 4) + '" y1="' + top + '" x2="' + (hx + 4) + '" y2="' + top
      + '" stroke="' + colh + '" stroke-width="1.6"/>';
    s += '<line x1="' + (hx - 4) + '" y1="' + bot + '" x2="' + (hx + 4) + '" y2="' + bot
      + '" stroke="' + colh + '" stroke-width="1.6"/>';
    s += fTxt(hx + 8, (top + bot) / 2 + 4, cfg.hL, { anchor: 'start' });
    return s + '</svg>';
  }

  // ── Cuerpo formado por cubos unitarios (isométrica) ─────────────
  // lista: [[x,y,z], ...]  ·  cfg.ghost: cubos punteados (extraídos)
  function CUBES(lista, cfg) {
    cfg = cfg || {};
    const W = 300, H = 220, u = 26;
    const ghost = cfg.ghost || [];
    const todos = lista.concat(ghost);
    const proj = (p) => [(p[0] - p[1]) * u * 0.866, (p[0] + p[1]) * u * 0.5 - p[2] * u];
    let minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
    todos.forEach((p) => {
      [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]].forEach((d) => {
        const q = proj([p[0] + d[0], p[1] + d[1], p[2] + d[2]]);
        minx = Math.min(minx, q[0]); maxx = Math.max(maxx, q[0]);
        miny = Math.min(miny, q[1]); maxy = Math.max(maxy, q[1]);
      });
    });
    const ox = (W - (maxx - minx)) / 2 - minx, oy = (H - (maxy - miny)) / 2 - miny;
    let s = fAbre(W, H, 'Cuerpo formado por cubos', cfg.desc);

    function cubo(p, fantasma) {
      const P = (dx, dy, dz) => {
        const q = proj([p[0] + dx, p[1] + dy, p[2] + dz]);
        return (q[0] + ox).toFixed(1) + ',' + (q[1] + oy).toFixed(1);
      };
      const op = fantasma ? ' fill-opacity="0.18" stroke-dasharray="4 3"' : '';
      let g = '';
      // Con esta proyección el ojo está en la dirección (+x,+y,+z): las caras
      // que se ven son z=1 (arriba), x=1 (derecha) e y=1 (izquierda). Dibujar
      // x=0 / y=0 pinta el INTERIOR y el cuerpo se lee como una flecha.
      g += '<polygon points="' + P(0, 0, 1) + ' ' + P(1, 0, 1) + ' ' + P(1, 1, 1) + ' ' + P(0, 1, 1)
        + '" fill="#eef4fb" stroke="' + F_EST + '" stroke-width="1.3"' + op + '/>';   // arriba
      g += '<polygon points="' + P(1, 0, 0) + ' ' + P(1, 0, 1) + ' ' + P(1, 1, 1) + ' ' + P(1, 1, 0)
        + '" fill="#cfe0f2" stroke="' + F_EST + '" stroke-width="1.3"' + op + '/>';   // derecha
      g += '<polygon points="' + P(0, 1, 0) + ' ' + P(0, 1, 1) + ' ' + P(1, 1, 1) + ' ' + P(1, 1, 0)
        + '" fill="#dfe9f6" stroke="' + F_EST + '" stroke-width="1.3"' + op + '/>';   // izquierda
      return g;
    }

    // pintor: los de más atrás primero
    const orden = lista.map((p) => [p, 0]).concat(ghost.map((p) => [p, 1]));
    orden.sort((A, B) => (A[0][0] + A[0][1] + A[0][2]) - (B[0][0] + B[0][1] + B[0][2]));
    orden.forEach((o) => { s += cubo(o[0], o[1]); });
    return s + '</svg>';
  }

  // ── Plano cartesiano: puntos, vectores y polígonos ──────────────
  function GRID(cfg) {
    const u = cfg.unit || 14, M = 16;
    const W = (cfg.xmax - cfg.xmin) * u + 2 * M, H = (cfg.ymax - cfg.ymin) * u + 2 * M;
    const X = (v) => M + (v - cfg.xmin) * u;
    const Y = (v) => H - M - (v - cfg.ymin) * u;
    let s = fAbre(W, H, 'Plano cartesiano', cfg.desc, Math.min(W, 320));
    for (let i = Math.ceil(cfg.xmin); i <= cfg.xmax; i++)
      s += '<line x1="' + X(i) + '" y1="' + M + '" x2="' + X(i) + '" y2="' + (H - M)
        + '" stroke="#e6e9ee" stroke-width="1"/>';
    for (let j = Math.ceil(cfg.ymin); j <= cfg.ymax; j++)
      s += '<line x1="' + M + '" y1="' + Y(j) + '" x2="' + (W - M) + '" y2="' + Y(j)
        + '" stroke="#e6e9ee" stroke-width="1"/>';
    s += '<line x1="' + M + '" y1="' + Y(0) + '" x2="' + (W - M) + '" y2="' + Y(0)
      + '" stroke="' + F_EST + '" stroke-width="1.5"/>';
    s += '<line x1="' + X(0) + '" y1="' + M + '" x2="' + X(0) + '" y2="' + (H - M)
      + '" stroke="' + F_EST + '" stroke-width="1.5"/>';
    s += '<text x="' + (W - M + 2) + '" y="' + (Y(0) + 12) + '" font-family="sans-serif" font-size="11" fill="'
      + F_EST + '">x</text>';
    s += '<text x="' + (X(0) - 12) + '" y="' + (M + 2) + '" font-family="sans-serif" font-size="11" fill="'
      + F_EST + '">y</text>';

    (cfg.polys || []).forEach((p) => {
      const c = fCol(p.role);
      const pts = p.pts.map((q) => X(q[0]) + ',' + Y(q[1])).join(' ');
      s += '<polygon points="' + pts + '" fill="' + c + '" fill-opacity="0.13" stroke="' + c
        + '" stroke-width="2"' + (p.dashed ? ' stroke-dasharray="6 4"' : '') + ' stroke-linejoin="round"/>';
      if (p.t) {
        // junto al vértice más alto, no en el centro: encima de la figura el
        // rótulo se cruza con los lados y no se lee.
        let vx = X(p.pts[0][0]), vy = Y(p.pts[0][1]);
        p.pts.forEach((q) => { if (Y(q[1]) < vy) { vy = Y(q[1]); vx = X(q[0]); } });
        s += fTxt(vx + 4, vy - 7, { t: p.t, role: p.role }, { anchor: 'start' });
      }
    });

    (cfg.vectors || []).forEach((v, i) => {
      const c = fCol(v.role);
      const a = v.from || [0, 0];
      const id = 'fl' + i + '_' + Math.round(Math.random() * 1e6);
      s += '<defs><marker id="' + id + '" markerWidth="9" markerHeight="9" refX="7" refY="3.2" orient="auto">'
        + '<path d="M0,0 L7,3.2 L0,6.4 Z" fill="' + c + '"/></marker></defs>';
      s += '<line x1="' + X(a[0]) + '" y1="' + Y(a[1]) + '" x2="' + X(v.to[0]) + '" y2="' + Y(v.to[1])
        + '" stroke="' + c + '" stroke-width="2.2"' + (v.role === 'aux' ? ' stroke-dasharray="5 4"' : '')
        + ' marker-end="url(#' + id + ')"/>';
      if (v.t) s += fTxt((X(a[0]) + X(v.to[0])) / 2 - 10, (Y(a[1]) + Y(v.to[1])) / 2 - 6, { t: v.t, role: v.role });
    });

    (cfg.points || []).forEach((p) => {
      const c = fCol(p.role);
      s += '<circle cx="' + X(p.at[0]) + '" cy="' + Y(p.at[1]) + '" r="4.2" fill="' + c + '"/>';
      if (p.t) s += fTxt(X(p.at[0]) + 12, Y(p.at[1]) - 8, { t: p.t, role: p.role });
    });
    return s + '</svg>';
  }

  // ── Parábola  y = a(x-h)² + k ───────────────────────────────────
  function PCU(cfg) {
    const W = cfg.w || 240, H = cfg.h2 || 200, u = 18;
    const cx = W / 2 - (cfg.h || 0) * u * 0.35, cy = H / 2 + (cfg.k || 0) * u * 0.35;
    const X = (x) => cx + x * u;
    const Y = (y) => cy - y * u;
    let s = fAbre(W, H, 'Parábola', cfg.desc, W);
    s += '<line x1="4" y1="' + cy + '" x2="' + (W - 4) + '" y2="' + cy + '" stroke="' + F_EST + '" stroke-width="1.4"/>';
    s += '<line x1="' + cx + '" y1="4" x2="' + cx + '" y2="' + (H - 4) + '" stroke="' + F_EST + '" stroke-width="1.4"/>';
    // OJO: nada de `d += ...d.slice(...)`, eso reconcatena la cadena entera y
    // deja el path corrupto (la curva no se dibuja y no avisa).
    let d = '';
    let trazando = false;
    for (let x = -20; x <= 20; x += 0.2) {
      const y = cfg.a * Math.pow(x - (cfg.h || 0), 2) + (cfg.k || 0);
      const px = X(x), py = Y(y);
      if (px < 3 || px > W - 3 || py < 3 || py > H - 3) { trazando = false; continue; }
      d += (trazando ? ' L' : ' M') + px.toFixed(1) + ',' + py.toFixed(1);
      trazando = true;
    }
    if (d) s += '<path d="' + d.trim() + '" fill="none" stroke="' + F_DATO
      + '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>';
    if (cfg.axis) s += '<line x1="' + X(cfg.h || 0) + '" y1="4" x2="' + X(cfg.h || 0) + '" y2="' + (H - 4)
      + '" stroke="' + F_AUX + '" stroke-width="1.4" stroke-dasharray="5 4"/>';
    (cfg.marks || []).forEach((m) => {
      s += '<circle cx="' + X(m[0]) + '" cy="' + Y(m[1]) + '" r="4" fill="' + F_INC + '"/>';
      if (m[2]) s += fTxt(X(m[0]) + 12, Y(m[1]) - 8, { t: m[2], role: 'incog' });
    });
    return s + '</svg>';
  }

  // ── Recta  y = mx + n ───────────────────────────────────────────
  function PCL(cfg) {
    const W = cfg.w || 240, H = Math.round((cfg.w || 240) * 0.83), u = W / 14;
    const cx = W / 2, cy = H / 2;
    const X = (x) => cx + x * u;
    const Y = (y) => cy - y * u;
    let s = fAbre(W, H, 'Recta', cfg.desc, W);
    s += '<line x1="3" y1="' + cy + '" x2="' + (W - 3) + '" y2="' + cy + '" stroke="' + F_EST + '" stroke-width="1.3"/>';
    s += '<line x1="' + cx + '" y1="3" x2="' + cx + '" y2="' + (H - 3) + '" stroke="' + F_EST + '" stroke-width="1.3"/>';
    const xa = -cx / u, xb = cx / u;
    s += '<line x1="' + X(xa) + '" y1="' + Y(cfg.m * xa + cfg.n) + '" x2="' + X(xb) + '" y2="' + Y(cfg.m * xb + cfg.n)
      + '" stroke="' + F_DATO + '" stroke-width="2.4" stroke-linecap="round"/>';
    (cfg.marks || []).forEach((m) => {
      s += '<circle cx="' + X(m[0]) + '" cy="' + Y(m[1]) + '" r="4" fill="' + F_INC + '"/>';
      if (m[2]) s += fTxt(X(m[0]) + 13, Y(m[1]) - 7, { t: m[2], role: 'incog' });
    });
    return s + '</svg>';
  }

  // ── Gráfico esquemático de proporcionalidad ─────────────────────
  // tipo: 'line0' | 'hyper' | 'hconst' | 'parab'
  function PC(tipo, desc) {
    const W = 150, H = 124, M = 14;
    const x0 = M + 6, y0 = H - M - 6;
    let s = fAbre(W, H, 'Gráfico', desc, W);
    s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + (W - 6) + '" y2="' + y0 + '" stroke="' + F_EST + '" stroke-width="1.4"/>';
    s += '<line x1="' + x0 + '" y1="6" x2="' + x0 + '" y2="' + y0 + '" stroke="' + F_EST + '" stroke-width="1.4"/>';
    let d = '';
    if (tipo === 'line0') d = 'M' + x0 + ',' + y0 + ' L' + (W - 12) + ',12';
    else if (tipo === 'hconst') d = 'M' + x0 + ',' + (y0 - 42) + ' L' + (W - 12) + ',' + (y0 - 42);
    else if (tipo === 'parab') {
      d = 'M' + x0 + ',' + y0;
      for (let i = 1; i <= 30; i++) {
        const x = i / 30, px = x0 + x * (W - 12 - x0), py = y0 - Math.pow(x, 2) * (y0 - 12);
        d += ' L' + px.toFixed(1) + ',' + py.toFixed(1);
      }
    } else { // hyper
      d = '';
      for (let i = 0; i <= 40; i++) {
        const x = 0.22 + (i / 40) * 0.95, px = x0 + ((x - 0.22) / 0.95) * (W - 14 - x0), py = y0 - (0.26 / x) * (y0 - 14);
        d += (i ? ' L' : 'M') + px.toFixed(1) + ',' + Math.max(10, py).toFixed(1);
      }
    }
    s += '<path d="' + d + '" fill="none" stroke="' + F_DATO + '" stroke-width="2.4" stroke-linecap="round"/>';
    return s + '</svg>';
  }

  // ── Recta numérica ──────────────────────────────────────────────
  // B/N-safe: abierto/cerrado por relleno, sentido por flecha, valor rotulado.
  // (tal cual venía escrita dentro de la guía U06.B.5b)
  function RN(cfg) {
    const L = 26, R = 314, y = 30, H = 58;
    const px = (v) => Math.round((L + (v - cfg.min) / (cfg.max - cfg.min) * (R - L)) * 10) / 10;
    const bx = px(cfg.bx);
    let s = fAbre(340, H, 'Recta numérica', cfg.desc, 320);
    s += '<line x1="' + (L - 10) + '" y1="' + y + '" x2="' + (R + 10) + '" y2="' + y + '" stroke="#1a1a1a" stroke-width="1.6"/>';
    s += '<polygon points="' + (L - 10) + ',' + y + ' ' + (L - 2) + ',' + (y - 4) + ' ' + (L - 2) + ',' + (y + 4) + '" fill="#1a1a1a"/>';
    s += '<polygon points="' + (R + 10) + ',' + y + ' ' + (R + 2) + ',' + (y - 4) + ' ' + (R + 2) + ',' + (y + 4) + '" fill="#1a1a1a"/>';
    cfg.ticks.forEach(function (t) {
      const tx = px(t);
      s += '<line x1="' + tx + '" y1="' + (y - 4) + '" x2="' + tx + '" y2="' + (y + 4) + '" stroke="#1a1a1a" stroke-width="1.4"/>';
      s += '<text x="' + tx + '" y="' + (y + 18) + '" font-family="sans-serif" font-size="12" fill="#1a1a1a" text-anchor="middle">' + t + '</text>';
    });
    const end = cfg.dir === 'right' ? (R + 2) : (L - 2);
    s += '<line x1="' + bx + '" y1="' + y + '" x2="' + end + '" y2="' + y + '" stroke="#0187f3" stroke-width="4"/>';
    if (cfg.dir === 'right') s += '<polygon points="' + (R + 10) + ',' + y + ' ' + (R + 1) + ',' + (y - 5) + ' ' + (R + 1) + ',' + (y + 5) + '" fill="#0187f3"/>';
    else s += '<polygon points="' + (L - 10) + ',' + y + ' ' + (L - 1) + ',' + (y - 5) + ' ' + (L - 1) + ',' + (y + 5) + '" fill="#0187f3"/>';
    if (cfg.closed) s += '<circle cx="' + bx + '" cy="' + y + '" r="6" fill="#0187f3" stroke="#0187f3" stroke-width="2"/>';
    else s += '<circle cx="' + bx + '" cy="' + y + '" r="6" fill="#ffffff" stroke="#0187f3" stroke-width="2.4"/>';
    return s + '</svg>';
  }

  // ── Etiqueta de precio ──────────────────────────────────────────
  function ETQ(cfg) {
    const W = 250, H = 150;
    let s = fAbre(W, H, 'Etiqueta de precio', cfg.alt || cfg.descripcion, W);
    s += '<rect x="8" y="8" width="' + (W - 16) + '" height="' + (H - 16)
      + '" rx="12" fill="#ffffff" stroke="' + F_EST + '" stroke-width="1.6"/>';
    s += '<circle cx="26" cy="26" r="4.5" fill="none" stroke="' + F_EST + '" stroke-width="1.4"/>';
    s += '<text x="' + (W / 2) + '" y="46" font-family="sans-serif" font-size="14" font-weight="600" fill="'
      + F_EST + '" text-anchor="middle">' + fEsc(cfg.producto || '') + '</text>';
    s += '<text x="' + (W / 2) + '" y="76" font-family="sans-serif" font-size="21" fill="' + F_DATO
      + '" text-anchor="middle">' + fEsc(cfg.precio || '') + '</text>';
    if (cfg.desc) s += '<text x="' + (W / 2) + '" y="102" font-family="sans-serif" font-size="14" fill="'
      + F_EST + '" text-anchor="middle">' + fEsc('Descuento ' + cfg.desc) + '</text>';
    if (cfg.total) s += '<text x="' + (W / 2) + '" y="128" font-family="sans-serif" font-size="16" font-weight="600" font-style="italic" fill="'
      + F_INC + '" text-anchor="middle">' + fEsc('Total: ' + cfg.total) + '</text>';
    return s + '</svg>';
  }

  // elegir una variante al azar (las guías de U01 la traían adentro)
  function rnd(a) { return a[Math.floor(Math.random() * a.length)]; }


  window.armar = armar;
  window.iniciar = iniciar;
  window.confirmar = confirmar;
  window.siguiente = siguiente;
  window.reiniciar = reiniciar;
  // las guias llaman a estas desde su propio ambito: van al global
  window.TRI = TRI; window.RECT = RECT; window.CIRC = CIRC; window.BOX = BOX;
  window.CYL = CYL; window.CUBES = CUBES; window.GRID = GRID; window.PCU = PCU;
  window.PCL = PCL; window.PC = PC; window.RN = RN; window.ETQ = ETQ;
  if (typeof window.rnd !== 'function') window.rnd = rnd;

  crearBase();
  document.getElementById('btn-start').addEventListener('click', iniciar);
  document.getElementById('btnc').addEventListener('click', confirmar);
  document.getElementById('btns').addEventListener('click', siguiente);
  document.getElementById('btn-rep').addEventListener('click', reiniciar);
  autoIdentificar();
})();
