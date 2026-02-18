import React from 'react';

interface ProgramsProps {
  onOpenModal: (url: string) => void;
}

const Programs: React.FC<ProgramsProps> = ({ onOpenModal }) => {
  const infoUrl = "https://formulariogiftcard.fillout.com/erikalaporofedemate";

  return (
    <section className="py-16 lg:py-24 bg-white scroll-mt-24" id="programas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
            <div className="px-6 sm:px-8 lg:px-10 pt-12 pb-8 relative flex-1 flex flex-col justify-center">

              <div className="absolute top-0 left-8 sm:left-12 -translate-y-1/2 bg-white text-brandRed px-6 py-2.5 rounded-full shadow-xl z-20 border-2 border-brandRed">
                <span className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.25em]">
                  Clases Personalizadas
                </span>
              </div>

              {/* Card blanca (alto controlado y más compacto) */}
              <div
                className="group relative flex flex-col bg-white rounded-[2rem] border border-white/70
                           lg:h-[420px]
                           shadow-[0_28px_70px_-45px_rgba(0,0,0,0.40)]
                           transition-all duration-500 ease-out transform-gpu will-change-transform
                           hover:-translate-y-4 hover:scale-[1.03]
                           hover:shadow-[0_70px_160px_-90px_rgba(0,0,0,0.60)]
                           active:scale-[0.995]"
              >
                <div className="absolute inset-0 rounded-[2rem] ring-1 ring-black/5 pointer-events-none" />
                <div
                  className="absolute -inset-y-8 -left-44 w-44 rotate-12 bg-white/40 blur-xl opacity-0 pointer-events-none
                             group-hover:opacity-100 group-hover:translate-x-[560px]
                             transition-all duration-700 ease-out"
                />

                <div className="relative z-10 p-6 sm:p-7 flex flex-col h-full">
                  <h3 className="text-xl font-black mb-2 text-brandRed leading-tight">
                    Comprensión más NEM
                  </h3>

                  <p className="text-brandNavy font-semibold mb-3">
                    Modalidad: 1 a 1
                  </p>

                  <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-[15px]">
                    Pensada para estudiantes de enseñanza media que necesitan{" "}
                    <strong className="font-semibold text-slate-800">comprender de verdad</strong>.{" "}
                    <strong className="font-semibold text-slate-800">Cerramos vacíos</strong>, ordenamos el aprendizaje y avanzamos con claridad
                    para{" "}
                    <strong className="font-semibold text-slate-800">mejorar notas, NEM y base para la PAES</strong>.
                  </p>

                  <div className="mt-auto pt-6">
                    <button
                      onClick={() => onOpenModal(infoUrl)}
                      className="block w-full text-center bg-[#0086f2] text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-widest
                                 py-3.5 rounded-xl transition-all whitespace-nowrap px-2
                                 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(0,134,242,0.55)]
                                 active:scale-95"
                    >
                      Solicitar más información
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ========================= */}
          {/* ENTRENAMIENTO PAES */}
          {/* ========================= */}
          <div className="lg:w-2/3 relative flex flex-col rounded-[3rem] border-2 border-white/20 shadow-inner bg-[#0086f2]">
            <div className="px-6 sm:px-8 lg:px-10 pt-12 pb-8 relative flex-1 flex flex-col justify-center">

              <div className="absolute top-0 left-8 sm:left-12 -translate-y-1/2 bg-white text-[#0086f2] px-6 py-2.5 rounded-full shadow-xl z-20 border-2 border-[#0086f2]">
                <span className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.25em]">
                  Entrenamiento PAES
                </span>
              </div>

              <div className="absolute -bottom-16 -right-16 opacity-[0.10] pointer-events-none">
                <span className="material-symbols-outlined text-[280px] text-white select-none">school</span>
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">

                {/* PAES GRUPAL */}
                <div
                  className="group relative flex flex-col bg-white rounded-[2rem] border border-white/70
                             lg:h-[420px]
                             shadow-[0_28px_70px_-45px_rgba(0,0,0,0.35)]
                             transition-all duration-500 ease-out transform-gpu will-change-transform
                             hover:-translate-y-4 hover:scale-[1.03]
                             hover:shadow-[0_70px_160px_-90px_rgba(0,0,0,0.55)]
                             active:scale-[0.995]"
                >
                  <div className="absolute inset-0 rounded-[2rem] ring-1 ring-black/5 pointer-events-none" />
                  <div
                    className="absolute -inset-y-8 -left-44 w-44 rotate-12 bg-white/40 blur-xl opacity-0 pointer-events-none
                               group-hover:opacity-100 group-hover:translate-x-[560px]
                               transition-all duration-700 ease-out"
                  />

                  <div className="relative z-10 p-6 sm:p-7 flex flex-col h-full">
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

                    <div className="mt-auto pt-6">
                      <button
                        onClick={() => onOpenModal(infoUrl)}
                        className="block w-full text-center bg-[#0086f2] text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-widest
                                   py-3.5 rounded-xl transition-all whitespace-nowrap px-2
                                   hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(0,134,242,0.55)]
                                   active:scale-95"
                      >
                        Solicitar más información
                      </button>
                    </div>
                  </div>
                </div>

                {/* PAES 1:1 */}
                <div
                  className="group relative flex flex-col bg-white rounded-[2rem] border border-white/70
                             lg:h-[420px]
                             shadow-[0_28px_70px_-45px_rgba(0,0,0,0.35)]
                             transition-all duration-500 ease-out transform-gpu will-change-transform
                             hover:-translate-y-4 hover:scale-[1.03]
                             hover:shadow-[0_70px_160px_-90px_rgba(0,0,0,0.55)]
                             active:scale-[0.995]"
                >
                  <div className="absolute inset-0 rounded-[2rem] ring-1 ring-black/5 pointer-events-none" />
                  <div
                    className="absolute -inset-y-8 -left-44 w-44 rotate-12 bg-white/40 blur-xl opacity-0 pointer-events-none
                               group-hover:opacity-100 group-hover:translate-x-[560px]
                               transition-all duration-700 ease-out"
                  />

                  <div className="relative z-10 p-6 sm:p-7 flex flex-col h-full">
                    <h3 className="text-xl font-black mb-2 text-brandNavy leading-tight">
                      PAES Personalizado
                    </h3>

                    <p className="text-brandNavy font-semibold mb-3">
                      Modalidad: 1 a 1
                    </p>

                    <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-[15px]">
                      <strong className="font-semibold text-slate-800">Acompañamiento completamente personalizado</strong>{" "}
                      para preparar la PAES. Trabajo focalizado en vacíos, estrategia y precisión,
                      ajustado al{" "}
                      <strong className="font-semibold text-slate-800">nivel real de tu hijo</strong>{" "}
                      y con foco en{" "}
                      <strong className="font-semibold text-slate-800">mejorar puntaje</strong>.
                    </p>

                    <div className="mt-auto pt-6">
                      <button
                        onClick={() => onOpenModal(infoUrl)}
                        className="block w-full text-center bg-[#0086f2] text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-widest
                                   py-3.5 rounded-xl transition-all whitespace-nowrap px-2
                                   hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(0,134,242,0.55)]
                                   active:scale-95"
                      >
                        Solicitar más información
                      </button>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Programs;
