import React, { useState } from 'react';

interface HeaderProps {
  onOpenModal: (url: string) => void;
  onOpenFlashmate: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal, onOpenFlashmate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const interviewUrl = "https://wa.me/56997439227";
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
              src="/images/erika-logo.jpeg"
              alt="Erika · La Profe de Mate" 
              className="h-16 md:h-20 w-auto object-contain py-2"
            />
          </a>
        </div>
        <nav className="hidden xl:flex items-center gap-8 text-xs font-bold uppercase tracking-[0.2em] text-brandNavy">
          <a className="hover:text-brandRed transition-colors cursor-pointer" href="#metodo" onClick={(e) => scrollToSection(e, 'metodo')}>Mi metodología</a>
          <a className="hover:text-brandRed transition-colors cursor-pointer" href="#programas" onClick={(e) => scrollToSection(e, 'programas')}>Mis programas</a>
          <a className="hover:text-brandRed transition-colors cursor-pointer" href="#sobre-mi" onClick={(e) => scrollToSection(e, 'sobre-mi')}>Quién Soy</a>
          <a className="hover:text-brandRed transition-colors cursor-pointer" href="#pagos" onClick={(e) => scrollToSection(e, 'pagos')}>Pagos</a>
          <button
            className="group flex items-center gap-2 rounded-full border border-[#38388E]/25 bg-[#EEF0F8] px-5 py-3 transition-all hover:-translate-y-0.5 hover:border-[#ED3B62]/45 hover:bg-white hover:shadow-lg hover:shadow-[#38388E]/15"
            onClick={onOpenFlashmate}
          >
            <span className="material-symbols-outlined text-[18px] text-[#ED3B62] transition-transform group-hover:scale-110">bolt</span>
            <span>
              <span className="text-[#38388E]">Flash</span>
              <span className="text-[#ED3B62]">Mate</span>
            </span>
          </button>
          <button
            className="rounded-full bg-[#0086f2] px-8 py-4 text-white shadow-lg shadow-[#0086f2]/25 transition-all hover:-translate-y-0.5 hover:bg-[#006fc9] hover:shadow-[#0086f2]/35 uppercase tracking-[0.2em]"
            onClick={() => onOpenModal(interviewUrl)}
          >
            Agendar Entrevista
          </button>
        </nav>
        <button 
          className="xl:hidden text-brandNavy p-2 flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-3xl leading-none select-none">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`xl:hidden fixed inset-x-0 top-24 bg-white shadow-xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[520px] border-b border-slate-100' : 'max-h-0'}`}>
        <nav className="flex flex-col p-8 gap-6 text-xs font-bold uppercase tracking-[0.2em] text-brandNavy">
          <a className="hover:text-brandRed cursor-pointer" href="#metodo" onClick={(e) => scrollToSection(e, 'metodo')}>Mi metodología</a>
          <a className="hover:text-brandRed cursor-pointer" href="#programas" onClick={(e) => scrollToSection(e, 'programas')}>Mis programas</a>
          <a className="hover:text-brandRed cursor-pointer" href="#sobre-mi" onClick={(e) => scrollToSection(e, 'sobre-mi')}>Quién Soy</a>
          <a className="hover:text-brandRed cursor-pointer" href="#pagos" onClick={(e) => scrollToSection(e, 'pagos')}>Pagos</a>
          <button
            className="flex items-center justify-center gap-2 rounded-full border border-[#38388E]/25 bg-[#EEF0F8] px-8 py-4 uppercase tracking-[0.2em]"
            onClick={() => {
              onOpenFlashmate();
              setIsMobileMenuOpen(false);
            }}
          >
            <span className="material-symbols-outlined text-[18px] text-[#ED3B62]">bolt</span>
            <span>
              <span className="text-[#38388E]">Flash</span>
              <span className="text-[#ED3B62]">Mate</span>
            </span>
          </button>
          <button
            className="rounded-full bg-[#0086f2] px-8 py-4 text-center text-white shadow-lg shadow-[#0086f2]/25 uppercase tracking-[0.2em]"
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
