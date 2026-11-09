import { useRef, useState } from "react";
import { Button as AriaButton, Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";
import { Link, NavLink, useLocation } from "react-router";
import { site } from "@/content/site";
import { cx } from "@/utils/cx";
import { Container } from "./container";
import { navItems } from "./nav-items";
import { ThemeToggle } from "./theme-toggle";

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
    cx(
        "flex items-center rounded-lg px-2 py-1 text-md font-semibold outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
        isActive ? "text-brand-secondary" : "text-secondary hover:text-secondary_hover",
    );

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    cx(
        "flex items-center px-4 py-3 text-md font-semibold outline-focus-ring hover:bg-primary_hover focus-visible:outline-2 focus-visible:-outline-offset-2",
        isActive ? "text-brand-secondary" : "text-primary",
    );

/** Adapted from the Untitled UI marketing header navigation. */
export function SiteHeader() {
    const headerRef = useRef<HTMLElement>(null);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const { pathname } = useLocation();
    const [menuPath, setMenuPath] = useState(pathname);

    // Close the mobile menu whenever the route changes.
    if (menuPath !== pathname) {
        setMenuPath(pathname);
        setMenuOpen(false);
    }

    return (
        <header ref={headerRef} className="relative z-20 border-b border-secondary bg-primary">
            <Container className="flex h-16 items-center justify-between gap-4 md:h-18">
                <Link
                    to="/"
                    className="rounded-md text-lg font-semibold text-primary outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                    {site.name}
                </Link>

                <nav aria-label="Main" className="max-lg:hidden">
                    <ul className="flex items-center gap-1">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <NavLink to={item.href} className={desktopLinkClass}>
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-3">
                    <ThemeToggle />

                    <AriaDialogTrigger isOpen={isMenuOpen} onOpenChange={setMenuOpen}>
                        <AriaButton
                            aria-label="Menu"
                            className={({ isFocusVisible, isHovered }) =>
                                cx(
                                    "group cursor-pointer rounded-lg p-2 lg:hidden",
                                    isHovered && "bg-primary_hover",
                                    isFocusVisible && "outline-2 outline-offset-2 outline-focus-ring",
                                )
                            }
                        >
                            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path
                                    className="hidden text-secondary group-aria-expanded:block"
                                    d="M18 6L6 18M6 6L18 18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    className="text-secondary group-aria-expanded:hidden"
                                    d="M3 12H21M3 6H21M3 18H21"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </AriaButton>
                        <AriaPopover triggerRef={headerRef} className="w-full lg:hidden" offset={0} containerPadding={0} placement="bottom">
                            <AriaDialog aria-label="Menu" className="outline-hidden">
                                <nav aria-label="Main" className="w-full border-b border-secondary bg-primary shadow-lg">
                                    <ul className="flex flex-col gap-0.5 py-3">
                                        {navItems.map((item) => (
                                            <li key={item.href}>
                                                <NavLink to={item.href} className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
                                                    {item.label}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </AriaDialog>
                        </AriaPopover>
                    </AriaDialogTrigger>
                </div>
            </Container>
        </header>
    );
}
