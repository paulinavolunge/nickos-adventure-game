import { useCallback, useSyncExternalStore } from "react";

export type LessonProgress = {
  stars: number;
  completedAt: string;
  attempts: number;
  secondsPlayed: number;
};

export type SaveData = {
  playerName: string;
  lessons: Record<string, LessonProgress>;
  badges: string[];
  stickers: string[];
  outfits: string[];
  equippedOutfit: string | null;
  settings: { narration: boolean; sound: boolean; bigText: boolean; reducedMotion: boolean };
};

const KEY = "nicko-adventures-save-v1";

const EMPTY: SaveData = {
  playerName: "Friend",
  lessons: {},
  badges: [],
  stickers: [],
  outfits: [],
  equippedOutfit: null,
  settings: { narration: true, sound: true, bigText: false, reducedMotion: false },
};

let cache: SaveData = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function read(): SaveData {
  if (typeof window === "undefined") return EMPTY;
  if (loaded) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
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
  },
): SaveData {
  const prev = save.lessons[opts.lessonId];
  return {
    ...save,
    lessons: {
      ...save.lessons,
      [opts.lessonId]: {
        stars: Math.max(prev?.stars ?? 0, opts.stars),
        completedAt: new Date().toISOString(),
        attempts: (prev?.attempts ?? 0) + 1,
        secondsPlayed: (prev?.secondsPlayed ?? 0) + opts.secondsPlayed,
      },
    },
    badges: Array.from(new Set([...save.badges, opts.badgeId])),
    stickers: Array.from(new Set([...save.stickers, opts.stickerId])),
    outfits: opts.outfitId
      ? Array.from(new Set([...save.outfits, opts.outfitId]))
      : save.outfits,
  };
}

export function totalStars(save: SaveData) {
  return Object.values(save.lessons).reduce((sum, l) => sum + l.stars, 0);
}