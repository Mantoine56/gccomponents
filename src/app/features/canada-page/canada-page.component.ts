import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { defineCustomElements } from '@cdssnc/gcds-components/loader';

/**
 * Canada.ca styled page component
 * Implements the Government of Canada Design System (GCDS) components
 */
@Component({
  selector: 'app-canada-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './canada-page.component.html',
  styleUrls: ['./canada-page.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Required for using web components
})
export class CanadaPageComponent {
  // Current date for the footer
  currentDate = new Date();
  
  // Sample search placeholder
  searchPlaceholder = 'Search Canada.ca';
  
  constructor() {
    // Initialize GCDS web components
    defineCustomElements();
  }
} 