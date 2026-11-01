import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sampleProducts } from '../data';
import { MessageCircle, Sparkles, Maximize2, X } from 'lucide-react';

export default function Portfolio({ t, lang, onInquireProduct }) {
  const [selectedCat, setSelectedCat] = useState('all');
  const [previewImage, setPreviewImage] = useState(null);

  const filtered = selectedCat === 'all' 
    ? sampleProducts 
    : sampleProducts.filter(p => p.category === selectedCat);

  return (
    <section id="portfolio" style={{ padding: '90px 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 40px' }}>
          <div className="sethji-badge">
            <Sparkles size={14} className="text-rose-400" />
            <span>Showcase Gallery</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>
            <span className="gradient-text">{t.gallery.title}</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '50px' }}>
          {[
            { id: 'all', label: t.gallery.filters.all },
            { id: 'portrait', label: t.gallery.filters.portrait || 'Portraits' },
            { id: 'crochet', label: t.gallery.filters.crochet },
            { id: 'hampers', label: t.gallery.filters.hampers },
            { id: 'embroidery', label: t.gallery.filters.embroidery },
            { id: 'jain', label: t.gallery.filters.jain || 'Jain Files & Cards' },
            { id: 'thermocol', label: t.gallery.filters.thermocol || 'Thermocol' },
            { id: 'frames', label: t.gallery.filters.frames || 'Photo Frames' },
            { id: 'invitation', label: t.gallery.filters.invitation || 'Invitation Cards' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCat(tab.id)}
              style={{
                padding: '10px 22px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 600,
                border: selectedCat === tab.id ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid var(--color-border)',
                background: selectedCat === tab.id ? 'var(--gradient-rose-gold)' : 'rgba(255, 255, 255, 0.04)',
                color: selectedCat === tab.id ? '#ffffff' : 'var(--color-text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="sethji-card"
                style={{ 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  borderRadius: '24px',
                  border: '1px solid rgba(244, 63, 94, 0.2)'
                }}
              >
                {/* Image Container with Full Photo View & Expand Option */}
                <div 
                  onClick={() => setPreviewImage(item)}
                  style={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: '380px', 
                    overflow: 'hidden', 
                    background: '#120b10',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title="Click to view full HD photo"
                >
                  {/* Blurred ambient backdrop so no empty space looks odd */}
                  <img 
                    src={item.image} 
                    alt="" 
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'blur(25px) brightness(0.35)',
                      transform: 'scale(1.2)'
                    }}
                  />

                  {/* Main Uncropped Photo */}
                  <img 
                    src={item.image} 
                    alt={lang === 'hi' ? item.titleHi : item.titleEn}
                    style={{ 
                      position: 'relative',
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain', 
                      transition: 'transform 0.4s ease',
                      zIndex: 1
                    }}
                    className="hover-scale"
                    loading="lazy"
                  />

                  {/* Click to Zoom Pill */}
                  <div style={{
                    position: 'absolute',
                    bottom: '14px',
                    right: '14px',
                    background: 'rgba(12, 8, 11, 0.75)',
                    backdropFilter: 'blur(8px)',
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 600,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    zIndex: 2
                  }}>
                    <Maximize2 size={13} />
                    <span>Zoom HD</span>
                  </div>

                  <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(7, 9, 14, 0.8)', backdropFilter: 'blur(8px)', padding: '5px 14px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700, color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.35)', zIndex: 2 }}>
                    {lang === 'hi' ? item.tagHi : item.tagEn}
                  </div>
                  <div style={{ position: 'absolute', top: '14px', right: '14px', background: 'var(--gradient-rose-gold)', backdropFilter: 'blur(8px)', padding: '5px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: 800, color: '#ffffff', boxShadow: '0 4px 14px rgba(244, 63, 94, 0.4)', zIndex: 2 }}>
                    {item.price}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'rgba(18, 11, 16, 0.8)' }}>
                  <div>
                    <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#ffffff', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                      {lang === 'hi' ? item.titleHi : item.titleEn}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '22px' }}>
                      {lang === 'hi' ? item.descHi : item.descEn}
                    </p>
                  </div>

                  <button 
                    onClick={() => onInquireProduct(item)}
                    className="btn-primary-sethji"
                    style={{ width: '100%', padding: '12px', fontSize: '13px' }}
                  >
                    <MessageCircle size={16} />
                    <span>{t.gallery.orderBtn}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Full Screen HD Lightbox Modal for Crystal Clear Image View */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(5, 3, 5, 0.92)',
              backdropFilter: 'blur(16px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <button
                onClick={() => setPreviewImage(null)}
                style={{
                  position: 'absolute',
                  top: '-48px',
                  right: '0',
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>

              <img 
                src={previewImage.image} 
                alt={lang === 'hi' ? previewImage.titleHi : previewImage.titleEn}
                style={{
                  maxWidth: '85vw',
                  maxHeight: '75vh',
                  objectFit: 'contain',
                  borderRadius: '16px',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95)',
                  border: '1px solid rgba(244, 63, 94, 0.3)'
                }}
              />

              <div style={{ marginTop: '16px', textAlign: 'center', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                  {lang === 'hi' ? previewImage.titleHi : previewImage.titleEn}
                </span>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#fbbf24', background: 'rgba(251, 191, 36, 0.15)', padding: '4px 12px', borderRadius: '9999px', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
                  {previewImage.price}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
