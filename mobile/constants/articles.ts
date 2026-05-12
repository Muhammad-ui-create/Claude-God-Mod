import type { Intention } from './theme';

export type Article = {
  id: string;
  accent: Intention;
  crumb: string;
  eyebrow: string;
  title: string;
  byline: string;
  body: string;
};

export const ARTICLES: Record<string, Article> = {
  a1: {
    id: 'a1',
    accent: 'focus',
    crumb: 'Mushroom 101 · video',
    eyebrow: 'Video · 04:12',
    title: "How lion's mane crosses the blood–brain barrier",
    byline: 'Dr. Veronica Jow · 12 May',
    body: [
      "Lion's mane is small enough — and lipid-soluble enough — to slip past the blood–brain barrier with a job already half-done.",
      'Most ingredients you read about on a wellness label never reach your brain. The blood–brain barrier is, by design, picky. Lion\'s mane is one of a small group of compounds that gets through because of two specific bioactive molecules: hericenones and erinacines.',
      "Both compounds stimulate the release of brain-derived neurotrophic factor — BDNF — the protein that keeps neurons alive and helps them form new connections. More BDNF doesn't make you suddenly smarter. It makes the slow work of focus feel less heavy.",
      "You won't feel lion's mane the way you feel caffeine. You'll feel its absence after a week off.",
      "That's the part most marketing misses. It's not a hit. It's a floor.",
    ].join('\n\n'),
  },
  a2: {
    id: 'a2',
    accent: 'unwind',
    crumb: 'Mushroom 101 · primer',
    eyebrow: 'Read · 3 min',
    title: 'The cortisol curve — why reishi at 9pm works',
    byline: 'Dr. Veronica Jow · 09 May',
    body: [
      "Cortisol isn't the enemy. The shape of your cortisol curve is.",
      'Healthy cortisol peaks within 30 minutes of waking, drops through the morning, plateaus through the afternoon, and bottoms out before sleep. Modern life flattens that curve — and reishi, taken at the right hour, helps re-steepen it.',
      "Reishi's triterpenes don't sedate. They modulate the HPA axis. Take them in the morning and you feel nothing. Take them in the evening, when cortisol should be falling anyway, and you give the curve a small push in the right direction.",
    ].join('\n\n'),
  },
  a3: {
    id: 'a3',
    accent: 'energize',
    crumb: 'Mushroom 101 · trial',
    eyebrow: 'Read · 5 min',
    title: 'Cordyceps before a workout vs. before a meeting',
    byline: 'Sourced · trial summary',
    body: [
      'Same compound, two jobs — depending on what your body is being asked to do.',
      'Cordyceps boosts ATP production, the energy currency of every cell. Before a workout that shows up as a higher VO₂ max and slower lactate accumulation. Before a meeting, it shows up as steadier attention and faster recovery from mental fatigue.',
      "For exercise: 60–90 minutes before. For cognition: 30–45 minutes before. The difference isn't the compound — it's how long ATP demand takes to rise in each context.",
    ].join('\n\n'),
  },
};
