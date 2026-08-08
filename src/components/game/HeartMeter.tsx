import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { heartLevel, milestoneProgress, nextMilestone } from "@/game/hearts";

export function HeartMeter({
  hearts,
  compact,
  pulse,
  className,
}: {
  hearts: number;
  compact?: boolean;
  pulse?: boolean;
  className?: string;
}) {
  const level = heartLevel(hearts);
  const next = nextMilestone(hearts);
  const pct = Math.round(milestoneProgress(hearts) * 100);

  return (
    <div
      className={cn("toy-card p-3", compact && "px-3 py-2", className)}
      role="group"
      aria-label={`Friendship meter: ${hearts} hearts, ${level.name}`}
    >
      <div className="flex items-center gap-2">
        <span aria-hidden className={cn("text-2xl", pulse && "heart-pop")}>
          {level.mood}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate font-display text-sm font-black">{level.name}</p>
            <p className="flex shrink-0 items-center gap-1 text-sm font-black text-coral">
              <Heart aria-hidden className={cn("h-4 w-4 fill-coral", pulse && "heart-pop")} />
              {hearts}
            </p>
          </div>
          <div className="mt-1 h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full heart-fill transition-[width] duration-700 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
      {!compact && (
        <p className="mt-2 text-xs font-bold text-muted-foreground">
          {next
            ? `${next.hearts - hearts} more hearts to unlock ${next.emoji} ${next.name}`
            : "Every friendship reward unlocked. Nicko is glowing!"}
        </p>
      )}
    </div>
  );
}

/** Floating "+N hearts" celebration. */
export function HeartBurst({ amount }: { amount: number }) {
  return (
    <p
      aria-live="polite"
      className="heart-float pointer-events-none fixed left-1/2 top-24 z-50 -translate-x-1/2 rounded-full bg-coral px-5 py-2 font-display text-xl font-black text-coral-foreground shadow-[var(--shadow-float)]"
    >
      +{amount} ❤️
    </p>
  );
}
