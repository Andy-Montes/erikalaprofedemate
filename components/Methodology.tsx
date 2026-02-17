import React from 'react';

const Methodology: React.FC = () => {
  return (
    <section className="py-6 lg:py-8 bg-white relative z-10 scroll-mt-24" id="metodo">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-6 gap-6 border-b border-slate-100 pb-8">
          <div>
            <span className="text-brandRed font-bold text-[10px] uppercase tracking-[0.4em] mb-3 block">
              Mi metodología
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Método de Confianza Matemática
            </h2>
            <p className="text-base lg:text-lg text-slate-500 leading-relaxed font-light">
              Más que repetir ejercicios, ayudo a tu hijo/a a comprender las matemáticas desde la base, cerrar vacíos y recuperar la confianza para avanzar con seguridad.
            </p>
          </div>
          <div className="h-[2px] w-full lg:w-24 bg-brandRed mb-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8">
          {/* Paso 01 */}
          <div className="group">
            <div className="mb-6 overflow-hidden rounded-sm aspect-[16/10] shadow-xl border border-slate-100">
              <img
                alt="Diagnóstico Integral"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://i.imgur.com/iWAXFyM.png"
              />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-brandRed font-bold text-xs uppercase tracking-widest">01</span>
              <div className="h-[1px] w-8 bg-brandRed/30"></div>
              <span className="text-brandNavy font-bold text-[10px] uppercase tracking-[0.2em]">
                Primer Paso
              </span>
            </div>
            <h3 className="text-xl font-bold mb-4">Diagnóstico Integral</h3>
            <div className="text-slate-600 text-sm lg:text-base leading-relaxed font-light space-y-3">
              <p className="font-bold text-[#0086f2]">
                Antes de enseñar, identifico qué ocurre entre tu hijo y las matemáticas...
              </p>
              <p>
                Analizo su nivel académico y cómo se enfrenta a la Matemática, qué lo bloquea y qué vacíos están frenando su avance.
              </p>
              <p>
                Así avanzamos con claridad y seguridad, evitando presión innecesaria y dificultades que, si no se trabajan a tiempo, se vuelven más grandes.
              </p>
            </div>
          </div>

          {/* Paso 02 */}
          <div className="group">
            <div className="mb-6 overflow-hidden rounded-sm aspect-[16/10] shadow-xl border border-slate-100">
              <img
                alt="Plan Personalizado"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://i.imgur.com/Guh0kgJ.png"
              />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-brandRed font-bold text-xs uppercase tracking-widest">02</span>
              <div className="h-[1px] w-8 bg-brandRed/30"></div>
              <span className="text-brandNavy font-bold text-[10px] uppercase tracking-[0.2em]">
                Estrategia
              </span>
            </div>
            <h3 className="text-xl font-bold mb-4">Plan Personalizado</h3>
            <div className="text-slate-600 text-sm lg:text-base leading-relaxed font-light space-y-3">
              <p className="font-bold text-[#0086f2]">
                Un plan claro y personalizado, diseñado según las necesidades reales de tu hijo.
              </p>
              <p>
                Cada estudiante aprende de manera distinta. Por eso elaboro un plan que prioriza la comprensión, cierra los vacíos detectados en el diagnóstico y respeta su ritmo de aprendizaje.
              </p>
              <p>
                El objetivo no es avanzar rápido ni pasar contenidos, sino lograr <strong>progresos sólidos que se mantengan en el tiempo</strong>.
              </p>
            </div>
          </div>

          {/* Paso 03 */}
          <div className="group">
            <div className="mb-6 overflow-hidden rounded-sm aspect-[16/10] shadow-xl border border-slate-100">
              <img
                alt="Acompañamiento y Seguimiento"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://i.imgur.com/7KNQv2r.png"
              />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-brandRed font-bold text-xs uppercase tracking-widest">03</span>
              <div className="h-[1px] w-8 bg-brandRed/30"></div>
              <span className="text-brandNavy font-bold text-[10px] uppercase tracking-[0.2em]">
                Compromiso
              </span>
            </div>
            <h3 className="text-xl font-bold mb-4">Acompañamiento y Seguimiento</h3>
            <div className="text-slate-600 text-sm lg:text-base leading-relaxed font-light space-y-3">
              <p className="font-bold text-[#0086f2]">
                No están solos en este proceso.
              </p>
              <p>
                No me limito a hacer clases. Acompaño el progreso de tu hijo, observando sus avances y ajustando el trabajo cuando es necesario.
              </p>
              <p>
                Estoy disponible para conversar contigo cuando lo necesites, para que tengas claridad sobre cómo está avanzando y qué aspectos requieren refuerzo.
              </p>
              <p>
                Mi compromiso es acompañarlos durante todo el proceso, con cercanía, responsabilidad y foco en resultados sostenibles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
