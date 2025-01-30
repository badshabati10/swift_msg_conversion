import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ColDef, GridApi, SelectionChangedEvent} from 'ag-grid-community';
import {AgGridAngular} from "ag-grid-angular";
import {forkJoin, take} from "rxjs";
import {CommonModule} from "@angular/common";
import {PopupTransition} from "../popup-transition";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {CommonUtil} from "../../../../../_helpers/common.util";

@Component({
  selector: 'app-inside-popup',
  templateUrl: './inside-popup.component.html',
  standalone: true,
  styleUrls: ['./inside-popup.component.scss'],
  imports: [AgGridAngular, CommonModule, TranslateModule]
})
export class InsidePopupComponent implements OnInit {

  rowData: any;
  columnDefs: ColDef[];
  title: string;
  messageDetails: string;
  selectionMode: any = 'single';
  maxPageNumber:number=99;
  currentPageNumber = 1;
  rowHeight: number = 23;
  headerHeight: number = 30;
  defaultColDef: any;
  payload:any;
  private gridApi: GridApi;
  constructor(private dialogRef: MatDialogRef<InsidePopupComponent>, private translateService: TranslateService,
              @Inject(MAT_DIALOG_DATA) public data: PopupTransition, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.callApi();
    this.defaultColDef={
      flex : 1,
      minWidth : 100,
    }
  }


  callApi() {
    const curLang = this.translateService.currentLang;
    if(this.data.languageDirectory && this.data.languageDirectory.length>0){

      const firstReq = this.http.get(`./assets/i18n/nrx-searcher/${this.data.languageDirectory}/${curLang}.json`);
      const secondReq = this.http.get(`./assets/i18n/nrx-searcher/common/${curLang}.json`);
      forkJoin([firstReq,secondReq]).
     pipe(take(1)).subscribe( u =>
      {
        this.translateService.setTranslation(curLang, u[0], true);
        this.translateService.setTranslation(curLang, u[1], true);
        this.payload = this.data.payload
        this.payload.pageNum = this.currentPageNumber;
        this.data.serviceCall$(this.payload).pipe(take(1))
          .subscribe((list:any) =>{
            {
              this.maxPageNumber = list?.maxPageNum;
              if(curLang == 'bn'){
                let numbers: string = list?.message.match(/\d+/g);
                let totalNumber = CommonUtil.convertNumberToBangla(numbers.toString());
                let curPageNum = CommonUtil.convertNumberToBangla(list?.curPageNum.toString());
                let maxPageNum = CommonUtil.convertNumberToBangla(list?.maxPageNum.toString());
                this.messageDetails = 'মোট ' + totalNumber + ' রেকর্ড পাওয়া গেছে। '+ ' বর্তমান পৃষ্ঠা নং ' + curPageNum + ' সর্বোচ্চ পৃষ্ঠা নং ' + maxPageNum;
              }else{
                this.messageDetails = list?.message + ' Current Page No.' + list?.curPageNum + ' Max Page No.' + list?.maxPageNum;
              }
              this.setHeaderNames(list.numberOfRecs,list.headerInfo);
              this.setGridData(list.numberOfRecs,list.headerInfo, list.dataBlock);

            }
          }, (error: any) => {
            this.dialogRef.close();
        });
      });
    }else{
      this.payload = this.data.payload
      this.payload.pageNum = this.currentPageNumber;
      this.data.serviceCall$(this.payload).pipe(take(1))
        .subscribe((list:any) =>{
          {
            this.maxPageNumber = list?.maxPageNum;
            this.messageDetails = list?.message + ' Current Page No.' + list?.curPageNum + ' Max Page No.' + list?.maxPageNum;
            this.setHeaderNames(list.numberOfRecs,list.headerInfo);
            this.setGridData(list.numberOfRecs,list.headerInfo, list.dataBlock);

          }
        }, (error: any) => {
            this.dialogRef.close();
        });
    }
    // this.title = this.translateService.instant(this.data.title);

  }
  setHeaderNames(numberOfRecs:number,headerInfo: string[]) {
    this.columnDefs = [];
    let definition: ColDef;
    // for serial number
    if(numberOfRecs > 0){
      definition = {headerName: this.translateService.instant('SL'),field:'sl', valueGetter: "node.rowIndex + 1", flex: 1};
    }else {
      definition = {headerName: this.translateService.instant('SL'),field:'sl',flex: 1};
    }
    this.columnDefs.push(definition);

    headerInfo.forEach((header: string) => {
      definition = {headerName: this.translateService.instant(header), field: header, flex: 1};
      this.columnDefs.push(definition);
    });
  }

  setGridData(numberOfRecs:number,headerInfo: string[], dataBlock: String[]) {
    this.rowData = [];
    if(numberOfRecs >0){
      for (let row of dataBlock) {
        let jsonObj = {}
        for (let i = 0; i < row.length; i++) {
          jsonObj[headerInfo[i]] = row[i];
        }
        this.rowData.push(jsonObj);
      }
    }
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    const selectedData = this.gridApi.getSelectedRows()[0];
    this.dialogRef.close(selectedData);
  }

  onGridReady(params) {
    this.gridApi = params.api;

  }

  onNextPage() {
    this.currentPageNumber++;
    this.callApi();
  }

  onPrevPage() {
    this.currentPageNumber--;
    this.callApi();
  }
}
