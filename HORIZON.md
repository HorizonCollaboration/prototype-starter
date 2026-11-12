# How this prototype is made

This prototype was started on Horizon, where people share problems and build open-source solutions together. Horizon writes and changes it with AI, at a member's request, and every change is confirmed by a person first.

A prototype is for trying an idea and shaping it together. Once a community agrees it solves their problem, it can become a full app.

## Files Horizon changes

- `src/App.jsx`: the prototype's main screen.
- `src/sampleData.js`: made-up data to try it with.
- `src/components/`: the prototype's own pieces, as `PascalCase.jsx`.

Everything else is fixed, so every prototype is predictable to build, safe to publish and looks properly designed. That includes:

- `src/kit/`: Horizon's kit, the components every screen is built from (see `KIT.md`). They're built on [shadcn/ui](https://ui.shadcn.com) (in `src/components/ui/`) for now; prototypes only use the kit, so the library underneath can change without touching a prototype.
- `src/theme.css`: the look (font and colours), which the community chooses on Horizon.

## Rules

- **Sample data only.** No real names, patients, clients or personal details.
- **Nothing leaves the browser.** No server and no database. Anything people enter is kept in their own browser with `useStoredState` from `src/storage.js`.
- **No other websites.** The published page can't load scripts from, or send data to, anywhere else.
- **Build with the kit.** Screens use the kit's components and Lucide's icons (`import { House } from 'lucide-react'`). Tailwind is for layout and spacing only; colours come from the kit's tones, never Tailwind's own colours like `blue-500`. No other packages.

## Running it yourself

```
npm install
npm run dev
```
