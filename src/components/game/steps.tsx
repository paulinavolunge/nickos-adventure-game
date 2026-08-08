import { useMemo, useState } from "react";
import { Check, Heart, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Step } from "@/game/types";
import { useSfx } from "@/game/useSfx";
import { BigButton } from "./BigButton";
import { NickoSays } from "./NickoSays";

export type StepProps = {
  step: Step;
  onDone: (mistakes: number, bonusHearts?: number) => void;
};

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="pop-in space-y-4">
      <h2 className="text-center text-2xl font-black">{title}</h2>
      {children}
    </section>
  );
}

function StoryStep({ step, onDone }: StepProps) {
  if (step.kind !== "story") return null;
  return (
    <Panel title={step.title}>
      <p className="toy-card p-5 text-center text-lg font-semibold">{step.body}</p>
      <div className="flex justify-center">
        <BigButton size="lg" variant="accent" onClick={() => onDone(0)}>
          Let&apos;s go!
        </BigButton>
      </div>
    </Panel>
  );
}

const MOVES = [
  { key: "jump", label: "Jump", emoji: "⬆️" },
] as const;

function ChoiceStep({ step, onDone }: StepProps) {
  const [picked, setPicked] = useState<number | null>(null);
  const sfx = useSfx();
  if (step.kind !== "choice") return null;

  const chosen = picked === null ? null : step.options[picked];

  return (
    <Panel title={step.title}>
      <p className="toy-card p-5 text-center text-base font-semibold">{step.scene}</p>
      <p className="text-center text-lg font-black">{step.question}</p>
      <div className="grid gap-3">
        {step.options.map((opt, i) => (
          <button
            key={opt.label}
            onClick={() => {
              setPicked(i);
              sfx(opt.best ? "heart" : "oops");
            }}
            className={cn(
              "toy-card flex min-h-20 items-center gap-3 p-4 text-left text-base font-bold transition-transform active:scale-95",
              picked === i && opt.best && "bg-accent text-accent-foreground",
              picked === i && !opt.best && "bg-sunny text-sunny-foreground",
            )}
          >
            <span aria-hidden className="text-3xl">
              {opt.emoji}
            </span>
            {opt.label}
          </button>
        ))}
      </div>
      {chosen && (
        <div className="toy-card pop-in space-y-3 p-4">
          <p className="font-bold">{chosen.feedback}</p>
          {chosen.hearts > 0 && (
            <p className="flex items-center gap-2 font-black text-coral">
              <Heart aria-hidden className="h-5 w-5 fill-coral heart-pop" />+{chosen.hearts} hearts for Nicko
            </p>
          )}
          <div className="flex justify-center gap-3">
            {!chosen.best && (
              <BigButton variant="quiet" onClick={() => setPicked(null)}>
                Try another
              </BigButton>
            )}
            <BigButton variant={chosen.best ? "accent" : "primary"} onClick={() => onDone(chosen.best ? 0 : 1, chosen.hearts)}>
              {chosen.best ? "Keep going" : "Next"}
            </BigButton>
          </div>
        </div>
      )}
    </Panel>
  );
}

const MOVES = [
  { key: "jump", label: "Jump", emoji: "⬆️" },
  { key: "duck", label: "Duck", emoji: "⬇️" },
  { key: "walk", label: "Walk", emoji: "➡️" },
] as const;

