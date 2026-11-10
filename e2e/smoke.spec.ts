import { expect, test } from "@playwright/test";

const routes: Array<{ path: string; h1: string }> = [
    { path: "/", h1: "Eylül Güneş" },
    { path: "/projects", h1: "Projects" },
    { path: "/projects/workspace", h1: "Workspace" },
    { path: "/projects/review-companion", h1: "Review Companion" },
    { path: "/projects/agent-control-room", h1: "Agent control room" },
    { path: "/projects/watchlist", h1: "Watchlist" },
    { path: "/projects/tokens-to-tailwind", h1: "Tokens to Tailwind" },
    { path: "/projects/plain-language-word-addin", h1: "Plain Language Word add-in" },
    { path: "/projects/ui", h1: "Component library" },
    { path: "/projects/sudoku", h1: "Sudoku" },
    { path: "/projects/portfolio", h1: "This portfolio" },
    { path: "/experience", h1: "Experience" },
    { path: "/principles", h1: "How I work" },
    { path: "/agents", h1: "AI agents" },
    { path: "/contact", h1: "Contact" },
    { path: "/this-page-does-not-exist", h1: "Page not found" },
];

for (const { path, h1 } of routes) {
    test(`${path} renders "${h1}"`, async ({ page }) => {
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        page.on("console", (message) => {
            if (message.type() === "error") errors.push(message.text());
        });

        await page.goto(path);

        await expect(page.getByRole("heading", { level: 1 })).toHaveText(h1);
        await expect(page.getByRole("main")).toBeVisible();
        expect(errors).toEqual([]);
    });
}

test("has no horizontal scroll at 375px", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    for (const { path } of routes) {
        await page.goto(path);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, path).toBeLessThanOrEqual(0);
    }
});

test("navigates client-side and keeps external links intact", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("main").getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/eylulg");

    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "AI agents" }).click();
    await expect(page).toHaveURL(/\/agents$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("AI agents");
    await expect(page).toHaveTitle("AI agents | Eylül Güneş");
});

test("serves the CV PDF", async ({ request }) => {
    const response = await request.get("/Eylul-Gunes-CV.pdf");
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("pdf");
});
