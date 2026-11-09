export type ProjectStatus = "live" | "in progress";

export const projectTags = ["React", "Vue", "Design system", "AI agents", "Microsoft 365", "Tooling"] as const;
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
    repo?: string;
    live?: string;
    problem: string;
    built: string[];
    stack: string[];
    tested: string[];
    outcome: string;
    screenshots: Screenshot[];
}

const GITHUB = "https://github.com/eylulg";
const PAGES = "https://eylulg.github.io";
const PLACEHOLDER = "/placeholder-screenshot.svg";

export const projects: Project[] = [
    {
        slug: "ui",
        title: "Component library with Storybook",
        summary:
            "A React component library with design tokens in Tailwind CSS 4, React Aria behaviour, light and dark themes, and Storybook with accessibility checks.",
        status: "in progress",
        tags: ["React", "Design system"],
        featured: true,
        repo: `${GITHUB}/ui`,
        live: `${PAGES}/ui/`,
        problem:
            "Most of my design-system work lives in private company repos. I want a public library that shows how I design component APIs, tokens, accessibility and releases.",
        built: [
            "Design tokens in a Tailwind CSS 4 @theme block, with light and dark themes.",
            "Ten to twelve components with React Aria Components for behaviour: Button, IconButton, Input, Textarea, Select, Checkbox, Switch, Badge, Tag, Toast, Dialog and Tabs.",
            "Storybook with the accessibility addon, deployed to GitHub Pages.",
            "Versioned releases with semantic-release, driven by Conventional Commits.",
        ],
        stack: ["React 19", "TypeScript", "Tailwind CSS 4", "React Aria Components", "Storybook", "Vitest", "semantic-release", "GitHub Actions"],
        tested: ["Vitest and Testing Library tests for each component's behaviour.", "Axe accessibility checks in unit tests and in Storybook."],
        outcome: "In progress. The library and its Storybook will be published to GitHub Pages.",
        screenshots: [
            { src: PLACEHOLDER, alt: "Storybook page for the Button component in light and dark themes (placeholder)" },
            { src: PLACEHOLDER, alt: "Accessibility panel in Storybook with no violations (placeholder)" },
        ],
    },
    {
        slug: "tokens-to-tailwind",
        title: "Tokens to Tailwind",
        summary: "Paste a Figma Variables export or a W3C design-tokens JSON, preview it with real components, and export a Tailwind CSS 4 theme.css.",
        status: "in progress",
        tags: ["React", "Design system", "Tooling"],
        featured: true,
        repo: `${GITHUB}/tokens-to-tailwind`,
        live: `${PAGES}/tokens-to-tailwind/`,
        problem: "Moving design tokens from Figma into code is usually manual. This tool ties the Figma and design-system side of my work to the code side.",
        built: [
            "A TypeScript parser for Figma Variables exports and W3C design-tokens JSON.",
            "A live preview rendered with Untitled UI React components.",
            "Export of a Tailwind CSS 4 theme.css file.",
            "Runs fully in the browser, with no server.",
        ],
        stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS 4", "Untitled UI React", "Vitest", "GitHub Pages"],
        tested: ["Unit tests for each supported token format in the parser."],
        outcome: "In progress. It will be deployed to GitHub Pages.",
        screenshots: [
            { src: PLACEHOLDER, alt: "Token JSON pasted on the left and a live component preview on the right (placeholder)" },
            { src: PLACEHOLDER, alt: "Generated theme.css ready to copy (placeholder)" },
        ],
    },
    {
        slug: "ticket-to-pr-agent",
        title: "Ticket-to-PR engineering agent",
        summary: "A TypeScript agent that takes an issue to a ready-for-review pull request, with approval gates before anything visible.",
        status: "in progress",
        tags: ["AI agents", "Tooling"],
        featured: true,
        problem:
            "Coding agents can do real engineering work, but they need a process around them: a plan someone approves, a CI loop, replies to review findings, and a human in charge of anything visible.",
        built: [
            "Issues in, a plan posted for approval, implementation by a coding CLI.",
            "A CI fix loop and replies to review findings.",
            "A restart-safe job queue, so work resumes after a restart.",
            "A model routing table by job kind.",
            "Guards: it never merges and never posts as the owner without approval.",
            "A dry-run mode, so visitors can see the flow without tokens.",
        ],
        stack: ["TypeScript", "Node.js", "GitHub Issues", "GitHub Actions"],
        tested: ["The dry-run mode exercises the full flow without tokens."],
        outcome: "In progress. A from-scratch rewrite of an agent I built and ran; the repository link will follow.",
        screenshots: [{ src: PLACEHOLDER, alt: "Dry-run output showing a plan waiting for approval (placeholder)" }],
    },
    {
        slug: "streaming-catalogue",
        title: "Streaming catalogue",
        summary: "A movie and series catalogue on the TMDB API, rebuilt with search, skeletons and proper error and empty states.",
        status: "in progress",
        tags: ["React"],
        repo: `${GITHUB}/movies-series-website-demo`,
        live: `${PAGES}/movies-series-website-demo/`,
        problem: "My original catalogue was a Create React App demo on React 17. I'm rebuilding it with the tools and standards I use today.",
        built: [
            "Browsing and search on the TMDB API, with debounced search.",
            "Skeleton loading, error and empty states.",
            "The TMDB key is a build-time secret and not in the repository.",
        ],
        stack: ["React 19", "TypeScript", "Vite", "React Router 7", "TanStack Query", "Untitled UI React", "TMDB API"],
        tested: ["Vitest and Testing Library tests for search, loading, error and empty states."],
        outcome: "In progress. It will be deployed to GitHub Pages.",
        screenshots: [
            { src: PLACEHOLDER, alt: "Catalogue grid of movie posters with a search field (placeholder)" },
            { src: PLACEHOLDER, alt: "Skeleton cards while results load (placeholder)" },
        ],
    },
    {
        slug: "indoor-mall-map",
        title: "Indoor mall map",
        summary: "An indoor map of a shopping mall with a floor switcher, brand search and a campaign list.",
        status: "in progress",
        tags: ["React"],
        repo: `${GITHUB}/mall-website-demo`,
        live: `${PAGES}/mall-website-demo/`,
        problem: "This started as a frontend challenge. The first version placed map pins at random; the rebuild positions them from data.",
        built: ["A floor switcher and pins positioned from data.", "Brand search with a combobox.", "A campaign list.", "Responsive and keyboard accessible."],
        stack: ["React 19", "TypeScript", "Vite", "Untitled UI React"],
        tested: ["Vitest and Testing Library tests for floor switching and brand search."],
        outcome: "In progress. It will be deployed to GitHub Pages.",
        screenshots: [{ src: PLACEHOLDER, alt: "Mall floor plan with brand pins and a floor switcher (placeholder)" }],
    },
    {
        slug: "task-board",
        title: "Task board",
        summary: "A to-do app rebuilt as a drag-and-drop task board with filters, undo and local persistence.",
        status: "in progress",
        tags: ["React"],
        repo: `${GITHUB}/to-do-list-demo`,
        live: `${PAGES}/to-do-list-demo/`,
        problem: "My original to-do list was a challenge project on Material UI 4. I'm rebuilding it as a task board.",
        built: ["Drag and drop with dnd-kit.", "Persistence in localStorage.", "Filters and undo."],
        stack: ["React 19", "TypeScript", "Vite", "Untitled UI React", "dnd-kit"],
        tested: ["Vitest and Testing Library tests for adding, moving, filtering and undoing tasks."],
        outcome: "In progress. It will be deployed to GitHub Pages.",
        screenshots: [{ src: PLACEHOLDER, alt: "Task board with three columns of cards (placeholder)" }],
    },
    {
        slug: "sudoku",
        title: "Sudoku in Vue 3",
        summary: "A Sudoku game in Vue 3 and TypeScript, kept in Vue to show range beyond React.",
        status: "in progress",
        tags: ["Vue"],
        repo: `${GITHUB}/sudoku`,
        live: `${PAGES}/sudoku/`,
        problem: "I keep this project in Vue to show range beyond React, and it needs the same polish as the rest: tests, a README and a deployment.",
        built: ["The game in Vue 3 and TypeScript.", "A proper README and a GitHub Pages deployment."],
        stack: ["Vue 3", "TypeScript", "Vitest", "GitHub Pages"],
        tested: ["Unit tests for the puzzle utilities and the stores."],
        outcome: "In progress. It will be published and deployed to GitHub Pages.",
        screenshots: [{ src: PLACEHOLDER, alt: "Sudoku board in the middle of a game (placeholder)" }],
    },
    {
        slug: "portfolio",
        title: "This portfolio",
        summary: "The site you're on: typed content, Untitled UI React components, dark mode, accessibility checks and a Playwright smoke test.",
        status: "live",
        tags: ["React", "Tooling"],
        repo: `${GITHUB}/eylulg.github.io`,
        live: `${PAGES}/`,
        problem: "I wanted one place that shows my work and how I work, built to the same standard I hold product code to.",
        built: [
            "Lazy-loaded routes with React Router 7.",
            "Untitled UI React components for buttons, badges, tabs, inputs, toggles and navigation.",
            "Dark mode that follows the system setting, with a stored override.",
            "Content as typed data files, with no CMS.",
            "Per-route titles and descriptions, a sitemap and a GitHub Pages deploy.",
        ],
        stack: ["React 19", "TypeScript", "Vite 7", "React Router 7", "Tailwind CSS 4", "Untitled UI React", "Vitest", "Playwright", "GitHub Actions"],
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

export function projectLinks(project: Project): ProjectLink[] {
    const links: ProjectLink[] = [];
    if (project.repo) links.push({ label: "Source on GitHub", href: project.repo });
    if (project.live) links.push({ label: "Live site", href: project.live, planned: project.status !== "live" });
    return links;
}
