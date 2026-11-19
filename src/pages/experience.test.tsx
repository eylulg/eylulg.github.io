import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { roles } from '@/content/experience';
import { renderRoute, runAxe } from '@/test/render-route';

describe('Experience page', () => {
  it('shows every role with its highlights and skills', async () => {
    const { heading } = await renderRoute('/experience');

    expect(heading).toHaveTextContent('Experience');
    for (const role of roles) {
      const article = screen.getByRole('article', { name: `${role.title}, ${role.company}` });
      expect(within(article).getByText(role.summary)).toBeInTheDocument();
      expect(within(article).getAllByRole('listitem').length).toBeGreaterThanOrEqual(
        role.highlights.length + role.skills.length,
      );
      expect(
        within(article).getByRole('list', { name: `Skills used at ${role.company}` }),
      ).toBeInTheDocument();
    }
  });

  it('has no axe violations', async () => {
    const { container } = await renderRoute('/experience');
    expect(await runAxe(container)).toHaveNoViolations();
  });
});
