export class User {
  id: number = 0;
  tc_no: string = "";
  userName: string = "";
  email: string = "";
  phone: string = "";
  userType: UserType = 0;
}

export enum UserType {
  Admin,
  User,
}
