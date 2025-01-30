import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class SearchListService {
  baseUrl = `${environment.apiUrl}/v1`;
  constructor(
    private http: HttpClient) {
  }
  getRefTypeList(payLoad:any) {
    return this.http.post<any>(`${this.baseUrl}/get-refType-list`, payLoad)
  }

  getRefCodeList(payLoad:any) {
    return this.http.post<any>(`${this.baseUrl}/refcode/get-refCode-list`, payLoad)
  }

  getRefCodeDepList(payload:any){
    return this.http.post<any>(`${this.baseUrl}/refcode/get-refcode-dep-list`, payload);
  }

  getMenuByMenuId(menuSearchObj: any){
    return this.http.post<any>(`${this.baseUrl}/menu/search-by-menu-id`,menuSearchObj);
  }

  getMsgIdList(payload: any){
    return this.http.post<any>(`${this.baseUrl}/msg/get-msgId-list`,payload);
  }

  getPersonId(payload: any) {
    return this.http.post(`${this.baseUrl}/person-inquiry/person-id-list`, payload)
  }

}
