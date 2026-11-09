import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { featuredProjects } from "@/content/projects";
import { site } from "@/content/site";
import { renderRoute, runAxe } from "@/test/render-route";

describe("Home page", () => {
    it("shows the name, tagline, proof points, featured projects and contact actions", async () => {
        const { heading } = await renderRoute("/");

        expect(heading).toHaveTextContent(site.name);
        expect(screen.getByText(site.tagline)).toBeInTheDocument();
        for (const title of ["Product UI craft", "Design-system engineering", "AI agent engineering"]) {
            expect(screen.getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
        }
        expect(featuredProjects).toHaveLength(3);
        for (const project of featuredProjects) {
            expect(screen.getByRole("link", { name: project.title })).toHaveAttribute("href", `/projects/${project.slug}`);
        }

        const main = within(screen.getByRole("main"));
        expect(main.getByRole("link", { name: /CV \(PDF\)/ })).toHaveAttribute("href", "/Eylul-Gunes-CV.pdf");
        expect(main.getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", "https://github.com/eylulg");
        expect(main.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", "https://www.linkedin.com/in/eylul-gunes");
        expect(main.getByRole("link", { name: /Email/ })).toHaveAttribute("href", "mailto:eylulgist@gmail.com");
        expect(document.title).toBe("Eylül Güneş | Senior Frontend Developer");
    });

    it("has no axe violations", async () => {
        const { container } = await renderRoute("/");
        expect(await runAxe(container)).toHaveNoViolations();
    });
});
