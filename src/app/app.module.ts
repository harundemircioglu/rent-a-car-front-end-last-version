import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PricingComponent } from './pricing/pricing.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { EditCarComponent } from './admin/car/edit-car/edit-car.component';
import { EditUserComponent } from './admin/user/edit-user/edit-user.component';
import { ReservationsComponent } from './admin/reservations/reservations.component';
import { MenubarModule } from 'primeng/menubar';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { BarComponent } from './admin/bar/bar.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommentsComponent } from './admin/comments/comments.component';
import { ContactsComponent } from './admin/contacts/contacts.component';
import { DropdownModule } from 'primeng/dropdown';
import { CommentDetailComponent } from './admin/comments/comment-detail/comment-detail.component';
import { ReservationDetailComponent } from './admin/reservations/reservation-detail/reservation-detail.component';
import { MessagesModule } from 'primeng/messages';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CardModule } from 'primeng/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { TabViewModule } from 'primeng/tabview';
import { AdminBackgroundComponent } from './admin/admin-background/admin-background.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ProductService } from 'src/core/services/productservice';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import { CarouselModule } from 'primeng/carousel';
import { JwtInterceptor } from 'src/core/interceptors/jwt.interceptor';
import { DatePipe } from '@angular/common';
import { UserReservationComponent } from './user-reservation/user-reservation.component';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PricingComponent,
    LoginComponent,
    SigninComponent,
    ProfileComponent,
    EditCarComponent,
    EditUserComponent,
    ReservationsComponent,
    AdminHomeComponent,
    BarComponent,
    AdminProfileComponent,
    CommentsComponent,
    ContactsComponent,
    CommentDetailComponent,
    ReservationDetailComponent,
    AdminBackgroundComponent,
    UserReservationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    CalendarModule,
    HttpClientModule,
    MenubarModule,
    InputTextModule,
    PasswordModule,
    InputMaskModule,
    InputNumberModule,
    DropdownModule,
    MessagesModule,
    CascadeSelectModule,
    CardModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    NgFor,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    TabViewModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    ConfirmDialogModule,
    TagModule,
    DialogModule,
    RatingModule,
    InputTextareaModule,
    AccordionModule,
    CarouselModule
  ],
  providers: [ProductService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    DatePipe
  ],


  bootstrap: [AppComponent]
})
export class AppModule { }
