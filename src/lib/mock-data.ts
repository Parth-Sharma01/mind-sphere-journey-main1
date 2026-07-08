// ============================================
// REALISTIC MOCK DATA FOR DASHBOARD
// ============================================

// User profile
export const userProfile = {
  name: "Aditi",
  joinDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
  lastLoginDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday
  totalXP: 1240,
  level: 7,
  coins: 480,
  currentStreak: 12,
};

// Detailed mood log with timestamps and context
export const moodLogs = [
  {
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    mood: 6,
    stress: 7,
    energy: 5,
    sleep: 6,
    focus: 7,
    notes: "Feeling restless",
  },
  {
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    mood: 7,
    stress: 6,
    energy: 6,
    sleep: 7,
    focus: 6,
    notes: "Better today",
  },
  {
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    mood: 5,
    stress: 8,
    energy: 4,
    sleep: 5,
    focus: 5,
    notes: "Stressed about work",
  },
  {
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    mood: 8,
    stress: 4,
    energy: 7,
    sleep: 8,
    focus: 8,
    notes: "Great day! Completed project",
  },
  {
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    mood: 7,
    stress: 5,
    energy: 8,
    sleep: 7,
    focus: 7,
    notes: "Feeling productive",
  },
  {
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    mood: 9,
    stress: 2,
    energy: 9,
    sleep: 8,
    focus: 8,
    notes: "Excellent! Spent time with friends",
  },
  {
    date: new Date(),
    mood: 8,
    stress: 3,
    energy: 8,
    sleep: 7,
    focus: 9,
    notes: "Good morning start",
  },
];

// Timeline with labels for UI
export const moodTimeline = [
  { day: "Mon", mood: 6, energy: 5, focus: 7 },
  { day: "Tue", mood: 7, energy: 6, focus: 6 },
  { day: "Wed", mood: 5, energy: 4, focus: 5 },
  { day: "Thu", mood: 8, energy: 7, focus: 8 },
  { day: "Fri", mood: 7, energy: 8, focus: 7 },
  { day: "Sat", mood: 9, energy: 9, focus: 8 },
  { day: "Sun", mood: 8, energy: 7, focus: 9 },
];

// Detailed wellness metrics
export const wellnessMetrics = [
  {
    name: "Mood",
    value: 78,
    color: "oklch(0.78 0.16 300)",
    description: "Based on your daily mood check-ins",
    icon: "😊",
  },
  {
    name: "Stress",
    value: 34,
    color: "oklch(0.7 0.18 25)",
    description: "Lower is better. Calculated from stress logs.",
    icon: "😰",
  },
  {
    name: "Focus",
    value: 82,
    color: "oklch(0.7 0.18 200)",
    description: "Based on focus games and consistency",
    icon: "🎯",
  },
  {
    name: "Sleep",
    value: 71,
    color: "oklch(0.7 0.18 260)",
    description: "Average sleep quality from logs",
    icon: "😴",
  },
  {
    name: "Energy",
    value: 65,
    color: "oklch(0.8 0.17 130)",
    description: "Daily energy levels",
    icon: "⚡",
  },
  {
    name: "Motivation",
    value: 74,
    color: "oklch(0.78 0.16 60)",
    description: "Based on completed activities",
    icon: "🔥",
  },
  {
    name: "Confidence",
    value: 68,
    color: "oklch(0.75 0.18 340)",
    description: "From assessment responses",
    icon: "💪",
  },
  {
    name: "Relationships",
    value: 76,
    color: "oklch(0.7 0.18 160)",
    description: "Social connection tracking",
    icon: "🤝",
  },
];

export const radarData = wellnessMetrics.map((m) => ({
  subject: m.name,
  A: m.value,
  fullMark: 100,
}));

// Assessment results with dates and scores
export const assessmentResults = [
  {
    id: 1,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    score: 72,
    answers: [
      2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 0, 1, 0, 1, 2, 1,
    ],
  },
  {
    id: 2,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    score: 78,
    answers: [
      1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0,
    ],
  },
  {
    id: 3,
    date: new Date(),
    score: 82,
    answers: [
      1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0,
    ],
  },
];

