export type StepBase = { id: string; narration: string };

export type Step =
  | (StepBase & { kind: "story"; title: string; body: string; art?: string })
  | (StepBase & {
      kind: "obstacle";
      title: string;
      goalLabel: string;
      lanes: Array<{ prompt: string; safe: "jump" | "duck" | "walk" }>;
    })
  | (StepBase & {
      kind: "quiz";
      title: string;
      question: string;
      options: Array<{ label: string; emoji: string; correct: boolean; feedback: string }>;
    })
  | (StepBase & {
      kind: "matching";
      title: string;
      pairs: Array<{ left: string; leftEmoji: string; right: string; rightEmoji: string }>;
    })
  | (StepBase & {
      kind: "sequencing";
      title: string;
      items: Array<{ label: string; emoji: string }>; // correct order
    })
  | (StepBase & {
      kind: "memory";
      title: string;
      cards: Array<{ label: string; emoji: string }>;
    })
  | (StepBase & {
      kind: "keypad";
      title: string;
      code: string;
      hint: string;
    })
  | (StepBase & {
      kind: "choice";
      title: string;
      scene: string;
      question: string;
      options: Array<{
        label: string;
        emoji: string;
        hearts: number;
        best?: boolean;
        feedback: string;
      }>;
    })
  | (StepBase & {
      kind: "mastery";
      title: string;
      questions: Array<{
        prompt: string;
        emoji?: string;
        options: Array<{ label: string; emoji: string; correct: boolean }>;
      }>;
    });

export type Lesson = {
  id: string;
  order: number;
  title: string;
  lifeLesson: string;
  emoji: string;
  tint: "primary" | "coral" | "grape" | "accent" | "sunny";
  available: boolean;
  skills?: string[];
  badge: { id: string; name: string; emoji: string };
  sticker: { id: string; name: string; emoji: string };
  outfit?: { id: string; name: string; emoji: string };
  tryTonight: string;
  steps: Step[];
};
