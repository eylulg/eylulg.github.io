export interface Role {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  /** ISO dates for the <time> elements. */
  start: string;
  end: string;
  summary: string;
  highlights: string[];
  skills: string[];
}

export const roles: Role[] = [
  {
    id: 'saga',
    title: 'Senior Frontend Developer',
    company: 'Saga',
    location: 'Amsterdam, NL / Oslo, NO · Remote · Contract',
    period: 'Jun 2026 to Nov 2026',
    start: '2026-06',
    end: '2026-11',
    summary:
      'Legal AI platform used by law firms in several European markets. A Next.js web app, a React design system, and Word and Outlook add-ins.',
    highlights: [
      'Built the project workspace in the web app from Figma to production: AI-assisted project creation, filters, lifecycle statuses, an activity feed and client management.',
      'Redesigned the app navigation with a new sidebar and a chat overview, with responsive layouts and analytics.',
      'Added components and accessibility fixes to the React design system, and rolled each release out to the web app and both add-ins.',
      'Built Word and Outlook add-in features with Office.js and Microsoft Graph, across the frontend, API routes and storage.',
      'Added CI checks to every repo and tests that check what users see, and lazy-loaded dialogs.',
      'Scoped projects for other engineers to deliver, reviewed code across all products and sat on a hiring panel.',
      'Built an AI engineering agent that connects to Slack, Linear and GitHub and takes tickets to pull requests with human approval steps, plus a library of reusable agent skills.',
    ],
    skills: [
      'Next.js',
      'React',
      'TypeScript',
      'Design systems',
      'Storybook',
      'Tailwind CSS',
      'Office.js',
      'Microsoft Graph',
      'Vitest',
      'Accessibility',
      'AI agents',
    ],
  },
  {
    id: 'insider-one',
    title: 'Frontend Developer',
    company: 'Insider One',
    location: 'Istanbul, Türkiye · Remote',
    period: 'Mar 2025 to Jun 2026',
    start: '2025-03',
    end: '2026-06',
    summary:
      'Customer engagement platform. I worked on Design Agent, an AI tool that generates popups and games from a prompt or a Figma file, and on campaign templates.',
    highlights: [
      'Built features in the Vue 3 editor, including Figma import, theming and validated form elements.',
      'Wrote and tuned the prompt rules that keep generated templates usable and editable.',
      'Extended the shared Vue component library and its Storybook.',
      'Made campaign templates accessible with ARIA and screen reader support, and fixed cross-browser bugs.',
      'Fixed Content Security Policy and dependency security issues across six repos.',
      'Added unit tests and a Claude Code setup to an internal Chrome extension.',
    ],
    skills: [
      'Vue 3',
      'TypeScript',
      'Pinia',
      'Storybook',
      'Figma',
      'Accessibility',
      'Prompt engineering',
      'Chrome extensions',
      'Claude Code',
      'Vitest',
    ],
  },
  {
    id: 'medsien',
    title: 'Frontend Developer',
    company: 'Medsien',
    location: 'San Francisco, USA · Remote',
    period: 'Jun 2023 to Nov 2024',
    start: '2023-06',
    end: '2024-11',
    summary: 'Chronic care management platform.',
    highlights: [
      'Worked on the move from Vue to React with micro-frontends, porting the platform page by page.',
      'Built the patient and care-partner dashboards, call logs and patient lookup flows.',
      'Set up the Material UI theme and built components for the atomic component library in Storybook.',
      'Built real-time calling with Twilio and WebSockets, monitored with Sentry.',
      'Worked with backend developers on REST APIs and a backend-for-frontend layer.',
    ],
    skills: [
      'React',
      'Vue',
      'TypeScript',
      'Redux',
      'Micro-frontends',
      'Material UI',
      'Storybook',
      'Twilio',
      'WebSockets',
      'Sentry',
      'REST APIs',
    ],
  },
  {
    id: 'hack-and-craft',
    title: 'Frontend Developer',
    company: 'Hack and Craft',
    location: 'London, UK · Remote',
    period: 'Mar 2022 to Jun 2023',
    start: '2022-03',
    end: '2023-06',
    summary:
      'London software company that builds products for clients, mostly AkzoNobel (Dulux) and TradeKart.',
    highlights: [
      "Built features for AkzoNobel's contractor platform in Angular and RxJS, and for its merchant portals in React, Redux and Material UI.",
      "Built features for an AkzoNobel sales tool in Angular that calculates a project's cost over 30 years.",
      'Built the React Native app and the React and Material UI portals for TradeKart, which delivers construction products to building sites within two hours.',
      'Worked on the company website, turning designs into responsive pages.',
    ],
    skills: ['React', 'React Native', 'Angular', 'RxJS', 'Redux', 'Material UI', 'TypeScript'],
  },
  {
    id: 'patika',
    title: 'Frontend Developer',
    company: 'Patika.dev',
    location: 'Remote',
    period: 'May 2021 to Mar 2022',
    start: '2021-05',
    end: '2022-03',
    summary: 'Online learning and hiring platform for developers.',
    highlights: [
      'Built dark mode and a gamification feature with a leaderboard for the learning platform.',
    ],
    skills: ['Dark mode', 'Gamification'],
  },
];

export interface Education {
  school: string;
  field: string;
  period: string;
  note?: string;
}

export const education: Education[] = [
  {
    school: 'Istanbul University',
    field: 'Management Information Systems',
    period: '2022 to present',
  },
  {
    school: 'Yeditepe University',
    field: 'Computer Engineering',
    period: '2015 to 2020',
    note: 'Not completed',
  },
];
