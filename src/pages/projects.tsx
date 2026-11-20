import { useMemo, useState } from 'react';
import { Input } from '@eylulg/ui/input';
import { PageHeader } from '@eylulg/ui/page-header';
import { Tag, TagGroup } from '@eylulg/ui/tag';
import { Search } from 'lucide-react';
import type { Key } from 'react-aria-components';
import { useSearchParams } from 'react-router';
import { ProjectCard } from '@/components/site/project-card';
import { Seo } from '@/components/site/seo';
import { type Project, projectTags, projects, tagFromSlug, tagToSlug } from '@/content/projects';

const ALL = 'all';

function ProjectGroup({
  id,
  title,
  projects: group,
}: {
  id: string;
  title: string;
  projects: Project[];
}) {
  if (group.length === 0) return null;

  return (
    <section aria-labelledby={id} className='flex flex-col gap-6'>
      <h2 id={id} className='text-xl font-semibold text-primary'>
        {title}
      </h2>
      <ul className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {group.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} headingLevel={3} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const activeTag = tagFromSlug(searchParams.get('tag'));

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projects.filter((project) => {
      if (activeTag && !project.tags.includes(activeTag)) return false;
      if (!needle) return true;
      return [project.title, project.summary, ...project.stack].some((text) =>
        text.toLowerCase().includes(needle),
      );
    });
  }, [activeTag, query]);

  const mainProjects = visible.filter((project) => !project.smaller);
  const smallerProjects = visible.filter((project) => project.smaller);

  const onTagChange = (keys: Set<Key> | 'all') => {
    const [key] = keys === 'all' ? [ALL] : [...keys];
    setSearchParams(key && key !== ALL ? { tag: String(key) } : {}, {
      replace: true,
      preventScrollReset: true,
    });
  };

  return (
    <>
      <Seo
        title='Projects'
        description='Projects by Eylül Güneş: a component library, an issue tracker, an AI pull request review tool, a design token tool, a Word add-in and smaller apps.'
      />
      <div className='max-w-3xl pt-6 pb-8 md:pb-12'>
        <PageHeader
          eyebrow='Work'
          title='Projects'
          description='Public projects with tests and CI. Filter by tag or search by name or stack.'
        />
      </div>

      <div className='flex flex-col gap-10 pb-16 md:pb-24'>
        <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <TagGroup
            label='Filter projects by tag'
            selectionMode='single'
            selectedKeys={[activeTag ? tagToSlug(activeTag) : ALL]}
            onSelectionChange={onTagChange}
          >
            <Tag id={ALL}>All</Tag>
            {projectTags.map((tag) => (
              <Tag key={tag} id={tagToSlug(tag)}>
                {tag}
              </Tag>
            ))}
          </TagGroup>
          <Input
            className='md:w-72'
            label='Search projects'
            placeholder='Search by name or stack'
            iconLeading={Search}
            value={query}
            onChange={setQuery}
            type='search'
          />
        </div>

        <p role='status' className='text-sm text-tertiary'>
          {visible.length === 1 ? '1 project' : `${visible.length} projects`}
          {activeTag ? ` tagged ${activeTag}` : ''}
          {query.trim() ? ` matching "${query.trim()}"` : ''}
        </p>

        {visible.length > 0 ? (
          <>
            <ProjectGroup id='main-projects' title='Main projects' projects={mainProjects} />
            <ProjectGroup
              id='smaller-projects'
              title='Smaller projects'
              projects={smallerProjects}
            />
          </>
        ) : (
          <p className='rounded-xl bg-primary p-6 text-md text-tertiary ring-1 ring-default'>
            No projects match. Try another tag or a shorter search.
          </p>
        )}
      </div>
    </>
  );
}
