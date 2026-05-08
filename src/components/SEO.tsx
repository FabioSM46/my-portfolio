import { useEffect } from 'react';
import {
  defaultSEO,
  generatePersonSchema,
  generateWebsiteSchema,
  generateServiceSchema,
  SITE_URL,
  type SEOMeta,
} from '@/lib/seo';

interface SEOProps {
  meta?: Partial<SEOMeta>;
}

/**
 * SEO Component - Injects meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
 * Follows DRY principle by centralizing all SEO logic
 * Uses useEffect for client-side meta tag injection in SPA context
 */
export default function SEO({ meta = {} }: SEOProps) {
  useEffect(() => {
    const seo = { ...defaultSEO, ...meta };
    // Update document title
    document.title = seo.title;

    // Helper to set or update meta tags
    const setMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Standard meta tags
    setMetaTag('description', seo.description);
    setMetaTag('keywords', seo.keywords.join(', '));
    setMetaTag('author', 'Fabio Sdringola Maranga');
    setMetaTag('robots', 'index, follow');
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph meta tags
    setMetaTag('og:title', seo.title, true);
    setMetaTag('og:description', seo.description, true);
    setMetaTag('og:type', seo.ogType || 'website', true);
    setMetaTag('og:url', SITE_URL, true);
    if (seo.ogImage) {
      setMetaTag('og:image', seo.ogImage, true);
    }

    // Twitter Card meta tags
    setMetaTag('twitter:card', seo.twitterCard || 'summary_large_image');
    setMetaTag('twitter:title', seo.title);
    setMetaTag('twitter:description', seo.description);
    setMetaTag('twitter:creator', '@FabioSM46');
    if (seo.ogImage) {
      setMetaTag('twitter:image', seo.ogImage);
    }

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = SITE_URL;

    // JSON-LD Structured Data
    const schemas = [generatePersonSchema(), generateWebsiteSchema(), generateServiceSchema()];

    // Remove existing schema scripts
    document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());

    // Add new schema scripts
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup on unmount
    return () => {
      document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
    };
  }, [meta]);

  return null;
}
