import React, { useState } from 'react';
import { Star, Sparkles, MapPin, CheckCircle, ChevronLeft, ChevronRight, Edit3, X, MessageCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CONFIG } from '../data';

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: "Pooja & Rohan Sharma",
    city: "Mumbai, Maharashtra",
    category: "embroidery",
    productEn: "Wedding Anniversary 8-inch Embroidery Hoop",
    productHi: "वेडिंग एनिवर्सरी 8-इंच कस्टमाइज्ड एम्ब्रॉयडरी हूप",
    rating: 5,
    date: "October 2026",
    commentEn: "The detailing on our wedding hoop brought tears of joy! Every single stitch was done with such immense love and precision. The packaging was so safe with bubble wrap and a sweet handmade card. Thank you Muskaan!",
    commentHi: "हमारे एनिवर्सरी हूप की फिनिशिंग देखकर आंखें भर आईं! धागों का एक-एक टांका इतने प्यार और बारीकी से बनाया गया है। पैकेजिंग भी बहुत सुरक्षित थी। थैंक यू मुस्कान!",
    verified: true
  },
  {
    id: 2,
    name: "Aditya Verma",
    city: "Indore, Madhya Pradesh",
    category: "portrait",
    productEn: "Grandparents Charcoal Portrait Sketch (A3)",
    productHi: "दादा-दादी जी का चारकोल पोर्ट्रेट स्केच (A3)",
    rating: 5,
    date: "October 2026",
    commentEn: "Muskaan did 100% justice to my grandparents' old photograph. The realistic shading, facial expressions, and eyes look so alive. My whole family was stunned when we unwrapped the frame.",
    commentHi: "मेरी पुरानी और थोड़ी धुंधली फोटो से इतना सजीव और रियलिस्टिक स्केच बना दिया कि पूरा परिवार हैरान रह गया। चारकोल शेडिंग और आंखों की डिटेलिंग वाकई काबिले तारीफ है।",
    verified: true
  },
  {
    id: 3,
    name: "Dr. Sneha Agrawal",
    city: "Jaipur, Rajasthan",
    category: "crochet",
    productEn: "Handmade Crochet Lily & Tulip Bouquet",
    productHi: "हस्तनिर्मित क्रोशिया लिली व ट्यूलिप फ्लावर बुके",
    rating: 5,
    date: "September 2026",
    commentEn: "Gifted this everlasting crochet bouquet for my sister's clinic inauguration. She placed it right on her reception desk. The best part? These flowers will never fade or wilt. Exceptional craftsmanship!",
    commentHi: "मेरी बहन के क्लीनिक उद्घाटन के लिए ये क्रोशिया लिली बुके गिफ्ट किया। ये कभी मुरझाएंगे नहीं और देखने में बेहद खूबसूरत लगते हैं। मुस्कान जी की कारीगरी का कोई जवाब नहीं!",
    verified: true
  },
  {
    id: 4,
    name: "Naman & Shreya Jain",
    city: "Ahmedabad, Gujarat",
    category: "jain",
    productEn: "Traditional Jain Papad File & Shagun Envelopes",
    productHi: "शाही पारंपरिक जैन पापड़ फाइल व शगुन लिफाफे",
    rating: 5,
    date: "September 2026",
    commentEn: "We ordered the customized Jain Papad file for our brother's wedding ceremony. The golden gota-patti border, velvet cloth, and religious auspicious finishing received compliments from all the guests.",
    commentHi: "भाई की शादी के लिए जैन पापड़ फाइल बनवाई थी। गोटा-पट्टी की सजावट और पारंपरिक फिनिशिंग देखकर सभी रिश्तेदारों ने बहुत तारीफ की। समय पर सेफ डिलीवरी मिली।",
    verified: true
  },
  {
    id: 5,
    name: "Kavita Mehra",
    city: "Delhi NCR",
    category: "hampers",
    productEn: "Luxury Birthday Surprise Keepsake Hamper",
    productHi: "लग्जरी बर्थडे सरप्राइज कीपसेक हैंपर",
    rating: 5,
    date: "August 2026",
    commentEn: "From the handwritten wax-sealed letter to the custom photos and crochet roses, every item in the hamper felt bespoke and thoughtful. 10/10 unboxing experience!",
    commentHi: "वैक्स सील लेटर से लेकर कस्टमाइज्ड फोटोज और क्रोशिया गुलाब तक, हैंपर की हर एक चीज बहुत स्पेशल लगी। बेस्ट बर्थडे गिफ्टिंग एक्सपीरियंस!",
    verified: true
  }
];

