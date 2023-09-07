import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../../src/core/services/auth/auth.service';
import { User } from '../../../../src/core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent {
  items: MenuItem[] | undefined;

  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { this.currentUser = null }


  ngOnInit() {

    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser?.userType === 0 || this.currentUser == null) {
        this.router.navigate(['/home']);
      }
    });

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/admin/home',
      },
      {
        label: 'User',
        icon: 'pi pi-user-edit',
        routerLink: '/admin/edit-user',
      },
      {
        label: 'Car',
        icon: 'pi pi-car',
        routerLink: '/admin/edit-car',
      },

      {
        label: 'Reservations',
        icon: 'pi pi-bookmark',
        routerLink: '/admin/reservations',
      },
      {
        label: 'Comments',
        icon: 'pi pi-comments',
        routerLink: '/admin/comments',
      },
      {
        label: 'Contacts',
        icon: 'pi pi-envelope',
        routerLink: '/admin/contacts',
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        routerLink: '/admin/profile',
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.logout(),
      }
    ];
  }
  logout() {
    return this.authService.logOut();
  }
}
