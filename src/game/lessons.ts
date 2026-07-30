import type { Lesson } from "./types";

const call911: Lesson = {
  id: "call-911",
  order: 1,
  title: "When to Call 911",
  lifeLesson: "Know when — and how — to call for help.",
  emoji: "🚒",
  tint: "coral",
  available: true,
  badge: { id: "helper-hero", name: "Helper Hero", emoji: "🦸" },
  sticker: { id: "fire-truck", name: "Shiny Fire Truck", emoji: "🚒" },
  outfit: { id: "firefighter-hat", name: "Firefighter Hat", emoji: "⛑️" },
  steps: [
    {
      id: "intro",
      kind: "story",
      title: "Smoke at the Corner House!",
      body: "Nicko sniffs the air. Something smells smoky! Grown-ups are far away. Nicko needs to be brave and get help the safe way.",
      narration:
        "Hi friend! I'm Nicko. I smell smoke at the corner house. Let's find out how to get help together!",
    },
    {
      id: "run",
      kind: "obstacle",
      title: "Race to the Phone",
      goalLabel: "Reach the phone",
      narration:
        "Help me hop over the wagon and duck under the branch so we can reach the phone. Tap the safe move!",
      lanes: [
        { prompt: "A red wagon is in the path!", safe: "jump" },
        { prompt: "A low tree branch ahead!", safe: "duck" },
        { prompt: "A calm, clear sidewalk.", safe: "walk" },
        { prompt: "A puddle with a hose across it!", safe: "jump" },
      ],
    },
    {
      id: "when",
      kind: "quiz",
      title: "Is This a 911 Moment?",
      question: "Which one means we should call 911?",
      narration:
        "911 is only for big emergencies. Which picture is a real emergency?",
      options: [
        {
          label: "A house is on fire",
          emoji: "🔥",
          correct: true,
          feedback: "Yes! Fire is a big emergency. Call 911 right away.",
        },
        {
          label: "I dropped my ice cream",
          emoji: "🍦",
          correct: false,
          feedback: "Sad, but not an emergency. Ask a grown-up for help instead.",
        },
        {
          label: "My cartoon ended",
          emoji: "📺",
          correct: false,
          feedback: "That's not an emergency. 911 is only for danger.",
        },
        {
          label: "I can't find my sock",
          emoji: "🧦",
          correct: false,
          feedback: "Not an emergency! Let's keep looking for the sock later.",
        },
      ],
    },
    {
      id: "keypad",
      kind: "keypad",
      title: "Dial for Help",
      code: "911",
      hint: "Tap nine, one, one",
      narration: "Now tap the numbers nine, one, one on the phone.",
    },
    {
      id: "sequence",
      kind: "sequencing",
      title: "What Do We Say?",
      narration:
        "Put the steps in order. First stay calm, then say what happened, then where we are, and stay on the phone.",
      items: [
        { label: "Take a deep breath and stay calm", emoji: "😮‍💨" },
        { label: "Say what happened", emoji: "🗣️" },
        { label: "Say where you are", emoji: "🏠" },
        { label: "Stay on the phone until they say okay", emoji: "📞" },
      ],
    },
    {
      id: "match",
      kind: "matching",
      title: "Who Helps With What?",
      narration: "Match each helper with the job they do. You can do it!",
      pairs: [
        { left: "Fire", leftEmoji: "🔥", right: "Firefighter", rightEmoji: "🧑‍🚒" },
        { left: "Hurt person", leftEmoji: "🤕", right: "Paramedic", rightEmoji: "🚑" },
        { left: "Someone in trouble", leftEmoji: "🚨", right: "Police officer", rightEmoji: "👮" },
      ],
    },
    {
      id: "memory",
      kind: "memory",
      title: "Safety Memory",
      narration: "Find the matching safety pairs. Take your time!",
      cards: [
        { label: "Phone", emoji: "📞" },
        { label: "Fire truck", emoji: "🚒" },
        { label: "Ambulance", emoji: "🚑" },
        { label: "Smoke alarm", emoji: "🚨" },
      ],
    },
    {
      id: "outro",
      kind: "story",
      title: "The Helpers Arrived!",
      body: "The fire truck rolls up with lights flashing. Everyone is safe — because Nicko knew when to call 911.",
      narration:
        "Hooray! The helpers came and everyone is safe. You are a real Helper Hero!",
    },
  ],
};

function upcoming(
  id: string,
  order: number,
  title: string,
  lifeLesson: string,
  emoji: string,
  tint: Lesson["tint"],
  badge: [string, string],
  sticker: [string, string],
): Lesson {
  return {
    id,
    order,
    title,
    lifeLesson,
    emoji,
    tint,
    available: false,
    badge: { id: `${id}-badge`, name: badge[0], emoji: badge[1] },
    sticker: { id: `${id}-sticker`, name: sticker[0], emoji: sticker[1] },
    steps: [],
  };
}

export const LESSONS: Lesson[] = [
  call911,
  upcoming("kindness", 2, "Kindness Counts", "Little kind acts make big smiles.", "💗", "grape", ["Kind Heart", "💖"], ["Rainbow Heart", "🌈"]),
  upcoming("stranger-safety", 3, "Stranger Safety", "Check with a grown-up you trust.", "🛡️", "primary", ["Safe Scout", "🛡️"], ["Trusty Shield", "🔰"]),
  upcoming("big-feelings", 4, "Big Feelings", "Name it to tame it.", "😊", "sunny", ["Feelings Friend", "🌟"], ["Mood Cloud", "☁️"]),
  upcoming("fire-safety", 5, "Fire Safety", "Stop, drop, and roll.", "🧯", "coral", ["Flame Tamer", "🧯"], ["Smoke Alarm", "🚨"]),
  upcoming("crossing-streets", 6, "Crossing Streets", "Stop, look, listen, walk.", "🚦", "accent", ["Street Smart", "🚦"], ["Crosswalk", "🦓"]),
  upcoming("honesty", 7, "Honesty Helps", "The truth makes things better.", "🤝", "grape", ["Truth Teller", "🗝️"], ["Golden Star", "⭐"]),
  upcoming("teamwork", 8, "Teamwork Time", "Together is stronger.", "🧩", "primary", ["Team Captain", "🏅"], ["Puzzle Piece", "🧩"]),
];

export function getLesson(id: string) {
  return LESSONS.find((l) => l.id === id);
}