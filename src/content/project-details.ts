import { projects as familyProjects } from '@eylulg/ui/projects';
import type { Project } from '@/content/projects';

export interface ProjectLink {
  label: string;
  /** Null while the project is not deployed: the link is shown as a disabled control. */
  href: string | null;
  /** True while the link points at something that is not published yet. */
  planned?: boolean;
}

export interface Screenshot {
  /** Path under public/. Placeholder until real screenshots exist. */
  src: string;
  alt: string;
}

interface ProjectDetail {
  context: string;
  built: string[];
  decisions: string[];
  tested: string[];
  next: string[];
  /** Only written once there is something measured to say. */
  outcome?: string;
  screenshots: Screenshot[];
}

const PLACEHOLDER = '/placeholder-screenshot.svg';

const details: Record<string, ProjectDetail> = {
  ui: {
    context:
      'Most of my design-system work lives in private company repositories. This is a public library that shows how I design component APIs, tokens, accessibility and releases, and that makes the projects here read as one family.',
    built: [
      'Tokens in a Tailwind CSS 4 theme on one warm frame, with nine project themes that change colour only, so the fonts, text size and density stay the same in each.',
      'More than thirty components on React Aria Components, each with its own entry point.',
      'The shared chrome: app shell, top nav, project switcher, theme and text size toggles, and footer.',
      'Line, bar and grid charts with keyboard-reachable marks, a table alternative and a palette checked for contrast and colour blindness in every variant.',
      'Storybook with accessibility checks, and a bundle size budget in CI.',
    ],
    decisions: [
      'React Aria for behaviour, my own code for API and looks. Keyboard handling, focus management and screen reader announcements are the parts that regress most and are hardest to test, so I use a tested base instead of rewriting them.',
      'Components read semantic tokens such as text-primary, never a colour scale. Rebranding or dark mode is then a matter of redefining variables, with no component change.',
      'Colour scales are generated in oklch with the same lightness at each step, so every variant has the same contrast and one test can check every text token for WCAG AA.',
    ],
    tested: [
      'The behaviour the library adds on top of React Aria, because that is where its own bugs can be.',
      'An axe audit of every component in light and dark, because a theme can break accessibility without touching the markup.',
      'A contrast check of every text token, solid fill and focus ring in every theme, in light and dark, because a new colour is the easiest way to break it.',
    ],
    next: [
      'Cut a first release on npm.',
      'Add visual regression tests, so a token change shows up as a picture.',
    ],
    screenshots: [
      {
        src: PLACEHOLDER,
        alt: 'Storybook page for the Button component',
      },
      {
        src: PLACEHOLDER,
        alt: 'The nine theme variants side by side',
      },
    ],
  },
  workspace: {
    context:
      'A product UI with server data, optimistic updates and keyboard control is the best test of how I build front ends. I built one end to end: an issue tracker you can use without signing in.',
    built: [
      'An issue tracker with server actions, and an optimistic list and board.',
      'A command palette with nested pages and keyboard shortcuts.',
      'A Drizzle schema, migrations and a demo workspace seeded on PGlite, so it runs without a database server.',
      'English, Turkish and German with locale routing.',
    ],
    decisions: [
      'PGlite instead of a database server. Without a connection string the app runs Postgres compiled to WebAssembly and seeds itself, so development, tests and the end to end run need nothing installed. The schema and migrations are the same ones the hosted Postgres uses.',
      'Optimistic updates that roll back with a message. A tracker that waits for the server on every drag feels broken, so the change shows at once and is undone with an explanation if the server refuses.',
      'Fractional sort keys for board order, so moving a card changes one row instead of renumbering a column.',
      'One shared demo workspace that resets every night, instead of a copy per visitor. It is one cron call and nothing to clean up. The cost is that one visitor can change what the next one sees, and the lookup of who the viewer is sits in one function, so per-visitor copies are a small change.',
    ],
    tested: [
      'Query logic and the board column rules as pure functions, because they decide what every view shows.',
      'Server actions against a real PGlite database with the real migrations, so a schema change cannot pass a test that mocks it.',
      'Message parity across the three languages, so a missing translation fails the build.',
      'Keyboard flows, because the keyboard is the main way to use the app.',
    ],
    next: [
      'Live presence, so you can see who else is looking at an issue.',
      'An offline write queue.',
      'A separate demo workspace for each visitor.',
      'A measured performance pass, published with before and after numbers.',
    ],
    outcome:
      'The app runs on a seeded demo workspace, so you can try the list, the board and the palette without signing up. Writes are optimistic and roll back with a message if the server refuses. Every flow in the README has a test: 11 test files cover the query logic, the server actions against a real PGlite database, message parity in three languages and the keyboard flows, and Playwright drives the production build.',
    screenshots: [
      {
        src: PLACEHOLDER,
        alt: 'Issue list and board with the command palette open',
      },
    ],
  },
  'review-companion': {
    context:
      'An AI review is only useful if a person stays in charge of it. This is built for the reviewer, not as a bot: nothing is posted to GitHub, and every finding passes through a human first.',
    built: [
      'A server-sent events route that fetches the diff, parses it into files and hunks, and reviews one file per request with structured output.',
      'Each finding is validated with zod and against the diff. Findings that cite a line outside the diff are dropped and counted in a warning.',
      'Triage with accept, dismiss and edit, keyboard shortcuts, and an export of accepted findings as GitHub Markdown with suggestion blocks.',
      'Limits on changed lines, estimated input tokens and reviews per IP, with an explained error for each.',
      'A demo mode that replays a saved review through the real pipeline when no API key is set.',
    ],
    decisions: [
      'One file per model request, with large files split into batches of whole hunks. A whole pull request in one call mixes unrelated files and runs into size limits, and per-file requests let findings appear as they arrive.',
      "A finding must cite a line that exists in the diff, or it is dropped and counted. A plausible comment on the wrong line costs the reviewer's trust faster than a missing comment.",
      'Nothing is posted to GitHub. Accepted findings export as Markdown, so the person stays the author of the review.',
      'A demo mode that runs the real pipeline over a saved review. The app can be tried without a key and without spending anything.',
    ],
    tested: [
      'Parser, chunking, schema, export, route and store, because each one can quietly turn a good review into a wrong one.',
      'UI flows with axe, running the real pipeline over the demo fixture with only the network stubbed, so the test exercises the code a user does.',
      'A Playwright run of the production build in demo mode, with axe in light and dark and a 375 px check, because the build is what ships.',
    ],
    next: [
      'Record one real pull request review as the demo fixture.',
      'An evaluation set of pull requests with known problems, to measure how many the review finds and how many of its findings are wrong.',
      'A rate limit that holds across server instances, before the app runs with a live key.',
    ],
    screenshots: [
      {
        src: PLACEHOLDER,
        alt: 'Review Companion with findings listed per file',
      },
      {
        src: PLACEHOLDER,
        alt: 'Export drawer with the accepted findings as Markdown',
      },
    ],
  },
  'assistant-studio': {
    context:
      'Most AI demos are a chat box with a model behind it. The product work is in the states around the model: an answer that streams in, a source you need to check, a tool call that must wait for a person, a connection that drops. This project is built to get those right, and to measure what the assistant did instead of trusting how it looks.',
    built: [
      'Document upload for text, Markdown and PDF, by button or drag and drop, with a state per file and a specific message for every failure: wrong type, too large, empty, password protected, or a scanned PDF with no text.',
      'Answers with numbered citations. Each one opens the source at the cited passage, highlighted, and focus returns to the citation on close.',
      'A streaming conversation where one pure reducer turns server events into ordered message parts, with tool cards, approval before side effects, Stop, Resume, Regenerate and Edit, and the conversation kept as a tree.',
      'An Insights page with usage from your own conversations (tokens, cache reads, estimated cost, latency, tool calls) and eval results as a case by check grid, with filters in the URL and saved views.',
      'An eval suite that runs cases through the real engine, store and tools and checks tool choice, tool input, answer constraints and that every citation points at real text.',
    ],
    decisions: [
      'The public demo never calls a model. Questions about your documents are answered in the browser by ranking passages and quoting the best ones with exact citations, labelled as an extractive answer, so the documents never leave the device. When the app runs with an API key on the server, the same screen sends the documents to Claude with citations turned on.',
      'PDF reading loads only when you pick a PDF and runs off the main thread, so the first page does not pay for it.',
      'The Insights page shows only data the app produced. Older answers without timing say so instead of showing zero, demo numbers are labelled as demo, and there is no invented history.',
      'Stop and disconnect are different things. Stop keeps the partial answer. A dropped connection is shown as an interruption with a Resume button, never as an error, because the user did nothing wrong.',
      'The server is stateless, so actions with side effects use two requests: the first reports the pending call and stops, the browser runs it after approval, and a second request carries the result. The protocol is written down in the repository.',
    ],
    tested: [
      'Passage splitting, ranking and citation offsets as plain functions, and eval checks that fail on a citation pointing outside the document or quoting the wrong text.',
      'The reducer, the conversation tree, the two-phase protocol and the Insights selectors, including 1,000 generated answers, as plain functions.',
      'Filter state in the URL, saved views with corrupt or refused storage, and the check that the committed eval report still matches the cases.',
      'Browser runs in demo mode for upload errors, citations, the source viewer, approval, Stop, Resume and Insights, with axe in light and dark at 375 and 1280 pixels, and a test that inspects every request the demo makes after a document was used, switched off and removed, so no document text leaves the browser.',
    ],
    next: [
      'Record the model fixtures with a real key once, locally. They are authored today, so passing on them shows the pipeline and the checks work and says nothing yet about the model.',
      'Test dragging a file onto the composer in a real browser run.',
      'Move the rate limit out of memory so it holds across server instances.',
    ],
    screenshots: [
      {
        src: PLACEHOLDER,
        alt: 'Answer with numbered citations and the source viewer open at the cited passage',
      },
      {
        src: PLACEHOLDER,
        alt: 'Insights page with usage charts and the eval grid',
      },
    ],
  },
  watchlist: {
    context:
      'A catalogue app is easy to start and hard to finish well. This one keeps the API key on the server and proves it with a bundle scan in CI, validates every TMDB response at the boundary so one bad record cannot break a page, and shares a list through the URL fragment so nothing is ever uploaded. It runs in three languages and installs as a PWA. I rebuilt it from a 2021 demo to show how I would ship the same idea today.',
    built: [
      'Server-rendered home, movie, series, person and collection pages on TMDB, with the key kept on the server.',
      'Debounced search with the query in the URL and infinite loading.',
      'A watchlist kept in localStorage and validated with zod, with JSON export and import and cross-tab sync.',
      'A read-only share link that carries the list in the URL fragment, so nothing is uploaded.',
      'English, Turkish and German, and an installable app with an offline page.',
    ],
    decisions: [
      'The list stays in the browser and is checked with zod on every read, import and share link. A personal list does not need an account, and an untrusted file cannot break the app.',
      'Cache lifetimes by kind of data: an hour for trending, six hours for popular lists, ten minutes for search and twelve hours for details. Builds never call TMDB, and pages stay fresh enough.',
      'A mock TMDB server for the Playwright run, so the end to end tests are deterministic and need no key.',
    ],
    tested: [
      'The TMDB layer, the search route and the watchlist store, with MSW standing in for TMDB, so a changed response shape fails a test instead of a page.',
      'Feature views rendered with real children, including where focus lands after an action.',
      'Message parity across the three languages.',
      'Playwright against a mock TMDB server: search, add, change status, open a shared link, axe in light and dark, and a 375 px check.',
      'A bundle scan in CI that fails if anything that could reveal the API key is in the client build.',
    ],
    next: [
      'A pick for tonight, chosen from the titles I have not watched yet.',
      'A first row on the home page that comes from my own saved list.',
    ],
    screenshots: [
      {
        src: PLACEHOLDER,
        alt: 'Home page with trending and popular rows',
      },
      {
        src: PLACEHOLDER,
        alt: 'Watchlist with status filters and statistics',
      },
    ],
  },
  'tokens-to-tailwind': {
    context:
      'Moving design tokens from Figma into code is usually done by hand, and small mistakes in names and aliases are easy to miss. This tool reads a tokens file, shows it on real components and exports a Tailwind CSS 4 theme.',
    built: [
      'A typed parser for W3C design tokens, Figma Variables and Tokens Studio files.',
      'Alias resolution that reports unresolved aliases and cycles without dropping the valid tokens.',
      'A preview of a card, a form, buttons and badges themed with the pasted tokens.',
      'Export of a Tailwind CSS 4 theme.css with a dark mode override, plain CSS variables, or normalised JSON.',
    ],
    decisions: [
      'Three formats, one model. Every parser produces the same typed token model, so the preview and each export read one shape.',
      'Report problems and keep going. An unresolved alias or a cycle produces a warning and every valid token still exports.',
      'Skip what Tailwind has no namespace for, with a warning, instead of inventing variables that do nothing.',
    ],
    tested: [
      'Fixture tests for every parser, including invalid JSON, an unknown format, unresolved aliases and alias cycles, because pasted files are the input I cannot control.',
      'Generator output checked against snapshot files, because the output is a file people paste into a project.',
      'App tests for pasting, errors, export and copy, with axe.',
    ],
    next: [
      'A round trip with a public Figma file: export, build, compare against the design.',
      'Evaluate the math expressions that Tokens Studio allows, which are skipped today.',
    ],
    screenshots: [
      {
        src: PLACEHOLDER,
        alt: 'Token JSON pasted on the left and a live component preview on the right',
      },
      {
        src: PLACEHOLDER,
        alt: 'Generated theme.css ready to copy',
      },
    ],
  },
  'plain-language-word-addin': {
    context:
      'Writers need to know which sentences make a document hard to read, and a rewrite they can trust. The author stays in control: the rewrite goes in as a tracked change they can accept, reject or edit.',
    built: [
      'A readability engine with Flesch-Kincaid grade, Flesch Reading Ease and checks for long sentences, passive voice, nominalisations, jargon and filler words.',
      'A task pane that jumps to the sentence in the document and highlights every long sentence.',
      'A rewrite with a word-level diff and warnings if a number or a protected term goes missing.',
      "An insert that stops if the paragraph changed since the rewrite, and restores the author's tracking setting afterwards.",
      'A small rewrite server that validates input, caps the body size and rate limits, with a demo mode when no API key is set.',
    ],
    decisions: [
      "A tracked change instead of a silent replace, and a refusal to insert if the paragraph changed since the rewrite. The author's edits are never overwritten.",
      'The interface never calls Word directly. It talks to a gateway interface, so tests use a fake and a plain browser tab gets a preview with a sample document.',
      'The server checks that every number and protected term from the original is still in the rewrite and adds a warning if not, instead of trusting the model.',
      'The XML manifest rather than the unified one, because it works in Word on Mac, Windows and the web today. Moving later is a conversion.',
    ],
    tested: [
      'Sentence splitting edge cases, syllables, the readability formulas and each check, because every score depends on them.',
      'The Word wrapper against a fake of the Word object model, including restoring track changes when an insert fails.',
      'Task pane flows with axe, with Word faked at the gateway.',
      'Server validation, CORS, body cap, rate limit and error mapping.',
    ],
    next: [
      'A short demo video, because an add-in cannot be opened in a browser.',
      'Check the rewrite warnings against a set of real paragraphs.',
      'Move to the unified manifest once it covers the platforms I target.',
    ],
    screenshots: [
      {
        src: PLACEHOLDER,
        alt: 'Word task pane with a readability score and an issue list',
      },
    ],
  },
  'agent-control-room': {
    context:
      'Most agent demos show the output. The harder part is the process around it: which steps run, where a person has to say yes, and what happens when CI fails twice. This project makes that process a graph you can draw, publish and watch, on a simulated engineering agent.',
    built: [
      'A workflow editor on a canvas I wrote myself: drag steps from a palette, connect ports, pan and zoom, undo and redo, duplicate, tidy up with a layered auto-layout, and import or export JSON.',
      'Eleven step types, from trigger and plan to approval gate, CI check with a bounded retry loop, review, condition, guard and end, each with its own settings form and validation.',
      'A problems panel that lists what is wrong with the draft, from unreachable steps to unbounded loops, and keeps Publish disabled until the graph is valid.',
      'A seeded simulator that runs every job through the published workflow, with live counts on each step, a trace of the path any job took, and a dry run of the draft you can play, pause and step.',
      'The operator pages around it: queue, job detail, approvals, guards and model routing.',
    ],
    decisions: [
      'No graph library. Steps are HTML over one SVG layer for the connections, because I needed full control of focus, keyboard and announcements.',
      'Every pointer action has a keyboard path. Steps form a list with roving focus in graph order, a menu connects a port to any valid target, and an outline view shows and edits the same graph as one ordered list of steps and their connections.',
      "The workflow is data that the simulator interprets. Before that refactor I recorded the simulator's event stream for three seeds, and the default workflow reproduces them exactly, apart from the step and publish events added since, which proves the change kept behaviour.",
      'Publishing is a versioned command on the event stream. Jobs keep the version they started with, so editing the workflow never changes work in flight.',
      'Every edit goes through one capped command history, so undo and redo cover changes made with the pointer, the keyboard and the outline alike.',
    ],
    tested: [
      'Graph logic as plain functions: validation, cycle detection, reachability, topological order and auto-layout.',
      'The recorded event streams, so any change to how the simulator walks the graph shows up as a diff.',
      'Keyboard flows: add a step, connect through the menu, delete and undo, and where focus lands after each, with axe on the editor and on the outline view.',
      'Pointer flows: drag a step and undo, drag from a port onto a step to connect, open a job trace and run a dry run to the end.',
    ],
    next: ['Measure the canvas on a production build and on a phone.'],
    screenshots: [
      {
        src: PLACEHOLDER,
        alt: 'Workflow editor with the default pipeline and live job counts on each step',
      },
      {
        src: PLACEHOLDER,
        alt: 'Dry run stepping a single job through the draft workflow',
      },
    ],
  },
  sudoku: {
    context:
      'A small Vue 3 project around one real problem: generating puzzles that have exactly one solution.',
    built: [
      'A generator that fills a grid by backtracking and hides cells only while the puzzle keeps exactly one solution.',
      'Four difficulty levels, a score that rewards correct entries and penalises mistakes, hints and time, and a local leaderboard.',
      'Conflict highlighting, undo and redo, up to ten hints, and a timer that pauses when the tab is hidden.',
      'Keyboard play with one tab stop for the grid and labelled cells.',
    ],
    decisions: [
      'A cell is hidden only if the solver still finds exactly one solution, so checking an entry against the stored solution is always fair.',
      'The solver stops counting at two solutions, which is enough to tell unique from not unique, and tries the cell with the fewest candidates first to keep the search small.',
      'Difficulty is the number of visible cells, not the techniques a puzzle needs. It is simpler, and the README says so.',
    ],
    tested: [
      'The generator: valid full grids, solution counting, unique solutions and visible cell counts per difficulty, because a puzzle with two solutions is a bug a player can feel.',
      'The puzzle store: scoring, error marking, hint costs, undo and redo, and finishing a game.',
      'The timer and the leaderboard storage.',
    ],
    next: [
      'Grade difficulty by the solving techniques a puzzle needs instead of by the number of visible cells.',
    ],
    screenshots: [
      {
        src: PLACEHOLDER,
        alt: 'Sudoku board in the middle of a game',
      },
    ],
  },
};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return details[slug];
}

/** Screenshots are hidden until a real one replaces the placeholder. */
export function realScreenshots(detail: ProjectDetail): Screenshot[] {
  return detail.screenshots.filter((shot) => shot.src !== PLACEHOLDER);
}

/** Repository and live URLs come from the shared project list, so there is one source of truth. */
export function projectLinks(project: Project): ProjectLink[] {
  const family = familyProjects.find((item) => item.id === project.libraryId);
  if (!family) return [];
  const links: ProjectLink[] = [{ label: 'Source on GitHub', href: family.repoUrl }];
  if (family.url) links.push({ label: 'Live site', href: family.url });
  else if (family.plannedUrl) links.push({ label: 'Live site', href: null, planned: true });
  return links;
}
