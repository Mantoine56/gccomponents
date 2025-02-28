/**
 * GCDS Components Registry
 * This file ensures that GCDS components are properly registered with the browser
 */
import { defineCustomElements } from '@cdssnc/gcds-components/loader';

/**
 * Initialize GCDS components
 * This function should be called before the application starts
 * It registers all GCDS web components with the browser
 */
export function initGcdsComponents(): void {
  console.log('Initializing GCDS components...');
  
  // Check if custom elements are supported
  if (!('customElements' in window)) {
    console.warn('Custom Elements API is not supported in this browser.');
    return;
  }

  try {
    // Define all GCDS custom elements
    defineCustomElements(window);
    console.log('GCDS components initialized successfully');
  } catch (error) {
    console.error('Failed to initialize GCDS components:', error);
  }
} 