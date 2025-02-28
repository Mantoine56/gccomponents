import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Canada.ca styled page component
 * Implements the Government of Canada web design system
 */
@Component({
  selector: 'app-canada-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './canada-page.component.html',
  styleUrls: ['./canada-page.component.scss']
})
export class CanadaPageComponent {
  // Current date for the footer
  currentDate = new Date();
  
  // Sample search placeholder
  searchPlaceholder = 'Search Canada.ca';
}
