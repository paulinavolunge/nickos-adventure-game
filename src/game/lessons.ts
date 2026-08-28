import type { Lesson } from "./types";

const call911: Lesson = {
  id: "call-911",
  order: 1,
  title: "When to Call 911",
  lifeLesson: "Know when — and how — to call for help.",
  tryTonight: "Ask: what's the first thing you'd do if you smelled smoke?",
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
          feedback:
            "That's it! A person who is badly hurt needs help fast. Calling 911 is exactly right.",
        },
        {
          label: "Call 911 because I can't find my toy mouse",
          emoji: "🧸",
          hearts: 0,
          feedback:
            "A lost toy is a small problem. 911 helpers must stay free for real emergencies.",
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
      narration: "911 is only for big emergencies. Which picture is a real emergency?",
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
      narration: "I called for help. Now what should I do while we wait? Pick the safest idea.",
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
          feedback:
            "Hiding is scary and Mr. Bell would be alone. Stay on the phone and get a grown-up.",
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
      id: "mastery",
      kind: "mastery",
      title: "Show What You Know",
      narration: "No hints this time — show me what you know!",
      questions: [
        {
          prompt: "Which one is a real emergency?",
          options: [
            { label: "A house is on fire", emoji: "🔥", correct: true },
            { label: "I dropped my ice cream", emoji: "🍦", correct: false },
            { label: "My cartoon ended", emoji: "📺", correct: false },
          ],
        },
        {
          prompt: "Someone is badly hurt and can't get up. What do you do?",
          options: [
            { label: "Call 911", emoji: "📞", correct: true },
            { label: "Walk away and keep playing", emoji: "🙈", correct: false },
            { label: "Wait quietly and say nothing", emoji: "🤐", correct: false },
          ],
        },
        {
          prompt: "What are the three numbers you dial for help?",
          options: [
            { label: "9-1-1", emoji: "☎️", correct: true },
            { label: "1-2-3", emoji: "🔢", correct: false },
            { label: "5-5-5", emoji: "🔢", correct: false },
          ],
        },
      ],
    },
    {
      id: "outro",
      kind: "story",
      title: "The Helpers Arrived!",
      body: "The fire truck rolls up with lights flashing. Everyone is safe — because Nicko knew when to call 911.",
      narration: "Hooray! The helpers came and everyone is safe. You are a real Helper Hero!",
    },
  ],
};

const fireSafety: Lesson = {
  id: "fire-safety",
  order: 2,
  title: "Fire Safety",
  lifeLesson: "Get low, get out, stay out.",
  tryTonight:
    "Practice together: where's our family meeting spot outside, and does everyone know it?",
  emoji: "🧯",
  tint: "coral",
  available: true,
  skills: [
    "Knowing what the smoke alarm means",
    "Crawling low under smoke",
    "Stop, drop, and roll",
    "Getting out and staying out",
    "Meeting at the family meeting spot",
  ],
  badge: { id: "flame-tamer", name: "Flame Tamer", emoji: "🧯" },
  sticker: { id: "smoke-alarm", name: "Beeping Smoke Alarm", emoji: "🚨" },
  outfit: { id: "safety-vest", name: "Safety Vest", emoji: "🦺" },
  steps: [
    {
      id: "intro",
      kind: "story",
      title: "The Alarm Is Beeping!",
      body: "Nicko is curled up asleep. BEEP! BEEP! BEEP! The smoke alarm is loud and fast. It is not a toy and it is not a game. It means one thing: get out.",
      narration:
        "That beeping sound means we need to move. Don't worry — I know just what to do. Come with me!",
    },
    {
      id: "crawl",
      kind: "obstacle",
      title: "Crawl to the Door",
      goalLabel: "Reach the front door",
      narration:
        "Smoke floats up high, so the good air is down low. Help me pick the safe move each time!",
      lanes: [
        { prompt: "Grey smoke is up near the ceiling!", safe: "duck" },
        { prompt: "A chair fell over in the hallway!", safe: "jump" },
        { prompt: "The hallway here is cool and clear.", safe: "walk" },
        { prompt: "Thick smoke by the stairs!", safe: "duck" },
      ],
    },
    {
      id: "alarm-means",
      kind: "quiz",
      title: "What Does the Beeping Mean?",
      question: "The smoke alarm is beeping. What does it mean?",
      narration: "The smoke alarm is trying to tell us something important. What is it?",
      options: [
        {
          label: "There might be a fire — get out",
          emoji: "🚨",
          correct: true,
          feedback: "Yes! The alarm gives us extra time. When it beeps, we go outside right away.",
        },
        {
          label: "Time for a snack",
          emoji: "🍪",
          correct: false,
          feedback: "Not this one! That beeping means danger, not snack time.",
        },
        {
          label: "Someone is at the door",
          emoji: "🚪",
          correct: false,
          feedback: "Good guess, but no. A doorbell dings once. A smoke alarm beeps loud and fast.",
        },
        {
          label: "It's my birthday",
          emoji: "🎂",
          correct: false,
          feedback: "Ha! I wish. That beeping means we need to get outside.",
        },
      ],
    },
    {
      id: "hot-door",
      kind: "choice",
      title: "Hot Door or Cool Door?",
      scene:
        "Nicko reaches the bedroom door. He touches the back of his paw to it, very gently. The door feels HOT.",
      question: "What should Nicko do?",
      narration:
        "Whoa — my paw almost went for the handle! Wait... a hot door means fire's on the other side. What should we do instead?",
      options: [
        {
          label: "Leave it shut and use the other way out",
          emoji: "🚪",
          hearts: 5,
          best: true,
          feedback:
            "Exactly right. A hot door stays closed. Smart helpers always know a second way out.",
        },
        {
          label: "Open it fast and run through",
          emoji: "🔥",
          hearts: 0,
          feedback:
            "A hot door has fire behind it. Opening it lets the fire in. Let's find another way out instead.",
        },
        {
          label: "Hide under the blanket",
          emoji: "🛏️",
          hearts: 0,
          feedback:
            "Hiding feels safe, but helpers can't find us there. We always move toward the way out.",
        },
      ],
    },
    {
      id: "stop-drop-roll",
      kind: "sequencing",
      title: "Stop, Drop, and Roll",
      narration:
        "If clothes ever catch fire, we do four things in order. Put them in the right order with me!",
      items: [
        { label: "Stop right where you are", emoji: "✋" },
        { label: "Drop down to the ground", emoji: "⬇️" },
        { label: "Cover your face with your hands", emoji: "🙈" },
        { label: "Roll over and over", emoji: "🔄" },
      ],
    },
    {
      id: "helpers",
      kind: "matching",
      title: "Fire Safety Helpers",
      narration: "Every fire helper has a job. Match each one to what it does!",
      pairs: [
        { left: "Smoke alarm", leftEmoji: "🚨", right: "Warns you early", rightEmoji: "👂" },
        {
          left: "Fire extinguisher",
          leftEmoji: "🧯",
          right: "A grown-up's tool",
          rightEmoji: "🧑‍🚒",
        },
        {
          left: "Meeting spot",
          leftEmoji: "🌳",
          right: "Where family finds you",
          rightEmoji: "👨‍👩‍👧",
        },
      ],
    },
    {
      id: "keypad",
      kind: "keypad",
      title: "Call From Outside",
      code: "911",
      hint: "Tap nine, one, one from a safe place outside",
      narration:
        "We are outside now, so it's safe to call. Never stay inside to call. Tap nine, one, one!",
    },
    {
      id: "memory",
      kind: "memory",
      title: "Fire Safety Memory",
      narration: "Find the matching fire safety pairs. Take your time!",
      cards: [
        { label: "Smoke alarm", emoji: "🚨" },
        { label: "Fire truck", emoji: "🚒" },
        { label: "Fire extinguisher", emoji: "🧯" },
        { label: "Meeting tree", emoji: "🌳" },
      ],
    },
    {
      id: "stay-out",
      kind: "choice",
      title: "Stay Out, Stay Safe",
      scene:
        "Nicko is outside at the big oak tree. Then he remembers — his favorite toy mouse is still inside!",
      question: "What should Nicko do?",
      narration: "Oh no, my toy mouse is still inside. What should I do?",
      options: [
        {
          label: "Stay outside — toys can be replaced",
          emoji: "🌳",
          hearts: 5,
          best: true,
          feedback:
            "That's the big rule: once you're out, you stay out. Toys can be replaced. You cannot.",
        },
        {
          label: "Run back in to grab it",
          emoji: "🧸",
          hearts: 0,
          feedback:
            "Never go back inside. Not for toys, not for anything. Tell a firefighter instead — they may bring it out.",
        },
        {
          label: "Send a friend in to get it",
          emoji: "🐕",
          hearts: 0,
          feedback:
            "Nobody goes back in — not you, not a friend. Everyone stays at the meeting spot.",
        },
      ],
    },
    {
      id: "mastery",
      kind: "mastery",
      title: "Show What You Know",
      narration: "No hints this time — show me what you know!",
      questions: [
        {
          prompt: "The smoke alarm is beeping. What does it mean?",
          options: [
            { label: "There might be a fire — get out", emoji: "🚨", correct: true },
            { label: "Time for a snack", emoji: "🍪", correct: false },
            { label: "Someone's at the door", emoji: "🚪", correct: false },
          ],
        },
        {
          prompt: "You touch a door and it feels hot. What do you do?",
          options: [
            { label: "Leave it shut, use another way out", emoji: "🚪", correct: true },
            { label: "Open it and run through", emoji: "🔥", correct: false },
            { label: "Hide under the blanket", emoji: "🛏️", correct: false },
          ],
        },
        {
          prompt: "If your clothes ever catch fire, what do you do?",
          options: [
            { label: "Stop, drop, and roll", emoji: "🔄", correct: true },
            { label: "Run to find water", emoji: "🏃", correct: false },
            { label: "Wave your arms to put it out", emoji: "🙌", correct: false },
          ],
        },
      ],
    },
    {
      id: "outro",
      kind: "story",
      title: "Everyone Is Safe",
      body: "The fire truck pulls up. Everyone is together at the big oak tree, and the firefighters count every single one. Nicko got low, got out, and stayed out.",
      narration: "We did it! Everyone is safe at the meeting tree. You are a real Flame Tamer!",
    },
  ],
};

