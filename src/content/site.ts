export const site = {
    name: "Eylül Güneş",
    pronouns: "they/them",
    role: "Senior Frontend Developer",
    tagline: "Senior Frontend Developer. React, Next.js, TypeScript. Design systems and AI agents.",
    url: "https://eylulg.github.io",
    location: "Türkiye",
    availability: "Open to remote work.",
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
        body: "I build product interfaces in React, Next.js and TypeScript from Figma to production, with responsive layouts, empty, loading and error states, and accessibility from the start.",
        href: "/experience",
        linkLabel: "See my experience",
    },
    {
        id: "design-systems",
        title: "Design-system engineering",
        body: "I extend component libraries instead of patching one screen: component APIs, tokens, Storybook, accessibility fixes, and versioned releases rolled out to every app that uses them.",
        href: "/projects?tag=design-system",
        linkLabel: "See design-system projects",
    },
    {
        id: "ai-agents",
        title: "AI agent engineering",
        body: "I build AI coding agents that run a real delivery workflow, from ticket to pull request, with human approval steps where they matter.",
        href: "/agents",
        linkLabel: "How the agent works",
    },
];
