import React, { useState, useEffect } from 'react';
import AnnouncementBanner from './components/AnnouncementBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import WhyUs from './components/WhyUs';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StickyQuickBar from './components/StickyQuickBar';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AdminDashboard from './components/AdminDashboard';
import { translations, sampleProducts } from './data';
import { fetchLiveProducts, fetchLiveReviews, commitReviewsToGitHub, DEFAULT_TOKEN } from './services/githubCms';

export default function App() {
  const [lang, setLang] = useState('en');
  const [inquiryProduct, setInquiryProduct] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  
  // Real-time live products state (synced with public/products.json and GitHub)
  const [liveProducts, setLiveProducts] = useState(() => {
    try {
      const cached = localStorage.getItem('kalpanik_live_products');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return sampleProducts;
  });

  // Real-time live customer reviews state (synced with public/reviews.json and GitHub)
  const [liveReviews, setLiveReviews] = useState(() => {
    try {
      const cached = localStorage.getItem('kalpanik_live_reviews');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const t = translations[lang];

  // Fetch latest products and reviews on mount
  useEffect(() => {
    fetchLiveProducts(sampleProducts).then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setLiveProducts(data);
      }
    });

    fetchLiveReviews([]).then(data => {
      if (Array.isArray(data)) {
        setLiveReviews(data);
      }
    });

    // Check if URL ends with #admin
    if (window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }

    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };

    // Secret Keybinding: Ctrl + Shift + A (or Cmd + Shift + A on Mac)
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };

    window.addEventListener('hashchange', handleHash);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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

  const handleAddCustomerReview = (newReview) => {
    setLiveReviews(prev => {
      const updated = [newReview, ...prev];
      localStorage.setItem('kalpanik_live_reviews', JSON.stringify(updated));

      // Auto-publish to GitHub in background so it's live for all visitors worldwide
      commitReviewsToGitHub({
        token: DEFAULT_TOKEN,
        reviews: updated,
        commitMessage: `feat(review): new customer review by ${newReview.name}`
      }).catch(err => {
        console.warn('Could not auto-commit review to GitHub:', err);
      });

      return updated;
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      <AnnouncementBanner lang={lang} />
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main style={{ flex: 1, width: '100%', overflowX: 'hidden' }}>
        <Hero t={t} lang={lang} />
        <Services t={t} onSelectService={handleSelectService} />
        <Portfolio 
          t={t} 
          lang={lang} 
          products={liveProducts} 
          onInquireProduct={handleInquireProduct} 
        />
        <Testimonials 
          lang={lang} 
          t={t} 
          reviews={liveReviews}
          onAddReview={handleAddCustomerReview}
        />
        <WhyUs t={t} lang={lang} />
        <FAQ t={t} lang={lang} />
        <Contact 
          t={t} 
          lang={lang} 
          prefilledService={inquiryProduct} 
          prefilledMessage={inquiryMessage} 
        />
      </main>
      <Footer t={t} onOpenAdmin={() => setIsAdminOpen(true)} />
      <StickyQuickBar lang={lang} />
      <FloatingWhatsApp />

      {/* GitHub Real-Time Live CMS Dashboard */}
      <AdminDashboard 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        products={liveProducts}
        onUpdateProducts={(updated) => setLiveProducts(updated)}
        reviews={liveReviews}
        onUpdateReviews={(updated) => setLiveReviews(updated)}
      />
    </div>
  );
}
