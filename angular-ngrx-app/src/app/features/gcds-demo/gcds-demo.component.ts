import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * GCDS Demo Component
 * 
 * This component demonstrates all the GCDS components available in the system.
 * It serves as both documentation and a visual reference for developers.
 */
@Component({
  selector: 'app-gcds-demo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Required for GCDS custom elements
  templateUrl: './gcds-demo.component.html',
  styleUrls: ['./gcds-demo.component.scss']
})
export class GcdsDemoComponent implements OnInit, AfterViewInit {
  /**
   * Title of the component
   */
  title = 'GCDS Component Library';

  /**
   * Flag to control logging verbosity
   */
  private debugMode = false;

  /**
   * Component categories for organization
   */
  categories = [
    {
      name: 'Typography',
      id: 'typography',
      description: 'Text elements like headings and paragraphs'
    },
    {
      name: 'Form Controls',
      id: 'form-controls',
      description: 'Input elements for collecting user data'
    },
    {
      name: 'Navigation',
      id: 'navigation',
      description: 'Elements for user navigation'
    },
    {
      name: 'Layout',
      id: 'layout',
      description: 'Elements for page structure and organization'
    },
    {
      name: 'Feedback',
      id: 'feedback',
      description: 'Elements for displaying messages to users'
    },
    {
      name: 'Information',
      id: 'information',
      description: 'Elements for displaying various types of information'
    }
  ];

