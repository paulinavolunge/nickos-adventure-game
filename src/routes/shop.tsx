import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Coins, Home, Lock } from "lucide-react";
import { BigButton } from "@/components/game/BigButton";
import { canAfford, feed, spendCoins } from "@/game/pet";
import { useSave } from "@/game/progress";
import {
  SHOP_COSMETICS,
  SHOP_SNACKS,
  type ShopCosmetic,
  type ShopSnack,
} from "@/game/shop";
import { useSfx } from "@/game/useSfx";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Fish Coin Shop — Nicko's Adventures" },
      {
        name: "description",
        content:
          "Spend your Fish Coins on special snacks and fun outfits for Nicko. Earn more coins by playing mini-games!",
      },
      { property: "og:title", content: "Fish Coin Shop — Nicko's Adventures" },
      {
        property: "og:description",
        content: "Treat Nicko to snacks and dress him up with coins you earned playing.",
      },
    ],
  }),
  component: ShopScreen,
});

function ShopScreen() {
  const { data, update } = useSave();
  const sfx = useSfx();
  const [burst, setBurst] = useState<{ emoji: string; key: number } | null>(null);
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [blocked, setBlocked] = useState<{ need: number; key: number } | null>(null);

  const celebrate = useCallback((emoji: string) => {
    setBurst({ emoji, key: Date.now() });
    window.setTimeout(() => setBurst(null), 1200);
  }, []);

  // Friendly "not enough coins yet" feedback: wobble the tapped card and pop a
  // little message telling the child how many coins are still needed.
  const denyPurchase = useCallback(
    (id: string, price: number) => {
      sfx("oops");
      setShakeId(id);
      setBlocked({ need: Math.max(1, price - data.fishCoins), key: Date.now() });
      window.setTimeout(() => setShakeId((cur) => (cur === id ? null : cur)), 550);
      window.setTimeout(() => setBlocked(null), 1800);
    },
    [data.fishCoins, sfx],
  );

  const buySnack = useCallback(
    (snack: ShopSnack) => {
      if (!canAfford(data, snack.price)) {
        denyPurchase(snack.id, snack.price);
        return;
      }
      sfx("good");
      celebrate(snack.emoji);
      update((save) => feed(spendCoins(save, snack.price), Date.now(), snack.hunger));
    },
    [data, sfx, celebrate, update, denyPurchase],
  );

  const buyCosmetic = useCallback(
    (item: ShopCosmetic) => {
      const owned = data.outfits.includes(item.id);
      if (owned) {
        // Already bought — just toggle whether Nicko is wearing it.
        sfx("tap");
        update((save) => ({
          ...save,
          equippedOutfit: save.equippedOutfit === item.id ? null : item.id,
        }));
        return;
      }
      if (!canAfford(data, item.price)) {
        denyPurchase(item.id, item.price);
        return;
      }
      sfx("fanfare");
      celebrate(item.emoji);
      update((save) => {
        const spent = spendCoins(save, item.price);
        return {
          ...spent,
          outfits: Array.from(new Set([...spent.outfits, item.id])),
          equippedOutfit: item.id,
        };
      });
    },
    [data, sfx, celebrate, update, denyPurchase],
  );

  return (
    <main
      className={`mx-auto w-full max-w-md space-y-5 px-4 py-6 ${
        data.settings.bigText ? "text-lg" : ""
      }`}
    >
      {burst && (
        <p
          key={burst.key}
          aria-live="polite"
          className="heart-float pointer-events-none fixed left-1/2 top-24 z-50 -translate-x-1/2 rounded-full bg-card px-5 py-2 font-display text-3xl shadow-[var(--shadow-float)]"
        >
          {burst.emoji}
        </p>
      )}

      {blocked && (
        <div
          key={blocked.key}
          role="status"
          aria-live="assertive"
          className="pop-in pointer-events-none fixed inset-x-4 top-20 z-50 mx-auto max-w-xs rounded-3xl bg-grape px-5 py-3 text-center font-display font-black text-grape-foreground shadow-[var(--shadow-float)]"
        >
          <span aria-hidden className="mr-1 text-2xl">
            🐾
          </span>
          Need {blocked.need} more coin{blocked.need === 1 ? "" : "s"} — play a game to earn them!
        </div>
      )}

      <header className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2">
        <div
          className="toy-card flex items-center gap-2 px-4 py-2"
          role="status"
          aria-label={`${data.fishCoins} Fish Coins`}
        >
          <Coins aria-hidden className="h-6 w-6 shrink-0 text-sunny" style={{ fill: "gold" }} />
          <span className="font-display text-xl font-black tabular-nums">{data.fishCoins}</span>
        </div>
        <Link to="/room" aria-label="Back to Nicko's room">
          <BigButton variant="quiet" size="icon">
            <span aria-hidden className="text-2xl">
              🐾
            </span>
          </BigButton>
        </Link>
        <Link to="/" aria-label="Back to title screen">
          <BigButton variant="quiet" size="icon">
            <Home aria-hidden className="h-6 w-6" />
          </BigButton>
        </Link>
      </header>

      <div className="toy-card p-4 text-center">
        <p className="font-display text-2xl font-black">🛍️ Fish Coin Shop</p>
        <p className="mt-1 text-sm font-bold text-muted-foreground">
          Play mini-games to earn coins, then treat Nicko!
        </p>
      </div>

      <Section title="Special snacks">
        <div className="grid grid-cols-3 gap-3">
          {SHOP_SNACKS.map((snack) => {
            const afford = canAfford(data, snack.price);
            return (
              <ItemCard
                key={snack.id}
                emoji={snack.emoji}
                name={snack.name}
                price={snack.price}
                locked={!afford}
                shaking={shakeId === snack.id}
                onClick={() => buySnack(snack)}
                caption={`+${snack.hunger} 🍽️`}
              />
            );
          })}
        </div>
      </Section>

      <Section title="Outfits & accessories">
        <div className="grid grid-cols-3 gap-3">
          {SHOP_COSMETICS.map((item) => {
            const owned = data.outfits.includes(item.id);
            const worn = data.equippedOutfit === item.id;
            const afford = canAfford(data, item.price);
            return (
              <ItemCard
                key={item.id}
                emoji={item.emoji}
                name={item.name}
                price={item.price}
                owned={owned}
                worn={worn}
                locked={!owned && !afford}
                shaking={shakeId === item.id}
                onClick={() => buyCosmetic(item)}
              />
            );
          })}
        </div>
      </Section>

      <div className="flex flex-wrap justify-center gap-3 pb-4">
        <Link to="/map">
          <BigButton size="lg" variant="coral">
            Earn more coins
          </BigButton>
        </Link>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-xl font-black">{title}</h2>
      {children}
    </section>
  );
}

