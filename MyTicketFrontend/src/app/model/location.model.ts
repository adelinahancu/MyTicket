import { Eveniment } from "./eveniment.model";
import { Seat } from "./seat.model";

export class Locatie{
    id:number;
    locationName:string;
    address:string;
    capacity:number;
    hasSeats:boolean;
    imageUrl:string;
    seats:Seat[];
    events:Eveniment[];


}