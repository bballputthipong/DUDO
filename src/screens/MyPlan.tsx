// ========================================
// Dudo — My Plan / Subscription (Warm Light)
// ========================================

import { motion } from 'framer-motion';
import { ArrowLeft, Check, Crown, Zap, Gift, ArrowRight } from 'lucide-react';
import { useApp } from '../context';
import { allPlans, howItWorks } from '../data';
import { Button, GlassCard, ProgressRing } from '../components/ui';

interface MyPlanProps {
  onBack: () => void;
}

export function MyPlanScreen({ onBack }: MyPlanProps) {
  const { plan, tokens } = useApp();

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--color-cream)' }}>
      <div style={{ padding: '48px 20px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} style={{
          width: 40, height: 40, borderRadius: '12px', background: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          border: '1px solid var(--color-warm-beige)',
        }}>
          <ArrowLeft size={20} color="var(--text-primary)" />
        </motion.button>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>My Plan</h1>
      </div>

      <div style={{ padding: '0 20px 32px' }}>
        {/* Current Plan Hero */}
        <div style={{
          borderRadius: '20px', padding: '22px', marginBottom: '20px',
          background: 'linear-gradient(135deg, var(--color-coral-light) 0%, #fff5e0 100%)',
          border: '1px solid rgba(255,107,74,0.12)', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-25px', right: '-15px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,107,74,0.08)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Crown size={18} color="var(--color-coral)" />
            <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-coral)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Current Plan</span>
          </div>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2px' }}>{plan.name}</h2>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-coral)', marginBottom: '4px' }}>
            ฿{plan.price.toLocaleString()}<span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 400 }}> / month</span>
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '14px' }}>Renews on 1 Jun 2026</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <ProgressRing progress={(tokens.remaining / tokens.total) * 100} size={52} strokeWidth={5} trackColor="rgba(255,107,74,0.12)" />
            <div>
              <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-coral)' }}>
                {tokens.remaining} <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ {tokens.total}</span>
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tokens left</p>
            </div>
          </div>
        </div>

        {/* Plan Benefits */}
        <GlassCard style={{ padding: '18px', marginBottom: '20px', background: 'white' }}>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>Plan Benefits</h3>
          {plan.features.map((feature, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: i < plan.features.length - 1 ? '10px' : 0 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--color-lime-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Check size={11} color="var(--color-lime-dark)" />
              </div>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{feature}</span>
            </div>
          ))}
        </GlassCard>

        {/* Token Usage */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {[
            { label: 'Used', value: tokens.used, icon: Zap, color: 'var(--color-coral)' },
            { label: 'Remaining', value: tokens.remaining, icon: Gift, color: 'var(--color-lime-dark)' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <GlassCard key={item.label} style={{ flex: 1, padding: '14px', textAlign: 'center', background: 'white' }}>
                <Icon size={18} color={item.color} style={{ marginBottom: '6px' }} />
                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.value}</p>
                <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{item.label}</p>
              </GlassCard>
            );
          })}
        </div>

        {/* Need more tokens? */}
        <GlassCard style={{ padding: '14px 16px', marginBottom: '24px', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Need more tokens?</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Buy Extra Tokens</p>
          </div>
          <ArrowRight size={18} color="var(--color-coral)" />
        </GlassCard>

        {/* How It Works */}
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>How It Works</h3>
        <GlassCard style={{ padding: '18px', marginBottom: '24px', background: 'white' }}>
          {howItWorks.map((step, i) => (
            <div key={step.step} style={{ display: 'flex', gap: '14px', marginBottom: i < howItWorks.length - 1 ? '18px' : 0 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', background: 'var(--color-lime)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.8125rem', color: 'var(--text-primary)', flexShrink: 0,
              }}>{step.step}</div>
              <div>
                <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>{step.title}</p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </GlassCard>

        {/* All Plans */}
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>Choose Your Plan</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
          {allPlans.map((p) => {
            const isCurrent = p.name === plan.name;
            const isPopular = p.name === 'Active Plus';
            return (
              <GlassCard key={p.name} style={{
                padding: '16px 18px', background: 'white', position: 'relative',
                border: isCurrent ? '2px solid var(--color-coral)' : undefined,
              }}>
                {isPopular && (
                  <span style={{
                    position: 'absolute', top: '-9px', right: '16px',
                    background: 'var(--color-coral)', color: 'white',
                    fontSize: '0.5625rem', fontWeight: 700, padding: '2px 10px', borderRadius: '9999px',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>Most Popular</span>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>{p.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {p.monthlyTokens} tokens / month
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>฿{p.price.toLocaleString()}</p>
                    <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>/ month</p>
                  </div>
                </div>
                {isCurrent ? (
                  <p style={{ marginTop: '10px', textAlign: 'center', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-coral)' }}>✓ Current Plan</p>
                ) : (
                  <Button variant="ghost" size="sm" fullWidth style={{ marginTop: '10px' }}>Switch Plan</Button>
                )}
              </GlassCard>
            );
          })}
        </div>
        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cancel anytime. No long-term contract.</p>
      </div>
    </div>
  );
}
