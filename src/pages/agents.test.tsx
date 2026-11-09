import { screen } from "@testing-library/react";
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

    it("switches detail tabs", async () => {
        const user = userEvent.setup();
        await renderRoute("/agents");

        expect(screen.getByRole("tabpanel")).toHaveTextContent("watches Slack, Linear and GitHub");
        await user.click(screen.getByRole("tab", { name: "Guardrails" }));
        expect(screen.getByRole("tabpanel")).toHaveTextContent("never posts under the owner's name without approval");
    });

    it("has no axe violations", async () => {
        const { container } = await renderRoute("/agents");
        expect(await runAxe(container)).toHaveNoViolations();
    });
});
