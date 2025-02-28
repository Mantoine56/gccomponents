import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './features/todo/todo.component';
import { defineCustomElements } from '@cdssnc/gcds-components/loader';

/**
 * Root component of the application
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterLink, RouterLinkActive, CommonModule, TodoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Required for using web components
})
export class AppComponent {
  title = 'Angular NgRx Demo';
  
  constructor() {
    // Initialize GCDS web components
    defineCustomElements();
  }
} 