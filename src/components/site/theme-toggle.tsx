import { Moon01 } from "@untitledui/icons";
import { Toggle } from "@/components/base/toggle/toggle";
import { useTheme } from "@/providers/theme-provider";

/** Follows the system setting until the visitor flips it; the choice is then stored. */
export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex items-center gap-2">
            <Moon01 aria-hidden="true" className="size-4 text-fg-quaternary" />
            <Toggle aria-label="Dark mode" size="sm" isSelected={theme === "dark"} onChange={(isDark) => setTheme(isDark ? "dark" : "light")} />
        </div>
    );
}
