import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function englishOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;
    if (!control.touched && (value == null || value.length <= 0)) {
      control.markAsPristine({ onlySelf: true })
      return null;
    }
    if (!/^[a-zA-Z0-9\s]*$/.test(value)) {
      return { 'englishOnly': { value: value } };
    }
    return null;
  };
}

export function numbersOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;
    if (value == null || (value + '').length <= 0) {
      return null;
    }
    if (!/^[0-9]*$/.test(value)) {
      return { 'numbersOnly': { value: value } };
    }
    return null;
  };
}

export function precisionValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;
    if (value == null || (value + '').length <= 0) {
      return null;
    }
    if (!/^\d+(\.\d{1,6})?$/.test(value)) {
      return { 'precisionError': { value: value } };
    }
    return null;
  };
}

export function negativeIntegerValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: number = control.value;
    if (value == null || (value + '').length <= 0) {
      return null;
    }
    if (isNaN(value) || value >= 0 || !Number.isInteger(value)) {
      return { 'negativeInteger': { value: value } };
    }
    return null;
  };
}

export function englishOnlyValidatorForFormArray(value) {
  if (value === 'ENG') {
    return englishOnlyValidator();
  } else {
    return null;
  }
}

export function bangladeshMobileValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = /^01[3-9]\d{8}$/.test(control.value);
    return valid ? null : { 'bdMobileNo': { value: control.value } };
  };
}

export function accMaxLengthValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const maxLengths = [13, 16];
    if (value && value.length && !maxLengths.includes(value.length)) {
      return { 'accMaxLength': { value: value } };
    }
    return null;
  };
}

export function documentNoValidator(documentNo: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    let validLengths: number[] = [];
    if (documentNo === 'N') {
      validLengths = [10, 13, 17];
    } else if (documentNo === 'P') {
      validLengths = [9];
    } else if (documentNo === 'B') {
      validLengths = [17];
    }
    if (value && value.length && !validLengths.includes(value.length)) {
      return { 'documentNoInvalidLength': { value: value } };
    }
    return null;
  };
}
export function confirmPasswordValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(passwordField);
    const confirmPasswordControl = formGroup.get(confirmPasswordField);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;


    if (!confirmPasswordControl.touched && (confirmPassword == null || confirmPassword.length === 0)) {
      confirmPasswordControl.markAsPristine({ onlySelf: true });
      return null;
    }
    if (password !== confirmPassword) {
      confirmPasswordControl.setErrors({ ...confirmPasswordControl.errors, passwordMismatch: true });
    } else {
      if (confirmPasswordControl.hasError('passwordMismatch')) {
        delete confirmPasswordControl.errors?.['passwordMismatch'];
        if (!Object.keys(confirmPasswordControl.errors || {}).length) {
          confirmPasswordControl.setErrors(null);
        }
      }
    }
    return null;
  };
}


