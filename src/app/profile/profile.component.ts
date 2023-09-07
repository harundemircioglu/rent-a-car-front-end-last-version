import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../src/core/services/auth/auth.service';
import { User } from '../../../src/core/models/user.model';
import { Router } from '@angular/router';
import { ApiService } from '../../../src/core/services/api/api.service';
import { ResponseStatus } from '../../../src/core/models/response/base-response.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: User | null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService,
  ) {
    this.currentUser = null;
  }

  //Update işlemini gerçekleştiren kod
  onUpdate(id: number, currentUser: User) {
    this.update(id, currentUser).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        //this.refresh();
        //this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Araç güncelleme başarılı', life: 3000 });
        //this.hideDialog(); // Güncelleme işlemi tamamlandığında dialogu gizle
        console.log(response.message);
      }
    }).catch((error) => {
      console.error('Kullanıcı güncellenirken bir hata oluştu:', error);
    });
  }

  //Update işlemini gerçekleştiren kod
  update(id: number, currentUser: User) {
    return this.apiService.updateEntity(id, currentUser, User);
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (!this.currentUser) {
        this.router.navigate(['/login']);
      }
    });
  }
}
