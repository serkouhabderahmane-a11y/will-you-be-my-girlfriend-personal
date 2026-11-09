/**
 * All of the personalized copy lives here.
 *
 * The only relationship facts used in this file are the three memories and
 * qualities provided for this project. Edit this file to make the experience
 * yours without touching component logic.
 */

export const mission = {
  eyebrow: "A mission of considerable importance  ·  file no. 99",
  titleTop: "A word with you.",
  titleBottom: "Yes, you.",
  subtitle:
    "You have been selected for an investigation of considerable importance. I am afraid there is no graceful way to decline, and I did not think to prepare one.",
  cta: "Let us begin.",
  note: "Estimated duration: 99 years. Refreshments will be provided, though perhaps not immediately.",
  scrollHint: "Your first clue awaits below",
};

export const letter = {
  hint: "A letter, addressed to you. Do open it.",
  salutation: "My dear,",
  paragraphs: [
    "I have taken the liberty of preparing something for you.",
    "It contains a few questions, several questionable investigations, a modest quantity of paperwork, and one decision of rather more importance than the rest.",
    "I ask only that you proceed with an open mind. The paperwork is dramatic, but it means well.",
  ],
  signoff: "With affectionate scheming,",
  signature: "A gentleman of uncertain qualifications, but excellent intentions.",
  postscript:
    "P.S. There is a certificate. I have been assured it is official, though by whom I cannot say.",
  beginLabel: "Open Case File 001",
  closeLabel: "Set the letter aside",
  noLabel: "No",
  noMessages: [
    "The No button has declined to participate.",
    "It has withdrawn to consider its position.",
    "It sends its regrets, along with a very suspicious excuse.",
    "Very well. The No button has left the investigation entirely.",
  ],
  noGoneNote:
    "The investigation shall proceed without it. That refusal concerned only the opening of a file. The important question comes later, and your answer then shall be received with perfect respect.",
};

export const communication = {
  caseNumber: "Case File 001",
  kicker: "The Communicator",
  title: "The Communication Investigation",
  intro:
    "Subject: one very impressive person. Allegation: an unusual willingness to say what is actually on her mind. The committee finds this both rare and rather attractive.",
  witnessLabel: "Exhibit A: a witness statement",
  quote:
    "“I don't like becoming quiet when something is wrong. I'd rather explain how I feel.”",
  analysisLabel: "Field notes",
  analysis:
    "Here at last is a woman who understands that I am not equipped with supernatural powers of perception. My telepathy subscription lapsed some years ago, and I have never managed to find the renewal office.",
  sincere:
    "But seriously, I value it. I would far rather hear what is truly on your mind than spend an evening constructing theories and arriving at the wrong one.",
  testLabel: "Attempt the mind reading test",
  testRunning: "Attempting telepathy...",
  testResult:
    "Result: a failure, and a welcome one. You told me what you felt. No mind reading was required.",
  certificateLabel: "Official certification",
  certificateTitle: "Certificate of Exceptional Communication",
  certificateAward: "Certified Professional Communicator",
  certificateBody:
    "This certifies that the bearer possesses the rare and admirable ability to explain what she feels, instead of leaving everyone else to guess.",
  certificateFooter: "Issued by the Department of Not Having to Guess",
  sealLabel: "Press the official seal",
  achievement:
    "Distinction awarded: Certified Professional Communicator.",
};

export const firstDate = {
  caseNumber: "Case File 002",
  kicker: "The First Date",
  title: "The Drinks Incident",
  subtitle:
    "A full report concerning a small moment that has troubled my conscience ever since.",
  fields: [
    { label: "Incident", value: "The drinks situation." },
    { label: "Victim", value: "My reputation as a gentleman." },
    { label: "Suspect", value: "The author of this report." },
    { label: "Evidence", value: "She paid for her own refreshments." },
    { label: "Verdict", value: "A failure of conduct, though not, I hope, of character." },
  ],
  exhibitLabel: "Exhibit A: the receipt",
  receipt: {
    item: "One refreshment",
    paidBy: "Her",
    gentlemanPoints: "Minus one",
    note: "I remain mortified.",
  },
  apologyLabel: "Official apology",
  apology:
    "It has recently come to my attention that, during our first meeting, I permitted you to pay for your own refreshments. I can only describe this as a regrettable failure of gentlemanly conduct, and I hope my future performances shall be considerably improved.",
  acceptLabel: "I accept your apology.",
  acceptedStamp: "Apology accepted",
  acceptedTitle: "Most generous.",
  acceptedBody: "Your future refreshments are now a matter of official interest.",
  caseClosed: "The case is closed. The debt, however, remains.",
};

