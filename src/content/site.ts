export const site = {
    name: "Eylül Güneş",
    pronouns: "they/them",
    role: "Senior Frontend Developer",
    tagline: "Senior Frontend Developer. React, Next.js and TypeScript, design systems and AI agents.",
    url: "https://eylulg.github.io",
    location: "Türkiye",
    availability: "Available from 1 December 2026. Remote, European time zones.",
    email: "eylulgist@gmail.com",
    cvPath: "/Eylul-Gunes-CV.pdf",
    links: {
        github: "https://github.com/eylulg",
        linkedin: "https://www.linkedin.com/in/eylul-gunes",
    },
    about: [
        "I'm a Senior Frontend Developer who builds product interfaces, the design systems behind them, and lately the AI agents that help ship them.",
        "In 5+ years I've worked mainly in TypeScript, React and Next.js, and also in Vue, Angular and React Native, across legal tech, marketing tech, healthcare, e-commerce and online learning.",
        "What I care about: building what the design defines, extending the design system rather than patching one screen, accessible interfaces, and tests that check what users see.",
    ],
} as const;

export interface Language {
    name: string;
    level: string;
}

export const languages: Language[] = [
    { name: "Turkish", level: "Native" },
    { name: "English", level: "Near-native" },
    { name: "German", level: "Professional working proficiency" },
];

export interface ProofPoint {
    id: "product-ui" | "design-systems" | "ai-agents";
    title: string;
    body: string;
    href: string;
    linkLabel: string;
}

export const proofPoints: ProofPoint[] = [
    {
        id: "product-ui",
        title: "Product UI craft",
        body: "Product screens that hold up under real data: an issue tracker with optimistic updates that roll back when the server says no, a command palette with nested pages, and every state from empty to error covered by a test. Built in Next.js and React, keyboard first, tested with axe in light and dark.",
        href: "/projects/workspace",
        linkLabel: "See Workspace",
    },
    {
        id: "design-systems",
        title: "Design-system engineering",
        body: "More than thirty accessible components on React Aria, eight theme variants that change only hue, grays, radius and density, and a test that every text token passes WCAG AA in light and dark.",
        href: "/projects/ui",
        linkLabel: "See the component library",
    },
    {
        id: "ai-agents",
        title: "AI agent engineering",
        body: "AI where a person stays in charge: a review tool that checks every finding against the diff before showing it and posts nothing on its own. The agent workflow behind this site is written up too.",
        href: "/projects/review-companion",
        linkLabel: "See Review Companion",
    },
];
