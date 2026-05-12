import type { Intention } from './theme';

export type Ritual = {
  id: string;
  intention: Intention;
  title: string;
  durationMin: number;
  tag: string;
  steps: { name: string; duration: string }[];
  prompts: string[];
  sipName: string;
};

export const INTENTIONS: Record<Intention, {
  label: string;
  title: string;
  blurb: string;
  emoji: string;
  defaultRitualId: string;
}> = {
  focus: {
    label: 'Focus',
    title: 'A clear head, on purpose.',
    blurb:
      'Settle, then sharpen. Four moments designed with Dr. Veronica Jow to shift you into deep work.',
    emoji: '◎',
    defaultRitualId: 'focus-default',
  },
  energize: {
    label: 'Energize',
    title: 'Wake up the engine.',
    blurb:
      'A short circuit of breath + movement to switch your nervous system into go-mode.',
    emoji: '⚡',
    defaultRitualId: 'energize-default',
  },
  unwind: {
    label: 'Unwind',
    title: 'Let the day set down.',
    blurb:
      'Long exhales, a small stretch, and a prompt to close the loop. Built for the 9pm fade.',
    emoji: '☾',
    defaultRitualId: 'unwind-default',
  },
  recover: {
    label: 'Recover',
    title: 'Refill, then rebuild.',
    blurb:
      'A mid-day reset for when the system needs help, not push. Breath, softness, antioxidant focus.',
    emoji: '♡',
    defaultRitualId: 'recover-default',
  },
};

export const RITUALS: Ritual[] = [
  {
    id: 'focus-default',
    intention: 'focus',
    title: 'Box breath + focus prompt',
    durationMin: 5,
    tag: 'default',
    steps: [
      { name: 'Box breath · 4 rounds', duration: '1:20' },
      { name: 'Neck + shoulder release', duration: '1:00' },
      { name: 'Mindset prompt', duration: '0:40' },
      { name: 'Focus soundscape', duration: '2:00' },
    ],
    prompts: [
      "What's one thing today actually needs you?",
      'If today were great, what got finished?',
      'Where will you put your best 90 minutes?',
      'Sip slowly. Let it land.',
    ],
    sipName: "Fungi Fusion · Lion's mane",
  },
  {
    id: 'focus-meeting',
    intention: 'focus',
    title: 'Pre-meeting reset',
    durationMin: 3,
    tag: 'quick',
    steps: [
      { name: 'Coherent breath', duration: '1:00' },
      { name: 'Posture reset', duration: '0:30' },
      { name: 'Intention prompt', duration: '0:30' },
    ],
    prompts: [
      'What is the meeting actually for?',
      'What does success in 15 minutes look like?',
      'Show up as the person you mean to be.',
    ],
    sipName: "Fungi Fusion · Lion's mane",
  },
  {
    id: 'energize-default',
    intention: 'energize',
    title: 'Wake-up flow',
    durationMin: 7,
    tag: 'morning',
    steps: [
      { name: 'Power breath · 30 reps', duration: '1:30' },
      { name: 'Spine + hip flow', duration: '2:00' },
      { name: 'Intention spark', duration: '0:30' },
      { name: 'Cordyceps soundscape', duration: '3:00' },
    ],
    prompts: [
      'What move would start the day right?',
      "Pick the thing you'd rather skip. Do it first.",
      'What energy do you want to bring?',
      'Hydrate. Then go.',
    ],
    sipName: 'Fungi Fusion · Cordyceps',
  },
  {
    id: 'unwind-default',
    intention: 'unwind',
    title: '9pm wind-down',
    durationMin: 10,
    tag: 'evening',
    steps: [
      { name: '4-7-8 breath · 4 rounds', duration: '2:30' },
      { name: 'Hip + jaw release', duration: '2:30' },
      { name: 'Closing prompt', duration: '1:00' },
      { name: 'Reishi soundscape', duration: '4:00' },
    ],
    prompts: [
      'What can you let go of tonight?',
      'What was good today, specifically?',
      'Phones away. Lights low. Breathe.',
      'You did enough today. Really.',
    ],
    sipName: 'Fungi Fusion · Reishi',
  },
  {
    id: 'recover-default',
    intention: 'recover',
    title: 'Soft-day reset',
    durationMin: 12,
    tag: 'midday',
    steps: [
      { name: 'Coherent breath · 6/6', duration: '3:00' },
      { name: 'Full body soften', duration: '3:00' },
      { name: 'Recovery prompt', duration: '1:00' },
      { name: 'Chaga soundscape', duration: '5:00' },
    ],
    prompts: [
      'Where in your body do you feel today?',
      "What's one thing you can do less of?",
      'Soft food, soft mind, soft plans.',
      'Recovery is the work.',
    ],
    sipName: 'Fungi Fusion · Chaga',
  },
];

export const ritualsByIntention = (i: Intention) =>
  RITUALS.filter((r) => r.intention === i);
