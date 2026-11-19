import { Button } from '@eylulg/ui/button';
// Every project's theme under [data-ui-variant], for the project previews and the theme picker. Only this page needs it.
import '@eylulg/ui/themes/all.css';
import { ArrowRight, FileText } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/site/contact-buttons';
import { FeaturedCard } from '@/components/site/featured-card';
import { Seo } from '@/components/site/seo';
import { ThemePicker } from '@/components/site/theme-picker';
import { featuredProjects } from '@/content/projects';
import { site } from '@/content/site';

export default function HomePage() {
  return (
    <>
      <Seo description={`${site.tagline} Portfolio, projects and experience of ${site.name}.`} />

      <section
        aria-labelledby='hero-title'
        className='grid gap-10 py-12 md:py-20 lg:grid-cols-12 lg:items-end lg:gap-6'
      >
        <div className='flex flex-col gap-6 lg:col-span-8'>
          <p className='text-md font-semibold text-brand'>{site.eyebrow}</p>
          <h1 id='hero-title' className='font-display text-display font-extrabold text-primary'>
            {site.headline}
          </h1>
          <p className='max-w-2xl text-lg text-secondary md:text-xl'>
            {site.intro} <span>{site.availability}</span>
          </p>
          <ThemePicker />
        </div>
        <ul className='grid grid-cols-2 gap-3 lg:col-span-3 lg:col-start-10'>
          <li className='col-span-2'>
            <Button
              href={site.cvPath}
              target='_blank'
              rel='noopener'
              size='lg'
              iconLeading={FileText}
              className='w-full'
            >
              Read my CV
            </Button>
          </li>
          <li>
            <Button
              href={site.links.github}
              target='_blank'
              rel='noopener noreferrer'
              variant='secondary'
              size='lg'
              iconLeading={GitHubIcon}
              className='w-full'
            >
              GitHub
            </Button>
          </li>
          <li>
            <Button
              href={site.links.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              variant='secondary'
              size='lg'
              iconLeading={LinkedInIcon}
              className='w-full'
            >
              LinkedIn
            </Button>
          </li>
        </ul>
      </section>

      <section aria-labelledby='work-title' className='flex flex-col gap-6 pb-16 md:pb-24'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <h2 id='work-title' className='font-display text-2xl font-bold text-primary'>
            Selected work
          </h2>
          <Button href='/projects' variant='tertiary' size='md' iconTrailing={ArrowRight}>
            All projects
          </Button>
        </div>
        <ul className='grid gap-5 md:grid-cols-2'>
          {featuredProjects.map((project) => (
            <li key={project.slug}>
              <FeaturedCard project={project} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
