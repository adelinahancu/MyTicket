import { Eveniment } from "./eveniment.model";
import { Locatie } from "./location.model";
import { Seat } from "./seat.model";
import { User } from "./user.model";

export class Ticket{
    ticketId:number;
    user:User;
    event:Eveniment;
    seat:Seat;
    location:Locatie;
    ticketPrice:number;
    purchaseDate:Date;
    isBooked:boolean;



}