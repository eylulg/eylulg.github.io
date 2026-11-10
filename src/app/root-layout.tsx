import { useEffect, useRef } from "react";
import { AppShell, type LinkProps, SiteFooter, TopNav } from "@eylulg/ui/chrome";
import { Link, type Location, Outlet, ScrollRestoration, useLocation } from "react-router";
import { NavActionsShell } from "@/components/site/nav-actions-shell";
import { site } from "@/content/site";
import { trackPageView } from "@/lib/analytics";
import { RouteProvider } from "@/providers/router-provider";

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

function Nav({ pathname }: { pathname: string }) {
    const links = navItems.map((item) => ({ ...item, isCurrent: pathname === item.href || pathname.startsWith(`${item.href}/`) }));

    return <TopNav productName={site.name} LinkComponent={RouterLink} links={links} actions={<NavActionsShell />} />;
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
