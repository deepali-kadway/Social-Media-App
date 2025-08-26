import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {FriendsService, FriendSearchResult} from '../../services/friends-service'
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-friends',
  standalone: false,
  templateUrl: './friends.html',
  styleUrl: './friends.css'
})
export class Friends implements OnInit {
  friendsPage!: FormGroup
  searchResults: FriendSearchResult[] = []

  friends(){return this.friendsPage.get('friends')}

  constructor(private fb: FormBuilder, private service: FriendsService, private router: Router){
    this.friendsPage = this.fb.group({
      friends: ['']
    })
  }

  ngOnInit() {
    this.friendsPage.get('friends')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((searchTerm: string) => {
        if (searchTerm && searchTerm.trim().length > 0) {
          this.searchFriends(searchTerm.trim());
        } else {
          this.searchResults = [];
        }
      });
  }

  searchFriends(username: string) {
    this.service.searchFriends(username).subscribe({
      next: (response) => {
        console.log('Search results:', response);
        this.searchResults = response;
      },
      error: (error) => {
        console.log('Search error:', error);
        this.searchResults = [];
      }
    });
  }

  navigateToProfile(){
    this.router.navigate(['/profile'])
  }
}
