import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface FriendSearchResult {
  id: string;
  username: string;
  fullname: string;
}

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  
private apiUrl = `${environment.apiUrl}/friends/search`

constructor(private http: HttpClient){}

searchFriends(username: string): Observable<FriendSearchResult[]>{
  return this.http.get<FriendSearchResult[]>(this.apiUrl, {
    params: {username: username}
  });
}
}
