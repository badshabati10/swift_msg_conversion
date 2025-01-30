import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";


@Component({
  selector: 'app-menu-permission',
  templateUrl: './menu-permission.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ]
})
export class MenuPermissionComponent implements OnChanges {

  @Input() param5: string = '';
  @Input() fullDisabled = false;
  hasAdd = false;
  addAutoVerify = false;

  hasDelete = false;
  deleteAutoVerify = false;

  hasUndelete = false;
  undeleteAutoVerify = false;

  hasModification = false;
  modificationAutoVerify = false;

  hasCopy = false;
  hasVerify = false;
  hasCancel = false;

  funcToFormSet(param5: string) {
    if (!param5)
      return;
    const arr = param5.split(',');
    for (let i = 0; i < arr.length; i++) {
      let value = arr[i].split('-');
      switch (value[0]) {
        case "A": {
          this.hasAdd = true
          if (value[1] && value[1] == 'Y') {
            this.addAutoVerify = true;
          }
          break;
        }
        case "D": {
          this.hasDelete = true;
          if (value[1] && value[1] == 'Y') {
            this.deleteAutoVerify = true;
          }
          break;
        }
        case "U": {
          this.hasUndelete = true;
          if (value[1] && value[1] == 'Y') {
            this.undeleteAutoVerify = true
          }
          break;
        }
        case "M": {
          this.hasModification = true;
          if (value[1] && value[1] == 'Y') {
            this.modificationAutoVerify = true;
          }
          break;
        }
        case "C": {
          this.hasCopy = true
          break;
        }
        case "V": {
          this.hasVerify = true
          break;
        }
        case "X": {
          this.hasCancel = true;
          break;
        }
        default: {
          break;
        }
      }
    }
  }

   checkBoxValues() {
  //   if (this.menuDetailsForm.get('hasAdd').value) {
  //     this.menuDetailsForm.get('addAutoVerify').enable({onlySelf: true});
  //   } else {
  //     this.menuDetailsForm.get('addAutoVerify').setValue(false);
  //     this.menuDetailsForm.get('addAutoVerify').disable({onlySelf: true});
  //   }
  //   if (this.menuDetailsForm.get('hasDelete').value) {
  //     this.menuDetailsForm.get('deleteAutoVerify').enable({onlySelf: true});
  //   } else {
  //     this.menuDetailsForm.get('deleteAutoVerify').disable({onlySelf: true});
  //     this.menuDetailsForm.get('deleteAutoVerify').setValue(false);
  //   }
  //
  //   if (this.menuDetailsForm.get('hasUndelete').value) {
  //     this.menuDetailsForm.get('undeleteAutoVerify').enable({onlySelf: true});
  //   } else {
  //     this.menuDetailsForm.get('undeleteAutoVerify').setValue(false);
  //     this.menuDetailsForm.get('undeleteAutoVerify').disable({onlySelf: true});
  //   }
  //   if (this.menuDetailsForm.get('hasModification').value) {
  //     this.menuDetailsForm.get('modificationAutoVerify').enable({onlySelf: true});
  //   } else {
  //     this.menuDetailsForm.get('modificationAutoVerify').setValue(false);
  //     this.menuDetailsForm.get('modificationAutoVerify').disable({onlySelf: true});
  //   }
  }


  param5Gen() {
    let values = [];
    if(this.hasAdd === true){
      values.push(this.addAutoVerify === true? 'A-Y':'A-N');
    }
    if(this.hasDelete === true){
      values.push(this.deleteAutoVerify === true? 'D-Y':'D-N');
    }
    if(this.hasUndelete === true){
      values.push(this.undeleteAutoVerify === true? 'U-Y':'U-N');
    }
    if(this.hasModification === true){
      values.push(this.modificationAutoVerify === true? 'M-Y':'M-N');
    }
    values.push(this.hasCopy === true? 'C-Y': 'C-N');
    values.push(this.hasVerify === true? 'V-Y': 'V-N');
    values.push(this.hasCancel === true? 'X-Y': 'X-N');
    return values.toString();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('inside ... ');
    console.log(this.param5);
    this.funcToFormSet(this.param5);
  }

  reset(){
    this.param5 = '';
    this.hasAdd = false;
    this.addAutoVerify = false;

    this.hasDelete = false;
    this.deleteAutoVerify = false;

    this.hasUndelete = false;
    this.undeleteAutoVerify = false;

    this.hasModification = false;
    this.modificationAutoVerify = false;

    this.hasCopy = false;
    this.hasVerify = false;
    this.hasCancel = false;
  }
}
