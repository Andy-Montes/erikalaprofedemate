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
        
        {/* Encabezado Principal */}
        <div className="text-center mb-16">
          <span className="text-brandRed font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.5em] mb-4 block">
            MIS PROGRAMAS DE ÉXITO
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brandNavy uppercase tracking-tighter leading-tight">
            Potenciando el Futuro de tu Hijo/a
          </h2>
        </div>

        {/* Bloque 1: Clases Personalizadas (solo Tutoría Individual) */}
        <div className="mb-16 lg:mb-24">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-brandNavy mb-3">Clases Personalizadas</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Atención 100% individualizada, exclusiva y adaptada al ritmo de tu hijo/a.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="group relative flex flex-col h-full bg-brandNavy p-8 sm:p-10 lg:p-12 rounded-[3rem] shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden border-b-8 border-brandRed">
              <div className="absolute -top-6 left-10 bg-brandNavy text-white px-8 py-3 rounded-full shadow-xl z-20">
                <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em]">1 a 1</span>
              </div>
              <div className="absolute -bottom-12 -right-12 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700 pointer-events-none">
                <span className="material-symbols-outlined text-[220px] sm:text-[280px] text-white select-none">person</span>
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8 text-brandRed transform group-hover:scale-105 transition-transform duration-500">
                  <span className="material-symbols-outlined text-6xl font-bold">person_search</span>
                </div>
                <h3 className="text-2xl font-black mb-5 uppercase tracking-wider text-white leading-tight">Tutoría Individual</h3>
                <p className="text-white/90 leading-relaxed font-light mb-10 text-base">
                  Mi servicio más exclusivo. Me dedico íntegramente al ritmo de tu hijo/a para nivelar y potenciar sus habilidades en tiempo récord.
                </p>
                <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => onOpenModal(interviewUrl)}
                    className="bg-brandRed text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg active:scale-95"
                  >
                    Solicitar Entrevista
                  </button>
                  <button
                    onClick={() => onOpenModal(infoUrl)}
                    className="border-2 border-white/30 text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl hover:bg-white/10 transition-all active:scale-95"
                  >
                    Más Información
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bloque 2: Preparación PAES (dos modalidades) */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-brandNavy mb-3">Preparación PAES</h3>
            <p className="text-slate-600 max-w-3xl mx-auto mb-8">
              Estrategia especializada para M1 y M2. Elige la modalidad que mejor se adapte a tu hijo/a.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Modalidad Grupal */}
            <div className="group relative flex flex-col h-full bg-white p-8 sm:p-10 lg:p-12 rounded-[3rem] shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden border-b-8 border-slate-300">
              <div className="absolute -top-6 left-10 bg-brandNavy text-white px-8 py-3 rounded-full shadow-xl z-20">
                <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em]">Grupal (máx. 14)</span>
              </div>
              <div className="absolute -bottom-12 -right-12 opacity-5 group-hover:opacity-15 group-hover:scale-110 transition-all duration-700 pointer-events-none">
                <span className="material-symbols-outlined text-[220px] sm:text-[280px] text-brandNavy select-none">groups</span>
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8 text-brandRed transform group-hover:scale-105 transition-transform duration-500">
                  <span className="material-symbols-outlined text-6xl font-bold">groups</span>
                </div>
                <h3 className="text-2xl font-black mb-5 uppercase tracking-wider text-brandNavy leading-tight">PAES Grupal</h3>
                <p className="text-slate-700 leading-relaxed font-light mb-10 text-base">
                  Aprendizaje colaborativo en grupos reducidos. Trabajamos comprensión y estrategia en formato PAES, con un método que permite avanzar con seguridad y mejorar puntaje.
                </p>
                <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => onOpenModal(interviewUrl)}
                    className="bg-brandRed text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg active:scale-95"
                  >
                    Solicitar Entrevista
                  </button>
                  <button
                    onClick={() => onOpenModal(infoUrl)}
                    className="border-2 border-brandNavy/30 text-brandNavy font-bold text-sm uppercase tracking-wider py-4 rounded-xl hover:bg-slate-50 transition-all active:scale-95"
                  >
                    Más Información
                  </button>
                </div>
              </div>
            </div>

            {/* Modalidad Individual */}
            <div className="group relative flex flex-col h-full bg-[#0086f2] p-8 sm:p-10 lg:p-12 rounded-[3rem] shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden border-b-8 border-white/40">
              <div className="absolute -top-6 left-10 bg-[#0086f2] text-white px-8 py-3 rounded-full shadow-xl z-20">
                <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em]">Individual (1 a 1)</span>
              </div>
              <div className="absolute -bottom-12 -right-12 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700 pointer-events-none">
                <span className="material-symbols-outlined text-[220px] sm:text-[280px] text-white select-none">school</span>
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8 text-white transform group-hover:scale-105 transition-transform duration-500">
                  <span className="material-symbols-outlined text-6xl font-bold">verified</span>
                </div>
                <h3 className="text-2xl font-black mb-5 uppercase tracking-wider text-white leading-tight">PAES Personalizado</h3>
                <p className="text-white/95 leading-relaxed font-light mb-10 text-base">
                  Completamente personalizado para preparar la PAES. Trabajo focalizado en vacíos, estrategia y precisión, ajustado al nivel real de tu hijo y con foco en mejorar puntaje.
                </p>
                <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => onOpenModal(interviewUrl)}
                    className="bg-brandRed text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg active:scale-95"
                  >
                    Solicitar Entrevista
                  </button>
                  <button
                    onClick={() => onOpenModal(infoUrl)}
                    className="border-2 border-white/30 text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl hover:bg-white/10 transition-all active:scale-95"
                  >
                    Más Información
                  </button>
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
