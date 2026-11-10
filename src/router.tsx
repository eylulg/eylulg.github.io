import { type ComponentType, Suspense, lazy, useEffect, useLayoutEffect } from "react";
import { Route, Routes, useLocation, useNavigationType } from "react-router";
import { RootLayout, RouteFallback } from "@/app/root-layout";

type PageModule = { default: ComponentType };

const scrollPositions = new Map<string, number>();

/** One saved scroll position per path: back and forward restore it, any other navigation starts at the top. */
function ScrollByPathname() {
    const { pathname } = useLocation();
    const navigationType = useNavigationType();

    useEffect(() => {
        const save = () => scrollPositions.set(pathname, window.scrollY);
        window.addEventListener("scroll", save, { passive: true });
        return () => window.removeEventListener("scroll", save);
    }, [pathname]);

    useLayoutEffect(() => {
        window.scrollTo(0, navigationType === "POP" ? (scrollPositions.get(pathname) ?? 0) : 0);
    }, [pathname, navigationType]);

    return null;
}

/** Every page is its own lazy-loaded chunk. The scroll reset renders with the page, so it runs once the content exists. */
function page(load: () => Promise<PageModule>) {
    const Page = lazy(load);

    return (
        <Suspense fallback={<RouteFallback />}>
            <ScrollByPathname />
            <Page />
        </Suspense>
    );
}

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route index element={page(() => import("@/pages/home"))} />
                <Route path="projects" element={page(() => import("@/pages/projects"))} />
                <Route path="projects/:slug" element={page(() => import("@/pages/project-detail"))} />
                <Route path="experience" element={page(() => import("@/pages/experience"))} />
                <Route path="principles" element={page(() => import("@/pages/principles"))} />
                <Route path="agents" element={page(() => import("@/pages/agents"))} />
                <Route path="how-this-was-built" element={page(() => import("@/pages/how-built"))} />
                <Route path="contact" element={page(() => import("@/pages/contact"))} />
                <Route path="*" element={page(() => import("@/pages/not-found"))} />
            </Route>
        </Routes>
    );
}
