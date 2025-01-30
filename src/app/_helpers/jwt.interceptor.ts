import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../_services";
import {environment} from "../../environments/environment";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    // const user = this.authenticationService.userValue;
    const jwtToken = sessionStorage?.getItem('jwtToken');
    const isLoggedIn = jwtToken;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      // this.authenticationService.updateJwt(jwtToken)
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${jwtToken}`}
      });
    }

    return next.handle(request);
  }
}
