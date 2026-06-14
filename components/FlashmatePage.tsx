import React, { useEffect, useMemo, useState } from 'react';

type FlashmatePageProps = {
  onBack: () => void;
};

type FlashmateView = 'access' | 'admin';

type Guide = {
  cod: string;
  nombre: string;
  unidad: string;
  unidadTitulo: string;
  link: string;
};

const accessCards = [
  {
    href: '/flashmate/portal-estudiante.html',
    icon: 'menu_book',
    label: 'Estudiante',
    title: 'Mi portal',
    description: 'Accede a tu guia de hoy, revisa tu avance y manten la practica activa entre clases.',
    cta: 'Entrar como estudiante',
    color: '#ED3B62',
    bg: 'bg-red-50',
  },
  {
    href: '/flashmate/panel-docente.html',
    icon: 'folder_managed',
    label: 'Docente',
    title: 'Panel de gestion',
    description: 'Asigna guias a tus estudiantes y revisa las que ya completaron.',
    cta: 'Entrar como docente',
    color: '#38388E',
    bg: 'bg-indigo-50',
  },
];

const topStats = [
  { value: '100', label: 'guias activas' },
  { value: '1000', label: 'ejercicios meta' },
  { value: '4', label: 'ejes de aprendizaje' },
  { value: '16', label: 'unidades' },
];

const ADMIN_GUIAS_URL = '/flashmate/admin-guias.html';

