import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router";
import { axe } from "vitest-axe";
import { ThemeProvider } from "@/providers/theme-provider";
import { routes } from "@/router";

/** Renders the real route tree (layout plus lazy page) at a path and waits for the page's h1. */
export async function renderRoute(path: string) {
    const router = createMemoryRouter(routes, { initialEntries: [path] });
    const result = render(
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>,
    );
    const heading = await screen.findByRole("heading", { level: 1 });
    return { ...result, router, heading };
}

/** Axe in jsdom cannot compute colour contrast; the rest of the rules run. */
export function runAxe(container: Element) {
    return axe(container, { rules: { "color-contrast": { enabled: false } } });
}
