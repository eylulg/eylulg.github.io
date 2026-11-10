import { ProjectSwitcher, ThemeToggle } from "@eylulg/ui/chrome";

/** The two menus of the top bar, in one module so React Aria's menu and overlay code loads after the first paint. */
export default function NavActions() {
    return (
        <>
            <div className="max-md:block md:hidden lg:block">
                <ProjectSwitcher currentId="portfolio" label="Switch project" />
            </div>
            <div className="hidden md:block lg:hidden">
                <ProjectSwitcher currentId="portfolio" label="Switch" />
            </div>
            <div className="max-md:block md:hidden lg:block">
                <ThemeToggle />
            </div>
            <div className="hidden md:block lg:hidden">
                <ThemeToggle compact />
            </div>
        </>
    );
}
