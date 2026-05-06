// ========================================
// Dudo — Profile Screen (Warm Light)
// ========================================

import { motion } from 'framer-motion';
import { ChevronRight, CreditCard, BarChart3, Settings, HelpCircle, LogOut, Crown, Flame, Trophy } from 'lucide-react';
import { useApp } from '../context';
import { Avatar, GlassCard, ProgressRing } from '../components/ui';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const { user, plan, tokens, bookings } = useApp();
  const completedCount = bookings.filter((b) => b.status === 'completed').length;
  const upcomingCount = bookings.filter((b) => b.status === 'upcoming').length;

  const menuItems = [
    { icon: CreditCard, label: 'My Plan', sublabel: plan.name, screen: 'myplan' },
    { icon: BarChart3, label: 'Performance', sublabel: `${completedCount} classes`, screen: 'performance' },
    { icon: Settings, label: 'Settings', sublabel: '', screen: '' },
    { icon: HelpCircle, label: 'Help & Support', sublabel: '', screen: '' },
  ];

  const stats = [
    { icon: Flame, label: 'Streak', value: '12 days', color: 'var(--color-coral)' },
    { icon: Trophy, label: 'Classes', value: `${completedCount}`, color: 'var(--color-warm-yellow)' },
    { icon: Crown, label: 'Level', value: 'Gold', color: 'var(--color-lime-dark)' },
  ];

  return (
    <div style={{ paddingBottom: '24px' }}>
      {/* Header */}
      <div style={{
        padding: '48px 20px 24px', textAlign: 'center',
        background: 'linear-gradient(180deg, var(--color-cream) 0%, white 100%)',
      }}>
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '14px' }}>
          <Avatar src={user.avatar} size={80} ring />
          <div style={{
            position: 'absolute', bottom: -2, right: -2,
            background: 'var(--color-lime)', borderRadius: '50%',
            width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', border: '2px solid white',
          }}>👑</div>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>{user.name}</h1>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '10px' }}>{user.email}</p>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '6px 16px', borderRadius: '9999px',
          background: 'var(--color-coral-light)', border: '1px solid rgba(255,107,74,0.15)',
          fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-coral)',
        }}>
          <Crown size={14} /> {plan.name} Member
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        {/* Stats */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <GlassCard key={stat.label} style={{
                flex: 1, padding: '14px', textAlign: 'center', background: 'white',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
              }}>
                <Icon size={20} color={stat.color} />
                <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stat.value}</p>
                <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{stat.label}</p>
              </GlassCard>
            );
          })}
        </div>

        {/* Token Summary */}
        <GlassCard style={{ padding: '18px', marginBottom: '18px', background: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <ProgressRing progress={(tokens.remaining / tokens.total) * 100} size={56} strokeWidth={5} trackColor="var(--color-sand)" />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Tokens Remaining</p>
              <p style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {tokens.remaining} <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ {tokens.total}</span>
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Upcoming</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-coral)' }}>{upcomingCount}</p>
            </div>
          </div>
        </GlassCard>

        {/* Menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button key={item.label} whileTap={{ scale: 0.98 }}
                onClick={() => item.screen && onNavigate(item.screen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '14px 16px', borderRadius: '14px', cursor: 'pointer',
                  width: '100%', textAlign: 'left', background: 'transparent',
                }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '12px', background: 'var(--color-sand)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={20} color="var(--text-primary)" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--text-primary)' }}>{item.label}</p>
                  {item.sublabel && <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{item.sublabel}</p>}
                </div>
                <ChevronRight size={18} color="var(--text-muted)" />
              </motion.button>
            );
          })}

          <motion.button whileTap={{ scale: 0.98 }} style={{
            display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px',
            borderRadius: '14px', cursor: 'pointer', width: '100%', textAlign: 'left', marginTop: '8px',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '12px', background: 'var(--color-coral-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <LogOut size={20} color="var(--color-coral)" />
            </div>
            <p style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--color-coral)' }}>Log out</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