const strangerSafety: Lesson = {
  id: "stranger-safety",
  order: 3,
  title: "Stranger Safety",
  lifeLesson: "Check first with a grown-up you trust.",
  tryTonight: "Ask: if you got lost at the store, who are three safe helpers you could ask?",
  emoji: "🛡️",
  tint: "primary",
  available: true,
  skills: [
    "Checking first before going anywhere",
    "Saying no in a big voice",
    "Finding a safe helper when lost",
    "Knowing a trusted grown-up",
    "Telling someone what happened",
  ],
  badge: { id: "safe-scout", name: "Safe Scout", emoji: "🛡️" },
  sticker: { id: "trusty-shield", name: "Trusty Shield", emoji: "🔰" },
  outfit: { id: "explorer-backpack", name: "Explorer Backpack", emoji: "🎒" },
  steps: [
    {
      id: "intro",
      kind: "story",
      title: "A Day at the Park",
      body: "Nicko is at the park with Grandpa. Grandpa is sitting on the bench where Nicko can see him. Today Nicko learns how to stay safe, even when someone he doesn't know says hello.",
      narration:
        "Hi friend! Grandpa is on the bench. Let's learn how to keep ourselves safe at the park.",
    },
    {
      id: "in-sight",
      kind: "obstacle",
      title: "Stay Where Grandpa Can See",
      goalLabel: "Get to the swings",
      narration: "The safest spot is where my grown-up can see me. Help me pick the right move!",
      lanes: [
        { prompt: "A tall hedge would hide you — take the open path instead.", safe: "walk" },
        { prompt: "A low fence is across the path!", safe: "jump" },
        { prompt: "A swing chain is swinging at head height!", safe: "duck" },
        { prompt: "A wide sunny path where Grandpa can see you.", safe: "walk" },
      ],
    },
    {
      id: "car",
      kind: "choice",
      title: "A Car Slows Down",
      scene:
        'A car Nicko has never seen before slows down. The driver smiles and says, "I lost my puppy. Can you help me look?"',
      question: "What should Nicko do?",
      narration: "Someone I don't know is asking me for help. What should I do? Tap your answer.",
      options: [
        {
          label: "Step back and run to Grandpa",
          emoji: "🏃",
          hearts: 5,
          best: true,
          feedback:
            "Perfect. Step back, then go straight to your grown-up. You never have to be polite to feel safe.",
        },
        {
          label: "Get in and help find the puppy",
          emoji: "🚗",
          hearts: 0,
          feedback:
            "Here's the secret: grown-ups ask other grown-ups for help, not kids. That question is a warning sign.",
        },
        {
          label: "Walk closer to see the driver",
          emoji: "👀",
          hearts: 0,
          feedback: "Stay far back from a car you don't know. Step away and go find your grown-up.",
        },
      ],
    },
    {
      id: "safe-helper",
      kind: "quiz",
      title: "Who Is a Safe Helper?",
      question: "Nicko can't find Grandpa. Who is safest to ask for help?",
      narration: "If I get lost, who should I ask? Pick the safest helper.",
      options: [
        {
          label: "A mom or dad with kids nearby",
          emoji: "👩‍👧",
          correct: true,
          feedback:
            "Yes! A grown-up with children, or a worker in a uniform, is a good helper to ask.",
        },
        {
          label: "Someone who says 'don't tell anyone'",
          emoji: "🤫",
          correct: false,
          feedback: "That's a big warning sign. Safe grown-ups never ask kids to keep secrets.",
        },
        {
          label: "Whoever offers me candy",
          emoji: "🍬",
          correct: false,
          feedback: "Treats from someone you don't know are always a no. Go find a safe helper.",
        },
        {
          label: "Nobody — just walk home alone",
          emoji: "🚶",
          correct: false,
          feedback:
            "Walking off alone makes it harder to find you. Stay put and ask a safe helper.",
        },
      ],
    },
    {
      id: "no-go-yell-tell",
      kind: "sequencing",
      title: "No, Go, Yell, Tell",
      narration: "Four brave steps, in order. Say it with me: No. Go. Yell. Tell.",
      items: [
        { label: "Say NO in a big voice", emoji: "✋" },
        { label: "Go — walk away fast", emoji: "🏃" },
        { label: "Yell so people hear you", emoji: "📣" },
        { label: "Tell a grown-up you trust", emoji: "🗣️" },
      ],
    },
    {
      id: "check-first",
      kind: "choice",
      title: "Check First",
      scene:
        "Nicko's neighbor Mr. Fox waves. \"Want to come see my new kittens? It'll only take a second.\" Nicko LOVES kittens.",
      question: "What is the safe thing to do?",
      narration: "Kittens! But wait — what's the rule about going somewhere?",
      options: [
        {
          label: "Ask Grandpa first, every single time",
          emoji: "🙋",
          hearts: 5,
          best: true,
          feedback:
            "That's the Check First rule. Before you go anywhere with anyone, you ask your grown-up. Every time.",
        },
        {
          label: "Go quickly, it's only a second",
          emoji: "⏱️",
          hearts: 0,
          feedback:
            "Even for one second, we check first. If Grandpa doesn't know where you are, it isn't safe.",
        },
        {
          label: "Go because Nicko knows his face",
          emoji: "👋",
          hearts: 0,
          feedback:
            "Check First works for people we know too — even neighbors and friends. Always ask.",
        },
      ],
    },
    {
      id: "keypad",
      kind: "keypad",
      title: "Learn a Grown-Up's Number",
      code: "555",
      hint: "Tap Grandpa's number: five, five, five",
      narration:
        "Knowing a grown-up's phone number helps a safe helper reach them fast. Let's practice!",
    },
    {
      id: "safe-or-ask",
      kind: "matching",
      title: "Safe or Ask First?",
      narration: "Match each situation with the safe thing to do.",
      pairs: [
        {
          left: "Someone you don't know offers a ride",
          leftEmoji: "🚗",
          right: "Say no and tell",
          rightEmoji: "🛡️",
        },
        {
          left: "A helper in a uniform at the store",
          leftEmoji: "🧑‍💼",
          right: "Safe to ask if lost",
          rightEmoji: "🏪",
        },
        {
          left: "Someone says 'keep this a secret'",
          leftEmoji: "🤫",
          right: "Always tell a grown-up",
          rightEmoji: "🗣️",
        },
      ],
    },
    {
      id: "memory",
      kind: "memory",
      title: "Safe Scout Memory",
      narration: "Find the matching Safe Scout pairs. You've got this!",
      cards: [
        { label: "Trusted grown-up", emoji: "🧑‍🦳" },
        { label: "Big voice", emoji: "📣" },
        { label: "Safe helper", emoji: "👮" },
        { label: "Tell someone", emoji: "🗣️" },
      ],
    },
    {
      id: "mastery",
      kind: "mastery",
      title: "Show What You Know",
      narration: "No hints this time — show me what you know!",
      questions: [
        {
          prompt:
            "A car you don't know slows down and the driver asks for help finding a puppy. What do you do?",
          options: [
            { label: "Step back and run to your grown-up", emoji: "🏃", correct: true },
            { label: "Get in to help look", emoji: "🚗", correct: false },
            { label: "Walk closer to see", emoji: "👀", correct: false },
          ],
        },
        {
          prompt: "You're lost at the park. Who is the safest person to ask for help?",
          options: [
            { label: "A mom or dad with kids nearby", emoji: "👩‍👧", correct: true },
            { label: "Someone who says 'don't tell anyone'", emoji: "🤫", correct: false },
            { label: "Whoever offers you candy", emoji: "🍬", correct: false },
          ],
        },
        {
          prompt:
            "Before going anywhere with anyone — even someone you know — what do you always do?",
          options: [
            { label: "Check first with your grown-up", emoji: "🙋", correct: true },
            { label: "Go quick, it's only a second", emoji: "⏱️", correct: false },
            { label: "Go because you know their face", emoji: "👋", correct: false },
          ],
        },
      ],
    },
    {
      id: "outro",
      kind: "story",
      title: "Nicko Told Grandpa",
      body: "Nicko told Grandpa everything that happened at the park. Grandpa said the telling was the bravest part of all. Secrets that feel yucky always get told.",
      narration: "I told Grandpa and he was so proud of me. You are a true Safe Scout!",
    },
  ],
};

