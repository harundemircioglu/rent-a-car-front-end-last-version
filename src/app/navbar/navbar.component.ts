import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/core/services/auth/auth.service';
import { User } from '../../../src/core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false; // Oturum durumunu takip eden değişken
  currentUser: User | null = null; // Mevcut kullanıcı bilgilerini tutan değişken
  openPanel: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser?.userType === 1) {
        this.openPanel = true;
      }
      this.isLoggedIn = user !== null; // Kullanıcı oturumlu ise isLoggedIn değerini true olarak ayarla
    });
  }

  logout() {
    this.authService.logOut();
    this.openPanel = false;
    this.router.navigate(['/home']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
