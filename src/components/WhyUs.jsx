import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { CONFIG } from '../data';

const InstagramIcon = ({ size = 26, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function WhyUs({ t, lang }) {
  return (
    <section id="whyus" style={{ padding: '90px 24px', backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 60px' }}>
          <div className="sethji-badge">
            <Sparkles size={14} className="text-amber-400" />
            <span>Artisan Quality</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, marginBottom: '16px' }}>
            <span className="gradient-text">{t.whyUs.title}</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>
            The craft philosophy behind Kalpanik Kala (@kalpanik_kala_22)
          </p>
        </div>

        {/* 4 Points Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '50px' }}>
          {t.whyUs.points.map((pt, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="sethji-card"
              style={{ padding: '28px' }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fda4af', marginBottom: '20px' }}>
                <CheckCircle2 size={22} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                {pt.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                {pt.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Thank You & Welcome Card Signature Feature */}
        <div 
          className="sethji-card" 
          style={{ 
            padding: '36px 32px', 
            marginBottom: '40px',
            background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(26, 17, 24, 0.95) 100%)', 
            border: '1px solid rgba(244, 63, 94, 0.28)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '36px',
            alignItems: 'center',
            borderRadius: '24px'
          }}
        >
          {/* Card Preview Photo */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
              position: 'relative',
              maxWidth: '280px',
              width: '100%',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(0,0,0,0.7)',
              border: '2px solid rgba(244, 63, 94, 0.3)',
              transform: 'rotate(-2deg)',
              transition: 'transform 0.4s ease'
            }}>
              <img 
                src="/assets/kalpanik-kala-thankyou-card.jpg" 
                alt="Kalpanik Kala Official Welcome & Thank You Card with Instagram QR Code" 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>

          {/* Details */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 14px', borderRadius: '9999px', background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#fda4af', fontSize: '11px', fontWeight: 700, marginBottom: '14px', letterSpacing: '0.04em' }}>
              <Sparkles size={13} />
              <span>{lang === 'hi' ? 'हर ऑर्डर के साथ खास तोहफ़ा' : 'INCLUDED WITH EVERY ORDER'}</span>
            </div>

            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>
              {lang === 'hi' ? 'हस्तनिर्मित वेलकम व थैंक यू कार्ड' : 'Official Welcome & Thank You Keepsake'}
            </h3>

            <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '18px' }}>
              {lang === 'hi' 
                ? 'मुस्कान जैन द्वारा हर एक पार्सल में यह सुंदर पर्सनलाइज्ड "Welcome to my world" कार्ड और इंस्टाग्राम स्कैन QR कोड प्यार से शामिल किया जाता है।' 
                : 'Crafted with genuine warmth — every package sent by Muskaan Jain includes our signature "Welcome to my world" keepsake card featuring quick-scan Instagram QR code.'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              {['100% Handcrafted', 'Personalized Love', 'Scan to Connect', 'By Muskaan Jain ❤️'].map((pill, idx) => (
                <span key={idx} style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--color-border)', color: '#fde68a' }}>
                  ✓ {pill}
                </span>
              ))}
            </div>

            <a 
              href={CONFIG.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary-sethji"
              style={{ padding: '12px 24px', fontSize: '13px' }}
            >
              <span>{lang === 'hi' ? 'इंस्टाग्राम पर जुड़ें (@kalpanik_kala_22)' : 'Connect on Instagram (@kalpanik_kala_22)'}</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Instagram Profile Spotlight Card */}
        <div className="sethji-card" style={{ padding: '36px', background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(20, 27, 40, 0.95) 100%)', border: '1px solid rgba(244, 63, 94, 0.25)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'var(--gradient-insta)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(220, 39, 67, 0.4)' }}>
              <InstagramIcon size={32} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: 0 }}>@kalpanik_kala_22</h4>
                <span style={{ fontSize: '11px', background: 'rgba(244, 63, 94, 0.18)', color: '#fda4af', padding: '2px 8px', borderRadius: '9999px', fontWeight: 700 }}>by Muskaan Jain ❤️</span>
                <span style={{ fontSize: '11px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', padding: '2px 8px', borderRadius: '9999px', fontWeight: 600 }}>5+ Years Mastery</span>
                <span style={{ fontSize: '11px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '2px 8px', borderRadius: '9999px', fontWeight: 600 }}>🚚 200+ Delivered All India</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', margin: 0 }}>
                {lang === 'hi' ? 'इंस्टाग्राम पर नए डिजाइन्स और रील्स देखें!' : 'Check reels, customer unboxings, and fresh custom designs!'}
              </p>
            </div>
          </div>

          <a 
            href={CONFIG.instagramUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-insta-sethji"
            style={{ padding: '14px 28px', fontSize: '14px' }}
          >
            <span>Visit Instagram Profile</span>
            <ExternalLink size={16} />
          </a>
        </div>

      </div>
    </section>
  );
}
