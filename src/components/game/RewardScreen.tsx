import { Link } from "@tanstack/react-router";
import type { Lesson } from "@/game/types";
import { BigButton } from "./BigButton";
import { NickoSays } from "./NickoSays";
import { Stars } from "./Stars";

export function RewardScreen({
  lesson,
  stars,
  onReplay,
}: {
  lesson: Lesson;
  stars: number;
  onReplay: () => void;
}) {
  return (
    <div className="space-y-6 pop-in">
      <NickoSays
        line={`Amazing work! You earned the ${lesson.badge.name} badge. I'm so proud of you!`}
      />
      <div className="toy-card space-y-5 p-6 text-center">
        <h2 className="text-3xl font-black">Lesson Complete!</h2>
        <div className="flex justify-center">
          <Stars value={stars} size={44} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <RewardTile emoji={lesson.badge.emoji} label="Badge" name={lesson.badge.name} />
          <RewardTile emoji={lesson.sticker.emoji} label="Sticker" name={lesson.sticker.name} />
          {lesson.outfit && (
            <RewardTile emoji={lesson.outfit.emoji} label="Outfit" name={lesson.outfit.name} />
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <BigButton size="lg" variant="accent" onClick={onReplay}>
          Play again
        </BigButton>
        <Link to="/map">
          <BigButton size="lg">Back to map</BigButton>
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
      <p className="mt-1 text-xs font-black uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-sm font-bold">{name}</p>
    </div>
  );
}