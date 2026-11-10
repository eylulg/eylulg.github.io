/// <reference types="vitest/config" />
import { themeInitScript } from "@eylulg/ui/theme-script";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
    // The repository is eylulg.github.io, a GitHub Pages user site served from the domain root.
    base: "/",
    plugins: [
        react(),
        tailwindcss(),
        {
            name: "theme-init",
            transformIndexHtml: () => [{ tag: "script", children: themeInitScript, injectTo: "head-prepend" }],
        },
    ],
    resolve: {
        // The linked library has its own node_modules; pin React to this app's copy so there is only one.
        alias: [
            {
                find: /^(react|react-dom|lucide-react|react-aria-components)(\/.*)?$/,
                replacement: `${fileURLToPath(new URL("./node_modules", import.meta.url))}/$1$2`,
            },
            { find: "@", replacement: fileURLToPath(new URL("./src", import.meta.url)) },
        ],
    },
    test: {
        environment: "jsdom",
        setupFiles: ["./src/test/setup.ts"],
        include: ["src/**/*.test.{ts,tsx}"],
        css: false,
        restoreMocks: true,
        // The linked library has its own node_modules; inline dependencies so they share this app's single copy of React.
        server: { deps: { inline: true } },
    },
});
