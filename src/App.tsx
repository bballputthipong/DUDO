// ========================================
// Dudo — Main App (Warm Light Theme)
// ========================================

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider, useApp } from './context';
import { AppShell } from './components/AppShell';
import { BottomNavigation } from './components/BottomNavigation';
import { OnboardingScreen } from './screens/Onboarding';
import { HomeScreen } from './screens/Home';
import { ExploreScreen } from './screens/Explore';
import { BookingsScreen } from './screens/Bookings';
import { SocialScreen } from './screens/Social';
import { ProfileScreen } from './screens/Profile';
import { ClassDetailScreen } from './screens/ClassDetail';
import { VenueDetailScreen } from './screens/VenueDetail';
import { BookingReviewScreen } from './screens/BookingReview';
import { MyPlanScreen } from './screens/MyPlan';
import { PerformanceScreen } from './screens/Performance';
import { PromotionDetailScreen } from './screens/PromotionDetail';
import type { TabRoute, FitnessClass, Venue } from './types';
import type { Promotion } from './data';

type SubScreen =
  | { type: 'classDetail'; data: FitnessClass }
  | { type: 'venueDetail'; data: Venue }
  | { type: 'bookingReview'; data: FitnessClass }
  | { type: 'myplan' }
  | { type: 'performance' }
  | { type: 'promoDetail'; data: Promotion }
  | null;

function AppContent() {
  const { hasOnboarded } = useApp();
  const [activeTab, setActiveTab] = useState<TabRoute>('home');
  const [subScreen, setSubScreen] = useState<SubScreen>(null);

  if (!hasOnboarded) {
    return <OnboardingScreen />;
  }

  // Sub-screen rendering
  if (subScreen) {
    return (
      <AppShell>
        <AnimatePresence mode="wait">
          <motion.div
            key={subScreen.type}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.22 }}
          >
            {subScreen.type === 'classDetail' && (
              <ClassDetailScreen
                fitnessClass={subScreen.data}
                onBack={() => setSubScreen(null)}
                onBook={(fc) => setSubScreen({ type: 'bookingReview', data: fc })}
              />
            )}
            {subScreen.type === 'venueDetail' && (
              <VenueDetailScreen
                venue={subScreen.data}
                onBack={() => setSubScreen(null)}
                onClassSelect={(c) => setSubScreen({ type: 'classDetail', data: c })}
              />
            )}
            {subScreen.type === 'bookingReview' && (
              <BookingReviewScreen
                fitnessClass={subScreen.data}
                onBack={() => setSubScreen({ type: 'classDetail', data: subScreen.data })}
                onComplete={() => {
                  setSubScreen(null);
                  setActiveTab('bookings');
                }}
              />
            )}
            {subScreen.type === 'myplan' && (
              <MyPlanScreen onBack={() => setSubScreen(null)} />
            )}
            {subScreen.type === 'performance' && (
              <PerformanceScreen onBack={() => setSubScreen(null)} />
            )}
            {subScreen.type === 'promoDetail' && (
              <PromotionDetailScreen
                promotion={subScreen.data}
                onBack={() => setSubScreen(null)}
                onClassSelect={(c) => setSubScreen({ type: 'classDetail', data: c })}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </AppShell>
    );
  }

  // Navigation handlers
  const handleClassSelect = (c: FitnessClass) => setSubScreen({ type: 'classDetail', data: c });
  const handleVenueSelect = (v: Venue) => setSubScreen({ type: 'venueDetail', data: v });
  const handleNavigate = (screen: string, data?: unknown) => {
    if (screen === 'explore') { setActiveTab('explore'); return; }
    if (screen === 'myplan') setSubScreen({ type: 'myplan' });
    if (screen === 'performance') setSubScreen({ type: 'performance' });
    if (screen === 'promoDetail' && data) setSubScreen({ type: 'promoDetail', data: data as Promotion });
  };

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
        >
          {activeTab === 'home' && (
            <HomeScreen
              onClassSelect={handleClassSelect}
              onVenueSelect={handleVenueSelect}
              onNavigate={handleNavigate}
            />
          )}
          {activeTab === 'explore' && (
            <ExploreScreen onClassSelect={handleClassSelect} onVenueSelect={handleVenueSelect} />
          )}
          {activeTab === 'bookings' && <BookingsScreen />}
          {activeTab === 'social' && <SocialScreen />}
          {activeTab === 'profile' && <ProfileScreen onNavigate={handleNavigate} />}
        </motion.div>
      </AnimatePresence>
      <BottomNavigation active={activeTab} onChange={setActiveTab} />
    </AppShell>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
