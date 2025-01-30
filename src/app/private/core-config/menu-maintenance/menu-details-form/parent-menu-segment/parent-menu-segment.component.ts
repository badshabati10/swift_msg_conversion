import {Component, Input, OnChanges, SimpleChanges, ViewChild} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {MrhBlock} from "../../../../../_models/socket-payload/mrh-block";
import {NrxGridComponent} from "../../../../../shared/components/nrx-grid/nrx-grid.component";
import {AlertService} from "../../../../../_services/alert-service";
import {MenuInit} from "../../menu-init";
import {AgbListComponent} from "../../../../../shared/components/agb-list/agb-list.component";
import {take} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ColDef} from "ag-grid-community";
import {CommonUtil} from "../../../../../_helpers/common.util";
import {MenuMaintenanceService} from "../../menu-maintenance.service";


@Component({
  selector: 'app-parent-menu-segment',
  templateUrl: './parent-menu-segment.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    NrxGridComponent
]
})
export class ParentMenuSegmentComponent implements OnChanges{
  parentMenuForm = this._formBuilder.group({
    parMenuCode: '',
    parMenuCodeDesc: '',
    levelCode: '',
    delFlg: '',
    entityCreFlg: '',
    lchgTime: ''
  });
  // @Input() mrhBlock: any[];
  rowData = [];
  mopParemListcolumnDefs: ColDef[] = [
    {field: 'parMenuCode', headerName: 'Parent Menu', colId: 'parMenuCode'},
    {field: 'parMenuCodeDesc', headerName: 'Parent Menu Desc'},
    {field: 'entityCreFlg', hide: true},
    {field: 'lchgTime', hide: true},
    {field: 'levelCode', headerName: 'Level'},
    {field: 'delFlg', headerName: 'Delete?'}
  ];
  @ViewChild(NrxGridComponent) nrxGrid: NrxGridComponent;
  constructor(private _formBuilder: FormBuilder, private alertService: AlertService,
              private dialog: MatDialog, private menuMaintenanceService: MenuMaintenanceService) {
  }


  isUpdate = false;
  updateNode: any;

  mopPermList: any[] = [];
  @Input() mopPermMrh: MrhBlock = new MrhBlock();
  @Input() menuInit:MenuInit = new MenuInit();

  addOnParentGrid(type: string) {
    let formData = this.parentMenuForm.value;

    const payload = {'funcCode': 'I', 'menuId': formData.parMenuCode};
    this.menuMaintenanceService.menuVerification(payload).subscribe({
      next: (response) => {


        formData = {...formData, 'delFlg': formData.delFlg ? 'Y' : 'N'};
        let parentRows = <any>this.nrxGrid.gridApi.getRenderedNodes();
        let arr = [];
        let obj = parentRows.find(u => u.parMenuCode === formData.parMenuCode);
        if (!this.isUpdate && obj) {
          this.alertService.warningAlert(`Parent menu already exist ${obj.parMenuCode}`)
          return;
        }

        if (this.isUpdate) {
          this.updateNode.updateData(formData);
        } else {
          arr.push(formData);
        }
        this.nrxGrid.onGridReset(arr, type);
        this.parentMenuForm.reset();
        this.isUpdate = false;
      },
      error: (err) => {
        this.alertService.warningAlert(err.error.message);
      }
    });
  }

  onRowClick($event) {
    this.updateNode = $event.node;
    $event.data.delFlg = $event.data.delFlg === 'Y';
    this.parentMenuForm.patchValue($event.data);
    this.isUpdate = true;
  }

  onSearchParentMenuId() {
    const data = {
      'menuId': this.parentMenuForm.get('parMenuCode').value,
      'funcCode': 'I'
    };
    const dialogRef = this.dialog.open(AgbListComponent, {
      width: '50%',
      height: '70%',
      data: {
        title: 'Menu List',
        serviceName: 'getMenuByMenuId',
        srchPayLoad: data,
      },
      disableClose: true
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
      this.parentMenuForm.get('parMenuCode').patchValue(<never>res?.menuId)
      this.parentMenuForm.get('parMenuCodeDesc').patchValue(<never>res?.menuDesc)
    });
  }

  get isDisabled() {
    return (this.parentMenuForm.get('lchgTime').value && this.isUpdate);
  }

  onCancel(){
    this.parentMenuForm.reset();
    this.nrxGrid?.gridApi.setRowData([]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.mopPermMrh.numberOfRecs > 0) {
      this.mopPermList = CommonUtil.mrhBlockToGrid(this.mopPermMrh);
    }
  }

  extractGridData(){
    let rows = [];
     this.nrxGrid?.gridApi.getRenderedNodes().forEach(u => rows.push(u.data));
    return rows;
  }
}
