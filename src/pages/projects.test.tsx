import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { renderRoute, runAxe } from "@/test/render-route";

const cardTitles = () =>
    within(screen.getByRole("main"))
        .queryAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent);

describe("Projects page", () => {
    it("lists every project with its status", async () => {
        const { heading } = await renderRoute("/projects");

        expect(heading).toHaveTextContent("Projects");
        expect(cardTitles()).toEqual(projects.map((project) => project.title));
        expect(screen.getByRole("heading", { level: 2, name: "Smaller projects" })).toBeInTheDocument();
        expect(screen.getByRole("status")).toHaveTextContent(`${projects.length} projects`);
    });

    it("lists the smaller projects after the main ones", async () => {
        await renderRoute("/projects");

        expect(cardTitles().slice(-2)).toEqual(["Agent control room", "Sudoku"]);
    });

    it("filters by tag chip and keeps the filter in the URL", async () => {
        const user = userEvent.setup();
        const { current } = await renderRoute("/projects");

        await user.click(screen.getByRole("row", { name: "Vue" }));

        expect(cardTitles()).toEqual(["Sudoku"]);
        expect(current.location?.search).toBe("?tag=vue");
    });

    it("reads the tag filter from the URL", async () => {
        await renderRoute("/projects?tag=microsoft-365");

        expect(cardTitles()).toEqual(["Plain Language Word add-in"]);
    });

    it("says when nothing matches", async () => {
        const user = userEvent.setup();
        await renderRoute("/projects");

        await user.type(screen.getByRole("searchbox", { name: /Search projects/ }), "zzzz");

        expect(screen.getByText(/No projects match/)).toBeInTheDocument();
    });

    it("filters by search text", async () => {
        const user = userEvent.setup();
        await renderRoute("/projects");

        await user.type(screen.getByRole("searchbox", { name: /Search projects/ }), "tmdb");

        expect(cardTitles()).toEqual(["Watchlist"]);
    });

    it("has no axe violations", async () => {
        const { container } = await renderRoute("/projects");
        expect(await runAxe(container)).toHaveNoViolations();
    });
});
