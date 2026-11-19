export interface SkillGroup {
  name: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    name: 'Languages and frameworks',
    skills: [
      'TypeScript',
      'JavaScript',
      'React',
      'Next.js',
      'Vue.js',
      'React Native',
      'Angular',
      'Node.js',
      'HTML',
      'CSS',
    ],
  },
  {
    name: 'State and data',
    skills: ['Redux Toolkit', 'Zustand', 'SWR', 'Pinia', 'RxJS', 'REST APIs', 'WebSockets'],
  },
  {
    name: 'UI and design systems',
    skills: [
      'Tailwind CSS',
      'Material UI',
      'Storybook',
      'Design systems',
      'Component libraries',
      'Figma',
      'Responsive design',
      'Accessibility (WCAG, ARIA)',
    ],
  },
  {
    name: 'Testing and CI/CD',
    skills: [
      'Vitest',
      'React Testing Library',
      'Playwright',
      'ESLint',
      'Prettier',
      'SonarCloud',
      'GitHub Actions',
    ],
  },
  { name: 'Microsoft 365', skills: ['Office.js add-ins (Word, Outlook)', 'Microsoft Graph'] },
  { name: 'Monitoring and analytics', skills: ['PostHog', 'Sentry', 'New Relic'] },
  {
    name: 'AI engineering',
    skills: ['AI coding agents', 'Prompt engineering', 'Claude Code', 'Cursor'],
  },
  {
    name: 'Other',
    skills: [
      'Internationalization (next-intl, i18next)',
      'Twilio',
      'Chrome extensions (Manifest V3)',
      'Git',
      'Jira',
      'Linear',
      'Agile',
    ],
  },
];
