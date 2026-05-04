'use client';
import Lenis from 'lenis';
let instance: Lenis | null = null;
export function getLenis() { return instance; }
export function setLenis(l: Lenis | null) { instance = l; }
