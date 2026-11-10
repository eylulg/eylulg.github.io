import { projects as familyProjects } from "@eylulg/ui/projects";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getProject } from "@/content/projects";
import { renderRoute, runAxe } from "@/test/render-route";

describe("Project detail page", () => {
    it("renders the case-study sections", async () => {
        const { heading } = await renderRoute("/projects/ui");

        expect(heading).toHaveTextContent("Component library");
        for (const section of ["Problem", "What I built", "Stack", "What I tested", "Outcome", "Links", "Screenshots"]) {
            expect(screen.getByRole("heading", { level: 2, name: section })).toBeInTheDocument();
        }
        expect(screen.getByRole("link", { name: /Source on GitHub/ })).toHaveAttribute("href", "https://github.com/eylulg/ui");
        expect(screen.getByText("Not deployed yet")).toBeInTheDocument();
        for (const shot of getProject("ui")!.screenshots) {
            expect(screen.getByRole("img", { name: shot.alt })).toBeInTheDocument();
        }
    });

    it("takes the planned live address from the shared project list", async () => {
        await renderRoute("/projects/workspace");

        const planned = familyProjects.find((project) => project.id === "workspace")?.plannedUrl;
        expect(screen.getByRole("link", { name: /Live site/ })).toHaveAttribute("href", planned);
        expect(screen.getByText("Not deployed yet")).toBeInTheDocument();
    });

    it("has no live link for a project that runs inside Word", async () => {
        await renderRoute("/projects/plain-language-word-addin");

        expect(screen.queryByRole("link", { name: /Live site/ })).not.toBeInTheDocument();
    });

    it("shows the 404 page for an unknown slug", async () => {
        const { heading } = await renderRoute("/projects/does-not-exist");
        expect(heading).toHaveTextContent("Page not found");
    });

    it("has no axe violations", async () => {
        const { container } = await renderRoute("/projects/tokens-to-tailwind");
        expect(await runAxe(container)).toHaveNoViolations();
    });
});
