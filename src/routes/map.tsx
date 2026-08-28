import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Home, Sparkles } from "lucide-react";
import { useMemo } from "react";
import worldmap from "@/assets/worldmap.jpg";
import { BigButton } from "@/components/game/BigButton";
import { HeartMeter } from "@/components/game/HeartMeter";
import { NickoSays } from "@/components/game/NickoSays";
import { Stars } from "@/components/game/Stars";
import { LESSONS } from "@/game/lessons";
import { useSave } from "@/game/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "World Map — Nicko's Adventures" },
      {
        name: "description",
        content:
          "Choose a lesson on Nicko's neighborhood map: calling 911, kindness, stranger safety, and more.",
      },
      { property: "og:title", content: "World Map — Nicko's Adventures" },
      {
        property: "og:description",
        content: "Pick your next life-lesson adventure with Nicko the cat.",
      },
    ],
  }),
  component: WorldMap,
});

const TINT: Record<string, string> = {
  primary: "bg-primary text-primary-foreground",
  coral: "bg-coral text-coral-foreground",
  grape: "bg-grape text-grape-foreground",
  accent: "bg-accent text-accent-foreground",
  sunny: "bg-sunny text-sunny-foreground",
};

const PIN_POSITIONS: Record<number, { left: string; top: string }> = {
  1: { left: "18%", top: "22%" },
  2: { left: "40%", top: "14%" },
  3: { left: "62%", top: "20%" },
  4: { left: "83%", top: "32%" },
  5: { left: "72%", top: "48%" },
  6: { left: "48%", top: "44%" },
  7: { left: "22%", top: "50%" },
  8: { left: "30%", top: "72%" },
  9: { left: "55%", top: "80%" },
  10: { left: "82%", top: "70%" },
};

function WorldMap() {
  const { data } = useSave();

  const currentLessonOrder = useMemo(() => {
    const next = LESSONS.find((l) => l.available && !data.lessons[l.id]?.stars);
    return next?.order ?? null;
  }, [data.lessons]);

  return (
    <main className="mx-auto w-full max-w-md space-y-5 px-4 py-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2">
        <h1 className="truncate text-3xl font-black">Nicko&apos;s World</h1>
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

      <HeartMeter hearts={data.hearts} />

      <div className="relative overflow-hidden rounded-4xl border-4 border-card shadow-[var(--shadow-float)]">
        <img
          src={worldmap}
          alt="Illustrated map of Nicko's neighborhood with a fire station, park, and crosswalk"
          width={1536}
          height={1024}
          loading="lazy"
          className="block w-full"
        />
        <div className="pointer-events-none absolute inset-0">
          {LESSONS.map((lesson) => {
            const pos = PIN_POSITIONS[lesson.order];
            if (!pos) return null;
            const progress = data.lessons[lesson.id];
            const stars = progress?.stars ?? 0;
            const locked = !lesson.available;
            const isCurrent = lesson.order === currentLessonOrder;

            const label = locked
              ? `Level ${lesson.order}: ${lesson.title} — locked`
              : `Level ${lesson.order}: ${lesson.title}${
                  stars ? `, ${stars} of 3 stars` : ""
                }${isCurrent ? " — next up" : ""}`;

            const pin = (
              <div
                aria-hidden
                className={cn(
                  "relative grid h-12 w-12 place-items-center rounded-full text-2xl shadow-[var(--shadow-toy)] sm:h-14 sm:w-14 sm:text-3xl",
                  locked ? "bg-muted text-muted-foreground" : TINT[lesson.tint],
                  isCurrent && "ring-4 ring-white",
                )}
              >
                {locked ? <Lock className="h-5 w-5 sm:h-6 sm:w-6" /> : <span>{lesson.emoji}</span>}
                <span className="absolute -left-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-card text-[10px] font-black text-foreground shadow">
                  {lesson.order}
                </span>
                {!locked && stars > 0 && (
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-card px-1.5 py-0.5 shadow">
                    <Stars value={stars} size={10} />
                  </span>
                )}
                {isCurrent && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-foreground shadow">
                    You
                  </span>
                )}
              </div>
            );

            return (
              <div
                key={lesson.id}
                className={cn(
                  "pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2",
                  isCurrent && "bob",
                )}
                style={{ left: pos.left, top: pos.top }}
              >
                {locked ? (
                  <div role="img" aria-label={label}>
                    {pin}
                  </div>
                ) : (
                  <Link
                    to="/lesson/$lessonId"
                    params={{ lessonId: lesson.id }}
                    aria-label={label}
                    className="block transition-transform active:scale-90"
                  >
                    {pin}
                  </Link>
                )}
              </div>
            );
          })}
          <div
            className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: "8%", top: "85%" }}
          >
            <Link
              to="/rewards"
              aria-label="Visit Nicko's house"
              className="block transition-transform active:scale-90"
            >
              <div
                aria-hidden
                className="grid h-12 w-12 place-items-center rounded-full bg-grape text-2xl text-grape-foreground shadow-[var(--shadow-toy)] sm:h-14 sm:w-14 sm:text-3xl"
              >
                🏠
              </div>
            </Link>
          </div>
        </div>
      </div>

      <NickoSays line="Tap a pin to start an adventure. The glowing one is next!" small />

      <section aria-label="All lessons" className="space-y-3">
        <h2 className="font-display text-xl font-black">All lessons</h2>
        <ul className="space-y-3">
          {LESSONS.map((lesson) => {
            const progress = data.lessons[lesson.id];
            const locked = !lesson.available;
            const inner = (
              <div
                className={cn(
                  "toy-card grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-4 text-left",
                  locked && "opacity-60",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl",
                    TINT[lesson.tint],
                  )}
                >
                  {lesson.emoji}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-xl font-black">
                    {lesson.order}. {lesson.title}
                  </span>
                  <span className="block truncate text-sm font-bold text-muted-foreground">
                    {locked ? "Coming soon" : lesson.lifeLesson}
                  </span>
                </span>
                {locked ? (
                  <Lock aria-hidden className="h-6 w-6 shrink-0 text-muted-foreground" />
                ) : (
                  <Stars value={progress?.stars ?? 0} size={20} />
                )}
              </div>
            );

            return (
              <li key={lesson.id}>
                {locked ? (
                  <div aria-disabled>{inner}</div>
                ) : (
                  <Link
                    to="/lesson/$lessonId"
                    params={{ lessonId: lesson.id }}
                    className="block transition-transform active:scale-95"
                  >
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
