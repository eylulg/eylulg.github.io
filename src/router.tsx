import { type ComponentType, Suspense, lazy, useEffect, useLayoutEffect } from 'react';
import { Route, Routes, matchRoutes, useLocation, useNavigationType } from 'react-router';
import { RootLayout, RouteFallback } from '@/app/root-layout';

type PageModule = { default: ComponentType };

const scrollPositions = new Map<string, number>();

/** One saved scroll position per path: back and forward restore it, any other navigation starts at the top. */
function ScrollByPathname() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const save = () => scrollPositions.set(pathname, window.scrollY);
    window.addEventListener('scroll', save, { passive: true });
    return () => window.removeEventListener('scroll', save);
  }, [pathname]);

  useLayoutEffect(() => {
    window.scrollTo(0, navigationType === 'POP' ? (scrollPositions.get(pathname) ?? 0) : 0);
  }, [pathname, navigationType]);

  return null;
}

type Load = () => Promise<PageModule>;

/** Every page is its own lazy-loaded chunk. */
const pages: { path: string; load: Load }[] = [
  { path: '/', load: () => import('@/pages/home') },
  { path: 'projects', load: () => import('@/pages/projects') },
  { path: 'projects/:slug', load: () => import('@/pages/project-detail') },
  { path: 'experience', load: () => import('@/pages/experience') },
  { path: 'principles', load: () => import('@/pages/principles') },
  { path: 'agents', load: () => import('@/pages/agents') },
  { path: 'how-this-was-built', load: () => import('@/pages/how-built') },
  { path: 'contact', load: () => import('@/pages/contact') },
  { path: '*', load: () => import('@/pages/not-found') },
];

const loaded = new Map<Load, ComponentType>();

/** Loads the page for a path ahead of the first render. A lazy page would show the fallback first, and React keeps a fallback on screen for 300 ms. */
export async function preloadPage(pathname: string) {
  const load = matchRoutes(pages, pathname)?.[0]?.route.load;
  if (load) loaded.set(load, (await load()).default);
}

/** The scroll reset renders with the page, so it runs once the content exists. */
function page(load: Load) {
  const Page = loaded.get(load) ?? lazy(load);

  return (
    <Suspense fallback={<RouteFallback />}>
      <ScrollByPathname />
      <Page />
    </Suspense>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {pages.map(({ path, load }) => (
          <Route key={path} path={path} element={page(load)} />
        ))}
      </Route>
    </Routes>
  );
}
