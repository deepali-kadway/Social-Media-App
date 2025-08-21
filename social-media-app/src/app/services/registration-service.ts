import { Injectable } from '@angular/core';
import { RegistrationModel } from '../models/registration-model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

interface User {
  id: string;
  username: string;
  fullname: string;
}

interface RegistrationResponse {
  message: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {
  private apiUrl = `${environment.apiUrl}/users/register`;

constructor(private http: HttpClient){}

  register(user: RegistrationModel): Observable<RegistrationResponse>{
        return this.http.post<RegistrationResponse>(this.apiUrl, user);
  }
}
