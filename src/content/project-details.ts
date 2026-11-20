import { projects as familyProjects } from '@eylulg/ui/projects';
import type { Project } from '@/content/projects';

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Screenshot {
  /** Path under public/. Placeholder until real screenshots exist. */
  src: string;
  alt: string;
}

export interface Decision {
  title: string;
  /** What the choice gives and what it costs. */
  body: string;
}

interface ProjectDetail {
  intro: string;
  role: string;
  /** Label of the main link, for projects where "Open the live app" would not fit. */
  liveLabel?: string;
  why: string;
  /** At most three short points. */
  does: string[];
  /** Two or three real trade-offs, each with its cost. */
  decisions: Decision[];
  testing: string;
  next?: string;
  /** Four to six items. */
  stack: string[];
  screenshots: Screenshot[];
}

const PLACEHOLDER = '/placeholder-screenshot.svg';
const ROLE = 'Built alone, design and code';

const details: Record<string, ProjectDetail> = {
  ui: {
    intro:
      'The React component library behind every project on this site, with nine colour themes and the shared site chrome.',
    role: ROLE,
    liveLabel: 'Open Storybook',
    why: 'My design system work at companies is private. I wanted a public library that shows how I design component APIs, tokens and releases.',
    does: [
      'Over thirty components on React Aria, plus line, bar and grid charts with a table view.',
      'Nine themes that change colour only, so type and spacing stay the same.',
      'The top nav, project switcher, theme toggle and footer that every project here uses.',
    ],
    decisions: [
      {
        title: 'React Aria for behaviour',
        body: 'Keyboard, focus and screen reader behaviour regress most, so I use a tested base and write the API and the look. The cost is a dependency I do not control.',
      },
      {
        title: 'Semantic tokens only',
        body: 'Components read names like text-primary, never a colour scale, so dark mode and themes are variable changes. The cost is a token layer to learn before styling anything.',
      },
      {
        title: 'Generated colour scales',
        body: 'Every theme uses the same lightness at each step, so one check covers contrast for all of them. The cost is less room to tune a single colour by hand.',
      },
    ],
    testing:
      'Every component runs through axe in light and dark, and a script checks the contrast of every text token, fill and focus ring in each theme. A size budget runs in CI.',
    next: 'Visual regression tests, so a token change shows up as a picture.',
    stack: [
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'React Aria Components',
      'Storybook',
      'Vitest',
    ],
    screenshots: [{ src: PLACEHOLDER, alt: 'Storybook page for the Button component' }],
  },
  workspace: {
    intro:
      'An issue tracker you can use without signing in, with a list, a board, a command palette and three languages.',
    role: ROLE,
    why: 'I wanted one product-style app where server data, instant edits and keyboard control work together.',
    does: [
      'A grouped list and a board with drag and drop, and a command palette and shortcuts for every common action.',
      'Changes show at once, and roll back with a message if the server refuses.',
      'English, Turkish and German. A missing translation fails the build.',
    ],
    decisions: [
      {
        title: 'PGlite on my machine, Postgres in production',
        body: 'Same schema and migrations, so development and tests need nothing installed. The cost is two database drivers to keep in step.',
      },
      {
        title: 'Fractional sort keys',
        body: 'Moving a card writes one row instead of renumbering the column.',
      },
      {
        title: 'A private copy for each visitor',
        body: "Nobody sees anyone else's edits, and a nightly job removes copies after a day. The cost is more rows than one shared demo.",
      },
    ],
    testing:
      'Server actions run against a real database with the real migrations, and Playwright drives the keyboard flows on the production build.',
    next: 'Showing who else is looking at an issue.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Drizzle ORM', 'PGlite', 'Postgres on Neon'],
    screenshots: [{ src: PLACEHOLDER, alt: 'Issue list and board with the command palette open' }],
  },
  'review-companion': {
    intro:
      'Paste a public GitHub pull request and get a review from Claude, file by file, that you triage before anything leaves the app.',
    role: ROLE,
    why: 'I wanted an AI review where the reviewer stays in charge. Nothing goes to GitHub unless a person accepts it.',
    does: [
      'Streams findings file by file and drops any finding that cites a line outside the diff.',
      'Accept, dismiss or edit each finding with shortcuts, then export the accepted ones as GitHub Markdown.',
      'Without an API key it replays one hand-written sample review, so the live demo never calls Claude.',
    ],
    decisions: [
      {
        title: 'One file per model request',
        body: 'Findings appear as they arrive and files do not mix. The cost is more requests, and problems that span files are harder to catch.',
      },
      {
        title: 'Drop findings on missing lines',
        body: 'A comment on the wrong line costs the reviewer trust faster than a missing one. The cost is that some true findings are lost, and the review says how many.',
      },
      {
        title: 'Export instead of posting',
        body: 'The reviewer stays the author of the review. The cost is one paste per comment.',
      },
    ],
    testing:
      'The diff parser, chunking, finding validation, export and the review route have unit tests. Playwright runs the production build in demo mode with axe in light and dark.',
    next: 'Record a real review as the demo sample.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Zustand', 'zod', 'Anthropic SDK'],
    screenshots: [{ src: PLACEHOLDER, alt: 'Review Companion with findings listed per file' }],
  },
  'assistant-studio': {
    intro:
      'A research assistant that answers from your documents with citations you can open, and asks before it acts.',
    role: ROLE,
    why: 'I wanted to get the states around a model right: streaming, stopping, approval and what a person sees when something fails.',
    does: [
      'Answers from text, Markdown and PDF files, and each citation opens the source at the cited passage.',
      'Tool calls wait for approval. Stop keeps the partial answer, and a dropped connection offers Resume.',
      'An Insights page shows usage and eval results.',
    ],
    decisions: [
      {
        title: 'A demo that never calls Claude',
        body: 'It replays written sample answers, and for your own files it quotes the best passages in the browser, so nothing leaves the page. The cost is that the demo says little about the model.',
      },
      {
        title: 'A stateless server',
        body: 'An action takes two requests: the first reports the tool call, the browser asks you, and the second carries the result. The cost is a protocol to keep in step on both sides.',
      },
      {
        title: 'Stop and disconnect are different',
        body: 'Stop keeps the answer so far. A dropped connection shows an interruption, not an error. The cost is more states to render and test.',
      },
    ],
    testing:
      'The reducer, citation offsets, the approval protocol and the eval checks run as plain tests, and Playwright covers the demo with axe. I wrote the sample answers myself, so the evals check my code and say nothing about the model.',
    next: 'Record the sample answers once with a real key on my machine.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'zod', 'IndexedDB', 'Anthropic SDK'],
    screenshots: [
      {
        src: PLACEHOLDER,
        alt: 'Answer with numbered citations and the source viewer open at the cited passage',
      },
    ],
  },
  watchlist: {
    intro:
      'A movie and series watchlist on TMDB, with search, ratings, notes and a share link that needs no server.',
    role: ROLE,
    why: 'I rebuilt a 2021 demo to see how I would ship it now: the key on the server, data checked at the edge and three languages.',
    does: [
      'Browse and search the catalogue, then keep a list with a status, a rating and a note.',
      'The list stays in your browser. A share link carries it in the URL fragment, so nothing is uploaded.',
      'English, Turkish and German, and it installs as an app with an offline page.',
    ],
    decisions: [
      {
        title: 'The list lives in localStorage',
        body: 'No account and nothing stored by me, and every read, import and share link is checked with zod. The cost is that a list only moves to another browser by export.',
      },
      {
        title: 'The TMDB key stays on the server',
        body: 'A scan of the built client in CI fails if the key appears. The cost is that every catalogue request goes through my server.',
      },
      {
        title: 'Cache time by kind of data',
        body: 'An hour for trending, twelve for details. Pages stay fresh enough and builds never call TMDB. The cost is details that can be twelve hours old.',
      },
    ],
    testing:
      'MSW stands in for TMDB in unit tests and a small mock server does in Playwright, so no test needs a key. Playwright covers search, adding a title, a shared link and axe in light and dark.',
    next: 'A pick for tonight from the titles I have not watched.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'next-intl', 'zod', 'Playwright'],
    screenshots: [{ src: PLACEHOLDER, alt: 'Watchlist with status filters and statistics' }],
  },
  'tokens-to-tailwind': {
    intro:
      'Paste a design tokens file, preview it on real components and export a Tailwind CSS 4 theme.',
    role: ROLE,
    why: 'Tokens move from Figma to code by hand, and small naming mistakes slip through. I wanted a tool that checks them.',
    does: [
      'Reads W3C, Figma Variables and Tokens Studio files, and reports broken aliases and cycles.',
      'Previews a card, a form, buttons and badges with your tokens. Everything runs in the browser.',
      'Exports a Tailwind CSS 4 theme.css, CSS variables or JSON.',
    ],
    decisions: [
      {
        title: 'One token model for three formats',
        body: 'Each parser produces the same typed model, so the preview and every export read one shape. The cost is that a format feature outside the model is lost.',
      },
      {
        title: 'Warn and keep going',
        body: 'A broken alias gives a warning and every valid token still exports. The cost is that a file can export with a gap, so the warnings matter.',
      },
      {
        title: 'Skip what Tailwind has no place for',
        body: 'Types such as gradients are skipped with a warning instead of becoming variables that do nothing. The cost is that you write those by hand.',
      },
    ],
    testing:
      'Each parser runs against fixtures, including invalid JSON and alias cycles. The generated theme is compared with snapshot files, and the app is tested with axe.',
    next: 'Evaluating the Tokens Studio math expressions, which are skipped today.',
    stack: ['React 19', 'TypeScript', 'Vite 7', 'Tailwind CSS 4', 'culori', 'Vitest'],
    screenshots: [
      { src: PLACEHOLDER, alt: 'Token JSON pasted on the left and a live component preview' },
    ],
  },
  'plain-language-word-addin': {
    intro:
      'A Word add-in that scores readability, points to hard sentences and rewrites a paragraph in plain language as a tracked change.',
    role: ROLE,
    liveLabel: 'Open the browser preview',
    why: 'I wanted an AI rewrite where the author keeps control: it arrives as a tracked change they can accept, reject or edit.',
    does: [
      'Scores the document and lists long sentences, passive voice, jargon and filler words.',
      'Shows a rewrite as a word-level diff, with a warning if a number or protected term went missing.',
      'Inserts it as a tracked change, and refuses if the paragraph changed since the rewrite.',
    ],
    decisions: [
      {
        title: 'A tracked change, not a replace',
        body: "The author's edits are never overwritten, and their tracking setting comes back afterwards. The cost is a check on every insert and a refusal when the paragraph moved.",
      },
      {
        title: 'A gateway between the interface and Word',
        body: 'The interface never calls Word directly, so tests use a fake and a browser tab gets a sample document. The cost is an interface to keep in step with Word.',
      },
      {
        title: 'The server checks the model',
        body: 'It confirms every number and protected term is still in the rewrite and warns if not, instead of trusting the model. The cost is a warning the author has to read.',
      },
    ],
    testing:
      'The readability engine, the Word wrapper (against a fake Word) and the server have unit tests. Without an API key the server returns sample rewrites, so the browser preview never calls Claude.',
    next: 'A short demo video, since the add-in only runs inside Word.',
    stack: ['Office.js', 'React 19', 'TypeScript', 'Hono', 'zod', 'Anthropic SDK'],
    screenshots: [
      { src: PLACEHOLDER, alt: 'Word task pane with a readability score and an issue list' },
    ],
  },
  'agent-control-room': {
    intro:
      'A workflow builder and control room for a simulated engineering agent: draw its steps as a graph, dry run it and publish.',
    role: ROLE,
    why: 'An agent that writes code is only useful if people can see and steer it. I wanted the operating surface: approval gates, guards and a trace of every job.',
    does: [
      'Edit the steps on a canvas with eleven step types. Publish stays off until the graph is valid.',
      'A seeded simulator runs jobs through the published workflow, with live counts and a trace for each job.',
      'Queue, approvals, guards and model routing pages around it.',
    ],
    decisions: [
      {
        title: 'A custom canvas instead of React Flow',
        body: 'Owning the nodes gave me control of focus, keyboard and announcements. The cost is pan and zoom maths and hit testing, and there is no minimap.',
      },
      {
        title: 'Workflows are versioned data',
        body: 'Jobs keep the version they started on, so publishing never changes work in flight. The cost is several versions alive at once, and only the last 20 are kept.',
      },
      {
        title: 'A keyboard path for every pointer action',
        body: 'An outline view builds the same graph without the canvas, even on a phone. The cost is two views to keep in step.',
      },
    ],
    testing:
      'Graph logic, the simulator and recorded event streams run as plain tests. Keyboard and pointer editing flows run with axe on every page.',
    next: 'Measuring the canvas on a production build and on a phone. So far I measured only a development build.',
    stack: ['React 19', 'TypeScript', 'Vite 7', 'Zustand', 'zod', 'Vitest'],
    screenshots: [
      {
        src: PLACEHOLDER,
        alt: 'Workflow editor with the default pipeline and live job counts on each step',
      },
    ],
  },
  sudoku: {
    intro:
      'A Sudoku game in Vue 3 with four difficulty levels, hints, undo and keyboard play, where every puzzle has one solution.',
    role: ROLE,
    liveLabel: 'Play the game',
    why: 'I wanted a small project around one real problem: generating puzzles with exactly one solution.',
    does: [
      'Four difficulty levels, up to ten hints, undo and redo, and highlighted conflicts.',
      'A score that rewards correct entries and penalises mistakes, hints and time, with a local top three.',
      'Keyboard play with one tab stop for the grid. The timer pauses when the tab is hidden.',
    ],
    decisions: [
      {
        title: 'Hide a cell only if one solution remains',
        body: 'The stored solution is then the only answer, so checking an entry is always fair. The cost is a solver run for each cell tried, which stops counting at two solutions to stay fast.',
      },
      {
        title: 'Difficulty is the number of visible cells',
        body: 'It is simple and predictable. The cost is that a puzzle with few clues can still be easy, because I do not grade by solving technique.',
      },
    ],
    testing:
      'The generator is tested for valid grids, unique solutions and clue counts per difficulty. The puzzle store, the timer and the leaderboard storage have unit tests.',
    next: 'Grading difficulty by the solving techniques a puzzle needs.',
    stack: ['Vue 3', 'TypeScript', 'Vite 7', 'Vitest', 'Vue Test Utils'],
    screenshots: [{ src: PLACEHOLDER, alt: 'Sudoku board in the middle of a game' }],
  },
};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return details[slug];
}

/** Screenshots are hidden until a real one replaces the placeholder. */
export function realScreenshots(detail: ProjectDetail): Screenshot[] {
  return detail.screenshots.filter((shot) => shot.src !== PLACEHOLDER);
}

/** The live link first, then the source. URLs come from the shared project list, so there is one source of truth. */
export function projectLinks(project: Project, detail: ProjectDetail): ProjectLink[] {
  const family = familyProjects.find((item) => item.id === project.libraryId);
  if (!family) return [];
  const links: ProjectLink[] = [];
  if (family.url) links.push({ label: detail.liveLabel ?? 'Open the live app', href: family.url });
  links.push({ label: 'Source on GitHub', href: family.repoUrl });
  return links;
}
