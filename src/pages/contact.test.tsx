import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderRoute, runAxe } from "@/test/render-route";

describe("Contact page", () => {
    it("shows contact details, languages and location", async () => {
        const { heading } = await renderRoute("/contact");

        expect(heading).toHaveTextContent("Contact");
        expect(screen.getByRole("link", { name: "eylulgist@gmail.com" })).toHaveAttribute("href", "mailto:eylulgist@gmail.com");
        expect(screen.getByRole("link", { name: "linkedin.com/in/eylul-gunes" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "github.com/eylulg" })).toBeInTheDocument();
        for (const language of ["Turkish", "English", "German"]) {
            expect(screen.getByText(language)).toBeInTheDocument();
        }
        expect(screen.getByText(/Türkiye\. Open to remote work\./)).toBeInTheDocument();
    });

    it("has no axe violations", async () => {
        const { container } = await renderRoute("/contact");
        expect(await runAxe(container)).toHaveNoViolations();
    });
});
