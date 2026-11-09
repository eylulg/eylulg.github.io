export interface PrincipleGroup {
    id: string;
    title: string;
    principles: string[];
}

export const principlesIntro = "These are the rules I hold myself to, and the same rules I give the agents I build. They carry over to any team.";

export const principleGroups: PrincipleGroup[] = [
    {
        id: "design-and-ui",
        title: "Design and UI",
        principles: [
            "Figma is the source of truth. I build only what the design defines. If a style is missing, the designer adds it to Figma first; I don't invent props.",
            "Design system first. If a component exists, I use it. If it needs to change, I extend the library and then update the apps, rather than customizing it in one screen.",
            "Once design review passes, I don't change design decisions.",
            "I cover responsive layouts even when the designs only show desktop, and I cover empty, loading and error states.",
        ],
    },
    {
        id: "code",
        title: "Code",
        principles: [
            "I search for an existing helper before writing one.",
            "I keep comments that explain why, update comments next to code I touch, and delete comments that restate the code.",
            "One test file per component, shared mocks, and tests that prove behaviour rather than checking that a string appears.",
        ],
    },
    {
        id: "before-anything-leaves-my-machine",
        title: "Before anything leaves my machine",
        principles: [
            "I run a local gate first: type check, lint, the tests for the changed feature, and a scan for the issues reviewers and static analysis tend to raise. CI should confirm what I already know.",
            "Commits are signed and follow Conventional Commits, because semantic-release reads them to set the version.",
            "Every change gets its own branch, worktree and pull request. I never work on a branch someone else has checked out.",
        ],
    },
    {
        id: "pull-requests",
        title: "Pull requests",
        principles: [
            "Draft first, assigned to me, with a summary and a test plan the reviewer can actually tick off.",
            "Evidence in the description: settled before and after screenshots, short cropped videos, failing-then-passing tests.",
            "I keep the description true after every change, and remove text that is no longer true.",
            "Every review thread gets a reply and a resolution. I dismiss a finding only when it is wrong, never because the fix is hard.",
        ],
    },
    {
        id: "reviewing",
        title: "Reviewing",
        principles: [
            'I nitpick on purpose. Duplication is a finding. "It existed before" isn\'t a reason to keep a bad pattern.',
            "I read the code, not the author's description of it.",
        ],
    },
    {
        id: "communication",
        title: "Communication",
        principles: [
            "I say plainly what is true and don't soften findings.",
            "Plans go in the conversation, decisions go on the ticket.",
            "When I'm blocked on a product question, I put it to the owner in one clear message with a recommended option.",
        ],
    },
];
