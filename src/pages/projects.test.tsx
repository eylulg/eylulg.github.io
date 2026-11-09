import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { renderRoute, runAxe } from "@/test/render-route";

const cardTitles = () =>
    within(screen.getByRole("main"))
        .queryAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent);

describe("Projects page", () => {
    it("lists every project with its status", async () => {
        const { heading } = await renderRoute("/projects");

        expect(heading).toHaveTextContent("Projects");
        expect(cardTitles()).toEqual(projects.map((project) => project.title));
        expect(screen.getByRole("status")).toHaveTextContent(`${projects.length} projects`);
    });

    it("filters by tag chip and keeps the filter in the URL", async () => {
        const user = userEvent.setup();
        const { router } = await renderRoute("/projects");

        await user.click(screen.getByRole("row", { name: "Vue" }));

        expect(cardTitles()).toEqual(["Sudoku in Vue 3"]);
        expect(router.state.location.search).toBe("?tag=vue");
    });

    it("explains the empty Microsoft 365 filter", async () => {
        await renderRoute("/projects?tag=microsoft-365");

        expect(cardTitles()).toEqual([]);
        expect(screen.getByText(/Word and Outlook add-ins/)).toBeInTheDocument();
    });

    it("filters by search text", async () => {
        const user = userEvent.setup();
        await renderRoute("/projects");

        await user.type(screen.getByRole("searchbox", { name: /Search projects/ }), "tmdb");

        expect(cardTitles()).toEqual(["Streaming catalogue"]);
    });

    it("has no axe violations", async () => {
        const { container } = await renderRoute("/projects");
        expect(await runAxe(container)).toHaveNoViolations();
    });
});
