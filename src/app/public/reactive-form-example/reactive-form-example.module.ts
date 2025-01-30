import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormExampleComponent} from './reactive-form-example.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {DirectiveModule} from "../../directives/upper-case.directive";
import {InputMaskModule} from "@ngneat/input-mask";

const routes: Routes = [
  {
    path: '',
    component: ReactiveFormExampleComponent
  },
];


@NgModule({
    declarations: [
      ReactiveFormExampleComponent
    ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DirectiveModule,
    MatInputModule,
    InputMaskModule
  ],
  providers: [MatDatepickerModule]
})
export class ReactiveFormExampleModule { }
