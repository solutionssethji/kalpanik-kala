import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { translations } from './data';

export default function App() {
  const [lang, setLang] = useState('en');
  const [inquiryProduct, setInquiryProduct] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');

  const t = translations[lang];

  const handleSelectService = (serviceName) => {
    setInquiryProduct(serviceName);
    setInquiryMessage(
      lang === 'hi'
        ? `नमस्ते! मुझे "${serviceName}" के बारे में जानकारी चाहिए और इसे कस्टमाइज करवाना है।`
        : `Hello! I would like to inquire about "${serviceName}" and customize it.`
    );
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInquireProduct = (product) => {
    const title = lang === 'hi' ? product.titleHi : product.titleEn;
    setInquiryProduct(title);
    setInquiryMessage(
      lang === 'hi'
        ? `नमस्ते! मुझे आपके "${title}" (${product.price}) के बारे में जानना है और इसे कस्टमाइज करवाना है।`
        : `Hello! I would like to inquire about "${title}" (${product.price}) and get it customized.`
    );
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main style={{ flex: 1 }}>
        <Hero t={t} lang={lang} />
        <Services t={t} onSelectService={handleSelectService} />
        <Portfolio t={t} lang={lang} onInquireProduct={handleInquireProduct} />
        <WhyUs t={t} lang={lang} />
        <Contact 
          t={t} 
          lang={lang} 
          prefilledService={inquiryProduct} 
          prefilledMessage={inquiryMessage} 
        />
      </main>
      <Footer t={t} />
      <FloatingWhatsApp />
    </div>
  );
}
