import { Card, CardHeader } from '@eylulg/ui/card';
import { cx } from '@eylulg/ui/cx';
import type { Project } from '@/content/projects';

interface ProjectPagerProps {
  previous?: Project;
  next?: Project;
}

function PagerLink({
  project,
  label,
  className,
}: {
  project: Project;
  label: string;
  className?: string;
}) {
  return (
    <Card href={`/projects/${project.slug}`} className={cx('h-full', className)}>
      <CardHeader title={project.title} description={label} headingLevel={2} />
    </Card>
  );
}

export function ProjectPager({ previous, next }: ProjectPagerProps) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label='More projects'
      className='grid gap-3 border-t border-subtle pt-8 sm:grid-cols-2'
    >
      {previous && <PagerLink project={previous} label='Previous project' />}
      {next && <PagerLink project={next} label='Next project' className='sm:col-start-2' />}
    </nav>
  );
}
