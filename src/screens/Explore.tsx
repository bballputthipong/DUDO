// ========================================
// Dudo — Explore Screen (Leaflet Map + Filters)
// ========================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, MapPin, Star, SlidersHorizontal, Clock, Map, List, Navigation } from 'lucide-react';
import { mockVenues, mockClasses, categoryConfig, categorySections, type CategorySection } from '../data';
import { Chip, GlassCard, TokenBadge, DifficultyBadge } from '../components/ui';
import type { FitnessClass, Venue } from '../types';

interface ExploreScreenProps {
  onClassSelect: (c: FitnessClass) => void;
  onVenueSelect: (v: Venue) => void;
}

// Custom map pin icon
const createPinIcon = (active: boolean) => L.divIcon({
  className: '',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  html: `<div style="width:28px;height:28px;border-radius:50% 50% 50% 4px;background:${active ? '#ff6b4a' : 'white'};border:2px solid ${active ? '#ff6b4a' : '#ddd'};display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.15);transform:rotate(-45deg)"><div style="transform:rotate(45deg);font-size:12px">${active ? '📍' : '📌'}</div></div>`,
});

// Map center on Bangkok (Sukhumvit area)
const BANGKOK_CENTER: [number, number] = [13.7350, 100.5600];

function MapRecenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  map.flyTo([lat, lng], 15, { duration: 0.5 });
  return null;
}