export interface Quality {
  id: string;
  number: string;
  glyph: string;
  title: string;
  teaser: string;
  note: string;
}

export const qualities: Quality[] = [
  {
    id: "intelligence",
    number: "01",
    glyph: "✦",
    title: "Intelligence",
    teaser: "The quality of your mind",
    note: "Your intelligence is inconvenient for anyone hoping to win an argument without first preparing a case. I have learned to arrive with notes.",
  },
  {
    id: "beauty",
    number: "02",
    glyph: "❧",
    title: "Beauty",
    teaser: "The way you carry it",
    note: "I would offer a detailed account of your beauty, but I fear it would distract me from the far more important business of finishing this sentence.",
  },
  {
    id: "strength",
    number: "03",
    glyph: "❖",
    title: "Strength",
    teaser: "The way you carry yourself",
    note: "I admire a woman who can manage her own affairs and face the world without asking permission. I only hope you will occasionally allow yourself the luxury of being cared for. I should like to be useful in that department. You need not change a thing.",
  },
  {
    id: "hard-work",
    number: "04",
    glyph: "◈",
    title: "Hard work",
    teaser: "The way you show up",
    note: "You work hard, and you do it well. I admire that. I admire even more that you know life is not composed entirely of work, that you make time for your health and your rest, and that an afternoon doing absolutely nothing can be a perfectly sensible use of one's time.",
  },
  {
    id: "communication",
    number: "05",
    glyph: "✧",
    title: "Communication",
    teaser: "The way you say it",
    note: "You say what you mean. It is a rare quality, and a rather attractive one. It saves us both a great deal of unnecessary detective work.",
  },
  {
    id: "listening",
    number: "06",
    glyph: "◍",
    title: "Listening",
    teaser: "The way you make space",
    note: "You listen as though the person speaking actually matters. I know this from experience. It changes a conversation, and sometimes the person having it.",
  },
];

export const appreciation = {
  caseNumber: "Case File 003",
  kicker: "The Appreciation Department",
  title: "Personnel Review",
  intro:
    "Six qualities. Six files. The department has been unusually diligent. There is also a memo at the end, containing a few thoughts on the kind of life I should like us to build.",
  instruction: "Open a file to read the note inside.",
  reviewed: "files reviewed",
  verdict:
    "Department verdict: exceptional. We checked twice, then a third time because the work was agreeable. Recommendation: more rest, more laughter, and someone who takes care of you when you forget to.",
  cta: "Continue",
  partnerMemo: {
    file: "Department memo  ·  life partner division",
    tag: "Filed under: hopes",
    title: "The Kind of Life I Have in Mind",
    subtitle: "An unofficial note concerning the person I should like to be for you.",
    label: "Memorandum",
    lines: [
      "I admire the woman who can manage her own affairs, pursue her ambitions, and face the world without asking permission. That independence is not a quality I merely tolerate. I find it genuinely attractive.",
      "Nevertheless, I hope you will occasionally allow yourself the luxury of being cared for. I should very much like to prove myself useful in that department. You need not become any less formidable. I am not asking for a different woman, only for the occasional privilege of knowing the softer side of the one I already admire.",
      "I also confess a fondness for a partner who takes care of herself. Ambition is admirable, certainly, but I should hate for us to spend the entirety of our lives working, only to discover that we have forgotten to enjoy them.",
      "I should prefer a life containing meaningful work, good health, pleasant conversation, the occasional adventure, and a reasonable number of afternoons devoted to doing absolutely nothing together.",
      "I do not wish us merely to survive our schedules. I should like us to enjoy the life we are building, and to remember that rest is not a reward for finishing everything. It is part of the plan.",
      "Healthy, happy, ambitious, and occasionally idle in each other's company. I can think of no better arrangement.",
    ],
  },
};

export const childhood = {
  kicker: "A quiet page",
  title: "The Conversation I Kept",
  lines: [
    {
      text: "You once listened while I told you stories from my childhood.",
      emphasis: true,
    },
    {
      text: "It may have seemed an ordinary conversation to you. To me, it was not.",
    },
    {
      text: "I do not share those parts of myself easily. Having someone listen without hurrying me along, or waiting for her turn to speak, made the whole thing feel safe. I have not forgotten it.",
    },
    {
      text: "Thank you for listening. It meant more than I knew how to say at the time.",
      emphasis: true,
    },
  ],
  footnote: "Some conversations remain with us. This is one of them.",
  cta: "To the final assessment",
};

