import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { CONFIG } from '../data';
import confetti from 'canvas-confetti';

const InstagramIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Contact({ t, lang, prefilledService, prefilledMessage }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: prefilledService || 'Custom Embroidery Hoop',
    occasion: '',
    message: prefilledMessage || ''
  });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  React.useEffect(() => {
    if (prefilledService) setFormData(prev => ({ ...prev, service: prefilledService }));
    if (prefilledMessage) setFormData(prev => ({ ...prev, message: prefilledMessage }));
  }, [prefilledService, prefilledMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const copyToClipboard = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    } else {
      // Fallback for non-https or restricted contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((resolve, reject) => {
        document.execCommand('copy') ? resolve() : reject();
        textArea.remove();
      });
    }
  };

  const buildPayload = () => {
    const siteUrl = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://kalpanik-kala.vercel.app';
    
    return [
      `================================`,
      `*KALPANIK KALA (काल्पनिक कला)*`,
      `_Bespoke Handcrafted Art Boutique_`,
      `================================`,
      ``,
      `Namaste ji!`,
      `I would like to place an order for custom artwork:`,
      ``,
      `*ORDER DETAILS:*`,
      `--------------------------------`,
      `* Customer Name: *${formData.name}*`,
      `* Contact Number: *${formData.phone}*`,
      `* Art Category: *${formData.service || 'Handcrafted Custom Art'}*`,
      formData.occasion ? `* Occasion / Date: *${formData.occasion}*` : null,
      ``,
      `*CUSTOMIZATION REQUIREMENTS:*`,
      formData.message ? `> "${formData.message}"` : `> _Standard Custom Design_`,
      ``,
      `--------------------------------`,
      `[v] 100% Handcrafted with Love & Care`,
      `[v] Catalog: ${siteUrl}`,
      `================================`
    ].filter(Boolean).join('\n');
  };

  const triggerConfetti = () => {
    try {
      confetti({ particleCount: 75, spread: 60, origin: { y: 0.8 } });
    } catch {
      // fallback
    }
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus({ state: 'error', message: t.enquiryForm.validationError });
      return;
    }

    const raw = buildPayload();
    const cleanPhone = CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
    
    // Using api.whatsapp.com/send preserves UTF-8 multi-byte emojis without 302 redirect corruption
    const url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(raw)}`;

    triggerConfetti();
    setStatus({
      state: 'success',
      message: lang === 'hi' ? 'व्हाट्सएप खुल रहा है...' : 'Opening WhatsApp...'
    });

    // Immediate open avoids browser popup blockers
    window.open(url, '_blank', 'noopener,noreferrer');
    setTimeout(() => {
      setStatus({ state: 'idle', message: '' });
    }, 2500);
  };

  const handleInstagram = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus({ state: 'error', message: t.enquiryForm.validationError });
      return;
    }

    const raw = buildPayload();
    copyToClipboard(raw).catch(() => {});

    triggerConfetti();
    setStatus({
      state: 'success',
      message: lang === 'hi' 
        ? 'इंक्वायरी कॉपी हो गई! इंस्टाग्राम चैट खुल रही है, वहां बस Paste (पेस्ट) करके सेंड करें।' 
        : 'Inquiry details copied! Opening Instagram chat — just Paste and Send.'
    });

    const encoded = encodeURIComponent(raw);
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      // Try opening directly via app scheme with text parameter, fallback to ig.me
      window.location.href = `instagram://sharesheet?text=${encoded}`;
      setTimeout(() => {
        window.open(`https://ig.me/m/${CONFIG.instagramHandle}?text=${encoded}`, '_blank', 'noopener,noreferrer');
      }, 500);
    } else {
      // Desktop / Web browser direct inbox with text parameter
      window.open(`https://ig.me/m/${CONFIG.instagramHandle}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    }

    setTimeout(() => {
      setStatus({ state: 'idle', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" style={{ padding: '90px 24px', position: 'relative' }}>
      <div className="ambient-glow-rose" style={{ bottom: '50px', left: '10%' }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div className="sethji-badge">
            <Sparkles size={14} className="text-amber-400" />
            <span>Instant Inquiry</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            <span className="gradient-text">{t.enquiryForm.title}</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '15px' }}>
            {t.enquiryForm.desc}
          </p>
        </div>

        {/* Sethji High-Tech Card Form */}
        <div className="sethji-card" style={{ padding: '40px 32px' }}>
          {status.message && (
            <div style={{
              padding: '14px 18px',
              borderRadius: '12px',
              marginBottom: '24px',
              fontSize: '14px',
              fontWeight: 600,
              backgroundColor: status.state === 'error' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(16, 185, 129, 0.15)',
              border: status.state === 'error' ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid rgba(16, 185, 129, 0.4)',
              color: status.state === 'error' ? '#fecdd3' : '#a7f3d0'
            }}>
              {status.message}
            </div>
          )}

          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#e2e8f0', marginBottom: '8px' }}>
                  {t.enquiryForm.nameLabel}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.enquiryForm.namePlaceholder}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(7, 9, 14, 0.7)',
                    border: '1px solid var(--color-border)',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#e2e8f0', marginBottom: '8px' }}>
                  {t.enquiryForm.phoneLabel}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t.enquiryForm.phonePlaceholder}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(7, 9, 14, 0.7)',
                    border: '1px solid var(--color-border)',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#e2e8f0', marginBottom: '8px' }}>
                  {t.enquiryForm.serviceLabel}
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(7, 9, 14, 0.95)',
                    border: '1px solid var(--color-border)',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  <option value="Charcoal & Graphite Portrait">Charcoal & Graphite Portrait (चारकोल व ग्रेफाइट पोर्ट्रेट)</option>
                  <option value="Custom Embroidery Hoop">Custom Embroidery Hoop (कढ़ाई हूप)</option>
                  <option value="Crochet Work & Flower Bouquets">Crochet Work & Bouquets (क्रोशिया वर्क व फूल)</option>
                  <option value="Jain Papad File">Jain Papad File (जैन पापड़ फाइल)</option>
                  <option value="Handmade Cards">Handmade Greeting Cards (हैंडमेड ग्रीटिंग कार्ड्स)</option>
                  <option value="Thermocol Artwork">Thermocol Artwork (थर्मोकोल 3D आर्टवर्क)</option>
                  <option value="Customized Photo Frames">Customized Photo Frames (कस्टमाइज्ड फोटो फ्रेम)</option>
                  <option value="Invitation Cards">Royal Invitation Cards (शाही इनविटेशन कार्ड्स)</option>
                  <option value="Festive & Birthday Gift Hamper">Festive / Birthday Gift Hamper (गिफ्ट हैंपर)</option>
                  <option value="Other Custom Artwork">Other Custom Idea (अन्य कस्टमाइजेशन)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#e2e8f0', marginBottom: '8px' }}>
                  {t.enquiryForm.occasionLabel}
                </label>
                <input
                  type="text"
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  placeholder={t.enquiryForm.occasionPlaceholder}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(7, 9, 14, 0.7)',
                    border: '1px solid var(--color-border)',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#e2e8f0', marginBottom: '8px' }}>
                {t.enquiryForm.messageLabel}
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder={t.enquiryForm.messagePlaceholder}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(7, 9, 14, 0.7)',
                  border: '1px solid var(--color-border)',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'none'
                }}
              />
            </div>

            {/* Primary Action Button: WhatsApp */}
            <div style={{ paddingTop: '10px' }}>
              <button
                type="button"
                onClick={handleWhatsApp}
                className="btn-wa-sethji"
                style={{ width: '100%', padding: '16px 20px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(34, 197, 94, 0.25)' }}
              >
                <MessageCircle size={20} />
                <span style={{ fontWeight: 700 }}>{t.enquiryForm.submitWhatsApp}</span>
              </button>
            </div>

            {/* Secondary Direct Instagram Chat Link */}
            <div style={{ textAlign: 'center', paddingTop: '16px' }}>
              <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                {lang === 'hi' ? 'इंस्टाग्राम पर बात करना चाहते हैं?' : 'Prefer messaging on Instagram?'}
              </span>{' '}
              <a
                href={`https://ig.me/m/${CONFIG.instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#fda4af',
                  fontWeight: 600,
                  fontSize: '13px',
                  textDecoration: 'none',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  background: 'rgba(244, 63, 94, 0.1)',
                  border: '1px solid rgba(244, 63, 94, 0.25)',
                  marginLeft: '6px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(244, 63, 94, 0.2)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(244, 63, 94, 0.1)';
                  e.currentTarget.style.color = '#fda4af';
                }}
              >
                <InstagramIcon size={14} />
                <span>Open Chat in Instagram (@{CONFIG.instagramHandle})</span>
              </a>
            </div>

            <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-text-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', paddingTop: '12px' }}>
              <ShieldCheck size={14} style={{ color: '#10b981' }} />
              <span>Direct artist interaction • Instant reply guaranteed</span>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
