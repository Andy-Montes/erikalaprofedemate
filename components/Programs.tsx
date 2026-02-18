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

  return (
    <section className="py-16 lg:py-24 bg-white scroll-mt-24" id="programas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <span className="text-brandNavy font-bold text-[14px] sm:text-[16px] tracking-tight mb-2 block">
            Programas y Modalidades
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-brandNavy tracking-tight leading-tight">
            Elije el programa ideal para que tu hijo aprenda matemáticas de verdad
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* ========================= */}
          {/* CLASES PERSONALIZADAS */}
          {/* ========================= */}
          <div className="lg:w-1/3 relative flex flex-col rounded-[3rem] border-2 border-white/20 shadow-inner bg-brandRed">
            <div className="px-6 sm:px-8 lg:px-10 pt-12 pb-10 relative flex-1 flex flex-col justify-center">
              {/* Etiqueta */}
              <div className="absolute top-0 left-8 sm:left-12 -translate-y-1/2 bg-white text-brandRed px-6 py-2.5 rounded-full shadow-xl z-20 border-2 border-brandRed">
                <span className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.25em]">
                  Clases Personalizadas
                </span>
              </div>

              {/* WRAPPER: el glow vive en el fondo ROJO, detrás de la card blanca */}
              <div className="relative">
                {/* Card blanca */}
                <div
                  className="group relative z-10 flex flex-col bg-white rounded-[2rem] border border-white/70
                             lg:h-[420px]
                             shadow-[0_28px_70px_-45px_rgba(0,0,0,0.40)]
                             transition-all duration-500 ease-out transform-gpu will-change-transform
                             hover:-translate-y-4 hover:scale-[1.03]
                             hover:shadow-[0_70px_160px_-90px_rgba(0,0,0,0.60)]
                             active:scale-[0.995] overflow-hidden"
                >
                  {/* GLOW PREMIUM EN FONDO (aparece al hover) */}
                  <div
                    className="absolute -inset-10 -z-10 rounded-[2.6rem]
                               bg-white/30 blur-3xl opacity-0
                               transition-all duration-700 ease-out
                               group-hover:opacity-90 group-hover:scale-[1.03]
                               mix-blend-screen pointer-events-none"
                  />

                  {/* ring sutil */}
                  <div className="absolute inset-0 rounded-[2rem] ring-1 ring-black/5 pointer-events-none" />

                  {/* shine diagonal (brillo que corre dentro de la card) */}
                  <div
                    className="absolute -inset-y-10 -left-52 w-52 rotate-12 bg-white/40 blur-xl opacity-0 pointer-events-none
                               group-hover:opacity-100 group-hover:translate-x-[640px]
                               transition-all duration-700 ease-out"
                  />

                  <div className="relative z-10 p-6 sm:p-7 flex flex-col h-full">
                    <div>
                      <h3 className="text-xl font-black mb-2 text-brandRed leading-tight">
                        Comprensión más NEM
                      </h3>
                      <p className="text-brandNavy font-semibold mb-3">Modalidad: 1 a 1</p>

                      <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-[15px]">
                        Pensada para estudiantes de enseñanza media que necesitan{" "}
                        <strong className="font-semibold text-slate-800">comprender de verdad</strong>.{" "}
                        <strong className="font-semibold text-slate-800">Cerramos vacíos</strong>, ordenamos el aprendizaje y avanzamos con claridad
                        para{" "}
                        <strong className="font-semibold text-slate-800">mejorar notas, NEM y base para la PAES</strong>.
                      </p>
                    </div>

                    {/* Footer fijo */}
                    <div className="mt-auto pt-6">
                      <a
                        href={waWithProgram("Comprensión más NEM")}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-brandRed font-semibold
                                   text-sm sm:text-[14px]
                                   transition-all duration-300
                                   hover:underline hover:underline-offset-4"
                      >
                        Quiero hablar con Erika
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </a>

                      <div className="pt-4">
                        <button
                          onClick={() => onOpenModal(infoUrl)}
                          className="block w-full text-center bg-[#0086f2] text-white font-bold
                                     text-[10px] sm:text-[11px] uppercase tracking-[0.12em]
                                     py-3.5 rounded-xl transition-all px-4 leading-tight
                                     hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(0,134,242,0.55)]
                                     active:scale-95"
                        >
                          Quiero más información de este programa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* fin wrapper */}
            </div>
          </div>

          {/* ========================= */}
          {/* PREPARACIÓN PAES */}
          {/* ========================= */}
          <div className="lg:w-2/3 relative flex flex-col rounded-[3rem] border-2 border-white/20 shadow-inner bg-[#0086f2]">
            <div className="px-6 sm:px-8 lg:px-10 pt-12 pb-10 relative flex-1 flex flex-col justify-center">
              {/* Etiqueta */}
              <div className="absolute top-0 left-8 sm:left-12 -translate-y-1/2 bg-white text-[#0086f2] px-6 py-2.5 rounded-full shadow-xl z-20 border-2 border-[#0086f2]">
                <span className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.25em]">
                  Preparación PAES
                </span>
              </div>

              {/* IMPORTANTE: eliminamos el ícono del fondo azul (school). No va. */}

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                {/* ============ PAES GRUPAL ============ */}
                <div className="relative">
                  <div
                    className="group relative z-10 flex flex-col bg-white rounded-[2rem] border border-white/70
                               lg:h-[420px]
                               shadow-[0_28px_70px_-45px_rgba(0,0,0,0.35)]
                               transition-all duration-500 ease-out transform-gpu will-change-transform
                               hover:-translate-y-4 hover:scale-[1.03]
                               hover:shadow-[0_70px_160px_-90px_rgba(0,0,0,0.55)]
                               active:scale-[0.995] overflow-hidden"
                  >
                    {/* GLOW PREMIUM EN FONDO AZUL (aparece al hover) */}
                    <div
                      className="absolute -inset-10 -z-10 rounded-[2.6rem]
                                 bg-white/26 blur-3xl opacity-0
                                 transition-all duration-700 ease-out
                                 group-hover:opacity-90 group-hover:scale-[1.03]
                                 mix-blend-screen pointer-events-none"
                    />

                    <div className="absolute inset-0 rounded-[2rem] ring-1 ring-black/5 pointer-events-none" />

                    {/* shine diagonal */}
                    <div
                      className="absolute -inset-y-10 -left-52 w-52 rotate-12 bg-white/40 blur-xl opacity-0 pointer-events-none
                                 group-hover:opacity-100 group-hover:translate-x-[640px]
                                 transition-all duration-700 ease-out"
                    />

                    <div className="relative z-10 p-6 sm:p-7 flex flex-col h-full">
                      <div>
                        <h3 className="text-xl font-black mb-2 text-brandNavy leading-tight">
                          PAES Confianza Matemática
                        </h3>
                        <p className="text-brandNavy font-semibold mb-3">
                          Modalidad: grupal (máx. 14 estudiantes)
                        </p>

                        <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-[15px]">
                          Trabajamos{" "}
                          <strong className="font-semibold text-slate-800">comprensión y estrategia</strong>{" "}
                          en formato PAES, con un método que permite avanzar con{" "}
                          <strong className="font-semibold text-slate-800">seguridad</strong>{" "}
                          y{" "}
                          <strong className="font-semibold text-slate-800">mejorar puntaje</strong>.
                        </p>
                      </div>

                      <div className="mt-auto pt-6">
                        <a
                          href={waWithProgram("PAES Confianza Matemática (Grupal)")}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-brandRed font-semibold
                                     text-sm sm:text-[14px]
                                     transition-all duration-300
                                     hover:underline hover:underline-offset-4"
                        >
                          Quiero hablar con Erika
                          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </a>

                        <div className="pt-4">
                          <button
                            onClick={() => onOpenModal(infoUrl)}
                            className="block w-full text-center bg-[#0086f2] text-white font-bold
                                       text-[10px] sm:text-[11px] uppercase tracking-[0.12em]
                                       py-3.5 rounded-xl transition-all px-4 leading-tight
                                       hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(0,134,242,0.55)]
                                       active:scale-95"
                          >
                            Quiero más información de este programa
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ============ PAES 1:1 ============ */}
                <div className="relative">
                  <div
                    className="group relative z-10 flex flex-col bg-white rounded-[2rem] border border-white/70
                               lg:h-[420px]
                               shadow-[0_28px_70px_-45px_rgba(0,0,0,0.35)]
                               transition-all duration-500 ease-out transform-gpu will-change-transform
                               hover:-translate-y-4 hover:scale-[1.03]
                               hover:shadow-[0_70px_160px_-90px_rgba(0,0,0,0.55)]
                               active:scale-[0.995] overflow-hidden"
                  >
                    {/* GLOW PREMIUM EN FONDO AZUL (aparece al hover) */}
                    <div
                      className="absolute -inset-10 -z-10 rounded-[2.6rem]
                                 bg-white/26 blur-3xl opacity-0
                                 transition-all duration-700 ease-out
                                 group-hover:opacity-90 group-hover:scale-[1.03]
                                 mix-blend-screen pointer-events-none"
                    />

                    <div className="absolute inset-0 rounded-[2rem] ring-1 ring-black/5 pointer-events-none" />

                    {/* shine diagonal */}
                    <div
                      className="absolute -inset-y-10 -left-52 w-52 rotate-12 bg-white/40 blur-xl opacity-0 pointer-events-none
                                 group-hover:opacity-100 group-hover:translate-x-[640px]
                                 transition-all duration-700 ease-out"
                    />

                    <div className="relative z-10 p-6 sm:p-7 flex flex-col h-full">
                      <div>
                        <h3 className="text-xl font-black mb-2 text-brandNavy leading-tight">
                          PAES Personalizado
                        </h3>
                        <p className="text-brandNavy font-semibold mb-3">Modalidad: 1 a 1</p>

                        <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-[15px]">
                          <strong className="font-semibold text-slate-800">
                            Acompañamiento completamente personalizado
                          </strong>{" "}
                          para preparar la PAES. Trabajo focalizado en vacíos, estrategia y precisión,
                          ajustado al{" "}
                          <strong className="font-semibold text-slate-800">nivel real de tu hijo</strong>{" "}
                          y con foco en{" "}
                          <strong className="font-semibold text-slate-800">mejorar puntaje</strong>.
                        </p>
                      </div>

                      <div className="mt-auto pt-6">
                        <a
                          href={waWithProgram("PAES Personalizado (1 a 1)")}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-brandRed font-semibold
                                     text-sm sm:text-[14px]
                                     transition-all duration-300
                                     hover:underline hover:underline-offset-4"
                        >
                          Quiero hablar con Erika
                          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </a>

                        <div className="pt-4">
                          <button
                            onClick={() => onOpenModal(infoUrl)}
                            className="block w-full text-center bg-[#0086f2] text-white font-bold
                                       text-[10px] sm:text-[11px] uppercase tracking-[0.12em]
                                       py-3.5 rounded-xl transition-all px-4 leading-tight
                                       hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(0,134,242,0.55)]
                                       active:scale-95"
                          >
                            Quiero más información de este programa
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* fin cards PAES */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
