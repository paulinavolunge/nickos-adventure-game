export type HeartReward = {
  id: string;
  hearts: number;
  kind: "badge" | "outfit" | "sticker" | "decoration" | "trophy" | "area" | "story";
  name: string;
  emoji: string;
  blurb: string;
};

/** Milestones unlock automatically as the friendship meter grows. */
export const HEART_MILESTONES: HeartReward[] = [
  { id: "first-friend", hearts: 10, kind: "badge", name: "First Friend", emoji: "💛", blurb: "Nicko feels safe with you." },
  { id: "cozy-rug", hearts: 20, kind: "decoration", name: "Cozy Rug", emoji: "🧶", blurb: "A soft rug for Nicko's room." },
  { id: "explorer-cape", hearts: 35, kind: "outfit", name: "Explorer Cape", emoji: "🧣", blurb: "Nicko can dress like a hero." },
  { id: "sunny-window", hearts: 50, kind: "decoration", name: "Sunny Window", emoji: "🪟", blurb: "Nicko's favorite napping spot." },
  { id: "story-campfire", hearts: 70, kind: "story", name: "Campfire Story", emoji: "🔥", blurb: "Nicko tells you about his bravest day." },
  { id: "park-area", hearts: 90, kind: "area", name: "Sunny Park", emoji: "🌳", blurb: "A brand new place to explore." },
  { id: "golden-trophy", hearts: 120, kind: "trophy", name: "Golden Heart Trophy", emoji: "🏆", blurb: "Nicko's happiest day ever." },
];

export const HEART_LEVELS = [
  { min: 0, name: "New Pal", mood: "😺", line: "Hi! Want to be my friend?" },
  { min: 10, name: "Good Friend", mood: "😸", line: "You make my whiskers wiggle!" },
  { min: 35, name: "Best Buddy", mood: "😻", line: "I feel brave when you're here." },
  { min: 70, name: "Heart Hero", mood: "🥰", line: "You're my very best friend!" },
  { min: 120, name: "Forever Family", mood: "😽", line: "My heart is all the way full!" },
];

export function heartLevel(hearts: number) {
  return [...HEART_LEVELS].reverse().find((l) => hearts >= l.min) ?? HEART_LEVELS[0];
}

export function nextMilestone(hearts: number) {
  return HEART_MILESTONES.find((m) => m.hearts > hearts) ?? null;
}

export function unlockedMilestones(hearts: number) {
  return HEART_MILESTONES.filter((m) => m.hearts <= hearts);
}

/** Progress (0-1) toward the next milestone. */
export function milestoneProgress(hearts: number) {
  const next = nextMilestone(hearts);
  if (!next) return 1;
  const prev = [...HEART_MILESTONES].reverse().find((m) => m.hearts <= hearts)?.hearts ?? 0;
  return Math.min(1, Math.max(0, (hearts - prev) / (next.hearts - prev)));
}
