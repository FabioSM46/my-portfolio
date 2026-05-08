/**
 * Seeded random number generator
 * Produces deterministic pseudo-random values based on seed
 * Required for React component purity - no Math.random() during render
 */

export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}
