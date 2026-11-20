import type { ReactNode } from 'react';
import { Badge } from '@eylulg/ui/badge';
import { Button } from '@eylulg/ui/button';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useParams } from 'react-router';
import { DecisionCard } from '@/components/site/decision-card';
import { FactList } from '@/components/site/fact-list';
import { ProjectPager } from '@/components/site/project-pager';
import { Seo } from '@/components/site/seo';
import { StatusBadge } from '@/components/site/status-badge';
import { getProjectDetail, projectLinks, realScreenshots } from '@/content/project-details';
import { getProject, projects } from '@/content/projects';
import NotFoundPage from './not-found';

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className='flex flex-col gap-3'>
      <h2 id={id} className='text-xl font-semibold text-primary'>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  const detail = project && getProjectDetail(project.slug);

  if (!project || !detail) return <NotFoundPage />;

  const [live, source] = projectLinks(project, detail);
  const screenshot = realScreenshots(detail)[0];
  const index = projects.indexOf(project);

  return (
    <>
      <Seo title={project.title} description={project.summary} />
      <div className='flex flex-col gap-12 pt-8 pb-16 md:pt-12 md:pb-24'>
        <Button
          href='/projects'
          variant='tertiary'
          size='md'
          iconLeading={ArrowLeft}
          className='-ml-3 self-start'
        >
          All projects
        </Button>

        <header className='grid items-center gap-8 lg:grid-cols-2 lg:gap-12'>
          <div className='flex flex-col items-start gap-4'>
            <StatusBadge status={project.status} />
            <h1 className='text-2xl font-semibold text-primary md:text-3xl'>{project.title}</h1>
            <p className='max-w-2xl text-lg text-tertiary md:text-xl'>{detail.intro}</p>
            <div className='flex flex-wrap gap-3 pt-2'>
              {live && (
                <Button
                  href={live.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  variant='primary'
                  size='lg'
                  iconTrailing={ArrowUpRight}
                >
                  {live.label}
                </Button>
              )}
              {source && (
                <Button
                  href={source.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  variant='secondary'
                  size='lg'
                >
                  {source.label}
                </Button>
              )}
            </div>
          </div>
          {screenshot && (
            <img
              src={screenshot.src}
              alt={screenshot.alt}
              width={1280}
              height={800}
              className='h-auto w-full rounded-xl bg-secondary ring-1 ring-default'
            />
          )}
        </header>

        <div className='grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]'>
          <div className='flex flex-col gap-10'>
            <Section id='why' title='Why I built it'>
              <p className='text-md text-tertiary'>{detail.why}</p>
            </Section>

            <Section id='does' title='What it does'>
              <ul className='flex list-disc flex-col gap-2 pl-5 text-md text-tertiary marker:text-fg-tertiary'>
                {detail.does.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Section>

            <Section id='decisions' title='Decisions'>
              <ul className='grid gap-3 sm:grid-cols-2'>
                {detail.decisions.map((decision) => (
                  <li key={decision.title}>
                    <DecisionCard {...decision} />
                  </li>
                ))}
              </ul>
            </Section>

            <Section id='testing' title='Testing'>
              <p className='text-md text-tertiary'>{detail.testing}</p>
            </Section>

            {detail.next && (
              <Section id='next' title='Next'>
                <p className='text-md text-tertiary'>{detail.next}</p>
              </Section>
            )}
          </div>

          <aside
            aria-labelledby='glance'
            className='flex h-fit flex-col gap-5 rounded-xl bg-secondary p-6 ring-1 ring-default'
          >
            <h2 id='glance' className='text-sm font-semibold text-tertiary'>
              At a glance
            </h2>
            <FactList
              facts={[
                { label: 'Role', value: detail.role },
                { label: 'Status', value: <StatusBadge status={project.status} /> },
              ]}
            />
            <div className='flex flex-col gap-2'>
              <p id='stack' className='text-sm text-tertiary'>
                Stack
              </p>
              <ul aria-labelledby='stack' className='flex flex-wrap gap-1.5'>
                {detail.stack.map((item) => (
                  <li key={item}>
                    <Badge size='md' color='brand'>
                      {item}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
            <ul aria-label='Links' className='flex flex-col gap-1 border-t border-subtle pt-4'>
              {[
                { link: live, label: 'Live site' },
                { link: source, label: 'Repository' },
              ].map(
                ({ link, label }) =>
                  link && (
                    <li key={link.href}>
                      <Button
                        href={link.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        variant='tertiary'
                        size='md'
                        iconTrailing={ArrowUpRight}
                        className='-ml-3'
                      >
                        {label}
                      </Button>
                    </li>
                  ),
              )}
            </ul>
          </aside>
        </div>

        <ProjectPager previous={projects[index - 1]} next={projects[index + 1]} />
      </div>
    </>
  );
}
