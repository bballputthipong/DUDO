// ========================================
// Dudo — Promotion Detail Screen
// ========================================

import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag, Zap, Gift } from 'lucide-react';
import { GlassCard, TokenBadge, DifficultyBadge, Button } from '../components/ui';
import { mockClasses, categoryConfig, type Promotion } from '../data';
import type { FitnessClass } from '../types';

interface Props {
  promotion: Promotion;
  onBack: () => void;
  onClassSelect: (c: FitnessClass) => void;
}

export function PromotionDetailScreen({ promotion, onBack, onClassSelect }: Props) {
  // Filter applicable classes
  const applicableClasses = mockClasses.filter((cls) => {
    if (promotion.classIds && promotion.classIds.length > 0) {
      return promotion.classIds.includes(cls.id);
    }
    if (promotion.categoryFilter) {
      const catCfg = categoryConfig[cls.category];
      return catCfg?.section === promotion.categoryFilter;
    }
    return true; // show all if no filter
  });

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--color-cream)' }}>
      {/* Hero */}
      <div style={{
        position: 'relative', padding: '48px 20px 28px',
        background: promotion.gradient, overflow: 'hidden',
      }}>
        {/* Big emoji background */}
        <div style={{
          position: 'absolute', top: '-20px', right: '-20px',
          fontSize: '8rem', opacity: 0.12, lineHeight: 1,
        }}>
          {promotion.emoji}
        </div>

        <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} style={{
          width: 40, height: 40, borderRadius: '12px',
          background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', marginBottom: '20px',
        }}>
          <ArrowLeft size={20} color="white" />
        </motion.button>

        <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }}>{promotion.emoji}</span>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>
          {promotion.title}
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, marginBottom: '16px' }}>
          {promotion.subtitle}
        </p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '0.875rem', fontWeight: 700, padding: '6px 14px', borderRadius: '10px',
            background: 'rgba(255,255,255,0.25)', color: 'white',
          }}>
            <Tag size={14} /> {promotion.discount}
          </span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '0.8125rem', fontWeight: 500, padding: '6px 14px', borderRadius: '10px',
            background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)',
          }}>
            <Clock size={13} /> {promotion.validTime}
          </span>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        {/* How it works */}
        <GlassCard style={{ padding: '16px', marginBottom: '18px', background: 'white' }}>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={16} color="var(--color-coral)" /> How It Works
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { icon: '1️⃣', text: 'Browse eligible classes below' },
              { icon: '2️⃣', text: 'Book during the promo window' },
              { icon: '3️⃣', text: 'Discount applied automatically at checkout!' },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.125rem' }}>{step.icon}</span>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{step.text}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Promo code if exists */}
        {promotion.code && (
          <GlassCard style={{
            padding: '14px', marginBottom: '18px', background: 'linear-gradient(135deg, #fff8f0 0%, #fff0ed 100%)',
            border: '1px solid rgba(255,107,74,0.12)', display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <Gift size={20} color="var(--color-coral)" />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Promo Code</p>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-coral)', letterSpacing: '0.1em' }}>{promotion.code}</p>
            </div>
            <Button variant="ghost" size="sm">Copy</Button>
          </GlassCard>
        )}

        {/* Eligible Classes */}
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
          Eligible Classes ({applicableClasses.length})
        </h3>

        {applicableClasses.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '24px' }}>
            {applicableClasses.map((cls) => {
              const catCfg = categoryConfig[cls.category];
              return (
                <GlassCard key={cls.id} onClick={() => onClassSelect(cls)}
                  style={{ display: 'flex', gap: '14px', padding: '12px', background: 'white' }}>
                  <img src={cls.image} alt={cls.name}
                    style={{ width: 72, height: 72, borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>{cls.name}</h4>
                      <TokenBadge count={cls.tokenCost} originalCount={cls.originalTokenCost} size="sm" />
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      {cls.instructor} · {cls.venue.name}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      {catCfg && (
                        <span style={{
                          fontSize: '0.625rem', fontWeight: 600, padding: '2px 8px', borderRadius: '6px',
                          background: `${catCfg.color}18`, color: catCfg.color === '#c8ef4d' ? '#6b8e23' : catCfg.color,
                        }}>
                          {catCfg.emoji} {catCfg.label}
                        </span>
                      )}
                      <DifficultyBadge level={cls.difficulty} />
                      <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Clock size={10} /> {cls.date} {cls.time}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', textAlign: 'center', padding: '40px 0' }}>
            No classes available for this promotion right now.
          </p>
        )}
      </div>
    </div>
  );
}
