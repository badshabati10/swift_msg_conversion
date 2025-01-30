import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CoreConfigComponent} from "./core-config.component";

const routes: Routes = [
  {
    path: '',
    component: CoreConfigComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
})
export class CoreConfigModule {
}
