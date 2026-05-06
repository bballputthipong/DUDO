// ========================================
// Dudo — Performance Screen (Warm Light)
// ========================================

import { motion } from 'framer-motion';
import { ArrowLeft, Flame, Trophy, TrendingUp, Calendar } from 'lucide-react';
import { GlassCard, ProgressRing } from '../components/ui';
import { useApp } from '../context';
import { categoryConfig } from '../data';

interface PerformanceProps {
  onBack: () => void;
}

export function PerformanceScreen({ onBack }: PerformanceProps) {
  const { tokens } = useApp();

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weekActivity = [1, 0, 1, 1, 0, 2, 0];
  const maxActivity = Math.max(...weekActivity, 1);

  const categoryBreakdown = [
    { category: 'boxing', count: 4 },
    { category: 'yoga', count: 3 },
    { category: 'cycling', count: 2 },
    { category: 'pilates', count: 1 },
    { category: 'dance', count: 1 },
  ];
  const totalClasses = categoryBreakdown.reduce((a, b) => a + b.count, 0);

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
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>Performance</h1>
      </div>

      <div style={{ padding: '0 20px 32px' }}>
        {/* Stats */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
          {[
            { icon: Flame, label: 'Streak', value: '12', unit: 'days', color: 'var(--color-coral)' },
            { icon: Trophy, label: 'Total', value: String(totalClasses), unit: 'classes', color: 'var(--color-warm-yellow)' },
            { icon: TrendingUp, label: 'This Week', value: String(weekActivity.reduce((a, b) => a + b, 0)), unit: 'classes', color: 'var(--color-lime-dark)' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <GlassCard key={stat.label} style={{ flex: 1, padding: '14px 10px', textAlign: 'center', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <Icon size={18} color={stat.color} />
                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stat.value}</p>
                <p style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{stat.unit}</p>
              </GlassCard>
            );
          })}
        </div>

        {/* Weekly Chart */}
        <GlassCard style={{ padding: '18px', marginBottom: '16px', background: 'white' }}>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={15} /> This Week
          </h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '6px', height: '100px', marginBottom: '8px' }}>
            {weekDays.map((day, i) => {
              const height = weekActivity[i] > 0 ? (weekActivity[i] / maxActivity) * 100 : 8;
              const isToday = i === 3;
              return (
                <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <motion.div
                    initial={{ height: 0 }} animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    style={{
                      width: '100%', maxWidth: '26px', borderRadius: '8px',
                      background: weekActivity[i] > 0 ? (isToday ? 'var(--color-coral)' : 'var(--color-lime)') : 'var(--color-sand)',
                      minHeight: '6px',
                    }}
                  />
                  <span style={{ fontSize: '0.625rem', fontWeight: isToday ? 700 : 400, color: isToday ? 'var(--color-coral)' : 'var(--text-muted)' }}>{day}</span>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Token Usage */}
        <GlassCard style={{ padding: '18px', marginBottom: '16px', background: 'white' }}>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>Token Usage</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <ProgressRing progress={(tokens.used / tokens.total) * 100} size={72} strokeWidth={6} trackColor="var(--color-sand)" />
            <div style={{ flex: 1 }}>
              {[
                { label: 'Used', value: tokens.used, color: 'var(--color-coral)' },
                { label: 'Remaining', value: tokens.remaining, color: 'var(--color-lime-dark)' },
                { label: 'Total', value: tokens.total },
              ].map((item, i) => (
                <div key={item.label} style={{
                  display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.8125rem',
                  ...(i === 2 ? { borderTop: '1px solid var(--color-sand)', paddingTop: '4px' } : {}),
                }}>
                  <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                  <span style={{ fontWeight: 600, color: item.color || 'var(--text-primary)' }}>🪙 {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Category Breakdown */}
        <GlassCard style={{ padding: '18px', background: 'white' }}>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>Activity Breakdown</h3>
          {categoryBreakdown.map((item, i) => {
            const cfg = categoryConfig[item.category];
            if (!cfg) return null;
            const percent = (item.count / totalClasses) * 100;
            return (
              <div key={item.category} style={{ marginBottom: i < categoryBreakdown.length - 1 ? '14px' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
                    <span style={{ fontSize: '1rem' }}>{cfg.emoji}</span> {cfg.label}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.count} classes</span>
                </div>
                <div style={{ height: '6px', borderRadius: '3px', background: 'var(--color-sand)', overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 0.5 }}
                    style={{ height: '100%', borderRadius: '3px', background: cfg.color }} />
                </div>
              </div>
            );
          })}
        </GlassCard>
      </div>
    </div>
  );
}
