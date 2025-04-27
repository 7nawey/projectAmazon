import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom Validator Function to check if the value doesn't start with a space
export function NoLeadingSpaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Check if value starts with a space
    if (value && value.startsWith(' ') || value.endsWith(' ')) {
      return { noLeadingSpace: true };  // Return error if value starts with a space
    }

    return null;  // Return null if valid
  };
}
