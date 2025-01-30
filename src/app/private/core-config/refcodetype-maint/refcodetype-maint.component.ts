import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {AlertService} from "../../../_services/alert-service";
import {AgbListComponent} from "../../../shared/components/agb-list/agb-list.component";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {RefCodeTypeMaintService} from "../../../_services/refcodetype-maint.service";
import {NavigationService} from "../../../theme/layout/private-layout/navigation/nav-content/navigation.service";
import {take} from "rxjs";
import { CommonUtil } from 'src/app/_helpers/common.util';
import { englishOnlyValidator } from 'src/app/_custom-validator/custom-validators.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-refcodetype-inquiry',
  templateUrl: './refcodetype-maint.component.html',
  standalone:true,
  imports:[
    CommonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatDialogModule
  ],
  styleUrls: ['./refcodetype-maint.component.scss']
})
export class RefCodeTypeMaintComponent implements OnInit {

  @ViewChild('stepper',{read:MatStepper}) stepper:MatStepper
  classInitializer = CommonUtil.classInitializer;

  constructor(private fb: FormBuilder,
              private alertService: AlertService,
              private refCodeService: RefCodeTypeMaintService,
              public dialog: MatDialog,
              private navService: NavigationService) {
  }
  refCodeTypeForm: FormGroup;
  refDetailForm: FormGroup;
  isLinear = false;
  refCodeTypeDesc: string;
  private lastChangeTime : string;
  isHiddenSubmitBtn: boolean;
  funcCodeOptions = [];
  depRefCodeTypeDesc:string;

  ngOnInit() {
    this.funcCodeOptions = this.navService.getPermittedOptions();
    this.refCodeTypeForm = this.fb.group({
      funcCode: ['I', [Validators.required]],
      refCodeType: ['', [Validators.required,englishOnlyValidator()]],
    });
    this.refDetailForm = this.fb.group({
        newRefCodeType : [''],
        refDescription: ['', [Validators.required]],
        refLength: ['', [Validators.required]],
        dependentFlg: ['', [Validators.required]],
        depRefType: [''],
    });
    // this.isHiddenSubmitBtn = false;

    // VALIDATION FOR newRefCodeType
    this.refCodeTypeForm.get('funcCode').valueChanges.subscribe((value) => {
      if (value === 'C') {
          this.refDetailForm.get('newRefCodeType').setValidators([Validators.required, englishOnlyValidator()]);
      } else {
          this.refDetailForm.get('newRefCodeType').clearValidators();
      }
      this.refDetailForm.get('newRefCodeType').updateValueAndValidity();
  });


  // VALIDATION FOR depRefType
    this.refDetailForm.get('dependentFlg').valueChanges.subscribe((value) => {
      if (value === 'Y') {
          this.refDetailForm.get('depRefType').setValidators([Validators.required, englishOnlyValidator()]);
      } else {
          this.refDetailForm.get('depRefType').clearValidators();
      }
      this.refDetailForm.get('depRefType').updateValueAndValidity();
  });

  }

  onChangeRefCodeType(){
    this.refCodeTypeDesc='';
  }


  onChangeDepRefType(){
    this.depRefCodeTypeDesc='';
  }

  onSearch(funcCode:string, refTypeOrDsc:string,fromControlName:string) {

    if (this.funcCode.invalid) {
      this.funcCode.markAsTouched();
      return;
    }

    const payLoad = {
      "functionCode": funcCode,
      "refCodeType" : refTypeOrDsc
    };
    const dialogRef = this.dialog.open(AgbListComponent, {
      width: '50%',
      data: {
         title:'Reference Type Data',
         serviceName : 'getRefTypeList',
         srchPayLoad : payLoad,
      },
      disableClose: true
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe(selectedRow => {
      if(fromControlName === 'refCodeType') {
        this.refCodeType.setValue(selectedRow?.refCodeType);
        this.refCodeTypeDesc = selectedRow?.refCodeTypeDesc;
      }
      else if(fromControlName === 'depRefType') {
        this.depRefType.setValue(selectedRow?.refCodeType);
        this.depRefCodeTypeDesc=selectedRow?.refCodeTypeDesc;

      }
    });
  }

  onReset(){
    this.refCodeTypeForm.get('funcCode').setValue('I');
    this.refCodeTypeForm.get('refCodeType').setValue('');
    this.refCodeTypeDesc='';
  }

  onNext() {
    if (this.refCodeTypeForm.invalid) {
      for (const control of Object.keys(this.refCodeTypeForm.controls)) {
        this.refCodeTypeForm.controls[control].markAsTouched();
      }
      return;
    }
    this.refCodeService.getRefTypeDetail(this.funcCode.value, this.refCodeType.value)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          if(response.formData){
            this.setDetailFormFields(response.formData);
            this.stepper.next();
          }
        },
        error: err => {
          this.alertService.errorAlert(err.error.message);
        }
      });


