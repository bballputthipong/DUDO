// ========================================
// Dudo — Expanded Mock Data
// ========================================
import type { User, Plan, TokenBalance, Venue, FitnessClass, Booking } from './types';

const img = (id: number, w = 400, h = 300) => `https://picsum.photos/id/${id}/${w}/${h}`;

export const mockUser: User = { id: 'u1', name: 'Mint', avatar: img(64, 200, 200), email: 'mint@dudo.co' };

export const mockPlan: Plan = {
  id: 'plan-active-plus', name: 'Active Plus', monthlyTokens: 50, price: 2000,
  features: ['50 tokens every month', 'Book all classes', 'Access all venues', 'Cancel up to 12 hrs before class', 'Rollover 10 tokens'],
};

export const allPlans: Plan[] = [
  { id: 'plan-starter', name: 'Starter', monthlyTokens: 25, price: 1200, features: ['25 tokens every month', 'Book all classes', 'Access all venues', 'Cancel up to 24 hrs before'] },
  mockPlan,
  { id: 'plan-premium', name: 'Premium', monthlyTokens: 100, price: 3500, features: ['100 tokens every month', 'All classes + Premium venues', 'Cancel up to 4 hrs before', 'Rollover 20 tokens', 'Bring a friend 2x/month'] },
];

export const mockTokenBalance: TokenBalance = { total: 50, used: 18, remaining: 32 };

export const howItWorks = [
  { step: 1, title: 'Subscribe', desc: 'Choose a plan that fits your lifestyle.' },
  { step: 2, title: 'Get Tokens', desc: 'Receive tokens every month.' },
  { step: 3, title: 'Book Anything', desc: 'Use tokens to book classes, day passes, or activities.' },
  { step: 4, title: 'Show Up & Enjoy', desc: 'Check-in, track your progress, and feel amazing.' },
];

// ===== CATEGORY SYSTEM =====
export type CategorySection = 'exercise' | 'wellness' | 'social';

export const categorySections: { key: CategorySection; label: string; emoji: string }[] = [
  { key: 'exercise', label: 'Exercise', emoji: '💪' },
  { key: 'wellness', label: 'Wellness & Recovery', emoji: '🧘' },
  { key: 'social', label: 'Social & Fun', emoji: '🎉' },
];

export const categoryConfig: Record<string, { label: string; emoji: string; color: string; section: CategorySection }> = {
  yoga: { label: 'Yoga', emoji: '🧘', color: '#c8ef4d', section: 'exercise' },
  pilates: { label: 'Pilates', emoji: '🤸', color: '#f5b4c8', section: 'exercise' },
  gym: { label: 'Gym', emoji: '🏋️', color: '#ff6b4a', section: 'exercise' },
  boxing: { label: 'Muay Thai', emoji: '🥊', color: '#ff6b4a', section: 'exercise' },
  hiit: { label: 'HIIT', emoji: '⚡', color: '#ffd96a', section: 'exercise' },
  cycling: { label: 'Cycling', emoji: '🚴', color: '#ffd96a', section: 'exercise' },
  running: { label: 'Running', emoji: '🏃', color: '#c8ef4d', section: 'exercise' },
  climbing: { label: 'Climbing', emoji: '🧗', color: '#ff8f6b', section: 'exercise' },
  badminton: { label: 'Badminton', emoji: '🏸', color: '#5b9cf5', section: 'exercise' },
  swimming: { label: 'Swimming', emoji: '🏊', color: '#5b9cf5', section: 'exercise' },
  dance: { label: 'Dance', emoji: '💃', color: '#e879f9', section: 'social' },
  icebath: { label: 'Ice Bath', emoji: '🧊', color: '#6bcec4', section: 'wellness' },
  sauna: { label: 'Sauna', emoji: '🔥', color: '#ff8f6b', section: 'wellness' },
  spa: { label: 'Spa', emoji: '💆', color: '#6bcec4', section: 'wellness' },
  recovery: { label: 'Recovery', emoji: '🩹', color: '#6bcec4', section: 'wellness' },
  sound: { label: 'Sound Healing', emoji: '🎵', color: '#b4a0e8', section: 'wellness' },
  meditation: { label: 'Meditation', emoji: '🧠', color: '#b4a0e8', section: 'wellness' },
  cafe: { label: 'Café Event', emoji: '☕', color: '#b09e8a', section: 'social' },
  community: { label: 'Community', emoji: '👥', color: '#5b9cf5', section: 'social' },
};

