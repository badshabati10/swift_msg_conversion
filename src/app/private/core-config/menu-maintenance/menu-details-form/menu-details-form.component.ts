import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {
  englishOnlyValidator,
  englishOnlyValidatorForFormArray
} from "../../../../_custom-validator/custom-validators.component";
import { Component, EventEmitter, Input, OnInit, Output, Signal, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MrhBlock } from "../../../../_models/socket-payload/mrh-block";
import { CommonUtil } from "../../../../_helpers/common.util";
import { AgbListComponent } from "../../../../shared/components/agb-list/agb-list.component";
import { Subject, take } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { AlertService } from "../../../../_services/alert-service";
import { TranslateModule } from "@ngx-translate/core";
import { MenuInit } from "../menu-init";
import { ParentMenuSegmentComponent } from "./parent-menu-segment/parent-menu-segment.component";
import { MenuPermissionComponent } from "./menu-permission/menu-permission.component";
import { MenuMaintenanceService } from "../menu-maintenance.service";


@Component({
  selector: 'app-menu-details-form',
  templateUrl: './menu-details-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    ParentMenuSegmentComponent,
    MenuPermissionComponent
  ]
})
export class MenuDetailsFormComponent {
  classInitializer = CommonUtil.classInitializer;

  @ViewChild(ParentMenuSegmentComponent) parentMenuSegment!: ParentMenuSegmentComponent;
  @ViewChild(MenuPermissionComponent) menuPermissionComponent!: MenuPermissionComponent;
  @Output() onCancelEvent = new EventEmitter<any>();


  menuInit: MenuInit = new MenuInit();
  menuDetailsResponse: any = null;
  mopCodeDescMrh: MrhBlock = new MrhBlock();
  mopPermMrh: MrhBlock = new MrhBlock();

  param5: string = '';
  fullDisabledMenuPermissions = false;
  menuDetailsForm = this._formBuilder.group({
    menuIdNew: ['', [Validators.required, englishOnlyValidator()]],
    delFlg: '',
    lchgTime: '',
    menuId: '',
    module: '',
    menuTp: 'R',
    lchgUserId: '',
    secuInd: 'I',
    languageDetails: new FormArray([]),
    param1: '',
    param2: '',
    param3: '',
    param4: '',
  });


  mopCodeDescList: any[];


  constructor(private _formBuilder: FormBuilder, private dialog: MatDialog,
    private alertService: AlertService, private menuMaintenanceService: MenuMaintenanceService) {
  }


  onMenuTypeChange($event) {
    const menuType = $event.target.value;
    if (menuType === 'R') {
      this.menuDetailsForm.get('param1').clearValidators();
      this.menuDetailsForm.get('param2').addValidators(Validators.required);
      this.menuDetailsForm.get('param3').clearValidators();
      this.menuDetailsForm.get('param4').clearValidators();
    } else if (menuType === 'M') {
      this.menuDetailsForm.get('param1').addValidators(Validators.required);
      this.menuDetailsForm.get('param2').clearValidators();
      this.menuDetailsForm.get('param3').addValidators(Validators.required);
      this.menuDetailsForm.get('param4').addValidators(Validators.required);
    } else {
      ['param1', 'param2', 'param3', 'param4'].forEach(param => {
        this.menuDetailsForm.get(param).clearValidators();
      });
    }
  }

  menuDesc(i) {
    return (this.menuDetailsForm?.get('languageDetails') as FormArray).controls[i]?.get('menuDesc');
  }

  onCancel() {
    this.menuDetailsForm.reset();
    (this.menuDetailsForm.get('languageDetails') as FormArray).clear();
    if (this.menuPermissionComponent) {
      this.menuPermissionComponent.reset()
    }
    this.onCancelEvent.emit();
  }

  onSave() {
    let rows = [];
    let param5 = '';
    let formData = this.menuDetailsForm.getRawValue();
    formData.menuId = this.menuInit.menuId;

    if (formData.menuTp === 'M') {
      param5 = this.menuPermissionComponent.param5Gen();
      formData['param5'] = param5;
    }
    if (formData.menuTp !== 'R') {
      rows = this.parentMenuSegment.extractGridData();
    }
    this.mopCodeDescMrh.dataBlock = CommonUtil.gridToMrhBlock(formData.languageDetails, this.mopCodeDescMrh?.headerInfo);
    this.mopCodeDescMrh.numberOfRecs = formData.languageDetails.length;
    delete formData.languageDetails;
    if (this.mopPermMrh.headerInfo) {
      this.mopPermMrh.numberOfRecs = rows.length
      this.mopPermMrh.dataBlock = CommonUtil.gridToMrhBlock(rows, this.mopPermMrh?.headerInfo);
    }
    let payload = {
      'menuSearchForm': this.menuInit,
      'formData': formData,
      'mopCodeDescMrh': this.mopCodeDescMrh
    }
    console.log(this.mopPermMrh);
    if (this.mopPermMrh.headerInfo) {
      payload['mopPermMrh'] = this.mopPermMrh;
    } else {
      payload['mopPermMrh'] = null;
    }

    this.menuMaintenanceService.menuSave(payload).pipe(take(1)).subscribe({
      next: (v) => this.alertService.successAlert("Data Save Successfully")
        .then(() => {
          this.menuDetailsForm.reset();
          (this.menuDetailsForm.get('languageDetails') as FormArray).clear();
          this.onCancelEvent.emit();
          this.mopCodeDescMrh = new MrhBlock();
          this.mopPermMrh = new MrhBlock();
        }),
      error: (e) => {
        this.alertService.errorAlert(e.error.message)
      }
    });
  }






