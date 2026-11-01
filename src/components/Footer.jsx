import React from 'react';
import { Heart, MessageCircle, Mail } from 'lucide-react';
import { CONFIG } from '../data';
import logoImg from '../assets/logo-square-zoomed.png';

const InstagramIcon = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Footer({ t }) {
  return (
    <footer style={{ backgroundColor: '#05070a', borderTop: '1px solid var(--color-border)', padding: '60px 24px 30px', color: 'var(--color-text-dim)', fontSize: '13px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#faede8', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(244, 63, 94, 0.4)', overflow: 'hidden', flexShrink: 0 }}>
                <img src={logoImg} alt="Kalpanik Kala Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.15)' }} />
              </div>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>{t.brandName}</span>
            </div>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, maxWidth: '340px', marginBottom: '20px' }}>
              {t.footer.aboutText}
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href={CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fda4af', textDecoration: 'none' }}>
                <InstagramIcon size={16} />
              </a>
              <a href={`https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86efac', textDecoration: 'none' }}>
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '16px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {t.footer.quickLinks}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="#services" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>{t.nav.services}</a>
              <a href="#portfolio" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>{t.nav.gallery}</a>
              <a href="#whyus" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>{t.nav.about}</a>
              <a href="#contact" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>{t.nav.enquiry}</a>
            </div>
          </div>

          {/* Direct Channels */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '16px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {t.footer.connectHeading}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href={CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#fda4af', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <InstagramIcon size={15} />
                <span>@{CONFIG.instagramHandle}</span>
              </a>
              <a href={`https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#86efac', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageCircle size={15} />
                <span>{CONFIG.whatsappDisplay}</span>
              </a>
              <a href={`mailto:${CONFIG.email}`} style={{ color: '#93c5fd', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} />
                <span>{CONFIG.email}</span>
              </a>
              <span style={{ color: 'var(--color-text-dim)' }}>
                📍 {CONFIG.location}
              </span>
            </div>
          </div>

        </div>

        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', fontSize: '12.5px' }}>
          <div>
            <p style={{ margin: 0, color: 'var(--color-text-dim)' }}>
              © {new Date().getFullYear()} <strong style={{ color: '#ffffff' }}>{t.brandName}</strong>. All rights reserved.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span>Crafted with</span>
            <Heart size={14} style={{ color: '#f43f5e', fill: '#f43f5e' }} />
            <span style={{ opacity: 0.4 }}>•</span>
            <span>Designed & Developed by</span>
            <a 
              href="https://sethji-solutions.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: '#fde68a', 
                fontWeight: 700, 
                textDecoration: 'none', 
                background: 'rgba(245, 158, 11, 0.12)', 
                border: '1px solid rgba(245, 158, 11, 0.3)', 
                padding: '3px 10px', 
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--gradient-gold)';
                e.currentTarget.style.color = '#000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(245, 158, 11, 0.12)';
                e.currentTarget.style.color = '#fde68a';
              }}
            >
              Sethji Solutions Private Limited
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
