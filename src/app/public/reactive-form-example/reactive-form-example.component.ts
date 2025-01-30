import {Component} from '@angular/core';

import {FormBuilder, Validators} from "@angular/forms";
import {
  englishOnlyValidator, negativeIntegerValidator,
  numbersOnlyValidator,
  precisionValidator
} from "../../_custom-validator/custom-validators.component";
import {DateAdapter} from "@angular/material/core";
import {CommonUtil} from "../../_helpers/common.util";
import {createMask} from "@ngneat/input-mask";


@Component({
  selector: 'app-reactive-form-example',
  templateUrl: './reactive-form-example.component.html',
  styleUrls: ['./reactive-form-example.component.scss']
})
export class ReactiveFormExampleComponent extends CommonUtil{

  classInitializer = CommonUtil.classInitializer;
  exampleForm = this.formBuilder.group({
    normal: ['', [Validators.required, Validators.minLength(4),
      Validators.maxLength(20)]],
    englishOnly: ['', [Validators.required, Validators.minLength(4),
      Validators.maxLength(20), englishOnlyValidator()]],
    amount: ['', [Validators.required, Validators.min(1),
      Validators.max(9999999999), numbersOnlyValidator()]],
    percentageWithSixDigitPrecision: [''],
    negativeInteger: ['',[Validators.required, negativeIntegerValidator()]]
  });


  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 6,
    digitsOptional: false,
    prefix: 'BDT ',
    placeholder: '0',
    parser: (value: string)=> {
      return value.replace(/,/g, '').substring(3).trim();

    }
  });

  get normal() {
    return this.exampleForm.get('normal');
  }

  // get normalErrors() {
  //   return checker(this.normal.errors);
  // }

  get amount() {
    return this.exampleForm.get('amount');
  }

  // get amountErrors() {
  //   return checker(this.amount.errors);
  // }

  get englishOnly(){
    return this.exampleForm.get('englishOnly');
  }

  // get englishErrors(){
  //   return checker(this.englishOnly.errors);
  // }

  get percentageWithSixDigitPrecision(){
    return this.exampleForm.get('percentageWithSixDigitPrecision');
  }

  // get percentageWithSixDigitPrecisionErrors(){
  //   return checker(this.percentageWithSixDigitPrecision.errors);
  // }

  get negativeInteger(){
    return this.exampleForm.get('negativeInteger');
  }

  // get negativeIntegerErrors(){
  //   return checker(this.negativeInteger.errors);
  // }



  // export function checker(errors): string {
  //   if (errors?.['required']) {
  //     return 'Value is required';
  //   } else if (errors?.min){
  //     return `Minimum number is ${errors?.min?.min}`
  //   }else if (errors?.max){
  //     return `Maximum number is ${errors?.max?.max}`
  //   }else if (errors?.minlength) {
  //     return `Min length is ${errors?.minlength?.requiredLength}`;
  //   } else if (errors?.maxlength) {
  //     return `Max length is ${errors?.maxlength?.requiredLength}`;
  //   } else if (errors?.englishOnly) {
  //     return 'English Characters only';
  //   } else if (errors?.numbersOnly) {
  //     return 'Integer Number Allowed Only';
  //   }  else if (errors?.precisionError) {
  //     return 'At most after point 6 digits allowed';
  //   } else if (errors?.negativeInteger) {
  //     return 'Negative value only';
  //   }else {
  //     return '';
  //   }
  // }


  constructor(private formBuilder: FormBuilder, private dateAdapter: DateAdapter<Date>) {
    super();
    this.dateAdapter.setLocale('en-GB');
  }


  onSubmit() {
    console.log(this.exampleForm.value);
  }

  onReset() {
    this.exampleForm.reset();
  }

}
