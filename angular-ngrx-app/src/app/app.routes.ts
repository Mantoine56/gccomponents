import { Routes } from '@angular/router';
import { TodoComponent } from './features/todo/todo.component';
import { CanadaPageComponent } from './features/canada-page/canada-page.component';
import { QuestionnaireComponent } from './features/questionnaire/questionnaire.component';
import { GcdsDemoComponent } from './features/gcds-demo/gcds-demo.component';

/**
 * Application routes
 * Define routes for different components/pages here
 */
export const routes: Routes = [
  { path: '', component: TodoComponent },
  { path: 'canada', component: CanadaPageComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'gcds-demo', component: GcdsDemoComponent },
  { path: '**', redirectTo: '' } // Redirect to home for any unknown routes
];
