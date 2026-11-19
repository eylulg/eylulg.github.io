export const agentIntro = [
  'I build AI agents that run a real delivery process, with human approval steps where they matter.',
  "At Saga I designed and ran an engineering agent that takes tickets through to pull requests, and a library of reusable agent skills that encode a team's delivery workflow.",
];

export interface AgentSection {
  id: string;
  title: string;
  intro: string;
  points: string[];
}

export const agentSections: AgentSection[] = [
  {
    id: 'agent',
    title: 'The agent',
    intro: 'It runs on a cloud VM and watches the places where tickets and reviews arrive.',
    points: [
      'Picks up tickets and writes a plan.',
      'Implements the approved plan, fixes failing CI and answers review findings.',
      'Asks the owner only the real decisions, as A/B questions with a recommendation.',
      'Keeps its queue and state across restarts.',
      'Puts a ticket on hold while it waits on a designer, then resumes it on its own.',
    ],
  },
  {
    id: 'skills',
    title: 'Skills library',
    intro:
      'A library of reusable agent skills that encode the delivery workflow, so every run follows the same steps.',
    points: [
      'Planning a task from its ticket and the code.',
      'Checking work locally before it is committed.',
      'Preparing a pull request with evidence and answering review comments.',
      'Reviewing in several independent passes.',
      'Learning from past review findings, so the checklist improves.',
    ],
  },
  {
    id: 'routing',
    title: 'Model routing',
    intro: 'Models are routed by the kind of job, not by habit.',
    points: [
      'Strong reasoning models for plans, deep review and stuck bugs.',
      'Mid-tier models for implementing an agreed plan.',
      'Fast models for search and mechanical fixes.',
      'The roles stay fixed; only the model table changes when new models ship.',
    ],
  },
  {
    id: 'guardrails',
    title: 'Guardrails',
    intro: 'The owner stays in charge of anything other people can see.',
    points: [
      "It never posts under the owner's name without approval.",
      'It never merges on its own.',
      'It keeps a human approval step for anything visible.',
      'It records decisions on the ticket.',
    ],
  },
];

export interface FlowStep {
  id: string;
  label: string;
  /** Short line shown inside the diagram node. */
  short: string;
  detail: string;
  kind: 'step' | 'gate' | 'loop';
}

export const agentFlow: FlowStep[] = [
  {
    id: 'ticket',
    short: 'From chat, a tracker or a repo',
    label: 'Ticket',
    detail: 'A ticket is assigned or mentioned in chat, the tracker or the repository.',
    kind: 'step',
  },
  {
    id: 'plan',
    short: 'Reads the ticket and the code',
    label: 'Plan',
    detail: 'The agent reads the ticket and the code, and writes a plan.',
    kind: 'step',
  },
  {
    id: 'gate-plan',
    short: 'Owner approves the plan',
    label: 'Approval gate',
    detail: 'The owner approves the plan or answers an A/B question.',
    kind: 'gate',
  },
  {
    id: 'implement',
    short: 'On its own branch',
    label: 'Implement',
    detail: 'The agent implements the approved plan on its own branch.',
    kind: 'step',
  },
  {
    id: 'ci',
    short: 'Until checks pass',
    label: 'CI fix loop',
    detail: 'It reads failing checks and fixes them until CI is green.',
    kind: 'loop',
  },
  {
    id: 'review',
    short: 'Fix or answer each finding',
    label: 'Review replies',
    detail: 'It fixes or answers each review finding.',
    kind: 'loop',
  },
  {
    id: 'gate-ready',
    short: 'Owner approves anything visible',
    label: 'Approval gate',
    detail: 'The owner approves before anything visible is posted.',
    kind: 'gate',
  },
  {
    id: 'ready',
    short: 'Handed to human reviewers',
    label: 'Ready for review',
    detail: 'The pull request is marked ready for human review.',
    kind: 'step',
  },
];