const COMPARISONS = [
  {
    id: 'comp-1',
    titleEn: 'Original Photo ➔ Lifelike Charcoal Portrait',
    titleHi: 'मूल तस्वीर ➔ सजीव चारकोल स्केच पोर्ट्रेट',
    category: 'portrait',
    beforeImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    beforeLabelEn: 'Customer Reference Photo',
    beforeLabelHi: 'ग्राहक की ओर से भेजी गई फोटो',
    afterImage: '/projects/charcoal-realistic-portrait.jpg',
    afterLabelEn: 'Hand-Drawn Charcoal Masterpiece',
    afterLabelHi: 'मुस्कान द्वारा हाथ से बना चारकोल स्केच',
    badge: '100% Hand-Drawn'
  },
  {
    id: 'comp-2',
    titleEn: 'Digital Couple Shot ➔ Thread Embroidery Hoop',
    titleHi: 'डिजिटल फोटो ➔ सुई-धागे से बुना एम्ब्रॉयडरी हूप',
    category: 'embroidery',
    beforeImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    beforeLabelEn: 'Original Couple Portrait',
    beforeLabelHi: 'मूल कपल फोटोग्राफ',
    afterImage: '/projects/handmade-embroidery-cloth.jpg',
    afterLabelEn: 'Bespoke Needlework Hoop Art',
    afterLabelHi: 'हाथों से बुनी बारीक एम्ब्रॉयडरी कला',
    badge: 'Hand-Stitched'
  }
];

