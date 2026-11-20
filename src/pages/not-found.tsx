import { Button } from '@eylulg/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Seo } from '@/components/site/seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo title='Page not found' description='This page does not exist.' />
      <div className='flex flex-col gap-8 py-16 md:py-24'>
        <div className='flex max-w-3xl flex-col gap-4'>
          <p className='text-md font-semibold text-brand'>404</p>
          <h1 className='text-2xl font-semibold text-primary md:text-3xl'>Page not found</h1>
          <p className='text-lg text-tertiary md:text-xl'>This page does not exist or has moved.</p>
        </div>
        <div className='flex flex-wrap gap-3'>
          <Button href='/' size='lg' iconLeading={ArrowLeft}>
            Back to home
          </Button>
          <Button href='/projects' variant='secondary' size='lg'>
            See projects
          </Button>
        </div>
      </div>
    </>
  );
}
