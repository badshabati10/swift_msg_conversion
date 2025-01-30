import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {RouterModule, Routes} from "@angular/router";
import {SessionRequestModalComponent} from './session-request-modal/session-request-modal.component';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from "@angular/forms";
import {PrivateComponent} from "../private/private.component";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SwiftConversionComponent } from '../private/swift-conversion/swift-conversion.component';
import { SwiftConvSearchComponent } from '../private/swift-conversion/swift-conv-search/swift-conv-search.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'tab-prevention',
    loadChildren: () => import('./tab-prevention/tab-prevention.module').then((m) => m.TabPreventionModule)
  },
  {
    path: 'reactive-form-example',
    loadChildren: () => import('./reactive-form-example/reactive-form-example.module').then((m) => m.ReactiveFormExampleModule)
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'Swift-Conversion',
    component: SwiftConversionComponent
  },
  {
    path: 'Swift-Search',
    component: SwiftConvSearchComponent
  }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        MatDialogModule,
        MatIconModule,
        FormsModule,
    ],
  declarations: [
    SessionRequestModalComponent
  ],
  providers: [
    PrivateComponent
  ]
})
export class PublicModule {
}
