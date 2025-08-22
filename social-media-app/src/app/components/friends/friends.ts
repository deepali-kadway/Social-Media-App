import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {FriendsService, FriendSearchResult} from '../../services/friends-service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  standalone: false,
  templateUrl: './friends.html',
  styleUrl: './friends.css'
})
export class Friends {
  friendsPage!: FormGroup
  searchResults: FriendSearchResult[] = []

  friends(){return this.friendsPage.get('friends')}

  constructor(private fb: FormBuilder, private service: FriendsService, private router: Router){
    this.friendsPage = this.fb.group({
      friends: ['']
    })
  }

  onKeyPress(event: any){
    const username = this.friendsPage.get('friends')?.value
    
    if(username && username.trim().length > 0){
      this.service.searchFriends(username.trim()).subscribe({
        next: (response) => {
          console.log('Search results:', response);
          this.searchResults = response;
        },
        error: (error) => {
          console.log('Search error:', error);
          this.searchResults = [];
        }
      })
    }
    else{
      this.searchResults = [];
    }
  }

  navigateToProfile(){
    this.router.navigate(['/profile'])
  }
}
