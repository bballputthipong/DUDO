// ========================================
// Dudo — Community Screen (Full Featured)
// Streak, Badges, Go Together, Create Post/Story
// ========================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, MoreHorizontal, Flame, Trophy, Users, Plus, X, Camera, Image, Send, MapPin, Zap, Target, Award, UserPlus } from 'lucide-react';
import { useApp } from '../context';
import { Avatar, GlassCard, Button } from '../components/ui';

// ===== Mock Data =====
const streakData = {
  current: 12,
  best: 18,
  target: 3, // days between sessions to keep streak
  todayDone: true,
  weekLog: [true, true, false, true, true, false, true], // Mon-Sun
};

const badges = [
  { id: 'b1', emoji: '🔥', label: 'Fire Starter', desc: '7-day streak', unlocked: true, color: '#ff6b4a' },
  { id: 'b2', emoji: '💪', label: 'Iron Will', desc: '10 classes completed', unlocked: true, color: '#ffd96a' },
  { id: 'b3', emoji: '🧘', label: 'Zen Master', desc: '5 yoga classes', unlocked: true, color: '#c8ef4d' },
  { id: 'b4', emoji: '🥊', label: 'Fighter', desc: '5 boxing classes', unlocked: false, color: '#ff6b4a' },
  { id: 'b5', emoji: '👥', label: 'Social Butterfly', desc: 'Go with 3 friends', unlocked: false, color: '#5b9cf5' },
  { id: 'b6', emoji: '🏆', label: 'Champion', desc: '30-day streak', unlocked: false, color: '#ffd96a' },
];

const goTogetherEvents = [
  { id: 'gt1', title: 'Saturday Yoga Gang 🧘‍♀️', host: 'Praew', avatar: 'https://picsum.photos/id/65/100/100', venue: 'The Flow Studio', date: 'Sat, 11 May', time: '09:00', spots: 4, joined: 2, members: ['https://picsum.photos/id/75/100/100', 'https://picsum.photos/id/26/100/100'] },
  { id: 'gt2', title: 'Boxing Crew 🥊', host: 'Bank', avatar: 'https://picsum.photos/id/75/100/100', venue: 'Fighter Lab', date: 'Sun, 12 May', time: '17:00', spots: 6, joined: 3, members: ['https://picsum.photos/id/65/100/100', 'https://picsum.photos/id/91/100/100', 'https://picsum.photos/id/21/100/100'] },
  { id: 'gt3', title: 'Cycling + Brunch 🚴‍♂️☕', host: 'Jay', avatar: 'https://picsum.photos/id/91/100/100', venue: 'Peak Cycle', date: 'Sat, 11 May', time: '08:00', spots: 8, joined: 5, members: ['https://picsum.photos/id/65/100/100', 'https://picsum.photos/id/75/100/100', 'https://picsum.photos/id/26/100/100'] },
];

