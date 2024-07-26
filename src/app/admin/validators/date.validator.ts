import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notBeFutureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlDate = new Date(control.value);
    const today = new Date();
    const diffDate =
      new Date(controlDate.getTime() - today.getTime()).getUTCDate() - 1;
    const isValid = diffDate > 0;

    return isValid ? null : { notBeFutureDateValidator: true };
  };
}
