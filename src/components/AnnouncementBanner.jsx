import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, X, Clock } from 'lucide-react';
import { fetchLiveBanner } from '../services/githubCms';

export const DEFAULT_BANNER = {
  isActive: true,
  expiryDate: '2026-11-11T23:59:59',
  badgeEn: 'Special Offer',
  badgeHi: 'खास ऑफर',
  textEn: 'November Handcrafted Bookings Open: Only 7 Custom Portrait & Hoop Slots Left!',
  textHi: 'नवंबर बुकिंग जारी है: इस सप्ताह के लिए केवल 7 कस्टम आर्टवर्क स्लॉट्स शेष हैं!',
  ctaEn: 'Book Your Slot',
  ctaHi: 'स्लॉट बुक करें'
};

export default function AnnouncementBanner({ lang = 'en' }) {
  const [banner, setBanner] = useState(() => {
    try {
      const saved = localStorage.getItem('kalpanik_announcement_banner');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_BANNER;
  });

  const [dismissed, setDismissed] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    fetchLiveBanner(DEFAULT_BANNER).then(live => {
      if (live && typeof live === 'object') {
        setBanner(live);
      }
    });

    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('kalpanik_announcement_banner');
        if (saved) setBanner(JSON.parse(saved));
      } catch {}
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Check Expiry Date Countdown (Expires 11 Nov 2026)
  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!banner.expiryDate) return '';
      const diff = new Date(banner.expiryDate).getTime() - Date.now();
      if (diff <= 0) return null; // Expired!

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      if (days > 0) {
        return `${days}d ${hours}h left`;
      }
      return `${hours}h ${minutes}m left`;
    };

    const update = () => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
    };

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [banner.expiryDate]);

  // If inactive, manually dismissed, or past 11 Nov 2026 -> do not show!
  if (!banner.isActive || dismissed || timeLeft === null) return null;

  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #991b1b 0%, #e11d48 35%, #f59e0b 70%, #d97706 100%)',
        color: '#ffffff',
        padding: '8px 16px',
        fontSize: '12.5px',
        fontWeight: 600,
        position: 'relative',
        zIndex: 105,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.35)',
        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
      }}
    >
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        flexWrap: 'wrap',
        textAlign: 'center'
      }}>
        <span style={{
          background: 'rgba(0, 0, 0, 0.28)',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          padding: '2px 8px',
          borderRadius: '9999px',
          fontSize: '10.5px',
          letterSpacing: '0.03em',
          textTransform: 'uppercase',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Sparkles size={11} style={{ color: '#fde68a' }} />
          {lang === 'hi' ? banner.badgeHi : banner.badgeEn}
        </span>

        <span style={{ color: '#fff5f7' }}>
          {lang === 'hi' ? banner.textHi : banner.textEn}
        </span>

        {/* Expiry Pill */}
        {timeLeft && (
          <span style={{
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(253, 230, 138, 0.4)',
            color: '#fef08a',
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '11px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: 700
          }}>
            <Clock size={11} />
            {lang === 'hi' ? `11 नवंबर तक (${timeLeft})` : `Till 11 Nov (${timeLeft})`}
          </span>
        )}

        <a
          href="#contact"
          onClick={scrollToContact}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            color: '#fef08a',
            textDecoration: 'none',
            fontWeight: 800,
            marginLeft: '4px',
            borderBottom: '1px dashed #fef08a',
            cursor: 'pointer'
          }}
        >
          <span>{lang === 'hi' ? banner.ctaHi : banner.ctaEn}</span>
          <ArrowRight size={13} />
        </a>
      </div>

      <button
        onClick={() => setDismissed(true)}
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'transparent',
          border: 'none',
          color: '#ffffff',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          opacity: 0.85
        }}
        title="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}

