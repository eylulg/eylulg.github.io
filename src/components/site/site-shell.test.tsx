import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { THEME_STORAGE_KEY } from "@/providers/theme-provider";
import { renderRoute } from "@/test/render-route";

describe("Site shell", () => {
    it("has a skip link, landmarks and marks the current page in the nav", async () => {
        await renderRoute("/experience");

        expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main");
        expect(screen.getByRole("banner")).toBeInTheDocument();
        expect(screen.getByRole("main")).toHaveAttribute("id", "main");
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
        expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Experience", current: "page" })).toBeInTheDocument();
    });

    it("toggles dark mode and stores the choice", async () => {
        const user = userEvent.setup();
        await renderRoute("/");

        const toggle = screen.getByRole("switch", { name: "Dark mode" });
        expect(toggle).not.toBeChecked();

        await user.click(toggle);

        expect(toggle).toBeChecked();
        expect(document.documentElement).toHaveClass("dark-mode");
        expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    });

    it("still toggles when localStorage throws", async () => {
        vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
            throw new Error("blocked");
        });
        const user = userEvent.setup();
        await renderRoute("/");

        await user.click(screen.getByRole("switch", { name: "Dark mode" }));

        expect(document.documentElement).toHaveClass("dark-mode");
    });
});