export interface EvaluationResult {
  label: string;
  value: string;
  tone?: "default" | "gold" | "rose" | "error";
}

export const evaluation = {
  caseNumber: "Final Assessment",
  kicker: "Candidate Evaluation",
  title: "The Last Bit of Paperwork",
  loadingLabel: "Conducting the final assessment",
  loadingLines: [
    "Verifying the communication records...",
    "Reviewing the evidence of listening...",
    "Revisiting the drinks incident...",
    "Consulting the Department of Rare Excellence...",
  ],
  complete: "The evaluation is complete.",
  results: [
    { label: "Intelligence", value: "Exceptional", tone: "gold" },
    { label: "Communication", value: "Outstanding", tone: "gold" },
    {
      label: "Beauty",
      value: "System error. The rating exceeds the maximum.",
      tone: "error",
    },
    { label: "Listening skills", value: "Certified", tone: "gold" },
    {
      label: "Overall assessment",
      value: "A woman of rare quality",
      tone: "rose",
    },
  ] as EvaluationResult[],
  nextActionLabel: "Recommended next action",
  nextAction: "Proceed to the final question.",
  cta: "Open the final question",
  footnote: "No further paperwork is required. Probably.",
};

export const proposal = {
  eyebrow: "The final question",
  intro: [
    "You have survived the investigations.",
    "You have passed the communication assessment.",
    "You have forgiven the drinks incident, a generosity I do not deserve and shall not forget.",
    "And so we arrive at the question for which all this paperwork was merely a preface.",
    "I should very much like to spend the next 99 years discovering more about you, and I should like to be the person you can relax around, the one you need not always be strong with.",
    "I should also like us to build a life with room for rest, good health, and a great deal of absolutely nothing together.",
  ],
  question: "Would you do me the honour of becoming my girlfriend?",
  yesLabel: "Yes, I will",
  noLabel: "No",
  noMessages: [
    "The No button is experiencing technical difficulties.",
    "It has withdrawn to seek a second opinion.",
    "It is presently in a meeting with my hopes.",
  ],
  respectNote:
    "Very well. I am returning the No button to its proper place. If your answer is no, or not yet, I shall respect it completely. This is your choice, not a game.",
  honestNo: "No, I need more time",
  yesAgain: "On reflection, yes ❤️",
  honestLink: "If your answer is no, tell me honestly →",
  seal: "99",
};

export const celebration = {
  eyebrow: "Officially official",
  title: "You said yes.",
  subtitle: "There is a great deal I should like to say. We have 99 years, so I shall pace myself.",
  message: [
    "Thank you for saying yes. I know this began as a ridiculous quantity of paperwork, but I meant every word of it.",
    "I hope we build a life with room for rest, health, and taking care of each other.",
    "And I still owe you those drinks. I intend to settle that debt properly.",
  ],
  contractHint: "Your first official document is below.",
  bookHint: "One more thing",
};

export const contract = {
  years: 99,
  label: "Relationship contract  ·  no. 0099",
  heading: "AN AGREEMENT OF 99 YEARS ❤️",
  durationLine: "Contract duration: 99 years.",
  statusLabel: "Contract status",
  status: "ACTIVE",
  notices: [
    "Day one begins now. ❤️",
    "99 years, commencing upon acceptance.",
    "No early cancellation without a very good explanation, submitted in writing.",
    "Renewal policy: to be discussed in 2125.",
    "Requests for affection: always granted, particularly those involving hugs.",
    "Estimated remaining duration: a suspiciously long time.",
  ],
  specialLine:
    "Here's to 99 years of affection, mutual respect, honest conversation, occasional adventure, and the reasonable expectation that I shall pay for the refreshments.",
  support: "Requests for affection: always granted, particularly those involving hugs.",
  dayOne: "Day one begins now. ❤️",
};

export const notNow = {
  eyebrow: "That is quite all right",
  title: "Thank you for reading.",
  paragraphs: [
    "Your answer belongs to you. If it is no, or not yet, I shall respect it completely.",
    "Nothing here changes how much I appreciate you. The timer remains paused until you say yes. That is how it should be.",
    "If you wish, we can leave the rest of the adventure for another day.",
  ],
  backLabel: "Back to the beginning",
  letterLabel: "Read the letter again",
};