  onSearchAppId() {
    const payLoad = {
      "funcCode": 'I',
      "refCodeType": '01',
      "refCode": this.menuDetailsForm.get('param2').value ? this.menuDetailsForm.get('param2').value : ''
    };
    const dialogRef = this.dialog.open(AgbListComponent, {
      width: '50%',
      height: '70%',
      data: {
        title: 'Application Data',
        serviceName: 'getRefCodeList',
        srchPayLoad: payLoad,
      },
      disableClose: true
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
      this.menuDetailsForm.get('param2').setValue(res.refCode);
    });
  }

  onSearchModuleId() {
    const payLoad = {
      "funcCode": 'I',
      "refCodeType": '03',
      "refCode": this.menuDetailsForm.get('param3').value ? this.menuDetailsForm.get('param3').value : ''
    };
    const dialogRef = this.dialog.open(AgbListComponent, {
      width: '50%',
      height: '70%',
      data: {
        title: 'Module Data',
        serviceName: 'getRefCodeList',
        srchPayLoad: payLoad,
      },
      disableClose: true
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
      this.menuDetailsForm.get('param3').setValue(res.refCode);
    });
  }

  fetchMenuDetails(value, menuInit: MenuInit) {
    this.menuDetailsResponse = value;
    this.menuInit = menuInit;
    this.param5 = value?.genDataBlock?.formData?.param5;
    this.menuDetailsForm.patchValue(value?.genDataBlock?.formData);

    if (menuInit.funcCode === 'A') {
      this.menuDetailsForm.get('menuTp').enable({ onlySelf: true });
    } else {
      this.menuDetailsForm.get('menuTp').disable({ onlySelf: true });
    }
    if (menuInit.funcCode === 'I' || menuInit.funcCode === 'D' || menuInit.funcCode === 'V' || menuInit.funcCode === 'X') {
      this.menuDetailsForm.get('param1').disable({ onlySelf: true });
      this.menuDetailsForm.get('param2').disable({ onlySelf: true });
      this.menuDetailsForm.get('param3').disable({ onlySelf: true });
      this.menuDetailsForm.get('param4').disable({ onlySelf: true });
      this.menuDetailsForm.get('secuInd').disable({ onlySelf: true });
      this.fullDisabledMenuPermissions = true;
    } else {
      this.menuDetailsForm.get('param1').enable({ onlySelf: true });
      this.menuDetailsForm.get('param2').enable({ onlySelf: true });
      this.menuDetailsForm.get('param3').enable({ onlySelf: true });
      this.menuDetailsForm.get('param4').enable({ onlySelf: true });
      this.menuDetailsForm.get('secuInd').enable({ onlySelf: true });
      this.fullDisabledMenuPermissions = false;
    }
    const mrhBlocks: MrhBlock[] = value?.mrhBlock.mrhBlocks;
    for (let mrhBlock of mrhBlocks) {
      if (mrhBlock.listName === 'mopCodeDescList') {
        this.mopCodeDescMrh = mrhBlock;
        if (mrhBlock.numberOfRecs > 0) {
          this.mopCodeDescList = CommonUtil.mrhBlockToGrid(mrhBlock);
        }
        for (const mop of this.mopCodeDescList) {
          const featureNameForm = new FormGroup({
            langCode: new FormControl('', Validators.required),
            langCodeDesc: new FormControl('', Validators.required),
            menuDesc: new FormControl('', englishOnlyValidatorForFormArray(mop.langCode)),
            delFlg: new FormControl(''),
            lchgTime: new FormControl('')
          });
          (this.menuDetailsForm.get('languageDetails') as FormArray).push(featureNameForm);
        }
        this.menuDetailsForm.get('languageDetails').patchValue(this.mopCodeDescList);
      } else if (mrhBlock.listName === 'mopPermList') {
        this.mopPermMrh = mrhBlock;
      }
    }
  }

  get menuType() {
    return this.menuDetailsForm.get('menuTp').value;
  }

  get param1() {
    return this.menuDetailsForm.get('param1');
  }

  get param2() {
    return this.menuDetailsForm.get('param2');
  }

  get param3() {
    return this.menuDetailsForm.get('param3');
  }

  get param4() {
    return this.menuDetailsForm.get('param4');
  }

  get funcCodeDetails() {
    return CommonUtil.funCodeDetails(this.menuInit.funcCode);
  }

}
