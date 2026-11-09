import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { principleGroups } from "@/content/principles";
import { renderRoute, runAxe } from "@/test/render-route";

describe("How I work page", () => {
    it("shows each principle group", async () => {
        const { heading } = await renderRoute("/principles");

        expect(heading).toHaveTextContent("How I work");
        expect(principleGroups.map((group) => group.title)).toEqual([
            "Design and UI",
            "Code",
            "Before anything leaves my machine",
            "Pull requests",
            "Reviewing",
            "Communication",
        ]);
        for (const group of principleGroups) {
            expect(screen.getByRole("heading", { level: 2, name: group.title })).toBeInTheDocument();
            expect(screen.getByRole("link", { name: group.title })).toHaveAttribute("href", `#${group.id}`);
        }
    });

    it("has no axe violations", async () => {
        const { container } = await renderRoute("/principles");
        expect(await runAxe(container)).toHaveNoViolations();
    });
});
