import type { Lesson } from "./types";

const call911: Lesson = {
  id: "call-911",
  order: 1,
  title: "When to Call 911",
  lifeLesson: "Know when — and how — to call for help.",
  emoji: "🚒",
  tint: "coral",
  available: true,
  skills: [
    "Telling an emergency from a small problem",
    "Dialing 911 correctly",
    "Staying calm under pressure",
    "Giving name, place, and what happened",
    "Finding a trusted adult",
  ],
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
      id: "decide",
      kind: "choice",
      title: "Nicko Needs Your Help",
      scene:
        "Nicko peeks around the corner. Mr. Bell has fallen off his ladder and is holding his arm. He can't get up. Nobody else is nearby.",
      question: "What should Nicko do?",
      narration:
        "Uh oh. Mr. Bell is hurt and can't get up. What should I do? Tap the choice you think is best.",
      options: [
        {
          label: "Call 911 — someone is really hurt",
          emoji: "📞",
          hearts: 5,
          best: true,
          feedback: "That's it! A person who is badly hurt needs help fast. Calling 911 is exactly right.",
        },
        {
          label: "Call 911 because I can't find my toy mouse",
          emoji: "🧸",
          hearts: 0,
          feedback: "A lost toy is a small problem. 911 helpers must stay free for real emergencies.",
        },
        {
          label: "Walk away and keep playing",
          emoji: "🙈",
          hearts: 0,
          feedback: "Walking away leaves Mr. Bell alone. Helpers never ignore someone in danger.",
        },
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
      id: "grownup",
      kind: "choice",
      title: "Find a Grown-Up You Trust",
      scene:
        "Nicko is still holding the phone. His heart is beating fast. Ms. Rosa, the neighbor Nicko knows well, is watering her flowers next door.",
      question: "What is the kindest, safest next step?",
      narration:
        "I called for help. Now what should I do while we wait? Pick the safest idea.",
      options: [
        {
          label: "Tell Ms. Rosa so a grown-up can help too",
          emoji: "🌷",
          hearts: 5,
          best: true,
          feedback: "Perfect. Trusted grown-ups help while the 911 helpers are on the way.",
        },
        {
          label: "Hang up and hide under the porch",
          emoji: "😰",
          hearts: 0,
          feedback: "Hiding is scary and Mr. Bell would be alone. Stay on the phone and get a grown-up.",
        },
        {
          label: "Try to lift Mr. Bell all by myself",
          emoji: "💪",
          hearts: 0,
          feedback: "Moving a hurt person can hurt them more. Wait for the helpers instead.",
        },
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
  skills: string[] = [],
): Lesson {
  return {
    id,
    order,
    title,
    lifeLesson,
    emoji,
    tint,
    available: false,
    skills,
    badge: { id: `${id}-badge`, name: badge[0], emoji: badge[1] },
    sticker: { id: `${id}-sticker`, name: sticker[0], emoji: sticker[1] },
    steps: [],
  };
}

export const LESSONS: Lesson[] = [
  call911,
  upcoming("fire-safety", 2, "Fire Safety", "Stop, drop, and roll.", "🧯", "coral", ["Flame Tamer", "🧯"], ["Smoke Alarm", "🚨"], ["Fire escape plan", "Stop, drop and roll", "Smoke alarm sounds"]),
  upcoming("stranger-safety", 3, "Stranger Safety", "Check with a grown-up you trust.", "🛡️", "primary", ["Safe Scout", "🛡️"], ["Trusty Shield", "🔰"], ["Safe vs. unsafe requests", "Family password", "Saying no loudly"]),
  upcoming("kindness", 4, "Kindness Counts", "Little kind acts make big smiles.", "💗", "grape", ["Kind Heart", "💖"], ["Rainbow Heart", "🌈"], ["Noticing others' feelings", "Sharing and including", "Kind words"]),
  upcoming("big-feelings", 5, "Big Feelings", "Name it to tame it.", "😊", "sunny", ["Feelings Friend", "🌟"], ["Mood Cloud", "☁️"], ["Naming emotions", "Calm-down breathing", "Asking for a hug"]),
  upcoming("teamwork", 6, "Teamwork Time", "Together is stronger.", "🧩", "primary", ["Team Captain", "🏅"], ["Puzzle Piece", "🧩"], ["Taking turns", "Asking for help", "Cheering others on"]),
  upcoming("healthy-habits", 7, "Healthy Habits", "Strong bodies, happy days.", "🥕", "accent", ["Habit Hero", "🥕"], ["Toothbrush", "🪥"], ["Handwashing", "Bedtime routine", "Healthy snacks"]),
  upcoming("animal-care", 8, "Animal Care", "Gentle hands, happy pets.", "🐾", "grape", ["Pet Pal", "🐾"], ["Paw Print", "🐕"], ["Gentle petting", "Food and water", "Reading animal body language"]),
  upcoming("problem-solving", 9, "Problem Solving", "Think it through, step by step.", "🧠", "sunny", ["Puzzle Brain", "🧠"], ["Lightbulb", "💡"], ["Breaking problems into steps", "Trying again", "Asking good questions"]),
  upcoming("crossing-streets", 10, "Crossing Streets", "Stop, look, listen, walk.", "🚦", "coral", ["Street Smart", "🚦"], ["Crosswalk", "🦓"], ["Using crosswalks", "Looking both ways", "Waiting for the walk signal"]),
];

export function getLesson(id: string) {
  return LESSONS.find((l) => l.id === id);
}