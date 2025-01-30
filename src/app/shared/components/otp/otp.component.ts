import { CommonModule } from '@angular/common';
import { Component, ViewChildren, QueryList, ElementRef, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormArray, FormBuilder,FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class OtpComponent implements OnChanges {
  @ViewChildren('otpInput') otpInputs: QueryList<ElementRef>;
  @Input() showOtpPortion = false;
  @Input() setTimer: any;
  @Input() OTP: string;
  @Output() resendOtp = new EventEmitter<void>();
  @Input() numOfOtpFields: number = 6;
  @Output() clearInputFields = new EventEmitter<void>();

  showTimer: boolean = false;
  timer: number = 60;
  remainingTime: number;
  timerInterval: any;
  showResendButton: boolean = false;
  otpValues: string = '';
  constructor(private fb: FormBuilder) { }
  otpForm = this.fb.group({
    otpFields: this.fb.array([])
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['numOfOtpFields']) {
      this.numOfOtpFields = changes['numOfOtpFields'].currentValue;
      this.createOtpFields(this.numOfOtpFields);
    }
    if (changes['numOfOtpFields']) {
      this.numOfOtpFields = changes['numOfOtpFields'].currentValue
      this.createOtpFields(this.numOfOtpFields);
    }

    if (this.OTP) {
      this.setOtpFields(this.OTP);
    }
  }
  setOtpFields(otpValue: string) {
    this.createOtpFields(otpValue.length);
    otpValue.split('').forEach((digit, index) => {
      this.otpFields.at(index).setValue(digit);
    });
  }

  get otpFields(): FormArray {
    return this.otpForm?.get('otpFields') as FormArray;
  }

  createOtpFields(numOfOtpFields: number) {
    this.otpFields?.clear();
    for (let i = 0; i < numOfOtpFields; i++) {
      this.otpFields.push(this.fb.control('', [Validators.required, Validators.maxLength(1)]));
    }
  }

  moveCursor(e: any, prev: ElementRef, curr: ElementRef, next: ElementRef) {
    const length = curr.nativeElement.value.length;
    const maxLength = curr.nativeElement.getAttribute('maxlength');
    if (length == maxLength && next) {
      next.nativeElement.focus();
    }
    if (e.key == "Backspace" && prev) {
      prev.nativeElement.focus();
    }
  }
  hideTimer(){
    this.showTimer = false
  }
  timerFunction1(timer) {
    this.setTimer = timer;
    // this.otpForm?.get('otpFields').reset();
    clearInterval(this.timerInterval);
    this.remainingTime = timer;
    this.timerInterval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        this.otpFields.reset();
        clearInterval(this.timerInterval);
        this.clearInputFields.emit()
      }
    }, 1000);
  }
  timerFunction() {
    this.otpForm?.get('otpFields').reset();
    clearInterval(this.timerInterval);
    this.remainingTime = this.setTimer;
    this.timerInterval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }
  onResend() {
    this.showTimer = false;
    clearInterval(this.timerInterval);
    this.remainingTime = this.setTimer;
    this.timerFunction();
    this.otpFields.reset();
    this.resendOtp.emit();
  }
  otpFormValidation(){
    return this.otpForm.invalid;
  }

  fetchOtpData() {
    return this.otpForm.get('otpFields').value;
  }

}
