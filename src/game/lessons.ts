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

const fireSafety: Lesson = {
  id: "fire-safety",
  order: 2,
  title: "Fire Safety",
  lifeLesson: "Get low, get out, stay out.",
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
        "This door feels hot on my paw. A hot door means fire on the other side. What should I do?",
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
        { left: "Fire extinguisher", leftEmoji: "🧯", right: "A grown-up's tool", rightEmoji: "🧑‍🚒" },
        { left: "Meeting spot", leftEmoji: "🌳", right: "Where family finds you", rightEmoji: "👨‍👩‍👧" },
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
        "A car Nicko has never seen before slows down. The driver smiles and says, \"I lost my puppy. Can you help me look?\"",
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
          feedback:
            "Stay far back from a car you don't know. Step away and go find your grown-up.",
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
          feedback: "Yes! A grown-up with children, or a worker in a uniform, is a good helper to ask.",
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
          feedback: "Walking off alone makes it harder to find you. Stay put and ask a safe helper.",
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
          feedback: "Check First works for people we know too — even neighbors and friends. Always ask.",
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
      title: "Call a Friend",
      code: "123",
      hint: "Tap one, two, three to invite Ruby over",
      narration: "Let's call Ruby to come play. A phone call can brighten a friend's whole day!",
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
      narration:
        "When feelings get big, I go to my calm corner. Help me pick the safe way there!",
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
      narration: "I'm SO upset right now. What should I do with this big feeling?",
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
          feedback: "Yelling passes the hurt to someone else. Our feelings are ours to feel — kindly.",
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
          feedback:
            "Grandpa didn't cause the grumpy feeling. He is your helper, not your target.",
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
  fireSafety,
  strangerSafety,
  kindnessCounts,
  bigFeelings,
  upcoming("teamwork", 6, "Teamwork Time", "Together is stronger.", "🧩", "primary", ["Team Captain", "🏅"], ["Puzzle Piece", "🧩"], ["Taking turns", "Asking for help", "Cheering others on"]),
  upcoming("healthy-habits", 7, "Healthy Habits", "Strong bodies, happy days.", "🥕", "accent", ["Habit Hero", "🥕"], ["Toothbrush", "🪥"], ["Handwashing", "Bedtime routine", "Healthy snacks"]),
  upcoming("animal-care", 8, "Animal Care", "Gentle hands, happy pets.", "🐾", "grape", ["Pet Pal", "🐾"], ["Paw Print", "🐕"], ["Gentle petting", "Food and water", "Reading animal body language"]),
  upcoming("problem-solving", 9, "Problem Solving", "Think it through, step by step.", "🧠", "sunny", ["Puzzle Brain", "🧠"], ["Lightbulb", "💡"], ["Breaking problems into steps", "Trying again", "Asking good questions"]),
  upcoming("crossing-streets", 10, "Crossing Streets", "Stop, look, listen, walk.", "🚦", "coral", ["Street Smart", "🚦"], ["Crosswalk", "🦓"], ["Using crosswalks", "Looking both ways", "Waiting for the walk signal"]),
];

export function getLesson(id: string) {
  return LESSONS.find((l) => l.id === id);
}
