export const site = {
  name: 'Eylül Güneş',
  brandName: 'Eylül',
  role: 'Senior Frontend Developer',
  tagline:
    'Senior Frontend Developer. React, Next.js and TypeScript, design systems and AI agents.',
  url: 'https://eylulg.github.io',
  location: 'Türkiye',
  eyebrow: 'Senior frontend developer',
  headline: 'I build product interfaces and the design systems under them.',
  intro: 'I work in React, Next.js and TypeScript, and I test and check accessibility as I go.',
  availability: 'Available from 1 December 2026. Remote, European time zones.',
  email: 'eylulgist@gmail.com',
  cvPath: '/Eylul-Gunes-CV.pdf',
  links: {
    github: 'https://github.com/eylulg',
    linkedin: 'https://www.linkedin.com/in/eylul-gunes',
  },
  about: [
    'I build product interfaces and the design systems behind them. Lately I also build AI agents that help ship them.',
    'In more than five years I have worked in TypeScript, React and Next.js, and also in Vue, Angular and React Native, in legal tech, marketing tech, healthcare, e-commerce and online learning.',
    'I build what the design defines, extend the design system instead of patching one screen, and write tests that check what users see.',
  ],
} as const;

export interface Language {
  name: string;
  level: string;
}

export const languages: Language[] = [
  { name: 'Turkish', level: 'Native' },
  { name: 'English', level: 'Near-native' },
  { name: 'German', level: 'Professional working proficiency' },
];