const kindnessCounts: Lesson = {
  id: "kindness",
  order: 4,
  title: "Kindness Counts",
  lifeLesson: "Little kind acts make big smiles.",
  tryTonight: "Ask at dinner: who did you help today, even in a small way?",
  emoji: "💗",
  tint: "grape",
  available: true,
  skills: [
    "Noticing when someone needs help",
    "Sharing and including others",
    "Using kind words",
    "Saying sorry and meaning it",
    "Helping without being asked",
  ],
  badge: { id: "kind-heart", name: "Kind Heart", emoji: "💖" },
  sticker: { id: "rainbow-heart", name: "Rainbow Heart", emoji: "🌈" },
  outfit: { id: "kindness-cape", name: "Kindness Cape", emoji: "🦸" },
  steps: [
    {
      id: "intro",
      kind: "story",
      title: "Ruby's Sad Day",
      body: "Nicko spots his friend Ruby under the big tree. Her ears are droopy and her tail is not wagging. Something is wrong.",
      narration:
        "Look — Ruby looks sad. When a friend needs us, kindness is what helps. Come with me!",
    },
    {
      id: "run-to-ruby",
      kind: "obstacle",
      title: "Bring Ruby the Ball",
      goalLabel: "Reach Ruby",
      narration:
        "I have Ruby's favorite ball. Help me hop and duck across the playground to bring it to her!",
      lanes: [
        { prompt: "A jump rope stretched across the path!", safe: "jump" },
        { prompt: "A low branch full of berries!", safe: "duck" },
        { prompt: "A clear grassy path.", safe: "walk" },
        { prompt: "A scooter left in the way!", safe: "jump" },
      ],
    },
    {
      id: "what-is-kind",
      kind: "quiz",
      title: "Which One Is Kind?",
      question: "Which thing shows kindness?",
      narration: "Kindness means we help and care. Which one shows kindness?",
      options: [
        {
          label: "Sharing your snack with a friend",
          emoji: "🍎",
          correct: true,
          feedback: "Yes! Sharing shows a friend that you care.",
        },
        {
          label: "Laughing when someone falls",
          emoji: "😆",
          correct: false,
          feedback: "Laughing when someone is hurt is not kind. Ask if they are okay instead.",
        },
        {
          label: "Grabbing a toy you want",
          emoji: "🧸",
          correct: false,
          feedback: "Grabbing is not kind. We ask, and we take turns.",
        },
        {
          label: "Ignoring someone who is lonely",
          emoji: "🙈",
          correct: false,
          feedback: "A lonely friend needs us to notice them. A simple hi can help a lot.",
        },
      ],
    },
    {
      id: "new-friend",
      kind: "choice",
      title: "The New Kitten",
      scene:
        "A brand-new kitten named Momo is standing by the fence, all alone. She doesn't know anyone at the park yet.",
      question: "What is the kind thing to do?",
      narration: "Momo is new and looks nervous. What should I do?",
      options: [
        {
          label: "Say hi and invite her to play",
          emoji: "👋",
          hearts: 5,
          best: true,
          feedback: "Perfect! One friendly hello can turn a whole day around.",
        },
        {
          label: "Whisper about her with friends",
          emoji: "🤫",
          hearts: 0,
          feedback: "Whispering can hurt feelings. If we talk about someone, we talk kindly.",
        },
        {
          label: "Wait for her to come to us",
          emoji: "⏳",
          hearts: 0,
          feedback:
            "Waiting is easy for us, but scary for someone new. Being first to say hi is brave.",
        },
      ],
    },
    {
      id: "say-sorry",
      kind: "sequencing",
      title: "How to Say Sorry",
      narration:
        "When we hurt someone by accident, saying sorry has four steps. Put them in order with me!",
      items: [
        { label: "Stop and go over to them", emoji: "✋" },
        { label: "Look them in the eyes", emoji: "👀" },
        { label: "Say 'I'm sorry'", emoji: "💬" },
        { label: "Ask 'How can I help?'", emoji: "🤝" },
      ],
    },
    {
      id: "kind-match",
      kind: "matching",
      title: "Kind Acts Match",
      narration: "Match each kind act with why it matters!",
      pairs: [
        {
          left: "Sharing your snack",
          leftEmoji: "🍎",
          right: "A friend feels cared for",
          rightEmoji: "🥰",
        },
        {
          left: "Inviting someone to play",
          leftEmoji: "🧩",
          right: "Nobody is left out",
          rightEmoji: "🎉",
        },
        {
          left: "Saying 'thank you'",
          leftEmoji: "🙏",
          right: "Shows you noticed",
          rightEmoji: "👀",
        },
      ],
    },
    {
      id: "keypad",
      kind: "keypad",
      title: "Ring the Doorbell",
      code: "123",
      hint: "Tap Ruby's door code: one, two, three",
      narration:
        "Let's go cheer Ruby up in person. Her family gave us the door code — tap one, two, three!",
    },
    {
      id: "memory",
      kind: "memory",
      title: "Kindness Memory",
      narration: "Find the matching kindness pairs. You've got this!",
      cards: [
        { label: "Hug", emoji: "🤗" },
        { label: "Share", emoji: "🍎" },
        { label: "Help", emoji: "🤝" },
        { label: "Smile", emoji: "😊" },
      ],
    },
    {
      id: "spill",
      kind: "choice",
      title: "The Big Spill",
      scene:
        "In the lunchroom, a kid trips and their whole tray of food goes flying. Everyone stops and stares.",
      question: "What should Nicko do?",
      narration: "Uh oh, they dropped their lunch. What should I do?",
      options: [
        {
          label: "Help pick it up and get more food",
          emoji: "🍽️",
          hearts: 5,
          best: true,
          feedback:
            "That's it! Helping without being asked is one of the biggest kindnesses of all.",
        },
        {
          label: "Point and laugh with everyone",
          emoji: "😂",
          hearts: 0,
          feedback: "Laughing when someone feels bad only hurts more. Kind cats help.",
        },
        {
          label: "Look away and keep eating",
          emoji: "😶",
          hearts: 0,
          feedback: "Ignoring a friend in a hard moment misses the chance to help.",
        },
      ],
    },
    {
      id: "mastery",
      kind: "mastery",
      title: "Show What You Know",
      narration: "No hints this time — show me what you know!",
      questions: [
        {
          prompt: "Which one shows kindness?",
          options: [
            { label: "Sharing your snack", emoji: "🍎", correct: true },
            { label: "Laughing when someone falls", emoji: "😆", correct: false },
            { label: "Grabbing a toy you want", emoji: "🧸", correct: false },
          ],
        },
        {
          prompt: "A new kid is standing alone looking nervous. What's the kind thing to do?",
          options: [
            { label: "Say hi and invite them to play", emoji: "👋", correct: true },
            { label: "Whisper about them with friends", emoji: "🤫", correct: false },
            { label: "Wait for them to come to you", emoji: "⏳", correct: false },
          ],
        },
        {
          prompt: "Someone spills their lunch tray and everyone is staring. What do you do?",
          options: [
            { label: "Help pick it up", emoji: "🍽️", correct: true },
            { label: "Point and laugh", emoji: "😂", correct: false },
            { label: "Look away and keep eating", emoji: "😶", correct: false },
          ],
        },
      ],
    },
    {
      id: "outro",
      kind: "story",
      title: "Ruby Wagged Her Tail",
      body: "Ruby's tail started wagging when Nicko sat next to her. Momo joined in too. All the little kind things Nicko did today made three friends smile.",
      narration: "See? One kind moment leads to another. You are a real Kind Heart!",
    },
  ],
};

