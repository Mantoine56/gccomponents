// Import polyfills
import './polyfills';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { initGcdsComponents } from './app/gcds-registry';

// Import Noto Sans and Lato fonts from Google Fonts programmatically if needed
const loadFonts = () => {
  // Fonts are already loaded via index.html
  // This function is a placeholder for any future font-loading logic
};

/**
 * Initialize GCDS components before bootstrapping the application
 */
initGcdsComponents();
loadFonts();

/**
 * Log the start of the application for debugging
 */
console.log('Starting Angular application with GCDS components...');

/**
 * Bootstrap the application with the root component and configuration
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => {
    console.error('Application bootstrap failed:', err);
  });
