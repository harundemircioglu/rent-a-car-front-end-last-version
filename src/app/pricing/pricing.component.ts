import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../src/core/services/api/api.service';
import { Car } from '../../../src/core/models/car.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../src/core/models/user.model';
import { AuthService } from '../../../src/core/services/auth/auth.service';
import { ReservationRequest } from '../../../src/core/models/request/reservation-request.model';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  providers: [MessageService]
})
export class PricingComponent implements OnInit {

  public reservationRequest: ReservationRequest = <ReservationRequest>{};

  //Giriş yapmış olan kullanıcının bilgileri
  currentUser: User | null;
  pickUpLocation: string | null = null;
  dropOffLocation: string | null = null;
  pickUpDate: string | null = null;
  dropOffDate: string | null = null;

  //İstediğimiz aracın altındaki reservasyon butonuna tıklanınca açılacak olan model
  reservationDialog: boolean = false;

  //Seçilen aracın bilgilerinin saklandığı değişken
  selectedCar: Car | null = null;

  //Tüm araçları getiren kod
  cars: Car[] = [];


  constructor(
    private readonly apiService: ApiService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private router: Router
  ) {
    this.currentUser = null;
  }

  //Rezervasyon modelini açan kod
  //Bu model açıldığında içerisi dolu olacak şekilde açılacak (Araç resmi - Gün/Tarih bilgileri)
  openReservation(id: number) {
    // Seçilen aracın bilgileri
    this.apiService.getEntityById<Car>(id, Car).then((response) => {
      if (response && response.data) {
        this.reservationDialog = true;
        this.selectedCar = response.data;
        // Dialog açıldığında veriler dolu gelsin ve tarihleri formatlayalım
        this.reservationRequest.car_pickup_location = this.pickUpLocation ? this.pickUpLocation : '';
        this.reservationRequest.car_dropoff_location = this.dropOffLocation ? this.dropOffLocation : '';
        this.reservationRequest.pick_Up_Date = this.pickUpDate
          ? this.datePipe.transform(this.pickUpDate, 'dd/MM/yyyy') || ''
          : '';
        this.reservationRequest.choose_A_Date = this.dropOffDate
          ? this.datePipe.transform(this.dropOffDate, 'dd/MM/yyyy') || ''
          : '';
      } else {
        console.error('Araç bulunamadı veya alınırken bir hata oluştu.');
      }
    }).catch((error) => {
      console.error('Araç alınırken bir hata oluştu:', error);
    });
  }


  //Rezervasyon ekleme kodları
  createReservation(entity: ReservationRequest) {
    // Seçilen aracın ve kullanıcının kimliğini ayarlayın
    entity.car_id = this.selectedCar?.id || 0;
    entity.user_id = this.currentUser?.id || 0;

    //Kullanıcı başta konum/zaman seçmezse rezervasyon oluşturmasın
    if (
      this.reservationRequest.car_pickup_location == "" ||
      this.reservationRequest.car_dropoff_location == "" ||
      this.reservationRequest.pick_Up_Date == "" ||
      this.reservationRequest.choose_A_Date == "") {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Boş alanları doldurunuz' });
    }
    else {
      // Ardından, API'ye yeni rezervasyonu göndermek için apiService.createEntity() metodunu kullanın
      this.apiService.createEntity<ReservationRequest>(entity, 'Reservations')
        .then((response) => {
          // Başarılı yanıt alındığında yapılacak işlemler
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Rezervasyon başarıyla oluşturuldu' });
          this.hideDialog(); // Rezervasyon modelini gizleyin (isteğe bağlı)

          // İKİ SANİYE SONRA HOME SAYFASINA DÖN
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        })
        .catch((error) => {
          // Hata durumunda yapılacak işlemler
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Rezervasyon oluşturulurken bir hata oluştu' });
        });
    }
  }


  //Reservasyon modelini gizleyen kod
  hideDialog() {
    this.reservationDialog = false;
  }

  refresh() {
    //Tüm araçları getiren kod
    this.apiService.getAllEntities(Car).subscribe((response) => {
      this.cars = response.data;
    });
  }

  ngOnInit() {

    //Kullanıcının bilgileri
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    //Anasayfadan gelen tarih ve konum bilgileri
    this.route.queryParams.subscribe(params => {
      this.pickUpLocation = params['pick_up_location'];
      this.dropOffLocation = params['drop_off_location'];
      this.pickUpDate = params['pick_up_date'];
      this.dropOffDate = params['drop_off_date'];
    });
    this.refresh();
  }
}
