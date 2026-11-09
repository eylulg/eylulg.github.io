import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, expect, vi } from "vitest";
import * as axeMatchers from "vitest-axe/matchers";

expect.extend(axeMatchers);

afterEach(() => {
    cleanup();
    document.documentElement.classList.remove("dark-mode");
    try {
        window.localStorage.clear();
    } catch {
        // ignore
    }
});

// jsdom has no matchMedia; default to a light system theme.
Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: vi.fn((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;

// React Router's data router builds a fetch Request with an AbortSignal. Under jsdom the
// signal comes from jsdom while Request comes from Node (undici), which rejects it.
// Tests never abort navigations, so drop the signal.
const NodeRequest = globalThis.Request;
globalThis.Request = class extends NodeRequest {
    constructor(input: RequestInfo | URL, init?: RequestInit) {
        const { signal: _signal, ...rest } = init ?? {};
        void _signal;
        super(input, rest);
    }
} as typeof Request;
