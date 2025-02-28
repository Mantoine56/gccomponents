import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

/**
 * Questionnaire Wizard Component
 * Implements a step-by-step questionnaire with multiple sections
 * following the Canada.ca design patterns
 */
@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent {
  // Current step in the wizard
  currentStep = 1;
  // Total number of steps
  totalSteps = 4;
  // Whether the questionnaire is completed
  completed = false;
  // Form groups for each step
  personalInfoForm: FormGroup;
  preferencesForm: FormGroup;
  feedbackForm: FormGroup;
  
  // Form validation error messages
  errorMessages: { [key: string]: string } = {};
  
  /**
   * Constructor - inject required services
   */
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    // Initialize the form groups with default values
    this.personalInfoForm = this.fb.group({
      firstName: ['John', [Validators.required, Validators.minLength(2)]],
      lastName: ['Doe', [Validators.required, Validators.minLength(2)]],
      email: ['john.doe@example.com', [Validators.required, Validators.email]]
    });
    
    this.preferencesForm = this.fb.group({
      preferredLanguage: ['English', Validators.required],
      notificationPreference: ['email', Validators.required]
    });
    
    this.feedbackForm = this.fb.group({
      satisfaction: ['satisfied', Validators.required],
      comments: ['I found this demo questionnaire to be very well designed!', [Validators.maxLength(500)]]
    });
  }
  
  /**
   * Go to the next step in the wizard
   */
  next(): void {
    console.log('Next button clicked. Current step:', this.currentStep);
    // Validate the current step's form
    if (this.validateCurrentStep()) {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        console.log('Moving to step:', this.currentStep);
        this.clearErrorMessages();
      }
    } else {
      console.log('Validation failed for step:', this.currentStep);
    }
  }
  
  /**
   * Go to the previous step in the wizard
   */
  previous(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.clearErrorMessages();
    }
  }
  
  /**
   * Validate the current step's form
   */
  validateCurrentStep(): boolean {
    this.clearErrorMessages();
    
    // For demo purposes, we'll always return true to allow progression
    // In a real app, you would use the code below
    return true;
    
    /*
    switch (this.currentStep) {
      case 1:
        return this.validateForm(this.personalInfoForm);
      case 2:
        return this.validateForm(this.preferencesForm);
      case 3:
        return this.validateForm(this.feedbackForm);
      case 4:
        // Summary step, no validation needed
        return true;
      default:
        return false;
    }
    */
  }
  
  /**
   * Validate a form and update error messages
   */
  validateForm(form: FormGroup): boolean {
    if (form.valid) {
      return true;
    }
    
    // Get validation messages for each invalid field
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control && control.invalid) {
        if (control.errors?.['required']) {
          this.errorMessages[key] = `${this.getFieldLabel(key)} is required`;
        } else if (control.errors?.['minlength']) {
          this.errorMessages[key] = `${this.getFieldLabel(key)} must be at least ${control.errors?.['minlength'].requiredLength} characters`;
        } else if (control.errors?.['email']) {
          this.errorMessages[key] = `Please enter a valid email address`;
        } else if (control.errors?.['maxlength']) {
          this.errorMessages[key] = `${this.getFieldLabel(key)} must be less than ${control.errors?.['maxlength'].requiredLength} characters`;
        }
      }
    });
    
    return false;
  }
  
  /**
   * Clear all error messages
   */
  clearErrorMessages(): void {
    this.errorMessages = {};
  }
  
  /**
   * Get a user-friendly label for a form field
   */
  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email address',
      preferredLanguage: 'Preferred language',
      notificationPreference: 'Notification preference',
      satisfaction: 'Satisfaction rating',
      comments: 'Comments'
    };
    
    return labels[fieldName] || fieldName;
  }
  
  /**
   * Submit the questionnaire
   */
  submit(): void {
    if (this.validateCurrentStep()) {
      // In a real application, you would send the data to a server here
      console.log('Form submitted!', {
        personalInfo: this.personalInfoForm.value,
        preferences: this.preferencesForm.value,
        feedback: this.feedbackForm.value
      });
      
      this.completed = true;
      this.currentStep = this.totalSteps; // Show the success step
    }
  }
  
  /**
   * Reset the questionnaire and go back to step 1
   */
  restart(): void {
    this.currentStep = 1;
    this.completed = false;
    this.personalInfoForm.reset();
    this.preferencesForm.reset({
      preferredLanguage: 'English',
      notificationPreference: 'email'
    });
    this.feedbackForm.reset();
    this.clearErrorMessages();
  }
  
  /**
   * Go back to the Canada page
   */
  goToCanadaPage(): void {
    this.router.navigate(['/canada']);
  }

  /**
   * Get the title for the current step
   */
  getStepTitle(): string {
    switch (this.currentStep) {
      case 1:
        return 'Personal Information';
      case 2:
        return 'Your Preferences';
      case 3:
        return 'Feedback';
      case 4:
        return this.completed ? 'Submission Complete' : 'Review & Submit';
      default:
        return 'Questionnaire';
    }
  }

  /**
   * Get user-friendly text for satisfaction ratings
   */
  getSatisfactionText(value: string): string {
    const satisfactionMap: { [key: string]: string } = {
      'very_satisfied': 'Very Satisfied',
      'satisfied': 'Satisfied',
      'neutral': 'Neither Satisfied nor Dissatisfied',
      'dissatisfied': 'Dissatisfied',
      'very_dissatisfied': 'Very Dissatisfied'
    };
    
    return satisfactionMap[value] || value;
  }
}
