import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../environments/environment";


@Injectable({providedIn: 'root'})
export class RefCodeMaintService {
  baseUrl = `${environment.apiUrl}/v1`;
  constructor(private http: HttpClient) {}
  etRefTypeList(payLoad: any) {
    return this.http.post<any>(`${this.baseUrl}/get-refType-list`, payLoad)
  }

  getRefCodeList(payLoad: any) {
    return this.http.post<any>(`${this.baseUrl}/refcode/get-refCode-list`, payLoad)
  }


  getRefCodeDetail(payLoad:any) {
    return this.http.post<any>(`${this.baseUrl}/refcode/get-refCode-detail`, payLoad)
  }

  getRefCodeDepList(payload:any){
    return this.http.post<any>(`${this.baseUrl}/refcode/get-refcode-dep-list`, payload);
  }

  submit(payLoad:any) {
    return this.http.post<any>(`${this.baseUrl}/refcode/submit`, payLoad)
  }


}
