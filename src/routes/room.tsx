import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Apple,
  Coins,
  Gamepad2,
  Heart,
  Home,
  Moon,
  ShoppingBag,
  Sparkles,
  Utensils,
  Zap,
} from "lucide-react";
import nickoAsset from "@/assets/nicko.png.asset.json";
const nicko = nickoAsset.url;
import { BigButton } from "@/components/game/BigButton";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CARE_AMOUNTS, decayStats, feed, pet, rest } from "@/game/pet";
import { useSave } from "@/game/progress";
import { outfitById } from "@/game/shop";
import { useSfx } from "@/game/useSfx";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/room")({
  head: () => ({
    meta: [
      { title: "Nicko's Room — Feed, Play & Care" },
      {
        name: "description",
        content:
          "Take care of Nicko! Keep him fed, happy, and rested, spend your Fish Coins, and play mini-games to earn more.",
      },
      { property: "og:title", content: "Nicko's Room — Feed, Play & Care" },
      {
        property: "og:description",
        content: "Feed Nicko, play together, and watch his happiness grow.",
      },
    ],
  }),
  component: RoomScreen,
});

type Food = { id: string; emoji: string; name: string; amount: number };

const FOODS: Food[] = [
  { id: "fish", emoji: "🐟", name: "Fish", amount: CARE_AMOUNTS.feed },
  { id: "milk", emoji: "🥛", name: "Milk", amount: 15 },
  { id: "apple", emoji: "🍎", name: "Apple", amount: 20 },
  { id: "treat", emoji: "🍪", name: "Treat", amount: 30 },
];

type Particle = { id: number; emoji: string; left: number };