export interface BookPage {
  title: string;
  emoji: string;
  kicker: string;
  content: string[];
}

export const bookPages: BookPage[] = [
  {
    title: "The First Impression",
    emoji: "🌹",
    kicker: "Page one",
    content: [
      "The first thing one notices is that you are beautiful. The second, and far more interesting, is that you have a mind of your own and are not in the least inclined to lend it to anyone else.",
      "You are intelligent in the way that matters. You notice things. You ask better questions than most people think to ask. Conversation with you has a way of becoming something else entirely.",
      "Here was a woman, I suspected, who would not be easily impressed. Impressing her would be considerably more interesting than the alternative.",
      "I was right on both counts.",
    ],
  },
  {
    title: "The Communicator",
    emoji: "💬",
    kicker: "Page two",
    content: [
      "You say what you mean. I cannot overstate how rare that is, or how much easier it makes everything.",
      "When something is wrong, you do not retreat into silence and leave me to conduct a private investigation with no evidence. You explain. You let me understand.",
      "I have no supernatural insight into other people's thoughts, and I have long since stopped pretending otherwise.",
      "I admire your strength, and I admire your honesty even more. Both are qualities I do not take lightly.",
    ],
  },
  {
    title: "The Drinks Incident",
    emoji: "🥂",
    kicker: "Page three",
    content: [
      "Our first meeting produced one small scandal, which I have been unable to forget.",
      "You paid for your own refreshments. I should have taken care of it. The fault was entirely mine, and the memory has been sitting quietly in the corner of my conscience ever since.",
      "I offer my formal apology and my solemn assurance that future occasions shall be handled with greater competence.",
      "The next round is mine. So, I suspect, is the one after that.",
    ],
  },
  {
    title: "The Listener",
    emoji: "🕯️",
    kicker: "Page four",
    content: [
      "You once listened while I told you stories from my childhood. I do not think you can have known how much that meant.",
      "I am not in the habit of sharing those parts of myself with everyone. It requires a certain trust, and a listener who is not merely waiting for her turn to speak.",
      "You listened in the way that matters. Without hurry. Without judgement. I felt heard, and that is not a small thing.",
      "Some conversations stay with a person. That one has stayed with me.",
    ],
  },
  {
    title: "The Life We Build",
    emoji: "🌿",
    kicker: "Page five",
    content: [
      "I should like us to build a life that is about more than work, work, work, and then collapsing onto the couch until the next working day.",
      "A life with room for health, rest, the people we love, and the things that make us feel alive. Ambition is admirable. Exhaustion is not a personality.",
      "I want you to remain as strong as you are. I also want you to know that you need not always be. With me, you may relax, be soft, and allow yourself to be cared for. I shall not tell a soul.",
      "Meaningful work, good health, pleasant company, and the occasional afternoon of doing absolutely nothing together. I can think of no better plan.",
    ],
  },
  {
    title: "The Beginning",
    emoji: "✨",
    kicker: "Page six",
    content: [
      "Here is what I know. I should like 99 years of conversation, laughter, adventure, and the pleasure of finally paying for the drinks.",
      "I should like to keep discovering you, to keep listening, and to keep showing up, particularly on the tired days.",
      "I should like to be the person you can be entirely yourself with. Strong when you wish to be, soft when you need to be, and cared for either way.",
      "The book ends here. The story does not.",
      "Day one begins now. ❤️",
    ],
  },
];

export interface JourneyStage {
  path: string;
  number: string;
  label: string;
  shortLabel: string;
}

export const journeyStages: JourneyStage[] = [
  {
    path: "/communication",
    number: "01",
    label: "The Communicator",
    shortLabel: "Communication",
  },
  {
    path: "/first-date",
    number: "02",
    label: "The Drinks Incident",
    shortLabel: "First date",
  },
  {
    path: "/appreciation",
    number: "03",
    label: "The Appreciation Dept.",
    shortLabel: "Appreciation",
  },
  {
    path: "/childhood",
    number: "04",
    label: "The Listener",
    shortLabel: "The quiet page",
  },
  {
    path: "/evaluation",
    number: "05",
    label: "Final Assessment",
    shortLabel: "Evaluation",
  },
  {
    path: "/proposal",
    number: "06",
    label: "The Final Question",
    shortLabel: "The question",
  },
];