function PricePill({ price, locked }: { price: number; locked?: boolean }) {
  return (
    <span
      className={cn(
        "mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-black",
        locked ? "bg-muted text-muted-foreground" : "bg-sunny text-sunny-foreground",
      )}
    >
      {locked ? (
        <Lock aria-hidden className="h-3 w-3" />
      ) : (
        <Coins aria-hidden className="h-3 w-3" style={{ fill: "gold" }} />
      )}
      {price}
    </span>
  );
}

function ItemCard({
  emoji,
  name,
  price,
  onClick,
  locked = false,
  owned = false,
  worn = false,
  shaking = false,
  caption,
}: {
  emoji: string;
  name: string;
  price: number;
  onClick: () => void;
  locked?: boolean;
  owned?: boolean;
  worn?: boolean;
  shaking?: boolean;
  caption?: string;
}) {
  const label = locked
    ? `${name}, costs ${price} Fish Coins — not enough yet, tap to see how many more you need`
    : owned
      ? worn
        ? `${name}, wearing now, tap to take off`
        : `${name}, owned, tap to wear`
      : `Buy ${name} for ${price} Fish Coins`;

  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={owned ? worn : undefined}
      className={cn(
        "toy-card flex flex-col items-center gap-0.5 p-3 text-center transition-transform active:scale-95",
        locked && "opacity-60",
        worn && "bg-accent text-accent-foreground",
        shaking && "shake",
      )}
    >
      <span aria-hidden className="text-4xl">
        {locked ? "🔒" : emoji}
      </span>
      <span className="mt-1 block text-xs font-black leading-tight">{name}</span>
      {owned ? (
        <span className="text-[0.7rem] font-bold opacity-80">{worn ? "Wearing" : "Tap to wear"}</span>
      ) : (
        <>
          <PricePill price={price} locked={locked} />
          {caption && !locked && (
            <span className="text-[0.7rem] font-bold text-muted-foreground">{caption}</span>
          )}
        </>
      )}
    </button>
  );
}
