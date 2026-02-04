import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Methodology from './components/Methodology';
import Programs from './components/Programs';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import MathBackground from './components/MathBackground';
import FormModal from './components/FormModal';

const App: React.FC = () => {
  const [modalState, setModalState] = useState<{ isOpen: boolean; url: string }>({
    isOpen: false,
    url: '',
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

  return (
    <div className="relative min-h-screen">
      <MathBackground />
      <Header onOpenModal={openModal} />
      <main className="relative z-10">
        <Hero onOpenModal={openModal} />
        <Methodology />
        <Programs onOpenModal={openModal} />
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
