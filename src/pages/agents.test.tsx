import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderRoute, runAxe } from "@/test/render-route";

describe("AI agents page", () => {
    it("shows the flow diagram with both approval gates", async () => {
        const { heading } = await renderRoute("/agents");

        expect(heading).toHaveTextContent("AI agents");
        const diagram = screen.getByRole("img", { name: /Ticket-to-pull-request flow/ });
        expect(diagram).toHaveAccessibleDescription(
            /Ticket, then Plan, then Approval gate, then Implement, then CI fix loop, then Review replies, then Approval gate, then Ready for review/,
        );
    });

    it("links to the three agent case studies and the page about how this site was built", async () => {
        await renderRoute("/agents");

        const main = within(screen.getByRole("main"));
        expect(main.getByRole("link", { name: /Agent control room/ })).toHaveAttribute("href", "/projects/agent-control-room");
        expect(main.getByRole("link", { name: /Review Companion/ })).toHaveAttribute("href", "/projects/review-companion");
        expect(main.getByRole("link", { name: /Assistant Studio/ })).toHaveAttribute("href", "/projects/assistant-studio");
        expect(main.getByRole("link", { name: /How this portfolio was built/ })).toHaveAttribute("href", "/how-this-was-built");
    });

    it("switches detail tabs", async () => {
        const user = userEvent.setup();
        await renderRoute("/agents");

        expect(screen.getByRole("tabpanel")).toHaveTextContent("watches the places where tickets and reviews arrive");
        await user.click(screen.getByRole("tab", { name: "Guardrails" }));
        expect(screen.getByRole("tabpanel")).toHaveTextContent("never posts under the owner's name without approval");
    });

    it("has no axe violations", async () => {
        const { container } = await renderRoute("/agents");
        expect(await runAxe(container)).toHaveNoViolations();
    });
});
