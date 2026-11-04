import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Key, Plus, Trash2, Save, RefreshCw, CheckCircle, AlertCircle, Edit2, Upload, Star } from 'lucide-react';
import { commitProductsToGitHub, commitReviewsToGitHub, commitBannerToGitHub, uploadImageToGitHub, DEFAULT_TOKEN } from '../services/githubCms';

// Auto translate English text to Hindi using MyMemory Translation API
async function translateToHindi(text) {
  if (!text || !text.trim()) return '';
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.trim())}&langpair=en|hi`);
    if (res.ok) {
      const data = await res.json();
      if (data?.responseData?.translatedText) {
        return data.responseData.translatedText;
      }
    }
  } catch (err) {
    console.warn('Auto translation fallback:', err);
  }
  return text; // fallback to english text if translation fails
}

// Category and Tag default Hindi translations
const CATEGORY_MAP = {
  portrait: { en: 'Portraits', hi: 'चारकोल व ग्रेफाइट पोर्ट्रेट', tagEn: 'Hand-Drawn', tagHi: 'हस्तनिर्मित स्केच' },
  crochet: { en: 'Crochet & Blooms', hi: 'क्रोशिया वर्क व फ्लावर्स', tagEn: 'Everlasting Blooms', tagHi: 'सदाबहार प्रेम' },
  embroidery: { en: 'Embroidery', hi: 'कस्टम एम्ब्रॉयडरी हूप्स', tagEn: 'Handcrafted', tagHi: 'हस्तनिर्मित' },
  hampers: { en: 'Gift Hampers', hi: 'लग्जरी गिफ्ट हैंपर्स', tagEn: 'Luxury Gift', tagHi: 'प्रीमियम गिफ्ट' },
  jain: { en: 'Jain Papad File', hi: 'जैन पापड़ फाइल', tagEn: 'Aesthetic Traditional', tagHi: 'पारंपरिक कला' },
  cards: { en: 'Handmade Cards', hi: 'हैंडमेड ग्रीटिंग कार्ड्स', tagEn: 'Creative Card', tagHi: 'हैंडमेड कार्ड' },
  thermocol: { en: 'Thermocol 3D', hi: 'थर्मोकोल 3D आर्टवर्क', tagEn: '3D Art', tagHi: '3D कला' },
  frames: { en: 'Photo Frames', hi: 'कस्टमाइज्ड फोटो फ्रेम्स', tagEn: 'Memory Frame', tagHi: 'फोटो फ्रेम' },
  invitation: { en: 'Invitation Cards', hi: 'इनविटेशन कार्ड्स', tagEn: 'Invitation', tagHi: 'निमंत्रण' }
};

export default function AdminDashboard({ isOpen, onClose, products, onUpdateProducts, reviews = [], onUpdateReviews }) {
  const [token, setToken] = useState(() => DEFAULT_TOKEN);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  // Active tab: 'products' | 'reviews'
  const [activeTab, setActiveTab] = useState('products');

  // Editable products local state
  const [items, setItems] = useState([]);
  // Editable reviews local state
  const [reviewItems, setReviewItems] = useState([]);
  const [savingReviews, setSavingReviews] = useState(false);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [newAdminReview, setNewAdminReview] = useState({
    name: '',
    city: '',
    category: 'portrait',
    productEn: 'Custom Charcoal Portrait',
    productHi: 'चारकोल पोर्ट्रेट स्केच',
    rating: 5,
    commentEn: '',
    commentHi: ''
  });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingId, setUploadingId] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  // Live Announcement & Booking Banner
  const [bannerConfig, setBannerConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('kalpanik_announcement_banner');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      isActive: true,
      expiryDate: '2026-11-11T23:59:59',
      badgeEn: 'Slots Limited',
      badgeHi: 'सीमित स्लॉट्स',
      textEn: 'November Handcrafted Bookings Open: Only 7 Custom Portrait & Hoop Slots Left This Week!',
      textHi: 'नवंबर बुकिंग जारी है: इस सप्ताह के लिए केवल 7 कस्टम आर्टवर्क स्लॉट्स शेष हैं!',
      ctaEn: 'Book Your Slot',
      ctaHi: 'स्लॉट बुक करें'
    };
  });
  const [bannerSavedAlert, setBannerSavedAlert] = useState(false);
  const [showBannerEditor, setShowBannerEditor] = useState(false);
  const [savingBanner, setSavingBanner] = useState(false);

  const handleSaveBanner = async (overrideConfig) => {
    const configToSave = overrideConfig || bannerConfig;
    // 1. Instant local storage update
    localStorage.setItem('kalpanik_announcement_banner', JSON.stringify(configToSave));
    window.dispatchEvent(new Event('storage'));
    setBannerSavedAlert(true);
    setTimeout(() => setBannerSavedAlert(false), 2500);

    // 2. Commit to GitHub so all visitors across India get the update!
    if (token && token.trim()) {
      try {
        setSavingBanner(true);
        await commitBannerToGitHub({
          token: token.trim(),
          banner: configToSave,
          commitMessage: `chore(cms): update banner state (active: ${configToSave.isActive})`
        });
        setStatusMsg({
          type: 'success',
          text: `बैनर (${configToSave.isActive ? 'Active' : 'Disabled'}) सफलतापूर्वक GitHub पर पब्लिश हो गया! सभी विज़िटर्स के लिए लाइव हो गया है।`
        });
      } catch (err) {
        console.error('Banner commit failed:', err);
      } finally {
        setSavingBanner(false);
      }
    }
  };

  // New product form modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [newProduct, setNewProduct] = useState({
    titleEn: '',
    titleHi: '',
    category: 'portrait',
    price: '499', // purely numeric input
    tagEn: 'Handmade',
    tagHi: 'हस्तनिर्मित',
    image: '',
    descEn: '',
    descHi: ''
  });

  // Sync products and reviews when opened
  React.useEffect(() => {
    if (isOpen) {
      setItems(JSON.parse(JSON.stringify(products)));
      setReviewItems(JSON.parse(JSON.stringify(reviews)));
    } else {
      setIsUnlocked(false);
      setPasscode('');
      setPasscodeError('');
      setStatusMsg({ type: '', text: '' });
    }
  }, [isOpen]);

  // Keep reviewItems in sync whenever parent reviews update while dashboard is open
  React.useEffect(() => {
    if (isOpen && Array.isArray(reviews)) {
      setReviewItems(JSON.parse(JSON.stringify(reviews)));
    }
  }, [reviews, isOpen]);

  // Handle Passcode Unlock (PIN: 8815)
  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode === '8815' || passcode === 'sethji') {
      setIsUnlocked(true);
      setPasscodeError('');
    } else {
      setPasscodeError('गलत पासकोड! कृपया सही पिन डालें।');
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setPasscode('');
  };

  // Save Token
  const handleSaveToken = (val) => {
    setToken(val);
    localStorage.setItem('kalpanik_gh_token', val);
  };

  // Update item field
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    if (field === 'price') {
      // Keep only numbers in price input
      const numericVal = value.replace(/[^0-9]/g, '');
      updated[index][field] = numericVal ? `₹${Number(numericVal).toLocaleString('en-IN')}` : '';
    } else {
      updated[index][field] = value;
    }
    setItems(updated);
  };

  // Delete item
  const handleDeleteItem = (id) => {
    if (window.confirm('क्या आप वाकई इस प्रोडक्ट को हटाना चाहते हैं?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  // Add new product with auto-translation
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.titleEn || !newProduct.price) {
      alert('कृपया प्रोडक्ट का नाम और कीमत भरें');
      return;
    }

    const cleanNumericPrice = newProduct.price.toString().replace(/[^0-9]/g, '');
    if (!cleanNumericPrice) {
      alert('कृपया सही कीमत (सिर्फ नंबर) भरें');
      return;
    }

    setIsTranslating(true);
    let autoTitleHi = newProduct.titleHi;
    if (!autoTitleHi || autoTitleHi.trim() === '') {
      autoTitleHi = await translateToHindi(newProduct.titleEn);
    }

    let finalCategory = newProduct.category;
    if (finalCategory === '__custom__') {
      finalCategory = (customCategory.trim() || 'Custom Art')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-');
    }

    const catMeta = CATEGORY_MAP[finalCategory] || {
      en: customCategory || 'Custom',
      hi: 'कस्टम आर्ट',
      tagEn: 'Bespoke Art',
      tagHi: 'खास कला'
    };

    const formattedPrice = `₹${Number(cleanNumericPrice).toLocaleString('en-IN')}`;

    const created = {
      ...newProduct,
      category: finalCategory,
      id: Date.now(),
      titleHi: autoTitleHi || newProduct.titleEn,
      price: formattedPrice,
      tagEn: newProduct.tagEn || catMeta.tagEn,
      tagHi: newProduct.tagHi || catMeta.tagHi,
      descEn: newProduct.descEn || newProduct.titleEn,
      descHi: newProduct.descHi || autoTitleHi || newProduct.titleEn
    };

    const updatedItems = [created, ...items];
    setItems(updatedItems);
    localStorage.setItem('kalpanik_live_products', JSON.stringify(updatedItems));
    onUpdateProducts(updatedItems);

    setIsTranslating(false);
    setShowAddModal(false);
    setCustomCategory('');
    setNewProduct({
      titleEn: '',
      titleHi: '',
      category: 'portrait',
      price: '499',
      tagEn: 'Handmade',
      tagHi: 'हस्तनिर्मित',
      image: '',
      descEn: '',
      descHi: ''
    });
  };

  // Save and Publish to GitHub
  const handleSaveToGitHub = async () => {
    if (!token.trim()) {
      setStatusMsg({ 
        type: 'error', 
        text: 'GitHub Personal Access Token आवश्यक है। नीचे टोकन दर्ज करें।' 
      });
      return;
    }

    try {
      setSaving(true);
      setStatusMsg({ type: '', text: '' });

      await commitProductsToGitHub({
        token: token.trim(),
        products: items,
        commitMessage: `chore(cms): update products catalog (${items.length} items)`
      });

      // Update parent state immediately for instant local reflection
      localStorage.setItem('kalpanik_live_products', JSON.stringify(items));
      onUpdateProducts(items);

      setStatusMsg({ 
        type: 'success', 
        text: 'सफलतापूर्वक GitHub पर पब्लिश हो गया! वेबसाइट 15-20 सेकंड में लाइव अपडेट हो जाएगी।' 
      });
    } catch (err) {
      console.error(err);
      setStatusMsg({ 
        type: 'error', 
        text: `एरर: ${err.message || 'GitHub पर सेव नहीं हो सका'}` 
      });
    } finally {
      setSaving(false);
    }
  };

  // Save and Publish Reviews to GitHub
  const handleSaveReviewsToGitHub = async () => {
    if (!token.trim()) {
      setStatusMsg({ 
        type: 'error', 
        text: 'GitHub Personal Access Token आवश्यक है। नीचे टोकन दर्ज करें।' 
      });
      return;
    }

    try {
      setSavingReviews(true);
      setStatusMsg({ type: '', text: '' });

      await commitReviewsToGitHub({
        token: token.trim(),
        reviews: reviewItems,
        commitMessage: `chore(cms): update customer reviews (${reviewItems.length} reviews)`
      });

      localStorage.setItem('kalpanik_live_reviews', JSON.stringify(reviewItems));
      if (onUpdateReviews) {
        onUpdateReviews(reviewItems);
      }

      setStatusMsg({ 
        type: 'success', 
        text: 'रिव्यूज़ सफलतापूर्वक GitHub पर सेव हो गए! वेबसाइट पर लाइव अपडेट हो गए हैं।' 
      });
    } catch (err) {
      console.error(err);
      setStatusMsg({ 
        type: 'error', 
        text: `रिव्यू एरर: ${err.message || 'GitHub पर सेव नहीं हो सका'}` 
      });
    } finally {
      setSavingReviews(false);
    }
  };

  const handleDeleteReview = async (id) => {
    if (confirm('क्या आप वाकई इस रिव्यू को हटाना चाहते हैं?')) {
      const updated = reviewItems.filter(r => r.id !== id);
      setReviewItems(updated);
      localStorage.setItem('kalpanik_live_reviews', JSON.stringify(updated));
      if (onUpdateReviews) onUpdateReviews(updated);

      // Auto-commit deletion to GitHub if token exists
      if (token && token.trim()) {
        try {
          setSavingReviews(true);
          await commitReviewsToGitHub({
            token: token.trim(),
            reviews: updated,
            commitMessage: `chore(cms): delete review #${id} (${updated.length} left)`
          });
          setStatusMsg({
            type: 'success',
            text: 'रिव्यू सफलतापूर्वक डिलीट हो गया और GitHub पर भी सेव हो गया!'
          });
        } catch (err) {
          console.error('Failed to commit review deletion to GitHub:', err);
          setStatusMsg({
            type: 'error',
            text: `लोकल डिलीट हो गया, लेकिन GitHub सेव एरर: ${err.message || 'Error'}`
          });
        } finally {
          setSavingReviews(false);
        }
      }
    }
  };

  const handleAddReviewSubmit = (e) => {
    e.preventDefault();
    if (!newAdminReview.name.trim() || !newAdminReview.commentEn.trim()) {
      alert('कृपया नाम और रिव्यू कमेंट लिखें।');
      return;
    }

    const reviewObj = {
      id: Date.now(),
      name: newAdminReview.name.trim(),
      city: newAdminReview.city.trim() || 'India',
      category: newAdminReview.category,
      productEn: newAdminReview.productEn.trim() || 'Handcrafted Art',
      productHi: newAdminReview.productHi.trim() || 'हस्तनिर्मित कलाकृति',
      rating: Number(newAdminReview.rating) || 5,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      commentEn: newAdminReview.commentEn.trim(),
      commentHi: newAdminReview.commentHi.trim() || newAdminReview.commentEn.trim(),
      avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 50)}?auto=format&fit=crop&w=150&q=80`,
      verified: true
    };

    const updated = [reviewObj, ...reviewItems];
    setReviewItems(updated);
    localStorage.setItem('kalpanik_live_reviews', JSON.stringify(updated));
    if (onUpdateReviews) onUpdateReviews(updated);

    if (token && token.trim()) {
      commitReviewsToGitHub({
        token: token.trim(),
        reviews: updated,
        commitMessage: `feat(review): add review from admin for ${reviewObj.name}`
      }).catch(err => console.warn('Could not auto-commit new review to GitHub:', err));
    }

    setShowAddReviewModal(false);
    setNewAdminReview({
      name: '',
      city: '',
      category: 'portrait',
      productEn: 'Custom Charcoal Portrait',
      productHi: 'चारकोल पोर्ट्रेट स्केच',
      rating: 5,
      commentEn: '',
      commentHi: ''
    });
    setStatusMsg({ type: 'success', text: 'नया रिव्यू जोड़ा गया! ऊपर "Publish Reviews to GitHub" पर क्लिक करके इसे लाइव कर लें।' });
  };

  if (!isOpen) return null;

  return (
    <div className="admin-modal-container" style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(5, 7, 10, 0.92)',
      backdropFilter: 'blur(16px)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="admin-modal-box" style={{
        width: '100%',
        maxWidth: '1000px',
        maxHeight: '90vh',
        background: '#120b12',
        border: '1px solid rgba(244, 63, 94, 0.35)',
        borderRadius: '24px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* Top Header */}
        <div className="admin-modal-header" style={{
          padding: '20px 28px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--gradient-rose-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
              <Key size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>
                Live CMS • Kalpanik Kala
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--color-text-dim)', margin: 0 }}>
                Direct Real-Time GitHub Product & Price Management
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isUnlocked && (
              <button 
                onClick={handleLock}
                style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
                title="Lock Dashboard"
              >
                <Lock size={14} />
                <span>Lock</span>
              </button>
            )}
            <button 
              onClick={onClose}
              style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.06)', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Unlocked / Locked Content */}
        {!isUnlocked ? (
          /* Passcode Screen */
          <div style={{ padding: '60px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'rgba(244, 63, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fda4af', marginBottom: '20px' }}>
              <Lock size={32} />
            </div>
            <h4 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
              Admin PIN Required
            </h4>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '24px', maxWidth: '360px' }}>
              रियल-टाइम डेटा बदलने के लिए कृपया अपना एडमिन पासकोड दर्ज करें।
            </p>

            <form onSubmit={handleUnlock} style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input 
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter PIN"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--color-border)',
                  color: '#ffffff',
                  fontSize: '16px',
                  textAlign: 'center',
                  outline: 'none'
                }}
                autoFocus
              />
              {passcodeError && (
                <span style={{ fontSize: '13px', color: '#f43f5e' }}>{passcodeError}</span>
              )}
              <button 
                type="submit"
                className="btn-primary-sethji"
                style={{ width: '100%', padding: '14px', fontSize: '15px' }}
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Main CMS Body */
          <div className="admin-modal-body" style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Status Alert */}
            {statusMsg.text && (
              <div style={{
                padding: '14px 18px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: statusMsg.type === 'error' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                border: statusMsg.type === 'error' ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid rgba(16, 185, 129, 0.4)',
                color: statusMsg.type === 'error' ? '#fecdd3' : '#a7f3d0'
              }}>
                {statusMsg.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
                <span>{statusMsg.text}</span>
              </div>
            )}

            {/* Live Announcement & Booking Slots Banner Manager */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(245, 158, 11, 0.05) 100%)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '18px' }}>📢</span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
                      Top Announcement & Booking Banner
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-dim)' }}>
                      साइट के टॉप पर दिखने वाला लाइव बुकिंग / फेस्टिव ऑफर बैनर
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: bannerConfig.isActive ? '#10b981' : 'var(--color-text-dim)', fontWeight: 600 }}>
                    <input
                      type="checkbox"
                      checked={bannerConfig.isActive}
                      disabled={savingBanner}
                      onChange={(e) => {
                        const updated = { ...bannerConfig, isActive: e.target.checked };
                        setBannerConfig(updated);
                        handleSaveBanner(updated);
                      }}
                      style={{ width: '16px', height: '16px', accentColor: '#10b981' }}
                    />
                    <span>
                      {savingBanner 
                        ? 'Publishing to GitHub...' 
                        : (bannerConfig.isActive ? 'Banner Active (दिख रहा है)' : 'Banner Disabled (बंद है)')}
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowBannerEditor(prev => !prev)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid var(--color-border)',
                      color: '#fda4af',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {showBannerEditor ? 'Hide Editor' : 'Edit Text'}
                  </button>
                </div>
              </div>

              {bannerSavedAlert && (
                <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 600 }}>
                  ✓ बैनर लाइव अपडेट हो गया!
                </div>
              )}

              {showBannerEditor && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '10px', borderTop: '1px dashed rgba(255, 255, 255, 0.1)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                        English Banner Message
                      </label>
                      <input
                        type="text"
                        value={bannerConfig.textEn}
                        onChange={(e) => setBannerConfig(prev => ({ ...prev, textEn: e.target.value }))}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--color-border)', color: '#fff', fontSize: '13px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                        Hindi Banner Message
                      </label>
                      <input
                        type="text"
                        value={bannerConfig.textHi}
                        onChange={(e) => setBannerConfig(prev => ({ ...prev, textHi: e.target.value }))}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--color-border)', color: '#fff', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                        Auto-Expire Date (इस तारीख के बाद खुद बंद हो जाएगा)
                      </label>
                      <input
                        type="date"
                        value={bannerConfig.expiryDate ? bannerConfig.expiryDate.split('T')[0] : '2026-11-11'}
                        onChange={(e) => setBannerConfig(prev => ({ ...prev, expiryDate: `${e.target.value}T23:59:59` }))}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--color-border)', color: '#fff', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={() => handleSaveBanner()}
                      disabled={savingBanner}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '8px',
                        background: 'var(--gradient-rose-gold)',
                        border: 'none',
                        color: '#ffffff',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: savingBanner ? 'not-allowed' : 'pointer',
                        opacity: savingBanner ? 0.7 : 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {savingBanner ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Publishing to GitHub...</span>
                        </>
                      ) : (
                        <>
                          <Save size={14} />
                          <span>Publish Banner to GitHub</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* CMS Tab Switcher */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '8px' }}>
              <button
                type="button"
                onClick={() => setActiveTab('products')}
                style={{
                  padding: '9px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: activeTab === 'products' ? 'var(--gradient-rose-gold)' : 'rgba(255, 255, 255, 0.05)',
                  color: activeTab === 'products' ? '#ffffff' : 'var(--color-text-muted)',
                  transition: 'all 0.2s'
                }}
              >
                📦 Products Catalog ({items.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('reviews')}
                style={{
                  padding: '9px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: activeTab === 'reviews' ? 'var(--gradient-rose-gold)' : 'rgba(255, 255, 255, 0.05)',
                  color: activeTab === 'reviews' ? '#ffffff' : 'var(--color-text-muted)',
                  transition: 'all 0.2s'
                }}
              >
                ⭐ Customer Reviews ({reviewItems.length})
              </button>
            </div>

            {activeTab === 'products' ? (
              <>
            {/* Action Bar */}
            <div className="admin-action-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                  Active Products ({items.length})
                </h4>
              </div>

              <div className="admin-action-buttons" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '11px 18px',
                    minHeight: '44px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid var(--color-border)',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    lineHeight: 1.2,
                    boxSizing: 'border-box'
                  }}
                >
                  <Plus size={16} />
                  <span>Add Product</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveToGitHub}
                  disabled={saving}
                  className="btn-primary-sethji"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '11px 22px',
                    minHeight: '44px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: 700,
                    opacity: saving ? 0.7 : 1,
                    cursor: saving ? 'not-allowed' : 'pointer',
                    lineHeight: 1.2,
                    boxSizing: 'border-box'
                  }}
                >
                  {saving ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>Publish Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Products Table / Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {items.map((prod, idx) => (
                <div 
                  key={prod.id || idx}
                  className="admin-card-row"
                >
                  {/* Top on Mobile: Thumbnail + Title + Delete */}
                  <div className="admin-row-top" style={{ display: 'contents' }}>
                    {/* Thumbnail & Image Change */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                      <div style={{ position: 'relative', width: '64px', height: '64px', borderRadius: '10px', overflow: 'hidden', background: '#000', border: '1px solid var(--color-border)' }}>
                        <img 
                          src={prod.image} 
                          alt="" 
                          onError={(e) => {
                            if (prod.image && prod.image.startsWith('/projects/')) {
                              e.currentTarget.src = `https://raw.githubusercontent.com/solutionssethji/kalpanik-kala/main/public${prod.image}`;
                            }
                          }}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                        <input 
                          type="file" 
                          accept="image/*" 
                          id={`edit-file-${prod.id || idx}`} 
                          style={{ display: 'none' }}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            try {
                              setUploadingId(prod.id || idx);
                              const newPath = await uploadImageToGitHub({
                                token: token.trim(),
                                file,
                                customName: prod.titleEn || 'artwork'
                              });
                              
                              const updatedItems = [...items];
                              updatedItems[idx] = { ...updatedItems[idx], image: newPath };
                              setItems(updatedItems);
                              
                              localStorage.setItem('kalpanik_live_products', JSON.stringify(updatedItems));
                              onUpdateProducts(updatedItems);

                              alert('नई फोटो अपलोड हो गई!');
                            } catch (err) {
                              alert(`फोटो एरर: ${err.message}`);
                            } finally {
                              setUploadingId(null);
                            }
                          }}
                        />
                        <label 
                          htmlFor={`edit-file-${prod.id || idx}`}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            cursor: 'pointer',
                            opacity: uploadingId === (prod.id || idx) ? 1 : 0,
                            transition: 'opacity 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                          onMouseLeave={(e) => {
                            if (uploadingId !== (prod.id || idx)) e.currentTarget.style.opacity = 0;
                          }}
                          title="Click to replace photo"
                        >
                          {uploadingId === (prod.id || idx) ? (
                            <RefreshCw size={16} className="spin-slow" />
                          ) : (
                            <Edit2 size={16} />
                          )}
                        </label>
                      </div>
                      <label 
                        htmlFor={`edit-file-${prod.id || idx}`} 
                        style={{ fontSize: '10px', color: '#fda4af', cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        {uploadingId === (prod.id || idx) ? 'Uploading...' : 'Change'}
                      </label>
                    </div>

                    {/* Title EN & HI */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div>
                        <label style={{ fontSize: '9px', color: 'var(--color-text-dim)', display: 'block' }}>TITLE (EN)</label>
                        <input 
                          type="text" 
                          value={prod.titleEn} 
                          onChange={(e) => handleItemChange(idx, 'titleEn', e.target.value)}
                          style={{ width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', color: '#fff', fontSize: '12.5px' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '9px', color: '#fda4af', display: 'block' }}>TITLE (हिंदी)</label>
                        <input 
                          type="text" 
                          value={prod.titleHi || ''} 
                          onChange={(e) => handleItemChange(idx, 'titleHi', e.target.value)}
                          placeholder="हिंदी शीर्षक"
                          style={{ width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(244, 63, 94, 0.25)', borderRadius: '6px', padding: '6px 10px', color: '#fbcfe8', fontSize: '12.5px' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Fields Grid (Category, Tag, Price) */}
                  <div className="admin-row-fields" style={{ display: 'contents' }}>
                    {/* Category */}
                    <div>
                      <label style={{ fontSize: '10px', color: 'var(--color-text-dim)', display: 'block', marginBottom: '2px' }}>CATEGORY</label>
                      <select
                        value={prod.category}
                        onChange={(e) => handleItemChange(idx, 'category', e.target.value)}
                        style={{ width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 8px', color: '#fff', fontSize: '12px' }}
                      >
                        <option value="portrait">Portrait</option>
                        <option value="embroidery">Embroidery</option>
                        <option value="crochet">Crochet</option>
                        <option value="hampers">Hampers</option>
                        <option value="jain">Jain Papad File</option>
                        <option value="cards">Handmade Cards</option>
                        <option value="thermocol">Thermocol</option>
                        <option value="frames">Photo Frames</option>
                        <option value="invitation">Invitation Cards</option>
                      </select>
                    </div>

                    {/* Tag */}
                    <div>
                      <label style={{ fontSize: '10px', color: 'var(--color-text-dim)', display: 'block', marginBottom: '2px' }}>TAG</label>
                      <input 
                        type="text" 
                        value={prod.tagEn} 
                        onChange={(e) => handleItemChange(idx, 'tagEn', e.target.value)}
                        style={{ width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '6px 10px', color: '#fda4af', fontSize: '12px', fontWeight: 600 }}
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label style={{ fontSize: '10px', color: 'var(--color-text-dim)', display: 'block', marginBottom: '2px' }}>PRICE</label>
                      <input 
                        type="text" 
                        value={prod.price} 
                        onChange={(e) => handleItemChange(idx, 'price', e.target.value)}
                        style={{ width: '100%', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '6px', padding: '6px 10px', color: '#fde68a', fontSize: '13px', fontWeight: 700 }}
                      />
                    </div>

                    {/* Delete button */}
                    <div className="admin-delete-container" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <button 
                        onClick={() => handleDeleteItem(prod.id)}
                        style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', cursor: 'pointer', padding: '8px 12px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
                        title="Delete Product"
                      >
                        <Trash2 size={15} />
                        <span>Delete Product</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </>
          ) : (
            <>
              {/* Customer Reviews Action Bar */}
              <div className="admin-action-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                    Live Customer Reviews ({reviewItems.length})
                  </h4>
                </div>

                <div className="admin-action-buttons" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setShowAddReviewModal(true)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '11px 18px',
                      minHeight: '44px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid var(--color-border)',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      lineHeight: 1.2,
                      boxSizing: 'border-box'
                    }}
                  >
                    <Plus size={16} />
                    <span>Add New Review</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveReviewsToGitHub}
                    disabled={savingReviews}
                    className="btn-primary-sethji"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '11px 20px',
                      minHeight: '44px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 700,
                      opacity: savingReviews ? 0.7 : 1,
                      cursor: savingReviews ? 'not-allowed' : 'pointer',
                      lineHeight: 1.2,
                      boxSizing: 'border-box'
                    }}
                  >
                    {savingReviews ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        <span>Publish Reviews to GitHub</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Reviews List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {reviewItems.length === 0 ? (
                  <div style={{ padding: '30px', textAlign: 'center', color: 'var(--color-text-dim)', background: 'rgba(255,255,255,0.02)', borderRadius: '14px' }}>
                    कोई रिव्यू नहीं मिला। नया रिव्यू जोड़ने के लिए ऊपर "Add New Review" दबाएं।
                  </div>
                ) : (
                  reviewItems.map((rev) => (
                    <div
                      key={rev.id}
                      className="admin-review-card"
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '16px',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '16px'
                      }}
                    >
                      <div className="admin-review-info" style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1, minWidth: 0 }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.25) 0%, rgba(245, 158, 11, 0.22) 100%)',
                          border: '1px solid rgba(244, 63, 94, 0.4)',
                          color: '#fde68a',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '15px',
                          flexShrink: 0
                        }}>
                          {rev.name ? rev.name.trim().charAt(0).toUpperCase() : 'K'}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="admin-review-header" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>{rev.name}</span>
                            <span style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>• {rev.city}</span>
                            <span style={{ fontSize: '11px', color: '#fda4af', background: 'rgba(244, 63, 94, 0.1)', padding: '2px 8px', borderRadius: '9999px', maxWidth: '100%', wordBreak: 'break-word' }}>
                              {rev.productEn || rev.productHi}
                            </span>
                          </div>

                          <div style={{ display: 'flex', gap: '2px', marginBottom: '6px' }}>
                            {[...Array(rev.rating || 5)].map((_, i) => (
                              <Star key={i} size={13} fill="#fbbf24" stroke="#fbbf24" />
                            ))}
                          </div>

                          <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5, wordBreak: 'break-word' }}>
                            "{rev.commentEn || rev.commentHi}"
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteReview(rev.id)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#ef4444',
                          cursor: 'pointer',
                          padding: '8px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                        title="Delete Review"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          </div>
        )}

      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          zIndex: 100000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '520px',
            background: '#190e18',
            border: '1px solid rgba(244, 63, 94, 0.4)',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.9)'
          }}>
            <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
              + Add New Art Product
            </h4>

            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="admin-add-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>Title (English) *</label>
                  <input 
                    type="text" 
                    value={newProduct.titleEn}
                    onChange={(e) => setNewProduct({ ...newProduct, titleEn: e.target.value })}
                    placeholder="e.g. Handmade Velvet Flower Bouquet"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--color-border)', color: '#fff', fontSize: '13px' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>Title (हिंदी) [वैकल्पिक]</label>
                  <input 
                    type="text" 
                    value={newProduct.titleHi}
                    onChange={(e) => setNewProduct({ ...newProduct, titleHi: e.target.value })}
                    placeholder="उदा. हस्तनिर्मित वेलवेट फ्लावर बुके"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--color-border)', color: '#fff', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div className="admin-add-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                    Category {newProduct.category === '__custom__' ? '(Custom)' : ''}
                  </label>
                  {newProduct.category === '__custom__' ? (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <input 
                        type="text" 
                        value={customCategory} 
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Type new category (e.g. Resin Art)"
                        style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid #fda4af', color: '#fff', fontSize: '13px' }}
                        autoFocus
                        required
                      />
                      <button 
                        type="button" 
                        onClick={() => setNewProduct({ ...newProduct, category: 'portrait' })}
                        style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fda4af', fontSize: '12px', cursor: 'pointer' }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <select
                      value={newProduct.category}
                      onChange={(e) => {
                        if (e.target.value === '__custom__') {
                          setNewProduct({ ...newProduct, category: '__custom__' });
                        } else {
                          setNewProduct({ ...newProduct, category: e.target.value });
                        }
                      }}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--color-border)', color: '#fff', fontSize: '13px' }}
                    >
                      <option value="portrait">Portraits</option>
                      <option value="embroidery">Embroidery</option>
                      <option value="crochet">Crochet & Blooms</option>
                      <option value="hampers">Gift Hampers</option>
                      <option value="jain">Jain Papad File</option>
                      <option value="cards">Handmade Cards</option>
                      <option value="thermocol">Thermocol 3D</option>
                      <option value="frames">Photo Frames</option>
                      <option value="invitation">Invitation Cards</option>
                      <option value="__custom__" style={{ color: '#fda4af', fontWeight: 'bold' }}>+ Add New Category (नई श्रेणी)</option>
                    </select>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>Price (₹) *</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ position: 'absolute', left: '12px', color: '#fde68a', fontWeight: 700, fontSize: '14px' }}>₹</span>
                    <input 
                      type="number" 
                      min="1"
                      step="1"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value.replace(/[^0-9]/g, '') })}
                      placeholder="499"
                      style={{ width: '100%', padding: '10px 14px 10px 28px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--color-border)', color: '#fff', fontSize: '14px', fontWeight: 700 }}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: '#e2e8f0', display: 'block', marginBottom: '6px' }}>
                  Product Photo (Upload File or Enter URL) *
                </label>
                
                {/* File picker */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input 
                    type="file" 
                    accept="image/*"
                    id="productFileInput"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (!token) {
                        alert('GitHub Token उपलब्ध नहीं है।');
                        return;
                      }
                      try {
                        setUploading(true);
                        const uploadedPath = await uploadImageToGitHub({
                          token: token.trim(),
                          file,
                          customName: newProduct.titleEn || 'artwork'
                        });
                        setNewProduct(prev => ({ ...prev, image: uploadedPath }));
                        alert('फोटो सीधे GitHub पर सफलतापूर्वक अपलोड हो गई!');
                      } catch (err) {
                        alert(`फोटो अपलोड एरर: ${err.message}`);
                      } finally {
                        setUploading(false);
                      }
                    }}
                    style={{ display: 'none' }}
                  />
                  <label 
                    htmlFor="productFileInput"
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(244, 63, 94, 0.15)',
                      border: '1px solid rgba(244, 63, 94, 0.35)',
                      color: '#fbcfe8',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      cursor: uploading ? 'wait' : 'pointer'
                    }}
                  >
                    <Upload size={15} />
                    <span>{uploading ? 'Uploading to GitHub...' : 'Choose Photo from Phone/PC'}</span>
                  </label>
                </div>

                <input 
                  type="text" 
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  placeholder="Or paste image URL (e.g. /projects/photo.jpg or https://...)"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--color-border)', color: '#fff', fontSize: '13px' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  style={{ flex: 1, padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '14px' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isTranslating}
                  className="btn-primary-sethji"
                  style={{ flex: 1, padding: '12px', fontSize: '14px', opacity: isTranslating ? 0.7 : 1 }}
                >
                  {isTranslating ? 'Translating to Hindi...' : 'Add to List'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Review Modal */}
      {showAddReviewModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          zIndex: 100000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '520px',
            background: '#190e18',
            border: '1px solid rgba(244, 63, 94, 0.4)',
            borderRadius: '20px',
            padding: '24px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>Add Customer Review</h3>
              <button 
                onClick={() => setShowAddReviewModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#fda4af', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#e2e8f0', marginBottom: '4px' }}>Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={newAdminReview.name}
                    onChange={(e) => setNewAdminReview(prev => ({ ...prev, name: e.target.value }))}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--color-border)', color: '#fff', fontSize: '13px' }}
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#e2e8f0', marginBottom: '4px' }}>City, State</label>
                  <input
                    type="text"
                    value={newAdminReview.city}
                    onChange={(e) => setNewAdminReview(prev => ({ ...prev, city: e.target.value }))}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--color-border)', color: '#fff', fontSize: '13px' }}
                    placeholder="e.g. Mumbai, Maharashtra"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#e2e8f0', marginBottom: '4px' }}>Category</label>
                  <select
                    value={newAdminReview.category}
                    onChange={(e) => setNewAdminReview(prev => ({ ...prev, category: e.target.value }))}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.8)', border: '1px solid var(--color-border)', color: '#fff', fontSize: '13px' }}
                  >
                    <option value="portrait">Charcoal Portrait</option>
                    <option value="embroidery">Embroidery Hoop</option>
                    <option value="crochet">Crochet Flowers</option>
                    <option value="hampers">Gift Hamper</option>
                    <option value="jain">Jain Papad File</option>
                    <option value="custom">Other Custom Art</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#e2e8f0', marginBottom: '4px' }}>Rating (Stars)</label>
                  <select
                    value={newAdminReview.rating}
                    onChange={(e) => setNewAdminReview(prev => ({ ...prev, rating: Number(e.target.value) }))}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.8)', border: '1px solid var(--color-border)', color: '#fff', fontSize: '13px' }}
                  >
                    <option value="5">5 Stars ⭐⭐⭐⭐⭐</option>
                    <option value="4">4 Stars ⭐⭐⭐⭐</option>
                    <option value="3">3 Stars ⭐⭐⭐</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#e2e8f0', marginBottom: '4px' }}>Product Title</label>
                <input
                  type="text"
                  value={newAdminReview.productEn}
                  onChange={(e) => setNewAdminReview(prev => ({ ...prev, productEn: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--color-border)', color: '#fff', fontSize: '13px' }}
                  placeholder="e.g. Wedding Anniversary 8-inch Hoop"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#e2e8f0', marginBottom: '4px' }}>Review Comment (English) *</label>
                <textarea
                  required
                  rows={3}
                  value={newAdminReview.commentEn}
                  onChange={(e) => setNewAdminReview(prev => ({ ...prev, commentEn: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--color-border)', color: '#fff', fontSize: '13px', resize: 'none' }}
                  placeholder="Customer's review feedback..."
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#e2e8f0', marginBottom: '4px' }}>Review Comment (Hindi Translation - Optional)</label>
                <textarea
                  rows={2}
                  value={newAdminReview.commentHi}
                  onChange={(e) => setNewAdminReview(prev => ({ ...prev, commentHi: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--color-border)', color: '#fff', fontSize: '13px', resize: 'none' }}
                  placeholder="हिंदी समीक्षा (यदि उपलब्ध हो)..."
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setShowAddReviewModal(false)}
                  style={{ flex: 1, padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '14px' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary-sethji"
                  style={{ flex: 1, padding: '12px', fontSize: '14px' }}
                >
                  Add Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
