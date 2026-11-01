import React from 'react';
import { motion } from 'framer-motion';
import { CONFIG } from '../data';
import logoImg from '../assets/logo-square-zoomed.png';
import { Globe2, MessageCircle } from 'lucide-react';

const InstagramIcon = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Navbar({ lang, setLang, t }) {
  return (
    <motion.header 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(12, 8, 11, 0.88)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(244, 63, 94, 0.16)',
        padding: '16px 24px'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
          <div style={{ 
            width: '54px', 
            height: '54px', 
            borderRadius: '16px', 
            backgroundColor: '#faede8', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0 6px 20px rgba(244, 63, 94, 0.4)',
            border: '2px solid rgba(244, 63, 94, 0.45)',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <img 
              src={logoImg} 
              alt="Kalpanik Kala Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.15)', display: 'block' }} 
            />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '21px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em', fontFamily: 'var(--font-heading)' }}>
                {t.brandName}
              </span>
              <span style={{ 
                fontSize: '11px', 
                padding: '3px 9px', 
                borderRadius: '9999px', 
                backgroundColor: 'rgba(244, 63, 94, 0.14)', 
                color: '#fbcfe8', 
                border: '1px solid rgba(244, 63, 94, 0.35)',
                fontWeight: 600
              }}>
                @kalpanik_kala_22
              </span>
            </div>
            <p style={{ fontSize: '11.5px', color: 'var(--color-text-dim)', margin: 0 }}>
              {t.tagline}
            </p>
          </div>
        </a>

        {/* Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="hidden-mobile">
          <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s', cursor: 'pointer' }}>{t.nav.services}</a>
          <a href="#portfolio" onClick={(e) => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s', cursor: 'pointer' }}>{t.nav.gallery}</a>
          <a href="#whyus" onClick={(e) => { e.preventDefault(); document.getElementById('whyus')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s', cursor: 'pointer' }}>{t.nav.about}</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s', cursor: 'pointer' }}>{t.nav.enquiry}</a>
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Lang Toggle */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: 'rgba(255, 255, 255, 0.05)', 
            border: '1px solid var(--color-border)', 
            borderRadius: '9999px', 
            padding: '2px 4px' 
          }}>
            <button 
              onClick={() => setLang('hi')} 
              style={{ 
                background: lang === 'hi' ? 'var(--gradient-rose-gold)' : 'transparent',
                color: lang === 'hi' ? '#ffffff' : 'var(--color-text-muted)',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              हिंदी
            </button>
            <button 
              onClick={() => setLang('en')} 
              style={{ 
                background: lang === 'en' ? 'var(--gradient-rose-gold)' : 'transparent',
                color: lang === 'en' ? '#ffffff' : 'var(--color-text-muted)',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              EN
            </button>
          </div>

          <a 
            href={CONFIG.instagramUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-insta-sethji nav-hide-sm"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            <InstagramIcon size={15} />
            <span>Insta DM</span>
          </a>

          <a 
            href={`https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-wa-sethji"
            style={{ padding: '8px 14px', fontSize: '13px' }}
          >
            <MessageCircle size={15} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
