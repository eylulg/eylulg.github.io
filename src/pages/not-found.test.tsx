import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderRoute, runAxe } from "@/test/render-route";

describe("404 page", () => {
    it("renders for unknown routes with a way home", async () => {
        const { heading } = await renderRoute("/no-such-page");

        expect(heading).toHaveTextContent("Page not found");
        expect(screen.getByRole("link", { name: /Back to home/ })).toHaveAttribute("href", "/");
        expect(document.title).toBe("Page not found | Eylül Güneş");
    });

    it("has no axe violations", async () => {
        const { container } = await renderRoute("/no-such-page");
        expect(await runAxe(container)).toHaveNoViolations();
    });
});
