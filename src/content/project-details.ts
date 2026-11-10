import { projects as familyProjects } from "@eylulg/ui/projects";
import type { Project } from "@/content/projects";

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

const PLACEHOLDER = "/placeholder-screenshot.svg";

const details: Record<string, ProjectDetail> = {
    ui: {
        context:
            "Most of my design-system work lives in private company repositories. This is a public library that shows how I design component APIs, tokens, accessibility and releases, and that makes the projects here read as one family.",
        built: [
            "Tokens in a Tailwind CSS 4 theme, with nine variants that change only brand hue, gray family, radius and density.",
            "More than thirty components on React Aria Components, each with its own entry point.",
            "The shared chrome: app shell, top nav, project switcher, theme toggle and footer.",
            "Storybook with accessibility checks, and a bundle size budget in CI.",
        ],
        decisions: [
            "React Aria for behaviour, my own code for API and looks. Keyboard handling, focus management and screen reader announcements are the parts that regress most and are hardest to test, so I use a tested base instead of rewriting them.",
            "Components read semantic tokens such as text-primary, never a colour scale. Rebranding or dark mode is then a matter of redefining variables, with no component change.",
            "Colour scales are generated in oklch with the same lightness at each step, so every variant has the same contrast and one test can check every text token for WCAG AA.",
        ],
        tested: [
            "The behaviour the library adds on top of React Aria, because that is where its own bugs can be.",
            "An axe audit of every component in light and dark, because a theme can break accessibility without touching the markup.",
            "A contrast check of every text token in every variant against WCAG AA, because a new hue is the easiest way to break it.",
        ],
        next: [
            "Deploy the Storybook and cut a first release.",
            "Add visual regression tests, so a token change shows up as a picture.",
            "Add a test of the computed focus ring, which would have caught the bug described on the page about how this site was built.",
        ],
        screenshots: [
            {
                src: PLACEHOLDER,
                alt: "Storybook page for the Button component",
            },
            {
                src: PLACEHOLDER,
                alt: "The nine theme variants side by side",
            },
        ],
    },
    workspace: {
        context:
            "A product UI with server data, optimistic updates and keyboard control is the best test of how I build front ends. I built one end to end: an issue tracker you can use without signing in.",
        built: [
            "An issue tracker with server actions, and an optimistic list and board.",
            "A command palette with nested pages and keyboard shortcuts.",
            "A Drizzle schema, migrations and a demo workspace seeded on PGlite, so it runs without a database server.",
            "English, Turkish and German with locale routing.",
        ],
        decisions: [
            "PGlite instead of a database server. Without a connection string the app runs Postgres compiled to WebAssembly and seeds itself, so development, tests and the end to end run need nothing installed. The schema and migrations are the same ones the hosted Postgres uses.",
            "Optimistic updates that roll back with a message. A tracker that waits for the server on every drag feels broken, so the change shows at once and is undone with an explanation if the server refuses.",
            "Fractional sort keys for board order, so moving a card changes one row instead of renumbering a column.",
            "One shared demo workspace that resets every night, instead of a copy per visitor. It is one cron call and nothing to clean up. The cost is that one visitor can change what the next one sees, and the lookup of who the viewer is sits in one function, so per-visitor copies are a small change.",
        ],
        tested: [
            "Query logic and the board column rules as pure functions, because they decide what every view shows.",
            "Server actions against a real PGlite database with the real migrations, so a schema change cannot pass a test that mocks it.",
            "Message parity across the three languages, so a missing translation fails the build.",
            "Keyboard flows, because the keyboard is the main way to use the app.",
        ],
        next: [
            "Live presence, so you can see who else is looking at an issue.",
            "An offline write queue.",
            "A separate demo workspace for each visitor.",
            "A measured performance pass, published with before and after numbers.",
        ],
        outcome:
            "The app runs on a seeded demo workspace, so you can try the list, the board and the palette without signing up. Writes are optimistic and roll back with a message if the server refuses. Every flow in the README has a test: 11 test files cover the query logic, the server actions against a real PGlite database, message parity in three languages and the keyboard flows, and Playwright drives the production build.",
        screenshots: [
            {
                src: PLACEHOLDER,
                alt: "Issue list and board with the command palette open",
            },
        ],
    },
    "review-companion": {
        context:
            "An AI review is only useful if a person stays in charge of it. This is built for the reviewer, not as a bot: nothing is posted to GitHub, and every finding passes through a human first.",
        built: [
            "A server-sent events route that fetches the diff, parses it into files and hunks, and reviews one file per request with structured output.",
            "Each finding is validated with zod and against the diff. Findings that cite a line outside the diff are dropped and counted in a warning.",
            "Triage with accept, dismiss and edit, keyboard shortcuts, and an export of accepted findings as GitHub Markdown with suggestion blocks.",
            "Limits on changed lines, estimated input tokens and reviews per IP, with an explained error for each.",
            "A demo mode that replays a saved review through the real pipeline when no API key is set.",
        ],
        decisions: [
            "One file per model request, with large files split into batches of whole hunks. A whole pull request in one call mixes unrelated files and runs into size limits, and per-file requests let findings appear as they arrive.",
            "A finding must cite a line that exists in the diff, or it is dropped and counted. A plausible comment on the wrong line costs the reviewer's trust faster than a missing comment.",
            "Nothing is posted to GitHub. Accepted findings export as Markdown, so the person stays the author of the review.",
            "A demo mode that runs the real pipeline over a saved review. The app can be tried without a key and without spending anything.",
        ],
        tested: [
            "Parser, chunking, schema, export, route and store, because each one can quietly turn a good review into a wrong one.",
            "UI flows with axe, running the real pipeline over the demo fixture with only the network stubbed, so the test exercises the code a user does.",
            "A Playwright run of the production build in demo mode, with axe in light and dark and a 375 px check, because the build is what ships.",
        ],
        next: [
            "Record one real pull request review as the demo fixture.",
            "An evaluation set of pull requests with known problems, to measure how many the review finds and how many of its findings are wrong.",
            "A rate limit that holds across server instances, before the app runs with a live key.",
        ],
        screenshots: [
            {
                src: PLACEHOLDER,
                alt: "Review Companion with findings listed per file",
            },
            {
                src: PLACEHOLDER,
                alt: "Export drawer with the accepted findings as Markdown",
            },
        ],
    },
    "assistant-studio": {
        context:
            "Most AI demos are a chat box with a model behind it. The product work is in the states around the model: an answer that streams in, a tool call that runs, an action that must wait for a person, a connection that drops. This project is built to get those right, and to check what the assistant did instead of trusting how it looks.",
        built: [
            "A streaming conversation where one pure reducer turns server events into a message made of ordered parts, with its own rendering for streaming, waiting for approval, complete, stopped, interrupted and failed.",
            "Tool calls rendered as cards. Seven local tools, of which create_task does not run until the user approves, edits its input or denies it.",
            "Stop, Resume, Regenerate and Edit, with the conversation kept as a tree so a fork or a second answer never loses a branch.",
            "A readout of tokens, cache reads and an estimated cost for every answer, labelled as estimates, and a demo mode that says it is a demo.",
            "An eval suite that replays model streams through the real engine, store and tools and asserts tool choice, tool input and answer constraints.",
        ],
        decisions: [
            "Stop and disconnect are different things. Stop keeps the partial answer and cancels the running tool. A dropped connection is shown as an interruption with a Resume button, never as an error, because the user did nothing wrong.",
            "The server is stateless, so actions with side effects use two requests: the first reports the pending call and stops, the browser runs it after approval, and a second request carries the result. The protocol is written down in the repository.",
            "Demo mode replays recorded model streams at the model boundary, so everything after it is real: the tools run again, the approval step is real and the task list is real. Anything the demo cannot answer says so instead of pretending.",
            "Costs and limits are visible in the interface and enforced on the server: an origin check, a body cap, a per-IP rate limit, a model allowlist and an output token ceiling.",
        ],
        tested: [
            "The reducer, the wire builder, the conversation tree, persistence and the two-phase protocol as plain functions, because a wrong state there looks like a model problem.",
            "The route handler and the engine: origin, size, rate limit, allowlist and the request sent to the SDK.",
            "The Studio screen with a real route behind a stubbed fetch, so approval, interruption and resume run the code a user runs.",
            "The checks of the eval suite themselves, so a broken assertion cannot quietly pass every case.",
            "One Playwright run in demo mode covering ask, approval with an edited input, Stop, Regenerate, fork, Resume and reload, with axe in light and dark at 375 and 1280 pixels.",
        ],
        next: [
            "Record the 13 fixtures with a real API key. They are authored today: written in the recorded format with tool results computed by the real tools, and their token counts are estimates. Passing on them shows the pipeline and the assertions work, and says nothing yet about the model.",
            "Run the same cases live and publish the result next to the fixture run.",
            "Move the rate limit out of memory so it holds across server instances.",
            "Render long answers incrementally instead of parsing the Markdown again on each batch.",
        ],
        screenshots: [
            {
                src: PLACEHOLDER,
                alt: "Conversation with a tool card waiting for approval",
            },
        ],
    },
    watchlist: {
        context:
            "A catalogue app is easy to start and hard to finish well. This one keeps the API key on the server and proves it with a bundle scan in CI, validates every TMDB response at the boundary so one bad record cannot break a page, and shares a list through the URL fragment so nothing is ever uploaded. It runs in three languages and installs as a PWA. I rebuilt it from a 2021 demo to show how I would ship the same idea today.",
        built: [
            "Server-rendered home, movie, series, person and collection pages on TMDB, with the key kept on the server.",
            "Debounced search with the query in the URL and infinite loading.",
            "A watchlist kept in localStorage and validated with zod, with JSON export and import and cross-tab sync.",
            "A read-only share link that carries the list in the URL fragment, so nothing is uploaded.",
            "English, Turkish and German, and an installable app with an offline page.",
        ],
        decisions: [
            "The list stays in the browser and is checked with zod on every read, import and share link. A personal list does not need an account, and an untrusted file cannot break the app.",
            "Cache lifetimes by kind of data: an hour for trending, six hours for popular lists, ten minutes for search and twelve hours for details. Builds never call TMDB, and pages stay fresh enough.",
            "A mock TMDB server for the Playwright run, so the end to end tests are deterministic and need no key.",
        ],
        tested: [
            "The TMDB layer, the search route and the watchlist store, with MSW standing in for TMDB, so a changed response shape fails a test instead of a page.",
            "Feature views rendered with real children, including where focus lands after an action.",
            "Message parity across the three languages.",
            "Playwright against a mock TMDB server: search, add, change status, open a shared link, axe in light and dark, and a 375 px check.",
            "A bundle scan in CI that fails if anything that could reveal the API key is in the client build.",
        ],
        next: ["A pick for tonight, chosen from the titles I have not watched yet.", "A first row on the home page that comes from my own saved list."],
        screenshots: [
            {
                src: PLACEHOLDER,
                alt: "Home page with trending and popular rows",
            },
            {
                src: PLACEHOLDER,
                alt: "Watchlist with status filters and statistics",
            },
        ],
    },
    "tokens-to-tailwind": {
        context:
            "Moving design tokens from Figma into code is usually done by hand, and small mistakes in names and aliases are easy to miss. This tool reads a tokens file, shows it on real components and exports a Tailwind CSS 4 theme.",
        built: [
            "A typed parser for W3C design tokens, Figma Variables and Tokens Studio files.",
            "Alias resolution that reports unresolved aliases and cycles without dropping the valid tokens.",
            "A preview of a card, a form, buttons and badges themed with the pasted tokens.",
            "Export of a Tailwind CSS 4 theme.css with a dark mode override, plain CSS variables, or normalised JSON.",
        ],
        decisions: [
            "Three formats, one model. Every parser produces the same typed token model, so the preview and each export read one shape.",
            "Report problems and keep going. An unresolved alias or a cycle produces a warning and every valid token still exports.",
            "Skip what Tailwind has no namespace for, with a warning, instead of inventing variables that do nothing.",
        ],
        tested: [
            "Fixture tests for every parser, including invalid JSON, an unknown format, unresolved aliases and alias cycles, because pasted files are the input I cannot control.",
            "Generator output checked against snapshot files, because the output is a file people paste into a project.",
            "App tests for pasting, errors, export and copy, with axe.",
        ],
        next: [
            "A round trip with a public Figma file: export, build, compare against the design.",
            "Evaluate the math expressions that Tokens Studio allows, which are skipped today.",
        ],
        screenshots: [
            {
                src: PLACEHOLDER,
                alt: "Token JSON pasted on the left and a live component preview on the right",
            },
            {
                src: PLACEHOLDER,
                alt: "Generated theme.css ready to copy",
            },
        ],
    },
    "plain-language-word-addin": {
        context:
            "Writers need to know which sentences make a document hard to read, and a rewrite they can trust. The author stays in control: the rewrite goes in as a tracked change they can accept, reject or edit.",
        built: [
            "A readability engine with Flesch-Kincaid grade, Flesch Reading Ease and checks for long sentences, passive voice, nominalisations, jargon and filler words.",
            "A task pane that jumps to the sentence in the document and highlights every long sentence.",
            "A rewrite with a word-level diff and warnings if a number or a protected term goes missing.",
            "An insert that stops if the paragraph changed since the rewrite, and restores the author's tracking setting afterwards.",
            "A small rewrite server that validates input, caps the body size and rate limits, with a demo mode when no API key is set.",
        ],
        decisions: [
            "A tracked change instead of a silent replace, and a refusal to insert if the paragraph changed since the rewrite. The author's edits are never overwritten.",
            "The interface never calls Word directly. It talks to a gateway interface, so tests use a fake and a plain browser tab gets a preview with a sample document.",
            "The server checks that every number and protected term from the original is still in the rewrite and adds a warning if not, instead of trusting the model.",
            "The XML manifest rather than the unified one, because it works in Word on Mac, Windows and the web today. Moving later is a conversion.",
        ],
        tested: [
            "Sentence splitting edge cases, syllables, the readability formulas and each check, because every score depends on them.",
            "The Word wrapper against a fake of the Word object model, including restoring track changes when an insert fails.",
            "Task pane flows with axe, with Word faked at the gateway.",
            "Server validation, CORS, body cap, rate limit and error mapping.",
        ],
        next: [
            "A short demo video, because an add-in cannot be opened in a browser.",
            "Check the rewrite warnings against a set of real paragraphs.",
            "Move to the unified manifest once it covers the platforms I target.",
        ],
        screenshots: [
            {
                src: PLACEHOLDER,
                alt: "Word task pane with a readability score and an issue list",
            },
        ],
    },
    "agent-control-room": {
        context:
            "An agent that writes code on its own is only useful if the people around it can see and steer it. Running one taught me that the hard part is the operating surface, not the model.",
        built: [
            "Overview, queue, job detail, approvals, routing, guards and settings pages.",
            "Approval cards with two options and a recommendation, answered with one key press.",
            "Guards for actions that are never the agent's call, with a log of every blocked attempt.",
            "A routing table that sets the model per kind of job.",
            "A seeded simulator that replays the same day for the same seed, behind a protocol a real agent can replace over server-sent events.",
        ],
        decisions: [
            "Guards live in code, not in a prompt, and every blocked attempt is logged, so you can see that the rule is doing its job.",
            "The screens only read a stream of events. A real agent can replace the simulator without changing them.",
            "Approvals show two options and a recommendation, because a job waiting on a person should be impossible to miss and cheap to unblock.",
        ],
        tested: [
            "The simulator: determinism per seed, approvals blocking and unblocking jobs, guards, routing changes and holds, because the demo is only honest if it behaves the same way twice.",
            "The protocol: folding the event stream rebuilds the state, and malformed events are rejected at the boundary.",
            "User flows, focus placement after each action, and axe on every page.",
            "Contrast in light and dark mode, checked in a real browser.",
        ],
        next: [
            "Drive it from the real agent once the rewrite is ready, and merge the two into one project.",
            "Explain on the screen why guards and routing matter, so the pages teach as well as show.",
        ],
        screenshots: [
            {
                src: PLACEHOLDER,
                alt: "Overview page with active jobs and approvals waiting",
            },
            {
                src: PLACEHOLDER,
                alt: "Approval card with two options and a recommendation",
            },
        ],
    },
    sudoku: {
        context: "A small Vue 3 project around one real problem: generating puzzles that have exactly one solution.",
        built: [
            "A generator that fills a grid by backtracking and hides cells only while the puzzle keeps exactly one solution.",
            "Four difficulty levels, a score that rewards correct entries and penalises mistakes, hints and time, and a local leaderboard.",
            "Conflict highlighting, undo and redo, up to ten hints, and a timer that pauses when the tab is hidden.",
            "Keyboard play with one tab stop for the grid and labelled cells.",
        ],
        decisions: [
            "A cell is hidden only if the solver still finds exactly one solution, so checking an entry against the stored solution is always fair.",
            "The solver stops counting at two solutions, which is enough to tell unique from not unique, and tries the cell with the fewest candidates first to keep the search small.",
            "Difficulty is the number of visible cells, not the techniques a puzzle needs. It is simpler, and the README says so.",
        ],
        tested: [
            "The generator: valid full grids, solution counting, unique solutions and visible cell counts per difficulty, because a puzzle with two solutions is a bug a player can feel.",
            "The puzzle store: scoring, error marking, hint costs, undo and redo, and finishing a game.",
            "The timer and the leaderboard storage.",
        ],
        next: ["Grade difficulty by the solving techniques a puzzle needs instead of by the number of visible cells."],
        screenshots: [
            {
                src: PLACEHOLDER,
                alt: "Sudoku board in the middle of a game",
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
    const links: ProjectLink[] = [{ label: "Source on GitHub", href: family.repoUrl }];
    if (family.url) links.push({ label: "Live site", href: family.url });
    else if (family.plannedUrl) links.push({ label: "Live site", href: null, planned: true });
    return links;
}
