import {NgModule} from '@angular/core';
import {ChangePasswordComponent} from './change-password.component';
import {RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
  {
    path: '',
    component: ChangePasswordComponent
  },
];


@NgModule({
    declarations: [
      // ChangePasswordComponent
    ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class ChangePasswordModule { }