// Game completion history
export const gameHistory = [
  {
    gameSlug: "reaction-test",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    score: 245,
    xpEarned: 30,
  },
  {
    gameSlug: "memory-match",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    score: 8,
    xpEarned: 50,
  },
  {
    gameSlug: "pattern",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    score: 12,
    xpEarned: 40,
  },
  {
    gameSlug: "breathing",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    score: 8,
    xpEarned: 25,
  },
  { gameSlug: "color-focus", date: new Date(), score: 18, xpEarned: 35 },
];

// Wellness activities log
export const wellnessActivities = [
  {
    id: 1,
    type: "meditation",
    name: "Morning meditation",
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    duration: 12,
    xpEarned: 20,
  },
  {
    id: 2,
    type: "breathing",
    name: "Breathing exercise",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    duration: 5,
    xpEarned: 10,
  },
  {
    id: 3,
    type: "meditation",
    name: "Evening meditation",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    duration: 15,
    xpEarned: 20,
  },
  {
    id: 4,
    type: "breathing",
    name: "Stress relief breathing",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    duration: 8,
    xpEarned: 15,
  },
  {
    id: 5,
    type: "meditation",
    name: "Focus meditation",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    duration: 20,
    xpEarned: 25,
  },
  {
    id: 6,
    type: "meditation",
    name: "Sleep meditation",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    duration: 25,
    xpEarned: 30,
  },
  {
    id: 7,
    type: "breathing",
    name: "Morning breathing",
    date: new Date(),
    duration: 5,
    xpEarned: 10,
  },
];

// Journal entries with detailed content
export const detailedJournalEntries = [
  {
    id: 1,
    title: "A quiet morning",
    date: new Date(),
    mood: "🌤️",
    moodScore: 8,
    content:
      "Woke up early, watched the sunrise, and finally felt still. Made a list of small things I want to try this month. Feeling hopeful.",
    pinned: true,
  },
  {
    id: 2,
    title: "Overwhelmed but okay",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    mood: "🌧️",
    moodScore: 5,
    content:
      "Too many deadlines. Took a walk. Reminded myself I've handled harder weeks. Tomorrow is a new day.",
    pinned: false,
  },
  {
    id: 3,
    title: "Coffee with an old friend",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    mood: "🌸",
    moodScore: 9,
    content:
      "Two hours felt like ten minutes. I forget how much old friendships fill me up. We laughed so much.",
    pinned: true,
  },
  {
    id: 4,
    title: "Bad sleep, good day",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    mood: "⛅",
    moodScore: 7,
    content:
      "Rough night but somehow the day worked out. Body and mind aren't always in sync. Coffee helped!",
    pinned: false,
  },
];

// Enhanced achievements with detailed unlock criteria
export const detailedAchievements = [
  {
    id: 1,
    title: "Early Bird",
    desc: "Completed morning check-in for 7 consecutive days",
    icon: "🌅",
    unlocked: true,
    progress: 7,
    target: 7,
    unlockedDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    title: "Streak Master",
    desc: "Maintained a 12-day wellness streak",
    icon: "🔥",
    unlocked: true,
    progress: userProfile.currentStreak,
    target: 12,
    unlockedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    id: 3,
    title: "Mindful Explorer",
    desc: "Completed 20 meditation sessions",
    icon: "🧘",
    unlocked: true,
    progress: 32,
    target: 20,
    unlockedDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
  },
  {
    id: 4,
    title: "Journal Keeper",
    desc: "Created 50 journal entries",
    icon: "📖",
    unlocked: false,
    progress: 18,
    target: 50,
  },
  {
    id: 5,
    title: "Game Champion",
    desc: "Complete 5 different games",
    icon: "🏆",
    unlocked: false,
    progress: 4,
    target: 5,
  },
  {
    id: 6,
    title: "Community Star",
    desc: "Get 100 community likes",
    icon: "⭐",
    unlocked: false,
    progress: 34,
    target: 100,
  },
];