      // DISABLING newRefCodeType INPUT FIELD IF THE funcCode.value!=='C'
      if(this.refCodeTypeForm.get('funcCode').value!=='C')
        {
          this.refDetailForm.get('newRefCodeType').disable();
        }
      else{
          this.refDetailForm.get('newRefCodeType').enable();
        }

      // // DISABLING refLength INPUT FIELD IF THE funcCode.value==='I'
      // if(this.refCodeTypeForm.get('funcCode').value==='I')
      //   {
      //     this.refDetailForm.get('refLength').disable();
      //   }
      // else{
      //     this.refDetailForm.get('refLength').enable();
      //   }
  }
  setDetailFormFields(refCodeTypeDetail:any) {
    this.refDescription.setValue(refCodeTypeDetail.refCodeTypeDesc);
    this.refLength.setValue(refCodeTypeDetail.refCodeLen);
    this.dependentFlg.setValue(refCodeTypeDetail.depFlg);
    if(refCodeTypeDetail.depFlg === 'Y'){
      this.depRefType.setValue(refCodeTypeDetail.depRefCodeType);
      this.depRefCodeTypeDesc=refCodeTypeDetail.depRefCodeTypeDesc;
    } else{

      this.depRefType.setValue('');
      this.depRefCodeTypeDesc='';
    }
    this.lastChangeTime = refCodeTypeDetail.lchgTime;

  }
  onCancel() {
    this.refDetailForm.reset();
    this.refCodeTypeForm.reset();
    this.refCodeTypeForm.get('funcCode').setValue('I');
    this.refCodeTypeDesc='';
  }

  onSubmit() {
    const payLoad = {
      "functionCode": this.funcCode.value,
      "refCodeType": this.refCodeType.value,
      "newRefCodeType" : this.newRefCodeType.value,
      "refCodeTypeDesc": this.refDescription.value,
      "lchgTime": this.lastChangeTime,
      "dependentFlg": this.dependentFlg.value,
      "dependentRefCodeType": this.depRefType.value,
      "depRefCodeTypeDesc":this.depRefCodeTypeDesc,
      "refCodeLength": this.refLength.value,
      "menuId": this.navService.getMenuId()
    };

    this.refCodeService.submit(payLoad).pipe(take(1)).subscribe({
      next: (v) => {
        this.alertService.successAlert(v.responseMessage);
        this.stepper.previous();
      },
      error: (err) => {
        this.alertService.errorAlert(err.error.message);
      }
    });
  }

  onChangeDepFlg(event: any) {

    this.depRefType.setValue('');
    this.depRefCodeTypeDesc='';
  }

  disableDetailFormFields() {
    this.refDescription.disable();
    this.refLength.disable();
    this.dependentFlg.disable();
    this.depRefType.disable();
  }
  enableDetailFormFields(){
    this.refDescription.enable();
    this.refLength.enable();
    this.dependentFlg.enable();
    this.depRefType.enable();
  }

  onChangeFuncCode(event: any) {
    this.refCodeTypeForm.get('refCodeType').setValue('');
    this.refCodeTypeDesc='';
    switch (this.funcCode.value) {
      case 'I':{
        this.disableDetailFormFields();
        this.newRefCodeType.setValue('');
        this.isHiddenSubmitBtn = true;

      }
        break;
      case 'C':{
        this.enableDetailFormFields();
        this.isHiddenSubmitBtn = false;

      }
        break;
      case 'D':
      case 'V':
      case 'U':
      case 'X':{
        this.disableDetailFormFields();
        this.newRefCodeType.setValue('');
        this.isHiddenSubmitBtn = false;

      }
      break;
      case 'M' :{
        this.enableDetailFormFields();
        this.newRefCodeType.setValue('');
        this.isHiddenSubmitBtn = false;

      }
      break;
      case 'A': {
        this.enableDetailFormFields();
        this.newRefCodeType.setValue('');
        this.isHiddenSubmitBtn = false;

      }
        break;
      default:
        break;
    }

    // reset refCodeType and Desc Field
    this.refCodeType.reset();
    this.refCodeTypeDesc = '';
  }

  get funcCode() {
    return this.refCodeTypeForm.get('funcCode');
  }

  get refCodeType() {
    return this.refCodeTypeForm.get('refCodeType');
  }

  get newRefCodeType() {
    return this.refDetailForm.get('newRefCodeType');
  }
  get refDescription() {
    return this.refDetailForm.get('refDescription');
  }

  get refLength() {
    return this.refDetailForm.get('refLength');
  }

  get dependentFlg() {
    return this.refDetailForm.get('dependentFlg');
  }

  get depRefType() {
    return this.refDetailForm.get('depRefType');
  }
}
