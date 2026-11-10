import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { AppShell, type LinkProps, SiteFooter, TopNav } from "@eylulg/ui/chrome";
import { Link, type Location, Outlet, ScrollRestoration, useLocation } from "react-router";
import { site } from "@/content/site";
import { trackPageView } from "@/lib/analytics";
import { RouteProvider } from "@/providers/router-provider";

const NavActions = lazy(() => import("@/components/site/nav-actions"));

// Reserves the room of the two menus so they do not move the bar when they arrive.
const actionsPlaceholder = <div className="h-control-sm w-48" aria-hidden="true" />;

const navItems = [
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/experience" },
    { label: "How I work", href: "/principles" },
    { label: "AI agents", href: "/agents" },
    { label: "Contact", href: "/contact" },
];

/** One saved scroll position per page, so a fresh load of one page never inherits another page's offset. */
const scrollKey = (location: Location) => location.pathname;

function RouterLink({ href, ...props }: LinkProps) {
    return <Link to={href} {...props} />;
}

/** True once the page has loaded and the browser is idle, so deferred chrome never competes with the first render. */
function useAfterLoad(): boolean {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const show = () => setIsReady(true);
        const whenIdle = () => (window.requestIdleCallback ? window.requestIdleCallback(show) : window.setTimeout(show, 200));

        if (document.readyState === "complete") {
            whenIdle();
            return;
        }
        window.addEventListener("load", whenIdle, { once: true });
        return () => window.removeEventListener("load", whenIdle);
    }, []);

    return isReady;
}

function Nav({ pathname }: { pathname: string }) {
    const isReady = useAfterLoad();

    const links = navItems.map((item) => ({ ...item, isCurrent: pathname === item.href || pathname.startsWith(`${item.href}/`) }));

    return (
        <TopNav
            productName={site.name}
            LinkComponent={RouterLink}
            links={links}
            actions={
                isReady ? (
                    <Suspense fallback={actionsPlaceholder}>
                        <NavActions />
                    </Suspense>
                ) : (
                    actionsPlaceholder
                )
            }
        />
    );
}

export function RootLayout() {
    const { pathname } = useLocation();
    const previousPath = useRef(pathname);

    useEffect(() => {
        trackPageView(pathname);
        // After client-side navigation, move focus to the new page so screen readers announce it.
        if (previousPath.current !== pathname) {
            previousPath.current = pathname;
            document.getElementById("main")?.focus({ preventScroll: true });
        }
    }, [pathname]);

    return (
        <RouteProvider>
            <AppShell
                maxWidth="6xl"
                header={<Nav pathname={pathname} />}
                footer={
                    <SiteFooter currentId="portfolio">
                        <p className="text-sm text-tertiary">
                            This portfolio was built with AI agents.{" "}
                            <Link
                                to="/how-this-was-built"
                                className="rounded text-brand underline-offset-2 outline-focus hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                How this portfolio was built
                            </Link>
                        </p>
                    </SiteFooter>
                }
            >
                <Outlet />
            </AppShell>
            <ScrollRestoration getKey={scrollKey} />
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
