import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';
import { CONFIG } from '../data';

const InstagramIcon = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function StickyQuickBar({ lang = 'en' }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past hero (300px) and hide if near footer
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      
      if (scrollY > 320 && scrollY + windowHeight < docHeight - 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOrderClick = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(`https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}`, '_blank');
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="sticky-quick-bar"
          style={{
            position: 'fixed',
            bottom: '16px',
            left: '16px',
            right: '16px',
            zIndex: 90,
            maxWidth: '520px',
            margin: '0 auto',
            background: 'rgba(20, 13, 18, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(244, 63, 94, 0.28)',
            borderRadius: '24px',
            padding: '8px 12px',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.65), 0 0 20px rgba(244, 63, 94, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px'
          }}
        >
          {/* Status Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '6px' }}>
            <span style={{ position: 'relative', display: 'flex', height: '10px', width: '10px' }}>
              <span style={{
                position: 'absolute',
                display: 'inline-flex',
                height: '100%',
                width: '100%',
                borderRadius: '9999px',
                backgroundColor: '#10b981',
                opacity: 0.75,
                animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
              }} />
              <span style={{
                position: 'relative',
                display: 'inline-flex',
                borderRadius: '9999px',
                height: '10px',
                width: '10px',
                backgroundColor: '#10b981'
              }} />
            </span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#fde68a', letterSpacing: '0.02em', lineHeight: 1.2 }}>
                {lang === 'hi' ? 'बुकिंग जारी है' : 'Taking Orders'}
              </span>
              <span style={{ fontSize: '9.5px', color: 'var(--color-text-dim)', lineHeight: 1.1 }}>
                {lang === 'hi' ? 'ऑल-इंडिया डिलीवरी' : 'Pan-India Express'}
              </span>
            </div>
          </div>

          {/* Buttons Group */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Instagram DM Button */}
            <a
              href={`https://ig.me/m/${CONFIG.instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                padding: '8px 12px',
                borderRadius: '9999px',
                background: 'rgba(244, 63, 94, 0.14)',
                border: '1px solid rgba(244, 63, 94, 0.35)',
                color: '#fda4af',
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'none',
                whiteSpace: 'nowrap'
              }}
              title="Chat on Instagram"
            >
              <InstagramIcon size={14} />
              <span>{lang === 'hi' ? 'इंस्टाग्राम' : 'IG DM'}</span>
            </a>

            {/* Primary WhatsApp Order Button */}
            <button
              onClick={handleOrderClick}
              className="btn-wa-sethji"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '9px 16px',
                borderRadius: '9999px',
                fontSize: '12.5px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 16px rgba(34, 197, 94, 0.35)'
              }}
            >
              <MessageCircle size={15} />
              <span>{lang === 'hi' ? 'व्हाट्सएप ऑर्डर' : 'Quick Order'}</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

