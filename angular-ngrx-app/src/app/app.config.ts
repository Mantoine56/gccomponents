import { ApplicationConfig, isDevMode, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

// NgRx imports
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';

// Store configuration
import { reducers, metaReducers } from './store';
import { TodoEffects } from './store/effects/todo.effects';
import { routes } from './app.routes';

/**
 * Application configuration for standalone components
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    
    // NgRx store configuration
    provideStore(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    
    // NgRx effects configuration
    provideEffects([TodoEffects]),
    
    // NgRx dev tools (only in development mode)
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
    }),
    
    // NgRx router store
    provideRouterStore()
  ]
};
