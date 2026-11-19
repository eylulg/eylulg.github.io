export const site = {
  name: 'Eylül Güneş',
  role: 'Senior Frontend Developer',
  tagline:
    'Senior Frontend Developer. React, Next.js and TypeScript, design systems and AI agents.',
  url: 'https://eylulg.github.io',
  location: 'Türkiye',
  eyebrow: 'Senior frontend developer',
  headline: 'I build product interfaces and the design systems under them.',
  intro: 'React, Next.js and TypeScript, with accessibility and tests as part of the work.',
  availability: 'Available from 1 December 2026. Remote, European time zones.',
  email: 'eylulgist@gmail.com',
  cvPath: '/Eylul-Gunes-CV.pdf',
  links: {
    github: 'https://github.com/eylulg',
    linkedin: 'https://www.linkedin.com/in/eylul-gunes',
  },
  about: [
    "I'm a Senior Frontend Developer who builds product interfaces, the design systems behind them, and lately the AI agents that help ship them.",
    "In 5+ years I've worked mainly in TypeScript, React and Next.js, and also in Vue, Angular and React Native, across legal tech, marketing tech, healthcare, e-commerce and online learning.",
    'What I care about: building what the design defines, extending the design system rather than patching one screen, accessible interfaces, and tests that check what users see.',
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
