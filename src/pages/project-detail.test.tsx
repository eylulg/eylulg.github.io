import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderRoute, runAxe } from '@/test/render-route';

describe('Project detail page', () => {
  it('links the live app and the source from the hero', async () => {
    await renderRoute('/projects/workspace');

    expect(screen.getByRole('link', { name: /Open the live app/ })).toHaveAttribute(
      'href',
      'https://eg-workspace.vercel.app/',
    );
    expect(screen.getByRole('link', { name: /Source on GitHub/ })).toHaveAttribute(
      'href',
      'https://github.com/eylulg/workspace',
    );
  });

  it('summarises the project in the at a glance aside', async () => {
    await renderRoute('/projects/workspace');

    const aside = screen.getByRole('complementary', { name: 'At a glance' });

    expect(within(aside).getByText('Built alone, design and code')).toBeInTheDocument();
    expect(within(aside).getByRole('list', { name: 'Stack' })).toHaveTextContent('Drizzle ORM');
    expect(within(aside).getByRole('link', { name: /Repository/ })).toHaveAttribute(
      'href',
      'https://github.com/eylulg/workspace',
    );
  });

  it('links to the previous and next project', async () => {
    await renderRoute('/projects/workspace');

    const pager = screen.getByRole('navigation', { name: 'More projects' });

    expect(within(pager).getByRole('link', { name: /Component Library/ })).toHaveAttribute(
      'href',
      '/projects/ui',
    );
    expect(within(pager).getAllByRole('link')).toHaveLength(2);
  });

  it('shows the 404 page for an unknown slug', async () => {
    const { heading } = await renderRoute('/projects/does-not-exist');
    expect(heading).toHaveTextContent('Page not found');
  });

  it('has no axe violations', async () => {
    const { container } = await renderRoute('/projects/tokens-to-tailwind');
    expect(await runAxe(container)).toHaveNoViolations();
  });
});