// ===== 25+ VENUES =====
export const mockVenues: Venue[] = [
  { id: 'v1', name: 'BURN Fitness Club', image: img(685), rating: 4.8, reviewCount: 324, distance: '0.8 km', categories: ['gym', 'boxing'], address: 'Sukhumvit Soi 24', description: 'Premium boutique fitness club with HIIT and boxing.', lat: 13.7230, lng: 100.5675 },
  { id: 'v2', name: 'The Flow Studio', image: img(529), rating: 4.9, reviewCount: 512, distance: '1.2 km', categories: ['yoga', 'pilates'], address: 'Thonglor Soi 13', description: 'Light-filled studio with expert yoga and pilates instructors.', lat: 13.7310, lng: 100.5785 },
  { id: 'v3', name: 'Rise Wellness', image: img(325), rating: 4.7, reviewCount: 198, distance: '2.5 km', categories: ['spa', 'icebath', 'sauna'], address: 'Sathorn Soi 12', description: 'Pool, sauna, ice bath, and luxury spa for recovery.', lat: 13.7180, lng: 100.5340 },
  { id: 'v4', name: 'RhythmBox Studio', image: img(334), rating: 4.6, reviewCount: 87, distance: '1.8 km', categories: ['dance'], address: 'Ari Soi 1', description: 'Hip-hop, K-pop, contemporary dance classes.', lat: 13.7800, lng: 100.5440 },
  { id: 'v5', name: 'Peak Cycle', image: img(338), rating: 4.8, reviewCount: 256, distance: '3.1 km', categories: ['cycling'], address: 'Ekkamai Soi 5', description: 'Immersive indoor cycling with live DJ sets.', lat: 13.7215, lng: 100.5870 },
  { id: 'v6', name: 'Fighter Lab', image: img(502), rating: 4.5, reviewCount: 411, distance: '0.5 km', categories: ['boxing', 'gym'], address: 'Phrom Phong', description: 'Muay Thai and boxing with top trainers.', lat: 13.7300, lng: 100.5700 },
  { id: 'v7', name: 'Vertical BKK', image: img(450), rating: 4.7, reviewCount: 163, distance: '4.2 km', categories: ['climbing'], address: 'Ladprao', description: 'Indoor climbing and bouldering for all levels.', lat: 13.7950, lng: 100.5700 },
  { id: 'v8', name: 'Shuttle Court BKK', image: img(399), rating: 4.4, reviewCount: 95, distance: '2.8 km', categories: ['badminton'], address: 'Ratchada', description: 'Premium badminton courts with equipment rental.', lat: 13.7600, lng: 100.5740 },
  { id: 'v9', name: 'Chill Space', image: img(164), rating: 4.9, reviewCount: 89, distance: '1.5 km', categories: ['meditation', 'sound'], address: 'Siam Soi 3', description: 'Sound healing, breathwork, and guided meditation.', lat: 13.7440, lng: 100.5340 },
  { id: 'v10', name: 'Aqua Gym', image: img(188), rating: 4.3, reviewCount: 142, distance: '3.5 km', categories: ['swimming', 'gym'], address: 'Rama 9', description: 'Olympic pool and full gym facilities.', lat: 13.7580, lng: 100.5650 },
  { id: 'v11', name: 'Freeze Lab', image: img(247), rating: 4.8, reviewCount: 67, distance: '2.0 km', categories: ['icebath', 'recovery'], address: 'Asoke Soi 21', description: 'Cold plunge, contrast therapy, and sports recovery.', lat: 13.7370, lng: 100.5600 },
  { id: 'v12', name: 'Run BKK', image: img(367), rating: 4.6, reviewCount: 203, distance: '1.0 km', categories: ['running', 'community'], address: 'Lumpini Park', description: 'Running club with guided sessions at Lumpini Park.', lat: 13.7310, lng: 100.5415 },
  { id: 'v13', name: 'Zenith Yoga', image: img(110), rating: 4.9, reviewCount: 380, distance: '0.9 km', categories: ['yoga', 'meditation'], address: 'Silom Soi 6', description: 'Ashtanga, Vinyasa, and Yin yoga in a serene space.', lat: 13.7265, lng: 100.5310 },
  { id: 'v14', name: 'CrossFit Soi', image: img(474), rating: 4.5, reviewCount: 178, distance: '3.8 km', categories: ['gym', 'hiit'], address: 'On Nut Soi 2', description: 'CrossFit box with certified coaches and community.', lat: 13.7050, lng: 100.6010 },
  { id: 'v15', name: 'Body & Bean Café', image: img(225), rating: 4.4, reviewCount: 56, distance: '2.2 km', categories: ['cafe', 'community'], address: 'Ekkamai Soi 12', description: 'Wellness café with post-workout smoothies and community events.', lat: 13.7190, lng: 100.5880 },
  { id: 'v16', name: 'Pole & Flow', image: img(291), rating: 4.7, reviewCount: 134, distance: '1.6 km', categories: ['dance', 'pilates'], address: 'Thonglor Soi 25', description: 'Aerial yoga, pole fitness, and contemporary dance.', lat: 13.7250, lng: 100.5820 },
  { id: 'v17', name: 'Sweat Society', image: img(453), rating: 4.6, reviewCount: 267, distance: '0.7 km', categories: ['hiit', 'gym'], address: 'Sukhumvit Soi 39', description: 'Boutique HIIT studio with heart-rate tracking.', lat: 13.7330, lng: 100.5720 },
  { id: 'v18', name: 'Thai Boxing Academy', image: img(487), rating: 4.8, reviewCount: 445, distance: '1.4 km', categories: ['boxing'], address: 'Silom Soi 4', description: 'Traditional Muay Thai training for all skill levels.', lat: 13.7275, lng: 100.5280 },
  { id: 'v19', name: 'Serenity Spa', image: img(165), rating: 4.9, reviewCount: 312, distance: '3.0 km', categories: ['spa', 'recovery'], address: 'Wireless Road', description: 'Thai massage, aromatherapy, and luxury spa treatments.', lat: 13.7430, lng: 100.5460 },
  { id: 'v20', name: 'Boulder House', image: img(442), rating: 4.6, reviewCount: 119, distance: '5.0 km', categories: ['climbing'], address: 'Bangna', description: 'Largest bouldering facility in Bangkok.', lat: 13.6680, lng: 100.6040 },
];

