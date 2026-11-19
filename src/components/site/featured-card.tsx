import { Card, CardHeader } from '@eylulg/ui/card';
import { projects as familyProjects } from '@eylulg/ui/projects';
import type { Project } from '@/content/projects';
import { ProjectPreview } from './project-preview';

/**
 * A featured project: a preview of its interface in its own theme, then its name and one line. The Component
 * Library has no theme of its own, so its preview follows whichever theme the visitor picked.
 */
export function FeaturedCard({ project }: { project: Project }) {
  const variant = familyProjects.find((entry) => entry.id === project.libraryId)?.variant;

  return (
    <Card href={`/projects/${project.slug}`} padding='none' className='h-full'>
      <div
        aria-hidden='true'
        data-ui-variant={variant ?? undefined}
        className='flex h-40 items-center justify-center bg-brand-subtle'
      >
        <ProjectPreview slug={project.slug} />
      </div>
      <div className='p-card'>
        <CardHeader size='lg' title={project.title} description={project.teaser} />
      </div>
    </Card>
  );
}
