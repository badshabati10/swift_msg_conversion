import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {englishOnlyValidator} from "../../../../_custom-validator/custom-validators.component";
import {CommonUtil} from "../../../../_helpers/common.util";
import {AgbListComponent} from "../../../../shared/components/agb-list/agb-list.component";
import {take} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {NavigationService} from "../../../../theme/layout/private-layout/navigation/nav-content/navigation.service";
import {MenuInit} from "../menu-init";

@Component({
  selector: 'app-menu-search-form',
  templateUrl: './menu-search-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ]})

export class MenuSearchFormComponent implements OnInit{
  classInitializer = CommonUtil.classInitializer;
  funcCodes: any[];
  @Output() onNextButtonEmit = new EventEmitter<MenuInit>();
  menuInit: MenuInit = new MenuInit();

  constructor(private _formBuilder: FormBuilder,  private dialog: MatDialog, private navService: NavigationService) {
  }
  menuSearchForm = this._formBuilder.group({
    funcCode: 'I',
    menuId: ['', [Validators.required, englishOnlyValidator()]]
  });

  onChangeFunCode() {
    this.menuSearchForm.get('menuId').setValue('');
    this.menuInit = new MenuInit();
  }

  ngOnInit(): void {
    this.funcCodes = this.navService.getPermittedOptions();
  }

  onSearchMenuId() {
    const dialogRef = this.dialog.open(AgbListComponent, {
      width: '50%',
      height: '70%',
      data: {
        title: 'Menu List',
        serviceName: 'getMenuByMenuId',
        srchPayLoad: this.menuSearchForm.value,
      },
      disableClose: true
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
      this.menuSearchForm.get('menuId').setValue(res.menuId);
      this.menuInit = res;
    });
  }

  onNext(){
    this.menuInit = {...this.menuInit,...this.menuSearchForm.value};
    this.menuInit.menuIdSource = this.navService.getMenuId();
    this.onNextButtonEmit.emit(this.menuInit);
  }

  get menuId() {
    return this.menuSearchForm.get('menuId');
  }
  get funCode() {
    return this.menuSearchForm.get('funcCode').value;
  }

  onCancel(){
    this.menuInit = new MenuInit();
    this.menuSearchForm.reset({'funcCode': 'I'})
  }

}
