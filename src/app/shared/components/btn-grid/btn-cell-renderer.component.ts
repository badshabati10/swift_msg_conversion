import {ICellRendererAngularComp} from "ag-grid-angular";
import {Component, EventEmitter, Output} from "@angular/core";
import {ICellRendererParams} from "ag-grid-community";



interface CustomButtonParams extends ICellRendererParams {
  onClick: () => void;
}

@Component({
  selector: 'btn-cell-renderer',
  template: `
    <button class="btn" (click)="onClick('edit')"><i class="ti ti-pencil"></i></button>
    <button class="btn" (click)="onClick('delete')"><i class="ti ti-trash"></i></button>
  `,
})
export class BtnCellRendererComponent implements ICellRendererAngularComp {


  onClick(value){
    return value;
  }
  agInit(params: CustomButtonParams): void {
    this.onClick = params.onClick
  }
  refresh(params: CustomButtonParams) {
    return true;
  }
}
