import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { CONFIG } from '../data';

export default function FloatingWhatsApp() {
  return (
    <motion.a 
      href={`https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 999,
        width: '58px',
        height: '58px',
        borderRadius: '9999px',
        backgroundColor: '#25D366',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 30px rgba(37, 211, 102, 0.45)',
        textDecoration: 'none'
      }}
      title="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </motion.a>
  );
}
