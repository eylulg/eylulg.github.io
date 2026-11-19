import { useEffect, useId, useState } from 'react';
import { type VariantName, variantNames, variants } from '@eylulg/ui/themes';
// The heading fonts of the other pairings. A browser downloads a face only once a picked theme uses it.
import '@fontsource-variable/inter-tight';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource-variable/newsreader';
import { type Key, ToggleButton, ToggleButtonGroup } from 'react-aria-components';

// The swatch takes its colour from its own data-ui-variant, so it shows each project's solid in light and dark.
const swatch =
  'flex size-11 cursor-pointer items-center justify-center rounded-full ring-control outline-focus transition-shadow data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-hovered:ring-1 data-selected:ring-2';
const dot = 'size-8 rounded-full bg-brand-solid';

function isVariant(key: Key | undefined): key is VariantName {
  return variantNames.some((name) => name === key);
}

/** The page keeps a picked theme across routes; the home page reads it back on return. */
function currentVariant(): VariantName {
  const current = document.documentElement.dataset.uiVariant;
  return isVariant(current) ? current : 'portfolio';
}

/**
 * One swatch per project. Picking one sets data-ui-variant on <html>, which re-themes the whole page live:
 * colour, heading font, text size and density.
 */
export function ThemePicker() {
  const labelId = useId();
  const [picked, setPicked] = useState(currentVariant);

  useEffect(() => {
    document.documentElement.dataset.uiVariant = picked;
  }, [picked]);

  function handleSelectionChange(keys: Set<Key>) {
    const [next] = keys;
    if (isVariant(next)) setPicked(next);
  }

  return (
    <div className='flex flex-col gap-3'>
      <p id={labelId} className='text-sm text-tertiary'>
        This site runs on my design system. Pick a theme:
      </p>
      <ToggleButtonGroup
        aria-labelledby={labelId}
        selectionMode='single'
        disallowEmptySelection
        selectedKeys={[picked]}
        onSelectionChange={handleSelectionChange}
        className='flex flex-wrap gap-1.5'
      >
        {variantNames.map((name) => (
          <ToggleButton
            key={name}
            id={name}
            data-ui-variant={name}
            aria-label={`${variants[name].project}, ${variants[name].seed.name.toLowerCase()}`}
            className={swatch}
          >
            <span aria-hidden='true' className={dot} />
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}
