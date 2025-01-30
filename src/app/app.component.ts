import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Agent Banking';

  constructor(
    public translate: TranslateService
  ){
    // Register translation languages
    translate.addLangs(['en','bn']);
    // Set default language
    translate.setDefaultLang('en');
  }
}
