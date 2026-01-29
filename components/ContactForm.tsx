
import React, { useState, useEffect } from 'react';

interface ContactFormProps {
  onOpenModal: (url: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onOpenModal }) => {
  const interviewUrl = "https://formulariogiftcard.fillout.com/reunin-con-erika-la-profe-de-mate";
  
  const availabilityMessages = [
    "Quedan 2 cupos este mes",
    "Queda solo un cupo este mes",
    "Cupos muy limitados",
    "Últimas vacantes disponibles"
  ];

  // Estado para el índice seleccionado (por defecto el primero hasta que se monte el componente)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Intentamos recuperar si ya había un mensaje seleccionado en esta sesión
    const savedIndex = sessionStorage.getItem('erika_spot_index');
    
    let indexToUse: number;
    
    if (savedIndex !== null) {
      indexToUse = parseInt(savedIndex);
    } else {
      // Si es una visita nueva, elegimos uno al azar
      indexToUse = Math.floor(Math.random() * availabilityMessages.length);
      sessionStorage.setItem('erika_spot_index', indexToUse.toString());
    }

    setCurrentIndex(indexToUse);
    
    // Pequeño delay para que el fade-in se vea elegante al cargar la sección
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden border-t border-slate-100 scroll-mt-24" id="sobre-mi">
      <div className="flex flex-col lg:flex-row min-h-[450px]">
        
        {/* Lado Izquierdo: Trayectoria (Fondo Azul) */}
        <div className="w-full lg:w-1/2 bg-brandNavy text-white py-12 lg:py-16 px-8 md:px-12 lg:px-20 flex items-center justify-center">
          <div className="max-w-md w-full flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl relative z-10">
                <img 
                  src="https://i.imgur.com/7RFOaAt.png" 
                  alt="Erika Meriño" 
                  className="w-full h-full object-cover object-top" 
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-brandRed rounded-full flex items-center justify-center text-white shadow-lg z-20 border-2 border-brandNavy">
                <span className="material-symbols-outlined text-xl">verified</span>
              </div>
            </div>

            <span className="text-brandRed font-bold text-[10px] uppercase tracking-[0.4em] mb-2 block">Mi Trayectoria</span>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-white leading-tight uppercase">Erika Meriño</h2>
            <div className="space-y-4 text-white/80 font-light leading-relaxed text-sm lg:text-base text-center">
              <p>Soy Erika Meriño, profesora de matemáticas con más de 30 años de experiencia en educación. A lo largo de mi trayectoria he trabajado con estudiantes de enseñanza media que enfrentan dificultades en la asignatura, acompañándolos a comprender los contenidos, ordenar sus ideas y recuperar la confianza en su desempeño académico.</p>
              <p>Mi enfoque combina metodología, claridad y seguimiento constante, priorizando la comprensión por sobre la memorización y el avance sostenido por sobre los resultados puntuales.</p>
              <p>Desde 2016 realizo clases en modalidad online, utilizando tecnología educativa para ofrecer un aprendizaje cercano, estructurado y efectivo, adaptado a las necesidades reales de cada estudiante.</p>
            </div>
          </div>
        </div>

        {/* Lado Derecho: Disponibilidad (Fondo Blanco) */}
        <div className="w-full lg:w-1/2 bg-white py-12 lg:py-16 px-8 md:px-12 lg:px-20 flex items-center justify-center" id="contacto">
          <div className="max-w-md w-full">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-brandRed animate-pulse"></span>
              <span className="text-brandRed font-bold text-[10px] uppercase tracking-[0.3em]">Disponibilidad Crítica</span>
            </div>
            
            <h3 className="text-2xl lg:text-4xl font-bold mb-6 text-brandNavy leading-tight uppercase tracking-tight">Postula a una Vacante hoy</h3>
            <p className="text-slate-500 text-base lg:text-lg mb-8 font-light leading-relaxed">
              Para asegurar la excelencia premium en mi enseñanza y resultados garantizados, trabajo con un número muy selecto de alumnos por temporada. Agenda ahora tu entrevista inicial de diagnóstico profundo conmigo para evaluar el punto de partida de tu hijo/a.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={() => onOpenModal(interviewUrl)}
                className="w-full sm:w-auto bg-brandRed text-white font-bold py-4 px-10 rounded-sm uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-500/20 text-center text-xs"
              >
                Solicitar Mi Entrevista
              </button>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i+25}`} alt="alumno" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col min-w-[160px]">
                   <p className={`text-[9px] font-bold text-brandNavy uppercase tracking-widest leading-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-y-1'}`}>
                     {availabilityMessages[currentIndex]}
                   </p>
                   <p className="text-[8px] text-slate-400 uppercase tracking-widest">Matrículas Abiertas</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-start gap-3">
              <span className="material-symbols-outlined text-slate-400 text-2xl">info</span>
              <p className="text-[9px] text-slate-600 font-medium uppercase tracking-[0.15em] leading-relaxed">
                El proceso de selección me permite asegurar dedicación personalizada y el cumplimiento de objetivos específicos para cada estudiante.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactForm;
