import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Home, Sparkles } from "lucide-react";
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
        content: "Choose a lesson on Nicko's neighborhood map: calling 911, kindness, stranger safety, and more.",
      },
      { property: "og:title", content: "World Map — Nicko's Adventures" },
      { property: "og:description", content: "Pick your next life-lesson adventure with Nicko the cat." },
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

function WorldMap() {
  const { data } = useSave();

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

      <img
        src={worldmap}
        alt="Illustrated map of Nicko's neighborhood with a fire station, park, and crosswalk"
        width={1536}
        height={1024}
        loading="lazy"
        className="w-full rounded-4xl border-4 border-card object-cover shadow-[var(--shadow-float)]"
      />

      <NickoSays line="Tap a lesson below and let's learn something new together!" small />

      <h2 className="font-display text-xl font-black">Choose a lesson</h2>
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
    </main>
  );
}