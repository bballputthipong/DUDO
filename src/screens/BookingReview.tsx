// ========================================
// Dudo — Booking Review & Success (Warm Light)
// ========================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, Check, Sparkles } from 'lucide-react';
import { Button, GlassCard, TokenBadge } from '../components/ui';
import { useApp } from '../context';
import type { FitnessClass } from '../types';

interface BookingReviewProps {
  fitnessClass: FitnessClass;
  onBack: () => void;
  onComplete: () => void;
}

export function BookingReviewScreen({ fitnessClass: cls, onBack, onComplete }: BookingReviewProps) {
  const { tokens, bookClass } = useApp();
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleBook = () => {
    const ok = bookClass(cls);
    if (ok) { setShowSuccess(true); }
    else { setError('Not enough tokens! Consider upgrading your plan.'); }
  };

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--color-cream)' }}>
      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              minHeight: '100dvh', padding: '40px 24px', textAlign: 'center',
              background: 'linear-gradient(180deg, var(--color-cream) 0%, var(--color-lime-light) 100%)',
            }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
              style={{
                width: 90, height: 90, borderRadius: '50%', background: 'var(--color-lime)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px',
                boxShadow: '0 8px 30px rgba(200,239,77,0.3)',
              }}>
              <Check size={44} color="var(--text-primary)" strokeWidth={3} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>Booked! 🎉</h1>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '28px', maxWidth: '260px' }}>
                You're all set for <strong style={{ color: 'var(--text-primary)' }}>{cls.name}</strong>
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ width: '100%', maxWidth: '320px' }}>
              <GlassCard strong style={{ padding: '16px', marginBottom: '14px', textAlign: 'left', background: 'white' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <img src={cls.image} alt={cls.name} style={{ width: 56, height: 56, borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{cls.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={11} /> {cls.date} at {cls.time}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={11} /> {cls.venue.name}</p>
                  </div>
                </div>
              </GlassCard>
              <GlassCard style={{ padding: '12px', marginBottom: '24px', textAlign: 'center', background: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Sparkles size={14} color="var(--color-warm-yellow)" />
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    Token balance: <strong style={{ color: 'var(--text-primary)' }}>{tokens.remaining}</strong> remaining
                  </span>
                </div>
              </GlassCard>
              <Button variant="primary" size="lg" fullWidth onClick={onComplete}>View My Bookings</Button>
              <Button variant="ghost" size="md" fullWidth onClick={onComplete} style={{ marginTop: '10px' }}>Back to Home</Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div key="review" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={{ padding: '48px 20px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} style={{
                width: 40, height: 40, borderRadius: '12px', background: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                border: '1px solid var(--color-warm-beige)',
              }}>
                <ArrowLeft size={20} color="var(--text-primary)" />
              </motion.button>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>Review Booking</h1>
            </div>
            <div style={{ padding: '0 20px 32px' }}>
              <GlassCard strong style={{ padding: '18px', marginBottom: '14px', background: 'white' }}>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <img src={cls.image} alt={cls.name} style={{ width: 76, height: 76, borderRadius: '14px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>{cls.name}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{cls.instructor}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={11} /> {cls.date} at {cls.time} · {cls.duration}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={11} /> {cls.venue.name}</p>
                  </div>
                </div>
              </GlassCard>
              <GlassCard style={{ padding: '16px', marginBottom: '14px', background: 'white' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>Payment Summary</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Class cost</span>
                  <TokenBadge count={cls.tokenCost} />
                </div>
                <div style={{ borderTop: '1px solid var(--color-sand)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Your balance</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>🪙 {tokens.remaining}</span>
                </div>
                <div style={{ borderTop: '1px solid var(--color-sand)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>After booking</span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-lime-dark)' }}>🪙 {tokens.remaining - cls.tokenCost}</span>
                </div>
              </GlassCard>
              <GlassCard style={{ padding: '14px', marginBottom: '24px', background: 'var(--color-lime-light)', border: '1px solid rgba(200,239,77,0.3)' }}>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  ⏰ Free cancellation up to <strong style={{ color: 'var(--text-primary)' }}>12 hours</strong> before class. Tokens will be refunded instantly.
                </p>
              </GlassCard>
              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
                  padding: '12px 16px', borderRadius: '12px', background: 'var(--color-coral-light)',
                  border: '1px solid rgba(255,107,74,0.2)', color: 'var(--color-coral)', fontSize: '0.875rem', marginBottom: '14px',
                }}>{error}</motion.div>
              )}
              <Button variant="primary" size="lg" fullWidth onClick={handleBook}>
                Confirm Booking · 🪙 {cls.tokenCost}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
