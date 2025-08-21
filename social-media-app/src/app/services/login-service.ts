import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apiUrl = `${environment.apiUrl}/users/login`;

  constructor(private http: HttpClient){}

  login(user: Login){
    return this.http.post(this.apiUrl, user)
  }

}
