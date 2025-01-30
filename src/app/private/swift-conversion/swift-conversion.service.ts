import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SwiftConversionService {

  baseUrl = `${environment.apiUrl}/v1`;

  constructor(private http: HttpClient) { }

 

   getSwiftDataList():Observable<any> {
   // return this.http.get(`${this.baseUrl}/msgconversion/search`)
    return this.http.get('http://localhost:8080/api/swift/v1/msgconversion/search');
  }

}
