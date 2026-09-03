import type { PetStats, SaveData } from "./progress";

/**
 * Pure reducers for Nicko's virtual-pet loop.
 *
 * Every function takes a `SaveData` and returns a new one, so they compose
 * cleanly through `useSave().update(...)`. Nothing here reads the clock except
 * through the injected `now` argument, which keeps the reducers deterministic
 * and safe to unit-test.
 *
 * Care actions (feed/play/rest) move the meters; the coin helpers (earnCoins/
 * spendCoins) move the currency. They are kept separate so the room UI can
 * compose them — e.g. "buy a snack" = spendCoins + feed — without this module
 * baking in any particular shop pricing.
 */

export const STAT_MIN = 0;
export const STAT_MAX = 100;

/** Time decay never drags a meter below this — Nicko is never fully starving. */
export const DECAY_FLOOR = 20;

/** Points lost per real hour away, per meter. Hunger fades fastest. */
export const DECAY_PER_HOUR: PetStats = { hunger: 8, happiness: 5, energy: 6 };

/** Default boosts for each care action. */
export const CARE_AMOUNTS = { feed: 25, play: 20, rest: 30 } as const;

/** Playing is fun but tiring: happiness up, a little energy spent. */
export const PLAY_ENERGY_COST = 10;

const MS_PER_HOUR = 3_600_000;

const clamp = (value: number, min = STAT_MIN, max = STAT_MAX) =>
  Math.max(min, Math.min(max, value));

const iso = (now: number) => new Date(now).toISOString();

/**
 * Settle time-based decay up to `now`.
 *
 * Stats are stored at full precision and only rounded for display, so calling
 * this frequently never "starves" the decay: each call subtracts exactly the
 * elapsed fraction and advances the timestamp, leaving no lost remainder.
 * Meters at or below {@link DECAY_FLOOR} stay put — the floor guarantees they
 * never reach zero.
 */
export function decayStats(save: SaveData, now: number = Date.now()): SaveData {
  const parsedLast = Date.parse(save.statsUpdatedAt);
  const last = Number.isFinite(parsedLast) ? parsedLast : now;
  const hours = (now - last) / MS_PER_HOUR;

  // First-ever settle, or a clock that jumped backwards: don't decay, just
  // establish a baseline timestamp so future elapsed time is measured cleanly.
  if (hours <= 0) {
    return save.statsUpdatedAt ? save : { ...save, statsUpdatedAt: iso(now) };
  }

  const drop = (value: number, ratePerHour: number) =>
    value <= DECAY_FLOOR ? value : Math.max(DECAY_FLOOR, value - ratePerHour * hours);

  const stats: PetStats = {
    hunger: drop(save.stats.hunger, DECAY_PER_HOUR.hunger),
    happiness: drop(save.stats.happiness, DECAY_PER_HOUR.happiness),
    energy: drop(save.stats.energy, DECAY_PER_HOUR.energy),
  };

  const unchanged =
    stats.hunger === save.stats.hunger &&
    stats.happiness === save.stats.happiness &&
    stats.energy === save.stats.energy;

  // Everything already at the floor: keep the old timestamp so we don't churn
  // writes, and so accrued time isn't silently discarded.
  if (unchanged) return save;

  return { ...save, stats, statsUpdatedAt: iso(now) };
}

/**
 * Apply a stat boost on top of an already-decayed save, clamping every meter
 * and re-stamping the baseline so the interaction "resets the clock".
 */
function applyCare(base: SaveData, now: number, patch: Partial<PetStats>): SaveData {
  return {
    ...base,
    stats: {
      hunger: clamp(patch.hunger ?? base.stats.hunger),
      happiness: clamp(patch.happiness ?? base.stats.happiness),
      energy: clamp(patch.energy ?? base.stats.energy),
    },
    statsUpdatedAt: iso(now),
  };
}

export function feed(
  save: SaveData,
  now: number = Date.now(),
  amount: number = CARE_AMOUNTS.feed,
): SaveData {
  const base = decayStats(save, now);
  return applyCare(base, now, { hunger: base.stats.hunger + amount });
}

export function play(
  save: SaveData,
  now: number = Date.now(),
  amount: number = CARE_AMOUNTS.play,
): SaveData {
  const base = decayStats(save, now);
  return applyCare(base, now, {
    happiness: base.stats.happiness + amount,
    energy: base.stats.energy - PLAY_ENERGY_COST,
  });
}

export function rest(
  save: SaveData,
  now: number = Date.now(),
  amount: number = CARE_AMOUNTS.rest,
): SaveData {
  const base = decayStats(save, now);
  return applyCare(base, now, { energy: base.stats.energy + amount });
}

/** Small happiness bump for tapping/cuddling Nicko — no energy cost, so it stays fun on repeat. */
export const AFFECTION_AMOUNT = 6;

export function pet(
  save: SaveData,
  now: number = Date.now(),
  amount: number = AFFECTION_AMOUNT,
): SaveData {
  const base = decayStats(save, now);
  return applyCare(base, now, { happiness: base.stats.happiness + amount });
}

/** True when Nicko has at least `amount` Fish Coins. */
export function canAfford(save: SaveData, amount: number): boolean {
  return (save.fishCoins ?? 0) >= amount;
}

/** Add Fish Coins. Ignores non-positive or non-finite amounts. */
export function earnCoins(save: SaveData, amount: number): SaveData {
  if (!Number.isFinite(amount) || amount <= 0) return save;
  return { ...save, fishCoins: (save.fishCoins ?? 0) + Math.floor(amount) };
}

/**
 * Spend Fish Coins. A no-op (returns the same save) when the amount is invalid
 * or unaffordable, so the balance can never go negative. Check {@link canAfford}
 * first if the caller needs to branch on success.
 */
export function spendCoins(save: SaveData, amount: number): SaveData {
  if (!Number.isFinite(amount) || amount <= 0) return save;
  if (!canAfford(save, amount)) return save;
  return { ...save, fishCoins: (save.fishCoins ?? 0) - Math.floor(amount) };
}