export function SocialScreen() {
  const { socialPosts, toggleLike } = useApp();
  const [activeTab, setActiveTab] = useState<'feed' | 'together' | 'badges'>('feed');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [joinedEvents, setJoinedEvents] = useState<Set<string>>(new Set());
  const [postText, setPostText] = useState('');
  const [storyText, setStoryText] = useState('');

  const handleJoinEvent = (id: string) => {
    setJoinedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div style={{ paddingBottom: '24px' }}>
      <div style={{ padding: '48px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>Community</h1>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowCreatePost(true)}
            style={{
              width: 38, height: 38, borderRadius: '12px', background: 'var(--color-coral)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(255,107,74,0.25)',
            }}>
            <Plus size={18} color="white" />
          </motion.button>
        </div>

        {/* Streak Card */}
        <GlassCard style={{
          padding: '16px', marginBottom: '14px',
          background: 'linear-gradient(135deg, #fff8f0 0%, #fff0ed 100%)',
          border: '1px solid rgba(255,107,74,0.12)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: streakData.todayDone ? 'var(--color-coral)' : 'var(--color-sand)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: streakData.todayDone ? '0 0 20px rgba(255,107,74,0.3)' : 'none',
            }}>
              <Flame size={26} color={streakData.todayDone ? 'white' : 'var(--text-muted)'} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-coral)' }}>{streakData.current}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>day streak 🔥</span>
              </div>
              <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Best: {streakData.best} days · Keep going every {streakData.target} days!</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Zap size={16} color="var(--color-warm-yellow)" />
              <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginTop: '2px' }}>+10 pts</p>
            </div>
          </div>
          {/* Week dots */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', padding: '0 4px' }}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: streakData.weekLog[i] ? 'var(--color-coral)' : 'var(--color-sand)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.625rem', fontWeight: 700,
                  color: streakData.weekLog[i] ? 'white' : 'var(--text-muted)',
                }}>
                  {streakData.weekLog[i] ? '✓' : ''}
                </div>
                <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>{day}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
          {([
            { key: 'feed' as const, label: 'Feed', icon: Heart },
            { key: 'together' as const, label: 'Go Together', icon: Users },
            { key: 'badges' as const, label: 'Badges', icon: Award },
          ]).map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                style={{
                  flex: 1, padding: '9px 6px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 600,
                  background: activeTab === tab.key ? 'var(--color-coral)' : 'white',
                  color: activeTab === tab.key ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${activeTab === tab.key ? 'transparent' : 'var(--color-warm-beige)'}`,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                  transition: 'all 200ms ease',
                }}>
                <Icon size={13} /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stories Row */}
      {activeTab === 'feed' && (
        <div className="hide-scrollbar" style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '0 20px 16px' }}>
          {/* Create Story */}
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowCreateStory(true)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', minWidth: '60px', cursor: 'pointer' }}>
            <div style={{
              width: 54, height: 54, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-coral) 0%, var(--color-warm-yellow) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 3px 10px rgba(255,107,74,0.25)',
            }}>
              <Plus size={22} color="white" />
            </div>
            <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', fontWeight: 500 }}>Your Story</span>
          </motion.button>
          {socialPosts.map((post) => (
            <div key={post.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', minWidth: '60px' }}>
              <div style={{ padding: '2px', borderRadius: '50%', background: 'var(--gradient-coral)' }}>
                <div style={{ borderRadius: '50%', border: '2px solid var(--color-cream)' }}>
                  <Avatar src={post.user.avatar} size={50} />
                </div>
              </div>
              <span style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)' }}>{post.user.name}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ padding: '0 20px' }}>
        <AnimatePresence mode="wait">
          {/* ===== FEED TAB ===== */}
          {activeTab === 'feed' && (
            <motion.div key="feed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {socialPosts.map((post) => (
                <GlassCard key={post.id} style={{ padding: 0, overflow: 'hidden', background: 'white' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px 6px' }}>
                    <Avatar src={post.user.avatar} size={34} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{post.user.name}</p>
                      <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>{post.timeAgo} · {post.venue}</p>
                    </div>
                    <MoreHorizontal size={16} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
                  </div>
                  <div style={{ padding: '4px 14px 8px' }}>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.5, color: 'var(--text-primary)' }}>{post.activity}</p>
                  </div>
                  {post.image && <img src={post.image} alt="" style={{ width: '100%', height: 200, objectFit: 'cover' }} />}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '10px 14px', borderTop: '1px solid var(--color-sand)' }}>
                    <motion.button whileTap={{ scale: 0.8 }} onClick={() => toggleLike(post.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                      <Heart size={18} color={post.liked ? 'var(--color-coral)' : 'var(--text-muted)'} fill={post.liked ? 'var(--color-coral)' : 'none'} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 500, color: post.liked ? 'var(--color-coral)' : 'var(--text-muted)' }}>{post.likes}</span>
                    </motion.button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                      <MessageCircle size={17} color="var(--text-muted)" /><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.comments}</span>
                    </button>
                    <button style={{ marginLeft: 'auto', cursor: 'pointer' }}><Share2 size={16} color="var(--text-muted)" /></button>
                  </div>
                </GlassCard>
              ))}
            </motion.div>
          )}

          {/* ===== GO TOGETHER TAB ===== */}
          {activeTab === 'together' && (
            <motion.div key="together" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Join a group or create your own!</p>
                <Button variant="primary" size="sm" style={{ fontSize: '0.75rem' }}>
                  <UserPlus size={13} /> Create
                </Button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {goTogetherEvents.map((evt) => {
                  const isJoined = joinedEvents.has(evt.id);
                  return (
                    <GlassCard key={evt.id} style={{ padding: '16px', background: 'white' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
                        <Avatar src={evt.avatar} size={38} ring />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>{evt.title}</h4>
                          <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>by {evt.host}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {evt.venue}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Target size={12} /> {evt.date} {evt.time}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {evt.members.slice(0, 3).map((m, i) => (
                            <div key={i} style={{ marginLeft: i > 0 ? '-8px' : 0, zIndex: 3 - i }}>
                              <Avatar src={m} size={28} />
                            </div>
                          ))}
                          <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
                            {evt.joined}/{evt.spots} joined
                          </span>
                        </div>
                        <Button
                          variant={isJoined ? 'ghost' : 'primary'}
                          size="sm"
                          onClick={() => handleJoinEvent(evt.id)}
                          style={{ fontSize: '0.75rem' }}
                        >
                          {isJoined ? '✓ Joined' : 'Join'}
                        </Button>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ===== BADGES TAB ===== */}
          {activeTab === 'badges' && (
            <motion.div key="badges" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '14px',
                background: 'linear-gradient(135deg, #fff8f0 0%, var(--color-lime-light) 100%)',
                border: '1px solid rgba(200,239,77,0.2)', marginBottom: '16px',
              }}>
                <Trophy size={22} color="var(--color-warm-yellow)" />
                <div>
                  <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {badges.filter((b) => b.unlocked).length}/{badges.length} Badges Collected
                  </p>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Keep moving to unlock more!</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {badges.map((badge) => (
                  <GlassCard key={badge.id} style={{
                    padding: '16px', textAlign: 'center', background: 'white',
                    opacity: badge.unlocked ? 1 : 0.5,
                    position: 'relative',
                  }}>
                    {!badge.unlocked && (
                      <div style={{
                        position: 'absolute', top: '8px', right: '8px', fontSize: '0.5rem',
                        padding: '2px 6px', borderRadius: '6px', background: 'var(--color-sand)',
                        color: 'var(--text-muted)', fontWeight: 600,
                      }}>🔒</div>
                    )}
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%', margin: '0 auto 8px',
                      background: badge.unlocked ? `${badge.color}18` : 'var(--color-sand)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.5rem',
                      boxShadow: badge.unlocked ? `0 0 16px ${badge.color}25` : 'none',
                    }}>
                      {badge.emoji}
                    </div>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>{badge.label}</p>
                    <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>{badge.desc}</p>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ===== CREATE POST MODAL ===== */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
            onClick={() => setShowCreatePost(false)}>
            <motion.div initial={{ y: 400 }} animate={{ y: 0 }} exit={{ y: 400 }} transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%', maxWidth: '430px', background: 'white', borderRadius: '24px 24px 0 0',
                padding: '20px 20px 32px',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>Create Post</h3>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowCreatePost(false)} style={{ cursor: 'pointer' }}>
                  <X size={22} color="var(--text-muted)" />
                </motion.button>
              </div>
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="What's on your mind? Share your workout, progress, or just vibe..."
                style={{
                  width: '100%', height: '100px', borderRadius: '14px', padding: '14px',
                  background: 'var(--color-cream)', fontSize: '0.9375rem', resize: 'none',
                  color: 'var(--text-primary)', border: '1px solid var(--color-warm-beige)',
                  lineHeight: 1.5,
                }}
              />
              <div style={{ display: 'flex', gap: '10px', margin: '14px 0' }}>
                <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '10px', background: 'var(--color-sand)', fontSize: '0.8125rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <Image size={16} /> Photo
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '10px', background: 'var(--color-sand)', fontSize: '0.8125rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <MapPin size={16} /> Location
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '10px', background: 'var(--color-sand)', fontSize: '0.8125rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <Users size={16} /> Tag
                </button>
              </div>
              <Button variant="primary" size="lg" fullWidth onClick={() => { setPostText(''); setShowCreatePost(false); }}>
                <Send size={16} /> Post
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== CREATE STORY MODAL ===== */}
      <AnimatePresence>
        {showCreateStory && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setShowCreateStory(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '90%', maxWidth: '360px', borderRadius: '24px', overflow: 'hidden',
                background: 'linear-gradient(135deg, var(--color-coral) 0%, var(--color-warm-yellow) 100%)',
                padding: '40px 24px', textAlign: 'center',
              }}>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowCreateStory(false)}
                style={{ position: 'absolute', top: '16px', right: '16px', cursor: 'pointer' }}>
                <X size={24} color="white" />
              </motion.button>
              <Camera size={40} color="white" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Create Story</h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', marginBottom: '24px' }}>Share a moment from your workout!</p>
              <textarea
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                placeholder="Add a caption..."
                style={{
                  width: '100%', height: '60px', borderRadius: '12px', padding: '12px',
                  background: 'rgba(255,255,255,0.2)', fontSize: '0.9375rem', resize: 'none',
                  color: 'white', border: '1px solid rgba(255,255,255,0.3)', lineHeight: 1.5,
                }}
              />
              <div style={{ display: 'flex', gap: '10px', margin: '16px 0' }}>
                <button style={{ flex: 1, padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '0.8125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Camera size={15} /> Camera
                </button>
                <button style={{ flex: 1, padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '0.8125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Image size={15} /> Gallery
                </button>
              </div>
              <Button variant="secondary" size="lg" fullWidth onClick={() => { setStoryText(''); setShowCreateStory(false); }}>
                Share Story ✨
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
