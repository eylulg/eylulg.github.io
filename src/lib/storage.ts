/**
 * localStorage can throw (private windows, blocked site data, sandboxed frames),
 * so every access goes through these helpers.
 */
export function readStorage(key: string): string | null {
    try {
        return window.localStorage.getItem(key);
    } catch {
        return null;
    }
}

export function writeStorage(key: string, value: string | null): void {
    try {
        if (value === null) {
            window.localStorage.removeItem(key);
        } else {
            window.localStorage.setItem(key, value);
        }
    } catch {
        // Storage is unavailable; the choice simply lasts for this page view.
    }
}
