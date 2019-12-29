declare interface BaseResponse {
  status: number;
  message: string;
}

declare interface ILocation {
  label: string;
  location: string;
  status: string;
  reservation: string;
  booking_person: null | string;
}
declare interface BookLocation extends BaseResponse {
  data: ILocation[];
}
