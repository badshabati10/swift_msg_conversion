import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class LanguageService {
  baseUrl = `${environment.apiUrl}/v1`;
  constructor(private router: Router, private http: HttpClient) {}
  updateLanguage(payLoad:any){
    return this.http.post<any>(`${this.baseUrl}/user/update-language`, payLoad)
  }

}