const bigFeelings: Lesson = {
  id: "big-feelings",
  order: 5,
  title: "Big Feelings",
  lifeLesson: "Name it to tame it.",
  tryTonight:
    "Practice together: take three slow breaths together next time either of you feels frustrated.",
  emoji: "😊",
  tint: "sunny",
  available: true,
  skills: [
    "Naming what you feel",
    "Calm-down breathing",
    "Asking for a hug",
    "Using kind words when upset",
    "Taking a break when you need one",
  ],
  badge: { id: "feelings-friend", name: "Feelings Friend", emoji: "🌟" },
  sticker: { id: "mood-cloud", name: "Mood Cloud", emoji: "☁️" },
  outfit: { id: "cozy-sweater", name: "Cozy Sweater", emoji: "🧥" },
  steps: [
    {
      id: "intro",
      kind: "story",
      title: "A Big-Feelings Day",
      body: "Nicko's tummy feels tight. His whiskers twitch. He doesn't know the name for the feeling — but it feels BIG. Today he learns that every feeling has a name.",
      narration:
        "My tummy feels weird. Have you ever felt like that? Let's learn what our big feelings are trying to tell us.",
    },
    {
      id: "calm-corner",
      kind: "obstacle",
      title: "Walk to the Calm Corner",
      goalLabel: "Reach the cozy chair",
      narration: "When feelings get big, I go to my calm corner. Help me pick the safe way there!",
      lanes: [
        { prompt: "Toys spread across the floor!", safe: "jump" },
        { prompt: "A soft blanket hanging low!", safe: "duck" },
        { prompt: "A clear path along the rug.", safe: "walk" },
        { prompt: "A ball rolling toward you!", safe: "jump" },
      ],
    },
    {
      id: "name-it",
      kind: "quiz",
      title: "Name That Feeling",
      question:
        "A friend took Nicko's ball and won't give it back. What is Nicko probably feeling?",
      narration: "My ball is gone and I don't like it. Which feeling matches best?",
      options: [
        {
          label: "Frustrated",
          emoji: "😤",
          correct: true,
          feedback: "Yes! Frustrated means 'this isn't going how I want.' Naming it helps!",
        },
        {
          label: "Sleepy",
          emoji: "😴",
          correct: false,
          feedback: "Sleepy is a body feeling. This one is about wanting the ball back.",
        },
        {
          label: "Excited",
          emoji: "🤩",
          correct: false,
          feedback: "Excited feels fun and bouncy. Losing a ball doesn't feel like that.",
        },
        {
          label: "Hungry",
          emoji: "🍽️",
          correct: false,
          feedback: "Hungry is a tummy feeling. This one is a heart feeling.",
        },
      ],
    },
    {
      id: "broken-toy",
      kind: "choice",
      title: "The Broken Toy",
      scene:
        "Nicko's favorite toy just snapped in half. His chest feels hot and his eyes are watering. He wants to throw something.",
      question: "What is the safe, kind thing to do?",
      narration:
        "I almost chucked this toy across the room — whew, stopped myself just in time! What should I do instead with this big feeling?",
      options: [
        {
          label: "Take three big breaths and ask for a hug",
          emoji: "🌬️",
          hearts: 5,
          best: true,
          feedback:
            "Yes! Big breaths tell your body 'we are safe.' Then a hug helps the feeling shrink.",
        },
        {
          label: "Throw something across the room",
          emoji: "💥",
          hearts: 0,
          feedback:
            "Throwing doesn't fix it and can hurt someone. Big feelings need calm, not crashes.",
        },
        {
          label: "Yell at whoever is nearby",
          emoji: "📣",
          hearts: 0,
          feedback:
            "Yelling passes the hurt to someone else. Our feelings are ours to feel — kindly.",
        },
      ],
    },
    {
      id: "breathing",
      kind: "sequencing",
      title: "Calm-Down Breathing",
      narration:
        "Four steps for when feelings feel too big. Put them in order and breathe with me!",
      items: [
        { label: "Stop and put a paw on your chest", emoji: "✋" },
        { label: "Breathe in slow (count to four)", emoji: "🌬️" },
        { label: "Hold for a moment", emoji: "🫁" },
        { label: "Breathe out even slower", emoji: "😌" },
      ],
    },
    {
      id: "feeling-match",
      kind: "matching",
      title: "What Helps?",
      narration: "Every big feeling has something that helps. Match them!",
      pairs: [
        { left: "Feeling sad", leftEmoji: "😢", right: "Ask for a hug", rightEmoji: "🤗" },
        { left: "Feeling mad", leftEmoji: "😠", right: "Take deep breaths", rightEmoji: "🌬️" },
        {
          left: "Feeling scared",
          leftEmoji: "😨",
          right: "Tell a grown-up",
          rightEmoji: "🧑‍🦳",
        },
      ],
    },
    {
      id: "keypad",
      kind: "keypad",
      title: "Call a Trusted Grown-Up",
      code: "444",
      hint: "Tap four, four, four to reach Mom",
      narration: "When a feeling is too big to hold alone, a grown-up can help. Let's call Mom!",
    },
    {
      id: "memory",
      kind: "memory",
      title: "Feelings Memory",
      narration: "Match each feeling with its pair. Take your time — all feelings are okay!",
      cards: [
        { label: "Happy", emoji: "😊" },
        { label: "Sad", emoji: "😢" },
        { label: "Mad", emoji: "😠" },
        { label: "Calm", emoji: "😌" },
      ],
    },
    {
      id: "grumpy-morning",
      kind: "choice",
      title: "The Grumpy Morning",
      scene:
        "Nicko woke up on the wrong side of the bed. Everything feels annoying. Grandpa asks if he wants breakfast.",
      question: "What is the best thing to say?",
      narration: "I feel grumpy for no reason. What should I say to Grandpa?",
      options: [
        {
          label: "'I feel grumpy. I need a minute.'",
          emoji: "💬",
          hearts: 5,
          best: true,
          feedback:
            "Perfect! Naming the feeling and asking for space is the bravest thing you can do.",
        },
        {
          label: "Grumble and stomp off",
          emoji: "😤",
          hearts: 0,
          feedback: "Stomping doesn't tell Grandpa what you need. Words work better than stomps.",
        },
        {
          label: "Snap at Grandpa about breakfast",
          emoji: "🗯️",
          hearts: 0,
          feedback: "Grandpa didn't cause the grumpy feeling. He is your helper, not your target.",
        },
      ],
    },
    {
      id: "mastery",
      kind: "mastery",
      title: "Show What You Know",
      narration: "No hints this time — show me what you know!",
      questions: [
        {
          prompt:
            "Your favorite toy just broke and you feel SO upset. What's the safe thing to do?",
          options: [
            { label: "Take deep breaths and ask for a hug", emoji: "🌬️", correct: true },
            { label: "Throw something across the room", emoji: "💥", correct: false },
            { label: "Yell at whoever is nearby", emoji: "📣", correct: false },
          ],
        },
        {
          prompt: "A friend took your ball and won't give it back. What are you probably feeling?",
          options: [
            { label: "Frustrated", emoji: "😤", correct: true },
            { label: "Sleepy", emoji: "😴", correct: false },
            { label: "Excited", emoji: "🤩", correct: false },
          ],
        },
        {
          prompt: "You wake up grumpy for no reason. What's the best thing to say?",
          options: [
            { label: "'I feel grumpy. I need a minute.'", emoji: "💬", correct: true },
            { label: "Grumble and stomp off", emoji: "😤", correct: false },
            { label: "Snap at whoever is nearby", emoji: "🗯️", correct: false },
          ],
        },
      ],
    },
    {
      id: "outro",
      kind: "story",
      title: "The Feeling Shrank",
      body: "After a hug from Grandpa and three big breaths, Nicko's big feeling turned into a little one. He learned that feelings are like clouds — they roll in, and they roll right back out.",
      narration:
        "You did it! When we name a feeling, we take away its power. You are a real Feelings Friend!",
    },
  ],
};

