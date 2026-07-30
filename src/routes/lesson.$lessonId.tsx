import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { X } from "lucide-react";
import { BigButton } from "@/components/game/BigButton";
import { RewardScreen } from "@/components/game/RewardScreen";
import { StepRenderer } from "@/components/game/steps";
import { getLesson } from "@/game/lessons";
import { completeLesson, useSave } from "@/game/progress";

export const Route = createFileRoute("/lesson/$lessonId")({
  loader: ({ params }) => {
    const lesson = getLesson(params.lessonId);
    if (!lesson || !lesson.available) throw notFound();
    return { title: lesson.title, lifeLesson: lesson.lifeLesson };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} — Nicko's Adventures` : "Lesson — Nicko's Adventures";
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
  component: LessonPlayer,
});

function LessonPlayer() {
  const { lessonId } = Route.useParams();
  const lesson = getLesson(lessonId)!;
  const { update } = useSave();
  const [index, setIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [finished, setFinished] = useState(false);
  const startedAt = useRef(Date.now());

  const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;

  const handleDone = useCallback(
    (stepMistakes: number) => {
      const nextMistakes = mistakes + stepMistakes;
      setMistakes(nextMistakes);
      if (index + 1 >= lesson.steps.length) {
        const earned = nextMistakes === 0 ? 3 : nextMistakes <= 2 ? 2 : 1;
        update((save) =>
          completeLesson(save, {
            lessonId: lesson.id,
            stars: earned,
            secondsPlayed: Math.round((Date.now() - startedAt.current) / 1000),
            badgeId: lesson.badge.id,
            stickerId: lesson.sticker.id,
            outfitId: lesson.outfit?.id,
          }),
        );
        setFinished(true);
      } else {
        setIndex(index + 1);
      }
    },
    [index, lesson, mistakes, update],
  );

  const replay = useCallback(() => {
    setIndex(0);
    setMistakes(0);
    setFinished(false);
    startedAt.current = Date.now();
  }, []);

  const progress = Math.round(((index + (finished ? 1 : 0)) / lesson.steps.length) * 100);

  return (
    <main className="mx-auto w-full max-w-md space-y-5 px-4 py-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-black">{lesson.title}</h1>
          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <Link to="/map" aria-label="Leave lesson and go to the map">
          <BigButton variant="quiet" size="icon">
            <X aria-hidden className="h-6 w-6" />
          </BigButton>
        </Link>
      </header>

      {finished ? (
        <RewardScreen lesson={lesson} stars={stars} onReplay={replay} />
      ) : (
        <StepRenderer key={lesson.steps[index].id} step={lesson.steps[index]} onDone={handleDone} />
      )}
    </main>
  );
}