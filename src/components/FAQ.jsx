import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageCircle, Sparkles } from 'lucide-react';
import { CONFIG } from '../data';

export default function FAQ({ t, lang }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!t.faq || !t.faq.items) return null;

  const toggle = (idx) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" style={{ padding: '90px 24px', backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)', position: 'relative' }}>
      <div className="ambient-glow-gold" style={{ top: '20%', right: '10%' }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="sethji-badge">
            <Sparkles size={14} className="text-amber-400" />
            <span>{t.faq.badge}</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            <span className="gradient-text">{t.faq.title}</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', maxWidth: '620px', margin: '0 auto' }}>
            {t.faq.desc}
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="sethji-card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  borderColor: isOpen ? 'rgba(244, 63, 94, 0.45)' : 'var(--color-border)',
                  boxShadow: isOpen ? '0 8px 30px rgba(244, 63, 94, 0.12)' : 'var(--shadow-card)',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: isOpen ? 'rgba(244, 63, 94, 0.05)' : 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '15.5px',
                    fontWeight: 700,
                    transition: 'background 0.2s ease'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background: isOpen ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      color: isOpen ? '#fda4af' : 'var(--color-text-muted)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: 800,
                      flexShrink: 0
                    }}>
                      Q{idx + 1}
                    </span>
                    <span style={{ color: isOpen ? '#ffffff' : '#f1f5f9' }}>{item.q}</span>
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ flexShrink: 0, color: isOpen ? '#fda4af' : 'var(--color-text-muted)' }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div 
                        className="faq-answer-content"
                        style={{
                          padding: '14px 20px 20px',
                          color: 'var(--color-text-muted)',
                          fontSize: '14px',
                          lineHeight: 1.7,
                          borderTop: '1px solid rgba(255, 255, 255, 0.04)'
                        }}
                      >
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Helper Prompt */}
        <div style={{
          marginTop: '40px',
          textAlign: 'center',
          padding: '24px',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px dashed rgba(244, 63, 94, 0.25)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px'
        }}>
          <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            {lang === 'hi' ? 'कोई अन्य सवाल है जो यहां नहीं मिला?' : 'Have a custom inquiry not listed here?'}
          </span>
          <a
            href={`https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(lang === 'hi' ? 'नमस्ते! मुझे काल्पनिक कला के बारे में एक सवाल पूछना है।' : 'Hi Muskaan! I have a question regarding custom artwork.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa-sethji"
            style={{ padding: '8px 18px', fontSize: '13px' }}
          >
            <MessageCircle size={16} />
            <span>{lang === 'hi' ? 'व्हाट्सएप पर पूछें' : 'Ask on WhatsApp'}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
