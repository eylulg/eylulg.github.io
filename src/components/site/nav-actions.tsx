import { useEffect, useRef } from "react";
import { ProjectSwitcher, ThemeToggle } from "@eylulg/ui/chrome";

export type NavActionTarget = "switcher" | "theme";

interface NavActionsProps {
    /** The menu the visitor pressed while this code was still loading; it opens once the real trigger exists. */
    openTarget?: NavActionTarget;
}

/** The two menus of the top bar, in one module so React Aria's menu and overlay code loads on demand. */
export default function NavActions({ openTarget }: NavActionsProps) {
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!openTarget) return;
        const wrappers = rootRef.current?.querySelectorAll<HTMLElement>(`[data-nav-action="${openTarget}"]`) ?? [];
        // Each control is rendered once per breakpoint; only the visible one can be pressed.
        const trigger = [...wrappers].find((wrapper) => wrapper.getClientRects().length > 0)?.querySelector("button");
        trigger?.focus();
        trigger?.click();
    }, [openTarget]);

    return (
        <div ref={rootRef} className="contents">
            <div data-nav-action="switcher" className="max-md:block md:hidden lg:block">
                <ProjectSwitcher currentId="portfolio" label="Switch project" />
            </div>
            <div data-nav-action="switcher" className="hidden md:block lg:hidden">
                <ProjectSwitcher currentId="portfolio" label="Switch" />
            </div>
            <div data-nav-action="theme" className="max-md:block md:hidden lg:block">
                <ThemeToggle />
            </div>
            <div data-nav-action="theme" className="hidden md:block lg:hidden">
                <ThemeToggle compact />
            </div>
        </div>
    );
}
