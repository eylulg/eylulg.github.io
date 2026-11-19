import { variantNames, variants } from '@eylulg/ui/themes';
import { Link } from 'react-router';

const SCALE_STEPS = ['200', '400', '500', '600', '800'] as const;

/** The nine theme variants of the component library, each as a short slice of its brand scale. */
export function VariantsStrip() {
  return (
    <figure className='flex flex-col gap-3'>
      <ul
        aria-label='Theme variants of the component library'
        className='grid grid-cols-3 gap-x-4 gap-y-3 sm:grid-cols-5 lg:grid-cols-9'
      >
        {variantNames.map((name) => (
          <li key={name} className='flex flex-col gap-1.5'>
            <span
              aria-hidden='true'
              className='flex h-8 overflow-hidden rounded-md ring-1 ring-default ring-inset'
            >
              {SCALE_STEPS.map((step) => (
                <span
                  key={step}
                  className='flex-1'
                  style={{ backgroundColor: variants[name].colors.brand[step] }}
                />
              ))}
            </span>
            <span className='truncate text-xs font-medium text-tertiary'>{name}</span>
          </li>
        ))}
      </ul>
      <figcaption className='text-sm text-tertiary'>
        Nine theme variants of one token set, from my{' '}
        <Link
          to='/projects/ui'
          className='rounded text-brand underline-offset-2 outline-focus hover:underline focus-visible:outline-2 focus-visible:outline-offset-2'
        >
          component library
        </Link>
        . Each one passes the same contrast check.
      </figcaption>
    </figure>
  );
}
