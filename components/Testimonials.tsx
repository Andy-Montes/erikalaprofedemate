import React, { useState, useEffect, useCallback } from "react";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  stars: number;
  initials: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    name: "María González",
    role: "Mamá de estudiante de 3° medio",
    text: "Mi hijo pasó de estar reprobando matemáticas a sacar un 6,2 en el semestre. Erika no solo enseña, hace que los niños entiendan de verdad. Su paciencia y metodología son increíbles.",
    stars: 5,
    initials: "MG",
    color: "bg-brandRed",
  },
  {
    name: "Catalina Rojas",
    role: "Estudiante PAES 2024",
    text: "Gracias a las clases con Erika subí 120 puntos en la PAES de matemáticas. Ella tiene una forma muy clara de explicar y siempre estuvo disponible para resolver mis dudas. 100% recomendada.",
    stars: 5,
    initials: "CR",
    color: "bg-brandNavy",
  },
  {
    name: "Jorge Pérez",
    role: "Papá de estudiante de 4° medio",
    text: "Contraté a Erika desesperado porque mi hija no entendía nada de matemáticas. En tres meses cambió completamente su actitud hacia la asignatura y logró entrar a la universidad. No tengo palabras.",
    stars: 5,
    initials: "JP",
    color: "bg-[#38388d]",
  },
  {
    name: "Sofía Muñoz",
    role: "Estudiante de 2° medio",
    text: "Antes odiaba las matemáticas, ahora me gustan. Erika explica todo con ejemplos de la vida real y nunca te hace sentir mal por no entender algo. Aprendí más en un mes que en todo el año.",
    stars: 5,
    initials: "SM",
    color: "bg-brandRed",
  },
  {
    name: "Roberto Vásquez",
    role: "Papá de gemelos en 1° medio",
    text: "Contraté a Erika para mis dos hijos al mismo tiempo. Los resultados fueron sorprendentes: ambos mejoraron sus notas significativamente y ahora hacen los deberes sin que uno les recuerde. Excelente profesora.",
    stars: 5,
    initials: "RV",
    color: "bg-brandNavy",
  },
  {
    name: "Valentina Torres",
    role: "Estudiante PAES 2023",
    text: "Llegué a las clases de Erika con mucho miedo a la PAES. Ella me enseñó a perderle el miedo a los problemas y a tener estrategia. Obtuve un puntaje que nunca imaginé. ¡Gracias Erika!",
    stars: 5,
    initials: "VT",
    color: "bg-[#38388d]",
  },
];

const Stars: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const VISIBLE_COUNT = 3; // Cards visibles a la vez en desktop

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const total = testimonials.length;

  const goTo = useCallback(
    (index: number, dir: "left" | "right") => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection(dir);
      setCurrent((index + total) % total);
      setTimeout(() => setIsAnimating(false), 400);
    },
    [isAnimating, total]
  );

  const prev = () => goTo(current - 1, "left");
  const next = useCallback(() => goTo(current + 1, "right"), [current, goTo]);

  // Auto-avance cada 5 segundos
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  // Índices de las 3 tarjetas visibles en desktop
  const getVisibleIndexes = () => {
    return Array.from({ length: VISIBLE_COUNT }, (_, i) => (current + i) % total);
  };

  const visibleIndexes = getVisibleIndexes();

  return (
    <section className="py-16 lg:py-24 bg-softBlue scroll-mt-24" id="testimonios">
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .slide-right { animation: slideInRight 0.4s ease-out both; }
        .slide-left  { animation: slideInLeft  0.4s ease-out both; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-14">
          <span className="text-brandNavy font-bold text-[14px] sm:text-[16px] mb-2 block">
            Lo que dicen nuestros estudiantes
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-brandNavy leading-tight">
            Resultados reales de{" "}
            <span className="text-brandRed">familias reales</span>
          </h2>
          <p className="mt-4 text-slate-500 text-[15px] max-w-xl mx-auto">
            Cada testimonio es una historia de alguien que decidió cambiar su relación con las matemáticas.
          </p>
        </div>

        {/* Carrusel desktop (3 cards) */}
        <div className="hidden md:block relative">
          <div className="grid grid-cols-3 gap-6 overflow-hidden">
            {visibleIndexes.map((idx, position) => {
              const t = testimonials[idx];
              return (
                <div
                  key={`${idx}-${current}`}
                  className={`
                    bg-white rounded-[1.5rem] p-7 flex flex-col gap-4
                    shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)]
                    border border-slate-100
                    transition-all duration-300
                    ${isAnimating ? (direction === "right" ? "slide-right" : "slide-left") : ""}
                  `}
                  style={{ animationDelay: `${position * 60}ms` }}
                >
                  {/* Avatar + info */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`${t.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-[15px] flex-shrink-0`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-black text-brandNavy text-[15px] leading-tight">{t.name}</p>
                      <p className="text-slate-400 text-[12px] leading-tight mt-0.5">{t.role}</p>
                    </div>
                  </div>

                  {/* Estrellas */}
                  <Stars count={t.stars} />

                  {/* Comillas + texto */}
                  <div className="relative">
                    <span className="absolute -top-2 -left-1 text-5xl text-brandRed/15 font-black leading-none select-none">
                      "
                    </span>
                    <p className="text-slate-600 text-[15px] leading-[1.75] pl-4 relative z-10">
                      {t.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Flechas */}
          <button
            onClick={prev}
            aria-label="Anterior testimonio"
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-brandNavy hover:bg-brandNavy hover:text-white transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Siguiente testimonio"
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-brandNavy hover:bg-brandNavy hover:text-white transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Carrusel mobile (1 card) */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div
              key={`mobile-${current}`}
              className={`bg-white rounded-[1.5rem] p-6 flex flex-col gap-4 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)] border border-slate-100 ${isAnimating ? (direction === "right" ? "slide-right" : "slide-left") : ""}`}
            >
              {(() => {
                const t = testimonials[current];
                return (
                  <>
                    <div className="flex items-center gap-3">
                      <div
                        className={`${t.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-[15px] flex-shrink-0`}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <p className="font-black text-brandNavy text-[15px] leading-tight">{t.name}</p>
                        <p className="text-slate-400 text-[12px] leading-tight mt-0.5">{t.role}</p>
                      </div>
                    </div>
                    <Stars count={t.stars} />
                    <div className="relative">
                      <span className="absolute -top-2 -left-1 text-5xl text-brandRed/15 font-black leading-none select-none">
                        "
                      </span>
                      <p className="text-slate-600 text-[15px] leading-[1.75] pl-4 relative z-10">{t.text}</p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Flechas mobile */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={prev}
              aria-label="Anterior testimonio"
              className="w-11 h-11 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-brandNavy hover:bg-brandNavy hover:text-white transition-all duration-200 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Siguiente testimonio"
              className="w-11 h-11 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-brandNavy hover:bg-brandNavy hover:text-white transition-all duration-200 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Dots / indicadores */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? "right" : "left")}
              aria-label={`Ir al testimonio ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2.5 bg-brandRed"
                  : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
