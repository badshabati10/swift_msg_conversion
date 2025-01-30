import {NgModule} from '@angular/core';
import {CheckboxCellRendererComponent} from "./checkbox-cell-renderer.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [CheckboxCellRendererComponent],
  imports: [FormsModule],
  exports: [
    CheckboxCellRendererComponent
  ]
})
export class CheckboxCellRendererModule {
}
