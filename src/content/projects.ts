import { projects as familyProjects } from "@eylulg/ui/projects";

export type ProjectStatus = "live" | "in progress";

export const projectTags = ["React", "Next.js", "Vue", "Design system", "AI", "Microsoft 365", "Tooling"] as const;
export type ProjectTag = (typeof projectTags)[number];

export interface ProjectLink {
    label: string;
    href: string;
    /** True while the link points at something that is not published yet. */
    planned?: boolean;
}

export interface Screenshot {
    /** Path under public/. Placeholder until real screenshots exist. */
    src: string;
    alt: string;
}

export interface Project {
    slug: string;
    title: string;
    summary: string;
    status: ProjectStatus;
    tags: ProjectTag[];
    featured?: boolean;
    /** Id in the shared project list of @eylulg/ui; the repository and live URLs come from there. */
    libraryId: string;
    problem: string;
    built: string[];
    stack: string[];
    tested: string[];
    outcome: string;
    screenshots: Screenshot[];
}

const PLACEHOLDER = "/placeholder-screenshot.svg";

export const projects: Project[] = [
    {
        slug: "workspace",
        libraryId: "workspace",
        title: "Workspace",
        summary: "A keyboard first issue tracker in Next.js, with a list and a board, a command palette and three languages.",
        status: "in progress",
        tags: ["Next.js", "React"],
        problem:
            "A product UI with server data, optimistic updates and keyboard control is the best test of how I build front ends. I wanted a public one that I can show end to end.",
        built: [
            "An issue tracker with server actions, and an optimistic list and board.",
            "A command palette and keyboard shortcuts.",
            "A Drizzle schema, migrations and a demo workspace seeded on PGlite, so it runs without a database server.",
            "English, Turkish and German with locale routing.",
        ],
        stack: ["Next.js 16", "React 19", "TypeScript", "Drizzle ORM", "PGlite", "next-intl", "zod", "dnd-kit", "Vitest", "Playwright"],
        tested: [
            "Query logic and the board column rules as pure functions.",
            "Server actions against a real PGlite database.",
            "Message parity across the three languages.",
            "Keyboard flows.",
        ],
        outcome: "In progress. The app is not deployed yet and the README is still the starter text, so the repository is the place to look.",
        screenshots: [{ src: PLACEHOLDER, alt: "Issue list and board with the command palette open (placeholder)" }],
    },
    {
        slug: "review-companion",
        libraryId: "review-companion",
        title: "Review Companion",
        summary: "Paste a public GitHub pull request, get a structured review from Claude file by file, and triage every finding before it goes anywhere.",
        status: "in progress",
        tags: ["Next.js", "React", "AI"],
        featured: true,
        problem:
            "An AI review is only useful if a person stays in charge of it. This is built for the reviewer, not as a bot: nothing is posted to GitHub, and every finding passes through a human first.",
        built: [
            "A server-sent events route that fetches the diff, parses it into files and hunks, and reviews one file per request with structured output.",
            "Each finding is validated with zod and against the diff. Findings that cite a line outside the diff are dropped and counted in a warning.",
            "Triage with accept, dismiss and edit, keyboard shortcuts, and an export of accepted findings as GitHub Markdown with suggestion blocks.",
            "Limits on changed lines, estimated input tokens and reviews per IP, with an explained error for each.",
            "A demo mode that replays a saved review through the real pipeline when no API key is set.",
        ],
        stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "React Aria", "Zustand", "zod", "Anthropic SDK", "Vitest", "Playwright"],
        tested: [
            "Parser, chunking, schema, export, route and store tests.",
            "UI flows with axe, running the real pipeline over the demo fixture with only the network stubbed.",
            "A Playwright run of the production build in demo mode, with axe in light and dark and a 375 px check.",
        ],
        outcome:
            "In progress. The README states exactly what is sent to the model: one file's changed hunks plus the pull request title, branches and description.",
        screenshots: [
            { src: PLACEHOLDER, alt: "Review Companion with findings listed per file (placeholder)" },
            { src: PLACEHOLDER, alt: "Export drawer with the accepted findings as Markdown (placeholder)" },
        ],
    },
    {
        slug: "agent-control-room",
        libraryId: "agent-control-room",
        title: "Agent control room",
        summary:
            "The operator dashboard for an autonomous engineering agent: approval gates, guards, model routing and holds, on a deterministic simulated agent.",
        status: "in progress",
        tags: ["React", "AI"],
        featured: true,
        problem:
            "An agent that writes code on its own is only useful if the people around it can see and steer it. Running one taught me that the hard part is the operating surface, not the model.",
        built: [
            "Overview, queue, job detail, approvals, routing, guards and settings pages.",
            "Approval cards with two options and a recommendation, answered with one key press.",
            "Guards for actions that are never the agent's call, with a log of every blocked attempt.",
            "A routing table that sets the model per kind of job.",
            "A seeded simulator that replays the same day for the same seed, behind a protocol a real agent can replace over server-sent events.",
        ],
        stack: ["React 19", "TypeScript", "Vite 7", "Tailwind CSS 4", "React Router 7", "Zustand", "zod", "Vitest", "GitHub Actions"],
        tested: [
            "The simulator: determinism per seed, approvals blocking and unblocking jobs, guards, routing changes and holds.",
            "The protocol: folding the event stream rebuilds the state, and malformed events are rejected at the boundary.",
            "User flows, focus placement after each action, and axe on every page.",
            "Contrast in light and dark mode, checked in a real browser.",
        ],
        outcome: "In progress. It runs fully in the browser; the GitHub Pages deployment is planned.",
        screenshots: [
            { src: PLACEHOLDER, alt: "Overview page with active jobs and approvals waiting (placeholder)" },
            { src: PLACEHOLDER, alt: "Approval card with two options and a recommendation (placeholder)" },
        ],
    },
    {
        slug: "watchlist",
        libraryId: "watchlist",
        title: "Watchlist",
        summary: "A personal movie and series watchlist on the TMDB API, with search, ratings, notes, sharing without a server and three languages.",
        status: "in progress",
        tags: ["Next.js", "React"],
        problem:
            "My original catalogue was a 2021 demo. I rebuilt it as a product: browse and search, then keep your own list with a status, a rating and a note for each title. The repository is still named movies-series-website-demo and may be renamed.",
        built: [
            "Server-rendered home, movie, series, person and collection pages on TMDB, with the key kept on the server.",
            "Debounced search with the query in the URL and infinite loading.",
            "A watchlist kept in localStorage and validated with zod, with JSON export and import and cross-tab sync.",
            "A read-only share link that carries the list in the URL fragment, so nothing is uploaded.",
            "English, Turkish and German, and an installable app with an offline page.",
        ],
        stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "React Aria", "next-intl", "zod", "MSW", "Vitest", "Playwright"],
        tested: [
            "The TMDB layer, the search route and the watchlist store, with MSW standing in for TMDB.",
            "Feature views rendered with real children, including where focus lands after an action.",
            "Message parity across the three languages.",
            "Playwright against a mock TMDB server: search, add, change status, open a shared link, axe in light and dark, and a 375 px check.",
            "A bundle scan in CI that fails if anything that could reveal the API key is in the client build.",
        ],
        outcome: "In progress. It is built for Vercel and is not deployed yet.",
        screenshots: [
            { src: PLACEHOLDER, alt: "Home page with trending and popular rows (placeholder)" },
            { src: PLACEHOLDER, alt: "Watchlist with status filters and statistics (placeholder)" },
        ],
    },
    {
        slug: "tokens-to-tailwind",
        libraryId: "tokens-to-tailwind",
        title: "Tokens to Tailwind",
        summary: "Paste a design tokens file, preview it with real components, and export a Tailwind CSS 4 theme.css. Everything runs in the browser.",
        status: "in progress",
        tags: ["React", "Design system", "Tooling"],
        problem: "Moving design tokens from Figma into code is usually manual. This tool ties the Figma and design-system side of my work to the code side.",
        built: [
            "A typed parser for W3C design tokens, Figma Variables and Tokens Studio files.",
            "Alias resolution that reports unresolved aliases and cycles without dropping the valid tokens.",
            "A preview of a card, a form, buttons and badges themed with the pasted tokens.",
            "Export of a Tailwind CSS 4 theme.css with a dark mode override, plain CSS variables, or normalised JSON.",
        ],
        stack: ["React 19", "TypeScript", "Vite 7", "Tailwind CSS 4", "React Aria", "Zustand", "culori", "Vitest"],
        tested: [
            "Fixture tests for every parser, including invalid JSON, an unknown format, unresolved aliases and alias cycles.",
            "Generator output checked against snapshot files.",
            "App tests for pasting, errors, export and copy, with axe.",
        ],
        outcome: "In progress. Nothing is uploaded; a GitHub Pages deployment is planned.",
        screenshots: [
            { src: PLACEHOLDER, alt: "Token JSON pasted on the left and a live component preview on the right (placeholder)" },
            { src: PLACEHOLDER, alt: "Generated theme.css ready to copy (placeholder)" },
        ],
    },
    {
        slug: "plain-language-word-addin",
        libraryId: "plain-language",
        title: "Plain Language Word add-in",
        summary: "A Word add-in that scores readability, points to hard sentences and rewrites a paragraph in plain language as a tracked change.",
        status: "in progress",
        tags: ["React", "AI", "Microsoft 365"],
        problem:
            "Writers need to know which sentences make a document hard to read, and a rewrite they can trust. The author stays in control: the rewrite goes in as a tracked change they can accept, reject or edit.",
        built: [
            "A readability engine with Flesch-Kincaid grade, Flesch Reading Ease and checks for long sentences, passive voice, nominalisations, jargon and filler words.",
            "A task pane that jumps to the sentence in the document and highlights every long sentence.",
            "A rewrite with a word-level diff and warnings if a number or a protected term goes missing.",
            "An insert that stops if the paragraph changed since the rewrite, and restores the author's tracking setting afterwards.",
            "A small rewrite server that validates input, caps the body size and rate limits, with a demo mode when no API key is set.",
        ],
        stack: ["Office.js", "React 19", "TypeScript", "Vite 7", "Tailwind CSS 4", "Hono", "zod", "Anthropic SDK", "Vitest"],
        tested: [
            "Sentence splitting edge cases, syllables, the readability formulas and each check.",
            "The Word wrapper against a fake of the Word object model, including restoring track changes when an insert fails.",
            "Task pane flows with axe, with Word faked at the gateway.",
            "Server validation, CORS, body cap, rate limit and error mapping.",
        ],
        outcome:
            "In progress. There is no live demo, because an add-in runs inside Word: the repository has a sideloading guide. Only the paragraph you ask to rewrite leaves your computer.",
        screenshots: [{ src: PLACEHOLDER, alt: "Word task pane with a readability score and an issue list (placeholder)" }],
    },
    {
        slug: "ui",
        libraryId: "ui",
        title: "Component library",
        summary: "@eylulg/ui: an accessible React component library with eight theme variants and the shared app chrome every project here is built with.",
        status: "in progress",
        tags: ["React", "Design system"],
        featured: true,
        problem:
            "Most of my design-system work lives in private company repos. I want a public library that shows how I design component APIs, tokens, accessibility and releases, and that makes eight projects feel like one family.",
        built: [
            "Tokens in a Tailwind CSS 4 theme, with eight variants that change only brand hue, gray family, radius and density.",
            "More than thirty components on React Aria Components, each with its own entry point.",
            "The shared chrome: app shell, top nav, project switcher, theme toggle and footer.",
            "Storybook with accessibility checks, and a bundle size budget in CI.",
        ],
        stack: ["React 19", "TypeScript", "Tailwind CSS 4", "React Aria Components", "Storybook", "Vitest", "semantic-release", "GitHub Actions"],
        tested: [
            "Tests for the behaviour the library adds on top of React Aria.",
            "An axe audit of every component in light and dark.",
            "A contrast check of every text token in every variant against WCAG AA.",
        ],
        outcome: "In progress. The live Storybook is planned at the address below.",
        screenshots: [
            { src: PLACEHOLDER, alt: "Storybook page for the Button component (placeholder)" },
            { src: PLACEHOLDER, alt: "The eight theme variants side by side (placeholder)" },
        ],
    },
    {
        slug: "sudoku",
        libraryId: "sudoku",
        title: "Sudoku",
        summary: "A Sudoku game in Vue 3 and TypeScript with four difficulty levels, hints, undo and redo, and keyboard play.",
        status: "in progress",
        tags: ["Vue"],
        problem: "I keep this project in Vue to show range beyond React, and it needs the same polish as the rest: tests, a README and a deployment.",
        built: [
            "A generator that fills a grid by backtracking and hides cells only while the puzzle keeps exactly one solution.",
            "Four difficulty levels, a score that rewards correct entries and penalises mistakes, hints and time, and a local leaderboard.",
            "Conflict highlighting, undo and redo, up to ten hints, and a timer that pauses when the tab is hidden.",
            "Keyboard play with one tab stop for the grid and labelled cells.",
        ],
        stack: ["Vue 3", "TypeScript", "Vite 7", "Vitest", "Vue Test Utils"],
        tested: [
            "The generator: valid full grids, solution counting, unique solutions and visible cell counts per difficulty.",
            "The puzzle store: scoring, error marking, hint costs, undo and redo, and finishing a game.",
            "The timer and the leaderboard storage.",
        ],
        outcome: "In progress. A GitHub Pages deployment is planned.",
        screenshots: [{ src: PLACEHOLDER, alt: "Sudoku board in the middle of a game (placeholder)" }],
    },
    {
        slug: "portfolio",
        libraryId: "portfolio",
        title: "This portfolio",
        summary: "The site you're on: typed content, the shared component library, dark mode, accessibility checks and a Playwright smoke test.",
        status: "live",
        tags: ["React", "Design system", "Tooling"],
        problem:
            "I wanted one place that shows my work and how I work, built to the same standard I hold product code to, and the home of the family of projects.",
        built: [
            "Lazy-loaded routes with React Router 7.",
            "@eylulg/ui components and its portfolio theme variant, with the shared top nav, project switcher and footer.",
            "Dark mode that follows the system setting, with a stored override and no flash on load.",
            "Content as typed data files, with no CMS. Repository and live links come from the library's project list.",
            "Per-route titles and descriptions, a sitemap and a GitHub Pages deploy.",
        ],
        stack: ["React 19", "TypeScript", "Vite 7", "React Router 7", "Tailwind CSS 4", "@eylulg/ui", "Vitest", "Playwright", "GitHub Actions"],
        tested: [
            "A render test and an axe accessibility test for every page.",
            "A Playwright smoke test that builds the site, serves it and checks every route's heading.",
        ],
        outcome: "Live on GitHub Pages. CI runs type checking, linting, tests and the build on every push.",
        screenshots: [{ src: PLACEHOLDER, alt: "Home page of this portfolio in light and dark themes (placeholder)" }],
    },
];

export function getProject(slug: string | undefined): Project | undefined {
    return projects.find((project) => project.slug === slug);
}

export const featuredProjects = projects.filter((project) => project.featured);

export function tagToSlug(tag: ProjectTag): string {
    return tag.toLowerCase().replace(/\s+/g, "-");
}

export function tagFromSlug(slug: string | null): ProjectTag | undefined {
    return projectTags.find((tag) => tagToSlug(tag) === slug);
}

/** Repository and live URLs come from the shared project list, so there is one source of truth. */
export function projectLinks(project: Project): ProjectLink[] {
    const family = familyProjects.find((item) => item.id === project.libraryId);
    if (!family) return [];
    const links: ProjectLink[] = [{ label: "Source on GitHub", href: family.repoUrl }];
    const live = family.url ?? family.plannedUrl;
    if (live) links.push({ label: "Live site", href: live, planned: project.status !== "live" });
    return links;
}
