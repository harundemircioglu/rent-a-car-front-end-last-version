import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PricingComponent } from './pricing/pricing.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { EditCarComponent } from './admin/car/edit-car/edit-car.component';
import { EditUserComponent } from './admin/user/edit-user/edit-user.component';
import { ReservationsComponent } from './admin/reservations/reservations.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { CommentsComponent } from './admin/comments/comments.component';
import { ContactsComponent } from './admin/contacts/contacts.component';
import { UserReservationComponent } from './user-reservation/user-reservation.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'register', component: SigninComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'reservation', component: UserReservationComponent },
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'admin/edit-user', component: EditUserComponent },
  { path: 'admin/edit-car', component: EditCarComponent },
  { path: 'admin/reservations', component: ReservationsComponent },
  { path: 'admin/comments', component: CommentsComponent },
  { path: 'admin/contacts', component: ContactsComponent },
  { path: 'admin/profile', component: AdminProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
