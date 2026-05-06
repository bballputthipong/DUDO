// ========================================
// Dudo — Class Detail (Date/Time Picker + Reviews)
// ========================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, Star, Calendar, MessageSquare, ThumbsUp } from 'lucide-react';
import { Button, GlassCard, TokenBadge, DifficultyBadge, Avatar } from '../components/ui';
import { categoryConfig } from '../data';
import type { FitnessClass } from '../types';

interface ClassDetailProps {
  fitnessClass: FitnessClass;
  onBack: () => void;
  onBook: (fc: FitnessClass) => void;
}

const mockReviews = [
  { id: 'r1', user: 'Pim', avatar: 'https://picsum.photos/id/65/100/100', rating: 5, text: 'Best boxing class in Bangkok! Coach is super motivating 🔥', date: '2 days ago', helpful: 12 },
  { id: 'r2', user: 'Nat', avatar: 'https://picsum.photos/id/77/100/100', rating: 4, text: 'Great workout, nice atmosphere. Gets crowded on weekends though.', date: '1 week ago', helpful: 8 },
  { id: 'r3', user: 'Film', avatar: 'https://picsum.photos/id/83/100/100', rating: 5, text: 'Love this class! Perfect intensity and the instructor is amazing. Will definitely come back!', date: '2 weeks ago', helpful: 15 },
  { id: 'r4', user: 'May', avatar: 'https://picsum.photos/id/91/100/100', rating: 4, text: 'Good class for beginners too. Staff is very friendly.', date: '3 weeks ago', helpful: 5 },
];

