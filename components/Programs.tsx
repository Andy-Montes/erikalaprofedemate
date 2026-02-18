import React from 'react';

interface ProgramsProps {
  onOpenModal: (url: string) => void;
}

const Programs: React.FC<ProgramsProps> = ({ onOpenModal }) => {
  const interviewUrl = "https://wa.me/56997439227";
  const infoUrl = "https://formulariogiftcard.fillout.com/erikalaporofedemate";

  return (
    <section className="py-16 lg:py-24 bg-white scroll-mt-24" id="programas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado (textos EXACTOS) */}
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
          {/* CLASES PERSONALIZADAS (FONDO PREMIUM ROJO) */}
          {/* ========================= */}
          <div className="lg:w-1/3 relative flex flex-col p-6 sm:p-8 lg:p-10 rounded-[3rem] border-2 border-white/20 shadow-[0_40px_90px_-40px_rgba(220,38,38,0.55)] bg-gradient-to-br from-brandRed via-brandRed to-[#b31313] overflow-hidden">
            {/* Glow */}
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-28 -right-28 w-80 h-80 rounded-full bg-black/10 blur-3xl pointer-events-none" />

            {/* Etiqueta */}
            <div className="absolute -top-5 left-8 sm:left-12 bg-brandNavy text-white px-6 py-2.5 rounded-full shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] z-20">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em]">
                Clases Personalizadas
              </span>
            </div>

            <div className="relative z-10 flex-1 mt-6">
              {/* Card interna PREMIUM (glass blanco) */}
              <div className="group relative flex flex-col h-full rounded-[2rem] bg-white/92 backdrop-blur-xl border border-white/70 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.45)] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_55px_110px_-55px_rgba(0,0,0,0.55)]">
                {/* Borde luminoso sutil */}
                <div className="absolute inset-0 rounded-[2rem] ring-1 ring-white/50 pointer-events-none" />

                <div className="relative z-10 p-7 sm:p-9 flex flex-col h-full">
                  <h3 className="text-xl font-black mb-3 text-brandRed leading-tight">
                    Comprensión más NEM
                  </h3>

                  <p className="text-brandNavy font-semibold mb-3">
                    Modalidad: 1 a 1
                  </p>

                  <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-[15px] mb-8">
                    Pensada para estudiantes de enseñanza media que necesitan comprender de verdad.
                    Cerramos vacíos, ordenamos el aprendizaje y avanzamos con claridad para mejorar notas, NEM y base para la PAES.
                  </p>

                  <div className="mt-auto space-y-3">
                    <button
                      onClick={() => onOpenModal(interviewUrl)}
                      className="block w-full text-center bg-brandRed text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.15em] py-4 rounded-xl transition-all shadow-[0_22px_45px_-25px_rgba(220,38,38,0.85)] hover:bg-red-700 hover:shadow-[0_28px_55px_-28px_rgba(220,38,38,0.95)] active:scale-95 whitespace-nowrap px-2"
                    >
                      Solicitar Entrevista
                    </button>
                    <button
                      onClick={() => onOpenModal(infoUrl)}
                      className="block w-full text-center border-2 border-slate-200 text-brandNavy font-bold text-[9px] sm:text-[10px] uppercase tracking-widest py-3.5 rounded-xl hover:bg-slate-50 transition-all active:scale-95 whitespace-nowrap px-2"
                    >
                      Más Información
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================= */}
          {/* ENTRENAMIENTO PAES (FONDO PREMIUM CYAN/BLUE + 2 MODALIDADES) */}
          {/* ========================= */}
          <div className="lg:w-2/3 relative flex flex-col p-6 sm:p-8 lg:p-10 rounded-[3rem] border-2 border-white/20 shadow-[0_45px_110px_-55px_rgba(0,134,242,0.75)] bg-gradient-to-br from-[#0086f2] via-[#0086f2] to-[#0066d6]">
            {/* Glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/18 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-28 -left-28 w-96 h-96 rounded-full bg-black/10 blur-3xl pointer-events-none" />

            {/* Marca/figura suave */}
            <div className="absolute -bottom-16 -right-16 opacity-[0.10] pointer-events-none">
              <span className="material-symbols-outlined text-[280px] text-white select-none">school</span>
            </div>

            {/* Etiqueta visible (con borde para que no se pierda) */}
            <div className="absolute -top-5 left-8 sm:left-12 bg-white text-[#0086f2] px-6 py-2.5 rounded-full shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35)] z-20 border-2 border-[#0086f2]">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em]">
                Entrenamiento PAES
              </span>
            </div>

            <div className="relative z-10 flex-1 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

                {/* MODALIDAD GRUPAL (glass blanco) */}
                <div className="group relative flex flex-col h-full rounded-[2rem] bg-white/92 backdrop-blur-xl border border-white/70 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_55px_110px_-55px_rgba(0,0,0,0.45)]">
                  <div className="absolute inset-0 rounded-[2rem] ring-1 ring-white/50 pointer-events-none" />

                  <div className="relative z-10 p-7 sm:p-9 flex flex-col h-full">
                    <h3 className="text-xl font-black mb-3 text-brandNavy leading-tight">
                      PAES Confianza Matemática
                    </h3>

                    <p className="text-brandNavy font-semibold mb-3">
                      Modalidad: grupal (máx. 14 estudiantes)
                    </p>

                    <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-[15px] mb-8">
                      Trabajamos comprensión y estrategia en formato PAES, con un método que permite avanzar con seguridad y mejorar puntaje
                    </p>

                    <div className="mt-auto space-y-3">
                      <button
                        onClick={() => onOpenModal(interviewUrl)}
                        className="block w-full text-center bg-brandRed text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.15em] py-4 rounded-xl transition-all shadow-[0_22px_45px_-25px_rgba(220,38,38,0.85)] hover:bg-red-700 hover:shadow-[0_28px_55px_-28px_rgba(220,38,38,0.95)] active:scale-95 whitespace-nowrap px-2"
                      >
                        Solicitar Entrevista
                      </button>
                      <button
                        onClick={() => onOpenModal(infoUrl)}
                        className="block w-full text-center border-2 border-slate-200 text-brandNavy font-bold text-[9px] sm:text-[10px] uppercase tracking-widest py-3.5 rounded-xl hover:bg-slate-50 transition-all active:scale-95 whitespace-nowrap px-2"
                      >
                        Más Información
                      </button>
                    </div>
                  </div>
                </div>

                {/* MODALIDAD INDIVIDUAL (glass blanco) */}
                <div className="group relative flex flex-col h-full rounded-[2rem] bg-white/92 backdrop-blur-xl border border-white/70 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_55px_110px_-55px_rgba(0,0,0,0.45)]">
                  <div className="absolute inset-0 rounded-[2rem] ring-1 ring-white/50 pointer-events-none" />

                  <div className="relative z-10 p-7 sm:p-9 flex flex-col h-full">
                    <h3 className="text-xl font-black mb-3 text-brandNavy leading-tight">
                      PAES Personalizado
                    </h3>

                    <p className="text-brandNavy font-semibold mb-3">
                      Modalidad: 1 a 1
                    </p>

                    <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-[15px] mb-8">
                      Acompañamiento completamente personalizado para preparar la PAES. Trabajo focalizado en vacíos, estrategia y precisión, ajustado al nivel real de tu hijo y con foco en mejorar puntaje.
                    </p>

                    <div className="mt-auto space-y-3">
                      <button
                        onClick={() => onOpenModal(interviewUrl)}
                        className="block w-full text-center bg-brandRed text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.15em] py-4 rounded-xl transition-all shadow-[0_22px_45px_-25px_rgba(220,38,38,0.85)] hover:bg-red-700 hover:shadow-[0_28px_55px_-28px_rgba(220,38,38,0.95)] active:scale-95 whitespace-nowrap px-2"
                      >
                        Solicitar Entrevista
                      </button>
                      <button
                        onClick={() => onOpenModal(infoUrl)}
                        className="block w-full text-center border-2 border-slate-200 text-brandNavy font-bold text-[9px] sm:text-[10px] uppercase tracking-widest py-3.5 rounded-xl hover:bg-slate-50 transition-all active:scale-95 whitespace-nowrap px-2"
                      >
                        Más Información
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
