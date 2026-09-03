import { useCallback, useSyncExternalStore } from "react";

export type LessonProgress = {
  stars: number;
  completedAt: string;
  attempts: number;
  secondsPlayed: number;
};

export type InProgressLesson = { stepIndex: number; mistakes: number; hearts: number };

/** Nicko's care meters. Each runs 0–100; care raises them, time decays them. */
export type PetStats = { hunger: number; happiness: number; energy: number };

export type SaveData = {
  playerName: string;
  lessons: Record<string, LessonProgress>;
  inProgress: Record<string, InProgressLesson>;
  badges: string[];
  stickers: string[];
  outfits: string[];
  equippedOutfit: string | null;
  hearts: number;
  /** Spendable arcade currency earned from mini-games. */
  fishCoins: number;
  /** Virtual-pet care meters (see pet.ts for the reducers that move them). */
  stats: PetStats;
  /** ISO timestamp of the last time stats were settled; drives time-based decay. */
  statsUpdatedAt: string;
  decorations: string[];
  trophies: string[];
  stories: string[];
  areas: string[];
  settings: { narration: boolean; sound: boolean; bigText: boolean; reducedMotion: boolean };
};

const KEY = "nicko-adventures-save-v1";

const EMPTY: SaveData = {
  playerName: "Friend",
  lessons: {},
  inProgress: {},
  badges: [],
  stickers: [],
  outfits: [],
  equippedOutfit: null,
  hearts: 0,
  fishCoins: 0,
  stats: { hunger: 80, happiness: 80, energy: 80 },
  // Left blank so it is a stable, SSR-safe constant; pet.ts stamps a real time on first settle.
  statsUpdatedAt: "",
  decorations: [],
  trophies: [],
  stories: [],
  areas: [],
  settings: { narration: true, sound: true, bigText: false, reducedMotion: false },
};

export const EMPTY_SAVE = EMPTY;

let cache: SaveData = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Recursively layer a stored save over the current defaults.
 *
 * Missing keys inherit their default, and nested plain objects (e.g. `stats`,
 * `settings`) are merged key-by-key rather than replaced wholesale — so a future
 * property added inside `stats` back-fills into older saves instead of being wiped
 * out by whatever partial object those saves happened to persist. Arrays (badges,
 * stickers, …) are treated as leaves: the saved value replaces the default entirely.
 */
function mergeSave(base: unknown, override: unknown): unknown {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override === undefined ? base : override;
  }
  const out: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    out[key] = mergeSave(base[key], override[key]);
  }
  return out;
}

function normalize(parsed: unknown): SaveData {
  return isPlainObject(parsed) ? (mergeSave(EMPTY, parsed) as SaveData) : EMPTY;
}

function read(): SaveData {
  if (typeof window === "undefined") return EMPTY;
  if (loaded) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? normalize(JSON.parse(raw)) : EMPTY;
  } catch {
    cache = EMPTY;
  }
  loaded = true;
  return cache;
}

function write(next: SaveData) {
  cache = next;
  loaded = true;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useSave() {
  const data = useSyncExternalStore(subscribe, read, () => EMPTY);

  const update = useCallback((fn: (prev: SaveData) => SaveData) => {
    write(fn(read()));
  }, []);

  return { data, update };
}

export function completeLesson(
  save: SaveData,
  opts: {
    lessonId: string;
    stars: number;
    secondsPlayed: number;
    badgeId: string;
    stickerId: string;
    outfitId?: string;
    hearts?: number;
    coins?: number;
  },
): SaveData {
  const prev = save.lessons[opts.lessonId];
  const { [opts.lessonId]: _finishedInProgress, ...remainingInProgress } = save.inProgress ?? {};
  return {
    ...save,
    hearts: (save.hearts ?? 0) + (opts.hearts ?? 0),
    fishCoins: (save.fishCoins ?? 0) + (opts.coins ?? 0),
    lessons: {
      ...save.lessons,
      [opts.lessonId]: {
        stars: Math.max(prev?.stars ?? 0, opts.stars),
        completedAt: new Date().toISOString(),
        attempts: (prev?.attempts ?? 0) + 1,
        secondsPlayed: (prev?.secondsPlayed ?? 0) + opts.secondsPlayed,
      },
    },
    inProgress: remainingInProgress,
    badges: Array.from(new Set([...save.badges, opts.badgeId])),
    stickers: Array.from(new Set([...save.stickers, opts.stickerId])),
    outfits: opts.outfitId ? Array.from(new Set([...save.outfits, opts.outfitId])) : save.outfits,
  };
}

export function totalStars(save: SaveData) {
  return Object.values(save.lessons).reduce((sum, l) => sum + l.stars, 0);
}

/**
 * Fish Coins awarded for finishing a lesson: a base of 10, plus 2 per star beyond
 * the first (10 / 12 / 14 for 1★ / 2★ / 3★). Shared by the completion handler and
 * the reward screen so the celebrated number always matches what is banked.
 */
export function coinsForStars(stars: number): number {
  return 10 + Math.max(0, stars - 1) * 2;
}
