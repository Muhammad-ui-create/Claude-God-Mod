# Happie · mobile

The native iOS + Android build of Happie. Expo + React Native + Expo Router, using the same design tokens as the high-fidelity web prototype in `../index.html`.

## Stack

- **Expo SDK 52** (new architecture on)
- **Expo Router** — file-based navigation
- **React Native Reanimated 3** — the breathing orb + transitions
- **React Native SVG** — mood trend chart, icons
- **Expo Google Fonts** — Fraunces + Inter + JetBrains Mono
- **AsyncStorage** — onboarding + profile persistence

## File map

```
app/
  _layout.tsx              root stack, font loading, onboarding gate
  onboarding.tsx           5-step first-launch flow
  (tabs)/_layout.tsx       bottom tab bar
  (tabs)/today.tsx         intention picker + ritual hero + sip + stats
  (tabs)/library.tsx       Mushroom 101 + Dr. Veronica Jow + articles
  (tabs)/mood.tsx          5-tap check-in + 7-day trend chart
  (tabs)/shop.tsx          flavor cards → drinkhappie.com / Amazon / TikTok
  ritual.tsx               modal: breath orb + step prompts
  article/[id].tsx         modal: hero, audio bar, body text
  settings.tsx             modal: profile, reminders, connections, data

components/
  Text.tsx                 typed text variants (display/h1/h2/body/meta/mono)
  Card.tsx                 cream card primitive
  IntentionPicker.tsx      4-up segment for Focus/Energize/Unwind/Recover
  RitualHero.tsx           today's ritual card
  BreathOrb.tsx            animated breathing circle (Reanimated)
  storage.ts               AsyncStorage helpers for profile

constants/
  theme.ts                 colors, fonts, radii, spacing (matches web)
  intentions.ts            ritual data
  articles.ts              Mushroom 101 content
```

## Running

```bash
cd mobile
npm install
npx expo start
```

Then press `i` for iOS Simulator, `a` for Android Emulator, or scan the QR with Expo Go.

## Notes

- Onboarding gates the tabs on first launch; replayable from Settings → Data.
- Tokens in `constants/theme.ts` are the single source of truth. Editing a color here updates the whole app.
- The web prototype at `../index.html` is the visual reference — every screen here maps 1:1.
