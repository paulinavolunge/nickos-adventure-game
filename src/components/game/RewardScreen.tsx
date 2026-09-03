import { Link } from "@tanstack/react-router";
import { Coins, Heart, ShoppingBag } from "lucide-react";
import type { Lesson } from "@/game/types";
import { unlockedMilestones } from "@/game/hearts";
import { LESSONS } from "@/game/lessons";
import { PROUD_AFTER_MASTERY } from "@/game/nickoLines";
import { coinsForStars, useSave } from "@/game/progress";
import { BigButton } from "./BigButton";
import { HeartMeter } from "./HeartMeter";
import { NickoSays } from "./NickoSays";
import { Stars } from "./Stars";

export function RewardScreen({
  lesson,
  stars,
  heartsEarned,
  onReplay,
}: {
  lesson: Lesson;
  stars: number;
  heartsEarned: number;
  onReplay: () => void;
}) {
  const { data } = useSave();
  const before = Math.max(0, data.hearts - heartsEarned);
  const newlyUnlocked = unlockedMilestones(data.hearts).filter((m) => m.hearts > before);
  const nextLesson = LESSONS.find((l) => l.order === lesson.order + 1 && l.available);
  const masteredIt = stars === 3;
  const coinsEarned = coinsForStars(stars);

  return (
    <div className="space-y-5 pop-in">
      <NickoSays
        line={`You did it! I earned the ${lesson.badge.name} badge because you helped me. My heart feels so full!${
          masteredIt ? ` ${PROUD_AFTER_MASTERY}` : ""
        }`}
      />

      <div className="toy-card space-y-5 p-6 text-center">
        <h2 className="font-display text-3xl font-black">Adventure Complete!</h2>
        <div className="flex justify-center">
          <Stars value={stars} size={44} />
        </div>
        <p className="text-sm font-bold text-muted-foreground">
          {masteredIt
            ? "3 Confidence Stars — you didn't need any help on that last part!"
            : "Nicko's got your back while you practice more of this one."}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <p className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2 font-display text-xl font-black text-coral-foreground">
            <Heart aria-hidden className="h-5 w-5 fill-current heart-pop" />+{heartsEarned} hearts
          </p>
          <p className="inline-flex items-center gap-2 rounded-full bg-sunny px-5 py-2 font-display text-xl font-black text-sunny-foreground">
            <Coins aria-hidden className="h-5 w-5 coin-bounce" style={{ fill: "gold" }} />+
            {coinsEarned} coins
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <RewardTile emoji={lesson.badge.emoji} label="Badge" name={lesson.badge.name} />
          <RewardTile emoji={lesson.sticker.emoji} label="Sticker" name={lesson.sticker.name} />
          {lesson.outfit && (
            <RewardTile emoji={lesson.outfit.emoji} label="Outfit" name={lesson.outfit.name} />
          )}
        </div>
      </div>

      <HeartMeter hearts={data.hearts} />

      {newlyUnlocked.length > 0 && (
        <div className="toy-card space-y-3 p-5">
          <h3 className="text-center font-display text-xl font-black">New friendship unlocks!</h3>
          {newlyUnlocked.map((m) => (
            <div key={m.id} className="pop-in flex items-center gap-3 rounded-3xl bg-muted p-3">
              <span aria-hidden className="text-4xl">
                {m.emoji}
              </span>
              <div className="min-w-0">
                <p className="font-bold">{m.name}</p>
                <p className="text-sm text-muted-foreground">{m.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {lesson.skills && lesson.skills.length > 0 && (
        <div className="toy-card space-y-2 p-5">
          <h3 className="font-display text-lg font-black">What you practiced</h3>
          <ul className="space-y-1 text-sm font-semibold">
            {lesson.skills.map((s) => (
              <li key={s}>✅ {s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Primary calls to action: keep the core loop (spend your new coins!) one tap away. */}
      <div className="space-y-3">
        {nextLesson && (
          <Link to="/lesson/$lessonId" params={{ lessonId: nextLesson.id }} className="block">
            <BigButton size="lg" variant="coral" className="w-full">
              Next: {nextLesson.title} {nextLesson.emoji}
            </BigButton>
          </Link>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Link to="/room" className="block">
            <BigButton variant="primary" className="w-full flex-col gap-1 py-3">
              <span aria-hidden className="text-2xl">
                🏠
              </span>
              Nicko&apos;s Room
            </BigButton>
          </Link>
          <Link to="/shop" className="block">
            <BigButton variant="sunny" className="w-full flex-col gap-1 py-3">
              <ShoppingBag aria-hidden className="h-6 w-6" />
              Visit Shop
            </BigButton>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <BigButton variant="accent" onClick={onReplay}>
          Play again
        </BigButton>
        <Link to="/map">
          <BigButton variant="quiet">Back to map</BigButton>
        </Link>
      </div>
    </div>
  );
}

function RewardTile({ emoji, label, name }: { emoji: string; label: string; name: string }) {
  return (
    <div className="rounded-3xl bg-muted p-3">
      <span aria-hidden className="block text-4xl">
        {emoji}
      </span>
      <p className="mt-1 text-xs font-black uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-bold">{name}</p>
    </div>
  );
}
