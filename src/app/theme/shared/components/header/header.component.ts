import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/_services';
import { TranslateService } from "@ngx-translate/core";
import { EventBusService } from "../../../../_services/event-bus.service";
import { LanguageService } from "../../../../_services/language.service";
import { take } from "rxjs";
import { AlertService } from "../../../../_services/alert-service";
import { EventNamesConstant } from 'src/app/_constants/event-names.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  username: any;

  languageArr = [
    { val: "en", code: 'ENG', name: "English" },
    { val: "bn", code: 'BAN', name: "বাংলা" },
  ];

  prefLanguageCode: string = "ENG";
  selectedOpt: any = null;

  constructor(private authService: AuthenticationService,
    private translate: TranslateService,
    private eventBus: EventBusService,
    private languageService: LanguageService,
    private alertService: AlertService,) {
  }

  ngOnInit() {
    this.authService.user.subscribe(u => {
      this.username = u?.fullName;
    });
    let languageCode = sessionStorage.getItem('langCode')
    if (languageCode === 'BAN') {
      this.selectedOpt = this.languageArr[1];
    } else {
      this.selectedOpt = this.languageArr[0];
    }
    this.eventBus.publish({ 'name': EventNamesConstant.LANGUAGE, 'langValue': this.selectedOpt });
    this.translate.use(this.selectedOpt.val);
  }

  translateLanguageTo(selectedOpt: any) {
    this.selectedOpt = selectedOpt;
    const payLoad = {
      "functionCode": 'M',
      "loginId": this.username,
      "newLangCode": this.selectedOpt.code
    };
    this.languageService.updateLanguage(payLoad)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          // storing user changed Language Code
          sessionStorage.setItem('langCode', this.selectedOpt.code);
          this.eventBus.publish({ 'name': EventNamesConstant.LANGUAGE, 'langValue': this.selectedOpt });
          this.translate.use(this.selectedOpt.val);
        }, error: (err) => {
          if (err.error) {
            this.alertService.errorAlert(err.error.message);
          }
        }
      });
  }

  closeAllTabs() {
    this.eventBus.publish({ 'name': 'closeAllTabs' });
  }

  onLogout() {
    this.authService.logout();
  }

}