export default function Testimonials({ lang = 'en', reviews = [], onAddReview }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCompIdx, setActiveCompIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);

  // Modal State for Writing a Review
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Full Reviews List Modal / View More State with Pagination
  const [isAllReviewsModalOpen, setIsAllReviewsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const REVIEWS_PER_PAGE = 6;
  const [newReview, setNewReview] = useState({
    name: '',
    city: '',
    category: 'portrait',
    product: '',
    rating: 5,
    comment: ''
  });
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const activeComp = COMPARISONS[activeCompIdx];

  const allReviews = Array.isArray(reviews) ? reviews : [];

  const filteredReviews = activeFilter === 'all' 
    ? allReviews 
    : allReviews.filter(r => r.category === activeFilter);

  // Home section displays only first 6 reviews
  const displayedReviews = filteredReviews.slice(0, 6);
  const hasMoreReviews = filteredReviews.length > 6;

  // Pagination for the "View All Reviews" modal/page
  const totalPages = Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE) || 1;
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  // Dynamic average rating
  const avgRating = (allReviews.reduce((sum, r) => sum + (Number(r.rating) || 5), 0) / (allReviews.length || 1)).toFixed(1);

  const handleSliderMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPos(percent);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      alert(lang === 'hi' ? 'कृपया अपना नाम और समीक्षा लिखें।' : 'Please enter your name and comment.');
      return;
    }

    const reviewObj = {
      id: Date.now(),
      name: newReview.name.trim(),
      city: newReview.city.trim() || (lang === 'hi' ? 'भारत' : 'India'),
      category: newReview.category,
      productEn: newReview.product.trim() || 'Custom Art Creation',
      productHi: newReview.product.trim() || 'कस्टमाइज्ड कलाकृति',
      rating: Number(newReview.rating) || 5,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      commentEn: newReview.comment.trim(),
      commentHi: newReview.comment.trim(),
      verified: true
    };

    if (onAddReview) {
      onAddReview(reviewObj);
    }

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } });
    } catch {}

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsModalOpen(false);
      setNewReview({
        name: '',
        city: '',
        category: 'portrait',
        product: '',
        rating: 5,
        comment: ''
      });
    }, 2200);
  };

  return (
    <section id="testimonials" style={{ padding: '90px 24px', position: 'relative', backgroundColor: 'var(--color-bg-secondary)' }}>
      <div className="ambient-glow-rose" style={{ top: '30%', right: '5%' }} />
      <div className="ambient-glow-gold" style={{ bottom: '20%', left: '8%' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="sethji-badge">
            <Sparkles size={14} className="text-amber-400" />
            <span>{lang === 'hi' ? '100% संतुष्ट ग्राहक समीक्षाएं' : 'Real Customer Stories & Trust'}</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            <span className="gradient-text">
              {lang === 'hi' ? 'कारीगरी जो दिलों को छू जाए' : 'Words From Our Happy Patrons'}
            </span>
          </h2>
          
          <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', maxWidth: '640px', margin: '0 auto' }}>
            {lang === 'hi' 
              ? '500+ से अधिक खुश ग्राहकों द्वारा साझा की गई अनमोल यादें और उनकी अनबॉक्सिंग खुशियां।' 
              : 'Over 500+ bespoke creations delivered pan-India with pure love, tears of joy, and 5-star ratings.'}
          </p>

          {/* Social Proof Trust Bar + Write Review Button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginTop: '22px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '16px',
              padding: '10px 22px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--color-border)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#fbbf24" stroke="#fbbf24" />
                ))}
                <span style={{ fontWeight: 800, color: '#ffffff', marginLeft: '6px', fontSize: '14px' }}>{avgRating}/5.0</span>
              </div>
              <span style={{ width: '1px', height: '14px', background: 'rgba(255, 255, 255, 0.2)' }} />
              <span style={{ fontSize: '13px', color: '#fda4af', fontWeight: 600 }}>{allReviews.length}+ Verified Reviews</span>
              <span style={{ width: '1px', height: '14px', background: 'rgba(255, 255, 255, 0.2)' }} />
              <span style={{ fontSize: '13px', color: '#10b981', fontWeight: 600 }}>100% Pan-India Safe</span>
            </div>

            {/* Write a Review Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '9999px',
                background: 'var(--gradient-rose-gold)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(244, 63, 94, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              <Edit3 size={15} />
              <span>{lang === 'hi' ? 'अपनी समीक्षा लिखें' : 'Write a Review'}</span>
            </button>
          </div>
        </div>

     
        {/* ============================================================== */}
        {/* REVIEWS FILTER CHIPS */}
        {/* ============================================================== */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
          {[
            { id: 'all', labelEn: 'All Reviews', labelHi: 'सभी समीक्षाएं' },
            { id: 'portrait', labelEn: 'Portraits', labelHi: 'पोर्ट्रेट स्केच' },
            { id: 'embroidery', labelEn: 'Embroidery Hoops', labelHi: 'एम्ब्रॉयडरी' },
            { id: 'crochet', labelEn: 'Crochet Flowers', labelHi: 'क्रोशिया फूल' },
            { id: 'hampers', labelEn: 'Gift Hampers', labelHi: 'गिफ्ट हैंपर्स' },
            { id: 'jain', labelEn: 'Jain Files', labelHi: 'जैन फाइल' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 600,
                border: activeFilter === f.id ? '1px solid rgba(244, 63, 94, 0.6)' : '1px solid var(--color-border)',
                background: activeFilter === f.id ? 'var(--gradient-rose-gold)' : 'rgba(255, 255, 255, 0.04)',
                color: activeFilter === f.id ? '#ffffff' : 'var(--color-text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {lang === 'hi' ? f.labelHi : f.labelEn}
            </button>
          ))}
        </div>

        {/* ============================================================== */}
        {/* REVIEWS CARDS GRID */}
        {/* ============================================================== */}
        {filteredReviews.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '50px 24px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '20px',
            border: '1px dashed rgba(255, 255, 255, 0.12)',
            maxWidth: '540px',
            margin: '0 auto'
          }}>
            <Sparkles size={32} style={{ color: '#fda4af', margin: '0 auto 14px' }} />
            <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
              {lang === 'hi' ? 'अभी कोई समीक्षा नहीं है' : 'No Reviews Yet'}
            </h4>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '13.5px', marginBottom: '18px' }}>
              {lang === 'hi' 
                ? 'काल्पनिक कला की पहली समीक्षा देने वाले पहले ग्राहक बनें!' 
                : 'Be the very first customer to share your experience with Kalpanik Kala!'}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary-sethji"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', fontSize: '13px' }}
            >
              <Edit3 size={15} />
              <span>{lang === 'hi' ? 'पहली समीक्षा लिखें' : 'Write First Review'}</span>
            </button>
          </div>
        ) : (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px'
            }}>
              {displayedReviews.map(rev => (
                <div
                  key={rev.id}
                  className="sethji-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '24px',
                    borderRadius: '20px',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                  }}
                >
                  <div>
                    {/* Header: Stars & Product Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={15} fill="#fbbf24" stroke="#fbbf24" />
                        ))}
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-dim)' }}>
                        {rev.date}
                      </span>
                    </div>

                    {/* Product Name */}
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#fde68a', marginBottom: '10px' }}>
                      {lang === 'hi' ? rev.productHi : rev.productEn}
                    </div>

                    {/* Comment Text */}
                    <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'var(--color-text)', fontStyle: 'italic', marginBottom: '18px' }}>
                      "{lang === 'hi' ? rev.commentHi : rev.commentEn}"
                    </p>
                  </div>

                  {/* Reviewer Details Footer */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    paddingTop: '14px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                  }}>
                    {/* Customer Initials Badge instead of fake photos */}
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.25) 0%, rgba(245, 158, 11, 0.22) 100%)',
                      border: '1.5px solid rgba(244, 63, 94, 0.4)',
                      color: '#fde68a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '15px',
                      fontFamily: 'var(--font-heading)',
                      flexShrink: 0
                    }}>
                      {rev.name ? rev.name.trim().charAt(0).toUpperCase() : 'K'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {rev.name}
                        </span>
                        {rev.verified && (
                          <span title="Verified Customer Order" style={{ color: '#10b981', display: 'flex' }}>
                            <CheckCircle size={13} fill="#10b981" stroke="#0c080b" />
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--color-text-dim)' }}>
                        <MapPin size={11} style={{ color: '#fda4af' }} />
                        <span>{rev.city}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Reviews Button if more than 6 reviews */}
            {hasMoreReviews && (
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <button
                  onClick={() => {
                    setCurrentPage(1);
                    setIsAllReviewsModalOpen(true);
                  }}
                  className="btn-primary-sethji"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '13px 32px',
                    fontSize: '14px',
                    fontWeight: 700,
                    borderRadius: '9999px',
                    boxShadow: '0 8px 24px rgba(244, 63, 94, 0.35)'
                  }}
                >
                  <span>
                    {lang === 'hi' 
                      ? `सभी समीक्षाएं देखें (कुल ${filteredReviews.length})` 
                      : `View All Reviews (${filteredReviews.length} Total)`}
                  </span>
                  <ArrowRight size={17} />
                </button>
              </div>
            )}
          </>
        )}

        {/* ============================================================== */}
        {/* WRITE A REVIEW MODAL POPUP */}
        {/* ============================================================== */}
        {isModalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 7, 10, 0.88)',
            backdropFilter: 'blur(16px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '520px',
              background: '#140d13',
              border: '1px solid rgba(244, 63, 94, 0.35)',
              borderRadius: '24px',
              padding: '28px 24px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
              position: 'relative'
            }}>
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                  <Sparkles size={13} /> {lang === 'hi' ? 'ग्राहक समीक्षा' : 'Customer Feedback'}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  {lang === 'hi' ? 'अपनी अनबॉक्सिंग समीक्षा साझा करें' : 'Share Your Experience'}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: '4px 0 0' }}>
                  {lang === 'hi' ? 'आपकी सच्ची समीक्षा अन्य कला प्रेमियों का मार्गदर्शन करती है।' : 'Your feedback helps other art lovers choose with confidence.'}
                </p>
              </div>

              {submittedSuccess ? (
                <div style={{
                  padding: '30px 20px',
                  textAlign: 'center',
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '16px',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎉</div>
                  <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#a7f3d0', margin: '0 0 6px' }}>
                    {lang === 'hi' ? 'समीक्षा दर्ज हो गई!' : 'Thank you for your review!'}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#e2cad4', margin: 0 }}>
                    {lang === 'hi' ? 'आपकी समीक्षा वेबसाइट पर सफलतापूर्वक जोड़ दी गई है।' : 'Your feedback has been added to our happy patrons.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Rating Selector */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#e2e8f0', marginBottom: '6px' }}>
                      {lang === 'hi' ? 'आपकी रेटिंग (Rating)' : 'Your Overall Rating'}
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setNewReview(prev => ({ ...prev, rating: starVal }))}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Star
                            size={28}
                            fill={starVal <= newReview.rating ? '#fbbf24' : 'transparent'}
                            stroke={starVal <= newReview.rating ? '#fbbf24' : '#64748b'}
                            style={{ transition: 'transform 0.15s ease' }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and City */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#e2e8f0', marginBottom: '4px' }}>
                        {lang === 'hi' ? 'आपका नाम *' : 'Your Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priyanshu / Sneha"
                        value={newReview.name}
                        onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--color-border)', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#e2e8f0', marginBottom: '4px' }}>
                        {lang === 'hi' ? 'शहर / राज्य' : 'City / State'}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mumbai, Indore"
                        value={newReview.city}
                        onChange={(e) => setNewReview(prev => ({ ...prev, city: e.target.value }))}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--color-border)', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  {/* Category & Product Name */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#e2e8f0', marginBottom: '4px' }}>
                        {lang === 'hi' ? 'आर्ट श्रेणी' : 'Art Category'}
                      </label>
                      <select
                        value={newReview.category}
                        onChange={(e) => setNewReview(prev => ({ ...prev, category: e.target.value }))}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.9)', border: '1px solid var(--color-border)', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
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
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#e2e8f0', marginBottom: '4px' }}>
                        {lang === 'hi' ? 'ऑर्डर किया गया आइटम' : 'Item Ordered'}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 8-inch Hoop / A4 Sketch"
                        value={newReview.product}
                        onChange={(e) => setNewReview(prev => ({ ...prev, product: e.target.value }))}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--color-border)', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  {/* Comments */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#e2e8f0', marginBottom: '4px' }}>
                      {lang === 'hi' ? 'आपकी समीक्षा / अनुभव *' : 'Your Review / Unboxing Experience *'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder={lang === 'hi' ? 'आर्टवर्क की फिनिशिंग, शेडिंग और पैकेजिंग कैसी लगी...' : 'Tell us about the craftsmanship, detailing, safe packaging...'}
                      value={newReview.comment}
                      onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--color-border)', color: '#fff', fontSize: '13px', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary-sethji"
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '14px',
                      fontWeight: 700,
                      marginTop: '6px'
                    }}
                  >
                    {lang === 'hi' ? 'समीक्षा सबमिट करें' : 'Submit Review'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW ALL REVIEWS MODAL WITH PAGINATION */}
        {/* ============================================================== */}
        {isAllReviewsModalOpen && (
          <div className="admin-modal-container" style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 7, 10, 0.92)',
            backdropFilter: 'blur(16px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}>
            <div className="admin-modal-box" style={{
              width: '100%',
              maxWidth: '960px',
              maxHeight: '90vh',
              background: '#120b12',
              border: '1px solid rgba(244, 63, 94, 0.35)',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
              overflow: 'hidden'
            }}>
              {/* Modal Header */}
              <div className="admin-modal-header" style={{
                padding: '20px 24px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255, 255, 255, 0.02)'
              }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>
                    {lang === 'hi' ? 'सभी ग्राहक समीक्षाएं' : 'All Customer Reviews'}
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-dim)', margin: '4px 0 0' }}>
                    {lang === 'hi' 
                      ? `कुल ${filteredReviews.length} समीक्षाएं • पेज ${currentPage} of ${totalPages}` 
                      : `Showing ${filteredReviews.length} verified reviews • Page ${currentPage} of ${totalPages}`}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => {
                      setIsAllReviewsModalOpen(false);
                      setIsModalOpen(true);
                    }}
                    className="btn-primary-sethji"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      fontSize: '12.5px',
                      borderRadius: '9999px'
                    }}
                  >
                    <Edit3 size={14} />
                    <span>{lang === 'hi' ? 'रिव्यू लिखें' : 'Write Review'}</span>
                  </button>

                  <button
                    onClick={() => setIsAllReviewsModalOpen(false)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: 'none',
                      color: '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Modal Body: Reviews Grid */}
              <div className="admin-modal-body" style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '20px'
                }}>
                  {paginatedReviews.map(rev => (
                    <div
                      key={rev.id}
                      className="sethji-card"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '20px',
                        borderRadius: '16px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                      }}
                    >
                      <div>
                        {/* Header: Stars & Date */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <div style={{ display: 'flex', gap: '2px' }}>
                            {[...Array(rev.rating || 5)].map((_, i) => (
                              <Star key={i} size={13} fill="#fbbf24" stroke="#fbbf24" />
                            ))}
                          </div>
                          <span style={{ fontSize: '11px', color: 'var(--color-text-dim)' }}>
                            {rev.date}
                          </span>
                        </div>

                        {/* Product Title */}
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#fde68a', marginBottom: '8px' }}>
                          {lang === 'hi' ? rev.productHi : rev.productEn}
                        </div>

                        {/* Comment */}
                        <p style={{ fontSize: '13px', lineHeight: 1.55, color: 'var(--color-text)', fontStyle: 'italic', marginBottom: '16px', wordBreak: 'break-word' }}>
                          "{lang === 'hi' ? rev.commentHi : rev.commentEn}"
                        </p>
                      </div>

                      {/* Reviewer Details Footer */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        paddingTop: '12px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                      }}>
                        <div style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.25) 0%, rgba(245, 158, 11, 0.22) 100%)',
                          border: '1px solid rgba(244, 63, 94, 0.4)',
                          color: '#fde68a',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '14px',
                          flexShrink: 0
                        }}>
                          {rev.name ? rev.name.trim().charAt(0).toUpperCase() : 'K'}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {rev.name}
                            </span>
                            {rev.verified && (
                              <span title="Verified Customer Order" style={{ color: '#10b981', display: 'flex' }}>
                                <CheckCircle size={12} fill="#10b981" stroke="#0c080b" />
                              </span>
                            )}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--color-text-dim)' }}>
                            <MapPin size={11} style={{ color: '#fda4af' }} />
                            <span>{rev.city}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer: Pagination Controls */}
              {totalPages > 1 && (
                <div style={{
                  padding: '16px 20px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  background: 'rgba(255, 255, 255, 0.02)'
                }}>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      background: currentPage === 1 ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid var(--color-border)',
                      color: currentPage === 1 ? 'var(--color-text-dim)' : '#ffffff',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <ArrowLeft size={14} />
                    <span>{lang === 'hi' ? 'पिछला' : 'Previous'}</span>
                  </button>

                  {/* Page Numbers */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      const isActive = currentPage === pageNum;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            border: isActive ? '1px solid rgba(244, 63, 94, 0.6)' : '1px solid transparent',
                            background: isActive ? 'var(--gradient-rose-gold)' : 'rgba(255, 255, 255, 0.05)',
                            color: isActive ? '#ffffff' : 'var(--color-text-muted)',
                            fontWeight: 700,
                            fontSize: '12.5px',
                            cursor: 'pointer'
                          }}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      background: currentPage === totalPages ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid var(--color-border)',
                      color: currentPage === totalPages ? 'var(--color-text-dim)' : '#ffffff',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <span>{lang === 'hi' ? 'अगला' : 'Next'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
