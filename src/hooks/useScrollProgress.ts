/**
 * Custom hook to track scroll progress
 * Returns a value from 0 to 1 representing scroll position
 * Uses useSyncExternalStore to avoid cascading renders
 */
import { useSyncExternalStore } from 'react';

function getScrollProgress(): number {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
  return Math.min(Math.max(scrollProgress, 0), 1);
}

function subscribe(callback: () => void): () => void {
  window.addEventListener('scroll', callback, { passive: true });
  return () => window.removeEventListener('scroll', callback);
}

export function useScrollProgress() {
  return useSyncExternalStore(
    subscribe,
    getScrollProgress,
    () => 0 // Server snapshot
  );
}
