import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })

export class ForgotPasswordService{

    baseUrl = `${environment.apiUrl}/v1`;

    constructor(private http: HttpClient) {}

    resetForgetPassword(finalPayload: any) {
      return this.http.post<any>(`${this.baseUrl}/public/password-reset`, finalPayload)
    }

    getOtpForgetPassword(payload: any) {
      return this.http.post<any>(`${this.baseUrl}/public/otp/request-forget-password`, payload)
    }
}
