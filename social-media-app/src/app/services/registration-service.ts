import { Injectable } from '@angular/core';
import { RegistrationModel } from '../models/registration-model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {
  private apiUrl = `${environment.apiUrl}/users/register`;

constructor(private http: HttpClient){}

  register(user: RegistrationModel){
        return this.http.post(this.apiUrl, user)
  }
}
