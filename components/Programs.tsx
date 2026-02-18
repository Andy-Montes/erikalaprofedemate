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
          <span className="text-brandNavy font-bold text-[14px] sm:text-[16px] mb-2 block">
            Programas y Modalidades
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-brandNavy leading-tight">
            Elije el programa ideal para que tu hijo aprenda matemáticas de verdad
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* ================= CLASES PERSONALIZADAS ================= */}
          <div className="lg:w-1/3 relative rounded-[3rem] bg-brandRed shadow-inner border-2 border-white/20 overflow-hidden group">
            {/* Glow DIAGONAL (FONDO) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div
                className="absolute -top-24 -left-40 h-[780px] w-[260px] rotate-[18deg]
                           bg-gradient-to-b from-white/0 via-white/35 to-white/0
                           blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
              <div
                className="absolute -top-10 left-10 h-[820px] w-[170px] rotate-[18deg]
                           bg-gradient-to-b from-white/0 via-white/25 to-white/0
                           blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
            </div>

            <div className="px-8 pt-14 pb-10 relative z-10">
              {/* Etiqueta */}
              <div className="absolute top-0 left-10 -translate-y-1/2 bg-white text-brandRed px-6 py-2.5 rounded-full border-2 border-brandRed shadow-xl">
                <span className="text-[12px] font-black uppercase tracking-[0.25em]">
                  Clases Personalizadas
                </span>
              </div>

              {/* Card blanca */}
              <div
                className="relative bg-white rounded-[2rem] lg:h-[420px]
                           shadow-[0_30px_80px_-50px_rgba(0,0,0,0.45)]
                           transition-all duration-500 ease-out transform-gpu will-change-transform
                           hover:-translate-y-4 hover:scale-[1.03]
                           hover:shadow-[0_90px_180px_-100px_rgba(0,0,0,0.7)]
                           overflow-hidden border border-white/70 z-10"
              >
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
                    <a
                      href={waWithProgram("Comprensión más NEM")}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brandRed font-semibold text-[14px] hover:underline inline-flex items-center gap-2"
                    >
                      Quiero hablar con Erika <span>→</span>
                    </a>

                    <div className="pt-4">
                      {/* Botón chico y SIN efectos de glow/scale */}
                      <button
                        onClick={() => onOpenModal(infoUrl)}
                        className="inline-flex items-center justify-center bg-[#0086f2] text-white font-bold
                                   text-[10px] sm:text-[11px] uppercase tracking-[0.14em]
                                   py-2.5 px-4 rounded-lg leading-tight
                                   hover:bg-blue-700"
                      >
                        Quiero más información de este programa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* fin card blanca */}
            </div>
          </div>

          {/* ================= PREPARACIÓN PAES ================= */}
          <div className="lg:w-2/3 relative rounded-[3rem] bg-[#0086f2] shadow-inner border-2 border-white/20 overflow-hidden group">
            {/* Glow DIAGONAL (FONDO) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div
                className="absolute -top-24 -left-44 h-[860px] w-[280px] rotate-[18deg]
                           bg-gradient-to-b from-white/0 via-white/30 to-white/0
                           blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
              <div
                className="absolute -top-10 left-16 h-[900px] w-[180px] rotate-[18deg]
                           bg-gradient-to-b from-white/0 via-white/22 to-white/0
                           blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
            </div>

            <div className="px-8 pt-14 pb-10 relative z-10">
              {/* Etiqueta */}
              <div className="absolute top-0 left-10 -translate-y-1/2 bg-white text-[#0086f2] px-6 py-2.5 rounded-full border-2 border-[#0086f2] shadow-xl">
                <span className="text-[12px] font-black uppercase tracking-[0.25em]">
                  Preparación PAES
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* ===== PAES GRUPAL ===== */}
                <div
                  className="relative bg-white rounded-[2rem] lg:h-[420px]
                             shadow-[0_30px_80px_-50px_rgba(0,0,0,0.4)]
                             transition-all duration-500 ease-out transform-gpu will-change-transform
                             hover:-translate-y-4 hover:scale-[1.03]
                             hover:shadow-[0_90px_180px_-100px_rgba(0,0,0,0.65)]
                             overflow-hidden border border-white/70 z-10"
                >
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
                        <button
                          onClick={() => onOpenModal(infoUrl)}
                          className="inline-flex items-center justify-center bg-[#0086f2] text-white font-bold
                                     text-[10px] sm:text-[11px] uppercase tracking-[0.14em]
                                     py-2.5 px-4 rounded-lg leading-tight
                                     hover:bg-blue-700"
                        >
                          Quiero más información de este programa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ===== PAES PERSONALIZADO ===== */}
                <div
                  className="relative bg-white rounded-[2rem] lg:h-[420px]
                             shadow-[0_30px_80px_-50px_rgba(0,0,0,0.4)]
                             transition-all duration-500 ease-out transform-gpu will-change-transform
                             hover:-translate-y-4 hover:scale-[1.03]
                             hover:shadow-[0_90px_180px_-100px_rgba(0,0,0,0.65)]
                             overflow-hidden border border-white/70 z-10"
                >
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
                        <button
                          onClick={() => onOpenModal(infoUrl)}
                          className="inline-flex items-center justify-center bg-[#0086f2] text-white font-bold
                                     text-[10px] sm:text-[11px] uppercase tracking-[0.14em]
                                     py-2.5 px-4 rounded-lg leading-tight
                                     hover:bg-blue-700"
                        >
                          Quiero más información de este programa
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
    </section>
  );
};

export default Programs;
