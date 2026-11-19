import { Badge } from '@eylulg/ui/badge';
import { Card, CardBody, CardFooter, CardHeader } from '@eylulg/ui/card';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/content/projects';
import { StatusBadge } from './status-badge';

interface ProjectCardProps {
  project: Project;
  headingLevel?: 2 | 3;
}

/** The whole card is one link to the case study; the heading names it. */
export function ProjectCard({ project, headingLevel = 3 }: ProjectCardProps) {
  return (
    <Card href={`/projects/${project.slug}`} className='h-full'>
      <CardHeader title={project.title} headingLevel={headingLevel} />
      <CardBody>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-wrap items-center gap-2'>
            <StatusBadge status={project.status} />
          </div>
          <p className='text-md text-tertiary'>{project.summary}</p>
          <ul aria-label='Tags' className='flex flex-wrap gap-1.5'>
            {project.tags.map((tag) => (
              <li key={tag}>
                <Badge size='sm'>{tag}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </CardBody>
      <CardFooter>
        <span
          aria-hidden='true'
          className='flex items-center gap-1.5 text-sm font-semibold text-brand'
        >
          Read the case study
          <ArrowRight className='size-4' />
        </span>
      </CardFooter>
    </Card>
  );
}
