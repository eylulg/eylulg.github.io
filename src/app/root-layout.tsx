import { useEffect, useRef } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { trackPageView } from "@/lib/analytics";
import { RouteProvider } from "@/providers/router-provider";

export function RootLayout() {
    const { pathname } = useLocation();
    const mainRef = useRef<HTMLElement>(null);
    const previousPath = useRef(pathname);

    useEffect(() => {
        trackPageView(pathname);
        // After client-side navigation, move focus to the new page so screen readers announce it.
        if (previousPath.current !== pathname) {
            previousPath.current = pathname;
            mainRef.current?.focus({ preventScroll: true });
        }
    }, [pathname]);

    return (
        <RouteProvider>
            <div className="flex min-h-dvh flex-col bg-primary">
                <a
                    href="#main"
                    className="sr-only rounded-lg bg-brand-solid px-4 py-2 text-sm font-semibold text-white outline-focus-ring focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                    Skip to content
                </a>
                <SiteHeader />
                <main id="main" ref={mainRef} tabIndex={-1} className="flex-1 outline-hidden">
                    <Outlet />
                </main>
                <SiteFooter />
            </div>
            <ScrollRestoration />
        </RouteProvider>
    );
}

export function RouteFallback() {
    return (
        <div role="status" className="flex min-h-dvh items-center justify-center bg-primary text-sm text-tertiary">
            Loading…
        </div>
    );
}
