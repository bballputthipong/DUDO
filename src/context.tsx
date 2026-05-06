// ========================================
// Dudo — App Context (State Management)
// ========================================

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, Plan, TokenBalance, Booking, FitnessClass, SocialPost } from './types';
import { mockUser, mockPlan, mockTokenBalance, mockBookings, mockSocialPosts } from './data';

interface AppState {
  user: User;
  plan: Plan;
  tokens: TokenBalance;
  bookings: Booking[];
  socialPosts: SocialPost[];
  hasOnboarded: boolean;
}

interface AppContextType extends AppState {
  bookClass: (fc: FitnessClass) => boolean;
  cancelBooking: (bookingId: string) => void;
  toggleLike: (postId: string) => void;
  completeOnboarding: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    user: mockUser,
    plan: mockPlan,
    tokens: mockTokenBalance,
    bookings: mockBookings,
    socialPosts: mockSocialPosts,
    hasOnboarded: false,
  });

  const bookClass = useCallback((fc: FitnessClass): boolean => {
    if (state.tokens.remaining < fc.tokenCost) return false;

    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        used: prev.tokens.used + fc.tokenCost,
        remaining: prev.tokens.remaining - fc.tokenCost,
      },
      bookings: [
        {
          id: `b-${Date.now()}`,
          fitnessClass: fc,
          status: 'upcoming' as const,
          bookedAt: new Date().toISOString(),
          qrCode: `DUDO-${Date.now()}-QR`,
        },
        ...prev.bookings,
      ],
    }));
    return true;
  }, [state.tokens.remaining]);

  const cancelBooking = useCallback((bookingId: string) => {
    setState((prev) => {
      const booking = prev.bookings.find((b) => b.id === bookingId);
      if (!booking || booking.status !== 'upcoming') return prev;

      return {
        ...prev,
        tokens: {
          ...prev.tokens,
          used: prev.tokens.used - booking.fitnessClass.tokenCost,
          remaining: prev.tokens.remaining + booking.fitnessClass.tokenCost,
        },
        bookings: prev.bookings.map((b) =>
          b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
        ),
      };
    });
  }, []);

  const toggleLike = useCallback((postId: string) => {
    setState((prev) => ({
      ...prev,
      socialPosts: prev.socialPosts.map((p) =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      ),
    }));
  }, []);

  const completeOnboarding = useCallback(() => {
    setState((prev) => ({ ...prev, hasOnboarded: true }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        bookClass,
        cancelBooking,
        toggleLike,
        completeOnboarding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