const teamworkTime: Lesson = {
  id: "teamwork",
  order: 6,
  title: "Teamwork Time",
  lifeLesson: "Together is stronger.",
  tryTonight: "Ask: what's one thing you and a friend built or solved together this week?",
  emoji: "🧩",
  tint: "primary",
  available: true,
  skills: [
    "Taking turns",
    "Asking for help",
    "Cheering others on",
    "Sharing the load",
    "Working through disagreements",
  ],
  badge: { id: "team-captain", name: "Team Captain", emoji: "🏅" },
  sticker: { id: "puzzle-piece", name: "Puzzle Piece", emoji: "🧩" },
  outfit: { id: "team-jersey", name: "Team Jersey", emoji: "🎽" },
  steps: [
    {
      id: "intro",
      kind: "story",
      title: "The Big Treehouse Plan",
      body: "Nicko and his friends want to build the biggest treehouse ever. But the boards are heavy and the plan is tricky. One kitten alone can't do it — but a team can.",
      narration:
        "This treehouse is too big for one cat. Good thing I have you and my friends. Let's team up!",
    },
    {
      id: "carry",
      kind: "obstacle",
      title: "Carry the Big Log",
      goalLabel: "Reach the build site",
      narration:
        "We're carrying a long log together. Help me pick the safe move so we don't drop it!",
      lanes: [
        { prompt: "A puddle right in the path!", safe: "jump" },
        { prompt: "A low clothesline stretched across!", safe: "duck" },
        { prompt: "A smooth open patch of grass.", safe: "walk" },
        { prompt: "A garden hose looped in the way!", safe: "jump" },
      ],
    },
    {
      id: "good-teammate",
      kind: "quiz",
      title: "What Makes a Good Teammate?",
      question: "Which one is the sign of a great teammate?",
      narration: "A great team is made of great teammates. Which one is being a good teammate?",
      options: [
        {
          label: "Cheering when a friend tries",
          emoji: "🎉",
          correct: true,
          feedback: "Yes! Cheering makes everyone braver — even when things are hard.",
        },
        {
          label: "Doing all the work alone",
          emoji: "😤",
          correct: false,
          feedback:
            "A team means everyone helps. Sharing the load makes the job smaller for everyone.",
        },
        {
          label: "Telling a friend they did it wrong",
          emoji: "🙄",
          correct: false,
          feedback: "Kind coaching works better. Try 'want to try it this way?' instead.",
        },
        {
          label: "Taking the biggest piece",
          emoji: "🍰",
          correct: false,
          feedback: "Fair shares keep the team happy. Grabbing the biggest piece isn't teamwork.",
        },
      ],
    },
    {
      id: "reach",
      kind: "choice",
      title: "Too High to Reach",
      scene:
        "Ruby needs the last nail from the very top shelf. Even on her tippy-toes she can't reach it.",
      question: "What's the best move?",
      narration: "Ruby can't reach. What should I do?",
      options: [
        {
          label: "Boost her up together",
          emoji: "🤝",
          hearts: 5,
          best: true,
          feedback: "That's it! Two paws lifting is stronger than one. That's teamwork.",
        },
        {
          label: "Say 'guess we're stuck then'",
          emoji: "🤷",
          hearts: 0,
          feedback: "Giving up too fast wastes your team's brain power. Try together first.",
        },
        {
          label: "Climb up alone and leave her out",
          emoji: "🧗",
          hearts: 0,
          feedback: "Solving it alone can make a teammate feel left out. Ruby wanted to help too.",
        },
      ],
    },
    {
      id: "disagree",
      kind: "sequencing",
      title: "Working Through a Disagreement",
      narration: "When teammates disagree, four calm steps help. Put them in order!",
      items: [
        { label: "Stop and take a breath", emoji: "🌬️" },
        { label: "Listen to their idea first", emoji: "👂" },
        { label: "Take turns saying yours", emoji: "🗣️" },
        { label: "Pick the plan together", emoji: "🤝" },
      ],
    },
    {
      id: "roles",
      kind: "matching",
      title: "Everybody Has a Job",
      narration: "On a great team, everyone helps in a different way. Match the job!",
      pairs: [
        { left: "The planner", leftEmoji: "🧠", right: "Figures out the steps", rightEmoji: "📋" },
        { left: "The builder", leftEmoji: "🔨", right: "Puts it all together", rightEmoji: "🏗️" },
        { left: "The cheerleader", leftEmoji: "📣", right: "Keeps spirits up", rightEmoji: "🎉" },
      ],
    },
    {
      id: "keypad",
      kind: "keypad",
      title: "Call the Team on the Walkie-Talkie",
      code: "555",
      hint: "Tap the team channel: five, five, five",
      narration:
        "Time to radio the team on the walkie-talkie! Tap five, five, five to open the channel.",
    },
    {
      id: "memory",
      kind: "memory",
      title: "Teamwork Memory",
      narration: "Find the matching teamwork pairs. Together, we've got this!",
      cards: [
        { label: "High five", emoji: "🙌" },
        { label: "Cheer", emoji: "📣" },
        { label: "Plan", emoji: "📋" },
        { label: "Build", emoji: "🔨" },
      ],
    },
    {
      id: "win",
      kind: "choice",
      title: "The Treehouse Is Done!",
      scene:
        "The treehouse is finally built. Everyone is smiling. Nicko was the one who carried the last board up the ladder.",
      question: "What should Nicko say?",
      narration: "We finished! What should I say?",
      options: [
        {
          label: "'We did it — together!'",
          emoji: "🎉",
          hearts: 5,
          best: true,
          feedback: "Yes! Sharing the win makes the whole team proud.",
        },
        {
          label: "'I did the hardest part'",
          emoji: "😎",
          hearts: 0,
          feedback: "Bragging shrinks other people's happy. Team wins belong to everyone.",
        },
        {
          label: "Say nothing and take the biggest snack",
          emoji: "🍪",
          hearts: 0,
          feedback: "The team worked with you. Celebrate together — snacks too.",
        },
      ],
    },
    {
      id: "mastery",
      kind: "mastery",
      title: "Show What You Know",
      narration: "No hints this time — show me what you know!",
      questions: [
        {
          prompt: "Which one is being a good teammate?",
          options: [
            { label: "Cheering when a friend tries", emoji: "🎉", correct: true },
            { label: "Doing all the work alone", emoji: "😤", correct: false },
            { label: "Taking the biggest piece", emoji: "🍰", correct: false },
          ],
        },
        {
          prompt: "A friend can't reach the top shelf. What's the best move?",
          options: [
            { label: "Boost them up together", emoji: "🤝", correct: true },
            { label: "Say 'guess we're stuck'", emoji: "🤷", correct: false },
            { label: "Climb up alone, leave them out", emoji: "🧗", correct: false },
          ],
        },
        {
          prompt: "Your team finishes the big project. What should you say?",
          options: [
            { label: "'We did it — together!'", emoji: "🎉", correct: true },
            { label: "'I did the hardest part'", emoji: "😎", correct: false },
            { label: "Say nothing, grab the biggest snack", emoji: "🍪", correct: false },
          ],
        },
      ],
    },
    {
      id: "outro",
      kind: "story",
      title: "Everyone in the Photo",
      body: "The friends took a picture at the top of the new treehouse. Everyone was in it, everyone was grinning. Together really was stronger.",
      narration: "Look at that team! You are a true Team Captain!",
    },
  ],
};

const healthyHabits: Lesson = {
  id: "healthy-habits",
  order: 7,
  title: "Healthy Habits",
  lifeLesson: "Strong bodies, happy days.",
  tryTonight: "Do together: brush teeth side by side tonight and count to 20 together.",
  emoji: "🥕",
  tint: "accent",
  available: true,
  skills: [
    "Washing your paws",
    "Brushing your teeth",
    "Choosing snacks that fuel you",
    "Moving your body every day",
    "Getting good sleep",
  ],
  badge: { id: "habit-hero", name: "Habit Hero", emoji: "🥕" },
  sticker: { id: "toothbrush", name: "Sparkling Toothbrush", emoji: "🪥" },
  outfit: { id: "fresh-sneakers", name: "Fresh Sneakers", emoji: "👟" },
  steps: [
    {
      id: "intro",
      kind: "story",
      title: "A Day of Good Habits",
      body: "Nicko wakes up feeling wiggly. Today he wants to feel strong all day — from breakfast to bedtime. Little habits, done every day, make that happen.",
      narration:
        "I want to feel my best today. Little healthy habits add up big. Let's do them together!",
    },
    {
      id: "to-the-sink",
      kind: "obstacle",
      title: "Race to the Sink",
      goalLabel: "Reach the bathroom sink",
      narration: "First habit: wash our paws before eating. Help me get to the sink!",
      lanes: [
        { prompt: "A slippery bathmat!", safe: "walk" },
        { prompt: "A bath toy on the floor!", safe: "jump" },
        { prompt: "A low towel hanging down!", safe: "duck" },
        { prompt: "A soap bubble floating past.", safe: "walk" },
      ],
    },
    {
      id: "fuel-snack",
      kind: "quiz",
      title: "Which Snack Fuels You?",
      question: "Which snack helps your body grow strong?",
      narration: "Some snacks give us zoomies, some help us grow. Which one fuels you?",
      options: [
        {
          label: "Apples and cheese",
          emoji: "🍎",
          correct: true,
          feedback: "Yes! Fruit and protein together give your body real fuel.",
        },
        {
          label: "A whole bag of candy",
          emoji: "🍬",
          correct: false,
          feedback: "Sweet is a treat, not fuel. A little is fine — a whole bag makes tummies sad.",
        },
        {
          label: "Yesterday's cold pizza crust",
          emoji: "🍕",
          correct: false,
          feedback: "Old food can make you sick. Fresh food takes better care of you.",
        },
        {
          label: "Whatever is closest",
          emoji: "🤷",
          correct: false,
          feedback: "Snacks work better when you pick on purpose. Look for real food first.",
        },
      ],
    },
    {
      id: "sneezed",
      kind: "choice",
      title: "Achoo!",
      scene:
        "Nicko sneezes a big sneeze right into his paws. His paws are wet and sticky now. Snack time is in one minute.",
      question: "What should Nicko do first?",
      narration: "I sneezed into my paws. What now?",
      options: [
        {
          label: "Wash paws with soap and warm water",
          emoji: "🧼",
          hearts: 5,
          best: true,
          feedback: "That's it! Soap plus warm water washes germs down the drain.",
        },
        {
          label: "Wipe them on my shirt and go eat",
          emoji: "👕",
          hearts: 0,
          feedback: "Wiping just moves germs around. Soap and water actually take them away.",
        },
        {
          label: "Skip washing — it's just a sneeze",
          emoji: "🙄",
          hearts: 0,
          feedback: "Sneeze germs stick. Even a quick wash beats no wash.",
        },
      ],
    },
    {
      id: "brush-teeth",
      kind: "sequencing",
      title: "How to Brush Your Teeth",
      narration: "Four steps for shiny, happy teeth. Put them in order!",
      items: [
        { label: "Wet the brush", emoji: "💧" },
        { label: "Add a pea-sized dot of paste", emoji: "🪥" },
        { label: "Brush in little circles, top and bottom", emoji: "🔄" },
        { label: "Rinse and smile in the mirror", emoji: "😁" },
      ],
    },
    {
      id: "habit-benefit",
      kind: "matching",
      title: "Habit and Why",
      narration: "Every habit has a reason. Match each one to what it does!",
      pairs: [
        { left: "Washing paws", leftEmoji: "🧼", right: "Washes germs away", rightEmoji: "✨" },
        {
          left: "Moving your body",
          leftEmoji: "🤸",
          right: "Makes your heart strong",
          rightEmoji: "❤️",
        },
        { left: "Good sleep", leftEmoji: "😴", right: "Grows your brain", rightEmoji: "🧠" },
      ],
    },
    {
      id: "keypad",
      kind: "keypad",
      title: "Set the Bedtime Alarm",
      code: "800",
      hint: "Tap eight, zero, zero for 8:00",
      narration: "Bedtime alarm helps my body get sleepy on time. Set it for 8:00!",
    },
    {
      id: "memory",
      kind: "memory",
      title: "Healthy Habits Memory",
      narration: "Find the matching healthy habit pairs!",
      cards: [
        { label: "Apple", emoji: "🍎" },
        { label: "Water", emoji: "💧" },
        { label: "Toothbrush", emoji: "🪥" },
        { label: "Sleep", emoji: "😴" },
      ],
    },
    {
      id: "one-more-show",
      kind: "choice",
      title: "One More Show?",
      scene:
        "It's bedtime. Nicko is yawning but there's a really good show on. Grandpa says it's time to brush and sleep.",
      question: "What should Nicko do?",
      narration: "I'm tired but the show is fun. What's the smart choice?",
      options: [
        {
          label: "Brush, get into bed, save it for tomorrow",
          emoji: "🛏️",
          hearts: 5,
          best: true,
          feedback: "That's it! Sleep helps your body grow. The show will be there tomorrow.",
        },
        {
          label: "Sneak in one more episode",
          emoji: "📺",
          hearts: 0,
          feedback: "One more turns into three more. Late nights make tomorrow grumpy.",
        },
        {
          label: "Skip brushing to save time",
          emoji: "🪥",
          hearts: 0,
          feedback:
            "Skipping the brush lets sugar bugs party on your teeth. Two minutes is worth it.",
        },
      ],
    },
    {
      id: "mastery",
      kind: "mastery",
      title: "Show What You Know",
      narration: "No hints this time — show me what you know!",
      questions: [
        {
          prompt: "Which snack helps your body grow strong?",
          options: [
            { label: "Apples and cheese", emoji: "🍎", correct: true },
            { label: "A whole bag of candy", emoji: "🍬", correct: false },
            { label: "Yesterday's cold pizza crust", emoji: "🍕", correct: false },
          ],
        },
        {
          prompt: "You just sneezed into your paws. What do you do first?",
          options: [
            { label: "Wash with soap and warm water", emoji: "🧼", correct: true },
            { label: "Wipe them on your shirt", emoji: "👕", correct: false },
            { label: "Skip washing — it's just a sneeze", emoji: "🙄", correct: false },
          ],
        },
        {
          prompt: "It's bedtime and there's a good show on. What's the healthy choice?",
          options: [
            { label: "Brush teeth, get into bed", emoji: "🛏️", correct: true },
            { label: "Sneak in one more episode", emoji: "📺", correct: false },
            { label: "Skip brushing to save time", emoji: "🪥", correct: false },
          ],
        },
      ],
    },
    {
      id: "outro",
      kind: "story",
      title: "Strong and Ready",
      body: "Nicko fell asleep with clean paws, brushed teeth, and a full tummy of real food. Tomorrow his body would be ready for anything.",
      narration: "You did it! Little habits, big power. You are a real Habit Hero!",
    },
  ],
};

