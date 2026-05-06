// ========================================
// Dudo — Venue Detail (Warm Light)
// ========================================

import { motion } from 'framer-motion';
import { ArrowLeft, Star, MapPin, Clock, Navigation } from 'lucide-react';
import { GlassCard, TokenBadge, DifficultyBadge, Chip } from '../components/ui';
import { mockClasses, categoryConfig } from '../data';
import type { Venue, FitnessClass } from '../types';

interface VenueDetailProps {
  venue: Venue;
  onBack: () => void;
  onClassSelect: (c: FitnessClass) => void;
}

export function VenueDetailScreen({ venue, onBack, onClassSelect }: VenueDetailProps) {
  const venueClasses = mockClasses.filter((c) => c.venue.id === venue.id);

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--color-cream)' }}>
      <div style={{ position: 'relative', height: '220px' }}>
        <img src={venue.image} alt={venue.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.6) 100%)' }} />
        <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} style={{
          position: 'absolute', top: '48px', left: '16px', width: 40, height: 40, borderRadius: '12px',
          background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-md)',
        }}>
          <ArrowLeft size={20} color="var(--text-primary)" />
        </motion.button>
        <div style={{ position: 'absolute', bottom: '18px', left: '20px', right: '20px' }}>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>{venue.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.85)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Star size={13} color="var(--color-warm-yellow)" fill="var(--color-warm-yellow)" /> {venue.rating} ({venue.reviewCount})
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={13} /> {venue.distance}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
          {venue.categories.map((cat) => {
            const cfg = categoryConfig[cat];
            return cfg ? <Chip key={cat} label={cfg.label} emoji={cfg.emoji} active color={cfg.color} /> : null;
          })}
        </div>

        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>About</h3>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{venue.description}</p>
        </div>

        <GlassCard style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px', padding: '14px', background: 'white' }}>
          <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'var(--color-coral-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Navigation size={18} color="var(--color-coral)" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{venue.address}</p>
            <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{venue.distance} away</p>
          </div>
        </GlassCard>

        <GlassCard style={{ marginBottom: '18px', padding: '16px', background: 'white' }}>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={15} /> Opening Hours
          </h3>
          {[
            { day: 'Mon — Fri', hours: '06:00 — 22:00' },
            { day: 'Sat — Sun', hours: '08:00 — 20:00' },
          ].map((item) => (
            <div key={item.day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>{item.day}</span>
              <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{item.hours}</span>
            </div>
          ))}
        </GlassCard>

        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Classes at {venue.name}</h3>
        {venueClasses.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {venueClasses.map((cls) => (
              <GlassCard key={cls.id} onClick={() => onClassSelect(cls)} style={{ display: 'flex', gap: '12px', padding: '12px', background: 'white' }}>
                <img src={cls.image} alt={cls.name} style={{ width: 64, height: 64, borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{cls.name}</h4>
                    <TokenBadge count={cls.tokenCost} originalCount={cls.originalTokenCost} size="sm" />
                  </div>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', margin: '3px 0' }}>{cls.date} {cls.time} · {cls.instructor}</p>
                  <DifficultyBadge level={cls.difficulty} />
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', textAlign: 'center', padding: '24px' }}>No upcoming classes</p>
        )}
      </div>
    </div>
  );
}
