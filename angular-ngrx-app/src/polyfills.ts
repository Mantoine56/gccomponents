/**
 * Polyfills for Angular application
 * This file includes polyfills needed by Angular and is loaded before the app.
 */

// Zone.js is required by Angular itself
import 'zone.js';

// Web Components polyfills
(window as any).global = window;

// GCDS Components require these features
if (!('customElements' in window)) {
  console.warn('Custom Elements not supported');
}

if (!('attachShadow' in Element.prototype)) {
  console.warn('Shadow DOM not supported');
}

// Don't directly import animations here as it's causing issues
// Angular's animations are provided in the app.config.ts file instead 