import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PrivateLayoutComponent} from './theme/layout/private-layout/private-layout.component';
import {NavBarComponent} from './theme/layout/private-layout/nav-bar/nav-bar.component';
import {NavigationComponent} from './theme/layout/private-layout/navigation/navigation.component';
import {NavLogoComponent} from './theme/layout/private-layout/nav-bar/nav-logo/nav-logo.component';
import {NavContentComponent} from './theme/layout/private-layout/navigation/nav-content/nav-content.component';
import {NavGroupComponent} from './theme/layout/private-layout/navigation/nav-content/nav-group/nav-group.component';
import {NavCollapseComponent} from './theme/layout/private-layout/navigation/nav-content/nav-collapse/nav-collapse.component';
import {NavItemComponent} from './theme/layout/private-layout/navigation/nav-content/nav-item/nav-item.component';
import {SharedModule} from './theme/shared/shared.module';
import {PublicLayoutComponent} from './theme/layout/public-layout/public-layout.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
// import {appInitializer, ErrorInterceptor, JwtInterceptor} from "./_helpers";
import {appInitializer} from "./_helpers";
import {AuthenticationService} from "./_services";
import {PagenotfoundComponent} from "./pagenotfound/pagenotfound.component";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
// import {LoaderInterceptor} from "./_helpers/loader.interceptor";
import { MAT_DATE_LOCALE } from '@angular/material/core';


export function httpTranslateLoaderFactory(http: HttpClient) {return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}
@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    PrivateLayoutComponent,
    NavBarComponent,
    NavigationComponent,
    NavLogoComponent,
    NavContentComponent,
    NavGroupComponent,
    NavItemComponent,
    NavCollapseComponent,
    PublicLayoutComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, BrowserAnimationsModule, HttpClientModule,SweetAlert2Module.forRoot(),
    TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: httpTranslateLoaderFactory,
      deps: [HttpClient]
    }
  })],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
   // { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthenticationService]},
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
