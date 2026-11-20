import { useEffect, useRef } from 'react';
import { ThemeToggle } from '@eylulg/ui/chrome';

interface NavActionsProps {
  /** The menu button was pressed while this code was still loading; the menu opens once the real trigger exists. */
  shouldOpenMenu?: boolean;
}

/** The theme controls of the top bar, in one module so React Aria's menu and toggle code loads on demand. */
export default function NavActions({ shouldOpenMenu }: NavActionsProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldOpenMenu) return;
    const wrappers = rootRef.current?.querySelectorAll<HTMLElement>('[data-nav-menu]') ?? [];
    // The control is rendered once per breakpoint; only the visible one can be pressed.
    const trigger = [...wrappers]
      .find((wrapper) => wrapper.getClientRects().length > 0)
      ?.querySelector('button');
    trigger?.focus();
    trigger?.click();
  }, [shouldOpenMenu]);

  return (
    <div ref={rootRef} className='contents'>
      <div className='max-md:block md:hidden lg:block'>
        <ThemeToggle />
      </div>
      <div data-nav-menu className='hidden md:block lg:hidden'>
        <ThemeToggle compact />
      </div>
    </div>
  );
}
