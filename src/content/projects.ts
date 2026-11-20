export type ProjectStatus = 'live' | 'in progress';

export const projectTags = [
  'React',
  'Next.js',
  'Vue',
  'Design system',
  'AI',
  'Microsoft 365',
  'Tooling',
] as const;
export type ProjectTag = (typeof projectTags)[number];

/** What a list or a card needs. The case study text lives in project-details.ts so only the case study page loads it. */
export interface Project {
  slug: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  tags: ProjectTag[];
  featured?: boolean;
  /** One short line for the featured card on the home page. */
  teaser?: string;
  /** Smaller projects are listed after the main ones. */
  smaller?: boolean;
  /** Id in the shared project list of @eylulg/ui; the repository and live URLs come from there. */
  libraryId: string;
  stack: string[];
}

export const projects: Project[] = [
  {
    slug: 'ui',
    libraryId: 'ui',
    stack: [
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'React Aria Components',
      'Storybook',
      'Vitest',
      'semantic-release',
      'GitHub Actions',
    ],
    title: 'Component Library',
    summary:
      '@eylulg/ui: accessible React components, charts and nine themes, plus the top bar and footer every project here uses.',
    status: 'in progress',
    tags: ['React', 'Design system'],
    featured: true,
    teaser: 'React components, charts and the themes on this page.',
  },
  {
    slug: 'workspace',
    libraryId: 'workspace',
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Drizzle ORM',
      'PGlite',
      'next-intl',
      'zod',
      'dnd-kit',
      'Vitest',
      'Playwright',
    ],
    title: 'Workspace',
    summary:
      'An issue tracker you can use without signing in, with a list, a board, a command palette and three languages.',
    status: 'in progress',
    tags: ['Next.js', 'React'],
    featured: true,
    teaser: 'An issue tracker with a command palette and instant edits.',
  },
  {
    slug: 'agent-control-room',
    libraryId: 'agent-control-room',
    stack: [
      'React 19',
      'TypeScript',
      'Vite 7',
      'Tailwind CSS 4',
      'React Router 7',
      'Zustand',
      'zod',
      'Vitest',
      'GitHub Actions',
    ],
    title: 'Agent Workflows',
    summary:
      'Draw the pipeline of a simulated engineering agent as a graph, run it and trace every job. Works by keyboard.',
    status: 'live',
    tags: ['React', 'AI'],
    featured: true,
    teaser: "Draw an agent's pipeline as a graph, run it and trace every job.",
  },
  {
    slug: 'assistant-studio',
    libraryId: 'assistant-studio',
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'React Aria',
      'Zustand',
      'zod',
      'pdf.js',
      'IndexedDB',
      'Anthropic SDK',
      'Vitest',
      'Playwright',
    ],
    title: 'Assistant Studio',
    summary:
      'A research assistant: answers from your documents with citations you can open, tool calls that wait for your approval, and an Insights page for usage and evals.',
    status: 'in progress',
    tags: ['React', 'Next.js', 'AI'],
    featured: true,
    teaser: 'Answers from your documents with citations you can open.',
  },
  {
    slug: 'watchlist',
    libraryId: 'watchlist',
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'React Aria',
      'next-intl',
      'zod',
      'MSW',
      'Vitest',
      'Playwright',
    ],
    title: 'Watchlist',
    summary:
      'A movie and series watchlist on the TMDB API, with search, ratings, notes, sharing without a server and three languages.',
    status: 'in progress',
    tags: ['Next.js', 'React'],
  },
  {
    slug: 'tokens-to-tailwind',
    libraryId: 'tokens-to-tailwind',
    stack: [
      'React 19',
      'TypeScript',
      'Vite 7',
      'Tailwind CSS 4',
      'React Aria',
      'Zustand',
      'culori',
      'Vitest',
    ],
    title: 'Tokens to Tailwind',
    summary:
      'Paste a design tokens file, preview it with real components and export a Tailwind CSS 4 theme.css. It runs in the browser.',
    status: 'in progress',
    tags: ['React', 'Design system', 'Tooling'],
  },
  {
    slug: 'review-companion',
    libraryId: 'review-companion',
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'React Aria',
      'Zustand',
      'zod',
      'Anthropic SDK',
      'Vitest',
      'Playwright',
    ],
    title: 'Review Companion',
    summary:
      'Paste a public GitHub pull request and get a file-by-file review from Claude. You triage every finding.',
    status: 'in progress',
    tags: ['Next.js', 'React', 'AI'],
    smaller: true,
  },
  {
    slug: 'plain-language-word-addin',
    libraryId: 'plain-language',
    stack: [
      'Office.js',
      'React 19',
      'TypeScript',
      'Vite 7',
      'Tailwind CSS 4',
      'Hono',
      'zod',
      'Anthropic SDK',
      'Vitest',
    ],
    title: 'Plain Language Add-in',
    summary:
      'A Word add-in that scores readability, flags hard sentences and rewrites a paragraph in plain language as a tracked change.',
    status: 'in progress',
    tags: ['React', 'AI', 'Microsoft 365'],
    smaller: true,
  },
  {
    slug: 'sudoku',
    libraryId: 'sudoku',
    stack: ['Vue 3', 'TypeScript', 'Vite 7', 'Vitest', 'Vue Test Utils'],
    title: 'Sudoku',
    summary:
      'Sudoku in Vue 3 and TypeScript, with four difficulty levels, hints, undo and redo, and keyboard play.',
    status: 'in progress',
    tags: ['Vue'],
    smaller: true,
  },
];

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const featuredProjects = projects.filter((project) => project.featured);

export function tagToSlug(tag: ProjectTag): string {
  return tag.toLowerCase().replace(/\s+/g, '-');
}

export function tagFromSlug(slug: string | null): ProjectTag | undefined {
  return projectTags.find((tag) => tagToSlug(tag) === slug);
}
