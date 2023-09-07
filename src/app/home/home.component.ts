import { Component, OnInit } from '@angular/core';
import { Product } from "../../core/models/request/product.model";
import { ProductService } from '../../core/services/productservice';
import { Car } from '../../../src/core/models/car.model';
import { ApiService } from '../../../src/core/services/api/api.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {

  selectedPickUpLocation: string | null = null;
  selectedDropOffLocation: string | null = null;
  selectedPickUpDate: Date | null = null;
  selectedDropOffDate: Date | null = null;


  states: string[] = [
    'İstanbul Havalimanı',
    'Ankara Esenboğa Havalimanı',
    'İzmir Adnan Menderes Havalimanı',
    'Antalya Havalimanı',
    'Kastamonu Havalimanı',
  ];

  products: Product[] | any;

  responsiveOptions: any[] | undefined;

  cars: Car[] = [];

  //Tüm araçları getiriyor

  refresh() {

    this.apiService.getAllEntities(Car).subscribe((response) => {
      this.cars = response.data;
    });

  }

  constructor(
    private productService: ProductService,
    private readonly apiService: ApiService,
    private router: Router,
    private messageService: MessageService
  ) { }


  browseClicked() {
    if (
      this.selectedPickUpLocation &&
      this.selectedDropOffLocation &&
      this.selectedPickUpDate &&
      this.selectedDropOffDate
    ) {
      const queryParams = {
        pick_up_location: this.selectedPickUpLocation,
        drop_off_location: this.selectedDropOffLocation,
        pick_up_date: this.selectedPickUpDate?.toISOString(),
        drop_off_date: this.selectedDropOffDate?.toISOString()
      };

      this.router.navigate(['/pricing'], { queryParams: queryParams, queryParamsHandling: 'merge' });

    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Lütfen boş alanları doldurun' });
    }
  }




  ngOnInit() {
    this.productService.getProductsSmall().then((products) => {
      this.products = products;
    });

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];

    this.refresh();

  }
}