const animalCare: Lesson = {
  id: "animal-care",
  order: 8,
  title: "Animal Care",
  lifeLesson: "Gentle hands, happy pets.",
  tryTonight: "Ask: how can you tell when our pet (or a friend's pet) wants some quiet space?",
  emoji: "🐾",
  tint: "grape",
  available: true,
  skills: [
    "Gentle petting",
    "Fresh food and water",
    "Reading pet body language",
    "Giving pets quiet space",
    "Knowing when to ask a grown-up",
  ],
  badge: { id: "pet-pal", name: "Pet Pal", emoji: "🐾" },
  sticker: { id: "paw-print", name: "Paw Print", emoji: "🐕" },
  outfit: { id: "vet-coat", name: "Vet Coat", emoji: "🥼" },
  steps: [
    {
      id: "intro",
      kind: "story",
      title: "The New Puppy Next Door",
      body: "The Bells got a brand-new puppy named Biscuit. Biscuit is small and shy. Nicko wants to be a good pet friend, so today he learns how.",
      narration:
        "Biscuit is new here and a little bit scared. Let's learn how to be a really good pet friend!",
    },
    {
      id: "water",
      kind: "obstacle",
      title: "Fresh Water Delivery",
      goalLabel: "Reach Biscuit's bowl",
      narration: "I've got a bowl of cool, fresh water. Help me carry it without spilling!",
      lanes: [
        { prompt: "A chew toy on the floor!", safe: "jump" },
        { prompt: "A low blanket edge!", safe: "duck" },
        { prompt: "A clear kitchen tile.", safe: "walk" },
        { prompt: "A rolling tennis ball!", safe: "jump" },
      ],
    },
    {
      id: "how-to-pet",
      kind: "quiz",
      title: "How Do You Pet a New Dog?",
      question: "Biscuit is a new dog. What's the safe way to say hello?",
      narration: "Biscuit doesn't know me yet. How should I say hello?",
      options: [
        {
          label: "Kneel low, offer a slow hand to sniff",
          emoji: "🤲",
          correct: true,
          feedback: "Yes! Letting a dog sniff first says 'I'm safe.' Then gentle pets are okay.",
        },
        {
          label: "Run up and hug their neck",
          emoji: "🤗",
          correct: false,
          feedback: "Fast hugs can scare a dog. Slow and low is friendlier.",
        },
        {
          label: "Grab their tail to say hi",
          emoji: "✋",
          correct: false,
          feedback: "Never grab a tail — it hurts. Hands go to the chin or side, gently.",
        },
        {
          label: "Yell 'HI DOGGIE'",
          emoji: "📣",
          correct: false,
          feedback: "Loud noises scare pets. Soft voices work much better.",
        },
      ],
    },
    {
      id: "hiding",
      kind: "choice",
      title: "Biscuit Hides",
      scene:
        "Biscuit is curled up under the bed with his ears flat back. He is trembling a little.",
      question: "What is the kind thing to do?",
      narration: "Biscuit is scared and hiding. What should I do?",
      options: [
        {
          label: "Sit quietly nearby and let him come out on his own",
          emoji: "🧘",
          hearts: 5,
          best: true,
          feedback:
            "Perfect. Giving a scared pet space says 'I respect you.' Trust grows from that.",
        },
        {
          label: "Pull him out to cheer him up",
          emoji: "🖐️",
          hearts: 0,
          feedback: "Pulling a scared pet makes fear worse. Let him choose when to come out.",
        },
        {
          label: "Poke him with a toy to play",
          emoji: "🎾",
          hearts: 0,
          feedback: "A scared pet doesn't want to play. Wait for tail wags first.",
        },
      ],
    },
    {
      id: "feed-steps",
      kind: "sequencing",
      title: "How to Feed a Pet",
      narration: "Four steps for feeding your pet friend. Put them in order!",
      items: [
        { label: "Wash your paws first", emoji: "🧼" },
        { label: "Measure the right amount of food", emoji: "🥣" },
        { label: "Add fresh water to the water bowl", emoji: "💧" },
        { label: "Put bowls down in a calm, quiet spot", emoji: "🐾" },
      ],
    },
    {
      id: "body-language",
      kind: "matching",
      title: "Pet Body Talk",
      narration: "Pets talk with their bodies. Match the sign to what it means!",
      pairs: [
        {
          left: "Wagging tail (loose)",
          leftEmoji: "🐕",
          right: "Happy to see you",
          rightEmoji: "😊",
        },
        { left: "Ears flat back", leftEmoji: "🐈", right: "Scared or upset", rightEmoji: "😨" },
        { left: "Purring, slow blinks", leftEmoji: "😻", right: "Feeling safe", rightEmoji: "💗" },
      ],
    },
    {
      id: "keypad",
      kind: "keypad",
      title: "Call the Vet",
      code: "700",
      hint: "Tap seven, zero, zero for the vet",
      narration: "If a pet is sick, a grown-up calls the vet. Let's practice — seven, zero, zero!",
    },
    {
      id: "memory",
      kind: "memory",
      title: "Pet Care Memory",
      narration: "Match the pet care pairs. Take your time!",
      cards: [
        { label: "Food bowl", emoji: "🥣" },
        { label: "Water", emoji: "💧" },
        { label: "Leash", emoji: "🦮" },
        { label: "Bed", emoji: "🛏️" },
      ],
    },
    {
      id: "cat-alone",
      kind: "choice",
      title: "The Cat Wants Space",
      scene:
        "The neighbor's cat, Willow, is licking her paw and looking away. When Nicko reaches out, she turns her back.",
      question: "What should Nicko do?",
      narration: "Willow turned her back on me. What should I do?",
      options: [
        {
          label: "Leave her alone — she's asking for space",
          emoji: "🚪",
          hearts: 5,
          best: true,
          feedback: "Yes! A pet turning away is asking for a break. Respecting that is real love.",
        },
        {
          label: "Keep petting to make her feel better",
          emoji: "🖐️",
          hearts: 0,
          feedback: "'More pets' isn't the answer for a cat asking for quiet. Space is the answer.",
        },
        {
          label: "Follow her to the next room",
          emoji: "🏃",
          hearts: 0,
          feedback:
            "Following a pet who's escaping makes them feel trapped. Let her come back to you.",
        },
      ],
    },
    {
      id: "mastery",
      kind: "mastery",
      title: "Show What You Know",
      narration: "No hints this time — show me what you know!",
      questions: [
        {
          prompt: "You meet a new dog for the first time. What's the safe way to say hello?",
          options: [
            { label: "Kneel low, offer a slow hand to sniff", emoji: "🤲", correct: true },
            { label: "Run up and hug their neck", emoji: "🤗", correct: false },
            { label: "Yell 'HI DOGGIE'", emoji: "📣", correct: false },
          ],
        },
        {
          prompt: "A pet is hiding under the bed, trembling. What's the kind thing to do?",
          options: [
            { label: "Sit quietly nearby, let them come out", emoji: "🧘", correct: true },
            { label: "Pull them out to cheer them up", emoji: "🖐️", correct: false },
            { label: "Poke them with a toy to play", emoji: "🎾", correct: false },
          ],
        },
        {
          prompt: "A cat turns her back on you when you reach out. What is she telling you?",
          options: [
            { label: "She wants space right now", emoji: "🚪", correct: true },
            { label: "She wants more pets", emoji: "🖐️", correct: false },
            { label: "She wants you to follow her", emoji: "🏃", correct: false },
          ],
        },
      ],
    },
    {
      id: "outro",
      kind: "story",
      title: "Biscuit Wagged His Tail",
      body: "By the end of the day, Biscuit was wagging his whole body. Willow curled up on the windowsill. Both pets felt safe with Nicko, because Nicko listened.",
      narration: "You did it! Gentle hands, listening eyes. You are a real Pet Pal!",
    },
  ],
};

