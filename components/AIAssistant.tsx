import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '¡Hola! Soy Erika. He ayudado a cientos de alumnos a superar su miedo a las matemáticas. ¿Cómo puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleOpenKeySelector = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
    } else {
      alert("Para usar el chat, debes configurar una API Key de Google AI Studio.");
    }
  };

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: messageText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await getGeminiResponse([...messages, userMsg], messageText);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
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
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                <img src="https://i.imgur.com/7RFOaAt.png" alt="Erika" className="w-full h-full object-cover object-top" />
              </div>
              <h4 className="font-bold text-sm">Erika · La Profe</h4>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleOpenKeySelector}
                title="Configurar Clave"
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-xl leading-none select-none">vpn_key</span>
              </button>
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-xl leading-none select-none">close</span>
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-[13px] leading-relaxed shadow-sm
                  ${msg.role === 'user' ? 'bg-brandNavy text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'}
                `}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-3 py-2 rounded-xl shadow-sm border border-slate-100 flex gap-1">
                  <span className="w-1.5 h-1.5 bg-brandRed rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-brandRed rounded-full animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 bg-brandRed rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-1 border border-slate-200 focus-within:border-brandRed transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu duda..."
                className="flex-1 bg-transparent border-0 focus:ring-0 text-sm py-2"
              />
              <button onClick={() => handleSend()} disabled={isLoading} className="text-brandRed p-1 flex items-center justify-center">
                <span className="material-symbols-outlined leading-none select-none">send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;