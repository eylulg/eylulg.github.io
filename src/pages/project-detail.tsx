import type { ReactNode } from 'react';
import { Badge } from '@eylulg/ui/badge';
import { Button } from '@eylulg/ui/button';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useParams } from 'react-router';
import { Seo } from '@/components/site/seo';
import { StatusBadge } from '@/components/site/status-badge';
import { getProjectDetail, projectLinks, realScreenshots } from '@/content/project-details';
import { getProject } from '@/content/projects';
import NotFoundPage from './not-found';

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className='flex flex-col gap-3 border-t border-subtle pt-8'>
      <h2 id={id} className='text-xl font-semibold text-primary'>
        {title}
      </h2>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className='flex list-disc flex-col gap-2 pl-5 text-md text-tertiary marker:text-fg-tertiary'>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  const detail = project && getProjectDetail(project.slug);

  if (!project || !detail) return <NotFoundPage />;

  const links = projectLinks(project);
  const screenshots = realScreenshots(detail);

  return (
    <>
      <Seo title={project.title} description={project.summary} />
      <div className='flex flex-col gap-8 pt-8 pb-16 md:pt-12 md:pb-24'>
        <Button
          href='/projects'
          variant='tertiary'
          size='md'
          iconLeading={ArrowLeft}
          className='-ml-3 self-start'
        >
          All projects
        </Button>

        <header className='flex max-w-3xl flex-col gap-4'>
          <div className='flex flex-wrap items-center gap-2'>
            <StatusBadge status={project.status} />
            {project.tags.map((tag) => (
              <Badge key={tag} size='sm'>
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className='text-2xl font-semibold text-primary md:text-3xl'>{project.title}</h1>
          <p className='text-lg text-tertiary md:text-xl'>{project.summary}</p>
        </header>

        <div className='flex max-w-3xl flex-col gap-8'>
          <Section id='context' title='Context'>
            <p className='text-md text-tertiary'>{detail.context}</p>
          </Section>

          <Section id='built' title='What I built'>
            <BulletList items={detail.built} />
          </Section>

          <Section id='decisions' title='Decisions'>
            <BulletList items={detail.decisions} />
          </Section>

          <Section id='tested' title='What I tested'>
            <BulletList items={detail.tested} />
          </Section>

          <Section id='stack' title='Stack'>
            <ul className='flex flex-wrap gap-2'>
              {project.stack.map((item) => (
                <li key={item}>
                  <Badge size='md' color='brand'>
                    {item}
                  </Badge>
                </li>
              ))}
            </ul>
          </Section>

          <Section id='next' title='What I would do next'>
            <BulletList items={detail.next} />
          </Section>

          {detail.outcome && (
            <Section id='outcome' title='Outcome'>
              <p className='text-md text-tertiary'>{detail.outcome}</p>
            </Section>
          )}

          <Section id='links' title='Links'>
            {links.length > 0 ? (
              <ul className='flex flex-col gap-3'>
                {links.map((link) => (
                  <li key={link.label} className='flex flex-wrap items-center gap-2'>
                    {link.href ? (
                      <Button
                        href={link.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        variant='tertiary'
                        size='md'
                        iconTrailing={ArrowUpRight}
                      >
                        {link.label}
                      </Button>
                    ) : (
                      <Button isDisabled variant='tertiary' size='md'>
                        {link.label}
                      </Button>
                    )}
                    {link.planned && <Badge size='sm'>Not deployed yet</Badge>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-md text-tertiary'>The repository isn't public yet.</p>
            )}
          </Section>

          {screenshots.length > 0 && (
            <Section id='screenshots' title='Screenshots'>
              <ul className='grid gap-6 sm:grid-cols-2'>
                {screenshots.map((shot) => (
                  <li key={shot.alt}>
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      width={640}
                      height={400}
                      loading='lazy'
                      className='h-auto w-full rounded-lg bg-secondary ring-1 ring-default'
                    />
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </div>
    </>
  );
}
