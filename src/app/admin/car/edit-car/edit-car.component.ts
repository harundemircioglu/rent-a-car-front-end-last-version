import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { Car } from '../../../../../src/core/models/car.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from '../../../../core/models/request/product.model';
import { ProductService } from '../../../../core/services/productservice';
import { CarRequest } from '../../../../../src/core/models/request/car-request.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';


@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class EditCarComponent implements OnInit {

  public carRequest: CarRequest = <CarRequest>{};

  products: Product[] = [];

  productDialog: boolean = false;

  editDialog: boolean = false;

  product!: Product;

  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(
    private readonly apiService: ApiService,
    private messageService: MessageService,
  ) { }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.editDialog = false;
    this.submitted = false;
  }

  cars: Car[] = [];

  carToEdit: Car | null = null;

  //Tüm araçları getiriyor

  refresh() {
    this.apiService.getAllEntities(Car).subscribe((response) => {
      this.cars = response.data;
    });
  }

  //Araç ekleme kodu
  // addCar() {
  //   this.apiService.addCar(this.carRequest).subscribe(
  //     (car) => {
  //       console.log('Araç başarıyla eklendi:', car);
  //       this.refresh(); // Araç ekledikten sonra tüm araçları yeniden getir
  //     },
  //     (error) => {
  //       console.error('Araç eklenirken bir hata oluştu:', error);
  //       // Hata durumunda yapılacak işlemler
  //     }
  //   );
  // }


  //Araç ekleme kodları
  onCreate(entity: CarRequest) {
    this.createEntity<CarRequest>(entity, 'Car').then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Araç ekleme başarılı', life: 3000 });
        this.productDialog = false;

        //Araç ekledikten sonra dialog temizlensin...
        this.carRequest.arac_adi = "";
        this.carRequest.arac_resmi = "";
        this.carRequest.vites_tipi = "";
        this.carRequest.yakit_tipi = "";
        this.carRequest.arac_kilometre = 0;
        this.carRequest.arac_tipi = "";
        this.carRequest.arac_koltuk = 0;
        this.carRequest.arac_popularite = "";
        this.carRequest.price = 0;
      }
    });
  }

  createEntity<TEntity>(entity: TEntity, entityType: string) {
    return this.apiService.createEntity<TEntity>(entity, entityType);
  }

  //Güncellemek istediğimiz aracın bilgilerini çeken kod
  openEditDialog(id: number) {
    this.apiService.getEntityById<Car>(id, Car).then((response) => {
      if (response && response.data) {
        this.editDialog = true;
        this.carToEdit = response.data; // API'den alınan aracı carToEdit değişkenine atıyoruz
      } else {
        console.error('Araç bulunamadı veya alınırken bir hata oluştu.');
      }
    }).catch((error) => {
      console.error('Araç alınırken bir hata oluştu:', error);
    });
  }

  //Update işlemini gerçekleştiren kod
  onUpdate(id: number, updatedCar: Car) {
    this.update(id, updatedCar).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Araç güncelleme başarılı', life: 3000 });
        this.hideDialog(); // Güncelleme işlemi tamamlandığında dialogu gizle
      }
    }).catch((error) => {
      console.error('Araç güncellenirken bir hata oluştu:', error);
    });
  }

  //Update işlemini gerçekleştiren kod
  update(id: number, updatedCar: Car) {
    return this.apiService.updateEntity(id, updatedCar, Car);
  }


  // Araç güncelleme kodları
  // onUpdate(id: number, updatedCar: Car) {
  //   this.update(id, updatedCar).then(response => {
  //     if (response?.status == ResponseStatus.Ok) {
  //       this.refresh();
  //       this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Araç güncelleme başarılı', life: 3000 });
  //     }
  //   });
  // }

  // update(id: number, updatedCar: Car) {
  //   return this.apiService.updateEntity(id, updatedCar, Car);
  // }



  //Araç silme kodu
  onDelete(id: number) {
    this.delete(id).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Araç başarı ile silindi', life: 3000 });
      }
    });
  }

  delete(id: number) {
    return this.apiService.deleteEntity(id, Car);
  }


  ngOnInit() {
    this.refresh();
  }

}