export function ClassDetailScreen({ fitnessClass: cls, onBack, onBook }: ClassDetailProps) {
  const catConfig = categoryConfig[cls.category];
  const spotsPercent = ((cls.totalSpots - cls.spotsLeft) / cls.totalSpots) * 100;

  // Date picker state
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const dates = Array.from({ length: 10 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
    };
  });

  // Time slot state
  const allTimeSlots = ['07:30', '09:00', '10:30', '12:00', '15:00', '18:00', '19:30', '20:00'];
  const availableSlots = allTimeSlots.filter((_, i) => i !== 3 || selectedDateIdx !== 2); // mock some unavailability
  const [selectedTime, setSelectedTime] = useState(cls.time);

  // Reviews
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [helpfulClicked, setHelpfulClicked] = useState<Set<string>>(new Set());
  const avgRating = (mockReviews.reduce((a, r) => a + r.rating, 0) / mockReviews.length).toFixed(1);
  const displayedReviews = showAllReviews ? mockReviews : mockReviews.slice(0, 2);

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--color-cream)' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '240px' }}>
        <img src={cls.image} alt={cls.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)' }} />
        <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} style={{
          position: 'absolute', top: '48px', left: '16px', width: 40, height: 40, borderRadius: '12px',
          background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-md)',
        }}>
          <ArrowLeft size={20} color="var(--text-primary)" />
        </motion.button>
        <div style={{ position: 'absolute', bottom: '16px', left: '20px', right: '20px' }}>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'white', marginBottom: '4px' }}>{cls.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.85)', fontSize: '0.8125rem' }}>
            <span>{cls.venue.name}</span>
            <span>·</span>
            <Star size={12} fill="var(--color-warm-yellow)" color="var(--color-warm-yellow)" />
            <span>{cls.venue.rating} ({cls.venue.reviewCount})</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '18px 20px 120px' }}>
        {/* Tags */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {catConfig && (
            <span style={{
              fontSize: '0.75rem', fontWeight: 600, padding: '4px 12px', borderRadius: '8px',
              background: `${catConfig.color}20`, color: catConfig.color === '#c8ef4d' ? '#6b8e23' : catConfig.color,
            }}>
              {catConfig.emoji} {catConfig.label}
            </span>
          )}
          <DifficultyBadge level={cls.difficulty} />
          <TokenBadge count={cls.tokenCost} originalCount={cls.originalTokenCost} />
          {cls.promoLabel && (
            <span style={{
              fontSize: '0.6875rem', fontWeight: 700, padding: '4px 8px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #ff6b4a 0%, #ff8f6b 100%)', color: 'white',
              boxShadow: '0 2px 8px rgba(255,107,74,0.3)',
            }}>
              ⚡ {cls.promoLabel}
            </span>
          )}
        </div>

        {/* Info Row */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '18px' }}>
          {[
            { icon: Calendar, label: dates[selectedDateIdx].day, sub: `${dates[selectedDateIdx].date} ${dates[selectedDateIdx].month}` },
            { icon: Clock, label: selectedTime, sub: cls.duration },
            { icon: Users, label: `${cls.spotsLeft} left`, sub: `of ${cls.totalSpots}` },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <GlassCard key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '10px 6px', background: 'white' }}>
                <Icon size={15} color="var(--color-coral)" />
                <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</p>
                <p style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{item.sub}</p>
              </GlassCard>
            );
          })}
        </div>

        {/* Date Picker */}
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>Select Date</h3>
          <div className="hide-scrollbar" style={{ display: 'flex', gap: '7px', overflowX: 'auto', paddingBottom: '2px' }}>
            {dates.map((d, i) => (
              <motion.button key={i} whileTap={{ scale: 0.93 }} onClick={() => setSelectedDateIdx(i)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
                  padding: '8px 12px', borderRadius: '12px', minWidth: '50px', flexShrink: 0,
                  background: selectedDateIdx === i ? 'var(--color-coral)' : 'white',
                  color: selectedDateIdx === i ? 'white' : 'var(--text-primary)',
                  border: `1px solid ${selectedDateIdx === i ? 'transparent' : 'var(--color-warm-beige)'}`,
                  cursor: 'pointer', boxShadow: selectedDateIdx === i ? '0 3px 12px rgba(255,107,74,0.2)' : 'none',
                }}>
                <span style={{ fontSize: '0.5625rem', fontWeight: 500, opacity: 0.7 }}>{d.day}</span>
                <span style={{ fontSize: '1rem', fontWeight: 700 }}>{d.date}</span>
                <span style={{ fontSize: '0.5rem', opacity: 0.6 }}>{d.month}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Time Slot Picker */}
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>Select Time</h3>
          <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
            {availableSlots.map((t) => (
              <motion.button key={t} whileTap={{ scale: 0.95 }} onClick={() => setSelectedTime(t)}
                style={{
                  padding: '9px 16px', borderRadius: '10px', fontSize: '0.8125rem', fontWeight: 600,
                  background: selectedTime === t ? 'var(--color-coral)' : 'white',
                  color: selectedTime === t ? 'white' : 'var(--text-primary)',
                  border: `1px solid ${selectedTime === t ? 'transparent' : 'var(--color-warm-beige)'}`,
                  cursor: 'pointer', boxShadow: selectedTime === t ? '0 3px 12px rgba(255,107,74,0.2)' : 'none',
                }}>
                {t}
              </motion.button>
            ))}
          </div>
        </div>

        {/* About */}
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>About this class</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{cls.description}</p>
        </div>

        {/* Spots */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Availability</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>{cls.totalSpots - cls.spotsLeft}/{cls.totalSpots} booked</span>
          </div>
          <div style={{ height: '6px', borderRadius: '3px', background: 'var(--color-sand)', overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${spotsPercent}%` }} transition={{ duration: 0.6 }}
              style={{ height: '100%', borderRadius: '3px', background: spotsPercent > 80 ? 'var(--color-coral)' : 'var(--color-lime-dark)' }} />
          </div>
        </div>

        {/* Instructor */}
        <GlassCard style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', marginBottom: '22px', background: 'white' }}>
          <Avatar src="https://picsum.photos/id/64/100/100" size={44} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>{cls.instructor}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Certified trainer · 5+ years</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Star size={13} color="var(--color-warm-yellow)" fill="var(--color-warm-yellow)" />
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>4.9</span>
          </div>
        </GlassCard>

        {/* ==================== REVIEWS SECTION ==================== */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={16} /> Reviews
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Star size={14} color="var(--color-warm-yellow)" fill="var(--color-warm-yellow)" />
              <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>{avgRating}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({mockReviews.length})</span>
            </div>
          </div>

          {/* Rating Breakdown */}
          <GlassCard style={{ padding: '14px', marginBottom: '12px', background: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{avgRating}</p>
                <div style={{ display: 'flex', gap: '2px', margin: '4px 0' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={12} color="var(--color-warm-yellow)" fill={s <= Math.round(Number(avgRating)) ? 'var(--color-warm-yellow)' : 'none'} />
                  ))}
                </div>
                <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>{mockReviews.length} reviews</p>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = mockReviews.filter((r) => r.rating === rating).length;
                  const pct = (count / mockReviews.length) * 100;
                  return (
                    <div key={rating} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', width: '12px', textAlign: 'right' }}>{rating}</span>
                      <div style={{ flex: 1, height: '5px', borderRadius: '3px', background: 'var(--color-sand)', overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', borderRadius: '3px', background: 'var(--color-warm-yellow)', transition: 'width 400ms ease' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </GlassCard>

          {/* Review Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {displayedReviews.map((review) => (
              <GlassCard key={review.id} style={{ padding: '14px', background: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Avatar src={review.avatar} size={32} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{review.user}</p>
                    <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>{review.date}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={11} color="var(--color-warm-yellow)" fill={s <= review.rating ? 'var(--color-warm-yellow)' : 'none'} />
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '8px' }}>{review.text}</p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setHelpfulClicked((prev) => {
                      const next = new Set(prev);
                      if (next.has(review.id)) next.delete(review.id); else next.add(review.id);
                      return next;
                    });
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 10px',
                    borderRadius: '8px', fontSize: '0.6875rem', fontWeight: 500, cursor: 'pointer',
                    background: helpfulClicked.has(review.id) ? 'var(--color-coral-light)' : 'var(--color-sand)',
                    color: helpfulClicked.has(review.id) ? 'var(--color-coral)' : 'var(--text-muted)',
                    border: `1px solid ${helpfulClicked.has(review.id) ? 'rgba(255,107,74,0.15)' : 'transparent'}`,
                  }}
                >
                  <ThumbsUp size={11} /> Helpful ({review.helpful + (helpfulClicked.has(review.id) ? 1 : 0)})
                </motion.button>
              </GlassCard>
            ))}
          </div>

          {!showAllReviews && mockReviews.length > 2 && (
            <Button variant="ghost" size="sm" fullWidth style={{ marginTop: '10px' }} onClick={() => setShowAllReviews(true)}>
              See All {mockReviews.length} Reviews
            </Button>
          )}
        </div>
      </div>

      {/* Sticky Book CTA */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: '430px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px',
        padding: '12px 20px calc(12px + env(safe-area-inset-bottom))',
        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 -4px 20px rgba(0,0,0,0.04)',
        zIndex: 50,
      }}>
        <div>
          <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Cost</p>
          <TokenBadge count={cls.tokenCost} originalCount={cls.originalTokenCost} />
        </div>
        <Button variant="primary" size="lg" onClick={() => onBook(cls)}>
          Book for {cls.tokenCost} Tokens ✨
        </Button>
      </div>
    </div>
  );
}
