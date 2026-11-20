import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { type ThemePreference, useTheme } from '@eylulg/ui/chrome';
import { Monitor, Moon, Sun } from 'lucide-react';
import type { IconComponent } from '@/types/icon';

let isChunkLoaded = false;
const NavActions = lazy(() =>
  import('@/components/site/nav-actions').then((module) => {
    isChunkLoaded = true;
    return module;
  }),
);

const themeChoices: Array<{ id: ThemePreference; label: string; icon: IconComponent }> = [
  { id: 'light', label: 'Light theme', icon: Sun },
  { id: 'dark', label: 'Dark theme', icon: Moon },
  { id: 'system', label: 'System theme', icon: Monitor },
];

// The classes mirror the library's ThemeToggle, so the real controls replace these without a shift.
const focusStyles =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus';
const compactButton = `relative inline-flex size-control-md cursor-pointer items-center justify-center rounded-md bg-transparent p-0 font-semibold text-secondary transition-colors select-none hover:bg-hover hover:text-primary active:bg-tertiary ${focusStyles}`;
const themeGroup =
  'inline-flex h-control-md items-center gap-0.5 rounded-md border border-default bg-primary p-0.5';
const themeButton = `inline-flex aspect-square h-full cursor-pointer items-center justify-center rounded-sm text-fg-tertiary transition-colors hover:bg-hover hover:text-fg-secondary aria-checked:bg-tertiary aria-checked:text-fg-primary ${focusStyles}`;

function ThemeChoiceButton({ id, label, icon: Icon }: (typeof themeChoices)[number]) {
  const { theme, setTheme } = useTheme();
  const handleClick = () => setTheme(id);

  return (
    <button
      type='button'
      role='radio'
      aria-checked={theme === id}
      aria-label={label}
      className={themeButton}
      onClick={handleClick}
    >
      <Icon aria-hidden='true' className='size-4' />
    </button>
  );
}

/** The three-way theme switch needs no menu code, so it works from the first paint. */
function ThemeGroupPlaceholder() {
  return (
    <div role='radiogroup' aria-label='Colour theme' className={themeGroup}>
      {themeChoices.map((choice) => (
        <ThemeChoiceButton key={choice.id} {...choice} />
      ))}
    </div>
  );
}

function ThemeMenuPlaceholder({ onOpen }: { onOpen: () => void }) {
  const { theme } = useTheme();
  const Icon = themeChoices.find((choice) => choice.id === theme)?.icon ?? Monitor;
  return (
    <button
      type='button'
      aria-haspopup='menu'
      aria-expanded='false'
      aria-label='Colour theme'
      className={compactButton}
      onClick={onOpen}
    >
      <Icon aria-hidden='true' className='size-5' />
    </button>
  );
}

function Placeholders({ onOpen }: { onOpen: () => void }) {
  return (
    <>
      <div className='max-md:block md:hidden lg:block'>
        <ThemeGroupPlaceholder />
      </div>
      <div className='hidden md:block lg:hidden'>
        <ThemeMenuPlaceholder onOpen={onOpen} />
      </div>
    </>
  );
}

/**
 * The theme controls. The first paint has native buttons that work at once: the theme switch changes the theme and the
 * menu button loads the menu code and opens the menu. The real controls take their place when the browser is idle, or
 * when the menu button is pressed.
 */
export function NavActionsShell() {
  const [isUpgraded, setIsUpgraded] = useState(isChunkLoaded);
  const [shouldOpenMenu, setShouldOpenMenu] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isUpgraded) return;
    const upgrade = () => {
      // Swapping the element a keyboard user is on would drop their focus.
      if (!rootRef.current?.contains(document.activeElement)) setIsUpgraded(true);
    };
    const whenIdle = () =>
      window.requestIdleCallback
        ? window.requestIdleCallback(upgrade)
        : window.setTimeout(upgrade, 200);

    if (document.readyState === 'complete') {
      whenIdle();
      return;
    }
    window.addEventListener('load', whenIdle, { once: true });
    return () => window.removeEventListener('load', whenIdle);
  }, [isUpgraded]);

  const handleOpen = () => {
    setShouldOpenMenu(true);
    setIsUpgraded(true);
  };

  const placeholders = <Placeholders onOpen={handleOpen} />;

  return (
    <div ref={rootRef} className='contents'>
      {isUpgraded ? (
        <Suspense fallback={placeholders}>
          <NavActions shouldOpenMenu={shouldOpenMenu} />
        </Suspense>
      ) : (
        placeholders
      )}
    </div>
  );
}
