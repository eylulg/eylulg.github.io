import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { site } from '@/content/site';

interface SeoProps {
  /** Page title. The site name is appended. Omit on the home page. */
  title?: string;
  description: string;
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export function formatTitle(title?: string): string {
  return title ? `${title} | ${site.name}` : `${site.name} | ${site.role}`;
}

/** Sets the document title, meta description and Open Graph tags for the current route. */
export function Seo({ title, description }: SeoProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = formatTitle(title);
    const url = new URL(pathname, site.url).toString();

    document.title = fullTitle;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertCanonical(url);
  }, [title, description, pathname]);

  return null;
}