// ===== 30+ CLASSES =====
const V = mockVenues;
export const mockClasses: FitnessClass[] = [
  { id: 'c1', name: 'Vinyasa Flow', venue: V[1], instructor: 'Sara Lee', image: img(529, 600, 400), category: 'yoga', date: 'Today', time: '07:30', duration: '60 min', tokenCost: 4, originalTokenCost: 6, promoLabel: 'Off-Peak', spotsLeft: 4, totalSpots: 20, difficulty: 'intermediate', description: 'A dynamic flow connecting breath with movement.' },
  { id: 'c2', name: 'HIIT Boxing', venue: V[0], instructor: 'Coach Max', image: img(685, 600, 400), category: 'boxing', date: 'Today', time: '18:00', duration: '45 min', tokenCost: 8, spotsLeft: 8, totalSpots: 15, difficulty: 'advanced', description: 'High-intensity boxing intervals. Burn 600+ calories!' },
  { id: 'c3', name: 'Reformer Pilates', venue: V[1], instructor: 'Nina K.', image: img(529, 600, 400), category: 'pilates', date: 'Tomorrow', time: '10:30', duration: '50 min', tokenCost: 8, spotsLeft: 3, totalSpots: 10, difficulty: 'beginner', description: 'Reformer pilates for core stability and flexibility.' },
  { id: 'c4', name: 'Muay Thai Basics', venue: V[5], instructor: 'Kru Dam', image: img(502, 600, 400), category: 'boxing', date: 'Tomorrow', time: '19:00', duration: '60 min', tokenCost: 8, spotsLeft: 6, totalSpots: 12, difficulty: 'intermediate', description: 'Learn authentic Muay Thai techniques.' },
  { id: 'c5', name: 'K-Pop Dance', venue: V[3], instructor: 'Jia', image: img(334, 600, 400), category: 'dance', date: 'Wed', time: '20:00', duration: '60 min', tokenCost: 6, spotsLeft: 6, totalSpots: 20, difficulty: 'beginner', description: 'Learn the latest K-Pop choreography!' },
  { id: 'c6', name: 'Ice Bath Recovery', venue: V[10], instructor: 'Dr. Pim', image: img(247, 600, 400), category: 'icebath', date: 'Thu', time: '10:00', duration: '30 min', tokenCost: 10, spotsLeft: 5, totalSpots: 8, difficulty: 'beginner', description: 'Guided ice bath and contrast therapy session.' },
  { id: 'c7', name: 'Spin & Burn', venue: V[4], instructor: 'DJ Rider', image: img(338, 600, 400), category: 'cycling', date: 'Fri', time: '19:30', duration: '45 min', tokenCost: 6, spotsLeft: 10, totalSpots: 25, difficulty: 'intermediate', description: 'Ride to the beat with live DJ and mood lighting.' },
  { id: 'c8', name: 'Bouldering Session', venue: V[6], instructor: 'Open', image: img(450, 600, 400), category: 'climbing', date: 'Sat', time: '14:00', duration: '120 min', tokenCost: 10, spotsLeft: 15, totalSpots: 30, difficulty: 'beginner', description: 'Open bouldering with routes for all levels.' },
  { id: 'c9', name: 'Sound Healing', venue: V[8], instructor: 'Aom', image: img(164, 600, 400), category: 'sound', date: 'Today', time: '18:30', duration: '75 min', tokenCost: 12, spotsLeft: 3, totalSpots: 12, difficulty: 'beginner', description: 'Crystal singing bowls and guided meditation.' },
  { id: 'c10', name: 'Morning Run Club', venue: V[11], instructor: 'Coach Tong', image: img(367, 600, 400), category: 'running', date: 'Tomorrow', time: '06:00', duration: '60 min', tokenCost: 4, spotsLeft: 20, totalSpots: 40, difficulty: 'beginner', description: 'Group run at Lumpini Park. All paces welcome.' },
  { id: 'c11', name: 'Power Yoga', venue: V[12], instructor: 'Mint S.', image: img(110, 600, 400), category: 'yoga', date: 'Today', time: '09:00', duration: '60 min', tokenCost: 4, originalTokenCost: 6, promoLabel: 'Off-Peak', spotsLeft: 7, totalSpots: 18, difficulty: 'intermediate', description: 'Build strength and flexibility through powerful flow.' },
  { id: 'c12', name: 'CrossFit WOD', venue: V[13], instructor: 'Coach P.', image: img(474, 600, 400), category: 'hiit', date: 'Today', time: '17:00', duration: '50 min', tokenCost: 8, spotsLeft: 5, totalSpots: 16, difficulty: 'advanced', description: 'Workout of the Day with scaling options.' },
  { id: 'c13', name: 'Yin Yoga', venue: V[12], instructor: 'Pla', image: img(110, 600, 400), category: 'yoga', date: 'Wed', time: '19:00', duration: '75 min', tokenCost: 6, spotsLeft: 8, totalSpots: 15, difficulty: 'beginner', description: 'Deep stretching and relaxation.' },
  { id: 'c14', name: 'Thai Massage Workshop', venue: V[18], instructor: 'Ajarn Lek', image: img(165, 600, 400), category: 'spa', date: 'Sat', time: '10:00', duration: '90 min', tokenCost: 15, spotsLeft: 4, totalSpots: 8, difficulty: 'beginner', description: 'Learn basic Thai massage techniques.' },
  { id: 'c15', name: 'Sunrise Meditation', venue: V[8], instructor: 'Monk Phra', image: img(164, 600, 400), category: 'meditation', date: 'Tomorrow', time: '06:30', duration: '45 min', tokenCost: 4, spotsLeft: 10, totalSpots: 20, difficulty: 'beginner', description: 'Guided morning meditation at sunrise.' },
  { id: 'c16', name: 'Sauna Circuit', venue: V[2], instructor: 'Staff', image: img(325, 600, 400), category: 'sauna', date: 'Today', time: '12:00', duration: '60 min', tokenCost: 6, originalTokenCost: 8, promoLabel: 'Off-Peak', spotsLeft: 6, totalSpots: 10, difficulty: 'beginner', description: 'Finnish sauna, steam room, and cold plunge.' },
  { id: 'c17', name: 'Pole Fitness', venue: V[15], instructor: 'Bow', image: img(291, 600, 400), category: 'dance', date: 'Thu', time: '18:00', duration: '60 min', tokenCost: 8, spotsLeft: 4, totalSpots: 10, difficulty: 'intermediate', description: 'Build strength through pole fitness.' },
  { id: 'c18', name: 'Badminton Open Play', venue: V[7], instructor: 'Open', image: img(399, 600, 400), category: 'badminton', date: 'Sat', time: '16:00', duration: '90 min', tokenCost: 6, spotsLeft: 8, totalSpots: 12, difficulty: 'beginner', description: 'Drop-in badminton. Courts and equipment provided.' },
  { id: 'c19', name: 'Lap Swimming', venue: V[9], instructor: 'Open', image: img(188, 600, 400), category: 'swimming', date: 'Today', time: '07:00', duration: '60 min', tokenCost: 4, originalTokenCost: 6, promoLabel: 'Off-Peak', spotsLeft: 12, totalSpots: 20, difficulty: 'intermediate', description: 'Lane swimming at Olympic-size pool.' },
  { id: 'c20', name: 'HIIT Tabata', venue: V[16], instructor: 'Coach Beam', image: img(453, 600, 400), category: 'hiit', date: 'Today', time: '12:30', duration: '30 min', tokenCost: 6, spotsLeft: 3, totalSpots: 14, difficulty: 'advanced', description: '30 min intense Tabata with heart-rate tracking.' },
  { id: 'c21', name: 'Wellness Brunch', venue: V[14], instructor: 'Chef Pom', image: img(225, 600, 400), category: 'cafe', date: 'Sun', time: '10:00', duration: '120 min', tokenCost: 12, spotsLeft: 8, totalSpots: 20, difficulty: 'beginner', description: 'Healthy brunch, smoothie bar, and community vibes.' },
  { id: 'c22', name: 'Boulder Comp Prep', venue: V[19], instructor: 'Coach Top', image: img(442, 600, 400), category: 'climbing', date: 'Sat', time: '13:00', duration: '120 min', tokenCost: 10, spotsLeft: 10, totalSpots: 20, difficulty: 'advanced', description: 'Competition-level bouldering training.' },
  { id: 'c23', name: 'Traditional Muay Thai', venue: V[17], instructor: 'Kru Nai', image: img(487, 600, 400), category: 'boxing', date: 'Tomorrow', time: '17:30', duration: '90 min', tokenCost: 10, spotsLeft: 5, totalSpots: 14, difficulty: 'advanced', description: 'Traditional Thai boxing with pad work and sparring.' },
  { id: 'c24', name: 'Gym Day Pass', venue: V[0], instructor: 'Self', image: img(685, 600, 400), category: 'gym', date: 'Today', time: '06:00', duration: 'Full Day', tokenCost: 10, spotsLeft: 30, totalSpots: 50, difficulty: 'beginner', description: 'Full day access to gym equipment and facilities.' },
  { id: 'c25', name: 'Spa Day Pass', venue: V[18], instructor: 'Staff', image: img(165, 600, 400), category: 'spa', date: 'Today', time: '10:00', duration: 'Half Day', tokenCost: 15, spotsLeft: 6, totalSpots: 10, difficulty: 'beginner', description: 'Half-day access: Thai massage, sauna, and relaxation.' },
];