const FlashmatePage: React.FC<FlashmatePageProps> = ({ onBack }) => {
  const [view, setView] = useState<FlashmateView>('access');
  const [guides, setGuides] = useState<Guide[]>([]);
  const [guidesError, setGuidesError] = useState(false);

  // Biblioteca: cargar las guías reales desde el catálogo único guias.json
  useEffect(() => {
    fetch('/flashmate/guias.json?t=' + Date.now())
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const list: Guide[] = (data.guias || []).map((g: any) => ({
          cod: g.cod,
          nombre: g.nombre || g.cod,
          unidad: g.unidad || '',
          unidadTitulo: g.unidadTitulo || ('Unidad ' + (g.unidad || '')),
          link: '/flashmate/guia-' + g.cod + '.html',
        }));
        list.sort((a, b) => a.cod.localeCompare(b.cod, 'es', { numeric: true }));
        setGuides(list);
      })
      .catch(() => setGuidesError(true));
  }, []);

  const guidesByUnit = useMemo(() => {
    const map: Record<string, { titulo: string; items: Guide[] }> = {};
    guides.forEach((g) => {
      const key = g.unidad || g.unidadTitulo;
      if (!map[key]) map[key] = { titulo: g.unidadTitulo, items: [] };
      map[key].items.push(g);
    });
    return Object.keys(map)
      .sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))
      .map((k) => map[k]);
  }, [guides]);

  const renderHeader = (subtitle: string, backLabel: string, onBackClick: () => void) => (
    <header className="sticky top-0 z-50 bg-[#38388E] shadow-lg shadow-[#38388E]/20">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <button
          onClick={onBack}
          title="Volver a Erika la profe de mate"
          className="flex min-w-0 items-center gap-4"
        >
          <img
            src="/images/flashmate-logo-erika.png"
            alt="Erika la Profe de Mate"
            className="h-12 w-auto shrink-0 object-contain sm:h-14"
          />
          <div className="hidden text-left sm:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
              Sistema FlashMate
            </p>
            <p className="text-sm font-semibold text-white/80">{subtitle}</p>
          </div>
        </button>

        <button
          onClick={onBackClick}
          className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-all hover:bg-white hover:text-[#38388E]"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          {backLabel}
        </button>
      </div>
    </header>
  );

  // ──────────────────────────────────────────────
  // VISTA ACCESO (puerta de entrada a FlashMate)
  // ──────────────────────────────────────────────
  const accessView = (
    <div className="min-h-screen bg-[#EEF0F8] text-[#1a1a2e]">
      {renderHeader('Acceso exclusivo para alumnos activos', 'Volver', onBack)}

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#ED3B62]/15 blur-3xl"></div>
          <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[#0187F3]/15 blur-3xl"></div>

          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-16">
            <div className="flex flex-col justify-center">
              <p className="mb-5 text-[10px] font-black uppercase tracking-[0.28em] text-[#ED3B62]">
                Portal exclusivo
              </p>
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

            <div className="grid gap-4">
              {accessCards.map((card) => (
                <a
                  key={card.href}
                  href={card.href}
                  className="group rounded-[24px] border border-white bg-white p-6 text-left no-underline shadow-[0_12px_36px_rgba(56,56,142,0.10)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(56,56,142,0.16)]"
                >
                  <div className="flex gap-4">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${card.bg}`} style={{ color: card.color }}>
                      <span className="material-symbols-outlined text-[30px]">{card.icon}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{card.label}</p>
                      <h2 className="mt-1 text-xl font-extrabold text-[#1a1a2e]">{card.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{card.description}</p>
                      <div className="mt-4 flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.14em]" style={{ color: card.color }}>
                        {card.cta}
                        <span className="material-symbols-outlined text-[17px] transition-transform group-hover:translate-x-1">
                          arrow_forward
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}

              <button
                onClick={() => {
                  setView('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group rounded-[24px] border border-[#0187F3]/20 bg-[#F6FAFF] p-6 text-left shadow-[0_12px_36px_rgba(56,56,142,0.08)] transition-all hover:-translate-y-1 hover:border-[#0187F3]/35 hover:shadow-[0_20px_48px_rgba(1,135,243,0.14)]"
              >
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-[#0187F3]">
                    <span className="material-symbols-outlined text-[30px]">library_books</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Erika</p>
                    <h2 className="mt-1 text-xl font-extrabold text-[#1a1a2e]">Gestion de guias</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Sube nuevas guias que prepares y revisa la biblioteca completa de guias disponibles.
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.14em] text-[#0187F3]">
                      Entrar a gestion
                      <span className="material-symbols-outlined text-[17px] transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );

  // ──────────────────────────────────────────────
  // VISTA GESTIÓN DE ERIKA (solo subir guías + biblioteca)
  // ──────────────────────────────────────────────
  const adminView = (
    <div className="min-h-screen bg-[#EEF0F8] text-[#1a1a2e]">
      {renderHeader('Gestion de guias', 'FlashMate', () => {
        setView('access');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })}

      <main className="mx-auto max-w-5xl px-6 py-10 sm:px-8 lg:px-10">
        <div className="mb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#0187F3]">Erika</p>
          <h1 className="mt-1 text-3xl font-extrabold text-[#38388E]">Gestion de guias</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Sube las nuevas guias que prepares y revisa tu biblioteca completa.
          </p>
        </div>

        {/* Subir guía nueva */}
        <a
          href={ADMIN_GUIAS_URL}
          className="group mb-10 block rounded-[24px] border-2 border-[#ED3B62]/20 bg-white p-6 no-underline shadow-[0_12px_36px_rgba(56,56,142,0.10)] transition-all hover:-translate-y-1 hover:border-[#ED3B62]/40 hover:shadow-[0_20px_48px_rgba(237,59,98,0.14)]"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#ED3B62]">
              <span className="material-symbols-outlined text-[30px]">upload_file</span>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-extrabold text-[#1a1a2e]">Subir guia nueva</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Arrastra el archivo HTML de la guia, ponle su codigo y publicala. Quedara en linea en 1-2 minutos.
              </p>
            </div>
            <span className="material-symbols-outlined text-[#ED3B62] transition-transform group-hover:translate-x-1">arrow_forward</span>
          </div>
        </a>

        {/* Biblioteca de guías */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#38388E]">Biblioteca de guias</h2>
          <span className="text-[12px] font-semibold text-slate-400">
            {guides.length} guia{guides.length === 1 ? '' : 's'}
          </span>
        </div>

        {guidesError && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-sm text-red-700">
            No se pudo cargar la biblioteca de guias. Reintenta recargando la pagina.
          </div>
        )}

        {!guidesError && guides.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500">
            Cargando biblioteca de guias...
          </div>
        )}

        <div className="space-y-6">
          {guidesByUnit.map((grupo) => (
            <div key={grupo.titulo} className="rounded-[24px] border border-white bg-white p-6 shadow-[0_12px_36px_rgba(56,56,142,0.08)]">
              <h3 className="mb-4 text-sm font-black uppercase tracking-[0.12em] text-[#38388E]">
                {grupo.titulo}
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {grupo.items.map((g) => (
                  <a
                    key={g.cod}
                    href={g.link}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-[#FAFBFE] px-4 py-3 no-underline transition-colors hover:border-[#0187F3]/30 hover:bg-[#F0F6FF]"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#1a1a2e]">{g.nombre}</p>
                      <p className="text-[11px] font-medium text-slate-400">{g.cod}</p>
                    </div>
                    <span className="material-symbols-outlined text-[18px] text-[#0187F3]">open_in_new</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );

  return view === 'admin' ? adminView : accessView;
};

export default FlashmatePage;
