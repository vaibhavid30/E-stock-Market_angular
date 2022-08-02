import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  url = "http://localhost:8081/market/company";

  constructor(private _http: HttpClient) { }

  public getCompanyList(): Observable<any> {
    return this._http.get<any>(this.url + "/getall");
  }

  public getcompanyByCompanyID(companyID: string): Observable<any> {
    return this._http.get<any>(this.url + "/info/" + companyID);
  }

  registerCompany(body: any) {
    return this._http.post<any>(this.url + '/register', body);
  }

  deletecompanyByCompanyID(companyID: string): Observable<any> {
    return this._http.delete<any>(this.url + "/delete/" + companyID);
  }

}
