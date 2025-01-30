import {NgModule} from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {TabsComponent} from "./tabs.component";


@NgModule({
  declarations: [
    TabsComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule
  ],
  exports: [TabsComponent]
})
export class TabsModule {
}
