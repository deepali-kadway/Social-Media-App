import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service';

interface User {
  id: string;
  username: string;
  fullname: string;
}

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  user: User | null = null;
  isMenuOpen = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    // Check if user is logged in
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    // Get current user data
    this.user = this.loginService.getCurrentUser();

    // Subscribe to user changes (in case user data is updated elsewhere)
    this.loginService.currentUser$.subscribe(user => {
      this.user = user;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  // Toggle menu method
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // search friends logic
  searchFriends(){
    this.router.navigate(['/friends'])
  }
}
