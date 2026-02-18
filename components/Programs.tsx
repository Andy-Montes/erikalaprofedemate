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
          <div className="lg:w-1/3 relative rounded-[3rem] bg-brandRed shadow-inner border-2 border-white/20">
            {/* Glow del BLOQUE ROJO (no está en la tarjeta ni en el botón) */}
            <div className="absolute inset-0 rounded-[3rem] pointer-events-none overflow-hidden">
              <div className="redGlow absolute -top-24 -left-24 w-[380px] h-[620px] rounded-full opacity-0 blur-3xl transition-opacity duration-700 bg-white/35 mix-blend-screen" />
              <div className="redGlow2 absolute -top-10 left-16 w-[220px] h-[640px] rounded-full opacity-0 blur-3xl transition-opacity duration-700 bg-white/45 mix-blend-screen -skew-x-12" />
            </div>

            <div className="px-8 pt-14 pb-10 relative">
              {/* Etiqueta */}
              <div className="absolute top-0 left-10 -translate-y-1/2 bg-white text-brandRed px-6 py-2.5 rounded-full border-2 border-brandRed shadow-xl z-30">
                <span className="text-[12px] font-black uppercase tracking-[0.25em]">
                  Clases Personalizadas
                </span>
              </div>

              {/* Card blanca (hover activa el glow del fondo) */}
              <div
                className="group relative z-10 bg-white rounded-[2rem] lg:h-[420px]
                           shadow-[0_30px_80px_-50px_rgba(0,0,0,0.45)]
                           transition-all duration-500 ease-out transform-gpu will-change-transform
                           hover:-translate-y-4 hover:scale-[1.03]
                           hover:shadow-[0_90px_180px_-100px_rgba(0,0,0,0.7)]
                           overflow-hidden border border-white/70"
                onMouseEnter={(e) => {
                  const root = e.currentTarget.closest(".bg-brandRed");
                  if (!root) return;
                  root.querySelectorAll(".redGlow, .redGlow2").forEach((el) => el.classList.add("opacity-100"));
                }}
                onMouseLeave={(e) => {
                  const root = e.currentTarget.closest(".bg-brandRed");
                  if (!root) return;
                  root.querySelectorAll(".redGlow, .redGlow2").forEach((el) => el.classList.remove("opacity-100"));
                }}
              >
                {/* Shine dentro de la tarjeta (este es el brillo “que corre”) */}
                <div
                  className="absolute -inset-y-10 -left-56 w-56 rotate-12 bg-white/40 blur-xl opacity-0 pointer-events-none
                             group-hover:opacity-100 group-hover:translate-x-[680px]
                             transition-all duration-700 ease-out"
                />

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
                      Quiero hablar con Erika
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>

                    <div className="pt-4">
                      {/* Botón MÁS CHICO (no ocupa todo el ancho) */}
                      <button
                        onClick={() => onOpenModal(infoUrl)}
                        className="inline-flex items-center justify-center bg-[#0086f2] text-white font-bold
                                   text-[10px] sm:text-[11px] uppercase tracking-[0.14em]
                                   py-3 px-6 rounded-xl hover:bg-blue-700 transition leading-tight
                                   shadow-lg active:scale-95"
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
          <div className="lg:w-2/3 relative rounded-[3rem] bg-[#0086f2] shadow-inner border-2 border-white/20">
            {/* Glow del BLOQUE AZUL (no está en la tarjeta ni en el botón) */}
            <div className="absolute inset-0 rounded-[3rem] pointer-events-none overflow-hidden">
              <div className="blueGlow absolute -top-24 -left-24 w-[420px] h-[680px] rounded-full opacity-0 blur-3xl transition-opacity duration-700 bg-white/30 mix-blend-screen" />
              <div className="blueGlow2 absolute -top-10 left-28 w-[240px] h-[720px] rounded-full opacity-0 blur-3xl transition-opacity duration-700 bg-white/45 mix-blend-screen -skew-x-12" />
            </div>

            <div className="px-8 pt-14 pb-10 relative">
              {/* Etiqueta */}
              <div className="absolute top-0 left-10 -translate-y-1/2 bg-white text-[#0086f2] px-6 py-2.5 rounded-full border-2 border-[#0086f2] shadow-xl z-30">
                <span className="text-[12px] font-black uppercase tracking-[0.25em]">
                  Preparación PAES
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* ===== PAES GRUPAL ===== */}
                <div
                  className="group relative z-10 bg-white rounded-[2rem] lg:h-[420px]
                             shadow-[0_30px_80px_-50px_rgba(0,0,0,0.4)]
                             transition-all duration-500 ease-out transform-gpu will-change-transform
                             hover:-translate-y-4 hover:scale-[1.03]
                             hover:shadow-[0_90px_180px_-100px_rgba(0,0,0,0.65)]
                             overflow-hidden border border-white/70"
                  onMouseEnter={(e) => {
                    const root = e.currentTarget.closest(".bg-\\[\\#0086f2\\]");
                    if (!root) return;
                    root.querySelectorAll(".blueGlow, .blueGlow2").forEach((el) => el.classList.add("opacity-100"));
                  }}
                  onMouseLeave={(e) => {
                    const root = e.currentTarget.closest(".bg-\\[\\#0086f2\\]");
                    if (!root) return;
                    root.querySelectorAll(".blueGlow, .blueGlow2").forEach((el) => el.classList.remove("opacity-100"));
                  }}
                >
                  <div
                    className="absolute -inset-y-10 -left-56 w-56 rotate-12 bg-white/40 blur-xl opacity-0 pointer-events-none
                               group-hover:opacity-100 group-hover:translate-x-[680px]
                               transition-all duration-700 ease-out"
                  />

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
                        Quiero hablar con Erika
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </a>

                      <div className="pt-4">
                        <button
                          onClick={() => onOpenModal(infoUrl)}
                          className="inline-flex items-center justify-center bg-[#0086f2] text-white font-bold
                                     text-[10px] sm:text-[11px] uppercase tracking-[0.14em]
                                     py-3 px-6 rounded-xl hover:bg-blue-700 transition leading-tight
                                     shadow-lg active:scale-95"
                        >
                          Quiero más información de este programa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ===== PAES PERSONALIZADO ===== */}
                <div
                  className="group relative z-10 bg-white rounded-[2rem] lg:h-[420px]
                             shadow-[0_30px_80px_-50px_rgba(0,0,0,0.4)]
                             transition-all duration-500 ease-out transform-gpu will-change-transform
                             hover:-translate-y-4 hover:scale-[1.03]
                             hover:shadow-[0_90px_180px_-100px_rgba(0,0,0,0.65)]
                             overflow-hidden border border-white/70"
                  onMouseEnter={(e) => {
                    const root = e.currentTarget.closest(".bg-\\[\\#0086f2\\]");
                    if (!root) return;
                    root.querySelectorAll(".blueGlow, .blueGlow2").forEach((el) => el.classList.add("opacity-100"));
                  }}
                  onMouseLeave={(e) => {
                    const root = e.currentTarget.closest(".bg-\\[\\#0086f2\\]");
                    if (!root) return;
                    root.querySelectorAll(".blueGlow, .blueGlow2").forEach((el) => el.classList.remove("opacity-100"));
                  }}
                >
                  <div
                    className="absolute -inset-y-10 -left-56 w-56 rotate-12 bg-white/40 blur-xl opacity-0 pointer-events-none
                               group-hover:opacity-100 group-hover:translate-x-[680px]
                               transition-all duration-700 ease-out"
                  />

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
                        Quiero hablar con Erika
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </a>

                      <div className="pt-4">
                        <button
                          onClick={() => onOpenModal(infoUrl)}
                          className="inline-flex items-center justify-center bg-[#0086f2] text-white font-bold
                                     text-[10px] sm:text-[11px] uppercase tracking-[0.14em]
                                     py-3 px-6 rounded-xl hover:bg-blue-700 transition leading-tight
                                     shadow-lg active:scale-95"
                        >
                          Quiero más información de este programa
                        </button>
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
