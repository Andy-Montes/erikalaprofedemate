
import React, { useEffect } from 'react';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose, url }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brandNavy/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        {/* Toolbar */}
        <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brandRed/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-brandRed text-sm font-bold">assignment</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brandNavy">
              Formulario de Contacto · Erika Meriño
            </span>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-brandRed transition-all"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Iframe */}
        <div className="flex-1 bg-slate-50 relative">
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="w-10 h-10 border-4 border-brandRed/20 border-t-brandRed rounded-full animate-spin"></div>
          </div>
          <iframe
            src={url}
            className="w-full h-full relative z-10 border-none"
            title="Formulario Erika Meriño"
            allow="camera; microphone; geolocation"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
