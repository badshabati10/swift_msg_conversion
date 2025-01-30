import {Component, EventEmitter, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {take} from "rxjs";
import {PopupTransition} from "./popup-transition";
import {InsidePopupComponent} from "./inside-popup/inside-popup.component";
import {LoaderService} from "src/app/_services/loader.service";

@Component({
  selector: 'app-nrx-popup-grid',
  templateUrl: './nrx-popup-grid.component.html',
  standalone: true,
  imports: [CommonModule, NrxPopupGridComponent]
})
export class NrxPopupGridComponent {

  @Output() selectedValue = new EventEmitter<any>();
  constructor(private dialog: MatDialog, private loader: LoaderService) {
  }

  startDialogBox(payload: PopupTransition) {
    this.loader.showLoader();
    const dialogRef = this.dialog.open(InsidePopupComponent, {
      width: '50%',
      height: '70%',
      data: payload,
      disableClose: true
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
      if(res){
        this.selectedValue.emit(res);
      }
      this.loader.hideLoader();
    });
  }

}
