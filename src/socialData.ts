// ========================================
// Dudo — Social Posts Data (150+)
// ========================================
import type { SocialPost } from './types';

const a = (id: number) => `https://picsum.photos/id/${id}/100/100`;
const p = (id: number) => `https://picsum.photos/id/${id}/600/400`;

const names = ['Praew','Bank','Fern','Jay','Ploy','Mint','Beam','Tong','Pim','Nat','Film','May','Aom','Bow','Top','Nid','Earth','Palm','Gam','View','Ice','Fah','Oak','Pin','Bam','Noon','Pop','Gift','Best','Pear','Wan','Kwan','Por','Nong','Tae','Net','Gig','Jo','Tan','Oat'];
const avatarIds = [65,75,26,91,21,64,77,83,95,33,36,42,48,53,58,61,66,71,76,82,87,92,97,11,14,17,22,27,32,37,41,46,51,56,62,67,72,78,84,89];
const venues = ['The Flow Studio','Fighter Lab','Rise Wellness','Peak Cycle','BURN Fitness','Vertical BKK','Chill Space','Run BKK','Zenith Yoga','Freeze Lab','RhythmBox','CrossFit Soi','Serenity Spa','Shuttle Court','Sweat Society','Body & Bean Café','Pole & Flow','Thai Boxing Academy','Boulder House','Aqua Gym'];
const imgIds = [529,685,325,338,502,450,164,367,110,247,474,399,188,334,453,225,291,487,442,165,529,685,325,338,502,450,164,367,110,247];

const activities: string[] = [
  'Sweaty, happy, strong 💪','Boxing class was NEXT LEVEL today! 🥊🔥','Recovery day 🧊💆‍♀️ Ice bath + sauna combo',
  'First time climbing and I\'m already hooked! 🧗','Spin class with the crew 🚴‍♀️🎧','Morning yoga flow 🧘 Perfect start',
  'Personal best on deadlift today!! 🏋️ 100kg','Muay Thai makes me feel alive 🥊','Sound healing session was magical ✨🎵',
  'Running club at Lumpini 🏃 6km done!','Pilates reformer is no joke 🤸','Hit my 10-day streak! 🔥🔥🔥',
  'Post-workout smoothie at Body & Bean ☕🥤','K-pop dance class was SO fun 💃','Meditation morning 🧠 Feel so calm',
  'Bouldering with the squad 🧗‍♂️👥','Sauna session hits different after training 🔥','50 tokens well spent this month!',
  'Tried aerial yoga for the first time! 🤩','CrossFit WOD absolutely destroyed me today 😅',
  'Badminton game night with friends 🏸','Swimming laps clear my mind 🏊','Thai massage workshop was amazing 💆',
  'Just booked my first ice bath! Nervous 🧊😬','Community brunch was delicious 🥞','Yoga retreat planning starts now! 🧘‍♀️✈️',
  'New PR on 5k run!! 23 minutes 🏃‍♀️🎉','Dance class therapy > actual therapy 💃😂','Rest day = spa day 🧖‍♀️',
  'Hit 30 classes this month! 🏆','Brought my friend to boxing, she loved it! 🥊','Morning meditation changed my whole week 🙏',
  'Cycling class playlist was fire 🔥🎵','Stretching session at Zenith was heavenly 🧘','Pool day at Aqua Gym 🏊‍♂️☀️',
  'Finally nailed that V5 boulder problem! 🧗✨','Pad work with Kru Dam is intense! 🥊💦','Group HIIT is so much better than solo 👥⚡',
  'Joined the running club today! Made 3 new friends 🏃👋','Reformer Pilates 3x this week 💪🤸','Sound bath had me crying (in a good way) 🎵😭',
  'Thai boxing academy is the real deal 🥊🇹🇭','Post-climb coffee is the best coffee ☕🧗','My Apple Watch says I burned 800 calories 🔥',
  'Pole fitness is way harder than it looks! 💪💃','Saturday yoga gang never misses 🧘‍♀️👯','Contrast therapy at Freeze Lab = game changer 🧊🔥',
  'Found my new favorite HIIT studio! 💥','Cycling + brunch = perfect Saturday 🚴☕','100% attendance this month 🏆✨',
  'Wellness spa day was exactly what I needed 🧖','Trying badminton for the first time tomorrow! 🏸','My trainer said I\'m ready to spar! 🥊😤',
];

function generatePosts(): SocialPost[] {
  const posts: SocialPost[] = [];
  for (let i = 0; i < 150; i++) {
    const nameIdx = i % names.length;
    const actIdx = i % activities.length;
    const venueIdx = i % venues.length;
    const imgIdx = i % imgIds.length;
    const hours = i < 10 ? i + 1 : i < 30 ? i : undefined;
    const days = i >= 30 ? Math.floor(i / 5) : undefined;
    const timeAgo = hours ? `${hours}h ago` : days ? `${days}d ago` : 'just now';

    posts.push({
      id: `s${i + 1}`,
      user: { name: names[nameIdx], avatar: a(avatarIds[nameIdx]) },
      activity: activities[actIdx],
      venue: venues[venueIdx],
      image: i % 3 !== 2 ? p(imgIds[imgIdx]) : undefined, // 2/3 posts have images
      likes: 10 + Math.floor(Math.random() * 90),
      comments: Math.floor(Math.random() * 25),
      timeAgo,
      liked: i % 7 === 0,
    });
  }
  return posts;
}

export const mockSocialPosts: SocialPost[] = generatePosts();
