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

        {/* Encabezado (textos EXACTOS solicitados) */}
        <div className="text-center mb-16">
          <span className="text-brandNavy font-bold text-[14px] sm:text-[16px] tracking-tight mb-2 block">
            Programas y Modalidades
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-brandNavy tracking-tight leading-tight">
            Elije el programa ideal para que tu hijo aprenda matemáticas de verdad
          </h2>
        </div>

        {/* Layout: 2 servicios. PAES grande a la derecha */}
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">

          {/* ========================= */}
          {/* SERVICIO 1: CLASES PERSONALIZADAS (1:1) */}
          {/* ========================= */}
          <div className="lg:w-1/3 flex flex-col p-6 sm:p-8 lg:p-10 bg-brandRed rounded-[3rem] border-2 border-white/20 shadow-inner relative">
            {/* Etiqueta */}
            <div className="absolute -top-5 left-8 sm:left-12 bg-brandNavy text-white px-6 py-2.5 rounded-full shadow-xl z-20">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em]">
                Clases Personalizadas
              </span>
            </div>

            <div className="flex-1 mt-6">
              <div className="relative flex flex-col h-full bg-white/10 p-7 sm:p-9 rounded-[2rem] shadow-xl overflow-hidden border-2 border-white/20">
                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-black mb-3 text-white leading-tight">
                    Comprensión más NEM
                  </h3>

                  <p className="text-white font-semibold mb-3">
                    Modalidad: 1 a 1
                  </p>

                  <p className="text-white/90 leading-relaxed font-light text-sm sm:text-[15px] mb-8">
                    Pensada para estudiantes de enseñanza media que necesitan comprender de verdad.
                    Cerramos vacíos, ordenamos el aprendizaje y avanzamos con claridad para mejorar notas, NEM y base para la PAES.
                  </p>

                  <div className="mt-auto space-y-3">
                    <button
                      onClick={() => onOpenModal(interviewUrl)}
                      className="block w-full text-center bg-white text-brandRed font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.15em] py-4 rounded-xl hover:bg-white/90 transition-all shadow-lg active:scale-95 whitespace-nowrap px-2"
                    >
                      Solicitar Entrevista
                    </button>
                    <button
                      onClick={() => onOpenModal(infoUrl)}
                      className="block w-full text-center border-2 border-white/40 text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-widest py-3.5 rounded-xl hover:bg-white/10 transition-all active:scale-95 whitespace-nowrap px-2"
                    >
                      Más Información
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================= */}
          {/* SERVICIO 2: ENTRENAMIENTO PAES (TARJETA GRANDE + 2 MODALIDADES) */}
          {/* ========================= */}
          <div className="lg:w-2/3 flex flex-col p-6 sm:p-8 lg:p-10 bg-[#0086f2] rounded-[3rem] border-2 border-white/20 shadow-inner relative">
            {/* Etiqueta (YA NO SE CORTA porque el contenedor NO tiene overflow-hidden) */}
            <div className="absolute -top-5 left-8 sm:left-12 bg-white text-[#0086f2] px-6 py-2.5 rounded-full shadow-xl z-20">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em]">
                Entrenamiento PAES
              </span>
            </div>

            {/* Fondo decorativo suave */}
            <div className="absolute -bottom-16 -right-16 opacity-[0.12] pointer-events-none">
              <span className="material-symbols-outlined text-[260px] text-white select-none">school</span>
            </div>

            <div className="relative z-10 flex-1 mt-6">
              {/* Modalidades dentro de la tarjeta grande */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

                {/* MODALIDAD GRUPAL */}
                <div className="flex flex-col rounded-[2rem] border-2 border-white/20 bg-white/10 p-7 sm:p-9 shadow-xl">
                  <h3 className="text-xl font-black mb-3 text-white leading-tight">
                    PAES Confianza Matemática
                  </h3>

                  <p className="text-white font-semibold mb-3">
                    Modalidad: grupal (máx. 14 estudiantes)
                  </p>

                  <p className="text-white/95 leading-relaxed font-light text-sm sm:text-[15px] mb-8">
                    Trabajamos comprensión y estrategia en formato PAES, con un método que permite avanzar con seguridad y mejorar puntaje
                  </p>

                  <div className="mt-auto space-y-3">
                    <button
                      onClick={() => onOpenModal(interviewUrl)}
                      className="block w-full text-center bg-brandRed text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.15em] py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg active:scale-95 whitespace-nowrap px-2"
                    >
                      Solicitar Entrevista
                    </button>
                    <button
                      onClick={() => onOpenModal(infoUrl)}
                      className="block w-full text-center border-2 border-white/30 text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-widest py-3.5 rounded-xl hover:bg-white/10 transition-all active:scale-95 whitespace-nowrap px-2"
                    >
                      Más Información
                    </button>
                  </div>
                </div>

                {/* MODALIDAD INDIVIDUAL */}
                <div className="flex flex-col rounded-[2rem] border-2 border-white/20 bg-white/10 p-7 sm:p-9 shadow-xl">
                  <h3 className="text-xl font-black mb-3 text-white leading-tight">
                    PAES Personalizado
                  </h3>

                  <p className="text-white font-semibold mb-3">
                    Modalidad: 1 a 1
                  </p>

                  <p className="text-white/95 leading-relaxed font-light text-sm sm:text-[15px] mb-8">
                    Acompañamiento completamente personalizado para preparar la PAES. Trabajo focalizado en vacíos, estrategia y precisión, ajustado al nivel real de tu hijo y con foco en mejorar puntaje.
                  </p>

                  <div className="mt-auto space-y-3">
                    <button
                      onClick={() => onOpenModal(interviewUrl)}
                      className="block w-full text-center bg-brandRed text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.15em] py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg active:scale-95 whitespace-nowrap px-2"
                    >
                      Solicitar Entrevista
                    </button>
                    <button
                      onClick={() => onOpenModal(infoUrl)}
                      className="block w-full text-center border-2 border-white/30 text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-widest py-3.5 rounded-xl hover:bg-white/10 transition-all active:scale-95 whitespace-nowrap px-2"
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
    </section>
  );
};

export default Programs;
