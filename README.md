# Cal Note

Minimal mobile-first calorie tracker built like a notebook.

## What it does

- Lets you type food notes naturally, one item per line.
- Parses plain English, Hindi, and Hinglish food entries.
- Understands split notes like `2 roti and dal`, `ek kela`, `1/2 cup dahi`, and manual entries like `200 kcal`.
- Auto-calculates daily calories on the right.
- Stores entries by date in local storage.
- Shows daily, weekly, monthly, and yearly calorie totals.
- Shows streak, best day, trend, and recent-day history.

## Run it

Run `npm run dev`.

Open `http://localhost:4173` in a browser.

For the best phone-like experience, add it to your home screen as a PWA.

## Android

- Install Android Studio.
- Run `npm run cap:sync`
- If needed once, run `npx cap add android`
- Run `npm run cap:android`

## Example inputs

```text
2 eggs
1 cup chai
2 roti
1 bowl dal
ek kela
half cup dahi
```

## Notes

- Calories are approximate and based on a small built-in food catalog.
- Unknown foods are shown but not counted until the catalog is extended.
