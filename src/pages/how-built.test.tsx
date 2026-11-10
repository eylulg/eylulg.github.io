import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { builtSections } from "@/content/how-built";
import { renderRoute, runAxe } from "@/test/render-route";

describe("How this portfolio was built page", () => {
    it("lists the workflow, who decided what, what went wrong and what comes next", async () => {
        const { heading } = await renderRoute("/how-this-was-built");

        expect(heading).toHaveTextContent("How this portfolio was built");
        for (const section of builtSections) {
            expect(screen.getByRole("heading", { level: 2, name: section.title })).toBeInTheDocument();
        }
    });

    it("has no axe violations", async () => {
        const { container } = await renderRoute("/how-this-was-built");
        expect(await runAxe(container)).toHaveNoViolations();
    });
});
