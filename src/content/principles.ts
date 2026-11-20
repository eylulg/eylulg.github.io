export interface PrincipleGroup {
  id: string;
  title: string;
  principles: string[];
  /** When the rule gives way. */
  bends: string;
}

export const principlesIntro =
  'The rules I follow, and the ones I write into the briefs of the agents I build. A rule too vague for an agent is too vague for me. Each group says when it bends.';

export const principleGroups: PrincipleGroup[] = [
  {
    id: 'design-and-ui',
    title: 'Design and UI',
    principles: [
      'I build what the design defines. A missing style is a question for the designer, not a prop for me to invent.',
      'I use the design system and extend it when it falls short. A fix in one screen becomes a bug in the next.',
      'I cover responsive layouts and empty, loading and error states, even when the designs show only the desktop happy path.',
    ],
    bends:
      'If a missing design blocks the work, I ship the smallest version, write down what I assumed and change it when the designer answers.',
  },
  {
    id: 'code',
    title: 'Code and checks',
    principles: [
      'I search for an existing helper before writing one.',
      'I write tests for what a user can see, and comments that say why, not what.',
      'I run the type check, lint and the tests for my change before I commit.',
    ],
    bends:
      'A throwaway prototype does not need the full set of tests. Anything that lives longer than a week does.',
  },
  {
    id: 'pull-requests',
    title: 'Pull requests and review',
    principles: [
      'I open a draft pull request with a summary, a test plan and before and after screenshots, and I keep the description true after every change.',
      'I review the diff, not the description. I say which findings block and which are suggestions, answer every thread, and dismiss a finding only when it is wrong.',
    ],
    bends: 'A typo fix does not need a screenshot. I say so in the description.',
  },
  {
    id: 'communication',
    title: 'Communication',
    principles: [
      'When a product question blocks me, I ask the owner once, with a recommended option.',
      'I record decisions on the ticket, where the team will look for them.',
    ],
    bends:
      'For a small question I send a message. Write-ups are for decisions someone will need later.',
  },
];
