import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, ArrowRight, Heart, Palette, Star, Truck, Award } from 'lucide-react';
import { CONFIG } from '../data';

const InstagramIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Hero({ t, lang }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 60px' }}>
      {/* Dynamic Ambient Spheres (Sethji Style) */}
      <div className="ambient-glow-rose" style={{ top: '-100px', left: '15%' }} />
      <div className="ambient-glow-gold" style={{ top: '150px', right: '10%' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto' }}>
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="sethji-badge"
          >
            <Sparkles size={14} className="text-amber-400" />
            <span>{t.hero.badge}</span>
          </motion.div>

          {/* Main Headline with High-End Sethji Gradients */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ 
              fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', 
              fontWeight: 800, 
              lineHeight: 1.15, 
              marginBottom: '24px',
              letterSpacing: '-0.03em'
            }}
          >
            <span className="gradient-text">{t.hero.titleStart}</span>{' '}
            <span className="gradient-accent">{t.hero.titleHighlight}</span>
            {t.hero.titleEnd && <span className="gradient-text">{t.hero.titleEnd}</span>}
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ 
              fontSize: '18px', 
              color: 'var(--color-text-muted)', 
              lineHeight: 1.7, 
              marginBottom: '36px',
              maxWidth: '680px',
              margin: '0 auto 36px'
            }}
          >
            {t.hero.desc}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '60px' }}
          >
            <a href="#contact" className="btn-primary-sethji" style={{ padding: '14px 28px', fontSize: '15px' }}>
              <MessageCircle size={18} />
              <span>{t.hero.ctaWhatsApp}</span>
            </a>

            <a 
              href={CONFIG.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-insta-sethji"
              style={{ padding: '14px 28px', fontSize: '15px' }}
            >
              <InstagramIcon size={18} />
              <span>{t.hero.ctaInsta}</span>
            </a>

            <a href="#portfolio" className="btn-outline-sethji" style={{ padding: '14px 24px', fontSize: '15px' }}>
              <span>{t.hero.viewWork}</span>
              <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Metric / Stat Pillars */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
              gap: '16px',
              paddingTop: '20px'
            }}
          >
            {[
              { icon: <Award size={20} style={{ color: '#fbbf24' }} />, title: lang === 'hi' ? '5+ साल का अनुभव' : '5+ Years Experience', sub: lang === 'hi' ? 'हस्तशिल्प और कला में निपुण' : 'Master Craftsperson' },
              { icon: <Heart size={20} style={{ color: '#f43f5e' }} />, title: t.hero.stats.handmade, sub: 'Zero Machine Stitches' },
              { icon: <Palette size={20} style={{ color: '#f59e0b' }} />, title: t.hero.stats.customized, sub: 'Bespoke Names & Dates' },
              { icon: <Star size={20} style={{ color: '#a855f7' }} />, title: t.hero.stats.happyCustomers, sub: lang === 'hi' ? 'उच्च 5-स्टार रेटिंग' : 'High 5-Star Reviews' },
              { icon: <Truck size={20} style={{ color: '#10b981' }} />, title: t.hero.stats.delivery, sub: lang === 'hi' ? 'सुरक्षित ऑल-इंडिया पैकेजिंग' : 'Pan-India Bubble Packing' }
            ].map((stat, i) => (
              <div key={i} className="sethji-card" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', padding: '10px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.04)', marginBottom: '12px' }}>
                  {stat.icon}
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>{stat.title}</h4>
                <p style={{ fontSize: '12px', color: 'var(--color-text-dim)', margin: 0 }}>{stat.sub}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
