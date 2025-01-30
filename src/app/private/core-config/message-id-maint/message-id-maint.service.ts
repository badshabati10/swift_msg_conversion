import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MessageIdMaintService {
  baseUrl = `${environment.apiUrl}/v1`;
  constructor(
    private http: HttpClient) {
  }

  getMsgIdDetail(payload: any) {
    return this.http.post<any>(`${this.baseUrl}/msg/get-msgId-detail`, payload)
  }

  submit(payload: any) {
    return this.http.post<any>(`${this.baseUrl}/msg/submit`, payload)
  }
}
