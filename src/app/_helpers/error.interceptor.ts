import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from "../_services";
import {AlertService} from "../_services/alert-service";
import { ErrorCodeConstant } from '../_constants/error-code.constant';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private alertService: AlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.error(err);
            if ([401, 403].includes(err.status) && this.authenticationService.userValue) {
                // auto logout if 401 or 403 response returned from api
                this.authenticationService.logout();
            }
             if([500,504].includes(err.status)){
              this.alertService.errorAlert(err.error, err.statusText);
            } else if([404].includes(err.status)){
              this.alertService.errorAlert(err.error, err.statusText);
            }else if(err.error && err.error.errorCode === 'null'){
               this.alertService.errorAlert(err.error.message, err.statusText);
             }else if(err.error && (err.error.errorCode === ErrorCodeConstant.INVALID_SECURITY_TOKEN
               || err.error.errorCode === ErrorCodeConstant.USER_NOT_LOGGED_IN)){
               this.authenticationService.logout();
             }
            return throwError(err);
        }))
    }
}
