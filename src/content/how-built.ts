export interface BuiltSection {
    id: string;
    title: string;
    intro?: string;
    points?: string[];
}

export const builtIntro =
    "I built this site and the projects it links to in November 2026, with AI agents, in a workflow I designed and ran. The commit history shows it: every repository was started within a few days and none has a pull request yet. This page explains how it was done, so you do not have to guess.";

export const builtSections: BuiltSection[] = [
    {
        id: "workflow",
        title: "The workflow",
        intro: "The same workflow for every repository.",
        points: [
            "A standards file that every repository follows: how tests are written, how code is organised, accessibility, copy, and the checks that run before a commit.",
            "One shared design system, the component library, so the projects read as one family and none of them re-invents a button.",
            "One agent per repository, each working from a written brief and the standards file.",
            "Review passes by a stronger model after the build, whose findings I read and triaged.",
            "Every gate green before a commit: type check, lint, formatting, unused code, tests, a production build and end to end tests where a repository has them.",
            "Agents commit locally and never push. I push by hand.",
        ],
    },
    {
        id: "decided",
        title: "What I decided and what the agents produced",
        intro: "The agents wrote most of the code. The choices that shape it are mine.",
        points: [
            "I decided which projects to build and which to leave out, and what each one should prove.",
            "I wrote the standards and the briefs, including the rules I would hold a person to.",
            "I designed the tokens, the eight theme variants and the shared chrome of the library, and the agents built the components on them.",
            "I decided which review findings to fix, which to dispute and which to leave, and I checked each fix in a real browser.",
            "I wrote the rules for the copy on this site, and I decide what it claims.",
            "The agents produced the first version of the code, the tests and the READMEs, the review findings, and most of the fixes.",
        ],
    },
    {
        id: "went-wrong",
        title: "What went wrong",
        intro: "A workflow is easy to describe when it goes well. Three things did not.",
        points: [
            "Rate limits stopped runs half way. A repository could be left partly built.",
            "Interrupted runs had to be restarted from the brief, which is why the brief has to hold everything an agent needs.",
            "A focus ring bug. Every library control had an invisible keyboard focus ring, because one class set the outline to none on the same element that was meant to draw it. Five reviewers found it. The automated accessibility checks passed, because they do not check that a ring is drawn. The fix went into the library once, which repaired every app, and a check of the computed style now runs in the library CI so it cannot come back.",
        ],
    },
    {
        id: "next",
        title: "From here on, in public",
        intro: "Work continues with pull requests, so the history shows the process and not only the result.",
        points: [
            "Each change goes on a branch and into a pull request, in draft first, with before and after evidence.",
            "A reviewer pass runs before I mark it ready, and every thread gets a reply and a resolution.",
            "The rules behind this are on the How I work page. The agent that follows them is on the AI agents page.",
        ],
    },
];
