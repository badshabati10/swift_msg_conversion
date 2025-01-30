import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({providedIn: 'root'})
export class AgbFileService {
  baseUrl = `${environment.apiUrl}/v1`;
  constructor(
    private http: HttpClient) {
  }
  uploadFile(payLoad:any) {
    return this.http.post<any>(`${this.baseUrl}/file/upload`, payLoad)
  }

}
