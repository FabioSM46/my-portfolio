/**
 * Hero Section
 * Pure 3D geospatial globe showcase
 * Demonstrates geospatial and 3D skills through visual showcase
 */

import { Suspense, lazy } from 'react';

const GeospatialGlobe = lazy(() => import('@/components/3d/GeospatialGlobe'));

export default function Hero() {
  return (
    <section id="hero" className="relative flex h-full items-center justify-center overflow-hidden">
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-32 animate-pulse rounded-full bg-primary/20" />
          </div>
        }
      >
        <GeospatialGlobe />
      </Suspense>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none z-[5]" />
    </section>
  );
}
