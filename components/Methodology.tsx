
import React from 'react';

const Methodology: React.FC = () => {
  return (
    <section className="py-6 lg:py-8 bg-white relative z-10 scroll-mt-24" id="metodo">      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-6 gap-6 border-b border-slate-100 pb-8">        <div className="max-w-7xl mx-auto px-8">            <span className="text-brandRed font-bold text-[10px] uppercase tracking-[0.4em] mb-3 block">Mi metodología</span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Método de Confianza Matématica</h2>
            <p className="text-base lg:text-lg text-slate-500 leading-relaxed font-light">
              Más que repetir ejercicios, ayudo a tu hijo/a a comprender las matemáticas desde la base, cerrar vacíos y recuperar la confianza para avanzar con seguridad.
            </p>
          </div>
          <div className="h-[2px] w-full lg:w-24 bg-brandRed mb-2"></div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8">          {/* Paso 01 */}
          <div className="group">
            <div className="mb-6 overflow-hidden rounded-sm aspect-[16/10] shadow-xl border border-slate-100">
              <img 
                alt="Diagnóstico Inicial" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src="https://i.imgur.com/iWAXFyM.png"
              />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-brandRed font-bold text-xs uppercase tracking-widest">01</span>
              <div className="h-[1px] w-8 bg-brandRed/30"></div>
              <span className="text-brandNavy font-bold text-[10px] uppercase tracking-[0.2em]">Primer Paso</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Diagnóstico Inicial</h3>
            <div className="text-slate-600 text-sm lg:text-base leading-relaxed font-light space-y-3">
              <p className="font-bold text-brandNavy">Entiendo qué le pasa a tu hijo antes de enseñarle.</p>
              <p>Antes de comenzar, necesito <strong>entender a tu hijo de verdad</strong>. Reviso su nivel académico, pero también cómo se enfrenta a las matemáticas, <strong>qué lo bloquea y qué lo frustra</strong>.</p>
              <p>Este primer diagnóstico permite <strong>avanzar con seguridad</strong>, sin presión innecesaria ni vacíos que después se transforman en problemas.</p>
            </div>
          </div>

          {/* Paso 02 */}
          <div className="group">
            <div className="mb-6 overflow-hidden rounded-sm aspect-[16/10] shadow-xl border border-slate-100">
              <img 
                alt="Plan a Medida" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src="https://i.imgur.com/Guh0kgJ.png"
              />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-brandRed font-bold text-xs uppercase tracking-widest">02</span>
              <div className="h-[1px] w-8 bg-brandRed/30"></div>
              <span className="text-brandNavy font-bold text-[10px] uppercase tracking-[0.2em]">Estrategia</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Plan a Medida</h3>
            <div className="text-slate-600 text-sm lg:text-base leading-relaxed font-light space-y-3">
              <p className="font-bold text-brandNavy">Un plan claro, pensado para tu hijo (no uno estándar).</p>
              <p>Cada estudiante aprende distinto, y yo trabajo en función de eso. Diseño un <strong>plan personalizado</strong> que <strong>refuerza las bases</strong>, <strong>respeta su ritmo</strong> y evita avanzar sin comprensión real.</p>
              <p>El objetivo no es cubrir materia rápido, sino lograr <strong>avances que se mantengan en el tiempo</strong>.</p>
            </div>
          </div>

          {/* Paso 03 */}
          <div className="group">
            <div className="mb-6 overflow-hidden rounded-sm aspect-[16/10] shadow-xl border border-slate-100">
              <img 
                alt="Acompañamiento Continuo" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src="https://i.imgur.com/7KNQv2r.png"
              />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-brandRed font-bold text-xs uppercase tracking-widest">03</span>
              <div className="h-[1px] w-8 bg-brandRed/30"></div>
              <span className="text-brandNavy font-bold text-[10px] uppercase tracking-[0.2em]">Mi Compromiso</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Acompañamiento</h3>
            <div className="text-slate-600 text-sm lg:text-base leading-relaxed font-light space-y-3">
              <p className="font-bold text-brandNavy">No estás sola/o en este proceso.</p>
              <p>No me limito a hacer clases. Hago <strong>seguimiento del progreso</strong> de tu hijo y mantengo <strong>comunicación contigo</strong> para que sepas cómo está avanzando y qué necesita reforzar.</p>
              <p>Mi compromiso es <strong>acompañarlos durante todo el proceso</strong>, con <strong>claridad, cercanía y responsabilidad</strong>.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
