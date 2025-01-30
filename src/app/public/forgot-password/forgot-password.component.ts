import { AlertService } from 'src/app/_services/alert-service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { OtpComponent } from 'src/app/shared/components/otp/otp.component';
import { ForgotPasswordService } from './forgot-password.service';
import { take } from 'rxjs';
import JSEncrypt from 'jsencrypt';
import { environment } from 'src/environments/environment';
import { confirmPasswordValidator, englishOnlyValidator } from '../../_custom-validator/custom-validators.component';
import { FooterModule } from '../../theme/shared/components/footer/footer.module';
import { ApplicationConstant } from '../../_constants/application.constant';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    OtpComponent,
    CommonModule,
    RouterModule,
    FooterModule
  ]
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  userIdValue: string = '';
  otpTimer: any;
  otpRequestID: any;
  genOtp: any;
  otpInputField: any;
  otpInputFieldNumber: any;
  showOtpPortion: boolean = false;
  hideEyeIcon: boolean = false;
  hideConfirmEyeIcon: boolean = false;
  @ViewChild(OtpComponent) otpComp: OtpComponent;
  constructor(
    private fb: FormBuilder,
    private forgotPasswordService: ForgotPasswordService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group(
      {
        userId: ['', [Validators.required,englishOnlyValidator()]],
        passwd: ['', [Validators.required]],
        passwdRe: ['', [Validators.required]],
        otpReqId: '',
        genOtp: '',
        validForSeconds: '',
        otpCreTs: ''
      }, { validators: confirmPasswordValidator('passwd', 'passwdRe') });
  }

  ngOnInit(): void {
  }

  onRequest() {
    this.userIdValue = this.forgotPasswordForm.get('userId').value;
    this.showOtpPortion = true;
    const payload = {
      'funcCode': ApplicationConstant.FUNC_INQ,
      'loginId': this.userIdValue.toUpperCase()
    };
    this.forgotPasswordService.getOtpForgetPassword(payload).pipe(take(1)).subscribe({
      next: (v) => {
        console.log('ON REQUEST RESPONSE: ', v.formData);
        this.otpTimer = v.formData.validForSeconds;
        this.otpRequestID = v.formData.otpReqId;
        this.otpInputField = v.formData.otpAlgo;
        this.genOtp = v.formData.genOtp;
        this.otpInputFieldNumber = Number(this.otpInputField[this.otpInputField.length - 1]);
        console.log('OTP NUMBER: ', this.otpInputFieldNumber);
        this.alertService.successAlert('OTP Request Sent').then(() => {
          this.otpComp?.timerFunction1(this.otpTimer);
        });
      },
      error: (err) => {
        this.alertService.errorAlert(err.error.message);
        this.showOtpPortion = false;
      }
    });
  }
  onSubmit() {
    // PASSWORD ENCRYPTION
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(environment.publicKey);
    const encrypted = this.forgotPasswordForm.get('passwd').value.length === 172 ? this.forgotPasswordForm.get('passwd').value :
                      encrypt.encrypt(this.forgotPasswordForm.get('passwd').value);
    this.forgotPasswordForm.get('passwd').setValue(encrypted);

    // CONFIRM PASSWORD ENCRYPTION
    const PasswdReEncrypted = this.forgotPasswordForm.get('passwdRe').value.length === 172 ? this.forgotPasswordForm.get('passwdRe').value :
      encrypt.encrypt(this.forgotPasswordForm.get('passwdRe').value);
    this.forgotPasswordForm.get('passwdRe').setValue(PasswdReEncrypted);


    const userOTP = this.otpComp.fetchOtpData().join('');
    const passwdValue = this.forgotPasswordForm.get('passwd').value;
    const passwdReValue = this.forgotPasswordForm.get('passwdRe').value;
    const payload = {
      'funcCode': ApplicationConstant.FUNC_INQ,
      'loginId': this.userIdValue.toUpperCase(),
      'forgetPassDetail': {
        'otpReqId': this.otpRequestID,
        'genOtp': userOTP,
        'passwd': passwdValue,
        'passwdRe': passwdReValue
      }
    };
    this.forgotPasswordService.resetForgetPassword(payload).pipe(take(1)).subscribe({
      next: (v) => {
        console.log('ON REQUEST RESPONSE: ', v);
        if (v) {
          this.alertService.successAlert(v.responseMessage).then(() => {
            this.forgotPasswordForm.reset();
            this.otpComp.otpForm.reset();
            this.otpComp?.timerFunction1(0);
            this.otpComp?.hideTimer();
            this.router.navigate(['/']);
          });
        }
      },
      error: (err) => {
        this.alertService.errorAlert(err.error.message);
      }
    });
  }
  togglePasswordVisibility(event: MouseEvent): void {
    if (event.button === 0) {
      this.hideEyeIcon = !this.hideEyeIcon;
    }
  }
  toggleConfirmPasswordVisibility(event: MouseEvent): void {
    if (event.button === 0) {
      this.hideConfirmEyeIcon = !this.hideConfirmEyeIcon;
    }
  }
  hidePasswordEyeIcon(): void {
    this.hideEyeIcon = false;
  }
  hideConfirmPasswordEyeIcon(): void {
    this.hideConfirmEyeIcon = false;
  }
  showEyeIcon(): boolean {
    return this.forgotPasswordForm.get('passwd').value !== '';
  }
  showConfirmEyeIcon(): boolean {
    return this.forgotPasswordForm.get('passwdRe').value !== '';
  }
  clearInputFields() {
    this.forgotPasswordForm.get('passwd').reset();
    this.forgotPasswordForm.get('passwdRe').reset();
  }
  formValidation() {
    return this.otpComp.otpFormValidation() ||
      this.forgotPasswordForm.invalid;
  }
  get passwd() {
    return this.forgotPasswordForm.get('passwd');
  }
}
