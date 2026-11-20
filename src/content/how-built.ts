export interface BuiltSection {
  id: string;
  title: string;
  intro?: string;
  points?: string[];
}

export const builtIntro =
  'I built this site and the projects it links to in November 2026, working with AI agents in a workflow I designed. This page says how, so you do not have to guess.';

export const builtSections: BuiltSection[] = [
  {
    id: 'workflow',
    title: 'The workflow',
    intro: 'Every repository follows the same steps.',
    points: [
      'A standards file for tests, code layout, accessibility, copy and the checks before a commit.',
      'One shared design system, so the projects look like one family.',
      'One agent per repository, working from a written brief and the standards file.',
      'A review pass by a stronger model after each build. I read and triaged the findings.',
      'Every check green before a commit: types, lint, formatting, unused code, tests, a production build and end-to-end tests where a repository has them.',
      'Agents commit locally and never push. I push by hand.',
    ],
  },
  {
    id: 'decided',
    title: 'What I decided and what the agents wrote',
    intro:
      'The agents wrote the first version of the code, the tests and the READMEs, the review findings and most of the fixes. I made the choices that shape them.',
    points: [
      'I chose which projects to build and which to leave out.',
      'I wrote the standards and the briefs.',
      'I designed the tokens, the nine themes and the shared top bar and footer. The agents built the components on them.',
      'I decided which review findings to fix, dispute or leave, and checked each fix in a real browser.',
      'I wrote the rules for the copy on this site and decide what it claims.',
    ],
  },
  {
    id: 'went-wrong',
    title: 'What went wrong',
    points: [
      'Rate limits stopped runs half way and left a repository partly built.',
      'Interrupted runs had to restart from the brief, so the brief has to hold everything an agent needs.',
      'Every library control had an invisible keyboard focus ring. One class set the outline to none on the element meant to draw it. Five reviewers found it. The automated accessibility checks passed, because they do not check that a ring is drawn. I fixed it once in the library, which repaired every app, and the library CI now checks the computed style.',
    ],
  },
  {
    id: 'next',
    title: 'From here on',
    intro: 'Changes go through pull requests, so the history shows the process.',
    points: [
      'Each change goes on a branch and into a draft pull request with before and after evidence.',
      'A review pass runs before I mark it ready, and every thread gets a reply.',
      'The rules are on the How I work page. The agent work is on the AI agents page.',
    ],
  },
];
