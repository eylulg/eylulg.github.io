import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { type ThemePreference, useTheme } from '@eylulg/ui/chrome';
import { ChevronDown, LayoutGrid, Monitor, Moon, Sun } from 'lucide-react';
import type { NavActionTarget } from '@/components/site/nav-actions';
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

// The classes mirror the library's tertiary Button and ThemeToggle, so the real controls replace these without a shift.
const focusStyles =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus';
const switcherButton = `relative inline-flex h-control-sm cursor-pointer items-center justify-center gap-1.5 rounded-md bg-transparent px-3 text-sm font-semibold whitespace-nowrap text-secondary transition-colors select-none hover:bg-hover hover:text-primary active:bg-tertiary ${focusStyles}`;
const compactButton = `relative inline-flex size-control-md cursor-pointer items-center justify-center rounded-md bg-transparent p-0 font-semibold text-secondary transition-colors select-none hover:bg-hover hover:text-primary active:bg-tertiary ${focusStyles}`;
const themeGroup =
  'inline-flex items-center gap-0.5 rounded-md border border-default bg-primary p-0.5';
const themeButton = `inline-flex size-control-xs min-h-6 min-w-6 cursor-pointer items-center justify-center rounded-sm text-fg-tertiary transition-colors hover:bg-hover hover:text-fg-secondary aria-checked:bg-tertiary aria-checked:text-fg-primary ${focusStyles}`;

interface PlaceholderProps {
  onOpen: (target: NavActionTarget) => void;
}

/** A native button that looks and is labelled like the project switcher, and loads the real menu when pressed. */
function SwitcherPlaceholder({ label, onOpen }: PlaceholderProps & { label: string }) {
  const handleClick = () => onOpen('switcher');

  return (
    <button
      type='button'
      aria-haspopup='menu'
      aria-expanded='false'
      className={switcherButton}
      onClick={handleClick}
    >
      <LayoutGrid aria-hidden='true' className='size-4 shrink-0' />
      {label}
      <ChevronDown aria-hidden='true' className='size-4 shrink-0' />
    </button>
  );
}

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

function ThemeMenuPlaceholder({ onOpen }: PlaceholderProps) {
  const { theme } = useTheme();
  const Icon = themeChoices.find((choice) => choice.id === theme)?.icon ?? Monitor;
  const handleClick = () => onOpen('theme');

  return (
    <button
      type='button'
      aria-haspopup='menu'
      aria-expanded='false'
      aria-label='Colour theme'
      className={compactButton}
      onClick={handleClick}
    >
      <Icon aria-hidden='true' className='size-5' />
    </button>
  );
}

function Placeholders({ onOpen }: PlaceholderProps) {
  return (
    <>
      <div className='max-md:block md:hidden lg:block'>
        <SwitcherPlaceholder label='Switch project' onOpen={onOpen} />
      </div>
      <div className='hidden md:block lg:hidden'>
        <SwitcherPlaceholder label='Switch' onOpen={onOpen} />
      </div>
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
 * The project switcher and theme toggle. The first paint has native buttons that work at once: the theme switch
 * changes the theme, the menu buttons load the menu code and open the menu. The real controls take their place
 * when the browser is idle, or when a menu button is pressed.
 */
export function NavActionsShell() {
  const [isUpgraded, setIsUpgraded] = useState(isChunkLoaded);
  const [openTarget, setOpenTarget] = useState<NavActionTarget>();
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

  const handleOpen = (target: NavActionTarget) => {
    setOpenTarget(target);
    setIsUpgraded(true);
  };

  const placeholders = <Placeholders onOpen={handleOpen} />;

  return (
    <div ref={rootRef} className='contents'>
      {isUpgraded ? (
        <Suspense fallback={placeholders}>
          <NavActions openTarget={openTarget} />
        </Suspense>
      ) : (
        placeholders
      )}
    </div>
  );
}
