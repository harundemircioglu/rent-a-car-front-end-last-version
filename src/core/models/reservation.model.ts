import { User } from "./user.model";
import { Car } from "./car.model";

export class Reservations {
  id: number = 0;
  user_id: number = 0;
  car_id: number = 0;
  car_pickup_location: string = "";
  car_dropoff_location: string = "";
  pick_Up_Date: string = "";
  choose_A_Date: string = "";
  user: User[] = [];
  car: Car[] = [];
}
