import { type ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { readStorage, writeStorage } from "@/lib/storage";

export type ResolvedTheme = "light" | "dark";
export type ThemePreference = ResolvedTheme | "system";

/** Must match the key read by the inline script in index.html. */
export const THEME_STORAGE_KEY = "theme";
const DARK_MODE_CLASS = "dark-mode";
const DARK_QUERY = "(prefers-color-scheme: dark)";

interface ThemeContextValue {
    preference: ThemePreference;
    theme: ResolvedTheme;
    setTheme: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

function readStoredPreference(): ThemePreference {
    const stored = readStorage(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
}

function systemPrefersDark(): boolean {
    return typeof window.matchMedia === "function" && window.matchMedia(DARK_QUERY).matches;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [preference, setPreference] = useState<ThemePreference>(readStoredPreference);
    const [systemDark, setSystemDark] = useState(systemPrefersDark);

    useEffect(() => {
        if (typeof window.matchMedia !== "function") return;
        const query = window.matchMedia(DARK_QUERY);
        const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);
        query.addEventListener("change", onChange);
        return () => query.removeEventListener("change", onChange);
    }, []);

    const theme: ResolvedTheme = preference === "system" ? (systemDark ? "dark" : "light") : preference;

    useEffect(() => {
        document.documentElement.classList.toggle(DARK_MODE_CLASS, theme === "dark");
    }, [theme]);

    const setTheme = useCallback((next: ThemePreference) => {
        setPreference(next);
        writeStorage(THEME_STORAGE_KEY, next === "system" ? null : next);
    }, []);

    const value = useMemo(() => ({ preference, theme, setTheme }), [preference, theme, setTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
