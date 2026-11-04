import React, { useState, useMemo } from 'react';
import { MessageCircle, ShieldCheck, Sparkles, Upload, X, Clock, Tag, Zap } from 'lucide-react';
import { CONFIG } from '../data';
import confetti from 'canvas-confetti';

const InstagramIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

// Dynamic Estimation Options by Category with Festive Offer Pricing
const SERVICE_ESTIMATES = {
  'Charcoal & Graphite Portrait': {
    sizes: [
      { id: 'a4_single', labelEn: 'A4 Size - Single Portrait (1 Face)', labelHi: 'A4 साइज़ - सिंगल पोर्ट्रेट (1 चेहरा)', price: 499, originalPrice: 699, timeEn: '3-4 Days', timeHi: '3-4 दिन' },
      { id: 'a4_couple', labelEn: 'A4 Size - Couple Portrait (2 Faces)', labelHi: 'A4 साइज़ - कपल पोर्ट्रेट (2 चेहरे)', price: 799, originalPrice: 1099, timeEn: '3-5 Days', timeHi: '3-5 दिन' },
      { id: 'a3_single', labelEn: 'A3 Size - Single Portrait (Detailed)', labelHi: 'A3 साइज़ - सिंगल पोर्ट्रेट (डिटेल्ड)', price: 899, originalPrice: 1199, timeEn: '4-6 Days', timeHi: '4-6 दिन' },
      { id: 'a3_couple', labelEn: 'A3 Size - Couple / Family (2-3 Faces)', labelHi: 'A3 साइज़ - कपल/फैमिली (2-3 चेहरे)', price: 1499, originalPrice: 1999, timeEn: '5-7 Days', timeHi: '5-7 दिन' },
      { id: 'a2_grand', labelEn: 'A2 Size - Grand Family Masterpiece', labelHi: 'A2 साइज़ - ग्रैंड फैमिली मास्टरपीस', price: 2499, originalPrice: 3299, timeEn: '7-10 Days', timeHi: '7-10 दिन' },
    ]
  },
  'Custom Embroidery Hoop': {
    sizes: [
      { id: 'hoop_6', labelEn: '6-inch Minimal Hoop (Names / Quotes)', labelHi: '6-इंच मिनिमल हूप (नेम्स/कोट्स)', price: 499, originalPrice: 699, timeEn: '2-4 Days', timeHi: '2-4 दिन' },
      { id: 'hoop_8', labelEn: '8-inch Wedding / Couple Hoop (Best Seller)', labelHi: '8-इंच वेडिंग/कपल हूप (सबसे लोकप्रिय)', price: 899, originalPrice: 1199, timeEn: '3-5 Days', timeHi: '3-5 दिन' },
      { id: 'hoop_10', labelEn: '10-inch Detailed Portrait with Calendar', labelHi: '10-इंच पोर्ट्रेट हूप विथ कैलेंडर', price: 1399, originalPrice: 1799, timeEn: '4-6 Days', timeHi: '4-6 दिन' },
      { id: 'hoop_12', labelEn: '12-inch Grand Family Keepsake Hoop', labelHi: '12-इंच ग्रैंड फैमिली हूप', price: 1899, originalPrice: 2499, timeEn: '5-8 Days', timeHi: '5-8 दिन' },
    ]
  },
  'Crochet Work & Flower Bouquets': {
    sizes: [
      { id: 'crochet_single', labelEn: 'Single Everlasting Rose / Tulip Cone', labelHi: 'सिंगल एवरलास्टिंग रोज / ट्यूलिप कोन', price: 199, originalPrice: 299, timeEn: '1-2 Days', timeHi: '1-2 दिन' },
      { id: 'crochet_trio', labelEn: 'Trio Flower Cone (3 Hand-knitted Blooms)', labelHi: '3 हैंड-निटेड फूलों का खूबसूरत कोन', price: 349, originalPrice: 499, timeEn: '2-3 Days', timeHi: '2-3 दिन' },
      { id: 'crochet_deluxe', labelEn: 'Deluxe Bouquet (6-8 Mixed Blooms)', labelHi: 'डीलक्स बुके (6-8 मिक्स फूल)', price: 699, originalPrice: 999, timeEn: '3-4 Days', timeHi: '3-4 दिन' },
      { id: 'crochet_luxury', labelEn: 'Luxury Grand Bouquet (12+ Stems)', labelHi: 'लग्जरी ग्रैंड फ्लोरल बुके (12+ फूल)', price: 1199, originalPrice: 1599, timeEn: '4-6 Days', timeHi: '4-6 दिन' },
    ]
  },
  'Festive & Birthday Gift Hamper': {
    sizes: [
      { id: 'hamper_mini', labelEn: 'Mini Curated Kraft Hamper', labelHi: 'मिनी क्युराएटेड क्राफ्ट हैंपर', price: 699, originalPrice: 899, timeEn: '2-3 Days', timeHi: '2-3 दिन' },
      { id: 'hamper_celebration', labelEn: 'Celebration Birthday / Anniversary Hamper', labelHi: 'सेलिब्रेशन बर्थडे / एनिवर्सरी हैंपर', price: 1299, originalPrice: 1699, timeEn: '3-5 Days', timeHi: '3-5 दिन' },
      { id: 'hamper_luxury', labelEn: 'Royal Velvet Keepsake Hamper', labelHi: 'रॉयल वेलवेट कीपसेक हैंपर', price: 2199, originalPrice: 2799, timeEn: '4-6 Days', timeHi: '4-6 दिन' },
    ]
  },
  'Jain Papad File': {
    sizes: [
      { id: 'jain_standard', labelEn: 'Standard Decorated Papad File (Gota Patti)', labelHi: 'सजावटी जैन पापड़ फाइल (गोटा पट्टी)', price: 2499, originalPrice: 3199, timeEn: '5-7 Days', timeHi: '5-7 दिन' },
      { id: 'jain_royal', labelEn: 'Royal Shagun Papad File Set with Envelopes', labelHi: 'शाही शगुन पापड़ फाइल सेट विथ लिफाफे', price: 2999, originalPrice: 3899, timeEn: '7-10 Days', timeHi: '7-10 दिन' },
    ]
  },
  'Handmade Cards': {
    sizes: [
      { id: 'card_classic', labelEn: 'Classic Pop-Up Card', labelHi: 'क्लासिक पॉप-अप कार्ड', price: 199, originalPrice: 299, timeEn: '1-2 Days', timeHi: '1-2 दिन' },
      { id: 'card_scrapbook', labelEn: 'Mini Scrapbook Accordion Card', labelHi: 'मिनी स्क्रैपबुक अकॉर्डियन कार्ड', price: 399, originalPrice: 549, timeEn: '2-3 Days', timeHi: '2-3 दिन' },
      { id: 'card_box', labelEn: 'Explosion Gift Box Card with Photos', labelHi: 'एक्सप्लोजन गिफ्ट बॉक्स कार्ड विथ फोटोज', price: 699, originalPrice: 899, timeEn: '3-4 Days', timeHi: '3-4 दिन' },
    ]
  },
  'Customized Photo Frames': {
    sizes: [
      { id: 'frame_small', labelEn: 'Small Aesthetic Wooden Frame (6x8 inch)', labelHi: 'स्मॉल एस्थेटिक वुडन फ्रेम (6x8 इंच)', price: 399, originalPrice: 549, timeEn: '2-3 Days', timeHi: '2-3 दिन' },
      { id: 'frame_medium', labelEn: 'Medium Keepsake Photo Frame (8x10 inch)', labelHi: 'मीडियम कीपसेक फोटो फ्रेम (8x10 इंच)', price: 699, originalPrice: 899, timeEn: '3-4 Days', timeHi: '3-4 दिन' },
      { id: 'frame_large', labelEn: 'Large Collage Memory Frame (12x18 inch)', labelHi: 'लार्ज कोलाज मेमोरी फ्रेम (12x18 इंच)', price: 1299, originalPrice: 1699, timeEn: '4-6 Days', timeHi: '4-6 दिन' },
    ]
  },
  'Other Custom Artwork': {
    sizes: [
      { id: 'other_custom', labelEn: 'Bespoke Custom Idea (Estimate discussed on WhatsApp)', labelHi: 'कस्टम आर्टवर्क (व्हाट्सएप पर चर्चा अनुसार)', price: null, originalPrice: null, timeEn: '3-6 Days', timeHi: '3-6 दिन' }
    ]
  }
};