export function ExploreScreen({ onClassSelect, onVenueSelect }: ExploreScreenProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeSectionFilter, setActiveSectionFilter] = useState<CategorySection | 'all'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [contentType, setContentType] = useState<'classes' | 'venues'>('classes');
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [searchText, setSearchText] = useState('');

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i);
    return { day: d.toLocaleDateString('en-US', { weekday: 'short' }), date: d.getDate(), month: d.toLocaleDateString('en-US', { month: 'short' }) };
  });

  // Filtered categories by section
  const visibleCategories = useMemo(() => {
    if (activeSectionFilter === 'all') return Object.entries(categoryConfig);
    return Object.entries(categoryConfig).filter(([, c]) => c.section === activeSectionFilter);
  }, [activeSectionFilter]);

  // Filtered data
  const filteredClasses = useMemo(() => {
    let list = mockClasses;
    if (activeFilter !== 'all') list = list.filter((c) => c.category === activeFilter);
    if (searchText) list = list.filter((c) => c.name.toLowerCase().includes(searchText.toLowerCase()) || c.venue.name.toLowerCase().includes(searchText.toLowerCase()));
    return list;
  }, [activeFilter, searchText]);

  const filteredVenues = useMemo(() => {
    let list = mockVenues;
    if (activeFilter !== 'all') list = list.filter((v) => v.categories.includes(activeFilter));
    if (searchText) list = list.filter((v) => v.name.toLowerCase().includes(searchText.toLowerCase()));
    return list;
  }, [activeFilter, searchText]);

  const selectedVenue = selectedVenueId ? mockVenues.find((v) => v.id === selectedVenueId) : null;

  return (
    <div style={{ paddingBottom: '24px' }}>
      {/* Header */}
      <div style={{ padding: '48px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>Explore</h1>
          <div style={{ display: 'flex', background: 'white', borderRadius: '10px', padding: '2px', border: '1px solid var(--color-warm-beige)' }}>
            {[{ mode: 'list' as const, icon: List, label: 'List' }, { mode: 'map' as const, icon: Map, label: 'Map' }].map(({ mode, icon: Icon, label }) => (
              <button key={mode} onClick={() => setViewMode(mode)} style={{
                padding: '6px 10px', borderRadius: '8px', cursor: 'pointer',
                background: viewMode === mode ? 'var(--color-coral)' : 'transparent',
                color: viewMode === mode ? 'white' : 'var(--text-muted)',
                display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600,
              }}><Icon size={14} /> {label}</button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'white', borderRadius: '14px', padding: '11px 16px', border: '1px solid var(--color-warm-beige)', marginBottom: '12px' }}>
          <Search size={18} color="var(--text-muted)" />
          <input type="text" placeholder="Search classes, venues..." value={searchText} onChange={(e) => setSearchText(e.target.value)}
            style={{ flex: 1, background: 'none', color: 'var(--text-primary)', fontSize: '0.9375rem' }} />
          <motion.button whileTap={{ scale: 0.9 }} style={{ width: 34, height: 34, borderRadius: '10px', background: 'var(--color-coral)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <SlidersHorizontal size={15} color="white" />
          </motion.button>
        </div>
      </div>

      {/* Section Filter */}
      <div className="hide-scrollbar" style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '0 20px 8px' }}>
        <Chip label="All" active={activeSectionFilter === 'all'} onClick={() => { setActiveSectionFilter('all'); setActiveFilter('all'); }} color="var(--color-charcoal)" />
        {categorySections.map((s) => (
          <Chip key={s.key} label={s.label} emoji={s.emoji} active={activeSectionFilter === s.key} onClick={() => { setActiveSectionFilter(s.key); setActiveFilter('all'); }} color="var(--color-coral)" />
        ))}
      </div>

      {/* Category Chips */}
      <div className="hide-scrollbar" style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '4px 20px 12px' }}>
        <Chip label="All" active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} color="var(--color-charcoal)" />
        {visibleCategories.map(([key, cat]) => (
          <Chip key={key} label={cat.label} emoji={cat.emoji} active={activeFilter === key} onClick={() => setActiveFilter(key)} color={cat.color} />
        ))}
      </div>

      {/* Date Picker */}
      <div className="hide-scrollbar" style={{ display: 'flex', gap: '7px', overflowX: 'auto', padding: '0 20px 14px' }}>
        {dates.map((d, i) => (
          <motion.button key={i} whileTap={{ scale: 0.95 }} onClick={() => setSelectedDate(i)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
              padding: '7px 12px', borderRadius: '12px', minWidth: '48px', flexShrink: 0,
              background: selectedDate === i ? 'var(--color-coral)' : 'white',
              color: selectedDate === i ? 'white' : 'var(--text-primary)',
              border: `1px solid ${selectedDate === i ? 'transparent' : 'var(--color-warm-beige)'}`,
              cursor: 'pointer',
            }}>
            <span style={{ fontSize: '0.5625rem', fontWeight: 500, opacity: 0.7 }}>{d.day}</span>
            <span style={{ fontSize: '1rem', fontWeight: 700 }}>{d.date}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ===== MAP VIEW ===== */}
        {viewMode === 'map' ? (
          <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ padding: '0 20px' }}>
            <div style={{ borderRadius: '20px', overflow: 'hidden', height: '320px', boxShadow: 'var(--shadow-lg)', marginBottom: '14px', border: '1px solid var(--color-warm-beige)' }}>
              <MapContainer center={BANGKOK_CENTER} zoom={13} style={{ width: '100%', height: '100%' }} zoomControl={false} attributionControl={false}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                {selectedVenue?.lat && selectedVenue?.lng && <MapRecenter lat={selectedVenue.lat} lng={selectedVenue.lng} />}
                {filteredVenues.filter((v) => v.lat && v.lng).map((venue) => (
                  <Marker key={venue.id} position={[venue.lat!, venue.lng!]} icon={createPinIcon(selectedVenueId === venue.id)}
                    eventHandlers={{ click: () => setSelectedVenueId(venue.id === selectedVenueId ? null : venue.id) }}>
                    <Popup><strong>{venue.name}</strong><br />{venue.address}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            <AnimatePresence>
              {selectedVenue && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                  <GlassCard onClick={() => onVenueSelect(selectedVenue)} style={{ display: 'flex', gap: '14px', padding: '14px', background: 'white', marginBottom: '14px' }}>
                    <img src={selectedVenue.image} alt="" style={{ width: 72, height: 72, borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{selectedVenue.name}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{selectedVenue.address}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>
                        <Star size={11} color="var(--color-warm-yellow)" fill="var(--color-warm-yellow)" /> {selectedVenue.rating} · <Navigation size={11} /> {selectedVenue.distance}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>

            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '10px' }}>Nearby Studios</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredVenues.slice(0, 5).map((v) => (
                <GlassCard key={v.id} onClick={() => { setSelectedVenueId(v.id); onVenueSelect(v); }} style={{ display: 'flex', gap: '12px', padding: '10px', background: 'white' }}>
                  <img src={v.image} alt="" style={{ width: 52, height: 52, borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{v.name}</h4>
                    <div style={{ display: 'flex', gap: '6px', fontSize: '0.625rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                      <Star size={10} color="var(--color-warm-yellow)" fill="var(--color-warm-yellow)" /> {v.rating} · {v.distance}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        ) : (
          /* ===== LIST VIEW ===== */
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ padding: '0 20px' }}>
            <div style={{ display: 'flex', background: 'white', borderRadius: '12px', padding: '3px', border: '1px solid var(--color-warm-beige)', marginBottom: '14px' }}>
              {(['classes', 'venues'] as const).map((m) => (
                <button key={m} onClick={() => setContentType(m)} style={{
                  flex: 1, padding: '9px', borderRadius: '10px', fontSize: '0.8125rem', fontWeight: 600,
                  background: contentType === m ? 'var(--color-coral)' : 'transparent',
                  color: contentType === m ? 'white' : 'var(--text-muted)',
                  cursor: 'pointer', textTransform: 'capitalize', transition: 'all 200ms ease',
                }}>{m}</button>
              ))}
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              {contentType === 'classes' ? `${filteredClasses.length} classes found` : `${filteredVenues.length} venues found`}
            </p>

            {contentType === 'classes' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredClasses.map((cls) => (
                  <GlassCard key={cls.id} onClick={() => onClassSelect(cls)} style={{ display: 'flex', gap: '14px', padding: '12px', background: 'white' }}>
                    <img src={cls.image} alt="" style={{ width: 76, height: 76, borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px' }}>
                        <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>{cls.name}</h4>
                        <TokenBadge count={cls.tokenCost} originalCount={cls.originalTokenCost} size="sm" />
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '3px 0' }}>{cls.instructor} · {cls.venue.name}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.6875rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={10} /> {cls.date} {cls.time}</span>
                        <span>· {cls.spotsLeft} spots</span>
                        <DifficultyBadge level={cls.difficulty} />
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredVenues.map((v) => (
                  <GlassCard key={v.id} onClick={() => onVenueSelect(v)} style={{ overflow: 'hidden', padding: 0, background: 'white' }}>
                    <img src={v.image} alt="" style={{ width: '100%', height: 130, objectFit: 'cover' }} />
                    <div style={{ padding: '12px 14px' }}>
                      <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '4px' }}>{v.name}</h4>
                      <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                        <Star size={12} color="var(--color-warm-yellow)" fill="var(--color-warm-yellow)" /> {v.rating} ({v.reviewCount}) · <MapPin size={12} /> {v.distance}
                      </div>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {v.categories.slice(0, 3).map((cat) => {
                          const cfg = categoryConfig[cat];
                          return cfg ? <span key={cat} style={{ fontSize: '0.5625rem', padding: '2px 6px', borderRadius: '5px', background: 'var(--color-sand)', color: 'var(--text-secondary)' }}>{cfg.emoji} {cfg.label}</span> : null;
                        })}
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
