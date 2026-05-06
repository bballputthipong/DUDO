// ========================================
// Dudo — Bookings Screen (Warm Light)
// ========================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, X, QrCode } from 'lucide-react';
import { useApp } from '../context';
import { GlassCard, Button, TokenBadge } from '../components/ui';
import type { BookingStatus } from '../types';

export function BookingsScreen() {
  const { bookings, cancelBooking } = useApp();
  const [activeTab, setActiveTab] = useState<BookingStatus>('upcoming');
  const [showQR, setShowQR] = useState<string | null>(null);

  const tabs: { key: BookingStatus; label: string }[] = [
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'completed', label: 'Past' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  const filtered = bookings.filter((b) => b.status === activeTab);

  return (
    <div style={{ padding: '48px 20px 24px' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '18px' }}>My Bookings</h1>

      {/* Tabs */}
      <div style={{ display: 'flex', background: 'white', borderRadius: '12px', padding: '3px', marginBottom: '18px', border: '1px solid var(--color-warm-beige)' }}>
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
            flex: 1, padding: '10px', borderRadius: '10px', fontSize: '0.8125rem', fontWeight: 600,
            background: activeTab === tab.key ? 'var(--color-coral)' : 'transparent',
            color: activeTab === tab.key ? 'white' : 'var(--text-muted)',
            transition: 'all 200ms ease', cursor: 'pointer',
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Booking Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '2rem', marginBottom: '12px' }}>📭</p>
              <p style={{ fontSize: '0.9375rem' }}>No {activeTab} bookings</p>
            </div>
          ) : filtered.map((booking) => (
            <GlassCard key={booking.id} style={{ padding: '16px', background: 'white' }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <img src={booking.fitnessClass.image} alt={booking.fitnessClass.name}
                  style={{ width: 72, height: 72, borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>{booking.fitnessClass.name}</h4>
                    <TokenBadge count={booking.fitnessClass.tokenCost} size="sm" />
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '3px 0' }}>{booking.fitnessClass.venue.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={11} /> {booking.fitnessClass.date} {booking.fitnessClass.time}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={11} /> {booking.fitnessClass.venue.distance}</span>
                  </div>
                </div>
              </div>

              {booking.status === 'upcoming' && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                  <Button variant="secondary" size="sm" style={{ flex: 1 }} onClick={() => setShowQR(booking.qrCode || null)}>
                    <QrCode size={15} /> Check-in QR
                  </Button>
                  <Button variant="outline" size="sm" style={{ flex: 1 }} onClick={() => cancelBooking(booking.id)}>
                    <X size={15} /> Cancel
                  </Button>
                </div>
              )}
              {booking.status === 'completed' && (
                <div style={{ marginTop: '12px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b8e23', background: '#f4fce0', padding: '4px 10px', borderRadius: '6px' }}>✓ Completed</span>
                </div>
              )}
              {booking.status === 'cancelled' && (
                <div style={{ marginTop: '12px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', background: 'var(--color-sand)', padding: '4px 10px', borderRadius: '6px' }}>Cancelled · Tokens refunded</span>
                </div>
              )}
            </GlassCard>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* QR Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}
            onClick={() => setShowQR(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'white', borderRadius: '24px', padding: '32px', textAlign: 'center',
                maxWidth: '320px', width: '100%', boxShadow: 'var(--shadow-xl)',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>Check-in QR</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '20px' }}>Show this QR code to the staff</p>
              <div style={{
                width: 180, height: 180, margin: '0 auto 20px', background: 'var(--color-cream)',
                borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid var(--color-warm-beige)',
              }}>
                <QrCode size={110} color="var(--text-primary)" />
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginBottom: '6px' }}>Booking ID: #{showQR}</p>
              <p style={{ fontSize: '0.6875rem', color: 'var(--color-coral)', fontWeight: 500, marginBottom: '16px' }}>⏰ Please arrive 10 mins before class starts.</p>
              <Button variant="primary" size="md" fullWidth onClick={() => setShowQR(null)}>View QR Code</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
