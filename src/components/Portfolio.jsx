import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sampleProducts } from '../data';
import { MessageCircle, Sparkles, Maximize2, X, ZoomIn } from 'lucide-react';

export default function Portfolio({ t, lang, onInquireProduct, products = sampleProducts }) {
  const [selectedCat, setSelectedCat] = useState('all');
  const [previewImage, setPreviewImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const productList = Array.isArray(products) && products.length > 0 ? products : sampleProducts;

  const filtered = selectedCat === 'all' 
    ? productList 
    : productList.filter(p => p.category === selectedCat);

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

        {/* Dynamic Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '50px' }}>
          {(() => {
            const defaultTabs = [
              { id: 'all', label: t.gallery.filters.all },
              { id: 'portrait', label: t.gallery.filters.portrait || 'Portraits' },
              { id: 'crochet', label: t.gallery.filters.crochet },
              { id: 'hampers', label: t.gallery.filters.hampers },
              { id: 'embroidery', label: t.gallery.filters.embroidery },
              { id: 'jain', label: t.gallery.filters.jain || 'Jain Files & Cards' },
              { id: 'thermocol', label: t.gallery.filters.thermocol || 'Thermocol' },
              { id: 'frames', label: t.gallery.filters.frames || 'Photo Frames' },
              { id: 'invitation', label: t.gallery.filters.invitation || 'Invitation Cards' }
            ];

            // Collect any custom categories added via CMS
            const existingIds = new Set(defaultTabs.map(tab => tab.id));
            const customTabs = [];
            productList.forEach(p => {
              if (p.category && !existingIds.has(p.category)) {
                existingIds.add(p.category);
                // Human readable label from category string
                const formattedLabel = p.category
                  .replace(/[-_]/g, ' ')
                  .replace(/\b\w/g, l => l.toUpperCase());
                customTabs.push({ id: p.category, label: formattedLabel });
              }
            });

            return [...defaultTabs, ...customTabs].map(tab => (
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
            ));
          })()}
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
                    onError={(e) => {
                      if (item.image && item.image.startsWith('/projects/')) {
                        e.currentTarget.src = `https://raw.githubusercontent.com/solutionssethji/kalpanik-kala/main/public${item.image}`;
                      }
                    }}
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

      {/* Full Screen High-Res Interactive Lightbox Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setPreviewImage(null); setIsZoomed(false); }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(5, 3, 5, 0.94)',
              backdropFilter: 'blur(20px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '920px',
                maxHeight: '94vh',
                backgroundColor: '#120b12',
                borderRadius: '24px',
                border: '1px solid rgba(244, 63, 94, 0.35)',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* Modal Top Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(255, 255, 255, 0.02)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px', background: 'rgba(244, 63, 94, 0.15)', color: '#fda4af', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
                    {lang === 'hi' ? previewImage.tagHi : previewImage.tagEn}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                    {previewImage.category ? previewImage.category.toUpperCase() : 'HANDMADE ART'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Zoom Toggle Button */}
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    style={{
                      background: isZoomed ? 'var(--gradient-rose-gold)' : 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '10px',
                      padding: '6px 12px',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    title={isZoomed ? "Click to fit" : "Click to 2x zoom into stitches & details"}
                  >
                    <ZoomIn size={14} />
                    <span>{isZoomed ? (lang === 'hi' ? 'सामान्य दृश्य' : 'Fit View') : (lang === 'hi' ? '2x ज़ूम' : '2x Zoom')}</span>
                  </button>

                  {/* Close Button */}
                  <button
                    onClick={() => { setPreviewImage(null); setIsZoomed(false); }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '10px',
                      width: '32px',
                      height: '32px',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* High-Resolution Interactive Image Stage */}
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '56vh',
                  minHeight: '320px',
                  backgroundColor: '#070508',
                  overflow: isZoomed ? 'auto' : 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: isZoomed ? 'grab' : 'zoom-in',
                  padding: isZoomed ? '40px' : '16px'
                }}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img 
                  src={previewImage.image} 
                  alt={lang === 'hi' ? previewImage.titleHi : previewImage.titleEn}
                  onError={(e) => {
                    if (previewImage.image && previewImage.image.startsWith('/projects/')) {
                      e.currentTarget.src = `https://raw.githubusercontent.com/solutionssethji/kalpanik-kala/main/public${previewImage.image}`;
                    }
                  }}
                  style={{
                    maxWidth: isZoomed ? '180%' : '100%',
                    maxHeight: isZoomed ? 'none' : '100%',
                    objectFit: 'contain',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), max-width 0.3s ease',
                    transform: isZoomed ? 'scale(1.4)' : 'scale(1)',
                    transformOrigin: 'center center',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.8)'
                  }}
                />

                {!isZoomed && (
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(10px)',
                    padding: '5px 14px',
                    borderRadius: '9999px',
                    color: '#e2e8f0',
                    fontSize: '11px',
                    fontWeight: 600,
                    pointerEvents: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}>
                    {lang === 'hi' ? 'बारीक डिटेल देखने के लिए फोटो पर क्लिक करें' : 'Click photo or "2x Zoom" to inspect fine handwork'}
                  </div>
                )}
              </div>

              {/* Bottom Information & Direct Booking Bar */}
              <div style={{
                padding: '20px 24px',
                backgroundColor: 'rgba(18, 11, 16, 0.95)',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}>
                <div style={{ flex: '1 1 300px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>
                      {lang === 'hi' ? previewImage.titleHi : previewImage.titleEn}
                    </h3>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: '#fde68a', background: 'rgba(245, 158, 11, 0.15)', padding: '3px 10px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.35)' }}>
                      {previewImage.price}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                    {lang === 'hi' ? previewImage.descHi : previewImage.descEn}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      const itemToOrder = previewImage;
                      setPreviewImage(null);
                      setIsZoomed(false);
                      onInquireProduct(itemToOrder);
                    }}
                    className="btn-primary-sethji"
                    style={{ padding: '12px 22px', fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <MessageCircle size={16} />
                    <span>{lang === 'hi' ? 'इसे कस्टमाइज व ऑर्डर करें' : 'Customize & Inquire Now'}</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