function ObstacleStep({ step, onDone }: StepProps) {
  const [lane, setLane] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [shake, setShake] = useState(false);
  const sfx = useSfx();
  if (step.kind !== "obstacle") return null;

  const current = step.lanes[lane];
  const progress = Math.round((lane / step.lanes.length) * 100);

  function choose(move: string) {
    if (step.kind !== "obstacle") return;
    if (move === current.safe) {
      sfx("good");
      if (lane + 1 >= step.lanes.length) onDone(mistakes);
      else setLane(lane + 1);
    } else {
      sfx("oops");
      setMistakes((m) => m + 1);
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  }

  return (
    <Panel title={step.title}>
      <div className="toy-card overflow-hidden p-4">
        <div className="mb-3 h-5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div
          className={cn(
            "flex items-center justify-between rounded-3xl bg-sky p-4 text-4xl",
            shake && "wiggle",
          )}
        >
          <span aria-hidden>🐱</span>
          <span className="text-center text-base font-bold">{current.prompt}</span>
          <span aria-hidden>📞</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {MOVES.map((m) => (
          <BigButton
            key={m.key}
            variant={m.key === "jump" ? "primary" : m.key === "duck" ? "grape" : "accent"}
            onClick={() => choose(m.key)}
            className="flex-col gap-1 text-base"
          >
            <span aria-hidden className="text-2xl">
              {m.emoji}
            </span>
            {m.label}
          </BigButton>
        ))}
      </div>
      <p className="text-center text-sm font-bold text-muted-foreground">
        Obstacle {lane + 1} of {step.lanes.length} — {step.goalLabel}
      </p>
    </Panel>
  );
}

function QuizStep({ step, onDone }: StepProps) {
  const [picked, setPicked] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const sfx = useSfx();
  if (step.kind !== "quiz") return null;

  const chosen = picked === null ? null : step.options[picked];

  return (
    <Panel title={step.title}>
      <p className="text-center text-lg font-bold">{step.question}</p>
      <div className="grid grid-cols-2 gap-3">
        {step.options.map((opt, i) => (
          <button
            key={opt.label}
            onClick={() => {
              setPicked(i);
              sfx(opt.correct ? "good" : "oops");
              if (!opt.correct) setMistakes((m) => m + 1);
            }}
            className={cn(
              "toy-card flex min-h-32 flex-col items-center justify-center gap-2 p-3 text-center text-base font-bold transition-transform active:scale-95",
              picked === i && opt.correct && "bg-accent text-accent-foreground",
              picked === i && !opt.correct && "bg-coral text-coral-foreground",
            )}
          >
            <span aria-hidden className="text-4xl">
              {opt.emoji}
            </span>
            {opt.label}
          </button>
        ))}
      </div>
      {chosen && (
        <div className="toy-card pop-in flex items-center gap-3 p-4">
          {chosen.correct ? (
            <Check aria-hidden className="h-8 w-8 shrink-0 text-accent" />
          ) : (
            <X aria-hidden className="h-8 w-8 shrink-0 text-coral" />
          )}
          <p className="font-bold">{chosen.feedback}</p>
        </div>
      )}
      {chosen?.correct && (
        <div className="flex justify-center">
          <BigButton size="lg" onClick={() => onDone(mistakes)}>
            Next
          </BigButton>
        </div>
      )}
    </Panel>
  );
}

function KeypadStep({ step, onDone }: StepProps) {
  const [entry, setEntry] = useState("");
  const [mistakes, setMistakes] = useState(0);
  if (step.kind !== "keypad") return null;

  function tap(digit: string) {
    if (step.kind !== "keypad") return;
    const next = entry + digit;
    if (!step.code.startsWith(next)) {
      setMistakes((m) => m + 1);
      setEntry("");
      return;
    }
    setEntry(next);
    if (next === step.code) setTimeout(() => onDone(mistakes), 700);
  }

  return (
    <Panel title={step.title}>
      <div className="toy-card mx-auto w-full max-w-xs p-5 text-center">
        <p className="mb-3 text-sm font-bold text-muted-foreground">{step.hint}</p>
        <p aria-live="polite" className="mb-4 h-14 rounded-2xl bg-muted text-4xl font-black leading-[3.5rem] tracking-[0.4em]">
          {entry || "•••"}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((d) => (
            <BigButton
              key={d}
              variant="quiet"
              aria-label={`Number ${d}`}
              onClick={() => tap(d)}
              className="text-2xl"
            >
              {d}
            </BigButton>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function MatchingStep({ step, onDone }: StepProps) {
  const rights = useMemo(
    () => (step.kind === "matching" ? shuffle(step.pairs.map((p) => p.right)) : []),
    [step],
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  if (step.kind !== "matching") return null;

  function pickRight(right: string) {
    if (step.kind !== "matching" || !selected) return;
    const pair = step.pairs.find((p) => p.left === selected);
    if (pair && pair.right === right) {
      const next = [...matched, right];
      setMatched(next);
      setSelected(null);
      if (next.length === step.pairs.length) setTimeout(() => onDone(mistakes), 600);
    } else {
      setMistakes((m) => m + 1);
      setSelected(null);
    }
  }

  return (
    <Panel title={step.title}>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-3">
          {step.pairs.map((p) => {
            const done = matched.includes(p.right);
            return (
              <button
                key={p.left}
                disabled={done}
                aria-pressed={selected === p.left}
                onClick={() => setSelected(p.left)}
                className={cn(
                  "toy-card flex min-h-20 w-full items-center gap-2 p-3 text-left font-bold",
                  selected === p.left && "bg-sunny text-sunny-foreground",
                  done && "opacity-40",
                )}
              >
                <span aria-hidden className="text-3xl">
                  {p.leftEmoji}
                </span>
                {p.left}
              </button>
            );
          })}
        </div>
        <div className="space-y-3">
          {rights.map((r) => {
            const pair = step.pairs.find((p) => p.right === r)!;
            const done = matched.includes(r);
            return (
              <button
                key={r}
                disabled={done}
                onClick={() => pickRight(r)}
                className={cn(
                  "toy-card flex min-h-20 w-full items-center gap-2 p-3 text-left font-bold",
                  done && "bg-accent text-accent-foreground",
                )}
              >
                <span aria-hidden className="text-3xl">
                  {pair.rightEmoji}
                </span>
                {r}
              </button>
            );
          })}
        </div>
      </div>
      <p className="text-center text-sm font-bold text-muted-foreground">
        Tap a picture on the left, then its helper on the right.
      </p>
    </Panel>
  );
}

function SequencingStep({ step, onDone }: StepProps) {
  const pool = useMemo(
    () => (step.kind === "sequencing" ? shuffle(step.items.map((i) => i.label)) : []),
    [step],
  );
  const [order, setOrder] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  if (step.kind !== "sequencing") return null;

  function pick(label: string) {
    if (step.kind !== "sequencing") return;
    const expected = step.items[order.length].label;
    if (label === expected) {
      const next = [...order, label];
      setOrder(next);
      if (next.length === step.items.length) setTimeout(() => onDone(mistakes), 600);
    } else {
      setMistakes((m) => m + 1);
    }
  }

  return (
    <Panel title={step.title}>
      <ol className="toy-card min-h-20 space-y-2 p-4">
        {order.length === 0 && (
          <li className="text-center font-bold text-muted-foreground">Tap what comes first…</li>
        )}
        {order.map((label, i) => (
          <li key={label} className="pop-in font-bold">
            {i + 1}. {label}
          </li>
        ))}
      </ol>
      <div className="grid gap-3">
        {pool
          .filter((label) => !order.includes(label))
          .map((label) => {
            const item = step.items.find((i) => i.label === label)!;
            return (
              <button
                key={label}
                onClick={() => pick(label)}
                className="toy-card flex min-h-16 items-center gap-3 p-3 text-left font-bold"
              >
                <span aria-hidden className="text-3xl">
                  {item.emoji}
                </span>
                {label}
              </button>
            );
          })}
      </div>
    </Panel>
  );
}

function MemoryStep({ step, onDone }: StepProps) {
  const deck = useMemo(
    () =>
      step.kind === "memory"
        ? shuffle(step.cards.flatMap((c, i) => [
            { key: `${i}-a`, ...c },
            { key: `${i}-b`, ...c },
          ]))
        : [],
    [step],
  );
  const [flipped, setFlipped] = useState<string[]>([]);
  const [found, setFound] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  if (step.kind !== "memory") return null;
  const totalPairs = step.cards.length;

  function flip(key: string, label: string) {
    if (flipped.length === 2 || flipped.includes(key) || found.includes(label)) return;
    const next = [...flipped, key];
    setFlipped(next);
    if (next.length === 2) {
      const [a, b] = next.map((k) => deck.find((c) => c.key === k)!);
      if (a.label === b.label) {
        const nextFound = [...found, a.label];
        setFound(nextFound);
        setFlipped([]);
        if (nextFound.length === totalPairs) setTimeout(() => onDone(mistakes), 600);
      } else {
        setMistakes((m) => m + 1);
        setTimeout(() => setFlipped([]), 900);
      }
    }
  }

  return (
    <Panel title={step.title}>
      <div className="grid grid-cols-4 gap-2">
        {deck.map((card) => {
          const open = flipped.includes(card.key) || found.includes(card.label);
          return (
            <button
              key={card.key}
              onClick={() => flip(card.key, card.label)}
              aria-label={open ? card.label : "Hidden card"}
              className={cn(
                "toy-card flex aspect-square items-center justify-center text-4xl transition-transform active:scale-95",
                !open && "bg-primary text-primary-foreground",
                found.includes(card.label) && "bg-accent",
              )}
            >
              <span aria-hidden>{open ? card.emoji : "🐾"}</span>
            </button>
          );
        })}
      </div>
    </Panel>
  );
}

export function StepRenderer(props: StepProps) {
  const { step } = props;
  return (
    <div className="space-y-5">
      <NickoSays line={step.narration} small />
      {step.kind === "story" && <StoryStep {...props} />}
      {step.kind === "choice" && <ChoiceStep {...props} />}
      {step.kind === "obstacle" && <ObstacleStep {...props} />}
      {step.kind === "quiz" && <QuizStep {...props} />}
      {step.kind === "keypad" && <KeypadStep {...props} />}
      {step.kind === "matching" && <MatchingStep {...props} />}
      {step.kind === "sequencing" && <SequencingStep {...props} />}
      {step.kind === "memory" && <MemoryStep {...props} />}
    </div>
  );
}