export const mockBookings: Booking[] = [
  { id: 'b1', fitnessClass: mockClasses[0], status: 'upcoming', bookedAt: '2026-05-06T06:00:00Z', qrCode: 'DUDO-VEE3241B' },
  { id: 'b2', fitnessClass: mockClasses[3], status: 'upcoming', bookedAt: '2026-05-05T14:00:00Z', qrCode: 'DUDO-BOX8812C' },
  { id: 'b3', fitnessClass: { ...mockClasses[1], date: 'May 3' }, status: 'completed', bookedAt: '2026-05-02T10:00:00Z' },
  { id: 'b4', fitnessClass: { ...mockClasses[4], date: 'Apr 28' }, status: 'cancelled', bookedAt: '2026-04-27T08:00:00Z' },
];

// ===== PROMOTIONS =====
export interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  gradient: string;
  discount: string;       // e.g. "30% OFF" or "Save 2 tokens"
  validTime: string;      // e.g. "Weekdays 10:00–14:00"
  code?: string;
  classIds?: string[];     // applicable class IDs
  categoryFilter?: string; // applicable category
}

export const mockPromotions: Promotion[] = [
  { id: 'promo1', title: 'Off-Peak Happy Hour', subtitle: 'Weekday mornings & lunch — save tokens!', emoji: '☀️', gradient: 'linear-gradient(135deg, #ff9a56 0%, #ff6b4a 100%)', discount: 'Save 2 tokens', validTime: 'Mon–Fri 06:00–09:00 & 11:00–14:00', classIds: ['c1', 'c11', 'c16', 'c19', 'c20'] },
  { id: 'promo2', title: 'Wellness Wednesday', subtitle: 'All wellness classes at a discount', emoji: '🧘', gradient: 'linear-gradient(135deg, #6bcec4 0%, #4da89e 100%)', discount: '25% OFF', validTime: 'Every Wednesday', categoryFilter: 'wellness' },
  { id: 'promo3', title: 'Flash Sale — Boxing', subtitle: 'Limited time! Try Muay Thai', emoji: '🥊', gradient: 'linear-gradient(135deg, #ff6b4a 0%, #cc3d20 100%)', discount: '3 tokens only', validTime: 'This week only', classIds: ['c2', 'c4', 'c23'] },
  { id: 'promo4', title: 'Weekend Explorer', subtitle: 'Try something new on Sat & Sun', emoji: '🗺️', gradient: 'linear-gradient(135deg, #ffd96a 0%, #ffb94a 100%)', discount: 'Save 3 tokens', validTime: 'Sat–Sun all day' },
  { id: 'promo5', title: 'Bring a Friend', subtitle: 'Book together, both save!', emoji: '👯', gradient: 'linear-gradient(135deg, #c8ef4d 0%, #a5cc3a 100%)', discount: '2-for-1', validTime: 'Any class, anytime' },
  { id: 'promo6', title: 'Night Owl', subtitle: 'Evening classes after 20:00', emoji: '🌙', gradient: 'linear-gradient(135deg, #5b5ea6 0%, #3d4076 100%)', discount: 'Save 2 tokens', validTime: 'Daily after 20:00' },
];

// ===== PRICING TIERS =====
export type PricingTier = 'off-peak' | 'standard' | 'prime';

export function getPricingTier(time: string): PricingTier {
  const hour = parseInt(time.split(':')[0], 10);
  // Off-peak: 6-9, 11-14 weekday
  if ((hour >= 6 && hour < 9) || (hour >= 11 && hour < 14)) return 'off-peak';
  // Prime: 17-20 (after work)
  if (hour >= 17 && hour < 20) return 'prime';
  return 'standard';
}

export const pricingTierInfo: Record<PricingTier, { label: string; color: string; multiplier: number; desc: string }> = {
  'off-peak': { label: '☀️ Off-Peak', color: '#6bcec4', multiplier: 0.75, desc: 'Cheapest! Weekday mornings & lunch' },
  'standard':  { label: '⏰ Standard', color: 'var(--text-muted)', multiplier: 1.0, desc: 'Regular token price' },
  'prime':     { label: '🔥 Prime Time', color: '#ff6b4a', multiplier: 1.25, desc: 'Peak demand — after work hours' },
};

// Export social posts from separate file
export { mockSocialPosts } from './socialData';

