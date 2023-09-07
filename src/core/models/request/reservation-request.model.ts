export interface ReservationRequest {
  user_id: number;
  car_id: number;
  car_pickup_location: string;
  car_dropoff_location: string;
  pick_Up_Date: string;
  choose_A_Date: string;
}
