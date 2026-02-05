
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
        
        {/* Encabezado Principal - Tamaño Ajustado al original */}
        <div className="text-center mb-16">
          <span className="text-brandRed font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.5em] mb-4 block">MIS PROGRAMAS DE ÉXITO</span>
          <h2 className="text-3xl md:text-4xl font-black text-brandNavy uppercase tracking-tighter leading-tight">
            Potenciando el Futuro de tu Hijo/a
          </h2>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          
          {/* BLOQUE 1: CLASES PERSONALIZADAS (Individual + Grupal) */}
          <div className="lg:w-2/3 flex flex-col p-6 sm:p-8 lg:p-10 bg-slate-50 rounded-[3rem] border-2 border-slate-200 shadow-inner relative">
            {/* Etiqueta de Grupo */}
            <div className="absolute -top-5 left-8 sm:left-12 bg-brandNavy text-white px-6 py-2.5 rounded-full shadow-xl z-20">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em]">Clases Personalizadas</span>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-6">
              
              {/* Tarjeta: Tutoría Individual */}
              <div className="group relative flex flex-col h-full bg-brandNavy p-7 sm:p-9 rounded-[2rem] shadow-xl transition-all duration-500 hover:scale-[1.04] hover:-translate-y-2 hover:shadow-[0_40px_70px_-15px_rgba(31,58,95,0.4)] overflow-hidden border-b-8 border-brandRed">
                <div className="absolute -bottom-10 -right-10 opacity-[0.07] group-hover:opacity-[0.15] group-hover:scale-110 transition-all duration-700 pointer-events-none transform">
                  <span className="material-symbols-outlined text-[180px] sm:text-[220px] text-white select-none">person</span>
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 text-brandRed transform group-hover:scale-105 transition-transform duration-500">
                    <span className="material-symbols-outlined text-5xl font-bold">person_search</span>
                  </div>
                  <h3 className="text-xl font-black mb-4 uppercase tracking-wider text-white leading-tight">Tutoría Individual</h3>
                  <p className="text-white/90 leading-relaxed font-light mb-8 italic text-sm sm:text-[15px]">
                    Mi servicio más exclusivo. Me dedico íntegramente al ritmo de tu hijo/a para nivelar y potenciar sus habilidades en tiempo récord.
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
                      className="block w-full text-center border-2 border-white/20 text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-widest py-3.5 rounded-xl hover:bg-white/10 transition-all active:scale-95 whitespace-nowrap px-2"
                    >
                      Más Información
                    </button>
                  </div>
                </div>
              </div>

              {/* Tarjeta: Talleres Grupales */}
              <div className="group relative flex flex-col h-full bg-white p-7 sm:p-9 rounded-[2rem] shadow-xl transition-all duration-500 hover:scale-[1.04] hover:-translate-y-2 hover:shadow-[0_40px_70px_-15px_rgba(0,0,0,0.12)] overflow-hidden border-b-8 border-slate-300">
                <div className="absolute -bottom-10 -right-10 opacity-[0.04] group-hover:opacity-[0.1] group-hover:scale-110 transition-all duration-700 pointer-events-none transform">
                  <span className="material-symbols-outlined text-[180px] sm:text-[220px] text-brandNavy select-none">groups</span>
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 text-brandRed transform group-hover:scale-105 transition-transform duration-500">
                    <span className="material-symbols-outlined text-5xl font-bold">groups</span>
                  </div>
                  <h3 className="text-xl font-black mb-4 uppercase tracking-wider text-brandNavy leading-tight">Talleres Grupales</h3>
                  <p className="text-slate-600 leading-relaxed font-light mb-8 text-sm sm:text-[15px]">
                    Aprendizaje colaborativo en grupos reducidos. Mantengo la atención personalizada para asegurar que todos avancen al éxito.
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
                      className="block w-full text-center border-2 border-slate-200 text-brandNavy font-bold text-[9px] sm:text-[10px] uppercase tracking-widest py-3.5 rounded-xl hover:bg-slate-50 transition-all active:scale-95 whitespace-nowrap px-2"
                    >
                      Más Información
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BLOQUE 2: ENTRENAMIENTO PAES */}
          <div className="lg:w-1/3 flex flex-col p-6 sm:p-8 lg:p-10 bg-blue-100/40 rounded-[3rem] border-2 border-blue-100 shadow-inner relative">
            {/* Etiqueta de Grupo */}
            <div className="absolute -top-5 left-8 sm:left-12 bg-[#0086f2] text-white px-6 py-2.5 rounded-full shadow-xl z-20">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em]">Preparación PAES</span>
            </div>

            <div className="flex-1 mt-6">
              <div className="group relative flex flex-col h-full bg-[#0086f2] p-7 sm:p-9 rounded-[2rem] shadow-xl transition-all duration-500 hover:scale-[1.04] hover:-translate-y-2 hover:shadow-[0_40px_70px_-15px_rgba(0,134,242,0.3)] overflow-hidden border-b-8 border-white/40">
                <div className="absolute -bottom-10 -right-10 opacity-[0.1] group-hover:opacity-[0.2] group-hover:scale-110 transition-all duration-700 pointer-events-none transform">
                  <span className="material-symbols-outlined text-[180px] sm:text-[220px] text-white select-none">school</span>
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 text-white transform group-hover:scale-105 transition-transform duration-500">
                    <span className="material-symbols-outlined text-5xl font-bold">verified</span>
                  </div>
                  <h3 className="text-xl font-black mb-4 uppercase tracking-wider text-white leading-tight">Entrenamiento PAES</h3>
                  <p className="text-white/95 leading-relaxed font-light mb-8 text-sm sm:text-[15px]">
                    Estrategia pura para M1 y M2. Enfocándonos en optimizar tiempo y precisión para alcanzar puntajes de excelencia nacional.
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
                      className="block w-full text-center border-2 border-white/20 text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-widest py-3.5 rounded-xl hover:bg-white/10 transition-all active:scale-95 whitespace-nowrap px-2"
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
