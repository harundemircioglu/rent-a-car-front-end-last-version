import { Component, OnInit } from '@angular/core';
import { Reservations } from '../../../../src/core/models/reservation.model';
import { User } from '../../../../src/core/models/user.model';
import { Car } from '../../../../src/core/models/car.model';
import { ApiService } from '../../../../src/core/services/api/api.service';
import { ResponseStatus } from '../../../../src/core/models/response/base-response.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ReservationsComponent {

  reservations: Reservations[] = [];

  updateDialog: boolean = false;

  selectedReservation: Reservations | null = null;



  constructor(
    private readonly apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }


  //Tüm rezervasyonları getiren kod
  refresh() {
    this.apiService.getAllEntities(Reservations).subscribe((response) => {
      this.reservations = response.data;
      console.log(this.reservations)
    });
  }

  hideDialog() {
    this.updateDialog = false;
  }

  //ID değerine göre rezervasyon getiren kod
  openUpdateDialog(id: number) {
    this.apiService.getEntityById<Reservations>(id, Reservations).then((response) => {
      if (response && response.data) {
        this.updateDialog = true;
        this.selectedReservation = response.data; // API'den alınan aracı carToEdit değişkenine atıyoruz
      } else {
        console.error('Araç bulunamadı veya alınırken bir hata oluştu.');
      }
    }).catch((error) => {
      console.error('Araç alınırken bir hata oluştu:', error);
    });
  }

  //Rezervasyon güncelleme kodları
  onUpdate(id: number, updatedReservation: Reservations) {
    this.update(id, updatedReservation).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Rezervasyon güncelleme başarılı', life: 3000 });
        this.hideDialog(); // Güncelleme işlemi tamamlandığında dialogu gizle
      }
    }).catch((error) => {
      console.error('Araç güncellenirken bir hata oluştu:', error);
    });
  }

  update(id: number, updatedReservation: Reservations) {
    return this.apiService.updateEntity(id, updatedReservation, Reservations);
  }

  //Rezervasyon silme kodları
  onDelete(id: number) {
    this.delete(id).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Rezervasyon başarı ile silindi', life: 3000 });
      }
    });
  }

  delete(id: number) {
    return this.apiService.deleteEntity(id, Reservations);
  }


  ngOnInit() {
    this.refresh();
  }

}
