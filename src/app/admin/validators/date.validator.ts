import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import dayjs from 'dayjs';

export function notBeFutureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlDate = dayjs(control.value);
    const today = dayjs();
    const diffDate = controlDate.diff(today, 'day');
    const isValid = diffDate < 0;

    return isValid ? null : { notBeFutureDateValidator: true };
  };
}
