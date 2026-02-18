import React from "react";

interface ProgramsProps {
  onOpenModal: (url: string) => void;
}

const Programs: React.FC<ProgramsProps> = ({ onOpenModal }) => {
  const infoUrl = "https://formulariogiftcard.fillout.com/erikalaporofedemate";
  const whatsappBase = "https://wa.me/56997439227";

  const waWithProgram = (programName: string) => {
    const msg = `Hola Erika, quiero saber más sobre el programa: ${programName}.`;
    return `${whatsappBase}?text=${encodeURIComponent(msg)}`;
  };

  // Card blanca “wow” (como la que te funcionó bien)
  const wowCard =
    "group relative flex flex-col h-full bg-white rounded-[2rem] border border-white/70 overflow-hidden " +
    "shadow-[0_28px_70px_-45px_rgba(0,0,0,0.40)] " +
    "transition-all duration-500 ease-out transform-gpu will-change-transform " +
    "hover:-translate-y-3 hover:scale-[1.02] " +
    "hover:shadow-[0_60px_140px_-80px_rgba(0,0,0,0.55)] " +
    "active:scale-[0.99]";

  // Botón compacto, sin “show”, sin glow, sin scale
  const infoBtn =
    "flex flex-col items-center justify-center mx-auto bg-brandNavy text-white font-bold " +
    "text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-center " +
    "py-2.5 px-3 rounded-lg leading-tight w-[220px] sm:w-[230px] " +
    "hover:bg-[#162a4f] active:opacity-95";

  return (
    <section className="py-16 lg:py-24 bg-white scroll-mt-24" id="programas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <span className="text-brandNavy font-bold text-[14px] sm:text-[16px] mb-2 block">
            Programas y Modalidades
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-brandNavy leading-tight">
            Elije el <span className="text-brandRed">programa ideal</span> para que tu{" "}
            <span className="text-brandRed">hijo aprenda</span> matemáticas de verdad
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* =======================================================
              BLOQUE ROJO (wrapper overflow-visible para NO cortar pill)
          ======================================================= */}
          <div className="lg:w-1/3 relative overflow-visible pt-2">
            {/* Pill superior */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 bg-white text-brandRed px-7 sm:px-8 py-2.5 rounded-full border-2 border-brandRed shadow-xl">
              <span className="block text-[12px] sm:text-[14px] font-black uppercase tracking-[0.22em] whitespace-nowrap">
                Clases Personalizadas
              </span>
            </div>

            {/* Panel de color (este sí recorta el glow por dentro) */}
            <div className="relative rounded-[3rem] bg-brandRed shadow-inner border-2 border-white/20 overflow-hidden group">
              {/* Glow shine elegante detrás de las cards blancas */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div
                  className="
                    absolute -top-24 -left-44 h-[185%] w-20 rotate-[18deg]
                    bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.12)_24%,rgba(255,255,255,0.88)_50%,rgba(255,255,255,0.12)_76%,transparent_100%)]
                    blur-md opacity-35
                    group-hover:opacity-95 group-hover:translate-x-[660px]
                    transition-all duration-1000 ease-out
                  "
                />
                <div
                  className="
                    absolute -top-24 -left-56 h-[185%] w-32 rotate-[18deg]
                    bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.06)_28%,rgba(255,255,255,0.40)_50%,rgba(255,255,255,0.06)_72%,transparent_100%)]
                    blur-2xl opacity-30
                    group-hover:opacity-75 group-hover:translate-x-[720px]
                    transition-all duration-[1150ms] ease-out
                  "
                />
                <div
                  className="
                    absolute -top-20 -left-52 h-[165%] w-44 rotate-[18deg]
                    bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.03)_30%,rgba(255,255,255,0.24)_50%,rgba(255,255,255,0.03)_70%,transparent_100%)]
                    blur-3xl opacity-24
                    group-hover:opacity-60 group-hover:translate-x-[700px]
                    transition-all duration-[1250ms] ease-out
                  "
                />
              </div>

              <div className="px-8 pt-14 pb-10 relative z-10">
                {/* Card blanca */}
                <div className={`${wowCard} lg:h-[470px]`}>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -left-14 top-8 text-slate-200/40"
                  >
                    <svg viewBox="0 0 120 120" className="h-52 w-52" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M33 78c-9 0-16-7-16-16 0-8 5-14 12-16a15 15 0 0 1 26-12 14 14 0 0 1 22 5c9 0 16 7 16 16 0 8-6 15-14 16"/>
                      <path d="M35 78c2 9 10 15 20 15 7 0 14-3 18-9"/>
                      <path d="M43 45c2 5 1 9-2 13"/>
                      <path d="M58 40c3 6 3 11 0 16"/>
                      <path d="M72 45c3 5 4 10 2 14"/>
                    </svg>
                  </div>
                  <div className="p-7 flex flex-col h-full relative z-10">
                    <div>
                      <h3 className="text-xl sm:text-[22px] font-black text-brandRed mb-2 min-h-[52px]">
                        Comprensión más NEM
                      </h3>
                      <p className="text-brandNavy font-semibold mb-3 text-[16px] min-h-[52px]">
                        Modalidad: 1 a 1
                      </p>

                      <p className="text-slate-600 text-[16px] leading-[1.7] min-h-[168px] -mt-2">
                        Pensada para estudiantes de enseñanza media que necesitan{" "}
                        <strong className="font-semibold text-slate-900">comprender de verdad</strong>.{" "}
                        <strong className="font-semibold text-slate-900">Cerramos vacíos</strong>, ordenamos el aprendizaje
                        y avanzamos con claridad para{" "}
                        <strong className="font-semibold text-slate-900">mejorar notas, NEM y base para la PAES</strong>.
                      </p>
                    </div>

                    <div className="mt-auto pt-4">
                      {/* Alineado en las 3: misma estructura */}
                      <a
                        href={waWithProgram("Comprensión más NEM")}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brandRed font-semibold text-[15px] hover:underline inline-flex items-center gap-2"
                      >
                        Quiero hablar con Erika <span>→</span>
                      </a>

                      <div className="pt-4 flex justify-center">
                        <button onClick={() => onOpenModal(infoUrl)} className={infoBtn}>
                          <span className="block">Quiero más información</span>
                            <span className="block">de este programa</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* fin card */}
              </div>
            </div>
          </div>

          {/* =======================================================
              BLOQUE AZUL (wrapper overflow-visible para NO cortar pill)
          ======================================================= */}
          <div className="lg:w-2/3 relative overflow-visible pt-2">
            {/* Pill superior */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 bg-white text-[#0086f2] px-7 sm:px-8 py-2.5 rounded-full border-2 border-[#0086f2] shadow-xl">
              <span className="block text-[12px] sm:text-[14px] font-black uppercase tracking-[0.22em] whitespace-nowrap">
                Preparación PAES
              </span>
            </div>

            <div className="relative rounded-[3rem] bg-[#0086f2] shadow-inner border-2 border-white/20 overflow-hidden group">
              {/* Glow shine elegante detrás de las cards blancas */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div
                  className="
                    absolute -top-24 -left-48 h-[185%] w-20 rotate-[18deg]
                    bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.12)_24%,rgba(255,255,255,0.88)_50%,rgba(255,255,255,0.12)_76%,transparent_100%)]
                    blur-md opacity-35
                    group-hover:opacity-95 group-hover:translate-x-[880px]
                    transition-all duration-1000 ease-out
                  "
                />
                <div
                  className="
                    absolute -top-24 -left-60 h-[185%] w-32 rotate-[18deg]
                    bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.06)_28%,rgba(255,255,255,0.40)_50%,rgba(255,255,255,0.06)_72%,transparent_100%)]
                    blur-2xl opacity-30
                    group-hover:opacity-75 group-hover:translate-x-[940px]
                    transition-all duration-[1150ms] ease-out
                  "
                />
                <div
                  className="
                    absolute -top-20 -left-56 h-[165%] w-44 rotate-[18deg]
                    bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.03)_30%,rgba(255,255,255,0.24)_50%,rgba(255,255,255,0.03)_70%,transparent_100%)]
                    blur-3xl opacity-24
                    group-hover:opacity-60 group-hover:translate-x-[920px]
                    transition-all duration-[1250ms] ease-out
                  "
                />
              </div>

              <div className="px-8 pt-14 pb-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* PAES GRUPAL */}
                  <div className={`${wowCard} lg:h-[470px]`}>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -left-14 top-8 text-slate-200/40"
                    >
                      <svg viewBox="0 0 120 120" className="h-52 w-52" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M60 14v10" />
                        <path d="M60 96v10" />
                        <path d="M22 60h10" />
                        <path d="M88 60h10" />
                        <path d="M40 52c0-11 9-20 20-20s20 9 20 20c0 7-3 12-8 17-4 4-6 8-6 13h-12c0-5-2-9-6-13-5-5-8-10-8-17z" />
                      </svg>
                    </div>
                    <div className="p-7 flex flex-col h-full relative z-10">
                      <div>
                        <h3 className="text-xl sm:text-[22px] font-black text-brandNavy mb-2 min-h-[52px]">
                          PAES Personalizado
                        </h3>
                        <p className="text-brandNavy font-semibold mb-3 text-[16px] min-h-[52px]">Modalidad: 1 a 1</p>
                        <p className="text-slate-600 text-[16px] leading-[1.7] min-h-[168px]">
                          <strong className="font-semibold text-slate-900">
                            Acompañamiento completamente personalizado
                          </strong>{" "}
                          para preparar la PAES, ajustado al{" "}
                          <strong className="font-semibold text-slate-900">nivel real de tu hijo</strong>{" "}
                          y con foco en{" "}
                          <strong className="font-semibold text-slate-900">mejorar puntaje</strong>.
                        </p>
                      </div>

                      <div className="mt-auto pt-4">
                        <a
                          href={waWithProgram("PAES Personalizado (1 a 1)")}
                          target="_blank"
                          rel="noreferrer"
                          className="text-brandRed font-semibold text-[15px] hover:underline inline-flex items-center gap-2"
                        >
                          Quiero hablar con Erika <span>→</span>
                        </a>

                        <div className="pt-4 flex justify-center">
                          <button onClick={() => onOpenModal(infoUrl)} className={infoBtn}>
                            <span className="block">Quiero más información</span>
                            <span className="block">de este programa</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PAES 1:1 */}
                  <div className={`${wowCard} lg:h-[470px]`}>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -left-14 top-8 text-slate-200/40"
                    >
                      <svg viewBox="0 0 120 120" className="h-52 w-52" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="42" cy="42" r="12" />
                        <circle cx="78" cy="42" r="12" />
                        <path d="M24 88c0-12 10-22 22-22h-8" />
                        <path d="M74 66c12 0 22 10 22 22" />
                        <path d="M44 87c2-10 10-17 20-17s18 7 20 17" />
                      </svg>
                    </div>
                    <div className="p-7 flex flex-col h-full relative z-10">
                      <div>
                        <h3 className="text-xl sm:text-[22px] font-black text-brandNavy mb-2 min-h-[52px]">
                          PAES Confianza Matemática
                        </h3>
                        <p className="text-brandNavy font-semibold mb-3 text-[16px] min-h-[52px]">
                          Modalidad: grupal
                          <span className="block text-[14px] font-semibold leading-tight">(máx. 14 estudiantes)</span>
                        </p>

                        <p className="text-slate-600 text-[16px] leading-[1.7] min-h-[168px]">
                          Trabajamos{" "}
                          <strong className="font-semibold text-slate-900">comprensión y estrategia</strong>{" "}
                          en formato PAES, para avanzar con{" "}
                          <strong className="font-semibold text-slate-900">seguridad</strong>{" "}
                          y{" "}
                          <strong className="font-semibold text-slate-900">mejorar puntaje</strong>.
                        </p>
                      </div>

                      <div className="mt-auto pt-4">
                        <a
                          href={waWithProgram("PAES Confianza Matemática (Grupal)")}
                          target="_blank"
                          rel="noreferrer"
                          className="text-brandRed font-semibold text-[15px] hover:underline inline-flex items-center gap-2"
                        >
                          Quiero hablar con Erika <span>→</span>
                        </a>

                        <div className="pt-4 flex justify-center">
                          <button onClick={() => onOpenModal(infoUrl)} className={infoBtn}>
                            <span className="block">Quiero más información</span>
                            <span className="block">de este programa</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* fin cards */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* fin layout */}
      </div>
    </section>
  );
};

export default Programs;
