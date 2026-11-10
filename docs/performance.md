# Performance

Goal: the home route under 120 kB of gzipped JavaScript before the menus load, Lighthouse performance 90 or above on mobile, CLS under 0.1 on every route.

## Method

- Production build served by `vite preview`.
- Lighthouse 13 through `@lhci/cli`, mobile defaults, three runs per route, median reported. Raw reports are in `docs/perf/before` and `docs/perf/after`, medians in `docs/perf/summary.json`.
- JavaScript sizes below are gzip sizes of the files the browser loads, measured with headless Chromium at 375 px. "Before the menus" is everything loaded until the idle upgrade of the top bar controls. "Total" includes the menu code that loads once the browser is idle.
- Before is commit 97b9c69, after is the current branch.

## Results

JavaScript, gzipped kB.

| Route               | Before | After, before the menus | Delta | After, total | Delta |
| ------------------- | ------ | ----------------------- | ----- | ------------ | ----- |
| /                   | 189.0  | 125.8                   | -63.2 | 171.0        | -18.0 |
| /projects           | 201.6  | 160.2                   | -41.4 | 183.7        | -17.9 |
| /projects/ui        | 184.0  | 127.1                   | -56.9 | 172.4        | -11.6 |
| /experience         | 178.9  | 121.7                   | -57.2 | 166.9        | -12.0 |
| /how-this-was-built | 176.7  | 119.5                   | -57.2 | 164.7        | -12.0 |

Entry chunk: 173.7 kB before, 93.1 kB after. Fonts: 133 kB before, 51 kB after (the 3 kB Turkish subset is a separate file that loads only where a page uses those letters).

Lighthouse mobile medians of three runs.

| Route               | Score before | Score after | LCP before | LCP after | TBT before | TBT after | CLS | Transfer before | Transfer after |
| ------------------- | ------------ | ----------- | ---------- | --------- | ---------- | --------- | --- | --------------- | -------------- |
| /                   | 94           | 95          | 3069 ms    | 2901 ms   | 11 ms      | 1 ms      | 0   | 340.5 kB        | 243.9 kB       |
| /projects           | 92           | 94          | 3367 ms    | 3052 ms   | 12 ms      | 0 ms      | 0   | 353.8 kB        | 257.3 kB       |
| /projects/ui        | 93           | 95          | 3197 ms    | 2891 ms   | 0 ms       | 0 ms      | 0   | 334.4 kB        | 244.1 kB       |
| /experience         | 94           | 95          | 3052 ms    | 2909 ms   | 0 ms       | 0 ms      | 0   | 329.7 kB        | 239.2 kB       |
| /how-this-was-built | 94           | 96          | 3066 ms    | 2751 ms   | 10 ms      | 0 ms      | 0   | 327.1 kB        | 236.5 kB       |

FCP stays at about 754 ms on every route, before and after. The score was already above 90, so the change shows mostly in transfer size and LCP.

## What each change did

1. **Menus on demand.** The project switcher and theme toggle pulled React Aria's menu and overlay code (about 46 kB gzipped) into the first load. The top bar now renders native buttons of the same size and label. The theme switch works at once, the menu buttons load the menu and open it when pressed, and the real controls replace the buttons when the browser is idle. Geometry of buttons and real controls is identical, and CLS is 0.
2. **Fonts.** The library's font file loaded the Latin and Latin Extended subsets (133 kB) because of the letters ü and ş. Now one Latin file (48 kB, preloaded) plus a 3 kB subset of the six Turkish letters outside it. The `@fontsource-variable/inter` dependency is removed.
3. **Case study text.** It moved out of the project list module, so the home route and the list no longer carry about 5 kB of prose they do not show.
4. **Declarative router.** `BrowserRouter` with `React.lazy` per page replaced the data router, saving about 18 kB in the entry chunk. Scroll position is restored by pathname for back and forward.

## What did not help

- Deferring the menus does not reduce the total bytes. Lighthouse waits for the network to go quiet, so it also counts the menu code, which is why its JS transfer is higher than the "before the menus" column.
- Tags, Tabs, Input and the mobile drawer were already outside the entry chunk. The variants strip and the flow diagram are small and were left alone.

## What is left

- The home route is 125.8 kB before the menus, 5.8 kB over the 120 kB goal. React DOM and React Router are about 80 kB of that, the library's Button (React Aria press and link code) about 14 kB and `tailwind-merge` behind `cx` about 9 kB. Getting under 120 kB needs a lighter Button and `cx` in `@eylulg/ui`.
- LCP is 2.7 to 3.1 s under Lighthouse's slow 4G emulation, limited by the stylesheet and the font before first render.

## Budgets

- `size-limit`: first load entry script and stylesheet, 106 kB gzipped (measured 104.1 kB).
- `lighthouserc.json`: performance 0.9, CLS 0.1, total transfer 400 kB, median of three runs on five routes, run in the `lighthouse` job of ci.yml.