// Enhanced daily goals with descriptions and XP multipliers
export const detailedDailyGoals = [
  {
    id: 1,
    title: "Morning Meditation",
    description: "Improve relaxation before starting your day",
    xp: 20,
    done: true,
    category: "mindfulness",
    emoji: "🧘",
  },
  {
    id: 2,
    title: "Mood Check-in",
    description: "Track how you're feeling to identify patterns",
    xp: 10,
    done: true,
    category: "tracking",
    emoji: "😊",
  },
  {
    id: 3,
    title: "Journal Entry",
    description: "Writing helps identify emotional patterns",
    xp: 25,
    done: false,
    category: "reflection",
    emoji: "📖",
  },
  {
    id: 4,
    title: "Play Mini-Game",
    description: "Improve concentration and attention",
    xp: 15,
    done: false,
    category: "games",
    emoji: "🎮",
  },
  {
    id: 5,
    title: "Chat with AI Coach",
    description: "Receive personalized wellness guidance",
    xp: 30,
    done: false,
    category: "coaching",
    emoji: "🤖",
  },
];

// Personalized recommendations based on data
export const recommendations = [
  {
    title: "5-Minute Breathing Exercise",
    description: "Your stress level increased yesterday. Quick breathing can help reset.",
    reason: "stress_increase",
    emoji: "🌬️",
    link: "/meditation",
    priority: "high",
  },
  {
    title: "Reaction Challenge",
    description: "Your focus score dipped. Games improve concentration.",
    reason: "focus_dip",
    emoji: "⚡",
    link: "/games",
    priority: "medium",
  },
  {
    title: "Gratitude Journal",
    description: "Reflect on positive experiences today to boost mood",
    reason: "mood_boost",
    emoji: "📖",
    link: "/journal",
    priority: "medium",
  },
  {
    title: "Sleep Quality Check",
    description: "Your sleep was lower this week. Let's improve it.",
    reason: "sleep_low",
    emoji: "😴",
    link: "/meditation?type=sleep",
    priority: "medium",
  },
];

// Use detailed versions as primary export
export const achievements = detailedAchievements;
export const dailyGoals = detailedDailyGoals;
export const journalEntries = detailedJournalEntries;

