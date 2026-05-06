// ========================================
// Dudo — Onboarding (Warm Light Theme)
// ========================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Dumbbell, Heart, Zap } from 'lucide-react';
import { Button } from '../components/ui';
import { useApp } from '../context';

const interests = [
  { id: 'gym', label: 'Gym & Weights', emoji: '🏋️' },
  { id: 'yoga', label: 'Yoga', emoji: '🧘' },
  { id: 'boxing', label: 'Muay Thai / Boxing', emoji: '🥊' },
  { id: 'pilates', label: 'Pilates', emoji: '🤸' },
  { id: 'dance', label: 'Dance', emoji: '💃' },
  { id: 'swimming', label: 'Swimming', emoji: '🏊' },
  { id: 'cycling', label: 'Cycling', emoji: '🚴' },
  { id: 'climbing', label: 'Climbing', emoji: '🧗' },
  { id: 'badminton', label: 'Badminton', emoji: '🏸' },
  { id: 'recovery', label: 'Ice Bath / Sauna', emoji: '🧊' },
  { id: 'spa', label: 'Wellness Spa', emoji: '💆' },
  { id: 'running', label: 'Running Club', emoji: '🏃' },
];

const goals = [
  { id: 'lose', label: 'Lose weight', icon: Zap },
  { id: 'build', label: 'Build muscle', icon: Dumbbell },
  { id: 'flex', label: 'Be more flexible', icon: Heart },
  { id: 'stress', label: 'Reduce stress', icon: Sparkles },
];

export function OnboardingScreen() {
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleInterest = (id: string) =>
    setSelectedInterests((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  const toggleGoal = (id: string) =>
    setSelectedGoals((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  const slides = [
    // ===== Splash =====
    <motion.div
      key="splash"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100dvh',
        textAlign: 'center',
        padding: '32px',
        background: 'var(--color-cream)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blobs */}
      <div className="animate-blob" style={{ position: 'absolute', top: '-60px', right: '-40px', width: '200px', height: '200px', background: 'rgba(255,107,74,0.12)', filter: 'blur(40px)' }} />
      <div className="animate-blob" style={{ position: 'absolute', bottom: '100px', left: '-60px', width: '180px', height: '180px', background: 'rgba(200,239,77,0.15)', filter: 'blur(40px)', animationDelay: '-4s' }} />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        style={{ fontSize: '3.5rem', marginBottom: '20px' }}
      >
        🔥
      </motion.div>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: '4px' }}>
        dudo
      </h1>
      <p style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--color-coral)', marginBottom: '8px' }}>
        Move. Recharge. Connect.
      </p>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', maxWidth: '260px', lineHeight: 1.5, marginBottom: '48px' }}>
        One membership.<br />Unlimited ways to move and feel good.
      </p>
      <Button variant="primary" size="lg" onClick={() => setStep(1)} fullWidth>
        Get Started
      </Button>
      <p style={{ marginTop: '16px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
        Already have an account? <span style={{ color: 'var(--color-coral)', fontWeight: 600, cursor: 'pointer' }}>Log in</span>
      </p>
    </motion.div>,

    // ===== Interests =====
    <motion.div
      key="interests"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.35 }}
      style={{ padding: '56px 24px 32px', minHeight: '100dvh', background: 'var(--color-cream)' }}
    >
      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Step 1 of 2</span>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '8px', marginBottom: '6px', color: 'var(--text-primary)' }}>What do you love?</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '0.9375rem' }}>Pick activities that excite you</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
        {interests.map((item) => {
          const active = selectedInterests.includes(item.id);
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleInterest(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 18px',
                borderRadius: '14px',
                fontSize: '0.875rem',
                fontWeight: 500,
                background: active ? 'var(--color-coral-light)' : 'white',
                color: active ? 'var(--color-coral)' : 'var(--text-primary)',
                border: `1.5px solid ${active ? 'var(--color-coral)' : 'var(--color-warm-beige)'}`,
                cursor: 'pointer',
                transition: 'all 200ms ease',
                boxShadow: active ? '0 2px 8px rgba(255,107,74,0.15)' : 'none',
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{item.emoji}</span>
              {item.label}
            </motion.button>
          );
        })}
      </div>
      <Button variant="primary" size="lg" fullWidth onClick={() => setStep(2)} style={{ opacity: selectedInterests.length > 0 ? 1 : 0.4 }}>
        Continue
      </Button>
    </motion.div>,

    // ===== Goals =====
    <motion.div
      key="goals"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.35 }}
      style={{ padding: '56px 24px 32px', minHeight: '100dvh', background: 'var(--color-cream)' }}
    >
      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Step 2 of 2</span>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '8px', marginBottom: '6px', color: 'var(--text-primary)' }}>What's your goal?</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '0.9375rem' }}>We'll personalize your experience</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
        {goals.map((g) => {
          const active = selectedGoals.includes(g.id);
          const Icon = g.icon;
          return (
            <motion.button
              key={g.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggleGoal(g.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '18px 20px',
                borderRadius: '16px',
                background: active ? 'var(--color-coral-light)' : 'white',
                border: `1.5px solid ${active ? 'var(--color-coral)' : 'var(--color-warm-beige)'}`,
                cursor: 'pointer',
                transition: 'all 200ms ease',
                textAlign: 'left',
                boxShadow: active ? '0 2px 8px rgba(255,107,74,0.12)' : 'var(--shadow-sm)',
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: '12px',
                background: active ? 'var(--color-coral)' : 'var(--color-sand)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 200ms ease',
              }}>
                <Icon size={22} color={active ? 'white' : 'var(--text-secondary)'} />
              </div>
              <span style={{ fontSize: '1rem', fontWeight: 500, color: active ? 'var(--color-coral)' : 'var(--text-primary)' }}>
                {g.label}
              </span>
            </motion.button>
          );
        })}
      </div>
      <Button variant="primary" size="lg" fullWidth onClick={completeOnboarding}>
        Let's Go! 🚀
      </Button>
    </motion.div>,
  ];

  return (
    <div style={{ width: '100%', maxWidth: '430px', margin: '0 auto', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">{slides[step]}</AnimatePresence>
    </div>
  );
}
