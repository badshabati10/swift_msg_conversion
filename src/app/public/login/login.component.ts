import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../_services";
import {first} from "rxjs";
import {JSEncrypt} from "jsencrypt";
import {environment} from "../../../environments/environment.prod";
import {MatDialog} from '@angular/material/dialog';
import {AlertService} from "../../_services/alert-service";
import {ErrorCodeConstant} from "../../_constants/error-code.constant";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  forceLoginFlg = false;
  constructor( private formBuilder: FormBuilder,
               private route: ActivatedRoute,
               private router: Router,
               private authenticationService: AuthenticationService,
               public dialog: MatDialog,
               private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.forceLoginFlg = false;
  }
  get f() { return this.loginForm.controls; }
  onSubmit(){
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(environment.publicKey);
    const encrypted = this.loginForm.get("password").value.length===172? this.loginForm.get("password").value :
      encrypt.encrypt(this.loginForm.get("password").value);
    this.loginForm.get("password").setValue(encrypted);

    console.log(this.loginForm.value);
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.loginForm.get('username').value,
                                     this.loginForm.get('password').value,
                                     this.forceLoginFlg)
      .pipe(first())
      .subscribe({
        next: (user) => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || `/private/super-admin`;
          this.router.navigate([returnUrl]);
        },
        error: err => {
          // const errorCode = err && err.error && err.error.statusCode;
          if(err.error.errorCode  && err.error.errorCode === ErrorCodeConstant.ALREADY_LOGGED_IN){
            this.alertService.confirmationAlert("Want to quit current session and logged in again?",
              "User Already Logged in", "Yes").then(v => {
                if(v.isConfirmed){
                  this.forceLoginFlg = true;
                  this.loginForm.controls['password'].reset()
                }
            });
          }else if(err.error.errorCode){
            this.alertService.errorAlert(err.error.message);
            this.forceLoginFlg = false;
          }
          this.loading = false;
        }
      });
  }
}
