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
    "group relative flex flex-col h-full bg-white rounded-[2rem] border border-white/70 " +
    "shadow-[0_28px_70px_-45px_rgba(0,0,0,0.40)] " +
    "transition-all duration-500 ease-out transform-gpu will-change-transform " +
    "hover:-translate-y-3 hover:scale-[1.02] " +
    "hover:shadow-[0_60px_140px_-80px_rgba(0,0,0,0.55)] " +
    "active:scale-[0.99]";

  // Botón compacto, sin “show”, sin glow, sin scale
  const infoBtn =
    "inline-flex flex-col items-center justify-center bg-[#0086f2] text-white font-bold " +
    "text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-center " +
    "py-2.5 px-3 rounded-lg leading-tight w-[220px] sm:w-[230px] " +
    "hover:bg-blue-700 active:opacity-95";

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
            <div className="absolute -top-4 left-6 sm:left-10 z-30 bg-white text-brandRed px-7 py-2.5 rounded-full border-2 border-brandRed shadow-xl">
              <span className="block text-[11px] sm:text-[12px] font-black uppercase tracking-[0.28em] whitespace-nowrap">
                Clases Personalizadas
              </span>
            </div>

            {/* Panel de color (este sí recorta el glow por dentro) */}
            <div className="relative rounded-[3rem] bg-brandRed shadow-inner border-2 border-white/20 overflow-hidden group">
              {/* Glow shine detrás de las cards blancas */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                  className="
                    absolute -inset-y-16 -left-64 w-52 rotate-12
                    bg-gradient-to-b from-white/0 via-white/75 to-white/0
                    blur-md opacity-40
                    group-hover:opacity-100 group-hover:translate-x-[720px]
                    transition-all duration-900 ease-out
                  "
                />
                <div
                  className="
                    absolute -inset-y-16 -left-80 w-32 rotate-12
                    bg-gradient-to-b from-white/0 via-white/55 to-white/0
                    blur-sm opacity-30
                    group-hover:opacity-95 group-hover:translate-x-[780px]
                    transition-all duration-1000 ease-out
                  "
                />
                <div
                  className="
                    absolute -inset-y-16 -left-[22rem] w-20 rotate-12
                    bg-gradient-to-b from-white/0 via-white/80 to-white/0
                    blur-sm opacity-20
                    group-hover:opacity-90 group-hover:translate-x-[760px]
                    transition-all duration-[1100ms] ease-out
                  "
                />
              </div>

              <div className="px-8 pt-14 pb-10 relative z-10">
                {/* Card blanca */}
                <div className={`${wowCard} lg:min-h-[420px]`}>
                  <div className="p-7 flex flex-col h-full">
                    <div>
                      <h3 className="text-xl sm:text-[22px] font-black text-brandRed mb-2">
                        Comprensión más NEM
                      </h3>
                      <p className="text-brandNavy font-semibold mb-3 text-[15px]">
                        Modalidad: 1 a 1
                      </p>

                      <p className="text-slate-600 text-[15px] leading-relaxed">
                        Pensada para estudiantes de enseñanza media que necesitan{" "}
                        <strong className="font-semibold text-slate-900">comprender de verdad</strong>.{" "}
                        <strong className="font-semibold text-slate-900">Cerramos vacíos</strong>, ordenamos el aprendizaje
                        y avanzamos con claridad para{" "}
                        <strong className="font-semibold text-slate-900">mejorar notas, NEM y base para la PAES</strong>.
                      </p>
                    </div>

                    <div className="mt-auto pt-6">
                      {/* Alineado en las 3: misma estructura */}
                      <a
                        href={waWithProgram("Comprensión más NEM")}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brandRed font-semibold text-[14px] hover:underline inline-flex items-center gap-2"
                      >
                        Quiero hablar con Erika <span>→</span>
                      </a>

                      <div className="pt-4">
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
            <div className="absolute -top-4 left-6 sm:left-10 z-30 bg-white text-[#0086f2] px-7 py-2.5 rounded-full border-2 border-[#0086f2] shadow-xl">
              <span className="block text-[11px] sm:text-[12px] font-black uppercase tracking-[0.28em] whitespace-nowrap">
                Preparación PAES
              </span>
            </div>

            <div className="relative rounded-[3rem] bg-[#0086f2] shadow-inner border-2 border-white/20 overflow-hidden group">
              {/* Glow shine detrás de las cards blancas */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                  className="
                    absolute -inset-y-16 -left-64 w-56 rotate-12
                    bg-gradient-to-b from-white/0 via-white/72 to-white/0
                    blur-md opacity-35
                    group-hover:opacity-100 group-hover:translate-x-[860px]
                    transition-all duration-900 ease-out
                  "
                />
                <div
                  className="
                    absolute -inset-y-16 -left-80 w-32 rotate-12
                    bg-gradient-to-b from-white/0 via-white/52 to-white/0
                    blur-sm opacity-30
                    group-hover:opacity-95 group-hover:translate-x-[900px]
                    transition-all duration-1000 ease-out
                  "
                />
                <div
                  className="
                    absolute -inset-y-16 -left-[22rem] w-24 rotate-12
                    bg-gradient-to-b from-white/0 via-white/78 to-white/0
                    blur-sm opacity-20
                    group-hover:opacity-90 group-hover:translate-x-[920px]
                    transition-all duration-[1100ms] ease-out
                  "
                />
              </div>

              <div className="px-8 pt-14 pb-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* PAES GRUPAL */}
                  <div className={`${wowCard} lg:min-h-[420px]`}>
                    <div className="p-7 flex flex-col h-full">
                      <div>
                        <h3 className="text-xl sm:text-[22px] font-black text-brandNavy mb-2">
                          PAES Confianza Matemática
                        </h3>
                        <p className="text-brandNavy font-semibold mb-3 text-[15px]">
                          Modalidad: grupal (máx. 14 estudiantes)
                        </p>
                        <p className="text-slate-600 text-[15px] leading-relaxed">
                          Trabajamos{" "}
                          <strong className="font-semibold text-slate-900">comprensión y estrategia</strong>{" "}
                          en formato PAES, para avanzar con{" "}
                          <strong className="font-semibold text-slate-900">seguridad</strong>{" "}
                          y{" "}
                          <strong className="font-semibold text-slate-900">mejorar puntaje</strong>.
                        </p>
                      </div>

                      <div className="mt-auto pt-6">
                        <a
                          href={waWithProgram("PAES Confianza Matemática (Grupal)")}
                          target="_blank"
                          rel="noreferrer"
                          className="text-brandRed font-semibold text-[14px] hover:underline inline-flex items-center gap-2"
                        >
                          Quiero hablar con Erika <span>→</span>
                        </a>

                        <div className="pt-4">
                          <button onClick={() => onOpenModal(infoUrl)} className={infoBtn}>
                            <span className="block">Quiero más información</span>
                            <span className="block">de este programa</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PAES 1:1 */}
                  <div className={`${wowCard} lg:min-h-[420px]`}>
                    <div className="p-7 flex flex-col h-full">
                      <div>
                        <h3 className="text-xl sm:text-[22px] font-black text-brandNavy mb-2">
                          PAES Personalizado
                        </h3>
                        <p className="text-brandNavy font-semibold mb-3 text-[15px]">
                          Modalidad: 1 a 1
                        </p>

                        <p className="text-slate-600 text-[15px] leading-relaxed">
                          <strong className="font-semibold text-slate-900">
                            Acompañamiento completamente personalizado
                          </strong>{" "}
                          para preparar la PAES, ajustado al{" "}
                          <strong className="font-semibold text-slate-900">nivel real de tu hijo</strong>{" "}
                          y con foco en{" "}
                          <strong className="font-semibold text-slate-900">mejorar puntaje</strong>.
                        </p>
                      </div>

                      <div className="mt-auto pt-6">
                        <a
                          href={waWithProgram("PAES Personalizado (1 a 1)")}
                          target="_blank"
                          rel="noreferrer"
                          className="text-brandRed font-semibold text-[14px] hover:underline inline-flex items-center gap-2"
                        >
                          Quiero hablar con Erika <span>→</span>
                        </a>

                        <div className="pt-4">
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
