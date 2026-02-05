import React from 'react';

interface ProgramsProps {
  onOpenModal: (url: string) => void;
}

const Programs: React.FC<ProgramsProps> = ({ onOpenModal }) => {
  const interviewUrl = "https://wa.me/56997439227";  const infoUrl = "https://formulariogiftcard.fillout.com/erikalaporofedemate";

  return (
    <section className="py-12 lg:py-16 bg-white scroll-mt-24" id="programas">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-10">
          <span className="text-brandRed font-bold text-[10px] uppercase tracking-[0.4em] mb-3 block">Mis Programas de Éxito</span>
          <h2 className="text-3xl md:text-4xl font-bold text-brandNavy uppercase tracking-tight">Potenciando el Futuro de tu Hijo/a</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Tutoría Individual */}
          <div className="bg-[#1F3A5F] p-10 flex flex-col h-full shadow-xl rounded-sm transition-transform hover:-translate-y-1 duration-300">
            <div className="mb-6 text-brandRed flex items-center justify-start">
              <span className="material-symbols-outlined text-5xl leading-none select-none">person_search</span>
            </div>
            <h3 className="text-lg lg:text-xl font-bold mb-6 uppercase tracking-wider text-white">Tutoría Individual</h3>
            <p className="text-white/80 leading-relaxed font-light mb-10 italic text-sm lg:text-base">
              Mi servicio más exclusivo y personalizado. Me dedico íntegramente al ritmo de tu hijo/a para nivelar y potenciar sus habilidades matemáticas en tiempo récord, atacando las bases que le impiden avanzar.
            </p>
            <div className="mt-auto space-y-3">
              <button onClick={() => onOpenModal(interviewUrl)} className="block w-full text-center bg-brandRed text-white font-bold text-[10px] uppercase tracking-widest py-4 rounded-sm hover:bg-red-700 transition-all">Solicitar Entrevista</button>
              <button onClick={() => onOpenModal(infoUrl)} className="block w-full text-center border border-white/20 text-white font-bold text-[10px] uppercase tracking-widest py-4 rounded-sm hover:bg-white hover:text-[#1F3A5F] transition-all">Más información</button>
            </div>
          </div>

          {/* Talleres Grupales */}
          <div className="bg-white p-10 flex flex-col h-full shadow-xl rounded-sm border-t-4 border-brandRed transition-transform hover:-translate-y-1 duration-300">
            <div className="mb-6 text-brandRed flex items-center justify-start">
              <span className="material-symbols-outlined text-5xl leading-none select-none">groups</span>
            </div>
            <h3 className="text-lg lg:text-xl font-bold mb-6 uppercase tracking-wider text-brandNavy">Talleres Grupales</h3>
            <p className="text-slate-500 leading-relaxed font-light mb-10 text-sm lg:text-base">
              Trabajo con grupos reducidos para fomentar el aprendizaje colaborativo. Mantengo mi atención individualizada sobre el progreso de cada estudiante, asegurando que nadie se quede atrás en el grupo.
            </p>
            <div className="mt-auto space-y-3">
              <button onClick={() => onOpenModal(interviewUrl)} className="block w-full text-center bg-brandRed text-white font-bold text-[10px] uppercase tracking-widest py-4 rounded-sm hover:bg-red-700 transition-all">Solicitar Entrevista</button>
              <button onClick={() => onOpenModal(infoUrl)} className="block w-full text-center border border-slate-200 text-brandNavy font-bold text-[10px] uppercase tracking-widest py-4 rounded-sm hover:bg-brandNavy hover:text-white transition-all">Más información</button>
            </div>
          </div>

          {/* Entrenamiento PAES */}
          <div className="bg-[#0086f2] p-10 flex flex-col h-full shadow-xl rounded-sm transition-transform hover:-translate-y-1 duration-300">
            <div className="mb-6 text-white flex items-center justify-start">
              <span className="material-symbols-outlined text-5xl leading-none select-none">school</span>
            </div>
            <h3 className="text-lg lg:text-xl font-bold mb-6 uppercase tracking-wider text-white">Entrenamiento PAES</h3>
            <p className="text-white/90 leading-relaxed font-light mb-10 text-sm lg:text-base">
              Estrategia pura dictada por mí. Aplico técnicas avanzadas de resolución para optimizar el tiempo y la precisión de tu hijo/a en las pruebas M1 y M2, enfocándonos en alcanzar puntajes de excelencia nacional.
            </p>
            <div className="mt-auto space-y-3">
              <button onClick={() => onOpenModal(interviewUrl)} className="block w-full text-center bg-brandRed text-white font-bold text-[10px] uppercase tracking-widest py-4 rounded-sm hover:bg-slate-800 transition-all">Solicitar Entrevista</button>
              <button onClick={() => onOpenModal(infoUrl)} className="block w-full text-center border border-white/40 text-white font-bold text-[10px] uppercase tracking-widest py-4 rounded-sm hover:bg-white hover:text-brandRed transition-all">Más información</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
