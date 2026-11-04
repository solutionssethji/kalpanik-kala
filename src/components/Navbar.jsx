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
      className="navbar-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(12, 8, 11, 0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(244, 63, 94, 0.16)',
        padding: '14px 20px'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        
        {/* Brand Left */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', minWidth: 0, flexShrink: 0 }}>
          <div style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '12px', 
            backgroundColor: '#faede8', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0 4px 15px rgba(244, 63, 94, 0.35)',
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em', fontFamily: 'var(--font-heading)', whiteSpace: 'nowrap' }}>
                {t.brandName}
              </span>
              <span className="navbar-handle-pill" style={{ 
                fontSize: '10.5px', 
                padding: '2px 8px', 
                borderRadius: '9999px', 
                backgroundColor: 'rgba(244, 63, 94, 0.14)', 
                color: '#fbcfe8', 
                border: '1px solid rgba(244, 63, 94, 0.35)',
                fontWeight: 600,
                whiteSpace: 'nowrap'
              }}>
                @kalpanik_kala_22
              </span>
            </div>
            <p className="navbar-brand-tagline" style={{ fontSize: '11px', color: 'var(--color-text-dim)', margin: 0, whiteSpace: 'nowrap' }}>
              {t.tagline}
            </p>
          </div>
        </a>

        {/* Links (Desktop) */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '22px' }} className="hidden-mobile">
          <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s', cursor: 'pointer' }}>{t.nav.services}</a>
          <a href="#portfolio" onClick={(e) => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s', cursor: 'pointer' }}>{t.nav.gallery}</a>
          <a href="#testimonials" onClick={(e) => { e.preventDefault(); document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s', cursor: 'pointer' }}>{t.nav.testimonials}</a>
          <a href="#whyus" onClick={(e) => { e.preventDefault(); document.getElementById('whyus')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s', cursor: 'pointer' }}>{t.nav.about}</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s', cursor: 'pointer' }}>{t.nav.enquiry}</a>
        </nav>

        {/* Actions Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Lang Toggle Switcher */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: 'rgba(255, 255, 255, 0.06)', 
            border: '1px solid var(--color-border)', 
            borderRadius: '9999px', 
            padding: '2px 3px' 
          }}>
            <button 
              onClick={() => setLang('hi')} 
              style={{ 
                background: lang === 'hi' ? 'var(--gradient-rose-gold)' : 'transparent',
                color: lang === 'hi' ? '#ffffff' : 'var(--color-text-muted)',
                border: 'none',
                padding: '4px 8px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              हिं
            </button>
            <button 
              onClick={() => setLang('en')} 
              style={{ 
                background: lang === 'en' ? 'var(--gradient-rose-gold)' : 'transparent',
                color: lang === 'en' ? '#ffffff' : 'var(--color-text-muted)',
                border: 'none',
                padding: '4px 8px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              EN
            </button>
          </div>

          {/* Instagram Button (Desktop / Tablet only) */}
          <a 
            href={CONFIG.instagramUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-insta-sethji hidden-mobile"
            style={{ padding: '7px 14px', fontSize: '13px' }}
          >
            <InstagramIcon size={14} />
            <span>Insta DM</span>
          </a>

          {/* WhatsApp Action Button */}
          <a 
            href={`https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="navbar-wa-btn"
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '7px 12px',
              fontSize: '12.5px',
              fontWeight: 700,
              borderRadius: '9999px',
              background: '#25D366',
              color: '#ffffff',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <MessageCircle size={15} />
            <span className="navbar-wa-text">Chat</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
