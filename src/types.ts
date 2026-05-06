// ========================================
// Dudo — Type Definitions
// ========================================

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface Plan {
  id: string;
  name: string;
  monthlyTokens: number;
  price: number;
  features: string[];
}

export interface TokenBalance {
  total: number;
  used: number;
  remaining: number;
}

export type ActivityCategory =
  | 'gym'
  | 'yoga'
  | 'pilates'
  | 'boxing'
  | 'dance'
  | 'spa'
  | 'recovery'
  | 'swimming'
  | 'running'
  | 'cycling'
  | 'climbing'
  | 'badminton'
  | 'hiit'
  | 'icebath'
  | 'sauna'
  | 'sound'
  | 'meditation'
  | 'cafe'
  | 'community';

export interface Venue {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  distance: string;
  categories: string[];
  address: string;
  description: string;
  lat?: number;
  lng?: number;
}

export interface FitnessClass {
  id: string;
  name: string;
  venue: Venue;
  instructor: string;
  image: string;
  category: ActivityCategory;
  date: string;
  time: string;
  duration: string;
  tokenCost: number;
  originalTokenCost?: number; // Added for dynamic pricing
  promoLabel?: string; // e.g., 'Off-Peak', 'Flash Sale'
  spotsLeft: number;
  totalSpots: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
}

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  fitnessClass: FitnessClass;
  status: BookingStatus;
  bookedAt: string;
  qrCode?: string;
}

export interface SocialPost {
  id: string;
  user: { name: string; avatar: string };
  activity: string;
  venue: string;
  image?: string;
  likes: number;
  comments: number;
  timeAgo: string;
  liked: boolean;
}

export type TabRoute = 'home' | 'explore' | 'bookings' | 'social' | 'profile';
