import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { User } from '../../../../../src/core/models/user.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResponseStatus } from 'src/core/models/response/base-response.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  providers: [MessageService, ConfirmationService,]
})

export class EditUserComponent implements OnInit {

  public searchName: string = '';

  filteredUsers: User[] = [];

  constructor(
    private readonly apiService: ApiService,
    private messageService: MessageService
  ) { }

  hideDialog() {
    this.updateDialog = false;
  }

  users: User[] = [];

  searchPerson(searchKey: string) {
    this.filteredUsers = this.users.filter((user) => {
      const targetKey = user.userName + ' ' + user.email;
      return targetKey.includes(searchKey);
    });
  }

  refresh() {
    this.apiService.getAllEntities(User).subscribe((response) => {
      this.users = response.data;
    });
    this.filteredUsers = this.users;
    console.log(this.users)

  }

  //Araç silme kodu
  onDelete(id: number) {
    this.delete(id).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
      }
    });
  }

  delete(id: number) {
    return this.apiService.deleteEntity(id, User);
  }

  updatedUser: User | null = null;

  updateDialog: boolean = false;

  editUser(id: number) {
    this.apiService.getEntityById<User>(id, User).then((response) => {
      if (response && response.data) {
        this.updateDialog = true;
        this.updatedUser = response.data;
      } else {
        console.log("Kullanıcı bulunamadı veya bir hata oluştu.");
      }
    })
    this.updateDialog = true;
  }

  //Update işlemini gerçekleştiren kod
  onUpdate(id: number, updatedUser: User) {
    this.update(id, updatedUser).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı güncelleme başarılı', life: 3000 });
        this.hideDialog(); // Güncelleme işlemi tamamlandığında dialogu gizle
      }
    }).catch((error) => {
      console.error('Kullanıcı güncellenirken bir hata oluştu:', error);
    });
  }

  //Update işlemini gerçekleştiren kod
  update(id: number, updatedCar: User) {
    return this.apiService.updateEntity(id, updatedCar, User);
  }

  ngOnInit() {
    this.refresh();
  }
}


