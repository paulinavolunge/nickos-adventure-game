import { createFileRoute, Link } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { BigButton } from "@/components/game/BigButton";
import { Stars } from "@/components/game/Stars";
import { LESSONS } from "@/game/lessons";
import { totalStars, useSave } from "@/game/progress";

export const Route = createFileRoute("/parents")({
  head: () => ({
    meta: [
      { title: "Parent Dashboard — Nicko's Adventures" },
      {
        name: "description",
        content: "See which life lessons your child completed, time played, and control narration, text size, and saved progress.",
      },
      { property: "og:title", content: "Parent Dashboard — Nicko's Adventures" },
      { property: "og:description", content: "Track progress and adjust accessibility settings for Nicko's Adventures." },
    ],
  }),
  component: ParentDashboard,
});

const SETTINGS: Array<{ key: "narration" | "sound" | "bigText" | "reducedMotion"; label: string; hint: string }> = [
  { key: "narration", label: "Voice narration", hint: "Nicko reads instructions aloud" },
  { key: "sound", label: "Sound effects", hint: "Cheers and chimes" },
  { key: "bigText", label: "Extra large text", hint: "Bigger words across the game" },
  { key: "reducedMotion", label: "Calm mode", hint: "Fewer animations and movement" },
];

function ParentDashboard() {
  const { data, update } = useSave();
  const played = Object.values(data.lessons).reduce((s, l) => s + l.secondsPlayed, 0);

  return (
    <main className={`mx-auto w-full max-w-md space-y-5 px-4 py-6 ${data.settings.bigText ? "text-lg" : ""}`}>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h1 className="truncate text-3xl font-black">Parent Dashboard</h1>
        <Link to="/" aria-label="Back to title screen">
          <BigButton variant="quiet" size="icon">
            <Home aria-hidden className="h-6 w-6" />
          </BigButton>
        </Link>
      </header>

      <section className="toy-card grid grid-cols-3 gap-2 p-4 text-center">
        <Stat label="Stars" value={String(totalStars(data))} />
        <Stat label="Badges" value={String(data.badges.length)} />
        <Stat label="Minutes" value={String(Math.round(played / 60))} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-black">Lesson progress</h2>
        <ul className="space-y-2">
          {LESSONS.map((lesson) => {
            const p = data.lessons[lesson.id];
            return (
              <li
                key={lesson.id}
                className="toy-card grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-bold">
                    {lesson.emoji} {lesson.title}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {p
                      ? `Completed ${new Date(p.completedAt).toLocaleDateString()} · ${p.attempts} play${p.attempts > 1 ? "s" : ""}`
                      : lesson.available
                        ? "Not started"
                        : "Coming soon"}
                  </p>
                </div>
                <Stars value={p?.stars ?? 0} size={18} />
              </li>
            );
          })}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-black">Settings</h2>
        {SETTINGS.map((s) => (
          <label
            key={s.key}
            className="toy-card grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4"
          >
            <span className="min-w-0">
              <span className="block font-bold">{s.label}</span>
              <span className="block text-sm text-muted-foreground">{s.hint}</span>
            </span>
            <input
              type="checkbox"
              className="h-8 w-8 shrink-0 accent-[var(--primary)]"
              checked={data.settings[s.key]}
              onChange={(e) =>
                update((prev) => ({
                  ...prev,
                  settings: { ...prev.settings, [s.key]: e.target.checked },
                }))
              }
            />
          </label>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-black">Privacy</h2>
        <p className="toy-card p-4 text-sm font-semibold">
          No ads, no purchases, no accounts. Progress is saved only on this device and never leaves it.
        </p>
        <BigButton
          variant="quiet"
          className="w-full"
          onClick={() => {
            if (window.confirm("Erase all saved progress on this device?")) {
              update(() => ({
                playerName: "Friend",
                lessons: {},
                badges: [],
                stickers: [],
                outfits: [],
                equippedOutfit: null,
                settings: data.settings,
              }));
            }
          }}
        >
          Reset progress
        </BigButton>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-3xl font-black">{value}</p>
      <p className="text-xs font-black uppercase tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}