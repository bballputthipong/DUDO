// ========================================
// Dudo — Home Screen (Warm Light Theme)
// ========================================

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Bell, MapPin, Star, Clock, Search } from 'lucide-react';
import { useApp } from '../context';
import { mockClasses, mockVenues, categoryConfig, mockPromotions, pricingTierInfo } from '../data';
import { Avatar, GlassCard, SectionHeader, TokenBadge, DifficultyBadge } from '../components/ui';
import type { FitnessClass, Venue } from '../types';

interface HomeScreenProps {
  onClassSelect: (c: FitnessClass) => void;
  onVenueSelect: (v: Venue) => void;
  onNavigate: (screen: string, data?: unknown) => void;
}

export function HomeScreen({ onClassSelect, onVenueSelect, onNavigate }: HomeScreenProps) {
  const { user, tokens, plan } = useApp();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredClasses = useMemo(() => {
    if (!activeCategory) return mockClasses;
    return mockClasses.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  return (
    <div style={{ paddingBottom: '24px' }}>
      {/* Header */}
      <div style={{ padding: '48px 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Avatar src={user.avatar} size={44} ring />
            <div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Good evening 👋</p>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{user.name}</h1>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onNavigate('notifications')}
            style={{
              width: 42, height: 42, borderRadius: '12px',
              background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', cursor: 'pointer', boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--color-warm-beige)',
            }}
          >
            <Bell size={20} color="var(--text-primary)" />
            <div style={{ position: 'absolute', top: 9, right: 9, width: 7, height: 7, borderRadius: '50%', background: 'var(--color-coral)' }} />
          </motion.button>
        </div>

        {/* Search Bar — navigates to Explore */}
        <motion.div
          whileTap={{ scale: 0.99 }}
          onClick={() => onNavigate('explore')}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: 'white', borderRadius: '14px', padding: '12px 16px',
            border: '1px solid var(--color-warm-beige)', cursor: 'pointer',
          }}
        >
          <Search size={18} color="var(--text-muted)" />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>Search studios, classes, or activities...</span>
        </motion.div>
      </div>

      {/* Hot This Week / Featured */}
      <div style={{ padding: '8px 20px 0' }}>
        <SectionHeader title="Hot This Week 🔥" />
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => onClassSelect(mockClasses[1])}
          style={{
            borderRadius: '20px', overflow: 'hidden', position: 'relative',
            cursor: 'pointer', height: '180px', boxShadow: 'var(--shadow-lg)',
          }}
        >
          <img src={mockClasses[1].image} alt={mockClasses[1].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 18px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
              <DifficultyBadge level={mockClasses[1].difficulty} />
              <TokenBadge count={mockClasses[1].tokenCost} originalCount={mockClasses[1].originalTokenCost} size="sm" />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>{mockClasses[1].name}</h3>
            <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.8)' }}>
              Stronger Together · {mockClasses[1].venue.name}
            </p>
          </div>
          <motion.div
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'absolute', bottom: '14px', right: '14px',
              background: 'white', borderRadius: '10px', padding: '8px 16px',
              fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-md)', cursor: 'pointer',
            }}
          >
            Book Now
          </motion.div>
        </motion.div>
      </div>

      {/* Promotions */}
      <div style={{ padding: '20px 20px 0' }}>
        <SectionHeader title="Promotions & Deals 🎉" />
        <div className="hide-scrollbar" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
          {mockPromotions.map((promo) => (
            <motion.div key={promo.id} whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('promoDetail', promo)}
              style={{
                minWidth: '220px', borderRadius: '18px', padding: '18px 16px',
                background: promo.gradient, cursor: 'pointer', flexShrink: 0,
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)', position: 'relative', overflow: 'hidden',
              }}>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '3rem', opacity: 0.15 }}>{promo.emoji}</div>
              <span style={{ fontSize: '1.5rem', marginBottom: '8px', display: 'block' }}>{promo.emoji}</span>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>{promo.title}</h4>
              <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.8)', marginBottom: '10px', lineHeight: 1.4 }}>{promo.subtitle}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: '6px',
                  background: 'rgba(255,255,255,0.25)', color: 'white',
                }}>{promo.discount}</span>
                <span style={{ fontSize: '0.5625rem', color: 'rgba(255,255,255,0.7)' }}>{promo.validTime}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pricing Tiers Info */}
      <div style={{ padding: '20px 20px 0' }}>
        <SectionHeader title="Token Pricing 🪙" />
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['off-peak', 'standard', 'prime'] as const).map((tier) => {
            const info = pricingTierInfo[tier];
            return (
              <GlassCard key={tier} style={{ flex: 1, padding: '12px 10px', textAlign: 'center', background: 'white' }}>
                <span style={{ fontSize: '1.25rem', display: 'block', marginBottom: '4px' }}>{info.label.split(' ')[0]}</span>
                <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: info.color, marginBottom: '2px' }}>
                  {info.label.split(' ').slice(1).join(' ')}
                </p>
                <p style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>{info.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: '24px 20px 0' }}>
        <SectionHeader title="Categories" action="See all" onAction={() => onNavigate('explore')} />
        <div
          className="hide-scrollbar"
          style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}
        >
          {/* All filter */}
          <motion.div
            whileTap={{ scale: 0.93 }}
            onClick={() => setActiveCategory(null)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: '6px', minWidth: '56px', cursor: 'pointer',
            }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: '14px',
              background: !activeCategory ? 'var(--color-coral)' : 'white',
              border: `1px solid ${!activeCategory ? 'var(--color-coral)' : 'var(--color-warm-beige)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem', boxShadow: !activeCategory ? '0 4px 12px rgba(255,107,74,0.25)' : 'var(--shadow-sm)',
              color: !activeCategory ? 'white' : 'var(--text-primary)',
              fontWeight: 700, transition: 'all 200ms ease',
            }}>
              All
            </div>
            <span style={{ fontSize: '0.625rem', fontWeight: !activeCategory ? 700 : 500, color: !activeCategory ? 'var(--color-coral)' : 'var(--text-secondary)' }}>All</span>
          </motion.div>
          {Object.entries(categoryConfig).map(([key, cat]) => {
            const isActive = activeCategory === key;
            return (
              <motion.div
                key={key}
                whileTap={{ scale: 0.93 }}
                onClick={() => setActiveCategory(isActive ? null : key)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: '6px', minWidth: '56px', cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: '14px',
                  background: isActive ? cat.color : 'white',
                  border: `1px solid ${isActive ? cat.color : 'var(--color-warm-beige)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem', boxShadow: isActive ? `0 4px 12px ${cat.color}40` : 'var(--shadow-sm)',
                  transition: 'all 200ms ease',
                }}>
                  {cat.emoji}
                </div>
                <span style={{ fontSize: '0.625rem', fontWeight: isActive ? 700 : 500, color: isActive ? cat.color : 'var(--text-secondary)' }}>{cat.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Token Balance Card */}
      <div style={{ padding: '24px 20px 0' }}>
        <GlassCard
          strong
          onClick={() => onNavigate('myplan')}
          style={{
            padding: '18px 20px',
            background: 'linear-gradient(135deg, #fff8f0 0%, #fff0ed 100%)',
            border: '1px solid rgba(255,107,74,0.12)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>
                Your Plan · {plan.name}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <div>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Tokens / month</span>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-coral)' }}>{tokens.total}</p>
                </div>
                <div style={{ width: '1px', height: '32px', background: 'var(--color-warm-beige)', margin: '0 8px' }} />
                <div>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Tokens left</span>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{tokens.remaining}</p>
                </div>
              </div>
            </div>
            <div style={{ position: 'relative', width: 56, height: 56 }}>
              <svg width={56} height={56} style={{ transform: 'rotate(-90deg)' }}>
                <circle cx={28} cy={28} r={23} stroke="var(--color-warm-beige)" strokeWidth={4} fill="none" />
                <circle cx={28} cy={28} r={23} stroke="var(--color-coral)" strokeWidth={4} fill="none"
                  strokeDasharray={2 * Math.PI * 23} strokeDashoffset={2 * Math.PI * 23 * (1 - tokens.remaining / tokens.total)}
                  strokeLinecap="round" style={{ transition: 'stroke-dashoffset 600ms ease' }}
                />
              </svg>
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-coral)', fontWeight: 600, marginTop: '10px', cursor: 'pointer' }}>
            View Details →
          </p>
        </GlassCard>
      </div>

      {/* Recommended For You */}
      <div style={{ padding: '24px 20px 0' }}>
        <SectionHeader title="Recommended for you" action="See all" onAction={() => onNavigate('explore')} />
        <div
          className="hide-scrollbar"
          style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}
        >
          {filteredClasses.slice(0, 6).map((cls) => (
            <motion.div
              key={cls.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onClassSelect(cls)}
              style={{
                minWidth: '170px', borderRadius: '16px', overflow: 'hidden',
                background: 'white', border: '1px solid var(--color-warm-beige)',
                cursor: 'pointer', flexShrink: 0, boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ position: 'relative' }}>
                <img src={cls.image} alt={cls.name} style={{ width: '100%', height: 110, objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
                  <TokenBadge count={cls.tokenCost} originalCount={cls.originalTokenCost} size="sm" />
                </div>
              </div>
              <div style={{ padding: '10px 12px' }}>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '3px' }}>{cls.name}</h4>
                <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{cls.instructor}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.625rem', color: 'var(--text-muted)' }}>
                  <Clock size={10} /> {cls.time} · {cls.duration}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Nearby Studios */}
      <div style={{ padding: '24px 20px 0' }}>
        <SectionHeader title="Nearby Studios" action="See all" onAction={() => onNavigate('explore')} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {mockVenues.slice(0, 3).map((venue) => (
            <GlassCard key={venue.id} onClick={() => onVenueSelect(venue)} style={{ display: 'flex', gap: '14px', padding: '12px', background: 'white' }}>
              <img src={venue.image} alt={venue.name} style={{ width: 64, height: 64, borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{venue.name}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{venue.address}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Star size={11} color="var(--color-warm-yellow)" fill="var(--color-warm-yellow)" /> {venue.rating} ({venue.reviewCount})
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <MapPin size={11} /> {venue.distance}
                  </span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Wellness & Recovery */}
      <div style={{ padding: '24px 20px 0' }}>
        <SectionHeader title="Wellness & Recovery 🧘" action="See all" onAction={() => onNavigate('explore')} />
        <div className="hide-scrollbar" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
          {mockClasses.filter((c) => ['icebath','sauna','spa','sound','meditation','yoga'].includes(c.category)).slice(0, 5).map((cls) => (
            <motion.div key={cls.id} whileTap={{ scale: 0.97 }} onClick={() => onClassSelect(cls)}
              style={{ minWidth: '170px', borderRadius: '16px', overflow: 'hidden', background: 'white', border: '1px solid var(--color-warm-beige)', cursor: 'pointer', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ position: 'relative' }}>
                <img src={cls.image} alt={cls.name} style={{ width: '100%', height: 110, objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '8px', right: '8px' }}><TokenBadge count={cls.tokenCost} originalCount={cls.originalTokenCost} size="sm" /></div>
              </div>
              <div style={{ padding: '10px 12px' }}>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 600, marginBottom: '3px' }}>{cls.name}</h4>
                <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{cls.venue.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.625rem', color: 'var(--text-muted)' }}>
                  <Clock size={10} /> {cls.time} · {cls.duration}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Today's Schedule */}
      <div style={{ padding: '24px 20px 0' }}>
        <SectionHeader title="Today's Schedule 📅" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {mockClasses.filter((c) => c.date === 'Today').slice(0, 4).map((cls) => (
            <GlassCard key={cls.id} onClick={() => onClassSelect(cls)} style={{ display: 'flex', gap: '12px', padding: '12px', background: 'white' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'var(--color-sand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
                {categoryConfig[cls.category]?.emoji || '🏋️'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{cls.name}</h4>
                <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{cls.time} · {cls.venue.name}</p>
              </div>
              <TokenBadge count={cls.tokenCost} originalCount={cls.originalTokenCost} size="sm" />
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
