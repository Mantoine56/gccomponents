# Government of Canada Design System (GCDS) Components

This document provides comprehensive information about the Government of Canada Design System (GCDS) components, how they are integrated into our application, and a plan for extending the library with additional components.

## Table of Contents

- [Government of Canada Design System (GCDS) Components](#government-of-canada-design-system-gcds-components)
  - [Table of Contents](#table-of-contents)
  - [Introduction to GCDS](#introduction-to-gcds)
  - [Integration in Our Application](#integration-in-our-application)
    - [Package Installation](#package-installation)
    - [Physical Location in Codebase](#physical-location-in-codebase)
    - [Integration Method](#integration-method)
  - [Component List](#component-list)
  - [Design Tokens](#design-tokens)
    - [Using Design Tokens](#using-design-tokens)
  - [Component Usage Guidelines](#component-usage-guidelines)
  - [Plan for Building Missing Components](#plan-for-building-missing-components)
    - [Proposed New Components](#proposed-new-components)
    - [Implementation Strategy](#implementation-strategy)
    - [Proposed Timeline](#proposed-timeline)
  - [Resources](#resources)

## Introduction to GCDS

The Government of Canada Design System (GCDS) provides a set of reusable, accessible web components that help create consistent, user-friendly government services that align with the Canada.ca brand. These components are designed according to accessibility standards (WCAG 2.1 AA) and are built using modern web technologies.

GCDS is composed of several key parts:
- **Components**: Reusable UI elements built as web components
- **Design Tokens**: Brand and design decisions encoded as variables
- **Utility Framework**: Classes for building layouts and applying styles
- **Page Templates**: Pre-built page layouts combining components

## Integration in Our Application

Our Angular application integrates GCDS components using the following approach:

### Package Installation

The GCDS components are installed as an npm package:

```json
"@cdssnc/gcds-components": "^0.32.0"
```

### Physical Location in Codebase

The components are located in `node_modules/@cdssnc/gcds-components` with key subdirectories:
- `/dist/components`: Individual component files (173 components)
- `/dist/gcds`: Compiled assets including CSS
- `/loader`: Component registration code

### Integration Method

1. **CSS Integration**:
   The GCDS CSS is imported in `angular.json`:
   ```json
   "styles": [
     "src/styles.scss",
     "node_modules/@cdssnc/gcds-components/dist/gcds/gcds.css"
   ]
   ```

2. **Component Registration**:
   We use a custom registry file at `angular-ngrx-app/src/app/gcds-registry.ts`:
   ```typescript
   import { defineCustomElements } from '@cdssnc/gcds-components/loader';

   export function initGcdsComponents(): void {
     console.log('Initializing GCDS components...');
     
     if (!('customElements' in window)) {
       console.warn('Custom Elements API is not supported in this browser.');
       return;
     }

     try {
       defineCustomElements(window);
       console.log('GCDS components initialized successfully');
     } catch (error) {
       console.error('Failed to initialize GCDS components:', error);
     }
   }
   ```

3. **Application Startup**:
   The `main.ts` file initializes GCDS components before bootstrapping:
   ```typescript
   import { initGcdsComponents } from './app/gcds-registry';
   
   initGcdsComponents();
   
   bootstrapApplication(AppComponent, appConfig)
     .catch((err) => {
       console.error('Application bootstrap failed:', err);
     });
   ```

4. **Angular Configuration**:
   Components using GCDS include `CUSTOM_ELEMENTS_SCHEMA` to allow custom elements:
   ```typescript
   @Component({
     selector: 'app-questionnaire',
     standalone: true,
     imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
     schemas: [CUSTOM_ELEMENTS_SCHEMA],
     templateUrl: './questionnaire.component.html',
     styleUrls: ['./questionnaire.component.scss']
   })
   ```

## Component List

The following table shows the available GCDS components in our implementation:

| Component | Description | Status | Usage Example |
|-----------|-------------|--------|---------------|
| Alert | Displays critical information to users | Available | `<gcds-alert>Important information</gcds-alert>` |
| Breadcrumbs | Shows navigation path | Available | `<gcds-breadcrumbs><gcds-breadcrumb href="/">Home</gcds-breadcrumb></gcds-breadcrumbs>` |
| Button | Standard button element | Available | `<gcds-button button-role="primary">Submit</gcds-button>` |
| Card | Container for related content | Available | `<gcds-card><gcds-card-header>Title</gcds-card-header></gcds-card>` |
| Checkbox | Form input for multiple selections | Available | `<gcds-checkbox label="Option">Option label</gcds-checkbox>` |
| Container | Page layout container | Available | `<gcds-container>Content</gcds-container>` |
| Date-input | Input for date selection | Available | `<gcds-date-input label="Select date"></gcds-date-input>` |
| Date-modified | Shows when content was updated | Available | `<gcds-date-modified>2023-01-01</gcds-date-modified>` |
| Details | Expandable/collapsible section | Available | `<gcds-details summary="Show more">Details content</gcds-details>` |
| Error-message | Form validation error | Available | `<gcds-error-message>Required field</gcds-error-message>` |
| Error-summary | Summary of form errors | Available | `<gcds-error-summary heading="Form errors"></gcds-error-summary>` |
| Fieldset | Groups form elements | Available | `<gcds-fieldset legend="Options"></gcds-fieldset>` |
| File-uploader | Interface for file uploads | Available | `<gcds-file-uploader></gcds-file-uploader>` |
| Footer | Standard page footer | Available | `<gcds-footer></gcds-footer>` |
| Grid/Grid-col | Layout system | Available | `<gcds-grid><gcds-grid-col></gcds-grid-col></gcds-grid>` |
| Header | Standard page header | Available | `<gcds-header></gcds-header>` |
| Heading | Page headings h1-h6 | Available | `<gcds-heading tag="h1">Page title</gcds-heading>` |
| Hint | Additional form field info | Available | `<gcds-hint>Enter your full name</gcds-hint>` |
| Icon | Vector icons | Available | `<gcds-icon name="arrow-up"></gcds-icon>` |
| Input | Text input field | Available | `<gcds-input label="Name"></gcds-input>` |
| Label | Form field label | Available | `<gcds-label for="field-id">Field name</gcds-label>` |
| Lang-toggle | Language switcher | Available | `<gcds-lang-toggle></gcds-lang-toggle>` |
| Link | Hyperlink element | Available | `<gcds-link href="/page">Link text</gcds-link>` |
| Nav-group | Groups navigation items | Available | `<gcds-nav-group></gcds-nav-group>` |
| Nav-link | Navigation link | Available | `<gcds-nav-link href="/page">Link text</gcds-nav-link>` |
| Notice | Informational notice | Available | `<gcds-notice></gcds-notice>` |
| Pagination | Page navigation | Available | `<gcds-pagination pages="5" current="1"></gcds-pagination>` |
| Phase-banner | Shows development phase | Available | `<gcds-phase-banner phase="beta"></gcds-phase-banner>` |
| Radio-group | Radio button group | Available | `<gcds-radio-group><gcds-radio value="option1">Option 1</gcds-radio></gcds-radio-group>` |
| Search | Search input | Available | `<gcds-search></gcds-search>` |
| Select | Dropdown selection | Available | `<gcds-select label="Options"></gcds-select>` |
| Side-nav | Side navigation menu | Available | `<gcds-side-nav></gcds-side-nav>` |
| Signature | Government signature | Available | `<gcds-signature></gcds-signature>` |
| Skip-link | Accessibility navigation | Available | `<gcds-skip-link href="#main">Skip to main</gcds-skip-link>` |
| Stepper | Multi-step process | Available | `<gcds-stepper></gcds-stepper>` |
| Text | Text content block | Available | `<gcds-text>Paragraph text</gcds-text>` |
| Textarea | Multiline text input | Available | `<gcds-textarea label="Comments"></gcds-textarea>` |
| Top-nav | Top navigation menu | Available | `<gcds-top-nav></gcds-top-nav>` |
| Topic-menu | Topic navigation | Available | `<gcds-topic-menu></gcds-topic-menu>` |
| Verify-banner | Identity verification | Available | `<gcds-verify-banner></gcds-verify-banner>` |

## Design Tokens

GCDS Design Tokens are the smallest building blocks of the design system, representing design decisions for basic elements like color, typography, and spacing. They create a consistent visual experience and improve communication between design and development.

### Using Design Tokens

When using GCDS components, design tokens are automatically available through the imported CSS:

```css
font: var(--gcds-font-text);
color: var(--gcds-text-primary);
background-color: var(--gcds-bg-white);
```

## Component Usage Guidelines

When using GCDS components in our application:

1. **Always include CUSTOM_ELEMENTS_SCHEMA**:
   ```typescript
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
   ```

2. **Initialize components before bootstrapping**:
   Ensure `initGcdsComponents()` is called in `main.ts`

3. **Follow accessibility guidelines**:
   Use proper ARIA attributes and ensure keyboard navigation works

4. **Maintain responsive design**:
   GCDS components are responsive by default - don't override this behavior

5. **Use design tokens for consistency**:
   Prefer design tokens over hard-coded values for colors, spacing, etc.

## Plan for Building Missing Components

Based on our analysis of the existing component library and common UI patterns, we've identified several components that could enhance our application but are currently missing from GCDS:

### Proposed New Components

| Component | Description | Priority | Complexity |
|-----------|-------------|----------|------------|
| Data Table | Interactive table for data display with sorting and filtering | High | Medium |
| Chart | Data visualization components (bar, line, pie charts) | High | High |
| Accordion | Vertically stacked list of headers that expand/collapse | Medium | Low |
| Tooltip | Contextual information displayed on hover | Medium | Low |
| Tabs | Tabbed content navigation | High | Medium |
| Modal | Dialog boxes for interrupting workflows | High | Medium |
| Toast | Brief messages that appear temporarily | Medium | Low |
| Dropdown Menu | Menu that appears on click/hover | Medium | Medium |
| Autocomplete | Text input with suggestions | High | Medium |
| Image Gallery | Collection of images with navigation | Low | Medium |
| Progress Bar | Visual indicator of progress | Medium | Low |
| Rating | Star/numerical rating input | Low | Low |
| Calendar | Date picker with calendar view | High | High |
| Carousel | Slideshow for cycling through content | Low | Medium |
| Tag | Keyword/category label | Medium | Low |

### Implementation Strategy

1. **Research & Design Phase**:
   - Review Canada.ca design patterns
   - Analyze accessibility requirements (WCAG 2.1 AA)
   - Create design mockups in Figma
   - Define component API and props

2. **Development Phase**:
   - Create web component using same technology as GCDS (Stencil.js)
   - Implement responsive design
   - Ensure keyboard navigation and screen reader support
   - Define CSS custom properties for theming

3. **Documentation & Testing**:
   - Write usage documentation
   - Create examples
   - Add automated tests
   - Conduct accessibility testing

4. **Integration**:
   - Package components
   - Create Angular integration examples
   - Update gcds-registry.ts if needed

### Proposed Timeline

- **Month 1**: Research, design and prototype Data Table, Tabs, and Modal components
- **Month 2**: Develop and test Data Table, Tabs, and Modal components  
- **Month 3**: Research, design and develop Chart components
- **Month 4**: Develop remaining high-priority components
- **Month 5**: Develop medium-priority components
- **Month 6**: Develop low-priority components and finalize documentation

## Resources

- [GCDS Official Documentation](https://design-system.alpha.canada.ca/en/)
- [GCDS Components GitHub Repository](https://github.com/cds-snc/gcds-components)
- [GCDS Design Tokens GitHub Repository](https://github.com/cds-snc/gcds-tokens)
- [GCDS Utility GitHub Repository](https://github.com/cds-snc/gcds-utility)
- [Web Components MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Stencil.js Documentation](https://stenciljs.com/docs/introduction) 