const problemSolving: Lesson = {
  id: "problem-solving",
  order: 9,
  title: "Problem Solving",
  lifeLesson: "Think it through, step by step.",
  tryTonight: "Ask: what's something that didn't work on the first try — what did you try next?",
  emoji: "🧠",
  tint: "sunny",
  available: true,
  skills: [
    "Breaking a big problem into small steps",
    "Trying again when the first try fails",
    "Asking good questions",
    "Staying calm when you're stuck",
    "Celebrating small wins",
  ],
  badge: { id: "puzzle-brain", name: "Puzzle Brain", emoji: "🧠" },
  sticker: { id: "lightbulb", name: "Lightbulb", emoji: "💡" },
  outfit: { id: "inventor-goggles", name: "Inventor Goggles", emoji: "🥽" },
  steps: [
    {
      id: "intro",
      kind: "story",
      title: "The Locked Puzzle Box",
      body: "Nicko finds a wooden puzzle box in the workshop. It has knobs and slides and a lock. He has no idea how to open it — yet.",
      narration:
        "This box is a puzzle. I don't know how to open it, but I bet if we take it step by step, we can figure it out. Ready?",
    },
    {
      id: "to-workshop",
      kind: "obstacle",
      title: "Get to the Workshop",
      goalLabel: "Reach the workshop bench",
      narration:
        "Let's take the box to the workshop where we can look at it carefully. Help me pick the safe path!",
      lanes: [
        { prompt: "A stack of books in the way!", safe: "jump" },
        { prompt: "A hanging lamp low over the hall!", safe: "duck" },
        { prompt: "A clear wooden floor.", safe: "walk" },
        { prompt: "An open toolbox on the floor!", safe: "jump" },
      ],
    },
    {
      id: "when-stuck",
      kind: "quiz",
      title: "What Do You Do When Stuck?",
      question: "You've tried three ways and it still doesn't work. What's the best next step?",
      narration: "I'm stuck. What should I do?",
      options: [
        {
          label: "Take a breath, then try one small new thing",
          emoji: "🌬️",
          correct: true,
          feedback: "Yes! Calm plus one small new try beats banging your head every time.",
        },
        {
          label: "Give up and throw the box",
          emoji: "😤",
          correct: false,
          feedback: "Throwing doesn't solve it — and breaks the puzzle. Calm wins.",
        },
        {
          label: "Try the exact same way, harder",
          emoji: "💪",
          correct: false,
          feedback: "The same way = the same result. Something small has to change.",
        },
        {
          label: "Wait for someone else to do it",
          emoji: "⏳",
          correct: false,
          feedback:
            "Sometimes help is good, but try first — your brain is stronger than you think.",
        },
      ],
    },
    {
      id: "wrong-piece",
      kind: "choice",
      title: "It Won't Fit",
      scene:
        "Nicko is trying to fit a puzzle piece into a slot. He pushes and pushes, but it just won't go.",
      question: "What should Nicko do?",
      narration: "This piece won't fit. What should I do?",
      options: [
        {
          label: "Stop pushing — try a different piece",
          emoji: "🧩",
          hearts: 5,
          best: true,
          feedback:
            "Perfect. If it doesn't fit, it's the wrong piece. Trying a different one is smart, not quitting.",
        },
        {
          label: "Push harder until it fits",
          emoji: "💪",
          hearts: 0,
          feedback: "Forcing usually breaks things. Puzzles want the RIGHT piece, not force.",
        },
        {
          label: "Hide the piece and pretend it's done",
          emoji: "🙈",
          hearts: 0,
          feedback: "Hiding the problem doesn't solve it. It'll be there tomorrow too.",
        },
      ],
    },
    {
      id: "steps",
      kind: "sequencing",
      title: "Solving It, Step by Step",
      narration: "Four steps for any tricky problem. Put them in order!",
      items: [
        { label: "Stop and look at the whole thing", emoji: "👀" },
        { label: "Break it into small parts", emoji: "🧩" },
        { label: "Try the smallest step first", emoji: "👣" },
        { label: "Check what worked, then keep going", emoji: "✅" },
      ],
    },
    {
      id: "problem-step",
      kind: "matching",
      title: "Problem, First Step",
      narration: "Every tricky moment has a good first step. Match them!",
      pairs: [
        {
          left: "Puzzle piece won't fit",
          leftEmoji: "🧩",
          right: "Try a different piece",
          rightEmoji: "🔄",
        },
        {
          left: "Can't remember a word",
          leftEmoji: "💭",
          right: "Describe it in other words",
          rightEmoji: "🗣️",
        },
        {
          left: "Feeling stuck and frustrated",
          leftEmoji: "😤",
          right: "Take a break and breathe",
          rightEmoji: "🌬️",
        },
      ],
    },
    {
      id: "keypad",
      kind: "keypad",
      title: "The Lock Combination",
      code: "246",
      hint: "Tap two, four, six — the pattern grows by two",
      narration:
        "The box has a code — two, four, six. Every number is two bigger. See the pattern?",
    },
    {
      id: "memory",
      kind: "memory",
      title: "Problem-Solver Memory",
      narration: "Match the problem-solver pairs. Steady wins the day!",
      cards: [
        { label: "Lightbulb", emoji: "💡" },
        { label: "Plan", emoji: "📋" },
        { label: "Try", emoji: "👣" },
        { label: "Cheer", emoji: "🎉" },
      ],
    },
    {
      id: "try-again",
      kind: "choice",
      title: "First Try Didn't Work",
      scene: "Nicko tried the code. The box didn't open. He feels a little disappointed.",
      question: "What is the best move now?",
      narration: "The first try didn't work. What now?",
      options: [
        {
          label: "Look again, check what changed, try once more",
          emoji: "🔎",
          hearts: 5,
          best: true,
          feedback: "Yes! One 'no' is not a stop sign. Look, learn, try again.",
        },
        {
          label: "Decide the box is broken and walk off",
          emoji: "🚶",
          hearts: 0,
          feedback: "Almost every puzzle takes more than one try. Walking off misses the win.",
        },
        {
          label: "Get mad and shake the box",
          emoji: "😠",
          hearts: 0,
          feedback: "Shaking might break it. Calm brains solve puzzles faster than mad ones.",
        },
      ],
    },
    {
      id: "mastery",
      kind: "mastery",
      title: "Show What You Know",
      narration: "No hints this time — show me what you know!",
      questions: [
        {
          prompt: "You've tried three ways and it still doesn't work. What's the best next step?",
          options: [
            { label: "Take a breath, try one small new thing", emoji: "🌬️", correct: true },
            { label: "Give up and throw the box", emoji: "😤", correct: false },
            { label: "Try the exact same way, harder", emoji: "💪", correct: false },
          ],
        },
        {
          prompt: "A puzzle piece won't fit no matter how you push. What do you do?",
          options: [
            { label: "Try a different piece", emoji: "🧩", correct: true },
            { label: "Push harder until it fits", emoji: "💪", correct: false },
            { label: "Hide the piece and pretend it's done", emoji: "🙈", correct: false },
          ],
        },
        {
          prompt: "Your first try at the code didn't work. What's the best move?",
          options: [
            { label: "Look again, check what changed, try once more", emoji: "🔎", correct: true },
            { label: "Decide it's broken and walk off", emoji: "🚶", correct: false },
            { label: "Get mad and shake the box", emoji: "😠", correct: false },
          ],
        },
      ],
    },
    {
      id: "outro",
      kind: "story",
      title: "Click! It Opened",
      body: "On the third try, the little box popped open. Inside was a note that said 'You figured it out.' Nicko grinned. He'd trained his puzzle brain today.",
      narration: "We did it! You didn't give up and it worked. You are a real Puzzle Brain!",
    },
  ],
};

