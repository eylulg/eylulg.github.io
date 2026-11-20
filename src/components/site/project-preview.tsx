import type { ReactNode } from 'react';

const solidChip = 'rounded-md bg-brand-solid px-4 py-2 text-sm font-semibold text-on-solid';
const outlineChip =
  'rounded-md border border-brand bg-primary px-4 py-2 text-sm font-medium text-brand';
const issue =
  'truncate rounded-sm border border-default bg-primary px-2 py-2 text-xs text-secondary';
const activeIssue =
  'truncate rounded-sm border-2 border-brand bg-primary px-2 py-2 text-xs font-medium text-primary';
const node = 'rounded-sm border border-default bg-primary px-3 py-2 text-xs text-secondary';
const activeNode =
  'rounded-sm border-2 border-brand bg-primary px-3 py-2 text-xs font-semibold text-primary';
const citation = 'rounded-xs bg-brand-solid px-1.5 py-0.5 text-xs font-semibold text-on-solid';

function ComponentLibraryPreview() {
  return (
    <div className='flex flex-wrap items-center justify-center gap-3'>
      <span className={solidChip}>Save changes</span>
      <span className={outlineChip}>Cancel</span>
      <span className='flex h-6 w-11 items-center justify-end rounded-full bg-brand-solid p-0.5'>
        <span className='size-5 rounded-full bg-fg-on-solid' />
      </span>
    </div>
  );
}

function WorkspacePreview() {
  const columns = [
    { label: 'To do', issues: [{ title: 'Add filters', className: issue }] },
    { label: 'In progress', issues: [{ title: 'Fix login', className: activeIssue }] },
    { label: 'Done', issues: [{ title: 'Write tests', className: issue }] },
  ];
  return (
    <div className='grid w-full grid-cols-3 gap-3 px-6 sm:px-8'>
      {columns.map(({ label, issues }) => (
        <div key={label} className='flex flex-col gap-2'>
          <span className='text-xs font-semibold text-brand'>{label}</span>
          {issues.map(({ title, className }) => (
            <span key={title} className={className}>
              {title}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function AgentWorkflowsPreview() {
  return (
    <div className='flex items-center'>
      <span className={node}>Plan</span>
      <span className='w-6 border-t-2 border-brand sm:w-10' />
      <span className={activeNode}>Run CI</span>
      <span className='w-6 border-t-2 border-default sm:w-10' />
      <span className={node}>Review</span>
    </div>
  );
}

function AssistantStudioPreview() {
  return (
    <p className='px-6 text-md text-primary sm:px-10'>
      Renewal takes about six weeks <span className={citation}>1</span> and needs the old passport{' '}
      <span className={citation}>2</span>
    </p>
  );
}

const previews: Record<string, () => ReactNode> = {
  ui: ComponentLibraryPreview,
  workspace: WorkspacePreview,
  'agent-control-room': AgentWorkflowsPreview,
  'assistant-studio': AssistantStudioPreview,
};

/** A small piece of the project's real interface, drawn with its own theme's tokens. Decorative. */
export function ProjectPreview({ slug }: { slug: string }) {
  const Preview = previews[slug];
  return Preview ? <Preview /> : null;
}
