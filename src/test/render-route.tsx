import { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import { type Location, MemoryRouter, useLocation } from 'react-router';
import { axe } from 'vitest-axe';
import { AppRoutes } from '@/router';

function LocationProbe({ onChange }: { onChange: (location: Location) => void }) {
  const location = useLocation();

  useEffect(() => onChange(location), [location, onChange]);

  return null;
}

/** Renders the real route tree (layout plus lazy page) at a path and waits for the page's h1. */
export async function renderRoute(path: string) {
  const current: { location?: Location } = {};
  const onLocation = (location: Location) => {
    current.location = location;
  };
  const result = render(
    <MemoryRouter initialEntries={[path]}>
      <LocationProbe onChange={onLocation} />
      <AppRoutes />
    </MemoryRouter>,
  );
  const heading = await screen.findByRole('heading', { level: 1 });
  return { ...result, heading, current };
}

/** Axe in jsdom cannot compute colour contrast; the rest of the rules run. */
export function runAxe(container: Element) {
  return axe(container, { rules: { 'color-contrast': { enabled: false } } });
}