export const assessmentQuestions = [
  {
    q: "How would you describe your energy this morning?",
    options: ["🌅 Full of life", "☀️ Steady", "☁️ A bit low", "🌧️ Drained"],
  },
  {
    q: "Last night's sleep felt...",
    options: ["😴 Deep & restful", "🙂 Okay", "😕 Restless", "😩 Barely slept"],
  },
  {
    q: "When you think about today, you feel...",
    options: ["✨ Excited", "😌 Calm", "😐 Neutral", "😟 Anxious"],
  },
  {
    q: "How focused have you been lately?",
    options: ["🎯 Laser sharp", "👀 Mostly focused", "🌫️ Scattered", "🌀 All over"],
  },
  {
    q: "Social energy right now?",
    options: ["🤗 Want people", "🙂 Some contact", "🚪 Prefer alone", "🛌 Isolated"],
  },
  {
    q: "How is your appetite?",
    options: ["🍎 Balanced", "🍔 Cravings", "🥗 Light", "🚫 Skipping meals"],
  },
  {
    q: "Physical movement today?",
    options: ["🏃 Active", "🚶 Some walking", "💺 Mostly sitting", "🛏️ Barely moved"],
  },
  {
    q: "When facing setbacks, you...",
    options: ["💪 Bounce back", "🧘 Take a breath", "😔 Feel stuck", "😞 Spiral"],
  },
  {
    q: "Your inner voice today is...",
    options: ["💖 Kind", "🙂 Neutral", "😬 Critical", "🖤 Harsh"],
  },
  {
    q: "Screen time feels...",
    options: ["✅ Balanced", "📱 A bit much", "⏰ Too much", "🌪️ Doomscrolling"],
  },
  {
    q: "Are you looking forward to something?",
    options: ["🎉 Yes, a lot", "🌱 Something small", "🤷 Not really", "🕳️ Nothing"],
  },
  {
    q: "Studies / work feel...",
    options: ["🚀 Motivating", "📚 Manageable", "😵 Overwhelming", "💀 Crushing"],
  },
  { q: "Ability to relax?", options: ["🛋️ Very easy", "🌿 Sometimes", "🎢 Rarely", "❌ Never"] },
  {
    q: "Feelings toward the future?",
    options: ["🌈 Hopeful", "🌤️ Cautious", "⛅ Uncertain", "🌫️ Bleak"],
  },
  {
    q: "Concentration in class/work?",
    options: ["🎯 Sharp", "👍 Okay", "😵 Fuzzy", "🌀 Impossible"],
  },
  { q: "Any physical tension?", options: ["😌 None", "🙂 Little", "😣 Noticeable", "🥵 Constant"] },
  {
    q: "Emotional volatility?",
    options: ["🧊 Steady", "🌊 Some waves", "🎢 Roller-coaster", "🌪️ Chaotic"],
  },
  { q: "Sense of purpose?", options: ["✨ Clear", "🧭 Emerging", "🌫️ Foggy", "🕳️ Missing"] },
  { q: "Connection with friends?", options: ["🤝 Strong", "👋 Casual", "😶 Distant", "💔 Absent"] },
  { q: "How often do you laugh?", options: ["😂 A lot", "😊 Daily", "🙂 Sometimes", "😑 Rarely"] },
  { q: "Your creativity feels...", options: ["🎨 Flowing", "✏️ Present", "📉 Blocked", "⛔ Gone"] },
  { q: "Ability to say no?", options: ["✋ Confident", "🙂 Usually", "😬 Struggle", "🙈 Can't"] },
  { q: "Do you feel understood?", options: ["💞 Deeply", "🙂 Somewhat", "😕 Rarely", "😔 Never"] },
  { q: "Small joys today?", options: ["🌸 Many", "☕ A few", "🤏 One", "🚫 None"] },
  {
    q: "Comparison to others?",
    options: ["🙌 Inspired", "🤔 Curious", "😔 Hurts", "🔥 Consumes me"],
  },
  { q: "Rest without guilt?", options: ["😇 Yes", "🙂 Mostly", "😬 Hard", "❌ Impossible"] },
  { q: "Do you journal thoughts?", options: ["📖 Often", "✏️ Sometimes", "🤷 Rarely", "🚫 Never"] },
  { q: "Confidence in yourself?", options: ["🦁 High", "🙂 Fair", "🐢 Low", "🐭 None"] },
  { q: "Ability to ask for help?", options: ["🤝 Easy", "🙂 Sometimes", "😬 Hard", "🚫 Never"] },
  { q: "Overall, this week you feel...", options: ["🌟 Great", "🙂 Good", "😐 Meh", "🌧️ Rough"] },
];

export const games = [
  {
    slug: "memory-match",
    title: "Memory Match",
    desc: "Flip cards to find pairs",
    icon: "🃏",
    xp: 50,
    color: "from-fuchsia-500 to-purple-600",
  },
  {
    slug: "reaction-test",
    title: "Reaction Test",
    desc: "Tap the moment it turns green",
    icon: "⚡",
    xp: 30,
    color: "from-cyan-500 to-blue-600",
  },
  {
    slug: "pattern",
    title: "Pattern Recognition",
    desc: "Repeat the sequence",
    icon: "🧩",
    xp: 40,
    color: "from-emerald-500 to-teal-600",
  },
  {
    slug: "color-focus",
    title: "Color Focus",
    desc: "Tap only the target color",
    icon: "🎨",
    xp: 35,
    color: "from-rose-500 to-pink-600",
  },
  {
    slug: "breathing",
    title: "Breathing Exercise",
    desc: "Follow the calming orb",
    icon: "🌬️",
    xp: 25,
    color: "from-sky-400 to-indigo-500",
  },
  {
    slug: "balloon",
    title: "Stress Balloon",
    desc: "Pop to release tension",
    icon: "🎈",
    xp: 20,
    color: "from-orange-400 to-red-500",
  },
  {
    slug: "emotion",
    title: "Emotion Recognition",
    desc: "Match the feeling to the face",
    icon: "😊",
    xp: 45,
    color: "from-yellow-400 to-amber-500",
  },
  {
    slug: "attention",
    title: "Attention Challenge",
    desc: "Spot the odd one out",
    icon: "👁️",
    xp: 40,
    color: "from-violet-500 to-fuchsia-500",
  },
];

