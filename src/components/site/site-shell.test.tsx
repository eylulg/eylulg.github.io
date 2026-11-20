import { projects as familyProjects } from '@eylulg/ui/projects';
import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderRoute } from '@/test/render-route';

describe('Site shell', () => {
  it('has a skip link, landmarks and marks the current page in the nav', async () => {
    await renderRoute('/experience');

    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main');
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Experience', current: 'page' })).toBeInTheDocument();
  });

  it('names the site Eylül in the header', async () => {
    await renderRoute('/');

    expect(
      within(screen.getByRole('banner')).getByRole('link', { name: /^Eylül/ }),
    ).toHaveAttribute('href', '/');
  });

  it('lists every project in the footer', async () => {
    await renderRoute('/');

    const repositories = within(screen.getByRole('list', { name: 'Code' }));
    expect(repositories.getAllByRole('link')).toHaveLength(familyProjects.length);
  });
});
