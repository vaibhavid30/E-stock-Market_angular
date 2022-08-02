import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:8081/market/user";

  constructor(private _http: HttpClient, private _router: Router) { }

  registerUser(body: any) {
    return this._http.post<any>(this.url + '/register', body);
  }

  authenticate(email: any, password: any) {
    const body = {
      email: email,
      password: password
    }
    return this._http.post<any>(this.url + '/login', body);
  }

  logout() {
    sessionStorage.removeItem('id')
    this._router.navigate(['/user/login']);
  }
}
