import { createFileRoute, Link } from "@tanstack/react-router";
import { Home } from "lucide-react";
import nicko from "@/assets/nicko.png";
import { BigButton } from "@/components/game/BigButton";
import { HeartMeter } from "@/components/game/HeartMeter";
import { NickoSays } from "@/components/game/NickoSays";
import { HEART_MILESTONES, heartLevel } from "@/game/hearts";
import { LESSONS } from "@/game/lessons";
import { useSave } from "@/game/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/rewards")({
  head: () => ({
    meta: [
      { title: "Nicko's Room — Badges, Stickers & Outfits" },
      {
        name: "description",
        content:
          "Visit Nicko's cozy room to see the hearts, badges, stickers, outfits, decorations, and trophies you earned together.",
      },
      { property: "og:title", content: "Nicko's Room — Badges, Stickers & Outfits" },
      {
        property: "og:description",
        content: "Every heart you earn makes Nicko happier and unlocks something new in his room.",
      },
    ],
  }),
  component: RewardsRoom,
});

function RewardsRoom() {
  const { data, update } = useSave();
  const level = heartLevel(data.hearts);
  const badges = LESSONS.filter((l) => data.badges.includes(l.badge.id));
  const stickers = LESSONS.filter((l) => data.stickers.includes(l.sticker.id));
  const outfits = LESSONS.filter((l) => l.outfit && data.outfits.includes(l.outfit.id));

  return (
    <main
      className={`mx-auto w-full max-w-md space-y-5 px-4 py-6 ${data.settings.bigText ? "text-lg" : ""}`}
    >
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h1 className="truncate font-display text-3xl font-black">Nicko&apos;s Room</h1>
        <Link to="/" aria-label="Back to title screen">
          <BigButton variant="quiet" size="icon">
            <Home aria-hidden className="h-6 w-6" />
          </BigButton>
        </Link>
      </header>

      <div className="toy-card relative overflow-hidden p-5 text-center">
        <span aria-hidden className="absolute left-4 top-4 text-3xl wiggle">
          {data.hearts >= 20 ? "🧶" : "✨"}
        </span>
        <span aria-hidden className="absolute right-4 top-4 text-3xl wiggle">
          {data.hearts >= 50 ? "🪟" : "✨"}
        </span>
        <img
          src={nicko}
          alt="Nicko the gray tabby cat in his cozy room"
          width={1024}
          height={1024}
          loading="lazy"
          className="mx-auto w-40 object-contain bob"
        />
        <p className="font-display text-xl font-black">
          {level.mood} {level.line}
        </p>
      </div>

      <HeartMeter hearts={data.hearts} />
      <NickoSays line="Look at everything we collected together! Every heart makes my room cozier." small />

      <Section title="Friendship unlocks">
        <div className="grid grid-cols-2 gap-3">
          {HEART_MILESTONES.map((m) => {
            const open = data.hearts >= m.hearts;
            return (
              <div
                key={m.id}
                className={cn(
                  "toy-card flex items-center gap-3 p-3",
                  !open && "opacity-60",
                )}
              >
                <span aria-hidden className="text-3xl">
                  {open ? m.emoji : "🔒"}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black">{m.name}</p>
                  <p className="truncate text-xs font-bold text-muted-foreground">
                    {open ? m.blurb : `${m.hearts} hearts`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Badges">
        <Collection
          items={badges.map((l) => ({ id: l.badge.id, emoji: l.badge.emoji, name: l.badge.name }))}
          empty="Finish an adventure to earn your first badge."
        />
      </Section>

      <Section title="Stickers">
        <Collection
          items={stickers.map((l) => ({ id: l.sticker.id, emoji: l.sticker.emoji, name: l.sticker.name }))}
          empty="Stickers appear here after each adventure."
        />
      </Section>

      <Section title="Nicko's outfits">
        {outfits.length === 0 ? (
          <p className="toy-card p-4 text-sm font-bold text-muted-foreground">
            Help Nicko finish adventures to unlock outfits he can wear.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {outfits.map((l) => {
              const outfit = l.outfit!;
              const worn = data.equippedOutfit === outfit.id;
              return (
                <button
                  key={outfit.id}
                  onClick={() =>
                    update((prev) => ({ ...prev, equippedOutfit: worn ? null : outfit.id }))
                  }
                  aria-pressed={worn}
                  className={cn(
                    "toy-card p-3 text-center transition-transform active:scale-95",
                    worn && "bg-accent text-accent-foreground",
                  )}
                >
                  <span aria-hidden className="block text-4xl">
                    {outfit.emoji}
                  </span>
                  <span className="mt-1 block text-xs font-black">{outfit.name}</span>
                  <span className="block text-[0.7rem] font-bold opacity-70">
                    {worn ? "Wearing" : "Tap to wear"}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </Section>

      <div className="flex flex-wrap justify-center gap-3 pb-4">
        <Link to="/map">
          <BigButton size="lg" variant="coral">
            Next adventure
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

function Collection({
  items,
  empty,
}: {
  items: Array<{ id: string; emoji: string; name: string }>;
  empty: string;
}) {
  if (items.length === 0) {
    return <p className="toy-card p-4 text-sm font-bold text-muted-foreground">{empty}</p>;
  }
  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => (
        <div key={item.id} className="toy-card pop-in p-3 text-center">
          <span aria-hidden className="block text-4xl">
            {item.emoji}
          </span>
          <span className="mt-1 block text-xs font-black">{item.name}</span>
        </div>
      ))}
    </div>
  );
}
