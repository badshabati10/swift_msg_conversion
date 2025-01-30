import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class CustomHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient, public prefix: string = "./assets/i18n/", public suffix: string = ".json") { }

  getTranslation(lang: string): Observable<any> {
    if (this.prefix === './assets/i18n/') {
      return this.http.get(`${this.prefix}${lang}${this.suffix}`).pipe(map(u => {
        let value = {...u};
        return value;
      }));
    }

    const firstReq = this.http.get(`${this.prefix}${lang}${this.suffix}`);
    const secondReq = this.http.get(`./assets/i18n/${lang}${this.suffix}`);
    return combineLatest(firstReq, secondReq).pipe(map(u => {
      let value = { ...u[0], ...u[1] };
      return value;
    }));
  }
}
