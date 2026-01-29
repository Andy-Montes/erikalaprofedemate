import React, { useState } from 'react';

interface HeaderProps {
  onOpenModal: (url: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const interviewUrl = "https://formulariogiftcard.fillout.com/reunin-con-erika-la-profe-de-mate";

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 h-24 flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="flex items-center">
            <img 
              src="https://i.imgur.com/xlLe1K9.jpeg" 
              alt="Erika · La Profe de Mate" 
              className="h-16 md:h-20 w-auto object-contain py-2"
            />
          </a>
        </div>
        <nav className="hidden lg:flex items-center gap-12 text-xs font-bold uppercase tracking-[0.2em] text-brandNavy">
          <a className="hover:text-brandRed transition-colors cursor-pointer" href="#metodo" onClick={(e) => scrollToSection(e, 'metodo')}>Mi metodología</a>
          <a className="hover:text-brandRed transition-colors cursor-pointer" href="#programas" onClick={(e) => scrollToSection(e, 'programas')}>Mis programas</a>
          <a className="hover:text-brandRed transition-colors cursor-pointer" href="#sobre-mi" onClick={(e) => scrollToSection(e, 'sobre-mi')}>Quién Soy</a>
          <button 
            className="bg-brandRed text-white px-8 py-4 rounded-sm hover:bg-red-700 transition-all shadow-lg shadow-red-500/30 uppercase tracking-[0.2em]" 
            onClick={() => onOpenModal(interviewUrl)}
          >
            Agendar Entrevista
          </button>
        </nav>
        <button 
          className="lg:hidden text-brandNavy p-2 flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-3xl leading-none select-none">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-x-0 top-24 bg-white shadow-xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[450px] border-b border-slate-100' : 'max-h-0'}`}>
        <nav className="flex flex-col p-8 gap-6 text-xs font-bold uppercase tracking-[0.2em] text-brandNavy">
          <a className="hover:text-brandRed cursor-pointer" href="#metodo" onClick={(e) => scrollToSection(e, 'metodo')}>Mi metodología</a>
          <a className="hover:text-brandRed cursor-pointer" href="#programas" onClick={(e) => scrollToSection(e, 'programas')}>Mis programas</a>
          <a className="hover:text-brandRed cursor-pointer" href="#sobre-mi" onClick={(e) => scrollToSection(e, 'sobre-mi')}>Quién Soy</a>
          <button 
            className="bg-brandRed text-white px-8 py-4 rounded-sm text-center uppercase tracking-[0.2em]" 
            onClick={() => {
              onOpenModal(interviewUrl);
              setIsMobileMenuOpen(false);
            }}
          >
            Agendar Entrevista
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;