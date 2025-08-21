import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';

interface User {
  id: string,
  username: string,
  fullname: string
}

interface LoginResponse {
  message: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apiUrl = `${environment.apiUrl}/users/login`;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient){
    // checking for saved user on service initialization
    const savedUser = localStorage.getItem('currentUser');
    if(savedUser){
      this.currentUserSubject.next(JSON.parse(savedUser))
    }
  }

  login(user: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, user).pipe(
      map(response => {
        // save user data in local storage
        localStorage.setItem('currentUser', JSON.stringify(response.user))
        // Update current user subject (notify all subscribers)
        this.currentUserSubject.next(response.user)
        return response;
      })
    )
  }

  getCurrentUser(): User | null{
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean{
    return this.getCurrentUser() != null;
  }

  logout(): void{
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null)
  }

  getUsername(): string | null {
    const user = this.getCurrentUser();
    return user ? user.username : null
  }

  getFullname(): string | null {
    const user = this.getCurrentUser();
    return user ? user.fullname : null
  }

  // Method to set current user (useful for registration flow)
  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
