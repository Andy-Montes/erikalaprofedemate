import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Methodology from './components/Methodology';
import Programs from './components/Programs';
import PaymentSection from './components/PaymentSection';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import MathBackground from './components/MathBackground';
import FormModal from './components/FormModal';
import FlashmatePage from './components/FlashmatePage';

const App: React.FC = () => {
  const [modalState, setModalState] = useState<{ isOpen: boolean; url: string }>({
    isOpen: false,
    url: '',
  });
  const [currentView, setCurrentView] = useState<'home' | 'flashmate'>(() => {
    try {
      return new URLSearchParams(window.location.search).get('fm') === '1' ? 'flashmate' : 'home';
    } catch {
      return 'home';
    }
  });

  const openModal = (url: string) => {
    if (url.includes("wa.me")) {
      window.open(url, "_blank", "noopener,noreferrer");
      setModalState({ isOpen: false, url: '' });
      return;
    }
    setModalState({ isOpen: true, url });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const showHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showFlashmate = () => {
    setCurrentView('flashmate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'flashmate') {
    return <FlashmatePage onBack={showHome} />;
  }

  return (
    <div className="relative min-h-screen">
      <MathBackground />
      <Header onOpenModal={openModal} onOpenFlashmate={showFlashmate} />
      <main className="relative z-10">
        <Hero onOpenModal={openModal} onOpenFlashmate={showFlashmate} />
        <Methodology />
        <Programs onOpenModal={openModal} />
        <PaymentSection />
        <Testimonials />
        <ContactForm onOpenModal={openModal} />
      </main>
      <Footer onOpenModal={openModal} />
      <AIAssistant />
      
      <FormModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        url={modalState.url} 
      />
    </div>
  );
};

export default App;
