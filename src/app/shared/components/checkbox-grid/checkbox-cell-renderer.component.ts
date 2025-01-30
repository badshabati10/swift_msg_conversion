import {ICellRendererAngularComp} from "ag-grid-angular";
import {Component} from "@angular/core";
import {ICellRendererParams} from "ag-grid-community";
import {EventBusService} from "../../../_services/event-bus.service";
import {EventNamesConstant} from "../../../_constants/event-names.constant";

@Component({
  selector: 'btn-cell-renderer',
  template: `
    <input type="checkbox" (change)="onChange($event)" [value]="value">
  `,
})
export class CheckboxCellRendererComponent implements ICellRendererAngularComp {
  params: any;
  value: boolean;
  agInit(params: any): void {
    this.params = params;
    this.value = params.value
  }
  onChange($event) {
    this.value = $event.currentTarget.checked;
    this.params.value
    this.params.change(this.params);
  }

  refresh(params: ICellRendererParams<any>): boolean {
    return false;
  }
}
