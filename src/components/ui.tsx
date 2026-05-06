// ========================================
// Dudo — UI Components (Warm Light Theme)
// ========================================

import { type ReactNode, type CSSProperties } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

// ==================== Button ====================
interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  style,
  ...props
}: ButtonProps) {
  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: '9999px',
    fontWeight: 600,
    transition: 'all 250ms ease',
    width: fullWidth ? '100%' : undefined,
    cursor: 'pointer',
  };

  const variants: Record<string, CSSProperties> = {
    primary: {
      background: 'var(--color-coral)',
      color: 'white',
      boxShadow: '0 4px 16px rgba(255, 107, 74, 0.3)',
    },
    secondary: {
      background: 'var(--color-lime)',
      color: 'var(--text-primary)',
      boxShadow: '0 4px 16px rgba(200, 239, 77, 0.25)',
    },
    ghost: {
      background: 'var(--color-sand)',
      color: 'var(--text-primary)',
      border: '1px solid var(--color-warm-beige)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-coral)',
      border: '2px solid var(--color-coral)',
    },
  };

  const sizes: Record<string, CSSProperties> = {
    sm: { padding: '8px 18px', fontSize: '0.8125rem' },
    md: { padding: '12px 28px', fontSize: '0.9375rem' },
    lg: { padding: '16px 36px', fontSize: '1rem' },
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      style={{ ...baseStyle, ...variants[variant], ...sizes[size], ...style }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// ==================== GlassCard ====================
interface GlassCardProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
  strong?: boolean;
}

export function GlassCard({ children, style, className, onClick, strong }: GlassCardProps) {
  return (
    <motion.div
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={className}
      style={{
        background: strong ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.6)',
        borderRadius: '16px',
        padding: '16px',
        boxShadow: 'var(--shadow-md)',
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

// ==================== Chip ====================
interface ChipProps {
  label: string;
  emoji?: string;
  active?: boolean;
  onClick?: () => void;
  color?: string;
}

export function Chip({ label, emoji, active, onClick, color }: ChipProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        borderRadius: '9999px',
        fontSize: '0.8125rem',
        fontWeight: 500,
        background: active
          ? color || 'var(--color-coral)'
          : 'white',
        color: active ? (color === '#c8ef4d' || color === '#ffd96a' ? 'var(--text-primary)' : 'white') : 'var(--text-secondary)',
        border: `1px solid ${active ? 'transparent' : 'var(--color-warm-beige)'}`,
        cursor: 'pointer',
        transition: 'all 200ms ease',
        whiteSpace: 'nowrap',
        boxShadow: active ? 'var(--shadow-sm)' : 'none',
      }}
    >
      {emoji && <span>{emoji}</span>}
      {label}
    </motion.button>
  );
}

// ==================== TokenBadge ====================
interface TokenBadgeProps {
  count: number;
  originalCount?: number;
  size?: 'sm' | 'md';
}

export function TokenBadge({ count, originalCount, size = 'md' }: TokenBadgeProps) {
  const isSmall = size === 'sm';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {originalCount && (
        <span style={{
          fontSize: isSmall ? '0.6875rem' : '0.75rem',
          color: 'var(--text-muted)',
          textDecoration: 'line-through',
          fontWeight: 600,
        }}>
          {originalCount}
        </span>
      )}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          background: 'var(--color-coral-light)',
          color: 'var(--color-coral)',
          padding: isSmall ? '2px 8px' : '4px 12px',
          borderRadius: '9999px',
          fontSize: isSmall ? '0.75rem' : '0.8125rem',
          fontWeight: 700,
          border: '1px solid rgba(255,107,74,0.15)',
        }}
      >
        🪙 {count}
      </span>
    </div>
  );
}

// ==================== Avatar ====================
interface AvatarProps {
  src: string;
  size?: number;
  ring?: boolean;
}

export function Avatar({ src, size = 40, ring }: AvatarProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        border: ring ? '2.5px solid var(--color-coral)' : '2px solid white',
        flexShrink: 0,
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <img
        src={src}
        alt="avatar"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}

// ==================== SectionHeader ====================
interface SectionHeaderProps {
  title: string;
  action?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, action, onAction }: SectionHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '14px',
      }}
    >
      <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h2>
      {action && (
        <button
          onClick={onAction}
          style={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--color-coral)',
            cursor: 'pointer',
          }}
        >
          {action}
        </button>
      )}
    </div>
  );
}

// ==================== DifficultyBadge ====================
export function DifficultyBadge({ level }: { level: string }) {
  const colorMap: Record<string, { bg: string; fg: string }> = {
    beginner: { bg: '#f4fce0', fg: '#6b8e23' },
    intermediate: { bg: '#fff5e0', fg: '#cc7a00' },
    advanced: { bg: '#fff0ed', fg: '#cc3d20' },
  };
  const c = colorMap[level] || { bg: '#f0f0f0', fg: '#666' };
  return (
    <span
      style={{
        fontSize: '0.6875rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: c.fg,
        background: c.bg,
        padding: '3px 8px',
        borderRadius: '6px',
      }}
    >
      {level}
    </span>
  );
}

// ==================== ProgressRing ====================
export function ProgressRing({
  progress,
  size = 80,
  strokeWidth = 6,
  color = 'var(--color-coral)',
  trackColor = 'var(--color-sand)',
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={trackColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 600ms ease' }}
      />
    </svg>
  );
}
