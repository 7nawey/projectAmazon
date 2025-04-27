import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom Validator Function to check if the value contains no spaces
export function noSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    // Check if value is not empty and doesn't contain only letters, numbers, and underscore
    if (value && !/[a-zA-Z0-9\u0621-\u064A\u0660-\u0669_]/.test(value)) {
      return { noSpaces: true };  // Return the error if the value is invalid
    }
    
    return null;  // Return null if valid
  };
}

