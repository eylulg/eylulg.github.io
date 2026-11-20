# Performance

The goal is under 120 kB of gzipped JavaScript on the home route, Lighthouse performance of 90 or more on mobile, and a layout shift under 0.1 on every route.

## How it was measured

- A production build served by `vite preview`.
- Lighthouse through `@lhci/cli` with mobile defaults, three runs per route, median reported. Raw reports of the first pass are in `docs/perf/before` and `docs/perf/after`, medians in `docs/perf/summary.json`.
- JavaScript sizes are the gzip size of every script the page loads, measured in headless Chromium at 375 px.

## Results

Before is commit 97b9c69. After is the current branch, with the library's lazy overlays and menus.

| Route               | JS before | JS after | Score before | Score after | LCP after | Transfer before | Transfer after |
| ------------------- | --------- | -------- | ------------ | ----------- | --------- | --------------- | -------------- |
| /                   | 189.0 kB  | 135.9 kB | 94           | 96          | 2734 ms   | 340.5 kB        | 209.1 kB       |
| /projects           | 201.6 kB  | 165.9 kB | 92           | 95          | 2885 ms   | 353.8 kB        | 240.4 kB       |
| /projects/ui        | 184.0 kB  | 138.4 kB | 93           | 96          | 2757 ms   | 334.4 kB        | 210.4 kB       |
| /experience         | 178.9 kB  | 131.7 kB | 94           | 96          | 2731 ms   | 329.7 kB        | 204.2 kB       |
| /how-this-was-built | 176.7 kB  | 129.5 kB | 94           | 96          | 2729 ms   | 327.1 kB        | 201.5 kB       |

Layout shift is 0 on every route.

## What changed

1. Menus on demand. The theme menu pulled about 46 kB of React Aria menu code into the first load. The top bar now renders plain buttons of the same size, and the real controls replace them when the browser is idle or when a menu button is pressed.
2. Fonts. The library's font file loaded two subsets (133 kB) for the letters ü and ş. The site now loads one Latin file (48 kB, preloaded) and a 3 kB Turkish subset.
3. Project text. It moved out of the project list module, so the home route and the list no longer carry about 5 kB of text they do not show.
4. Router. `BrowserRouter` with `React.lazy` per page replaced the data router and saved about 18 kB in the entry chunk.
5. Library. Its overlays load on first open and its menus on first press.

## What is left

- The home route is 135.9 kB, over the 120 kB goal. React DOM and React Router are about 80 kB of that, the library's Button about 14 kB and `tailwind-merge` about 9 kB. Getting under 120 kB needs a lighter Button and `cx` in `@eylulg/ui`.
- LCP is 2.7 to 2.9 s under Lighthouse's slow 4G emulation, limited by the stylesheet and the font.

## Budgets in CI

- `size-limit`: the entry script and stylesheet together, 110 kB gzipped.
- `lighthouserc.json`: performance 0.9, layout shift 0.1 and total transfer 400 kB, median of three runs on five routes.
