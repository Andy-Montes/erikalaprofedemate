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

    seleccion = null;
    const od = document.getElementById('opts');
    od.innerHTML = '';
    e.ops.forEach((o, i) => {
      const d = document.createElement('div');
      d.className = 'opt';
      d.id = 'op' + i;
      d.innerHTML = `<div class="letra">${LETRAS[i]}</div><span class="otxt">${escapeHtml(o)}</span>`;
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
      ? `La respuesta correcta es ${LETRAS[e.ok]}: ${e.ops[e.ok]}. ${e.fb_mal}`
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

  window.armar = armar;
  window.iniciar = iniciar;
  window.confirmar = confirmar;
  window.siguiente = siguiente;
  window.reiniciar = reiniciar;

  crearBase();
  document.getElementById('btn-start').addEventListener('click', iniciar);
  document.getElementById('btnc').addEventListener('click', confirmar);
  document.getElementById('btns').addEventListener('click', siguiente);
  document.getElementById('btn-rep').addEventListener('click', reiniciar);
  autoIdentificar();
})();