export const communityPosts = [
  {
    id: 1,
    author: "Nebula47",
    avatar: "🌌",
    time: "2h",
    content: "Finally hit a 14-day meditation streak. Small wins matter.",
    likes: 128,
    comments: 22,
    tag: "wins",
  },
  {
    id: 2,
    author: "QuietFern",
    avatar: "🌿",
    time: "5h",
    content: "Exams are eating me alive. How do you all decompress?",
    likes: 84,
    comments: 41,
    tag: "ask",
  },
  {
    id: 3,
    author: "SolarWave",
    avatar: "🌞",
    time: "8h",
    content: "Started a 5-min morning journal. It's genuinely helping.",
    likes: 210,
    comments: 18,
    tag: "tip",
  },
  {
    id: 4,
    author: "MoonRider",
    avatar: "🌙",
    time: "1d",
    content: "My Mind Score jumped 12 points this week. Consistency wins.",
    likes: 156,
    comments: 30,
    tag: "wins",
  },
  {
    id: 5,
    author: "EmberBloom",
    avatar: "🔥",
    time: "1d",
    content: "Anyone else find the Breathing game oddly addictive?",
    likes: 92,
    comments: 27,
    tag: "chat",
  },
];

export const meditationSounds = [
  {
    title: "Forest",
    desc: "Birdsong & rustling leaves",
    duration: "12 min",
    icon: "🌲",
    color: "from-emerald-500 to-green-700",
  },
  {
    title: "Ocean",
    desc: "Slow rolling waves",
    duration: "20 min",
    icon: "🌊",
    color: "from-cyan-500 to-blue-700",
  },
  {
    title: "Rain",
    desc: "Gentle rainfall",
    duration: "15 min",
    icon: "🌧️",
    color: "from-slate-400 to-slate-700",
  },
  {
    title: "Focus",
    desc: "Ambient soundscape",
    duration: "25 min",
    icon: "🎧",
    color: "from-fuchsia-500 to-purple-700",
  },
  {
    title: "Sleep",
    desc: "Deep sleep waves",
    duration: "45 min",
    icon: "🌙",
    color: "from-indigo-500 to-violet-800",
  },
  {
    title: "Breathing",
    desc: "Box breathing 4-4-4-4",
    duration: "8 min",
    icon: "🌬️",
    color: "from-sky-400 to-indigo-600",
  },
  {
    title: "Nature",
    desc: "Distant wind & river",
    duration: "18 min",
    icon: "🍃",
    color: "from-teal-500 to-emerald-700",
  },
];

export const aiSuggestions = [
  "I'm feeling anxious about exams",
  "Help me build a study routine",
  "Guide me through breathing",
  "Why can't I sleep well lately?",
  "Give me a daily affirmation",
];

export const monthlyHeatmap = Array.from({ length: 35 }, (_, i) => ({
  day: i + 1,
  value: Math.floor(Math.random() * 5),
}));

// ============================================
// UTILITY FUNCTIONS FOR SCORE CALCULATIONS
// ============================================

/**
 * Calculate overall wellness score from multiple sources
 */
export function calculateWellnessScore(): number {
  const today = moodLogs[moodLogs.length - 1];
  const weights = {
    mood: 0.25,
    stress: 0.15,
    sleep: 0.2,
    focus: 0.2,
    energy: 0.1,
    // Assuming motivation based on activities
    motivation: 0.1,
  };

  const score =
    today.mood * 10 * weights.mood +
    (100 - today.stress * 10) * weights.stress +
    today.sleep * 10 * weights.sleep +
    today.focus * 10 * weights.focus +
    today.energy * 10 * weights.energy +
    (userProfile.currentStreak / 15) * 100 * weights.motivation;

  return Math.min(100, Math.max(0, score / 10));
}

