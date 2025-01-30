import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabPreventionComponent } from './tab-prevention.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: TabPreventionComponent
  },
];

@NgModule({
  declarations: [TabPreventionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TabPreventionModule { }
