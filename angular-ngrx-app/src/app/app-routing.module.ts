import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Application routes
 * Define routes for different components/pages here
 */
export const routes: Routes = [];

/**
 * App Routing Module
 * Configures the application's router
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 