import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({ providedIn: 'root' })
export class ChangePasswordService {

  constructor(private http: HttpClient) {}

  // resetPassword(loginKeyOld: string, loginKeyNew: string, loginKeyRe: string) {
  //   const url = `${environment.apiUrl}/v1/public/password-reset`;
  //
  //   return this.http.post<any>(url, {loginKeyOld, loginKeyNew, loginKeyRe })
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error during password reset:', error);
  //         return throwError(error);
  //       })
  //     );
  // }


  changePassword(changePassword: any): Observable<any> {
   return this.http.post<any>(`${environment.apiUrl}/v1/password-change`,
      changePassword, { withCredentials: true });

  }


}
