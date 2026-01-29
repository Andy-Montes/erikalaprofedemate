import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'bot' | 'user';
  text: string;
  options?: string[];
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    role: 'bot',
    text: '¡Hola! Soy Erika Meriño, "La Profe de Mate". ¿En qué puedo ayudarte hoy?',
    options: [
      '¿Qué tutorías ofreces?',
      '¿Cómo son las clases?',
      '¿Cuál es el precio?',
      'Quiero agendar una entrevista'
    ]
  }]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const responses: { [key: string]: Message } = {
    '¿Qué tutorías ofreces?': {
      role: 'bot',
      text: 'Ofrezco tres tipos de servicios:\n\n• Tutorías Individuales: Clases personalizadas según tus necesidades\n• Talleres Grupales: Aprendizaje colaborativo\n• Entrenamiento PAES (M1/M2): Preparación completa para la prueba\n\n¿Te gustaría saber más sobre alguna?',
      options: ['Tutorías Individuales', 'Talleres Grupales', 'Entrenamiento PAES', 'Volver al menú']
    },
    'Tutorías Individuales': {
      role: 'bot',
      text: 'Las tutorías individuales son clases 100% personalizadas donde trabajamos a tu ritmo. Con 30 años de experiencia, he ayudado a cientos de alumnos a superar su miedo a las matemáticas.\n\n¿Quieres conocer los detalles y precios?',
      options: ['¿Cuál es el precio?', 'Quiero agendar una entrevista', 'Volver al menú']
    },
    'Talleres Grupales': {
      role: 'bot',
      text: 'Los talleres grupales son perfectos para aprender junto a otros estudiantes en un ambiente colaborativo. Creamos grupos reducidos para mantener la calidad de la enseñanza.\n\n¿Te gustaría agendar una entrevista para conocer más?',
      options: ['¿Cuál es el precio?', 'Quiero agendar una entrevista', 'Volver al menú']
    },
    'Entrenamiento PAES': {
      role: 'bot',
      text: 'El Entrenamiento PAES está diseñado específicamente para preparar las pruebas de Matemática 1 (M1) y Matemática 2 (M2). Metodología enfocada en resultados con ejercicios tipo prueba.\n\n¿Quieres conocer más detalles?',
      options: ['¿Cuál es el precio?', 'Quiero agendar una entrevista', 'Volver al menú']
    },
    '¿Cómo son las clases?': {
      role: 'bot',
      text: 'Mis clases están diseñadas para eliminar el miedo y construir confianza. No se trata de pasar matemáticas, se trata de aprenderlas.\n\nUtilizo una metodología que se adapta a cada alumno, con ejercicios prácticos y explicaciones claras.',
      options: ['¿Qué tutorías ofreces?', '¿Cuál es el precio?', 'Quiero agendar una entrevista', 'Volver al menú']
    },
    '¿Cuál es el precio?': {
      role: 'bot',
      text: 'Los valores varían según el tipo de tutoría y tus necesidades específicas. Por eso, ofrezco una entrevista de diagnóstico GRATUITA donde:\n\n• Evaluamos tu nivel actual\n• Definimos objetivos\n• Diseñamos un plan personalizado\n• Te entrego el valor exacto\n\n¿Agendamos la entrevista?',
      options: ['Quiero agendar una entrevista', 'Contactar por WhatsApp', 'Volver al menú']
    },
    'Quiero agendar una entrevista': {
      role: 'bot',
      text: '¡Excelente decisión! Puedes agendar tu entrevista gratuita de las siguientes formas:',
      options: ['Formulario de contacto', 'WhatsApp', 'Instagram', 'Volver al menú']
    },
    'Contactar por WhatsApp': {
      role: 'bot',
      text: '¡Perfecto! Voy a redirigirte a WhatsApp para que podamos conversar directamente.',
      options: ['Volver al menú']
    },
    'Volver al menú': {
      role: 'bot',
      text: '¿En qué más puedo ayudarte?',
      options: [
        '¿Qué tutorías ofreces?',
        '¿Cómo son las clases?',
        '¿Cuál es el precio?',
        'Quiero agendar una entrevista'
      ]
    }
  };

  const handleOptionClick = (option: string) => {
    // Agregar mensaje del usuario
    setMessages(prev => [...prev, { role: 'user', text: option }]);

    // Manejar acciones especiales
    if (option === 'Formulario de contacto') {
      window.location.href = '#contacto';
      return;
    }
    if (option === 'WhatsApp' || option === 'Contactar por WhatsApp') {
      window.open('https://wa.me/56912345678?text=Hola%20Erika,%20quisiera%20agendar%20una%20entrevista', '_blank');
      setMessages(prev => [...prev, responses['Contactar por WhatsApp']]);
      return;
    }
    if (option === 'Instagram') {
      window.open('https://www.instagram.com/erikalaprofedemate', '_blank');
      setTimeout(() => {
        setMessages(prev => [...prev, responses['Volver al menú']]);
      }, 500);
      return;
    }

    // Agregar respuesta del bot
    setTimeout(() => {
      const response = responses[option] || responses['Volver al menú'];
      setMessages(prev => [...prev, response]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-poppins text-slate-900">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brandRed text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all hover:bg-red-700 relative group overflow-hidden"
          aria-label="Abrir chat"
        >
          <span className="material-symbols-outlined text-3xl leading-none select-none">chat</span>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-brandRed border-2 border-white"></span>
          </span>
        </button>
      )}
      {isOpen && (
        <div className="bg-white w-[350px] md:w-[400px] h-[550px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-10 duration-300">
          <div className="bg-brandNavy p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                <img src="https://i.imgur.com/7RFOaAt.png" alt="Erika" className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Erika Meriño</h4>
                <p className="text-xs text-white/80">La Profe de Mate</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
              <span className="material-symbols-outlined text-xl leading-none select-none">close</span>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx}>
                {msg.role === 'user' ? (
                  <div className="flex justify-end">
                    <div className="bg-brandNavy text-white px-4 py-2 rounded-xl rounded-tr-none max-w-[85%] text-sm shadow-sm">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-start">
                      <div className="bg-white text-slate-700 px-4 py-3 rounded-xl rounded-tl-none max-w-[85%] text-sm shadow-sm border border-slate-100 whitespace-pre-line">
                        {msg.text}
                      </div>
                    </div>
                    {msg.options && (
                      <div className="flex flex-wrap gap-2 pl-2">
                        {msg.options.map((option, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => handleOptionClick(option)}
                            className="bg-white hover:bg-brandRed hover:text-white text-brandNavy px-3 py-2 rounded-lg text-xs font-medium transition-all shadow-sm border border-slate-200 hover:border-brandRed hover:shadow-md"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
