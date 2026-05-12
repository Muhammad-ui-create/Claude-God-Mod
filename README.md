# Happie

A daily wellness companion built around 5–15 minute rituals — focus, energize, unwind, recover — paired with Drink Happie's functional mushroom drinks.

This repo contains two deliverables:

## 1. Web prototype — `index.html`

A single-file high-fidelity interactive prototype. Open it in a browser to see the full app rendered inside an iOS phone frame. Drives every screen and interaction:

- **Onboarding** — 5-step first launch (name, default intention, reminder time), persisted via `localStorage`.
- **Today** — intention picker, dynamic ritual hero, "pair with a sip" Fungi Fusion moment, streak + minutes stats, breathwork overlay.
- **Library** — Mushroom 101 with Dr. Veronica Jow, four mushroom tiles, articles → full reader sheet.
- **Mood** — 5-tap check-in, animated 7-day SVG trend chart, smart recommendation.
- **Shop** — "Stock Your Ritual" flavor cards linking to drinkhappie.com, Amazon, TikTok Shop.
- **Profile / Settings** sheet — streak history, reminders, integrations, replay onboarding.

Use this as the visual reference + stakeholder demo.

## 2. Native app — `mobile/`

The shippable iOS + Android build. Expo + React Native + Expo Router, same design tokens as the prototype. See `mobile/README.md` for the file map and run instructions:

```bash
cd mobile
npm install
npx expo start
```

## Design system

Tokens live in `mobile/constants/theme.ts` (mirrored inline in `index.html`).

| Token | Hex | Use |
| --- | --- | --- |
| paper | `#F5EFE2` | app background |
| cream | `#FBF7EE` | card surface |
| ink | `#2A231A` | text, primary buttons |
| focus | `#D87A5C` | lion's mane / deep work |
| energize | `#E8A85B` | cordyceps / go-mode |
| unwind | `#9C8AB8` | reishi / wind down |
| recover | `#7FA68C` | chaga / soft mode |

Typography: Fraunces (display), Inter (body), JetBrains Mono (meta).
