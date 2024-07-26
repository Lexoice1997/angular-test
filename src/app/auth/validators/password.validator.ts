import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#?$%^&*])[A-Za-z\d!@#?$%^&*]{8,}$/;
    const isValid = strongPasswordRegex.test(control.value);

    return isValid ? null : { strongPassword: true };
  };
}
