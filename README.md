# eylulg.github.io

My portfolio: projects, experience, how I work and the AI agents I build. Live at <https://eylulg.github.io>.

It is a single page app built with Vite, React 19, TypeScript and React Router. The interface comes from my design system, [`@eylulg/ui`](https://github.com/eylulg/ui), using its `portfolio` theme.

## Run it

Needs Node 24. `@eylulg/ui` is a `file:../ui` dependency, so clone `eylulg/ui` next to this repository and build it first.

```sh
(cd ../ui && npm install && npm run build)
npm install
npm run dev          # http://localhost:5173
```

After you rebuild the library, run `npm run relink` to copy it in again.

| Command                                     | What it does                                      |
| ------------------------------------------- | ------------------------------------------------- |
| `npm test`                                  | Unit and accessibility tests (Vitest)             |
| `npm run test:e2e`                          | Builds, serves and opens every route (Playwright) |
| `npm run typecheck`, `lint`, `format:check` | Types, ESLint with no warnings, Prettier          |
| `npm run knip`                              | Unused files, exports and dependencies            |
| `npm run build`                             | Type check and production build into `dist/`      |
| `npm run size`, `npm run lighthouse`        | Bundle budget and mobile Lighthouse budgets       |

The first Playwright run needs a browser: `npx playwright install chromium`.

## Editing content

All text is in typed files under [`src/content/`](src/content): the site details, projects, experience, skills, principles, agents and the page about how the site was built. The text of each project page is in `project-details.ts`, so only that page loads it.

- New project: add it to the project list in `@eylulg/ui`, then add an entry to `projects.ts` with its `libraryId`, and its URL to `public/sitemap.xml`. The repository and live links come from the library.
- New CV: replace `public/Eylul-Gunes-CV.pdf`.

Analytics are off. `src/lib/analytics.ts` holds a commented PostHog hook.

## Decisions

- One lazy chunk per page, and the theme menus load when the browser is idle, to keep the first load small. The numbers are in [docs/performance.md](docs/performance.md). CI fails if the first load grows past 110 kB gzipped, or if Lighthouse mobile drops under 90.
- GitHub Pages has no single page app fallback, so `public/404.html` redirects deep links to `/?/path` and a small script in `index.html` restores the real URL before the router starts.

## Deploy

`.github/workflows/deploy.yml` builds the site and publishes `dist/` to GitHub Pages on every push to `main`. `ci.yml` runs the checks above, the Playwright test, Lighthouse and a secret scan on pull requests and pushes. Both build `@eylulg/ui` from its main branch first, so the site uses the latest library code before it is released to npm.

## License

MIT for the code. The text, CV and images are © Eylül Güneş.
