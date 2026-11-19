# eylulg.github.io

The portfolio site of Eylül Güneş, Senior Frontend Developer: projects, experience, how I work, and the AI agent I built. Live at <https://eylulg.github.io>.

## Stack

- Vite 7, React 19, TypeScript (strict), React Router 7 with a lazy-loaded chunk per page
- [`@eylulg/ui`](https://github.com/eylulg/ui), the shared design system, with its `portfolio` theme variant, on React Aria Components and Tailwind CSS 4
- The shared chrome from the library: top nav with the project switcher, theme toggle and a footer that lists every project
- Inter, self-hosted through `@fontsource-variable/inter`
- Dark mode with the library's `dark-mode` class: the library's theme toggle follows the system setting until the visitor flips it, and an inline script avoids a flash on load
- Vitest, Testing Library and vitest-axe for unit and accessibility tests; Playwright for a smoke test of the built site
- ESLint 9 (flat config, typescript-eslint, react-hooks, jsx-a11y), Prettier, knip, and Husky with lint-staged
- GitHub Actions for CI and the GitHub Pages deploy

## Run it

Requires Node 24 and npm 11. `@eylulg/ui` is a `file:../ui` dependency until the library is published, so clone `eylulg/ui` next to this repository and build it first.

```sh
(cd ../ui && npm install && npm run build)
npm install
npm run dev          # http://localhost:5173
```

| Script              | What it does                                                            |
| ------------------- | ----------------------------------------------------------------------- |
| `npm run typecheck` | `tsc -b` over the app, configs and e2e tests                            |
| `npm run lint`      | ESLint, zero warnings allowed                                           |
| `npm run format`    | Prettier, write mode (`format:check` to only check)                     |
| `npm test`          | Vitest: a render test and an axe test for every page                    |
| `npm run knip`      | Unused files, exports and dependencies                                  |
| `npm run build`     | Type check and production build into `dist/`                            |
| `npm run preview`   | Serve `dist/` locally                                                   |
| `npm run test:e2e`  | Build, serve on port 47317 and check every route's heading (Playwright) |

The first Playwright run needs a browser: `npx playwright install chromium`.

## Editing content

All text lives in typed data files under [`src/content/`](src/content). There is no CMS.

| File            | Content                                                                  |
| --------------- | ------------------------------------------------------------------------ |
| `site.ts`       | Name, tagline, contact links, About text, languages, home proof points   |
| `projects.ts`   | Projects, tags, status (`live` or `in progress`), links and case studies |
| `experience.ts` | Roles and education from the CV                                          |
| `skills.ts`     | Skill groups                                                             |
| `principles.ts` | The How I work page                                                      |
| `agents.ts`     | The AI agents page and the steps in the flow diagram                     |

Common edits:

- **Project goes live:** set `url` for it in `@eylulg/ui/projects`, then set `status: "live"` in `projects.ts`. The live link loses its "Not deployed yet" badge. Repository and live URLs are read from the library's project list, so there is one source of truth.
- **Real screenshots:** put images in `public/screenshots/` and replace the `src` of the project's `screenshots` entries. Keep the `alt` text accurate.
- **New project:** add it to the library's project list, then add an entry to `projects.ts` with its `libraryId` and its URL to `public/sitemap.xml`.
- **New CV:** replace `public/Eylul-Gunes-CV.pdf`.

Analytics are not wired up. `src/lib/analytics.ts` holds the commented PostHog hook point.

## Project layout

```
src/
  app/root-layout.tsx      AppShell, top nav, footer, focus on navigation
  router.tsx               route table, one lazy chunk per page
  pages/                   one file per route, each with a *.test.tsx
  components/site/         site-specific pieces: link button, page intro, Seo, cards, flow diagram
  content/                 all text
  providers/               React Aria router provider
public/                    CV, og.png, sitemap.xml, robots.txt, 404.html
e2e/smoke.spec.ts          Playwright smoke test
```

UI components come from `@eylulg/ui`. If one is missing, extend the library instead of adding a copy here.

## Design system dependency

Locally `@eylulg/ui` is installed as a copy from `../ui` (`npm install ../ui --install-links`); run `npm run relink` after rebuilding the library. In CI and in the Pages deploy, the composite action `.github/actions/setup` checks out `eylulg/ui` into `ui-src`, builds it, and installs it from there with `npm pkg set dependencies.@eylulg/ui=file:./ui-src` (runner only, the committed `package.json` is unchanged). Once the library is published to npm, the dependency switches to `^1.0.0`, the setup action goes back to `npm ci`, and Vercel deploys of the other projects need that publish.

## Deploy

`.github/workflows/deploy.yml` builds the site and deploys `dist/` to GitHub Pages on every push to `main`. `.github/workflows/ci.yml` runs type checking, linting, formatting, tests, the build and the Playwright smoke test on pull requests and pushes.

One-time setup:

1. Create the public repository `eylulg/eylulg.github.io` on GitHub.
2. Push this repository's `main` branch to it.
3. In the repository, open **Settings > Pages** and set **Source** to **GitHub Actions**.

The base path is `/` because this is a user site. GitHub Pages has no SPA fallback, so `public/404.html` redirects deep links to `/?/path`, and a small script in `index.html` restores the real URL before the router starts.

## License

MIT for the code. The text, CV and images are © Eylül Güneş.
