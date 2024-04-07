import { Event } from "./event.model";
import { Seat } from "./seat.model";
import { User } from "./user.model";

export class Ticket{
    ticketId:number;
    user:User;
    event:Event;
    seat:Seat;
    ticketPrice:number;
    purchaseDate:string;



}