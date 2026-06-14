import React, { useEffect, useState } from 'react';

type FlashmatePageProps = {
  onBack: () => void;
};

// Client ID OAuth (público). Login de Erika para desbloquear el portal docente.
const GOOGLE_CLIENT_ID = '568804580001-snpipfnntq0u828f8fdjjfqov2l36rq1.apps.googleusercontent.com';
const ERIKA_SESSION_KEY = 'fm_erika_auth';
const ERIKA_EMAIL_KEY = 'fm_erika_email';
const SESSION_MS = 30 * 24 * 60 * 60 * 1000;

const topStats = [
  { value: '100', label: 'guias activas' },
  { value: '1000', label: 'ejercicios meta' },
  { value: '4', label: 'ejes de aprendizaje' },
  { value: '16', label: 'unidades' },
];

function ensureGIS(cb: () => void) {
  const w = window as any;
  const ready = () => w.google && w.google.accounts && w.google.accounts.id;
  if (ready()) { cb(); return; }
  if (!document.getElementById('gis-script')) {
    const s = document.createElement('script');
    s.id = 'gis-script';
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true;
    document.head.appendChild(s);
  }
  const wait = () => (ready() ? cb() : setTimeout(wait, 200));
  wait();
}

const FlashmatePage: React.FC<FlashmatePageProps> = ({ onBack }) => {
  const [erikaAuth, setErikaAuth] = useState(false);
  const [mostrarLoginErika, setMostrarLoginErika] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Sesión de Erika (persistida) — desbloquea el portal docente
  useEffect(() => {
    const exp = localStorage.getItem(ERIKA_SESSION_KEY);
    if (exp && parseInt(exp) > Date.now()) setErikaAuth(true);
  }, []);

  // Render del botón de Google cuando Erika pide iniciar sesión
  useEffect(() => {
    if (!mostrarLoginErika || erikaAuth) return;
    let cancelado = false;
    ensureGIS(() => {
      if (cancelado) return;
      const w = window as any;
      w.google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: onErikaLogin });
      const el = document.getElementById('erika-gbtn');
      if (el) {
        el.innerHTML = '';
        w.google.accounts.id.renderButton(el, { type: 'standard', size: 'large', text: 'signin_with', shape: 'pill' });
      }
    });
    return () => { cancelado = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mostrarLoginErika, erikaAuth]);

  async function onErikaLogin(resp: any) {
    setLoginError('');
    try {
      const r = await fetch('/.netlify/functions/verificar-docente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: resp.credential }),
      });
      const data = await r.json();
      if (data.ok) {
        localStorage.setItem(ERIKA_SESSION_KEY, String(Date.now() + SESSION_MS));
        localStorage.setItem(ERIKA_EMAIL_KEY, data.email || '');
        setErikaAuth(true);
        setMostrarLoginErika(false);
      } else {
        setLoginError(data.error || 'Esta cuenta no tiene acceso de docente.');
      }
    } catch {
      setLoginError('Error al iniciar sesion. Intenta de nuevo.');
    }
  }

  function cerrarSesionErika() {
    localStorage.removeItem(ERIKA_SESSION_KEY);
    localStorage.removeItem(ERIKA_EMAIL_KEY);
    setErikaAuth(false);
    setMostrarLoginErika(false);
  }

  return (
    <div className="min-h-screen bg-[#EEF0F8] text-[#1a1a2e]">
      <header className="sticky top-0 z-50 bg-[#38388E] shadow-lg shadow-[#38388E]/20">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
          <button onClick={onBack} title="Volver a Erika la profe de mate" className="flex min-w-0 items-center gap-4">
            <img src="/images/flashmate-logo-erika.png" alt="Erika la Profe de Mate" className="h-12 w-auto shrink-0 object-contain sm:h-14" />
            <div className="hidden text-left sm:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">Sistema FlashMate</p>
              <p className="text-sm font-semibold text-white/80">Acceso a la plataforma</p>
            </div>
          </button>
          <button onClick={onBack} className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-all hover:bg-white hover:text-[#38388E]">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Volver
          </button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#ED3B62]/15 blur-3xl"></div>
          <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[#0187F3]/15 blur-3xl"></div>

          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-16">
            <div className="flex flex-col justify-center">
              <p className="mb-5 text-[10px] font-black uppercase tracking-[0.28em] text-[#ED3B62]">Portal exclusivo</p>
              <h1 className="text-5xl font-extrabold leading-none sm:text-6xl lg:text-7xl">
                <span className="text-[#38388E]">Flash</span>
                <span className="text-[#ED3B62]">Mate</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Plataforma de apoyo para alumnos activos de Erika: guias, practica constante y seguimiento del avance entre clases.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-2xl">
                {topStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-white p-4 text-center shadow-[0_2px_16px_rgba(56,56,142,0.08)]">
                    <div className="text-[28px] font-extrabold text-[#38388E]">{stat.value}</div>
                    <div className="mt-1 text-[10px] leading-tight text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              {/* ── PORTAL ESTUDIANTE (llamativo, siempre visible) ── */}
              <a
                href="/flashmate/portal-estudiante.html"
                className="group relative overflow-hidden rounded-[28px] p-7 no-underline text-white shadow-[0_22px_60px_rgba(237,59,98,0.35)] transition-all hover:-translate-y-1.5 hover:shadow-[0_32px_80px_rgba(237,59,98,0.45)]"
                style={{ background: 'linear-gradient(135deg,#ED3B62 0%,#FF6B8A 55%,#0187F3 140%)' }}
              >
                <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/15 blur-2xl"></div>
                <div className="relative flex items-start gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                    <span className="material-symbols-outlined text-[36px]">menu_book</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">Estudiante</p>
                    <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">Mi portal</h2>
                    <p className="mt-2 text-[15px] leading-6 text-white/90">
                      Entra con tu correo o con Google, abre tu guia de hoy y manten tu practica al dia.
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[12px] font-black uppercase tracking-[0.14em] text-[#ED3B62]">
                      Entrar como estudiante
                      <span className="material-symbols-outlined text-[17px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </div>
                  </div>
                </div>
              </a>

              {/* ── PORTAL DOCENTE (privado, sobrio) ── */}
              {erikaAuth ? (
                <div className="rounded-[28px] border border-[#38388E]/15 bg-white p-7 shadow-[0_12px_36px_rgba(56,56,142,0.10)]">
                  <a href="/flashmate/panel-docente.html" className="group flex items-start gap-5 no-underline">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-[#38388E]">
                      <span className="material-symbols-outlined text-[34px]">folder_managed</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Docente · Erika</p>
                      <h2 className="mt-1 text-2xl font-extrabold text-[#1a1a2e]">Portal docente</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        Estudiantes por curso (3° y 4° medio), asignar guias, seguimiento y gestion de guias.
                      </p>
                      <div className="mt-5 inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.14em] text-[#38388E]">
                        Entrar al portal docente
                        <span className="material-symbols-outlined text-[17px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                      </div>
                    </div>
                  </a>
                  <button onClick={cerrarSesionErika} className="mt-5 text-[12px] font-semibold text-slate-400 underline-offset-2 hover:text-[#ED3B62] hover:underline">
                    Cerrar sesion de Erika
                  </button>
                </div>
              ) : (
                <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_12px_36px_rgba(56,56,142,0.08)]">
                  <div className="flex items-start gap-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                      <span className="material-symbols-outlined text-[34px]">lock</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Privado · Solo Erika</p>
                      <h2 className="mt-1 text-2xl font-extrabold text-[#1a1a2e]">Portal docente</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        Acceso privado de Erika. Inicia sesion con tu cuenta de Google para entrar.
                      </p>
                      {!mostrarLoginErika ? (
                        <button
                          onClick={() => { setMostrarLoginErika(true); setLoginError(''); }}
                          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#38388E] px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-[#2a2a72]"
                        >
                          Soy Erika, iniciar sesion
                          <span className="material-symbols-outlined text-[17px]">login</span>
                        </button>
                      ) : (
                        <div className="mt-5">
                          <div id="erika-gbtn" className="flex"></div>
                          {loginError && <p className="mt-3 rounded-lg bg-red-50 p-3 text-[12px] text-red-700">{loginError}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FlashmatePage;
