import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Eye, Heart, ExternalLink, Sparkles, Maximize2, X } from 'lucide-react';
import { sampleReels, CONFIG } from '../data';

const InstagramIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

function ReelCard({ reel, lang, t, onOpenModal }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.muted = isMuted;
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Video play error:", err);
          // If unmuted autoplay blocked, fallback to muted play
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        });
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="sethji-card"
      style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        background: '#090d15',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.7)'
      }}
    >
      {/* 9:16 Reel Aspect Ratio Container */}
      <div 
        onClick={togglePlay}
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '160%', // 9:16 Vertical Reel format
          overflow: 'hidden',
          backgroundColor: '#05070a',
          cursor: 'pointer'
        }}
      >
        <video
          ref={videoRef}
          src={reel.videoUrl}
          poster={reel.poster}
          playsInline
          loop
          muted={isMuted}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        {/* Gradient Overlay for Readable Text & Controls */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: isPlaying 
              ? 'linear-gradient(to top, rgba(7, 9, 14, 0.85) 0%, rgba(7, 9, 14, 0.1) 40%, rgba(7, 9, 14, 0.4) 100%)' 
              : 'linear-gradient(to top, rgba(7, 9, 14, 0.92) 0%, rgba(7, 9, 14, 0.35) 50%, rgba(7, 9, 14, 0.6) 100%)',
            pointerEvents: 'none',
            transition: 'background 0.3s ease'
          }}
        />

        {/* Top Badges */}
        <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(8px)', padding: '5px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700, color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
            <InstagramIcon size={13} />
            <span>REEL</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {isPlaying && (
              <button
                onClick={toggleMute}
                aria-label="Toggle Mute"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(reel);
              }}
              aria-label="Expand Video"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Maximize2 size={14} />
            </button>
          </div>
        </div>

        {/* Center Play Button (When Paused) */}
        {!isPlaying && (
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 3,
              pointerEvents: 'none'
            }}
          >
            <div 
              style={{
                width: '58px',
                height: '58px',
                borderRadius: '50%',
                background: 'var(--gradient-rose-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 8px 30px rgba(244, 63, 94, 0.5)'
              }}
            >
              <Play size={24} style={{ marginLeft: '3px' }} />
            </div>
          </div>
        )}

        {/* Reel Bottom Meta */}
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', zIndex: 2 }}>
          {/* Stats Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px', fontSize: '12px', color: '#e2e8f0', fontWeight: 600 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Eye size={14} style={{ color: '#38bdf8' }} />
              <span>{reel.views}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Heart size={14} style={{ color: '#f43f5e', fill: '#f43f5e' }} />
              <span>{reel.likes}</span>
            </div>
            <span style={{ marginLeft: 'auto', background: 'rgba(255, 255, 255, 0.15)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', color: '#ffffff' }}>
              {reel.duration}
            </span>
          </div>

          <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '6px', lineHeight: 1.3 }}>
            {lang === 'hi' ? reel.titleHi : reel.titleEn}
          </h4>

          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {lang === 'hi' ? reel.captionHi : reel.captionEn}
          </p>
        </div>
      </div>

      {/* Reel Footer CTA */}
      <div style={{ padding: '14px 18px', background: 'rgba(12, 16, 23, 0.95)', borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={togglePlay}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fbbf24',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer'
          }}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          <span>{isPlaying ? (lang === 'hi' ? 'रोकें (Pause)' : 'Pause') : (lang === 'hi' ? 'चलाएं (Play)' : 'Play')}</span>
        </button>

        <a
          href={reel.reelUrl || CONFIG.reelsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            color: '#fda4af',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: 600,
            transition: 'color 0.2s'
          }}
        >
          <span>Instagram</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </motion.div>
  );
}

export default function Reels({ t, lang }) {
  const [activeModalReel, setActiveModalReel] = useState(null);

  return (
    <section id="reels" style={{ padding: '90px 24px', backgroundColor: 'var(--color-bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div className="ambient-glow-rose" style={{ top: '10%', right: '5%' }} />
      <div className="ambient-glow-gold" style={{ bottom: '10%', left: '5%' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 50px' }}>
          <div className="sethji-badge">
            <Sparkles size={14} className="text-amber-400" />
            <span>{t.reelsSection?.badge || 'Instagram Reels & Videos'}</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, marginBottom: '16px' }}>
            <span className="gradient-text">{t.reelsSection?.title || 'Artistry in Action'}</span>
          </h2>

          <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: 1.6 }}>
            {t.reelsSection?.subtitle || 'Watch behind-the-scenes creation videos, thread stitching, and aesthetic unboxing from our workshop'}
          </p>
        </div>

        {/* 4-Column Reels Vertical Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
            gap: '24px',
            marginBottom: '40px' 
          }}
        >
          {sampleReels.map((reel) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              lang={lang}
              t={t}
              onOpenModal={(r) => setActiveModalReel(r)}
            />
          ))}
        </div>

        {/* Bottom Instagram Channel Banner */}
        <div 
          className="sethji-card"
          style={{
            padding: '30px',
            background: 'linear-gradient(135deg, rgba(220, 39, 67, 0.12) 0%, rgba(17, 23, 34, 0.95) 100%)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div 
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'var(--gradient-insta)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 8px 24px rgba(220, 39, 67, 0.4)'
              }}
            >
              <InstagramIcon size={28} />
            </div>

            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                {lang === 'hi' ? 'हर हफ्ते नई कला और प्रोसेस रील्स!' : 'Fresh artisan reels & custom unboxings weekly!'}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>
                {lang === 'hi' ? 'इंस्टाग्राम पर 100+ रील्स और ग्राहक समीक्षाएं लाइव हैं।' : 'Follow @kalpanik_kala_22 for daily creative inspiration.'}
              </p>
            </div>
          </div>

          <a
            href={CONFIG.reelsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-insta-sethji"
            style={{ padding: '14px 28px', fontSize: '14px' }}
          >
            <InstagramIcon size={16} />
            <span>{t.reelsSection?.viewAllBtn || 'View All Reels (@kalpanik_kala_22)'}</span>
            <ExternalLink size={14} />
          </a>
        </div>

      </div>

      {/* Expanded Video Modal */}
      <AnimatePresence>
        {activeModalReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalReel(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(12px)',
              zIndex: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '420px',
                borderRadius: '24px',
                overflow: 'hidden',
                background: '#07090e',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)'
              }}
            >
              <button
                onClick={() => setActiveModalReel(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <X size={18} />
              </button>

              <video
                src={activeModalReel.videoUrl}
                controls
                autoPlay
                playsInline
                style={{
                  width: '100%',
                  height: '620px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />

              <div style={{ padding: '18px 22px', background: '#0c1017' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
                  {lang === 'hi' ? activeModalReel.titleHi : activeModalReel.titleEn}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                  {lang === 'hi' ? activeModalReel.captionHi : activeModalReel.captionEn}
                </p>
                <a
                  href={activeModalReel.reelUrl || CONFIG.reelsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-insta-sethji"
                  style={{ width: '100%', padding: '12px', fontSize: '13px' }}
                >
                  <InstagramIcon size={16} />
                  <span>{t.reelsSection?.watchOnInsta || 'Watch Full Reel on Instagram'}</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
