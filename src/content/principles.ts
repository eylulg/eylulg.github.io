export interface PrincipleGroup {
    id: string;
    title: string;
    principles: string[];
    /** When the rule gives way. */
    bends: string;
}

export const principlesIntro =
    "These are the rules I hold myself to, and the same rules I write into the briefs of the agents I build. If a rule is too vague for an agent to follow, it is too vague for me. Each group says when I bend it.";

export const principleGroups: PrincipleGroup[] = [
    {
        id: "design-and-ui",
        title: "Design and UI",
        principles: [
            "I build what the design defines, because a missing style is a question for the designer, not a prop for me to invent.",
            "I use the design system first and extend it when it falls short, because a fix in one screen becomes a bug in the next.",
            "I cover responsive layouts and empty, loading and error states even when the designs show only the desktop happy path, because users meet those first.",
        ],
        bends: "When a missing design blocks the work, I ship the smallest honest version, write down what I assumed and change it once the design owner has answered.",
    },
    {
        id: "code",
        title: "Code and checks",
        principles: [
            "I search for an existing helper before writing one, because duplicates drift apart.",
            "I write tests that prove what a user can see, and comments that explain why, because tests of internals and comments that restate code go stale.",
            "I run the type check, lint and the tests for my change before I commit, because CI should confirm what I already know.",
        ],
        bends: "A throwaway prototype does not need the full set of tests. Anything that lives longer than a week does.",
    },
    {
        id: "pull-requests",
        title: "Pull requests and review",
        principles: [
            "I open a draft pull request with a summary, a test plan and evidence such as before and after screenshots, and I keep the description true after every change, because reviewers read it first.",
            "I review the diff rather than the description, say which findings block and which are suggestions, answer every thread, and dismiss a finding only when it is wrong, because the next reader pays for every unclear name and every duplicate.",
        ],
        bends: "A typo fix does not need a screenshot. I say so in the description instead.",
    },
    {
        id: "communication",
        title: "Communication",
        principles: [
            "When I am blocked on a product question I ask the owner once, with a recommended option, because a clear question gets a quick answer.",
            "I record decisions where the team will look for them, usually on the ticket, because a plan agreed in chat is forgotten.",
        ],
        bends: "For a small question I skip the write-up and ask in a message. The record is for decisions that someone will need later.",
    },
];
