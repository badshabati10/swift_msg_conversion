import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { AlertService } from "../../../_services/alert-service";
import { AgbListComponent } from "../../../shared/components/agb-list/agb-list.component";
import { MatStepper, MatStepperModule } from "@angular/material/stepper";
import { NavigationService } from "../../../theme/layout/private-layout/navigation/nav-content/navigation.service";
import { take } from "rxjs";
import { MessageIdMaintService } from "./message-id-maint.service";
import { CommonUtil } from 'src/app/_helpers/common.util';
import { englishOnlyValidator, englishOnlyValidatorForFormArray } from 'src/app/_custom-validator/custom-validators.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-message-id-maint',
  templateUrl: './message-id-maint.component.html',
  standalone:true,
  imports:[
    CommonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatDialogModule
  ],
  styleUrls: ['./message-id-maint.component.scss']
})
export class MessageIdMaintComponent {

  @ViewChild('stepper', { read: MatStepper }) stepper: MatStepper
  classInitializer = CommonUtil.classInitializer;

  constructor(private fb: FormBuilder,
    private alertService: AlertService,
    public dialog: MatDialog,
    private navService: NavigationService,
    public messageIdMaintService: MessageIdMaintService,
  ) {}

  isLinear = false;
  mopCodeDescList: any;
  isInquiry: boolean = true;
  msgIdForm: FormGroup;
  msgIdLangForm: FormGroup;
  funcCodeOptions = [];
  msgIdTypeDesc: string;

  ngOnInit() {

    this.funcCodeOptions = this.navService.getPermittedOptions();
    this.msgIdForm = this.fb.group({
      funcCode: ['I', [Validators.required]],
      msgId: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10),englishOnlyValidator()]],
    });

    this.msgIdLangForm = this.fb.group({
      msgIdNew: [''],
      language: this.fb.array([])
    });

    this.msgIdForm.get('funcCode').valueChanges.subscribe((value) => {
      if (value === 'C') {
        this.msgIdLangForm.get('msgIdNew').setValidators([Validators.required,Validators.minLength(2), Validators.maxLength(10),englishOnlyValidator()]);

      } else {
        this.msgIdLangForm.get('msgIdNew').clearValidators();
      }
      this.msgIdLangForm.get('msgIdNew').updateValueAndValidity();
    });

  }

  onSearch(funcCode: string, msgIdOrDsc: string, fromControlName: string) {

    const payLoad = {
      "funcCode": funcCode,
      "msgId": msgIdOrDsc
    };

    const dialogRef = this.dialog.open(AgbListComponent, {
      width: '50%',
      data: {
        title: 'Message Type Data',
        serviceName: 'getMsgIdList',
        srchPayLoad: payLoad,
      },
      disableClose: true
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe(selectedRow => {
      if (fromControlName === 'msgId') {
        console.log("selectedRow" + selectedRow);
        this.msgId.setValue(selectedRow?.msgId);
        this.msgIdTypeDesc = selectedRow?.msgDesc;
      }
    });
  }

  onChangeMsgId(){
    this.msgIdTypeDesc = '';
  }

  onNext() {

    if (this.msgIdForm.invalid) {
      return;
    }

    const payload = {
      "funcCode": this.funcCode.value,
      "msgId": this.msgId.value
    };

    this.messageIdMaintService.getMsgIdDetail(payload)
      .pipe(take(1))
      .subscribe((response) => {
        console.log(response);
        this.stepper.next();
        this.mopCodeDescList = this.mrhBlockToGrid(response.mrhBlock.mrhBlocks[0]);
        const mrh = this.gridToMrhBlock(this.mopCodeDescList);
        for (const mop of this.mopCodeDescList) {
          let featureFrom = new FormGroup({
            msgLang: new FormControl(''),
            msgLangDesc: new FormControl(''),
            msgDesc: new FormControl('',englishOnlyValidatorForFormArray(mop.msgLang)),
            delFlg: new FormControl('N'),
            lchgTime: new FormControl(''),
          });
          (this.msgIdLangForm.get('language') as FormArray).push(featureFrom);
          console.log("msgCodeLangForm" + featureFrom.value.msgLang);
        }
        this.msgIdLangForm.get('language').patchValue(<any[]>this.mopCodeDescList);


        if(this.msgIdForm.get('funcCode').value!=='C')
          {
            this.msgIdLangForm.get('msgIdNew').disable();
          }
        else{
            this.msgIdLangForm.get('msgIdNew').enable();
          }

      });


  };


  mrhBlockToGrid(mrhBlock: any) {
    let list = [];
    for (let i = 0; i < mrhBlock.dataBlock.length; i++) {
      let obj = {}
      for (let j = 0; j < mrhBlock.headerInfo.length; j++) {
        let key = mrhBlock.headerInfo[j];
        let value = mrhBlock.dataBlock[i][j];
        obj = { ...obj, [key]: value };
      }
      list.push(obj);
    }
    return list;
  }


  gridToMrhBlock(list: any[]) {
    let mrhBlock = {
      headerInfo: [],
      dataBlock: []
    };

    if (list.length > 0) {
      mrhBlock.headerInfo = Object.keys(list[0]);
    }

    for (let item of list) {
      let rowData = [];
      for (let key of mrhBlock.headerInfo) {
        rowData.push(item[key]);
      }
      mrhBlock.dataBlock.push(rowData);
    }

    return mrhBlock;
  }

  clearMsgIdFormFields() {
    this.msgIdForm.reset();
    this.msgIdForm.get('funcCode').setValue('I');
    this.msgIdTypeDesc='';
    this.msgIdLangForm.reset();
  }

  onSubmit() {
    const payload = {
      ...this.msgIdForm.value,
      ...this.msgIdLangForm.value,
      "menuId": this.navService.getMenuId(),
    };
    console.log(payload);
    this.messageIdMaintService.submit(payload).pipe(take(1)).subscribe({
      next: (v) =>
        this.alertService.successAlert(v.responseMessage)
          .then(() => {
            this.msgIdForm.reset();
            (this.msgIdLangForm.get('language') as FormArray).clear();
            this.stepper.reset();
          }),
      error: (err) => {
        this.alertService.errorAlert(err.error.message);
      }
    });
  }

  onChangeFuncCode(event: any) {
    this.msgIdForm.get('msgId').setValue('');
    this.msgIdTypeDesc='';
  }

  get funcCode() {
    return this.msgIdForm.get('funcCode');
  }

  get msgId() {
    return this.msgIdForm.get('msgId');
  }

  get msgIdNew(){
    return this.msgIdLangForm.get('msgIdNew');
  }


  msgDesc(i){
    return (this.msgIdLangForm?.get('language') as FormArray).controls[i]?.get('msgDesc');
  }

  onReset(){
    this.msgIdForm.reset();
    this.msgIdForm.get('funcCode').setValue('I');
  }

}
