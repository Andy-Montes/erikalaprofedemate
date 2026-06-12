
import React, { useState, useEffect } from 'react';

interface HeroProps {
  onOpenModal: (url: string) => void;
  onOpenFlashmate: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal, onOpenFlashmate }) => {
  const interviewUrl = "https://wa.me/56997439227";
  const phrases = [
    "No se trata solo de aprobar Matemáticas. Se trata de aprender de verdad.",
    "Matemáticas bien enseñada generan resultados reales.",
    "Cerrar vacíos en Matemáticas hoy evita frustraciones mañana.",
    "Cuando un estudiante entiende Matemáticas, la confianza vuelve."
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setIsVisible(true);
      }, 600);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderHighlightedPhrase = (text: string) => {
    const wordToHighlight = "matemáticas";
    const regex = new RegExp(`(${wordToHighlight})`, 'gi');

    if (regex.test(text)) {
      const parts = text.split(regex);
      return parts.map((part, i) =>
        regex.test(part) ? <span key={i} className="text-brandRed">{part}</span> : part
      );
    }

    const words = text.split(' ');
    const firstPart = words.slice(0, 3).join(' ');
    const rest = words.slice(3).join(' ');
    return (
      <>
        <span className="text-brandRed">{firstPart}</span> {rest}
      </>
    );
  };

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Plano Cartesiano sutil */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brandNavy"></div>
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-brandNavy"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 w-full relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">

          {/* Columna de Texto */}
          <div className="w-full md:w-[68%]">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[2px] w-12 bg-brandRed"></div>
                <span className="text-brandRed text-[11px] font-black uppercase tracking-[0.4em]">Educación Matemática de alto nivel</span>
              </div>

              <div className="min-h-[160px] sm:min-h-[200px] lg:min-h-[260px] flex flex-col justify-center">
                <h1
                  className={`text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight transition-all duration-1000 transform ${
                    isVisible
                      ? 'opacity-100 translate-y-0 blur-0'
                      : 'opacity-0 translate-y-8 blur-md'
                  }`}
                >
                  {renderHighlightedPhrase(phrases[currentIndex])}
                </h1>
              </div>

              <p className="text-lg md:text-2xl text-slate-400 mt-8 mb-12 leading-relaxed font-light max-w-2xl">
                <span className="text-[#0086f2] font-medium">Clases de Matemáticas y preparación PAES</span> <span className="text-brandNavy font-light">enfocadas en cerrar vacíos, eliminar miedo y recuperar la confianza.</span>              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <button
                  className="group relative overflow-hidden rounded-full bg-[#0086f2] px-12 py-5 text-center text-xs font-bold uppercase tracking-widest text-white shadow-2xl shadow-[#0086f2]/25 transition-all hover:-translate-y-0.5 hover:bg-[#006fc9] hover:shadow-[#0086f2]/35"
                  onClick={() => onOpenModal(interviewUrl)}
                >
                  <span className="relative z-10">Agendar Mi Entrevista</span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </div>

            </div>
          </div>

          {/* Columna de Imagen */}
          <div className="w-full md:w-[32%] flex-shrink-0 relative">
            <div className="hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full text-brandNavy">
                <path id="circlePath" fill="none" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                <text className="text-[4px] font-bold uppercase tracking-[2px]">
                  <textPath href="#circlePath">
                    Cálculo · Álgebra · Geometría · Probabilidades · Funciones · Matemáticas ·
                  </textPath>
                </text>
              </svg>
            </div>

            <div className="relative h-[420px] lg:h-[500px] w-full rounded-[2rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(31,58,95,0.2)] border border-slate-100 bg-white group z-10">
              <img
                alt="Erika Meriño - La Profe de Mate"
                className="w-full h-full object-cover object-top brightness-[1.02] transition-transform duration-[10s] ease-linear"
                src="/images/erika-photo.png"
                style={{ animation: 'breathe 8s ease-in-out infinite' }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-brandNavy/60 via-transparent to-transparent opacity-80"></div>

              <div className="absolute bottom-8 left-0 right-0 px-8">
                <div className="bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-2xl border-l-8 border-brandRed transform transition-all group-hover:-translate-y-2">
                  <p className="text-brandNavy text-xl font-black mb-1">Erika Meriño</p>
                  <p className="text-slate-500 text-[10px] uppercase tracking-[0.25em] font-bold leading-tight">30 Años Enseñando Confianza</p>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenFlashmate}
              className="group relative z-20 mt-5 w-full overflow-hidden rounded-2xl border border-red-300/70 bg-brandRed text-left text-white shadow-2xl shadow-red-600/25 ring-1 ring-white/40 transition-all hover:-translate-y-1 hover:bg-red-700 hover:shadow-red-600/35"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-white/55"></div>
              <div className="absolute inset-y-4 left-0 w-1.5 rounded-r-full bg-white/70"></div>
              <div className="absolute -left-24 top-0 h-full w-16 rotate-12 bg-white/20 blur-md transition-transform duration-700 group-hover:translate-x-[520px]"></div>
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10"></div>
              <div className="relative flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white">
                  <span className="material-symbols-outlined text-[28px]">bolt</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 text-[9px] font-black uppercase tracking-[0.22em] text-white/70">
                    Acceso exclusivo
                  </div>
                  <h2 className="text-xl font-extrabold leading-tight text-white">
                    FlashMate
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-white/78">
                    Guías, práctica y seguimiento para alumnos con plan activo.
                  </p>
                </div>
                <span className="material-symbols-outlined text-[22px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </div>
            </button>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
