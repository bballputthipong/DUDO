// ========================================
// Dudo — App Shell (Mobile Frame, Light)
// ========================================

import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '430px',
        minHeight: '100dvh',
        position: 'relative',
        background: 'var(--color-cream)',
        overflow: 'hidden',
        boxShadow: '0 0 60px rgba(0,0,0,0.08)',
      }}
    >
      <div
        style={{
          height: '100dvh',
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingBottom: '80px',
          WebkitOverflowScrolling: 'touch',
        }}
        className="hide-scrollbar"
      >
        {children}
      </div>
    </div>
  );
}
