import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { X } from "lucide-react";
import { BigButton } from "@/components/game/BigButton";
import { HeartBurst, HeartMeter } from "@/components/game/HeartMeter";
import { NickoSays } from "@/components/game/NickoSays";
import { RewardScreen } from "@/components/game/RewardScreen";
import { StepRenderer } from "@/components/game/steps";
import { getLesson } from "@/game/lessons";
import { coinsForStars, completeLesson, useSave } from "@/game/progress";
import { useSfx } from "@/game/useSfx";

export const Route = createFileRoute("/lesson/$lessonId")({
  loader: ({ params }) => {
    const lesson = getLesson(params.lessonId);
    if (!lesson || !lesson.available) throw notFound();
    return { title: lesson.title, lifeLesson: lesson.lifeLesson };
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.title} — Nicko's Adventures`
      : "Lesson — Nicko's Adventures";
    const description = loaderData?.lifeLesson ?? "A life-lesson adventure with Nicko the cat.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  pendingComponent: LoadingAdventure,
  notFoundComponent: AdventureNotFound,
  errorComponent: AdventureNotFound,
  component: LessonPlayer,
});

function LoadingAdventure() {
  return (
    <main className="mx-auto grid min-h-dvh w-full max-w-md place-items-center px-5 text-center">
      <div className="space-y-4">
        <p aria-hidden className="text-6xl bob">
          🐾
        </p>
        <p className="font-display text-2xl font-black">Nicko is getting ready…</p>
      </div>
    </main>
  );
}

function AdventureNotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-5 px-5 text-center">
      <NickoSays line="Oops! This adventure isn't ready yet. Let's head back to the map and pick another one." />
      <Link to="/map">
        <BigButton size="lg" variant="coral">
          Back to the map
        </BigButton>
      </Link>
    </main>
  );
}

function starsFor(mistakes: number) {
  if (mistakes <= 1) return 3;
  if (mistakes <= 4) return 2;
  return 1;
}

function LessonPlayer() {
  const { lessonId } = Route.useParams();
  return <LessonRunner key={lessonId} lessonId={lessonId} />;
}

function LessonRunner({ lessonId }: { lessonId: string }) {
  const lesson = getLesson(lessonId)!;
  const { data, update } = useSave();
  const sfx = useSfx();
  const saved = data.inProgress[lessonId];
  const [index, setIndex] = useState(() => saved?.stepIndex ?? 0);
  const [mistakes, setMistakes] = useState(() => saved?.mistakes ?? 0);
  const [hearts, setHearts] = useState(() => saved?.hearts ?? 0);
  const [masteryMistakes, setMasteryMistakes] = useState<number | null>(null);
  const [burst, setBurst] = useState<{ amount: number; key: number } | null>(null);
  const [finished, setFinished] = useState(false);
  const startedAt = useRef(Date.now());

  const stars = starsFor(masteryMistakes ?? 0);

  const handleDone = useCallback(
    (stepMistakes: number, bonusHearts = 0) => {
      const currentStep = lesson.steps[index];
      const nextMistakes = mistakes + stepMistakes;
      const earnedHearts = (stepMistakes === 0 ? 3 : 1) + bonusHearts;
      const totalHearts = hearts + earnedHearts;
      const nextMasteryMistakes = currentStep.kind === "mastery" ? stepMistakes : masteryMistakes;
      setMistakes(nextMistakes);
      setHearts(totalHearts);
      if (currentStep.kind === "mastery") setMasteryMistakes(stepMistakes);
      setBurst({ amount: earnedHearts, key: Date.now() });
      sfx("heart");
      setTimeout(() => setBurst(null), 1400);

      const nextIndex = index + 1;
      if (nextIndex >= lesson.steps.length) {
        const earned = starsFor(nextMasteryMistakes ?? 0);
        const finishBonus = 5;
        setHearts(totalHearts + finishBonus);
        update((save) =>
          completeLesson(save, {
            lessonId: lesson.id,
            stars: earned,
            hearts: totalHearts + finishBonus,
            coins: coinsForStars(earned),
            secondsPlayed: Math.round((Date.now() - startedAt.current) / 1000),
            badgeId: lesson.badge.id,
            stickerId: lesson.sticker.id,
            outfitId: lesson.outfit?.id,
          }),
        );
        sfx("fanfare");
        setFinished(true);
      } else {
        setIndex(nextIndex);
        update((save) => ({
          ...save,
          inProgress: {
            ...save.inProgress,
            [lesson.id]: { stepIndex: nextIndex, mistakes: nextMistakes, hearts: totalHearts },
          },
        }));
      }
    },
    [hearts, index, lesson, masteryMistakes, mistakes, sfx, update],
  );

  const replay = useCallback(() => {
    setIndex(0);
    setMistakes(0);
    setHearts(0);
    setMasteryMistakes(null);
    setFinished(false);
    startedAt.current = Date.now();
    update((save) => {
      const { [lesson.id]: _cleared, ...rest } = save.inProgress;
      return { ...save, inProgress: rest };
    });
  }, [lesson.id, update]);

  const progress = Math.round(((index + (finished ? 1 : 0)) / lesson.steps.length) * 100);

  return (
    <main
      className={`mx-auto w-full max-w-md space-y-4 px-4 py-5 ${data.settings.bigText ? "text-lg" : ""}`}
    >
      {burst && <HeartBurst key={burst.key} amount={burst.amount} />}

      <header className="space-y-3">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <h1 className="truncate font-display text-2xl font-black">{lesson.title}</h1>
            <p className="text-xs font-black uppercase tracking-wide text-muted-foreground">
              Step {Math.min(index + 1, lesson.steps.length)} of {lesson.steps.length}
            </p>
          </div>
          <Link to="/map" aria-label="Leave adventure and go to the map">
            <BigButton variant="quiet" size="icon">
              <X aria-hidden className="h-6 w-6" />
            </BigButton>
          </Link>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <HeartMeter hearts={data.hearts + (finished ? 0 : hearts)} compact pulse={!!burst} />
      </header>

      {finished ? (
        <RewardScreen lesson={lesson} stars={stars} heartsEarned={hearts} onReplay={replay} />
      ) : (
        <StepRenderer key={lesson.steps[index].id} step={lesson.steps[index]} onDone={handleDone} />
      )}
    </main>
  );
}
