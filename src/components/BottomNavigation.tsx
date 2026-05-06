// ========================================
// Dudo — Bottom Navigation (Warm Light)
// ========================================

import { motion } from 'framer-motion';
import { Home, Compass, CalendarCheck, Users, User } from 'lucide-react';
import type { TabRoute } from '../types';

const tabs: { key: TabRoute; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'explore', label: 'Explore', icon: Compass },
  { key: 'bookings', label: 'Bookings', icon: CalendarCheck },
  { key: 'social', label: 'Community', icon: Users },
  { key: 'profile', label: 'Profile', icon: User },
];

interface BottomNavProps {
  active: TabRoute;
  onChange: (tab: TabRoute) => void;
}

export function BottomNavigation({ active, onChange }: BottomNavProps) {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '430px',
        background: 'rgba(255, 255, 255, 0.82)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '6px 0 calc(6px + env(safe-area-inset-bottom))',
        zIndex: 100,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.04)',
      }}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        const Icon = tab.icon;
        return (
          <motion.button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            whileTap={{ scale: 0.88 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              padding: '6px 14px',
              background: 'none',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            {isActive && (
              <motion.div
                layoutId="nav-dot"
                style={{
                  position: 'absolute',
                  top: '-6px',
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: 'var(--color-coral)',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <Icon
              size={22}
              strokeWidth={isActive ? 2.5 : 1.8}
              color={isActive ? 'var(--color-coral)' : 'var(--text-muted)'}
              style={{ transition: 'color 200ms ease' }}
            />
            <span
              style={{
                fontSize: '0.5625rem',
                fontWeight: isActive ? 700 : 400,
                color: isActive ? 'var(--color-coral)' : 'var(--text-muted)',
                transition: 'color 200ms ease',
                letterSpacing: '0.02em',
              }}
            >
              {tab.label}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
}
