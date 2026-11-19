import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { featuredProjects } from '@/content/projects';
import { site } from '@/content/site';
import { renderRoute, runAxe } from '@/test/render-route';

afterEach(() => {
  delete document.documentElement.dataset.uiVariant;
});

describe('Home page', () => {
  it('shows the headline, the featured projects and the CV, GitHub and LinkedIn links', async () => {
    const { heading } = await renderRoute('/');

    const main = within(screen.getByRole('main'));
    expect(heading).toHaveTextContent(site.headline);
    expect(main.getByText(site.availability)).toBeInTheDocument();
    expect(featuredProjects.map((project) => project.slug)).toEqual([
      'ui',
      'workspace',
      'agent-control-room',
      'assistant-studio',
    ]);
    for (const project of featuredProjects) {
      expect(main.getByRole('link', { name: project.title })).toHaveAttribute(
        'href',
        `/projects/${project.slug}`,
      );
    }
    expect(main.getByRole('link', { name: /Read my CV/ })).toHaveAttribute(
      'href',
      '/Eylul-Gunes-CV.pdf',
    );
    expect(main.getByRole('link', { name: /GitHub/ })).toHaveAttribute(
      'href',
      'https://github.com/eylulg',
    );
    expect(main.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/eylul-gunes',
    );
    expect(document.title).toBe('Eylül Güneş | Senior Frontend Developer');
  });

  it('re-themes the page with the picked project theme', async () => {
    const user = userEvent.setup();
    await renderRoute('/');
    const picker = screen.getByRole('radiogroup', { name: /Pick a theme/ });

    await user.click(within(picker).getByRole('radio', { name: 'Workspace, slate blue' }));

    expect(document.documentElement).toHaveAttribute('data-ui-variant', 'workspace');
    expect(within(picker).getByRole('radio', { name: 'Workspace, slate blue' })).toBeChecked();
  });

  it('has no axe violations', async () => {
    const { container } = await renderRoute('/');
    expect(await runAxe(container)).toHaveNoViolations();
  });
});
