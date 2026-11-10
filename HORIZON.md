# How this prototype is made

This prototype was started on Horizon, where people share problems and build open-source solutions together. Horizon writes and changes it with AI, at a member's request, and every change is confirmed by a person first.

A prototype is for trying an idea and shaping it together. Once a community agrees it solves their problem, it can become a full app.

## Files Horizon changes

- `src/App.jsx`: the prototype's main screen.
- `src/sampleData.js`: made-up data to try it with.
- `src/components/`: any other pieces of the screen.

Everything else is fixed, so every prototype is predictable to build, safe to publish and looks the same around the edges.

## Rules

- **Sample data only.** No real names, patients, clients or personal details.
- **Nothing leaves the browser.** No server and no database. Anything people enter is kept in their own browser with `useStoredState` from `src/storage.js`.
- **No other websites.** The published page can't load scripts from, or send data to, anywhere else.
- **React and Tailwind only.** No other packages.

## Running it yourself

```
npm install
npm run dev
```