  /**
   * Toggle method for component demos
   */
  toggleCode(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.toggle('show-code');
    }
  }
  
  /**
   * Initialize component
   */
  ngOnInit(): void {
    // Pre-load any critical CSS classes that might be needed
    this.preloadCriticalStyles();
  }

  /**
   * After view initialization, ensure the details components work properly
   */
  ngAfterViewInit(): void {
    // Initialize components after view is initialized
    this.preloadCriticalStyles();
    this.addCustomFallbackStyles();
    
    // Initial component initialization
    this.initializeComponents();
    
    // Fix card elements immediately
    this.fixCardElements(true);
    
    // Use a single timeout for better performance
    setTimeout(() => {
      // Activate fallbacks for components that need them
      this.activateRadioFallback();
      
      // Fix card elements again after a delay
      this.fixCardElements(true);
    }, 500);
    
    // One final check after everything should be loaded
    setTimeout(() => {
      this.fixCardElements(true);
    }, 1000);
  }
  
  /**
   * Preload critical styles to ensure components display correctly
   * before web components are fully loaded
   */
  private preloadCriticalStyles(): void {
    // The styles will be added via the addCustomFallbackStyles method
    // But we'll add an additional class to help with component categories
    document.body.classList.add('gcds-demo-initialized');
  }

  /**
   * Initialize custom elements to ensure they render properly
   */
  private initializeComponents(): void {
    // Initialize icon elements
    const iconElements = document.querySelectorAll('gcds-icon');
    iconElements.forEach(element => {
      // Ensure size attribute is set
      if (!element.getAttribute('size')) {
        element.setAttribute('size', 'md');
      }
    });
    
    // Initialize radio group elements
    const radioGroupElements = document.querySelectorAll('gcds-radio-group');
    radioGroupElements.forEach(element => {
      // Check if role attribute is set
      if (!element.getAttribute('role')) {
        element.setAttribute('role', 'radiogroup');
      }
      
      // Force re-render if needed
      if (element.shadowRoot && !element.shadowRoot.childNodes.length) {
        if (this.debugMode) console.log('Initializing radio group element');
        // Ensure legend attribute is set
        if (!element.getAttribute('legend')) {
          element.setAttribute('legend', 'Radio Group');
        }
        
        // Clone and replace the element to force a re-render
        const clone = element.cloneNode(true);
        element.parentNode?.replaceChild(clone, element);
      }
    });
    
    // Initialize radio elements
    const radioElements = document.querySelectorAll('gcds-radio');
    radioElements.forEach(element => {
      // Check if required attributes are set
      if (!element.getAttribute('radio-id')) {
        if (this.debugMode) console.warn('Radio element missing radio-id attribute');
      }
      
      if (!element.getAttribute('name')) {
        if (this.debugMode) console.warn('Radio element missing name attribute');
      }
      
      // Force re-render if needed
      if (element.shadowRoot && !element.shadowRoot.childNodes.length) {
        if (this.debugMode) console.log('Initializing radio element');
        const clone = element.cloneNode(true);
        element.parentNode?.replaceChild(clone, element);
      }
    });
    
    // Immediately activate radio fallback if needed
    this.checkRadioComponentVisibility();
  }
  
  /**
   * Fix card elements by adding missing required properties
   * @param silent Whether to suppress console logs
   */
  private fixCardElements(silent = false): void {
    if (!silent && this.debugMode) console.log('Fixing card elements to prevent render errors');
    
    // First, add a global style to suppress card errors
    this.addGlobalCardFix();
    
    const cardElements = document.querySelectorAll('gcds-card');
    cardElements.forEach((element, index) => {
      // Add class to all cards to ensure proper styling
      if (!element.classList.contains('demo-card')) {
        element.classList.add('demo-card');
      }
      
      // GCDS cards require both:
      // 1. A valid href attribute (for link cards)
      // 2. A card-title attribute
      
      // Always ensure href is set
      element.setAttribute('href', 'https://example.com');
      
      // Always ensure card-title is set
      if (!element.hasAttribute('card-title')) {
        // Look for a header component or heading element
        const hasHeaderComponent = element.querySelector('gcds-card-header');
        const heading = element.querySelector('h1, h2, h3, h4, h5, h6');
        
        if (hasHeaderComponent && hasHeaderComponent.textContent) {
          // Use the header component's text as the card title
          element.setAttribute('card-title', hasHeaderComponent.textContent.trim());
        } else if (heading && heading.textContent) {
          // Use the heading element's text as the card title
          element.setAttribute('card-title', heading.textContent.trim());
        } else {
          // Add a default card title if none exists
          element.setAttribute('card-title', `Card Example ${index + 1}`);
        }
      }
      
      // Force re-render if needed (after adding required attributes)
      if (element.shadowRoot && element.shadowRoot.childNodes.length === 0) {
        try {
          const clone = element.cloneNode(true);
          element.parentNode?.replaceChild(clone, element);
        } catch (error) {
          console.error('Error re-rendering card:', error);
        }
      }
    });
  }
  
  /**
   * Add a global style fix for card components
   */
  private addGlobalCardFix(): void {
    if (!document.getElementById('gcds-card-fix')) {
      const style = document.createElement('style');
      style.id = 'gcds-card-fix';
      style.textContent = `
        /* Force all cards to have proper styling */
        gcds-card {
          display: block !important;
          width: 100% !important;
          min-height: 100px !important;
          border: 1px solid var(--gcds-border-default, #ccc) !important;
          border-radius: var(--gcds-border-radius-md, 4px) !important;
          box-shadow: var(--gcds-shadow-sm, 0 1px 3px rgba(0,0,0,0.1)) !important;
          padding: var(--gcds-spacing-400, 16px) !important;
          background-color: white !important;
          margin-bottom: var(--gcds-spacing-500, 20px) !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  /**
   * Adds fallback styles for components that might not be rendering correctly
   */
  private addCustomFallbackStyles(): void {
    // Only add these styles if they don't already exist
    if (!document.getElementById('gcds-demo-fallback-styles')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'gcds-demo-fallback-styles';
      styleElement.textContent = `
        /* Fallback styles for components that might not render correctly */
        gcds-card:not(:defined) {
          display: block;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 16px;
          margin-bottom: 16px;
        }
        
        gcds-radio-group:not(:defined) {
          display: block;
          margin-bottom: 16px;
        }
        
        gcds-radio:not(:defined) {
          display: block;
          margin-bottom: 8px;
        }
        
        /* Fix for the grid components */
        gcds-grid:not(:defined) {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        
        gcds-grid-cell:not(:defined) {
          display: block;
          min-height: 100px;
        }
        
        /* When GCDS is fully loaded, hide fallback styles */
        body.gcds-loaded .fallback-only {
          display: none;
        }
        
        /* Suppress GCDS card errors by ensuring they always have proper styling */
        .demo-card {
          display: block !important;
          width: 100% !important;
          min-height: 150px !important;
          border: 1px solid var(--gcds-border-default, #ccc) !important;
          border-radius: var(--gcds-border-radius-md, 4px) !important;
          box-shadow: var(--gcds-shadow-sm, 0 1px 3px rgba(0,0,0,0.1)) !important;
          padding: var(--gcds-spacing-400, 16px) !important;
          background-color: white !important;
          margin-bottom: var(--gcds-spacing-500, 20px) !important;
        }
      `;
      document.head.appendChild(styleElement);
    }
  }

  /**
   * Scrolls to the specified section
   * @param sectionId ID of the section to scroll to
   * @param event Click event to prevent default behavior
   */
  scrollToSection(sectionId: string, event: Event): void {
    // Prevent default anchor behavior which may cause page reload
    event.preventDefault();
    
    // Check if it's a keyboard event (Enter or Space)
    if (event instanceof KeyboardEvent && 
       (event.key !== 'Enter' && event.key !== ' ')) {
      return; // Only handle Enter and Space keys
    }
    
    // Find the section element
    const element = document.getElementById(sectionId);
    if (element) {
      // Scroll to the element smoothly
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Optionally set focus to the section for accessibility
      element.setAttribute('tabindex', '-1');
      element.focus();
      
      // Update URL without reloading page (for bookmarking)
      window.history.pushState(null, '', `#${sectionId}`);
    }
  }
  
  /**
   * Handle keyboard events for category link navigation
   * @param event Keyboard event
   * @param sectionId ID of the section to scroll to
   */
  onCategoryKeyup(event: KeyboardEvent, sectionId: string): void {
    // Only trigger on Enter or Space key
    if (event.key === 'Enter' || event.key === ' ') {
      this.scrollToSection(sectionId, event);
    }
  }

  /**
   * Check if radio components are visible and force fallback if not
   */
  private checkRadioComponentVisibility(): void {
    const radioGroups = document.querySelectorAll('gcds-radio-group');
    let needsFallback = false;
    
    radioGroups.forEach(element => {
      try {
        // Check if the radio group is visible/rendered correctly
        const compStyles = window.getComputedStyle(element);
        const height = compStyles.getPropertyValue('height');
        const visibility = compStyles.getPropertyValue('visibility');
        const display = compStyles.getPropertyValue('display');
        
        // Force fallback to show if the component is invisible or has no height
        if (height === '0px' || height === '0' || visibility === 'hidden' || display === 'none') {
          if (this.debugMode) console.warn('Radio group is not visible - activating fallback');
          element.setAttribute('style', 'display: none !important;');
          needsFallback = true;
        }
        
        // If no content is visible inside the radio group
        if (element.querySelectorAll('gcds-radio:not([style*="display: none"])').length === 0) {
          if (this.debugMode) console.warn('No visible radio buttons - activating fallback');
          element.setAttribute('style', 'display: none !important;');
          needsFallback = true;
        }
      } catch (error) {
        console.error('Error checking radio component visibility:', error);
        needsFallback = true;
      }
    });
    
    // If any radio group needs fallback, activate it immediately
    if (needsFallback) {
      this.activateRadioFallback();
    }
  }

  /**
   * Manually activate radio fallback after multiple initialization attempts
   */
  private activateRadioFallback(): void {
    try {
      // Count visible radio options to determine if fallback is needed
      const radioGroups = document.querySelectorAll('gcds-radio-group');
      const anyVisibleRadioGroups = Array.from(radioGroups).some(group => {
        const radioButtons = group.querySelectorAll('gcds-radio');
        return radioButtons.length > 0 && getComputedStyle(group).display !== 'none';
      });
      
      if (!anyVisibleRadioGroups) {
        if (this.debugMode) console.log('No visible radio groups detected - activating fallback');
        document.body.classList.add('gcds-radio-fallback-active');
      }
    } catch (error) {
      console.error('Error activating radio fallback:', error);
      // In case of error, activate fallback anyway
      document.body.classList.add('gcds-radio-fallback-active');
    }
  }
} 