/**
 * Get today's mood with comparison to yesterday
 */
export function getTodayMood(): { score: number; comparison: number; emoji: string } {
  const today = moodLogs[moodLogs.length - 1];
  const yesterday = moodLogs[moodLogs.length - 2];
  const comparison = today.mood - yesterday.mood;
  const moods = ["😞", "😕", "😐", "🙂", "😊", "😄", "😆", "😁", "🤩", "🌟"];
  const emoji = moods[Math.floor(today.mood)];

  return {
    score: today.mood,
    comparison,
    emoji,
  };
}

/**
 * Calculate focus score from games and consistency
 */
export function calculateFocusScore(): number {
  const weeklyFocusValues = moodTimeline.map((m) => m.focus);
  const avgFocus = weeklyFocusValues.reduce((a, b) => a + b) / weeklyFocusValues.length;
  const gameBonus = gameHistory.length * 2;
  return Math.min(100, avgFocus + gameBonus);
}

/**
 * Get XP to next level
 */
export function getXPToNextLevel(): number {
  const nextLevelXP = (userProfile.level + 1) * 200;
  return nextLevelXP - userProfile.totalXP;
}

/**
 * Get last login info formatted
 */
export function getLastLoginInfo(): string {
  const now = new Date();
  const lastLogin = userProfile.lastLoginDate;
  const diffMs = now.getTime() - lastLogin.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else if (diffDays === 1) {
    return "Yesterday";
  } else {
    return `${diffDays} days ago`;
  }
}

/**
 * Get today's progress percentage (completed goals)
 */
export function getTodayProgressPercentage(): number {
  const completedGoals = detailedDailyGoals.filter((g) => g.done).length;
  return Math.floor((completedGoals / detailedDailyGoals.length) * 100);
}

/**
 * Get total XP from completed activities today
 */
export function getTodayXPEarned(): number {
  return detailedDailyGoals.filter((g) => g.done).reduce((sum, g) => sum + g.xp, 0);
}

/**
 * Generate smart recommendations based on wellness metrics
 */
export function getSmartRecommendations() {
  const today = moodLogs[moodLogs.length - 1];
  const yesterday = moodLogs[moodLogs.length - 2];
  const thisWeekAvg = moodLogs.slice(-7).reduce((sum, m) => sum + m.mood, 0) / 7;

  const recs: typeof recommendations = [];

  // If stress increased significantly
  if (today.stress > yesterday.stress + 2) {
    recs.push({
      title: "Stress Relief Session",
      description: "Your stress increased. Try a quick breathing exercise.",
      reason: "stress_increase",
      emoji: "🌬️",
      link: "/meditation",
      priority: "high",
    });
  }

  // If focus is low
  if (today.focus < 5) {
    recs.push({
      title: "Focus Boost Game",
      description: "Play a quick game to improve concentration.",
      reason: "focus_dip",
      emoji: "⚡",
      link: "/games",
      priority: "high",
    });
  }

  // If mood is good, reinforce with reflection
  if (today.mood > 7 && today.mood > thisWeekAvg) {
    recs.push({
      title: "Gratitude Journal",
      description: "Capture this great mood in writing.",
      reason: "mood_boost",
      emoji: "📖",
      link: "/journal",
      priority: "medium",
    });
  }

  // If sleep is low
  if (today.sleep < 6) {
    recs.push({
      title: "Sleep Meditation",
      description: "Prepare for better sleep tonight.",
      reason: "sleep_low",
      emoji: "😴",
      link: "/meditation",
      priority: "medium",
    });
  }

  return recs;
}

/**
 * Get mood trend for the week
 */
export function getMoodTrend(): "up" | "down" | "stable" {
  const week = moodLogs.slice(-7);
  const firstHalf = week.slice(0, 4).reduce((a, m) => a + m.mood, 0) / 4;
  const secondHalf = week.slice(-3).reduce((a, m) => a + m.mood, 0) / 3;

  if (secondHalf > firstHalf + 0.5) return "up";
  if (secondHalf < firstHalf - 0.5) return "down";
  return "stable";
}
