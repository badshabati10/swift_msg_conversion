import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { WelcomeMessageModule } from "../welcome-message/welcome-message.module";
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        NgbModule,
        WelcomeMessageModule,
        RouterModule,
        FormsModule,
        TranslateModule
    ],
    exports:[HeaderComponent]
})
export class HeaderModule { }
