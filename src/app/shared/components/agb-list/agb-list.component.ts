import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColDef, GridApi, SelectionChangedEvent } from 'ag-grid-community';
import { AgGridAngular } from "ag-grid-angular";
import { take } from "rxjs";
import { SearchListService } from "../../../_services/search-list.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-agb-list',
  templateUrl: './agb-list.component.html',
  standalone: true,
  styleUrls: ['./agb-list.component.scss'],
  imports: [AgGridAngular, CommonModule]
})
export class AgbListComponent implements OnInit {
  private gridApi: GridApi;
  constructor(public dialogRef: MatDialogRef<AgbListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private srchListService: SearchListService) {
    this.callApi();
  }

  rowData: any;
  columnDefs: ColDef[];
  title: string;
  messageDetails: string;
  selectionMode: any = 'single';
  maxPageNumber: number = 99;
  currentPageNumber: number = 1;
  rowHeight: number = 23;

  ngOnInit(): void {
   
  }

  callApi() {
    this.data.srchPayLoad.numOfRecsPerPage = 10;
    this.data.srchPayLoad.pageNum = this.currentPageNumber;
    this.srchListService[`${this.data.serviceName}`](this.data.srchPayLoad)
      .pipe(take(1))
      .subscribe({
        next: (listBlock) => {
          this.maxPageNumber = listBlock.maxPageNum;
          this.messageDetails = listBlock.message + ' Current Page No.' + listBlock.curPageNum + ' Max Page No.' + listBlock.maxPageNum;
          this.setHeaderNames(listBlock.numberOfRecs, listBlock.headerInfo);
          this.setGridData(listBlock.numberOfRecs, listBlock.headerInfo, listBlock.dataBlock);
        }
      });
  }
  setHeaderNames(numberOfRecs: number, headerInfo: string[]) {
    this.columnDefs = [];
    let definition: ColDef;
    // for serial number
    if (numberOfRecs > 0) {
      definition = { headerName: "SL", field: 'sl', valueGetter: "node.rowIndex + 1", flex: 1 };
    } else {
      definition = { headerName: "SL", field: 'sl', flex: 1 };
    }
    this.columnDefs.push(definition);

    headerInfo.forEach((header: string) => {
      definition = { headerName: this.formatHeaderName(header), field: header, flex: 1 };
      this.columnDefs.push(definition);
    });
  }

  setGridData(numberOfRecs: number, headerInfo: string[], dataBlock: String[]) {
    this.rowData = [];
    if (numberOfRecs > 0) {
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

  formatHeaderName(header: string): string {
    return header.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());
  }

}
