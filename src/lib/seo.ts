/**
 * SEO Configuration and helpers for the portfolio
 * Provides structured data, meta tags, and Open Graph configuration
 */

export const SITE_URL = 'https://fabiosdringola.pages.dev';

export function getEmail(): string {
  return ['fabio.sdringola', 'gmail.com'].join('@');
}

export interface SEOMeta {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
}

export const defaultSEO: SEOMeta = {
  title: 'Fabio Sdringola Maranga | Full-Stack Engineer',
  description:
    'Full-Stack Engineer specializing in backend, geospatial, and real-time systems. Expert in NestJS, React, PostGIS, Deck.gl, and AI agentic development.',
  keywords: [
    'Full-Stack Engineer',
    'Backend Developer',
    'Geospatial Developer',
    'React',
    'NestJS',
    'TypeScript',
    'PostGIS',
    'Deck.gl',
    'Real-time Systems',
    'AI Agentic Development',
    'Microservices',
  ],
  ogType: 'website',
  twitterCard: 'summary_large_image',
};

/**
 * Generate JSON-LD structured data for Person schema
 * Enhances search engine understanding of the portfolio owner
 */
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Fabio Sdringola Maranga',
    jobTitle: 'Full-Stack Engineer',
    description: 'Full-Stack Engineer specializing in backend, geospatial, and real-time systems',
    url: SITE_URL,
    email: getEmail(),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Perugia',
      addressRegion: 'Umbria',
      addressCountry: 'Italy',
    },
    sameAs: [
      'https://www.linkedin.com/in/fabio-sdringola-maranga/',
      'https://github.com/FabioSM46',
    ],
    knowsAbout: [
      'Full-Stack Development',
      'Backend Engineering',
      'Geospatial Systems',
      'Real-time Applications',
      'NestJS',
      'React',
      'TypeScript',
      'PostGIS',
      'AI Agentic Development',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'EagleProjects',
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'Ironhack',
        description: 'Full-Stack Web Development Bootcamp',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'University of Perugia',
        description: 'Radiology Technology',
      },
    ],
  };
}

/**
 * Generate JSON-LD structured data for WebSite schema
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Fabio Sdringola Maranga Portfolio',
    url: SITE_URL,
    description:
      'Portfolio of Fabio Sdringola Maranga, Full-Stack Engineer specializing in backend, geospatial, and real-time systems',
    author: {
      '@type': 'Person',
      name: 'Fabio Sdringola Maranga',
    },
  };
}

/**
 * Generate JSON-LD structured data for ProfessionalService
 * Highlights the services/skills offered
 */
export function generateServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Full-Stack Engineering Services',
    provider: {
      '@type': 'Person',
      name: 'Fabio Sdringola Maranga',
    },
    description:
      'Professional full-stack engineering services including backend development, geospatial systems, real-time applications, and AI agentic development',
    areaServed: 'Global',
    serviceType: [
      'Backend Development',
      'Frontend Development',
      'Geospatial Development',
      'Real-time Systems',
      'AI Integration',
    ],
  };
}
