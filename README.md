# eylulg.github.io

The portfolio site of Eylül Güneş, Senior Frontend Developer: projects, experience, how I work, and the AI agent I built. Live at <https://eylulg.github.io>.

## Stack

- Vite 7, React 19, TypeScript (strict), React Router 7 with a lazy-loaded chunk per page
- [Untitled UI React](https://www.untitledui.com/react) components (MIT) on React Aria Components and Tailwind CSS 4
- Inter, self-hosted through `@fontsource-variable/inter`
- Dark mode with Untitled UI's `dark-mode` class: follows the system setting until the visitor flips the toggle, then the choice is stored in localStorage
- Vitest, Testing Library and vitest-axe for unit and accessibility tests; Playwright for a smoke test of the built site
- ESLint 9 (flat config, typescript-eslint, react-hooks) and Prettier
- GitHub Actions for CI and the GitHub Pages deploy

## Run it

Requires Node 24 and npm 11.

```sh
npm install
npm run dev          # http://localhost:5173
```

| Script              | What it does                                                            |
| ------------------- | ----------------------------------------------------------------------- |
| `npm run typecheck` | `tsc -b` over the app, configs and e2e tests                            |
| `npm run lint`      | ESLint, zero warnings allowed                                           |
| `npm run format`    | Prettier, write mode (`format:check` to only check)                     |
| `npm test`          | Vitest: a render test and an axe test for every page                    |
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

- **Project goes live:** set `status: "live"` in `projects.ts`. The live link loses its "Not deployed yet" badge.
- **Real screenshots:** put images in `public/screenshots/` and replace the `src` of the project's `screenshots` entries. Keep the `alt` text accurate.
- **New project:** add an entry to `projects.ts` and its URL to `public/sitemap.xml`.
- **New CV:** replace `public/Eylul-Gunes-CV.pdf`.

Analytics are not wired up. `src/lib/analytics.ts` holds the commented PostHog hook point.

## Project layout

```
src/
  app/root-layout.tsx      skip link, header, main, footer, focus on navigation
  router.tsx               route table, one lazy chunk per page
  pages/                   one file per route, each with a *.test.tsx
  components/base/         Untitled UI components (buttons, badges, tags, inputs, toggle, tooltip)
  components/application/  Untitled UI tabs
  components/site/         site-specific pieces: header, footer, Seo, cards, flow diagram
  content/                 all text
  providers/               theme and React Aria router providers
public/                    CV, og.png, sitemap.xml, robots.txt, 404.html
e2e/smoke.spec.ts          Playwright smoke test
```

Untitled UI components are added with `npx untitledui@latest add <component>` and then live in `src/components/`.

## Deploy

`.github/workflows/deploy.yml` builds the site and deploys `dist/` to GitHub Pages on every push to `main`. `.github/workflows/ci.yml` runs type checking, linting, formatting, tests, the build and the Playwright smoke test on pull requests and pushes.

One-time setup:

1. Create the public repository `eylulg/eylulg.github.io` on GitHub.
2. Push this repository's `main` branch to it.
3. In the repository, open **Settings > Pages** and set **Source** to **GitHub Actions**.

The base path is `/` because this is a user site. GitHub Pages has no SPA fallback, so `public/404.html` redirects deep links to `/?/path`, and a small script in `index.html` restores the real URL before the router starts.

## License

MIT for the code. The text, CV and images are © Eylül Güneş.