function RoomScreen() {
  const { data, update } = useSave();
  const sfx = useSfx();

  const [particles, setParticles] = useState<Particle[]>([]);
  const [feedOpen, setFeedOpen] = useState(false);
  const nextId = useRef(0);
  const stageRef = useRef<HTMLSpanElement>(null);

  // Settle time-based decay once when the room opens, so meters reflect any time away.
  useEffect(() => {
    update((save) => decayStats(save, Date.now()));
  }, [update]);

  const spawn = useCallback((emoji: string, count = 3) => {
    const born: Particle[] = Array.from({ length: count }, () => ({
      id: nextId.current++,
      emoji,
      left: 50 + (Math.random() * 60 - 30),
    }));
    setParticles((prev) => [...prev, ...born]);
    const ids = new Set(born.map((p) => p.id));
    window.setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !ids.has(p.id)));
    }, 1000);
  }, []);

  const bounce = useCallback(() => {
    const el = stageRef.current;
    if (!el) return;
    el.classList.remove("nicko-tap");
    void el.offsetWidth; // reflow so the animation restarts on rapid taps
    el.classList.add("nicko-tap");
  }, []);

  const handleTap = useCallback(() => {
    bounce();
    spawn("❤️", 3);
    sfx("heart");
    update((save) => pet(save, Date.now()));
  }, [bounce, spawn, sfx, update]);

  const handleFeed = useCallback(
    (food: Food) => {
      setFeedOpen(false);
      spawn(food.emoji, 4);
      sfx("good");
      update((save) => feed(save, Date.now(), food.amount));
    },
    [spawn, sfx, update],
  );

  const handleRest = useCallback(() => {
    spawn("💤", 3);
    sfx("good");
    update((save) => rest(save, Date.now()));
  }, [spawn, sfx, update]);

  const outfit = outfitById(data.equippedOutfit);

  return (
    <main
      className={`mx-auto w-full max-w-md space-y-4 px-4 py-5 pb-32 ${
        data.settings.bigText ? "text-lg" : ""
      }`}
    >
      <header className="grid grid-cols-[minmax(0,1fr)_auto_auto_auto] items-center gap-2">
        <Link
          to="/shop"
          className="toy-card flex items-center gap-2 px-4 py-2"
          aria-label={`Open the shop — you have ${data.fishCoins} Fish Coins`}
        >
          <Coins aria-hidden className="h-6 w-6 shrink-0 text-sunny" style={{ fill: "gold" }} />
          <span className="font-display text-xl font-black tabular-nums">{data.fishCoins}</span>
        </Link>
        <Link to="/shop" aria-label="Open the Fish Coin shop">
          <BigButton variant="sunny" size="icon">
            <ShoppingBag aria-hidden className="h-6 w-6" />
          </BigButton>
        </Link>
        <Link to="/rewards" aria-label="Open Nicko's reward room">
          <BigButton variant="grape" size="icon">
            <Sparkles aria-hidden className="h-6 w-6" />
          </BigButton>
        </Link>
        <Link to="/" aria-label="Back to title screen">
          <BigButton variant="quiet" size="icon">
            <Home aria-hidden className="h-6 w-6" />
          </BigButton>
        </Link>
      </header>

      {/* Stat meters */}
      <section className="toy-card space-y-3 p-4" aria-label="Nicko's stats">
        <Meter
          icon={<Apple aria-hidden className="h-5 w-5" />}
          label="Hunger"
          value={data.stats.hunger}
          color="oklch(0.72 0.19 45)"
        />
        <Meter
          icon={<Heart aria-hidden className="h-5 w-5" />}
          label="Happiness"
          value={data.stats.happiness}
          color="oklch(0.72 0.18 350)"
        />
        <Meter
          icon={<Zap aria-hidden className="h-5 w-5" />}
          label="Energy"
          value={data.stats.energy}
          color="oklch(0.86 0.17 88)"
        />
      </section>

      {/* Nicko's stage */}
      <section
        className="toy-card relative flex h-72 items-end justify-center overflow-hidden"
        style={{ background: "linear-gradient(180deg, oklch(0.93 0.06 90), oklch(0.9 0.08 25))" }}
      >
        <span aria-hidden className="absolute left-5 top-5 text-3xl wiggle">
          {data.hearts >= 20 ? "🧶" : "✨"}
        </span>
        <span aria-hidden className="absolute right-5 top-5 text-3xl wiggle">
          {data.hearts >= 50 ? "🪟" : "☀️"}
        </span>

        {/* floor */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-16"
          style={{ background: "oklch(0.85 0.06 70)" }}
        />

        {/* tap-to-pet target */}
        <button
          type="button"
          onClick={handleTap}
          aria-label="Pet Nicko to make him happy"
          className="relative z-10 mb-4 rounded-full outline-offset-8 transition-transform active:scale-95"
        >
          <span ref={stageRef} className="relative inline-block">
            <img
              src={nicko}
              alt="Nicko the gray tabby cat, waiting to play in his room"
              width={1024}
              height={1024}
              className="w-44 select-none object-contain bob feather-round drop-shadow-xl"
              draggable={false}
            />
            {outfit && (
              <span
                aria-label={`Wearing ${outfit.name}`}
                className="pop-in absolute -right-1 top-2 text-4xl drop-shadow"
              >
                {outfit.emoji}
              </span>
            )}
          </span>
        </button>

        {/* floating particles */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
          {particles.map((p) => (
            <span
              key={p.id}
              className="float-up absolute bottom-24 text-3xl"
              style={{ left: `${p.left}%`, transform: "translateX(-50%)" }}
            >
              {p.emoji}
            </span>
          ))}
        </div>
      </section>

      <p className="text-center text-sm font-bold text-muted-foreground">
        👆 Tap Nicko to say hello!
      </p>

      {/* Action dock */}
      <div className="fixed inset-x-0 bottom-0 z-30">
        <div className="mx-auto flex max-w-md items-stretch gap-3 px-4 pb-4">
          <BigButton
            variant="sunny"
            className="flex-1 flex-col gap-1 py-3"
            onClick={() => setFeedOpen(true)}
            aria-label="Feed Nicko"
          >
            <Utensils aria-hidden className="h-7 w-7" />
            <span className="text-sm">Feed</span>
          </BigButton>
          <BigButton
            variant="grape"
            className="flex-1 flex-col gap-1 py-3"
            onClick={handleRest}
            aria-label="Let Nicko rest"
          >
            <Moon aria-hidden className="h-7 w-7" />
            <span className="text-sm">Rest</span>
          </BigButton>
          <Link to="/map" className="flex-[1.4]" aria-label="Play mini-games to earn Fish Coins">
            <BigButton variant="coral" className="w-full flex-col gap-1 py-3">
              <Gamepad2 aria-hidden className="h-8 w-8" />
              <span className="text-sm">Play</span>
            </BigButton>
          </Link>
        </div>
      </div>

      {/* Feed drawer */}
      <Drawer open={feedOpen} onOpenChange={setFeedOpen}>
        <DrawerContent className="mx-auto max-w-md">
          <DrawerHeader>
            <DrawerTitle className="font-display text-2xl font-black">
              🆓 Free snacks for Nicko
            </DrawerTitle>
            <DrawerDescription>
              These snacks are always free — no coins needed! Tap one to fill Nicko&apos;s hunger.
            </DrawerDescription>
          </DrawerHeader>
          <div className="grid grid-cols-2 gap-3 p-4">
            {FOODS.map((food) => (
              <button
                key={food.id}
                onClick={() => handleFeed(food)}
                className="toy-card relative flex flex-col items-center gap-1 p-4 transition-transform active:scale-95"
                aria-label={`Feed ${food.name} — free, adds ${food.amount} hunger`}
              >
                <span className="absolute right-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[0.65rem] font-black uppercase text-accent-foreground">
                  Free
                </span>
                <span aria-hidden className="text-5xl">
                  {food.emoji}
                </span>
                <span className="font-display text-lg font-black">{food.name}</span>
                <span className="text-xs font-bold text-muted-foreground">+{food.amount} hunger</span>
              </button>
            ))}
          </div>
          {/* Clarify the free options above vs. the coin-priced treats in the shop. */}
          <div className="px-4 pb-8 pt-1">
            <Link to="/shop" onClick={() => setFeedOpen(false)} className="block">
              <BigButton variant="sunny" className="w-full">
                <ShoppingBag aria-hidden className="h-6 w-6" />
                Fancy treats? Visit the shop
              </BigButton>
            </Link>
          </div>
        </DrawerContent>
      </Drawer>
    </main>
  );
}

function Meter({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div role="group" aria-label={`${label}: ${pct} out of 100`}>
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl" style={{ color }}>
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate font-display text-sm font-black">{label}</p>
            <p className="shrink-0 text-sm font-black tabular-nums" style={{ color }}>
              {pct}
            </p>
          </div>
          <div className="mt-1 h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-[width] duration-700 ease-out"
              style={{ width: `${pct}%`, background: color }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