export default function Contact({ t, lang, prefilledService, prefilledMessage }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: prefilledService || 'Custom Embroidery Hoop',
    sizeId: 'hoop_8',
    occasion: '',
    needByDate: '',
    message: prefilledMessage || ''
  });
  
  // Reference photo attachment state
  const [referencePhoto, setReferencePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  React.useEffect(() => {
    if (prefilledService) {
      setFormData(prev => ({
        ...prev,
        service: prefilledService,
        sizeId: SERVICE_ESTIMATES[prefilledService]?.sizes[0]?.id || ''
      }));
    }
    if (prefilledMessage) setFormData(prev => ({ ...prev, message: prefilledMessage }));
  }, [prefilledService, prefilledMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'service') {
      const defaultSize = SERVICE_ESTIMATES[value]?.sizes[0]?.id || '';
      setFormData(prev => ({ ...prev, service: value, sizeId: defaultSize }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle Reference Photo Selection
  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert(lang === 'hi' ? 'फोटो का साइज़ 15MB से कम होना चाहिए।' : 'Photo size should be under 15MB.');
      return;
    }

    setReferencePhoto(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview({
        url: reader.result,
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB'
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setReferencePhoto(null);
    setPhotoPreview(null);
  };

  // Get active size details
  const activeServiceSizes = SERVICE_ESTIMATES[formData.service]?.sizes || SERVICE_ESTIMATES['Other Custom Artwork']?.sizes || [];
  const currentSizeObj = activeServiceSizes.find(s => s.id === formData.sizeId) || activeServiceSizes[0];

  // Calculate if urgent delivery
  const isRushOrder = () => {
    if (!formData.needByDate) return false;
    const target = new Date(formData.needByDate);
    const today = new Date();
    const diffDays = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 4;
  };

  const copyToClipboard = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    } else {
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
    const sizeName = currentSizeObj ? (lang === 'hi' ? currentSizeObj.labelHi : currentSizeObj.labelEn) : 'Custom Size';
    const estimatedPrice = currentSizeObj?.price ? `₹${currentSizeObj.price}` : 'Quote on Discussion';
    const estimatedTime = currentSizeObj?.timeEn || '3-5 Days';

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
      `* Art Category: *${formData.service}*`,
      `* Selected Size / Tier: *${sizeName}*`,
      `* Est. Price: *${estimatedPrice}*`,
      `* Est. Crafting Time: *${estimatedTime}*`,
      formData.occasion ? `* Occasion: *${formData.occasion}*` : null,
      formData.needByDate ? `* Need By (Deadline): *${formData.needByDate}* ${isRushOrder() ? '⚡ [PRIORITY RUSH]' : ''}` : null,
      referencePhoto ? `* Reference Photo: *YES (Attached / Ready to send in chat)*` : null,
      ``,
      `*CUSTOMIZATION REQUIREMENTS:*`,
      formData.message ? `> "${formData.message}"` : `> _Standard Custom Design_`,
      ``,
      referencePhoto ? `📷 _Note: I have kept the reference photo ready to attach in this WhatsApp chat._\n` : null,
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
    const url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(raw)}`;

    triggerConfetti();
    setStatus({
      state: 'success',
      message: lang === 'hi' ? 'व्हाट्सएप खुल रहा है...' : 'Opening WhatsApp...'
    });

    window.open(url, '_blank', 'noopener,noreferrer');
    setTimeout(() => {
      setStatus({ state: 'idle', message: '' });
    }, 2500);
  };

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

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
        <div className="sethji-card" style={{ padding: '36px 24px' }}>
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
            <div className="contact-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
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
                    outline: 'none',
                    boxSizing: 'border-box'
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
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>
            </div>

            {/* Service & Size / Tier Selection Grid */}
            <div className="contact-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
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
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Charcoal & Graphite Portrait">Charcoal & Graphite Portrait (चारकोल व ग्रेफाइट पोर्ट्रेट)</option>
                  <option value="Custom Embroidery Hoop">Custom Embroidery Hoop (कढ़ाई हूप)</option>
                  <option value="Crochet Work & Flower Bouquets">Crochet Work & Bouquets (क्रोशिया वर्क व फूल)</option>
                  <option value="Festive & Birthday Gift Hamper">Festive / Birthday Gift Hamper (गिफ्ट हैंपर)</option>
                  <option value="Customized Photo Frames">Customized Photo Frames (कस्टमाइज्ड फोटो फ्रेम)</option>
                  <option value="Jain Papad File">Jain Papad File (जैन पापड़ फाइल)</option>
                  <option value="Handmade Cards">Handmade Greeting Cards (हैंडमेड ग्रीटिंग कार्ड्स)</option>
                  <option value="Other Custom Artwork">Other Custom Idea (अन्य कस्टमाइजेशन)</option>
                </select>
              </div>

              {/* Dynamic Size / Option Picker */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#e2e8f0', marginBottom: '8px' }}>
                  {lang === 'hi' ? 'साइज़ व प्रकार चुनें (Size / Tier)' : 'Select Size / Style Tier'}
                </label>
                <select
                  name="sizeId"
                  value={formData.sizeId}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(7, 9, 14, 0.95)',
                    border: '1px solid var(--color-border)',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  {activeServiceSizes.map(sz => (
                    <option key={sz.id} value={sz.id}>
                      {lang === 'hi' ? sz.labelHi : sz.labelEn} {sz.price ? `(₹${sz.price}${sz.originalPrice ? ` • MRP ₹${sz.originalPrice}` : ''})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Live Interactive Price & Crafting Timeline Box with Limited-Time Offer */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.12) 0%, rgba(245, 158, 11, 0.08) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 20px rgba(245, 158, 11, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(245, 158, 11, 0.18)',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fbbf24'
                }}>
                  <Tag size={22} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {lang === 'hi' ? 'अनुमानित दर (Offer Price)' : 'ESTIMATED PRICE'}
                    </span>
                    {currentSizeObj?.originalPrice && (
                      <span style={{
                        background: 'linear-gradient(90deg, #e11d48, #f59e0b)',
                        color: '#ffffff',
                        fontSize: '10.5px',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.03em'
                      }}>
                        🔥 {lang === 'hi' ? `ऑफर: बचत ₹${currentSizeObj.originalPrice - currentSizeObj.price}` : `Save ₹${currentSizeObj.originalPrice - currentSizeObj.price}`}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: '#fde68a', fontFamily: 'var(--font-heading)' }}>
                      {currentSizeObj?.price ? `₹${currentSizeObj.price}` : (lang === 'hi' ? 'चर्चा अनुसार' : 'Custom Quote')}
                    </div>

                    {currentSizeObj?.originalPrice && (
                      <div style={{ fontSize: '15px', color: '#94a3b8', textDecoration: 'line-through', fontWeight: 500 }}>
                        ₹{currentSizeObj.originalPrice}
                      </div>
                    )}

                    <span style={{ fontSize: '11.5px', fontWeight: 400, color: 'var(--color-text-muted)' }}>
                      ({lang === 'hi' ? 'शुरुआती टोकन ~40%' : '~40% Token advance'})
                    </span>
                  </div>

                  <div style={{ fontSize: '11px', color: '#fbbf24', marginTop: '3px', fontWeight: 600 }}>
                    ⏳ {lang === 'hi' ? 'विशेष ऑफर केवल 11 नवंबर 2026 तक मान्य!' : 'Special limited-time offer valid till 11 Nov 2026!'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#e2cad4' }}>
                <Clock size={16} style={{ color: '#f59e0b' }} />
                <span>
                  {lang === 'hi' ? 'मेकिंग टाइम: ' : 'Crafting: '}
                  <strong style={{ color: '#ffffff' }}>
                    {lang === 'hi' ? currentSizeObj?.timeHi : currentSizeObj?.timeEn}
                  </strong>
                </span>
              </div>
            </div>

            {/* Need-By Date & Occasion Grid */}
            <div className="contact-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>
                    {lang === 'hi' ? 'डिलीवरी तारीख (Need By Date)' : 'Target Delivery Date'}
                  </label>
                  {isRushOrder() && (
                    <span style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      background: 'rgba(245, 158, 11, 0.2)',
                      color: '#fbbf24',
                      border: '1px solid rgba(245, 158, 11, 0.4)',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Zap size={11} /> Rush Order
                    </span>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type="date"
                    name="needByDate"
                    min={todayStr}
                    value={formData.needByDate}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(7, 9, 14, 0.7)',
                      border: isRushOrder() ? '1px solid rgba(245, 158, 11, 0.6)' : '1px solid var(--color-border)',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
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
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Reference Photo Upload Field */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#e2e8f0', marginBottom: '8px' }}>
                {lang === 'hi' ? 'रेफरेंस फोटो / स्केच फोटो (वैकल्पिक)' : 'Upload Reference Photo (Optional)'}
              </label>

              {!photoPreview ? (
                <label style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '20px',
                  borderRadius: '14px',
                  border: '1.5px dashed rgba(244, 63, 94, 0.35)',
                  background: 'rgba(244, 63, 94, 0.03)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.6)'; e.currentTarget.style.background = 'rgba(244, 63, 94, 0.06)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.35)'; e.currentTarget.style.background = 'rgba(244, 63, 94, 0.03)'; }}
                >
                  <Upload size={24} style={{ color: '#fda4af' }} />
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#fbcfe8', fontWeight: 600 }}>
                      {lang === 'hi' ? 'फोटो चुनने के लिए क्लिक करें या ड्रैग करें' : 'Click to select reference photo or drag & drop'}
                    </span>
                    <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--color-text-dim)' }}>
                      PNG, JPG, WEBP (Max 15MB) • {lang === 'hi' ? 'सीधे व्हाट्सएप में अटैच होगी' : 'Ready to share on WhatsApp'}
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoSelect}
                    style={{ display: 'none' }}
                  />
                </label>
              ) : (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(244, 63, 94, 0.08)',
                  border: '1px solid rgba(244, 63, 94, 0.3)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={photoPreview.url}
                      alt="Reference preview"
                      style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover', border: '1px solid rgba(255, 255, 255, 0.2)' }}
                    />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', wordBreak: 'break-all' }}>
                        {photoPreview.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#fda4af' }}>
                        {photoPreview.size} • {lang === 'hi' ? 'व्हाट्सएप में अटैच करने के लिए तैयार' : 'Ready for WhatsApp'}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: 'none',
                      color: '#ffffff',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    title="Remove Photo"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#e2e8f0', marginBottom: '8px' }}>
                {t.enquiryForm.messageLabel}
              </label>
              <textarea
                name="message"
                rows={3}
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
                  resize: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Primary Action Button: WhatsApp */}
            <div style={{ paddingTop: '6px' }}>
              <button
                type="button"
                onClick={handleWhatsApp}
                className="btn-wa-sethji"
                style={{ width: '100%', padding: '16px 20px', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(34, 197, 94, 0.25)', boxSizing: 'border-box' }}
              >
                <MessageCircle size={20} />
                <span style={{ fontWeight: 700 }}>{t.enquiryForm.submitWhatsApp}</span>
              </button>
            </div>

            {/* Secondary Direct Instagram Chat Link */}
            <div
              className="insta-link-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                paddingTop: '4px',
                textAlign: 'center'
              }}
            >
              <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                {lang === 'hi' ? 'इंस्टाग्राम पर बात करना चाहते हैं?' : 'Prefer messaging on Instagram?'}
              </span>
              <a
                href={`https://ig.me/m/${CONFIG.instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  color: '#fda4af',
                  fontWeight: 600,
                  fontSize: '13px',
                  textDecoration: 'none',
                  padding: '9px 18px',
                  borderRadius: '12px',
                  background: 'rgba(244, 63, 94, 0.1)',
                  border: '1px solid rgba(244, 63, 94, 0.25)',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  width: '100%',
                  maxWidth: '380px'
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
                <InstagramIcon size={15} />
                <span>Open Chat in Instagram (@{CONFIG.instagramHandle})</span>
              </a>
            </div>

            <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-text-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', paddingTop: '8px' }}>
              <ShieldCheck size={14} style={{ color: '#10b981' }} />
              <span>Direct artist interaction • Instant reply guaranteed</span>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
