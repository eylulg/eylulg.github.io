/**
 * Analytics hook point. Nothing is tracked yet.
 *
 * Plan: PostHog, page views only, loaded after consent. To enable it:
 *   1. npm install posthog-js
 *   2. Add VITE_POSTHOG_KEY (and VITE_POSTHOG_HOST if not the EU cloud) as build-time env vars.
 *   3. Uncomment the code below and call initAnalytics() once consent is given.
 *
 * import posthog from "posthog-js";
 *
 * export function initAnalytics() {
 *     const key = import.meta.env.VITE_POSTHOG_KEY;
 *     if (!key) return;
 *     posthog.init(key, {
 *         api_host: import.meta.env.VITE_POSTHOG_HOST ?? "https://eu.i.posthog.com",
 *         capture_pageview: false,
 *         persistence: "memory",
 *     });
 * }
 */

/** Called by the root layout on every route change. */
export function trackPageView(path: string): void {
  void path;
  // posthog.capture("$pageview", { $current_url: window.location.origin + path });
}
