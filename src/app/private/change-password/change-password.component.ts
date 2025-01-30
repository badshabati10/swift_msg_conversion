import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ChangePasswordService} from "../../_services/change-password.service";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../_services";
import {AlertService} from "../../_services/alert-service";
import { Router, RouterModule} from "@angular/router";
import JSEncrypt from 'jsencrypt';
import { environment } from 'src/environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule
  ],
  styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  username: any;

  //PASSWORD VISIBILITY VARIABLES
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  hideOldEyeIcon: boolean = false;
  hideNewEyeIcon: boolean = false;
  hideConfirmEyeIcon: boolean = false;
  hasForced = false;
  constructor(private changePasswordService: ChangePasswordService, private fb: FormBuilder,
              private alertService: AlertService, private router: Router,
              private http: HttpClient, private authService: AuthenticationService) {
    this.changePasswordForm = this.fb.group({
      loginKeyOld: ['', Validators.required],
      loginKeyNew: ['', Validators.required],
      loginKeyRe: ['', Validators.required]
    });
    this.authService.user.subscribe(u => {
      this.username = u?.fullName;
    });
  }


  onChangePassword(): void {
    console.log('hello');
    const formData = this.changePasswordForm.value;
    if (this.changePasswordForm.valid) {
      const formData = this.changePasswordForm.value;
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(environment.publicKey);

      let changePasswordObj = {
        'loginKeyOld' : encrypt.encrypt(formData.loginKeyOld),
        'loginKeyNew': encrypt.encrypt(formData.loginKeyNew),
        'loginKeyRe': encrypt.encrypt(formData.loginKeyRe)
      }
      this.changePasswordService.changePassword(changePasswordObj).subscribe({
        next: (v) => this.alertService.successAlert("Password Change Successful")
          .then(() => this.router.navigate(['/'])),
        error: (e) => {
          this.alertService.errorAlert(e.error.message);
        }
      }


    );
    }



  }

    get loginKeyOld(){
    return this.changePasswordForm.get('loginKeyOld');
  }
  get loginKeyNew(){
    return this.changePasswordForm.get('loginKeyNew');
  }
  get loginKeyRe(){
    return this.changePasswordForm.get('loginKeyRe');
  }

  ////////////// PASSWORD VISIBILITY ////////////////

  toggleOldPasswordVisibility(event:MouseEvent):void { 
    if(event.button===0){
      this.hideOldEyeIcon = !this.hideOldEyeIcon;
    } 
  }
  toggleNewPasswordVisibility(event:MouseEvent):void { 
    if(event.button===0){
      this.hideNewEyeIcon = !this.hideNewEyeIcon;
    } 
  }
  toggleConfirmPasswordVisibility(event:MouseEvent):void { 
    if(event.button===0){
      this.hideConfirmEyeIcon = !this.hideConfirmEyeIcon;
    } 
  }


  hideOldPasswordEyeIcon():void{
    this.hideOldEyeIcon = false;
  }
  hideNewPasswordEyeIcon():void{
    this.hideNewEyeIcon = false;
  }
  hideConfirmPasswordEyeIcon():void{
    this.hideConfirmEyeIcon = false;
  }


  showOldEyeIcon(): boolean {
    return this.oldPassword !== '';
  }
  showNewEyeIcon(): boolean {
    return this.newPassword !== '';
  }
  showConfirmEyeIcon(): boolean {
    return this.confirmPassword !== '';
  }

}
