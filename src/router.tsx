import type { ComponentType } from "react";
import type { RouteObject } from "react-router";
import { RootLayout, RouteFallback } from "@/app/root-layout";

type PageModule = { default: ComponentType };

/** Every page is its own lazy-loaded chunk. */
const page = (load: () => Promise<PageModule>): Pick<RouteObject, "lazy"> => ({
    lazy: async () => ({ Component: (await load()).default }),
});

export const routes: RouteObject[] = [
    {
        path: "/",
        Component: RootLayout,
        HydrateFallback: RouteFallback,
        children: [
            { index: true, ...page(() => import("@/pages/home")) },
            { path: "projects", ...page(() => import("@/pages/projects")) },
            { path: "projects/:slug", ...page(() => import("@/pages/project-detail")) },
            { path: "experience", ...page(() => import("@/pages/experience")) },
            { path: "principles", ...page(() => import("@/pages/principles")) },
            { path: "agents", ...page(() => import("@/pages/agents")) },
            { path: "contact", ...page(() => import("@/pages/contact")) },
            { path: "*", ...page(() => import("@/pages/not-found")) },
        ],
    },
];