const crossingStreets: Lesson = {
  id: "crossing-streets",
  order: 10,
  title: "Crossing Streets",
  lifeLesson: "Stop, look, listen, walk.",
  tryTonight:
    "Practice together: next time you cross a street, have them say 'stop, look, listen, walk' out loud with you.",
  emoji: "🚦",
  tint: "coral",
  available: true,
  skills: [
    "Stopping at every curb",
    "Looking both ways",
    "Waiting for the walk signal",
    "Holding a grown-up's hand",
    "Being seen by drivers",
  ],
  badge: { id: "street-smart", name: "Street Smart", emoji: "🚦" },
  sticker: { id: "crosswalk", name: "Crosswalk", emoji: "🦓" },
  outfit: { id: "walking-boots", name: "Walking Boots", emoji: "🥾" },
  steps: [
    {
      id: "intro",
      kind: "story",
      title: "Walking to Grandma's",
      body: "Nicko is walking to Grandma's house with Grandpa. There are three streets to cross. Today he learns how to cross like a pro.",
      narration:
        "Three streets between us and Grandma. Let's cross them the safe way, every single time!",
    },
    {
      id: "to-corner",
      kind: "obstacle",
      title: "Walk to the Corner",
      goalLabel: "Reach the crosswalk",
      narration: "First we get to the corner where the crosswalk is. Help me pick the safe move!",
      lanes: [
        { prompt: "A big puddle on the sidewalk!", safe: "jump" },
        { prompt: "A low branch over the path!", safe: "duck" },
        { prompt: "A clear stretch of sidewalk.", safe: "walk" },
        { prompt: "A skateboard rolling past!", safe: "jump" },
      ],
    },
    {
      id: "when-cross",
      kind: "quiz",
      title: "When Can You Cross?",
      question: "The walk signal is white. What do you check before stepping into the street?",
      narration: "The little walk person is white. Am I ready to go?",
      options: [
        {
          label: "Look left, right, and left again",
          emoji: "👀",
          correct: true,
          feedback:
            "Yes! The walk signal isn't a guarantee — your eyes are. Check both ways every time.",
        },
        {
          label: "Sprint across without looking",
          emoji: "🏃",
          correct: false,
          feedback: "Even with the walk signal, cars can be there. Eyes first, always.",
        },
        {
          label: "Close your eyes and hope",
          emoji: "🙈",
          correct: false,
          feedback: "Closing your eyes hides cars, not stops them. Look before you go.",
        },
        {
          label: "Wait for someone else to cross first",
          emoji: "👥",
          correct: false,
          feedback: "Following can help, but your own eyes still have to check. Look for yourself.",
        },
      ],
    },
    {
      id: "ball-in-street",
      kind: "choice",
      title: "The Ball Rolled Away",
      scene: "Nicko's ball rolls off the curb and into the street. A car is coming down the road.",
      question: "What should Nicko do?",
      narration:
        "My paw took one step off the curb without thinking — good thing you caught me! What should we actually do?",
      options: [
        {
          label: "Stay on the sidewalk, tell a grown-up",
          emoji: "🛑",
          hearts: 5,
          best: true,
          feedback: "Exactly. A ball can be replaced. You cannot. Grown-ups get balls back safely.",
        },
        {
          label: "Dash out fast to grab it",
          emoji: "🏃",
          hearts: 0,
          feedback:
            "Never chase anything into the street. Cars can't stop as fast as a ball rolls.",
        },
        {
          label: "Wait until the car looks close, then run",
          emoji: "🚗",
          hearts: 0,
          feedback: "Judging car speed is really hard, even for grown-ups. Stay on the sidewalk.",
        },
      ],
    },
    {
      id: "cross-steps",
      kind: "sequencing",
      title: "How to Cross the Street",
      narration: "Four steps every single time. Put them in order and say it with me!",
      items: [
        { label: "Stop right at the curb", emoji: "🛑" },
        { label: "Look left, right, and left again", emoji: "👀" },
        { label: "Listen for engines and horns", emoji: "👂" },
        { label: "Walk (don't run) all the way across", emoji: "🚶" },
      ],
    },
    {
      id: "signals",
      kind: "matching",
      title: "Signal, Action",
      narration: "Traffic talks in signals. Match each one to what you do!",
      pairs: [
        { left: "Red hand", leftEmoji: "✋", right: "Stop and wait", rightEmoji: "🛑" },
        {
          left: "White walking person",
          leftEmoji: "🚶",
          right: "Look then cross",
          rightEmoji: "👀",
        },
        { left: "Blinking hand", leftEmoji: "🖐️", right: "Don't start crossing", rightEmoji: "⏳" },
      ],
    },
    {
      id: "keypad",
      kind: "keypad",
      title: "Learn Your Address",
      code: "482",
      hint: "Tap your house number: four, eight, two",
      narration:
        "Knowing your house number helps you get home safely if you ever get turned around while walking. Tap four, eight, two!",
    },
    {
      id: "memory",
      kind: "memory",
      title: "Street Smart Memory",
      narration: "Match the street-smart pairs. You've got this!",
      cards: [
        { label: "Crosswalk", emoji: "🦓" },
        { label: "Walk signal", emoji: "🚶" },
        { label: "Stop sign", emoji: "🛑" },
        { label: "Traffic light", emoji: "🚦" },
      ],
    },
    {
      id: "grownup-says-wait",
      kind: "choice",
      title: "Grandpa Says Wait",
      scene:
        "The walk signal turns white, but Grandpa holds Nicko's paw a little tighter. 'Wait, buddy.' A big truck is turning the corner.",
      question: "What should Nicko do?",
      narration: "The sign says walk but Grandpa says wait. Who do I listen to?",
      options: [
        {
          label: "Listen to Grandpa — he sees the truck",
          emoji: "🧑‍🦳",
          hearts: 5,
          best: true,
          feedback:
            "Yes! A signal is a rule; a grown-up can see things the sign can't. Listen to your grown-up.",
        },
        {
          label: "Go anyway because the sign says walk",
          emoji: "🚶",
          hearts: 0,
          feedback: "Signs don't see trucks. Grown-ups do. Trust the paw squeeze.",
        },
        {
          label: "Yank your hand free and run",
          emoji: "🏃",
          hearts: 0,
          feedback: "Pulling free is dangerous near the road. Hands stay together.",
        },
      ],
    },
    {
      id: "mastery",
      kind: "mastery",
      title: "Show What You Know",
      narration: "No hints this time — show me what you know!",
      questions: [
        {
          prompt: "The walk signal is white. What do you check before stepping out?",
          options: [
            { label: "Look left, right, and left again", emoji: "👀", correct: true },
            { label: "Sprint across without looking", emoji: "🏃", correct: false },
            { label: "Close your eyes and hope", emoji: "🙈", correct: false },
          ],
        },
        {
          prompt: "Your ball rolls into the street and a car is coming. What do you do?",
          options: [
            { label: "Stay on the sidewalk, tell a grown-up", emoji: "🛑", correct: true },
            { label: "Dash out fast to grab it", emoji: "🏃", correct: false },
            { label: "Wait until the car looks close, then run", emoji: "🚗", correct: false },
          ],
        },
        {
          prompt: "The sign says walk, but your grown-up says wait. Who do you listen to?",
          options: [
            { label: "Your grown-up — they see more than the sign", emoji: "🧑‍🦳", correct: true },
            { label: "Go anyway, the sign says walk", emoji: "🚶", correct: false },
            { label: "Yank your hand free and run", emoji: "🏃", correct: false },
          ],
        },
      ],
    },
    {
      id: "outro",
      kind: "story",
      title: "Made It to Grandma's",
      body: "Three streets, three safe crossings. Grandma had cookies on the counter and a hug ready at the door. Nicko crossed like a real pro today.",
      narration:
        "You did it! Stop, look, listen, walk — every single time. You are a true Street Smart!",
    },
  ],
};

export const LESSONS: Lesson[] = [
  call911,
  fireSafety,
  strangerSafety,
  kindnessCounts,
  bigFeelings,
  teamworkTime,
  healthyHabits,
  animalCare,
  problemSolving,
  crossingStreets,
];

export function getLesson(id: string) {
  return LESSONS.find((l) => l.id === id);
}
