import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderRoute, runAxe } from '@/test/render-route';

describe('Project detail page', () => {
  it('renders the case-study sections', async () => {
    const { heading } = await renderRoute('/projects/ui');

    expect(heading).toHaveTextContent('Component Library');
    for (const section of [
      'Context',
      'What I built',
      'Decisions',
      'What I tested',
      'Stack',
      'What I would do next',
      'Links',
    ]) {
      expect(screen.getByRole('heading', { level: 2, name: section })).toBeInTheDocument();
    }
    expect(screen.getByRole('link', { name: /Source on GitHub/ })).toHaveAttribute(
      'href',
      'https://github.com/eylulg/ui',
    );
  });

  it('has no Outcome section until something is measured, and no screenshots section while they are placeholders', async () => {
    await renderRoute('/projects/review-companion');

    expect(screen.queryByRole('heading', { name: 'Outcome' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Screenshots' })).not.toBeInTheDocument();
  });

  it('shows Live site as a disabled control with the planned badge while the project has no url', async () => {
    await renderRoute('/projects/workspace');

    expect(screen.queryByRole('link', { name: /Live site/ })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Live site' })).toBeDisabled();
    expect(screen.getByText('Not deployed yet')).toBeInTheDocument();
  });

  it('has no live link for a project that runs inside Word', async () => {
    await renderRoute('/projects/plain-language-word-addin');

    expect(screen.queryByRole('link', { name: /Live site/ })).not.toBeInTheDocument();
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
