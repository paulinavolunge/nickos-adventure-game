import { LESSONS } from "./lessons";

/**
 * The Fish Coin shop.
 *
 * Two kinds of item:
 *  - snacks   → spend coins, then feed Nicko (bigger boosts than the free room foods)
 *  - cosmetics → spend coins once to unlock into `outfits`, then equip via `equippedOutfit`
 *
 * Cosmetic ids are prefixed `shop-` so they never collide with the outfit ids that
 * lessons award. Purchase/equip logic lives in the shop route; this module is just
 * the catalog plus a shared outfit resolver.
 */

export type ShopSnack = {
  kind: "snack";
  id: string;
  name: string;
  emoji: string;
  price: number;
  /** Hunger restored when eaten. */
  hunger: number;
};

export type ShopCosmetic = {
  kind: "cosmetic";
  id: string;
  name: string;
  emoji: string;
  price: number;
};

export type ShopItem = ShopSnack | ShopCosmetic;

export const SHOP_SNACKS: ShopSnack[] = [
  { kind: "snack", id: "icecream", name: "Ice Cream", emoji: "🍦", price: 6, hunger: 30 },
  { kind: "snack", id: "sushi", name: "Sushi Plate", emoji: "🍣", price: 8, hunger: 40 },
  { kind: "snack", id: "cake", name: "Big Cake", emoji: "🎂", price: 12, hunger: 60 },
];

export const SHOP_COSMETICS: ShopCosmetic[] = [
  { kind: "cosmetic", id: "shop-bowtie", name: "Bow Tie", emoji: "🎀", price: 8 },
  { kind: "cosmetic", id: "shop-shades", name: "Cool Shades", emoji: "🕶️", price: 10 },
  { kind: "cosmetic", id: "shop-scarf", name: "Cozy Scarf", emoji: "🧣", price: 12 },
  { kind: "cosmetic", id: "shop-tophat", name: "Top Hat", emoji: "🎩", price: 15 },
  { kind: "cosmetic", id: "shop-crown", name: "Gold Crown", emoji: "👑", price: 20 },
];

/** A wearable Nicko can equip, whether earned from a lesson or bought in the shop. */
export type OutfitDef = { id: string; name: string; emoji: string };

const LESSON_OUTFITS: OutfitDef[] = LESSONS.flatMap((l) => (l.outfit ? [l.outfit] : []));

/** Every outfit in the game, from any source. */
export const ALL_OUTFITS: OutfitDef[] = [
  ...LESSON_OUTFITS,
  ...SHOP_COSMETICS.map(({ id, name, emoji }) => ({ id, name, emoji })),
];

/** Resolve an equipped outfit id to its display info, or null if unknown. */
export function outfitById(id: string | null): OutfitDef | null {
  if (!id) return null;
  return ALL_OUTFITS.find((o) => o.id === id) ?? null;
}
