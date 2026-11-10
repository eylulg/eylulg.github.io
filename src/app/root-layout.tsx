import { useEffect, useRef } from "react";
import { AppShell, type LinkProps, ProjectSwitcher, SiteFooter, ThemeToggle, TopNav } from "@eylulg/ui/chrome";
import { Link, Outlet, ScrollRestoration, useLocation } from "react-router";
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

function RouterLink({ href, ...props }: LinkProps) {
    return <Link to={href} {...props} />;
}

function Nav({ pathname }: { pathname: string }) {
    const links = navItems.map((item) => ({ ...item, isCurrent: pathname === item.href || pathname.startsWith(`${item.href}/`) }));

    return (
        <TopNav
            productName={site.name}
            LinkComponent={RouterLink}
            links={links}
            actions={
                <>
                    <ProjectSwitcher currentId="portfolio" label="Switch project" />
                    <ThemeToggle />
                </>
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
            <AppShell header={<Nav pathname={pathname} />} footer={<SiteFooter currentId="portfolio" />}>
                <Outlet />
            </AppShell>
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
