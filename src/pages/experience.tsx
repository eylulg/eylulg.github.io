import { Badge } from '@eylulg/ui/badge';
import { Button } from '@eylulg/ui/button';
import { PageHeader } from '@eylulg/ui/page-header';
import { FileDown } from 'lucide-react';
import { Seo } from '@/components/site/seo';
import { education, roles } from '@/content/experience';
import { site } from '@/content/site';
import { skillGroups } from '@/content/skills';

export default function ExperiencePage() {
  return (
    <>
      <Seo
        title='Experience'
        description='Frontend roles since 2021 in legal tech, marketing tech, healthcare, e-commerce and online learning, mostly in TypeScript, React, Next.js and Vue.'
      />
      <div className='max-w-3xl pt-6 pb-8 md:pb-12'>
        <PageHeader
          eyebrow='Career'
          title='Experience'
          description={site.about[1]}
          meta={
            <Button
              href={site.cvPath}
              target='_blank'
              rel='noopener'
              variant='secondary'
              size='md'
              iconLeading={FileDown}
            >
              Download the CV (PDF)
            </Button>
          }
        />
      </div>

      <div className='flex flex-col gap-16 pb-16 md:pb-24'>
        <section aria-labelledby='roles-title' className='flex flex-col gap-8'>
          <h2 id='roles-title' className='sr-only'>
            Roles
          </h2>
          <ol className='flex flex-col'>
            {roles.map((role) => (
              <li key={role.id} className='relative flex gap-4 pb-10 last:pb-0 md:gap-6'>
                <div aria-hidden='true' className='flex flex-col items-center'>
                  <span className='mt-1.5 size-3 shrink-0 rounded-full bg-brand-solid ring-4 ring-default' />
                  <span className='mt-2 w-0 flex-1 border-l border-subtle' />
                </div>
                <article
                  aria-labelledby={`role-${role.id}`}
                  className='flex max-w-3xl min-w-0 flex-1 flex-col gap-3'
                >
                  <div className='flex flex-col gap-1'>
                    <h3 id={`role-${role.id}`} className='text-lg font-semibold text-primary'>
                      {role.title}, {role.company}
                    </h3>
                    <p className='text-sm text-tertiary'>
                      <time dateTime={role.start}>{role.period.split(' to ')[0]}</time> to{' '}
                      <time dateTime={role.end}>{role.period.split(' to ')[1]}</time> ·{' '}
                      {role.location}
                    </p>
                  </div>
                  <p className='text-md text-secondary'>{role.summary}</p>
                  <ul className='flex list-disc flex-col gap-1.5 pl-5 text-md text-tertiary marker:text-fg-tertiary'>
                    {role.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <ul
                    aria-label={`Skills used at ${role.company}`}
                    className='flex flex-wrap gap-1.5 pt-1'
                  >
                    {role.skills.map((skill) => (
                      <li key={skill}>
                        <Badge size='sm' color='brand'>
                          {skill}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby='skills-title' className='flex flex-col gap-6'>
          <h2 id='skills-title' className='text-xl font-semibold text-primary'>
            Skills
          </h2>
          <dl className='grid gap-6 md:grid-cols-2'>
            {skillGroups.map((group) => (
              <div key={group.name} className='flex flex-col gap-2'>
                <dt className='text-sm font-semibold text-secondary'>{group.name}</dt>
                <dd>
                  <ul className='flex flex-wrap gap-1.5'>
                    {group.skills.map((skill) => (
                      <li key={skill}>
                        <Badge size='sm'>{skill}</Badge>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby='education-title' className='flex flex-col gap-6'>
          <h2 id='education-title' className='text-xl font-semibold text-primary'>
            Education
          </h2>
          <ul className='flex flex-col gap-4'>
            {education.map((item) => (
              <li key={item.school} className='flex flex-col gap-0.5'>
                <p className='text-md font-semibold text-primary'>{item.school}</p>
                <p className='text-sm text-tertiary'>
                  {item.field} · {item.period}
                  {item.note ? ` · ${item.note}` : ''}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
