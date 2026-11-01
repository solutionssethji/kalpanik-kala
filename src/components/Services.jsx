import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flower2, Gift, Palette, ChevronRight, Pencil, BookOpen, Scissors, Image, Mail, HeartHandshake } from 'lucide-react';

export default function Services({ t, onSelectService }) {
  const icons = {
    Pencil: <Pencil size={24} style={{ color: '#38bdf8' }} />,
    Sparkles: <Sparkles size={24} style={{ color: '#fbbf24' }} />,
    Flower2: <Flower2 size={24} style={{ color: '#f43f5e' }} />,
    Gift: <Gift size={24} style={{ color: '#ec4899' }} />,
    BookOpen: <BookOpen size={24} style={{ color: '#eab308' }} />,
    HeartHandshake: <HeartHandshake size={24} style={{ color: '#ec4899' }} />,
    Scissors: <Scissors size={24} style={{ color: '#a855f7' }} />,
    Image: <Image size={24} style={{ color: '#10b981' }} />,
    Mail: <Mail size={24} style={{ color: '#f97316' }} />,
    Palette: <Palette size={24} style={{ color: '#06b6d4' }} />
  };

  return (
    <section id="services" style={{ padding: '100px 24px', backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', position: 'relative', overflow: 'hidden' }}>
      <div className="ambient-glow-rose" style={{ top: '10%', right: '-10%' }} />
      <div className="ambient-glow-gold" style={{ bottom: '10%', left: '-10%' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 60px' }}>
          <div className="sethji-badge">
            <Sparkles size={14} style={{ color: '#f59e0b' }} />
            <span>Handcrafted Specialty Collection</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, marginBottom: '18px', letterSpacing: '-0.02em' }}>
            <span className="gradient-text">{t.services.title}</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: 1.7 }}>
            {t.services.subtitle}
          </p>
        </div>

        {/* 8 Signature Artwork Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {t.services.categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="sethji-card"
              style={{ 
                padding: '32px 28px',
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                borderRadius: '20px',
                border: '1px solid rgba(244, 63, 94, 0.2)',
                background: 'var(--gradient-card)'
              }}
            >
              <div>
                {/* Top Icon & Tag Pill */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '22px' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '14px', 
                    background: 'rgba(244, 63, 94, 0.12)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    border: '1px solid rgba(244, 63, 94, 0.25)',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                    flexShrink: 0
                  }}>
                    {icons[cat.icon] || <Sparkles size={22} />}
                  </div>

                  <span style={{ 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    padding: '5px 12px', 
                    borderRadius: '9999px', 
                    background: 'rgba(245, 158, 11, 0.12)', 
                    color: '#fde68a', 
                    border: '1px solid rgba(245, 158, 11, 0.3)', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.04em',
                    textAlign: 'right',
                    lineHeight: 1.3
                  }}>
                    {cat.tag}
                  </span>
                </div>

                {/* Content */}
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginBottom: '6px', fontFamily: 'var(--font-heading)' }}>
                  {cat.name}
                </h3>
                <p style={{ fontSize: '13px', color: '#fda4af', fontWeight: 600, marginBottom: '14px' }}>
                  {cat.hindiName}
                </p>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '26px' }}>
                  {cat.desc}
                </p>
              </div>

              {/* Card Footer */}
              <div style={{ paddingTop: '18px', borderTop: '1px solid rgba(244, 63, 94, 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#fde68a' }}>
                  {cat.priceStart}
                </span>
                <button
                  onClick={() => onSelectService(cat.name)}
                  style={{ 
                    background: 'rgba(244, 63, 94, 0.12)', 
                    border: '1px solid rgba(244, 63, 94, 0.3)', 
                    color: '#fecdd3', 
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '12px', 
                    fontWeight: 700, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--gradient-rose-gold)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(244, 63, 94, 0.12)';
                    e.currentTarget.style.color = '#fecdd3';
                  }}
                >
                  <span>Inquire Now</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
